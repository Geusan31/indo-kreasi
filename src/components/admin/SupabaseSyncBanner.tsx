import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Database,
  UploadCloud,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  RefreshCw,
  KeyRound,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  FileCode,
} from 'lucide-react';
import {
  checkIsSupabaseConfigured,
  getSupabaseUrl,
  getSupabaseAnonKey,
  getSupabaseSource,
  getSupabaseDiagnostics,
  saveSupabaseConfig,
  supabase,
} from '../../lib/supabase';
import { syncSeedDataToSupabase } from '../../lib/db';
import { useToast } from '../ui/Toast';

export const SupabaseSyncBanner: React.FC<{ compact?: boolean }> = ({ compact = false }) => {
  const { showToast } = useToast();
  const [isConfigured, setIsConfigured] = useState(false);
  const [configSource, setConfigSource] = useState<'env' | 'custom' | 'none'>('none');
  const [diagnostics, setDiagnostics] = useState(getSupabaseDiagnostics());

  const [syncing, setSyncing] = useState(false);
  const [testing, setTesting] = useState(false);
  const [syncResult, setSyncResult] = useState<{ success: boolean; message: string } | null>(null);
  const [testResult, setTestResult] = useState<string | null>(null);

  // Quick manual input
  const [showQuickConnect, setShowQuickConnect] = useState(false);
  const [showVercelGuide, setShowVercelGuide] = useState(false);
  const [inputUrl, setInputUrl] = useState('');
  const [inputAnonKey, setInputAnonKey] = useState('');

  const reloadState = () => {
    setIsConfigured(checkIsSupabaseConfigured());
    setConfigSource(getSupabaseSource());
    setDiagnostics(getSupabaseDiagnostics());
    setInputUrl(getSupabaseUrl());
    setInputAnonKey(getSupabaseAnonKey());
  };

  useEffect(() => {
    reloadState();
    const handleUpdate = () => reloadState();
    window.addEventListener('indokreasi_supabase_configured', handleUpdate);
    return () => {
      window.removeEventListener('indokreasi_supabase_configured', handleUpdate);
    };
  }, []);

  const handleSync = async () => {
    if (!checkIsSupabaseConfigured()) {
      showToast('Koneksi Supabase belum terdeteksi. Isi formulir cepat di bawah ini.', 'error');
      setShowQuickConnect(true);
      return;
    }

    try {
      setSyncing(true);
      setSyncResult(null);
      const res = await syncSeedDataToSupabase();
      setSyncResult(res);
      if (res.success) {
        showToast('Berhasil memigrasikan seluruh 6 game & 5 layanan ke Supabase!', 'success');
      } else {
        showToast(res.message, 'error');
      }
    } catch (err: any) {
      setSyncResult({
        success: false,
        message: err.message || 'Gagal menyinkronkan data ke Supabase',
      });
      showToast('Gagal sinkronisasi data', 'error');
    } finally {
      setSyncing(false);
    }
  };

  const handleTest = async () => {
    setTesting(true);
    setTestResult(null);

    if (!checkIsSupabaseConfigured()) {
      setTestResult('Kunci Supabase belum terdeteksi. Silakan masukkan di bawah ini.');
      setTesting(false);
      return;
    }

    try {
      const { error } = await supabase.from('company_info').select('id').limit(1);
      if (error) {
        if (error.code === '42P01') {
          setTestResult(
            'Koneksi Supabase BERHASIL terhubung! Namun tabel PostgreSQL belum dibuat. Buka menu Pengaturan & Supabase untuk menyalin skrip SQL Skema.'
          );
        } else {
          setTestResult(`Peringatan: ${error.message}`);
        }
      } else {
        setTestResult('Koneksi ke Supabase aktif dan tabel ditemukan siap digunakan!');
      }
    } catch (err: any) {
      setTestResult(`Error: ${err.message || 'Gagal menghubungi server Supabase'}`);
    } finally {
      setTesting(false);
    }
  };

  const handleQuickSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputUrl.trim() || !inputAnonKey.trim()) {
      showToast('Harap isi URL dan Anon Key', 'error');
      return;
    }
    saveSupabaseConfig(inputUrl.trim(), inputAnonKey.trim());
    reloadState();
    showToast('Kredensial Supabase berhasil disimpan di browser!', 'success');
    setShowQuickConnect(false);
  };

  return (
    <div className="rounded-xl bg-gradient-to-r from-[#171321] via-[#201A2D] to-[#171321] border border-[#8B5CF6]/40 p-5 shadow-xl relative overflow-hidden">
      {/* Background glow decoration */}
      <div className="absolute top-0 right-0 w-80 h-32 bg-[#8B5CF6]/10 blur-3xl pointer-events-none" />

      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        {/* Left info */}
        <div className="space-y-1.5 max-w-2xl">
          <div className="flex flex-wrap items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-[#8B5CF6]/20 border border-[#8B5CF6]/50 flex items-center justify-center text-[#C4B5FD]">
              <Database className="w-4 h-4" />
            </div>
            <h3 className="font-display font-bold text-sm sm:text-base text-[#F5F3FF]">
              Integrasi Database Supabase &amp; Migrasi Data Bawaan
            </h3>
            <span
              className={`px-2.5 py-0.5 rounded text-[10px] font-mono font-semibold ${
                isConfigured
                  ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/40'
                  : 'bg-amber-500/15 text-amber-300 border border-amber-500/40'
              }`}
            >
              {isConfigured
                ? `TERHUBUNG (${configSource === 'custom' ? 'BROWSER CONFIG' : 'VERCEL / ENV'})`
                : 'BELUM TERHUBUNG (MODE LOKAL)'}
            </span>
          </div>

          <p className="text-xs text-[#A7A1B5] leading-relaxed">
            {isConfigured
              ? 'Database Supabase aktif. Klik tombol di samping untuk menyuntikkan 6 game, 5 layanan studio, dan profil default ke tabel PostgreSQL Supabase Anda.'
              : 'Website saat ini menggunakan data bawaan lokal. Hubungkan ke Supabase atau masukkan kredensial agar data tersimpan aman di cloud.'}
          </p>
        </div>

        {/* Right CTA Actions: THE MIGRATION BUTTON IS RIGHT HERE! */}
        <div className="flex flex-wrap items-center gap-2.5 shrink-0">
          <button
            type="button"
            onClick={handleSync}
            disabled={syncing}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all shadow-lg shadow-emerald-950/50 cursor-pointer disabled:opacity-50"
            title="Kirim 6 game dan 5 layanan bawaan ke database Supabase Anda"
          >
            <UploadCloud className={`w-4 h-4 ${syncing ? 'animate-bounce' : ''}`} />
            <span>{syncing ? 'Menyinkronkan...' : 'Migrasikan Data Bawaan ke Supabase'}</span>
          </button>

          <button
            type="button"
            onClick={handleTest}
            disabled={testing}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-[#201A2D] hover:bg-[#282138] border border-[#332A45] text-xs font-semibold text-[#F5F3FF] transition-colors"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${testing ? 'animate-spin' : ''}`} />
            <span>Uji Status</span>
          </button>

          <button
            type="button"
            onClick={() => setShowQuickConnect(!showQuickConnect)}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-[#8B5CF6]/20 hover:bg-[#8B5CF6]/30 border border-[#8B5CF6]/40 text-xs font-semibold text-[#C4B5FD] transition-colors"
          >
            <KeyRound className="w-3.5 h-3.5" />
            <span>{showQuickConnect ? 'Tutup Kunci' : 'Input Kunci Supabase'}</span>
            {showQuickConnect ? (
              <ChevronUp className="w-3.5 h-3.5" />
            ) : (
              <ChevronDown className="w-3.5 h-3.5" />
            )}
          </button>

          <button
            type="button"
            onClick={() => setShowVercelGuide(!showVercelGuide)}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-[#201A2D] hover:bg-[#282138] border border-[#332A45] text-xs font-medium text-amber-300 transition-colors"
            title="Klik jika env var di Vercel tidak terdeteksi"
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Kenapa di Vercel Belum Kedetect?</span>
          </button>
        </div>
      </div>

      {/* Sync result alert */}
      {syncResult && (
        <div
          className={`mt-4 p-3.5 rounded-lg border text-xs flex items-start gap-2.5 ${
            syncResult.success
              ? 'bg-emerald-950/40 border-emerald-500/50 text-emerald-200'
              : 'bg-amber-950/40 border-amber-500/50 text-amber-200'
          }`}
        >
          {syncResult.success ? (
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
          ) : (
            <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
          )}
          <div className="space-y-1">
            <div className="font-semibold">{syncResult.message}</div>
            {!syncResult.success && syncResult.message.includes('Tabel belum ada') && (
              <div className="pt-1">
                <Link
                  to="/admin/settings"
                  className="text-xs text-[#C4B5FD] hover:underline font-semibold flex items-center gap-1"
                >
                  <FileCode className="w-3.5 h-3.5" />
                  <span>Buka Menu Pengaturan &amp; Supabase untuk menyalin skrip SQL skema</span>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Test result alert */}
      {testResult && (
        <div className="mt-4 p-3.5 rounded-lg bg-[#0F0C16] border border-[#332A45] text-xs text-[#F5F3FF] flex items-start gap-2.5">
          {testResult.includes('aktif') || testResult.includes('BERHASIL') ? (
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
          ) : (
            <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
          )}
          <span className="leading-relaxed">{testResult}</span>
        </div>
      )}

      {/* Vercel Troubleshooting Explanation Dropdown */}
      {showVercelGuide && (
        <div className="mt-4 p-4 rounded-lg bg-[#0F0C16] border border-amber-500/30 text-xs text-[#F5F3FF] space-y-3">
          <div className="flex items-center justify-between">
            <span className="font-bold text-amber-300 flex items-center gap-1.5 uppercase tracking-wider text-[11px]">
              <HelpCircle className="w-4 h-4" />
              Mengapa di Vercel Environment Variables Belum Terdeteksi?
            </span>
            <button
              onClick={() => setShowVercelGuide(false)}
              className="text-[#A7A1B5] hover:text-white text-xs"
            >
              ✕ Tutup
            </button>
          </div>

          <div className="text-[#A7A1B5] space-y-2 leading-relaxed">
            <p>
              Ada 3 penyebab utama mengapa variabel lingkungan di Vercel belum terbaca di aplikasi Vite SPA:
            </p>
            <ol className="list-decimal list-inside space-y-1.5 pl-1 text-slate-200">
              <li>
                <strong className="text-white">Wajib REDEPLOY di Vercel:</strong> Pada Vite, environment variable ditanamkan ke dalam file JavaScript <em>pada saat proses build</em>. Jika Anda baru menambahkan variabel di menu Settings Vercel setelah deployment dibuat, Vercel <strong>tidak otomatis rebuild</strong>.
                <div className="mt-1 p-2 bg-[#171321] rounded border border-[#332A45] text-[11px] text-[#C4B5FD]">
                  👉 <strong>Cara Cepat:</strong> Masuk ke <strong>Dashboard Vercel</strong> &gt; Tab <strong>Deployments</strong> &gt; Klik tombol titik tiga <code className="bg-[#201A2D] px-1 py-0.5 rounded">...</code> pada deployment terakhir &gt; Klik <strong>Redeploy</strong>!
                </div>
              </li>
              <li>
                <strong className="text-white">Prefiks Variabel di Vercel:</strong> Pastikan nama variabel adalah:
                <div className="mt-1 font-mono text-[11px] text-emerald-400 space-y-0.5 pl-2">
                  <div>VITE_SUPABASE_URL (atau SUPABASE_URL)</div>
                  <div>VITE_SUPABASE_ANON_KEY (atau SUPABASE_ANON_KEY)</div>
                </div>
              </li>
              <li>
                <strong className="text-white">Centang Target Environment:</strong> Pastikan saat membuat variable di Vercel, ketiga kotak: <strong>Production</strong>, <strong>Preview</strong>, dan <strong>Development</strong> semuanya diceklis.
              </li>
            </ol>

            <div className="pt-2 border-t border-[#332A45]/80 flex flex-wrap items-center justify-between gap-2">
              <span className="text-[11px] text-[#C4B5FD]">
                💡 <strong>Solusi Instan Tanpa Menunggu Redeploy Vercel:</strong> Anda bisa langsung masukkan URL dan Key melalui tombol <strong>&quot;Input Kunci Supabase&quot;</strong> di atas, tersimpan langsung di browser Anda!
              </span>
              <button
                type="button"
                onClick={() => {
                  setShowVercelGuide(false);
                  setShowQuickConnect(true);
                }}
                className="px-3 py-1 rounded bg-[#8B5CF6] hover:bg-[#7C3AED] text-white text-[11px] font-semibold"
              >
                Buka Input Kunci
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Quick Connect Form Dropdown */}
      {showQuickConnect && (
        <form
          onSubmit={handleQuickSave}
          className="mt-4 p-4 rounded-lg bg-[#0F0C16] border border-[#8B5CF6]/40 text-xs space-y-3"
        >
          <div className="flex items-center justify-between">
            <span className="font-semibold text-[#F5F3FF] flex items-center gap-1.5">
              <KeyRound className="w-4 h-4 text-[#8B5CF6]" />
              Formulir Sambung Supabase Cepat (Tersimpan di Browser Anda)
            </span>
            <button
              type="button"
              onClick={() => setShowQuickConnect(false)}
              className="text-[#A7A1B5] hover:text-white"
            >
              ✕
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] text-[#A7A1B5] mb-1">
                Supabase Project URL (https://xyz.supabase.co)
              </label>
              <input
                type="url"
                value={inputUrl}
                onChange={(e) => setInputUrl(e.target.value)}
                placeholder="https://your-project.supabase.co"
                className="w-full px-3 py-1.5 rounded bg-[#171321] border border-[#332A45] text-xs font-mono text-white focus:outline-none focus:border-[#8B5CF6]"
              />
            </div>
            <div>
              <label className="block text-[11px] text-[#A7A1B5] mb-1">
                Supabase anon / public API Key
              </label>
              <input
                type="text"
                value={inputAnonKey}
                onChange={(e) => setInputAnonKey(e.target.value)}
                placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
                className="w-full px-3 py-1.5 rounded bg-[#171321] border border-[#332A45] text-xs font-mono text-white focus:outline-none focus:border-[#8B5CF6]"
              />
            </div>
          </div>

          <div className="flex items-center justify-between pt-1">
            <p className="text-[11px] text-[#A7A1B5]">
              Dapatkan kredensial di <strong>Supabase Dashboard &gt; Project Settings &gt; API</strong>
            </p>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setShowQuickConnect(false)}
                className="px-3 py-1.5 rounded bg-[#201A2D] text-[#A7A1B5] hover:text-white"
              >
                Batal
              </button>
              <button
                type="submit"
                className="px-4 py-1.5 rounded bg-[#8B5CF6] hover:bg-[#7C3AED] text-white font-semibold shadow-md"
              >
                Simpan &amp; Aktifkan Supabase
              </button>
            </div>
          </div>
        </form>
      )}
    </div>
  );
};
