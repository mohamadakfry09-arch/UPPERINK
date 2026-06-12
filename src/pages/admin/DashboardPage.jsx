import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Package, 
  Clock, 
  Activity, 
  CheckCircle2, 
  Image, 
  BarChart2, 
  ExternalLink, 
  MessageCircle,
  Send
} from 'lucide-react';
import { getAllProducts } from '../../services/productService';
import { getLeads } from '../../services/leadService';
import { COMPANY } from '../../config/constants';
import { formatDateShort } from '../../utils/formatters';
import Badge from '../../components/common/Badge';
import LoadingSpinner from '../../components/common/LoadingSpinner';

const DashboardPage = () => {
  const [products, setProducts] = useState([]);
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([getAllProducts(), getLeads()])
      .then(([productsData, leadsData]) => {
        setProducts(productsData || []);
        setLeads(leadsData || []);
      })
      .catch((err) => {
        console.error('Error fetching dashboard data:', err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  // Calculate statistics
  const totalLeads = leads.length;
  const pendingLeads = leads.filter(l => 
    l.status_produksi === 'Konsultasi' || 
    l.status_produksi === 'Menunggu Detail Pesanan'
  ).length;
  
  const activeProduction = leads.filter(l => 
    l.status_produksi === 'Menunggu DP' || 
    l.status_produksi === 'Pesanan Dikonfirmasi' || 
    l.status_produksi === 'Desain Diproses' || 
    l.status_produksi === 'Masuk Produksi' ||
    l.status_produksi === 'Quality Control'
  ).length;
  
  const completedLeads = leads.filter(l => 
    l.status_produksi === 'Selesai' || 
    l.status_produksi === 'Siap Dikirim / Diambil'
  ).length;
  
  const totalProducts = products.length;
  const activeProducts = products.filter(p => p.status === 'aktif').length;

  if (loading) {
    return (
      <div className="py-24 flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-6xl">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-black text-navy-900">Dashboard</h1>
        <p className="text-sm text-gray-400 mt-0.5">Ringkasan aktivitas Leads WhatsApp, status produksi, dan katalog UPPERINK</p>
      </div>

      {/* Stats Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { 
            label: 'Konsultasi / Menunggu Detail', 
            value: pendingLeads, 
            icon: Clock, 
            color: 'text-yellow-600 bg-yellow-50 border-yellow-155',
            desc: 'Butuh follow-up spesifikasi'
          },
          { 
            label: 'Produksi Sedang Berjalan', 
            value: activeProduction, 
            icon: Activity, 
            color: 'text-blue-600 bg-blue-50 border-blue-155',
            desc: 'DP, desain, jahit, QC'
          },
          { 
            label: 'Leads Selesai / Terkirim', 
            value: completedLeads, 
            icon: CheckCircle2, 
            color: 'text-green-600 bg-green-50 border-green-155',
            desc: 'Selesai & diserahkan'
          },
          { 
            label: 'Total Produk Katalog', 
            value: totalProducts, 
            icon: Package, 
            color: 'text-purple-600 bg-purple-50 border-purple-155',
            desc: `${activeProducts} aktif di katalog`
          },
        ].map(({ label, value, icon: Icon, color, desc }) => (
          <div key={label} className="bg-white border border-gray-100 p-5 rounded-2xl shadow-card transition-all hover:shadow-card-hover">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">{label}</span>
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center border ${color.split(' ').slice(0, 2).join(' ')}`}>
                <Icon className="w-5 h-5" />
              </div>
            </div>
            <div className="text-3xl font-black text-gray-900">{value}</div>
            <p className="text-[11px] text-gray-400 mt-1 font-medium">{desc}</p>
          </div>
        ))}
      </div>

      {/* Quick Actions (Aksi Cepat) */}
      <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-card">
        <h2 className="text-sm font-bold text-navy-900 uppercase tracking-wider mb-4">Aksi Cepat</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <Link
            to="/admin/leads"
            className="flex items-center gap-3 p-4 border border-gray-100 rounded-xl hover:border-[#810100]/30 hover:bg-[#810100]/[0.01] transition-all group"
          >
            <div className="p-2.5 bg-gray-50 rounded-lg group-hover:bg-red-50 transition-colors">
              <MessageCircle className="w-5 h-5 text-gray-500 group-hover:text-[#810100]" />
            </div>
            <div>
              <div className="text-sm font-semibold text-gray-700 group-hover:text-gray-900">Leads WhatsApp</div>
              <div className="text-xs text-gray-400">Database chat, status produksi</div>
            </div>
          </Link>

          <Link
            to="/admin/whatsapp-confirm"
            className="flex items-center gap-3 p-4 border border-gray-100 rounded-xl hover:border-[#810100]/30 hover:bg-[#810100]/[0.01] transition-all group"
          >
            <div className="p-2.5 bg-gray-50 rounded-lg group-hover:bg-red-50 transition-colors">
              <Send className="w-5 h-5 text-gray-500 group-hover:text-[#810100]" />
            </div>
            <div>
              <div className="text-sm font-semibold text-gray-700 group-hover:text-gray-900">Konfirmasi WhatsApp</div>
              <div className="text-xs text-gray-400">Mulai chat & register lead</div>
            </div>
          </Link>
          
          <Link
            to="/admin/production-update"
            className="flex items-center gap-3 p-4 border border-gray-100 rounded-xl hover:border-[#810100]/30 hover:bg-[#810100]/[0.01] transition-all group"
          >
            <div className="p-2.5 bg-gray-50 rounded-lg group-hover:bg-red-50 transition-colors">
              <Activity className="w-5 h-5 text-gray-500 group-hover:text-[#810100]" />
            </div>
            <div>
              <div className="text-sm font-semibold text-gray-700 group-hover:text-gray-900">Update Produksi</div>
              <div className="text-xs text-gray-400">Kirim status baru via WA</div>
            </div>
          </Link>

          <Link
            to="/admin/products"
            className="flex items-center gap-3 p-4 border border-gray-100 rounded-xl hover:border-[#810100]/30 hover:bg-[#810100]/[0.01] transition-all group"
          >
            <div className="p-2.5 bg-gray-50 rounded-lg group-hover:bg-red-50 transition-colors">
              <Package className="w-5 h-5 text-gray-500 group-hover:text-[#810100]" />
            </div>
            <div>
              <div className="text-sm font-semibold text-gray-700 group-hover:text-gray-900">Kelola Produk</div>
              <div className="text-xs text-gray-400">Tambah/edit katalog produk</div>
            </div>
          </Link>
        </div>

        {/* Secondary External Links */}
        <div className="flex flex-wrap gap-4 mt-5 pt-4 border-t border-gray-100 text-xs">
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-gray-500 hover:text-[#810100] transition-colors"
          >
            <ExternalLink className="w-3.5 h-3.5" /> Lihat Tampilan Website Pelanggan
          </a>
          <span className="text-gray-300">|</span>
          <a
            href={`https://wa.me/${COMPANY.whatsapp.replace(/\D/g, '')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-gray-500 hover:text-green-600 transition-colors"
          >
            <MessageCircle className="w-3.5 h-3.5" /> Hubungi WhatsApp Admin ({COMPANY.whatsapp})
          </a>
        </div>
      </div>

      {/* Dynamic Data Grid: Recent Leads & Recent Products */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Leads */}
        <div className="bg-white border border-gray-100 rounded-2xl shadow-card overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
            <h2 className="text-sm font-bold text-navy-900 uppercase tracking-wider">Leads WhatsApp Terbaru</h2>
            <Link to="/admin/leads" className="text-xs text-[#810100] font-semibold hover:underline">
              Semua Leads →
            </Link>
          </div>
          {leads.length === 0 ? (
            <div className="p-8 text-center text-gray-400 text-sm">Belum ada data leads masuk.</div>
          ) : (
            <div className="divide-y divide-gray-50">
              {leads.slice(0, 5).map(l => (
                <div key={l.lead_id} className="px-6 py-3.5 flex items-center justify-between gap-4 hover:bg-gray-50/50 transition-colors">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-mono font-bold text-navy-700 bg-gray-50 px-1.5 py-0.5 rounded border border-gray-100">
                        {l.lead_id.substring(l.lead_id.lastIndexOf('-') + 1) || l.lead_id}
                      </span>
                      <span className="text-sm font-semibold text-gray-800 truncate">{l.nama_pelanggan}</span>
                    </div>
                    <div className="text-xs text-gray-500">
                      {l.nama_produk} <span className="text-gray-300 font-light">•</span> <span className="font-semibold text-gray-600">+{l.whatsapp}</span>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <Badge status={l.status_produksi} className="text-[10px] scale-90 origin-right" />
                    <div className="text-[10px] text-gray-400 mt-1 font-medium">{formatDateShort(l.tanggal)}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Recent Products */}
        <div className="bg-white border border-gray-100 rounded-2xl shadow-card overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
            <h2 className="text-sm font-bold text-navy-900 uppercase tracking-wider">Produk Baru Ditambahkan</h2>
            <Link to="/admin/products" className="text-xs text-[#810100] font-semibold hover:underline">
              Semua Produk →
            </Link>
          </div>
          {products.length === 0 ? (
            <div className="p-8 text-center text-gray-400 text-sm">Belum ada data produk di katalog.</div>
          ) : (
            <div className="divide-y divide-gray-50">
              {products.slice(0, 5).map(p => (
                <div key={p.product_id} className="px-6 py-3.5 flex items-center gap-4 hover:bg-gray-50/50 transition-colors">
                  <div className="w-11 h-11 bg-gray-50 border border-gray-100 rounded-lg overflow-hidden shrink-0">
                    <img src={p.gambar_url} alt={p.nama_produk} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-semibold text-gray-800 truncate">{p.nama_produk}</div>
                    <div className="text-xs text-gray-400 capitalize">{p.kategori}</div>
                  </div>
                  <div className="text-right shrink-0">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      p.status === 'aktif' ? 'bg-green-50 text-green-600 border border-green-100' : 'bg-gray-50 text-gray-400 border border-gray-100'
                    }`}>
                      {p.status === 'aktif' ? 'Aktif' : 'Nonaktif'}
                    </span>
                    <div className="text-xs font-semibold text-gray-700 mt-1">
                      {p.harga_estimasi ? `Rp${p.harga_estimasi.toLocaleString('id-ID')}` : '-'}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
