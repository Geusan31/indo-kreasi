import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Gamepad2, Box, Code, Cpu, Compass, Layers, CheckCircle2 } from 'lucide-react';
import { VoxelHeroScene } from '../components/VoxelHeroScene';
import { SectionHeading } from '../components/SectionHeading';
import { GameCard } from '../components/GameCard';
import { getGames, getServices, getHomepageSections } from '../lib/db';
import { Game, Service, HomepageSection } from '../types';
import { LoadingState } from '../components/ui/LoadingState';

export const Home: React.FC = () => {
  const [sections, setSections] = useState<Record<string, HomepageSection>>({});
  const [featuredGames, setFeaturedGames] = useState<Game[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    try {
      const [secData, gamesData, srvData] = await Promise.all([
        getHomepageSections(),
        getGames({ status: 'published', featuredOnly: true }),
        getServices({ activeOnly: true }),
      ]);

      const secMap: Record<string, HomepageSection> = {};
      secData.forEach((s) => {
        secMap[s.section_key] = s;
      });

      let gamesToDisplay = gamesData;
      if (gamesToDisplay.length === 0) {
        gamesToDisplay = await getGames({ status: 'published' });
      }

      setSections(secMap);
      setFeaturedGames(gamesToDisplay);
      setServices(srvData);
    } catch (err) {
      console.error('Error loading homepage data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
    window.addEventListener('indokreasi_data_updated', loadData);
    return () => {
      window.removeEventListener('indokreasi_data_updated', loadData);
    };
  }, []);

  if (loading) {
    return <LoadingState message="Memuat beranda PT Indo Kreasi..." />;
  }

  const hero = sections['hero'];
  const featuredSec = sections['featured_games'];
  const aboutSec = sections['about_preview'];
  const servicesSec = sections['services'];
  const ctaSec = sections['cta'];

  const workflowSteps = [
    {
      num: '01',
      phase: 'Ideasi & Desain',
      title: 'Konsep & Game Design Document (GDD)',
      desc: 'Merumuskan premis gameplay, target audiens, pacing, dan arsitektur teknis sebelum produksi dimulai.',
    },
    {
      num: '02',
      phase: 'Validasi Cepat',
      title: 'Greybox & Prototipe Mekanik',
      desc: 'Membangun arena greybox kasar untuk menguji responsivitas kontrol, jump physics, dan core game loop.',
    },
    {
      num: '03',
      phase: 'Identitas Visual',
      title: 'Pemodelan Aset 3D & Lingkungan Voxel',
      desc: 'Merakit karakter blocky berkarakter, prop modular, rigging animasi, dan tata cahaya atmosferik.',
    },
    {
      num: '04',
      phase: 'Rekayasa Teknis',
      title: 'Integrasi Multi-Platform & Optimasi FPS',
      desc: 'Implementasi kode modular, sinkronisasi multiplayer low-latency, serta tuning performa lintas perangkat.',
    },
    {
      num: '05',
      phase: 'Rilis & Pembaruan',
      title: 'Playtesting Komprehensif & LiveOps',
      desc: 'Uji bersama komunitas pemain, perbaikan bug, peluncuran publik, dan siklus update berkala.',
    },
  ];

  return (
    <div className="w-full">
      {/* 1. Hero Section */}
      {hero && hero.is_visible !== false && (
        <section className="relative pt-10 pb-16 sm:pt-16 sm:pb-24 border-b border-[#332A45]/80 bg-[#09090F]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
              <div className="lg:col-span-7 space-y-6 text-left">
                {hero.subtitle && (
                  <p className="text-xs font-semibold text-[#C4B5FD] tracking-wide uppercase">
                    {hero.subtitle}
                  </p>
                )}

                <h1
                  className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-[#F5F3FF] tracking-tight leading-[1.14]"
                  style={{ textWrap: 'balance' }}
                >
                  {hero.title || 'Membangun Dunia Virtual dengan Mekanik Presisi & Estetika Voxel'}
                </h1>

                <p className="text-base sm:text-lg text-[#A7A1B5] max-w-2xl leading-relaxed">
                  {hero.description ||
                    'PT Indo Kreasi merancang game berkarakter kuat, obby kompetitif, dan simulasi dunia virtual. Kami mengedepankan kontrol responsif dan optimasi aset 3D untuk pengalaman bermain yang memuaskan.'}
                </p>

                <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                  <Link
                    to={hero.button_url || '/games'}
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#8B5CF6] hover:bg-[#7C3AED] text-[#F5F3FF] font-semibold text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C4B5FD]"
                  >
                    <Gamepad2 className="w-4 h-4" />
                    <span>{hero.button_text || 'Lihat Portofolio Game'}</span>
                    <ArrowRight className="w-4 h-4 ml-0.5" />
                  </Link>

                  <Link
                    to="/services"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#171321] hover:bg-[#201A2D] text-[#F5F3FF] border border-[#332A45] font-semibold text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8B5CF6]"
                  >
                    <Box className="w-4 h-4 text-[#8B5CF6]" />
                    <span>Layanan Studio</span>
                  </Link>
                </div>

                {/* Studio Highlights Bar */}
                <div className="pt-6 border-t border-[#332A45]/70 grid grid-cols-3 gap-6 max-w-md text-xs">
                  <div>
                    <div className="text-xl font-display font-bold text-[#F5F3FF]">
                      6 Judul
                    </div>
                    <div className="text-[#A7A1B5] mt-0.5">Katalog Aktif</div>
                  </div>
                  <div>
                    <div className="text-xl font-display font-bold text-[#F5F3FF]">Cross-Platform</div>
                    <div className="text-[#A7A1B5] mt-0.5">PC & Mobile</div>
                  </div>
                  <div>
                    <div className="text-xl font-display font-bold text-[#F5F3FF]">Voxel 3D</div>
                    <div className="text-[#A7A1B5] mt-0.5">Fokus Visual</div>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-5 flex justify-center">
                <VoxelHeroScene />
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 2. Featured Games Section */}
      {featuredSec && featuredSec.is_visible !== false && (
        <section className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <SectionHeading
              kicker={featuredSec.subtitle || 'Proyek Pilihan'}
              title={featuredSec.title || 'Karya Game Terbaru Studio'}
              description={featuredSec.description || 'Eksplorasi proyek game unggulan kami.'}
              className="mb-0"
            />

            <Link
              to={featuredSec.button_url || '/games'}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#8B5CF6] hover:text-[#C4B5FD] transition-colors self-start md:self-end"
            >
              <span>{featuredSec.button_text || 'Buka Semua Game'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredGames.map((game) => (
              <GameCard key={game.id} game={game} />
            ))}
          </div>
        </section>
      )}

      {/* 3. Studio Values / Philosophy Section */}
      {aboutSec && aboutSec.is_visible !== false && (
        <section className="py-16 sm:py-24 bg-[#171321] border-y border-[#332A45]/80">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeading
              kicker={aboutSec.subtitle || 'Prinsip Kerja'}
              title={aboutSec.title || 'Nilai Pengembangan Game Kami'}
              description={aboutSec.description || 'Standar yang kami pegang dalam merancang mekanik permainan dan membangun dunia virtual.'}
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { title: 'Kreativitas Berakar', sub: 'Rooted Creativity', desc: 'Menyalurkan narasi lokal dan imajinasi ke dalam konstruksi dunia virtual berkarakter kuat.' },
                { title: 'Presisi Mekanik', sub: 'Gameplay Precision', desc: 'Sebelum visual dipoles, kontrol karakter, timing, dan loop permainan harus terasa menyenangkan.' },
                { title: 'Estetika Voxel', sub: 'Stylized Craftsmanship', desc: 'Geometri balok sebagai kanvas seni modular dengan performa tinggi lintas perangkat.' },
                { title: 'Dialog Komunitas', sub: 'Player Dialogue', desc: 'Mendengarkan masukan pemain dari sesi playtest dan terus menyempurnakan game secara berkala.' },
              ].map((val, idx) => (
                <div key={idx} className="p-6 rounded-xl bg-[#201A2D] border border-[#332A45] flex flex-col justify-between">
                  <div>
                    <h3 className="text-lg font-display font-semibold text-[#F5F3FF]">{val.title}</h3>
                    <p className="text-xs text-[#C4B5FD] mt-0.5 mb-2.5">{val.sub}</p>
                    <p className="text-xs text-[#A7A1B5] leading-relaxed">{val.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 text-center">
              <Link
                to={aboutSec.button_url || '/about'}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#8B5CF6] hover:text-[#C4B5FD]"
              >
                <span>{aboutSec.button_text || 'Pelajari Profil Lengkap Kami'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* 4. Creative Process & Production Pipeline */}
      <section className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          kicker="Alur Kerja Studio"
          title="Pipeline Produksi Game Berstandar Industri"
          description="Metodologi terstruktur kami dari tahap riset konsep awal hingga peluncuran versi stabil."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {workflowSteps.map((step) => (
            <div
              key={step.num}
              className="p-5 rounded-xl bg-[#171321] border border-[#332A45] flex flex-col justify-between relative group hover:border-[#8B5CF6]/70 transition-colors"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-display font-extrabold text-[#8B5CF6]">
                    {step.num}
                  </span>
                  <span className="text-[11px] font-mono text-[#A7A1B5]">
                    {step.phase}
                  </span>
                </div>
                <h4 className="text-sm font-display font-semibold text-[#F5F3FF]">
                  {step.title}
                </h4>
                <p className="text-xs text-[#A7A1B5] leading-relaxed">
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Services Overview Section */}
      {servicesSec && servicesSec.is_visible !== false && (
        <section className="py-16 sm:py-24 bg-[#171321] border-t border-[#332A45]/80">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
              <SectionHeading
                kicker={servicesSec.subtitle || 'Kapabilitas Studio'}
                title={servicesSec.title || 'Layanan Pengembangan & Desain 3D'}
                description={servicesSec.description || 'Solusi end-to-end bagi kreator, studio mitra, dan brand.'}
                className="mb-0"
              />

              <Link
                to="/services"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#8B5CF6] hover:text-[#C4B5FD] transition-colors self-start md:self-end"
              >
                <span>{servicesSec.button_text || 'Lihat Seluruh Layanan'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {services.slice(0, 3).map((service) => (
                <div
                  key={service.id}
                  className="p-6 rounded-xl bg-[#201A2D] border border-[#332A45] hover:border-[#8B5CF6]/70 transition-colors flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <h3 className="text-lg font-display font-semibold text-[#F5F3FF]">
                      {service.title}
                    </h3>
                    <p className="text-xs text-[#A7A1B5] leading-relaxed line-clamp-3">
                      {service.short_description || service.description || ''}
                    </p>
                  </div>
                  <div className="pt-4 mt-3 border-t border-[#332A45]/70">
                    <Link
                      to="/services"
                      className="inline-flex items-center gap-1 text-xs font-medium text-[#8B5CF6] hover:text-[#C4B5FD]"
                    >
                      <span>Pelajari Layanan</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 6. Collaboration CTA Banner */}
      {ctaSec && ctaSec.is_visible !== false && (
        <section className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl bg-[#171321] border border-[#332A45] p-8 sm:p-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-2 max-w-xl">
              <h2 className="text-2xl sm:text-3xl font-display font-bold text-[#F5F3FF]">
                {ctaSec.title || 'Tertarik Berkolaborasi Bersama Tim Kami?'}
              </h2>
              <p className="text-sm text-[#A7A1B5] leading-relaxed">
                {ctaSec.description ||
                  'Kami terbuka untuk diskusi penjajakan kerja sama pengembangan game, konsultasi mekanik, atau pembuatan aset 3D voxel kustom.'}
              </p>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <Link
                to={ctaSec.button_url || '/contact'}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#8B5CF6] hover:bg-[#7C3AED] text-sm font-semibold text-white transition-colors"
              >
                <span>{ctaSec.button_text || 'Hubungi Kami'}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};
