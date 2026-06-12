import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  const headlineRef = useRef(null);

  useEffect(() => {
    const el = headlineRef.current;
    if (!el) return;
    const lines = el.querySelectorAll('.hero-line');
    lines.forEach((line, i) => {
      line.style.transitionDelay = `${i * 0.15}s`;
      setTimeout(() => line.classList.add('visible'), 100 + i * 150);
    });
  }, []);

  return (
    <section
      className="relative min-h-screen flex flex-col overflow-hidden"
      style={{ background: '#000000' }}
    >
      {/* Subtle dark texture overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: 'repeating-linear-gradient(0deg, #fff 0px, #fff 1px, transparent 1px, transparent 60px), repeating-linear-gradient(90deg, #fff 0px, #fff 1px, transparent 1px, transparent 60px)',
        }}
      />

      {/* Main content */}
      <div className="flex-1 max-w-7xl mx-auto px-6 lg:px-10 w-full flex items-center pt-24 pb-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center w-full">

          {/* Left — Text */}
          <div ref={headlineRef} className="order-2 lg:order-1">
            <div className="flex items-center gap-3 mb-6">
              <span className="h-px w-8 bg-white/40" />
              <span
                className="text-[10px] text-zinc-500 tracking-[0.3em] uppercase"
                style={{ fontFamily: 'Helvetica, Arial, sans-serif', fontWeight: 400 }}
              >
                Professional Clothing Manufacturer
              </span>
            </div>

            <div className="overflow-hidden mb-2">
              <h1
                className="hero-line text-[36px] sm:text-[46px] lg:text-[52px] xl:text-[60px] leading-none text-white"
                style={{ fontFamily: 'Helvetica, Arial, sans-serif', fontWeight: 700, letterSpacing: '0.02em' }}
              >
                SELAMAT DATANG
              </h1>
            </div>
            <div className="overflow-hidden mb-10">
              <h1
                className="hero-line text-[36px] sm:text-[46px] lg:text-[52px] xl:text-[60px] leading-none text-white"
                style={{ fontFamily: 'Helvetica, Arial, sans-serif', fontWeight: 700, letterSpacing: '0.02em' }}
              >
                DI UPPERINK
              </h1>
            </div>

            <p
              className="text-zinc-400 text-base sm:text-lg leading-relaxed mb-10 max-w-md"
              style={{ fontFamily: 'Helvetica, Arial, sans-serif', fontWeight: 400 }}
            >
              Mari Mewujudkan kualitas dan menjahit kepercayaan bersama{' '}
              <span className="text-white font-semibold">UPPERINK</span>.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/produk"
                className="inline-flex items-center justify-center gap-3 px-8 py-4 text-white text-sm uppercase tracking-[0.1em] transition-all duration-300 hover:bg-zinc-600"
                style={{
                  fontFamily: 'Helvetica, Arial, sans-serif',
                  fontWeight: 700,
                  backgroundColor: '#3a3a3a',
                  borderRadius: 0,
                }}
              >
                Order Sekarang
              </Link>
            </div>
          </div>

          {/* Right — Image */}
          <div className="order-1 lg:order-2 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-[320px] lg:max-w-[380px] animate-float">
              {/* Main image */}
              <div className="relative overflow-hidden">
                <img
                  src="/hero-press-new.png"
                  alt="Upperink clothing production"
                  className="w-full h-[380px] sm:h-[440px] object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
