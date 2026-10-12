import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Check } from 'lucide-react';
import { SectionHeading } from '../components/SectionHeading';
import { COMPANY_CONFIG, STUDIO_VISION, STUDIO_MISSION, STUDIO_VALUES, STUDIO_WORKFLOW } from '../data/company';

export const About: React.FC = () => {
  return (
    <div className="w-full py-12 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 sm:space-y-24">
        {/* Profile & Narrative */}
        <section>
          <SectionHeading
            kicker="Profil Studio"
            title="Mengenal PT Indo Kreasi"
            description="Studio pengembangan game independen Indonesia yang berfokus pada mekanik permainan yang solid dan arsitektur dunia virtual blocky 3D."
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            <div className="lg:col-span-7 space-y-4 text-sm sm:text-base text-[#A7A1B5] leading-relaxed">
              <p>
                Didirikan pada tahun {COMPANY_CONFIG.foundedYear} dengan basis tim di {COMPANY_CONFIG.location}, <strong className="text-[#F5F3FF] font-semibold">{COMPANY_CONFIG.name}</strong> didorong oleh hasrat menciptakan karya game berdaya pikat tinggi melalui medium geometri blok dan dunia virtual.
              </p>
              <p>
                Kami memadukan pendekatan rekayasa kode yang terstruktur dengan perancangan level yang matang. Setiap proyek kami diuji secara berulang untuk memastikan responsivitas pergerakan karakter, kestabilan performa di berbagai spesifikasi perangkat, serta loop kepuasan pemain.
              </p>
              <p>
                Bagi kami, kualitas gameplay dan orisinalitas karya adalah tolok ukur utama keberhasilan setiap proyek yang kami kembangkan.
              </p>
            </div>

            {/* Fact Sheet */}
            <div className="lg:col-span-5 p-6 rounded-xl bg-[#171321] border border-[#332A45] space-y-4">
              <h3 className="font-semibold text-xs text-[#F5F3FF] tracking-wider uppercase">
                Informasi Studio
              </h3>

              <div className="space-y-3 text-xs">
                <div className="flex justify-between py-1.5 border-b border-[#332A45]/50">
                  <span className="text-[#A7A1B5]">Nama Resmi:</span>
                  <span className="text-[#F5F3FF] font-medium">{COMPANY_CONFIG.legalName}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-[#332A45]/50">
                  <span className="text-[#A7A1B5]">Tahun Berdiri:</span>
                  <span className="text-[#F5F3FF] font-medium">{COMPANY_CONFIG.foundedYear}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-[#332A45]/50">
                  <span className="text-[#A7A1B5]">Lokasi:</span>
                  <span className="text-[#F5F3FF] font-medium">{COMPANY_CONFIG.location}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-[#332A45]/50">
                  <span className="text-[#A7A1B5]">Fokus:</span>
                  <span className="text-[#F5F3FF] font-medium">Game Development & Voxel Worlds</span>
                </div>
                <div className="flex justify-between py-1.5">
                  <span className="text-[#A7A1B5]">Bahasa:</span>
                  <span className="text-[#F5F3FF] font-medium">Bahasa Indonesia & English</span>
                </div>
              </div>

              <div className="pt-2">
                <Link
                  to="/contact"
                  className="w-full inline-flex items-center justify-center gap-1.5 py-2.5 rounded-lg bg-[#201A2D] hover:bg-[#282138] border border-[#332A45] text-xs font-semibold text-[#F5F3FF] transition-colors"
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
          <div className="p-7 rounded-xl bg-[#171321] border border-[#332A45] space-y-3">
            <h3 className="font-display font-semibold text-lg text-[#F5F3FF]">
              {STUDIO_VISION.title}
            </h3>
            <p className="text-xs sm:text-sm text-[#A7A1B5] leading-relaxed">
              {STUDIO_VISION.statement}
            </p>
          </div>

          <div className="p-7 rounded-xl bg-[#171321] border border-[#332A45] space-y-3">
            <h3 className="font-display font-semibold text-lg text-[#F5F3FF]">
              Misi Perusahaan
            </h3>
            <ul className="space-y-2.5 pt-1">
              {STUDIO_MISSION.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#A7A1B5] leading-relaxed">
                  <Check className="w-4 h-4 text-[#8B5CF6] shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Studio Values */}
        <section>
          <SectionHeading
            kicker="Nilai Studio"
            title="Prinsip Inti Perusahaan"
            description="Pedoman yang dipegang tim dalam menentukan arah desain, pengembangan kode, dan komunikasi bersama mitra."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {STUDIO_VALUES.map((val) => (
              <div
                key={val.id}
                className="p-6 rounded-xl bg-[#171321] border border-[#332A45] space-y-2"
              >
                <h4 className="font-display font-semibold text-base text-[#F5F3FF]">
                  {val.title}
                </h4>
                <div className="text-xs text-[#C4B5FD]">
                  {val.subtitle}
                </div>
                <p className="text-xs text-[#A7A1B5] mt-1.5 leading-relaxed">
                  {val.description}
                </p>
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
            {STUDIO_WORKFLOW.map((wf) => (
              <div
                key={wf.step}
                className="p-6 rounded-xl bg-[#171321] border border-[#332A45] flex flex-col md:flex-row md:items-start justify-between gap-6"
              >
                <div className="space-y-1.5 max-w-xl">
                  <div className="text-xs font-semibold text-[#8B5CF6]">
                    0{wf.step}. {wf.phase}
                  </div>
                  <h4 className="font-display font-semibold text-base text-[#F5F3FF]">
                    {wf.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-[#A7A1B5] leading-relaxed">
                    {wf.description}
                  </p>
                </div>

                <div className="shrink-0 space-y-1 text-xs text-[#A7A1B5] md:text-right border-t md:border-t-0 md:border-l border-[#332A45] pt-3 md:pt-0 md:pl-6">
                  <span className="font-medium text-[#C4B5FD] block mb-1">
                    Deliverables:
                  </span>
                  {wf.deliverables.map((del, i) => (
                    <div key={i}>• {del}</div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};
