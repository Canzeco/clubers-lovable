
-- Create public bucket for venue images
INSERT INTO storage.buckets (id, name, public) VALUES ('venue-images', 'venue-images', true)
ON CONFLICT (id) DO NOTHING;

-- Public read
CREATE POLICY "Public read venue-images"
ON storage.objects FOR SELECT
USING (bucket_id = 'venue-images');

-- Admin write
CREATE POLICY "Admin write venue-images"
ON storage.objects FOR INSERT TO authenticated
WITH CHECK (bucket_id = 'venue-images' AND has_role(auth.uid(), 'admin'));

CREATE POLICY "Admin update venue-images"
ON storage.objects FOR UPDATE TO authenticated
USING (bucket_id = 'venue-images' AND has_role(auth.uid(), 'admin'));

CREATE POLICY "Admin delete venue-images"
ON storage.objects FOR DELETE TO authenticated
USING (bucket_id = 'venue-images' AND has_role(auth.uid(), 'admin'));

-- Add image_url to venues
ALTER TABLE public.venues ADD COLUMN IF NOT EXISTS image_url text;
