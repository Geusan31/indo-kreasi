import React, { useState, useEffect } from 'react';
import {
  Database,
  CheckCircle2,
  AlertCircle,
  Copy,
  Check,
  RefreshCw,
  FileCode,
  ExternalLink,
  UploadCloud,
  ChevronDown,
  ChevronUp,
  Sparkles,
  KeyRound,
  Sliders,
  HelpCircle,
  Info,
  Trash2,
} from 'lucide-react';
import {
  checkIsSupabaseConfigured,
  getSupabaseUrl,
  getSupabaseAnonKey,
  getSupabaseSource,
  getSupabaseDiagnostics,
  saveSupabaseConfig,
  clearSupabaseConfig,
  supabase,
} from '../../lib/supabase';
import { syncSeedDataToSupabase } from '../../lib/db';
import { useToast } from '../../components/ui/Toast';
import {
  SQL_INITIAL_SCHEMA,
  SQL_RLS_POLICIES,
  SQL_STORAGE,
  SQL_SEED,
} from '../../data/migrationSql';

export const AdminSettings: React.FC = () => {
  const { showToast } = useToast();
  const [testing, setTesting] = useState(false);
  const [syncing, setSyncing] = useState(false);
  const [testResult, setTestResult] = useState<string | null>(null);
  const [syncResult, setSyncResult] = useState<{ success: boolean; message: string } | null>(null);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [expandedSql, setExpandedSql] = useState<string | null>('004_seed');

  // Interactive connection config form state
  const [inputUrl, setInputUrl] = useState('');
  const [inputAnonKey, setInputAnonKey] = useState('');
  const [isConfigured, setIsConfigured] = useState(false);
  const [configSource, setConfigSource] = useState<'env' | 'custom' | 'none'>('none');
  const [diagnostics, setDiagnostics] = useState(getSupabaseDiagnostics());
  const [showConfigForm, setShowConfigForm] = useState(true);

  // Sync state with current config
  const reloadConfigState = () => {
    const configured = checkIsSupabaseConfigured();
    setIsConfigured(configured);
    setConfigSource(getSupabaseSource());
    setDiagnostics(getSupabaseDiagnostics());
    setInputUrl(getSupabaseUrl());
    setInputAnonKey(getSupabaseAnonKey());
  };

  useEffect(() => {
    reloadConfigState();

    const handleConfigChange = () => reloadConfigState();
    window.addEventListener('indokreasi_supabase_configured', handleConfigChange);
    return () => {
      window.removeEventListener('indokreasi_supabase_configured', handleConfigChange);
    };
  }, []);

  const handleSaveCustomConfig = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputUrl.trim() || !inputAnonKey.trim()) {
      showToast('Harap isi URL dan Anon Key Supabase', 'error');
      return;
    }

    if (!inputUrl.startsWith('http://') && !inputUrl.startsWith('https://')) {
      showToast('URL Supabase harus diawali dengan https://', 'error');
      return;
    }

    saveSupabaseConfig(inputUrl.trim(), inputAnonKey.trim());
    reloadConfigState();
    showToast('Konfigurasi Supabase berhasil disimpan!', 'success');

    // Auto-test connection after save
    setTimeout(() => {
      handleTestConnection();
    }, 200);
  };

  const handleResetCustomConfig = () => {
    if (confirm('Hapus konfigurasi Supabase kustom dan kembali ke pengaturan .env bawaan?')) {
      clearSupabaseConfig();
      reloadConfigState();
      showToast('Konfigurasi kustom dihapus');
    }
  };

  const handleTestConnection = async () => {
    setTesting(true);
    setTestResult(null);

    if (!checkIsSupabaseConfigured()) {
      setTestResult(
        'Kunci Supabase belum dikonfigurasi. Masukkan URL dan Anon Key pada formulir di bawah ini, atau pasang di .env / Vercel dan lakukan Redeploy.'
      );
      setTesting(false);
      return;
    }

    try {
      const { error } = await supabase.from('company_info').select('id').limit(1);
      if (error) {
        if (error.code === '42P01') {
          setTestResult(
            'Koneksi ke server Supabase BERHASIL terhubung, namun TABEL DATABASE BELUM DIBUAT (Error 42P01: relation company_info does not exist). Silakan jalankan skrip SQL di bawah pada menu Supabase SQL Editor.'
          );
        } else {
          setTestResult(`Peringatan koneksi: ${error.message} (Periksa konfigurasi tabel atau aturan RLS)`);
        }
      } else {
        setTestResult('Koneksi ke Supabase PostgreSQL berhasil terverifikasi dan tabel ditemukan!');
      }
    } catch (err: any) {
      setTestResult(`Error koneksi: ${err.message || 'Gagal menghubungi server Supabase'}`);
    } finally {
      setTesting(false);
    }
  };

  const handleSyncToSupabase = async () => {
    if (!checkIsSupabaseConfigured()) {
      showToast('Koneksi Supabase belum aktif. Isi formulir konfigurasi terlebih dahulu.', 'error');
      setShowConfigForm(true);
      return;
    }

    try {
      setSyncing(true);
      setSyncResult(null);
      const res = await syncSeedDataToSupabase();
      setSyncResult(res);
      if (res.success) {
        showToast('Berhasil memigrasikan seluruh konten ke Supabase!', 'success');
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

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    showToast('Kode SQL lengkap disalin ke papan klip');
    setTimeout(() => setCopiedKey(null), 2500);
  };

  const handleResetLocalData = () => {
    if (confirm('Apakah Anda ingin menyetel ulang data lokal ke kondisi seed bawaan (6 game published, 5 layanan)?')) {
      localStorage.removeItem('indokreasi_games');
      localStorage.removeItem('indokreasi_services');
      localStorage.removeItem('indokreasi_company');
      localStorage.removeItem('indokreasi_homepage');
      localStorage.removeItem('indokreasi_inquiries');
      localStorage.removeItem('indokreasi_media');
      window.dispatchEvent(new Event('indokreasi_data_updated'));
      showToast('Data lokal berhasil di-reset ke data bawaan');
      setTimeout(() => window.location.reload(), 500);
    }
  };

  return (
    <div className="space-y-8 max-w-4xl">
      <div>
        <h1 className="text-2xl font-display font-bold text-[#F5F3FF]">
          Pengaturan Sistem & Database Supabase
        </h1>
        <p className="text-xs text-[#A7A1B5] mt-1">
          Pantau status integrasi Supabase, sambungkan kredensial API secara instan, jalankan migrasi data, dan salin skrip SQL lengkap.
        </p>
      </div>

      {/* Supabase Connection Status Card */}
      <div className="p-6 rounded-xl bg-[#171321] border border-[#332A45] space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <Database className="w-5 h-5 text-[#8B5CF6]" />
            <div>
              <h2 className="font-display font-semibold text-base text-[#F5F3FF]">
                Status Integrasi Database Supabase
              </h2>
              <span className="text-[11px] text-[#A7A1B5]">
                {isConfigured
                  ? `Sumber Kredensial: ${configSource === 'custom' ? 'Formulir Browser (LocalStorage)' : 'Environment Variable (.env / Build)'}`
                  : 'Belum terhubung ke Supabase'}
              </span>
            </div>
          </div>
          <span
            className={`px-3 py-1 rounded text-xs font-mono font-medium ${isConfigured
                ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/40'
                : 'bg-amber-500/15 text-amber-400 border border-amber-500/40'
              }`}
          >
            {isConfigured ? 'TERHUBUNG (ONLINE)' : 'MODE LOKAL REACTIVE'}
          </span>
        </div>

        {/* Live Diagnostics pills */}
        <div className="p-3 rounded-lg bg-[#0F0C16] border border-[#332A45] flex flex-wrap items-center gap-3 text-xs">
          <span className="text-[#A7A1B5] font-medium text-[11px]">Status Environment Build:</span>
          {diagnostics.detectedEnvKeys.length > 0 ? (
            diagnostics.detectedEnvKeys.map((key) => (
              <span
                key={key}
                className="px-2 py-0.5 rounded bg-emerald-950/50 border border-emerald-500/30 text-emerald-300 font-mono text-[10px]"
              >
                ✓ {key}
              </span>
            ))
          ) : (
            <span className="px-2 py-0.5 rounded bg-amber-950/50 border border-amber-500/30 text-amber-300 font-mono text-[10px]">
              Variabel Vercel / .env belum terbaca saat build terakhir
            </span>
          )}
          {configSource === 'custom' && (
            <span className="px-2 py-0.5 rounded bg-[#8B5CF6]/20 border border-[#8B5CF6]/40 text-[#C4B5FD] font-mono text-[10px]">
              Kredensial Aktif via Browser LocalStorage
            </span>
          )}
        </div>

        <p className="text-xs text-[#A7A1B5] leading-relaxed">
          {isConfigured
            ? 'Aplikasi telah terhubung ke proyek Supabase Anda. Klik tombol hijau di bawah untuk memindahkan dan menyuntikkan 6 game, 5 layanan studio, serta profil bawaan langsung ke tabel PostgreSQL Supabase.'
            : 'Saat ini aplikasi beroperasi secara offline menggunakan penyimpanan reaktif (LocalStorage) yang sudah lengkap berisi 6 judul game dan 5 layanan studio. Masukkan kredensial Supabase Anda di bawah ini untuk menghubungkan database cloud.'}
        </p>

        {/* Action Buttons: ALWAYS VISIBLE */}
        <div className="pt-2 flex flex-wrap items-center gap-3">
          {/* SINKRONKAN / MIGRASIKAN DATA AWAL BUTTON */}
          <button
            type="button"
            onClick={handleSyncToSupabase}
            disabled={syncing}
            className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs font-bold text-white transition-all cursor-pointer shadow-lg ${isConfigured
                ? 'bg-emerald-600 hover:bg-emerald-500 shadow-emerald-950/50 ring-2 ring-emerald-500/30'
                : 'bg-emerald-700/80 hover:bg-emerald-600 border border-emerald-500/50'
              }`}
            title="Kirim 6 game bawaan, 5 layanan, dan profil studio ke Supabase"
          >
            <UploadCloud className={`w-4 h-4 ${syncing ? 'animate-bounce' : ''}`} />
            <span>{syncing ? 'Menyinkronkan...' : 'Migrasikan Data Bawaan ke Supabase'}</span>
          </button>

          <button
            type="button"
            onClick={handleTestConnection}
            disabled={testing}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#201A2D] hover:bg-[#282138] border border-[#332A45] disabled:opacity-50 text-xs font-semibold text-[#F5F3FF] transition-colors cursor-pointer"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${testing ? 'animate-spin' : ''}`} />
            <span>Uji Status Tabel Supabase</span>
          </button>

          <a
            href="https://supabase.com/dashboard"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg bg-[#201A2D] hover:bg-[#282138] border border-[#332A45] text-xs font-semibold text-[#C4B5FD] transition-colors"
          >
            <span>Buka Supabase Dashboard</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        {testResult && (
          <div className="p-3.5 rounded-lg bg-[#201A2D] border border-[#332A45] text-xs text-[#F5F3FF] flex items-start gap-2.5">
            {testResult.includes('berhasil') ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            ) : (
              <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            )}
            <span className="leading-relaxed">{testResult}</span>
          </div>
        )}

        {syncResult && (
          <div
            className={`p-3.5 rounded-lg border text-xs flex items-start gap-2.5 ${syncResult.success
                ? 'bg-emerald-950/30 border-emerald-500/40 text-emerald-200'
                : 'bg-amber-950/30 border-amber-500/40 text-amber-200'
              }`}
          >
            {syncResult.success ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            ) : (
              <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            )}
            <span className="leading-relaxed">{syncResult.message}</span>
          </div>
        )}
      </div>

      {/* Direct In-App Supabase Credentials Configuration Form */}
      <div className="p-6 rounded-xl bg-[#171321] border border-[#332A45] space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <KeyRound className="w-4 h-4 text-[#8B5CF6]" />
            <h2 className="font-display font-semibold text-sm text-[#F5F3FF] uppercase tracking-wider">
              Konfigurasi Kunci Supabase (Instan di Browser)
            </h2>
          </div>
          {configSource === 'custom' && (
            <button
              type="button"
              onClick={handleResetCustomConfig}
              className="inline-flex items-center gap-1.5 text-xs text-rose-400 hover:text-rose-300 transition-colors"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Hapus Kredensial Kustom</span>
            </button>
          )}
        </div>

        <p className="text-xs text-[#A7A1B5] leading-relaxed">
          Anda dapat langsung memasukkan <strong>Project URL</strong> dan <strong>Anon Key</strong> Supabase Anda di sini tanpa perlu rebuild atau redeploy. Kredensial akan disimpan di browser dan langsung menghubungkan aplikasi ke Supabase.
        </p>

        <form onSubmit={handleSaveCustomConfig} className="space-y-4 pt-1">
          <div>
            <label className="block text-xs font-semibold text-[#F5F3FF] mb-1.5">
              Supabase Project URL
            </label>
            <input
              type="url"
              placeholder="https://abcdefghijklmnop.supabase.co"
              value={inputUrl}
              onChange={(e) => setInputUrl(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-lg bg-[#0F0C16] border border-[#332A45] text-xs font-mono text-[#F5F3FF] focus:border-[#8B5CF6] focus:outline-none transition-colors"
            />
            <p className="text-[11px] text-[#A7A1B5] mt-1">
              Dapat dilihat di Supabase Dashboard &gt; Project Settings &gt; API &gt; Project URL
            </p>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#F5F3FF] mb-1.5">
              Supabase Project API Key (anon / public)
            </label>
            <textarea
              rows={2}
              placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
              value={inputAnonKey}
              onChange={(e) => setInputAnonKey(e.target.value)}
              className="w-full px-3.5 py-2 rounded-lg bg-[#0F0C16] border border-[#332A45] text-xs font-mono text-[#F5F3FF] focus:border-[#8B5CF6] focus:outline-none transition-colors"
            />
            <p className="text-[11px] text-[#A7A1B5] mt-1">
              Dapat dilihat di Supabase Dashboard &gt; Project Settings &gt; API &gt; Project API Keys &gt; anon (public)
            </p>
          </div>

          <div className="flex items-center gap-3 pt-1">
            <button
              type="submit"
              className="px-5 py-2 rounded-lg bg-[#8B5CF6] hover:bg-[#7C3AED] text-xs font-semibold text-white transition-colors cursor-pointer shadow-md shadow-violet-950/40"
            >
              Simpan & Hubungkan ke Supabase
            </button>
            {isConfigured && (
              <span className="text-xs text-emerald-400 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Kredensial aktif
              </span>
            )}
          </div>
        </form>
      </div>

      {/* Explanation Box: Why is Vercel / Preview not detecting env vars? */}
      <div className="p-5 rounded-xl bg-[#201A2D]/80 border border-[#8B5CF6]/30 space-y-3">
        <div className="flex items-center gap-2 text-[#C4B5FD]">
          <HelpCircle className="w-4 h-4 shrink-0 text-[#8B5CF6]" />
          <h3 className="font-semibold text-xs uppercase tracking-wider">
            Mengapa di Vercel atau Hosting .env Belum Terdeteksi Otomatis?
          </h3>
        </div>

        <div className="text-xs text-[#A7A1B5] space-y-2 leading-relaxed">
          <p>
            Aplikasi ini dibuat menggunakan <strong>Vite (Single Page Application)</strong>. Pada arsitektur Vite:
          </p>
          <ul className="list-disc list-inside space-y-1 pl-1 text-[#F5F3FF]">
            <li>
              Variabel environment <strong>HARUS</strong> diawali dengan prefiks <code className="text-[#C4B5FD] font-mono">VITE_</code>, yaitu:
              <span className="block font-mono text-[11px] text-[#8B5CF6] mt-0.5 ml-4">
                VITE_SUPABASE_URL dan VITE_SUPABASE_ANON_KEY
              </span>
            </li>
            <li>
              <strong>PENTING DI VERCEL:</strong> Variabel environment pada Vite ditanamkan ke dalam JavaScript <em>pada saat proses build</em> (<code className="font-mono text-[#C4B5FD]">npm run build</code>). Jika Anda baru menambahkan variabel di <strong>Vercel Settings &gt; Environment Variables</strong>, Vercel <strong>TIDAK</strong> langsung mengaplikasikannya ke deployment yang sudah berjalan. Anda <strong>WAJIB menekan tombol REDEPLOY</strong> di tab Deployments Vercel!
            </li>
            <li>
              <strong>Solusi Tanpa Redeploy:</strong> Cukup gunakan formulir <strong>&quot;Konfigurasi Kunci Supabase&quot;</strong> di atas. Setelah disimpan, aplikasi di browser Anda langsung terhubung secara live tanpa perlu redeploy.
            </li>
          </ul>
        </div>
      </div>

      {/* Guide: Why is database empty & How to migrate */}
      <div className="p-6 rounded-xl bg-[#171321] border border-[#332A45] space-y-4">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-[#8B5CF6]" />
          <h2 className="font-display font-semibold text-sm text-[#F5F3FF] uppercase tracking-wider">
            Panduan Migrasi Database Supabase (3 Langkah Cepat)
          </h2>
        </div>

        <p className="text-xs text-[#A7A1B5] leading-relaxed">
          Proyek baru di Supabase selalu dimulai dengan database PostgreSQL kosong tanpa tabel. Agar database memiliki tabel dan terisi seluruh portofolio 6 game studio:
        </p>

        <div className="space-y-3 pt-1">
          <div className="flex items-start gap-3 p-3 rounded-lg bg-[#201A2D] border border-[#332A45]">
            <span className="w-6 h-6 rounded-full bg-[#8B5CF6] text-white flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
              1
            </span>
            <div className="text-xs">
              <h4 className="font-semibold text-[#F5F3FF]">Buka SQL Editor di Dashboard Supabase</h4>
              <p className="text-[#A7A1B5] mt-0.5">
                Masuk ke proyek Supabase Anda, lalu klik tab <strong>SQL Editor</strong> pada bilah navigasi kiri.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 rounded-lg bg-[#201A2D] border border-[#332A45]">
            <span className="w-6 h-6 rounded-full bg-[#8B5CF6] text-white flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
              2
            </span>
            <div className="text-xs">
              <h4 className="font-semibold text-[#F5F3FF]">Salin &amp; Jalankan Skrip Skema, RLS, &amp; Storage</h4>
              <p className="text-[#A7A1B5] mt-0.5">
                Salin skrip <strong>001_initial_schema.sql</strong> di bawah, tempelkan ke SQL Editor lalu klik <strong>Run</strong>. Lakukan hal yang sama untuk <strong>002_rls_policies.sql</strong> dan <strong>003_storage.sql</strong>.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 rounded-lg bg-[#201A2D] border border-[#332A45]">
            <span className="w-6 h-6 rounded-full bg-[#10B981] text-white flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
              3
            </span>
            <div className="text-xs">
              <h4 className="font-semibold text-[#F5F3FF]">
                Jalankan Skrip Seed Data (004) atau Klik Tombol Hijau
              </h4>
              <p className="text-[#A7A1B5] mt-0.5">
                Salin skrip <strong>004_seed_data.sql</strong> di bawah dan jalankan di SQL Editor (paling cepat dan langsung mengisi seluruh tabel), atau klik tombol hijau <strong>&quot;Sinkronkan Data Awal ke Supabase&quot;</strong> di atas.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* SQL Migration Scripts (Complete with Seed Data) */}
      <div className="p-6 rounded-xl bg-[#171321] border border-[#332A45] space-y-4">
        <div className="flex items-center gap-2">
          <FileCode className="w-4 h-4 text-[#8B5CF6]" />
          <h2 className="font-display font-semibold text-sm text-[#F5F3FF] uppercase tracking-wider">
            Skrip SQL Lengkap (Siap Salin &amp; Tempel di Supabase)
          </h2>
        </div>

        <p className="text-xs text-[#A7A1B5]">
          Semua skrip di bawah telah dibuat idempoten (<code className="text-[#C4B5FD] font-mono">IF NOT EXISTS</code> dan <code className="text-[#C4B5FD] font-mono">DROP POLICY IF EXISTS</code>) sehingga aman dijalankan berkali-kali tanpa error.
        </p>

        <div className="space-y-3 pt-2">
          {/* File 4: Seed Data (Highlighted first) */}
          <div className="rounded-lg border border-emerald-500/40 bg-[#0F0C16] overflow-hidden">
            <div className="p-3.5 bg-emerald-950/20 flex items-center justify-between">
              <div>
                <span className="text-xs font-mono font-bold text-emerald-400">
                  004_seed_data.sql (Data Awal 6 Game &amp; Layanan)
                </span>
                <p className="text-[11px] text-[#A7A1B5]">
                  Menyuntikkan data bawaan: 6 game published, 5 layanan studio, seksi homepage, dan profil PT Indo Kreasi.
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleCopy(SQL_SEED, '004_seed')}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-medium transition-colors cursor-pointer"
                >
                  {copiedKey === '004_seed' ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>Tersalin!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Salin SQL Seed</span>
                    </>
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => setExpandedSql(expandedSql === '004_seed' ? null : '004_seed')}
                  className="p-1.5 rounded hover:bg-[#201A2D] text-[#A7A1B5] transition-colors"
                >
                  {expandedSql === '004_seed' ? (
                    <ChevronUp className="w-4 h-4" />
                  ) : (
                    <ChevronDown className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>
            {expandedSql === '004_seed' && (
              <pre className="p-4 text-[11px] font-mono text-[#C4B5FD] overflow-x-auto max-h-72 bg-[#0F0C16] border-t border-[#332A45] leading-relaxed">
                {SQL_SEED}
              </pre>
            )}
          </div>

          {/* File 1: Initial Schema */}
          <div className="rounded-lg border border-[#332A45] bg-[#0F0C16] overflow-hidden">
            <div className="p-3.5 bg-[#171321] flex items-center justify-between">
              <div>
                <span className="text-xs font-mono font-bold text-[#F5F3FF]">
                  001_initial_schema.sql (Struktur Tabel Database)
                </span>
                <p className="text-[11px] text-[#A7A1B5]">
                  Membuat tabel games, services, company_info, homepage_sections, inquiries, media, dan profiles.
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleCopy(SQL_INITIAL_SCHEMA, '001_schema')}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-[#201A2D] hover:bg-[#282138] border border-[#332A45] text-[#F5F3FF] text-xs font-medium transition-colors cursor-pointer"
                >
                  {copiedKey === '001_schema' ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Tersalin!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-[#8B5CF6]" />
                      <span>Salin SQL Skema</span>
                    </>
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => setExpandedSql(expandedSql === '001_schema' ? null : '001_schema')}
                  className="p-1.5 rounded hover:bg-[#201A2D] text-[#A7A1B5] transition-colors"
                >
                  {expandedSql === '001_schema' ? (
                    <ChevronUp className="w-4 h-4" />
                  ) : (
                    <ChevronDown className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>
            {expandedSql === '001_schema' && (
              <pre className="p-4 text-[11px] font-mono text-[#C4B5FD] overflow-x-auto max-h-72 bg-[#0F0C16] border-t border-[#332A45] leading-relaxed">
                {SQL_INITIAL_SCHEMA}
              </pre>
            )}
          </div>

          {/* File 2: RLS Policies */}
          <div className="rounded-lg border border-[#332A45] bg-[#0F0C16] overflow-hidden">
            <div className="p-3.5 bg-[#171321] flex items-center justify-between">
              <div>
                <span className="text-xs font-mono font-bold text-[#F5F3FF]">
                  002_rls_policies.sql (Aturan Keamanan Row Level Security)
                </span>
                <p className="text-[11px] text-[#A7A1B5]">
                  Mengaktifkan hak akses publik untuk membaca katalog dan hak admin untuk modifikasi data.
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleCopy(SQL_RLS_POLICIES, '002_rls')}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-[#201A2D] hover:bg-[#282138] border border-[#332A45] text-[#F5F3FF] text-xs font-medium transition-colors cursor-pointer"
                >
                  {copiedKey === '002_rls' ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Tersalin!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-[#8B5CF6]" />
                      <span>Salin SQL RLS</span>
                    </>
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => setExpandedSql(expandedSql === '002_rls' ? null : '002_rls')}
                  className="p-1.5 rounded hover:bg-[#201A2D] text-[#A7A1B5] transition-colors"
                >
                  {expandedSql === '002_rls' ? (
                    <ChevronUp className="w-4 h-4" />
                  ) : (
                    <ChevronDown className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>
            {expandedSql === '002_rls' && (
              <pre className="p-4 text-[11px] font-mono text-[#C4B5FD] overflow-x-auto max-h-72 bg-[#0F0C16] border-t border-[#332A45] leading-relaxed">
                {SQL_RLS_POLICIES}
              </pre>
            )}
          </div>

          {/* File 3: Storage */}
          <div className="rounded-lg border border-[#332A45] bg-[#0F0C16] overflow-hidden">
            <div className="p-3.5 bg-[#171321] flex items-center justify-between">
              <div>
                <span className="text-xs font-mono font-bold text-[#F5F3FF]">
                  003_storage.sql (Bucket Penyimpanan Asset Media)
                </span>
                <p className="text-[11px] text-[#A7A1B5]">
                  Menyiapkan bucket &apos;website-assets&apos; publik untuk file gambar, cover game, dan banner.
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleCopy(SQL_STORAGE, '003_storage')}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-[#201A2D] hover:bg-[#282138] border border-[#332A45] text-[#F5F3FF] text-xs font-medium transition-colors cursor-pointer"
                >
                  {copiedKey === '003_storage' ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Tersalin!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-[#8B5CF6]" />
                      <span>Salin SQL Storage</span>
                    </>
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => setExpandedSql(expandedSql === '003_storage' ? null : '003_storage')}
                  className="p-1.5 rounded hover:bg-[#201A2D] text-[#A7A1B5] transition-colors"
                >
                  {expandedSql === '003_storage' ? (
                    <ChevronUp className="w-4 h-4" />
                  ) : (
                    <ChevronDown className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>
            {expandedSql === '003_storage' && (
              <pre className="p-4 text-[11px] font-mono text-[#C4B5FD] overflow-x-auto max-h-72 bg-[#0F0C16] border-t border-[#332A45] leading-relaxed">
                {SQL_STORAGE}
              </pre>
            )}
          </div>
        </div>
      </div>

      {/* Local Data Management */}
      <div className="p-6 rounded-xl bg-[#171321] border border-[#332A45] space-y-4">
        <h2 className="font-display font-semibold text-sm text-[#F5F3FF] uppercase tracking-wider">
          Penyimpanan Lokal (Offline Fallback)
        </h2>
        <p className="text-xs text-[#A7A1B5] leading-relaxed">
          Jika tidak tersambung ke Supabase, sistem menggunakan penyimpanan lokal reaktif. Anda dapat mereset data lokal ke kondisi bawaan awal (6 game published &amp; 5 layanan studio) kapan saja jika diperlukan.
        </p>
        <button
          type="button"
          onClick={handleResetLocalData}
          className="px-4 py-2 rounded-lg bg-[#201A2D] hover:bg-rose-950/40 hover:border-rose-500/50 border border-[#332A45] text-xs font-semibold text-rose-300 transition-colors"
        >
          Reset Data Lokal ke Seed Bawaan
        </button>
      </div>
    </div>
  );
};
