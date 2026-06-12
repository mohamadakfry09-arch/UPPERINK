import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

// SVG Icons — white stroke style
const TshirtIcon = () => (
  <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-12 h-12">
    <path d="M35 15 C35 15 30 10 20 12 L8 25 L22 35 L22 80 L78 80 L78 35 L92 25 L80 12 C70 10 65 15 65 15 C62 22 55 27 50 27 C45 27 38 22 35 15 Z" />
  </svg>
);
const JacketIcon = () => (
  <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-12 h-12">
    <path d="M35 12 L15 22 L10 45 L25 48 L25 85 L75 85 L75 48 L90 45 L85 22 L65 12" />
    <path d="M35 12 C38 25 50 30 50 30 C50 30 62 25 65 12" />
    <path d="M50 30 L50 85" />
  </svg>
);
const MerchandiseIcon = () => (
  <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-12 h-12">
    <path d="M30 38 C30 38 25 25 45 22 C55 20 65 25 65 25 L70 38 Z" />
    <path d="M30 38 L70 38 L68 42 L32 42 Z" />
    <rect x="40" y="55" width="30" height="30" rx="2" />
    <path d="M47 55 C47 50 53 48 55 55" />
  </svg>
);
const HoodieIcon = () => (
  <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-12 h-12">
    <path d="M35 12 C35 12 28 8 15 15 L8 35 L25 40 L25 85 L75 85 L75 40 L92 35 L85 15 C72 8 65 12 65 12 C62 22 56 28 50 28 C44 28 38 22 35 12 Z" />
    <path d="M42 12 C42 12 44 18 50 18 C56 18 58 12 58 12" />
    <path d="M25 40 L75 40" />
    <path d="M50 40 L50 85" />
  </svg>
);
const SeragamIcon = () => (
  <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-12 h-12">
    <path d="M38 12 L25 20 L10 28 L18 42 L28 38 L28 85 L72 85 L72 38 L82 42 L90 28 L75 20 L62 12" />
    <path d="M38 12 C40 20 50 24 50 24 C50 24 60 20 62 12" />
    <path d="M44 24 L44 85" />
    <path d="M56 24 L56 85" />
  </svg>
);
const PoloIcon = () => (
  <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-12 h-12">
    <path d="M35 15 C35 15 30 10 20 12 L8 28 L22 35 L22 82 L78 82 L78 35 L92 28 L80 12 C70 10 65 15 65 15 L60 20 L50 25 L40 20 Z" />
    <path d="M40 20 L40 35" /><path d="M60 20 L60 35" />
    <path d="M42 23 L58 23" /><path d="M42 28 L58 28" /><path d="M42 33 L58 33" />
  </svg>
);
const ToteBagIcon = () => (
  <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-12 h-12">
    <path d="M20 35 L80 35 L85 85 L15 85 Z" />
    <path d="M35 35 C35 20 65 20 65 35" />
    <path d="M20 55 L80 55" />
  </svg>
);
const KemejaIcon = () => (
  <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-12 h-12">
    <path d="M35 15 C35 15 30 10 20 12 L8 25 L22 35 L22 80 L78 80 L78 35 L92 25 L80 12 C70 10 65 15 65 15 Z" />
    <path d="M35 15 L50 30 L65 15" />
    <path d="M50 30 L50 80" />
    <circle cx="50" cy="45" r="2" fill="currentColor" />
    <circle cx="50" cy="60" r="2" fill="currentColor" />
  </svg>
);

