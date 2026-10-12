import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Gamepad2, ArrowRight } from 'lucide-react';
import { COMPANY_CONFIG } from '../data/company';

interface NavLinkItem {
  name: string;
  path: string;
}

const NAV_LINKS: NavLinkItem[] = [
  { name: 'Beranda', path: '/' },
  { name: 'Portofolio Game', path: '/games' },
  { name: 'Tentang Kami', path: '/about' },
  { name: 'Layanan', path: '/services' },
  { name: 'Kontak', path: '/contact' },
];

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-[#09090F]/90 backdrop-blur-md border-b border-[#332A45]/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand / Logo */}
        <Link
          to="/"
          className="flex items-center gap-3 group focus:outline-none focus:ring-2 focus:ring-[#8B5CF6] rounded-lg p-1"
          aria-label="PT Indo Kreasi Beranda"
        >
          {/* Stylized 3D Block Icon */}
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#8B5CF6] to-[#6D28D9] p-0.5 shadow-[0_0_15px_rgba(139,92,246,0.4)] group-hover:shadow-[0_0_20px_rgba(139,92,246,0.6)] transition-all flex items-center justify-center">
            <div className="w-full h-full bg-[#171321] rounded-[6px] flex items-center justify-center relative overflow-hidden">
              {/* Isometric Cube Graphic */}
              <svg viewBox="0 0 24 24" className="w-5 h-5 text-[#C4B5FD] transform group-hover:scale-110 transition-transform">
                <polygon points="12,2 21,7 12,12 3,7" fill="#8B5CF6" />
                <polygon points="3,7 12,12 12,22 3,17" fill="#6D28D9" />
                <polygon points="12,12 21,7 21,17 12,22" fill="#A78BFA" />
              </svg>
            </div>
          </div>

          <div className="flex flex-col">
            <span className="font-display font-bold text-lg tracking-tight text-[#F5F3FF] group-hover:text-white transition-colors">
              INDO KREASI
            </span>
            <span className="text-[10px] font-mono tracking-widest text-[#A7A1B5] uppercase">
              GAME STUDIO
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8" aria-label="Navigasi Utama">
          {NAV_LINKS.map((link) => {
            const active = isActive(link.path);
            return (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-medium transition-colors relative py-1 focus:outline-none focus:ring-2 focus:ring-[#8B5CF6] rounded ${
                  active ? 'text-[#F5F3FF] font-semibold' : 'text-[#A7A1B5] hover:text-[#F5F3FF]'
                }`}
              >
                {link.name}
                {active && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#8B5CF6] to-[#C4B5FD] rounded-full" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Desktop CTA Action Button */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#8B5CF6] hover:bg-[#7C3AED] text-[#F5F3FF] text-sm font-semibold shadow-[0_4px_14px_rgba(139,92,246,0.35)] hover:shadow-[0_6px_20px_rgba(139,92,246,0.5)] transition-all active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-[#C4B5FD]"
          >
            <span>Mulai Kolaborasi</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex md:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2.5 rounded-lg text-[#A7A1B5] hover:text-[#F5F3FF] hover:bg-[#171321] border border-[#332A45] focus:outline-none focus:ring-2 focus:ring-[#8B5CF6]"
            aria-expanded={mobileMenuOpen}
            aria-label={mobileMenuOpen ? 'Tutup navigasi' : 'Buka navigasi'}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#171321] border-b border-[#332A45] px-4 pt-4 pb-6 space-y-3 animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="flex flex-col space-y-1">
            {NAV_LINKS.map((link) => {
              const active = isActive(link.path);
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-4 py-3 rounded-lg text-sm font-medium transition-colors flex items-center justify-between ${
                    active
                      ? 'bg-[#201A2D] text-[#F5F3FF] border-l-4 border-[#8B5CF6]'
                      : 'text-[#A7A1B5] hover:bg-[#201A2D]/60 hover:text-[#F5F3FF]'
                  }`}
                >
                  <span>{link.name}</span>
                  {active && <span className="w-1.5 h-1.5 rounded-full bg-[#8B5CF6]" />}
                </Link>
              );
            })}
          </div>

          <div className="pt-3 border-t border-[#332A45]/80">
            <Link
              to="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-lg bg-[#8B5CF6] text-[#F5F3FF] text-sm font-semibold shadow-md active:scale-98"
            >
              <span>Mulai Kolaborasi Proyek</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
