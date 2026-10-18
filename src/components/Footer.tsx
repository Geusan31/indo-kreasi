import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Mail, MapPin, Clock, Github, Twitter, Youtube, Disc as Discord, Shield } from 'lucide-react';
import { getCompanyInfo } from '../lib/db';
import { CompanyInfo } from '../types';

export const Footer: React.FC = () => {
  const [company, setCompany] = useState<CompanyInfo | null>(null);

  useEffect(() => {
    async function loadInfo() {
      try {
        const data = await getCompanyInfo();
        setCompany(data);
      } catch (e) {
        console.warn('Error loading footer company info:', e);
      }
    }
    loadInfo();
    window.addEventListener('indokreasi_data_updated', loadInfo);
    return () => {
      window.removeEventListener('indokreasi_data_updated', loadInfo);
    };
  }, []);

  const companyName = company?.company_name || 'PT Indo Kreasi';
  const tagline = company?.tagline || 'Membangun Dunia Virtual & Pengalaman Game Berkualitas Tinggi';
  const email = company?.email || 'halo@indokreasi.id';
  const address = company?.address || 'Bandung & Jakarta, Indonesia';
  const socials = company?.social_links || {};

  return (
    <footer className="w-full bg-[#09090F] border-t border-[#332A45] text-[#A7A1B5] text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Studio Wordmark & Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="inline-flex items-center gap-2.5">
              <span className="font-display font-bold text-base text-[#F5F3FF]">
                {companyName}
              </span>
            </Link>

            <p className="text-xs leading-relaxed text-[#A7A1B5] max-w-sm">
              {tagline}. Pengembang game independen yang berfokus pada mekanik responsif, arsitektur dunia virtual, dan estetika blocky 3D.
            </p>

            <div className="pt-1 flex items-center gap-2.5">
              {socials.github && (
                <a
                  href={socials.github}
                  target="_blank"
                  rel="noreferrer"
                  className="w-8 h-8 rounded bg-[#171321] border border-[#332A45] flex items-center justify-center text-[#A7A1B5] hover:text-[#F5F3FF] hover:border-[#8B5CF6] transition-colors"
                  aria-label="GitHub PT Indo Kreasi"
                >
                  <Github className="w-3.5 h-3.5" />
                </a>
              )}
              {socials.twitter && (
                <a
                  href={socials.twitter}
                  target="_blank"
                  rel="noreferrer"
                  className="w-8 h-8 rounded bg-[#171321] border border-[#332A45] flex items-center justify-center text-[#A7A1B5] hover:text-[#F5F3FF] hover:border-[#8B5CF6] transition-colors"
                  aria-label="Twitter PT Indo Kreasi"
                >
                  <Twitter className="w-3.5 h-3.5" />
                </a>
              )}
              {socials.youtube && (
                <a
                  href={socials.youtube}
                  target="_blank"
                  rel="noreferrer"
                  className="w-8 h-8 rounded bg-[#171321] border border-[#332A45] flex items-center justify-center text-[#A7A1B5] hover:text-[#F5F3FF] hover:border-[#8B5CF6] transition-colors"
                  aria-label="YouTube PT Indo Kreasi"
                >
                  <Youtube className="w-3.5 h-3.5" />
                </a>
              )}
              {socials.discord && (
                <a
                  href={socials.discord}
                  target="_blank"
                  rel="noreferrer"
                  className="w-8 h-8 rounded bg-[#171321] border border-[#332A45] flex items-center justify-center text-[#A7A1B5] hover:text-[#F5F3FF] hover:border-[#8B5CF6] transition-colors"
                  aria-label="Discord PT Indo Kreasi"
                >
                  <Discord className="w-3.5 h-3.5" />
                </a>
              )}
            </div>
          </div>

          {/* Navigation Links */}
          <div className="space-y-3">
            <h3 className="font-semibold text-xs text-[#F5F3FF] tracking-wider uppercase">
              Halaman
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
                  Layanan
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-[#F5F3FF] transition-colors">
                  Kontak
                </Link>
              </li>
            </ul>
          </div>

          {/* Game Projects */}
          <div className="space-y-3">
            <h3 className="font-semibold text-xs text-[#F5F3FF] tracking-wider uppercase">
              Koleksi Game
            </h3>
            <ul className="space-y-2">
              <li>
                <Link to="/games/nusantara-realm" className="hover:text-[#F5F3FF] transition-colors">
                  Nusantara Realm
                </Link>
              </li>
              <li>
                <Link to="/games/skyblock-obby-mayhem" className="hover:text-[#F5F3FF] transition-colors">
                  Skyblock Obby
                </Link>
              </li>
              <li>
                <Link to="/games/mega-tycoon-cyber-nusantara" className="hover:text-[#F5F3FF] transition-colors">
                  Mega Tycoon
                </Link>
              </li>
              <li>
                <Link to="/games/ghost-hunter-kampung-misteri" className="hover:text-[#F5F3FF] transition-colors">
                  Ghost Hunter
                </Link>
              </li>
            </ul>
          </div>

          {/* Office Contact Info & Admin Access */}
          <div className="space-y-3">
            <h3 className="font-semibold text-xs text-[#F5F3FF] tracking-wider uppercase">
              Kontak & Portal
            </h3>
            <ul className="space-y-2.5">
              <li className="flex items-start gap-2">
                <Mail className="w-3.5 h-3.5 text-[#8B5CF6] shrink-0 mt-0.5" />
                <a href={`mailto:${email}`} className="hover:text-[#F5F3FF]">
                  {email}
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#8B5CF6] shrink-0 mt-0.5" />
                <span>{address}</span>
              </li>
              <li className="flex items-start gap-2">
                <Clock className="w-3.5 h-3.5 text-[#8B5CF6] shrink-0 mt-0.5" />
                <span>Senin – Jumat, 09:00 – 18:00 WIB</span>
              </li>
              <li className="pt-2 border-t border-[#332A45]/60">
                <Link
                  to="/admin"
                  className="inline-flex items-center gap-1.5 text-[11px] text-[#C4B5FD] hover:text-white transition-colors"
                >
                  <Shield className="w-3 h-3 text-[#8B5CF6]" />
                  <span>Portal Administrator CMS</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-[#332A45]/70 flex flex-col sm:flex-row items-center justify-between gap-4 text-[#A7A1B5]/70 text-[11px]">
          <p>
            © {new Date().getFullYear()} {companyName}. Hak cipta dilindungi undang-undang.
          </p>
          <p className="text-center sm:text-right">
            PT Indo Kreasi adalah studio pengembang independen. Pengalaman virtual dunia voxel dan karya game orisinal.
          </p>
        </div>
      </div>
    </footer>
  );
};
