import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';

const HF = 'Helvetica, Arial, sans-serif';

// White SVG icons — sharp minimal style
const IconKonsultasi = () => (
  <svg viewBox="0 0 32 32" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
    <rect x="3" y="4" width="26" height="18" rx="0" />
    <path d="M3 22 L8 28 L8 22" />
    <path d="M10 11 L22 11" />
    <path d="M10 15 L18 15" />
  </svg>
);

const IconDesain = () => (
  <svg viewBox="0 0 32 32" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
    <path d="M5 24 L20 9 L23 12 L8 27 Z" />
    <path d="M20 9 L23 6 L26 9 L23 12 Z" />
    <path d="M5 27 L2 30 L5 30 Z" />
    <path d="M2 29 L9 27" />
  </svg>
);

const IconProduksi = () => (
  <svg viewBox="0 0 32 32" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
    <circle cx="16" cy="16" r="5" />
    <path d="M16 3 L16 7" />
    <path d="M16 25 L16 29" />
    <path d="M3 16 L7 16" />
    <path d="M25 16 L29 16" />
    <path d="M6.5 6.5 L9.3 9.3" />
    <path d="M22.7 22.7 L25.5 25.5" />
    <path d="M25.5 6.5 L22.7 9.3" />
    <path d="M9.3 22.7 L6.5 25.5" />
  </svg>
);

const IconPengiriman = () => (
  <svg viewBox="0 0 32 32" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
    <rect x="2" y="10" width="20" height="14" rx="0" />
    <path d="M22 14 L28 14 L30 20 L30 24 L22 24 Z" />
    <circle cx="7" cy="25" r="2.5" />
    <circle cx="25" cy="25" r="2.5" />
    <path d="M2 15 L22 15" />
  </svg>
);

const steps = [
  { number: '01', title: 'Konsultasi', desc: 'Diskusikan kebutuhan, desain, bahan, dan estimasi biaya bersama tim ahli kami.', Icon: IconKonsultasi },
  { number: '02', title: 'Desain & Approval', desc: 'Tim desainer kami menyiapkan mockup untuk persetujuan sebelum produksi dimulai.', Icon: IconDesain },
  { number: '03', title: 'Produksi', desc: 'Proses produksi dengan mesin modern dan quality control ketat di setiap tahap.', Icon: IconProduksi },
  { number: '04', title: 'Pengiriman', desc: 'Produk dikemas rapi dan dikirim ke seluruh Indonesia atau siap diambil langsung.', Icon: IconPengiriman },
];

const ProcessSection = () => {
  return (
    <section
      className="py-24 relative overflow-hidden"
      style={{ background: '#1A1819' }}
    >
      {/* Horizontal center line */}
      <div
        className="hidden lg:block absolute top-1/2 left-0 right-0 h-px opacity-10"
        style={{ background: 'linear-gradient(to right, transparent, #ef2020, #ef2020, transparent)' }}
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-10">

        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-16">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="h-px w-8" style={{ background: '#ef2020' }} />
              <span
                className="text-[10px] tracking-[0.3em] uppercase"
                style={{ fontFamily: HF, fontWeight: 400, color: '#a0a0a0' }}
              >Cara Kerja</span>
            </div>
            <h2
              className="text-5xl sm:text-7xl text-zinc-50"
              style={{ fontFamily: HF, fontWeight: 700, letterSpacing: '0.02em' }}
            >
              PROSES PRODUKSI
            </h2>
          </div>
          <Link
            to="/produk"
            className="self-start lg:self-end inline-flex items-center gap-2 px-6 py-3 text-white text-xs uppercase tracking-widest transition-all duration-200 hover:opacity-80"
            style={{
              fontFamily: HF,
              fontWeight: 700,
              background: '#ef2020',
              borderRadius: 0,
              letterSpacing: '2px',
            }}
          >
            Mulai Order
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px" style={{ background: 'rgba(255,255,255,0.04)' }}>
          {steps.map((step, idx) => (
            <div
              key={step.number}
              className="relative group p-8 flex flex-col transition-all duration-300"
              style={{ background: '#1A1819' }}
            >
              {/* Top border on hover */}
              <div
                className="absolute top-0 left-0 right-0 h-[2px] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"
                style={{ background: '#ef2020' }}
              />

              {/* Step number — ghost bold */}
              <div
                className="text-[72px] leading-none mb-4 select-none"
                style={{
                  fontFamily: HF,
                  fontWeight: 700,
                  color: 'transparent',
                  WebkitTextStroke: '1.5px rgba(255,255,255,0.30)',
                  letterSpacing: '0.02em',
                }}
              >
                {step.number}
              </div>

              {/* Connector arrow (not on last) */}
              {idx < steps.length - 1 && (
                <div className="hidden lg:block absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 z-10">
                  <div className="w-3 h-3 border-t-2 border-r-2 rotate-45" style={{ borderColor: 'rgba(239,32,32,0.4)' }} />
                </div>
              )}

              {/* Icon — white SVG */}
              <div className="mb-4">
                <step.Icon />
              </div>

              {/* Title */}
              <h3
                className="text-base text-zinc-50 mb-3 uppercase tracking-wide"
                style={{ fontFamily: HF, fontWeight: 700 }}
              >
                {step.title}
              </h3>

              {/* Desc */}
              <p
                className="text-sm leading-relaxed group-hover:text-zinc-300 transition-colors"
                style={{ fontFamily: HF, fontWeight: 400, color: '#a0a0a0' }}
              >
                {step.desc}
              </p>

              {/* Bottom line */}
              <div className="mt-auto pt-6">
                <div
                  className="h-px group-hover:w-full transition-all duration-500"
                  style={{ width: '32px', background: 'rgba(239,32,32,0.5)' }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
