import { api } from './api';

export const categoryApi = {
  // Get main categories for client navigation
  getMainCategories: async () => {
    try {
      const response = await api.get('/api/categories');
      return response.data;
    } catch (error) {
      console.error('Error fetching categories:', error);
      throw new Error('Failed to fetch categories');
    }
  },

  // Get single category
  getCategory: async (id) => {
    try {
      const response = await api.get(`/api/categories/${id}`);
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch category');
    }
  }
};








