
CREATE TABLE public.communities (
  id text PRIMARY KEY,
  label text NOT NULL,
  short text NOT NULL,
  email_domain text NOT NULL,
  color text NOT NULL,
  city text NOT NULL,
  position integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.communities ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can read communities" ON public.communities FOR SELECT USING (true);
CREATE POLICY "Admins write communities" ON public.communities FOR ALL TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role))
  WITH CHECK (has_role(auth.uid(), 'admin'::app_role));
