import React from 'react';
import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';

export const NotFound: React.FC = () => {
  return (
    <div className="w-full py-24 sm:py-32 flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center space-y-6 p-8 rounded-xl bg-[#171321] border border-[#332A45]">
        <div className="space-y-2">
          <div className="text-4xl sm:text-5xl font-display font-extrabold text-[#8B5CF6]">
            404
          </div>
          <h1 className="text-xl sm:text-2xl font-display font-bold text-[#F5F3FF]">
            Halaman Tidak Ditemukan
          </h1>
          <p className="text-xs sm:text-sm text-[#A7A1B5] leading-relaxed max-w-xs mx-auto">
            Halaman yang Anda tuju tidak tersedia atau telah dipindahkan.
          </p>
        </div>

        <div className="pt-2">
          <Link
            to="/"
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-[#8B5CF6] hover:bg-[#7C3AED] text-xs font-semibold text-white transition-colors"
          >
            <Home className="w-4 h-4" />
            <span>Kembali ke Beranda</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
