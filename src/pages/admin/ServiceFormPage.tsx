import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { ArrowLeft, Save, Loader2 } from 'lucide-react';
import { getServiceById, createService, updateService } from '../../lib/db';
import { Service } from '../../types';
import { ImageUploader } from '../../components/ui/ImageUploader';
import { LoadingState } from '../../components/ui/LoadingState';
import { useToast } from '../../components/ui/Toast';

export const ServiceFormPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const isEditing = Boolean(id);
  const navigate = useNavigate();
  const { showToast } = useToast();

  const [loading, setLoading] = useState(isEditing);
  const [saving, setSaving] = useState(false);
  const [autoSlug, setAutoSlug] = useState(!isEditing);

  const [formData, setFormData] = useState<Partial<Service>>({
    title: '',
    slug: '',
    short_description: '',
    description: '',
    icon: 'Gamepad2',
    image_url: null,
    featured: false,
    sort_order: 0,
    is_active: true,
  });

  useEffect(() => {
    if (isEditing && id) {
      async function loadService() {
        try {
          setLoading(true);
          const data = await getServiceById(id!);
          if (data) {
            setFormData(data);
          } else {
            showToast('Layanan tidak ditemukan', 'error');
            navigate('/admin/services');
          }
        } catch (err: any) {
          showToast(err.message || 'Gagal memuat layanan', 'error');
        } finally {
          setLoading(false);
        }
      }
      loadService();
    }
  }, [id, isEditing, navigate]);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title?.trim()) {
      showToast('Nama layanan wajib diisi', 'error');
      return;
    }
    if (!formData.slug?.trim()) {
      showToast('Slug layanan wajib diisi', 'error');
      return;
    }

    try {
      setSaving(true);
      if (isEditing && id) {
        await updateService(id, formData);
        showToast('Layanan berhasil diperbarui');
      } else {
        await createService(formData);
        showToast('Layanan baru berhasil ditambahkan');
      }
      navigate('/admin/services');
    } catch (err: any) {
      showToast(err.message || 'Gagal menyimpan layanan', 'error');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <LoadingState message="Memuat formulir layanan..." />;
  }

  return (
    <div className="space-y-6 max-w-3xl">
      <div className="flex items-center justify-between">
        <Link
          to="/admin/services"
          className="inline-flex items-center gap-1.5 text-xs text-[#A7A1B5] hover:text-[#F5F3FF] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke Daftar Layanan</span>
        </Link>
      </div>

      <div>
        <h1 className="text-2xl font-display font-bold text-[#F5F3FF]">
          {isEditing ? `Sunting Layanan: ${formData.title}` : 'Tambah Layanan Baru'}
        </h1>
        <p className="text-xs text-[#A7A1B5] mt-1">
          Informasi ini akan muncul di halaman publik `/services` jika status aktif.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="p-6 rounded-xl bg-[#171321] border border-[#332A45] space-y-5">
          <div className="space-y-1.5">
            <label className="block text-xs font-medium text-[#F5F3FF]">
              Nama Layanan <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              value={formData.title || ''}
              onChange={(e) => handleTitleChange(e.target.value)}
              placeholder="Contoh: Full-Cycle Game Development"
              required
              className="w-full px-3.5 py-2 rounded-lg bg-[#201A2D] border border-[#332A45] text-xs sm:text-sm text-[#F5F3FF] focus:outline-none focus:ring-1 focus:ring-[#8B5CF6]"
            />
          </div>

          <div className="space-y-1.5">
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
                <span>Otomatis</span>
              </label>
            </div>
            <input
              type="text"
              value={formData.slug || ''}
              onChange={(e) => {
                setAutoSlug(false);
                setFormData((prev) => ({ ...prev, slug: slugify(e.target.value) }));
              }}
              placeholder="full-cycle-game-development"
              required
              className="w-full px-3.5 py-2 rounded-lg bg-[#201A2D] border border-[#332A45] text-xs font-mono text-[#F5F3FF] focus:outline-none focus:ring-1 focus:ring-[#8B5CF6]"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="block text-xs font-medium text-[#F5F3FF]">
                Ikon Layanan
              </label>
              <select
                value={formData.icon || 'Gamepad2'}
                onChange={(e) => setFormData((prev) => ({ ...prev, icon: e.target.value }))}
                className="w-full px-3.5 py-2 rounded-lg bg-[#201A2D] border border-[#332A45] text-xs text-[#F5F3FF] focus:outline-none focus:ring-1 focus:ring-[#8B5CF6]"
              >
                <option value="Gamepad2">Gamepad2 (Game Dev)</option>
                <option value="Cpu">Cpu (Prototyping & Tech)</option>
                <option value="Box">Box (3D & Voxel)</option>
                <option value="LayoutGrid">LayoutGrid (UI/UX)</option>
                <option value="Globe">Globe (Virtual Worlds)</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-medium text-[#F5F3FF]">
                Urutan Tampil
              </label>
              <input
                type="number"
                value={formData.sort_order ?? 0}
                onChange={(e) => setFormData((prev) => ({ ...prev, sort_order: parseInt(e.target.value) || 0 }))}
                className="w-full px-3.5 py-2 rounded-lg bg-[#201A2D] border border-[#332A45] text-xs text-[#F5F3FF] focus:outline-none"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-medium text-[#F5F3FF]">
              Deskripsi Singkat
            </label>
            <textarea
              rows={2}
              value={formData.short_description || ''}
              onChange={(e) => setFormData((prev) => ({ ...prev, short_description: e.target.value }))}
              placeholder="1 kalimat ringkasan layanan..."
              className="w-full px-3.5 py-2 rounded-lg bg-[#201A2D] border border-[#332A45] text-xs text-[#F5F3FF] focus:outline-none focus:ring-1 focus:ring-[#8B5CF6]"
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-medium text-[#F5F3FF]">
              Deskripsi Lengkap
            </label>
            <textarea
              rows={4}
              value={formData.description || ''}
              onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
              placeholder="Uraian mendalam mengenai cakupan pekerjaan dan deliverables..."
              className="w-full px-3.5 py-2 rounded-lg bg-[#201A2D] border border-[#332A45] text-xs text-[#F5F3FF] focus:outline-none focus:ring-1 focus:ring-[#8B5CF6]"
            />
          </div>

          <ImageUploader
            label="Gambar Ilustrasi Layanan (Opsional)"
            value={formData.image_url || null}
            onChange={(url) => setFormData((prev) => ({ ...prev, image_url: url }))}
            folder="services"
          />

          <div className="flex items-center gap-6 pt-3 border-t border-[#332A45]">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.is_active ?? true}
                onChange={(e) => setFormData((prev) => ({ ...prev, is_active: e.target.checked }))}
                className="rounded bg-[#201A2D] border-[#332A45] text-[#8B5CF6] focus:ring-0"
              />
              <span className="text-xs text-[#F5F3FF] font-medium">
                Aktif (Tampilkan di Website Publik)
              </span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.featured ?? false}
                onChange={(e) => setFormData((prev) => ({ ...prev, featured: e.target.checked }))}
                className="rounded bg-[#201A2D] border-[#332A45] text-[#8B5CF6] focus:ring-0"
              />
              <span className="text-xs text-[#F5F3FF] font-medium">
                Tampilkan di Ringkasan Homepage
              </span>
            </label>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3">
          <Link
            to="/admin/services"
            className="px-5 py-2.5 rounded-lg bg-[#201A2D] hover:bg-[#282138] border border-[#332A45] text-xs font-semibold text-[#A7A1B5]"
          >
            Batal
          </Link>
          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-[#8B5CF6] hover:bg-[#7C3AED] disabled:opacity-50 text-xs font-semibold text-white"
          >
            {saving ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Menyimpan...</span>
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                <span>{isEditing ? 'Simpan Perubahan' : 'Terbitkan Layanan'}</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};
