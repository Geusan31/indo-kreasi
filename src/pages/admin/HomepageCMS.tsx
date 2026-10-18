import React, { useState, useEffect } from 'react';
import { Save, Loader2, Eye, EyeOff, LayoutTemplate } from 'lucide-react';
import { getHomepageSections, updateHomepageSection } from '../../lib/db';
import { HomepageSection } from '../../types';
import { ImageUploader } from '../../components/ui/ImageUploader';
import { LoadingState } from '../../components/ui/LoadingState';
import { useToast } from '../../components/ui/Toast';

export const HomepageCMS: React.FC = () => {
  const { showToast } = useToast();
  const [sections, setSections] = useState<HomepageSection[]>([]);
  const [loading, setLoading] = useState(true);
  const [savingId, setSavingId] = useState<string | null>(null);

  const fetchSections = async () => {
    try {
      setLoading(true);
      const data = await getHomepageSections();
      setSections(data);
    } catch (err: any) {
      showToast(err.message || 'Gagal memuat seksi homepage', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSections();
  }, []);

  const handleFieldChange = (id: string, field: keyof HomepageSection, value: any) => {
    setSections((prev) =>
      prev.map((s) => (s.id === id ? { ...s, [field]: value } : s))
    );
  };

  const handleSaveSection = async (section: HomepageSection) => {
    try {
      setSavingId(section.id);
      await updateHomepageSection(section.id, section);
      showToast(`Bagian "${section.section_key}" berhasil disimpan`);
    } catch (err: any) {
      showToast(err.message || 'Gagal menyimpan bagian homepage', 'error');
    } finally {
      setSavingId(null);
    }
  };

  const sectionLabels: Record<string, string> = {
    hero: '1. Hero Section (Utama)',
    featured_games: '2. Proyek Game Pilihan',
    about_preview: '3. Preview Profil Studio',
    services: '4. Ringkasan Layanan Studio',
    cta: '5. Banner Ajakan Kolaborasi',
  };

  if (loading) {
    return <LoadingState message="Memuat pengelola konten homepage..." />;
  }

  return (
    <div className="space-y-8 max-w-4xl">
      <div>
        <h1 className="text-2xl font-display font-bold text-[#F5F3FF]">
          Manajemen Konten Homepage
        </h1>
        <p className="text-xs text-[#A7A1B5] mt-1">
          Sesuaikan tajuk, deskripsi, teks tombol, dan visibilitas setiap seksi di halaman beranda tanpa perlu mengubah kode.
        </p>
      </div>

      <div className="space-y-6">
        {sections.map((section) => {
          const isSaving = savingId === section.id;
          return (
            <div
              key={section.id}
              className="p-6 rounded-xl bg-[#171321] border border-[#332A45] space-y-5"
            >
              <div className="flex items-center justify-between pb-3 border-b border-[#332A45]/70">
                <div className="flex items-center gap-2">
                  <LayoutTemplate className="w-4 h-4 text-[#8B5CF6]" />
                  <h2 className="font-display font-semibold text-base text-[#F5F3FF]">
                    {sectionLabels[section.section_key] || section.section_key}
                  </h2>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() =>
                      handleFieldChange(section.id, 'is_visible', !section.is_visible)
                    }
                    className={`inline-flex items-center gap-1.5 px-3 py-1 rounded text-xs font-mono transition-colors ${
                      section.is_visible
                        ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                        : 'bg-gray-500/10 text-gray-400 border border-gray-500/30'
                    }`}
                  >
                    {section.is_visible ? (
                      <>
                        <Eye className="w-3.5 h-3.5" />
                        <span>Ditampilkan</span>
                      </>
                    ) : (
                      <>
                        <EyeOff className="w-3.5 h-3.5" />
                        <span>Disembunyikan</span>
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    disabled={isSaving}
                    onClick={() => handleSaveSection(section)}
                    className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-[#8B5CF6] hover:bg-[#7C3AED] disabled:opacity-50 text-xs font-semibold text-white transition-colors"
                  >
                    {isSaving ? (
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    ) : (
                      <Save className="w-3.5 h-3.5" />
                    )}
                    <span>Simpan</span>
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-xs font-medium text-[#F5F3FF]">
                    Sub-Judul (Kicker / Badge)
                  </label>
                  <input
                    type="text"
                    value={section.subtitle || ''}
                    onChange={(e) =>
                      handleFieldChange(section.id, 'subtitle', e.target.value)
                    }
                    placeholder="Contoh: Studio Game Independen"
                    className="w-full px-3 py-2 rounded-lg bg-[#201A2D] border border-[#332A45] text-xs text-[#F5F3FF] focus:outline-none focus:ring-1 focus:ring-[#8B5CF6]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-medium text-[#F5F3FF]">
                    Urutan Penempatan
                  </label>
                  <input
                    type="number"
                    value={section.sort_order ?? 0}
                    onChange={(e) =>
                      handleFieldChange(
                        section.id,
                        'sort_order',
                        parseInt(e.target.value) || 0
                      )
                    }
                    className="w-full px-3 py-2 rounded-lg bg-[#201A2D] border border-[#332A45] text-xs text-[#F5F3FF] focus:outline-none focus:ring-1 focus:ring-[#8B5CF6]"
                  />
                </div>

                <div className="space-y-1.5 sm:col-span-2">
                  <label className="block text-xs font-medium text-[#F5F3FF]">
                    Judul Utama Seksi
                  </label>
                  <input
                    type="text"
                    value={section.title || ''}
                    onChange={(e) =>
                      handleFieldChange(section.id, 'title', e.target.value)
                    }
                    placeholder="Judul tebal..."
                    className="w-full px-3 py-2 rounded-lg bg-[#201A2D] border border-[#332A45] text-xs sm:text-sm text-[#F5F3FF] focus:outline-none focus:ring-1 focus:ring-[#8B5CF6]"
                  />
                </div>

                <div className="space-y-1.5 sm:col-span-2">
                  <label className="block text-xs font-medium text-[#F5F3FF]">
                    Uraian Deskripsi
                  </label>
                  <textarea
                    rows={3}
                    value={section.description || ''}
                    onChange={(e) =>
                      handleFieldChange(section.id, 'description', e.target.value)
                    }
                    placeholder="Deskripsi penjelasan seksi..."
                    className="w-full px-3 py-2 rounded-lg bg-[#201A2D] border border-[#332A45] text-xs text-[#F5F3FF] focus:outline-none focus:ring-1 focus:ring-[#8B5CF6]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-medium text-[#F5F3FF]">
                    Teks Tombol Aksi (CTA)
                  </label>
                  <input
                    type="text"
                    value={section.button_text || ''}
                    onChange={(e) =>
                      handleFieldChange(section.id, 'button_text', e.target.value)
                    }
                    placeholder="Contoh: Lihat Portofolio Game"
                    className="w-full px-3 py-2 rounded-lg bg-[#201A2D] border border-[#332A45] text-xs text-[#F5F3FF] focus:outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-medium text-[#F5F3FF]">
                    URL / Rute Tombol
                  </label>
                  <input
                    type="text"
                    value={section.button_url || ''}
                    onChange={(e) =>
                      handleFieldChange(section.id, 'button_url', e.target.value)
                    }
                    placeholder="/games"
                    className="w-full px-3 py-2 rounded-lg bg-[#201A2D] border border-[#332A45] text-xs font-mono text-[#F5F3FF] focus:outline-none"
                  />
                </div>

                <div className="sm:col-span-2">
                  <ImageUploader
                    label="Gambar Latar / Aset Seksi (Opsional)"
                    value={section.image_url || null}
                    onChange={(url) =>
                      handleFieldChange(section.id, 'image_url', url)
                    }
                    folder="homepage"
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
