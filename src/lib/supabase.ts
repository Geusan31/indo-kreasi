import { createClient, SupabaseClient, User, Session } from '@supabase/supabase-js';

// Environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const isSupabaseConfigured = Boolean(
  supabaseUrl &&
  supabaseAnonKey &&
  supabaseUrl !== 'https://your-project.supabase.co' &&
  supabaseAnonKey !== 'your-anon-key'
);

// Fallback dummy URL and Key so createClient doesn't throw if variables are missing
const safeUrl = isSupabaseConfigured ? supabaseUrl : 'https://dummy.supabase.co';
const safeKey = isSupabaseConfigured ? supabaseAnonKey : 'dummy-key';

export const supabase: SupabaseClient = createClient(safeUrl, safeKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
  },
});

export const STORAGE_BUCKET = 'website-assets';

/**
 * Storage Helpers
 */
export async function uploadAssetToStorage(
  file: File,
  folder: string = 'media'
): Promise<{ url: string; path: string } | null> {
  if (!isSupabaseConfigured) {
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
  if (!isSupabaseConfigured) {
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
