import React, { useState, useEffect, useCallback } from 'react';
import { 
  Search, Filter, Plus, Pencil, Trash2, RefreshCcw, 
  MessageCircle, X, Check, ArrowRight 
} from 'lucide-react';
import { getLeads, createLead, updateLead, deleteLead } from '../../services/leadService';
import { getProducts } from '../../services/productService';
import { ORDER_STATUS_LIST } from '../../config/constants';
import { formatDateShort } from '../../utils/formatters';
import Badge from '../../components/common/Badge';
import Modal from '../../components/common/Modal';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import toast from 'react-hot-toast';
import { buildWhatsAppUrl, getConfirmationText, getUpdateProductionText } from '../../utils/whatsappTemplates';

const EMPTY_FORM = {
  nama_pelanggan: '',
  whatsapp: '',
  nama_produk: '',
  status_produksi: 'Konsultasi',
  catatan_admin: ''
};

const generateLeadId = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const random = String(Math.floor(Math.random() * 900) + 100);
  return `LID-${year}${month}${day}-${random}`;
};

const LeadsPage = () => {
  const [leads, setLeads] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  
  // Modals state
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [saving, setSaving] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [statusMenuId, setStatusMenuId] = useState(null);

  const loadData = useCallback(async (isManual = false, isSilent = false) => {
    if (isManual) setRefreshing(true);
    else if (!isSilent) setLoading(true);

    try {
      const [leadsData, productsData] = await Promise.all([
        getLeads(),
        getProducts()
      ]);
      setLeads(leadsData.sort((a, b) => new Date(b.tanggal) - new Date(a.tanggal)));
      setProducts(productsData || []);
    } catch (err) {
      console.error('Failed to load leads data:', err);
      if (!isSilent) toast.error('Gagal memuat data leads');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    loadData();

    // Polling setiap 10 detik untuk real-time update secara silent
    const interval = setInterval(() => {
      loadData(false, true);
    }, 10000);

    return () => clearInterval(interval);
  }, [loadData]);

  const openCreate = () => {
    setEditing(null);
    setForm(EMPTY_FORM);
    setModalOpen(true);
  };

  const openEdit = (lead) => {
    setEditing(lead);
    setForm({
      nama_pelanggan: lead.nama_pelanggan,
      whatsapp: lead.whatsapp,
      nama_produk: lead.nama_produk,
      status_produksi: lead.status_produksi,
      catatan_admin: lead.catatan_admin || ''
    });
    setModalOpen(true);
  };

  const handleSave = async () => {
    if (!form.nama_pelanggan.trim() || !form.whatsapp.trim() || !form.nama_produk.trim()) {
      toast.error('Nama pelanggan, nomor WhatsApp, dan nama produk wajib diisi');
      return;
    }

    setSaving(true);
    const cleanedWa = form.whatsapp.replace(/\D/g, '');
    const finalWa = cleanedWa.startsWith('0') ? '62' + cleanedWa.slice(1) : cleanedWa;
    const waLink = `https://wa.me/${finalWa}`;

    try {
      if (editing) {
        const updateData = {
          nama_pelanggan: form.nama_pelanggan,
          whatsapp: finalWa,
          nama_produk: form.nama_produk,
          status_produksi: form.status_produksi,
          catatan_admin: form.catatan_admin,
          link_whatsapp: waLink
        };
        await updateLead(editing.lead_id, updateData);
        setLeads(prev => prev.map(l => l.lead_id === editing.lead_id ? { ...l, ...updateData, updated_at: new Date().toISOString() } : l));
        toast.success('Data lead berhasil diperbarui');
      } else {
        const leadId = generateLeadId();
        const today = new Date().toISOString().split('T')[0];
        const newLead = {
          lead_id: leadId,
          tanggal: today,
          nama_pelanggan: form.nama_pelanggan,
          whatsapp: finalWa,
          nama_produk: form.nama_produk,
          status_produksi: form.status_produksi,
          catatan_admin: form.catatan_admin,
          link_whatsapp: waLink,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        };
        await createLead(newLead);
        setLeads(prev => [newLead, ...prev]);
        toast.success('Lead baru berhasil ditambahkan');
      }
      setModalOpen(false);
    } catch (err) {
      console.error(err);
      toast.error('Gagal menyimpan data lead');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    try {
      await deleteLead(deleteId);
      setLeads(prev => prev.filter(l => l.lead_id !== deleteId));
      setDeleteId(null);
      toast.success('Lead berhasil dihapus');
    } catch (err) {
      console.error(err);
      toast.error('Gagal menghapus lead');
    }
  };

  const handleQuickStatusChange = async (lead, newStatus) => {
    try {
      const updateData = { status_produksi: newStatus };
      await updateLead(lead.lead_id, updateData);
      setLeads(prev => prev.map(l => l.lead_id === lead.lead_id ? { ...l, status_produksi: newStatus, updated_at: new Date().toISOString() } : l));
      setStatusMenuId(null);
      toast.success(`Status lead diperbarui ke: ${newStatus}`);

      // Auto draft message & prompt user to send update notification
      const text = getUpdateProductionText(lead.nama_pelanggan, lead.nama_produk, newStatus, lead.catatan_admin);
      const url = buildWhatsAppUrl(lead.whatsapp, text);
      
      toast((t) => (
        <div className="flex flex-col gap-2">
          <span className="font-semibold text-gray-800">Status berhasil diperbarui!</span>
          <span className="text-xs text-gray-500">Kirim update WhatsApp ke pelanggan?</span>
          <div className="flex gap-2 mt-1 justify-end">
            <button 
              onClick={() => toast.dismiss(t.id)} 
              className="px-2.5 py-1 text-xs border border-gray-200 rounded text-gray-500 hover:bg-gray-50"
            >
              Nanti saja
            </button>
            <button 
              onClick={() => {
                window.open(url, '_blank');
                toast.dismiss(t.id);
              }}
              className="px-3 py-1 text-xs bg-green-600 hover:bg-green-700 text-white rounded font-bold"
            >
              Kirim Chat
            </button>
          </div>
        </div>
      ), { duration: 8000 });

    } catch (err) {
      console.error(err);
      toast.error('Gagal memperbarui status');
    }
  };

  const handleSendWhatsApp = (lead) => {
    let text = '';
    if (lead.status_produksi === 'Konsultasi') {
      text = getConfirmationText(lead.nama_produk);
    } else {
      text = getUpdateProductionText(lead.nama_pelanggan, lead.nama_produk, lead.status_produksi, lead.catatan_admin);
    }
    const url = buildWhatsAppUrl(lead.whatsapp, text);
    window.open(url, '_blank');
  };

  // Filter & search logic
  const filteredLeads = leads.filter(l => {
    const matchesSearch = 
      l.nama_pelanggan?.toLowerCase().includes(search.toLowerCase()) ||
      String(l.whatsapp).includes(search) ||
      l.nama_produk?.toLowerCase().includes(search.toLowerCase()) ||
      l.lead_id?.toLowerCase().includes(search.toLowerCase());
      
    const matchesStatus = !filterStatus || l.status_produksi === filterStatus;
    
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6 max-w-6xl">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-black text-navy-900">Data Chat / Leads WhatsApp</h1>
          <p className="text-sm text-gray-400 mt-0.5">Kelola riwayat chat, leads masuk, dan progress produksi klien</p>
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
          <button 
            onClick={openCreate} 
            className="btn-primary text-xs px-5 py-2.5 flex items-center gap-2"
          >
            <Plus className="w-4 h-4" /> Tambah Lead Manual
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
          <h3 className="font-bold text-gray-700 text-base">Tidak Ada Leads WhatsApp</h3>
          <p className="text-gray-400 text-sm mt-1 max-w-xs mx-auto">
            {search || filterStatus 
              ? 'Tidak ada data matching untuk pencarian atau filter saat ini.' 
              : 'Belum ada lead WhatsApp tersimpan. Tambahkan manual atau mulailah dari menu Konfirmasi WhatsApp.'}
          </p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-card border border-gray-50 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="px-5 py-4 text-left font-bold text-gray-400 uppercase tracking-wider text-[11px]">Tanggal</th>
                  <th className="px-5 py-4 text-left font-bold text-gray-400 uppercase tracking-wider text-[11px]">Pelanggan / WA</th>
                  <th className="px-5 py-4 text-left font-bold text-gray-400 uppercase tracking-wider text-[11px]">Produk Konsultasi</th>
                  <th className="px-5 py-4 text-left font-bold text-gray-400 uppercase tracking-wider text-[11px]">Status Produksi</th>
                  <th className="px-5 py-4 text-left font-bold text-gray-400 uppercase tracking-wider text-[11px]">Catatan Admin</th>
                  <th className="px-5 py-4 text-right font-bold text-gray-400 uppercase tracking-wider text-[11px]">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredLeads.map(lead => (
                  <tr key={lead.lead_id} className="hover:bg-gray-50/50 transition-colors">
                    {/* Date / ID */}
                    <td className="px-5 py-4 whitespace-nowrap">
                      <div className="font-semibold text-gray-800">{formatDateShort(lead.tanggal)}</div>
                      <div className="text-[10px] text-gray-400 font-mono mt-0.5">{lead.lead_id}</div>
                    </td>
                    {/* Customer Info */}
                    <td className="px-5 py-4 whitespace-nowrap">
                      <div className="font-semibold text-navy-800">{lead.nama_pelanggan}</div>
                      <div className="text-xs text-gray-500 font-medium">+{lead.whatsapp}</div>
                    </td>
                    {/* Product */}
                    <td className="px-5 py-4 font-semibold text-gray-700 whitespace-nowrap">
                      {lead.nama_produk}
                    </td>
                    {/* Status Badge & Selector */}
                    <td className="px-5 py-4 whitespace-nowrap relative">
                      <div className="flex items-center gap-1">
                        <button 
                          onClick={() => setStatusMenuId(statusMenuId === lead.lead_id ? null : lead.lead_id)}
                          className="hover:scale-105 transition-transform"
                          title="Klik untuk ubah status cepat"
                        >
                          <Badge status={lead.status_produksi} className="cursor-pointer" />
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
                                  lead.status_produksi === st.key ? 'text-[#810100] bg-red-50/20' : 'text-gray-600'
                                }`}
                              >
                                <span>{st.label}</span>
                                {lead.status_produksi === st.key && <Check className="w-3.5 h-3.5" />}
                              </button>
                            ))}
                          </div>
                        </>
                      )}
                    </td>
                    {/* Admin Notes */}
                    <td className="px-5 py-4 max-w-xs">
                      <div className="text-xs text-gray-500 line-clamp-2 leading-relaxed" title={lead.catatan_admin}>
                        {lead.catatan_admin || '—'}
                      </div>
                    </td>
                    {/* Action buttons */}
                    <td className="px-5 py-4 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-1">
                        <button 
                          onClick={() => handleSendWhatsApp(lead)}
                          className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-all border border-transparent hover:border-green-100 flex items-center gap-1 text-xs font-bold"
                          title="Kirim Chat WhatsApp"
                        >
                          <MessageCircle className="w-4 h-4 fill-green-600 text-green-500" />
                          <span>Chat WA</span>
                        </button>
                        <button 
                          onClick={() => openEdit(lead)}
                          className="p-2 text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                          title="Edit Lead"
                        >
                          <Pencil className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => setDeleteId(lead.lead_id)}
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

      {/* ── Form Modal (Tambah/Edit) ── */}
      <Modal 
        isOpen={modalOpen} 
        onClose={() => setModalOpen(false)} 
        title={editing ? 'Edit Data Lead WhatsApp' : 'Tambah Lead WhatsApp Baru'}
        size="md"
      >
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="form-label text-xs font-semibold text-gray-400 mb-1 block">Nama Pelanggan / Klien</label>
              <input 
                type="text" 
                placeholder="Masukkan nama pelanggan"
                value={form.nama_pelanggan}
                onChange={e => setForm(f => ({ ...f, nama_pelanggan: e.target.value }))}
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:border-red-500 focus:outline-none text-gray-800"
              />
            </div>
            <div>
              <label className="form-label text-xs font-semibold text-gray-400 mb-1 block">Nomor WhatsApp Aktif</label>
              <input 
                type="text" 
                placeholder="Contoh: 08123456789 atau 6281234..."
                value={form.whatsapp}
                onChange={e => setForm(f => ({ ...f, whatsapp: e.target.value }))}
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:border-red-500 focus:outline-none text-gray-800"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="form-label text-xs font-semibold text-gray-400 mb-1 block">Nama Produk</label>
              <select 
                value={form.nama_produk}
                onChange={e => setForm(f => ({ ...f, nama_produk: e.target.value }))}
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:border-red-500 focus:outline-none text-gray-800 bg-white"
              >
                <option value="">-- Pilih Produk Catalog --</option>
                {products.map(p => (
                  <option key={p.product_id} value={p.nama_produk}>{p.nama_produk}</option>
                ))}
                <option value="Produk Custom Lainnya">Lainnya / Custom</option>
              </select>
            </div>
            <div>
              <label className="form-label text-xs font-semibold text-gray-400 mb-1 block">Status Produksi</label>
              <select 
                value={form.status_produksi}
                onChange={e => setForm(f => ({ ...f, status_produksi: e.target.value }))}
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:border-red-500 focus:outline-none text-gray-800 bg-white"
              >
                {ORDER_STATUS_LIST.map(st => (
                  <option key={st.key} value={st.key}>{st.label}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="form-label text-xs font-semibold text-gray-400 mb-1 block">Catatan Admin</label>
            <textarea 
              rows={3}
              placeholder="Spesifikasi desain, info DP, nomor resi pengiriman, atau catatan follow up lainnya..."
              value={form.catatan_admin}
              onChange={e => setForm(f => ({ ...f, catatan_admin: e.target.value }))}
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:border-red-500 focus:outline-none text-gray-800 resize-none"
            />
          </div>

          <div className="flex justify-end gap-2 pt-4 border-t border-gray-100">
            <button 
              onClick={() => setModalOpen(false)}
              className="px-5 py-2.5 text-xs uppercase font-bold text-gray-500 border border-gray-200 hover:bg-gray-50 transition-colors rounded-none"
            >
              Batal
            </button>
            <button 
              onClick={handleSave}
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
        isOpen={!!deleteId} 
        onClose={() => setDeleteId(null)} 
        title="Hapus Data Lead"
        size="sm"
      >
        <div className="space-y-4">
          <p className="text-gray-600 text-sm leading-relaxed">
            Apakah Anda yakin ingin menghapus data lead WhatsApp ini secara permanen dari database? Tindakan ini tidak dapat dibatalkan.
          </p>
          <div className="flex justify-end gap-2 pt-2">
            <button 
              onClick={() => setDeleteId(null)}
              className="px-4 py-2 text-xs border border-gray-200 hover:bg-gray-50 font-bold uppercase text-gray-500 rounded-none"
            >
              Batal
            </button>
            <button 
              onClick={handleDelete}
              className="px-4 py-2 text-xs bg-red-600 hover:bg-red-700 text-white font-bold uppercase"
            >
              Hapus Permanen
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default LeadsPage;
