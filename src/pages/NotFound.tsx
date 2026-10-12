import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Compass, ArrowLeft, Gamepad2 } from 'lucide-react';

export const NotFound: React.FC = () => {
  return (
    <div className="w-full py-24 sm:py-36 flex items-center justify-center px-4">
      <div className="max-w-lg w-full text-center space-y-8 p-8 sm:p-12 rounded-2xl bg-[#171321] border border-[#332A45] shadow-2xl relative overflow-hidden">
        {/* Glow behind 404 */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-[#8B5CF6]/20 rounded-full blur-3xl pointer-events-none" />

        {/* Isometric 404 Voxel Visual */}
        <div className="relative mx-auto w-32 h-32 flex items-center justify-center">
          <svg viewBox="0 0 120 120" className="w-full h-full text-[#8B5CF6]">
            {/* Voxel Glitched Cube */}
            <polygon points="60,20 100,42 60,65 20,42" fill="#8B5CF6" />
            <polygon points="20,42 60,65 60,105 20,82" fill="#4C1D95" />
            <polygon points="60,65 100,42 100,82 60,105" fill="#6D28D9" />
            {/* Missing void block */}
            <polygon points="50,45 70,35 90,45 70,55" fill="#09090F" stroke="#F43F5E" strokeWidth="1.5" strokeDasharray="3 3" />
          </svg>
        </div>

        <div className="space-y-3 relative z-10">
          <span className="font-mono text-xs uppercase tracking-widest text-[#F43F5E] font-semibold">
            STATUS 404 // VOID_COORDINATES
          </span>
          <h1 className="text-3xl sm:text-4xl font-display font-extrabold text-[#F5F3FF]">
            Halaman Di Luar Peta
          </h1>
          <p className="text-sm text-[#A7A1B5] leading-relaxed max-w-sm mx-auto">
            Koordinat virtual yang Anda tuju tidak ditemukan atau belum dibangun dalam dunia game kami.
          </p>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3 relative z-10">
          <Link
            to="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-[#8B5CF6] hover:bg-[#7C3AED] text-sm font-semibold text-white shadow-md transition-all focus:outline-none focus:ring-2 focus:ring-[#C4B5FD]"
          >
            <Home className="w-4 h-4" />
            <span>Kembali ke Beranda</span>
          </Link>

          <Link
            to="/games"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-[#201A2D] hover:bg-[#282138] border border-[#332A45] text-sm font-semibold text-[#A7A1B5] hover:text-[#F5F3FF] transition-all"
          >
            <Gamepad2 className="w-4 h-4 text-[#8B5CF6]" />
            <span>Katalog Game</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
