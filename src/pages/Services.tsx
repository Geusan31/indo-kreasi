import React from 'react';
import { Link } from 'react-router-dom';
import { Gamepad2, Cpu, Box, LayoutGrid, Globe, CheckCircle2, ArrowRight, MessageSquare } from 'lucide-react';
import { SectionHeading } from '../components/SectionHeading';
import { SERVICES_DATA } from '../data/services';

export const Services: React.FC = () => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Gamepad2':
        return <Gamepad2 className="w-6 h-6" />;
      case 'Cpu':
        return <Cpu className="w-6 h-6" />;
      case 'Box':
        return <Box className="w-6 h-6" />;
      case 'LayoutGrid':
        return <LayoutGrid className="w-6 h-6" />;
      case 'Globe':
      default:
        return <Globe className="w-6 h-6" />;
    }
  };

  return (
    <div className="w-full py-12 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 sm:space-y-24">
        {/* Header */}
        <SectionHeading
          kicker="LAYANAN PROFESIONAL"
          title="Kapabilitas & Solusi Pengembangan Game"
          description="Dari perancangan konsep gameplay hingga pembangunan dunia virtual berskala masif, kami menyediakan layanan terintegrasi bagi mitra kreatif, studio, dan brand."
        />

        {/* Services List with Rich Visual Presentation */}
        <div className="space-y-12">
          {SERVICES_DATA.map((service, index) => (
            <section
              key={service.id}
              id={service.id}
              className="p-8 sm:p-12 rounded-2xl bg-[#171321] border border-[#332A45] hover:border-[#8B5CF6]/60 transition-all duration-300 scroll-mt-24"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* Left Overview */}
                <div className="lg:col-span-7 space-y-5">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-[#201A2D] border border-[#332A45] flex items-center justify-center text-[#8B5CF6]">
                      {getIcon(service.iconName)}
                    </div>
                    <div>
                      <div className="text-xs font-mono text-[#C4B5FD] uppercase tracking-wider">
                        LAYANAN 0{index + 1}
                      </div>
                      <h3 className="text-2xl sm:text-3xl font-display font-bold text-[#F5F3FF]">
                        {service.title}
                      </h3>
                    </div>
                  </div>

                  <p className="text-sm font-mono text-[#C4B5FD]">
                    {service.subtitle}
                  </p>

                  <p className="text-base text-[#A7A1B5] leading-relaxed">
                    {service.fullDescription}
                  </p>

                  {/* Process note */}
                  <div className="p-4 rounded-xl bg-[#201A2D] border border-[#332A45]/80 text-xs text-[#A7A1B5] flex items-start gap-3">
                    <MessageSquare className="w-4 h-4 text-[#8B5CF6] shrink-0 mt-0.5" />
                    <p className="leading-relaxed">
                      <strong className="text-[#F5F3FF]">Alur Kerja: </strong>
                      {service.processSummary}
                    </p>
                  </div>
                </div>

                {/* Right Deliverables & Tech Specs */}
                <div className="lg:col-span-5 p-6 rounded-xl bg-[#201A2D] border border-[#332A45] space-y-6">
                  <div>
                    <h4 className="font-display font-bold text-sm text-[#F5F3FF] tracking-wider uppercase mb-3">
                      Deliverables Yang Diterima
                    </h4>
                    <ul className="space-y-2.5">
                      {service.deliverables.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2.5 text-xs text-[#A7A1B5] leading-relaxed">
                          <CheckCircle2 className="w-4 h-4 text-[#8B5CF6] shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-4 border-t border-[#332A45]/80">
                    <h4 className="font-display font-bold text-xs text-[#C4B5FD] tracking-wider uppercase mb-2">
                      Teknologi Pendukung:
                    </h4>
                    <div className="flex flex-wrap gap-1.5">
                      {service.technologies.map((tech, idx) => (
                        <span
                          key={idx}
                          className="px-2.5 py-1 rounded bg-[#171321] border border-[#332A45] text-[11px] font-mono text-[#F5F3FF]"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-2">
                    <Link
                      to={`/contact?subject=Inquiry ${encodeURIComponent(service.title)}`}
                      className="inline-flex items-center justify-center gap-2 w-full py-2.5 rounded-lg bg-[#8B5CF6] hover:bg-[#7C3AED] text-xs font-semibold text-white shadow-md transition-all"
                    >
                      <span>Konsultasikan Layanan Ini</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            </section>
          ))}
        </div>

        {/* Bottom Banner */}
        <div className="p-8 sm:p-12 rounded-2xl bg-gradient-to-r from-[#171321] to-[#201A2D] border border-[#332A45] flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl text-center sm:text-left">
            <h3 className="text-2xl font-display font-bold text-[#F5F3FF]">
              Memiliki Kebutuhan Kustom di Luar Paket di Atas?
            </h3>
            <p className="text-sm text-[#A7A1B5]">
              Kami terbiasa dengan integrasi tools eksperimental, riset rendering khusus, dan modifikasi pipeline 3D.
            </p>
          </div>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#8B5CF6] hover:bg-[#7C3AED] text-sm font-semibold text-white shrink-0 shadow-lg transition-all"
          >
            <span>Bicarakan Proyek Kustom</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
};
