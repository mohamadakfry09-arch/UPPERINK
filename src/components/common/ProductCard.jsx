import React from 'react';
import { Link } from 'react-router-dom';
import { MessageCircle, ArrowRight } from 'lucide-react';
import { buildWhatsAppUrl, COMPANY } from '../../config/constants';

/** Format harga ke Rupiah */
const formatPrice = (harga) => {
  if (!harga) return null;
  return `Rp ${Number(harga).toLocaleString('id-ID')}`;
};

const ProductCard = ({ product }) => {
  const waUrl = buildWhatsAppUrl(product);

  return (
    <div className="product-card bg-white flex flex-col">
      {/* Image */}
      <Link to={`/produk/${product.product_id}`} className="block overflow-hidden aspect-[4/5] bg-gray-50">
        <img
          src={product.gambar_url}
          alt={product.nama_produk}
          className="w-full h-full object-cover img-zoom"
          loading="lazy"
          onError={e => { e.target.src = 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&h=750&fit=crop'; }}
        />
      </Link>

      {/* Info */}
      <div className="p-5 flex flex-col flex-1">
        <div className="flex-1">
          <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-widest mb-1.5">{product.kategori}</p>
          <Link to={`/produk/${product.product_id}`}>
            <h3 className="font-semibold text-gray-900 text-[15px] leading-snug hover:text-gray-600 transition-colors line-clamp-2">
              {product.nama_produk}
            </h3>
          </Link>
          {formatPrice(product.harga) && (
            <p className="text-sm text-gray-500 mt-1">Mulai dari {formatPrice(product.harga)}</p>
          )}
        </div>

        <div className="mt-4 flex items-center gap-2">
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-wa flex-1 justify-center text-xs py-3"
          >
            <MessageCircle className="w-4 h-4" />
            Pesan via WA
          </a>
          <Link
            to={`/produk/${product.product_id}`}
            className="w-10 h-10 flex items-center justify-center border border-gray-200 hover:border-gray-900 hover:bg-gray-900 hover:text-white text-gray-600 transition-all"
            title="Lihat Detail"
          >
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
