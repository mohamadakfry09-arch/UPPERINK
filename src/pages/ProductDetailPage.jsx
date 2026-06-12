import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, MessageCircle } from 'lucide-react';
import { getProducts } from '../services/productService';
import { buildWhatsAppUrl, PRODUCT_CATEGORIES } from '../config/constants';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { createLead } from '../services/leadService';

const generateLeadId = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const random = String(Math.floor(Math.random() * 900) + 100);
  return `LID-${year}${month}${day}-${random}`;
};

const formatPrice = (harga) => {
  if (!harga && harga !== 0) return 'Rp —';
  return 'Rp ' + Number(harga).toLocaleString('id-ID');
};

const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    setLoading(true);
    getProducts()
      .then((data) => {
        const found = data.find((p) => p.product_id === id);
        if (found) {
          setProduct(found);
        } else {
          setError(true);
        }
      })
      .catch(() => {
        setError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen py-32 flex items-center justify-center" style={{ background: '#090909' }}>
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen py-32 flex flex-col items-center justify-center text-center px-6" style={{ background: '#090909' }}>
        <div className="text-6xl mb-4">🔍</div>
        <h1 className="text-3xl font-bold text-zinc-50 mb-3" style={{ fontFamily: "'Bebas Neue', Impact, sans-serif", letterSpacing: '0.05em' }}>
          PRODUK TIDAK DITEMUKAN
        </h1>
        <p className="text-zinc-400 max-w-md mb-8">
          Produk yang Anda cari tidak tersedia atau telah dihapus dari katalog kami.
        </p>
        <Link to="/produk" className="btn-primary">
          Kembali ke Katalog
        </Link>
      </div>
    );
  }

  const waUrl = buildWhatsAppUrl(product);

  const handleWhatsAppClick = async (e) => {
    e.preventDefault();
    window.open(waUrl, '_blank', 'noopener,noreferrer');

    try {
      const leadId = generateLeadId();
      const today = new Date().toISOString().split('T')[0];
      await createLead({
        lead_id: leadId,
        tanggal: today,
        nama_pelanggan: 'Pengunjung Web (Membuka Chat)',
        whatsapp: '-',
        nama_produk: product.nama_produk,
        status_produksi: 'Konsultasi',
        catatan_admin: `Membuka chat WhatsApp untuk produk "${product.nama_produk}" dari halaman detail produk.`,
        link_whatsapp: waUrl,
      });
    } catch (err) {
      console.error('Failed to create background lead:', err);
    }
  };

  return (
    <div className="min-h-screen pt-40 md:pt-48 pb-24" style={{ background: '#090909' }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        
        {/* Back navigation */}
        <button 
          onClick={() => navigate(-1)} 
          className="inline-flex items-center gap-2 text-zinc-500 hover:text-zinc-50 transition-colors uppercase tracking-widest text-xs mb-8"
        >
          <ArrowLeft className="w-4 h-4" /> Kembali
        </button>

        {/* Detail Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Compact Product Image */}
          <div className="col-span-1 md:col-span-3 w-full">
            <div 
              className="overflow-hidden aspect-[4/5] bg-zinc-900 border border-white/[0.04] max-w-[220px] mx-auto md:mx-0 w-full"
              style={{
                clipPath: 'polygon(0 0, calc(100% - 16px) 0, 100% 16px, 100% 100%, 16px 100%, 0 calc(100% - 16px))'
              }}
            >
              <img 
                src={product.gambar_url || 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800'} 
                alt={product.nama_produk} 
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src = 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800';
                }}
              />
            </div>
          </div>

          {/* Right Column: Wider Product Details */}
          <div className="col-span-1 md:col-span-9 space-y-6 text-zinc-300 w-full">
            {/* Header: Category & Title (Preserved typography) */}
            <div className="space-y-1">
              <span className="text-[10px] font-bold text-cherry-500 uppercase tracking-[0.25em] block mb-1">
                Kategori {PRODUCT_CATEGORIES.find(c => c.id === product.kategori)?.label || product.kategori}
              </span>
              <h1 
                className="text-3xl sm:text-4xl lg:text-5xl text-zinc-50 leading-tight uppercase font-black tracking-wide"
                style={{ fontFamily: "'Bebas Neue', Impact, sans-serif" }}
              >
                {product.nama_produk}
              </h1>
            </div>

            {/* Info Block: Price & Description */}
            <div className="space-y-4 border-t border-b border-zinc-800/60 py-4">
              <div>
                <span className="text-zinc-500 text-[10px] uppercase tracking-[0.2em] font-semibold block mb-0.5">
                  Harga Estimasi
                </span>
                <span className="text-xl sm:text-2xl text-zinc-50 font-bold tracking-wide">
                  Mulai dari {formatPrice(product.harga_estimasi || product.harga)}
                </span>
              </div>

              <div>
                <span className="text-zinc-500 text-[10px] uppercase tracking-[0.2em] font-semibold block mb-1">
                  Deskripsi Produk
                </span>
                <p className="text-zinc-300 text-sm sm:text-base leading-relaxed whitespace-pre-line max-w-2xl w-full">
                  {product.deskripsi || 'Belum ada deskripsi untuk produk ini.'}
                </p>
              </div>
            </div>

            {/* Action Block: WhatsApp Order Button (Comfortable spacing, auto-width) */}
            <div className="space-y-2 pt-2">
              <button
                onClick={handleWhatsAppClick}
                className="inline-flex items-center justify-center gap-3 bg-[#25D366] hover:bg-[#20ba59] text-white font-bold px-8 py-3.5 -skew-x-12 transition-all duration-300 shadow-[0_8px_24px_rgba(37,211,102,0.25)] hover:shadow-[0_12px_32px_rgba(37,211,102,0.45)] hover:-translate-y-0.5 group cursor-pointer"
              >
                <span className="skew-x-12 flex items-center gap-2 text-sm tracking-wider uppercase">
                  <MessageCircle className="w-5 h-5 fill-white text-[#25D366]" />
                  Hubungi via WhatsApp
                </span>
              </button>
              <p className="text-zinc-500 text-[10px] leading-relaxed max-w-md">
                * Klik tombol di atas untuk membuka chat WhatsApp otomatis dengan Admin UPPERINK.
              </p>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};

export default ProductDetailPage;
