import React, { useState, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import {
  User, Phone, MapPin, Package, Layers, Palette,
  Ruler, Hash, FileText, Truck, Upload, X, CheckCircle,
  ChevronRight, ChevronLeft, MessageCircle, ClipboardList
} from 'lucide-react';
import { PRODUCT_CATEGORIES, BAHAN_OPTIONS, UKURAN_OPTIONS, METODE_PENGAMBILAN } from '../config/constants';
import { validateOrderForm, validateFile, normalizeWhatsApp } from '../utils/validators';
import { generateOrderId, buildWhatsAppMessage, openWhatsApp } from '../utils/orderUtils';
import { createOrder } from '../services/orderService';
import { COMPANY_INFO } from '../config/constants';
import { formatFileSize } from '../utils/formatters';
import WhatsAppIcon from '../components/common/WhatsAppIcon';

// Step Indicator — Dark luxury style
const StepIndicator = ({ current, steps }) => (
  <div className="flex items-center justify-center mb-12">
    {steps.map((step, i) => (
      <React.Fragment key={step.id}>
        <div className="flex flex-col items-center">
          <div className={`w-10 h-10 rounded-none flex items-center justify-center font-bold text-sm transition-all duration-300 ${
            i < current ? 'bg-green-600 text-white' :
            i === current ? 'bg-[#810100] text-zinc-50 ring-4 ring-[#810100]/20' :
            'bg-zinc-800 text-zinc-500'
          }`}
          style={{ clipPath: 'polygon(0 0, calc(100% - 6px) 0, 100% 6px, 100% 100%, 6px 100%, 0 calc(100% - 6px))' }}
          >
            {i < current ? <CheckCircle className="w-5 h-5" /> : i + 1}
          </div>
          <span className={`text-[10px] tracking-wider uppercase mt-2 font-medium hidden sm:block ${
            i === current ? 'text-zinc-50 font-bold' : 'text-zinc-500'
          }`}>{step.label}</span>
        </div>
        {i < steps.length - 1 && (
          <div className={`flex-1 h-[2px] mx-2 transition-colors duration-300 ${i < current ? 'bg-green-600' : 'bg-zinc-800'}`} />
        )}
      </React.Fragment>
    ))}
  </div>
);

// Form Fields — Dark styling wrapper
const FormField = ({ label, error, required, children }) => (
  <div className="space-y-1.5">
    <label className="form-label text-xs font-semibold text-zinc-400 tracking-wider uppercase">
      {label} {required && <span className="text-cherry-500">*</span>}
    </label>
    {children}
    {error && (
      <p className="text-red-500 text-xs mt-1.5 flex items-center gap-1">
        <X className="w-3 h-3" />{error}
      </p>
    )}
  </div>
);

const STEPS = [
  { id: 1, label: 'Info Pelanggan' },
  { id: 2, label: 'Detail Produk' },
  { id: 3, label: 'Konfirmasi' },
];

const INITIAL_FORM = {
  nama: '', whatsapp: '', alamat: '', metode_pengambilan: '',
  produk: '', bahan: '', warna: '', ukuran: '', jumlah: '', catatan: '',
};

const OrderPage = () => {
  const [searchParams] = useSearchParams();
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({
    ...INITIAL_FORM,
    produk: searchParams.get('produk') || '',
  });
  const [errors, setErrors] = useState({});
  const [file, setFile] = useState(null);
  const [fileError, setFileError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [orderId, setOrderId] = useState('');
  const fileRef = useRef();

  const update = (field, value) => {
    setForm((f) => ({ ...f, [field]: value }));
    if (errors[field]) setErrors((e) => ({ ...e, [field]: '' }));
  };

  const handleFile = (e) => {
    const f = e.target.files[0];
    if (!f) return;
    const err = validateFile(f);
    if (err) { setFileError(err); return; }
    setFile(f);
    setFileError('');
  };

  const nextStep = () => {
    const errs = validateOrderForm(form, step + 1);
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setStep((s) => s + 1);
    window.scrollTo(0, 0);
  };

  const prevStep = () => setStep((s) => s - 1);

  const handleSubmit = async () => {
    const errs = validateOrderForm(form, 'all');
    if (Object.keys(errs).length) { setErrors(errs); setStep(0); return; }

    setSubmitting(true);
    const newOrderId = generateOrderId();
    const orderData = {
      ...form,
      order_id: newOrderId,
      tanggal: new Date().toISOString().split('T')[0],
      whatsapp: normalizeWhatsApp(form.whatsapp),
      status: 'Menunggu Konfirmasi',
      catatan_admin: '',
    };

    // Convert file to base64 if present
    let fileBase64 = null;
    if (file) {
      fileBase64 = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = (e) => resolve({ name: file.name, data: e.target.result });
        reader.readAsDataURL(file);
      });
    }

    try {
      await createOrder(orderData, fileBase64);
      setOrderId(newOrderId);
      setSubmitted(true);
    } catch (err) {
      toast.error('Gagal mengirim order. Silakan coba lagi.');
    } finally {
      setSubmitting(false);
    }
  };

  const sendToWhatsApp = () => {
    const orderData = {
      ...form,
      order_id: orderId,
      whatsapp: normalizeWhatsApp(form.whatsapp),
    };
    const msg = buildWhatsAppMessage(orderData);
    openWhatsApp(COMPANY_INFO.whatsapp, msg);
  };

  // ===== SUCCESS SCREEN =====
  if (submitted) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center p-4" style={{ background: '#090909' }}>
        <div 
          className="max-w-lg w-full p-8 text-center animate-fade-in-up border border-zinc-800"
          style={{ background: '#1A1819' }}
        >
          <div className="w-16 h-16 bg-green-950/20 border border-green-500/30 flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-8 h-8 text-green-500" />
          </div>
          <h2 className="text-3xl font-display tracking-widest text-zinc-50 mb-3" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
            ORDER BERHASIL!
          </h2>
          <p className="text-zinc-400 text-sm leading-relaxed mb-6">
            Pesanan Anda telah diterima di sistem kami. Silakan konfirmasi ke admin via WhatsApp untuk memproses desain dan produksi.
          </p>

          <div className="bg-[#090909] border border-zinc-800 p-5 mb-6">
            <div className="text-[10px] text-zinc-500 uppercase tracking-widest mb-1">Nomor Order Anda</div>
            <div className="text-2xl font-mono font-black text-zinc-100 tracking-wide">{orderId}</div>
            <div className="text-[10px] text-zinc-600 mt-2 italic">Simpan nomor ini untuk melakukan tracking status pesanan</div>
          </div>

          <div className="grid grid-cols-2 gap-3 text-sm text-left mb-6">
            {[
              { label: 'Nama Klien', value: form.nama },
              { label: 'Jenis Produk', value: form.produk },
              { label: 'Jumlah', value: `${form.jumlah} pcs` },
              { label: 'Pengambilan', value: form.metode_pengambilan === 'kirim' ? 'Ekspedisi (Kirim)' : 'Ambil Sendiri' },
            ].map(({ label, value }) => (
              <div key={label} className="bg-[#090909]/40 border border-zinc-800/50 p-3">
                <div className="text-[9px] text-zinc-500 uppercase tracking-wider">{label}</div>
                <div className="font-semibold text-zinc-300 truncate mt-0.5">{value}</div>
              </div>
            ))}
          </div>

          <button
            onClick={sendToWhatsApp}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-4 transition-colors mb-3 flex items-center justify-center gap-2 text-sm uppercase tracking-wider cursor-pointer"
          >
            <WhatsAppIcon className="w-4 h-4 text-white" />
            Konfirmasi via WhatsApp
          </button>
          
          <button
            onClick={() => window.location.href = '/tracking'}
            className="w-full btn-outline py-3.5 text-xs text-zinc-300 border-zinc-800 hover:border-zinc-500 hover:text-zinc-50 transition-all cursor-pointer"
          >
            Cek Status Pesanan
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-20" style={{ background: '#090909' }}>
      {/* Header */}
      <div className="border-b border-white/[0.05] py-16 mb-12 pt-24">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="h-px w-8 bg-cherry-500" />
            <span className="text-[10px] text-zinc-500 tracking-[0.3em] uppercase">CUSTOM ORDER</span>
            <span className="h-px w-8 bg-cherry-500" />
          </div>
          <h1 
            className="text-4xl md:text-6xl text-zinc-50 tracking-wider mb-4" 
            style={{ fontFamily: "'Bebas Neue', Impact, sans-serif" }}
          >
            FORM PEMESANAN
          </h1>
          <p className="text-zinc-400 max-w-xl mx-auto text-sm leading-relaxed">
            Isi form berikut secara lengkap untuk mengirimkan spesifikasi konveksi pakaian Anda
          </p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6">
        {/* Step Indicator */}
        <StepIndicator current={step} steps={STEPS} />

        <div className="p-8 border border-zinc-800" style={{ background: '#1A1819' }}>
          {/* ===== STEP 1: Info Pelanggan ===== */}
          {step === 0 && (
            <div className="space-y-6 animate-fade-in">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 bg-cherry-950/40 border border-cherry-500/20 flex items-center justify-center">
                  <User className="w-4 h-4 text-cherry-500" />
                </div>
                <h2 className="text-base font-bold tracking-widest text-zinc-50 uppercase" style={{ fontFamily: "'Outfit', sans-serif" }}>
                  Informasi Pelanggan
                </h2>
              </div>

              <FormField label="Nama Lengkap Klien" error={errors.nama} required>
                <input
                  id="nama"
                  type="text"
                  placeholder="Masukkan nama lengkap / instansi"
                  value={form.nama}
                  onChange={(e) => update('nama', e.target.value)}
                  className={`form-input ${errors.nama ? 'error' : ''}`}
                />
              </FormField>

              <FormField label="Nomor WhatsApp Aktif" error={errors.whatsapp} required>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                  <input
                    id="whatsapp"
                    type="tel"
                    placeholder="Contoh: 08123456789"
                    value={form.whatsapp}
                    onChange={(e) => update('whatsapp', e.target.value)}
                    className={`form-input pl-10 ${errors.whatsapp ? 'error' : ''}`}
                  />
                </div>
              </FormField>

              <FormField label="Alamat Lengkap Pengiriman" error={errors.alamat} required>
                <textarea
                  id="alamat"
                  rows={3}
                  placeholder="Nama jalan, nomor rumah, RT/RW, kecamatan, kabupaten/kota, dan kode pos"
                  value={form.alamat}
                  onChange={(e) => update('alamat', e.target.value)}
                  className={`form-input resize-none ${errors.alamat ? 'error' : ''}`}
                />
              </FormField>

              <FormField label="Metode Pengambilan" error={errors.metode_pengambilan} required>
                <div className="grid grid-cols-2 gap-4">
                  {METODE_PENGAMBILAN.map((m) => (
                    <button
                      key={m.value}
                      type="button"
                      onClick={() => update('metode_pengambilan', m.value)}
                      className={`p-4 border text-xs font-semibold uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer ${
                        form.metode_pengambilan === m.value
                          ? 'border-cherry-500 bg-cherry-950/20 text-zinc-50 font-bold'
                          : 'border-zinc-800 text-zinc-400 hover:border-zinc-700 bg-[#090909]'
                      }`}
                    >
                      {m.value === 'kirim' ? <Truck className="w-4 h-4" /> : <MapPin className="w-4 h-4" />}
                      {m.label}
                    </button>
                  ))}
                </div>
                {errors.metode_pengambilan && (
                  <p className="text-red-500 text-xs mt-1.5 flex items-center gap-1">
                    <X className="w-3 h-3" />{errors.metode_pengambilan}
                  </p>
                )}
              </FormField>
            </div>
          )}

          {/* ===== STEP 2: Detail Produk ===== */}
          {step === 1 && (
            <div className="space-y-6 animate-fade-in">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 bg-cherry-950/40 border border-cherry-500/20 flex items-center justify-center">
                  <Package className="w-4 h-4 text-cherry-500" />
                </div>
                <h2 className="text-base font-bold tracking-widest text-zinc-50 uppercase" style={{ fontFamily: "'Outfit', sans-serif" }}>
                  Detail Produk Pakaian
                </h2>
              </div>

              <FormField label="Kategori / Jenis Produk" error={errors.produk} required>
                <select
                  id="produk"
                  value={form.produk}
                  onChange={(e) => update('produk', e.target.value)}
                  className={`form-input cursor-pointer ${errors.produk ? 'error' : ''}`}
                  style={{ background: '#090909' }}
                >
                  <option value="" className="bg-[#1A1819]">Pilih jenis produk pakaian</option>
                  {PRODUCT_CATEGORIES.map((cat) => (
                    <option key={cat.id} value={cat.label} className="bg-[#1A1819]">
                      {cat.label}
                    </option>
                  ))}
                </select>
              </FormField>

              <FormField label="Jenis Bahan" error={errors.bahan} required>
                <select
                  id="bahan"
                  value={form.bahan}
                  onChange={(e) => update('bahan', e.target.value)}
                  className={`form-input cursor-pointer ${errors.bahan ? 'error' : ''}`}
                  style={{ background: '#090909' }}
                >
                  <option value="" className="bg-[#1A1819]">Pilih jenis material bahan</option>
                  {BAHAN_OPTIONS.map((b) => (
                    <option key={b} value={b} className="bg-[#1A1819]">{b}</option>
                  ))}
                </select>
              </FormField>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField label="Warna Pakaian" error={errors.warna} required>
                  <div className="relative">
                    <Palette className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                    <input
                      id="warna"
                      type="text"
                      placeholder="Contoh: Hitam Pekat, Navy"
                      value={form.warna}
                      onChange={(e) => update('warna', e.target.value)}
                      className={`form-input pl-10 ${errors.warna ? 'error' : ''}`}
                    />
                  </div>
                </FormField>

                <FormField label="Jumlah Quantity (pcs)" error={errors.jumlah} required>
                  <div className="relative">
                    <Hash className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                    <input
                      id="jumlah"
                      type="number"
                      min="1"
                      placeholder="Contoh: 36"
                      value={form.jumlah}
                      onChange={(e) => update('jumlah', e.target.value)}
                      className={`form-input pl-10 ${errors.jumlah ? 'error' : ''}`}
                    />
                  </div>
                </FormField>
              </div>

              <FormField label="Pilihan Ukuran (Dapat Pilih Lebih dari Satu)" error={errors.ukuran} required>
                <div className="flex flex-wrap gap-2">
                  {UKURAN_OPTIONS.map((u) => {
                    const curr = form.ukuran ? form.ukuran.split(', ') : [];
                    const isSelected = curr.includes(u);
                    return (
                      <button
                        key={u}
                        type="button"
                        onClick={() => {
                          const updated = isSelected ? curr.filter(x => x !== u) : [...curr, u];
                          update('ukuran', updated.join(', '));
                        }}
                        className={`px-4 py-2 border text-xs font-semibold transition-all duration-200 cursor-pointer ${
                          isSelected
                            ? 'bg-[#810100] border-[#810100] text-zinc-50 font-bold'
                            : 'border-zinc-800 text-zinc-400 hover:border-zinc-700 bg-[#090909]'
                        }`}
                      >
                        {u}
                      </button>
                    );
                  })}
                </div>
                {errors.ukuran && (
                  <p className="text-red-500 text-xs mt-1.5 flex items-center gap-1">
                    <X className="w-3 h-3" />{errors.ukuran}
                  </p>
                )}
              </FormField>

              {/* File Upload — Custom Dark Style */}
              <div>
                <label className="form-label text-xs font-semibold text-zinc-400 tracking-wider uppercase mb-1.5 block">
                  Upload Desain / Mockup Logo (Opsional)
                </label>
                <div
                  className={`border border-dashed p-6 text-center cursor-pointer transition-all duration-300 ${
                    file 
                      ? 'border-green-500 bg-green-950/10' 
                      : 'border-zinc-800 hover:border-[#810100]/50 hover:bg-[#810100]/5 bg-[#090909]'
                  }`}
                  onClick={() => fileRef.current?.click()}
                >
                  {file ? (
                    <div className="flex items-center justify-center gap-3">
                      <CheckCircle className="w-6 h-6 text-green-500" />
                      <div className="text-left">
                        <div className="text-sm font-semibold text-zinc-200">{file.name}</div>
                        <div className="text-xs text-zinc-500">{formatFileSize(file.size)}</div>
                      </div>
                      <button
                        onClick={(e) => { e.stopPropagation(); setFile(null); fileRef.current.value = ''; }}
                        className="ml-2 p-1.5 hover:bg-red-950/30 rounded border border-transparent hover:border-red-800/30 text-red-500"
                        title="Hapus file"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <div>
                      <Upload className="w-7 h-7 text-zinc-500 mx-auto mb-2" />
                      <p className="text-xs text-zinc-300 font-medium uppercase tracking-wider">Pilih file mockup desain</p>
                      <p className="text-[10px] text-zinc-500 mt-1">Format: JPG, PNG, PDF, AI, PSD (Max. 10MB)</p>
                    </div>
                  )}
                </div>
                <input
                  ref={fileRef}
                  type="file"
                  accept=".jpg,.jpeg,.png,.pdf,.ai,.psd"
                  onChange={handleFile}
                  className="hidden"
                />
                {fileError && (
                  <p className="text-red-500 text-xs mt-1.5 flex items-center gap-1">
                    <X className="w-3 h-3" />{fileError}
                  </p>
                )}
              </div>

              <FormField label="Catatan Spesifikasi Tambahan">
                <textarea
                  id="catatan"
                  rows={3}
                  placeholder="Berikan instruksi khusus: peletakan sablon/bordir, warna benang, jenis sablon (Plastisol/Discharge), dsb..."
                  value={form.catatan}
                  onChange={(e) => update('catatan', e.target.value)}
                  className="form-input resize-none"
                />
              </FormField>
            </div>
          )}

          {/* ===== STEP 3: Review ===== */}
          {step === 2 && (
            <div className="animate-fade-in space-y-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 bg-cherry-950/40 border border-cherry-500/20 flex items-center justify-center">
                  <ClipboardList className="w-4 h-4 text-cherry-500" />
                </div>
                <h2 className="text-base font-bold tracking-widest text-zinc-50 uppercase" style={{ fontFamily: "'Outfit', sans-serif" }}>
                  Konfirmasi Spesifikasi Order
                </h2>
              </div>

              <div className="space-y-4">
                <div className="border border-zinc-800 p-5 bg-[#090909]/40 border-l-2 border-l-[#810100]">
                  <h3 className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-3">Informasi Pelanggan</h3>
                  <div className="space-y-2 text-xs">
                    {[
                      { label: 'Nama Lengkap', value: form.nama },
                      { label: 'WhatsApp', value: form.whatsapp },
                      { label: 'Alamat Pengiriman', value: form.alamat },
                      { label: 'Metode Pengambilan', value: form.metode_pengambilan === 'kirim' ? '🚚 Kirim via Kurir/Ekspedisi' : '📍 Ambil di Workshop' },
                    ].map(({ label, value }) => (
                      <div key={label} className="flex justify-between gap-4 py-1 border-b border-zinc-900/30 last:border-0">
                        <span className="text-zinc-500 shrink-0">{label}</span>
                        <span className="text-zinc-300 font-semibold text-right">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="border border-zinc-800 p-5 bg-[#090909]/40 border-l-2 border-l-[#810100]">
                  <h3 className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-3">Spesifikasi Pakaian</h3>
                  <div className="space-y-2 text-xs">
                    {[
                      { label: 'Jenis Produk', value: form.produk },
                      { label: 'Jenis Bahan', value: form.bahan },
                      { label: 'Warna Pakaian', value: form.warna },
                      { label: 'Ukuran/Size', value: form.ukuran },
                      { label: 'Jumlah Quantity', value: `${form.jumlah} pcs` },
                      { label: 'File Mockup Desain', value: file ? file.name : 'Tidak dilampirkan' },
                      { label: 'Catatan Spesifikasi', value: form.catatan || '-' },
                    ].map(({ label, value }) => (
                      <div key={label} className="flex justify-between gap-4 py-1 border-b border-zinc-900/30 last:border-0">
                        <span className="text-zinc-500 shrink-0">{label}</span>
                        <span className="text-zinc-300 font-semibold text-right">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-[#810100]/10 border border-[#810100]/30 p-4 flex gap-3">
                  <CheckCircle className="w-5 h-5 text-cherry-500 shrink-0 mt-0.5" />
                  <p className="text-zinc-400 text-xs leading-relaxed">
                    Dengan menekan tombol kirim, Anda mengonfirmasi bahwa seluruh rincian spesifikasi di atas telah sesuai. Admin UPPERINK akan memverifikasi order dan berdiskusi perihal DP (Down Payment) sebelum masuk proses produksi.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8 pt-6 border-t border-zinc-800/80">
            {step > 0 ? (
              <button 
                onClick={prevStep} 
                className="btn-outline flex items-center gap-2 px-5 py-3 text-xs uppercase tracking-wider cursor-pointer border-zinc-800 text-zinc-400 hover:text-zinc-100"
              >
                <ChevronLeft className="w-4 h-4" /> Kembali
              </button>
            ) : <div />}

            {step < STEPS.length - 1 ? (
              <button 
                onClick={nextStep} 
                className="btn-primary flex items-center gap-2 px-6 py-3.5 text-xs font-bold cursor-pointer"
              >
                Lanjut <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={submitting}
                className="btn-primary flex items-center gap-2 px-6 py-3.5 text-xs font-bold disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
              >
                {submitting ? (
                  <><span className="animate-spin mr-1">⚙</span> Mengirim...</>
                ) : (
                  <><CheckCircle className="w-4 h-4" /> Kirim Spesifikasi</>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderPage;
