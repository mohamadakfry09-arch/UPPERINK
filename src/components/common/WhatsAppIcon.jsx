import React from 'react';

const WhatsAppIcon = ({ className = "w-5 h-5" }) => (
  <img
    src="/whatsapp-logo-revised.jpg"
    alt="WhatsApp"
    className={`${className} object-cover rounded-full`}
    style={{ borderRadius: '50%' }}
  />
);

export default WhatsAppIcon;
