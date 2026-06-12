# UPPERINK — Panduan Setup & Deployment

## 📋 Daftar Isi
1. [Setup Google Sheets](#1-setup-google-sheets)
2. [Setup Google Drive](#2-setup-google-drive)
3. [Setup Google Apps Script](#3-setup-google-apps-script)
4. [Konfigurasi .env](#4-konfigurasi-env)
5. [Jalankan Lokal](#5-jalankan-lokal)
6. [Deploy ke Vercel](#6-deploy-ke-vercel)

---

## 1. Setup Google Sheets

### Langkah-langkah:

1. Buka [Google Sheets](https://sheets.google.com) dan buat spreadsheet baru
2. Beri nama: **"UPPERINK Database"**
3. Catat **Spreadsheet ID** dari URL:
   ```
   https://docs.google.com/spreadsheets/d/[SPREADSHEET_ID_INI]/edit
   ```

4. Buat 3 sheet dengan nama dan header berikut:

### Sheet: `Orders`
| order_id | tanggal | nama | whatsapp | alamat | produk | bahan | warna | ukuran | jumlah | catatan | metode_pengambilan | file_desain_url | status | catatan_admin |

### Sheet: `Products`
| product_id | nama_produk | kategori | deskripsi | harga_estimasi | gambar_url | status |

### Sheet: `Gallery`
| gallery_id | judul | gambar_url | deskripsi | tanggal_upload |

> 💡 **Tips**: Gunakan fungsi `setupSheets()` di Google Apps Script untuk membuat sheet otomatis!

---

## 2. Setup Google Drive

1. Buka [Google Drive](https://drive.google.com)
2. Buat 2 folder:
   - **"UPPERINK Desain"** → untuk file desain pelanggan
   - **"UPPERINK Galeri"** → untuk foto galeri admin

3. Catat **Folder ID** dari URL masing-masing folder:
   ```
   https://drive.google.com/drive/folders/[FOLDER_ID_INI]
   ```

---

## 3. Setup Google Apps Script

### Membuat Project GAS:

1. Buka [Google Apps Script](https://script.google.com)
2. Klik **"New Project"**
3. Beri nama: **"UPPERINK API"**
4. Salin seluruh isi file `google-apps-script/Code.gs` ke editor
5. Update konfigurasi di bagian `CONFIG`:

```javascript
const CONFIG = {
  SPREADSHEET_ID: 'id_spreadsheet_anda',    // Dari langkah 1
  DESIGN_FOLDER_ID: 'id_folder_desain',     // Dari langkah 2
  GALLERY_FOLDER_ID: 'id_folder_galeri',    // Dari langkah 2
  SHEET_ORDERS: 'Orders',
  SHEET_PRODUCTS: 'Products',
  SHEET_GALLERY: 'Gallery',
};
```

### (Opsional) Inisialisasi Sheet Otomatis:
1. Di GAS editor, pilih fungsi `setupSheets` dari dropdown
2. Klik **"Run"** untuk membuat header sheet otomatis

### Deploy sebagai Web App:
1. Klik **"Deploy"** → **"New deployment"**
2. Klik ⚙️ (gear icon) → pilih **"Web app"**
3. Isi konfigurasi:
   - **Description**: UPPERINK API v1
   - **Execute as**: Me (akun Google Anda)
   - **Who has access**: Anyone
4. Klik **"Deploy"**
5. Klik **"Authorize access"** dan izinkan semua permission
6. Salin **Web App URL** yang muncul (format: `https://script.google.com/macros/s/xxx/exec`)

> ⚠️ **Penting**: Setiap kali update kode GAS, buat deployment baru agar perubahan aktif!

---

## 4. Konfigurasi .env

1. Salin file `.env.example` menjadi `.env`:
   ```bash
   copy .env.example .env
   ```

2. Isi nilai di `.env`:
   ```env
   VITE_GAS_URL=https://script.google.com/macros/s/YOUR_ID/exec
   VITE_ADMIN_EMAIL=admin@hypostudio.id
   VITE_ADMIN_PASSWORD=Password_Anda_Yang_Kuat!
   VITE_WA_ADMIN=6281234567890
   VITE_COMPANY_NAME=UPPERINK
   VITE_COMPANY_TAGLINE=Konveksi Baju Berkualitas Tinggi
   VITE_COMPANY_ADDRESS=Jl. Contoh No. 123, Kota Anda
   VITE_GDRIVE_FOLDER_ID=id_folder_desain_anda
   ```

---

## 5. Jalankan Lokal

```bash
# Install dependencies (jika belum)
npm install

# Jalankan development server
npm run dev
```

Website akan berjalan di: **http://localhost:5173**

### URL Halaman:
| URL | Deskripsi |
|-----|-----------|
| `/` | Beranda |
| `/katalog` | Katalog produk |
| `/order` | Form pemesanan |
| `/tracking` | Tracking pesanan |
| `/admin/login` | Login admin |
| `/admin/dashboard` | Dashboard admin |
| `/admin/orders` | Kelola pesanan |
| `/admin/products` | Kelola produk |
| `/admin/gallery` | Galeri |
| `/admin/reports` | Laporan |

### Login Admin Default:
```
Email: admin@hypostudio.id
Password: Admin@2024! (sesuai .env)
```

---

## 6. Deploy ke Vercel

### Metode 1: Via Vercel CLI

```bash
# Install Vercel CLI
npm install -g vercel

# Login ke Vercel
vercel login

# Deploy
vercel --prod
```

### Metode 2: Via GitHub (Direkomendasikan)

1. Push kode ke GitHub repository
2. Buka [vercel.com](https://vercel.com) dan login
3. Klik **"New Project"** → Import repository GitHub
4. Konfigurasi:
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
5. Tambahkan **Environment Variables** di Vercel dashboard:
   - Semua variable dari file `.env` Anda
6. Klik **"Deploy"**

### Konfigurasi Custom Domain (hypostudio.id):
1. Di Vercel dashboard → Settings → Domains
2. Tambahkan domain: `hypostudio.id`
3. Update DNS record sesuai instruksi Vercel:
   ```
   A Record: @ → 76.76.19.19
   CNAME: www → cname.vercel-dns.com
   ```

> 💡 **Penting**: Jangan push file `.env` ke GitHub! Tambahkan ke `.gitignore`

---

## 🔒 Keamanan

- Ganti password admin default di `.env` dengan password yang kuat
- Jangan share URL Google Apps Script publik
- Aktifkan 2FA di akun Google yang digunakan GAS
- Gunakan HTTPS (Vercel sudah menyediakan SSL gratis)

---

## 🛠️ Troubleshooting

### Order tidak tersimpan ke Google Sheets
- Pastikan `VITE_GAS_URL` sudah benar di `.env`
- Cek apakah GAS sudah di-deploy dengan setting "Anyone" access
- Buka URL GAS di browser, pastikan mengembalikan JSON

### File desain tidak terupload
- Pastikan `DESIGN_FOLDER_ID` benar di `Code.gs`
- Cek permission folder Google Drive (harus bisa diakses)

### Admin tidak bisa login
- Pastikan email dan password di `.env` sama dengan yang digunakan login
- Clear localStorage browser dan coba lagi

### Website tidak tampil di Vercel
- Pastikan `vercel.json` ada di root project
- Cek build log di Vercel dashboard

---

## 📞 Support

Hubungi tim HypoStudio untuk bantuan teknis:
- WhatsApp: sesuai kontak admin
- Email: admin@UPPERINK.id
