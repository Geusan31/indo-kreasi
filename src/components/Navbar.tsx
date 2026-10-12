import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ArrowRight } from 'lucide-react';
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
    <header className="sticky top-0 z-50 w-full bg-[#09090F]/95 backdrop-blur-md border-b border-[#332A45]/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        {/* Brand Zone: Clean single-line wordmark with refined architectural emblem */}
        <Link
          to="/"
          className="flex items-center gap-3 whitespace-nowrap shrink-0 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8B5CF6] rounded"
          aria-label="PT Indo Kreasi Beranda"
        >
          <div className="w-8 h-8 rounded bg-[#171321] border border-[#332A45] flex items-center justify-center transition-colors group-hover:border-[#8B5CF6]">
            {/* Geometric Studio Glyph */}
            <svg viewBox="0 0 20 20" className="w-4 h-4" fill="none" stroke="currentColor">
              <polygon points="10,2 17,6 10,10 3,6" fill="#8B5CF6" stroke="#8B5CF6" strokeWidth="0.8" />
              <polygon points="3,6 10,10 10,18 3,14" fill="#171321" stroke="#A78BFA" strokeWidth="0.8" />
              <polygon points="10,10 17,6 17,14 10,18" fill="#201A2D" stroke="#C4B5FD" strokeWidth="0.8" />
            </svg>
          </div>
          <span className="font-display font-bold text-lg tracking-tight text-[#F5F3FF]">
            {COMPANY_CONFIG.name}
          </span>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8" aria-label="Navigasi Utama">
          {NAV_LINKS.map((link) => {
            const active = isActive(link.path);
            return (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm tracking-normal whitespace-nowrap transition-colors relative py-1 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#8B5CF6] ${
                  active
                    ? 'text-[#F5F3FF] font-semibold'
                    : 'text-[#A7A1B5] hover:text-[#F5F3FF]'
                }`}
              >
                {link.name}
                {active && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#8B5CF6]" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Single Primary Action */}
        <div className="hidden md:flex items-center">
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#8B5CF6] hover:bg-[#7C3AED] text-[#F5F3FF] text-xs font-semibold whitespace-nowrap transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C4B5FD]"
          >
            <span>Mulai Kolaborasi</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Mobile Hamburger Toggle */}
        <div className="flex md:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg text-[#A7A1B5] hover:text-[#F5F3FF] hover:bg-[#171321] border border-[#332A45] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8B5CF6]"
            aria-expanded={mobileMenuOpen}
            aria-label={mobileMenuOpen ? 'Tutup menu navigasi' : 'Buka menu navigasi'}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer (No thick left border, clean surface) */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#171321] border-b border-[#332A45] px-4 py-4 space-y-2">
          {NAV_LINKS.map((link) => {
            const active = isActive(link.path);
            return (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-3 py-2.5 rounded-lg text-sm transition-colors ${
                  active
                    ? 'bg-[#201A2D] text-[#F5F3FF] font-medium'
                    : 'text-[#A7A1B5] hover:bg-[#201A2D]/50 hover:text-[#F5F3FF]'
                }`}
              >
                {link.name}
              </Link>
            );
          })}

          <div className="pt-3 border-t border-[#332A45]/80">
            <Link
              to="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg bg-[#8B5CF6] text-[#F5F3FF] text-xs font-semibold"
            >
              <span>Mulai Kolaborasi</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
