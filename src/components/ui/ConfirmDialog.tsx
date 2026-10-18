import React from 'react';
import { AlertTriangle, X } from 'lucide-react';

interface ConfirmDialogProps {
  isOpen: boolean;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  isDestructive?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  isOpen,
  title,
  message,
  confirmText = 'Konfirmasi',
  cancelText = 'Batal',
  isDestructive = false,
  onConfirm,
  onCancel,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="w-full max-w-md bg-[#171321] border border-[#332A45] rounded-xl p-6 shadow-2xl space-y-5"
        role="dialog"
        aria-modal="true"
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className={`p-2.5 rounded-lg border ${isDestructive ? 'bg-red-950/40 border-red-500/40 text-red-400' : 'bg-[#201A2D] border-[#332A45] text-[#8B5CF6]'}`}>
              <AlertTriangle className="w-5 h-5" />
            </div>
            <h3 className="font-display font-bold text-lg text-[#F5F3FF]">
              {title}
            </h3>
          </div>
          <button
            onClick={onCancel}
            className="text-[#A7A1B5] hover:text-[#F5F3FF] p-1 rounded focus:outline-none"
            aria-label="Tutup dialog"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <p className="text-xs sm:text-sm text-[#A7A1B5] leading-relaxed">
          {message}
        </p>

        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 text-xs font-semibold text-[#A7A1B5] hover:text-[#F5F3FF] bg-[#201A2D] border border-[#332A45] rounded-lg transition-colors"
          >
            {cancelText}
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className={`px-4 py-2 text-xs font-semibold text-white rounded-lg transition-colors ${
              isDestructive
                ? 'bg-red-600 hover:bg-red-700'
                : 'bg-[#8B5CF6] hover:bg-[#7C3AED]'
            }`}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};
