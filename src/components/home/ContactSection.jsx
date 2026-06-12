import React from 'react';
import { MapPin, Phone, Mail, Clock, MessageCircle } from 'lucide-react';
import { COMPANY_INFO } from '../../config/constants';

const ContactSection = () => {
  const waUrl = `https://wa.me/${COMPANY_INFO.whatsapp}?text=${encodeURIComponent('Halo UPPERINK, saya ingin bertanya tentang layanan konveksi Anda.')}`;

  const contacts = [
    { Icon: MapPin, label: 'Alamat', value: COMPANY_INFO.address, href: null },
    { Icon: Phone, label: 'WhatsApp', value: `+${COMPANY_INFO.whatsapp}`, href: waUrl },
    { Icon: Mail, label: 'Email', value: COMPANY_INFO.email, href: `mailto:${COMPANY_INFO.email}` },
    { Icon: Clock, label: 'Operasional', value: 'Senin – Sabtu, 08.00 – 17.00 WIB', href: null },
  ];

  return (
    <section
      id="kontak"
      className="py-24 relative overflow-hidden"
      style={{ background: '#1A1819' }}
    >
      {/* Decorative elements */}
      <div
        className="absolute bottom-0 left-0 w-96 h-96 opacity-[0.04] pointer-events-none"
        style={{ background: 'radial-gradient(circle, #810100 0%, transparent 70%)' }}
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-10 relative">

        <div className="grid lg:grid-cols-2 gap-16 items-start">

          {/* Left */}
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="h-px w-8 bg-cherry-500" />
              <span className="text-[10px] text-zinc-600 tracking-[0.3em] uppercase">Hubungi Kami</span>
            </div>
            <h2
              className="text-5xl sm:text-6xl text-zinc-50 mb-4"
              style={{ fontFamily: "'Bebas Neue', Impact, sans-serif", letterSpacing: '0.03em' }}
            >
              ADA PERTANYAAN?
              <br />
              <span style={{ color: '#810100' }}>KAMI SIAP</span>
            </h2>
            <p className="text-zinc-500 text-sm leading-relaxed mb-10 max-w-sm">
              Tim kami siap membantu Anda 6 hari seminggu. Konsultasikan kebutuhan konveksi Anda dan dapatkan penawaran terbaik.
            </p>

            {/* Contact List */}
            <div className="space-y-0 divide-y" style={{ borderColor: 'rgba(255,255,255,0.04)' }}>
              {contacts.map(({ Icon, label, value, href }) => (
                <div key={label} className="flex items-center gap-5 py-5 group">
                  <div
                    className="w-10 h-10 flex items-center justify-center flex-shrink-0 border transition-all duration-300 group-hover:border-cherry-500 group-hover:bg-cherry-500/10"
                    style={{ borderColor: 'rgba(255,255,255,0.08)' }}
                  >
                    <Icon className="w-4 h-4 text-cherry-500" />
                  </div>
                  <div>
                    <div className="text-[10px] text-zinc-700 uppercase tracking-[0.2em] mb-0.5">{label}</div>
                    {href ? (
                      <a
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-zinc-300 text-sm hover:text-zinc-50 transition-colors"
                      >
                        {value}
                      </a>
                    ) : (
                      <span className="text-zinc-300 text-sm">{value}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — WhatsApp CTA Card */}
          <div className="relative">
            {/* Red glow behind */}
            <div
              className="absolute inset-0 blur-3xl opacity-10 pointer-events-none"
              style={{ background: '#810100', borderRadius: '50%' }}
            />

            <div
              className="relative p-10 text-center"
              style={{
                background: 'rgba(9,9,9,0.8)',
                border: '1px solid rgba(255,255,255,0.06)',
                backdropFilter: 'blur(20px)',
                clipPath: 'polygon(0 0, calc(100% - 20px) 0, 100% 20px, 100% 100%, 20px 100%, 0 calc(100% - 20px))',
              }}
            >
              {/* Icon */}
              <div
                className="w-16 h-16 bg-green-600 flex items-center justify-center mx-auto mb-6"
                style={{ clipPath: 'polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px))' }}
              >
                <MessageCircle className="w-8 h-8 text-white" />
              </div>

              <h3
                className="text-3xl text-zinc-50 mb-3"
                style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '0.06em' }}
              >
                CHAT WHATSAPP
              </h3>
              <p className="text-zinc-500 text-sm leading-relaxed mb-8 max-w-xs mx-auto">
                Respon cepat dalam hitungan menit. Konsultasi gratis untuk semua kebutuhan konveksi Anda.
              </p>

              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 font-bold px-8 py-4 w-full justify-center text-white transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 text-sm tracking-wide uppercase"
                style={{ background: '#16a34a' }}
              >
                <MessageCircle className="w-5 h-5" />
                Chat Sekarang di WhatsApp
              </a>

              <p className="text-zinc-700 text-xs mt-5">Biasanya membalas dalam beberapa menit</p>

              {/* Bottom accent */}
              <div className="mt-8 pt-6 border-t flex items-center justify-center gap-2" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
                <div className="w-1.5 h-1.5 rounded-full bg-cherry-500 animate-pulse" />
                <span className="text-xs text-zinc-700 uppercase tracking-widest">Upperink — Available Now</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
