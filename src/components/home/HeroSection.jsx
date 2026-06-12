import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';

const HeroSection = () => {
  const headlineRef = useRef(null);

  useEffect(() => {
    const el = headlineRef.current;
    if (!el) return;
    // Stagger lines animation
    const lines = el.querySelectorAll('.hero-line');
    lines.forEach((line, i) => {
      line.style.transitionDelay = `${i * 0.15}s`;
      setTimeout(() => line.classList.add('visible'), 100 + i * 150);
    });
  }, []);

  return (
    <section
      className="relative min-h-screen flex flex-col overflow-hidden"
      style={{ background: '#090909' }}
    >

      {/* Radial red glow — top left */}
      <div
        className="absolute -top-40 -left-40 w-[700px] h-[700px] rounded-full opacity-[0.06] pointer-events-none"
        style={{ background: 'radial-gradient(circle, #810100 0%, transparent 65%)' }}
      />
      {/* Radial glow — bottom right */}
      <div
        className="absolute -bottom-20 -right-20 w-[500px] h-[500px] rounded-full opacity-[0.04] pointer-events-none"
        style={{ background: 'radial-gradient(circle, #810100 0%, transparent 65%)' }}
      />

      {/* Main content */}
      <div className="flex-1 max-w-7xl mx-auto px-6 lg:px-10 w-full flex items-center pt-24 pb-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center w-full">

          {/* Left — Text */}
          <div ref={headlineRef} className="order-2 lg:order-1">
            <div className="flex items-center gap-3 mb-6">
              <span className="h-px w-8 bg-cherry-500" />
              <span className="text-[10px] text-zinc-500 tracking-[0.3em] uppercase font-medium">
                Professional Clothing Manufacturer
              </span>
            </div>

            <div className="overflow-hidden mb-2">
              <h1
                className="hero-line text-[64px] sm:text-[80px] lg:text-[90px] xl:text-[100px] leading-none text-zinc-50"
                style={{ fontFamily: "'Bebas Neue', Impact, sans-serif", letterSpacing: '0.03em' }}
              >
                SELAMAT DATANG
              </h1>
            </div>
            <div className="overflow-hidden mb-8">
              <h1
                className="hero-line text-[64px] sm:text-[80px] lg:text-[90px] xl:text-[100px] leading-none text-cherry-500"
                style={{ fontFamily: "'Bebas Neue', Impact, sans-serif", letterSpacing: '0.03em' }}
              >
                DI UPPERINK
              </h1>
            </div>

            <p className="text-zinc-400 text-base sm:text-lg leading-relaxed mb-10 max-w-md">
              Mari Mewujudkan kualitas dan menjahit kepercayaan bersama <span className="text-zinc-50 font-semibold">UPPERINK</span>.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/produk" className="btn-primary">
                Order Sekarang
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Right — Image */}
          <div className="order-1 lg:order-2 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-[300px] lg:max-w-[340px] animate-float">
              {/* Main image card */}
              <div
                className="relative overflow-hidden"
                style={{
                  clipPath: 'polygon(0 0, calc(100% - 24px) 0, 100% 24px, 100% 100%, 24px 100%, 0 calc(100% - 24px))',
                }}
              >
                <img
                  src="/hero-print.jpg"
                  alt="Upperink premium apparel production"
                  className="w-full h-[340px] sm:h-[400px] object-cover"
                />
              </div>

              {/* Red border accent */}
              <div
                className="absolute -inset-px pointer-events-none"
                style={{
                  background: 'linear-gradient(135deg, rgba(129,1,0,0.5) 0%, transparent 40%, transparent 60%, rgba(129,1,0,0.2) 100%)',
                  clipPath: 'polygon(0 0, calc(100% - 24px) 0, 100% 24px, 100% 100%, 24px 100%, 0 calc(100% - 24px))',
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
