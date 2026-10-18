import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  ArrowLeft,
  ArrowRight,
  ExternalLink,
  Calendar,
  Monitor,
  CheckCircle2,
  Users,
  Cpu,
  Layers,
  Sparkles,
  ShieldCheck,
} from 'lucide-react';
import { getGameBySlug, getGames } from '../lib/db';
import { Game } from '../types';
import { GameIllustration } from '../components/GameIllustration';
import { LoadingState } from '../components/ui/LoadingState';

export const GameDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [game, setGame] = useState<Game | null>(null);
  const [relatedGames, setRelatedGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadGameData() {
      if (!slug) return;
      try {
        setLoading(true);
        const data = await getGameBySlug(slug);
        setGame(data);

        if (data) {
          // Sync HTML Title for SEO
          document.title = `${data.title} — PT Indo Kreasi`;

          // Load related games
          const allPublished = await getGames({ status: 'published' });
          const related = allPublished
            .filter((g) => g.id !== data.id && (g.category === data.category || g.featured))
            .slice(0, 3);
          setRelatedGames(related);
        }
      } catch (err) {
        console.error('Error loading game detail:', err);
      } finally {
        setLoading(false);
      }
    }

    loadGameData();
    return () => {
      document.title = 'PT Indo Kreasi — Game Development Studio';
    };
  }, [slug]);

  if (loading) {
    return <LoadingState message="Memuat informasi game..." className="py-32" />;
  }

  // Graceful 404 state if game does not exist
  if (!game) {
    return (
      <div className="w-full py-24 max-w-lg mx-auto px-4 text-center space-y-4">
        <h1 className="text-2xl sm:text-3xl font-display font-bold text-[#F5F3FF]">
          Game Tidak Ditemukan
        </h1>
        <p className="text-sm text-[#A7A1B5]">
          Proyek dengan slug &quot;{slug}&quot; tidak ditemukan dalam katalog publik studio.
        </p>
        <div className="pt-2">
          <Link
            to="/games"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#8B5CF6] hover:bg-[#7C3AED] text-xs font-semibold text-white transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Kembali ke Portofolio Game</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full pb-20">
      {/* Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb" className="border-b border-[#332A45]/70 bg-[#09090F]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center gap-2 text-xs text-[#A7A1B5]">
          <Link to="/" className="hover:text-[#F5F3FF] transition-colors">
            Beranda
          </Link>
          <span className="text-[#332A45]">/</span>
          <Link to="/games" className="hover:text-[#F5F3FF] transition-colors">
            Portofolio Game
          </Link>
          <span className="text-[#332A45]">/</span>
          <span className="text-[#F5F3FF] font-medium truncate max-w-xs sm:max-w-md">
            {game.title}
          </span>
        </div>
      </nav>

      {/* Hero Showcase Banner */}
      <section className="bg-[#171321] border-b border-[#332A45]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Visual Cover / Banner */}
            <div className="lg:col-span-7">
              <div className="rounded-2xl overflow-hidden border border-[#332A45] aspect-[16/10] bg-[#09090F] shadow-xl">
                {game.banner_image_url || game.cover_image_url ? (
                  <img
                    src={game.banner_image_url || game.cover_image_url!}
                    alt={game.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <GameIllustration slug={game.slug} variant="banner" className="w-full h-full" />
                )}
              </div>
            </div>

            {/* Title & Core Overview */}
            <div className="lg:col-span-5 space-y-4">
              <div className="flex items-center gap-2 text-xs text-[#A7A1B5]">
                <span className="text-[#C4B5FD] font-semibold">{game.category}</span>
                <span aria-hidden="true" className="text-[#332A45]">·</span>
                <span className="capitalize">{game.developmentStage || (game.status === 'published' ? 'Katalog Aktif' : game.status)}</span>
              </div>

              <h1
                className="text-2xl sm:text-3xl lg:text-4xl font-display font-extrabold text-[#F5F3FF] tracking-tight leading-[1.15]"
                style={{ textWrap: 'balance' }}
              >
                {game.title}
              </h1>

              {game.tagline && (
                <p className="text-sm font-medium text-[#C4B5FD] leading-relaxed">
                  {game.tagline}
                </p>
              )}

              {game.short_description && (
                <p className="text-xs sm:text-sm text-[#A7A1B5] leading-relaxed">
                  {game.short_description}
                </p>
              )}

              {/* Specs Snapshot Table */}
              <div className="pt-3 border-t border-[#332A45]/70 space-y-2.5 text-xs">
                <div className="flex justify-between py-1 border-b border-[#332A45]/50">
                  <span className="text-[#A7A1B5] flex items-center gap-1.5">
                    <Monitor className="w-3.5 h-3.5 text-[#8B5CF6]" />
                    <span>Platform:</span>
                  </span>
                  <span className="text-[#F5F3FF] font-medium text-right">
                    {game.platform || (game.platforms ? game.platforms.join(', ') : 'Multi-platform')}
                  </span>
                </div>

                {game.playerMode && (
                  <div className="flex justify-between py-1 border-b border-[#332A45]/50">
                    <span className="text-[#A7A1B5] flex items-center gap-1.5">
                      <Users className="w-3.5 h-3.5 text-[#8B5CF6]" />
                      <span>Mode Permainan:</span>
                    </span>
                    <span className="text-[#F5F3FF] font-medium text-right">{game.playerMode}</span>
                  </div>
                )}

                <div className="flex justify-between py-1 border-b border-[#332A45]/50">
                  <span className="text-[#A7A1B5] flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-[#8B5CF6]" />
                    <span>Target Rilis:</span>
                  </span>
                  <span className="text-[#F5F3FF] font-medium text-right">
                    {game.targetRelease || game.release_date || 'Dalam Pengembangan'}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-3 flex flex-wrap items-center gap-3">
                <Link
                  to={`/contact?subject=${encodeURIComponent(`Penjajakan Kerjasama: ${game.title}`)}`}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#8B5CF6] hover:bg-[#7C3AED] text-xs font-semibold text-white transition-colors"
                >
                  <span>Diskusikan Proyek Ini</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>

                {game.external_url && (
                  <a
                    href={game.external_url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#201A2D] hover:bg-[#282138] border border-[#332A45] text-xs font-semibold text-[#F5F3FF] transition-colors"
                  >
                    <span>Kunjungi Demo</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Details */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Main Column */}
          <div className="lg:col-span-8 space-y-12">
            {/* Overview / Lore */}
            <section className="space-y-4">
              <h2 className="text-xl sm:text-2xl font-display font-bold text-[#F5F3FF]">
                Tentang Gameplay & Dunia Permainan
              </h2>
              <div className="text-sm text-[#A7A1B5] leading-relaxed space-y-3 whitespace-pre-line">
                <p>
                  {game.description || game.short_description || 'Deskripsi game sedang diperbarui oleh tim studio.'}
                </p>
                {game.longDescription && (
                  <p>{game.longDescription}</p>
                )}
              </div>
            </section>

            {/* Key Gameplay Features */}
            {game.keyFeatures && game.keyFeatures.length > 0 && (
              <section className="space-y-4">
                <h2 className="text-xl sm:text-2xl font-display font-bold text-[#F5F3FF]">
                  Fitur Unggulan Permainan
                </h2>
                <div className="space-y-3">
                  {game.keyFeatures.map((feature, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-xl bg-[#171321] border border-[#332A45] flex items-start gap-3"
                    >
                      <CheckCircle2 className="w-5 h-5 text-[#8B5CF6] shrink-0 mt-0.5" />
                      <p className="text-xs sm:text-sm text-[#F5F3FF] leading-relaxed">
                        {feature}
                      </p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Gallery / Concept Documentation */}
            {((game.gallery && game.gallery.length > 0) || (game.galleryImages && game.galleryImages.length > 0)) && (
              <section className="space-y-4">
                <h2 className="text-xl sm:text-2xl font-display font-bold text-[#F5F3FF]">
                  Dokumentasi & Galeri Konsep
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {(game.gallery || game.galleryImages)!.map((img, idx) => (
                    <div
                      key={idx}
                      className="p-5 rounded-xl bg-[#171321] border border-[#332A45] space-y-2 hover:border-[#8B5CF6]/60 transition-colors"
                    >
                      <div className="flex items-center justify-between text-[11px] text-[#C4B5FD] font-mono">
                        <span>Aset 0{idx + 1}</span>
                        {img.type && <span className="capitalize">{img.type}</span>}
                      </div>
                      <h4 className="text-sm font-display font-semibold text-[#F5F3FF]">
                        {img.title}
                      </h4>
                      {img.description && (
                        <p className="text-xs text-[#A7A1B5] leading-relaxed">
                          {img.description}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Collaboration Callout */}
            <div className="p-8 rounded-2xl bg-[#171321] border border-[#332A45] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
              <div className="space-y-2">
                <h3 className="text-lg font-display font-bold text-[#F5F3FF]">
                  Ingin Mengintegrasikan Brand atau Menjadi Mitra Penerbit?
                </h3>
                <p className="text-xs sm:text-sm text-[#A7A1B5]">
                  Kami menyediakan sesi live demo dan pembahasan teknis implementasi untuk calon mitra.
                </p>
              </div>
              <Link
                to={`/contact?subject=${encodeURIComponent(`Penjajakan Mitra: ${game.title}`)}`}
                className="shrink-0 px-5 py-2.5 rounded-xl bg-[#8B5CF6] hover:bg-[#7C3AED] text-xs font-semibold text-white transition-colors"
              >
                Hubungi Studio
              </Link>
            </div>
          </div>

          {/* Sidebar Specs & Metrics */}
          <div className="lg:col-span-4 space-y-6">
            {/* Numerical Stats */}
            {game.stats && game.stats.length > 0 && (
              <div className="p-6 rounded-xl bg-[#171321] border border-[#332A45] space-y-4">
                <h3 className="font-semibold text-xs text-[#F5F3FF] tracking-wider uppercase">
                  Metrik & Dimensi Proyek
                </h3>
                <div className="space-y-3">
                  {game.stats.map((stat, idx) => (
                    <div key={idx} className="flex justify-between py-1.5 border-b border-[#332A45]/50 text-xs">
                      <span className="text-[#A7A1B5]">{stat.label}</span>
                      <span className="text-[#F5F3FF] font-semibold font-mono">{stat.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Technical Stack */}
            {game.techStack && game.techStack.length > 0 && (
              <div className="p-6 rounded-xl bg-[#171321] border border-[#332A45] space-y-4">
                <div className="flex items-center gap-2">
                  <Cpu className="w-4 h-4 text-[#8B5CF6]" />
                  <h3 className="font-semibold text-xs text-[#F5F3FF] tracking-wider uppercase">
                    Arsitektur & Engine
                  </h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {game.techStack.map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded bg-[#201A2D] border border-[#332A45] text-[11px] text-[#C4B5FD] font-mono"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Studio Guarantee */}
            <div className="p-6 rounded-xl bg-[#171321] border border-[#332A45] space-y-3">
              <div className="flex items-center gap-2 text-xs font-semibold text-[#F5F3FF]">
                <ShieldCheck className="w-4 h-4 text-[#8B5CF6]" />
                <span>Standar Kualitas Studio</span>
              </div>
              <p className="text-xs text-[#A7A1B5] leading-relaxed">
                Seluruh proyek game PT Indo Kreasi dibangun di atas sistem kode deterministik, aset 3D teroptimasi polycount, dan diuji langsung bersama komunitas playtester terverifikasi.
              </p>
            </div>
          </div>
        </div>

        {/* Related Projects */}
        {relatedGames.length > 0 && (
          <div className="mt-16 pt-10 border-t border-[#332A45]">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-display font-bold text-[#F5F3FF]">
                Proyek Game Terkait Lainnya
              </h3>
              <Link
                to="/games"
                className="text-xs font-semibold text-[#8B5CF6] hover:text-[#C4B5FD] flex items-center gap-1"
              >
                <span>Semua Proyek</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedGames.map((rg) => (
                <Link
                  key={rg.id}
                  to={`/games/${rg.slug}`}
                  className="group p-5 rounded-xl bg-[#171321] border border-[#332A45] hover:border-[#8B5CF6] transition-colors"
                >
                  <div className="text-[11px] text-[#C4B5FD] font-medium">
                    {rg.category}
                  </div>
                  <h4 className="font-display font-semibold text-base text-[#F5F3FF] group-hover:text-white mt-1">
                    {rg.title}
                  </h4>
                  <p className="text-xs text-[#A7A1B5] mt-2 line-clamp-2 leading-relaxed">
                    {rg.short_description || rg.description}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
