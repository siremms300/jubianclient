// utils/orderApi.js
import { api } from './api';

export const orderApi = {
  // Create new order
  createOrder: async (orderData) => {
    try {
      const response = await api.post('/api/orders/create', orderData);
      return response.data;
    } catch (error) {
      console.error('Order API Error - createOrder:', error.response?.data);
      throw new Error(error.response?.data?.message || 'Failed to create order');
    }
  },

  // Get user's orders
  getUserOrders: async () => {
    try {
      const response = await api.get('/api/orders');
      return response.data;
    } catch (error) {
      console.error('Order API Error - getUserOrders:', error.response?.data);
      throw new Error(error.response?.data?.message || 'Failed to fetch orders');
    }
  },

  // Get single order
  getOrder: async (orderId) => {
    try {
      const response = await api.get(`/api/orders/${orderId}`);
      return response.data;
    } catch (error) {
      console.error('Order API Error - getOrder:', error.response?.data);
      throw new Error(error.response?.data?.message || 'Failed to fetch order');
    }
  }
};
