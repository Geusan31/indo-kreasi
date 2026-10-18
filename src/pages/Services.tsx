import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  CheckCircle2,
  Gamepad2,
  Cpu,
  Box,
  LayoutGrid,
  Globe,
  Wrench,
  ShieldCheck,
  Clock,
  Code2,
} from 'lucide-react';
import { SectionHeading } from '../components/SectionHeading';
import { getServices } from '../lib/db';
import { Service } from '../types';
import { LoadingState } from '../components/ui/LoadingState';

export const Services: React.FC = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadServicesData() {
      try {
        setLoading(true);
        // Public users only see is_active = true
        const data = await getServices({ activeOnly: true });
        setServices(data);
      } catch (err) {
        console.error('Error loading services:', err);
      } finally {
        setLoading(false);
      }
    }
    loadServicesData();
  }, []);

  const getIcon = (iconName: string | null | undefined) => {
    switch (iconName) {
      case 'Gamepad2':
        return <Gamepad2 className="w-5 h-5 text-[#8B5CF6]" />;
      case 'Cpu':
        return <Cpu className="w-5 h-5 text-[#8B5CF6]" />;
      case 'Box':
        return <Box className="w-5 h-5 text-[#8B5CF6]" />;
      case 'LayoutGrid':
        return <LayoutGrid className="w-5 h-5 text-[#8B5CF6]" />;
      case 'Globe':
        return <Globe className="w-5 h-5 text-[#8B5CF6]" />;
      default:
        return <Wrench className="w-5 h-5 text-[#8B5CF6]" />;
    }
  };

  if (loading) {
    return <LoadingState message="Memuat layanan studio..." className="py-32" />;
  }

  return (
    <div className="w-full py-12 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 sm:space-y-24">
        <SectionHeading
          kicker="Layanan Studio"
          title="Kapabilitas Pengembangan Game & Dunia Virtual"
          description="Dari perumusan mekanik hingga arsitektur dunia virtual, kami menyediakan layanan terintegrasi bagi pengembang, kreator, dan brand."
        />

        {/* Services List */}
        <div className="space-y-8">
          {services.map((service, index) => (
            <section
              key={service.id}
              id={service.slug}
              className="p-7 sm:p-10 rounded-2xl bg-[#171321] border border-[#332A45] scroll-mt-24 transition-colors hover:border-[#8B5CF6]/60"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* Left Description */}
                <div className="lg:col-span-8 space-y-4">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-[#201A2D] border border-[#332A45] flex items-center justify-center">
                      {getIcon(service.icon || service.iconName)}
                    </div>
                    <span className="text-xs font-semibold text-[#8B5CF6] font-mono">
                      LAYANAN 0{index + 1}
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-display font-bold text-[#F5F3FF]">
                    {service.title}
                  </h3>

                  {service.short_description && (
                    <p className="text-xs sm:text-sm font-medium text-[#C4B5FD]">
                      {service.short_description}
                    </p>
                  )}

                  <p className="text-xs sm:text-sm text-[#A7A1B5] leading-relaxed whitespace-pre-line">
                    {service.description || 'Deskripsi detail layanan sedang diperbarui.'}
                  </p>

                  {/* Deliverables Checklist */}
                  {service.deliverables && service.deliverables.length > 0 && (
                    <div className="pt-3 space-y-2.5">
                      <span className="text-xs font-semibold text-[#F5F3FF] uppercase tracking-wider block">
                        Deliverables & Output Kerja:
                      </span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {service.deliverables.map((item, dIdx) => (
                          <div key={dIdx} className="flex items-start gap-2 text-xs text-[#A7A1B5]">
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#8B5CF6] shrink-0 mt-0.5" />
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Tech stack chips */}
                  {service.technologies && service.technologies.length > 0 && (
                    <div className="pt-3 flex flex-wrap items-center gap-2">
                      <span className="text-[11px] text-[#A7A1B5]">Teknologi:</span>
                      {service.technologies.map((tech, tIdx) => (
                        <span
                          key={tIdx}
                          className="px-2 py-0.5 rounded bg-[#201A2D] border border-[#332A45] text-[11px] font-mono text-[#C4B5FD]"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Right Action & Inquire */}
                <div className="lg:col-span-4 space-y-4 pt-4 lg:pt-0 lg:pl-6 border-t lg:border-t-0 lg:border-l border-[#332A45]/80 flex flex-col justify-between h-full">
                  <div className="space-y-2 text-xs">
                    <span className="font-semibold text-[#F5F3FF] block uppercase tracking-wider text-[11px]">
                      Konsultasi Kebutuhan
                    </span>
                    <p className="text-[#A7A1B5] leading-relaxed">
                      Diskusikan kebutuhan spesifik, estimasi jadwal, dan pipeline produksi bersama tim engineer kami.
                    </p>
                    {service.processSummary && (
                      <div className="p-3 rounded-lg bg-[#201A2D] border border-[#332A45] text-[11px] text-[#C4B5FD] mt-3">
                        <span className="font-semibold block text-[#F5F3FF] mb-1">Alur Proses:</span>
                        {service.processSummary}
                      </div>
                    )}
                  </div>

                  <div className="pt-4">
                    <Link
                      to={`/contact?subject=${encodeURIComponent(`Konsultasi Layanan: ${service.title}`)}`}
                      className="w-full inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#8B5CF6] hover:bg-[#7C3AED] text-xs font-semibold text-white transition-colors"
                    >
                      <span>Minta Proposal / Jadwalkan Diskusi</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            </section>
          ))}
        </div>

        {/* Studio Guarantees & Work Standards */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-[#171321] border border-[#332A45] space-y-2.5">
            <ShieldCheck className="w-6 h-6 text-[#8B5CF6]" />
            <h4 className="font-display font-bold text-base text-[#F5F3FF]">
              Perlindungan Hak Kekayaan Intelektual
            </h4>
            <p className="text-xs text-[#A7A1B5] leading-relaxed">
              Semua kode sumber, aset 3D, dan dokumentasi desain dilindungi perjanjian kerahasiaan (NDA) serta diserahkan penuh kepada klien sesuai kesepakatan kontrak.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#171321] border border-[#332A45] space-y-2.5">
            <Code2 className="w-6 h-6 text-[#8B5CF6]" />
            <h4 className="font-display font-bold text-base text-[#F5F3FF]">
              Transparansi Repositori & Milestones
            </h4>
            <p className="text-xs text-[#A7A1B5] leading-relaxed">
              Kami bekerja melalui sistem version control terstruktur (Git), review pull request berkala, dan laporan sprint transparan di setiap fase proyek.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#171321] border border-[#332A45] space-y-2.5">
            <Clock className="w-6 h-6 text-[#8B5CF6]" />
            <h4 className="font-display font-bold text-base text-[#F5F3FF]">
              Respons Cepat & Penjadwalan Terukur
            </h4>
            <p className="text-xs text-[#A7A1B5] leading-relaxed">
              Tim komunikasi studio merespons pesan kerja dalam waktu maksimal 24 jam dan menjamin ketepatan target rilis melalui buffer QA yang matang.
            </p>
          </div>
        </section>

        {/* Bottom Banner */}
        <div className="p-8 sm:p-10 rounded-2xl bg-[#171321] border border-[#332A45] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="space-y-1.5 max-w-lg">
            <h3 className="text-xl sm:text-2xl font-display font-bold text-[#F5F3FF]">
              Butuh Pengembangan Solusi Kustom?
            </h3>
            <p className="text-xs sm:text-sm text-[#A7A1B5]">
              Kami siap berdiskusi terkait riset rendering voxel, integrasi aset pihak ketiga, atau prototipe mekanik cepat.
            </p>
          </div>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#8B5CF6] hover:bg-[#7C3AED] text-xs font-semibold text-white transition-colors shrink-0"
          >
            <span>Hubungi Tim Studio</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
};
