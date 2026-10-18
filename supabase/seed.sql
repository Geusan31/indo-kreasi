-- ==============================================================================
-- seed.sql
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
) VALUES (
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
)
ON CONFLICT DO NOTHING;

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
