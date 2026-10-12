import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Check } from 'lucide-react';
import { GAMES_DATA } from '../data/games';
import { GameIllustration } from '../components/GameIllustration';

export const GameDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();

  const game = GAMES_DATA.find((g) => g.slug === slug);

  // Fallback for unknown slugs
  if (!game) {
    return (
      <div className="w-full py-24 max-w-lg mx-auto px-4 text-center space-y-4">
        <h1 className="text-2xl sm:text-3xl font-display font-bold text-[#F5F3FF]">
          Game Tidak Ditemukan
        </h1>
        <p className="text-sm text-[#A7A1B5]">
          Proyek dengan nama &quot;{slug}&quot; tidak ditemukan dalam data katalog studio.
        </p>
        <div className="pt-2">
          <Link
            to="/games"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#8B5CF6] hover:bg-[#7C3AED] text-xs font-semibold text-white transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Kembali ke Portofolio Game</span>
          </Link>
        </div>
      </div>
    );
  }

  const relatedGames = GAMES_DATA.filter((g) => g.id !== game.id).slice(0, 3);

  return (
    <div className="w-full pb-20">
      {/* Back navigation */}
      <div className="border-b border-[#332A45]/70 bg-[#09090F]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
          <Link
            to="/games"
            className="inline-flex items-center gap-1.5 text-xs text-[#A7A1B5] hover:text-[#F5F3FF] transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-[#8B5CF6]" />
            <span>Semua Proyek Game</span>
          </Link>
        </div>
      </div>

      {/* Hero Showcase */}
      <section className="bg-[#171321] border-b border-[#332A45]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Visual Cover */}
            <div className="lg:col-span-7">
              <div className="rounded-xl overflow-hidden border border-[#332A45] aspect-[16/10] bg-[#09090F]">
                <GameIllustration slug={game.slug} variant="banner" className="w-full h-full" />
              </div>
            </div>

            {/* Info */}
            <div className="lg:col-span-5 space-y-4">
              <div className="flex items-center gap-2 text-xs text-[#A7A1B5]">
                <span className="text-[#C4B5FD] font-medium">{game.category}</span>
                <span aria-hidden="true" className="text-[#332A45]">·</span>
                <span>{game.status}</span>
              </div>

              <h1
                className="text-2xl sm:text-3xl lg:text-4xl font-display font-extrabold text-[#F5F3FF] tracking-tight leading-[1.15]"
                style={{ textWrap: 'balance' }}
              >
                {game.title}
              </h1>

              <p className="text-sm text-[#C4B5FD]">
                {game.tagline}
              </p>

              <p className="text-xs sm:text-sm text-[#A7A1B5] leading-relaxed">
                {game.description}
              </p>

              {/* Specs Table */}
              <div className="pt-3 border-t border-[#332A45]/70 space-y-2 text-xs">
                <div className="flex justify-between py-1 border-b border-[#332A45]/50">
                  <span className="text-[#A7A1B5]">Platform:</span>
                  <span className="text-[#F5F3FF] font-medium">{game.platforms.join(', ')}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-[#332A45]/50">
                  <span className="text-[#A7A1B5]">Mode:</span>
                  <span className="text-[#F5F3FF] font-medium">{game.playerMode}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-[#A7A1B5]">Target Rilis:</span>
                  <span className="text-[#F5F3FF] font-medium">{game.targetRelease}</span>
                </div>
              </div>

              <div className="pt-2">
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#8B5CF6] hover:bg-[#7C3AED] text-xs font-semibold text-white transition-colors"
                >
                  <span>Ajukan Pertanyaan / Kolaborasi</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Details */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-8 space-y-10">
            {/* Overview */}
            <div className="space-y-3">
              <h2 className="text-xl font-display font-bold text-[#F5F3FF]">
                Tentang Gameplay & Dunia
              </h2>
              <p className="text-sm text-[#A7A1B5] leading-relaxed whitespace-pre-line">
                {game.longDescription}
              </p>
            </div>

            {/* Features */}
            <div className="space-y-3">
              <h2 className="text-xl font-display font-bold text-[#F5F3FF]">
                Fitur & Mekanik Utama
              </h2>
              <ul className="space-y-2.5">
                {game.keyFeatures.map((feat, idx) => (
                  <li
                    key={idx}
                    className="p-3.5 rounded-lg bg-[#171321] border border-[#332A45] flex items-start gap-3 text-xs sm:text-sm text-[#F5F3FF] leading-relaxed"
                  >
                    <Check className="w-4 h-4 text-[#8B5CF6] shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Documentation Concepts */}
            <div className="space-y-3">
              <h2 className="text-xl font-display font-bold text-[#F5F3FF]">
                Sudut Pandang Desain Lingkungan
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {game.galleryImages.map((img, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-lg bg-[#171321] border border-[#332A45] space-y-1.5"
                  >
                    <div className="text-[11px] text-[#C4B5FD] font-medium">
                      {img.type === 'environment' ? 'Tata Lingkungan' : img.type === 'gameplay' ? 'Mekanik Bermain' : 'Karakter'}
                    </div>
                    <h4 className="text-sm font-display font-semibold text-[#F5F3FF]">
                      {img.title}
                    </h4>
                    <p className="text-xs text-[#A7A1B5] leading-relaxed">
                      {img.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4 space-y-6">
            {game.stats && (
              <div className="p-5 rounded-lg bg-[#171321] border border-[#332A45] space-y-3">
                <h3 className="font-semibold text-xs text-[#F5F3FF] tracking-wider uppercase">
                  Spesifikasi Proyek
                </h3>
                <div className="space-y-2 text-xs">
                  {game.stats.map((stat, idx) => (
                    <div key={idx} className="flex justify-between py-1.5 border-b border-[#332A45]/50 last:border-0">
                      <span className="text-[#A7A1B5]">{stat.label}</span>
                      <span className="text-[#F5F3FF] font-medium">{stat.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="p-5 rounded-lg bg-[#171321] border border-[#332A45] space-y-2.5">
              <h3 className="font-semibold text-xs text-[#F5F3FF] tracking-wider uppercase">
                Teknologi
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {game.techStack.map((tech, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 rounded bg-[#201A2D] text-[11px] text-[#C4B5FD] border border-[#332A45]"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Related Projects */}
        <div className="mt-16 pt-10 border-t border-[#332A45]">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-display font-bold text-[#F5F3FF]">
              Proyek Game Lainnya
            </h3>
            <Link
              to="/games"
              className="text-xs font-semibold text-[#8B5CF6] hover:text-[#C4B5FD]"
            >
              Semua Proyek →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedGames.map((rg) => (
              <Link
                key={rg.id}
                to={`/games/${rg.slug}`}
                className="group p-5 rounded-lg bg-[#171321] border border-[#332A45] hover:border-[#8B5CF6] transition-colors"
              >
                <div className="text-[11px] text-[#C4B5FD]">
                  {rg.category}
                </div>
                <h4 className="font-display font-semibold text-base text-[#F5F3FF] group-hover:text-white mt-1">
                  {rg.title}
                </h4>
                <p className="text-xs text-[#A7A1B5] mt-2 line-clamp-2 leading-relaxed">
                  {rg.description}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
