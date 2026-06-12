import React from 'react';
import { COMPANY_INFO } from '../../config/constants';
import { createLead } from '../../services/leadService';

const generateLeadId = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const random = String(Math.floor(Math.random() * 900) + 100);
  return `LID-${year}${month}${day}-${random}`;
};

const WhatsAppIcon = ({ className }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <path d="M12.012 2c-5.506 0-9.988 4.482-9.988 9.988 0 1.76.458 3.473 1.332 4.986L2 22l5.234-1.373a9.932 9.932 0 0 0 4.778 1.218h.004c5.506 0 9.988-4.482 9.988-9.988C22 6.482 17.518 2 12.012 2zm0 18.286c-1.575 0-3.117-.424-4.47-1.226l-.32-.19-3.32.87.886-3.235-.208-.33a8.232 8.232 0 0 1-1.262-4.22c0-4.542 3.696-8.237 8.243-8.237 2.202 0 4.272.859 5.83 2.417a8.175 8.175 0 0 1 2.413 5.82c-.004 4.542-3.7 8.237-8.242 8.237zM16.53 13.9c-.248-.124-1.464-.722-1.692-.805-.226-.083-.393-.124-.557.124-.165.248-.639.805-.783.97-.144.166-.289.186-.537.062a7.618 7.618 0 0 1-3.267-2.01c-.815-.726-1.365-1.623-1.525-1.898-.16-.275-.017-.423.12-.56.124-.124.275-.32.413-.48.14-.16.186-.275.279-.459.093-.183.046-.344-.02-.48-.068-.138-.558-1.344-.764-1.84-.2-.48-.403-.414-.557-.422a4.423 4.423 0 0 0-.4-.008c-.138 0-.363.051-.553.26-.19.208-.727.711-.727 1.733 0 1.022.744 2.01.848 2.148.103.138 1.464 2.237 3.548 3.136.495.214.882.342 1.184.438.498.158.951.135 1.31.082.399-.059 1.464-.599 1.67-.1.207-.5.207-.929 0-1.116L16.53 13.9z" />
  </svg>
);

const WhatsAppButton = () => {
  const number = COMPANY_INFO.whatsapp.replace(/\D/g, '');
  const waUrl = `https://wa.me/${number}`;

  const handleWhatsAppClick = async () => {
    try {
      const leadId = generateLeadId();
      const today = new Date().toISOString().split('T')[0];
      await createLead({
        lead_id: leadId,
        tanggal: today,
        nama_pelanggan: 'Pengunjung Web (Pertanyaan Umum)',
        whatsapp: '-',
        nama_produk: 'Produk Custom Lainnya',
        status_produksi: 'Konsultasi',
        catatan_admin: `Membuka chat WhatsApp via floating button dari website.`,
        link_whatsapp: waUrl,
      });
    } catch (err) {
      console.error('Failed to create background lead:', err);
    }
  };

  return (
    <a
      href={waUrl}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleWhatsAppClick}
      className="fixed z-[9999] group flex items-center justify-center pointer-events-auto"
      style={{ bottom: '20px', right: '20px' }}
      aria-label="Hubungi Kami via WhatsApp"
    >
      {/* Outer Pulse Rings */}
      <span className="absolute inset-0 rounded-full animate-pulse bg-[#25D366] opacity-30 scale-110 pointer-events-none" style={{ animationDuration: '3s' }} />
      <span className="absolute inset-0 rounded-full animate-ping bg-[#25D366] opacity-10 pointer-events-none" style={{ animationDuration: '4s' }} />

      {/* Floating Button Container with glassmorphism */}
      <div
        className="w-[50px] h-[50px] md:w-[60px] md:h-[60px] rounded-full flex items-center justify-center shadow-[0_8px_32px_rgba(37,211,102,0.4)] hover:shadow-[0_12px_40px_rgba(37,211,102,0.6)] bg-[#25D366]/90 hover:bg-[#25D366] backdrop-blur-sm border border-white/10 hover:scale-110 active:scale-95 transition-all duration-300 ease-out animate-float"
        style={{ animationDuration: '4s' }}
      >
        <WhatsAppIcon className="w-6 h-6 md:w-7 md:h-7 text-white" />
      </div>

      {/* Tooltip - Desktop Only */}
      <div className="absolute right-16 md:right-20 bottom-3 text-zinc-50 text-xs font-semibold px-3 py-2 whitespace-nowrap opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 pointer-events-none hidden md:block transition-all duration-300 ease-out shadow-lg"
        style={{
          background: 'rgba(9, 9, 9, 0.85)',
          backdropFilter: 'blur(8px)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
        }}
      >
        Hubungi Kami
        <div
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1 w-2 h-2 rotate-45"
          style={{ 
            background: 'rgba(9, 9, 9, 0.85)', 
            borderRight: '1px solid rgba(255, 255, 255, 0.08)', 
            borderTop: '1px solid rgba(255, 255, 255, 0.08)' 
          }}
        />
      </div>
    </a>
  );
};

export default WhatsAppButton;
