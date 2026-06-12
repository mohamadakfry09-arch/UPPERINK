import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Send, MessageCircle, Activity, ClipboardList } from 'lucide-react';
import { getLeads, updateLead } from '../../services/leadService';
import { ORDER_STATUS_LIST } from '../../config/constants';
import { buildWhatsAppUrl, getUpdateProductionText } from '../../utils/whatsappTemplates';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import toast from 'react-hot-toast';

const ProductionUpdatePage = () => {
  const navigate = useNavigate();
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  // Form states
  const [selectedLeadId, setSelectedLeadId] = useState('');
  const [status, setStatus] = useState('');
  const [catatan, setCatatan] = useState('');

  const selectedLead = leads.find(l => l.lead_id === selectedLeadId);

  const fetchLeads = useCallback((isSilent = false) => {
    if (!isSilent) setLoading(true);
    getLeads()
      .then((data) => {
        // Show active leads (sorted by updated date)
        setLeads(data.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at)));
      })
      .catch((err) => {
        console.error(err);
        if (!isSilent) toast.error('Gagal memuat data leads');
      })
      .finally(() => {
        if (!isSilent) setLoading(false);
      });
  }, []);

  useEffect(() => {
    fetchLeads(false);

    // Polling setiap 10 detik untuk real-time update
    const interval = setInterval(() => {
      fetchLeads(true);
    }, 10000);

    return () => clearInterval(interval);
  }, [fetchLeads]);

  // Pre-populate form when lead changes
  useEffect(() => {
    if (selectedLead) {
      setStatus(selectedLead.status_produksi);
      setCatatan(selectedLead.catatan_admin || '');
    } else {
      setStatus('');
      setCatatan('');
    }
  }, [selectedLeadId, selectedLead]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedLeadId) {
      toast.error('Pilih data lead pelanggan terlebih dahulu');
      return;
    }
    if (!status) {
      toast.error('Pilih status produksi baru');
      return;
    }

    setUpdating(true);

    try {
      const updateData = {
        status_produksi: status,
        catatan_admin: catatan.trim()
      };

      // 1. Update database Sheets / LocalStorage
      await updateLead(selectedLeadId, updateData);

      // 2. Draft message
      const text = getUpdateProductionText(
        selectedLead.nama_pelanggan,
        selectedLead.nama_produk,
        status,
        catatan.trim()
      );
      
      const waUrl = buildWhatsAppUrl(selectedLead.whatsapp, text);

      toast.success('Status produksi diperbarui! Membuka WhatsApp...');

      // 3. Open WhatsApp Web
      window.open(waUrl, '_blank');

      // Reset
      setSelectedLeadId('');
      setStatus('');
      setCatatan('');

      navigate('/admin/leads');
    } catch (err) {
      console.error(err);
      toast.error('Gagal memperbarui status');
    } finally {
      setUpdating(false);
    }
  };

  return (
    <div className="max-w-2xl space-y-6">
      {/* Back to Leads */}
      <div>
        <button 
          onClick={() => navigate('/admin/leads')}
          className="inline-flex items-center gap-2 text-xs font-semibold text-gray-500 hover:text-gray-900 transition-colors uppercase tracking-wider"
        >
          <ArrowLeft className="w-4 h-4" /> Kembali ke Leads
        </button>
      </div>

      <div className="bg-white border border-gray-100 rounded-2xl shadow-card overflow-hidden">
        {/* Title */}
        <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#810100]/10 flex items-center justify-center text-[#810100]">
              <Activity className="w-4.5 h-4.5" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-navy-900">Update Status Produksi</h1>
              <p className="text-xs text-gray-400 mt-0.5">
                Perbarui status pengerjaan pesanan pelanggan dan kirim notifikasi update via WhatsApp.
              </p>
            </div>
          </div>
          
          {/* Live Update Badge */}
          <div className="flex items-center gap-2 bg-gray-50 border border-gray-100 px-3 py-1.5 rounded-full shrink-0">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider select-none">
              Live Update
            </span>
          </div>
        </div>

        {loading ? (
          <div className="py-20 flex justify-center">
            <LoadingSpinner size="md" />
          </div>
        ) : leads.length === 0 ? (
          <div className="p-12 text-center text-gray-400 text-sm">
            Belum ada data lead masuk untuk diupdate. Selesaikan konsultasi atau buat lead baru dahulu.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-5">
            {/* Lead Selection */}
            <div className="space-y-1.5">
              <label className="form-label text-xs font-semibold text-gray-500 uppercase tracking-wide">
                Pilih Pelanggan / Pesanan <span className="text-red-500">*</span>
              </label>
              <select
                value={selectedLeadId}
                onChange={e => setSelectedLeadId(e.target.value)}
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:border-red-500 focus:outline-none text-gray-800 bg-white cursor-pointer"
                required
              >
                <option value="">-- Cari & Pilih Pelanggan --</option>
                {leads.map(l => (
                  <option key={l.lead_id} value={l.lead_id}>
                    [{l.lead_id}] {l.nama_pelanggan} — {l.nama_produk} ({l.status_produksi})
                  </option>
                ))}
              </select>
            </div>

            {selectedLead && (
              <div className="bg-gray-50/50 p-4 border border-gray-100 rounded-xl grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <div className="text-gray-400 mb-0.5 uppercase tracking-wide font-medium">Pelanggan</div>
                  <div className="font-semibold text-navy-800">{selectedLead.nama_pelanggan}</div>
                </div>
                <div>
                  <div className="text-gray-400 mb-0.5 uppercase tracking-wide font-medium">Produk</div>
                  <div className="font-semibold text-gray-800">{selectedLead.nama_produk}</div>
                </div>
                <div>
                  <div className="text-gray-400 mb-0.5 uppercase tracking-wide font-medium">WhatsApp</div>
                  <div className="font-semibold text-gray-700">+{selectedLead.whatsapp}</div>
                </div>
                <div>
                  <div className="text-gray-400 mb-0.5 uppercase tracking-wide font-medium">Status Saat Ini</div>
                  <div className="font-semibold text-gray-700">{selectedLead.status_produksi}</div>
                </div>
              </div>
            )}

            {/* Status & Notes */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="form-label text-xs font-semibold text-gray-500 uppercase tracking-wide">
                  Pilih Status Produksi Baru <span className="text-red-500">*</span>
                </label>
                <select
                  value={status}
                  onChange={e => setStatus(e.target.value)}
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:border-red-500 focus:outline-none text-gray-800 bg-white cursor-pointer"
                  required
                >
                  <option value="">-- Pilih Status --</option>
                  {ORDER_STATUS_LIST.map(st => (
                    <option key={st.key} value={st.key}>{st.label}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="form-label text-xs font-semibold text-gray-500 uppercase tracking-wide">
                  Catatan Update Admin
                </label>
                <textarea
                  rows={2}
                  placeholder="Contoh: DP diterima 50%, Masuk antrian jahit, atau Resi JNE: JNE12345..."
                  value={catatan}
                  onChange={e => setCatatan(e.target.value)}
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:border-red-500 focus:outline-none text-gray-800 resize-none"
                />
              </div>
            </div>

            {/* WhatsApp template display preview */}
            {selectedLead && status && (
              <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                <div className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <MessageCircle className="w-3.5 h-3.5 fill-green-600 text-green-500" />
                  Preview Update Notifikasi WhatsApp:
                </div>
                <div className="text-xs text-gray-600 whitespace-pre-wrap leading-relaxed font-mono bg-white p-3 border border-gray-100">
                  {getUpdateProductionText(
                    selectedLead.nama_pelanggan,
                    selectedLead.nama_produk,
                    status,
                    catatan.trim()
                  )}
                </div>
              </div>
            )}

            {/* Submit */}
            <div className="flex justify-end gap-2 pt-4 border-t border-gray-100">
              <button 
                type="button"
                onClick={() => navigate('/admin/leads')}
                className="px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-gray-500 border border-gray-200 hover:bg-gray-50 transition-colors rounded-none"
              >
                Batal
              </button>
              <button 
                type="submit"
                disabled={updating || !selectedLeadId}
                className="btn-primary text-xs px-6 py-2.5 flex items-center gap-2 disabled:opacity-50"
              >
                {updating ? (
                  <>Menyimpan...</>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    Update & Kirim WhatsApp
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default ProductionUpdatePage;
