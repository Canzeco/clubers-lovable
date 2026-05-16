
-- =========================================================
-- Roles
-- =========================================================
DO $$ BEGIN
  CREATE TYPE public.app_role AS ENUM ('admin', 'moderator', 'user');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

CREATE TABLE IF NOT EXISTS public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role public.app_role NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);

ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

DROP POLICY IF EXISTS "Users can view own roles" ON public.user_roles;
CREATE POLICY "Users can view own roles" ON public.user_roles
FOR SELECT TO authenticated USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Admins manage roles" ON public.user_roles;
CREATE POLICY "Admins manage roles" ON public.user_roles
FOR ALL TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- =========================================================
-- Venues (unified: manager units + admin portfolio + sourcing leads)
-- =========================================================
CREATE TABLE IF NOT EXISTS public.venues (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text UNIQUE,
  name text NOT NULL,
  emoji text,
  type text,
  area text,
  city text,
  country text,
  instagram text,
  rating numeric(3,1),
  ticket text,
  status text,                 -- 'unit' | 'portfolio' | 'lead' | etc.
  plan text,                   -- Premium | Standard | Trial
  stage text,                  -- sourced | enriching | review | sales (for pipeline)
  fit text,                    -- Hot | Warm | Cold
  owner text,
  last_touch text,
  gmv_month text,
  redeems int,
  health int,
  signals text[],
  is_unit boolean NOT NULL DEFAULT false,
  position int,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.venues ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public can read venues" ON public.venues;
CREATE POLICY "Public can read venues" ON public.venues
FOR SELECT USING (true);

DROP POLICY IF EXISTS "Admins write venues" ON public.venues;
CREATE POLICY "Admins write venues" ON public.venues
FOR ALL TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- =========================================================
-- Pipeline stages
-- =========================================================
CREATE TABLE IF NOT EXISTS public.pipeline_stages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  stage_id text UNIQUE NOT NULL,
  label text NOT NULL,
  hint text,
  color text,
  count int NOT NULL DEFAULT 0,
  position int NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.pipeline_stages ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public can read stages" ON public.pipeline_stages;
CREATE POLICY "Public can read stages" ON public.pipeline_stages
FOR SELECT USING (true);

DROP POLICY IF EXISTS "Admins write stages" ON public.pipeline_stages;
CREATE POLICY "Admins write stages" ON public.pipeline_stages
FOR ALL TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- =========================================================
-- FAQs
-- =========================================================
CREATE TABLE IF NOT EXISTS public.faqs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  question text NOT NULL,
  answer text NOT NULL,
  position int NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.faqs ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public can read faqs" ON public.faqs;
CREATE POLICY "Public can read faqs" ON public.faqs
FOR SELECT USING (true);

DROP POLICY IF EXISTS "Admins write faqs" ON public.faqs;
CREATE POLICY "Admins write faqs" ON public.faqs
FOR ALL TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- =========================================================
-- Seeds
-- =========================================================

-- Pipeline stages
INSERT INTO public.pipeline_stages (stage_id, label, hint, color, count, position) VALUES
  ('sourced',   '1 · Sourced',           'Google Business · manual', 'bg-muted-foreground/30', 84, 1),
  ('enriching', '2 · Super-sourcing',    'AI agent enriching',       'bg-accent',              26, 2),
  ('review',    '3 · Review & approve',  'Manual QA',                'bg-secondary',           14, 3),
  ('sales',     '4 · Sales · partner',   'Contact & sign',           'bg-primary',              9, 4)
ON CONFLICT (stage_id) DO NOTHING;

-- Manager units (the dropdown in ManagerWeb)
INSERT INTO public.venues (slug, name, city, area, country, emoji, status, is_unit, position) VALUES
  ('luminar', 'Casa Luminar', 'CDMX', 'Roma Nte.', 'Mexico', '🦚', 'unit', true, 1),
  ('loto',    'Loto Café',    'CDMX', 'Condesa',   'Mexico', '🌿', 'unit', true, 2),
  ('mar',     'Mar Verde',    'Tulum','Centro',    'Mexico', '🌊', 'unit', true, 3)
ON CONFLICT (slug) DO NOTHING;

-- Sourcing pipeline leads
INSERT INTO public.venues (slug, name, type, area, instagram, rating, ticket, fit, stage, owner, last_touch, status, position) VALUES
  ('lead-bocanada',   'Bocanada',   'Rooftop · Mediterranean', 'Roma Nte.',  '—',    4.7, '$720',  'Hot',  'sourced',   'DM', 'today', 'lead', 1),
  ('lead-patio',      'Patio Verde','Brunch · Café',           'Condesa',    '—',    4.5, '$380',  'Hot',  'sourced',   'AL', '1d',    'lead', 2),
  ('lead-sal',        'Sal de Mar', 'Seafood',                 'Polanco',    '—',    4.4, '$640',  'Warm', 'sourced',   'DM', '2d',    'lead', 3),
  ('lead-hueco',      'El Hueco',   'Mezcal · Bar',            'Juárez',     '9k',   4.6, '$420',  'Warm', 'enriching', 'AI', 'now',   'lead', 4),
  ('lead-galapago',   'Galápago',   'Wine bar',                'Roma Sur',   '14k',  4.8, '$580',  'Hot',  'enriching', 'AI', 'now',   'lead', 5),
  ('lead-tropikalia', 'Tropikalia', 'Club · Nightlife',        'Cuauhtémoc', '120k', 4.3, '$1.2k', 'Hot',  'review',    'RC', 'today', 'lead', 6),
  ('lead-loto-cafe',  'Loto Café',  'Specialty coffee',        'Chapultepec','22k',  4.6, '$220',  'Warm', 'review',    'AL', '1d',    'lead', 7),
  ('lead-costa',      'Costa Azul', 'Beach club',              'Tulum',      '54k',  4.5, '$1.8k', 'Hot',  'sales',     'DM', 'today', 'lead', 8),
  ('lead-mar-verde',  'Mar Verde',  'Seafood',                 'Tulum',      '11k',  4.4, '$900',  'Cold', 'sales',     'RC', '3d',    'lead', 9)
ON CONFLICT (slug) DO NOTHING;

-- FAQs (from ManagerWeb)
INSERT INTO public.faqs (question, answer, position) VALUES
  ('¿Cuándo recibo el pago de los redeems?', 'Los redeems se liquidan cada lunes a tu cuenta bancaria conectada. Puedes ver el detalle en Wallet → Próximo pago.', 1),
  ('¿Cómo cambio el porcentaje de cashback?', 'Ve a Promos → selecciona una campaña → ajusta el slider de cashback. El cambio aplica a nuevas reservas.', 2),
  ('¿Quién puede validar coupons en la puerta?', 'Solo personas con rol Validator o superior. Agrégalas desde Team → Add member → Validator.', 3),
  ('¿Qué pasa si un guest no se presenta?', 'El coupon se libera automáticamente 30 min después de la hora de reserva. No se cobra cashback.', 4),
  ('¿Puedo pausar todas las campañas?', 'Sí, desde Promos → menú superior → Pausar todo. Las reservas existentes se respetan.', 5)
ON CONFLICT DO NOTHING;
