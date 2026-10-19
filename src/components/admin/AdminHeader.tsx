import React from 'react';
import { Menu, Database, ShieldCheck, User } from 'lucide-react';
import { useAuth } from '../../lib/AuthContext';
import { checkIsSupabaseConfigured } from '../../lib/supabase';
import { Link } from 'react-router-dom';

interface AdminHeaderProps {
  onOpenMobileMenu: () => void;
  title?: string;
}

export const AdminHeader: React.FC<AdminHeaderProps> = ({
  onOpenMobileMenu,
  title,
}) => {
  const { user, profile } = useAuth();
  const [connected, setConnected] = React.useState(checkIsSupabaseConfigured());

  React.useEffect(() => {
    const handleUpdate = () => setConnected(checkIsSupabaseConfigured());
    window.addEventListener('indokreasi_supabase_configured', handleUpdate);
    return () => window.removeEventListener('indokreasi_supabase_configured', handleUpdate);
  }, []);

  return (
    <header className="sticky top-0 z-30 h-16 bg-[#09090F]/90 backdrop-blur-md border-b border-[#332A45] px-4 sm:px-6 lg:px-8 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onOpenMobileMenu}
          className="lg:hidden p-2 rounded-lg text-[#A7A1B5] hover:text-[#F5F3FF] hover:bg-[#171321] border border-[#332A45]"
          aria-label="Buka navigasi admin"
        >
          <Menu className="w-5 h-5" />
        </button>
        {title && (
          <h1 className="font-display font-bold text-base sm:text-lg text-[#F5F3FF]">
            {title}
          </h1>
        )}
      </div>

      <div className="flex items-center gap-3 sm:gap-4 text-xs">
        {/* Supabase Connection Status Badge with Link to Settings */}
        <Link
          to="/admin/settings"
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-[11px] font-mono bg-[#171321] hover:bg-[#201A2D] border-[#332A45] hover:border-[#8B5CF6]/50 transition-all cursor-pointer"
          title="Klik untuk membuka pengaturan Supabase & Migrasi Data"
        >
          <Database className="w-3.5 h-3.5 text-[#8B5CF6]" />
          {connected ? (
            <span className="text-emerald-400 font-semibold flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              Supabase Terhubung
            </span>
          ) : (
            <span className="text-amber-400 font-semibold flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-amber-400"></span>
              Mode Lokal (Klik Migrasi)
            </span>
          )}
        </Link>

        {/* Admin Profile Link */}
        <Link
          to="/admin/profile"
          className="flex items-center gap-2 text-[#A7A1B5] hover:text-[#F5F3FF] transition-colors"
        >
          <div className="w-7 h-7 rounded-full bg-[#8B5CF6]/30 border border-[#8B5CF6]/60 flex items-center justify-center text-[#C4B5FD]">
            <User className="w-4 h-4" />
          </div>
          <span className="hidden sm:inline font-medium">
            {profile?.full_name || user?.email || 'Admin'}
          </span>
        </Link>
      </div>
    </header>
  );
};
