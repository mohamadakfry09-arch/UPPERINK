/**
 * Format tanggal ke string Indonesia
 */
export const formatDate = (dateString) => {
  if (!dateString) return '-';
  const date = new Date(dateString);
  return date.toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
};

export const formatDateShort = (dateString) => {
  if (!dateString) return '-';
  const date = new Date(dateString);
  return date.toLocaleDateString('id-ID', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
};

/**
 * Format angka ke Rupiah
 */
export const formatCurrency = (amount) => {
  if (!amount && amount !== 0) return '-';
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(amount);
};

/**
 * Format nomor WhatsApp untuk display
 */
export const formatWhatsApp = (number) => {
  if (!number) return '-';
  return number.replace(/(\d{2})(\d{4})(\d{4})(\d+)/, '+$1 $2-$3-$4');
};

/**
 * Truncate teks
 */
export const truncate = (text, maxLength = 50) => {
  if (!text) return '';
  return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
};

/**
 * Format file size
 */
export const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

/**
 * Get warna badge berdasarkan status
 */
export const getStatusColor = (status) => {
  const colors = {
    // Legacy Statuses
    'Menunggu Konfirmasi': 'badge-yellow',
    'DP Diterima': 'badge-blue',
    'Produksi': 'badge-orange',
    
    // New Production / Leads Statuses
    'Konsultasi': 'badge-gray',
    'Menunggu Detail Pesanan': 'badge-yellow',
    'Menunggu DP': 'badge-blue',
    'Pesanan Dikonfirmasi': 'badge-purple',
    'Desain Diproses': 'badge-purple',
    'Masuk Produksi': 'badge-orange',
    'Quality Control': 'badge-cyan',
    'Siap Dikirim / Diambil': 'badge-indigo',
    'Selesai': 'badge-green',
  };
  return colors[status] || 'badge-gray';
};
