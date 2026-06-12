import React, { useState, useEffect } from 'react';
import { Download, RefreshCcw } from 'lucide-react';
import { getLeads } from '../../services/leadService';
import { ORDER_STATUS_LIST } from '../../config/constants';
import { formatDateShort } from '../../utils/formatters';
import Badge from '../../components/common/Badge';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import * as XLSX from 'xlsx';
import toast from 'react-hot-toast';

const ReportsPage = () => {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [filterStatus, setFilterStatus] = useState('');

  const fetchLeads = async () => {
    setLoading(true);
    try {
      const data = await getLeads();
      setLeads(data);
    } catch (err) {
      console.error(err);
      toast.error('Gagal memuat data laporan');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { 
    fetchLeads(); 
  }, []);

  const filtered = leads.filter(l => {
    if (dateFrom && l.tanggal < dateFrom) return false;
    if (dateTo && l.tanggal > dateTo) return false;
    if (filterStatus && l.status_produksi !== filterStatus) return false;
    return true;
  });

  const exportToExcel = () => {
    if (filtered.length === 0) { 
      toast.error('Tidak ada data untuk diekspor'); 
      return; 
    }

    const data = filtered.map(l => ({
      'Lead ID': l.lead_id,
      'Tanggal': formatDateShort(l.tanggal),
      'Nama Pelanggan': l.nama_pelanggan,
      'WhatsApp': `+${l.whatsapp}`,
      'Nama Produk': l.nama_produk,
      'Status Produksi': l.status_produksi,
      'Catatan Admin': l.catatan_admin || '',
      'Link WhatsApp': l.link_whatsapp || '',
      'Created At': l.created_at || '',
      'Updated At': l.updated_at || '',
    }));

    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Leads WhatsApp');

    const fileName = `UPPERINK_Leads_${new Date().toISOString().slice(0, 10)}.xlsx`;
    XLSX.writeFile(wb, fileName);
    toast.success(`Export berhasil: ${fileName}`);
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-navy-900">Laporan & Analisis</h1>
          <p className="text-gray-400 text-sm mt-0.5">Export dan analisis data Leads WhatsApp klien</p>
        </div>
        <button
          onClick={exportToExcel}
          className="btn-primary flex items-center gap-2"
        >
          <Download className="w-4 h-4" />
          Export Excel
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl shadow-card p-5 grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label className="form-label text-xs">Dari Tanggal</label>
          <input type="date" value={dateFrom} onChange={e => setDateFrom(e.target.value)} className="form-input py-2.5" />
        </div>
        <div>
          <label className="form-label text-xs">Sampai Tanggal</label>
          <input type="date" value={dateTo} onChange={e => setDateTo(e.target.value)} className="form-input py-2.5" />
        </div>
        <div>
          <label className="form-label text-xs">Filter Status</label>
          <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)} className="form-input py-2.5">
            <option value="" className="bg-[#1A1819] text-zinc-300">Semua Status</option>
            {ORDER_STATUS_LIST.map(s => <option key={s.key} value={s.key} className="bg-[#1A1819] text-zinc-300">{s.label}</option>)}
          </select>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: 'Total Leads', value: filtered.length, color: 'bg-navy-50 text-navy-700' },
          { label: 'Leads Aktif', value: filtered.filter(l => l.status_produksi !== 'Selesai').length, color: 'bg-orange-50 text-orange-700' },
          { label: 'Leads Selesai', value: filtered.filter(l => l.status_produksi === 'Selesai').length, color: 'bg-green-50 text-green-700' },
          { label: 'Tahap Konsultasi', value: filtered.filter(l => l.status_produksi === 'Konsultasi').length, color: 'bg-yellow-50 text-yellow-700' },
        ].map(({ label, value, color }) => (
          <div key={label} className={`${color} rounded-2xl p-5 font-bold`}>
            <div className="text-3xl">{value}</div>
            <div className="text-sm opacity-70 mt-1 font-medium">{label}</div>
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-card overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
          <span className="font-bold text-navy-900 text-sm">
            {filtered.length} leads ditemukan
          </span>
          <button onClick={fetchLeads} className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-navy-700">
            <RefreshCcw className="w-3.5 h-3.5" /> Refresh
          </button>
        </div>

        {loading ? (
          <LoadingSpinner className="py-16" size="lg" />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  {['Lead ID', 'Nama Pelanggan', 'WhatsApp', 'Produk', 'Tanggal', 'Status'].map(h => (
                    <th key={h} className="table-header text-left px-4 py-3">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filtered.map(l => (
                  <tr key={l.lead_id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3 font-mono text-xs font-semibold text-navy-700">{l.lead_id}</td>
                    <td className="px-4 py-3 font-medium text-navy-800">{l.nama_pelanggan}</td>
                    <td className="px-4 py-3 text-gray-600">+{l.whatsapp}</td>
                    <td className="px-4 py-3 text-gray-600">{l.nama_produk}</td>
                    <td className="px-4 py-3 text-gray-400 text-xs">{formatDateShort(l.tanggal)}</td>
                    <td className="px-4 py-3"><Badge status={l.status_produksi} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReportsPage;
