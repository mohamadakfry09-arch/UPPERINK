import React, { useEffect, useRef, useState } from 'react';
import { MapPin, Phone, Mail, Clock, MessageCircle, Camera, ArrowRight } from 'lucide-react';
import { COMPANY_INFO } from '../config/constants';

const HF = 'Helvetica, Arial, sans-serif';
const BEBAS = "'Bebas Neue', Impact, sans-serif";

// FAQ data
const faqs = [
  {
    q: 'Berapa minimum order di UPPERINK?',
    a: 'Minimum order kami sangat fleksibel — mulai dari 12 pcs untuk beberapa produk. Hubungi kami untuk detail minimum order per kategori produk.',
  },
  {
    q: 'Berapa lama waktu produksi?',
    a: 'Estimasi produksi 7–14 hari kerja setelah desain disetujui dan DP diterima. Untuk order besar atau rush order, silakan konsultasikan terlebih dahulu.',
  },
  {
    q: 'Apakah bisa kirim ke luar kota?',
    a: 'Ya! Kami melayani pengiriman ke seluruh Indonesia via berbagai ekspedisi terpercaya. Biaya ongkir ditanggung pelanggan sesuai tarif ekspedisi pilihan.',
  },
  {
    q: 'Apakah ada garansi kualitas?',
    a: 'Tentu! Kami memberikan garansi kualitas dan siap melakukan revisi jika terdapat cacat produksi dari pihak kami.',
  },
  {
    q: 'Metode pembayaran apa yang diterima?',
    a: 'Kami menerima transfer bank (BCA, Mandiri, BRI), QRIS, dan dompet digital. Kami memerlukan DP minimal 50% sebelum produksi dimulai.',
  },
];

