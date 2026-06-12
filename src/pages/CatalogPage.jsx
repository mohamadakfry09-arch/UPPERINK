import React, { useState, useEffect, useCallback } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { ArrowRight, ChevronLeft, ChevronRight, ChevronDown } from 'lucide-react';
import { getProducts } from '../services/productService';
import LoadingSpinner from '../components/common/LoadingSpinner';

const formatPrice = (harga) => {
  if (!harga && harga !== 0) return '-';
  return 'Rp' + Number(harga).toLocaleString('id-ID');
};

const ProductCard = ({ product }) => (
  <Link
    to={`/produk/${product.product_id}`}
    className="group flex flex-col cursor-pointer"
  >
    <div
      className="overflow-hidden aspect-[4/5] relative"
      style={{
        background: '#1A1819',
        clipPath: 'polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px))'
      }}
    >
      <img
        src={product.gambar_url || 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500'}
        alt={product.nama_produk}
        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        onError={(e) => {
          e.target.src = 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&h=500&fit=crop';
        }}
      />
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4"
        style={{ background: 'linear-gradient(to top, rgba(9,9,9,0.85) 0%, transparent 60%)' }}
      >
        <span className="inline-flex items-center gap-1 text-[10px] text-zinc-50 uppercase tracking-widest">
          Lihat Detail <ArrowRight className="w-3 h-3" />
        </span>
      </div>
      <div className="absolute top-0 right-0 w-0 h-0 border-t-[16px] border-r-[16px] border-t-cherry-500 border-r-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </div>
    <div className="mt-3 px-1 flex items-center justify-between">
      <span className="text-zinc-400 text-[13px] font-medium truncate max-w-[60%] group-hover:text-zinc-50 transition-colors">
        {product.nama_produk}
      </span>
      <span
        className="text-zinc-50 text-sm font-bold shrink-0"
        style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '0.05em' }}
      >
        {formatPrice(product.harga_estimasi || product.harga)}
      </span>
    </div>
  </Link>
);

const CatalogPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [page, setPage] = useState(1);

  const categoryParam = searchParams.get('kategori') || 'all';

  const fetchProducts = useCallback(() => {
    setLoading(true);
    getProducts()
      .then((data) => setProducts(data || []))
      .catch((err) => console.error('Error fetching catalog:', err))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    fetchProducts();
    const interval = setInterval(fetchProducts, 30000);
    return () => clearInterval(interval);
  }, [fetchProducts]);

  const filteredProducts = products.filter((p) => {
    const matchCat =
      categoryParam === 'all' ||
      (categoryParam === 't-shirt'     && (p.kategori === 'kaos'     || p.kategori === 'polo')) ||
      (categoryParam === 'jacket'      && (p.kategori === 'jaket'    || p.kategori === 'hoodie')) ||
      (categoryParam === 'merchandise' && (p.kategori === 'totebag'  || p.kategori === 'merchandise')) ||
      (categoryParam === 'kemeja'      && (p.kategori === 'kemeja'   || p.kategori === 'seragam'));
    return matchCat && p.status === 'aktif';
  });

  const getCategoryLabel = () => {
    switch (categoryParam) {
      case 't-shirt':     return 'T-Shirt';
      case 'jacket':      return 'Jacket';
      case 'merchandise': return 'Merchandise';
      case 'kemeja':      return 'Kemeja';
      default:            return 'Semua Kategori';
    }
  };

  const PER_PAGE = 8;
  const totalPages = Math.ceil(filteredProducts.length / PER_PAGE) || 1;
  const displayedProducts = filteredProducts.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  useEffect(() => { setPage(1); }, [categoryParam]);

  const categories = [
    { id: 'all',         label: 'Semua Kategori' },
    { id: 't-shirt',     label: 'T-Shirt' },
    { id: 'jacket',      label: 'Jacket' },
    { id: 'merchandise', label: 'Merchandise' },
    { id: 'kemeja',      label: 'Kemeja' },
  ];

  return (
    <div className="min-h-screen pt-24 pb-24" style={{ background: '#090909' }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-10">

        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-3">
            <span className="h-px w-8 bg-cherry-500" />
            <span className="text-[10px] text-zinc-600 tracking-[0.3em] uppercase font-medium">
              Koleksi Kami
            </span>
          </div>
          <h1
            className="text-5xl sm:text-7xl text-zinc-50"
            style={{ fontFamily: "'Bebas Neue', Impact, sans-serif", letterSpacing: '0.03em' }}
          >
            KATALOG PRODUK
          </h1>
        </div>

        {/* Filter */}
        <div className="relative mb-10 flex flex-wrap gap-2">
          {/* Desktop tabs */}
          <div className="hidden sm:flex gap-2 flex-wrap">
            {categories.map((c) => (
              <button
                key={c.id}
                onClick={() => {
                  setSearchParams(c.id === 'all' ? {} : { kategori: c.id });
                  setPage(1);
                }}
                className={`px-5 py-2 text-xs font-semibold tracking-[0.15em] uppercase transition-all duration-200 ${
                  categoryParam === c.id ? 'text-zinc-50' : 'text-zinc-600 hover:text-zinc-300'
                }`}
                style={{
                  background: categoryParam === c.id ? '#810100' : 'rgba(255,255,255,0.04)',
                  border:     categoryParam === c.id ? '1px solid #810100' : '1px solid rgba(255,255,255,0.06)',
                  clipPath:   'polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))',
                }}
              >
                {c.label}
              </button>
            ))}
          </div>

          {/* Mobile dropdown */}
          <div className="sm:hidden relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-3 text-sm font-semibold text-zinc-300 px-4 py-2.5 transition-colors"
              style={{
                background: 'rgba(255,255,255,0.04)',
                border:     '1px solid rgba(255,255,255,0.08)',
                clipPath:   'polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px))',
              }}
            >
              <span>{getCategoryLabel()}</span>
              <ChevronDown className={`w-4 h-4 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {dropdownOpen && (
              <div
                className="absolute left-0 mt-2 py-2 min-w-[200px] z-30"
                style={{ background: '#1A1819', border: '1px solid rgba(255,255,255,0.08)' }}
              >
                {categories.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => {
                      setSearchParams(c.id === 'all' ? {} : { kategori: c.id });
                      setDropdownOpen(false);
                      setPage(1);
                    }}
                    className={`block w-full text-left px-5 py-3 text-sm transition-colors ${
                      categoryParam === c.id
                        ? 'text-zinc-50 bg-cherry-500/10'
                        : 'text-zinc-500 hover:text-zinc-50 hover:bg-white/[0.04]'
                    }`}
                  >
                    {c.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Content */}
        {loading ? (
          <div className="py-24 flex items-center justify-center">
            <LoadingSpinner size="lg" />
          </div>
        ) : filteredProducts.length === 0 ? (
          <div
            className="text-center py-24"
            style={{ background: 'rgba(26,24,25,0.5)', border: '1px solid rgba(255,255,255,0.04)' }}
          >
            <div className="text-5xl mb-4">🔍</div>
            <h3
              className="text-3xl text-zinc-50 mb-3"
              style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '0.05em' }}
            >
              PRODUK TIDAK DITEMUKAN
            </h3>
            <p className="text-zinc-600 text-sm">Belum ada produk aktif untuk kategori ini.</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
              {displayedProducts.map((p) => (
                <ProductCard key={p.product_id} product={p} />
              ))}
            </div>

            {/* Pagination — always visible, bottom right, dark navy */}
            <div className="flex justify-end mt-12">
              <div
                className="inline-flex items-center gap-1 rounded-xl p-1"
                style={{ background: '#0e1120', border: '1px solid #1e2340' }}
              >
                <button
                  onClick={() => { setPage((p) => Math.max(p - 1, 1)); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  disabled={page === 1}
                  className="w-9 h-9 flex items-center justify-center rounded-lg text-zinc-400 hover:text-white hover:bg-white/[0.06] disabled:opacity-25 disabled:cursor-not-allowed transition-all duration-150"
                  aria-label="Sebelumnya"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>

                {[...Array(totalPages)].map((_, i) => {
                  const n = i + 1;
                  return (
                    <button
                      key={n}
                      onClick={() => { setPage(n); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                      className={`w-9 h-9 flex items-center justify-center rounded-lg text-sm font-bold transition-all duration-150 ${
                        page === n
                          ? 'bg-cherry-500 text-white shadow-lg'
                          : 'text-zinc-400 hover:text-white hover:bg-white/[0.06]'
                      }`}
                    >
                      {n}
                    </button>
                  );
                })}

                <button
                  onClick={() => { setPage((p) => Math.min(p + 1, totalPages)); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  disabled={page === totalPages}
                  className="w-9 h-9 flex items-center justify-center rounded-lg text-zinc-400 hover:text-white hover:bg-white/[0.06] disabled:opacity-25 disabled:cursor-not-allowed transition-all duration-150"
                  aria-label="Berikutnya"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CatalogPage;
