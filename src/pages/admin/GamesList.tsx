import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Plus,
  Search,
  Edit,
  Trash2,
  Archive,
  Star,
  ExternalLink,
  Gamepad2,
  Filter,
} from 'lucide-react';
import { getGames, deleteGame, updateGame } from '../../lib/db';
import { Game, GameStatus } from '../../types';
import { ConfirmDialog } from '../../components/ui/ConfirmDialog';
import { LoadingState } from '../../components/ui/LoadingState';
import { EmptyState } from '../../components/ui/EmptyState';
import { useToast } from '../../components/ui/Toast';

export const GamesList: React.FC = () => {
  const { showToast } = useToast();
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | GameStatus>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');

  // Deletion modal state
  const [gameToDelete, setGameToDelete] = useState<Game | null>(null);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);

  const fetchGamesList = async () => {
    try {
      setLoading(true);
      const data = await getGames();
      setGames(data);
    } catch (err) {
      console.error('Error fetching games:', err);
      showToast('Gagal memuat daftar game', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGamesList();
  }, []);

  const handleToggleFeatured = async (game: Game) => {
    try {
      const updated = await updateGame(game.id, { featured: !game.featured });
      setGames((prev) => prev.map((g) => (g.id === game.id ? updated : g)));
      showToast(`Status unggulan untuk "${game.title}" diperbarui`);
    } catch (err: any) {
      showToast(err.message || 'Gagal memperbarui status unggulan', 'error');
    }
  };

  const handleArchive = async (game: Game) => {
    try {
      const newStatus = game.status === 'archived' ? 'published' : 'archived';
      const updated = await updateGame(game.id, { status: newStatus });
      setGames((prev) => prev.map((g) => (g.id === game.id ? updated : g)));
      showToast(`Status game diubah ke ${newStatus}`);
    } catch (err: any) {
      showToast(err.message || 'Gagal mengarsipkan game', 'error');
    }
  };

  const confirmDelete = async () => {
    if (!gameToDelete) return;
    try {
      await deleteGame(gameToDelete.id);
      setGames((prev) => prev.filter((g) => g.id !== gameToDelete.id));
      showToast(`Game "${gameToDelete.title}" berhasil dihapus`);
    } catch (err: any) {
      showToast(err.message || 'Gagal menghapus game', 'error');
    } finally {
      setDeleteConfirmOpen(false);
      setGameToDelete(null);
    }
  };

  // Filtered games
  const filtered = games.filter((g) => {
    const matchesSearch =
      g.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      g.slug.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (g.short_description && g.short_description.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesStatus = statusFilter === 'all' || g.status === statusFilter;
    const matchesCategory = categoryFilter === 'all' || g.category === categoryFilter;

    return matchesSearch && matchesStatus && matchesCategory;
  });

  const categories = Array.from(new Set(games.map((g) => g.category)));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-display font-bold text-[#F5F3FF]">
            Kelola Portofolio Game
          </h1>
          <p className="text-xs text-[#A7A1B5] mt-1">
            Tambah, sunting, arsipkan, atau hapus judul game studio. Perubahan langsung tercermin di website publik.
          </p>
        </div>

        <Link
          to="/admin/games/new"
          className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-[#8B5CF6] hover:bg-[#7C3AED] text-xs font-semibold text-white transition-colors shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Tambah Game Baru</span>
        </Link>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 rounded-xl bg-[#171321] border border-[#332A45] flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#A7A1B5]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari judul game atau slug..."
            className="w-full pl-9 pr-3.5 py-2 rounded-lg bg-[#201A2D] border border-[#332A45] text-xs text-[#F5F3FF] placeholder-[#A7A1B5]/50 focus:outline-none focus:ring-1 focus:ring-[#8B5CF6]"
          />
        </div>

        <div className="flex flex-wrap items-center gap-3 text-xs">
          <div className="flex items-center gap-1.5">
            <span className="text-[#A7A1B5]">Status:</span>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as any)}
              className="px-2.5 py-1.5 rounded-lg bg-[#201A2D] border border-[#332A45] text-xs text-[#F5F3FF] focus:outline-none focus:ring-1 focus:ring-[#8B5CF6]"
            >
              <option value="all">Semua Status</option>
              <option value="published">Diterbitkan (Published)</option>
              <option value="draft">Draf (Draft)</option>
              <option value="archived">Diarsipkan (Archived)</option>
            </select>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="text-[#A7A1B5]">Kategori:</span>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="px-2.5 py-1.5 rounded-lg bg-[#201A2D] border border-[#332A45] text-xs text-[#F5F3FF] focus:outline-none focus:ring-1 focus:ring-[#8B5CF6]"
            >
              <option value="all">Semua Kategori</option>
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Table Container */}
      {loading ? (
        <LoadingState message="Memuat daftar game..." />
      ) : filtered.length === 0 ? (
        <EmptyState
          title="Tidak Ada Game yang Cocok"
          description={
            searchQuery || statusFilter !== 'all' || categoryFilter !== 'all'
              ? 'Coba sesuaikan kata kunci atau filter status.'
              : 'Belum ada game yang dibuat. Mulai dengan menambahkan game pertama Anda.'
          }
          icon={Gamepad2}
          actionText={
            searchQuery || statusFilter !== 'all' || categoryFilter !== 'all'
              ? 'Reset Filter'
              : 'Tambah Game Baru'
          }
          onAction={() => {
            if (searchQuery || statusFilter !== 'all' || categoryFilter !== 'all') {
              setSearchQuery('');
              setStatusFilter('all');
              setCategoryFilter('all');
            } else {
              window.location.href = '/admin/games/new';
            }
          }}
        />
      ) : (
        <div className="rounded-xl border border-[#332A45] bg-[#171321] overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#201A2D] border-b border-[#332A45] text-[#A7A1B5] font-semibold uppercase tracking-wider text-[11px]">
                <tr>
                  <th className="py-3.5 px-4">Judul & Slug</th>
                  <th className="py-3.5 px-4">Kategori</th>
                  <th className="py-3.5 px-4">Platform</th>
                  <th className="py-3.5 px-4 text-center">Status</th>
                  <th className="py-3.5 px-4 text-center">Unggulan</th>
                  <th className="py-3.5 px-4 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#332A45]/70 text-[#F5F3FF]">
                {filtered.map((game) => (
                  <tr key={game.id} className="hover:bg-[#201A2D]/40 transition-colors">
                    {/* Title & Slug */}
                    <td className="py-3.5 px-4 min-w-[220px]">
                      <div className="font-semibold text-sm text-[#F5F3FF]">
                        {game.title}
                      </div>
                      <div className="font-mono text-[11px] text-[#A7A1B5] mt-0.5">
                        /{game.slug}
                      </div>
                    </td>

                    {/* Category */}
                    <td className="py-3.5 px-4 whitespace-nowrap text-[#C4B5FD]">
                      {game.category}
                    </td>

                    {/* Platform */}
                    <td className="py-3.5 px-4 text-[#A7A1B5] max-w-xs truncate">
                      {game.platform || '—'}
                    </td>

                    {/* Status Badge */}
                    <td className="py-3.5 px-4 text-center whitespace-nowrap">
                      <span
                        className={`inline-block px-2.5 py-1 rounded text-[11px] font-mono font-medium ${
                          game.status === 'published'
                            ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                            : game.status === 'draft'
                            ? 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
                            : 'bg-gray-500/10 text-gray-400 border border-gray-500/30'
                        }`}
                      >
                        {game.status}
                      </span>
                    </td>

                    {/* Featured Toggle */}
                    <td className="py-3.5 px-4 text-center">
                      <button
                        type="button"
                        onClick={() => handleToggleFeatured(game)}
                        className={`p-1 rounded transition-colors ${
                          game.featured
                            ? 'text-amber-400 hover:text-amber-300'
                            : 'text-[#A7A1B5]/40 hover:text-[#A7A1B5]'
                        }`}
                        title={game.featured ? 'Game Unggulan (Homepage)' : 'Bukan Unggulan'}
                      >
                        <Star className={`w-4 h-4 ${game.featured ? 'fill-amber-400' : ''}`} />
                      </button>
                    </td>

                    {/* Actions */}
                    <td className="py-3.5 px-4 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-2">
                        {game.status === 'published' && (
                          <Link
                            to={`/games/${game.slug}`}
                            target="_blank"
                            className="p-1.5 text-[#A7A1B5] hover:text-[#F5F3FF] rounded hover:bg-[#201A2D]"
                            title="Buka Halaman Publik"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                          </Link>
                        )}

                        <Link
                          to={`/admin/games/${game.id}/edit`}
                          className="p-1.5 text-[#C4B5FD] hover:text-white rounded hover:bg-[#201A2D]"
                          title="Sunting Game"
                        >
                          <Edit className="w-3.5 h-3.5" />
                        </Link>

                        <button
                          type="button"
                          onClick={() => handleArchive(game)}
                          className="p-1.5 text-amber-400/80 hover:text-amber-300 rounded hover:bg-[#201A2D]"
                          title={game.status === 'archived' ? 'Kembalikan dari Arsip' : 'Arsipkan Game'}
                        >
                          <Archive className="w-3.5 h-3.5" />
                        </button>

                        <button
                          type="button"
                          onClick={() => {
                            setGameToDelete(game);
                            setDeleteConfirmOpen(true);
                          }}
                          className="p-1.5 text-red-400/80 hover:text-red-300 rounded hover:bg-red-950/30"
                          title="Hapus Game"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        isOpen={deleteConfirmOpen}
        title="Hapus Judul Game?"
        message={`Apakah Anda yakin ingin menghapus "${gameToDelete?.title}" secara permanen? Data yang telah dihapus tidak dapat dipulihkan.`}
        confirmText="Hapus Permanen"
        cancelText="Batal"
        isDestructive={true}
        onConfirm={confirmDelete}
        onCancel={() => {
          setDeleteConfirmOpen(false);
          setGameToDelete(null);
        }}
      />
    </div>
  );
};
