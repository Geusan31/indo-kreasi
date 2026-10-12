import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Monitor, Layers, Calendar, CheckCircle, ExternalLink, Gamepad2, ArrowRight } from 'lucide-react';
import { GAMES_DATA } from '../data/games';
import { GameIllustration } from '../components/GameIllustration';

export const GameDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();

  const game = GAMES_DATA.find((g) => g.slug === slug);

  // Fallback for unknown slugs (Graceful Not-Found State for game slug)
  if (!game) {
    return (
      <div className="w-full py-24 sm:py-32 max-w-3xl mx-auto px-4 text-center space-y-6">
        <div className="w-16 h-16 rounded-2xl bg-[#171321] border border-[#332A45] flex items-center justify-center text-[#8B5CF6] mx-auto">
          <Gamepad2 className="w-8 h-8" />
        </div>
        <div className="space-y-2">
          <span className="font-mono text-xs uppercase tracking-widest text-[#C4B5FD]">
            ERROR // GAME_SLUG_NOT_FOUND
          </span>
          <h1 className="text-3xl sm:text-4xl font-display font-bold text-[#F5F3FF]">
            Game Tidak Ditemukan
          </h1>
          <p className="text-sm sm:text-base text-[#A7A1B5] max-w-md mx-auto">
            Proyek game dengan pengenal &quot;{slug}&quot; tidak terdaftar dalam basis data lokal portofolio PT Indo Kreasi.
          </p>
        </div>

        <div className="pt-4 flex justify-center">
          <Link
            to="/games"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-[#8B5CF6] hover:bg-[#7C3AED] text-sm font-semibold text-white shadow-lg transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Kembali ke Katalog Game</span>
          </Link>
        </div>
      </div>
    );
  }

  // Other games to explore
  const relatedGames = GAMES_DATA.filter((g) => g.id !== game.id).slice(0, 3);

  return (
    <div className="w-full pb-24">
      {/* Back link navigation */}
      <div className="border-b border-[#332A45]/60 bg-[#09090F]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link
            to="/games"
            className="inline-flex items-center gap-2 text-xs font-mono text-[#A7A1B5] hover:text-[#F5F3FF] transition-colors focus:outline-none"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-[#8B5CF6]" />
            <span>KEMBALI KE PORTOFOLIO</span>
          </Link>
        </div>
      </div>

      {/* Hero Banner with Artwork */}
      <section className="relative w-full bg-[#171321] border-b border-[#332A45]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Visual Header */}
            <div className="lg:col-span-7">
              <div className="rounded-2xl overflow-hidden border border-[#332A45] shadow-2xl aspect-[16/10] bg-[#09090F]">
                <GameIllustration slug={game.slug} variant="banner" className="w-full h-full" />
              </div>
            </div>

            {/* Header Content */}
            <div className="lg:col-span-5 space-y-5">
              <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-[#A7A1B5]">
                <span className="text-[#C4B5FD] font-semibold">{game.category}</span>
                <span aria-hidden="true" className="text-[#8B5CF6]">·</span>
                <span>{game.status}</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-[#F5F3FF] tracking-tight leading-[1.12]">
                {game.title}
              </h1>

              <p className="text-base text-[#C4B5FD] font-medium leading-relaxed">
                {game.tagline}
              </p>

              <p className="text-sm text-[#A7A1B5] leading-relaxed">
                {game.description}
              </p>

              {/* Quick Specs */}
              <div className="pt-4 border-t border-[#332A45]/80 space-y-2 text-xs">
                <div className="flex items-center justify-between py-1 border-b border-[#332A45]/40">
                  <span className="text-[#A7A1B5]">Platform Target:</span>
                  <span className="text-[#F5F3FF] font-medium">{game.platforms.join(', ')}</span>
                </div>
                <div className="flex items-center justify-between py-1 border-b border-[#332A45]/40">
                  <span className="text-[#A7A1B5]">Mode Pemain:</span>
                  <span className="text-[#F5F3FF] font-medium">{game.playerMode}</span>
                </div>
                <div className="flex items-center justify-between py-1">
                  <span className="text-[#A7A1B5]">Status Rilis:</span>
                  <span className="text-[#C4B5FD] font-mono font-medium">{game.targetRelease}</span>
                </div>
              </div>

              <div className="pt-2">
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-3 rounded-lg bg-[#8B5CF6] hover:bg-[#7C3AED] text-sm font-semibold text-white shadow-md transition-all"
                >
                  <span>Ajukan Uji Coba / Kolaborasi</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* In-depth Details & Key Features */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Main Column */}
          <div className="lg:col-span-8 space-y-12">
            {/* Overview Section */}
            <div className="space-y-4">
              <h2 className="text-2xl font-display font-bold text-[#F5F3FF]">
                Tentang Pengalaman Bermain
              </h2>
              <p className="text-base text-[#A7A1B5] leading-relaxed whitespace-pre-line">
                {game.longDescription}
              </p>
            </div>

            {/* Key Features List */}
            <div className="space-y-4">
              <h2 className="text-2xl font-display font-bold text-[#F5F3FF]">
                Fitur & Pilar Mekanik Utama
              </h2>
              <ul className="space-y-3">
                {game.keyFeatures.map((feat, idx) => (
                  <li
                    key={idx}
                    className="p-4 rounded-xl bg-[#171321] border border-[#332A45] flex items-start gap-3.5"
                  >
                    <CheckCircle className="w-5 h-5 text-[#8B5CF6] shrink-0 mt-0.5" />
                    <span className="text-sm text-[#F5F3FF] leading-relaxed">{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Gallery / Screenshot Concept Cards */}
            <div className="space-y-4">
              <h2 className="text-2xl font-display font-bold text-[#F5F3FF]">
                Eksplorasi Konsep & Sudut Pandang
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {game.galleryImages.map((img, idx) => (
                  <div
                    key={idx}
                    className="p-5 rounded-xl bg-[#201A2D] border border-[#332A45] space-y-2 flex flex-col justify-between"
                  >
                    <div>
                      <div className="text-[11px] font-mono uppercase tracking-wider text-[#C4B5FD] mb-1">
                        DOKUMENTASI // {img.type.toUpperCase()}
                      </div>
                      <h4 className="text-base font-display font-semibold text-[#F5F3FF]">
                        {img.title}
                      </h4>
                      <p className="text-xs text-[#A7A1B5] mt-1.5 leading-relaxed">
                        {img.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar Specs Column */}
          <div className="lg:col-span-4 space-y-6">
            {/* Project Stats */}
            {game.stats && (
              <div className="p-6 rounded-xl bg-[#171321] border border-[#332A45] space-y-4">
                <h3 className="font-display font-bold text-base text-[#F5F3FF] tracking-wider uppercase">
                  Metrik & Spesifikasi
                </h3>
                <div className="space-y-3">
                  {game.stats.map((stat, idx) => (
                    <div key={idx} className="pb-2.5 border-b border-[#332A45]/60 last:border-0 last:pb-0">
                      <div className="text-xs text-[#A7A1B5]">{stat.label}</div>
                      <div className="text-sm font-semibold font-mono text-[#F5F3FF] mt-0.5">
                        {stat.value}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tech Stack */}
            <div className="p-6 rounded-xl bg-[#171321] border border-[#332A45] space-y-3">
              <h3 className="font-display font-bold text-base text-[#F5F3FF] tracking-wider uppercase">
                Teknologi & Engine
              </h3>
              <div className="flex flex-wrap gap-2">
                {game.techStack.map((tech, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 rounded bg-[#201A2D] border border-[#332A45] text-xs font-mono text-[#C4B5FD]"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Studio Notice */}
            <div className="p-5 rounded-xl bg-[#201A2D]/80 border border-[#332A45] text-xs text-[#A7A1B5] space-y-2">
              <span className="font-mono text-[#C4B5FD] font-semibold block">
                STATUS KARYA
              </span>
              <p className="leading-relaxed">
                Aset dan konsep adalah karya intelektual orisinal PT Indo Kreasi. Untuk perizinan pameran, playtest tertutup, atau lisensi pengembangan, hubungi tim kami.
              </p>
            </div>
          </div>
        </div>

        {/* CTA to Explore Other Games */}
        <div className="mt-20 pt-12 border-t border-[#332A45]">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-2xl font-display font-bold text-[#F5F3FF]">
              Jelajahi Proyek Game Lainnya
            </h3>
            <Link
              to="/games"
              className="text-xs font-semibold text-[#8B5CF6] hover:text-[#C4B5FD] flex items-center gap-1"
            >
              <span>Semua Koleksi</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedGames.map((rg) => (
              <Link
                key={rg.id}
                to={`/games/${rg.slug}`}
                className="group p-5 rounded-xl bg-[#171321] border border-[#332A45] hover:border-[#8B5CF6] transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="text-[11px] font-mono text-[#C4B5FD] mb-1">
                    {rg.category}
                  </div>
                  <h4 className="font-display font-bold text-lg text-[#F5F3FF] group-hover:text-white">
                    {rg.title}
                  </h4>
                  <p className="text-xs text-[#A7A1B5] mt-2 line-clamp-2">
                    {rg.description}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-[#332A45]/60 flex items-center justify-between text-xs text-[#8B5CF6] font-semibold">
                  <span>Lihat Detail</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
