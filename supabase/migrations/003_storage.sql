-- ==============================================================================
-- 003_storage.sql
-- PT Indo Kreasi - Supabase Storage Bucket & Storage RLS Policies
-- ==============================================================================

-- 1. Create the public storage bucket for website assets
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'website-assets',
  'website-assets',
  true,
  10485760, -- 10MB limit
  ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/svg+xml']
)
ON CONFLICT (id) DO UPDATE SET
  public = true,
  file_size_limit = 10485760,
  allowed_mime_types = ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/svg+xml'];

-- 2. Storage RLS Policies for website-assets bucket

-- Public read access: Anyone can view assets in 'website-assets'
DROP POLICY IF EXISTS "Public can view website assets" ON storage.objects;
CREATE POLICY "Public can view website assets"
  ON storage.objects FOR SELECT
  TO anon, authenticated
  USING (bucket_id = 'website-assets');

-- Admin write access: Authenticated users can upload to 'website-assets'
DROP POLICY IF EXISTS "Admins can upload website assets" ON storage.objects;
CREATE POLICY "Admins can upload website assets"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'website-assets');

-- Admin update access
DROP POLICY IF EXISTS "Admins can update website assets" ON storage.objects;
CREATE POLICY "Admins can update website assets"
  ON storage.objects FOR UPDATE
  TO authenticated
  USING (bucket_id = 'website-assets');

-- Admin delete access
DROP POLICY IF EXISTS "Admins can delete website assets" ON storage.objects;
CREATE POLICY "Admins can delete website assets"
  ON storage.objects FOR DELETE
  TO authenticated
  USING (bucket_id = 'website-assets');
