import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Plus, Trash2, Upload, Image, RefreshCcw, X, ZoomIn, CheckCircle } from 'lucide-react';
import { getGallery, createGallery, deleteGallery } from '../../services/galleryService';
import { formatDate } from '../../utils/formatters';
import Modal from '../../components/common/Modal';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import toast from 'react-hot-toast';

const GalleryPage = () => {
  const [gallery, setGallery] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState({ judul: '', deskripsi: '', gambar_url: '' });
  const [files, setFiles] = useState([]); // Support multi-file
  const [previews, setPreviews] = useState([]); // Preview URLs for each file
  const [saving, setSaving] = useState(false);
  const [saveProgress, setSaveProgress] = useState({ current: 0, total: 0 });
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [lightbox, setLightbox] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileRef = useRef();

  const fetchGallery = async () => {
    setLoading(true);
    const data = await getGallery();
    setGallery(data);
    setLoading(false);
  };

  useEffect(() => { fetchGallery(); }, []);

  // Build previews when files change
  useEffect(() => {
    if (files.length === 0) {
      setPreviews([]);
      return;
    }
    const urls = files.map((f) => URL.createObjectURL(f));
    setPreviews(urls);
    return () => urls.forEach((u) => URL.revokeObjectURL(u));
  }, [files]);

  const handleFilesChange = (newFiles) => {
    const validFiles = Array.from(newFiles).filter((f) => {
      if (!f.type.startsWith('image/')) {
        toast.error(`${f.name} bukan file gambar`);
        return false;
      }
      if (f.size > 5 * 1024 * 1024) {
        toast.error(`${f.name} melebihi 5MB`);
        return false;
      }
      return true;
    });
    if (validFiles.length > 0) {
      setFiles((prev) => [...prev, ...validFiles]);
      // Clear URL input
      setForm((f) => ({ ...f, gambar_url: '' }));
    }
  };

  const removeFile = (index) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  // Drag & drop handlers
  const handleDragOver = (e) => { e.preventDefault(); setIsDragging(true); };
  const handleDragLeave = (e) => { e.preventDefault(); setIsDragging(false); };
  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    handleFilesChange(e.dataTransfer.files);
  };

  const resetModal = () => {
    setForm({ judul: '', deskripsi: '', gambar_url: '' });
    setFiles([]);
    setPreviews([]);
    setSaveProgress({ current: 0, total: 0 });
    setModalOpen(false);
  };

  const handleSave = async () => {
    const hasSource = files.length > 0 || form.gambar_url.trim();
    if (!hasSource) { toast.error('Upload foto atau masukkan URL gambar'); return; }

    setSaving(true);

    try {
      if (files.length > 0) {
        // Multi-file upload
        setSaveProgress({ current: 0, total: files.length });
        const newItems = [];

        for (let i = 0; i < files.length; i++) {
          setSaveProgress({ current: i + 1, total: files.length });
          const f = files[i];
          const fileBase64 = await new Promise((resolve) => {
            const reader = new FileReader();
            reader.onload = (e) => resolve({ name: f.name, data: e.target.result });
            reader.readAsDataURL(f);
          });

          const newItem = {
            gallery_id: `GAL-${Date.now()}-${i}`,
            judul: files.length === 1 ? (form.judul || f.name.replace(/\.[^/.]+$/, '')) : `${form.judul || 'Foto'} ${i + 1}`,
            deskripsi: form.deskripsi,
            gambar_url: previews[i], // Use blob URL for immediate display
            tanggal_upload: new Date().toISOString().split('T')[0],
          };
          await createGallery(newItem, fileBase64);
          newItems.push(newItem);
        }

        setGallery((prev) => [...newItems, ...prev]);
        toast.success(`${newItems.length} foto berhasil ditambahkan!`);
      } else {
        // URL-based
        if (!form.judul) { toast.error('Judul wajib diisi untuk URL gambar'); setSaving(false); return; }
        const newItem = {
          gallery_id: `GAL-${Date.now()}`,
          judul: form.judul,
          deskripsi: form.deskripsi,
          gambar_url: form.gambar_url,
          tanggal_upload: new Date().toISOString().split('T')[0],
        };
        await createGallery(newItem, null);
        setGallery((prev) => [newItem, ...prev]);
        toast.success('Foto berhasil ditambahkan!');
      }
      resetModal();
    } catch {
      toast.error('Gagal menambahkan foto');
    } finally {
      setSaving(false);
      setSaveProgress({ current: 0, total: 0 });
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteGallery(id);
      setGallery((prev) => prev.filter((g) => g.gallery_id !== id));
      setDeleteConfirm(null);
      if (lightbox?.gallery_id === id) setLightbox(null);
      toast.success('Foto berhasil dihapus');
    } catch {
      toast.error('Gagal menghapus foto');
    }
  };

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-navy-900">Galeri</h1>
          <p className="text-gray-400 text-sm mt-0.5">{gallery.length} foto produksi</p>
        </div>
        <div className="flex gap-3">
          <button onClick={fetchGallery} className="flex items-center gap-2 text-sm bg-white px-4 py-2 rounded-xl shadow-card text-gray-500 hover:text-navy-700 transition-colors">
            <RefreshCcw className="w-4 h-4" />
          </button>
          <button onClick={() => setModalOpen(true)} className="btn-primary flex items-center gap-2">
            <Plus className="w-4 h-4" /> Upload Foto
          </button>
        </div>
      </div>

      {/* Gallery Grid */}
      {loading ? (
        <LoadingSpinner className="py-20" size="lg" />
      ) : gallery.length === 0 ? (
        <div className="py-20 text-center">
          <Image className="w-16 h-16 mx-auto text-gray-300 mb-4" />
          <p className="text-gray-400 font-medium">Belum ada foto di galeri</p>
          <button onClick={() => setModalOpen(true)} className="btn-primary mt-4 inline-flex items-center gap-2">
            <Plus className="w-4 h-4" /> Upload Foto Pertama
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {gallery.map((item) => (
            <div
              key={item.gallery_id}
              className="group relative bg-white rounded-2xl shadow-card overflow-hidden cursor-pointer"
              onClick={() => setLightbox(item)}
            >
              <div className="aspect-square overflow-hidden">
                <img
                  src={item.gambar_url}
                  alt={item.judul}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  onError={(e) => { e.target.style.display = 'none'; }}
                />
              </div>
              <div className="p-3">
                <div className="font-semibold text-navy-800 text-sm line-clamp-1">{item.judul}</div>
                <div className="text-gray-400 text-xs mt-0.5">{formatDate(item.tanggal_upload)}</div>
              </div>

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                <ZoomIn className="w-8 h-8 text-white" />
              </div>

              {/* Delete button */}
              <button
                onClick={(e) => { e.stopPropagation(); setDeleteConfirm(item.gallery_id); }}
                className="absolute top-2 right-2 w-7 h-7 bg-red-500 hover:bg-red-600 text-white rounded-lg flex items-center justify-center shadow-md transition-all z-10 opacity-0 group-hover:opacity-100 scale-90 group-hover:scale-100"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Upload Modal */}
      <Modal isOpen={modalOpen} onClose={resetModal} title="Upload Foto Galeri">
        <div className="space-y-4">
          {/* Drop zone */}
          <div>
            <label className="form-label">Upload Foto (Bisa Beberapa Sekaligus)</label>
            <div
              className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-all ${
                isDragging
                  ? 'border-navy-400 bg-navy-50 scale-[1.01]'
                  : 'border-gray-200 hover:border-navy-300 hover:bg-gray-50'
              }`}
              onClick={() => fileRef.current?.click()}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              {isDragging ? (
                <div className="space-y-2">
                  <Upload className="w-10 h-10 text-navy-400 mx-auto animate-bounce" />
                  <p className="text-navy-600 font-semibold">Lepaskan file di sini!</p>
                </div>
              ) : (
                <div className="space-y-2">
                  <div className="w-12 h-12 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto">
                    <Upload className="w-6 h-6 text-gray-400" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">Drag & drop atau klik untuk upload</p>
                    <p className="text-xs text-gray-400 mt-0.5">JPG, PNG — Bisa pilih beberapa foto sekaligus — Maks 5MB/foto</p>
                  </div>
                </div>
              )}
            </div>
            <input
              ref={fileRef}
              type="file"
              accept="image/jpeg,image/jpg,image/png"
              multiple
              onChange={(e) => handleFilesChange(e.target.files)}
              className="hidden"
            />
          </div>

          {/* Preview thumbnails */}
          {previews.length > 0 && (
            <div>
              <label className="form-label">{previews.length} foto dipilih</label>
              <div className="grid grid-cols-4 gap-2">
                {previews.map((url, i) => (
                  <div key={i} className="relative group aspect-square">
                    <img
                      src={url}
                      alt={`Preview ${i + 1}`}
                      className="w-full h-full object-cover rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => removeFile(i)}
                      className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center shadow opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="w-2.5 h-2.5 text-white" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* OR: URL */}
          {files.length === 0 && (
            <>
              <div className="relative">
                <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-200" /></div>
                <div className="relative flex justify-center"><span className="bg-white px-3 text-xs text-gray-400">atau gunakan URL gambar</span></div>
              </div>
              <div>
                <input
                  type="url"
                  value={form.gambar_url}
                  onChange={(e) => setForm((f) => ({ ...f, gambar_url: e.target.value }))}
                  className="form-input"
                  placeholder="https://..."
                />
              </div>
            </>
          )}

          <div>
            <label className="form-label">
              Judul {files.length > 1 ? '(Prefix — akan ditambah nomor)' : '*'}
            </label>
            <input
              type="text"
              value={form.judul}
              onChange={(e) => setForm((f) => ({ ...f, judul: e.target.value }))}
              className="form-input"
              placeholder={files.length > 1 ? 'cth: Produksi Kaos Juni 2026' : 'cth: Kaos Komunitas Sepeda'}
            />
          </div>
          <div>
            <label className="form-label">Deskripsi</label>
            <textarea
              rows={2}
              value={form.deskripsi}
              onChange={(e) => setForm((f) => ({ ...f, deskripsi: e.target.value }))}
              className="form-input resize-none"
              placeholder="Keterangan singkat..."
            />
          </div>

          {/* Progress bar */}
          {saving && saveProgress.total > 1 && (
            <div>
              <div className="flex justify-between text-xs text-gray-500 mb-1">
                <span>Mengupload foto...</span>
                <span>{saveProgress.current}/{saveProgress.total}</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-2">
                <div
                  className="bg-navy-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${(saveProgress.current / saveProgress.total) * 100}%` }}
                />
              </div>
            </div>
          )}

          <div className="flex gap-3 pt-2">
            <button onClick={resetModal} className="border border-gray-200 text-gray-700 hover:bg-gray-50 flex-1 py-2.5 rounded-xl text-sm font-semibold transition-colors">Batal</button>
            <button onClick={handleSave} disabled={saving} className="btn-primary flex-1 flex items-center justify-center gap-2">
              {saving ? (
                <><span className="animate-spin">⚙</span> {saveProgress.total > 1 ? `${saveProgress.current}/${saveProgress.total}...` : 'Mengupload...'}</>
              ) : (
                <><CheckCircle className="w-4 h-4" /> {files.length > 1 ? `Upload ${files.length} Foto` : 'Upload Foto'}</>
              )}
            </button>
          </div>
        </div>
      </Modal>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setLightbox(null)}
        >
          <button
            className="absolute top-4 right-4 w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors z-10"
            onClick={() => setLightbox(null)}
          >
            <X className="w-5 h-5" />
          </button>
          <div className="max-w-3xl w-full animate-fade-in" onClick={(e) => e.stopPropagation()}>
            <img src={lightbox.gambar_url} alt={lightbox.judul} className="w-full rounded-2xl shadow-2xl" />
            <div className="text-white text-center mt-5">
              <h3 className="text-xl font-bold">{lightbox.judul}</h3>
              {lightbox.deskripsi && <p className="text-gray-300 mt-1 text-sm">{lightbox.deskripsi}</p>}
              <p className="text-gray-500 text-xs mt-1">{formatDate(lightbox.tanggal_upload)}</p>
            </div>
            {/* Navigation: show delete button in lightbox */}
            <div className="flex justify-center mt-4">
              <button
                onClick={() => { setDeleteConfirm(lightbox.gallery_id); setLightbox(null); }}
                className="flex items-center gap-2 px-4 py-2 bg-red-500/80 hover:bg-red-500 text-white text-sm rounded-xl transition-colors"
              >
                <Trash2 className="w-4 h-4" /> Hapus Foto
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirm */}
      <Modal isOpen={!!deleteConfirm} onClose={() => setDeleteConfirm(null)} title="Hapus Foto" size="sm">
        <div className="text-center py-2">
          <div className="w-14 h-14 bg-red-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Trash2 className="w-7 h-7 text-red-500" />
          </div>
          <p className="text-gray-600 mb-6">Yakin ingin menghapus foto ini?</p>
          <div className="flex gap-3">
            <button onClick={() => setDeleteConfirm(null)} className="border border-gray-200 text-gray-700 hover:bg-gray-50 flex-1 py-2.5 rounded-xl text-sm font-semibold transition-colors">Batal</button>
            <button
              onClick={() => handleDelete(deleteConfirm)}
              className="flex-1 bg-red-500 hover:bg-red-600 text-white font-semibold py-3 rounded-xl transition-colors"
            >
              Hapus
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default GalleryPage;
