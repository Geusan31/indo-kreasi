import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Gamepad2, Lock, Mail, ArrowRight, Loader2, AlertCircle, Info } from 'lucide-react';
import { useAuth } from '../../lib/AuthContext';
import { isSupabaseConfigured } from '../../lib/supabase';
import { useToast } from '../../components/ui/Toast';

export const Login: React.FC = () => {
  const { signIn, user } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // If already logged in, redirect to admin
  React.useEffect(() => {
    if (user) {
      navigate('/admin');
    }
  }, [user, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!email.trim() || !password.trim()) {
      setErrorMessage('Harap isi email dan kata sandi.');
      return;
    }

    try {
      setSubmitting(true);
      const result = await signIn(email.trim(), password);

      if (result.success) {
        showToast('Berhasil masuk ke panel administrator');
        navigate('/admin');
      } else {
        setErrorMessage(result.error || 'Email atau kata sandi tidak sesuai.');
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'Terjadi kesalahan sistem saat login.');
    } finally {
      setSubmitting(false);
    }
  };

  const fillDemoCredentials = () => {
    setEmail('admin@indokreasi.id');
    setPassword('admin123');
    setErrorMessage(null);
  };

  return (
    <div className="min-h-screen bg-[#09090F] flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center px-4">
        <Link to="/" className="inline-flex items-center gap-2.5 mb-6 group">
          <div className="w-10 h-10 rounded-xl bg-[#8B5CF6] flex items-center justify-center p-0.5">
            <div className="w-full h-full bg-[#171321] rounded-[9px] flex items-center justify-center">
              <Gamepad2 className="w-5 h-5 text-[#C4B5FD]" />
            </div>
          </div>
          <span className="font-display font-bold text-xl text-[#F5F3FF]">
            PT INDO KREASI
          </span>
        </Link>
        <h2 className="text-2xl font-display font-bold text-[#F5F3FF]">
          Portal Administrator CMS
        </h2>
        <p className="mt-1 text-xs text-[#A7A1B5]">
          Kelola portofolio game, layanan, homepage, dan pesan masuk.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4">
        <div className="bg-[#171321] border border-[#332A45] py-8 px-6 sm:px-10 rounded-2xl shadow-2xl space-y-6">
          {/* Supabase status badge */}
          <div className="p-3 rounded-lg bg-[#201A2D] border border-[#332A45] text-xs flex items-start gap-2.5">
            <Info className="w-4 h-4 text-[#8B5CF6] shrink-0 mt-0.5" />
            <div className="space-y-1">
              <span className="font-semibold text-[#F5F3FF] block">
                {isSupabaseConfigured ? 'Supabase Auth Aktif' : 'Mode Akses Cepat / Demo Tersedia'}
              </span>
              <p className="text-[11px] text-[#A7A1B5] leading-relaxed">
                {isSupabaseConfigured
                  ? 'Terhubung langsung ke akun Supabase Authentication Anda.'
                  : 'Gunakan kredensial pengujian di bawah untuk langsung mencoba seluruh fungsi CRUD.'}
              </p>
            </div>
          </div>

          {errorMessage && (
            <div className="p-3.5 rounded-lg bg-red-950/40 border border-red-500/40 text-xs text-red-300 flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
              <span>{errorMessage}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label className="block text-xs font-medium text-[#F5F3FF]">
                Email Administrator
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#A7A1B5]" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@indokreasi.id"
                  required
                  className="w-full pl-9 pr-3.5 py-2.5 rounded-lg bg-[#201A2D] border border-[#332A45] text-xs text-[#F5F3FF] focus:outline-none focus:ring-1 focus:ring-[#8B5CF6]"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-medium text-[#F5F3FF]">
                Kata Sandi
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#A7A1B5]" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full pl-9 pr-3.5 py-2.5 rounded-lg bg-[#201A2D] border border-[#332A45] text-xs text-[#F5F3FF] focus:outline-none focus:ring-1 focus:ring-[#8B5CF6]"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg bg-[#8B5CF6] hover:bg-[#7C3AED] disabled:opacity-50 text-xs font-semibold text-white transition-colors mt-2"
            >
              {submitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Memverifikasi...</span>
                </>
              ) : (
                <>
                  <span>Masuk ke Dashboard</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Quick Demo fill button */}
          <div className="pt-2 border-t border-[#332A45]/80 text-center">
            <button
              type="button"
              onClick={fillDemoCredentials}
              className="text-xs text-[#C4B5FD] hover:text-white underline decoration-[#8B5CF6]/50"
            >
              Gunakan Akun Demo (admin@indokreasi.id)
            </button>
          </div>
        </div>

        <div className="mt-6 text-center">
          <Link
            to="/"
            className="text-xs text-[#A7A1B5] hover:text-[#F5F3FF] transition-colors"
          >
            ← Kembali ke Website Publik
          </Link>
        </div>
      </div>
    </div>
  );
};
