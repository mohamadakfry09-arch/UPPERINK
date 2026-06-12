import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react';
import { dummyTestimonials } from '../../data/dummyData';

const TestimonialSection = () => {
  const [current, setCurrent] = useState(0);
  const total = dummyTestimonials.length;

  const prev = () => setCurrent((c) => (c - 1 + total) % total);
  const next = () => setCurrent((c) => (c + 1) % total);

  return (
    <section className="bg-gray-50 py-16 border-t border-gray-100">
      <div className="relative max-w-7xl mx-auto px-6 lg:px-10">
        {/* Title */}
        <div className="text-center mb-12">
          <h2 className="text-2xl font-black text-black" style={{ fontFamily: 'Georgia, serif' }}>
            What They Say
          </h2>
          <div className="w-16 h-0.5 bg-yellow-400 mt-2 mx-auto mb-4" />
          <p className="text-gray-500 text-sm">
            Apa kata pelanggan setia yang telah mempercayakan pembuatan baju mereka di Upperink
          </p>
        </div>

        {/* Testimonial Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {dummyTestimonials.map((t, i) => (
            <div
              key={t.id}
              className={`bg-white border border-gray-100 rounded-2xl p-6 shadow-sm transition-all duration-300 cursor-pointer ${
                i === current ? 'ring-2 ring-yellow-400 scale-105 shadow-md' : 'opacity-85 hover:opacity-100'
              }`}
              onClick={() => setCurrent(i)}
            >
              <Quote className="w-8 h-8 text-yellow-400/40 mb-4" />
              <p className="text-gray-600 text-sm leading-relaxed mb-5 line-clamp-4">
                "{t.pesan}"
              </p>
              <div className="flex items-center gap-3">
                <img
                  src={t.foto}
                  alt={t.nama}
                  className="w-10 h-10 rounded-full object-cover ring-2 ring-yellow-400/20"
                />
                <div>
                  <div className="text-black font-semibold text-sm">{t.nama}</div>
                  <div className="text-gray-400 text-xs">{t.jabatan}</div>
                </div>
              </div>
              <div className="flex gap-0.5 mt-3">
                {Array.from({ length: t.rating }).map((_, si) => (
                  <Star key={si} className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-center gap-4 mt-10">
          <button
            onClick={prev}
            className="w-10 h-10 border border-gray-200 bg-white rounded-full flex items-center justify-center text-gray-700 hover:bg-yellow-400 hover:border-yellow-400 hover:text-black transition-all duration-200"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <div className="flex gap-2">
            {Array.from({ length: total }).map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  i === current ? 'bg-yellow-400 w-6' : 'bg-gray-200'
                }`}
              />
            ))}
          </div>
          <button
            onClick={next}
            className="w-10 h-10 border border-gray-200 bg-white rounded-full flex items-center justify-center text-gray-700 hover:bg-yellow-400 hover:border-yellow-400 hover:text-black transition-all duration-200"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
