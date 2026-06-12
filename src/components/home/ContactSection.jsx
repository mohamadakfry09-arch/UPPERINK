import React from 'react';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import { COMPANY_INFO } from '../../config/constants';
import WhatsAppIcon from '../common/WhatsAppIcon';

const HF = 'Helvetica, Arial, sans-serif';

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
        style={{ background: 'radial-gradient(circle, #ef2020 0%, transparent 70%)' }}
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-10 relative">
        <div className="grid lg:grid-cols-2 gap-16 items-start">

          {/* Left */}
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="h-px w-8" style={{ background: '#ef2020' }} />
              <span
                className="text-[10px] tracking-[0.3em] uppercase"
                style={{ fontFamily: HF, fontWeight: 400, color: '#a0a0a0' }}
              >Hubungi Kami</span>
            </div>

            {/* Headline */}
            <h2
              className="text-5xl sm:text-6xl text-zinc-50 mb-4"
              style={{ fontFamily: HF, fontWeight: 700, letterSpacing: '0.02em' }}
            >
              ADA PERTANYAAN?<br />
              <span style={{ color: '#ef2020' }}>KAMI SIAP</span>
            </h2>

            {/* Subheadline */}
            <p
              className="text-sm leading-relaxed mb-10 max-w-sm"
              style={{ fontFamily: HF, fontWeight: 400, color: '#a0a0a0' }}
            >
              Tim kami siap membantu Anda 6 hari seminggu. Konsultasikan kebutuhan konveksi Anda dan dapatkan penawaran terbaik.
            </p>

            {/* Contact List */}
            <div className="space-y-0 divide-y" style={{ borderColor: 'rgba(255,255,255,0.07)' }}>
              {contacts.map(({ Icon, label, value, href }) => (
                <div key={label} className="flex items-center gap-5 py-5 group">
                  {/* Icon box — white border, larger */}
                  <div
                    className="w-12 h-12 flex items-center justify-center flex-shrink-0 transition-all duration-300"
                    style={{
                      border: '2px solid rgba(255,255,255,0.25)',
                      borderRadius: 0,
                    }}
                  >
                    <Icon className="w-5 h-5" style={{ color: '#a0a0a0' }} />
                  </div>
                  <div>
                    {/* Label */}
                    <div
                      className="text-[10px] uppercase tracking-[0.2em] mb-0.5"
                      style={{ fontFamily: HF, fontWeight: 400, color: '#a0a0a0' }}
                    >{label}</div>
                    {/* Value */}
                    {href ? (
                      <a
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm hover:text-white transition-colors"
                        style={{ fontFamily: HF, fontWeight: 400, color: '#ffffff' }}
                      >
                        {value}
                      </a>
                    ) : (
                      <span
                        className="text-sm"
                        style={{ fontFamily: HF, fontWeight: 400, color: '#ffffff' }}
                      >{value}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — WhatsApp CTA Card */}
          <div className="relative">
            {/* Glow */}
            <div
              className="absolute inset-0 blur-3xl opacity-10 pointer-events-none"
              style={{ background: '#ef2020', borderRadius: '50%' }}
            />

            <div
              className="relative p-10 text-center"
              style={{
                background: 'rgba(9,9,9,0.85)',
                border: '1px solid rgba(255,255,255,0.08)',
                backdropFilter: 'blur(20px)',
                borderRadius: 0,
              }}
            >
              {/* WhatsApp Icon */}
              <div
                className="w-16 h-16 bg-green-600 flex items-center justify-center mx-auto mb-6 rounded-full"
                style={{ borderRadius: '50%' }}
              >
                <WhatsAppIcon className="w-8 h-8 text-white" />
              </div>

              {/* Chat heading */}
              <h3
                className="text-3xl text-zinc-50 mb-3"
                style={{ fontFamily: HF, fontWeight: 700, letterSpacing: '0.04em' }}
              >
                CHAT WHATSAPP
              </h3>

              {/* Chat subheadline */}
              <p
                className="text-sm leading-relaxed mb-8 max-w-xs mx-auto"
                style={{ fontFamily: HF, fontWeight: 400, color: '#a0a0a0' }}
              >
                Respon cepat dalam hitungan menit. Konsultasi gratis untuk semua kebutuhan konveksi Anda.
              </p>

              {/* CTA Button */}
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-8 py-4 w-full justify-center text-white transition-all duration-300 hover:opacity-90 hover:-translate-y-0.5 text-sm uppercase"
                style={{
                  fontFamily: HF,
                  fontWeight: 700,
                  background: '#16a34a',
                  borderRadius: 0,
                  letterSpacing: '1.5px',
                }}
              >
                <WhatsAppIcon className="w-5 h-5 text-white" />
                Chat Sekarang di WhatsApp
              </a>

              <p
                className="text-xs mt-5"
                style={{ fontFamily: HF, fontWeight: 400, color: '#a0a0a0' }}
              >Biasanya membalas dalam beberapa menit</p>

              {/* Bottom accent */}
              <div className="mt-8 pt-6 border-t flex items-center justify-center gap-2" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
                <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: '#ef2020' }} />
                <span
                  className="text-xs uppercase tracking-widest"
                  style={{ fontFamily: HF, fontWeight: 400, color: '#a0a0a0' }}
                >Upperink — Available Now</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ContactSection;
