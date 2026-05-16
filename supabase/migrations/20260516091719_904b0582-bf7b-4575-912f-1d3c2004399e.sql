CREATE TABLE public.app_content (
  content_key text PRIMARY KEY,
  description text,
  payload jsonb NOT NULL DEFAULT '[]'::jsonb,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

ALTER TABLE public.app_content ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read app content"
ON public.app_content
FOR SELECT
TO public
USING (true);

CREATE POLICY "Admins write app content"
ON public.app_content
FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (public.has_role(auth.uid(), 'admin'::app_role));

CREATE TRIGGER update_app_content_updated_at
BEFORE UPDATE ON public.app_content
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();