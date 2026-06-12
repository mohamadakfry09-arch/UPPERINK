import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { getGallery } from '../../services/galleryService';
import { dummyGallery } from '../../data/dummyData';

const GallerySection = () => {
  const [items, setItems] = useState(dummyGallery.slice(0, 8));
  const [lightbox, setLightbox] = useState(null);

  useEffect(() => {
    getGallery().then((data) => {
      if (data) setItems(data.slice(0, 8));
    }).catch(() => {});
  }, []);

  // Close lightbox on Escape
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') setLightbox(null); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);



  return (
    <section
      className="py-24 relative overflow-hidden"
      style={{ background: '#090909' }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="h-px w-8 bg-cherry-500" />
              <span className="text-[10px] text-zinc-600 tracking-[0.3em] uppercase">Portfolio</span>
            </div>
            <h2
              className="text-5xl sm:text-7xl text-zinc-50"
              style={{ fontFamily: "'Bebas Neue', Impact, sans-serif", letterSpacing: '0.03em' }}
            >
              GALERI PRODUKSI
            </h2>
          </div>
          <Link to="/produk" className="btn-primary self-start sm:self-end">
            All Product
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Uniform Grid */}
        <div
          className="grid gap-2"
          style={{
            gridTemplateColumns: 'repeat(4, 1fr)',
            gridAutoRows: '260px',
          }}
        >
          {items.map((item, idx) => (
            <div
              key={item.gallery_id || idx}
              className="group relative overflow-hidden cursor-pointer col-span-1 row-span-1"
              onClick={() => setLightbox(item)}
              style={{ background: '#1A1819' }}
            >
              <img
                src={item.gambar_url}
                alt={item.judul || 'Upperink Gallery'}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                onError={(e) => {
                  e.target.src = 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&h=500&fit=crop';
                }}
              />
              {/* Dark overlay */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400 flex items-end p-4"
                style={{ background: 'linear-gradient(to top, rgba(9,9,9,0.85) 0%, rgba(9,9,9,0.2) 60%, transparent 100%)' }}
              >
                {item.judul && (
                  <p className="text-zinc-50 text-sm font-semibold tracking-wide translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                    {item.judul}
                  </p>
                )}
              </div>
              {/* Red corner accent on hover */}
              <div className="absolute top-0 right-0 w-0 h-0 border-t-[20px] border-r-[20px] border-t-cherry-500 border-r-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          ))}
        </div>

        {/* Mobile: simple grid fallback is handled by CSS, but on small screens show 2 cols */}
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: 'rgba(9,9,9,0.95)' }}
          onClick={() => setLightbox(null)}
        >
          <div
            className="max-w-2xl w-full relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close */}
            <button
              onClick={() => setLightbox(null)}
              className="absolute -top-10 right-0 text-zinc-400 hover:text-zinc-50 transition-colors text-sm tracking-widest uppercase"
            >
              × Close
            </button>
            <div
              className="overflow-hidden"
              style={{ clipPath: 'polygon(0 0, calc(100% - 16px) 0, 100% 16px, 100% 100%, 16px 100%, 0 calc(100% - 16px))' }}
            >
              <img
                src={lightbox.gambar_url}
                alt={lightbox.judul}
                className="w-full object-cover"
                style={{ maxHeight: '80vh' }}
              />
            </div>
            {lightbox.judul && (
              <p className="text-zinc-400 text-center mt-4 text-sm tracking-wide uppercase">
                {lightbox.judul}
              </p>
            )}
          </div>
        </div>
      )}
    </section>
  );
};

export default GallerySection;
