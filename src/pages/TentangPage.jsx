import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Award, Users, Zap, Heart, CheckCircle, TrendingUp } from 'lucide-react';

const HF = 'Helvetica, Arial, sans-serif';
const BEBAS = "'Bebas Neue', Impact, sans-serif";

// Values
const values = [
  {
    Icon: Award,
    title: 'Kualitas Tanpa Kompromi',
    desc: 'Setiap jahitan, setiap bahan, dan setiap detail kami pastikan memenuhi standar kualitas premium yang kami janjikan.',
    number: '01',
  },
  {
    Icon: Users,
    title: 'Kolaborasi & Kepercayaan',
    desc: 'Kami membangun hubungan jangka panjang dengan klien. Kepercayaan Anda adalah fondasi bisnis kami.',
    number: '02',
  },
  {
    Icon: Zap,
    title: 'Inovasi Berkelanjutan',
    desc: 'Kami terus berinvestasi dalam teknologi dan pelatihan tim untuk menghadirkan solusi konveksi terkini.',
    number: '03',
  },
  {
    Icon: Heart,
    title: 'Passion & Dedikasi',
    desc: 'Dibalik setiap produk ada tim yang berdedikasi, mencurahkan passion mereka dalam setiap detail pekerjaan.',
    number: '04',
  },
];

// Team
const team = [
  {
    name: 'Tim Desain',
    role: 'Creative & Artwork',
    desc: 'Ahli desain grafis dan pattern maker yang siap mewujudkan visi Anda menjadi kenyataan.',
    icon: '🎨',
  },
  {
    name: 'Tim Produksi',
    role: 'Manufacturing',
    desc: 'Operator mesin berpengalaman dengan ketelitian tinggi dalam setiap proses jahit dan finishing.',
    icon: '⚙️',
  },
  {
    name: 'Tim QC',
    role: 'Quality Control',
    desc: 'Inspektor kualitas yang memastikan setiap produk memenuhi standar sebelum dikirimkan ke pelanggan.',
    icon: '✅',
  },
  {
    name: 'Tim Customer Service',
    role: 'Client Relations',
    desc: 'Konsultan yang siap membantu Anda dari konsultasi pertama hingga produk tiba di tangan Anda.',
    icon: '💬',
  },
];