const KontakPage = () => {
  const [openFaq, setOpenFaq] = useState(null);
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

  const waUrl = `https://wa.me/${COMPANY_INFO.whatsapp}?text=${encodeURIComponent('Halo UPPERINK, saya ingin bertanya tentang layanan konveksi Anda.')}`;

  const WA_LOGO = 'https://github.com/mohamadakfry09-arch/Gambar-Upperink/blob/main/9914549e-8403-4fbb-9b00-938454800f08.jpg?raw=true';
  const EMAIL_LOGO = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQs3tjXtCFPRScoKiyyfrsJ3GocFTc_VFITZGR7vXEj9w&s=10';

  const contacts = [
    {
      Icon: MapPin,
      label: 'Alamat',
      value: COMPANY_INFO.address,
      href: `https://maps.google.com/?q=${encodeURIComponent(COMPANY_INFO.address)}`,
      color: '#ef2020',
    },
    {
      Icon: Phone,
      label: 'WhatsApp',
      value: `+${COMPANY_INFO.whatsapp}`,
      href: waUrl,
      color: '#16a34a',
    },
    {
      Icon: Mail,
      label: 'Email',
      value: COMPANY_INFO.email,
      href: `mailto:${COMPANY_INFO.email}`,
      color: '#ef2020',
      customIcon: EMAIL_LOGO,
    },
    {
      Icon: Clock,
      label: 'Jam Operasional',
      value: 'Senin – Sabtu, 08.00 – 17.00 WIB',
      href: null,
      color: '#ef2020',
    },
    {
      Icon: Camera,
      label: 'Instagram',
      value: COMPANY_INFO.instagram || '@upperink_id',
      href: `https://instagram.com/${(COMPANY_INFO.instagram || '@upperink_id').replace('@', '')}`,
      color: '#c13584',
    },
  ];

  const channels = [
    {
      icon: <img src={WA_LOGO} alt="WhatsApp" className="w-10 h-10 object-contain" />,
      title: 'WhatsApp',
      desc: 'Cara tercepat untuk konsultasi dan order. Respon dalam hitungan menit.',
      action: 'Chat Sekarang',
      href: waUrl,
      highlight: true,
    },
    {
      icon: '📸',
      title: 'Instagram',
      desc: 'Lihat portofolio produksi terbaru dan update produk kami di Instagram.',
      action: 'Follow Kami',
      href: `https://instagram.com/${(COMPANY_INFO.instagram || '@upperink_id').replace('@', '')}`,
      highlight: false,
    },
    {
      icon: <img src={EMAIL_LOGO} alt="Email" className="w-10 h-10 object-contain" />,
      title: 'Email',
      desc: 'Untuk pertanyaan formal, kerjasama, atau inquiry dalam jumlah besar.',
      action: 'Kirim Email',
      href: `mailto:${COMPANY_INFO.email}`,
      highlight: false,
    },
  ];

  return (
    <div style={{ background: '#090909', fontFamily: HF }}>

      {/* ── HERO ─────────────────────────────────────────────── */}
      <section
        className="relative min-h-[65vh] flex items-center overflow-hidden"
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
        {/* Red glow bottom-left */}
        <div
          className="absolute bottom-0 left-0 w-[500px] h-[500px] pointer-events-none opacity-[0.07]"
          style={{ background: 'radial-gradient(circle, #ef2020 0%, transparent 70%)' }}
        />

        <div className="max-w-7xl mx-auto px-6 lg:px-10 w-full pt-36 pb-24" ref={heroRef}>
          <div className="animate-in" style={{ opacity: 0, transform: 'translateY(30px)', transition: 'all 0.7s ease' }}>
            <div className="flex items-center gap-3 mb-6">
              <span className="h-px w-8" style={{ background: '#ef2020' }} />
              <span className="text-[10px] tracking-[0.3em] uppercase" style={{ color: '#a0a0a0' }}>
                Hubungi Kami
              </span>
            </div>
          </div>

          <div className="animate-in" style={{ opacity: 0, transform: 'translateY(30px)', transition: 'all 0.7s ease' }}>
            <h1
              className="text-[52px] sm:text-[72px] lg:text-[96px] leading-none text-white mb-8"
              style={{ fontFamily: BEBAS, letterSpacing: '0.04em' }}
            >
              SIAP MEMBANTU
              <br />
              <span style={{ color: '#ef2020' }}>ANDA</span>
            </h1>
          </div>

          <div className="animate-in max-w-2xl" style={{ opacity: 0, transform: 'translateY(30px)', transition: 'all 0.7s ease' }}>
            <p className="text-zinc-400 text-lg leading-relaxed">
              Tim UPPERINK siap melayani Anda 6 hari seminggu. Konsultasikan kebutuhan konveksi Anda
              dan dapatkan penawaran terbaik secara gratis.
            </p>
          </div>
        </div>
      </section>

      {/* ── CHANNELS ─────────────────────────────────────────────── */}
      <section className="py-20" style={{ background: '#1A1819' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px" style={{ background: 'rgba(255,255,255,0.04)' }}>
            {channels.map(({ icon, title, desc, action, href, highlight }) => (
              <a
                key={title}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex flex-col p-8 lg:p-10 transition-all duration-300"
                style={{ background: highlight ? 'rgba(239,32,32,0.07)' : '#1A1819' }}
              >
                {/* Top border */}
                <div
                  className="absolute top-0 left-0 right-0 h-[2px] transition-transform duration-500 origin-left"
                  style={{ background: '#ef2020', transform: highlight ? 'scaleX(1)' : 'scaleX(0)' }}
                />
                <div
                  className="absolute top-0 left-0 right-0 h-[2px] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"
                  style={{ background: '#ef2020' }}
                />
                <div className="text-4xl mb-6 group-hover:scale-110 transition-transform duration-300 origin-left">
                  {icon}
                </div>
                <h3 className="text-zinc-50 font-bold text-lg uppercase tracking-wide mb-3">{title}</h3>
                <p className="text-sm leading-relaxed mb-6 flex-1" style={{ color: '#a0a0a0' }}>{desc}</p>
                <div className="flex items-center gap-2 text-xs uppercase tracking-widest" style={{ color: '#ef2020', fontWeight: 700 }}>
                  {action}
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── MAIN CONTACT ─────────────────────────────────────────────── */}
      <section className="py-24 relative overflow-hidden" style={{ background: '#090909' }}>
        <div
          className="absolute bottom-0 right-0 w-96 h-96 opacity-[0.04] pointer-events-none"
          style={{ background: 'radial-gradient(circle, #ef2020 0%, transparent 70%)' }}
        />
        <div className="max-w-7xl mx-auto px-6 lg:px-10 relative">
          <div className="grid lg:grid-cols-2 gap-16">

            {/* Left — Info */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="h-px w-8" style={{ background: '#ef2020' }} />
                <span className="text-[10px] tracking-[0.3em] uppercase" style={{ color: '#a0a0a0' }}>
                  Informasi Kontak
                </span>
              </div>
              <h2 className="text-4xl sm:text-5xl text-white mb-8" style={{ fontFamily: HF, fontWeight: 700, letterSpacing: '0.02em' }}>
                DETAIL<br />
                <span style={{ color: '#ef2020' }}>KONTAK KAMI</span>
              </h2>
              <p className="text-zinc-400 text-sm leading-relaxed mb-10 max-w-sm">
                Jangan ragu untuk menghubungi kami melalui salah satu kanal di bawah.
                Tim kami akan dengan senang hati membantu Anda.
              </p>

              {/* Contact list */}
              <div className="space-y-0 divide-y" style={{ borderColor: 'rgba(255,255,255,0.07)' }}>
                {contacts.map(({ Icon, label, value, href, color, customIcon }) => (
                  <div key={label} className="flex items-center gap-5 py-5 group">
                    <div
                      className="w-12 h-12 flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:border-opacity-80"
                      style={{ border: '2px solid rgba(255,255,255,0.12)' }}
                    >
                      {customIcon
                        ? <img src={customIcon} alt={label} className="w-7 h-7 object-contain" />
                        : <Icon className="w-5 h-5 transition-colors duration-300" style={{ color }} />
                      }
                    </div>
                    <div>
                      <div className="text-[10px] uppercase tracking-[0.2em] mb-0.5" style={{ color: '#a0a0a0' }}>
                        {label}
                      </div>
                      {href ? (
                        <a
                          href={href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm hover:text-white transition-colors"
                          style={{ color: '#ffffff' }}
                        >
                          {value}
                        </a>
                      ) : (
                        <span className="text-sm" style={{ color: '#ffffff' }}>{value}</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right — WhatsApp CTA + Map */}
            <div className="space-y-6">
              {/* WhatsApp Card */}
              <div className="relative overflow-hidden" style={{ background: 'rgba(22, 163, 74, 0.08)', border: '1px solid rgba(22,163,74,0.2)' }}>
                <div className="absolute top-0 left-0 right-0 h-[2px]" style={{ background: '#16a34a' }} />
                <div className="p-8">
                  <div className="flex items-start gap-5">
                    <div className="w-14 h-14 rounded-full overflow-hidden flex-shrink-0">
                      <img src={WA_LOGO} alt="WhatsApp" className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-white font-bold text-lg uppercase tracking-wide mb-2">
                        Chat via WhatsApp
                      </h3>
                      <p className="text-zinc-400 text-sm leading-relaxed mb-5">
                        Cara paling cepat & mudah untuk konsultasi dan order. Kami biasanya membalas dalam beberapa menit.
                      </p>
                      <a
                        href={waUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-3 px-6 py-3 text-white text-sm uppercase tracking-widest transition-all duration-300 hover:opacity-90"
                        style={{ fontFamily: HF, fontWeight: 700, background: '#16a34a', borderRadius: 0 }}
                      >
                        <img src={WA_LOGO} alt="WhatsApp" className="w-5 h-5 object-contain rounded-full" />
                        Chat Sekarang
                      </a>
                    </div>
                  </div>
                  <div className="mt-6 pt-6 border-t flex items-center gap-2" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
                    <div className="w-1.5 h-1.5 rounded-full animate-pulse bg-green-400" />
                    <span className="text-xs uppercase tracking-widest" style={{ color: '#a0a0a0' }}>
                      Online · Senin–Sabtu 08.00–17.00 WIB
                    </span>
                  </div>
                </div>
              </div>

              {/* Quick info boxes */}
              <div className="grid grid-cols-2 gap-px" style={{ background: 'rgba(255,255,255,0.04)' }}>
                {[
                  { label: 'Response Time', value: '< 30 Menit', icon: '⚡' },
                  { label: 'Min. Order', value: 'Mulai 12 Pcs', icon: '📦' },
                  { label: 'Produksi', value: '7–14 Hari', icon: '🏭' },
                  { label: 'Pengiriman', value: 'Seluruh Indonesia', icon: '🚚' },
                ].map(({ label, value, icon }) => (
                  <div key={label} className="p-6" style={{ background: '#090909' }}>
                    <div className="text-2xl mb-2">{icon}</div>
                    <div className="text-[10px] uppercase tracking-[0.2em] mb-1" style={{ color: '#a0a0a0' }}>{label}</div>
                    <div className="text-sm font-bold text-zinc-50">{value}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ─────────────────────────────────────────────── */}
      <section className="py-24 relative" style={{ background: '#1A1819' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Left header */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="h-px w-8" style={{ background: '#ef2020' }} />
                <span className="text-[10px] tracking-[0.3em] uppercase" style={{ color: '#a0a0a0' }}>
                  FAQ
                </span>
              </div>
              <h2 className="text-4xl sm:text-5xl text-white mb-6" style={{ fontFamily: HF, fontWeight: 700, letterSpacing: '0.02em' }}>
                PERTANYAAN<br />
                <span style={{ color: '#ef2020' }}>YANG SERING DITANYA</span>
              </h2>
              <p className="text-zinc-400 text-sm leading-relaxed max-w-sm">
                Tidak menemukan jawaban yang Anda cari? Hubungi kami langsung via WhatsApp.
              </p>
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-flex items-center gap-2 text-xs uppercase tracking-widest transition-colors hover:text-white"
                style={{ color: '#ef2020', fontWeight: 700 }}
              >
                Tanya Langsung
                <ArrowRight className="w-3 h-3" />
              </a>
            </div>

            {/* Right — Accordion */}
            <div className="space-y-0 divide-y" style={{ borderColor: 'rgba(255,255,255,0.07)' }}>
              {faqs.map(({ q, a }, i) => (
                <div key={i}>
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full flex items-start justify-between gap-4 py-6 text-left group"
                  >
                    <span
                      className="text-sm leading-relaxed group-hover:text-white transition-colors"
                      style={{ color: openFaq === i ? '#ffffff' : '#a0a0a0', fontWeight: openFaq === i ? 600 : 400 }}
                    >
                      {q}
                    </span>
                    <span
                      className="flex-shrink-0 w-6 h-6 border flex items-center justify-center transition-all duration-300 mt-0.5"
                      style={{
                        borderColor: openFaq === i ? '#ef2020' : 'rgba(255,255,255,0.15)',
                        color: openFaq === i ? '#ef2020' : '#a0a0a0',
                      }}
                    >
                      {openFaq === i ? '−' : '+'}
                    </span>
                  </button>
                  {openFaq === i && (
                    <div className="pb-6">
                      <p className="text-sm leading-relaxed" style={{ color: '#a0a0a0' }}>{a}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA BOTTOM ─────────────────────────────────────────────── */}
      <section className="py-20 relative overflow-hidden" style={{ background: '#ef2020' }}>
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.1]"
          style={{
            backgroundImage:
              'repeating-linear-gradient(0deg, #fff 0px, #fff 1px, transparent 1px, transparent 40px), repeating-linear-gradient(90deg, #fff 0px, #fff 1px, transparent 1px, transparent 40px)',
          }}
        />
        <div className="max-w-7xl mx-auto px-6 lg:px-10 relative flex flex-col sm:flex-row items-center justify-between gap-8">
          <div>
            <h2
              className="text-4xl sm:text-5xl text-white mb-2"
              style={{ fontFamily: BEBAS, letterSpacing: '0.06em' }}
            >
              KONSULTASI GRATIS SEKARANG
            </h2>
            <p className="text-white/70 text-sm">Tidak ada biaya, tidak ada kewajiban. Cukup ceritakan kebutuhan Anda.</p>
          </div>
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-shrink-0 inline-flex items-center gap-3 px-8 py-4 bg-white text-sm uppercase tracking-[0.12em] transition-all duration-300 hover:bg-zinc-100"
            style={{ fontFamily: HF, fontWeight: 700, color: '#ef2020', borderRadius: 0 }}
          >
            <img src={WA_LOGO} alt="WhatsApp" className="w-5 h-5 object-contain rounded-full" />
            Chat WhatsApp
          </a>
        </div>
      </section>

    </div>
  );
};

export default KontakPage;
