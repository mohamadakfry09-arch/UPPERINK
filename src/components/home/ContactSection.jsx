import React from 'react';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import { COMPANY_INFO } from '../../config/constants';
import WhatsAppIcon from '../common/WhatsAppIcon';

const HF = 'Helvetica, Arial, sans-serif';

// WhatsApp SVG (module scope)
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
      {/* Decorative glow */}
      <div
        className="absolute bottom-0 left-0 w-96 h-96 opacity-[0.04] pointer-events-none"
        style={{ background: 'radial-gradient(circle, #ef2020 0%, transparent 70%)' }}
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-10 relative">
        <div className="grid lg:grid-cols-2 gap-16 items-start">

          {/* Left — Info */}
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="h-px w-8" style={{ background: '#ef2020' }} />
              <span
                className="text-[10px] tracking-[0.3em] uppercase"
                style={{ fontFamily: HF, fontWeight: 400, color: '#a0a0a0' }}
              >Hubungi Kami</span>
            </div>

            <h2
              className="text-5xl sm:text-6xl text-zinc-50 mb-4"
              style={{ fontFamily: HF, fontWeight: 700, letterSpacing: '0.02em' }}
            >
              ADA PERTANYAAN?<br />
              <span style={{ color: '#ef2020' }}>KAMI SIAP</span>
            </h2>

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
                  <div
                    className="w-12 h-12 flex items-center justify-center flex-shrink-0"
                    style={{ border: '2px solid rgba(255,255,255,0.25)' }}
                  >
                    <Icon className="w-5 h-5" style={{ color: '#a0a0a0' }} />
                  </div>
                  <div>
                    <div
                      className="text-[10px] uppercase tracking-[0.2em] mb-0.5"
                      style={{ fontFamily: HF, fontWeight: 400, color: '#a0a0a0' }}
                    >{label}</div>
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
                      <span className="text-sm" style={{ fontFamily: HF, fontWeight: 400, color: '#ffffff' }}>{value}</span>
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
              }}
            >
              {/* WhatsApp Icon */}
              <div
                className="w-20 h-20 flex items-center justify-center mx-auto mb-6 rounded-full"
                style={{ background: '#fff', boxShadow: '0 0 0 4px rgba(37,211,102,0.25), 0 8px 24px rgba(37,211,102,0.2)' }}
              >
                <WhatsAppIcon className="w-12 h-12" />
              </div>

              <h3
                className="text-3xl text-zinc-50 mb-3"
                style={{ fontFamily: HF, fontWeight: 700, letterSpacing: '0.04em' }}
              >
                CHAT WHATSAPP
              </h3>

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
                  letterSpacing: '1.5px',
                }}
              >
                <span className="w-6 h-6 bg-white rounded-full flex items-center justify-center flex-shrink-0">
                  <WhatsAppIcon className="w-4 h-4" />
                </span>
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
