import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Check } from 'lucide-react';
import { SectionHeading } from '../components/SectionHeading';
import { SERVICES_DATA } from '../data/services';

export const Services: React.FC = () => {
  return (
    <div className="w-full py-12 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 sm:space-y-24">
        <SectionHeading
          kicker="Layanan Studio"
          title="Kapabilitas Pengembangan Game & Dunia Virtual"
          description="Dari perumusan mekanik hingga arsitektur dunia virtual, kami menyediakan layanan terintegrasi bagi kreator, studio, dan brand."
        />

        {/* Services List without excessive card nesting */}
        <div className="space-y-10">
          {SERVICES_DATA.map((service, index) => (
            <section
              key={service.id}
              id={service.id}
              className="p-7 sm:p-10 rounded-xl bg-[#171321] border border-[#332A45] scroll-mt-24"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* Left Description */}
                <div className="lg:col-span-7 space-y-4">
                  <div className="text-xs font-semibold text-[#8B5CF6]">
                    Layanan 0{index + 1}
                  </div>
                  <h3 className="text-xl sm:text-2xl font-display font-bold text-[#F5F3FF]">
                    {service.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#C4B5FD]">
                    {service.subtitle}
                  </p>
                  <p className="text-xs sm:text-sm text-[#A7A1B5] leading-relaxed">
                    {service.fullDescription}
                  </p>

                  <div className="pt-2 text-xs text-[#A7A1B5]">
                    <span className="font-semibold text-[#F5F3FF]">Alur Kerja: </span>
                    {service.processSummary}
                  </div>
                </div>

                {/* Right Deliverables */}
                <div className="lg:col-span-5 space-y-5 pt-4 lg:pt-0 lg:pl-6 border-t lg:border-t-0 lg:border-l border-[#332A45]/80">
                  <div>
                    <h4 className="font-semibold text-xs text-[#F5F3FF] tracking-wider uppercase mb-3">
                      Deliverables
                    </h4>
                    <ul className="space-y-2 text-xs">
                      {service.deliverables.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-[#A7A1B5] leading-relaxed">
                          <Check className="w-3.5 h-3.5 text-[#8B5CF6] shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold text-[11px] text-[#C4B5FD] tracking-wider uppercase mb-2">
                      Teknologi:
                    </h4>
                    <div className="flex flex-wrap gap-1.5">
                      {service.technologies.map((tech, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 rounded bg-[#201A2D] text-[11px] text-[#F5F3FF] border border-[#332A45]"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-2">
                    <Link
                      to={`/contact?subject=Inquiry ${encodeURIComponent(service.title)}`}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#8B5CF6] hover:text-[#C4B5FD] transition-colors"
                    >
                      <span>Konsultasikan Kebutuhan Ini</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            </section>
          ))}
        </div>

        {/* Bottom Banner */}
        <div className="p-8 sm:p-10 rounded-xl bg-[#171321] border border-[#332A45] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="space-y-1.5 max-w-lg">
            <h3 className="text-xl font-display font-bold text-[#F5F3FF]">
              Butuh Pengembangan Solusi Kustom?
            </h3>
            <p className="text-xs sm:text-sm text-[#A7A1B5]">
              Kami siap berdiskusi terkait riset rendering voxel, integrasi aset pihak ketiga, atau prototipe mekanik cepat.
            </p>
          </div>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#8B5CF6] hover:bg-[#7C3AED] text-xs font-semibold text-white transition-colors shrink-0"
          >
            <span>Hubungi Tim Studio</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
};
