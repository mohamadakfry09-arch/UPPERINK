import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  Search, Filter, Eye, Trash2, ExternalLink, Save, RefreshCcw, X, Bell, Wifi
} from 'lucide-react';
import { getOrders, updateOrder, deleteOrder } from '../../services/orderService';
import { ORDER_STATUS_LIST } from '../../config/constants';
import { formatDate, formatDateShort } from '../../utils/formatters';
import Badge from '../../components/common/Badge';
import Modal from '../../components/common/Modal';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import toast from 'react-hot-toast';

// Auto-refresh interval (ms)
const REFRESH_INTERVAL = 30000;

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [selected, setSelected] = useState(null);
  const [editStatus, setEditStatus] = useState('');
  const [editNote, setEditNote] = useState('');
  const [saving, setSaving] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [newOrderCount, setNewOrderCount] = useState(0);
  const [lastSeenCount, setLastSeenCount] = useState(null);
  const [countdown, setCountdown] = useState(REFRESH_INTERVAL / 1000);
  const [highlightedOrder, setHighlightedOrder] = useState(null);
  const intervalRef = useRef(null);
  const countdownRef = useRef(null);
  const isFirstLoad = useRef(true);

  const fetchOrders = useCallback(async (isManual = false) => {
    if (isManual) setRefreshing(true);
    else if (isFirstLoad.current) setLoading(true);

    try {
      const data = await getOrders();
      const sorted = data.sort((a, b) => new Date(b.tanggal) - new Date(a.tanggal));

      setOrders((prev) => {
        if (!isFirstLoad.current && prev.length > 0 && sorted.length > prev.length) {
          const diff = sorted.length - prev.length;
          setNewOrderCount(diff);
          toast.custom((t) => (
            <div className={`flex items-center gap-3 bg-white border border-orange-200 shadow-lg rounded-2xl px-4 py-3 text-sm transition-all ${t.visible ? 'opacity-100' : 'opacity-0'}`}>
              <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center shrink-0">
                <Bell className="w-4 h-4 text-orange-500" />
              </div>
              <div>
                <div className="font-semibold text-navy-800">{diff} Pesanan Baru!</div>
                <div className="text-gray-400 text-xs">Baru saja masuk ke sistem</div>
              </div>
            </div>
          ), { duration: 5000 });
        }
        return sorted;
      });

      isFirstLoad.current = false;
    } catch (err) {
      console.error('Failed to fetch orders:', err);
      if (isManual) toast.error('Gagal memuat data pesanan');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  // Setup auto-refresh
  useEffect(() => {
    fetchOrders();

    const startCountdown = () => {
      setCountdown(REFRESH_INTERVAL / 1000);
      countdownRef.current = setInterval(() => {
        setCountdown((c) => {
          if (c <= 1) return REFRESH_INTERVAL / 1000;
          return c - 1;
        });
      }, 1000);
    };

    startCountdown();

    intervalRef.current = setInterval(() => {
      fetchOrders();
      setCountdown(REFRESH_INTERVAL / 1000);
    }, REFRESH_INTERVAL);

    return () => {
      clearInterval(intervalRef.current);
      clearInterval(countdownRef.current);
    };
  }, [fetchOrders]);

  const handleManualRefresh = async () => {
    clearInterval(intervalRef.current);
    clearInterval(countdownRef.current);
    setNewOrderCount(0);
    await fetchOrders(true);

    setCountdown(REFRESH_INTERVAL / 1000);
    countdownRef.current = setInterval(() => {
      setCountdown((c) => (c <= 1 ? REFRESH_INTERVAL / 1000 : c - 1));
    }, 1000);
    intervalRef.current = setInterval(() => {
      fetchOrders();
      setCountdown(REFRESH_INTERVAL / 1000);
    }, REFRESH_INTERVAL);
  };

  const openDetail = (order) => {
    setSelected(order);
    setEditStatus(order.status);
    setEditNote(order.catatan_admin || '');
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await updateOrder(selected.order_id, {
        status: editStatus,
        catatan_admin: editNote,
      });
      setOrders((prev) =>
        prev.map((o) =>
          o.order_id === selected.order_id
            ? { ...o, status: editStatus, catatan_admin: editNote }
            : o
        )
      );
      setSelected((prev) => ({ ...prev, status: editStatus, catatan_admin: editNote }));
      setHighlightedOrder(selected.order_id);
      setTimeout(() => setHighlightedOrder(null), 3000);
      toast.success('Status pesanan berhasil diperbarui!');
    } catch {
      toast.error('Gagal menyimpan perubahan');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (orderId) => {
    try {
      await deleteOrder(orderId);
      setOrders((prev) => prev.filter((o) => o.order_id !== orderId));
      setDeleteConfirm(null);
      if (selected?.order_id === orderId) setSelected(null);
      toast.success('Pesanan berhasil dihapus');
    } catch {
      toast.error('Gagal menghapus pesanan');
    }
  };

  const filtered = orders.filter((o) => {
    const matchSearch =
      !search ||
      o.order_id?.toLowerCase().includes(search.toLowerCase()) ||
      o.nama?.toLowerCase().includes(search.toLowerCase()) ||
      o.whatsapp?.includes(search);
    const matchStatus = !filterStatus || o.status === filterStatus;
    return matchSearch && matchStatus;
  });

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <div className="flex items-center gap-3 flex-wrap">
            <h1 className="text-2xl font-black text-navy-900">Kelola Pesanan</h1>
            {/* Live indicator */}
            <div className="flex items-center gap-1.5 bg-green-50 border border-green-200 px-2.5 py-1 rounded-full">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-xs font-semibold text-green-600">LIVE</span>
            </div>
            {newOrderCount > 0 && (
              <div className="flex items-center gap-1.5 bg-orange-50 border border-orange-200 px-2.5 py-1 rounded-full animate-bounce">
                <Bell className="w-3 h-3 text-orange-500" />
                <span className="text-xs font-bold text-orange-600">{newOrderCount} Baru!</span>
              </div>
            )}
          </div>
          <p className="text-gray-400 text-sm mt-0.5">
            {orders.length} total pesanan
            <span className="text-gray-300 mx-2">·</span>
            <span className="text-gray-400">Refresh dalam {countdown}s</span>
          </p>
        </div>
        <button
          onClick={handleManualRefresh}
          disabled={refreshing}
          className="flex items-center gap-2 text-sm bg-white px-4 py-2 rounded-xl shadow-card text-gray-500 hover:text-navy-700 transition-colors disabled:opacity-60"
        >
          <RefreshCcw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
          Refresh
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl shadow-card p-4 flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Cari nomor order, nama, atau WA..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="form-input pl-9 py-2.5"
          />
          {search && (
            <button
              onClick={() => setSearch('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-gray-400 shrink-0" />
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="form-input py-2.5 min-w-[180px]"
          >
            <option value="" className="bg-[#1A1819] text-zinc-300">Semua Status</option>
            {ORDER_STATUS_LIST.map((s) => (
              <option key={s.key} value={s.key} className="bg-[#1A1819] text-zinc-300">{s.label}</option>
            ))}
          </select>
          {filterStatus && (
            <button
              onClick={() => setFilterStatus('')}
              className="p-2 hover:bg-gray-100 rounded-lg text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-card overflow-hidden">
        {loading ? (
          <LoadingSpinner className="py-16" size="lg" />
        ) : filtered.length === 0 ? (
          <div className="py-16 text-center text-gray-400">
            <Search className="w-10 h-10 mx-auto mb-3 opacity-40" />
            <p>Tidak ada pesanan ditemukan</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  {['Order ID', 'Pelanggan', 'Produk', 'Jumlah', 'Tgl Order', 'Status', 'Aksi'].map((h) => (
                    <th key={h} className="table-header text-left px-4 py-3">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filtered.map((o) => (
                  <tr
                    key={o.order_id}
                    className={`transition-colors ${
                      highlightedOrder === o.order_id
                        ? 'bg-green-50 border-l-4 border-l-green-400'
                        : 'hover:bg-gray-50'
                    }`}
                  >
                    <td className="px-4 py-3 font-mono text-xs font-semibold text-navy-700">
                      {o.order_id}
                    </td>
                    <td className="px-4 py-3">
                      <div className="font-medium text-navy-800">{o.nama}</div>
                      <div className="text-xs text-gray-400">{o.whatsapp}</div>
                    </td>
                    <td className="px-4 py-3 text-gray-600">{o.produk}</td>
                    <td className="px-4 py-3 text-gray-600">{o.jumlah} pcs</td>
                    <td className="px-4 py-3 text-gray-400 text-xs">{formatDateShort(o.tanggal)}</td>
                    <td className="px-4 py-3"><Badge status={o.status} /></td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => openDetail(o)}
                          className="p-1.5 hover:bg-navy-50 rounded-lg text-navy-600 transition-colors"
                          title="Lihat Detail"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setDeleteConfirm(o.order_id)}
                          className="p-1.5 hover:bg-red-50 rounded-lg text-red-500 transition-colors"
                          title="Hapus"
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
        )}
      </div>

      {/* Detail Modal */}
      <Modal isOpen={!!selected} onClose={() => setSelected(null)} title="Detail Pesanan" size="lg">
        {selected && (
          <div className="space-y-5">
            {/* Header */}
            <div className="flex items-center justify-between flex-wrap gap-3">
              <div>
                <div className="font-mono text-lg font-black text-navy-800">{selected.order_id}</div>
                <div className="text-sm text-gray-400">{formatDate(selected.tanggal)}</div>
              </div>
              <Badge status={selected.status} className="text-sm" />
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              {/* Customer Info */}
              <div className="bg-gray-50 rounded-xl p-4">
                <h4 className="text-xs font-bold text-gray-500 uppercase mb-3">Info Pelanggan</h4>
                <div className="space-y-2 text-sm">
                  {[
                    { label: 'Nama', value: selected.nama },
                    { label: 'WhatsApp', value: selected.whatsapp },
                    { label: 'Alamat', value: selected.alamat },
                    { label: 'Metode', value: selected.metode_pengambilan === 'kirim' ? '🚚 Kirim' : '📍 Ambil' },
                  ].map(({ label, value }) => (
                    <div key={label}>
                      <span className="text-gray-400">{label}: </span>
                      <span className="text-navy-800 font-medium">{value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Product Info */}
              <div className="bg-orange-50 rounded-xl p-4">
                <h4 className="text-xs font-bold text-orange-600 uppercase mb-3">Detail Produk</h4>
                <div className="space-y-2 text-sm">
                  {[
                    { label: 'Produk', value: selected.produk },
                    { label: 'Bahan', value: selected.bahan },
                    { label: 'Warna', value: selected.warna },
                    { label: 'Ukuran', value: selected.ukuran },
                    { label: 'Jumlah', value: `${selected.jumlah} pcs` },
                  ].map(({ label, value }) => (
                    <div key={label}>
                      <span className="text-gray-500">{label}: </span>
                      <span className="text-navy-800 font-medium">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {selected.catatan && (
              <div className="bg-blue-50 rounded-xl p-4 text-sm">
                <div className="text-blue-600 font-semibold mb-1">📝 Catatan Pelanggan</div>
                <div className="text-blue-800">{selected.catatan}</div>
              </div>
            )}

            {selected.file_desain_url && (
              <a
                href={selected.file_desain_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-navy-50 text-navy-700 px-4 py-2 rounded-xl text-sm font-medium hover:bg-navy-100 transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
                Lihat File Desain (Google Drive)
              </a>
            )}

            {/* Edit Section */}
            <div className="border-t pt-5 space-y-4">
              <h4 className="font-bold text-navy-900">Update Status & Catatan Admin</h4>
              <div>
                <label className="form-label">Status Pesanan</label>
                <select
                  value={editStatus}
                  onChange={(e) => setEditStatus(e.target.value)}
                  className="form-input"
                >
                  {ORDER_STATUS_LIST.map((s) => (
                    <option key={s.key} value={s.key} className="bg-[#1A1819] text-zinc-300">{s.label}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="form-label">Catatan Admin</label>
                <textarea
                  rows={3}
                  value={editNote}
                  onChange={(e) => setEditNote(e.target.value)}
                  placeholder="cth: Sudah DP 50%, resi JNE123456..."
                  className="form-input resize-none"
                />
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => setSelected(null)}
                  className="border border-gray-200 text-gray-700 hover:bg-gray-50 flex-1 py-2.5 rounded-xl text-sm font-semibold transition-colors"
                >
                  Tutup
                </button>
                <button
                  onClick={handleSave}
                  disabled={saving}
                  className="btn-primary flex items-center gap-2 flex-1 justify-center"
                >
                  {saving ? (
                    <><span className="animate-spin">⚙</span> Menyimpan...</>
                  ) : (
                    <><Save className="w-4 h-4" /> Simpan Perubahan</>
                  )}
                </button>
              </div>
            </div>
          </div>
        )}
      </Modal>

      {/* Delete Confirm Modal */}
      <Modal isOpen={!!deleteConfirm} onClose={() => setDeleteConfirm(null)} title="Konfirmasi Hapus" size="sm">
        <div className="text-center py-2">
          <div className="w-14 h-14 bg-red-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Trash2 className="w-7 h-7 text-red-500" />
          </div>
          <p className="text-gray-600 mb-6">
            Apakah Anda yakin ingin menghapus pesanan <strong>{deleteConfirm}</strong>? Tindakan ini tidak dapat dibatalkan.
          </p>
          <div className="flex gap-3">
            <button onClick={() => setDeleteConfirm(null)} className="border border-gray-200 text-gray-700 hover:bg-gray-50 flex-1 py-2.5 rounded-xl text-sm font-semibold transition-colors">Batal</button>
            <button
              onClick={() => handleDelete(deleteConfirm)}
              className="flex-1 bg-red-500 hover:bg-red-600 text-white font-semibold py-3 px-6 rounded-xl transition-colors"
            >
              Hapus
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default OrdersPage;
