// ====================================================================
// UPPERINK — Google Apps Script API
// Support: Katalog Produk, Galeri Produksi, & Kelola Status Pesanan
// Deploy: Web App, Execute as Me, Anyone has access
// ====================================================================

const CONFIG = {
  SPREADSHEET_ID:  'https://docs.google.com/spreadsheets/d/1fTtnufB_7UI9shsVm5d_Ln7EmBAuqNzSJXkRssGo3aQ/edit?gid=0#gid=0',   // ID Spreadsheet
  IMAGES_FOLDER_ID: 'https://drive.google.com/drive/folders/1XcqEjFb83qRGyvIhPhqE67YIzYC3468Z?usp=drive_link', // ID Folder Drive
  SHEET_PRODUCTS: 'Products',
  SHEET_GALLERY: 'Gallery',
  SHEET_ORDERS: 'Orders',
  SHEET_LEADS: 'Leads',
};

// ── JSON Response Helper ────────────────────────────────────────────
function jsonOk(data)    { return ContentService.createTextOutput(JSON.stringify({ success: true, data })).setMimeType(ContentService.MimeType.JSON); }
function jsonErr(msg)    { return ContentService.createTextOutput(JSON.stringify({ success: false, message: msg })).setMimeType(ContentService.MimeType.JSON); }

// ── GET Router ──────────────────────────────────────────────────────
function doGet(e) {
  try {
    const action = e.parameter.action;
    switch (action) {
      case 'getProducts': return jsonOk(getProducts());
      case 'getGallery': return jsonOk(getGallery());
      case 'getOrders': return jsonOk(getOrders());
      case 'getOrderByTracking': return jsonOk(getOrderByTracking(e.parameter.order_id, e.parameter.whatsapp));
      case 'getLeads': return jsonOk(getLeads());
      default: return jsonErr('Action GET tidak valid: ' + action);
    }
  } catch (err) {
    return jsonErr(err.toString());
  }
}

// ── POST Router ─────────────────────────────────────────────────────
function doPost(e) {
  try {
    const body   = JSON.parse(e.postData.contents);
    const action = body.action;
    switch (action) {
      // Products CRUD
      case 'createProduct': return jsonOk(createProduct(body.data, body.file));
      case 'updateProduct': return jsonOk(updateProduct(body.product_id, body.data, body.file));
      case 'deleteProduct': return jsonOk(deleteProduct(body.product_id));

      // Gallery CRUD
      case 'createGallery': return jsonOk(createGallery(body.data, body.file));
      case 'deleteGallery': return jsonOk(deleteGallery(body.gallery_id));

      // Orders CRUD
      case 'createOrder': return jsonOk(createOrder(body.data, body.file));
      case 'updateOrder': return jsonOk(updateOrder(body.order_id, body.data));
      case 'deleteOrder': return jsonOk(deleteOrder(body.order_id));

      // Leads CRUD
      case 'createLead': return jsonOk(createLead(body.data));
      case 'updateLead': return jsonOk(updateLead(body.lead_id, body.data));
      case 'deleteLead': return jsonOk(deleteLead(body.lead_id));

      default: return jsonErr('Action POST tidak valid: ' + action);
    }
  } catch (err) {
    return jsonErr(err.toString());
  }
}

// ── PRODUCTS ────────────────────────────────────────────────────────
function getProducts() {
  const sheet = SpreadsheetApp.openById(CONFIG.SPREADSHEET_ID).getSheetByName(CONFIG.SHEET_PRODUCTS);
  const rows  = sheet.getDataRange().getValues();
  if (rows.length <= 1) return [];
  const headers = rows[0];
  return rows.slice(1).map(row => {
    const obj = {};
    headers.forEach((h, i) => { obj[h] = row[i]; });
    return obj;
  });
}

function createProduct(data, fileData) {
  const sheet = SpreadsheetApp.openById(CONFIG.SPREADSHEET_ID).getSheetByName(CONFIG.SHEET_PRODUCTS);
  let imageUrl = data.gambar_url || '';
  if (fileData && fileData.data) {
    imageUrl = uploadImage(fileData.data, fileData.name);
  }
  sheet.appendRow([
    data.product_id,
    data.nama_produk,
    data.kategori,
    data.deskripsi || '',
    data.harga || 0,
    imageUrl,
    data.status || 'aktif',
    data.created_at || new Date().toISOString().split('T')[0],
  ]);
  return { product_id: data.product_id, image_url: imageUrl };
}

