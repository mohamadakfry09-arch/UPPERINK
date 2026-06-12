import { gasRequest, gasPost } from './api';
import { dummyGallery } from '../data/dummyData';

const isGASConfigured = () => {
  const url = import.meta.env.VITE_GAS_URL || '';
  return url && !url.includes('YOUR_SCRIPT_ID');
};

const getLocalGallery = () => {
  const local = localStorage.getItem('upperink_gallery');
  if (!local) {
    localStorage.setItem('upperink_gallery', JSON.stringify(dummyGallery));
    return dummyGallery;
  }
  return JSON.parse(local);
};

const saveLocalGallery = (gallery) => {
  localStorage.setItem('upperink_gallery', JSON.stringify(gallery));
};

export const getGallery = async () => {
  if (!isGASConfigured()) return getLocalGallery();
  const result = await gasRequest({ action: 'getGallery' });
  return result?.data || [];
};

export const createGallery = async (galleryData, fileBase64 = null) => {
  if (!isGASConfigured()) {
    const gallery = getLocalGallery();
    const newItem = { ...galleryData };
    if (fileBase64 && fileBase64.data) {
      newItem.gambar_url = fileBase64.data;
    }
    gallery.push(newItem);
    saveLocalGallery(gallery);
    console.log('[DEV] Gallery created (persisted to LocalStorage):', newItem);
    return { success: true };
  }
  return await gasPost({ action: 'createGallery', data: galleryData, file: fileBase64 });
};

export const deleteGallery = async (galleryId) => {
  if (!isGASConfigured()) {
    const gallery = getLocalGallery();
    const filteredGallery = gallery.filter(g => g.gallery_id !== galleryId);
    saveLocalGallery(filteredGallery);
    console.log('[DEV] Gallery deleted (persisted to LocalStorage):', galleryId);
    return { success: true };
  }
  return await gasPost({ action: 'deleteGallery', gallery_id: galleryId });
};