const CATEGORIES = [
  { id: 'kaos', label: 'Kaos Custom', Icon: TshirtIcon, desc: 'Cotton premium berbagai pilihan bahan' },
  { id: 'kemeja', label: 'Kemeja', Icon: KemejaIcon, desc: 'Kemeja formal & kasual berkualitas' },
  { id: 'hoodie', label: 'Hoodie', Icon: HoodieIcon, desc: 'Hoodie tebal & nyaman dipakai' },
  { id: 'jaket', label: 'Jaket', Icon: JacketIcon, desc: 'Jaket stylish untuk berbagai kebutuhan' },
  { id: 'seragam', label: 'Seragam', Icon: SeragamIcon, desc: 'Seragam tim, kantor & komunitas' },
  { id: 'polo', label: 'Polo Shirt', Icon: PoloIcon, desc: 'Polo shirt elegan & profesional' },
  { id: 'totebag', label: 'Tote Bag', Icon: ToteBagIcon, desc: 'Tote bag kanvas & custom print' },
  { id: 'merchandise', label: 'Merchandise', Icon: MerchandiseIcon, desc: 'Merchandise unik untuk brand Anda' },
];

const ServicesSection = () => {
  return (
    <section
      className="py-24 relative overflow-hidden"
      style={{ background: '#090909' }}
    >
      {/* Decorative large text behind */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none"
        style={{
          fontFamily: "'Bebas Neue', sans-serif",
          fontSize: 'clamp(100px, 20vw, 280px)',
          letterSpacing: '0.05em',
          color: 'transparent',
          WebkitTextStroke: '1px rgba(255,255,255,0.02)',
          whiteSpace: 'nowrap',
        }}
      >
        KATEGORI
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-10 relative">

        {/* Header */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-3">
            <span className="h-px w-8" style={{ background: '#ef2020' }} />
            <span
              className="text-[10px] tracking-[0.3em] uppercase"
              style={{ fontFamily: 'Helvetica, Arial, sans-serif', fontWeight: 400, color: '#a0a0a0' }}
            >Apa yang Kami Buat</span>
          </div>
          <h2
            className="text-5xl sm:text-7xl text-zinc-50"
            style={{ fontFamily: 'Helvetica, Arial, sans-serif', fontWeight: 700, letterSpacing: '0.02em' }}
          >
            KATEGORI PRODUK
          </h2>
        </div>

        {/* Category Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-px" style={{ background: 'rgba(255,255,255,0.05)' }}>
          {CATEGORIES.map(({ id, label, Icon, desc }) => (
            <Link
              key={id}
              to={`/produk?kategori=${id}`}
              className="group relative flex flex-col p-6 lg:p-8 transition-all duration-300"
              style={{ background: '#090909' }}
            >
              {/* Hover cherry overlay */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                style={{ background: 'rgba(239,32,32,0.06)' }}
              />
              {/* Red left border on hover */}
              <div className="absolute left-0 top-0 bottom-0 w-[2px] scale-y-0 group-hover:scale-y-100 transition-transform duration-400 origin-top" style={{ background: '#ef2020' }} />

              {/* Icon */}
              <div className="mb-5 text-white group-hover:text-white transition-colors duration-300 group-hover:scale-110 transition-transform origin-left">
                <Icon />
              </div>

              {/* Label */}
              <h3
                className="text-sm mb-2 tracking-wide text-zinc-300 group-hover:text-zinc-50 transition-colors"
                style={{ fontFamily: 'Helvetica, Arial, sans-serif', fontWeight: 400 }}
              >
                {label}
              </h3>
              <p
                className="text-[11px] leading-relaxed group-hover:text-zinc-400 transition-colors"
                style={{ fontFamily: 'Helvetica, Arial, sans-serif', fontWeight: 400, color: '#a0a0a0' }}
              >
                {desc}
              </p>

              {/* Arrow */}
              <div className="mt-4 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="text-[10px] uppercase tracking-widest" style={{ color: '#ef2020' }}>Lihat</span>
                <ArrowRight className="w-3 h-3" style={{ color: '#ef2020' }} />
              </div>
            </Link>
          ))}
        </div>

        {/* View all CTA */}
        <div className="text-center mt-12">
          <Link to="/produk" className="btn-outline">
            Lihat Semua Produk
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
