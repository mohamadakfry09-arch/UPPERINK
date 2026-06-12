import React from 'react';

// Cherry red SVG Icons
const PremiumIcon = () => (
  <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-10 h-10">
    <path d="M10 20 C10 20 14 14 20 14 L22 14 C22 14 24 8 32 8 C40 8 42 14 42 14 L44 14 C50 14 54 20 54 20 L50 44 L14 44 Z" />
    <circle cx="32" cy="28" r="8" />
    <path d="M28 28 L31 31 L36 25" />
  </svg>
);

const FacilityIcon = () => (
  <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-10 h-10">
    <rect x="8" y="16" width="48" height="36" rx="2" />
    <path d="M8 26 L56 26" />
    <path d="M20 16 L20 26" />
    <path d="M44 16 L44 26" />
    <circle cx="32" cy="38" r="6" />
    <path d="M32 34 L32 38 L35 41" />
    <path d="M28 38 L36 38" />
  </svg>
);

const ProfessionalIcon = () => (
  <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-10 h-10">
    <circle cx="24" cy="20" r="8" />
    <circle cx="40" cy="20" r="8" />
    <path d="M8 52 C8 40 16 34 24 34" />
    <path d="M56 52 C56 40 48 34 40 34" />
    <path d="M24 34 C26 32 30 30 32 30 C34 30 38 32 40 34" />
    <path d="M24 52 L40 52" />
    <path d="M24 44 C24 38 28 34 32 34 C36 34 40 38 40 44" />
  </svg>
);

const features = [
  {
    Icon: PremiumIcon,
    title: 'Premium Material',
    desc: 'Menggunakan bahan pilihan yang nyaman, tahan lama, dan sesuai dengan kebutuhan pasar fashion modern.',
    number: '01',
  },
  {
    Icon: FacilityIcon,
    title: 'Fasilitas Canggih',
    desc: 'Mesin dan teknologi modern untuk menghasilkan pakaian dengan jahitan rapi dan detail presisi tinggi.',
    number: '02',
  },
  {
    Icon: ProfessionalIcon,
    title: 'Tim Profesional',
    desc: 'Tim ahli berpengalaman dalam desain, pola, dan produksi untuk memastikan hasil terbaik setiap saat.',
    number: '03',
  },
];

const FeaturesSection = () => {
  return (
    <section
      className="py-24 relative overflow-hidden"
      style={{ background: '#1A1819' }}
    >
      {/* Background accent */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-full opacity-10"
        style={{ background: 'linear-gradient(to bottom, transparent, #ef2020, transparent)' }}
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-10">

        {/* Section header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-16">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="h-px w-8" style={{ background: '#ef2020' }} />
              <span
                className="text-[10px] tracking-[0.3em] uppercase"
                style={{ fontFamily: 'Helvetica, Arial, sans-serif', fontWeight: 400, color: '#a0a0a0' }}
              >Keunggulan Kami</span>
            </div>
            <h2
              className="text-5xl sm:text-6xl text-zinc-50"
              style={{ fontFamily: 'Helvetica, Arial, sans-serif', fontWeight: 700, letterSpacing: '0.02em' }}
            >
              MENGAPA UPPERINK?
            </h2>
          </div>
          <p
            className="text-sm max-w-xs leading-relaxed sm:text-right"
            style={{ fontFamily: 'Helvetica, Arial, sans-serif', fontWeight: 400, color: '#a0a0a0' }}
          >
            Dipercaya ratusan brand dan bisnis lokal untuk kebutuhan konveksi premium.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px" style={{ background: 'rgba(255,255,255,0.04)' }}>
          {features.map((feature, i) => {
            const { Icon } = feature;
            return (
              <div
                key={feature.title}
                className="group relative p-8 lg:p-10 transition-all duration-300 cursor-default"
                style={{ background: '#1A1819' }}
              >
                {/* Hover red top border */}
                <div className="absolute top-0 left-0 right-0 h-[2px] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" style={{ background: '#ef2020' }} />

                {/* Number */}
                <div
                  className="text-6xl leading-none mb-6 select-none"
                  style={{
                    fontFamily: "'Bebas Neue', sans-serif",
                    WebkitTextStroke: '1.5px rgba(255,255,255,0.35)',
                    color: 'transparent',
                    letterSpacing: '0.05em',
                  }}
                >
                  {feature.number}
                </div>

                {/* Icon */}
                <div className="mb-5 group-hover:scale-110 transition-transform duration-300 origin-left" style={{ color: '#ef2020' }}>
                  <Icon />
                </div>

                {/* Title */}
                <h3
                  className="text-lg mb-3 tracking-wide text-zinc-50"
                  style={{ fontFamily: 'Helvetica, Arial, sans-serif', fontWeight: 400 }}
                >
                  {feature.title}
                </h3>

                {/* Description */}
                <p
                  className="text-sm leading-relaxed"
                  style={{ fontFamily: 'Helvetica, Arial, sans-serif', fontWeight: 400, color: '#a0a0a0' }}
                >
                  {feature.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
