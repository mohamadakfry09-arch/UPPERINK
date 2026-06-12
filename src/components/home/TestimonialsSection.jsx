import React from 'react';
import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: 'Ahmad Fadillah',
    role: 'Owner — Distro Bandung',
    text: 'Kualitas jahitan sangat rapi dan bahan yang digunakan premium. Sudah 2 kali order dan hasilnya selalu memuaskan. Recommended banget!',
    rating: 5,
    initial: 'AF',
  },
  {
    id: 2,
    name: 'Rina Sari',
    role: 'Brand Manager — Startup Jakarta',
    text: 'Proses order mudah, tim Upperink responsif dan membantu. Produk sesuai ekspektasi bahkan melebihi. Pasti order lagi!',
    rating: 5,
    initial: 'RS',
  },
  {
    id: 3,
    name: 'Budi Santoso',
    role: 'Ketua OSIS — SMA Negeri 5',
    text: 'Buat seragam komunitas dan hasilnya luar biasa. Tepat waktu dan desain persis seperti yang kami minta. Harga juga sangat terjangkau.',
    rating: 5,
    initial: 'BS',
  },
];

const TestimonialsSection = () => {
  return (
    <section
      className="py-24 relative overflow-hidden"
      style={{ background: '#090909' }}
    >
      {/* Decorative large text */}
      <div
        className="absolute bottom-0 right-0 pointer-events-none select-none opacity-[0.02]"
        style={{
          fontFamily: "'Bebas Neue', sans-serif",
          fontSize: 'clamp(80px, 15vw, 220px)',
          letterSpacing: '0.05em',
          color: '#FBFBFB',
          lineHeight: 1,
        }}
      >
        REVIEW
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-10 relative">

        {/* Header */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-3">
            <span className="h-px w-8 bg-cherry-500" />
            <span className="text-[10px] text-zinc-600 tracking-[0.3em] uppercase">Apa Kata Klien</span>
          </div>
          <h2
            className="text-5xl sm:text-7xl text-zinc-50"
            style={{ fontFamily: "'Bebas Neue', Impact, sans-serif", letterSpacing: '0.03em' }}
          >
            TESTIMONI
          </h2>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px" style={{ background: 'rgba(255,255,255,0.04)' }}>
          {testimonials.map((t) => (
            <div
              key={t.id}
              className="group relative p-8 flex flex-col transition-all duration-300"
              style={{ background: '#090909' }}
            >
              {/* Hover top border */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-cherry-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />

              {/* Quote icon */}
              <Quote className="w-8 h-8 text-cherry-500/30 mb-6" />

              {/* Stars */}
              <div className="flex gap-0.5 mb-5">
                {[...Array(t.rating)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-cherry-500 text-cherry-500" />
                ))}
              </div>

              {/* Text */}
              <p className="text-zinc-400 text-sm leading-relaxed flex-1 mb-8 group-hover:text-zinc-300 transition-colors">
                "{t.text}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-4 border-t border-zinc-900 pt-6">
                <div
                  className="w-10 h-10 flex items-center justify-center text-xs font-bold text-zinc-50 flex-shrink-0"
                  style={{ background: '#810100', clipPath: 'polygon(0 0, calc(100% - 6px) 0, 100% 6px, 100% 100%, 6px 100%, 0 calc(100% - 6px))' }}
                >
                  {t.initial}
                </div>
                <div>
                  <p className="text-zinc-50 text-sm font-semibold">{t.name}</p>
                  <p className="text-zinc-600 text-xs">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
