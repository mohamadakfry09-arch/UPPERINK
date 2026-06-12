import React, { useState, useEffect, useRef } from 'react';
import { Plus, Pencil, Trash2, RefreshCcw, Upload, X, CheckCircle, ToggleLeft, ToggleRight, Image } from 'lucide-react';
import { getAllProducts, createProduct, updateProduct, deleteProduct } from '../../services/productService';
import { PRODUCT_CATEGORIES } from '../../config/constants';
import toast from 'react-hot-toast';

const formatPrice = (v) => v ? `Rp ${Number(v).toLocaleString('id-ID')}` : '—';

const EMPTY = { nama_produk: '', kategori: '', deskripsi: '', harga: '', gambar_url: '', status: 'aktif' };

/* ── Simple Modal ─────────────────────────────────────────────────── */
const Modal = ({ open, onClose, title, children }) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/30">
      <div className="bg-white w-full max-w-lg shadow-xl animate-fade-in-up max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 sticky top-0 bg-white z-10">
          <h2 className="text-sm font-semibold text-gray-900">{title}</h2>
          <button onClick={onClose} className="p-1.5 text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>
        <div className="px-6 py-5 text-gray-700">{children}</div>
      </div>
    </div>
  );
};

/* ── Products Page ─────────────────────────────────────────────────── */
const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(EMPTY);
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState('');
  const [saving, setSaving] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const fileRef = useRef();

  useEffect(() => {
    if (file) {
      const url = URL.createObjectURL(file);
      setPreview(url);
      return () => URL.revokeObjectURL(url);
    }
    setPreview(form.gambar_url || '');
  }, [file, form.gambar_url]);

  const load = async () => {
    setLoading(true);
    const data = await getAllProducts();
    setProducts(data);
    setLoading(false);
  };
  useEffect(() => { load(); }, []);

  const openCreate = () => { setEditing(null); setForm(EMPTY); setFile(null); setModalOpen(true); };
  const openEdit = (p) => { setEditing(p); setForm({ ...p }); setFile(null); setModalOpen(true); };

  const handleFile = (f) => {
    if (!f) return;
    if (!f.type.startsWith('image/')) { toast.error('Hanya file gambar (JPG, PNG)'); return; }
    if (f.size > 5 * 1024 * 1024) { toast.error('Maks 5MB'); return; }
    setFile(f);
    setForm(prev => ({ ...prev, gambar_url: '' }));
  };

  const toBase64 = (f) => new Promise(resolve => {
    const r = new FileReader();
    r.onload = e => resolve({ name: f.name, data: e.target.result });
    r.readAsDataURL(f);
  });

  const handleSave = async () => {
    if (!form.nama_produk || !form.kategori) { toast.error('Nama dan kategori wajib diisi'); return; }
    setSaving(true);
    try {
      const base64 = file ? await toBase64(file) : null;
      const imageUrl = file ? preview : form.gambar_url;

      if (editing) {
        const updated = { ...form, gambar_url: imageUrl };
        await updateProduct(editing.product_id, updated, base64);
        setProducts(prev => prev.map(p => p.product_id === editing.product_id ? { ...p, ...updated } : p));
        toast.success('Produk diperbarui!');
      } else {
        const newProd = { ...form, product_id: `PRD-${Date.now()}`, gambar_url: imageUrl, created_at: new Date().toISOString().split('T')[0] };
        await createProduct(newProd, base64);
        setProducts(prev => [...prev, newProd]);
        toast.success('Produk ditambahkan!');
      }
      setModalOpen(false);
      setFile(null);
    } catch { toast.error('Gagal menyimpan'); }
    finally { setSaving(false); }
  };

  const handleDelete = async () => {
    try {
      await deleteProduct(deleteId);
      setProducts(prev => prev.filter(p => p.product_id !== deleteId));
      setDeleteId(null);
      toast.success('Produk dihapus');
    } catch { toast.error('Gagal menghapus'); }
  };

  const handleToggle = async (p) => {
    const newStatus = p.status === 'aktif' ? 'nonaktif' : 'aktif';
    await updateProduct(p.product_id, { ...p, status: newStatus });
    setProducts(prev => prev.map(x => x.product_id === p.product_id ? { ...x, status: newStatus } : x));
    toast.success(`Produk ${newStatus === 'aktif' ? 'diaktifkan' : 'dinonaktifkan'}`);
  };

  const cats = PRODUCT_CATEGORIES.filter(c => c.id !== 'all');

  return (
    <div className="space-y-5 max-w-6xl">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-gray-900">Kelola Produk</h1>
          <p className="text-sm text-gray-400 mt-0.5">{products.length} produk</p>
        </div>
        <div className="flex gap-2">
          <button onClick={load} className="w-9 h-9 flex items-center justify-center border border-gray-200 text-gray-500 hover:border-gray-400 hover:text-gray-700 transition-colors">
            <RefreshCcw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          </button>
          <button onClick={openCreate} className="btn-primary text-xs px-5 py-2.5 flex items-center gap-2">
            <Plus className="w-4 h-4" /> Tambah Produk
          </button>
        </div>
      </div>

      {/* Product grid */}
      {loading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {[...Array(8)].map((_, i) => <div key={i} className="aspect-[4/5] skeleton" />)}
        </div>
      ) : products.length === 0 ? (
        <div className="text-center py-20 border border-gray-100 bg-white">
          <Package className="w-10 h-10 text-gray-200 mx-auto mb-3" />
          <p className="text-gray-400 text-sm mb-4">Belum ada produk</p>
          <button onClick={openCreate} className="btn-primary text-xs px-5 py-2.5 inline-flex items-center gap-2">
            <Plus className="w-4 h-4" /> Tambah Produk Pertama
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {products.map(p => (
            <div key={p.product_id} className="bg-white border border-gray-100 group flex flex-col shadow-sm hover:shadow-md transition-shadow">
              {/* Image */}
              <div className="relative aspect-[4/5] overflow-hidden bg-gray-50">
                {p.gambar_url ? (
                  <img src={p.gambar_url} alt={p.nama_produk} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <Image className="w-8 h-8 text-gray-200" />
                  </div>
                )}
                {/* Status badge */}
                <span className={`absolute top-2 left-2 text-[10px] font-bold px-2 py-0.5 ${
                  p.status === 'aktif' ? 'bg-white text-green-600' : 'bg-white text-gray-400'
                }`}>
                  {p.status === 'aktif' ? '● Aktif' : '○ Nonaktif'}
                </span>
              </div>
              {/* Info */}
              <div className="p-3 flex flex-col flex-1">
                <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-0.5">{p.kategori}</p>
                <h3 className="text-sm font-medium text-gray-900 leading-snug line-clamp-2 flex-1">{p.nama_produk}</h3>
                <p className="text-xs text-gray-500 mt-1">{formatPrice(p.harga)}</p>
                {/* Actions */}
                <div className="flex gap-1 mt-3 pt-2 border-t border-gray-50">
                  <button onClick={() => openEdit(p)} className="flex-1 flex items-center justify-center gap-1 py-1.5 text-[11px] font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors">
                    <Pencil className="w-3 h-3" /> Edit
                  </button>
                  <button onClick={() => handleToggle(p)} className="flex-1 flex items-center justify-center gap-1 py-1.5 text-[11px] font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors">
                    {p.status === 'aktif' ? <ToggleRight className="w-3 h-3 text-green-500" /> : <ToggleLeft className="w-3 h-3" />}
                    {p.status === 'aktif' ? 'Aktif' : 'Nonaktif'}
                  </button>
                  <button onClick={() => setDeleteId(p.product_id)} className="w-7 flex items-center justify-center py-1.5 text-red-400 hover:text-red-600 hover:bg-red-50 transition-colors">
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ── Form Modal ─────────────────────────────────── */}
      <Modal open={modalOpen} onClose={() => { setModalOpen(false); setFile(null); }} title={editing ? 'Edit Produk' : 'Tambah Produk Baru'}>
        <div className="space-y-4">
          {/* Drag & drop zone */}
          <div>
            <label className="form-label">Foto Produk</label>
            <div
              onClick={() => fileRef.current?.click()}
              onDragOver={e => { e.preventDefault(); setIsDragging(true); }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={e => { e.preventDefault(); setIsDragging(false); handleFile(e.dataTransfer.files[0]); }}
              className={`border-2 border-dashed transition-all cursor-pointer overflow-hidden ${
                isDragging ? 'border-gray-400 bg-gray-50' : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              {preview ? (
                <div className="relative">
                  <img src={preview} alt="Preview" className="w-full h-48 object-cover" onError={() => setPreview('')} />
                  <div className="absolute inset-0 bg-black/20 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="text-white text-xs font-medium bg-black/50 px-3 py-1.5">Ganti foto</span>
                  </div>
                  {file && (
                    <button type="button" onClick={e => { e.stopPropagation(); setFile(null); }} className="absolute top-2 right-2 w-6 h-6 bg-white rounded-full flex items-center justify-center shadow text-gray-600 hover:text-red-500">
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              ) : (
                <div className="h-32 flex flex-col items-center justify-center gap-2">
                  <Upload className="w-6 h-6 text-gray-300" />
                  <p className="text-xs text-gray-400">Drag & drop atau klik — JPG/PNG maks 5MB</p>
                </div>
              )}
            </div>
            <input ref={fileRef} type="file" accept="image/*" onChange={e => handleFile(e.target.files[0])} className="hidden" />
          </div>

          {/* URL alternative */}
          {!file && (
            <div>
              <label className="form-label">URL Gambar (alternatif)</label>
              <input type="url" value={form.gambar_url} onChange={e => setForm(f => ({ ...f, gambar_url: e.target.value }))} className="form-input" placeholder="https://..." />
            </div>
          )}

          <div className="grid grid-cols-2 gap-3">
            <div className="col-span-2">
              <label className="form-label">Nama Produk *</label>
              <input type="text" value={form.nama_produk} onChange={e => setForm(f => ({ ...f, nama_produk: e.target.value }))} className="form-input" placeholder="cth: Kaos Custom Premium" />
            </div>
            <div>
              <label className="form-label">Kategori *</label>
              <select value={form.kategori} onChange={e => setForm(f => ({ ...f, kategori: e.target.value }))} className="form-input">
                <option value="" className="bg-[#1A1819] text-zinc-300">Pilih...</option>
                {cats.map(c => <option key={c.id} value={c.id} className="bg-[#1A1819] text-zinc-300">{c.label}</option>)}
              </select>
            </div>
            <div>
              <label className="form-label">Harga Mulai (Rp)</label>
              <input type="number" value={form.harga} onChange={e => setForm(f => ({ ...f, harga: e.target.value }))} className="form-input" placeholder="65000" min="0" />
            </div>
            <div className="col-span-2">
              <label className="form-label">Deskripsi</label>
              <textarea rows={3} value={form.deskripsi} onChange={e => setForm(f => ({ ...f, deskripsi: e.target.value }))} className="form-input resize-none" placeholder="Deskripsi singkat produk..." />
            </div>
            <div>
              <label className="form-label">Status</label>
              <select value={form.status} onChange={e => setForm(f => ({ ...f, status: e.target.value }))} className="form-input">
                <option value="aktif" className="bg-[#1A1819] text-zinc-300">Aktif (tampil di katalog)</option>
                <option value="nonaktif" className="bg-[#1A1819] text-zinc-300">Nonaktif (disembunyikan)</option>
              </select>
            </div>
          </div>

          <div className="flex gap-3 pt-2 border-t border-gray-100">
            <button onClick={() => { setModalOpen(false); setFile(null); }} className="border border-gray-200 text-gray-700 hover:bg-gray-50 flex-1 py-2.5 text-sm font-semibold transition-colors">Batal</button>
            <button onClick={handleSave} disabled={saving} className="btn-primary flex-1 py-2.5 text-sm flex items-center justify-center gap-2">
              {saving ? (
                <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Menyimpan...</>
              ) : (
                <><CheckCircle className="w-4 h-4" /> {editing ? 'Simpan' : 'Tambah Produk'}</>
              )}
            </button>
          </div>
        </div>
      </Modal>

      {/* ── Delete Confirm ──────────────────────────────── */}
      <Modal open={!!deleteId} onClose={() => setDeleteId(null)} title="Hapus Produk">
        <div className="text-center py-3">
          <div className="w-12 h-12 bg-red-50 rounded flex items-center justify-center mx-auto mb-4">
            <Trash2 className="w-5 h-5 text-red-400" />
          </div>
          <p className="text-sm text-gray-600 mb-6">Yakin ingin menghapus produk ini? Tindakan tidak bisa dibatalkan.</p>
          <div className="flex gap-3">
            <button onClick={() => setDeleteId(null)} className="border border-gray-200 text-gray-700 hover:bg-gray-50 flex-1 py-2.5 text-sm font-semibold transition-colors">Batal</button>
            <button onClick={handleDelete} className="flex-1 py-2.5 text-sm font-semibold bg-red-500 hover:bg-red-600 text-white transition-colors">Hapus</button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ProductsPage;