function updateProduct(productId, data, fileData) {
  const sheet   = SpreadsheetApp.openById(CONFIG.SPREADSHEET_ID).getSheetByName(CONFIG.SHEET_PRODUCTS);
  const rows    = sheet.getDataRange().getValues();
  const headers = rows[0];
  const idCol   = headers.indexOf('product_id');
  if (idCol === -1) throw new Error('Kolom product_id tidak ditemukan');

  let imageUrl = data.gambar_url || '';
  if (fileData && fileData.data) {
    imageUrl = uploadImage(fileData.data, fileData.name);
    data.gambar_url = imageUrl;
  }

  for (let i = 1; i < rows.length; i++) {
    if (rows[i][idCol] === productId) {
      Object.entries(data).forEach(([key, val]) => {
        const col = headers.indexOf(key);
        if (col !== -1) sheet.getRange(i + 1, col + 1).setValue(val);
      });
      return { product_id: productId, image_url: imageUrl };
    }
  }
  throw new Error('Produk tidak ditemukan');
}

function deleteProduct(productId) {
  const sheet   = SpreadsheetApp.openById(CONFIG.SPREADSHEET_ID).getSheetByName(CONFIG.SHEET_PRODUCTS);
  const rows    = sheet.getDataRange().getValues();
  const headers = rows[0];
  const idCol   = headers.indexOf('product_id');
  if (idCol === -1) throw new Error('Kolom product_id tidak ditemukan');

  for (let i = 1; i < rows.length; i++) {
    if (rows[i][idCol] === productId) {
      sheet.deleteRow(i + 1);
      return { deleted: productId };
    }
  }
  throw new Error('Produk tidak ditemukan');
}

// ── GALLERY ─────────────────────────────────────────────────────────
function getGallery() {
  const sheet = SpreadsheetApp.openById(CONFIG.SPREADSHEET_ID).getSheetByName(CONFIG.SHEET_GALLERY);
  const rows  = sheet.getDataRange().getValues();
  if (rows.length <= 1) return [];
  const headers = rows[0];
  return rows.slice(1).map(row => {
    const obj = {};
    headers.forEach((h, i) => { obj[h] = row[i]; });
    return obj;
  });
}

function createGallery(data, fileData) {
  const sheet = SpreadsheetApp.openById(CONFIG.SPREADSHEET_ID).getSheetByName(CONFIG.SHEET_GALLERY);
  let imageUrl = data.gambar_url || '';
  if (fileData && fileData.data) {
    imageUrl = uploadImage(fileData.data, fileData.name);
  }
  sheet.appendRow([
    data.gallery_id,
    data.judul,
    data.deskripsi || '',
    imageUrl,
    data.tanggal_upload || new Date().toISOString().split('T')[0]
  ]);
  return { gallery_id: data.gallery_id, image_url: imageUrl };
}

function deleteGallery(galleryId) {
  const sheet = SpreadsheetApp.openById(CONFIG.SPREADSHEET_ID).getSheetByName(CONFIG.SHEET_GALLERY);
  const rows = sheet.getDataRange().getValues();
  const headers = rows[0];
  const idCol = headers.indexOf('gallery_id');
  if (idCol === -1) throw new Error('Kolom gallery_id tidak ditemukan');

  for (let i = 1; i < rows.length; i++) {
    if (rows[i][idCol] === galleryId) {
      sheet.deleteRow(i + 1);
      return { deleted: galleryId };
    }
  }
  throw new Error('Foto tidak ditemukan');
}

// ── ORDERS ──────────────────────────────────────────────────────────
function getOrders() {
  const sheet = SpreadsheetApp.openById(CONFIG.SPREADSHEET_ID).getSheetByName(CONFIG.SHEET_ORDERS);
  const rows  = sheet.getDataRange().getValues();
  if (rows.length <= 1) return [];
  const headers = rows[0];
  return rows.slice(1).map(row => {
    const obj = {};
    headers.forEach((h, i) => { obj[h] = row[i]; });
    return obj;
  });
}

