import axios from 'axios';

const GAS_URL = import.meta.env.VITE_GAS_URL || '';

// Axios instance untuk Google Apps Script
const gasApi = axios.create({
  baseURL: GAS_URL,
  timeout: 30000,
});

// Gunakan XMLHttpRequest untuk GAS (karena CORS)
export const gasRequest = async (params) => {
  if (!GAS_URL || GAS_URL.includes('YOUR_SCRIPT_ID')) {
    // Return null jika GAS belum dikonfigurasi
    return null;
  }

  try {
    const queryString = new URLSearchParams(params).toString();
    const response = await fetch(`${GAS_URL}?${queryString}`, {
      method: 'GET',
      mode: 'cors',
    });
    const data = await response.json();
    if (data && data.success === false) {
      throw new Error(data.message || 'Request failed');
    }
    return data;
  } catch (error) {
    console.error('GAS GET Error:', error);
    throw error;
  }
};

export const gasPost = async (body) => {
  if (!GAS_URL || GAS_URL.includes('YOUR_SCRIPT_ID')) {
    return null;
  }

  try {
    const response = await fetch(GAS_URL, {
      method: 'POST',
      mode: 'cors',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify(body),
    });
    const data = await response.json();
    if (data && data.success === false) {
      throw new Error(data.message || 'Request failed');
    }
    return data;
  } catch (error) {
    console.error('GAS POST Error:', error);
    throw error;
  }
};

export default gasApi;
