// utils/api.js - Add these user API functions
export const userApi = {
  // Update user profile
  updateProfile: async (profileData) => {
    try {
      const response = await api.put('/api/users/profile', profileData);
      return response.data;
    } catch (error) {
      console.error('User API Error - updateProfile:', error.response?.data);
      throw new Error(error.response?.data?.message || 'Failed to update profile');
    }
  },

  // Update user password
  updatePassword: async (passwordData) => {
    try {
      const response = await api.put('/api/users/password', passwordData);
      return response.data;
    } catch (error) {
      console.error('User API Error - updatePassword:', error.response?.data);
      throw new Error(error.response?.data?.message || 'Failed to update password');
    }
  },

  // Upload avatar
  uploadAvatar: async (avatarFile) => {
    try {
      const formData = new FormData();
      formData.append('avatar', avatarFile);
      
      const response = await api.post('/api/users/avatar', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      console.error('User API Error - uploadAvatar:', error.response?.data);
      throw new Error(error.response?.data?.message || 'Failed to upload avatar');
    }
  },

  // Delete avatar
  deleteAvatar: async () => {
    try {
      const response = await api.delete('/api/users/avatar');
      return response.data;
    } catch (error) {
      console.error('User API Error - deleteAvatar:', error.response?.data);
      throw new Error(error.response?.data?.message || 'Failed to delete avatar');
    }
  }
};