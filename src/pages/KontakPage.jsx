import React, { useEffect, useRef, useState } from 'react';
import { MapPin, Phone, Mail, Clock, Camera, ArrowRight } from 'lucide-react';
import { COMPANY_INFO } from '../config/constants';

const HF = 'Helvetica, Arial, sans-serif';
const BEBAS = "'Bebas Neue', Impact, sans-serif";

// ── FAQ DATA ──────────────────────────────────────────────────────────────────
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

// ── SVG ICONS (module scope — NEVER define components inside render) ───────────
const WaSvg = ({ size = 40, style = {} }) => (
  <svg fill="none" viewBox="0 0 360 362" width={size} height={size} style={style} xmlns="http://www.w3.org/2000/svg">
    <path
      fill="#25D366"
      fillRule="evenodd"
      d="M307.546 52.566C273.709 18.684 228.706.017 180.756 0 81.951 0 1.538 80.404 1.504 179.235c-.017 31.594 8.242 62.432 23.928 89.609L0 361.736l95.024-24.925c26.179 14.285 55.659 21.805 85.655 21.814h.077c98.788 0 179.21-80.413 179.244-179.244.017-47.898-18.608-92.926-52.454-126.807v-.008Zm-126.79 275.788h-.06c-26.73-.008-52.952-7.194-75.831-20.765l-5.44-3.231-56.391 14.791 15.05-54.981-3.542-5.638c-14.912-23.721-22.793-51.139-22.776-79.286.035-82.14 66.867-148.973 149.051-148.973 39.793.017 77.198 15.53 105.328 43.695 28.131 28.157 43.61 65.596 43.593 105.398-.035 82.149-66.867 148.982-148.982 148.982v.008Zm81.719-111.577c-4.478-2.243-26.497-13.073-30.606-14.568-4.108-1.496-7.09-2.243-10.073 2.243-2.982 4.487-11.568 14.577-14.181 17.559-2.613 2.991-5.226 3.361-9.704 1.117-4.477-2.243-18.908-6.97-36.02-22.226-13.313-11.878-22.304-26.54-24.916-31.027-2.613-4.486-.275-6.91 1.959-9.136 2.011-2.011 4.478-5.234 6.721-7.847 2.244-2.613 2.983-4.486 4.478-7.469 1.496-2.991.748-5.603-.369-7.847-1.118-2.243-10.073-24.289-13.812-33.253-3.636-8.732-7.331-7.546-10.073-7.692-2.613-.13-5.595-.155-8.586-.155-2.991 0-7.839 1.118-11.947 5.604-4.108 4.486-15.677 15.324-15.677 37.361s16.047 43.344 18.29 46.335c2.243 2.991 31.585 48.225 76.51 67.632 10.684 4.615 19.029 7.374 25.535 9.437 10.727 3.412 20.49 2.931 28.208 1.779 8.604-1.289 26.498-10.838 30.228-21.298 3.73-10.46 3.73-19.433 2.613-21.298-1.117-1.865-4.108-2.991-8.586-5.234l.008-.017Z"
      clipRule="evenodd"
    />
  </svg>
);

const GmailSvg = ({ size = 40 }) => (
  <svg viewBox="0 49.4 512 399.42" width={size} height={size} xmlns="http://www.w3.org/2000/svg">
    <g fill="none" fillRule="evenodd">
      <g fillRule="nonzero">
        <path fill="#4285f4" d="M34.91 448.818h81.454V251L0 163.727V413.91c0 19.287 15.622 34.91 34.91 34.91z" />
        <path fill="#34a853" d="M395.636 448.818h81.455c19.287 0 34.909-15.622 34.909-34.909V163.727L395.636 251z" />
        <path fill="#fbbc04" d="M395.636 99.727V251L512 163.727v-46.545c0-43.142-49.25-67.782-83.782-41.891z" />
      </g>
      <path fill="#ea4335" d="M116.364 251V99.727L256 204.455 395.636 99.727V251L256 355.727z" />
      <path fill="#c5221f" fillRule="nonzero" d="M0 117.182v46.545L116.364 251V99.727L83.782 75.291C49.25 49.4 0 74.04 0 117.18z" />
    </g>
  </svg>
);

