import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { ArrowLeft, Save, Loader2, Plus, Trash2, ExternalLink } from 'lucide-react';
import { getGameById, createGame, updateGame } from '../../lib/db';
import { Game, GameStatus, GameGalleryItem } from '../../types';
import { ImageUploader } from '../../components/ui/ImageUploader';
import { LoadingState } from '../../components/ui/LoadingState';
import { useToast } from '../../components/ui/Toast';

export const GameFormPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const isEditing = Boolean(id);
  const navigate = useNavigate();
  const { showToast } = useToast();

  const [loading, setLoading] = useState(isEditing);
  const [saving, setSaving] = useState(false);
  const [autoSlug, setAutoSlug] = useState(!isEditing);

  // Form State
  const [formData, setFormData] = useState<Partial<Game>>({
    title: '',
    slug: '',
    short_description: '',
    description: '',
    category: 'Action & RPG',
    status: 'published' as GameStatus,
    platform: 'PC, Mobile',
    release_date: new Date().toISOString().split('T')[0],
    cover_image_url: null,
    banner_image_url: null,
    gallery: [],
    external_url: '',
    featured: false,
    sort_order: 0,
  });

  // Gallery item buffer
  const [galleryTitle, setGalleryTitle] = useState('');
  const [galleryDesc, setGalleryDesc] = useState('');

  useEffect(() => {
    if (isEditing && id) {
      async function loadGame() {
        try {
          setLoading(true);
          const data = await getGameById(id!);
          if (data) {
            setFormData(data);
          } else {
            showToast('Game tidak ditemukan', 'error');
            navigate('/admin/games');
          }
        } catch (err: any) {
          showToast(err.message || 'Gagal memuat game', 'error');
        } finally {
          setLoading(false);
        }
      }
      loadGame();
    }
  }, [id, isEditing, navigate]);

  // Slug generator helper
  const slugify = (text: string) => {
    return text
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '');
  };

  const handleTitleChange = (val: string) => {
    setFormData((prev) => ({
      ...prev,
      title: val,
      slug: autoSlug ? slugify(val) : prev.slug,
    }));
  };

  const handleAddGalleryItem = () => {
    if (!galleryTitle.trim()) {
      showToast('Judul sudut pandang galeri wajib diisi', 'error');
      return;
    }
    const newItem: GameGalleryItem = {
      title: galleryTitle.trim(),
      description: galleryDesc.trim() || undefined,
    };
    setFormData((prev) => ({
      ...prev,
      gallery: [...(prev.gallery || []), newItem],
    }));
    setGalleryTitle('');
    setGalleryDesc('');
  };

  const handleRemoveGalleryItem = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      gallery: prev.gallery?.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title?.trim()) {
      showToast('Judul game wajib diisi', 'error');
      return;
    }
    if (!formData.slug?.trim()) {
      showToast('Slug URL wajib diisi', 'error');
      return;
    }

    try {
      setSaving(true);
      if (isEditing && id) {
        await updateGame(id, formData);
        showToast('Game berhasil diperbarui');
      } else {
        await createGame(formData);
        showToast('Game baru berhasil ditambahkan');
      }
      navigate('/admin/games');
    } catch (err: any) {
      showToast(err.message || 'Terjadi kesalahan saat menyimpan data game', 'error');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <LoadingState message="Memuat formulir game..." />;
  }

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Top Bar */}
      <div className="flex items-center justify-between">
        <Link
          to="/admin/games"
          className="inline-flex items-center gap-1.5 text-xs text-[#A7A1B5] hover:text-[#F5F3FF] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke Daftar Game</span>
        </Link>
      </div>

      <div>
        <h1 className="text-2xl font-display font-bold text-[#F5F3FF]">
          {isEditing ? `Sunting Game: ${formData.title}` : 'Tambah Game Baru'}
        </h1>
        <p className="text-xs text-[#A7A1B5] mt-1">
          Lengkapi data game di bawah ini. Pastikan slug unik untuk tautan detail.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Main Details Card */}
        <div className="p-6 rounded-xl bg-[#171321] border border-[#332A45] space-y-5">
          <h2 className="font-display font-semibold text-sm text-[#F5F3FF] uppercase tracking-wider">
            Informasi Pokok
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {/* Title */}
            <div className="space-y-1.5 sm:col-span-2">
              <label className="block text-xs font-medium text-[#F5F3FF]">
                Judul Game <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                value={formData.title || ''}
                onChange={(e) => handleTitleChange(e.target.value)}
                placeholder="Contoh: Nusantara Realm: Legends of the Archipelago"
                required
                className="w-full px-3.5 py-2 rounded-lg bg-[#201A2D] border border-[#332A45] text-xs sm:text-sm text-[#F5F3FF] focus:outline-none focus:ring-1 focus:ring-[#8B5CF6]"
              />
            </div>

            {/* Slug */}
            <div className="space-y-1.5 sm:col-span-2">
              <div className="flex items-center justify-between">
                <label className="block text-xs font-medium text-[#F5F3FF]">
                  Slug URL <span className="text-red-400">*</span>
                </label>
                <label className="flex items-center gap-1.5 text-[11px] text-[#A7A1B5] cursor-pointer">
                  <input
                    type="checkbox"
                    checked={autoSlug}
                    onChange={(e) => setAutoSlug(e.target.checked)}
                    className="rounded bg-[#201A2D] border-[#332A45] text-[#8B5CF6] focus:ring-0"
                  />
                  <span>Otomatis dari judul</span>
                </label>
              </div>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-mono text-[#A7A1B5]">
                  /games/
                </span>
                <input
                  type="text"
                  value={formData.slug || ''}
                  onChange={(e) => {
                    setAutoSlug(false);
                    setFormData((prev) => ({ ...prev, slug: slugify(e.target.value) }));
                  }}
                  placeholder="nusantara-realm"
                  required
                  className="w-full pl-18 pr-3.5 py-2 rounded-lg bg-[#201A2D] border border-[#332A45] text-xs font-mono text-[#F5F3FF] focus:outline-none focus:ring-1 focus:ring-[#8B5CF6]"
                />
              </div>
            </div>

            {/* Category */}
            <div className="space-y-1.5">
              <label className="block text-xs font-medium text-[#F5F3FF]">
                Kategori
              </label>
              <select
                value={formData.category || 'Action & RPG'}
                onChange={(e) => setFormData((prev) => ({ ...prev, category: e.target.value }))}
                className="w-full px-3.5 py-2 rounded-lg bg-[#201A2D] border border-[#332A45] text-xs text-[#F5F3FF] focus:outline-none focus:ring-1 focus:ring-[#8B5CF6]"
              >
                <option value="Action & RPG">Action & RPG</option>
                <option value="Platformer & Obby">Platformer & Obby</option>
                <option value="Simulator & Tycoon">Simulator & Tycoon</option>
                <option value="Mystery & Survival">Mystery & Survival</option>
                <option value="Racing & Arcade">Racing & Arcade</option>
                <option value="Action & Arena">Action & Arena</option>
              </select>
            </div>

            {/* Status */}
            <div className="space-y-1.5">
              <label className="block text-xs font-medium text-[#F5F3FF]">
                Status Publikasi
              </label>
              <select
                value={formData.status || 'published'}
                onChange={(e) => setFormData((prev) => ({ ...prev, status: e.target.value as GameStatus }))}
                className="w-full px-3.5 py-2 rounded-lg bg-[#201A2D] border border-[#332A45] text-xs text-[#F5F3FF] focus:outline-none focus:ring-1 focus:ring-[#8B5CF6]"
              >
                <option value="published">Diterbitkan (Tampil di Website Publik)</option>
                <option value="draft">Draf (Hanya terlihat di Admin)</option>
                <option value="archived">Diarsipkan (Tidak tampil di Katalog)</option>
              </select>
            </div>

            {/* Platform */}
            <div className="space-y-1.5">
              <label className="block text-xs font-medium text-[#F5F3FF]">
                Platform Target
              </label>
              <input
                type="text"
                value={formData.platform || ''}
                onChange={(e) => setFormData((prev) => ({ ...prev, platform: e.target.value }))}
                placeholder="Contoh: PC, Mobile, Virtual World Platform"
                className="w-full px-3.5 py-2 rounded-lg bg-[#201A2D] border border-[#332A45] text-xs text-[#F5F3FF] focus:outline-none focus:ring-1 focus:ring-[#8B5CF6]"
              />
            </div>

            {/* Release Date */}
            <div className="space-y-1.5">
              <label className="block text-xs font-medium text-[#F5F3FF]">
                Tanggal / Target Rilis
              </label>
              <input
                type="date"
                value={formData.release_date || ''}
                onChange={(e) => setFormData((prev) => ({ ...prev, release_date: e.target.value }))}
                className="w-full px-3.5 py-2 rounded-lg bg-[#201A2D] border border-[#332A45] text-xs text-[#F5F3FF] focus:outline-none focus:ring-1 focus:ring-[#8B5CF6]"
              />
            </div>

            {/* External URL */}
            <div className="space-y-1.5 sm:col-span-2">
              <label className="block text-xs font-medium text-[#F5F3FF]">
                Tautan Eksternal / Demo Game
              </label>
              <input
                type="url"
                value={formData.external_url || ''}
                onChange={(e) => setFormData((prev) => ({ ...prev, external_url: e.target.value }))}
                placeholder="https://indokreasi.id/game-demo"
                className="w-full px-3.5 py-2 rounded-lg bg-[#201A2D] border border-[#332A45] text-xs text-[#F5F3FF] focus:outline-none focus:ring-1 focus:ring-[#8B5CF6]"
              />
            </div>

            {/* Featured toggle & Sort order */}
            <div className="flex items-center gap-4 sm:col-span-2 pt-2 border-t border-[#332A45]">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.featured || false}
                  onChange={(e) => setFormData((prev) => ({ ...prev, featured: e.target.checked }))}
                  className="rounded bg-[#201A2D] border-[#332A45] text-[#8B5CF6] focus:ring-0"
                />
                <span className="text-xs text-[#F5F3FF] font-medium">
                  Tampilkan sebagai Proyek Unggulan di Homepage
                </span>
              </label>

              <div className="flex items-center gap-2 ml-auto">
                <label className="text-xs text-[#A7A1B5]">Urutan:</label>
                <input
                  type="number"
                  value={formData.sort_order ?? 0}
                  onChange={(e) => setFormData((prev) => ({ ...prev, sort_order: parseInt(e.target.value) || 0 }))}
                  className="w-16 px-2 py-1 rounded bg-[#201A2D] border border-[#332A45] text-xs text-[#F5F3FF] text-center"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Narrative & Descriptions */}
        <div className="p-6 rounded-xl bg-[#171321] border border-[#332A45] space-y-5">
          <h2 className="font-display font-semibold text-sm text-[#F5F3FF] uppercase tracking-wider">
            Deskripsi & Narasi
          </h2>

          <div className="space-y-4">
            <div className="space-y-1.5">
              <label className="block text-xs font-medium text-[#F5F3FF]">
                Deskripsi Singkat (Ringkasan Kartu)
              </label>
              <textarea
                rows={2}
                value={formData.short_description || ''}
                onChange={(e) => setFormData((prev) => ({ ...prev, short_description: e.target.value }))}
                placeholder="1–2 kalimat ringkasan yang muncul di kartu katalog..."
                className="w-full px-3.5 py-2 rounded-lg bg-[#201A2D] border border-[#332A45] text-xs text-[#F5F3FF] focus:outline-none focus:ring-1 focus:ring-[#8B5CF6]"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-medium text-[#F5F3FF]">
                Deskripsi Lengkap (Halaman Detail)
              </label>
              <textarea
                rows={5}
                value={formData.description || ''}
                onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                placeholder="Penjelasan mendalam mengenai pilar mekanik gameplay, alur petualangan, dan cerita..."
                className="w-full px-3.5 py-2 rounded-lg bg-[#201A2D] border border-[#332A45] text-xs text-[#F5F3FF] focus:outline-none focus:ring-1 focus:ring-[#8B5CF6]"
              />
            </div>
          </div>
        </div>

        {/* Media & Images */}
        <div className="p-6 rounded-xl bg-[#171321] border border-[#332A45] space-y-5">
          <h2 className="font-display font-semibold text-sm text-[#F5F3FF] uppercase tracking-wider">
            Gambar & Aset Visual
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <ImageUploader
              label="Cover Image (Kartu)"
              value={formData.cover_image_url || null}
              onChange={(url) => setFormData((prev) => ({ ...prev, cover_image_url: url }))}
              folder="games/covers"
            />

            <ImageUploader
              label="Banner Image (Header Detail)"
              value={formData.banner_image_url || null}
              onChange={(url) => setFormData((prev) => ({ ...prev, banner_image_url: url }))}
              folder="games/banners"
            />
          </div>
        </div>

        {/* Gallery Items */}
        <div className="p-6 rounded-xl bg-[#171321] border border-[#332A45] space-y-5">
          <div className="flex items-center justify-between">
            <h2 className="font-display font-semibold text-sm text-[#F5F3FF] uppercase tracking-wider">
              Galeri Sudut Pandang & Konsep ({formData.gallery?.length || 0})
            </h2>
          </div>

          {/* Add Gallery Item Form */}
          <div className="p-4 rounded-lg bg-[#201A2D] border border-[#332A45] space-y-3">
            <span className="text-xs font-semibold text-[#F5F3FF] block">
              + Tambah Item Galeri Baru
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <input
                type="text"
                value={galleryTitle}
                onChange={(e) => setGalleryTitle(e.target.value)}
                placeholder="Judul (misal: Gerbang Kuil Jayasri)"
                className="px-3 py-2 rounded-lg bg-[#171321] border border-[#332A45] text-xs text-[#F5F3FF] focus:outline-none"
              />
              <input
                type="text"
                value={galleryDesc}
                onChange={(e) => setGalleryDesc(e.target.value)}
                placeholder="Keterangan singkat..."
                className="px-3 py-2 rounded-lg bg-[#171321] border border-[#332A45] text-xs text-[#F5F3FF] focus:outline-none"
              />
            </div>
            <button
              type="button"
              onClick={handleAddGalleryItem}
              className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-[#8B5CF6] text-white hover:bg-[#7C3AED]"
            >
              Tambahkan ke Galeri
            </button>
          </div>

          {/* Gallery Items List */}
          {formData.gallery && formData.gallery.length > 0 && (
            <div className="divide-y divide-[#332A45]">
              {formData.gallery.map((item, index) => (
                <div key={index} className="py-2.5 flex items-center justify-between gap-3 text-xs">
                  <div>
                    <span className="font-semibold text-[#F5F3FF] block">{item.title}</span>
                    {item.description && (
                      <span className="text-[#A7A1B5] text-[11px] block">{item.description}</span>
                    )}
                  </div>
                  <button
                    type="button"
                    onClick={() => handleRemoveGalleryItem(index)}
                    className="p-1 text-red-400 hover:text-red-300"
                    title="Hapus item"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Action Bar */}
        <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#332A45]">
          <Link
            to="/admin/games"
            className="px-5 py-2.5 rounded-lg bg-[#201A2D] hover:bg-[#282138] border border-[#332A45] text-xs font-semibold text-[#A7A1B5] hover:text-[#F5F3FF] transition-colors"
          >
            Batal
          </Link>
          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-[#8B5CF6] hover:bg-[#7C3AED] disabled:opacity-50 text-xs font-semibold text-white transition-colors"
          >
            {saving ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Menyimpan...</span>
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                <span>{isEditing ? 'Simpan Perubahan' : 'Terbitkan Game'}</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};
