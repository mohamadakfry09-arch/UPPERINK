import { gasRequest, gasPost } from './api';
import { dummyOrders } from '../data/dummyData';

const isGASConfigured = () => {
  const url = import.meta.env.VITE_GAS_URL || '';
  return url && !url.includes('YOUR_SCRIPT_ID');
};

const getLocalOrders = () => {
  const local = localStorage.getItem('upperink_orders');
  if (!local) {
    localStorage.setItem('upperink_orders', JSON.stringify(dummyOrders));
    return dummyOrders;
  }
  return JSON.parse(local);
};

const saveLocalOrders = (orders) => {
  localStorage.setItem('upperink_orders', JSON.stringify(orders));
};

export const createOrder = async (orderData, fileBase64 = null) => {
  if (!isGASConfigured()) {
    const orders = getLocalOrders();
    const newOrder = { ...orderData };
    orders.push(newOrder);
    saveLocalOrders(orders);
    console.log('[DEV] Order created (persisted to LocalStorage):', newOrder);
    return { success: true, order_id: orderData.order_id };
  }

  return await gasPost({
    action: 'createOrder',
    data: orderData,
    file: fileBase64,
  });
};

export const getOrders = async () => {
  if (!isGASConfigured()) {
    return getLocalOrders();
  }

  const result = await gasRequest({ action: 'getOrders' });
  return result?.data || [];
};

export const getOrderByTracking = async (orderId, whatsapp) => {
  if (!isGASConfigured()) {
    const orders = getLocalOrders();
    const order = orders.find(
      (o) =>
        o.order_id.toLowerCase() === orderId.toLowerCase() &&
        o.whatsapp.replace(/\D/g, '') === whatsapp.replace(/\D/g, '')
    );
    return order || null;
  }

  const result = await gasRequest({
    action: 'getOrderByTracking',
    order_id: orderId,
    whatsapp: whatsapp,
  });
  return result?.data || null;
};

export const updateOrder = async (orderId, updateData) => {
  if (!isGASConfigured()) {
    const orders = getLocalOrders();
    const updatedOrders = orders.map(o => o.order_id === orderId ? { ...o, ...updateData } : o);
    saveLocalOrders(updatedOrders);
    console.log('[DEV] Order updated (persisted to LocalStorage):', orderId, updateData);
    return { success: true };
  }

  return await gasPost({
    action: 'updateOrder',
    order_id: orderId,
    data: updateData,
  });
};

export const deleteOrder = async (orderId) => {
  if (!isGASConfigured()) {
    const orders = getLocalOrders();
    const filteredOrders = orders.filter(o => o.order_id !== orderId);
    saveLocalOrders(filteredOrders);
    console.log('[DEV] Order deleted (persisted to LocalStorage):', orderId);
    return { success: true };
  }

  return await gasPost({
    action: 'deleteOrder',
    order_id: orderId,
  });
};
