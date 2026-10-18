import React, { useState } from 'react';
import {
  Database,
  CheckCircle2,
  AlertCircle,
  Copy,
  Check,
  RefreshCw,
  FileCode,
  ExternalLink,
} from 'lucide-react';
import { isSupabaseConfigured, supabase } from '../../lib/supabase';
import { useToast } from '../../components/ui/Toast';

export const AdminSettings: React.FC = () => {
  const { showToast } = useToast();
  const [testing, setTesting] = useState(false);
  const [testResult, setTestResult] = useState<string | null>(null);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const handleTestConnection = async () => {
    setTesting(true);
    setTestResult(null);

    if (!isSupabaseConfigured) {
      setTestResult(
        'Variabel VITE_SUPABASE_URL atau VITE_SUPABASE_ANON_KEY belum dikonfigurasi di file .env. Sistem saat ini beroperasi menggunakan reactive local storage store.'
      );
      setTesting(false);
      return;
    }

    try {
      const { data, error } = await supabase.from('company_info').select('count', { count: 'exact', head: true });
      if (error) {
        setTestResult(`Koneksi gagal: ${error.message} (Periksa konfigurasi tabel atau RLS policy)`);
      } else {
        setTestResult('Koneksi ke Supabase PostgreSQL berhasil terverifikasi 100%!');
      }
    } catch (err: any) {
      setTestResult(`Error koneksi: ${err.message || 'Gagal menghubungi server Supabase'}`);
    } finally {
      setTesting(false);
    }
  };

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    showToast('Teks SQL disalin ke papan klip');
    setTimeout(() => setCopiedKey(null), 2500);
  };

  const handleResetLocalData = () => {
    if (confirm('Apakah Anda ingin menyetel ulang data lokal ke kondisi seed bawaan awal?')) {
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
          Pantau status integrasi Supabase, ambil skrip migrasi SQL, dan kelola sinkronisasi data.
        </p>
      </div>

      {/* Supabase Connection Status Card */}
      <div className="p-6 rounded-xl bg-[#171321] border border-[#332A45] space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Database className="w-5 h-5 text-[#8B5CF6]" />
            <h2 className="font-display font-semibold text-base text-[#F5F3FF]">
              Status Koneksi Supabase
            </h2>
          </div>
          <span
            className={`px-3 py-1 rounded text-xs font-mono font-medium ${
              isSupabaseConfigured
                ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                : 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
            }`}
          >
            {isSupabaseConfigured ? 'TERHUBUNG (ONLINE)' : 'MODE LOKAL'}
          </span>
        </div>

        <p className="text-xs text-[#A7A1B5] leading-relaxed">
          {isSupabaseConfigured
            ? 'Aplikasi terhubung ke URL Supabase Anda. Semua operasi CRUD, autentikasi admin, dan penyimpanan gambar akan langsung diproses di Supabase PostgreSQL & Storage.'
            : 'Aplikasi saat ini beroperasi menggunakan reactive local persistence layer dengan dataset lengkap. Anda dapat menguji seluruh fungsi CRUD di browser sekarang, lalu menghubungkan Supabase kapan saja dengan mengisi file .env.'}
        </p>

        <div className="pt-2 flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={handleTestConnection}
            disabled={testing}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#8B5CF6] hover:bg-[#7C3AED] disabled:opacity-50 text-xs font-semibold text-white transition-colors"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${testing ? 'animate-spin' : ''}`} />
            <span>Uji Koneksi Supabase</span>
          </button>

          <a
            href="https://supabase.com/dashboard"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#201A2D] hover:bg-[#282138] border border-[#332A45] text-xs font-semibold text-[#C4B5FD] transition-colors"
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
      </div>

      {/* Environment Setup Guide */}
      <div className="p-6 rounded-xl bg-[#171321] border border-[#332A45] space-y-4">
        <h2 className="font-display font-semibold text-sm text-[#F5F3FF] uppercase tracking-wider">
          Konfigurasi Kunci Lingkungan (.env)
        </h2>
        <p className="text-xs text-[#A7A1B5] leading-relaxed">
          Tambahkan kunci berikut ke dalam berkas <code className="text-[#C4B5FD] font-mono">.env</code> di root proyek Anda:
        </p>

        <div className="p-4 rounded-lg bg-[#09090F] border border-[#332A45] font-mono text-xs text-[#F5F3FF] space-y-1 overflow-x-auto">
          <div>VITE_SUPABASE_URL=https://[YOUR-PROJECT-ID].supabase.co</div>
          <div>VITE_SUPABASE_ANON_KEY=[YOUR-SUPABASE-ANON-KEY]</div>
        </div>
      </div>

      {/* SQL Migration Scripts */}
      <div className="p-6 rounded-xl bg-[#171321] border border-[#332A45] space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FileCode className="w-4 h-4 text-[#8B5CF6]" />
            <h2 className="font-display font-semibold text-sm text-[#F5F3FF] uppercase tracking-wider">
              Skrip SQL Migrasi Supabase
            </h2>
          </div>
        </div>

        <p className="text-xs text-[#A7A1B5]">
          Jalankan skrip berikut di <strong>Supabase SQL Editor</strong> untuk membuat seluruh tabel, aturan RLS, dan storage bucket:
        </p>

        <div className="space-y-3">
          <div className="p-3.5 rounded-lg bg-[#201A2D] border border-[#332A45] flex items-center justify-between text-xs">
            <div>
              <span className="font-semibold text-[#F5F3FF] block">
                1. Skema Tabel & Indeks (001_initial_schema.sql)
              </span>
              <span className="text-[11px] text-[#A7A1B5]">
                Tabel profiles, games, services, company_info, homepage_sections, inquiries, media
              </span>
            </div>
            <button
              type="button"
              onClick={() => handleCopy('/supabase/migrations/001_initial_schema.sql', 'schema')}
              className="px-2.5 py-1 rounded bg-[#171321] border border-[#332A45] text-[#C4B5FD] hover:text-white flex items-center gap-1.5"
            >
              {copiedKey === 'schema' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>Salin Path</span>
            </button>
          </div>

          <div className="p-3.5 rounded-lg bg-[#201A2D] border border-[#332A45] flex items-center justify-between text-xs">
            <div>
              <span className="font-semibold text-[#F5F3FF] block">
                2. Kebijakan Row Level Security (002_rls_policies.sql)
              </span>
              <span className="text-[11px] text-[#A7A1B5]">
                Aturan hak akses publik vs administrator untuk seluruh tabel
              </span>
            </div>
            <button
              type="button"
              onClick={() => handleCopy('/supabase/migrations/002_rls_policies.sql', 'rls')}
              className="px-2.5 py-1 rounded bg-[#171321] border border-[#332A45] text-[#C4B5FD] hover:text-white flex items-center gap-1.5"
            >
              {copiedKey === 'rls' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>Salin Path</span>
            </button>
          </div>

          <div className="p-3.5 rounded-lg bg-[#201A2D] border border-[#332A45] flex items-center justify-between text-xs">
            <div>
              <span className="font-semibold text-[#F5F3FF] block">
                3. Storage Bucket & Kebijakan Aset (003_storage.sql)
              </span>
              <span className="text-[11px] text-[#A7A1B5]">
                Bucket website-assets publik dengan hak unggah khusus admin
              </span>
            </div>
            <button
              type="button"
              onClick={() => handleCopy('/supabase/migrations/003_storage.sql', 'storage')}
              className="px-2.5 py-1 rounded bg-[#171321] border border-[#332A45] text-[#C4B5FD] hover:text-white flex items-center gap-1.5"
            >
              {copiedKey === 'storage' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>Salin Path</span>
            </button>
          </div>

          <div className="p-3.5 rounded-lg bg-[#201A2D] border border-[#332A45] flex items-center justify-between text-xs">
            <div>
              <span className="font-semibold text-[#F5F3FF] block">
                4. Data Awal / Seed Data (seed.sql)
              </span>
              <span className="text-[11px] text-[#A7A1B5]">
                Mengisi awal 6 judul game, 5 layanan, info studio, dan seksi homepage
              </span>
            </div>
            <button
              type="button"
              onClick={() => handleCopy('/supabase/seed.sql', 'seed')}
              className="px-2.5 py-1 rounded bg-[#171321] border border-[#332A45] text-[#C4B5FD] hover:text-white flex items-center gap-1.5"
            >
              {copiedKey === 'seed' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>Salin Path</span>
            </button>
          </div>
        </div>
      </div>

      {/* Local Store Reset Action */}
      <div className="p-6 rounded-xl bg-[#171321] border border-[#332A45] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="font-semibold text-sm text-[#F5F3FF]">
            Setel Ulang Data Pengujian Lokal
          </h3>
          <p className="text-xs text-[#A7A1B5] mt-0.5">
            Kembalikan seluruh data game, layanan, dan pesan ke kondisi contoh bawaan.
          </p>
        </div>
        <button
          type="button"
          onClick={handleResetLocalData}
          className="px-4 py-2 rounded-lg bg-[#201A2D] hover:bg-red-950/30 border border-[#332A45] hover:border-red-500/50 text-xs font-semibold text-red-400 transition-colors shrink-0"
        >
          Reset Data Lokal
        </button>
      </div>
    </div>
  );
};
