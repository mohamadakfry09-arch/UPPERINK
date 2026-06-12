import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';

const steps = [
  {
    number: '01',
    title: 'Konsultasi',
    desc: 'Diskusikan kebutuhan, desain, bahan, dan estimasi biaya bersama tim ahli kami.',
    icon: '💬',
  },
  {
    number: '02',
    title: 'Desain & Approval',
    desc: 'Tim desainer kami menyiapkan mockup untuk persetujuan sebelum produksi dimulai.',
    icon: '✏️',
  },
  {
    number: '03',
    title: 'Produksi',
    desc: 'Proses produksi dengan mesin modern dan quality control ketat di setiap tahap.',
    icon: '⚙️',
  },
  {
    number: '04',
    title: 'Pengiriman',
    desc: 'Produk dikemas rapi dan dikirim ke seluruh Indonesia atau siap diambil langsung.',
    icon: '🚀',
  },
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
        style={{ background: 'linear-gradient(to right, transparent, #810100, #810100, transparent)' }}
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-10">

        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-16">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="h-px w-8 bg-cherry-500" />
              <span className="text-[10px] text-zinc-600 tracking-[0.3em] uppercase">Cara Kerja</span>
            </div>
            <h2
              className="text-5xl sm:text-7xl text-zinc-50"
              style={{ fontFamily: "'Bebas Neue', Impact, sans-serif", letterSpacing: '0.03em' }}
            >
              PROSES PRODUKSI
            </h2>
          </div>
          <Link to="/produk" className="btn-primary self-start lg:self-end">
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
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-cherry-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />

              {/* Step number — large ghost */}
              <div
                className="text-[72px] leading-none mb-4 select-none"
                style={{
                  fontFamily: "'Bebas Neue', sans-serif",
                  color: 'transparent',
                  WebkitTextStroke: '1.5px rgba(255,255,255,0.35)',
                  letterSpacing: '0.05em',
                }}
              >
                {step.number}
              </div>

              {/* Connector arrow (not on last) */}
              {idx < steps.length - 1 && (
                <div className="hidden lg:block absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 z-10">
                  <div className="w-3 h-3 border-t-2 border-r-2 border-cherry-500/40 rotate-45" />
                </div>
              )}

              {/* Icon */}
              <div className="text-3xl mb-4">{step.icon}</div>

              {/* Title */}
              <h3
                className="text-xl text-zinc-50 mb-3"
                style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '0.06em' }}
              >
                {step.title}
              </h3>

              {/* Desc */}
              <p className="text-zinc-600 text-sm leading-relaxed group-hover:text-zinc-400 transition-colors">
                {step.desc}
              </p>

              {/* Bottom cherry line */}
              <div className="mt-auto pt-6">
                <div className="w-8 h-px bg-cherry-500/40 group-hover:w-full group-hover:bg-cherry-500/60 transition-all duration-500" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
