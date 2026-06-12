import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Search, Package, CheckCircle, Clock, AlertCircle, RefreshCcw } from 'lucide-react';
import { getLeadByTracking } from '../services/leadService';
import { getOrderByTracking } from '../services/orderService';
import { normalizeWhatsApp } from '../utils/validators';
import { formatDate } from '../utils/formatters';
import { ORDER_STATUS_LIST } from '../config/constants';
import Badge from '../components/common/Badge';

// Auto-refresh interval for live status (60 seconds)
const LIVE_REFRESH_INTERVAL = 60000;

const StatusTimeline = ({ currentStatus }) => {
  const currentStep = ORDER_STATUS_LIST.find((s) => s.key === currentStatus)?.step || 1;

  return (
    <div className="py-4">
      <div className="space-y-0">
        {ORDER_STATUS_LIST.map((status, i) => {
          const isDone = status.step < currentStep;
          const isCurrent = status.step === currentStep;
          const isLast = i === ORDER_STATUS_LIST.length - 1;

          return (
            <div key={status.key} className="flex gap-4">
              {/* Timeline Line */}
              <div className="flex flex-col items-center">
                <div
                  className={`w-9 h-9 rounded-none flex items-center justify-center shrink-0 border transition-all ${
                    isDone
                      ? 'bg-green-600 border-green-600'
                      : isCurrent
                      ? 'bg-[#810100] border-[#810100] ring-4 ring-[#810100]/20'
                      : 'bg-[#090909] border-zinc-800'
                  }`}
                  style={{ clipPath: 'polygon(0 0, calc(100% - 6px) 0, 100% 6px, 100% 100%, 6px 100%, 0 calc(100% - 6px))' }}
                >
                  {isDone ? (
                    <CheckCircle className="w-5 h-5 text-white" />
                  ) : isCurrent ? (
                    <Clock className="w-4 h-4 text-zinc-50 animate-pulse" />
                  ) : (
                    <div className="w-1.5 h-1.5 rounded-full bg-zinc-700" />
                  )}
                </div>
                {!isLast && (
                  <div
                    className={`w-[2px] flex-1 my-1 min-h-[2.5rem] transition-colors ${
                      isDone ? 'bg-green-600' : 'bg-zinc-800'
                    }`}
                  />
                )}
              </div>

              {/* Content */}
              <div className={`pb-6 ${isLast ? 'pb-0' : ''}`}>
                <div
                  className={`text-sm font-semibold mt-1.5 transition-colors ${
                    isCurrent ? 'text-zinc-50 font-bold' : isDone ? 'text-zinc-400' : 'text-zinc-600'
                  }`}
                >
                  {status.label}
                </div>
                {isCurrent && (
                  <div className="text-[10px] text-cherry-500 font-bold uppercase tracking-wider mt-0.5">
                    Status saat ini
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// Standardize both Lead and Order structures into a single format for the UI
const normalizeTrackingData = (data, type) => {
  if (!data) return null;
  if (type === 'order') {
    let statusProduksi = data.status || 'Konsultasi';
    if (statusProduksi === 'Produksi') statusProduksi = 'Masuk Produksi';
    else if (statusProduksi === 'Menunggu Konfirmasi') statusProduksi = 'Menunggu Detail Pesanan';
    else if (statusProduksi === 'DP Diterima') statusProduksi = 'Menunggu DP';

    return {
      lead_id: data.order_id,
      tanggal: data.tanggal,
      nama_pelanggan: data.nama,
      whatsapp: data.whatsapp,
      nama_produk: data.produk,
      status_produksi: statusProduksi,
      catatan_admin: data.catatan_admin || '',
      type: 'order'
    };
  } else {
    return {
      lead_id: data.lead_id,
      tanggal: data.tanggal,
      nama_pelanggan: data.nama_pelanggan,
      whatsapp: data.whatsapp,
      nama_produk: data.nama_produk,
      status_produksi: data.status_produksi || 'Konsultasi',
      catatan_admin: data.catatan_admin || '',
      type: 'lead'
    };
  }
};

const TrackingPage = () => {
  const [orderId, setOrderId] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(false);
  const [notFound, setNotFound] = useState(false);
  const [liveRefreshing, setLiveRefreshing] = useState(false);
  const [countdown, setCountdown] = useState(LIVE_REFRESH_INTERVAL / 1000);
  const [lastStatus, setLastStatus] = useState(null);
  const [statusChanged, setStatusChanged] = useState(false);

  const intervalRef = useRef(null);
  const countdownRef = useRef(null);
  const currentOrderRef = useRef(null); // Keep track of last searched params

  const stopLiveRefresh = () => {
    clearInterval(intervalRef.current);
    clearInterval(countdownRef.current);
    intervalRef.current = null;
    countdownRef.current = null;
  };

  const liveRefresh = useCallback(async () => {
    if (!currentOrderRef.current) return;
    const { id, wa, type } = currentOrderRef.current;

    setLiveRefreshing(true);
    try {
      const fetchFunc = type === 'order' ? getOrderByTracking : getLeadByTracking;
      const rawResult = await fetchFunc(id, wa);
      const result = normalizeTrackingData(rawResult, type);
      
      if (result) {
        setOrder((prev) => {
          // Check if status changed
          if (prev && prev.status_produksi !== result.status_produksi) {
            setStatusChanged(true);
            setLastStatus(prev.status_produksi);
            setTimeout(() => setStatusChanged(false), 5000);
          }
          return result;
        });
      }
    } catch {
      // Silent fail on background refresh
    } finally {
      setLiveRefreshing(false);
    }
  }, []);

  const startLiveRefresh = useCallback(() => {
    stopLiveRefresh();

    setCountdown(LIVE_REFRESH_INTERVAL / 1000);
    countdownRef.current = setInterval(() => {
      setCountdown((c) => {
        if (c <= 1) return LIVE_REFRESH_INTERVAL / 1000;
        return c - 1;
      });
    }, 1000);

    intervalRef.current = setInterval(() => {
      liveRefresh();
      setCountdown(LIVE_REFRESH_INTERVAL / 1000);
    }, LIVE_REFRESH_INTERVAL);
  }, [liveRefresh]);

  // Cleanup on unmount
  useEffect(() => () => stopLiveRefresh(), []);

  const handleTrack = async (e) => {
    e.preventDefault();
    if (!orderId.trim() || !whatsapp.trim()) return;

    stopLiveRefresh();
    setLoading(true);
    setNotFound(false);
    setOrder(null);
    setStatusChanged(false);
    setLastStatus(null);

    const normalizedId = orderId.trim().toUpperCase();
    const normalizedWa = normalizeWhatsApp(whatsapp.trim());
    const trackingType = normalizedId.startsWith('ORD-') ? 'order' : 'lead';

    try {
      const fetchFunc = trackingType === 'order' ? getOrderByTracking : getLeadByTracking;
      const rawResult = await fetchFunc(normalizedId, normalizedWa);
      const result = normalizeTrackingData(rawResult, trackingType);
      
      if (result) {
        setOrder(result);
        setLastStatus(result.status_produksi);
        currentOrderRef.current = { id: normalizedId, wa: normalizedWa, type: trackingType };
        startLiveRefresh();
      } else {
        setNotFound(true);
        currentOrderRef.current = null;
      }
    } catch (err) {
      console.error('Tracking error:', err);
      setNotFound(true);
      currentOrderRef.current = null;
    } finally {
      setLoading(false);
    }
  };

  const handleManualRefresh = async () => {
    if (!currentOrderRef.current) return;
    stopLiveRefresh();
    await liveRefresh();
    startLiveRefresh();
  };

  return (
    <div className="min-h-screen pb-20" style={{ background: '#090909' }}>
      {/* Header */}
      <div className="border-b border-white/[0.05] py-16 mb-12 pt-24">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="h-px w-8 bg-cherry-500" />
            <span className="text-[10px] text-zinc-500 tracking-[0.3em] uppercase">STATUS PRODUKSI</span>
            <span className="h-px w-8 bg-cherry-500" />
          </div>
          <h1
            className="text-4xl md:text-6xl text-zinc-50 tracking-wider mb-4"
            style={{ fontFamily: "'Bebas Neue', Impact, sans-serif" }}
          >
            TRACKING PESANAN
          </h1>
          <p className="text-zinc-400 max-w-xl mx-auto text-sm leading-relaxed">
            Pantau status pesanan pakaian Anda secara real-time menggunakan kode lead/order dan nomor WhatsApp Anda
          </p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6">
        {/* Search Form */}
        <div className="p-8 border border-zinc-800 mb-6" style={{ background: '#1A1819' }}>
          <form onSubmit={handleTrack} className="space-y-5">
            <div>
              <label className="form-label text-xs font-semibold text-zinc-400 tracking-wider uppercase mb-1.5 block">
                Nomor Kode Pesanan / Lead ID
              </label>
              <input
                type="text"
                placeholder="Contoh: LID-XXXXXXXX-XXX"
                value={orderId}
                onChange={(e) => setOrderId(e.target.value)}
                className="form-input font-mono uppercase"
              />
            </div>
            <div>
              <label className="form-label text-xs font-semibold text-zinc-400 tracking-wider uppercase mb-1.5 block">
                Nomor WhatsApp Pelanggan
              </label>
              <input
                type="tel"
                placeholder="Contoh: 08XXXXXXXXXX"
                value={whatsapp}
                onChange={(e) => setWhatsapp(e.target.value)}
                className="form-input"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full flex items-center justify-center gap-2 py-4 text-xs font-bold uppercase tracking-wider cursor-pointer"
            >
              {loading ? (
                <><span className="animate-spin mr-1">⚙</span> Mencari...</>
              ) : (
                <><Search className="w-4 h-4" /> Cek Status Pesanan</>
              )}
            </button>
          </form>
        </div>

        {/* Not Found */}
        {notFound && (
          <div className="p-8 text-center animate-fade-in border border-zinc-800" style={{ background: '#1A1819' }}>
            <AlertCircle className="w-12 h-12 text-[#810100] mx-auto mb-4" />
            <h3 className="text-xl font-display tracking-widest text-zinc-200 mb-2" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
              PESANAN TIDAK DITEMUKAN
            </h3>
            <p className="text-zinc-500 text-sm leading-relaxed max-w-sm mx-auto">
              Periksa kembali kode pesanan dan nomor WhatsApp yang dimasukkan, pastikan tidak ada kesalahan ketik.
            </p>
          </div>
        )}

        {/* Order Detail */}
        {order && (
          <div className="space-y-6 animate-fade-in-up">
            {/* Status Changed Banner */}
            {statusChanged && (
              <div className="p-4 border border-green-500/30 bg-green-500/10 animate-fade-in flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-green-400 shrink-0" />
                <div>
                  <div className="text-xs font-bold text-green-400 uppercase tracking-wider">Status Diperbarui!</div>
                  <div className="text-xs text-zinc-400 mt-0.5">
                    {lastStatus} → <span className="text-zinc-200 font-semibold">{order.status_produksi}</span>
                  </div>
                </div>
              </div>
            )}

            {/* Header Card */}
            <div className="p-6 border border-zinc-800" style={{ background: '#1A1819' }}>
              <div className="flex items-start justify-between flex-wrap gap-4 mb-6 pb-5 border-b border-zinc-800/80">
                <div>
                  <div className="text-[9px] text-zinc-500 uppercase tracking-widest mb-1">Nomor Pesanan</div>
                  <div className="text-2xl font-black text-zinc-100 font-mono tracking-wide">{order.lead_id}</div>
                  <div className="text-xs text-zinc-500 mt-1">{formatDate(order.tanggal)}</div>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <Badge status={order.status_produksi} className="text-[10px] px-3.5 py-1.5 uppercase tracking-wider rounded-none font-bold" />
                  {/* Live indicator + manual refresh */}
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1.5">
                      {liveRefreshing ? (
                        <RefreshCcw className="w-3 h-3 text-zinc-500 animate-spin" />
                      ) : (
                        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                      )}
                      <span className="text-[9px] text-zinc-500 uppercase tracking-widest">
                        {liveRefreshing ? 'Memperbarui...' : `Live · ${countdown}s`}
                      </span>
                    </div>
                    <button
                      onClick={handleManualRefresh}
                      disabled={liveRefreshing}
                      className="text-[9px] text-zinc-600 hover:text-zinc-400 uppercase tracking-wider transition-colors disabled:opacity-40"
                    >
                      Refresh
                    </button>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  { label: 'Nama Pelanggan', value: order.nama_pelanggan },
                  { label: 'Produk Yang Dipesan', value: order.nama_produk },
                  { label: 'Kontak WhatsApp', value: `+${order.whatsapp}` },
                  { label: 'Status Pengerjaan', value: order.status_produksi },
                ].map(({ label, value }) => (
                  <div key={label} className="bg-[#090909]/40 border border-zinc-800/50 p-3">
                    <div className="text-[9px] text-zinc-500 uppercase tracking-wider mb-0.5">{label}</div>
                    <div className="text-sm font-semibold text-zinc-200">{value}</div>
                  </div>
                ))}
              </div>

              {order.catatan_admin && (
                <div className="mt-6 bg-[#810100]/10 border border-[#810100]/30 p-4 border-l-2 border-l-[#810100]">
                  <div className="text-[10px] text-cherry-500 font-bold uppercase tracking-wider mb-1">📋 Catatan Produksi UPPERINK</div>
                  <div className="text-sm text-zinc-300 leading-relaxed">{order.catatan_admin}</div>
                </div>
              )}
            </div>

            {/* Timeline */}
            <div className="p-6 border border-zinc-800" style={{ background: '#1A1819' }}>
              <h3
                className="font-bold text-zinc-50 mb-5 flex items-center gap-2 text-xs uppercase tracking-widest"
                style={{ fontFamily: "'Outfit', sans-serif" }}
              >
                <Package className="w-5 h-5 text-cherry-500" />
                Progress Pengerjaan Pesanan
              </h3>
              <StatusTimeline currentStatus={order.status_produksi} />
            </div>

            {/* Live update info */}
            <div className="text-center text-xs text-zinc-700">
              Status otomatis diperbarui setiap {LIVE_REFRESH_INTERVAL / 1000} detik ·{' '}
              <button
                onClick={handleManualRefresh}
                className="text-zinc-500 hover:text-zinc-300 underline transition-colors"
              >
                Perbarui sekarang
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TrackingPage;