function createOrder(data, fileData) {
  const sheet = SpreadsheetApp.openById(CONFIG.SPREADSHEET_ID).getSheetByName(CONFIG.SHEET_ORDERS);
  let fileUrl = data.file_desain_url || '';
  if (fileData && fileData.data) {
    fileUrl = uploadImage(fileData.data, fileData.name);
  }
  sheet.appendRow([
    data.order_id,
    data.tanggal || new Date().toISOString().split('T')[0],
    data.nama,
    data.whatsapp,
    data.alamat,
    data.produk,
    data.bahan,
    data.warna,
    data.ukuran,
    data.jumlah,
    data.catatan || '',
    data.metode_pengambilan,
    fileUrl,
    data.status || 'Menunggu Konfirmasi',
    data.catatan_admin || ''
  ]);
  return { order_id: data.order_id, file_desain_url: fileUrl };
}

function getOrderByTracking(orderId, whatsapp) {
  const sheet = SpreadsheetApp.openById(CONFIG.SPREADSHEET_ID).getSheetByName(CONFIG.SHEET_ORDERS);
  const rows = sheet.getDataRange().getValues();
  if (rows.length <= 1) return null;
  const headers = rows[0];
  const idCol = headers.indexOf('order_id');
  const waCol = headers.indexOf('whatsapp');
  if (idCol === -1 || waCol === -1) throw new Error('Kolom order_id atau whatsapp tidak ditemukan');

  const cleanNumber = (num) => String(num).replace(/\D/g, '');
  const targetWa = cleanNumber(whatsapp);

  for (let i = 1; i < rows.length; i++) {
    const rowId = String(rows[i][idCol]);
    const rowWa = cleanNumber(rows[i][waCol]);
    if (rowId.toLowerCase() === orderId.toLowerCase() && rowWa === targetWa) {
      const obj = {};
      headers.forEach((h, colIdx) => { obj[h] = rows[i][colIdx]; });
      return obj;
    }
  }
  return null;
}

function updateOrder(orderId, data) {
  const sheet = SpreadsheetApp.openById(CONFIG.SPREADSHEET_ID).getSheetByName(CONFIG.SHEET_ORDERS);
  const rows = sheet.getDataRange().getValues();
  const headers = rows[0];
  const idCol = headers.indexOf('order_id');
  if (idCol === -1) throw new Error('Kolom order_id tidak ditemukan');

  for (let i = 1; i < rows.length; i++) {
    if (rows[i][idCol] === orderId) {
      Object.entries(data).forEach(([key, val]) => {
        const col = headers.indexOf(key);
        if (col !== -1) sheet.getRange(i + 1, col + 1).setValue(val);
      });
      return { order_id: orderId };
    }
  }
  throw new Error('Order tidak ditemukan');
}

function deleteOrder(orderId) {
  const sheet = SpreadsheetApp.openById(CONFIG.SPREADSHEET_ID).getSheetByName(CONFIG.SHEET_ORDERS);
  const rows = sheet.getDataRange().getValues();
  const headers = rows[0];
  const idCol = headers.indexOf('order_id');
  if (idCol === -1) throw new Error('Kolom order_id tidak ditemukan');

  for (let i = 1; i < rows.length; i++) {
    if (rows[i][idCol] === orderId) {
      sheet.deleteRow(i + 1);
      return { deleted: orderId };
    }
  }
  throw new Error('Order tidak ditemukan');
}

// ── LEADS ───────────────────────────────────────────────────────────
function getLeads() {
  const sheet = SpreadsheetApp.openById(CONFIG.SPREADSHEET_ID).getSheetByName(CONFIG.SHEET_LEADS);
  const rows  = sheet.getDataRange().getValues();
  if (rows.length <= 1) return [];
  const headers = rows[0];
  return rows.slice(1).map(row => {
    const obj = {};
    headers.forEach((h, i) => { obj[h] = row[i]; });
    return obj;
  });
}

function createLead(data) {
  const sheet = SpreadsheetApp.openById(CONFIG.SPREADSHEET_ID).getSheetByName(CONFIG.SHEET_LEADS);
  const timestamp = new Date().toISOString();
  sheet.appendRow([
    data.lead_id,
    data.tanggal || timestamp.split('T')[0],
    data.nama_pelanggan,
    data.whatsapp,
    data.nama_produk,
    data.status_produksi || 'Konsultasi',
    data.catatan_admin || '',
    data.link_whatsapp || '',
    data.created_at || timestamp,
    data.updated_at || timestamp
  ]);
  return { lead_id: data.lead_id };
}

