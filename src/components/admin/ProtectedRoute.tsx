import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../lib/AuthContext';
import { LoadingState } from '../ui/LoadingState';
import { ShieldAlert } from 'lucide-react';
import { Link } from 'react-router-dom';

export const ProtectedRoute: React.FC = () => {
  const { user, isAdmin, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-[#09090F] flex items-center justify-center">
        <LoadingState message="Memverifikasi autentikasi administrator..." />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/admin/login" replace />;
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-[#09090F] flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-[#171321] border border-[#332A45] rounded-xl p-8 text-center space-y-4">
          <div className="w-12 h-12 rounded-xl bg-red-950/40 border border-red-500/40 text-red-400 flex items-center justify-center mx-auto">
            <ShieldAlert className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-display font-bold text-[#F5F3FF]">
            Akses Ditolak
          </h2>
          <p className="text-xs text-[#A7A1B5]">
            Akun Anda ({user.email}) tidak memiliki hak akses sebagai administrator untuk mengelola konten website.
          </p>
          <div className="pt-2">
            <Link
              to="/"
              className="inline-flex px-4 py-2 text-xs font-semibold rounded-lg bg-[#8B5CF6] text-white hover:bg-[#7C3AED]"
            >
              Kembali ke Beranda
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return <Outlet />;
};
