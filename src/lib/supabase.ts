import { createClient, SupabaseClient } from '@supabase/supabase-js';

const STORAGE_KEY_URL = 'indokreasi_supabase_url';
const STORAGE_KEY_ANON = 'indokreasi_supabase_anon_key';

function cleanEnvValue(val: unknown): string {
  if (!val || typeof val !== 'string') return '';
  let str = val.trim();
  // Strip surrounding quotes if user copied with quotes in Vercel or .env
  if ((str.startsWith('"') && str.endsWith('"')) || (str.startsWith("'") && str.endsWith("'"))) {
    str = str.slice(1, -1).trim();
  }
  // Remove any trailing semicolon or comma
  str = str.replace(/[;,]+$/, '').trim();
  return str;
}

// Read config from localStorage override or from build environment variables
export function getSupabaseUrl(): string {
  if (typeof window !== 'undefined') {
    const custom = localStorage.getItem(STORAGE_KEY_URL);
    if (custom && custom.trim()) return cleanEnvValue(custom).replace(/\/+$/, '');
  }
  const meta = import.meta.env as any;
  const raw =
    meta.VITE_SUPABASE_URL ||
    meta.SUPABASE_URL ||
    meta.NEXT_PUBLIC_SUPABASE_URL ||
    meta.VITE_PUBLIC_SUPABASE_URL ||
    '';
  return cleanEnvValue(raw).replace(/\/+$/, '');
}

export function getSupabaseAnonKey(): string {
  if (typeof window !== 'undefined') {
    const custom = localStorage.getItem(STORAGE_KEY_ANON);
    if (custom && custom.trim()) return cleanEnvValue(custom);
  }
  const meta = import.meta.env as any;
  const raw =
    meta.VITE_SUPABASE_ANON_KEY ||
    meta.SUPABASE_ANON_KEY ||
    meta.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
    meta.VITE_SUPABASE_KEY ||
    meta.SUPABASE_KEY ||
    '';
  return cleanEnvValue(raw);
}

export function checkIsSupabaseConfigured(): boolean {
  const url = getSupabaseUrl();
  const anonKey = getSupabaseAnonKey();
  return Boolean(
    url &&
    anonKey &&
    url.startsWith('http') &&
    !url.includes('your-project.supabase.co') &&
    !url.includes('dummy.supabase.co') &&
    anonKey !== 'your-anon-key' &&
    anonKey !== 'dummy-key'
  );
}

export function getSupabaseSource(): 'env' | 'custom' | 'none' {
  if (typeof window !== 'undefined') {
    const customUrl = localStorage.getItem(STORAGE_KEY_URL);
    const customKey = localStorage.getItem(STORAGE_KEY_ANON);
    if (customUrl && customKey) return 'custom';
  }
  const meta = import.meta.env as any;
  const envUrl = meta.VITE_SUPABASE_URL || meta.SUPABASE_URL || meta.NEXT_PUBLIC_SUPABASE_URL;
  const envKey = meta.VITE_SUPABASE_ANON_KEY || meta.SUPABASE_ANON_KEY || meta.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (
    envUrl &&
    envKey &&
    !envUrl.includes('your-project.supabase.co') &&
    envKey !== 'your-anon-key'
  ) {
    return 'env';
  }
  return 'none';
}

export interface SupabaseDiagnostics {
  isConfigured: boolean;
  source: 'env' | 'custom' | 'none';
  url: string;
  hasAnonKey: boolean;
  detectedEnvKeys: string[];
}

export function getSupabaseDiagnostics(): SupabaseDiagnostics {
  const meta = import.meta.env as any;
  const detected: string[] = [];
  if (meta.VITE_SUPABASE_URL) detected.push('VITE_SUPABASE_URL');
  if (meta.SUPABASE_URL) detected.push('SUPABASE_URL');
  if (meta.NEXT_PUBLIC_SUPABASE_URL) detected.push('NEXT_PUBLIC_SUPABASE_URL');
  if (meta.VITE_SUPABASE_ANON_KEY) detected.push('VITE_SUPABASE_ANON_KEY');
  if (meta.SUPABASE_ANON_KEY) detected.push('SUPABASE_ANON_KEY');
  if (meta.NEXT_PUBLIC_SUPABASE_ANON_KEY) detected.push('NEXT_PUBLIC_SUPABASE_ANON_KEY');

  const url = getSupabaseUrl();
  const anonKey = getSupabaseAnonKey();

  return {
    isConfigured: checkIsSupabaseConfigured(),
    source: getSupabaseSource(),
    url: url ? `${url.substring(0, 18)}...` : '',
    hasAnonKey: Boolean(anonKey && anonKey.length > 20),
    detectedEnvKeys: detected,
  };
}

