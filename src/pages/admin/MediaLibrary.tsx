import React, { useState, useEffect, useRef } from 'react';
import {
  Upload,
  Copy,
  Check,
  Trash2,
  Image as ImageIcon,
  Loader2,
  ExternalLink,
  FileText,
} from 'lucide-react';
import { getMediaList, deleteMediaRecord, createMediaRecord } from '../../lib/db';
import { uploadAssetToStorage, deleteAssetFromStorage } from '../../lib/supabase';
import { Media } from '../../types';
import { ConfirmDialog } from '../../components/ui/ConfirmDialog';
import { LoadingState } from '../../components/ui/LoadingState';
import { EmptyState } from '../../components/ui/EmptyState';
import { useToast } from '../../components/ui/Toast';

export const MediaLibrary: React.FC = () => {
  const { showToast } = useToast();
  const [mediaList, setMediaList] = useState<Media[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [mediaToDelete, setMediaToDelete] = useState<Media | null>(null);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);

  const fetchMedia = async () => {
    try {
      setLoading(true);
      const data = await getMediaList();
      setMediaList(data);
    } catch (err: any) {
      showToast(err.message || 'Gagal memuat pustaka media', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMedia();
  }, []);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    try {
      setUploading(true);
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        if (file.size > 10 * 1024 * 1024) {
          showToast(`Berkas ${file.name} melebihi batas 10MB`, 'error');
          continue;
        }

        const uploaded = await uploadAssetToStorage(file, 'library');
        if (uploaded) {
          const record = await createMediaRecord({
            file_name: file.name,
            file_path: uploaded.path,
            file_url: uploaded.url,
            file_type: file.type,
            file_size: file.size,
            alt_text: file.name.split('.')[0],
          });
          setMediaList((prev) => [record, ...prev]);
        }
      }
      showToast('Berkas media berhasil diunggah');
    } catch (err: any) {
      showToast(err.message || 'Gagal mengunggah berkas', 'error');
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleCopyUrl = (item: Media) => {
    navigator.clipboard.writeText(item.file_url);
    setCopiedId(item.id);
    showToast('Tautan URL aset berhasil disalin ke papan klip');
    setTimeout(() => setCopiedId(null), 2500);
  };

  const confirmDelete = async () => {
    if (!mediaToDelete) return;
    try {
      await deleteAssetFromStorage(mediaToDelete.file_path);
      await deleteMediaRecord(mediaToDelete.id);
      setMediaList((prev) => prev.filter((m) => m.id !== mediaToDelete.id));
      showToast('Aset media berhasil dihapus');
    } catch (err: any) {
      showToast(err.message || 'Gagal menghapus aset', 'error');
    } finally {
      setDeleteConfirmOpen(false);
      setMediaToDelete(null);
    }
  };

  const formatFileSize = (bytes?: number | null) => {
    if (!bytes) return '—';
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-display font-bold text-[#F5F3FF]">
            Pustaka Media & Aset (Storage)
          </h1>
          <p className="text-xs text-[#A7A1B5] mt-1">
            Unggah dan kelola gambar game, tangkapan layar, logo, dan banner di bucket Supabase Storage `website-assets`.
          </p>
        </div>

        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          disabled={uploading}
          className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-[#8B5CF6] hover:bg-[#7C3AED] disabled:opacity-50 text-xs font-semibold text-white transition-colors shrink-0"
        >
          {uploading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Mengunggah...</span>
            </>
          ) : (
            <>
              <Upload className="w-4 h-4" />
              <span>Unggah Media Baru</span>
            </>
          )}
        </button>
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="image/*"
          onChange={handleUpload}
          className="hidden"
        />
      </div>

      {/* Media Grid */}
      {loading ? (
        <LoadingState message="Memuat berkas media..." />
      ) : mediaList.length === 0 ? (
        <EmptyState
          title="Pustaka Media Masih Kosong"
          description="Unggah aset gambar pertama Anda untuk digunakan pada kartu game, banner, atau layanan."
          icon={ImageIcon}
          actionText="Unggah Berkas Sekarang"
          onAction={() => fileInputRef.current?.click()}
        />
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {mediaList.map((item) => (
            <div
              key={item.id}
              className="group rounded-xl bg-[#171321] border border-[#332A45] hover:border-[#8B5CF6]/70 transition-all overflow-hidden flex flex-col justify-between"
            >
              {/* Preview Thumbnail */}
              <div className="relative aspect-[4/3] bg-[#09090F] overflow-hidden flex items-center justify-center">
                {item.file_url.startsWith('http') || item.file_url.startsWith('data:') ? (
                  <img
                    src={item.file_url}
                    alt={item.alt_text || item.file_name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    loading="lazy"
                  />
                ) : (
                  <ImageIcon className="w-8 h-8 text-[#332A45]" />
                )}
              </div>

              {/* File Info & Actions */}
              <div className="p-3 space-y-2">
                <div className="min-w-0">
                  <div className="font-medium text-xs text-[#F5F3FF] truncate" title={item.file_name}>
                    {item.file_name}
                  </div>
                  <div className="text-[10px] text-[#A7A1B5] flex items-center gap-2 mt-0.5 font-mono">
                    <span>{formatFileSize(item.file_size)}</span>
                    <span>·</span>
                    <span>{item.file_type?.split('/')[1] || 'img'}</span>
                  </div>
                </div>

                <div className="pt-2 border-t border-[#332A45]/70 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => handleCopyUrl(item)}
                    className="inline-flex items-center gap-1 text-[11px] font-medium text-[#C4B5FD] hover:text-white transition-colors"
                    title="Salin tautan"
                  >
                    {copiedId === item.id ? (
                      <>
                        <Check className="w-3 h-3 text-emerald-400" />
                        <span className="text-emerald-400">Tersalin</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3" />
                        <span>Salin URL</span>
                      </>
                    )}
                  </button>

                  <div className="flex items-center gap-1">
                    <a
                      href={item.file_url}
                      target="_blank"
                      rel="noreferrer"
                      className="p-1 text-[#A7A1B5] hover:text-[#F5F3FF]"
                      title="Lihat ukuran penuh"
                    >
                      <ExternalLink className="w-3 h-3" />
                    </a>
                    <button
                      type="button"
                      onClick={() => {
                        setMediaToDelete(item);
                        setDeleteConfirmOpen(true);
                      }}
                      className="p-1 text-red-400 hover:text-red-300"
                      title="Hapus berkas"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Delete Confirmation */}
      <ConfirmDialog
        isOpen={deleteConfirmOpen}
        title="Hapus Aset Media?"
        message={`Hapus file "${mediaToDelete?.file_name}" dari media library dan storage?`}
        confirmText="Hapus"
        cancelText="Batal"
        isDestructive={true}
        onConfirm={confirmDelete}
        onCancel={() => {
          setDeleteConfirmOpen(false);
          setMediaToDelete(null);
        }}
      />
    </div>
  );
};
