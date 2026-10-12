import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, MapPin, Clock, ArrowUpRight, Github, Twitter, Youtube, Disc as Discord } from 'lucide-react';
import { COMPANY_CONFIG } from '../data/company';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-[#09090F] border-t border-[#332A45] text-[#A7A1B5] text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Column 1: Studio Brand & Identity */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-[#8B5CF6] flex items-center justify-center p-0.5">
                <div className="w-full h-full bg-[#171321] rounded-[6px] flex items-center justify-center">
                  <svg viewBox="0 0 24 24" className="w-4 h-4 text-[#C4B5FD]">
                    <polygon points="12,2 21,7 12,12 3,7" fill="#8B5CF6" />
                    <polygon points="3,7 12,12 12,22 3,17" fill="#6D28D9" />
                    <polygon points="12,12 21,7 21,17 12,22" fill="#A78BFA" />
                  </svg>
                </div>
              </div>
              <div className="flex flex-col">
                <span className="font-display font-bold text-base text-[#F5F3FF]">
                  {COMPANY_CONFIG.name}
                </span>
                <span className="text-[10px] font-mono tracking-widest text-[#A7A1B5] uppercase">
                  GAME DEVELOPMENT STUDIO
                </span>
              </div>
            </Link>

            <p className="text-sm leading-relaxed text-[#A7A1B5] max-w-sm">
              {COMPANY_CONFIG.tagline}. Kami mengembangkan pengalaman dunia virtual, mekanik game responsif, dan estetika blocky/voxel orisinal yang menghubungkan komunitas pemain.
            </p>

            {/* Social channels */}
            <div className="pt-2 flex items-center gap-3">
              <a
                href={COMPANY_CONFIG.socials.github}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-lg bg-[#171321] border border-[#332A45] flex items-center justify-center text-[#A7A1B5] hover:text-[#F5F3FF] hover:border-[#8B5CF6] transition-colors"
                aria-label="GitHub PT Indo Kreasi"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href={COMPANY_CONFIG.socials.twitter}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-lg bg-[#171321] border border-[#332A45] flex items-center justify-center text-[#A7A1B5] hover:text-[#F5F3FF] hover:border-[#8B5CF6] transition-colors"
                aria-label="Twitter PT Indo Kreasi"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href={COMPANY_CONFIG.socials.youtube}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-lg bg-[#171321] border border-[#332A45] flex items-center justify-center text-[#A7A1B5] hover:text-[#F5F3FF] hover:border-[#8B5CF6] transition-colors"
                aria-label="YouTube PT Indo Kreasi"
              >
                <Youtube className="w-4 h-4" />
              </a>
              <a
                href={COMPANY_CONFIG.socials.discord}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-lg bg-[#171321] border border-[#332A45] flex items-center justify-center text-[#A7A1B5] hover:text-[#F5F3FF] hover:border-[#8B5CF6] transition-colors"
                aria-label="Discord PT Indo Kreasi"
              >
                <Discord className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2: Navigasi Cepat */}
          <div className="space-y-3">
            <h3 className="font-display font-semibold text-sm text-[#F5F3FF] tracking-wider uppercase">
              Halaman Utama
            </h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="hover:text-[#F5F3FF] transition-colors">
                  Beranda
                </Link>
              </li>
              <li>
                <Link to="/games" className="hover:text-[#F5F3FF] transition-colors">
                  Portofolio Game
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-[#F5F3FF] transition-colors">
                  Tentang Studio
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-[#F5F3FF] transition-colors">
                  Layanan & Kapabilitas
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-[#F5F3FF] transition-colors">
                  Kontak & Kolaborasi
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Game Pilihan */}
          <div className="space-y-3">
            <h3 className="font-display font-semibold text-sm text-[#F5F3FF] tracking-wider uppercase">
              Koleksi Game
            </h3>
            <ul className="space-y-2">
              <li>
                <Link to="/games/nusantara-realm" className="hover:text-[#F5F3FF] transition-colors flex items-center gap-1">
                  <span>Nusantara Realm</span>
                  <ArrowUpRight className="w-3 h-3 text-[#8B5CF6]" />
                </Link>
              </li>
              <li>
                <Link to="/games/skyblock-obby-mayhem" className="hover:text-[#F5F3FF] transition-colors flex items-center gap-1">
                  <span>Skyblock Obby</span>
                  <ArrowUpRight className="w-3 h-3 text-[#8B5CF6]" />
                </Link>
              </li>
              <li>
                <Link to="/games/mega-tycoon-cyber-nusantara" className="hover:text-[#F5F3FF] transition-colors flex items-center gap-1">
                  <span>Mega Tycoon</span>
                  <ArrowUpRight className="w-3 h-3 text-[#8B5CF6]" />
                </Link>
              </li>
              <li>
                <Link to="/games/ghost-hunter-kampung-misteri" className="hover:text-[#F5F3FF] transition-colors flex items-center gap-1">
                  <span>Ghost Hunter</span>
                  <ArrowUpRight className="w-3 h-3 text-[#8B5CF6]" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Kontak Studio */}
          <div className="space-y-3">
            <h3 className="font-display font-semibold text-sm text-[#F5F3FF] tracking-wider uppercase">
              Hubungi Kami
            </h3>
            <ul className="space-y-2.5 text-xs">
              <li className="flex items-start gap-2">
                <Mail className="w-4 h-4 text-[#8B5CF6] shrink-0 mt-0.5" />
                <a href={`mailto:${COMPANY_CONFIG.email}`} className="hover:text-[#F5F3FF] underline decoration-[#8B5CF6]/50">
                  {COMPANY_CONFIG.email}
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#8B5CF6] shrink-0 mt-0.5" />
                <span>{COMPANY_CONFIG.location}</span>
              </li>
              <li className="flex items-start gap-2">
                <Clock className="w-4 h-4 text-[#8B5CF6] shrink-0 mt-0.5" />
                <span>{COMPANY_CONFIG.workingHours}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Disclaimer & Copyright */}
        <div className="mt-12 pt-8 border-t border-[#332A45]/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#A7A1B5]/80">
          <p>
            © {new Date().getFullYear()} {COMPANY_CONFIG.legalName}. Hak cipta dilindungi undang-undang.
          </p>
          <p className="text-center sm:text-right text-[11px] max-w-lg">
            Situs ini merupakan profil resmi dan showcase portofolio kreatif independen PT Indo Kreasi. Terinspirasi oleh estetika game virtual world dan blocky 3D.
          </p>
        </div>
      </div>
    </footer>
  );
};
