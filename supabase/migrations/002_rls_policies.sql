-- ==============================================================================
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
CREATE POLICY "Admins can view profiles"
  ON public.profiles FOR SELECT
  TO authenticated
  USING (auth.uid() = id OR public.is_admin());

CREATE POLICY "Users can update own profile"
  ON public.profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

-- ------------------------------------------------------------------------------
-- GAMES POLICIES
-- ------------------------------------------------------------------------------
-- Public can view published games only
CREATE POLICY "Public can view published games"
  ON public.games FOR SELECT
  TO anon, authenticated
  USING (status = 'published' OR public.is_admin());

-- Admins can insert, update, delete games
CREATE POLICY "Admins can insert games"
  ON public.games FOR INSERT
  TO authenticated
  WITH CHECK (public.is_admin());

CREATE POLICY "Admins can update games"
  ON public.games FOR UPDATE
  TO authenticated
  USING (public.is_admin());

CREATE POLICY "Admins can delete games"
  ON public.games FOR DELETE
  TO authenticated
  USING (public.is_admin());

-- ------------------------------------------------------------------------------
-- SERVICES POLICIES
-- ------------------------------------------------------------------------------
-- Public can view active services
CREATE POLICY "Public can view active services"
  ON public.services FOR SELECT
  TO anon, authenticated
  USING (is_active = true OR public.is_admin());

-- Admins can insert, update, delete services
CREATE POLICY "Admins can insert services"
  ON public.services FOR INSERT
  TO authenticated
  WITH CHECK (public.is_admin());

CREATE POLICY "Admins can update services"
  ON public.services FOR UPDATE
  TO authenticated
  USING (public.is_admin());

CREATE POLICY "Admins can delete services"
  ON public.services FOR DELETE
  TO authenticated
  USING (public.is_admin());

-- ------------------------------------------------------------------------------
-- COMPANY_INFO POLICIES
-- ------------------------------------------------------------------------------
-- Public can view company info
CREATE POLICY "Public can view company info"
  ON public.company_info FOR SELECT
  TO anon, authenticated
  USING (true);

-- Admins can update company info
CREATE POLICY "Admins can insert company info"
  ON public.company_info FOR INSERT
  TO authenticated
  WITH CHECK (public.is_admin());

CREATE POLICY "Admins can update company info"
  ON public.company_info FOR UPDATE
  TO authenticated
  USING (public.is_admin());

-- ------------------------------------------------------------------------------
-- HOMEPAGE_SECTIONS POLICIES
-- ------------------------------------------------------------------------------
-- Public can view visible sections
CREATE POLICY "Public can view visible homepage sections"
  ON public.homepage_sections FOR SELECT
  TO anon, authenticated
  USING (is_visible = true OR public.is_admin());

-- Admins can manage homepage sections
CREATE POLICY "Admins can insert homepage sections"
  ON public.homepage_sections FOR INSERT
  TO authenticated
  WITH CHECK (public.is_admin());

CREATE POLICY "Admins can update homepage sections"
  ON public.homepage_sections FOR UPDATE
  TO authenticated
  USING (public.is_admin());

CREATE POLICY "Admins can delete homepage sections"
  ON public.homepage_sections FOR DELETE
  TO authenticated
  USING (public.is_admin());

-- ------------------------------------------------------------------------------
-- INQUIRIES POLICIES (Contact Form)
-- ------------------------------------------------------------------------------
-- Anyone (public visitors) can submit an inquiry
CREATE POLICY "Anyone can submit inquiry"
  ON public.inquiries FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- ONLY authenticated admins can view, update, delete inquiries
CREATE POLICY "Admins can view inquiries"
  ON public.inquiries FOR SELECT
  TO authenticated
  USING (public.is_admin());

CREATE POLICY "Admins can update inquiries"
  ON public.inquiries FOR UPDATE
  TO authenticated
  USING (public.is_admin());

CREATE POLICY "Admins can delete inquiries"
  ON public.inquiries FOR DELETE
  TO authenticated
  USING (public.is_admin());

-- ------------------------------------------------------------------------------
-- MEDIA POLICIES
-- ------------------------------------------------------------------------------
CREATE POLICY "Anyone can view media records"
  ON public.media FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Admins can manage media records"
  ON public.media FOR ALL
  TO authenticated
  USING (public.is_admin());
