/**
 * Generate nomor order unik: ORD-YYYYMMDD-XXX
 * XXX berdasarkan random 3 digit untuk uniqueness
 */
export const generateOrderId = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const random = String(Math.floor(Math.random() * 900) + 100);
  return `ORD-${year}${month}${day}-${random}`;
};

/**
 * Buat pesan WhatsApp otomatis untuk admin
 */
export const buildWhatsAppMessage = (orderData) => {
  const {
    order_id, nama, whatsapp, alamat,
    produk, bahan, warna, ukuran, jumlah,
    metode_pengambilan, catatan,
  } = orderData;

  const lines = [
    `🧵 *ORDER BARU - UPPERINK*`,
    ``,
    `📋 *Nomor Order:* ${order_id}`,
    `👤 *Nama:* ${nama}`,
    `📱 *WhatsApp:* ${whatsapp}`,
    `📍 *Alamat:* ${alamat}`,
    ``,
    `👕 *Detail Produk:*`,
    `• Jenis: ${produk}`,
    `• Bahan: ${bahan}`,
    `• Warna: ${warna}`,
    `• Ukuran: ${ukuran}`,
    `• Jumlah: ${jumlah} pcs`,
    ``,
    `🚚 *Metode:* ${metode_pengambilan === 'kirim' ? 'Kirim via Ekspedisi' : 'Ambil di Tempat'}`,
    catatan ? `📝 *Catatan:* ${catatan}` : '',
    ``,
    `Mohon konfirmasi pesanan dan informasi DP. Terima kasih! 🙏`,
  ].filter(Boolean).join('\n');

  return encodeURIComponent(lines);
};

/**
 * Buka WhatsApp dengan pesan otomatis
 */
export const openWhatsApp = (phoneNumber, message) => {
  const url = `https://wa.me/${phoneNumber}?text=${message}`;
  window.open(url, '_blank');
};
