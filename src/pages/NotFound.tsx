import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Gamepad2, ArrowLeft } from 'lucide-react';

export const NotFound: React.FC = () => {
  return (
    <div className="w-full py-20 sm:py-32 flex items-center justify-center px-4">
      <div className="max-w-lg w-full text-center space-y-8 p-8 sm:p-12 rounded-2xl bg-[#171321] border border-[#332A45] shadow-2xl">
        {/* Isometric 404 Voxel Block Graphic */}
        <div className="w-32 h-32 mx-auto flex items-center justify-center">
          <svg viewBox="0 0 160 160" className="w-full h-full">
            {/* Top Plane of Floating Block */}
            <polygon points="80,25 130,55 80,85 30,55" fill="#3B2A5E" stroke="#8B5CF6" strokeWidth="1.5" />
            {/* Left Plane */}
            <polygon points="30,55 80,85 80,135 30,105" fill="#1C142E" stroke="#52387A" strokeWidth="1" />
            {/* Right Plane */}
            <polygon points="80,85 130,55 130,105 80,135" fill="#281B43" stroke="#52387A" strokeWidth="1" />

            {/* Glowing 404 Number on Face */}
            <text x="80" y="70" fill="#E9D5FF" fontSize="24" fontFamily="monospace" fontWeight="bold" textAnchor="middle">
              404
            </text>
          </svg>
        </div>

        <div className="space-y-3">
          <div className="text-xs font-mono font-semibold text-[#8B5CF6] uppercase tracking-widest">
            Koordinat Tidak Ditemukan
          </div>
          <h1 className="text-2xl sm:text-3xl font-display font-extrabold text-[#F5F3FF]">
            Balok Voxel di Luar Jangkauan
          </h1>
          <p className="text-xs sm:text-sm text-[#A7A1B5] leading-relaxed max-w-sm mx-auto">
            Halaman yang Anda tuju tidak tersedia atau telah dipindahkan ke sektor lain dalam arsitektur studio.
          </p>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            to="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-[#8B5CF6] hover:bg-[#7C3AED] text-xs font-semibold text-white transition-colors"
          >
            <Home className="w-4 h-4" />
            <span>Kembali ke Beranda</span>
          </Link>

          <Link
            to="/games"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#201A2D] hover:bg-[#282138] border border-[#332A45] text-xs font-semibold text-[#F5F3FF] transition-colors"
          >
            <Gamepad2 className="w-4 h-4 text-[#8B5CF6]" />
            <span>Katalog Game</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
