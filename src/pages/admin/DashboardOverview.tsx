import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Gamepad2,
  Wrench,
  Mail,
  Plus,
  ArrowRight,
  Clock,
  Eye,
  CheckCircle2,
  FileText,
  AlertCircle,
} from 'lucide-react';
import { getDashboardStats } from '../../lib/db';
import { DashboardStats } from '../../types';
import { LoadingState } from '../../components/ui/LoadingState';
import { SupabaseSyncBanner } from '../../components/admin/SupabaseSyncBanner';

export const DashboardOverview: React.FC = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStats() {
      try {
        setLoading(true);
        const data = await getDashboardStats();
        setStats(data);
      } catch (err) {
        console.error('Error loading dashboard stats:', err);
      } finally {
        setLoading(false);
      }
    }

    loadStats();
    // Listen for data update events
    window.addEventListener('indokreasi_data_updated', loadStats);
    return () => {
      window.removeEventListener('indokreasi_data_updated', loadStats);
    };
  }, []);

  if (loading || !stats) {
    return <LoadingState message="Memuat statistik dashboard..." />;
  }

  const statCards = [
    {
      label: 'Total Proyek Game',
      value: stats.totalGames,
      sub: `${stats.publishedGames} Diterbitkan · ${stats.draftGames} Draft`,
      icon: Gamepad2,
      color: 'text-[#8B5CF6]',
      bg: 'bg-[#8B5CF6]/10',
      link: '/admin/games',
    },
    {
      label: 'Game Diterbitkan',
      value: stats.publishedGames,
      sub: 'Tampil di website publik',
      icon: CheckCircle2,
      color: 'text-emerald-400',
      bg: 'bg-emerald-500/10',
      link: '/admin/games',
    },
    {
      label: 'Layanan Aktif',
      value: stats.totalServices,
      sub: 'Ditawarkan ke klien & brand',
      icon: Wrench,
      color: 'text-cyan-400',
      bg: 'bg-cyan-500/10',
      link: '/admin/services',
    },
    {
      label: 'Pesan Masuk Baru',
      value: stats.newInquiries,
      sub: `Dari total ${stats.totalInquiries} pesan formulir`,
      icon: Mail,
      color: stats.newInquiries > 0 ? 'text-amber-400' : 'text-[#C4B5FD]',
      bg: stats.newInquiries > 0 ? 'bg-amber-500/10' : 'bg-[#201A2D]',
      link: '/admin/inquiries',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Page Title & Quick Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-display font-bold text-[#F5F3FF]">
            Dashboard Ringkasan
          </h1>
          <p className="text-xs text-[#A7A1B5] mt-1">
            Status real-time konten dan aktivitas PT Indo Kreasi.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Link
            to="/admin/games/new"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#8B5CF6] hover:bg-[#7C3AED] text-xs font-semibold text-white transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Tambah Game</span>
          </Link>
          <Link
            to="/admin/services/new"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#201A2D] hover:bg-[#282138] border border-[#332A45] text-xs font-semibold text-[#F5F3FF] transition-colors"
          >
            <Plus className="w-3.5 h-3.5 text-[#8B5CF6]" />
            <span>Tambah Layanan</span>
          </Link>
        </div>
      </div>

      {/* Prominent Supabase Integration & Migration Banner */}
      <SupabaseSyncBanner />

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((c, i) => (
          <Link
            key={i}
            to={c.link}
            className="p-5 rounded-xl bg-[#171321] border border-[#332A45] hover:border-[#8B5CF6]/60 transition-colors flex flex-col justify-between"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs text-[#A7A1B5] font-medium">{c.label}</span>
              <div className={`p-2 rounded-lg ${c.bg} ${c.color}`}>
                <c.icon className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-4">
              <div className="text-3xl font-display font-bold text-[#F5F3FF]">
                {c.value}
              </div>
              <div className="text-[11px] text-[#A7A1B5] mt-1">
                {c.sub}
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Two Columns: Recent Games & Recent Inquiries */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Games */}
        <div className="p-6 rounded-xl bg-[#171321] border border-[#332A45] space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Gamepad2 className="w-4 h-4 text-[#8B5CF6]" />
              <h2 className="font-display font-semibold text-sm text-[#F5F3FF]">
                Proyek Game Terkini
              </h2>
            </div>
            <Link
              to="/admin/games"
              className="text-xs text-[#8B5CF6] hover:text-[#C4B5FD] flex items-center gap-1"
            >
              <span>Semua Game</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          <div className="divide-y divide-[#332A45]/70">
            {stats.recentGames.map((game) => (
              <div key={game.id} className="py-3 flex items-center justify-between gap-3 text-xs">
                <div className="min-w-0">
                  <div className="font-medium text-[#F5F3FF] truncate">{game.title}</div>
                  <div className="text-[11px] text-[#A7A1B5] mt-0.5">
                    {game.category} · {game.platform || 'Multi-platform'}
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-mono font-medium ${game.status === 'published'
                        ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                        : game.status === 'draft'
                          ? 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
                          : 'bg-gray-500/10 text-gray-400 border border-gray-500/30'
                      }`}
                  >
                    {game.status}
                  </span>
                  <Link
                    to={`/admin/games/${game.id}/edit`}
                    className="text-[#C4B5FD] hover:text-white"
                  >
                    Edit
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Inquiries */}
        <div className="p-6 rounded-xl bg-[#171321] border border-[#332A45] space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-[#8B5CF6]" />
              <h2 className="font-display font-semibold text-sm text-[#F5F3FF]">
                Pesan Masuk Terbaru
              </h2>
            </div>
            <Link
              to="/admin/inquiries"
              className="text-xs text-[#8B5CF6] hover:text-[#C4B5FD] flex items-center gap-1"
            >
              <span>Lihat Semua ({stats.totalInquiries})</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          <div className="divide-y divide-[#332A45]/70">
            {stats.recentInquiries.length === 0 ? (
              <div className="py-6 text-center text-xs text-[#A7A1B5]">
                Belum ada pesan masuk.
              </div>
            ) : (
              stats.recentInquiries.map((inq) => (
                <div key={inq.id} className="py-3 flex items-center justify-between gap-3 text-xs">
                  <div className="min-w-0">
                    <div className="font-medium text-[#F5F3FF] truncate">
                      {inq.name} ({inq.email})
                    </div>
                    <div className="text-[11px] text-[#A7A1B5] truncate mt-0.5">
                      {inq.subject || inq.message}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-mono font-medium ${inq.status === 'new'
                          ? 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
                          : inq.status === 'replied'
                            ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                            : 'bg-gray-500/10 text-gray-400 border border-gray-500/30'
                        }`}
                    >
                      {inq.status}
                    </span>
                    <Link
                      to="/admin/inquiries"
                      className="text-[#C4B5FD] hover:text-white"
                    >
                      Detail
                    </Link>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
