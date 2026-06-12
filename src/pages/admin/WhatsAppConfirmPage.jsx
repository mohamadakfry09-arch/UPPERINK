import React, { useState, useEffect, useCallback } from 'react';
import { 
  MessageCircle, Pencil, Trash2, Activity, 
  Search, Filter, RefreshCcw, Check 
} from 'lucide-react';
import { getLeads, updateLead, deleteLead } from '../../services/leadService';
import { getProducts } from '../../services/productService';
import { ORDER_STATUS_LIST } from '../../config/constants';
import { formatDateShort } from '../../utils/formatters';
import Badge from '../../components/common/Badge';
import Modal from '../../components/common/Modal';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import toast from 'react-hot-toast';

const WhatsAppConfirmPage = () => {
  const [leads, setLeads] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  
  // Search & Filter
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('');

  // Modals / Actions state
  const [editLead, setEditLead] = useState(null);
  const [deleteLeadId, setDeleteLeadId] = useState(null);
  const [statusMenuId, setStatusMenuId] = useState(null);
  const [saving, setSaving] = useState(false);

  // Edit form state
  const [formName, setFormName] = useState('');
  const [formWa, setFormWa] = useState('');
  const [formProduct, setFormProduct] = useState('');
  const [formStatus, setFormStatus] = useState('');
  const [formCatatan, setFormCatatan] = useState('');

  const loadData = useCallback(async (isManual = false, isSilent = false) => {
    if (isManual) setRefreshing(true);
    else if (!isSilent) setLoading(true);

    try {
      const [leadsData, productsData] = await Promise.all([
        getLeads(),
        getProducts()
      ]);
      setLeads(leadsData ? leadsData.sort((a, b) => new Date(b.updated_at || b.tanggal) - new Date(a.updated_at || a.tanggal)) : []);
      setProducts(productsData || []);
    } catch (err) {
      console.error('Failed to load data:', err);
      if (!isSilent) toast.error('Gagal memuat data leads/produk');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    loadData();

    // Polling setiap 10 detik untuk real-time update
    const interval = setInterval(() => {
      loadData(false, true);
    }, 10000);

    return () => clearInterval(interval);
  }, [loadData]);

  // Open edit modal and pre-fill form
  const handleOpenEdit = (lead) => {
    setEditLead(lead);
    setFormName(lead.nama_pelanggan || '');
    setFormWa(lead.whatsapp || '');
    setFormProduct(lead.nama_produk || '');
    setFormStatus(lead.status_produksi || 'Konsultasi');
    setFormCatatan(lead.catatan_admin || '');
  };

  // Save edited lead
  const handleSaveEdit = async () => {
    if (!editLead) return;
    
    setSaving(true);
    try {
      const cleanedWa = formWa.replace(/\D/g, '');
      const finalWa = cleanedWa.startsWith('0') ? '62' + cleanedWa.slice(1) : cleanedWa;
      const waLink = finalWa ? `https://wa.me/${finalWa}` : '';

      const updateData = {
        nama_pelanggan: formName.trim(),
        whatsapp: finalWa,
        nama_produk: formProduct,
        status_produksi: formStatus,
        catatan_admin: formCatatan.trim(),
        link_whatsapp: waLink,
        updated_at: new Date().toISOString()
      };

      await updateLead(editLead.lead_id, updateData);
      setLeads(prev => prev.map(l => l.lead_id === editLead.lead_id ? { ...l, ...updateData } : l));
      setEditLead(null);
      toast.success('Data lead berhasil diperbarui');
    } catch (err) {
      console.error(err);
      toast.error('Gagal menyimpan perubahan');
    } finally {
      setSaving(false);
    }
  };

  // Delete lead
  const handleDelete = async () => {
    if (!deleteLeadId) return;

    try {
      await deleteLead(deleteLeadId);
      setLeads(prev => prev.filter(l => l.lead_id !== deleteLeadId));
      setDeleteLeadId(null);
      toast.success('Lead berhasil dihapus');
    } catch (err) {
      console.error(err);
      toast.error('Gagal menghapus lead');
    }
  };

  // Quick status update from dropdown
  const handleQuickStatusChange = async (lead, newStatus) => {
    try {
      const updateData = { 
        status_produksi: newStatus,
        updated_at: new Date().toISOString()
      };
      await updateLead(lead.lead_id, updateData);
      setLeads(prev => prev.map(l => l.lead_id === lead.lead_id ? { ...l, ...updateData } : l));
      setStatusMenuId(null);
      toast.success(`Status diperbarui ke: ${newStatus}`);
    } catch (err) {
      console.error(err);
      toast.error('Gagal memperbarui status');
    }
  };

  // WhatsApp click handler with requested message template
  const handleWhatsAppClick = (lead) => {
    if (!lead.whatsapp) return;

    const cleanedWa = lead.whatsapp.replace(/\D/g, '');
    const finalWa = cleanedWa.startsWith('0') ? '62' + cleanedWa.slice(1) : cleanedWa;

    // Requested template message
    const text = `Halo Kak ${lead.nama_pelanggan || '-'}, kami dari UPPERINK.

Update pesanan Anda:
Produk: ${lead.nama_produk || '-'}
Status: ${lead.status_produksi || 'Konsultasi'}

Catatan:
${lead.catatan_admin || 'Tidak ada catatan'}

Terima kasih.`;

    const waUrl = `https://wa.me/${finalWa}?text=${encodeURIComponent(text)}`;
    window.open(waUrl, '_blank', 'noopener,noreferrer');
  };

  // Filter & Search Logic
  const filteredLeads = leads.filter(l => {
    const matchesSearch = 
      (l.nama_pelanggan || '').toLowerCase().includes(search.toLowerCase()) ||
      (l.whatsapp || '').includes(search) ||
      (l.nama_produk || '').toLowerCase().includes(search.toLowerCase()) ||
      (l.lead_id || '').toLowerCase().includes(search.toLowerCase());
      
    const matchesStatus = !filterStatus || l.status_produksi === filterStatus;
    
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6 max-w-6xl">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-black text-navy-900">Konfirmasi WhatsApp</h1>
          <p className="text-sm text-gray-400 mt-0.5">Kelola konfirmasi pesanan pelanggan dan sinkronisasi status produksi</p>
        </div>
        <div className="flex items-center gap-2">
          {/* Live Update Badge */}
          <div className="flex items-center gap-2 bg-white border border-gray-200 px-3 py-1.5 rounded-full shrink-0">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider select-none">
              Live Update
            </span>
          </div>
          
          <button 
            onClick={() => loadData(true)} 
            disabled={refreshing}
            className="w-10 h-10 flex items-center justify-center border border-gray-200 text-gray-500 hover:border-gray-400 hover:text-gray-700 transition-colors bg-white disabled:opacity-50"
            title="Refresh data"
          >
            <RefreshCcw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="bg-white rounded-2xl shadow-card p-4 grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
        {/* Search */}
        <div className="relative sm:col-span-8">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input 
            type="text" 
            placeholder="Cari nama pelanggan, nomor WhatsApp, atau produk..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-xl text-sm focus:border-red-500 focus:outline-none transition-colors"
          />
        </div>
        {/* Filter status */}
        <div className="relative sm:col-span-4 flex items-center gap-2">
          <Filter className="w-4 h-4 text-gray-400 shrink-0" />
          <select 
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:border-red-500 focus:outline-none transition-colors cursor-pointer bg-white"
          >
            <option value="">Semua Status Produksi</option>
            {ORDER_STATUS_LIST.map(st => (
              <option key={st.key} value={st.key}>{st.label}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Main Table View */}
      {loading ? (
        <div className="bg-white rounded-2xl shadow-card py-20 flex items-center justify-center">
          <LoadingSpinner size="lg" />
        </div>
      ) : filteredLeads.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-card py-20 text-center border border-gray-50">
          <MessageCircle className="w-12 h-12 text-gray-200 mx-auto mb-3" />
          <h3 className="font-bold text-gray-700 text-base">Belum ada data konfirmasi WhatsApp.</h3>
          <p className="text-gray-400 text-sm mt-1 max-w-xs mx-auto">
            {search || filterStatus 
              ? 'Tidak ada data matching untuk pencarian atau filter saat ini.' 
              : 'Belum ada lead/pelanggan yang melakukan klik chat WhatsApp.'}
          </p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-card border border-gray-50 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="px-5 py-4 text-left font-bold text-gray-400 uppercase tracking-wider text-[11px]">Nama Pelanggan</th>
                  <th className="px-5 py-4 text-left font-bold text-gray-400 uppercase tracking-wider text-[11px]">Nomor WhatsApp</th>
                  <th className="px-5 py-4 text-left font-bold text-gray-400 uppercase tracking-wider text-[11px]">Produk</th>
                  <th className="px-5 py-4 text-left font-bold text-gray-400 uppercase tracking-wider text-[11px]">Status Produksi</th>
                  <th className="px-5 py-4 text-left font-bold text-gray-400 uppercase tracking-wider text-[11px]">Catatan</th>
                  <th className="px-5 py-4 text-left font-bold text-gray-400 uppercase tracking-wider text-[11px]">Tanggal Update</th>
                  <th className="px-5 py-4 text-right font-bold text-gray-400 uppercase tracking-wider text-[11px]">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredLeads.map(lead => (
                  <tr key={lead.lead_id} className="hover:bg-gray-50/50 transition-colors">
                    {/* Nama Pelanggan */}
                    <td className="px-5 py-4 whitespace-nowrap font-semibold text-navy-850">
                      {lead.nama_pelanggan ? lead.nama_pelanggan : '-'}
                    </td>
                    
                    {/* Nomor WhatsApp */}
                    <td className="px-5 py-4 whitespace-nowrap text-gray-600 font-medium">
                      {lead.whatsapp ? `+${lead.whatsapp}` : '-'}
                    </td>

                    {/* Produk */}
                    <td className="px-5 py-4 whitespace-nowrap font-semibold text-gray-700">
                      {lead.nama_produk ? lead.nama_produk : '-'}
                    </td>

                    {/* Status Produksi */}
                    <td className="px-5 py-4 whitespace-nowrap relative">
                      <div className="flex items-center gap-1">
                        <button 
                          onClick={() => setStatusMenuId(statusMenuId === lead.lead_id ? null : lead.lead_id)}
                          className="hover:scale-105 transition-transform"
                          title="Klik untuk ubah status cepat"
                        >
                          <Badge status={lead.status_produksi || 'Konsultasi'} className="cursor-pointer" />
                        </button>
                      </div>

                      {/* Dropdown status menu */}
                      {statusMenuId === lead.lead_id && (
                        <>
                          <div className="fixed inset-0 z-10" onClick={() => setStatusMenuId(null)} />
                          <div className="absolute left-5 mt-1 bg-white border border-gray-200 shadow-xl rounded-xl py-1.5 w-60 z-20 animate-fade-in text-xs max-h-56 overflow-y-auto">
                            <div className="px-3 py-1 text-[10px] text-gray-400 font-bold uppercase tracking-wider border-b border-gray-100 mb-1">
                              Ubah Status Produksi
                            </div>
                            {ORDER_STATUS_LIST.map(st => (
                              <button 
                                key={st.key}
                                onClick={() => handleQuickStatusChange(lead, st.key)}
                                className={`w-full text-left px-4 py-2 hover:bg-gray-50 flex items-center justify-between font-semibold ${
                                  (lead.status_produksi || 'Konsultasi') === st.key ? 'text-[#810100] bg-red-50/20' : 'text-gray-600'
                                }`}
                              >
                                <span>{st.label}</span>
                                {(lead.status_produksi || 'Konsultasi') === st.key && <Check className="w-3.5 h-3.5" />}
                              </button>
                            ))}
                          </div>
                        </>
                      )}
                    </td>

                    {/* Catatan */}
                    <td className="px-5 py-4 max-w-xs">
                      <div className="text-xs text-gray-500 line-clamp-2 leading-relaxed" title={lead.catatan_admin}>
                        {lead.catatan_admin ? lead.catatan_admin : 'Tidak ada catatan'}
                      </div>
                    </td>

                    {/* Tanggal Update */}
                    <td className="px-5 py-4 whitespace-nowrap text-gray-500 font-medium">
                      {formatDateShort(lead.updated_at || lead.tanggal)}
                    </td>

                    {/* Aksi */}
                    <td className="px-5 py-4 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-1">
                        {/* Kirim WhatsApp */}
                        <button 
                          onClick={() => handleWhatsAppClick(lead)}
                          disabled={!lead.whatsapp}
                          className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-all border border-transparent hover:border-green-100 disabled:opacity-30 disabled:hover:bg-transparent disabled:border-transparent flex items-center gap-1 text-xs font-bold cursor-pointer disabled:cursor-not-allowed"
                          title={lead.whatsapp ? 'Kirim WhatsApp' : 'Nomor WhatsApp Kosong'}
                        >
                          <MessageCircle className="w-4 h-4 fill-green-600 text-green-500" />
                          <span>Kirim WA</span>
                        </button>
                        
                        {/* Update Status (opens status edit quick menu) */}
                        <button 
                          onClick={() => setStatusMenuId(statusMenuId === lead.lead_id ? null : lead.lead_id)}
                          className="p-2 text-blue-500 hover:bg-blue-50 hover:text-blue-700 rounded-lg transition-colors"
                          title="Update Status"
                        >
                          <Activity className="w-4 h-4" />
                        </button>

                        {/* Edit */}
                        <button 
                          onClick={() => handleOpenEdit(lead)}
                          className="p-2 text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                          title="Edit Lead"
                        >
                          <Pencil className="w-4 h-4" />
                        </button>

                        {/* Hapus */}
                        <button 
                          onClick={() => setDeleteLeadId(lead.lead_id)}
                          className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Hapus Lead"
                        >
                          <Trash2 className="w-4 h-4" />
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

      {/* ── Edit Modal ── */}
      <Modal 
        isOpen={!!editLead} 
        onClose={() => setEditLead(null)} 
        title="Edit Data Lead"
        size="md"
      >
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="form-label text-xs font-semibold text-gray-400 mb-1 block">Nama Pelanggan</label>
              <input 
                type="text" 
                placeholder="Masukkan nama pelanggan"
                value={formName}
                onChange={e => setFormName(e.target.value)}
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:border-red-500 focus:outline-none text-gray-800"
              />
            </div>
            <div>
              <label className="form-label text-xs font-semibold text-gray-400 mb-1 block">Nomor WhatsApp</label>
              <input 
                type="text" 
                placeholder="Contoh: 08123456789 atau 6281234..."
                value={formWa}
                onChange={e => setFormWa(e.target.value)}
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:border-red-500 focus:outline-none text-gray-800"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="form-label text-xs font-semibold text-gray-400 mb-1 block">Produk</label>
              <select 
                value={formProduct}
                onChange={e => setFormProduct(e.target.value)}
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:border-red-500 focus:outline-none text-gray-800 bg-white"
              >
                <option value="">-- Pilih Produk --</option>
                {products.map(p => (
                  <option key={p.product_id} value={p.nama_produk}>{p.nama_produk}</option>
                ))}
                <option value="Produk Custom Lainnya">Lainnya / Custom</option>
              </select>
            </div>
            <div>
              <label className="form-label text-xs font-semibold text-gray-400 mb-1 block">Status Produksi</label>
              <select 
                value={formStatus}
                onChange={e => setFormStatus(e.target.value)}
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:border-red-500 focus:outline-none text-gray-800 bg-white"
              >
                {ORDER_STATUS_LIST.map(st => (
                  <option key={st.key} value={st.key}>{st.label}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="form-label text-xs font-semibold text-gray-400 mb-1 block">Catatan</label>
            <textarea 
              rows={3}
              placeholder="Catatan spesifikasi..."
              value={formCatatan}
              onChange={e => setFormCatatan(e.target.value)}
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:border-red-500 focus:outline-none text-gray-800 resize-none"
            />
          </div>

          <div className="flex justify-end gap-2 pt-4 border-t border-gray-100">
            <button 
              onClick={() => setEditLead(null)}
              className="px-5 py-2.5 text-xs uppercase font-bold text-gray-500 border border-gray-200 hover:bg-gray-50 transition-colors rounded-none"
            >
              Batal
            </button>
            <button 
              onClick={handleSaveEdit}
              disabled={saving}
              className="btn-primary text-xs px-6 py-2.5 flex items-center gap-1.5"
            >
              {saving ? 'Menyimpan...' : 'Simpan Data'}
            </button>
          </div>
        </div>
      </Modal>

      {/* ── Delete Confirmation Modal ── */}
      <Modal 
        isOpen={!!deleteLeadId} 
        onClose={() => setDeleteLeadId(null)} 
        title="Hapus Data Lead"
        size="sm"
      >
        <div className="space-y-4">
          <p className="text-gray-600 text-sm leading-relaxed">
            Apakah Anda yakin ingin menghapus data ini secara permanen dari database? Tindakan ini tidak dapat dibatalkan.
          </p>
          <div className="flex justify-end gap-2 pt-2">
            <button 
              onClick={() => setDeleteLeadId(null)}
              className="px-4 py-2 text-xs border border-gray-200 hover:bg-gray-50 font-bold uppercase text-gray-500 rounded-none"
            >
              Batal
            </button>
            <button 
              onClick={handleDelete}
              className="px-4 py-2 text-xs bg-red-600 hover:bg-red-700 text-white font-bold uppercase"
            >
              Hapus
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default WhatsAppConfirmPage;
