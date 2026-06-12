import { ALLOWED_EXTENSIONS, MAX_FILE_SIZE_BYTES, MAX_FILE_SIZE_MB } from '../config/constants';

/**
 * Validasi form order pelanggan
 */
export const validateOrderForm = (formData, step) => {
  const errors = {};

  if (step === 1 || step === 'all') {
    if (!formData.nama?.trim()) errors.nama = 'Nama lengkap wajib diisi';
    else if (formData.nama.trim().length < 3) errors.nama = 'Nama minimal 3 karakter';

    if (!formData.whatsapp?.trim()) errors.whatsapp = 'Nomor WhatsApp wajib diisi';
    else if (!/^(08|628)\d{8,11}$/.test(formData.whatsapp.trim()))
      errors.whatsapp = 'Format WhatsApp tidak valid (08xx atau 628xx)';

    if (!formData.alamat?.trim()) errors.alamat = 'Alamat lengkap wajib diisi';
    else if (formData.alamat.trim().length < 10) errors.alamat = 'Alamat terlalu singkat';

    if (!formData.metode_pengambilan) errors.metode_pengambilan = 'Pilih metode pengambilan';
  }

  if (step === 2 || step === 'all') {
    if (!formData.produk) errors.produk = 'Pilih jenis produk';
    if (!formData.bahan) errors.bahan = 'Pilih jenis bahan';
    if (!formData.warna?.trim()) errors.warna = 'Warna wajib diisi';
    if (!formData.ukuran) errors.ukuran = 'Pilih ukuran';

    if (!formData.jumlah) errors.jumlah = 'Jumlah pesanan wajib diisi';
    else if (isNaN(formData.jumlah) || Number(formData.jumlah) < 1)
      errors.jumlah = 'Jumlah minimal 1 pcs';
    else if (Number(formData.jumlah) > 10000)
      errors.jumlah = 'Jumlah maksimal 10.000 pcs';
  }

  return errors;
};

/**
 * Validasi file upload
 */
export const validateFile = (file) => {
  if (!file) return null;

  const extension = '.' + file.name.split('.').pop().toLowerCase();
  if (!ALLOWED_EXTENSIONS.includes(extension)) {
    return `Tipe file tidak diizinkan. Gunakan: ${ALLOWED_EXTENSIONS.join(', ')}`;
  }

  if (file.size > MAX_FILE_SIZE_BYTES) {
    return `Ukuran file terlalu besar. Maksimal ${MAX_FILE_SIZE_MB}MB`;
  }

  return null;
};

/**
 * Validasi login admin
 */
export const validateAdminLogin = (email, password) => {
  const errors = {};
  if (!email?.trim()) errors.email = 'Email wajib diisi';
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = 'Format email tidak valid';
  if (!password?.trim()) errors.password = 'Password wajib diisi';
  return errors;
};

/**
 * Format nomor WA ke format 62xxx
 */
export const normalizeWhatsApp = (number) => {
  if (!number) return '';
  const cleaned = number.replace(/\D/g, '');
  if (cleaned.startsWith('0')) return '62' + cleaned.substring(1);
  if (cleaned.startsWith('62')) return cleaned;
  return '62' + cleaned;
};
