import React, { useState } from 'react';
import { User, Save, ShieldCheck, Mail, Loader2 } from 'lucide-react';
import { useAuth } from '../../lib/AuthContext';
import { ImageUploader } from '../../components/ui/ImageUploader';
import { useToast } from '../../components/ui/Toast';

export const AdminProfile: React.FC = () => {
  const { profile, user, updateProfile } = useAuth();
  const { showToast } = useToast();

  const [fullName, setFullName] = useState(profile?.full_name || '');
  const [avatarUrl, setAvatarUrl] = useState<string | null>(profile?.avatar_url || null);
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setSaving(true);
      await updateProfile({
        full_name: fullName,
        avatar_url: avatarUrl,
      });
      showToast('Profil administrator berhasil diperbarui');
    } catch (err: any) {
      showToast(err.message || 'Gagal memperbarui profil', 'error');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="text-2xl font-display font-bold text-[#F5F3FF]">
          Profil Administrator
        </h1>
        <p className="text-xs text-[#A7A1B5] mt-1">
          Kelola nama tampilan, foto avatar, dan informasi sesi login admin.
        </p>
      </div>

      <div className="p-6 rounded-xl bg-[#171321] border border-[#332A45] space-y-6">
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Avatar and Identity */}
          <div className="flex items-center gap-4 pb-4 border-b border-[#332A45]">
            <div className="w-16 h-16 rounded-full bg-[#8B5CF6]/20 border border-[#8B5CF6]/50 overflow-hidden flex items-center justify-center shrink-0">
              {avatarUrl ? (
                <img src={avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
              ) : (
                <User className="w-8 h-8 text-[#C4B5FD]" />
              )}
            </div>
            <div>
              <span className="font-semibold text-sm text-[#F5F3FF] block">
                {fullName || user?.email}
              </span>
              <div className="flex items-center gap-1.5 text-xs text-emerald-400 mt-1">
                <ShieldCheck className="w-4 h-4" />
                <span>Role: {profile?.role || 'admin'}</span>
              </div>
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-medium text-[#F5F3FF]">
              Nama Lengkap
            </label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Contoh: Arya Pratama"
              required
              className="w-full px-3.5 py-2 rounded-lg bg-[#201A2D] border border-[#332A45] text-xs text-[#F5F3FF] focus:outline-none focus:ring-1 focus:ring-[#8B5CF6]"
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-medium text-[#F5F3FF]">
              Alamat Email (Akun Supabase Auth)
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#A7A1B5]" />
              <input
                type="email"
                value={user?.email || profile?.email || ''}
                disabled
                className="w-full pl-9 pr-3.5 py-2 rounded-lg bg-[#201A2D]/50 border border-[#332A45] text-xs text-[#A7A1B5] cursor-not-allowed font-mono"
              />
            </div>
            <p className="text-[11px] text-[#A7A1B5]">
              Alamat email terhubung dengan kredensial Supabase Auth.
            </p>
          </div>

          <ImageUploader
            label="Foto Avatar Administrator"
            value={avatarUrl}
            onChange={(url) => setAvatarUrl(url)}
            folder="avatars"
          />

          <div className="pt-2">
            <button
              type="submit"
              disabled={saving}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#8B5CF6] hover:bg-[#7C3AED] disabled:opacity-50 text-xs font-semibold text-white transition-colors"
            >
              {saving ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Menyimpan...</span>
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  <span>Simpan Perubahan Profil</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
