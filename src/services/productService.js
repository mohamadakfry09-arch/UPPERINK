import { gasRequest, gasPost } from './api';
import { dummyProducts } from '../data/dummyData';

const isGASConfigured = () => {
  const url = import.meta.env.VITE_GAS_URL || '';
  return url && !url.includes('YOUR_SCRIPT_ID');
};

const getLocalProducts = () => {
  const local = localStorage.getItem('upperink_products');
  if (!local) {
    localStorage.setItem('upperink_products', JSON.stringify(dummyProducts));
    return dummyProducts;
  }
  return JSON.parse(local);
};

const saveLocalProducts = (products) => {
  localStorage.setItem('upperink_products', JSON.stringify(products));
};

export const getProducts = async () => {
  if (!isGASConfigured()) return getLocalProducts();
  const result = await gasRequest({ action: 'getProducts' });
  return result?.data || [];
};

export const getPublicProducts = async () => {
  const products = await getProducts();
  return products.filter(p => p.status === 'aktif');
};

export const getAdminProducts = getProducts;

export const createProduct = async (productData, fileBase64 = null) => {
  if (!isGASConfigured()) {
    const products = getLocalProducts();
    const newProduct = { ...productData };
    if (fileBase64 && fileBase64.data) {
      newProduct.gambar_url = fileBase64.data;
    }
    products.push(newProduct);
    saveLocalProducts(products);
    console.log('[DEV] Product created (persisted to LocalStorage):', newProduct);
    return { success: true };
  }
  return await gasPost({ action: 'createProduct', data: productData, file: fileBase64 });
};

export const updateProduct = async (productId, productData, fileBase64 = null) => {
  if (!isGASConfigured()) {
    const products = getLocalProducts();
    const updatedData = { ...productData };
    if (fileBase64 && fileBase64.data) {
      updatedData.gambar_url = fileBase64.data;
    }
    const updatedProducts = products.map(p => p.product_id === productId ? { ...p, ...updatedData } : p);
    saveLocalProducts(updatedProducts);
    console.log('[DEV] Product updated (persisted to LocalStorage):', productId, updatedData);
    return { success: true };
  }
  return await gasPost({ action: 'updateProduct', product_id: productId, data: productData, file: fileBase64 });
};

export const toggleProductStatus = async (productId, status) => {
  return await updateProduct(productId, { status });
};

export const deleteProduct = async (productId) => {
  if (!isGASConfigured()) {
    const products = getLocalProducts();
    const filteredProducts = products.filter(p => p.product_id !== productId);
    saveLocalProducts(filteredProducts);
    console.log('[DEV] Product deleted (persisted to LocalStorage):', productId);
    return { success: true };
  }
  return await gasPost({ action: 'deleteProduct', product_id: productId });
};

export const uploadProductImage = async (file) => {
  if (!isGASConfigured()) {
    const url = URL.createObjectURL(file);
    return { success: true, url };
  }
  const toBase64 = (f) => new Promise(resolve => {
    const r = new FileReader();
    r.onload = e => resolve({ name: f.name, data: e.target.result });
    r.readAsDataURL(f);
  });
  const base64 = await toBase64(file);
  return { success: true, base64 };
};

export const getAllProducts = getProducts;
