import React, { useState, useRef } from 'react';
import { Upload, X, Image as ImageIcon, Loader2, Link as LinkIcon } from 'lucide-react';
import { uploadAssetToStorage } from '../../lib/supabase';
import { createMediaRecord } from '../../lib/db';
import { useToast } from './Toast';

interface ImageUploaderProps {
  label: string;
  value: string | null;
  onChange: (url: string | null) => void;
  folder?: string;
  helperText?: string;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({
  label,
  value,
  onChange,
  folder = 'games',
  helperText = 'Format JPG, PNG, WEBP, atau SVG (maks. 10MB)',
}) => {
  const { showToast } = useToast();
  const [uploading, setUploading] = useState(false);
  const [showUrlInput, setShowUrlInput] = useState(false);
  const [manualUrl, setManualUrl] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate size (10MB limit)
    if (file.size > 10 * 1024 * 1024) {
      showToast('Ukuran file melebihi batas 10MB', 'error');
      return;
    }

    // Validate mime type
    if (!file.type.startsWith('image/')) {
      showToast('File harus berupa gambar (JPG, PNG, WEBP, SVG)', 'error');
      return;
    }

    try {
      setUploading(true);
      const result = await uploadAssetToStorage(file, folder);

      if (result) {
        onChange(result.url);
        // Track in media table
        await createMediaRecord({
          file_name: file.name,
          file_path: result.path,
          file_url: result.url,
          file_type: file.type,
          file_size: file.size,
          alt_text: file.name.split('.')[0],
        });
        showToast('Gambar berhasil diunggah');
      }
    } catch (err: any) {
      showToast(err.message || 'Gagal mengunggah gambar', 'error');
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleApplyUrl = () => {
    if (manualUrl.trim()) {
      onChange(manualUrl.trim());
      setManualUrl('');
      setShowUrlInput(false);
      showToast('URL gambar diterapkan');
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="block text-xs font-medium text-[#F5F3FF]">
          {label}
        </label>
        <button
          type="button"
          onClick={() => setShowUrlInput(!showUrlInput)}
          className="text-[11px] text-[#C4B5FD] hover:text-white transition-colors flex items-center gap-1"
        >
          <LinkIcon className="w-3 h-3" />
          <span>{showUrlInput ? 'Unggah Berkas' : 'Input URL'}</span>
        </button>
      </div>

      {showUrlInput ? (
        <div className="flex items-center gap-2">
          <input
            type="url"
            value={manualUrl}
            onChange={(e) => setManualUrl(e.target.value)}
            placeholder="https://example.com/image.jpg"
            className="flex-1 px-3 py-2 rounded-lg bg-[#201A2D] border border-[#332A45] text-xs text-[#F5F3FF] focus:outline-none focus:ring-1 focus:ring-[#8B5CF6]"
          />
          <button
            type="button"
            onClick={handleApplyUrl}
            className="px-3 py-2 text-xs font-semibold rounded-lg bg-[#8B5CF6] text-white hover:bg-[#7C3AED]"
          >
            Terapkan
          </button>
        </div>
      ) : value ? (
        /* Preview with remove */
        <div className="relative rounded-xl border border-[#332A45] bg-[#201A2D] p-3 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="w-16 h-12 rounded-lg bg-[#171321] border border-[#332A45] overflow-hidden shrink-0 flex items-center justify-center">
              {value.startsWith('data:') || value.startsWith('http') ? (
                <img src={value} alt="Preview" className="w-full h-full object-cover" />
              ) : (
                <ImageIcon className="w-6 h-6 text-[#8B5CF6]" />
              )}
            </div>
            <div className="overflow-hidden">
              <span className="block text-xs text-[#F5F3FF] truncate font-mono">
                {value}
              </span>
              <span className="block text-[11px] text-emerald-400">
                Aset Terpasang
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="px-2.5 py-1.5 text-xs text-[#A7A1B5] hover:text-[#F5F3FF] bg-[#171321] border border-[#332A45] rounded-md transition-colors"
            >
              Ganti
            </button>
            <button
              type="button"
              onClick={() => onChange(null)}
              className="p-1.5 text-red-400 hover:text-red-300 rounded hover:bg-red-950/30 transition-colors"
              title="Hapus gambar"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      ) : (
        /* Dropzone / Upload trigger */
        <div
          onClick={() => fileInputRef.current?.click()}
          className="border border-dashed border-[#332A45] hover:border-[#8B5CF6] rounded-xl p-5 text-center bg-[#201A2D]/50 hover:bg-[#201A2D] cursor-pointer transition-colors flex flex-col items-center justify-center gap-2"
        >
          {uploading ? (
            <div className="flex items-center gap-2 text-xs text-[#C4B5FD]">
              <Loader2 className="w-4 h-4 animate-spin text-[#8B5CF6]" />
              <span>Mengunggah ke Supabase Storage...</span>
            </div>
          ) : (
            <>
              <div className="w-9 h-9 rounded-lg bg-[#171321] border border-[#332A45] flex items-center justify-center text-[#8B5CF6]">
                <Upload className="w-4 h-4" />
              </div>
              <div className="space-y-0.5">
                <span className="text-xs font-semibold text-[#F5F3FF] block">
                  Klik untuk unggah gambar
                </span>
                <span className="text-[11px] text-[#A7A1B5] block">
                  {helperText}
                </span>
              </div>
            </>
          )}
        </div>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
      />
    </div>
  );
};
