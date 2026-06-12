import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { dummyFAQ } from '../../data/dummyData';

const FAQItem = ({ item, isOpen, onToggle }) => (
  <div className="border border-gray-100 rounded-2xl overflow-hidden shadow-sm bg-white">
    <button
      className="w-full flex items-center justify-between px-6 py-5 text-left bg-white hover:bg-gray-50 transition-colors"
      onClick={onToggle}
    >
      <span className={`font-semibold pr-4 ${isOpen ? 'text-black' : 'text-gray-800'}`}>
        {item.pertanyaan}
      </span>
      <ChevronDown
        className={`w-5 h-5 shrink-0 transition-transform duration-300 ${
          isOpen ? 'rotate-180 text-yellow-500' : 'text-gray-400'
        }`}
      />
    </button>
    <div
      className={`transition-all duration-300 overflow-hidden ${
        isOpen ? 'max-h-96' : 'max-h-0'
      }`}
    >
      <div className="px-6 pb-5 text-gray-500 text-sm leading-relaxed border-t border-gray-100 pt-4">
        {item.jawaban}
      </div>
    </div>
  </div>
);

const FAQSection = () => {
  const [openId, setOpenId] = useState(1);

  return (
    <section className="bg-white py-16 border-t border-gray-100">
      <div className="max-w-3xl mx-auto px-6 lg:px-8">
        {/* Title */}
        <div className="text-center mb-12">
          <h2 className="text-2xl font-black text-black" style={{ fontFamily: 'Georgia, serif' }}>
            Frequently Asked Questions
          </h2>
          <div className="w-16 h-0.5 bg-yellow-400 mt-2 mx-auto mb-4" />
          <p className="text-gray-500 text-sm">
            Temukan jawaban atas pertanyaan umum seputar layanan konveksi kami
          </p>
        </div>

        <div className="space-y-3">
          {dummyFAQ.map((item) => (
            <FAQItem
              key={item.id}
              item={item}
              isOpen={openId === item.id}
              onToggle={() => setOpenId(openId === item.id ? null : item.id)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
