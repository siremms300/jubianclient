import { api } from './api';

export const cartApi = {
  // Get user's cart
  getCart: async () => {
    try {
      const response = await api.get('/api/cart');
      return response.data;
    } catch (error) {
      console.error('Cart API Error - getCart:', error.response?.data);
      throw new Error(error.response?.data?.message || 'Failed to fetch cart');
    }
  },

  // Add item to cart
  addToCart: async (productId, quantity = 1) => {
    try {
      const response = await api.post('/api/cart/add', { productId, quantity });
      return response.data;
    } catch (error) {
      console.error('Cart API Error - addToCart:', error.response?.data);
      throw new Error(error.response?.data?.message || 'Failed to add item to cart');
    }
  },

  // Update cart item quantity
  updateCartItem: async (cartItemId, quantity) => {
    try {
      const response = await api.put(`/api/cart/update/${cartItemId}`, { quantity });
      return response.data;
    } catch (error) {
      console.error('Cart API Error - updateCartItem:', error.response?.data);
      throw new Error(error.response?.data?.message || 'Failed to update cart item');
    }
  },

  // Remove item from cart
  removeCartItem: async (cartItemId) => {
    try {
      const response = await api.delete(`/api/cart/remove/${cartItemId}`);
      return response.data;
    } catch (error) {
      console.error('Cart API Error - removeCartItem:', error.response?.data);
      throw new Error(error.response?.data?.message || 'Failed to remove item from cart');
    }
  },

  // Clear entire cart
  clearCart: async () => {
    try {
      const response = await api.delete('/api/cart/clear');
      return response.data;
    } catch (error) {
      console.error('Cart API Error - clearCart:', error.response?.data);
      throw new Error(error.response?.data?.message || 'Failed to clear cart');
    }
  },

  // Get cart count
  getCartCount: async () => {
    try {
      const response = await api.get('/api/cart/count');
      return response.data;
    } catch (error) {
      console.error('Cart API Error - getCartCount:', {
        status: error.response?.status,
        data: error.response?.data,
        message: error.message
      });
      throw new Error(error.response?.data?.message || 'Failed to get cart count');
    }
  }
};















// import { api } from './api';

// export const cartApi = {
//   // Get user's cart
//   getCart: async () => {
//     try {
//       const response = await api.get('/api/cart');
//       return response.data;
//     } catch (error) {
//       throw new Error(error.response?.data?.message || 'Failed to fetch cart');
//     }
//   },

//   // Add item to cart
//   addToCart: async (productId, quantity = 1) => {
//     try {
//       const response = await api.post('/api/cart/add', { productId, quantity });
//       return response.data;
//     } catch (error) {
//       throw new Error(error.response?.data?.message || 'Failed to add item to cart');
//     }
//   },

//   // Update cart item quantity
//   updateCartItem: async (cartItemId, quantity) => {
//     try {
//       const response = await api.put(`/api/cart/update/${cartItemId}`, { quantity });
//       return response.data;
//     } catch (error) {
//       throw new Error(error.response?.data?.message || 'Failed to update cart item');
//     }
//   },

//   // Remove item from cart
//   removeCartItem: async (cartItemId) => {
//     try {
//       const response = await api.delete(`/api/cart/remove/${cartItemId}`);
//       return response.data;
//     } catch (error) {
//       throw new Error(error.response?.data?.message || 'Failed to remove item from cart');
//     }
//   },

//   // Clear entire cart
//   clearCart: async () => {
//     try {
//       const response = await api.delete('/api/cart/clear');
//       return response.data;
//     } catch (error) {
//       throw new Error(error.response?.data?.message || 'Failed to clear cart');
//     }
//   },

//   // Get cart count
//   getCartCount: async () => {
//     try {
//       const response = await api.get('/api/cart/count');
//       return response.data;
//     } catch (error) {
//       throw new Error(error.response?.data?.message || 'Failed to get cart count');
//     }
//   }
// };