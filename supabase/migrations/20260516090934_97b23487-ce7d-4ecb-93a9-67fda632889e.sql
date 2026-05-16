
CREATE TABLE public.bots (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  role text NOT NULL,
  icon text NOT NULL,
  status text NOT NULL,
  region text NOT NULL,
  found integer NOT NULL DEFAULT 0,
  goal integer NOT NULL DEFAULT 0,
  uses text[] NOT NULL DEFAULT '{}',
  last_event text,
  position integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.bots ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can read bots" ON public.bots FOR SELECT USING (true);
CREATE POLICY "Admins write bots" ON public.bots FOR ALL TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role))
  WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE TABLE public.sourcing_feed (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  t text NOT NULL,
  bot text NOT NULL,
  msg text NOT NULL,
  kind text NOT NULL,
  position integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.sourcing_feed ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can read feed" ON public.sourcing_feed FOR SELECT USING (true);
CREATE POLICY "Admins write feed" ON public.sourcing_feed FOR ALL TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role))
  WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE TABLE public.integrations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  group_name text NOT NULL,
  name text NOT NULL,
  category text NOT NULL,
  purpose text NOT NULL,
  status text NOT NULL,
  monthly text,
  usage text,
  link text,
  position integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.integrations ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can read integrations" ON public.integrations FOR SELECT USING (true);
CREATE POLICY "Admins write integrations" ON public.integrations FOR ALL TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role))
  WITH CHECK (has_role(auth.uid(), 'admin'::app_role));
