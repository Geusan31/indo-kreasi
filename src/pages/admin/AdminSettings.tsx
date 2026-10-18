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
  UploadCloud,
  ChevronDown,
  ChevronUp,
  Sparkles,
} from 'lucide-react';
import { isSupabaseConfigured, supabase } from '../../lib/supabase';
import { syncSeedDataToSupabase } from '../../lib/db';
import { useToast } from '../../components/ui/Toast';
import { SQL_INITIAL_SCHEMA, SQL_RLS_POLICIES, SQL_STORAGE } from '../../data/migrationSql';

export const AdminSettings: React.FC = () => {
  const { showToast } = useToast();
  const [testing, setTesting] = useState(false);
  const [syncing, setSyncing] = useState(false);
  const [testResult, setTestResult] = useState<string | null>(null);
  const [syncResult, setSyncResult] = useState<{ success: boolean; message: string } | null>(null);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [expandedSql, setExpandedSql] = useState<string | null>(null);

  const handleTestConnection = async () => {
    setTesting(true);
    setTestResult(null);

    if (!isSupabaseConfigured) {
      setTestResult(
        'Variabel VITE_SUPABASE_URL atau VITE_SUPABASE_ANON_KEY belum dikonfigurasi. Sistem saat ini beroperasi menggunakan reactive local storage store.'
      );
      setTesting(false);
      return;
    }

    try {
      const { error } = await supabase.from('company_info').select('id').limit(1);
      if (error) {
        if (error.code === '42P01') {
          setTestResult(
            'Koneksi berhasil terhubung ke server Supabase, namun TABEL DATABASE BELUM DIBUAT (Error 42P01: relation company_info does not exist). Silakan jalankan skrip SQL skema di bawah pada menu Supabase SQL Editor.'
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
    if (!isSupabaseConfigured) {
      showToast('Konfigurasi .env Supabase belum lengkap', 'error');
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
          Pantau status integrasi Supabase, jalankan migrasi data, dan salin skrip SQL lengkap.
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
            {isSupabaseConfigured ? 'TERHUBUNG (ONLINE)' : 'MODE LOKAL REACTIVE'}
          </span>
        </div>

        <p className="text-xs text-[#A7A1B5] leading-relaxed">
          {isSupabaseConfigured
            ? 'Aplikasi terhubung ke URL Supabase Anda. Semua operasi CRUD game, layanan, dan pesan kontak akan langsung tersimpan di Supabase PostgreSQL & Storage.'
            : 'Aplikasi saat ini beroperasi menggunakan penyimpanan lokal reaktif (LocalStorage) yang sudah terisi lengkap dengan 6 judul game dan 5 layanan studio. Anda dapat langsung menguji seluruh fitur frontend dan admin sekarang.'}
        </p>

        <div className="pt-2 flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={handleTestConnection}
            disabled={testing}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#8B5CF6] hover:bg-[#7C3AED] disabled:opacity-50 text-xs font-semibold text-white transition-colors"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${testing ? 'animate-spin' : ''}`} />
            <span>Uji Status Tabel Supabase</span>
          </button>

          {isSupabaseConfigured && (
            <button
              type="button"
              onClick={handleSyncToSupabase}
              disabled={syncing}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#10B981] hover:bg-[#059669] disabled:opacity-50 text-xs font-semibold text-white transition-colors shadow-lg shadow-emerald-950/40"
            >
              <UploadCloud className={`w-3.5 h-3.5 ${syncing ? 'animate-bounce' : ''}`} />
              <span>{syncing ? 'Menyinkronkan...' : 'Sinkronkan Data Awal ke Supabase'}</span>
            </button>
          )}

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

        {syncResult && (
          <div
            className={`p-3.5 rounded-lg border text-xs flex items-start gap-2.5 ${
              syncResult.success
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

      {/* Guide: Why is database empty & How to migrate */}
      <div className="p-6 rounded-xl bg-[#171321] border border-[#332A45] space-y-4">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-[#8B5CF6]" />
          <h2 className="font-display font-semibold text-sm text-[#F5F3FF] uppercase tracking-wider">
            Panduan Migrasi Database Supabase (3 Langkah Cepat)
          </h2>
        </div>

        <p className="text-xs text-[#A7A1B5] leading-relaxed">
          Di Supabase, proyek baru yang baru dibuat dimulai dengan database PostgreSQL kosong tanpa tabel. Agar database memiliki tabel dan data:
        </p>

        <ol className="space-y-3 text-xs text-[#A7A1B5]">
          <li className="flex items-start gap-2.5">
            <span className="w-5 h-5 rounded-full bg-[#8B5CF6] text-white font-bold flex items-center justify-center shrink-0 text-[10px]">
              1
            </span>
            <div>
              <strong className="text-[#F5F3FF]">Buka SQL Editor di Dashboard Supabase</strong>
              <p className="mt-0.5 text-[11px]">
                Masuk ke proyek Supabase Anda, lalu klik tab <strong>SQL Editor</strong> pada bilah navigasi kiri.
              </p>
            </div>
          </li>

          <li className="flex items-start gap-2.5">
            <span className="w-5 h-5 rounded-full bg-[#8B5CF6] text-white font-bold flex items-center justify-center shrink-0 text-[10px]">
              2
            </span>
            <div>
              <strong className="text-[#F5F3FF]">Salin & Jalankan Skrip Skema & RLS</strong>
              <p className="mt-0.5 text-[11px]">
                Salin skrip <strong>001_initial_schema.sql</strong> di bawah, tempelkan ke SQL Editor lalu klik <strong>Run</strong>. Lakukan hal yang sama untuk <strong>002_rls_policies.sql</strong> dan <strong>003_storage.sql</strong>.
              </p>
            </div>
          </li>

          <li className="flex items-start gap-2.5">
            <span className="w-5 h-5 rounded-full bg-[#8B5CF6] text-white font-bold flex items-center justify-center shrink-0 text-[10px]">
              3
            </span>
            <div>
              <strong className="text-[#F5F3FF]">Klik Tombol &quot;Sinkronkan Data Awal ke Supabase&quot;</strong>
              <p className="mt-0.5 text-[11px]">
                Setelah tabel dibuat, klik tombol hijau di atas atau jalankan <code>seed.sql</code>. Seluruh data 6 game, 5 layanan, dan informasi studio akan otomatis masuk ke tabel Supabase.
              </p>
            </div>
          </li>
        </ol>
      </div>

      {/* SQL Migration Scripts Accordion */}
      <div className="p-6 rounded-xl bg-[#171321] border border-[#332A45] space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FileCode className="w-4 h-4 text-[#8B5CF6]" />
            <h2 className="font-display font-semibold text-sm text-[#F5F3FF] uppercase tracking-wider">
              Skrip SQL Lengkap (Siap Salin & Tempel)
            </h2>
          </div>
        </div>

        <p className="text-xs text-[#A7A1B5]">
          Klik tombol <strong>Salin Kode SQL</strong> untuk menyalin seluruh isi query ke papan klip secara instan:
        </p>

        <div className="space-y-3">
          {/* Script 1: Schema */}
          <div className="p-4 rounded-lg bg-[#201A2D] border border-[#332A45] space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <span className="font-semibold text-xs text-[#F5F3FF] block">
                  1. Skema Tabel & Indeks (001_initial_schema.sql)
                </span>
                <span className="text-[11px] text-[#A7A1B5]">
                  Membuat tabel games, services, company_info, homepage_sections, inquiries, media
                </span>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() => setExpandedSql(expandedSql === 'schema' ? null : 'schema')}
                  className="px-2.5 py-1 rounded bg-[#171321] border border-[#332A45] text-[#C4B5FD] hover:text-white flex items-center gap-1 text-xs"
                >
                  {expandedSql === 'schema' ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                  <span>{expandedSql === 'schema' ? 'Tutup' : 'Lihat'}</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleCopy(SQL_INITIAL_SCHEMA, 'schema')}
                  className="px-3 py-1 rounded bg-[#8B5CF6] hover:bg-[#7C3AED] text-white flex items-center gap-1.5 text-xs font-medium"
                >
                  {copiedKey === 'schema' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>Salin Kode SQL</span>
                </button>
              </div>
            </div>

            {expandedSql === 'schema' && (
              <pre className="p-3 bg-[#09090F] border border-[#332A45] rounded-lg text-[10px] font-mono text-[#A7A1B5] overflow-x-auto max-h-64 leading-relaxed">
                {SQL_INITIAL_SCHEMA}
              </pre>
            )}
          </div>

          {/* Script 2: RLS */}
          <div className="p-4 rounded-lg bg-[#201A2D] border border-[#332A45] space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <span className="font-semibold text-xs text-[#F5F3FF] block">
                  2. Aturan Row Level Security (002_rls_policies.sql)
                </span>
                <span className="text-[11px] text-[#A7A1B5]">
                  Memproteksi data publik vs admin, mengizinkan publik melihat game published
                </span>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() => setExpandedSql(expandedSql === 'rls' ? null : 'rls')}
                  className="px-2.5 py-1 rounded bg-[#171321] border border-[#332A45] text-[#C4B5FD] hover:text-white flex items-center gap-1 text-xs"
                >
                  {expandedSql === 'rls' ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                  <span>{expandedSql === 'rls' ? 'Tutup' : 'Lihat'}</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleCopy(SQL_RLS_POLICIES, 'rls')}
                  className="px-3 py-1 rounded bg-[#8B5CF6] hover:bg-[#7C3AED] text-white flex items-center gap-1.5 text-xs font-medium"
                >
                  {copiedKey === 'rls' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>Salin Kode SQL</span>
                </button>
              </div>
            </div>

            {expandedSql === 'rls' && (
              <pre className="p-3 bg-[#09090F] border border-[#332A45] rounded-lg text-[10px] font-mono text-[#A7A1B5] overflow-x-auto max-h-64 leading-relaxed">
                {SQL_RLS_POLICIES}
              </pre>
            )}
          </div>

          {/* Script 3: Storage */}
          <div className="p-4 rounded-lg bg-[#201A2D] border border-[#332A45] space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <span className="font-semibold text-xs text-[#F5F3FF] block">
                  3. Storage Bucket & Akses Aset (003_storage.sql)
                </span>
                <span className="text-[11px] text-[#A7A1B5]">
                  Membuat bucket website-assets publik untuk upload media dan cover game
                </span>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() => setExpandedSql(expandedSql === 'storage' ? null : 'storage')}
                  className="px-2.5 py-1 rounded bg-[#171321] border border-[#332A45] text-[#C4B5FD] hover:text-white flex items-center gap-1 text-xs"
                >
                  {expandedSql === 'storage' ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                  <span>{expandedSql === 'storage' ? 'Tutup' : 'Lihat'}</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleCopy(SQL_STORAGE, 'storage')}
                  className="px-3 py-1 rounded bg-[#8B5CF6] hover:bg-[#7C3AED] text-white flex items-center gap-1.5 text-xs font-medium"
                >
                  {copiedKey === 'storage' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>Salin Kode SQL</span>
                </button>
              </div>
            </div>

            {expandedSql === 'storage' && (
              <pre className="p-3 bg-[#09090F] border border-[#332A45] rounded-lg text-[10px] font-mono text-[#A7A1B5] overflow-x-auto max-h-64 leading-relaxed">
                {SQL_STORAGE}
              </pre>
            )}
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
            Kembalikan seluruh data game, layanan, dan pesan ke kondisi seed bawaan (6 game aktif &amp; 5 layanan).
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
