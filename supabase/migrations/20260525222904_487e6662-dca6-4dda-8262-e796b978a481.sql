
-- Remove public SELECT on internal operations tables; keep admin ALL policy
DROP POLICY IF EXISTS "Public can read bots" ON public.bots;
DROP POLICY IF EXISTS "Public can read integrations" ON public.integrations;
DROP POLICY IF EXISTS "Public can read feed" ON public.sourcing_feed;
DROP POLICY IF EXISTS "Public can read venues" ON public.venues;
DROP POLICY IF EXISTS "Public can read stages" ON public.pipeline_stages;

-- Add explicit admin SELECT policies (in case ALL policy is restricted to authenticated only)
CREATE POLICY "Admins read bots" ON public.bots FOR SELECT TO authenticated USING (has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Admins read integrations" ON public.integrations FOR SELECT TO authenticated USING (has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Admins read feed" ON public.sourcing_feed FOR SELECT TO authenticated USING (has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Admins read venues" ON public.venues FOR SELECT TO authenticated USING (has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Admins read stages" ON public.pipeline_stages FOR SELECT TO authenticated USING (has_role(auth.uid(), 'admin'::app_role));
