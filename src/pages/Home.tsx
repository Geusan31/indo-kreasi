import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Gamepad2, Box, Layers } from 'lucide-react';
import { VoxelHeroScene } from '../components/VoxelHeroScene';
import { SectionHeading } from '../components/SectionHeading';
import { GameCard } from '../components/GameCard';
import { GAMES_DATA } from '../data/games';
import { SERVICES_DATA } from '../data/services';
import { STUDIO_VALUES, STUDIO_WORKFLOW } from '../data/company';

export const Home: React.FC = () => {
  const featuredGames = GAMES_DATA.filter((g) => g.featured);

  return (
    <div className="w-full">
      {/* Hero Section: Crisp, intentional layout without generic neon glow blobs or pulsing dots */}
      <section className="relative pt-10 pb-16 sm:pt-16 sm:pb-24 border-b border-[#332A45]/80 bg-[#09090F]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Narrative Column */}
            <div className="lg:col-span-7 space-y-6 text-left">
              <p className="text-xs font-medium text-[#C4B5FD] tracking-wide uppercase">
                Studio Game Independen · Indonesia
              </p>

              <h1
                className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-[#F5F3FF] tracking-tight leading-[1.12]"
                style={{ textWrap: 'balance' }}
              >
                Membangun Dunia Virtual dengan Mekanik Presisi & Estetika Voxel
              </h1>

              <p className="text-base sm:text-lg text-[#A7A1B5] max-w-2xl leading-relaxed">
                PT Indo Kreasi merancang game berkarakter kuat, obby kompetitif, dan simulasi dunia virtual. Kami mengedepankan kontrol yang responsif dan optimasi aset 3D untuk pengalaman bermain yang memuaskan.
              </p>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <Link
                  to="/games"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-[#8B5CF6] hover:bg-[#7C3AED] text-[#F5F3FF] font-semibold text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C4B5FD]"
                >
                  <Gamepad2 className="w-4 h-4" />
                  <span>Lihat Portofolio Game</span>
                  <ArrowRight className="w-4 h-4 ml-0.5" />
                </Link>

                <Link
                  to="/services"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-[#171321] hover:bg-[#201A2D] text-[#F5F3FF] border border-[#332A45] font-semibold text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8B5CF6]"
                >
                  <Box className="w-4 h-4 text-[#8B5CF6]" />
                  <span>Layanan Studio</span>
                </Link>
              </div>

              {/* Factual Highlights Bar (No fake percentages or floating boxes) */}
              <div className="pt-6 border-t border-[#332A45]/70 grid grid-cols-3 gap-6 max-w-md text-xs">
                <div>
                  <div className="text-xl font-display font-bold text-[#F5F3FF]">6 Judul</div>
                  <div className="text-[#A7A1B5] mt-0.5">Katalog Orisinal</div>
                </div>
                <div>
                  <div className="text-xl font-display font-bold text-[#F5F3FF]">PC & Mobile</div>
                  <div className="text-[#A7A1B5] mt-0.5">Multi-Platform</div>
                </div>
                <div>
                  <div className="text-xl font-display font-bold text-[#F5F3FF]">Voxel 3D</div>
                  <div className="text-[#A7A1B5] mt-0.5">Fokus Visual</div>
                </div>
              </div>
            </div>

            {/* Right Architectural Voxel Scene */}
            <div className="lg:col-span-5 flex justify-center">
              <VoxelHeroScene />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Games Section */}
      <section className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <SectionHeading
            kicker="Proyek Pilihan"
            title="Karya Game Terbaru Studio"
            description="Eksplorasi proyek game yang sedang kami kembangkan, dari petualangan kepulauan hingga lintasan parkour berkecepatan tinggi."
            className="mb-0"
          />

          <Link
            to="/games"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#8B5CF6] hover:text-[#C4B5FD] transition-colors self-start md:self-end"
          >
            <span>Buka Semua Game</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredGames.map((game) => (
            <GameCard key={game.id} game={game} />
          ))}
        </div>
      </section>

      {/* Studio Values Section: Generous whitespace, clean hairline dividers, no nested cards */}
      <section className="py-16 sm:py-24 bg-[#171321] border-y border-[#332A45]/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            kicker="Prinsip Kerja"
            title="Nilai Pengembangan Game Kami"
            description="Standar yang kami pegang dalam merancang mekanik permainan, estetika visual, dan kolaborasi bersama komunitas."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {STUDIO_VALUES.map((val) => (
              <div
                key={val.id}
                className="p-6 rounded-xl bg-[#201A2D] border border-[#332A45] flex flex-col justify-between"
              >
                <div>
                  <h3 className="text-lg font-display font-semibold text-[#F5F3FF]">
                    {val.title}
                  </h3>
                  <p className="text-xs text-[#C4B5FD] mt-0.5 mb-3">
                    {val.subtitle}
                  </p>
                  <p className="text-xs sm:text-sm text-[#A7A1B5] leading-relaxed">
                    {val.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Overview: Clean editorial cards without redundant icon containers */}
      <section className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          kicker="Kapabilitas Studio"
          title="Layanan Pengembangan & Desain 3D"
          description="Solusi end-to-end bagi kreator, studio mitra, dan brand yang ingin membangun pengalaman interaktif."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {SERVICES_DATA.slice(0, 3).map((service) => (
            <div
              key={service.id}
              className="p-6 sm:p-7 rounded-xl bg-[#171321] border border-[#332A45] hover:border-[#8B5CF6]/70 transition-colors flex flex-col justify-between"
            >
              <div className="space-y-3">
                <h3 className="text-lg font-display font-semibold text-[#F5F3FF]">
                  {service.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#A7A1B5] leading-relaxed">
                  {service.shortDescription}
                </p>
                <div className="pt-2 text-xs text-[#C4B5FD]">
                  Hasil: {service.deliverables[0]}
                </div>
              </div>

              <div className="pt-5 mt-4 border-t border-[#332A45]/70">
                <Link
                  to="/services"
                  className="inline-flex items-center gap-1.5 text-xs font-medium text-[#8B5CF6] hover:text-[#C4B5FD] transition-colors"
                >
                  <span>Selengkapnya</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Creative Workflow Section: Clean natural human numbering (01., 02., etc.) */}
      <section className="py-16 sm:py-24 bg-[#171321] border-t border-[#332A45]/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            kicker="Metodologi"
            title="Lima Tahapan Produksi Game"
            description="Alur kerja terstruktur dari perancangan mekanik awal hingga rilis dan pembaruan berkala."
          />

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {STUDIO_WORKFLOW.map((wf) => (
              <div
                key={wf.step}
                className="p-5 rounded-xl bg-[#201A2D] border border-[#332A45] flex flex-col justify-between space-y-3"
              >
                <div>
                  <div className="text-xs font-semibold text-[#8B5CF6] mb-1">
                    0{wf.step}. {wf.phase}
                  </div>
                  <h4 className="font-display font-semibold text-sm text-[#F5F3FF]">
                    {wf.title.split('(')[0]}
                  </h4>
                  <p className="text-xs text-[#A7A1B5] mt-2 leading-relaxed">
                    {wf.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Collaboration Section: Purposeful, crisp, no giant purple blobs */}
      <section className="py-16 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-xl bg-[#171321] border border-[#332A45] p-8 sm:p-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-[#F5F3FF]">
              Tertarik Berkolaborasi Bersama Tim Kami?
            </h2>
            <p className="text-sm text-[#A7A1B5] leading-relaxed">
              Kami terbuka untuk diskusi penjajakan kerja sama pengembangan game, konsultasi mekanik, atau pembuatan aset 3D voxel.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#8B5CF6] hover:bg-[#7C3AED] text-sm font-semibold text-white transition-colors"
            >
              <span>Hubungi Kami</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
