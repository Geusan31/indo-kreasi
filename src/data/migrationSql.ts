export const SQL_INITIAL_SCHEMA = `-- ==============================================================================
-- 001_initial_schema.sql
-- PT Indo Kreasi - Supabase PostgreSQL Schema
-- ==============================================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. PROFILES TABLE (Linked with Supabase Auth users)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  role TEXT DEFAULT 'admin',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- 2. GAMES TABLE
CREATE TABLE IF NOT EXISTS public.games (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  short_description TEXT,
  description TEXT,
  category TEXT NOT NULL,
  status TEXT DEFAULT 'published' CHECK (status IN ('draft', 'published', 'archived')),
  platform TEXT,
  release_date DATE,
  cover_image_url TEXT,
  banner_image_url TEXT,
  gallery JSONB DEFAULT '[]'::jsonb,
  external_url TEXT,
  featured BOOLEAN DEFAULT false,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- 3. SERVICES TABLE
CREATE TABLE IF NOT EXISTS public.services (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  short_description TEXT,
  description TEXT,
  icon TEXT,
  image_url TEXT,
  featured BOOLEAN DEFAULT false,
  sort_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- 4. COMPANY_INFO TABLE
CREATE TABLE IF NOT EXISTS public.company_info (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_name TEXT NOT NULL,
  tagline TEXT,
  description TEXT,
  vision TEXT,
  mission TEXT,
  email TEXT,
  phone TEXT,
  address TEXT,
  logo_url TEXT,
  about_image_url TEXT,
  social_links JSONB DEFAULT '{}'::jsonb,
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- 5. HOMEPAGE_SECTIONS TABLE
CREATE TABLE IF NOT EXISTS public.homepage_sections (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  section_key TEXT UNIQUE NOT NULL CHECK (section_key IN ('hero', 'featured_games', 'about_preview', 'services', 'cta')),
  title TEXT,
  subtitle TEXT,
  description TEXT,
  image_url TEXT,
  button_text TEXT,
  button_url TEXT,
  is_visible BOOLEAN DEFAULT true,
  sort_order INTEGER DEFAULT 0,
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- 6. INQUIRIES TABLE
CREATE TABLE IF NOT EXISTS public.inquiries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT,
  message TEXT NOT NULL,
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'read', 'replied', 'archived')),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- 7. MEDIA TABLE
CREATE TABLE IF NOT EXISTS public.media (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  file_name TEXT NOT NULL,
  file_path TEXT NOT NULL,
  file_url TEXT NOT NULL,
  file_type TEXT,
  file_size INTEGER,
  alt_text TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_games_slug ON public.games(slug);
CREATE INDEX IF NOT EXISTS idx_games_status ON public.games(status);
CREATE INDEX IF NOT EXISTS idx_games_featured ON public.games(featured);
CREATE INDEX IF NOT EXISTS idx_services_slug ON public.services(slug);
CREATE INDEX IF NOT EXISTS idx_services_active ON public.services(is_active);
CREATE INDEX IF NOT EXISTS idx_inquiries_status ON public.inquiries(status);
CREATE INDEX IF NOT EXISTS idx_homepage_section_key ON public.homepage_sections(section_key);
`;

