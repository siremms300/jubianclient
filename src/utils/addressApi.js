// utils/addressApi.js
import { api } from './api';

export const addressApi = {
  // Get all user addresses
  getUserAddresses: async () => {
    try {
      const response = await api.get('/api/addresses');
      return response.data;
    } catch (error) {
      console.error('Address API Error - getUserAddresses:', error.response?.data);
      throw new Error(error.response?.data?.message || 'Failed to fetch addresses');
    }
  },

  // Get single address
  getAddress: async (addressId) => {
    try {
      const response = await api.get(`/api/addresses/${addressId}`);
      return response.data;
    } catch (error) {
      console.error('Address API Error - getAddress:', error.response?.data);
      throw new Error(error.response?.data?.message || 'Failed to fetch address');
    }
  },

  // Create new address
  createAddress: async (addressData) => {
    try {
      const response = await api.post('/api/addresses', addressData);
      return response.data;
    } catch (error) {
      console.error('Address API Error - createAddress:', error.response?.data);
      throw new Error(error.response?.data?.message || 'Failed to create address');
    }
  },

  // Update address
  updateAddress: async (addressId, addressData) => {
    try {
      const response = await api.put(`/api/addresses/${addressId}`, addressData);
      return response.data;
    } catch (error) {
      console.error('Address API Error - updateAddress:', error.response?.data);
      throw new Error(error.response?.data?.message || 'Failed to update address');
    }
  },

  // Delete address
  deleteAddress: async (addressId) => {
    try {
      const response = await api.delete(`/api/addresses/${addressId}`);
      return response.data;
    } catch (error) {
      console.error('Address API Error - deleteAddress:', error.response?.data);
      throw new Error(error.response?.data?.message || 'Failed to delete address');
    }
  },

  // Set default address
  setDefaultAddress: async (addressId) => {
    try {
      const response = await api.patch(`/api/addresses/${addressId}/default`);
      return response.data;
    } catch (error) {
      console.error('Address API Error - setDefaultAddress:', error.response?.data);
      throw new Error(error.response?.data?.message || 'Failed to set default address');
    }
  }
};