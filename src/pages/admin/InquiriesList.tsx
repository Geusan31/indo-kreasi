import React, { useState, useEffect } from 'react';
import {
  Mail,
  Search,
  CheckCircle,
  Clock,
  Archive,
  Trash2,
  X,
  ExternalLink,
  MessageSquare,
} from 'lucide-react';
import { getInquiries, updateInquiryStatus, deleteInquiry } from '../../lib/db';
import { Inquiry, InquiryStatus } from '../../types';
import { ConfirmDialog } from '../../components/ui/ConfirmDialog';
import { LoadingState } from '../../components/ui/LoadingState';
import { EmptyState } from '../../components/ui/EmptyState';
import { useToast } from '../../components/ui/Toast';

export const InquiriesList: React.FC = () => {
  const { showToast } = useToast();
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | InquiryStatus>('all');

  // Detail Modal State
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);

  // Delete Confirm State
  const [inquiryToDelete, setInquiryToDelete] = useState<Inquiry | null>(null);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);

  const fetchInquiriesList = async () => {
    try {
      setLoading(true);
      const data = await getInquiries();
      setInquiries(data);
    } catch (err: any) {
      showToast(err.message || 'Gagal memuat pesan masuk', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInquiriesList();
  }, []);

  const handleUpdateStatus = async (inquiry: Inquiry, newStatus: InquiryStatus) => {
    try {
      const updated = await updateInquiryStatus(inquiry.id, newStatus);
      setInquiries((prev) => prev.map((i) => (i.id === inquiry.id ? updated : i)));
      if (selectedInquiry?.id === inquiry.id) {
        setSelectedInquiry(updated);
      }
      showToast(`Status pesan diubah ke "${newStatus}"`);
    } catch (err: any) {
      showToast(err.message || 'Gagal mengubah status pesan', 'error');
    }
  };

  const handleOpenDetail = async (inquiry: Inquiry) => {
    setSelectedInquiry(inquiry);
    // Automatically mark new inquiries as read
    if (inquiry.status === 'new') {
      await handleUpdateStatus(inquiry, 'read');
    }
  };

  const confirmDelete = async () => {
    if (!inquiryToDelete) return;
    try {
      await deleteInquiry(inquiryToDelete.id);
      setInquiries((prev) => prev.filter((i) => i.id !== inquiryToDelete.id));
      if (selectedInquiry?.id === inquiryToDelete.id) {
        setSelectedInquiry(null);
      }
      showToast('Pesan berhasil dihapus');
    } catch (err: any) {
      showToast(err.message || 'Gagal menghapus pesan', 'error');
    } finally {
      setDeleteConfirmOpen(false);
      setInquiryToDelete(null);
    }
  };

  const filtered = inquiries.filter((inq) => {
    const matchesSearch =
      inq.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inq.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (inq.subject && inq.subject.toLowerCase().includes(searchQuery.toLowerCase())) ||
      inq.message.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === 'all' || inq.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-display font-bold text-[#F5F3FF]">
          Pesan Masuk (Inquiries)
        </h1>
        <p className="text-xs text-[#A7A1B5] mt-1">
          Semua pertanyaan, penawaran kolaborasi, dan pesan formulir dari website publik tersimpan di sini.
        </p>
      </div>

      {/* Filter & Search Bar */}
      <div className="p-4 rounded-xl bg-[#171321] border border-[#332A45] flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#A7A1B5]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari pengirim, email, atau isi pesan..."
            className="w-full pl-9 pr-3.5 py-2 rounded-lg bg-[#201A2D] border border-[#332A45] text-xs text-[#F5F3FF] focus:outline-none focus:ring-1 focus:ring-[#8B5CF6]"
          />
        </div>

        <div className="flex items-center gap-2 text-xs">
          <span className="text-[#A7A1B5]">Filter Status:</span>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as any)}
            className="px-2.5 py-1.5 rounded-lg bg-[#201A2D] border border-[#332A45] text-xs text-[#F5F3FF] focus:outline-none"
          >
            <option value="all">Semua Pesan</option>
            <option value="new">Pesan Baru (New)</option>
            <option value="read">Sudah Dibaca (Read)</option>
            <option value="replied">Sudah Dibalas (Replied)</option>
            <option value="archived">Diarsipkan (Archived)</option>
          </select>
        </div>
      </div>

      {/* Inquiries Table */}
      {loading ? (
        <LoadingState message="Memuat pesan masuk..." />
      ) : filtered.length === 0 ? (
        <EmptyState
          title="Tidak Ada Pesan"
          description={
            searchQuery || statusFilter !== 'all'
              ? 'Tidak ada pesan yang sesuai dengan filter pencarian.'
              : 'Kotak masuk pesan Anda masih kosong. Pesan dari formulir kontak publik akan masuk ke sini.'
          }
          icon={Mail}
        />
      ) : (
        <div className="rounded-xl border border-[#332A45] bg-[#171321] overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#201A2D] border-b border-[#332A45] text-[#A7A1B5] font-semibold uppercase tracking-wider text-[11px]">
                <tr>
                  <th className="py-3.5 px-4">Pengirim & Email</th>
                  <th className="py-3.5 px-4">Subjek / Ringkasan</th>
                  <th className="py-3.5 px-4">Waktu</th>
                  <th className="py-3.5 px-4 text-center">Status</th>
                  <th className="py-3.5 px-4 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#332A45]/70 text-[#F5F3FF]">
                {filtered.map((inq) => (
                  <tr
                    key={inq.id}
                    onClick={() => handleOpenDetail(inq)}
                    className="hover:bg-[#201A2D]/50 cursor-pointer transition-colors"
                  >
                    <td className="py-3.5 px-4 min-w-[180px]">
                      <div className="font-semibold text-sm text-[#F5F3FF]">
                        {inq.name}
                      </div>
                      <div className="text-[11px] text-[#A7A1B5]">
                        {inq.email}
                      </div>
                    </td>

                    <td className="py-3.5 px-4 max-w-sm">
                      <div className="font-medium text-[#F5F3FF] truncate">
                        {inq.subject || 'Tanpa Subjek'}
                      </div>
                      <div className="text-[11px] text-[#A7A1B5] truncate mt-0.5">
                        {inq.message}
                      </div>
                    </td>

                    <td className="py-3.5 px-4 whitespace-nowrap text-[11px] text-[#A7A1B5]">
                      {new Date(inq.created_at).toLocaleDateString('id-ID', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </td>

                    <td className="py-3.5 px-4 text-center whitespace-nowrap">
                      <span
                        className={`inline-block px-2.5 py-0.5 rounded text-[11px] font-mono font-medium ${
                          inq.status === 'new'
                            ? 'bg-amber-500/10 text-amber-400 border border-amber-500/30 font-bold'
                            : inq.status === 'read'
                            ? 'bg-blue-500/10 text-blue-400 border border-blue-500/30'
                            : inq.status === 'replied'
                            ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                            : 'bg-gray-500/10 text-gray-400 border border-gray-500/30'
                        }`}
                      >
                        {inq.status}
                      </span>
                    </td>

                    <td className="py-3.5 px-4 text-right whitespace-nowrap">
                      <div
                        className="flex items-center justify-end gap-2"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <button
                          type="button"
                          onClick={() => handleOpenDetail(inq)}
                          className="px-2.5 py-1 text-xs text-[#C4B5FD] hover:text-white bg-[#201A2D] rounded transition-colors"
                        >
                          Buka
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setInquiryToDelete(inq);
                            setDeleteConfirmOpen(true);
                          }}
                          className="p-1 text-red-400 hover:text-red-300 rounded hover:bg-red-950/30"
                          title="Hapus"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Inquiry Detail Modal */}
      {selectedInquiry && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-xl bg-[#171321] border border-[#332A45] rounded-xl p-6 shadow-2xl space-y-5">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[11px] font-mono uppercase tracking-wider text-[#C4B5FD]">
                  DETAIL PESAN MASUK
                </span>
                <h3 className="text-lg font-display font-bold text-[#F5F3FF] mt-1">
                  {selectedInquiry.subject || 'Tanpa Subjek'}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedInquiry(null)}
                className="p-1 text-[#A7A1B5] hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 rounded-lg bg-[#201A2D] border border-[#332A45] space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-[#A7A1B5]">Nama Pengirim:</span>
                <span className="text-[#F5F3FF] font-semibold">{selectedInquiry.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#A7A1B5]">Alamat Email:</span>
                <a
                  href={`mailto:${selectedInquiry.email}`}
                  className="text-[#8B5CF6] hover:underline flex items-center gap-1 font-mono"
                >
                  <span>{selectedInquiry.email}</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
              <div className="flex justify-between">
                <span className="text-[#A7A1B5]">Diterima Pada:</span>
                <span className="text-[#A7A1B5]">
                  {new Date(selectedInquiry.created_at).toLocaleString('id-ID')}
                </span>
              </div>
              <div className="flex justify-between items-center pt-2 border-t border-[#332A45]">
                <span className="text-[#A7A1B5]">Status Sekarang:</span>
                <span className="font-mono text-[11px] uppercase text-[#C4B5FD]">
                  {selectedInquiry.status}
                </span>
              </div>
            </div>

            <div className="space-y-1.5">
              <span className="text-xs font-semibold text-[#F5F3FF] block">
                Isi Pesan:
              </span>
              <div className="p-4 rounded-lg bg-[#09090F] border border-[#332A45] text-xs sm:text-sm text-[#F5F3FF] leading-relaxed whitespace-pre-wrap max-h-60 overflow-y-auto">
                {selectedInquiry.message}
              </div>
            </div>

            {/* Quick Status Modifiers */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-[#332A45] text-xs">
              <div className="flex items-center gap-2">
                <span className="text-[#A7A1B5]">Ubah status:</span>
                <button
                  type="button"
                  onClick={() => handleUpdateStatus(selectedInquiry, 'replied')}
                  className="px-2.5 py-1 rounded bg-[#201A2D] hover:bg-[#282138] text-emerald-400 border border-[#332A45]"
                >
                  Tandai Dibalas
                </button>
                <button
                  type="button"
                  onClick={() => handleUpdateStatus(selectedInquiry, 'archived')}
                  className="px-2.5 py-1 rounded bg-[#201A2D] hover:bg-[#282138] text-[#A7A1B5] border border-[#332A45]"
                >
                  Arsipkan
                </button>
              </div>

              <a
                href={`mailto:${selectedInquiry.email}?subject=${encodeURIComponent(
                  `Re: ${selectedInquiry.subject || 'Inquiry PT Indo Kreasi'}`
                )}`}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#8B5CF6] hover:bg-[#7C3AED] text-white font-semibold"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>Balas Lewat Email</span>
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation */}
      <ConfirmDialog
        isOpen={deleteConfirmOpen}
        title="Hapus Pesan Masuk?"
        message={`Hapus pesan dari "${inquiryToDelete?.name}"? Tindakan ini tidak dapat dibatalkan.`}
        confirmText="Hapus"
        cancelText="Batal"
        isDestructive={true}
        onConfirm={confirmDelete}
        onCancel={() => {
          setDeleteConfirmOpen(false);
          setInquiryToDelete(null);
        }}
      />
    </div>
  );
};
