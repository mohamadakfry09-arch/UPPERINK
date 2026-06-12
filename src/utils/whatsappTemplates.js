/**
 * Templating helper for WhatsApp Messages
 */

export const buildWhatsAppUrl = (phoneNumber, text) => {
  const cleanPhone = String(phoneNumber).replace(/\D/g, '');
  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(text)}`;
};

export const getConfirmationText = (productName) => {
  return `Halo Kak, terima kasih sudah menghubungi kami.

Pesanan / konsultasi produk:
${productName}

Sudah kami terima.
Silakan kirim detail pesanan seperti:

* Ukuran
* Jumlah
* Warna
* Desain / logo
* Alamat pengiriman

Kami akan bantu hitungkan estimasi harga dan waktu produksi.

Terima kasih.`;
};

export const getUpdateProductionText = (customerName, productName, productionStatus, adminNotes) => {
  const notesText = adminNotes ? `\nCatatan:\n${adminNotes}` : '';
  return `Halo Kak ${customerName},

Update pesanan Anda:
Produk: ${productName}
Status: ${productionStatus}
${notesText}

Terima kasih sudah mempercayakan pesanan konveksi kepada kami.`;
};
