// Kategori produk
export const PRODUCT_CATEGORIES = [
  { id: 'kaos', label: 'Kaos Custom', icon: '👕' },
  { id: 'kemeja', label: 'Kemeja', icon: '👔' },
  { id: 'hoodie', label: 'Hoodie', icon: '🧥' },
  { id: 'jaket', label: 'Jaket', icon: '🧣' },
  { id: 'seragam', label: 'Seragam', icon: '👗' },
  { id: 'polo', label: 'Polo Shirt', icon: '🎽' },
  { id: 'totebag', label: 'Tote Bag', icon: '👜' },
  { id: 'merchandise', label: 'Merchandise', icon: '🎁' },
];

// Status pesanan / produksi
export const ORDER_STATUS = {
  KONSULTASI: 'Konsultasi',
  MENUNGGU_DETAIL: 'Menunggu Detail Pesanan',
  MENUNGGU_DP: 'Menunggu DP',
  PESANAN_DIKONFIRMASI: 'Pesanan Dikonfirmasi',
  DESAIN_DIPROSES: 'Desain Diproses',
  MASUK_PRODUKSI: 'Masuk Produksi',
  QUALITY_CONTROL: 'Quality Control',
  SIAP_DIKIRIM: 'Siap Dikirim / Diambil',
  SELESAI: 'Selesai',
};

export const ORDER_STATUS_LIST = [
  { key: 'Konsultasi', label: 'Konsultasi', color: 'gray', step: 1 },
  { key: 'Menunggu Detail Pesanan', label: 'Menunggu Detail Pesanan', color: 'yellow', step: 2 },
  { key: 'Menunggu DP', label: 'Menunggu DP', color: 'blue', step: 3 },
  { key: 'Pesanan Dikonfirmasi', label: 'Pesanan Dikonfirmasi', color: 'purple', step: 4 },
  { key: 'Desain Diproses', label: 'Desain Diproses', color: 'purple', step: 5 },
  { key: 'Masuk Produksi', label: 'Masuk Produksi', color: 'orange', step: 6 },
  { key: 'Quality Control', label: 'Quality Control', color: 'cyan', step: 7 },
  { key: 'Siap Dikirim / Diambil', label: 'Siap Dikirim / Diambil', color: 'indigo', step: 8 },
  { key: 'Selesai', label: 'Selesai', color: 'green', step: 9 },
];

// Jenis bahan
export const BAHAN_OPTIONS = [
  'Cotton Combed 30s',
  'Cotton Combed 24s',
  'Cotton Bamboo',
  'Polyester',
  'Drifit',
  'Fleece',
  'Polar',
  'Kanvas',
  'Oxford',
  'Lainnya',
];

// Ukuran
export const UKURAN_OPTIONS = ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL', 'Custom'];

// Metode pengambilan
export const METODE_PENGAMBILAN = [
  { value: 'kirim', label: 'Kirim (via ekspedisi)' },
  { value: 'ambil', label: 'Ambil di Tempat' },
];

// File upload constraints
export const ALLOWED_FILE_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'application/pdf',
  'application/illustrator',
  'image/vnd.adobe.photoshop',
  'application/x-photoshop',
  'application/octet-stream',
];
export const ALLOWED_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.pdf', '.ai', '.psd'];
export const MAX_FILE_SIZE_MB = 10;
export const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;

// Admin token key
export const ADMIN_TOKEN_KEY = 'upperink_admin_token';

// Company info
export const COMPANY_INFO = {
  name: import.meta.env.VITE_COMPANY_NAME || 'UPPERINK',
  tagline: import.meta.env.VITE_COMPANY_TAGLINE || 'Konveksi Baju Berkualitas Tinggi',
  address: import.meta.env.VITE_COMPANY_ADDRESS || 'Jl. Contoh No. 123',
  whatsapp: import.meta.env.VITE_WA_ADMIN || '6281234567890',
  email: 'admin@UPPERINK.id',
  instagram: '@upperink_id',
};

export const COMPANY = COMPANY_INFO;

export const buildWhatsAppUrl = (product) => {
  const number = COMPANY_INFO.whatsapp.replace(/\D/g, '');
  const formatPrice = (harga) => {
    if (!harga) return 'Rp —';
    return `Rp ${Number(harga).toLocaleString('id-ID')}`;
  };
  const text = `Halo Admin, saya tertarik dengan produk:

Nama Produk: ${product.nama_produk}
Harga: ${formatPrice(product.harga_estimasi || product.harga)}

Saya ingin konsultasi dan melakukan pemesanan.

Terima kasih.`;

  return `https://wa.me/${number}?text=${encodeURIComponent(text)}`;
};

