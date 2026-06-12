import React from 'react';
import { Link } from 'react-router-dom';

const StatusBanner = () => {
  return (
    <section
      className="relative py-16 overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 40%, #2d3561 70%, #4a5568 100%)',
      }}
    >
      {/* Subtle overlay dots */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)',
          backgroundSize: '30px 30px',
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid lg:grid-cols-3 gap-8 items-center">
          {/* Left - Title */}
          <div>
            <h2
              className="text-2xl md:text-3xl font-black text-white border-b-2 border-white/30 pb-3 inline-block"
              style={{ fontFamily: 'Georgia, serif' }}
            >
              Cek Status Produksi
            </h2>
          </div>

          {/* Center - CTA */}
          <div className="text-center">
            <p className="text-yellow-300 text-sm mb-5 font-medium">
              Lihat status produksi Anda dengan lebih mudah
            </p>
            <Link
              to="/tracking"
              className="inline-flex items-center gap-2 bg-yellow-400 hover:bg-yellow-500 text-black font-bold px-8 py-3.5 rounded-xl transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg text-sm"
            >
              Cek Status Produksi
            </Link>
          </div>

          {/* Right - Illustration */}
          <div className="flex justify-center lg:justify-end">
            <img
              src="/conveyor.png"
              alt="Production tracking illustration"
              className="w-64 lg:w-72 object-contain drop-shadow-2xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatusBanner;
