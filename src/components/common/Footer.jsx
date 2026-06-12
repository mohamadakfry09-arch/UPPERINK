import React from 'react';
import { Link } from 'react-router-dom';
import { MessageCircle, Camera, MapPin, Phone, Mail } from 'lucide-react';
import { COMPANY_INFO } from '../../config/constants';

const Footer = () => {
  const whatsappUrl = `https://wa.me/${COMPANY_INFO.whatsapp}?text=Halo%20Upperink%2C%20saya%20ingin%20bertanya%20tentang%20produk`;

  return (
    <footer style={{ background: '#0e0d0e' }} className="relative overflow-hidden border-t border-zinc-900/50">
      {/* Top Border Glow Line */}
      <div className="h-[2px] w-full bg-cherry-500" />
      
      {/* Background glow radial */}
      <div 
        className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-[0.03] pointer-events-none"
        style={{ background: 'radial-gradient(circle, #810100 0%, transparent 70%)' }}
      />
      
      <div className="max-w-7xl mx-auto px-6 lg:px-10 pt-16 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 mb-12">
          {/* Brand Column */}
          <div className="md:col-span-5">
            <div className="mb-6">
              <div 
                className="text-5xl text-zinc-50 tracking-[0.1em] mb-1" 
                style={{ fontFamily: "'Bebas Neue', Impact, sans-serif" }}
              >
                UPPERINK
              </div>
              <div className="text-[10px] text-zinc-600 tracking-[0.3em] uppercase">
                Professional Clothing Manufacturer
              </div>
            </div>
            <p className="text-zinc-500 text-sm leading-relaxed mb-8 max-w-xs">
              Mewujudkan kualitas dan menjahit kepercayaan untuk setiap pelanggan kami. Produksi premium, hasil nyata.
            </p>
            <div className="flex gap-3">
              {COMPANY_INFO.instagram && (
                <a
                  href={`https://instagram.com/${COMPANY_INFO.instagram.replace('@', '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 border border-zinc-800 hover:border-cherry-500 hover:bg-cherry-500/10 flex items-center justify-center transition-all duration-300 group"
                  aria-label="Instagram"
                >
                  <Camera className="w-4 h-4 text-zinc-500 group-hover:text-cherry-400 transition-colors" />
                </a>
              )}
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 border border-zinc-800 hover:border-green-600 hover:bg-green-600/10 flex items-center justify-center transition-all duration-300 group"
                aria-label="WhatsApp"
              >
                <MessageCircle className="w-4 h-4 text-zinc-500 group-hover:text-green-500 transition-colors" />
              </a>
            </div>
          </div>

          {/* Navigation Column */}
          <div className="md:col-span-3">
            <h4 className="text-[10px] font-bold text-zinc-600 uppercase tracking-[0.25em] mb-5">
              Navigasi
            </h4>
            <ul className="space-y-3">
              {[
                { to: '/', label: 'Beranda' },
                { to: '/produk', label: 'Katalog Produk' },
                { to: '/order', label: 'Pesan Sekarang' },
                { to: '/tracking', label: 'Cek Status Order' },
                { to: '/size-chart', label: 'Size Chart' },
              ].map(({ to, label }) => (
                <li key={to}>
                  <Link 
                    to={to} 
                    className="text-zinc-500 hover:text-zinc-50 text-sm transition-colors duration-200 flex items-center gap-2 group"
                  >
                    <span className="block w-3 h-px bg-zinc-700 group-hover:w-5 group-hover:bg-cherry-500 transition-all duration-300" />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Column */}
          <div className="md:col-span-4">
            <h4 className="text-[10px] font-bold text-zinc-600 uppercase tracking-[0.25em] mb-5">
              Kontak
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <div className="w-8 h-8 border border-zinc-800 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <MapPin className="w-3.5 h-3.5 text-cherry-500" />
                </div>
                <span className="text-zinc-500 text-sm leading-relaxed">
                  {COMPANY_INFO.address}
                </span>
              </li>
              {COMPANY_INFO.phone && (
                <li className="flex items-center gap-3">
                  <div className="w-8 h-8 border border-zinc-800 flex items-center justify-center flex-shrink-0">
                    <Phone className="w-3.5 h-3.5 text-cherry-500" />
                  </div>
                  <a href={`tel:${COMPANY_INFO.phone}`} className="text-zinc-500 hover:text-zinc-50 text-sm transition-colors">
                    {COMPANY_INFO.phone}
                  </a>
                </li>
              )}
              {COMPANY_INFO.email && (
                <li className="flex items-center gap-3">
                  <div className="w-8 h-8 border border-zinc-800 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-3.5 h-3.5 text-cherry-500" />
                  </div>
                  <a href={`mailto:${COMPANY_INFO.email}`} className="text-zinc-500 hover:text-zinc-50 text-sm transition-colors">
                    {COMPANY_INFO.email}
                  </a>
                </li>
              )}
            </ul>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-zinc-900 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-zinc-700">
            © {new Date().getFullYear()} UPPERINK. All rights reserved.
          </p>
          <div className="flex items-center gap-2">
            <span className="w-1 h-1 rounded-full bg-cherry-500" />
            <p className="text-xs text-zinc-700">
              Professional Clothing Manufacturer
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
