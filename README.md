# PT Indo Kreasi — Game Development Studio Official Website

Website profil resmi dan showcase portofolio game interaktif **PT Indo Kreasi** (PT Indo Kreasi Digital Games). Dibangun dengan estetika *blocky* dan *voxel 3D* virtual world modern, palet warna hitam dan ungu gelap (*deep dark purple & electric violet*), serta arsitektur frontend murni tanpa dependensi backend/database.

---

## 🎮 Halaman & Fitur Utama

1. **Beranda (`/`)**
   - Hero section interaktif dengan visual diorama voxel 3D (`VoxelHeroScene`) dan pemilih bioma (*Crystal*, *Neon*, *Cyber*).
   - Sorotan portofolio game unggulan (*Featured Games*).
   - Nilai dan filosofi studio (*Studio Values*).
   - Tinjauan kapabilitas layanan (*Services Overview*).
   - 5 tahapan alur kerja produksi (*Creative Workflow*).
   - Banner ajakan kolaborasi (*Collaboration CTA*).

2. **Portofolio Game (`/games`)**
   - Pencarian judul dan mekanik game secara *real-time* berbasis data lokal.
   - Filter kategori interaktif (*Action & RPG*, *Platformer & Obby*, *Simulator & Tycoon*, *Mystery & Survival*, *Racing & Arcade*, *Action & Arena*).
   - *Empty state* ramah pengguna dengan tombol reset filter.

3. **Detail Game (`/games/:slug`)**
   - Pembacaan data dinamis berdasarkan *slug* game lokal.
   - Visualisasi ilustrasi konsep resolusi tinggi berbasis SVG murni (tidak bergantung pada tautan gambar eksternal yang rentan patah).
   - Fitur utama, status platform, spesifikasi teknis, dan galeri sudut pandang.
   - Penanganan rute *slug* tidak valid dengan halaman *Not Found* internal yang anggun.
   - Rekomendasi game lain untuk dieksplorasi.

4. **Tentang Kami (`/about`)**
   - Profil dan identitas PT Indo Kreasi.
   - Visi dan misi perusahaan.
   - 4 nilai inti studio (*Kreativitas Berakar*, *Presisi Mekanik*, *Estetika Voxel*, *Transparansi*).
   - Lembar fakta studio yang transparan dan dapat dikonfigurasi.

5. **Layanan (`/services`)**
   - 5 layanan studio terperinci: *Full-Cycle Game Development*, *Game Design & Prototyping*, *3D Voxel Assets & Environment*, *Game UI/UX*, dan *Virtual World Experiences*.
   - Rincian *deliverables*, teknologi pendukung, dan alur kerja.
   - Tautan langsung ke formulir kontak dengan pre-filled subjek.

6. **Kontak (`/contact`)**
   - Validasi formulir sisi klien (*client-side validation*) dengan umpan balik pesan galat *inline*.
   - Salin email satu-klik (*Copy to Clipboard*) dengan indikator status.
   - Tautan `mailto:` langsung untuk membuka klien email pengguna dengan parameter pesan terisi.
   - Pemberitahuan jujur bahwa formulir beroperasi sebagai demonstrasi frontend tanpa pengiriman ke server pihak ketiga.

7. **Halaman 404 (`*`)**
   - Halaman khusus bertema ruang hampa (*void coordinates*) dengan tombol kembali ke beranda.

---

## 🛠️ Teknologi yang Digunakan

- **React 19** + **Vite**: Framework frontend performa tinggi.
- **TypeScript**: Tipe data aman untuk game, layanan, dan konfigurasi.
- **React Router DOM 7**: Perutean sisi klien (*client-side routing*).
- **Tailwind CSS v4**: Desain modular dengan token warna kustom.
- **Motion**: Animasi halus dengan dukungan preferensi aksesibilitas `prefers-reduced-motion`.
- **Lucide React**: Ikon antarmuka modern.

---

## 🚀 Menjalankan Proyek Secara Lokal

### 1. Instalasi Dependensi
```bash
npm install
```

### 2. Mode Pengembangan (Development Server)
```bash
npm run dev
```
Buka peramban pada alamat `http://localhost:3000`.

### 3. Kompilasi Produksi (Production Build)
```bash
npm run build
```

---

## ⚙️ Konfigurasi Konten & Data Lokal

Seluruh konten game, layanan, dan informasi perusahaan dapat disunting dengan mudah pada direktori `src/data/`:
- `src/data/company.ts`: Nama studio, surel, jam kerja, sosial media, visi, misi, dan nilai.
- `src/data/games.ts`: Daftar game, kategori, fitur, platform, dan deskripsi.
- `src/data/services.ts`: Daftar layanan dan deliverables.
