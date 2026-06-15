import React from 'react';
import { COMPANY_INFO } from '../../config/constants';
import { createLead } from '../../services/leadService';
import WhatsAppIcon from './WhatsAppIcon';

const generateLeadId = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const random = String(Math.floor(Math.random() * 900) + 100);
  return `LID-${year}${month}${day}-${random}`;
};

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
        <WhatsAppIcon className="w-6 h-6 md:w-7 md:h-7" white />
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
