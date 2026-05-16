
CREATE TABLE public.coupon_workflow_steps (
  step_key text PRIMARY KEY,
  label text NOT NULL,
  description text NOT NULL,
  icon text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.coupon_workflow_steps ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can read workflow steps" ON public.coupon_workflow_steps FOR SELECT USING (true);
CREATE POLICY "Admins write workflow steps" ON public.coupon_workflow_steps FOR ALL TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role))
  WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE TABLE public.venue_quicknav_sections (
  id text PRIMARY KEY,
  label text NOT NULL,
  position integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.venue_quicknav_sections ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can read quicknav" ON public.venue_quicknav_sections FOR SELECT USING (true);
CREATE POLICY "Admins write quicknav" ON public.venue_quicknav_sections FOR ALL TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role))
  WITH CHECK (has_role(auth.uid(), 'admin'::app_role));
