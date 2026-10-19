import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Edit, Trash2, Wrench, CheckCircle2, XCircle } from 'lucide-react';
import { getServices, deleteService, updateService } from '../../lib/db';
import { Service } from '../../types';
import { ConfirmDialog } from '../../components/ui/ConfirmDialog';
import { LoadingState } from '../../components/ui/LoadingState';
import { EmptyState } from '../../components/ui/EmptyState';
import { useToast } from '../../components/ui/Toast';
import { SupabaseSyncBanner } from '../../components/admin/SupabaseSyncBanner';

export const ServicesList: React.FC = () => {
  const { showToast } = useToast();
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  // Deletion modal
  const [serviceToDelete, setServiceToDelete] = useState<Service | null>(null);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);

  const fetchServicesList = async () => {
    try {
      setLoading(true);
      const data = await getServices();
      setServices(data);
    } catch (err: any) {
      showToast(err.message || 'Gagal memuat layanan', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServicesList();
  }, []);

  const handleToggleActive = async (service: Service) => {
    try {
      const updated = await updateService(service.id, { is_active: !service.is_active });
      setServices((prev) => prev.map((s) => (s.id === service.id ? updated : s)));
      showToast(`Status layanan "${service.title}" diperbarui`);
    } catch (err: any) {
      showToast(err.message || 'Gagal memperbarui status', 'error');
    }
  };

  const confirmDelete = async () => {
    if (!serviceToDelete) return;
    try {
      await deleteService(serviceToDelete.id);
      setServices((prev) => prev.filter((s) => s.id !== serviceToDelete.id));
      showToast(`Layanan "${serviceToDelete.title}" berhasil dihapus`);
    } catch (err: any) {
      showToast(err.message || 'Gagal menghapus layanan', 'error');
    } finally {
      setDeleteConfirmOpen(false);
      setServiceToDelete(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-display font-bold text-[#F5F3FF]">
            Kelola Layanan Studio
          </h1>
          <p className="text-xs text-[#A7A1B5] mt-1">
            Atur layanan pengembangan game, prototipe, dan aset 3D yang ditampilkan kepada publik.
          </p>
        </div>

        <Link
          to="/admin/services/new"
          className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-[#8B5CF6] hover:bg-[#7C3AED] text-xs font-semibold text-white transition-colors shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Tambah Layanan</span>
        </Link>
      </div>

      {/* Prominent Supabase Sync Banner */}
      <SupabaseSyncBanner />

      {/* Table Container */}
      {loading ? (
        <LoadingState message="Memuat layanan..." />
      ) : services.length === 0 ? (
        <EmptyState
          title="Belum Ada Layanan"
          description="Tambahkan kapabilitas layanan studio Anda agar dapat dijelajahi calon mitra bisnis."
          icon={Wrench}
          actionText="Tambah Layanan Baru"
          onAction={() => (window.location.href = '/admin/services/new')}
        />
      ) : (
        <div className="rounded-xl border border-[#332A45] bg-[#171321] overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#201A2D] border-b border-[#332A45] text-[#A7A1B5] font-semibold uppercase tracking-wider text-[11px]">
                <tr>
                  <th className="py-3.5 px-4">Nama Layanan & Slug</th>
                  <th className="py-3.5 px-4">Deskripsi Singkat</th>
                  <th className="py-3.5 px-4 text-center">Ikon</th>
                  <th className="py-3.5 px-4 text-center">Urutan</th>
                  <th className="py-3.5 px-4 text-center">Status</th>
                  <th className="py-3.5 px-4 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#332A45]/70 text-[#F5F3FF]">
                {services.map((service) => (
                  <tr key={service.id} className="hover:bg-[#201A2D]/40 transition-colors">
                    <td className="py-3.5 px-4 min-w-[200px]">
                      <div className="font-semibold text-sm text-[#F5F3FF]">
                        {service.title}
                      </div>
                      <div className="font-mono text-[11px] text-[#A7A1B5]">
                        /{service.slug}
                      </div>
                    </td>

                    <td className="py-3.5 px-4 text-[#A7A1B5] max-w-sm truncate">
                      {service.short_description || '—'}
                    </td>

                    <td className="py-3.5 px-4 text-center font-mono text-[11px] text-[#C4B5FD]">
                      {service.icon || 'Gamepad2'}
                    </td>

                    <td className="py-3.5 px-4 text-center font-mono text-xs">
                      {service.sort_order}
                    </td>

                    <td className="py-3.5 px-4 text-center">
                      <button
                        type="button"
                        onClick={() => handleToggleActive(service)}
                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded text-[11px] font-mono ${service.is_active
                            ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                            : 'bg-gray-500/10 text-gray-400 border border-gray-500/30'
                          }`}
                      >
                        {service.is_active ? 'Aktif' : 'Nonaktif'}
                      </button>
                    </td>

                    <td className="py-3.5 px-4 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          to={`/admin/services/${service.id}/edit`}
                          className="p-1.5 text-[#C4B5FD] hover:text-white rounded hover:bg-[#201A2D]"
                          title="Sunting Layanan"
                        >
                          <Edit className="w-3.5 h-3.5" />
                        </Link>
                        <button
                          type="button"
                          onClick={() => {
                            setServiceToDelete(service);
                            setDeleteConfirmOpen(true);
                          }}
                          className="p-1.5 text-red-400 hover:text-red-300 rounded hover:bg-red-950/30"
                          title="Hapus Layanan"
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

      {/* Delete Confirmation */}
      <ConfirmDialog
        isOpen={deleteConfirmOpen}
        title="Hapus Layanan?"
        message={`Apakah Anda yakin ingin menghapus layanan "${serviceToDelete?.title}"?`}
        confirmText="Hapus"
        cancelText="Batal"
        isDestructive={true}
        onConfirm={confirmDelete}
        onCancel={() => {
          setDeleteConfirmOpen(false);
          setServiceToDelete(null);
        }}
      />
    </div>
  );
};
