import React from 'react';
import { Link } from 'react-router-dom';
import { Target, Compass, Sparkles, Gamepad2, Box, Cpu, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { SectionHeading } from '../components/SectionHeading';
import { COMPANY_CONFIG, STUDIO_VISION, STUDIO_MISSION, STUDIO_VALUES, STUDIO_WORKFLOW } from '../data/company';

export const About: React.FC = () => {
  return (
    <div className="w-full py-12 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20 sm:space-y-28">
        {/* Header & Studio Intro */}
        <section>
          <SectionHeading
            kicker="PROFIL STUDIO"
            title="Mengenal PT Indo Kreasi"
            description="Sebuah studio pengembangan game independen Indonesia yang mendedikasikan diri untuk merancang dunia virtual imersif, mekanik bermain yang solid, dan estetika blocky/voxel yang kaya karakter."
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7 space-y-5 text-base sm:text-lg text-[#A7A1B5] leading-relaxed">
              <p>
                Didirikan pada tahun {COMPANY_CONFIG.foundedYear} dengan basis di {COMPANY_CONFIG.location}, <strong className="text-[#F5F3FF] font-semibold">{COMPANY_CONFIG.name}</strong> lahir dari keyakinan bahwa estetika balok dan dunia virtual bukanlah sekadar tren sesaat, melainkan medium ekspresi seni baru yang memikat jutaan imajinasi lintas generasi.
              </p>
              <p>
                Kami memadukan pendekatan rekayasa perangkat lunak yang disiplin dengan eksplorasi kreatif bebas batas. Setiap proyek kami melewati iterasi gameplay intensif untuk memastikan kontrol terasa intuitif, loop progresi memuaskan, dan dunia yang kami bangun memiliki identitas orisinal.
              </p>
              <p>
                Bagi kami, kesenangan pemain (player joy) dan integritas karya adalah prioritas mutlak di setiap baris kode dan setiap poligon yang kami susun.
              </p>
            </div>

            {/* Quick Fact Sheet (Editable Facts, No fake awards) */}
            <div className="lg:col-span-5 p-6 sm:p-8 rounded-2xl bg-[#171321] border border-[#332A45] space-y-5">
              <div className="font-mono text-xs uppercase tracking-widest text-[#C4B5FD] font-semibold">
                FAKTA & PARAMETER STUDIO
              </div>

              <div className="space-y-4 text-sm">
                <div className="flex justify-between py-2 border-b border-[#332A45]/60">
                  <span className="text-[#A7A1B5]">Nama Resmi:</span>
                  <span className="text-[#F5F3FF] font-medium text-right">{COMPANY_CONFIG.legalName}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-[#332A45]/60">
                  <span className="text-[#A7A1B5]">Tahun Berdiri:</span>
                  <span className="text-[#F5F3FF] font-medium">{COMPANY_CONFIG.foundedYear}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-[#332A45]/60">
                  <span className="text-[#A7A1B5]">Lokasi Tim:</span>
                  <span className="text-[#F5F3FF] font-medium">{COMPANY_CONFIG.location}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-[#332A45]/60">
                  <span className="text-[#A7A1B5]">Fokus Industri:</span>
                  <span className="text-[#C4B5FD] font-mono font-medium">Game Development & Virtual Worlds</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-[#A7A1B5]">Bahasa Kerja:</span>
                  <span className="text-[#F5F3FF] font-medium">Bahasa Indonesia & English</span>
                </div>
              </div>

              <div className="pt-2">
                <Link
                  to="/contact"
                  className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-lg bg-[#201A2D] hover:bg-[#282138] border border-[#332A45] text-xs font-semibold text-[#F5F3FF] transition-all"
                >
                  <span>Hubungi Kantor Studio</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#8B5CF6]" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Vision & Mission Section */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Vision */}
          <div className="p-8 sm:p-10 rounded-2xl bg-[#171321] border border-[#332A45] space-y-4 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-[#201A2D] border border-[#332A45] flex items-center justify-center text-[#8B5CF6]">
                <Target className="w-6 h-6" />
              </div>
              <span className="font-mono text-xs uppercase tracking-widest text-[#C4B5FD] font-semibold block">
                ARAH STRATEGIS
              </span>
              <h3 className="text-2xl font-display font-bold text-[#F5F3FF]">
                {STUDIO_VISION.title}
              </h3>
              <p className="text-base text-[#A7A1B5] leading-relaxed">
                {STUDIO_VISION.statement}
              </p>
            </div>
          </div>

          {/* Mission */}
          <div className="p-8 sm:p-10 rounded-2xl bg-[#171321] border border-[#332A45] space-y-4">
            <div className="w-12 h-12 rounded-xl bg-[#201A2D] border border-[#332A45] flex items-center justify-center text-[#8B5CF6]">
              <Compass className="w-6 h-6" />
            </div>
            <span className="font-mono text-xs uppercase tracking-widest text-[#C4B5FD] font-semibold block">
              KOMITMEN UTAMA
            </span>
            <h3 className="text-2xl font-display font-bold text-[#F5F3FF]">
              Misi Perusahaan
            </h3>
            <ul className="space-y-3 pt-2">
              {STUDIO_MISSION.map((item, idx) => (
                <li key={idx} className="flex items-start gap-3 text-sm text-[#A7A1B5] leading-relaxed">
                  <CheckCircle2 className="w-4 h-4 text-[#8B5CF6] shrink-0 mt-1" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Studio Values */}
        <section>
          <SectionHeading
            kicker="NILAI & BUDAYA"
            title="Prinsip Inti Studio"
            description="Empat nilai utama yang menjadi pedoman tim dalam menentukan arah desain, kode, dan komunikasi harian."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {STUDIO_VALUES.map((val) => (
              <div
                key={val.id}
                className="p-6 rounded-xl bg-[#171321] border border-[#332A45] space-y-3"
              >
                <div className="w-10 h-10 rounded-lg bg-[#201A2D] border border-[#332A45] flex items-center justify-center text-[#8B5CF6]">
                  {val.iconName === 'Sparkles' && <Sparkles className="w-5 h-5" />}
                  {val.iconName === 'Gamepad2' && <Gamepad2 className="w-5 h-5" />}
                  {val.iconName === 'Box' && <Box className="w-5 h-5" />}
                  {val.iconName === 'Users' && <Cpu className="w-5 h-5" />}
                </div>
                <h4 className="font-display font-bold text-lg text-[#F5F3FF]">
                  {val.title}
                </h4>
                <div className="text-xs font-mono text-[#C4B5FD]">
                  {val.subtitle}
                </div>
                <p className="text-xs sm:text-sm text-[#A7A1B5] leading-relaxed">
                  {val.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Development Philosophy & Workflow */}
        <section>
          <SectionHeading
            kicker="FILOSOFI KREATIF"
            title="Metodologi Produksi Game Kami"
            description="Dari ide mentah hingga produk matang yang siap dimainkan bersama komunitas."
          />

          <div className="space-y-4">
            {STUDIO_WORKFLOW.map((wf) => (
              <div
                key={wf.step}
                className="p-6 sm:p-8 rounded-xl bg-[#171321] border border-[#332A45] flex flex-col md:flex-row md:items-center justify-between gap-6"
              >
                <div className="space-y-2 max-w-2xl">
                  <div className="flex items-center gap-3 font-mono text-xs">
                    <span className="text-[#8B5CF6] font-bold text-base">0{wf.step}</span>
                    <span className="text-[#332A45]">|</span>
                    <span className="text-[#C4B5FD] uppercase tracking-wider">{wf.phase}</span>
                  </div>
                  <h4 className="font-display font-bold text-xl text-[#F5F3FF]">
                    {wf.title}
                  </h4>
                  <p className="text-sm text-[#A7A1B5] leading-relaxed">
                    {wf.description}
                  </p>
                </div>

                <div className="shrink-0 space-y-1.5 md:text-right border-t md:border-t-0 md:border-l border-[#332A45] pt-4 md:pt-0 md:pl-6">
                  <span className="text-[11px] font-mono text-[#C4B5FD] uppercase tracking-wider block">
                    Deliverables:
                  </span>
                  {wf.deliverables.map((del, i) => (
                    <div key={i} className="text-xs text-[#A7A1B5]">
                      • {del}
                    </div>
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
