import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { getProducts } from '../../services/productService';
import { dummyProducts } from '../../data/dummyData';
import { formatCurrency } from '../../utils/formatters';

const ProductsShowcase = () => {
  const [products, setProducts] = useState(dummyProducts.slice(0, 8));

  useEffect(() => {
    getProducts().then((data) => {
      if (data) setProducts(data.slice(0, 8));
    }).catch(() => {});
  }, []);

  return (
    <section className="py-24" style={{ background: '#090909' }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {/* Title */}
        <div className="flex items-end justify-between mb-12">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="h-px w-8" style={{ background: '#ef2020' }} />
              <span
                className="text-[10px] tracking-[0.3em] uppercase"
                style={{ fontFamily: 'Helvetica, Arial, sans-serif', fontWeight: 400, color: '#a0a0a0' }}
              >Top Picks</span>
            </div>
            <h2
              className="text-5xl sm:text-6xl text-zinc-50"
              style={{ fontFamily: 'Helvetica, Arial, sans-serif', fontWeight: 700, letterSpacing: '0.02em' }}
            >
              PRODUK UNGGULAN
            </h2>
          </div>
          <Link to="/produk" className="hidden sm:inline-flex items-center gap-2 text-xs text-zinc-500 hover:text-zinc-50 uppercase tracking-widest transition-colors">
            All Product <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {products.map((product) => (
            <Link
              key={product.product_id}
              to={`/produk/${product.product_id}`}
              className="group"
            >
              <div
                className="aspect-[4/5] overflow-hidden mb-3 relative"
                style={{
                  background: '#1A1819',
                  clipPath: 'polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px))',
                }}
              >
                <img
                  src={product.gambar_url}
                  alt={product.nama_produk}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  onError={(e) => {
                    e.target.src = 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop';
                  }}
                />
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400 flex items-end p-3"
                  style={{ background: 'linear-gradient(to top, rgba(9,9,9,0.85) 0%, transparent 60%)' }}
                >
                  <span className="inline-flex items-center gap-1 text-[10px] text-zinc-50 uppercase tracking-widest">
                    Lihat Detail <ArrowUpRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
              <p
                className="text-sm text-zinc-400 group-hover:text-zinc-50 transition-colors truncate"
                style={{ fontFamily: 'Helvetica, Arial, sans-serif', fontWeight: 400 }}
              >{product.nama_produk}</p>
              <p
                className="text-base text-zinc-50 mt-0.5"
                style={{ fontFamily: 'Helvetica, Arial, sans-serif', fontWeight: 700, letterSpacing: '0.02em' }}
              >
                {formatCurrency(product.harga_estimasi || product.harga)}
              </p>
            </Link>
          ))}
        </div>

        {/* Mobile all product CTA */}
        <div className="sm:hidden text-center mt-10">
          <Link to="/produk" className="btn-outline">
            All Product
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ProductsShowcase;
