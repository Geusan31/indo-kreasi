import { StudioValue, WorkflowStep } from '../types';

export const COMPANY_CONFIG = {
  name: 'PT Indo Kreasi',
  legalName: 'PT Indo Kreasi Digital Games',
  shortName: 'Indo Kreasi Studio',
  tagline: 'Membangun Dunia Virtual & Pengalaman Game Berkualitas Tinggi',
  missionStatement: 'Menghadirkan pengalaman interaktif berkarakter kuat melalui mekanik game yang presisi, estetika blocky/voxel yang ekspresif, dan teknologi virtual world modern.',
  foundedYear: '2024',
  location: 'Bandung & Jakarta, Indonesia',
  // Configurable contact channels (for demonstrations and inquiries)
  email: 'halo@indokreasi.id',
  businessEmail: 'business@indokreasi.id',
  discordInvite: 'https://discord.gg/placeholder-indokreasi',
  socials: {
    github: 'https://github.com/pt-indo-kreasi',
    discord: 'https://discord.com',
    twitter: 'https://x.com',
    youtube: 'https://youtube.com',
    linkedin: 'https://linkedin.com',
  },
  workingHours: 'Senin – Jumat, 09:00 – 18:00 WIB',
  isDemoNotice: 'Formulir kontak beroperasi sebagai demonstrasi frontend client-side. Data tidak dikirim ke server pihak ketiga.',
};

export const STUDIO_VISION = {
  title: 'Visi Perusahaan',
  statement:
    'Menjadi studio pengembang game Indonesia terkemuka yang diakui secara global dalam merancang dunia virtual imersif, game blocky/voxel berestetika tinggi, dan sistem interaktif multipemain yang menghubungkan jutaan pemain.',
};

export const STUDIO_MISSION: string[] = [
  'Mengembangkan game orisinal berkualitas tinggi dengan memprioritaskan rasa kontrol yang responsif dan mekanik bermain yang memuaskan.',
  'Mengeksplorasi potensi estetika visual blocky dan stylized 3D menjadi pengalaman bercerita yang segar dan berkarakter.',
  'Membangun alur produksi (game development pipeline) yang terstruktur, efisien, dan kolaboratif bagi talenta kreatif Indonesia.',
  'Menyediakan layanan konsultasi dan pengembangan game bagi mitra bisnis, brand, serta komunitas pengembang virtual world.',
];

export const STUDIO_VALUES: StudioValue[] = [
  {
    id: 'val-1',
    title: 'Kreativitas Berakar',
    subtitle: 'Rooted Creativity',
    description: 'Kami menyalurkan imajinasi liar ke dalam konstruksi dunia virtual tanpa batas, memadukan inspirasi kultural dengan bahasa visual modern.',
    iconName: 'Sparkles',
  },
  {
    id: 'val-2',
    title: 'Presisi Mekanik',
    subtitle: 'Gameplay Precision',
    description: 'Sebelum grafis dipoles, gameplay harus terasa menyenangkan. Kami menguji ' +
      'responsivitas kontrol, loop keseruan, dan keadilan tantangan berulang kali.',
    iconName: 'Gamepad2',
  },
  {
    id: 'val-3',
    title: 'Estetika Voxel & Blocky',
    subtitle: 'Stylized Craftsmanship',
    description: 'Kami memandang geometri blok sebagai kanvas seni modular: mudah dipahami pemain, kaya detail pencahayaan, dan performa tinggi di berbagai perangkat.',
    iconName: 'Box',
  },
  {
    id: 'val-4',
    title: 'Transparansi & Komunitas',
    subtitle: 'Player-First Dialogue',
    description: 'Mendengarkan feedback playtester secara jujur dan memperlakukan setiap pemain serta mitra kerja dengan integritas profesional tertinggi.',
    iconName: 'Users',
  },
];

export const STUDIO_WORKFLOW: WorkflowStep[] = [
  {
    step: 1,
    title: 'Konsep & Game Design Document (GDD)',
    phase: 'Tahap Ideasi',
    description: 'Merumuskan premis gameplay, target audiens, pilar pengalaman (core pillars), dan arsitektur teknis sebelum menulis sebaris kode pun.',
    deliverables: ['Game Design Document', 'Sketsa Karakter & Art Style', 'Prototipe Kontrol Kertas / Mockup'],
  },
  {
    step: 2,
    title: 'Greyboxing & Prototipe Mekanik Cepat',
    phase: 'Tahap Validasi',
    description: 'Membuat arena bermain dengan blok sederhana (greybox) untuk membuktikan apakah aksi utama karakter benar-benar mengasyikkan.',
    deliverables: ['Playable Greybox Build', 'Input Tuning Matrix', 'Laporan Playtest Awal'],
  },
  {
    step: 3,
    title: 'Produksi Aset 3D & Desain Lingkungan',
    phase: 'Tahap Visual & Audio',
    description: 'Pemodelan karakter blocky berkarakter, rigging animasi, tata cahaya atmosferik, partikel VFX, dan komposisi musik tema dinamis.',
    deliverables: ['Pustaka Model Voxel Modular', 'Rigging Animasi Karakter', 'Sistem Pencahayaan & Shaders'],
  },
  {
    step: 4,
    title: 'Integrasi Multi-Platform & Optimasi',
    phase: 'Tahap Engineering',
    description: 'Penyusunan kode game modular, sinkronisasi fisika multipemain, optimalisasi frame-rate, dan integrasi UI HUD yang ergonomis.',
    deliverables: ['Alpha & Beta Builds', 'Profil Kinerja (Performance Profile)', 'Dukungan Kontrol Keyboard / Gamepad / Touch'],
  },
  {
    step: 5,
    title: 'Playtesting Komprehensif & Rilis',
    phase: 'Tahap Rilis & Pembaruan',
    description: 'Uji kestabilan bersama komunitas playtester, perbaikan bug kritis, persiapan peluncuran, dan perencanaan pembaruan konten berkala.',
    deliverables: ['Release Candidate Build', 'Dokumentasi Update Roadmap', 'Analitik Keterlibatan Pemain'],
  },
];
