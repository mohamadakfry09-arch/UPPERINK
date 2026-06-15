import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle } from 'lucide-react';
import { COMPANY_INFO } from '../config/constants';

const HF = 'Helvetica, Arial, sans-serif';
const BEBAS = "'Bebas Neue', Impact, sans-serif";

const waUrl = `https://wa.me/${COMPANY_INFO?.whatsapp || '6281234567890'}?text=${encodeURIComponent('Halo UPPERINK, saya ingin berkonsultasi.')}`;

// ── PLACEHOLDER IMAGE (solid dark with brand text) ────────────────────────────
const ImgPlaceholder = ({ label }) => (
  <div
    className="w-full h-full flex flex-col items-center justify-center gap-3"
    style={{ background: '#1A1819', minHeight: 260 }}
  >
    <div style={{ fontFamily: BEBAS, fontSize: 48, color: 'rgba(239,32,32,0.15)', letterSpacing: '0.1em' }}>UPPERINK</div>
    <div style={{ fontSize: 11, letterSpacing: '0.3em', color: '#404040', textTransform: 'uppercase' }}>{label}</div>
  </div>
);

const TentangPage = () => {
  const heroRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    const el = heroRef.current;
    if (!el) return;
    const lines = el.querySelectorAll('.animate-in');
    lines.forEach((line, i) => {
      setTimeout(() => {
        line.style.opacity = '1';
        line.style.transform = 'translateY(0)';
      }, 100 + i * 120);
    });
  }, []);

  return (
    <div style={{ background: '#090909', fontFamily: HF }}>

      {/* ── HERO ──────────────────────────────────────────────────────────────── */}
      <section
        className="relative min-h-[70vh] flex items-center overflow-hidden"
        style={{ background: '#000000' }}
      >
        {/* Grid overlay */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.025]"
          style={{
            backgroundImage:
              'repeating-linear-gradient(0deg,#fff 0,#fff 1px,transparent 1px,transparent 60px),repeating-linear-gradient(90deg,#fff 0,#fff 1px,transparent 1px,transparent 60px)',
          }}
        />
        {/* Red glow */}
        <div
          className="absolute top-1/2 right-0 -translate-y-1/2 w-[600px] h-[600px] pointer-events-none opacity-[0.06]"
          style={{ background: 'radial-gradient(circle,#ef2020 0%,transparent 70%)' }}
        />

        <div className="max-w-7xl mx-auto px-6 lg:px-10 w-full pt-32 pb-20" ref={heroRef}>
          <div className="animate-in" style={{ opacity: 0, transform: 'translateY(30px)', transition: 'all 0.7s ease' }}>
            <div className="flex items-center gap-3 mb-6">
              <span className="h-px w-8" style={{ background: '#ef2020' }} />
              <span className="text-[10px] tracking-[0.3em] uppercase" style={{ color: '#a0a0a0' }}>
                Tentang Kami
              </span>
            </div>
          </div>

          <div className="animate-in" style={{ opacity: 0, transform: 'translateY(30px)', transition: 'all 0.7s ease' }}>
            <h1
              className="text-[52px] sm:text-[72px] lg:text-[96px] leading-none text-white mb-4"
              style={{ fontFamily: BEBAS, letterSpacing: '0.04em' }}
            >
              UPPERINK
              <br />
              <span style={{ color: '#ef2020' }}>BUILT IN INK</span>
            </h1>
          </div>

          <div className="animate-in max-w-2xl" style={{ opacity: 0, transform: 'translateY(30px)', transition: 'all 0.7s ease' }}>
            <p className="text-zinc-400 text-lg leading-relaxed mb-10">
              Brand konveksi konvensional yang mengandalkan penuh integritas terhadap kualitas dan ketepatan waktu.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/produk"
                className="inline-flex items-center gap-3 px-8 py-4 text-white text-sm uppercase tracking-[0.1em] transition-all duration-300 hover:opacity-90"
                style={{ fontWeight: 700, background: '#ef2020' }}
              >
                Lihat Produk Kami
                <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-8 py-4 text-white text-sm uppercase tracking-[0.1em] transition-all duration-300 hover:bg-white/10"
                style={{ fontWeight: 700, border: '1px solid rgba(255,255,255,0.15)' }}
              >
                Hubungi Kami
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── ABOUT — TEKS + GAMBAR ──────────────────────────────────────────────── */}
      <section className="py-24 relative overflow-hidden" style={{ background: '#1A1819' }}>
        {/* Subtle divider line */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-full opacity-10"
          style={{ background: 'linear-gradient(to bottom, transparent, #ef2020, transparent)' }}
        />

        <div className="max-w-7xl mx-auto px-6 lg:px-10 relative">
          <div className="max-w-3xl">

            {/* Teks */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="h-px w-8" style={{ background: '#ef2020' }} />
                <span className="text-[10px] tracking-[0.3em] uppercase" style={{ color: '#a0a0a0' }}>
                  Siapa Kami
                </span>
              </div>
              <h2
                className="text-4xl sm:text-5xl text-white mb-8"
                style={{ fontWeight: 700, letterSpacing: '0.02em' }}
              >
                UPPERINK —<br />
                <span style={{ color: '#ef2020' }}>BUILT IN INK</span>
              </h2>

              <div className="space-y-5 text-zinc-400 text-sm leading-relaxed">
                <p>
                  Upperink adalah brand konveksi konvensional dengan mengandalkan penuh integritas terhadap kualitas
                  dan juga waktu yang pas. Kami percaya bahwa setiap produk yang kami hasilkan bukan sekadar pakaian,
                  melainkan representasi identitas, karakter, dan nilai dari setiap brand, komunitas, maupun company
                  yang mempercayakan produksinya kepada kami.
                </p>
                <p>
                  Dengan menggabungkan standar produksi yang konsisten, material berkualitas, serta proses sablon yang
                  presisi, Upperink menghadirkan solusi produksi apparel untuk berbagai kebutuhan yang dapat menjadi
                  pilihan. Mulai dari clothing brand, merchandise, seragam company, event, hingga kebutuhan custom
                  apparel dalam skala kecil maupun besar.
                </p>
                <p>
                  Upperink hadir sebagai partner produksi yang mengutamakan kualitas.
                </p>
              </div>

              <div className="mt-10 space-y-3">
                {[
                  'Clothing brand & merchandise',
                  'Seragam company & event',
                  'Custom apparel skala kecil & besar',
                  'Sablon presisi & material berkualitas',
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: '#ef2020' }} />
                    <span className="text-sm text-zinc-300">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── ESTABLISHED — SEJARAH ─────────────────────────────────────────────── */}
      <section className="py-24 relative overflow-hidden" style={{ background: '#090909' }}>


        <div className="max-w-7xl mx-auto px-6 lg:px-10 relative">
          <div className="grid lg:grid-cols-2 gap-16 items-start">

            {/* Left — label + judul */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="h-px w-8" style={{ background: '#ef2020' }} />
                <span className="text-[10px] tracking-[0.3em] uppercase" style={{ color: '#a0a0a0' }}>
                  Established
                </span>
              </div>
              <h2
                className="text-4xl sm:text-5xl text-white mb-6"
                style={{ fontWeight: 700, letterSpacing: '0.02em' }}
              >
                JUNI 2026<br />
                <span style={{ color: '#ef2020' }}>KUNINGAN, JABAR</span>
              </h2>


            </div>

            {/* Right — narasi */}
            <div className="space-y-5 text-zinc-400 text-sm leading-relaxed pt-2">
              <p>
                Upperink didirikan pada bulan Juni 2026 di Kabupaten Kuningan, Jawa Barat, dengan visi untuk
                menghadirkan layanan konveksi dan screen printing yang mengutamakan kualitas, ketepatan waktu,
                serta standar produksi yang konsisten.
              </p>
              <p>
                Kami percaya bahwa kualitas bukan hanya tentang hasil akhir, tetapi juga tentang bagaimana setiap
                proses dijalankan dengan konsisten, teliti, dan penuh tanggung jawab. Nilai inilah yang terus menjadi
                landasan perjalanan Upperink hingga saat ini.
              </p>
              <p>
                Seiring perjalanan kami, Upperink terus bertumbuh bersama berbagai brand, komunitas, dan company yang
                mempercayakan proses produksinya kepada kami. Setiap kolaborasi menjadi bagian dari perjalanan untuk
                menghadirkan produk apparel yang tidak hanya fungsional, tetapi juga mampu merepresentasikan identitas
                dan pesan yang ingin disampaikan.
              </p>

              {/* Stat row */}
              <div className="grid grid-cols-3 gap-px mt-8" style={{ background: 'rgba(255,255,255,0.04)' }}>
                {[
                  { value: '2026', label: 'Didirikan' },
                  { value: 'Kuningan', label: 'Lokasi' },
                  { value: '100%', label: 'Komitmen' },
                ].map(({ value, label }) => (
                  <div key={label} className="p-6 text-center" style={{ background: '#090909' }}>
                    <div
                      className="text-xl sm:text-2xl font-black text-zinc-50 mb-1"
                      style={{ fontFamily: BEBAS, letterSpacing: '0.05em', color: '#ef2020' }}
                    >
                      {value}
                    </div>
                    <div className="text-[10px] uppercase tracking-[0.2em]" style={{ color: '#a0a0a0' }}>{label}</div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────────────────────── */}
      <section className="py-20 relative overflow-hidden" style={{ background: '#ef2020' }}>
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.1]"
          style={{
            backgroundImage:
              'repeating-linear-gradient(0deg,#fff 0,#fff 1px,transparent 1px,transparent 40px),repeating-linear-gradient(90deg,#fff 0,#fff 1px,transparent 1px,transparent 40px)',
          }}
        />
        <div className="max-w-7xl mx-auto px-6 lg:px-10 relative flex flex-col sm:flex-row items-center justify-between gap-8">
          <div>
            <h2
              className="text-4xl sm:text-5xl text-white mb-2"
              style={{ fontFamily: BEBAS, letterSpacing: '0.06em' }}
            >
              SIAP MEMULAI PROYEK ANDA?
            </h2>
            <p className="text-white/70 text-sm">Konsultasi pertama gratis. Tidak ada kewajiban apapun.</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
            <Link
              to="/produk"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-sm uppercase tracking-[0.12em] transition-all duration-300 hover:bg-zinc-100"
              style={{ fontWeight: 700, color: '#ef2020' }}
            >
              Lihat Katalog
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 text-white text-sm uppercase tracking-[0.12em] transition-all duration-300"
              style={{ fontWeight: 700, border: '2px solid rgba(255,255,255,0.5)' }}
            >
              Chat WhatsApp
            </a>
          </div>
        </div>
      </section>

    </div>
  );
};

export default TentangPage;
