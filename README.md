# PT Indo Kreasi — Dynamic Game Development Website & Admin CMS

A complete, production-ready dynamic company profile, game portfolio showcase, and CMS-style admin dashboard for **PT Indo Kreasi** (PT Indo Kreasi Digital Games).

Built with **React**, **Vite**, **TypeScript**, **Tailwind CSS**, and **Supabase** (PostgreSQL Database, Authentication, Row Level Security, and Storage).

---

## 🚀 Fitur Utama

### 1. Website Publik (Dinamis dari Supabase)
- **Beranda (`/`)**: Hero section dinamis, karya game unggulan, preview profil studio, ringkasan layanan, dan banner kemitraan — seluruh konten dapat disunting melalui Admin CMS.
- **Portofolio Game (`/games`)**: Menampilkan game berstatus *published* dengan fitur pencarian real-time dan filter kategori.
- **Detail Game (`/games/:slug`)**: Menampilkan cover, banner, sinopsis, platform, tanggal rilis, dan galeri konsep, serta penanganan 404 jika slug tidak ditemukan.
- **Tentang Kami (`/about`)**: Profil resmi studio, visi & misi, nilai-nilai pengembangan, dan lembar fakta dinamis dari tabel `company_info`.
- **Layanan (`/services`)**: Menampilkan daftar kapabilitas layanan aktif (*is_active = true*) dengan opsi pengajuan penawaran.
- **Kontak (`/contact`)**: Formulir pengiriman pesan yang langsung menyimpan data ke tabel `inquiries` Supabase.

### 2. Dashboard Administrator CMS (`/admin`)
- **Login Admin (`/admin/login`)**: Autentikasi aman berbasis Supabase Auth (`supabase.auth.signInWithPassword`), dilengkapi mode pengujian instan.
- **Ringkasan Statistik (`/admin`)**: Metrik real-time jumlah game, draft, layanan, pesan masuk baru, dan tindakan cepat.
- **CRUD Games (`/admin/games`)**: Tambah, sunting, arsipkan, atau hapus proyek game; kelola slug otomatis, galeri JSONB, dan unggah gambar ke Supabase Storage.
- **CRUD Layanan (`/admin/services`)**: Kelola nama layanan, slug, ikon, deskripsi, urutan tampil, dan status aktif.
- **CMS Homepage (`/admin/homepage`)**: Atur judul, sub-judul, deskripsi, teks tombol CTA, gambar, dan visibilitas setiap seksi beranda.
- **CMS Informasi Perusahaan (`/admin/company`)**: Sunting nama studio, tagline, visi, misi, kontak email, telepon, alamat, dan tautan sosial media.
- **Manajemen Pesan Masuk (`/admin/inquiries`)**: Baca detail pesan dari publik, ubah status (read, replied, archived), dan balas langsung melalui email.
- **Pustaka Media (`/admin/media`)**: Unggah gambar (JPG, PNG, WEBP, SVG hingga 10MB) ke bucket Supabase Storage `website-assets`, salin URL publik, dan kelola aset.
- **Profil Admin (`/admin/profile`)**: Kelola nama tampilan dan avatar admin.
- **Pengaturan & Migrasi (`/admin/settings`)**: Uji koneksi Supabase secara langsung, salin skrip SQL migrasi, dan opsi reset data lokal.

---

## 🛠️ Panduan Integrasi Supabase

### 1. Buat Proyek Supabase
Buka [Supabase Dashboard](https://supabase.com/dashboard) dan buat proyek baru.

### 2. Jalankan Skrip Migrasi SQL
Masuk ke menu **SQL Editor** di Supabase Dashboard, lalu jalankan berkas-berkas berikut secara berurutan:

1. `supabase/migrations/001_initial_schema.sql` (Membuat tabel `profiles`, `games`, `services`, `company_info`, `homepage_sections`, `inquiries`, `media`)
2. `supabase/migrations/002_rls_policies.sql` (Mengaktifkan Row Level Security & kebijakan akses)
3. `supabase/migrations/003_storage.sql` (Membuat bucket storage publik `website-assets` beserta kebijakannya)
4. `supabase/seed.sql` (Opsional: mengisi data awal portofolio dan informasi studio)

### 3. Konfigurasi Environment Variables
Salin berkas `.env.example` menjadi `.env` dan masukkan kredensial proyek Supabase Anda:
```env
VITE_SUPABASE_URL="https://[YOUR-PROJECT-ID].supabase.co"
VITE_SUPABASE_ANON_KEY="[YOUR-ANON-PUBLIC-KEY]"
```

### 4. Buat Akun Administrator di Supabase Auth
Masuk ke menu **Authentication > Users** di Supabase Dashboard, klik **Add user > Create user** dengan email (contoh: `admin@indokreasi.id`) dan password pilihan Anda.
Tambahkan role admin di tabel `profiles`:
```sql
INSERT INTO public.profiles (id, email, full_name, role)
VALUES ('[USER_UUID_DARI_AUTH]', 'admin@indokreasi.id', 'Admin Indo Kreasi', 'admin');
```

---

## 💻 Menjalankan Aplikasi Secara Lokal

### Instalasi Dependensi
```bash
npm install
```

### Mode Pengembangan (Dev Server)
```bash
npm run dev
```
Buka browser pada `http://localhost:3000`.

### Kredensial Uji Coba Demo (Jika Supabase belum dikonfigurasi)
Buka rute `/admin/login`:
- **Email**: `admin@indokreasi.id`
- **Password**: `admin123`
*(Tersedia tombol otomatis "Gunakan Akun Demo" pada halaman login)*

### Kompilasi Produksi (Production Build)
```bash
npm run build
```
Semua tipe TypeScript tervalidasi tanpa error.