const InstagramSvg = ({ size = 40 }) => (
  <svg viewBox="0 0 512 512" width={size} height={size} xmlns="http://www.w3.org/2000/svg">
    <defs>
      <radialGradient id="ig-grad-kontak" cx="30%" cy="107%" r="150%">
        <stop offset="0%" stopColor="#fdf497" />
        <stop offset="5%" stopColor="#fdf497" />
        <stop offset="45%" stopColor="#fd5949" />
        <stop offset="60%" stopColor="#d6249f" />
        <stop offset="90%" stopColor="#285AEB" />
      </radialGradient>
    </defs>
    <rect width="512" height="512" rx="115" fill="url(#ig-grad-kontak)" />
    <rect x="130" y="130" width="252" height="252" rx="72" fill="none" stroke="#fff" strokeWidth="36" />
    <circle cx="256" cy="256" r="72" fill="none" stroke="#fff" strokeWidth="36" />
    <circle cx="347" cy="165" r="22" fill="#fff" />
  </svg>
);

// ── PAGE COMPONENT ─────────────────────────────────────────────────────────────
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
      svg: <GmailSvg size={24} />,
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
      svg: <InstagramSvg size={24} />,
    },
  ];

  const channels = [
    {
      svg: <WaSvg size={40} />,
      title: 'WhatsApp',
      desc: 'Cara tercepat untuk konsultasi dan order. Respon dalam hitungan menit.',
      action: 'Chat Sekarang',
      href: waUrl,
      highlight: true,
    },
    {
      svg: <InstagramSvg size={40} />,
      title: 'Instagram',
      desc: 'Lihat portofolio produksi terbaru dan update produk kami di Instagram.',
      action: 'Follow Kami',
      href: `https://instagram.com/${(COMPANY_INFO.instagram || '@upperink_id').replace('@', '')}`,
      highlight: false,
    },
    {
      svg: <GmailSvg size={40} />,
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
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.025]"
          style={{
            backgroundImage:
              'repeating-linear-gradient(0deg,#fff 0,#fff 1px,transparent 1px,transparent 60px),repeating-linear-gradient(90deg,#fff 0,#fff 1px,transparent 1px,transparent 60px)',
          }}
        />
        <div
          className="absolute bottom-0 left-0 w-[500px] h-[500px] pointer-events-none opacity-[0.07]"
          style={{ background: 'radial-gradient(circle,#ef2020 0%,transparent 70%)' }}
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
            {channels.map(({ svg, title, desc, action, href, highlight }) => (
              <a
                key={title}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex flex-col p-8 lg:p-10 transition-all duration-300"
                style={{ background: highlight ? 'rgba(239,32,32,0.07)' : '#1A1819' }}
              >
                <div
                  className="absolute top-0 left-0 right-0 h-[2px] transition-transform duration-500 origin-left"
                  style={{ background: '#ef2020', transform: highlight ? 'scaleX(1)' : 'scaleX(0)' }}
                />
                <div
                  className="absolute top-0 left-0 right-0 h-[2px] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"
                  style={{ background: '#ef2020' }}
                />
                <div className="mb-6 group-hover:scale-110 transition-transform duration-300 origin-left" style={{ width: 40, height: 40 }}>
                  {svg}
                </div>
                <h3 className="text-zinc-50 font-bold text-lg uppercase tracking-wide mb-3">{title}</h3>
                <p className="text-sm leading-relaxed mb-6 flex-1" style={{ color: '#a0a0a0' }}>{desc}</p>
                <div className="flex items-center gap-2 text-xs uppercase tracking-widest" style={{ color: '#ffffff', fontWeight: 700 }}>
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
          style={{ background: 'radial-gradient(circle,#ef2020 0%,transparent 70%)' }}
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
              <h2 className="text-4xl sm:text-5xl text-white mb-8" style={{ fontWeight: 700, letterSpacing: '0.02em' }}>
                DETAIL<br />
                <span style={{ color: '#ef2020' }}>KONTAK KAMI</span>
              </h2>
              <p className="text-zinc-400 text-sm leading-relaxed mb-10 max-w-sm">
                Jangan ragu untuk menghubungi kami melalui salah satu kanal di bawah.
                Tim kami akan dengan senang hati membantu Anda.
              </p>

              <div className="space-y-0 divide-y" style={{ borderColor: 'rgba(255,255,255,0.07)' }}>
                {contacts.map(({ Icon, label, value, href, color, svg }) => (
                  <div key={label} className="flex items-center gap-5 py-5 group">
                    <div
                      className="w-12 h-12 flex items-center justify-center flex-shrink-0"
                      style={{ border: '2px solid rgba(255,255,255,0.12)' }}
                    >
                      {svg
                        ? svg
                        : <Icon className="w-5 h-5" style={{ color }} />
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

            {/* Right — WhatsApp CTA + Maps */}
            <div className="space-y-6">

              {/* WhatsApp Card */}
              <div className="relative overflow-hidden" style={{ background: 'rgba(22,163,74,0.08)', border: '1px solid rgba(22,163,74,0.2)' }}>
                <div className="absolute top-0 left-0 right-0 h-[2px]" style={{ background: '#16a34a' }} />
                <div className="p-8">
                  <div className="flex items-start gap-5">
                    <div
                      className="w-14 h-14 rounded-full flex-shrink-0 flex items-center justify-center"
                      style={{ background: 'rgba(37,211,102,0.15)' }}
                    >
                      <WaSvg size={44} />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-white font-bold text-lg uppercase tracking-wide mb-2">
                        Chat via WhatsApp
                      </h3>
                      <p className="text-zinc-400 text-sm leading-relaxed mb-5">
                        Cara paling cepat &amp; mudah untuk konsultasi dan order. Kami biasanya membalas dalam beberapa menit.
                      </p>
                      <a
                        href={waUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-3 px-6 py-3 text-white text-sm uppercase tracking-widest transition-all duration-300 hover:opacity-90"
                        style={{ fontWeight: 700, background: '#16a34a' }}
                      >
                        <WaSvg size={20} />
                        Chat Sekarang
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Google Maps Embed */}
              <div className="relative overflow-hidden" style={{ border: '1px solid rgba(255,255,255,0.08)' }}>
                <div className="absolute top-0 left-0 right-0 h-[2px]" style={{ background: '#ef2020' }} />
                <div className="p-4 pb-0" style={{ background: '#0d0d0d' }}>
                  <div className="flex items-center gap-2 mb-3">
                    <MapPin className="w-3.5 h-3.5 flex-shrink-0" style={{ color: '#ef2020' }} />
                    <span className="text-[10px] uppercase tracking-[0.25em]" style={{ color: '#a0a0a0' }}>
                      Lokasi Kami
                    </span>
                  </div>
                </div>
                <iframe
                  title="Lokasi UPPERINK"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3960.2!2d108.4755!3d-6.9822!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e6f3b3b3b3b3b3b%3A0x0!2sSukamulya%2C%20Kec.%20Cigugur%2C%20Kabupaten%20Kuningan%2C%20Jawa%20Barat!5e0!3m2!1sid!2sid!4v1000000000000!5m2!1sid!2sid&q=Sebrang+Masjid+Ar+Rahman,+Sukamulya,+Kec.+Cigugur,+Kabupaten+Kuningan,+Jawa+Barat+45552"
                  width="100%"
                  height="240"
                  style={{ border: 0, display: 'block', filter: 'grayscale(0.3) invert(0.9) hue-rotate(180deg)' }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
                <div className="p-4" style={{ background: '#0d0d0d' }}>
                  <p className="text-xs leading-relaxed" style={{ color: '#a0a0a0' }}>
                    Sebrang Masjid Ar Rahman, Sukamulya, Kec. Cigugur,<br />
                    Kabupaten Kuningan, Jawa Barat 45552
                  </p>
                  <a
                    href="https://maps.google.com/?q=Sebrang+Masjid+Ar+Rahman,+Sukamulya,+Kec.+Cigugur,+Kabupaten+Kuningan,+Jawa+Barat+45552"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 mt-3 text-[10px] uppercase tracking-widest transition-colors hover:text-white"
                    style={{ color: '#ef2020', fontWeight: 700 }}
                  >
                    <MapPin className="w-3 h-3" />
                    Buka di Google Maps
                  </a>
                </div>
              </div>
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
              'repeating-linear-gradient(0deg,#fff 0,#fff 1px,transparent 1px,transparent 40px),repeating-linear-gradient(90deg,#fff 0,#fff 1px,transparent 1px,transparent 40px)',
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
            style={{ fontWeight: 700, color: '#ef2020' }}
          >
            <WaSvg size={20} />
            Chat WhatsApp
          </a>
        </div>
      </section>

    </div>
  );
};

export default KontakPage;