// Global active client cache
let activeClient: SupabaseClient | null = null;

function createActiveClient(): SupabaseClient {
  const isConfigured = checkIsSupabaseConfigured();
  const url = isConfigured ? getSupabaseUrl() : 'https://dummy.supabase.co';
  const key = isConfigured ? getSupabaseAnonKey() : 'dummy-key';

  return createClient(url, key, {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
    },
  });
}

export function getActiveSupabaseClient(): SupabaseClient {
  if (!activeClient) {
    activeClient = createActiveClient();
  }
  return activeClient;
}

export function saveSupabaseConfig(url: string, anonKey: string): void {
  if (typeof window !== 'undefined') {
    const trimmedUrl = url.trim();
    const trimmedKey = anonKey.trim();

    if (trimmedUrl) {
      localStorage.setItem(STORAGE_KEY_URL, trimmedUrl);
    } else {
      localStorage.removeItem(STORAGE_KEY_URL);
    }

    if (trimmedKey) {
      localStorage.setItem(STORAGE_KEY_ANON, trimmedKey);
    } else {
      localStorage.removeItem(STORAGE_KEY_ANON);
    }

    // Recreate client
    activeClient = createActiveClient();
    isSupabaseConfigured = checkIsSupabaseConfigured();

    // Trigger update events
    window.dispatchEvent(new Event('indokreasi_supabase_configured'));
    window.dispatchEvent(new Event('indokreasi_data_updated'));
  }
}

export function clearSupabaseConfig(): void {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(STORAGE_KEY_URL);
    localStorage.removeItem(STORAGE_KEY_ANON);
    activeClient = createActiveClient();
    isSupabaseConfigured = checkIsSupabaseConfigured();
    window.dispatchEvent(new Event('indokreasi_supabase_configured'));
    window.dispatchEvent(new Event('indokreasi_data_updated'));
  }
}

// Proxy supabase client so that existing imports `import { supabase } from ...` seamlessly use the latest client
export const supabase: SupabaseClient = new Proxy({} as SupabaseClient, {
  get(_target, prop) {
    const client = getActiveSupabaseClient();
    const value = (client as any)[prop];
    if (typeof value === 'function') {
      return value.bind(client);
    }
    return value;
  },
});

// Dynamic getter/variable export for backwards compatibility
export let isSupabaseConfigured = checkIsSupabaseConfigured();

export const STORAGE_BUCKET = 'website-assets';

/**
 * Storage Helpers
 */
export async function uploadAssetToStorage(
  file: File,
  folder: string = 'media'
): Promise<{ url: string; path: string } | null> {
  if (!checkIsSupabaseConfigured()) {
    // Local / data URL preview for unconfigured mode
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        resolve({
          url: reader.result as string,
          path: `${folder}/${Date.now()}_${file.name}`,
        });
      };
      reader.readAsDataURL(file);
    });
  }

  try {
    const fileExt = file.name.split('.').pop();
    const cleanFileName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
    const filePath = `${folder}/${Date.now()}_${cleanFileName}`;

    const { error: uploadError } = await supabase.storage
      .from(STORAGE_BUCKET)
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false,
      });

    if (uploadError) {
      console.error('Storage upload error:', uploadError);
      throw uploadError;
    }

    const { data: publicUrlData } = supabase.storage
      .from(STORAGE_BUCKET)
      .getPublicUrl(filePath);

    return {
      url: publicUrlData.publicUrl,
      path: filePath,
    };
  } catch (err) {
    console.error('Upload failed:', err);
    throw err;
  }
}

export async function deleteAssetFromStorage(filePath: string): Promise<boolean> {
  if (!checkIsSupabaseConfigured()) {
    return true;
  }

  try {
    const { error } = await supabase.storage.from(STORAGE_BUCKET).remove([filePath]);
    if (error) {
      console.warn('Storage delete warning:', error);
      return false;
    }
    return true;
  } catch (err) {
    console.error('Delete failed:', err);
    return false;
  }
}