// Milestones
const milestones = [
  { year: '2019', title: 'Berdiri', desc: 'UPPERINK didirikan dengan visi menghadirkan konveksi berkualitas premium untuk semua.' },
  { year: '2020', title: 'Ekspansi Tim', desc: 'Menambah kapasitas produksi dan memperluas tim ahli untuk memenuhi permintaan yang terus meningkat.' },
  { year: '2022', title: 'Digital Era', desc: 'Meluncurkan platform digital untuk kemudahan pemesanan dan tracking order secara real-time.' },
  { year: '2024', title: 'Kepercayaan 500+ Klien', desc: 'Mencapai milestone 500+ klien puas dari berbagai industri di seluruh Indonesia.' },
];

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

      {/* ── HERO ─────────────────────────────────────────────── */}
      <section
        className="relative min-h-[70vh] flex items-center overflow-hidden"
        style={{ background: '#000000' }}
      >
        {/* Grid overlay */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.025]"
          style={{
            backgroundImage:
              'repeating-linear-gradient(0deg, #fff 0px, #fff 1px, transparent 1px, transparent 60px), repeating-linear-gradient(90deg, #fff 0px, #fff 1px, transparent 1px, transparent 60px)',
          }}
        />
        {/* Red glow */}
        <div
          className="absolute top-1/2 right-0 -translate-y-1/2 w-[600px] h-[600px] pointer-events-none opacity-[0.06]"
          style={{ background: 'radial-gradient(circle, #ef2020 0%, transparent 70%)' }}
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
              className="text-[52px] sm:text-[72px] lg:text-[96px] leading-none text-white mb-8"
              style={{ fontFamily: BEBAS, letterSpacing: '0.04em' }}
            >
              MENJAHIT
              <br />
              <span style={{ color: '#ef2020' }}>KEPERCAYAAN</span>
            </h1>
          </div>

          <div className="animate-in max-w-2xl" style={{ opacity: 0, transform: 'translateY(30px)', transition: 'all 0.7s ease' }}>
            <p className="text-zinc-400 text-lg leading-relaxed mb-10">
              UPPERINK adalah konveksi profesional yang berdedikasi menghadirkan pakaian berkualitas tinggi.
              Dari kaos custom hingga seragam perusahaan, kami mewujudkan visi Anda dengan presisi dan passion.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/produk"
                className="inline-flex items-center gap-3 px-8 py-4 text-white text-sm uppercase tracking-[0.1em] transition-all duration-300 hover:opacity-90"
                style={{ fontFamily: HF, fontWeight: 700, background: '#ef2020', borderRadius: 0 }}
              >
                Lihat Produk Kami
                <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href={`https://wa.me/${import.meta.env.VITE_WA_ADMIN || '6281234567890'}?text=${encodeURIComponent('Halo UPPERINK, saya ingin berkonsultasi.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-8 py-4 text-white text-sm uppercase tracking-[0.1em] transition-all duration-300 hover:bg-white/10"
                style={{ fontFamily: HF, fontWeight: 700, border: '1px solid rgba(255,255,255,0.15)', borderRadius: 0 }}
              >
                Hubungi Kami
              </a>
            </div>
          </div>
        </div>
      </section>


      {/* ── STORY ─────────────────────────────────────────────── */}
      <section className="py-24 relative overflow-hidden" style={{ background: '#1A1819' }}>
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-full opacity-10"
          style={{ background: 'linear-gradient(to bottom, transparent, #ef2020, transparent)' }}
        />
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">

            {/* Left */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="h-px w-8" style={{ background: '#ef2020' }} />
                <span className="text-[10px] tracking-[0.3em] uppercase" style={{ color: '#a0a0a0' }}>
                  Kisah Kami
                </span>
              </div>
              <h2 className="text-5xl sm:text-6xl text-white mb-8" style={{ fontFamily: HF, fontWeight: 700, letterSpacing: '0.02em' }}>
                DARI PASSION<br />
                <span style={{ color: '#ef2020' }}>MENJADI PROFESI</span>
              </h2>
              <div className="space-y-5 text-zinc-400 text-sm leading-relaxed">
                <p>
                  UPPERINK lahir dari passion mendalam terhadap dunia fashion dan tekstil. Dimulai dari sebuah
                  workshop kecil dengan mesin jahit sederhana, kami berkembang menjadi konveksi profesional
                  yang dipercaya ratusan brand dan bisnis di seluruh Indonesia.
                </p>
                <p>
                  Kami percaya bahwa setiap pakaian yang baik dimulai dari bahan berkualitas, dijahit oleh
                  tangan-tangan terampil, dan diselesaikan dengan kontrol kualitas yang ketat. Filosofi ini
                  yang mendorong kami terus berinovasi setiap harinya.
                </p>
                <p>
                  Dari kaos komunitas hingga seragam korporat, dari merchandise event hingga koleksi brand
                  fashion — UPPERINK siap mewujudkan setiap visi Anda menjadi produk nyata yang membanggakan.
                </p>
              </div>

              <div className="mt-10 space-y-3">
                {[
                  'Produksi minimum rendah, cocok untuk semua skala bisnis',
                  'Konsultasi desain gratis dari tim ahli kami',
                  'Garansi kualitas & revisi untuk setiap produksi',
                  'Pengiriman ke seluruh Indonesia',
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: '#ef2020' }} />
                    <span className="text-sm text-zinc-300">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right — Timeline */}
            <div className="space-y-0 divide-y" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
              {milestones.map(({ year, title, desc }, i) => (
                <div key={year} className="flex gap-6 py-8 group">
                  <div className="flex-shrink-0">
                    <div
                      className="text-4xl leading-none group-hover:text-white transition-colors duration-300"
                      style={{ fontFamily: BEBAS, color: i === milestones.length - 1 ? '#ef2020' : 'rgba(255,255,255,0.15)', letterSpacing: '0.05em' }}
                    >
                      {year}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-zinc-50 font-bold text-sm uppercase tracking-wide mb-2 group-hover:text-white transition-colors">
                      {title}
                    </h3>
                    <p className="text-zinc-500 text-sm leading-relaxed group-hover:text-zinc-400 transition-colors">
                      {desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* ── VALUES ─────────────────────────────────────────────── */}
      <section className="py-24 relative overflow-hidden" style={{ background: '#090909' }}>
        {/* Ghost text */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none"
          style={{
            fontFamily: BEBAS,
            fontSize: 'clamp(80px, 16vw, 220px)',
            letterSpacing: '0.05em',
            color: 'transparent',
            WebkitTextStroke: '1px rgba(255,255,255,0.02)',
            whiteSpace: 'nowrap',
          }}
        >
          VALUES
        </div>

        <div className="max-w-7xl mx-auto px-6 lg:px-10 relative">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-16">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="h-px w-8" style={{ background: '#ef2020' }} />
                <span className="text-[10px] tracking-[0.3em] uppercase" style={{ color: '#a0a0a0' }}>
                  Nilai Kami
                </span>
              </div>
              <h2 className="text-5xl sm:text-6xl text-white" style={{ fontFamily: HF, fontWeight: 700, letterSpacing: '0.02em' }}>
                APA YANG KAMI<br />YAKINI
              </h2>
            </div>
            <p className="text-sm max-w-xs leading-relaxed sm:text-right" style={{ color: '#a0a0a0' }}>
              Nilai-nilai ini bukan sekedar slogan. Ini adalah komitmen nyata yang kami wujudkan setiap hari.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-px" style={{ background: 'rgba(255,255,255,0.04)' }}>
            {values.map(({ Icon, title, desc, number }) => (
              <div
                key={title}
                className="group relative p-8 lg:p-10 transition-all duration-300 cursor-default"
                style={{ background: '#090909' }}
              >
                <div className="absolute top-0 left-0 right-0 h-[2px] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" style={{ background: '#ef2020' }} />
                <div
                  className="text-6xl leading-none mb-6 select-none"
                  style={{ fontFamily: BEBAS, WebkitTextStroke: '1.5px rgba(255,255,255,0.12)', color: 'transparent', letterSpacing: '0.05em' }}
                >
                  {number}
                </div>
                <div className="mb-5 group-hover:scale-110 transition-transform duration-300 origin-left" style={{ color: '#ef2020' }}>
                  <Icon className="w-8 h-8" />
                </div>
                <h3 className="text-lg mb-3 tracking-wide text-zinc-50" style={{ fontWeight: 600 }}>
                  {title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: '#a0a0a0' }}>
                  {desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TEAM ─────────────────────────────────────────────── */}
      <section className="py-24 relative overflow-hidden" style={{ background: '#1A1819' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="mb-16">
            <div className="flex items-center gap-3 mb-4">
              <span className="h-px w-8" style={{ background: '#ef2020' }} />
              <span className="text-[10px] tracking-[0.3em] uppercase" style={{ color: '#a0a0a0' }}>
                Tim Kami
              </span>
            </div>
            <h2 className="text-5xl sm:text-6xl text-white" style={{ fontFamily: HF, fontWeight: 700, letterSpacing: '0.02em' }}>
              ORANG-ORANG DI BALIK<br />
              <span style={{ color: '#ef2020' }}>UPPERINK</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px" style={{ background: 'rgba(255,255,255,0.04)' }}>
            {team.map(({ name, role, desc, icon }) => (
              <div
                key={name}
                className="group relative p-8 transition-all duration-300"
                style={{ background: '#1A1819' }}
              >
                <div className="absolute top-0 left-0 right-0 h-[2px] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" style={{ background: '#ef2020' }} />
                <div className="text-4xl mb-6 group-hover:scale-110 transition-transform duration-300 origin-left">
                  {icon}
                </div>
                <h3 className="text-zinc-50 font-bold text-sm uppercase tracking-widest mb-1">{name}</h3>
                <div className="text-[10px] uppercase tracking-[0.2em] mb-4" style={{ color: '#ef2020' }}>{role}</div>
                <p className="text-xs leading-relaxed" style={{ color: '#a0a0a0' }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ─────────────────────────────────────────────── */}
      <section className="py-24 relative overflow-hidden" style={{ background: '#000000' }}>
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.025]"
          style={{
            backgroundImage:
              'repeating-linear-gradient(0deg, #fff 0px, #fff 1px, transparent 1px, transparent 60px), repeating-linear-gradient(90deg, #fff 0px, #fff 1px, transparent 1px, transparent 60px)',
          }}
        />
        <div className="max-w-7xl mx-auto px-6 lg:px-10 text-center relative">
          <div className="flex items-center justify-center gap-3 mb-6">
            <span className="h-px w-8" style={{ background: '#ef2020' }} />
            <span className="text-[10px] tracking-[0.3em] uppercase" style={{ color: '#a0a0a0' }}>
              Bergabunglah Bersama Kami
            </span>
            <span className="h-px w-8" style={{ background: '#ef2020' }} />
          </div>
          <h2
            className="text-5xl sm:text-7xl text-white mb-6"
            style={{ fontFamily: BEBAS, letterSpacing: '0.04em' }}
          >
            SIAP MEMULAI<br />
            <span style={{ color: '#ef2020' }}>PROYEK ANDA?</span>
          </h2>
          <p className="text-zinc-400 text-base leading-relaxed mb-10 max-w-xl mx-auto">
            Bergabunglah dengan ratusan brand yang telah mempercayai UPPERINK.
            Konsultasi pertama Anda gratis, tanpa kewajiban apapun.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/produk"
              className="inline-flex items-center justify-center gap-3 px-10 py-4 text-white text-sm uppercase tracking-[0.12em] transition-all duration-300 hover:opacity-90"
              style={{ fontFamily: HF, fontWeight: 700, background: '#ef2020', borderRadius: 0 }}
            >
              Lihat Katalog
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href={`https://wa.me/${import.meta.env.VITE_WA_ADMIN || '6281234567890'}?text=${encodeURIComponent('Halo UPPERINK, saya ingin memulai proyek.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 px-10 py-4 text-white text-sm uppercase tracking-[0.12em] transition-all duration-300 hover:bg-white/5"
              style={{ fontFamily: HF, fontWeight: 700, border: '1px solid rgba(255,255,255,0.2)', borderRadius: 0 }}
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
