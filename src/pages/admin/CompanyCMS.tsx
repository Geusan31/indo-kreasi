import React, { useState, useEffect } from 'react';
import { Save, Loader2, Building2 } from 'lucide-react';
import { getCompanyInfo, updateCompanyInfo } from '../../lib/db';
import { CompanyInfo } from '../../types';
import { ImageUploader } from '../../components/ui/ImageUploader';
import { LoadingState } from '../../components/ui/LoadingState';
import { useToast } from '../../components/ui/Toast';

export const CompanyCMS: React.FC = () => {
  const { showToast } = useToast();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [company, setCompany] = useState<CompanyInfo | null>(null);

  useEffect(() => {
    async function loadCompany() {
      try {
        setLoading(true);
        const data = await getCompanyInfo();
        setCompany(data);
      } catch (err: any) {
        showToast(err.message || 'Gagal memuat profil perusahaan', 'error');
      } finally {
        setLoading(false);
      }
    }
    loadCompany();
  }, []);

  const handleChange = (field: keyof CompanyInfo, value: any) => {
    if (!company) return;
    setCompany({ ...company, [field]: value });
  };

  const handleSocialChange = (network: string, url: string) => {
    if (!company) return;
    setCompany({
      ...company,
      social_links: {
        ...company.social_links,
        [network]: url,
      },
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!company) return;

    try {
      setSaving(true);
      await updateCompanyInfo(company);
      showToast('Informasi perusahaan berhasil diperbarui');
    } catch (err: any) {
      showToast(err.message || 'Gagal menyimpan informasi', 'error');
    } finally {
      setSaving(false);
    }
  };

  if (loading || !company) {
    return <LoadingState message="Memuat informasi perusahaan..." />;
  }

  return (
    <div className="space-y-8 max-w-4xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-display font-bold text-[#F5F3FF]">
            Profil & Identitas Perusahaan
          </h1>
          <p className="text-xs text-[#A7A1B5] mt-1">
            Data ini digunakan untuk header, footer, halaman /about, serta kontak resmi.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Brand Info */}
        <div className="p-6 rounded-xl bg-[#171321] border border-[#332A45] space-y-4">
          <h2 className="font-display font-semibold text-sm text-[#F5F3FF] uppercase tracking-wider">
            Identitas Utama
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5 sm:col-span-2">
              <label className="block text-xs font-medium text-[#F5F3FF]">
                Nama Perusahaan
              </label>
              <input
                type="text"
                value={company.company_name}
                onChange={(e) => handleChange('company_name', e.target.value)}
                required
                className="w-full px-3.5 py-2 rounded-lg bg-[#201A2D] border border-[#332A45] text-xs text-[#F5F3FF] focus:outline-none focus:ring-1 focus:ring-[#8B5CF6]"
              />
            </div>

            <div className="space-y-1.5 sm:col-span-2">
              <label className="block text-xs font-medium text-[#F5F3FF]">
                Tagline Resmi
              </label>
              <input
                type="text"
                value={company.tagline || ''}
                onChange={(e) => handleChange('tagline', e.target.value)}
                className="w-full px-3.5 py-2 rounded-lg bg-[#201A2D] border border-[#332A45] text-xs text-[#F5F3FF] focus:outline-none focus:ring-1 focus:ring-[#8B5CF6]"
              />
            </div>

            <div className="space-y-1.5 sm:col-span-2">
              <label className="block text-xs font-medium text-[#F5F3FF]">
                Deskripsi Profil Perusahaan
              </label>
              <textarea
                rows={3}
                value={company.description || ''}
                onChange={(e) => handleChange('description', e.target.value)}
                className="w-full px-3.5 py-2 rounded-lg bg-[#201A2D] border border-[#332A45] text-xs text-[#F5F3FF] focus:outline-none focus:ring-1 focus:ring-[#8B5CF6]"
              />
            </div>
          </div>
        </div>

        {/* Vision & Mission */}
        <div className="p-6 rounded-xl bg-[#171321] border border-[#332A45] space-y-4">
          <h2 className="font-display font-semibold text-sm text-[#F5F3FF] uppercase tracking-wider">
            Visi & Misi Studio
          </h2>

          <div className="space-y-4">
            <div className="space-y-1.5">
              <label className="block text-xs font-medium text-[#F5F3FF]">
                Visi Perusahaan
              </label>
              <textarea
                rows={3}
                value={company.vision || ''}
                onChange={(e) => handleChange('vision', e.target.value)}
                placeholder="Pernyataan visi strategis..."
                className="w-full px-3.5 py-2 rounded-lg bg-[#201A2D] border border-[#332A45] text-xs text-[#F5F3FF] focus:outline-none focus:ring-1 focus:ring-[#8B5CF6]"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-medium text-[#F5F3FF]">
                Misi Perusahaan
              </label>
              <textarea
                rows={4}
                value={company.mission || ''}
                onChange={(e) => handleChange('mission', e.target.value)}
                placeholder="Pernyataan misi operasional..."
                className="w-full px-3.5 py-2 rounded-lg bg-[#201A2D] border border-[#332A45] text-xs text-[#F5F3FF] focus:outline-none focus:ring-1 focus:ring-[#8B5CF6]"
              />
            </div>
          </div>
        </div>

        {/* Contact Coordinates */}
        <div className="p-6 rounded-xl bg-[#171321] border border-[#332A45] space-y-4">
          <h2 className="font-display font-semibold text-sm text-[#F5F3FF] uppercase tracking-wider">
            Kontak & Lokasi Kantor
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="block text-xs font-medium text-[#F5F3FF]">
                Email Resmi
              </label>
              <input
                type="email"
                value={company.email || ''}
                onChange={(e) => handleChange('email', e.target.value)}
                className="w-full px-3.5 py-2 rounded-lg bg-[#201A2D] border border-[#332A45] text-xs text-[#F5F3FF] focus:outline-none"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-medium text-[#F5F3FF]">
                Nomor Telepon
              </label>
              <input
                type="text"
                value={company.phone || ''}
                onChange={(e) => handleChange('phone', e.target.value)}
                className="w-full px-3.5 py-2 rounded-lg bg-[#201A2D] border border-[#332A45] text-xs text-[#F5F3FF] focus:outline-none"
              />
            </div>

            <div className="space-y-1.5 sm:col-span-2">
              <label className="block text-xs font-medium text-[#F5F3FF]">
                Alamat / Lokasi Operasional
              </label>
              <input
                type="text"
                value={company.address || ''}
                onChange={(e) => handleChange('address', e.target.value)}
                className="w-full px-3.5 py-2 rounded-lg bg-[#201A2D] border border-[#332A45] text-xs text-[#F5F3FF] focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Social Media Links */}
        <div className="p-6 rounded-xl bg-[#171321] border border-[#332A45] space-y-4">
          <h2 className="font-display font-semibold text-sm text-[#F5F3FF] uppercase tracking-wider">
            Tautan Media Sosial & Komunitas
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="block text-xs font-medium text-[#A7A1B5]">
                GitHub URL
              </label>
              <input
                type="url"
                value={company.social_links?.github || ''}
                onChange={(e) => handleSocialChange('github', e.target.value)}
                placeholder="https://github.com/..."
                className="w-full px-3.5 py-2 rounded-lg bg-[#201A2D] border border-[#332A45] text-xs text-[#F5F3FF] focus:outline-none"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-medium text-[#A7A1B5]">
                Discord URL
              </label>
              <input
                type="url"
                value={company.social_links?.discord || ''}
                onChange={(e) => handleSocialChange('discord', e.target.value)}
                placeholder="https://discord.gg/..."
                className="w-full px-3.5 py-2 rounded-lg bg-[#201A2D] border border-[#332A45] text-xs text-[#F5F3FF] focus:outline-none"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-medium text-[#A7A1B5]">
                Twitter / X URL
              </label>
              <input
                type="url"
                value={company.social_links?.twitter || ''}
                onChange={(e) => handleSocialChange('twitter', e.target.value)}
                placeholder="https://x.com/..."
                className="w-full px-3.5 py-2 rounded-lg bg-[#201A2D] border border-[#332A45] text-xs text-[#F5F3FF] focus:outline-none"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-medium text-[#A7A1B5]">
                YouTube URL
              </label>
              <input
                type="url"
                value={company.social_links?.youtube || ''}
                onChange={(e) => handleSocialChange('youtube', e.target.value)}
                placeholder="https://youtube.com/@..."
                className="w-full px-3.5 py-2 rounded-lg bg-[#201A2D] border border-[#332A45] text-xs text-[#F5F3FF] focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Brand Imagery */}
        <div className="p-6 rounded-xl bg-[#171321] border border-[#332A45] space-y-4">
          <h2 className="font-display font-semibold text-sm text-[#F5F3FF] uppercase tracking-wider">
            Aset Visual Brand
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <ImageUploader
              label="Logo Perusahaan"
              value={company.logo_url}
              onChange={(url) => handleChange('logo_url', url)}
              folder="branding"
            />
            <ImageUploader
              label="Foto Studio / Tentang Kami"
              value={company.about_image_url}
              onChange={(url) => handleChange('about_image_url', url)}
              folder="branding"
            />
          </div>
        </div>

        <div className="flex justify-end pt-2">
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
                <span>Simpan Perubahan</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};