function updateLead(leadId, data) {
  const sheet   = SpreadsheetApp.openById(CONFIG.SPREADSHEET_ID).getSheetByName(CONFIG.SHEET_LEADS);
  const rows    = sheet.getDataRange().getValues();
  const headers = rows[0];
  const idCol   = headers.indexOf('lead_id');
  if (idCol === -1) throw new Error('Kolom lead_id tidak ditemukan');

  const timestamp = new Date().toISOString();
  data.updated_at = timestamp;

  for (let i = 1; i < rows.length; i++) {
    if (rows[i][idCol] === leadId) {
      Object.entries(data).forEach(([key, val]) => {
        const col = headers.indexOf(key);
        if (col !== -1) sheet.getRange(i + 1, col + 1).setValue(val);
      });
      return { lead_id: leadId };
    }
  }
  throw new Error('Lead tidak ditemukan');
}

function deleteLead(leadId) {
  const sheet   = SpreadsheetApp.openById(CONFIG.SPREADSHEET_ID).getSheetByName(CONFIG.SHEET_LEADS);
  const rows    = sheet.getDataRange().getValues();
  const headers = rows[0];
  const idCol   = headers.indexOf('lead_id');
  if (idCol === -1) throw new Error('Kolom lead_id tidak ditemukan');

  for (let i = 1; i < rows.length; i++) {
    if (rows[i][idCol] === leadId) {
      sheet.deleteRow(i + 1);
      return { deleted: leadId };
    }
  }
  throw new Error('Lead tidak ditemukan');
}

// ── GOOGLE DRIVE IMAGE UPLOAD ───────────────────────────────────────
function uploadImage(base64Data, fileName) {
  try {
    const base64   = base64Data.split(',')[1] || base64Data;
    const mimeType = base64Data.split(';')[0].split(':')[1] || 'image/jpeg';
    const bytes    = Utilities.base64Decode(base64);
    const blob     = Utilities.newBlob(bytes, mimeType, fileName);
    const folder   = DriveApp.getFolderById(CONFIG.IMAGES_FOLDER_ID);
    const file     = folder.createFile(blob);

    // Make file public viewable
    file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);

    // Direct url template
    return 'https://drive.google.com/uc?export=view&id=' + file.getId();
  } catch (err) {
    Logger.log('Upload error: ' + err.toString());
    return '';
  }
}

// ── SETUP HELPER ────────────────────────────────────────────────────
// Run this function once from the GAS Editor to initialize everything
function setupSheet() {
  const ss = SpreadsheetApp.openById(CONFIG.SPREADSHEET_ID);
  
  // Setup Products
  let pSheet = ss.getSheetByName(CONFIG.SHEET_PRODUCTS);
  if (!pSheet) {
    pSheet = ss.insertSheet(CONFIG.SHEET_PRODUCTS);
  }
  if (pSheet.getLastRow() === 0) {
    pSheet.appendRow(['product_id', 'nama_produk', 'kategori', 'deskripsi', 'harga', 'gambar_url', 'status', 'created_at']);
  }

  // Setup Gallery
  let gSheet = ss.getSheetByName(CONFIG.SHEET_GALLERY);
  if (!gSheet) {
    gSheet = ss.insertSheet(CONFIG.SHEET_GALLERY);
  }
  if (gSheet.getLastRow() === 0) {
    gSheet.appendRow(['gallery_id', 'judul', 'deskripsi', 'gambar_url', 'tanggal_upload']);
  }

  // Setup Orders
  let oSheet = ss.getSheetByName(CONFIG.SHEET_ORDERS);
  if (!oSheet) {
    oSheet = ss.insertSheet(CONFIG.SHEET_ORDERS);
  }
  if (oSheet.getLastRow() === 0) {
    oSheet.appendRow([
      'order_id', 'tanggal', 'nama', 'whatsapp', 'alamat', 
      'produk', 'bahan', 'warna', 'ukuran', 'jumlah', 
      'catatan', 'metode_pengambilan', 'file_desain_url', 'status', 'catatan_admin'
    ]);
  }

  // Setup Leads
  let lSheet = ss.getSheetByName(CONFIG.SHEET_LEADS);
  if (!lSheet) {
    lSheet = ss.insertSheet(CONFIG.SHEET_LEADS);
  }
  if (lSheet.getLastRow() === 0) {
    lSheet.appendRow([
      'lead_id', 'tanggal', 'nama_pelanggan', 'whatsapp', 'nama_produk', 
      'status_produksi', 'catatan_admin', 'link_whatsapp', 'created_at', 'updated_at'
    ]);
  }

  Logger.log('Setup sheet selesai! Endpoint: ' + ScriptApp.getService().getUrl());
}
