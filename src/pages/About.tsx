import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Check, ShieldCheck, Box, Cpu, Wrench } from 'lucide-react';
import { SectionHeading } from '../components/SectionHeading';
import { getCompanyInfo } from '../lib/db';
import { CompanyInfo } from '../types';
import { LoadingState } from '../components/ui/LoadingState';

export const About: React.FC = () => {
  const [company, setCompany] = useState<CompanyInfo | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadCompany() {
      try {
        setLoading(true);
        const data = await getCompanyInfo();
        setCompany(data);
      } catch (err) {
        console.error('Error loading company info:', err);
      } finally {
        setLoading(false);
      }
    }
    loadCompany();
  }, []);

  if (loading || !company) {
    return <LoadingState message="Memuat profil studio..." className="py-32" />;
  }

  const values = [
    { title: 'Kreativitas Berakar', sub: 'Rooted Creativity', desc: 'Menyalurkan imajinasi dan cerita lokal ke dalam konstruksi dunia virtual berkarakter kuat.' },
    { title: 'Presisi Mekanik', sub: 'Gameplay Precision', desc: 'Sebelum visual dipoles, kontrol dan loop permainan harus teruji responsif dan menyenangkan.' },
    { title: 'Estetika Voxel', sub: 'Stylized Craftsmanship', desc: 'Geometri balok sebagai kanvas seni modular dengan performa tinggi di berbagai spesifikasi perangkat.' },
    { title: 'Transparansi', sub: 'Player Dialogue', desc: 'Mendengarkan masukan pemain secara langsung dan menjaga integritas karya studio.' },
  ];

  const workflow = [
    { step: 1, phase: 'Tahap Ideasi', title: 'Konsep & Game Design Document (GDD)', desc: 'Merumuskan premis gameplay, kurva tantangan, target pemain, dan arsitektur teknis sebelum produksi.' },
    { step: 2, phase: 'Tahap Validasi', title: 'Greyboxing & Prototipe Mekanik', desc: 'Membuat arena greybox cepat untuk memvalidasi keseruan kontrol dasar dan fisika interaksi.' },
    { step: 3, phase: 'Tahap Visual', title: 'Aset 3D & Desain Lingkungan Voxel', desc: 'Pemodelan karakter blocky berkarakter, rigging animasi luwes, dan tata cahaya volumetrik.' },
    { step: 4, phase: 'Tahap Engineering', title: 'Integrasi Multi-Platform & Optimasi', desc: 'Penyusunan kode game modular, sinkronisasi fisika multiplayer, dan tuning performa FPS tinggi.' },
    { step: 5, phase: 'Tahap Rilis', title: 'Playtesting Komprehensif & LiveOps', desc: 'Uji bersama komunitas playtester, perbaikan bug, dan rencana pembaruan berkala.' },
  ];

  const studioDisciplines = [
    {
      discipline: 'Game Design & Systems',
      description: 'Perancangan mekanik inti, ekonomi virtual, level pacing, dan aturan permainan berimbang.',
      tools: ['GDD Frameworks', 'Economy Spreadsheets', 'Greybox Sandboxes'],
    },
    {
      discipline: '3D Art & Voxel Modeling',
      description: 'Pemodelan aset balok modular, texturing stylized, pencahayaan PBR, dan rigging karakter.',
      tools: ['Blender', 'MagicaVoxel', 'Substance Painter'],
    },
    {
      discipline: 'Engine & Physics Engineering',
      description: 'Pemrograman sistem kontrol rendah latensi, netcode multiplayer, dan optimasi performa memory.',
      tools: ['Luau / C++', 'Sub-tick Physics', 'Dedicated Relay Servers'],
    },
    {
      discipline: 'HUD / UI/UX Ergonomics',
      description: 'Perancangan antarmuka visual pemain yang intuitif, minim gangguan, dan nyaman di ponsel maupun monitor.',
      tools: ['Figma', 'Custom Vector HUD', 'Responsive Scalers'],
    },
  ];

  return (
    <div className="w-full py-12 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 sm:space-y-24">
        {/* Profile & Narrative */}
        <section>
          <SectionHeading
            kicker="Profil Studio"
            title={`Mengenal ${company.company_name}`}
            description={company.tagline || 'Studio game independen Indonesia.'}
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            <div className="lg:col-span-7 space-y-4 text-sm sm:text-base text-[#A7A1B5] leading-relaxed whitespace-pre-line">
              <p>
                {company.description ||
                  'PT Indo Kreasi didorong oleh hasrat menciptakan karya game berdaya pikat tinggi melalui medium geometri blok dan dunia virtual.'}
              </p>
              <p>
                Kami memadukan pendekatan rekayasa kode yang terstruktur dengan perancangan level yang matang. Setiap proyek kami diuji secara berulang untuk memastikan responsivitas pergerakan karakter, kestabilan performa di berbagai spesifikasi perangkat, serta loop kepuasan pemain.
              </p>
              <p>
                Di samping mengembangkan judul game orisinal, kami juga membuka peluang kemitraan dengan sesama pengembang, penerbit game, dan brand yang ingin menghadirkan ruang interaktif di ekosistem dunia virtual modern.
              </p>
            </div>

            {/* Fact Sheet */}
            <div className="lg:col-span-5 p-6 rounded-2xl bg-[#171321] border border-[#332A45] space-y-4">
              <h3 className="font-semibold text-xs text-[#F5F3FF] tracking-wider uppercase">
                Informasi Studio
              </h3>

              <div className="space-y-3 text-xs">
                <div className="flex justify-between py-1.5 border-b border-[#332A45]/50">
                  <span className="text-[#A7A1B5]">Nama Resmi:</span>
                  <span className="text-[#F5F3FF] font-medium">{company.company_name}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-[#332A45]/50">
                  <span className="text-[#A7A1B5]">Lokasi Studio:</span>
                  <span className="text-[#F5F3FF] font-medium">{company.address || 'Bandung & Jakarta, Indonesia'}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-[#332A45]/50">
                  <span className="text-[#A7A1B5]">Kontak Email:</span>
                  <span className="text-[#F5F3FF] font-medium font-mono">{company.email || 'halo@indokreasi.id'}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-[#332A45]/50">
                  <span className="text-[#A7A1B5]">Telepon:</span>
                  <span className="text-[#F5F3FF] font-medium font-mono">{company.phone || '—'}</span>
                </div>
                <div className="flex justify-between py-1.5">
                  <span className="text-[#A7A1B5]">Fokus Utama:</span>
                  <span className="text-[#C4B5FD] font-medium">Game Development & Virtual Worlds</span>
                </div>
              </div>

              <div className="pt-2">
                <Link
                  to="/contact"
                  className="w-full inline-flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-[#201A2D] hover:bg-[#282138] border border-[#332A45] text-xs font-semibold text-[#F5F3FF] transition-colors"
                >
                  <span>Hubungi Kantor Studio</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#8B5CF6]" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Vision & Mission */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-8 rounded-2xl bg-[#171321] border border-[#332A45] space-y-3">
            <div className="text-xs font-semibold text-[#8B5CF6] uppercase tracking-wider">
              Arah Strategis
            </div>
            <h3 className="font-display font-bold text-xl text-[#F5F3FF]">
              Visi Studio
            </h3>
            <p className="text-sm text-[#A7A1B5] leading-relaxed whitespace-pre-line">
              {company.vision || 'Menjadi studio pengembang game terdepan dari Indonesia yang dikenal secara global dalam merancang dunia virtual imersif.'}
            </p>
          </div>

          <div className="p-8 rounded-2xl bg-[#171321] border border-[#332A45] space-y-3">
            <div className="text-xs font-semibold text-[#8B5CF6] uppercase tracking-wider">
              Komitmen Karya
            </div>
            <h3 className="font-display font-bold text-xl text-[#F5F3FF]">
              Misi Studio
            </h3>
            <p className="text-sm text-[#A7A1B5] leading-relaxed whitespace-pre-line">
              {company.mission || 'Mengembangkan game interaktif berkualitas tinggi dengan kontrol responsif, memajukan ekosistem kreatif game lokal, dan mengutamakan kepuasan komunitas pemain.'}
            </p>
          </div>
        </section>

        {/* Studio Values */}
        <section>
          <SectionHeading
            kicker="Nilai Studio"
            title="Prinsip Inti Perusahaan"
            description="Pedoman yang dipegang tim dalam menentukan arah desain mekanik, arsitektur kode, dan komunikasi bersama mitra."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((val, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-[#171321] border border-[#332A45] space-y-2.5"
              >
                <h4 className="font-display font-bold text-lg text-[#F5F3FF]">
                  {val.title}
                </h4>
                <div className="text-xs font-medium text-[#C4B5FD]">
                  {val.sub}
                </div>
                <p className="text-xs text-[#A7A1B5] leading-relaxed">
                  {val.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Studio Disciplines & Tooling */}
        <section>
          <SectionHeading
            kicker="Keahlian Teknis"
            title="Disiplin & Pipeline Tooling Studio"
            description="Ekosistem teknologi dan perangkat lunak yang kami gunakan setiap hari dalam memproduksi game."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {studioDisciplines.map((item, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-[#171321] border border-[#332A45] space-y-3"
              >
                <div className="flex items-center justify-between">
                  <h4 className="font-display font-bold text-base text-[#F5F3FF]">
                    {item.discipline}
                  </h4>
                  <Wrench className="w-4 h-4 text-[#8B5CF6]" />
                </div>
                <p className="text-xs sm:text-sm text-[#A7A1B5] leading-relaxed">
                  {item.description}
                </p>
                <div className="pt-2 flex flex-wrap gap-2">
                  {item.tools.map((tool, tIdx) => (
                    <span
                      key={tIdx}
                      className="px-2.5 py-1 rounded bg-[#201A2D] border border-[#332A45] text-[11px] font-mono text-[#C4B5FD]"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Workflow */}
        <section>
          <SectionHeading
            kicker="Alur Kerja"
            title="Metodologi Produksi Game"
            description="Tahapan terstruktur dari perancangan Game Design Document hingga pembaruan pasca rilis."
          />

          <div className="space-y-4">
            {workflow.map((wf) => (
              <div
                key={wf.step}
                className="p-6 rounded-xl bg-[#171321] border border-[#332A45] flex flex-col md:flex-row md:items-start justify-between gap-6 hover:border-[#8B5CF6]/60 transition-colors"
              >
                <div className="space-y-1.5 max-w-2xl">
                  <div className="text-xs font-semibold text-[#8B5CF6]">
                    0{wf.step}. {wf.phase}
                  </div>
                  <h4 className="font-display font-bold text-base text-[#F5F3FF]">
                    {wf.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-[#A7A1B5] leading-relaxed">
                    {wf.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};
