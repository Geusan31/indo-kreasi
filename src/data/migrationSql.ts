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

export const SQL_SEED = `-- ==============================================================================
-- 004_seed_data.sql
-- PT Indo Kreasi - Initial Seed Data for Supabase
-- ==============================================================================

-- 1. Company Information
INSERT INTO public.company_info (
  company_name,
  tagline,
  description,
  vision,
  mission,
  email,
  phone,
  address,
  logo_url,
  about_image_url,
  social_links,
  updated_at
)
SELECT
  'PT Indo Kreasi',
  'Membangun Dunia Virtual & Pengalaman Game Berkualitas Tinggi',
  'PT Indo Kreasi adalah studio game independen Indonesia yang berfokus pada mekanik permainan yang presisi, performa optimal lintas platform, dan estetika visual blocky/voxel 3D orisinal.',
  'Menjadi studio pengembang game terdepan dari Indonesia yang dikenal secara global dalam merancang dunia virtual imersif dan interaktif.',
  'Mengembangkan game berkualitas tinggi dengan kontrol responsif, memajukan ekosistem kreatif virtual world di Asia Tenggara, dan memprioritaskan kepuasan komunitas pemain.',
  'halo@indokreasi.id',
  '+62 812-3456-7890',
  'Bandung & Jakarta, Indonesia',
  '/images/logo.png',
  '/images/about-studio.jpg',
  '{"github": "https://github.com/pt-indo-kreasi", "discord": "https://discord.gg/indokreasi", "twitter": "https://x.com/indokreasi", "youtube": "https://youtube.com/@indokreasi"}'::jsonb,
  now()
WHERE NOT EXISTS (SELECT 1 FROM public.company_info LIMIT 1);

-- 2. Homepage Sections
INSERT INTO public.homepage_sections (section_key, title, subtitle, description, button_text, button_url, is_visible, sort_order) VALUES
(
  'hero',
  'Membangun Dunia Virtual dengan Mekanik Presisi & Estetika Voxel',
  'Studio Game Independen · Indonesia',
  'PT Indo Kreasi merancang game berkarakter kuat, obby kompetitif, dan simulasi dunia virtual. Kami mengedepankan kontrol responsif dan optimasi aset 3D untuk pengalaman bermain yang memuaskan.',
  'Lihat Portofolio Game',
  '/games',
  true,
  1
),
(
  'featured_games',
  'Karya Game Terbaru Studio',
  'Proyek Pilihan',
  'Eksplorasi proyek game yang sedang kami kembangkan, dari petualangan kepulauan hingga lintasan parkour berkecepatan tinggi.',
  'Buka Semua Game',
  '/games',
  true,
  2
),
(
  'about_preview',
  'Nilai Pengembangan Game Kami',
  'Prinsip Kerja',
  'Standar yang kami pegang dalam merancang mekanik permainan, estetika visual, dan kolaborasi bersama komunitas.',
  'Tentang Studio Kami',
  '/about',
  true,
  3
),
(
  'services',
  'Layanan Pengembangan & Desain 3D',
  'Kapabilitas Studio',
  'Solusi end-to-end bagi kreator, studio mitra, dan brand yang ingin membangun pengalaman interaktif berstandar industri.',
  'Lihat Seluruh Layanan',
  '/services',
  true,
  4
),
(
  'cta',
  'Tertarik Berkolaborasi Bersama Tim Kami?',
  'Kemitraan Studio',
  'Kami terbuka untuk diskusi penjajakan kerja sama pengembangan game, konsultasi mekanik, atau pembuatan aset 3D voxel.',
  'Hubungi Kami',
  '/contact',
  true,
  5
)
ON CONFLICT (section_key) DO UPDATE SET
  title = EXCLUDED.title,
  subtitle = EXCLUDED.subtitle,
  description = EXCLUDED.description,
  button_text = EXCLUDED.button_text,
  button_url = EXCLUDED.button_url,
  is_visible = EXCLUDED.is_visible,
  sort_order = EXCLUDED.sort_order;

-- 3. Games Portfolio
INSERT INTO public.games (title, slug, short_description, description, category, status, platform, release_date, cover_image_url, banner_image_url, gallery, external_url, featured, sort_order) VALUES
(
  'Nusantara Realm: Legends of the Archipelago',
  'nusantara-realm',
  'Petualangan open-world bertema nusantara dengan estetika blocky 3D modern. Jelajahi kepulauan mistis dan selesaikan kuil kuno.',
  'Nusantara Realm memadukan keindahan arsitektur vernakular Indonesia dengan estetika voxel 3D modern. Pemain menjelajahi lima pulau terapung mistis yang masing-masing dipimpin oleh elemen alam berbeda. Di setiap pulau, pemain dapat memecahkan teka-teki lingkungan, berburu relik suci, bertarung dalam sistem kombo melee dinamis, serta membangun pemukiman komunitas bersama teman.',
  'Action & RPG',
  'published',
  'PC (Windows / Mac), Virtual World Platform',
  '2026-11-20',
  'nusantara-realm',
  'nusantara-realm',
  '[{"title": "Gerbang Kuil Jayasri", "description": "Struktur batu voxel bertingkat dengan pencahayaan obisidian magis."}, {"title": "Pertarungan Boss Granit", "description": "Mekanik menghindar dan serangan balik saat menghadapi golem."}]'::jsonb,
  'https://indokreasi.id/games/nusantara-realm',
  true,
  1
),
(
  'Skyblock Obby Mayhem',
  'skyblock-obby-mayhem',
  'Tantangan parkour presisi lintas awan dengan mekanik trampolin kinetik, balok lenyap berwaktu, dan sistem speedrun global.',
  'Skyblock Obby Mayhem didesain khusus bagi penggemar genre platformer dan obby yang menginginkan kontrol karakter presisi tanpa latency lag. Pemain ditantang melewati balok melayang, menghindari laser berputar, memanfaatkan momentum peluncur roket dorong, dan mencatatkan waktu tercepat di papan peringkat mingguan.',
  'Platformer & Obby',
  'published',
  'Cross-Platform (PC / Mobile / Tablet)',
  '2026-08-15',
  'skyblock-obby-mayhem',
  'skyblock-obby-mayhem',
  '[{"title": "Zona Neon Cloudwalk", "description": "Rintangan balok kaca neon melayang di atas matahari senja."}, {"title": "Mekanik Balok Berputar", "description": "Timing lompatan tepat di titik rotasi blok."}]'::jsonb,
  'https://indokreasi.id/games/skyblock-obby-mayhem',
  true,
  2
),
(
  'Mega Tycoon: Cyber Nusantara',
  'mega-tycoon-cyber-nusantara',
  'Bangun imperium kota futuristik terapung berdaya energi bersih dengan sistem otomatisasi konveyor cerdas.',
  'Dalam Mega Tycoon: Cyber Nusantara, pemain memegang kendali penuh atas pembangunan kota vertikal ramah lingkungan. Setiap blok bangunan memengaruhi nilai efisiensi kota. Kelola pasokan energi terbarukan, rekrut teknisi robotik blocky, jalin rute perdagangan antarpemain di server, dan hadapi tantangan cuaca ekstrem berkala.',
  'Simulator & Tycoon',
  'published',
  'PC, Mobile',
  '2026-12-01',
  'mega-tycoon-cyber-nusantara',
  'mega-tycoon-cyber-nusantara',
  '[{"title": "Skyline Megalopolis", "description": "Cahaya neon ungu dan hijau toska memantul di kaca gedung."}, {"title": "Otomatisasi Jalur Konveyor", "description": "Perakitan komponen elektronik blocky tanpa jeda."}]'::jsonb,
  'https://indokreasi.id/games/mega-tycoon-cyber-nusantara',
  true,
  3
),
(
  'Ghost Hunter: Kampung Misteri',
  'ghost-hunter-kampung-misteri',
  'Eksplorasi misteri asimetris 4 pemain dengan suasana voxel mencekam dan teka-teki ritual kuno.',
  'Ghost Hunter: Kampung Misteri menghadirkan pendekatan horor atmosferik yang ramah bagi keluarga dan remaja melalui gaya visual blocky stylized. Membangun ketegangan lewat tata suara spasial 3D autentik, tata cahaya bayangan dinamis, dan kerja sama tim yang menuntut komunikasi erat.',
  'Mystery & Survival',
  'published',
  'PC (Steam / Web Desktop)',
  '2027-02-14',
  'ghost-hunter-kampung-misteri',
  'ghost-hunter-kampung-misteri',
  '[{"title": "Pohon Beringin Tua", "description": "Kabut tebal menutupi jalan setapak berbatu di dekat pagar panggung."}]'::jsonb,
  'https://indokreasi.id/games/ghost-hunter-kampung-misteri',
  false,
  4
),
(
  'Gravity Racer: Zero Voxel',
  'gravity-racer-zero-voxel',
  'Balapan futuristik 360 derajat di trek magnetik dengan kendaraan kubus modular rakitan sendiri.',
  'Gravity Racer: Zero Voxel menggabungkan keseruan game balap arkade kecepatan tinggi dengan kebebasan berkreasi. Pemain dapat merancang bodi kendaraan mereka dari ratusan blok modular, menguji distribusi berat di terowongan angin virtual, lalu membawanya meluncur di lintasan anti-gravitasi dengan drift lebih dari 400 km/jam.',
  'Racing & Arcade',
  'published',
  'PC, Konsol, Mobile',
  '2026-10-30',
  'gravity-racer-zero-voxel',
  'gravity-racer-zero-voxel',
  '[{"title": "Sirkuit Orbital Neo-Bandung", "description": "Kendaraan menempel erat pada permukaan magnetik saat drift."}]'::jsonb,
  'https://indokreasi.id/games/gravity-racer-zero-voxel',
  false,
  5
),
(
  'Block Arena: Champions',
  'block-arena-champions',
  'Pertarungan tim 5v5 taktis di arena colosseum balok yang lingkungannya dapat dihancurkan 100%.',
  'Block Arena: Champions memadukan kedalaman taktis hero brawler dengan mekanik perusakan lingkungan voxel secara instan. Pemain memilih dari jajaran Champions dengan peran berbeda, bertarung merebut zona kristal, serta dapat membangun kembali dinding runtuh untuk strategi bertahan.',
  'Action & Arena',
  'published',
  'PC, Mobile',
  '2026-09-10',
  'block-arena-champions',
  'block-arena-champions',
  '[{"title": "Ledakan Dinding Bastion", "description": "Reruntuhan balok berhamburan saat hammer champion menghantam pilar musuh."}]'::jsonb,
  'https://indokreasi.id/games/block-arena-champions',
  true,
  6
)
ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title,
  short_description = EXCLUDED.short_description,
  description = EXCLUDED.description,
  category = EXCLUDED.category,
  status = EXCLUDED.status,
  platform = EXCLUDED.platform,
  featured = EXCLUDED.featured,
  sort_order = EXCLUDED.sort_order;

-- 4. Services
INSERT INTO public.services (title, slug, short_description, description, icon, image_url, featured, sort_order, is_active) VALUES
(
  'Full-Cycle Game Development',
  'full-cycle-game-development',
  'Pengembangan game end-to-end dari ideasi konsep, pemrograman mekanik, optimasi aset, hingga QA rilis.',
  'Layanan lengkap mencakup perancangan logika permainan, sistem kontrol adaptif multi-platform, sinkronisasi multiplayer, integrasi tata suara foley, dan pengujian performa mendalam untuk menjamin stabilitas produk sebelum dirilis ke publik.',
  'Gamepad2',
  '/images/services/game-dev.jpg',
  true,
  1,
  true
),
(
  'Game Design & Rapid Prototyping',
  'game-design-prototyping',
  'Penyusunan Game Design Document (GDD), kalkulasi kurva progresi, dan pembuatan purwarupa mekanik cepat.',
  'Membantu mendefinisikan core gameplay loop, formula matematika ekonomi game, level pacing, serta merakit prototipe greybox interaktif dalam hitungan hari guna memvalidasi faktor keseruan sebelum tahap produksi skala penuh.',
  'Cpu',
  '/images/services/prototyping.jpg',
  true,
  2,
  true
),
(
  '3D Voxel & Stylized Environment Design',
  '3d-assets-voxel-environment',
  'Pemodelan aset 3D stylized, rigging animasi karakter blocky berkarakter, dan pembangunan level modular.',
  'Menciptakan identitas visual unik dengan estetika blocky dan voxel modern. Merancang ribuan prop modular, kit lingkungan bertema, tata cahaya volumetrik, dan rigging karakter luwes dengan polycount optimal.',
  'Box',
  '/images/services/environment.jpg',
  true,
  3,
  true
),
(
  'Game UI/UX & HUD Ergonomics',
  'game-ui-ux-design',
  'Perancangan antarmuka HUD non-intrusif, sistem menu bersih, indikator dinamis, dan navigasi ergonomis.',
  'Antarmuka game yang membimbing pemain tanpa merusak atmosfer visual. Desain layout HUD adaptif, tipografi berketerbacaan tinggi, icon pack kustom, animasi mikro reward, dan panduan onboarding intuitif.',
  'LayoutGrid',
  '/images/services/ui-ux.jpg',
  false,
  4,
  true
),
(
  'Interactive Virtual Worlds & Meta-Spaces',
  'interactive-virtual-experiences',
  'Pembangunan ruang virtual imersif untuk eksibisi digital, ruang kumpul komunitas, dan aktivasi brand.',
  'Menghadirkan pengalaman interaktif di mana pengguna dapat berkumpul, berinteraksi melalui avatar 3D, menyelesaikan misi bersama, dan mengeksplorasi instalasi digital.',
  'Globe',
  '/images/services/virtual-worlds.jpg',
  false,
  5,
  true
)
ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title,
  short_description = EXCLUDED.short_description,
  description = EXCLUDED.description,
  featured = EXCLUDED.featured,
  sort_order = EXCLUDED.sort_order,
  is_active = EXCLUDED.is_active;
`;
