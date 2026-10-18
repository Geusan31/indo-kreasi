import React from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Gamepad2,
  Wrench,
  Home,
  Building2,
  Mail,
  Image,
  User,
  Settings,
  LogOut,
  ExternalLink,
  X,
} from 'lucide-react';
import { useAuth } from '../../lib/AuthContext';
import { useToast } from '../ui/Toast';

interface AdminSidebarProps {
  mobileOpen?: boolean;
  onCloseMobile?: () => void;
}

export const AdminSidebar: React.FC<AdminSidebarProps> = ({
  mobileOpen = false,
  onCloseMobile,
}) => {
  const { signOut, user } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut();
    showToast('Berhasil keluar dari sesi admin', 'info');
    navigate('/admin/login');
  };

  const navItems = [
    { label: 'Dashboard', path: '/admin', icon: LayoutDashboard, end: true },
    { label: 'Kelola Games', path: '/admin/games', icon: Gamepad2 },
    { label: 'Kelola Layanan', path: '/admin/services', icon: Wrench },
    { label: 'Konten Homepage', path: '/admin/homepage', icon: Home },
    { label: 'Profil Perusahaan', path: '/admin/company', icon: Building2 },
    { label: 'Pesan Masuk (Inquiries)', path: '/admin/inquiries', icon: Mail },
    { label: 'Pustaka Media', path: '/admin/media', icon: Image },
    { label: 'Profil Admin', path: '/admin/profile', icon: User },
    { label: 'Pengaturan & Supabase', path: '/admin/settings', icon: Settings },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {mobileOpen && (
        <div
          onClick={onCloseMobile}
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-64 bg-[#171321] border-r border-[#332A45] flex flex-col justify-between transition-transform duration-200 lg:translate-x-0 ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div>
          {/* Brand Header */}
          <div className="h-18 px-5 border-b border-[#332A45] flex items-center justify-between">
            <Link to="/admin" className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#8B5CF6] flex items-center justify-center p-0.5">
                <div className="w-full h-full bg-[#171321] rounded-[6px] flex items-center justify-center">
                  <Gamepad2 className="w-4 h-4 text-[#C4B5FD]" />
                </div>
              </div>
              <div className="flex flex-col">
                <span className="font-display font-bold text-sm tracking-tight text-[#F5F3FF]">
                  INDO KREASI
                </span>
                <span className="text-[10px] text-[#A7A1B5] uppercase font-mono">
                  ADMIN CMS
                </span>
              </div>
            </Link>

            {onCloseMobile && (
              <button
                onClick={onCloseMobile}
                className="lg:hidden p-1 rounded text-[#A7A1B5] hover:text-white"
                aria-label="Tutup sidebar"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>

          {/* Navigation Links */}
          <nav className="p-3 space-y-1 overflow-y-auto max-h-[calc(100vh-14rem)]">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.end}
                onClick={onCloseMobile}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-medium transition-colors ${
                    isActive
                      ? 'bg-[#201A2D] text-[#F5F3FF] border border-[#8B5CF6]/40'
                      : 'text-[#A7A1B5] hover:text-[#F5F3FF] hover:bg-[#201A2D]/50'
                  }`
                }
              >
                <item.icon className="w-4 h-4 text-[#8B5CF6] shrink-0" />
                <span className="truncate">{item.label}</span>
              </NavLink>
            ))}
          </nav>
        </div>

        {/* Footer Area */}
        <div className="p-3 border-t border-[#332A45] space-y-2">
          <Link
            to="/"
            target="_blank"
            className="flex items-center justify-between px-3 py-2 rounded-lg text-xs text-[#A7A1B5] hover:text-[#F5F3FF] hover:bg-[#201A2D]/50 transition-colors"
          >
            <span className="flex items-center gap-2">
              <ExternalLink className="w-3.5 h-3.5 text-[#8B5CF6]" />
              <span>Lihat Web Publik</span>
            </span>
            <span className="text-[10px] text-[#C4B5FD] font-mono">↗</span>
          </Link>

          <button
            type="button"
            onClick={handleLogout}
            className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium text-red-400 hover:text-red-300 hover:bg-red-950/20 transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Keluar (Logout)</span>
          </button>

          {user && (
            <div className="px-3 pt-1 text-[11px] text-[#A7A1B5] truncate">
              User: <span className="text-[#F5F3FF] font-mono">{user.email}</span>
            </div>
          )}
        </div>
      </aside>
    </>
  );
};