export const SQL_RLS_POLICIES = `-- ==============================================================================
-- 002_rls_policies.sql
-- PT Indo Kreasi - Supabase Row Level Security (RLS) Policies
-- ==============================================================================

-- Enable RLS on all public tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.games ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.company_info ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.homepage_sections ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.media ENABLE ROW LEVEL SECURITY;

-- Helper function to check if current authenticated user has 'admin' role in profiles
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid() AND role = 'admin'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ------------------------------------------------------------------------------
-- PROFILES POLICIES
-- ------------------------------------------------------------------------------
DROP POLICY IF EXISTS "Admins can view profiles" ON public.profiles;
CREATE POLICY "Admins can view profiles"
  ON public.profiles FOR SELECT
  TO authenticated
  USING (auth.uid() = id OR public.is_admin());

DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;
CREATE POLICY "Users can update own profile"
  ON public.profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

-- ------------------------------------------------------------------------------
-- GAMES POLICIES
-- ------------------------------------------------------------------------------
-- Public can view published games only
DROP POLICY IF EXISTS "Public can view published games" ON public.games;
CREATE POLICY "Public can view published games"
  ON public.games FOR SELECT
  TO anon, authenticated
  USING (status = 'published' OR public.is_admin());

-- Admins can insert, update, delete games
DROP POLICY IF EXISTS "Admins can insert games" ON public.games;
CREATE POLICY "Admins can insert games"
  ON public.games FOR INSERT
  TO authenticated
  WITH CHECK (public.is_admin());

DROP POLICY IF EXISTS "Admins can update games" ON public.games;
CREATE POLICY "Admins can update games"
  ON public.games FOR UPDATE
  TO authenticated
  USING (public.is_admin());

DROP POLICY IF EXISTS "Admins can delete games" ON public.games;
CREATE POLICY "Admins can delete games"
  ON public.games FOR DELETE
  TO authenticated
  USING (public.is_admin());

-- ------------------------------------------------------------------------------
-- SERVICES POLICIES
-- ------------------------------------------------------------------------------
-- Public can view active services
DROP POLICY IF EXISTS "Public can view active services" ON public.services;
CREATE POLICY "Public can view active services"
  ON public.services FOR SELECT
  TO anon, authenticated
  USING (is_active = true OR public.is_admin());

-- Admins can insert, update, delete services
DROP POLICY IF EXISTS "Admins can insert services" ON public.services;
CREATE POLICY "Admins can insert services"
  ON public.services FOR INSERT
  TO authenticated
  WITH CHECK (public.is_admin());

DROP POLICY IF EXISTS "Admins can update services" ON public.services;
CREATE POLICY "Admins can update services"
  ON public.services FOR UPDATE
  TO authenticated
  USING (public.is_admin());

DROP POLICY IF EXISTS "Admins can delete services" ON public.services;
CREATE POLICY "Admins can delete services"
  ON public.services FOR DELETE
  TO authenticated
  USING (public.is_admin());

-- ------------------------------------------------------------------------------
-- COMPANY_INFO POLICIES
-- ------------------------------------------------------------------------------
-- Public can view company info
DROP POLICY IF EXISTS "Public can view company info" ON public.company_info;
CREATE POLICY "Public can view company info"
  ON public.company_info FOR SELECT
  TO anon, authenticated
  USING (true);

-- Admins can update company info
DROP POLICY IF EXISTS "Admins can insert company info" ON public.company_info;
CREATE POLICY "Admins can insert company info"
  ON public.company_info FOR INSERT
  TO authenticated
  WITH CHECK (public.is_admin());

DROP POLICY IF EXISTS "Admins can update company info" ON public.company_info;
CREATE POLICY "Admins can update company info"
  ON public.company_info FOR UPDATE
  TO authenticated
  USING (public.is_admin());

-- ------------------------------------------------------------------------------
-- HOMEPAGE_SECTIONS POLICIES
-- ------------------------------------------------------------------------------
DROP POLICY IF EXISTS "Public can view homepage sections" ON public.homepage_sections;
CREATE POLICY "Public can view homepage sections"
  ON public.homepage_sections FOR SELECT
  TO anon, authenticated
  USING (true);

DROP POLICY IF EXISTS "Admins can update homepage sections" ON public.homepage_sections;
CREATE POLICY "Admins can update homepage sections"
  ON public.homepage_sections FOR UPDATE
  TO authenticated
  USING (public.is_admin());

-- ------------------------------------------------------------------------------
-- INQUIRIES POLICIES
-- ------------------------------------------------------------------------------
DROP POLICY IF EXISTS "Public can insert contact inquiries" ON public.inquiries;
CREATE POLICY "Public can insert contact inquiries"
  ON public.inquiries FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

DROP POLICY IF EXISTS "Admins can view inquiries" ON public.inquiries;
CREATE POLICY "Admins can view inquiries"
  ON public.inquiries FOR SELECT
  TO authenticated
  USING (public.is_admin());

DROP POLICY IF EXISTS "Admins can update inquiries" ON public.inquiries;
CREATE POLICY "Admins can update inquiries"
  ON public.inquiries FOR UPDATE
  TO authenticated
  USING (public.is_admin());

DROP POLICY IF EXISTS "Admins can delete inquiries" ON public.inquiries;
CREATE POLICY "Admins can delete inquiries"
  ON public.inquiries FOR DELETE
  TO authenticated
  USING (public.is_admin());

-- ------------------------------------------------------------------------------
-- MEDIA POLICIES
-- ------------------------------------------------------------------------------
DROP POLICY IF EXISTS "Public can view media" ON public.media;
CREATE POLICY "Public can view media"
  ON public.media FOR SELECT
  TO anon, authenticated
  USING (true);

DROP POLICY IF EXISTS "Admins can manage media records" ON public.media;
CREATE POLICY "Admins can manage media records"
  ON public.media FOR ALL
  TO authenticated
  USING (public.is_admin());
`;

export const SQL_STORAGE = `-- ==============================================================================
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
DROP POLICY IF EXISTS "Public can view website assets" ON storage.objects;
CREATE POLICY "Public can view website assets"
  ON storage.objects FOR SELECT
  TO anon, authenticated
  USING (bucket_id = 'website-assets');

DROP POLICY IF EXISTS "Admins can upload website assets" ON storage.objects;
CREATE POLICY "Admins can upload website assets"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'website-assets');

DROP POLICY IF EXISTS "Admins can update website assets" ON storage.objects;
CREATE POLICY "Admins can update website assets"
  ON storage.objects FOR UPDATE
  TO authenticated
  USING (bucket_id = 'website-assets');

DROP POLICY IF EXISTS "Admins can delete website assets" ON storage.objects;
CREATE POLICY "Admins can delete website assets"
  ON storage.objects FOR DELETE
  TO authenticated
  USING (bucket_id = 'website-assets');
`;
