import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Gamepad2, Box, Cpu, ShieldCheck, ChevronRight, Play } from 'lucide-react';
import { VoxelHeroScene } from '../components/VoxelHeroScene';
import { SectionHeading } from '../components/SectionHeading';
import { GameCard } from '../components/GameCard';
import { GAMES_DATA } from '../data/games';
import { SERVICES_DATA } from '../data/services';
import { COMPANY_CONFIG, STUDIO_VALUES, STUDIO_WORKFLOW } from '../data/company';

export const Home: React.FC = () => {
  const featuredGames = GAMES_DATA.filter((g) => g.featured);

  return (
    <div className="w-full">
      {/* ========================================================
          HERO SECTION
         ======================================================== */}
      <section className="relative overflow-hidden pt-8 pb-16 sm:pt-14 sm:pb-24 lg:pt-20 lg:pb-32 border-b border-[#332A45]/60 bg-gradient-to-b from-[#09090F] via-[#110D1D] to-[#09090F]">
        {/* Subtle grid pattern background */}
        <div
          className="absolute inset-0 opacity-[0.07] pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(#8B5CF6 1px, transparent 1px)`,
            backgroundSize: '36px 36px',
          }}
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Content (7 cols) */}
            <div className="lg:col-span-7 space-y-6 text-left">
              {/* Kicker badge */}
              <div className="inline-flex items-center gap-2 text-xs font-mono font-medium text-[#C4B5FD] tracking-wider uppercase">
                <span className="w-2 h-2 rounded-full bg-[#8B5CF6] animate-ping" />
                <span>INDEPENDENT GAME STUDIO · INDONESIA</span>
              </div>

              {/* Headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-extrabold text-[#F5F3FF] tracking-tight leading-[1.08]">
                Membangun Dunia Virtual{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8B5CF6] via-[#C4B5FD] to-[#DDD6FE]">
                  Penuh Imajinasi & Aksi
                </span>
              </h1>

              {/* Subheading */}
              <p className="text-lg sm:text-xl text-[#A7A1B5] max-w-2xl leading-relaxed">
                PT Indo Kreasi memadukan estetika blocky/voxel 3D dengan mekanik gameplay yang presisi. Kami merancang game orisinal, obby cepat, simulasi tycoon mendalam, dan ruang interaktif metaverse.
              </p>

              {/* Dual CTA Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <Link
                  to="/games"
                  className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-[#8B5CF6] hover:bg-[#7C3AED] text-[#F5F3FF] font-semibold text-base shadow-[0_4px_20px_rgba(139,92,246,0.4)] hover:shadow-[0_6px_25px_rgba(139,92,246,0.6)] transition-all active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-[#C4B5FD]"
                >
                  <Gamepad2 className="w-5 h-5" />
                  <span>Jelajahi Portofolio Game</span>
                  <ArrowRight className="w-4 h-4 ml-0.5" />
                </Link>

                <Link
                  to="/services"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#171321] hover:bg-[#201A2D] text-[#F5F3FF] border border-[#332A45] hover:border-[#8B5CF6] font-semibold text-base transition-all active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-[#8B5CF6]"
                >
                  <Box className="w-5 h-5 text-[#8B5CF6]" />
                  <span>Layanan & Kapabilitas</span>
                </Link>
              </div>

              {/* Studio Highlights Bar */}
              <div className="pt-6 border-t border-[#332A45]/60 grid grid-cols-3 gap-4 max-w-lg">
                <div>
                  <div className="text-2xl sm:text-3xl font-display font-bold text-[#F5F3FF]">6+</div>
                  <div className="text-xs font-mono text-[#A7A1B5] mt-0.5">Judul Game Aktif</div>
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-display font-bold text-[#F5F3FF]">100%</div>
                  <div className="text-xs font-mono text-[#A7A1B5] mt-0.5">Aset 3D Orisinal</div>
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-display font-bold text-[#F5F3FF]">Multi</div>
                  <div className="text-xs font-mono text-[#A7A1B5] mt-0.5">Dukungan Platform</div>
                </div>
              </div>
            </div>

            {/* Right Visual (5 cols) */}
            <div className="lg:col-span-5 flex justify-center">
              <VoxelHeroScene />
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          FEATURED GAMES SECTION
         ======================================================== */}
      <section className="py-20 sm:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <SectionHeading
            kicker="PROYEK UNGGULAN"
            title="Karya Game Pilihan Studio"
            description="Dari petualangan open-world nusantara hingga obby berkecepatan tinggi, telusuri karya-karya terbaru yang kami bangun."
            className="mb-0"
          />

          <Link
            to="/games"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#8B5CF6] hover:text-[#C4B5FD] transition-colors self-start md:self-end"
          >
            <span>Lihat Semua 6 Proyek</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredGames.map((game) => (
            <GameCard key={game.id} game={game} />
          ))}
        </div>
      </section>

      {/* ========================================================
          STUDIO VALUES & PHILOSOPHY
         ======================================================== */}
      <section className="py-20 sm:py-28 bg-[#171321]/60 border-y border-[#332A45]/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            kicker="NILAI & PRINSIP"
            title="Bagaimana Kami Mengembangkan Game"
            description="Fondasi filosofis yang kami pegang dalam merancang setiap dunia balok, mekanisme interaksi, dan komunitas pemain."
            align="center"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {STUDIO_VALUES.map((val) => (
              <div
                key={val.id}
                className="p-6 rounded-xl bg-[#201A2D] border border-[#332A45] hover:border-[#8B5CF6]/60 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-lg bg-[#171321] border border-[#332A45] flex items-center justify-center text-[#8B5CF6] mb-5">
                    {val.iconName === 'Sparkles' && <Sparkles className="w-6 h-6" />}
                    {val.iconName === 'Gamepad2' && <Gamepad2 className="w-6 h-6" />}
                    {val.iconName === 'Box' && <Box className="w-6 h-6" />}
                    {val.iconName === 'Users' && <Cpu className="w-6 h-6" />}
                  </div>

                  <h3 className="text-xl font-display font-bold text-[#F5F3FF]">
                    {val.title}
                  </h3>
                  <div className="text-xs font-mono text-[#C4B5FD] mt-0.5 mb-3">
                    {val.subtitle}
                  </div>

                  <p className="text-sm text-[#A7A1B5] leading-relaxed">
                    {val.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================
          SERVICES OVERVIEW
         ======================================================== */}
      <section className="py-20 sm:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          kicker="KAPABILITAS STUDIO"
          title="Layanan Pengembangan & Desain Virtual"
          description="Kami berkolaborasi dengan kreator, brand, dan pengembang lain untuk mewujudkan proyek interaktif berstandar industri."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES_DATA.slice(0, 3).map((service) => (
            <div
              key={service.id}
              className="p-7 rounded-xl bg-[#201A2D] border border-[#332A45] hover:border-[#8B5CF6] transition-all flex flex-col justify-between group"
            >
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-lg bg-[#171321] border border-[#332A45] flex items-center justify-center text-[#8B5CF6] group-hover:bg-[#8B5CF6] group-hover:text-white transition-colors">
                  <Box className="w-6 h-6" />
                </div>

                <h3 className="text-xl font-display font-bold text-[#F5F3FF] group-hover:text-white transition-colors">
                  {service.title}
                </h3>

                <p className="text-sm text-[#A7A1B5] leading-relaxed">
                  {service.shortDescription}
                </p>

                <div className="space-y-1.5 pt-2 border-t border-[#332A45]/60">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-[#C4B5FD]">
                    Output Utama:
                  </span>
                  <p className="text-xs text-[#A7A1B5]">
                    {service.deliverables[0]}
                  </p>
                </div>
              </div>

              <div className="pt-6">
                <Link
                  to="/services"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#8B5CF6] group-hover:text-[#C4B5FD] transition-colors"
                >
                  <span>Pelajari Selengkapnya</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link
            to="/services"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-[#171321] hover:bg-[#201A2D] border border-[#332A45] text-sm font-semibold text-[#F5F3FF] transition-all"
          >
            <span>Lihat Semua 5 Layanan Studio</span>
            <ArrowRight className="w-4 h-4 text-[#8B5CF6]" />
          </Link>
        </div>
      </section>

      {/* ========================================================
          WORKFLOW / CREATIVE PROCESS SECTION
         ======================================================== */}
      <section className="py-20 sm:py-28 bg-[#171321]/40 border-t border-[#332A45]/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            kicker="ALUR KERJA KREATIF"
            title="5 Tahapan Produksi Game"
            description="Metodologi terstruktur yang memastikan kualitas mekanik, kepuasan visual, dan ketepatan rilis."
            align="center"
          />

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {STUDIO_WORKFLOW.map((wf) => (
              <div
                key={wf.step}
                className="relative p-5 rounded-xl bg-[#201A2D] border border-[#332A45] flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="font-mono text-2xl font-bold text-[#8B5CF6]">
                    0{wf.step}
                  </div>
                  <div className="text-[11px] font-mono text-[#C4B5FD] uppercase tracking-wider">
                    {wf.phase}
                  </div>
                  <h4 className="font-display font-semibold text-base text-[#F5F3FF] leading-snug">
                    {wf.title.split('(')[0]}
                  </h4>
                  <p className="text-xs text-[#A7A1B5] leading-relaxed">
                    {wf.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================
          COLLABORATION CTA BANNER
         ======================================================== */}
      <section className="py-20 sm:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-2xl bg-gradient-to-r from-[#171321] via-[#201A2D] to-[#171321] border border-[#332A45] p-8 sm:p-14 overflow-hidden shadow-2xl">
          {/* Ambient glow */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#8B5CF6]/20 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-2xl space-y-6">
            <span className="font-mono text-xs uppercase tracking-widest text-[#C4B5FD] font-semibold">
              KOLABORASI & KEMITRAAN
            </span>

            <h2 className="text-3xl sm:text-4xl font-display font-bold text-[#F5F3FF] tracking-tight">
              Punya Ide Proyek Game atau Butuh Tim Virtual World Berpengalaman?
            </h2>

            <p className="text-base text-[#A7A1B5] leading-relaxed">
              Kami siap berdiskusi mulai dari penyusunan Game Design Document, produksi aset voxel stylized, hingga prototipe gameplay siap uji.
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#8B5CF6] hover:bg-[#7C3AED] text-[#F5F3FF] font-semibold text-base shadow-lg transition-all"
              >
                <span>Hubungi Tim Studio</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/about"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#09090F] hover:bg-[#171321] border border-[#332A45] text-sm font-semibold text-[#F5F3FF] transition-all"
              >
                <span>Pelajari Profil Perusahaan</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
