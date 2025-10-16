// ProtectedRoute.jsx
import { useEffect } from 'react'; 
import { useAuth } from './authContext';
import { useNavigate } from 'react-router-dom';

const ProtectedRoute = ({ children, requireAuth = false }) => {
  const { currentUser, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading) {
      // If requireAuth is true, redirect to login if not authenticated
      // If requireAuth is false (for auth pages), redirect to home if authenticated
      if (requireAuth && !currentUser) {
        navigate('/login');
      } else if (!requireAuth && currentUser) {
        navigate('/');
      }
    }
  }, [currentUser, loading, navigate, requireAuth]);

  if (loading) {
    return <div>Loading...</div>; // Or your loading component
  }

  return children;
};

export default ProtectedRoute;




