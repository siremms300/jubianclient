// // import React, { createContext, useContext, useState, useEffect } from 'react';
// // import { toast } from 'react-toastify';
// // import { getCurrentUser } from '../utils/api';

// // const AuthContext = createContext();

// // export const useAuth = () => {
// //   return useContext(AuthContext);
// // };

// // export const AuthProvider = ({ children }) => {
// //   const [currentUser, setCurrentUser] = useState(null);
// //   const [loading, setLoading] = useState(true);

// //   useEffect(() => {
// //     // Check if user is logged in on app load
// //     checkAuthStatus();
// //   }, []);

// //   const checkAuthStatus = async () => {

// //     if (window.location.pathname === '/reset-password') {
// //     setLoading(false);
// //     return;
// //     } 
// //     try {
// //       // Try to get user data from backend to verify authentication
// //       const response = await getCurrentUser();
      
// //       if (response.success) {
// //         setCurrentUser(response.data);
// //         // Store token if it's returned (for Authorization header)
// //         if (response.token) {
// //           localStorage.setItem('token', response.token);
// //         }
// //       } else {
// //         // If no valid session, clear any stored token
// //         localStorage.removeItem('token');
// //         setCurrentUser(null);
// //       }
// //     } catch (error) {
// //       console.error('Auth check failed:', error); 
// //       if (window.location.pathname !== '/reset-password') {
// //       localStorage.removeItem('token');
// //       setCurrentUser(null);
// //       }

// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const login = (userData, authToken = null) => {
// //     // Store token in localStorage if provided (for Authorization header)
// //     if (authToken) {
// //       localStorage.setItem('token', authToken);
// //     }
// //     setCurrentUser(userData);
// //   };

// //   const logout = async () => {
// //     try {
// //       // Call logout endpoint to clear server cookies
// //       const { api } = await import('../utils/api');
// //       await api.post('/api/users/logout');
// //     } catch (error) {
// //       console.error('Logout API call failed:', error);
// //       // Still proceed with client-side cleanup even if server call fails
// //     } finally {
// //       // Clear client-side storage
// //       localStorage.removeItem('token');
// //       setCurrentUser(null);
// //       toast.success('Logout successful!');
// //     }
// //   };

// //   const value = {
// //     currentUser,
// //     login,
// //     logout,
// //     loading,
// //     checkAuthStatus
// //   };

// //   // return (
// //   //   <AuthContext.Provider value={value}>
// //   //     {!loading && children}
// //   //   </AuthContext.Provider>
// //   // );

// //   return (
// //   <AuthContext.Provider value={value}>
// //     {children}
// //   </AuthContext.Provider>
// // );

// // };

 


// import React, { createContext, useContext, useState, useEffect } from 'react';
// import { toast } from 'react-toastify';
// import { getCurrentUser } from '../utils/api';

// const AuthContext = createContext();

// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error('useAuth must be used within an AuthProvider');
//   }
//   return context;
// };

// export const AuthProvider = ({ children }) => {
//   const [currentUser, setCurrentUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     checkAuthStatus();
//   }, []);

//   const checkAuthStatus = async () => {
//     if (window.location.pathname === '/reset-password') {
//       setLoading(false);
//       return;
//     } 
//     try {
//       const response = await getCurrentUser();
      
//       if (response.success) {
//         setCurrentUser(response.data);
//         if (response.token) {
//           localStorage.setItem('token', response.token);
//         }
//       } else {
//         localStorage.removeItem('token');
//         setCurrentUser(null);
//       }
//     } catch (error) {
//       console.error('Auth check failed:', error); 
//       if (window.location.pathname !== '/reset-password') {
//         localStorage.removeItem('token');
//         setCurrentUser(null);
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   const login = (userData, authToken = null) => {
//     if (authToken) {
//       localStorage.setItem('token', authToken);
//     }
//     setCurrentUser(userData);
//   };

//   const logout = async () => {
//     try {
//       const { api } = await import('../utils/api');
//       await api.post('/api/users/logout');
//     } catch (error) {
//       console.error('Logout API call failed:', error);
//     } finally {
//       localStorage.removeItem('token');
//       setCurrentUser(null);
//       toast.success('Logout successful!');
//     }
//   };

//   const value = {
//     currentUser,
//     login,
//     logout,
//     loading,
//     checkAuthStatus
//   };

//   return (
//     <AuthContext.Provider value={value}>
//       {children}
//     </AuthContext.Provider>
//   );
// };


























import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { getCurrentUser } from '../utils/api';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    if (window.location.pathname === '/reset-password') {
      setLoading(false);
      return;
    } 
    try {
      const response = await getCurrentUser();
      
      if (response.success) {
        setCurrentUser(response.data);
        if (response.token) {
          localStorage.setItem('token', response.token);
        }
      } else {
        localStorage.removeItem('token');
        setCurrentUser(null);
      }
    } catch (error) {
      console.error('Auth check failed:', error); 
      if (window.location.pathname !== '/reset-password') {
        localStorage.removeItem('token');
        setCurrentUser(null);
      }
    } finally {
      setLoading(false);
    }
  };

  const login = (userData, authToken = null) => {
    if (authToken) {
      localStorage.setItem('token', authToken);
    }
    setCurrentUser(userData);
    
    // Trigger cart refresh after login
    setTimeout(() => {
      window.dispatchEvent(new Event('cartRefresh'));
    }, 1000);
  };

  const logout = async () => {
    try {
      const { api } = await import('../utils/api');
      await api.post('/api/users/logout');
    } catch (error) {
      console.error('Logout API call failed:', error);
    } finally {
      localStorage.removeItem('token');
      setCurrentUser(null);
      toast.success('Logout successful!');
    }
  };

  const value = {
    currentUser,
    login,
    logout,
    loading,
    checkAuthStatus
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};