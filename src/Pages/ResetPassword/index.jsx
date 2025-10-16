import React, { useState, useContext } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { styled } from '@mui/material/styles';
import { ArrowBack } from '@mui/icons-material';
import { MyContext } from '../../App';
import { resetPassword } from '../../utils/api';

// Styled components
const Container = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: '100vh',
  backgroundColor: '#f8fafc',
  padding: '1rem',
});

const FormContainer = styled('div')({
  backgroundColor: '#fff',
  padding: '2.5rem',
  borderRadius: '12px',
  boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
  width: '100%',
  maxWidth: '450px',
  position: 'relative',
});

const BackButton = styled(Button)({
  position: 'absolute',
  top: '1rem',
  left: '1rem',
  minWidth: 'auto',
  padding: '0.5rem',
  color: '#6b7280',
  '&:hover': {
    backgroundColor: 'rgba(0, 0, 0, 0.04)',
  },
});

const Heading = styled('h2')({
  textAlign: 'center',
  marginBottom: '0.5rem',
  color: '#1f2937',
  fontWeight: '600',
  fontSize: '1.75rem',
  marginTop: '0',
});

const Subtitle = styled('p')({
  textAlign: 'center',
  color: '#6b7280',
  marginBottom: '2rem',
  fontSize: '1rem',
  lineHeight: '1.5',
});

const InputField = styled(TextField)({
  marginBottom: '1.5rem',
  '& .MuiOutlinedInput-root': {
    borderRadius: '8px',
  },
});

const SubmitButton = styled(Button)({
  marginTop: '0.5rem',
  backgroundColor: '#ef7921',
  padding: '0.75rem',
  borderRadius: '8px',
  fontWeight: '600',
  fontSize: '1rem',
  textTransform: 'none',
  '&:hover': {
    backgroundColor: '#e06b15',
  },
  '&:disabled': {
    backgroundColor: '#d1d5db',
    color: '#9ca3af',
  },
});

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const context = useContext(MyContext);
  const [searchParams] = useSearchParams();

  // Get email and code from URL parameters or context
  const emailFromUrl = searchParams.get('email');
  const codeFromUrl = searchParams.get('code');
  const userEmail = emailFromUrl || context.forgotPasswordEmail || '';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    if (!newPassword || !confirmPassword) {
      toast.error('Please fill in all fields');
      setIsLoading(false);
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error('Passwords do not match');
      setIsLoading(false);
      return;
    }

    if (newPassword.length < 6) {
      toast.error('Password must be at least 6 characters long');
      setIsLoading(false);
      return;
    }

    if (!userEmail || !codeFromUrl) {
      toast.error('Invalid reset link. Please request a new password reset.');
      setIsLoading(false);
      return;
    }

    try {
      // Call the API to reset password
      const resetData = {
        email: userEmail,
        code: codeFromUrl,
        newPassword: newPassword
      };

      const response = await resetPassword(resetData);
      
      if (response.success) {
        toast.success('Password reset successfully!');
        
        // Clear the stored email from context
        if (context.setForgotPasswordEmail) {
          context.setForgotPasswordEmail('');
        }
        
        // Redirect to login page after a short delay
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      } else {
        toast.error(response.message || 'Password reset failed');
      }
    } catch (error) {
      console.error('Password reset error:', error);
      toast.error(error.message || 'Password reset failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <Container>
      <FormContainer>
        <BackButton onClick={handleBack}>
          <ArrowBack />
        </BackButton>
        
        <Heading>Reset Your Password</Heading>
        <Subtitle>
          Create a new password for {userEmail || 'your account'}
        </Subtitle>
        
        <form onSubmit={handleSubmit}>
          <InputField
            label="New Password"
            variant="outlined"
            type={showPassword ? 'text' : 'password'}
            fullWidth
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
            autoComplete="new-password"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton 
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          
          <InputField
            label="Confirm New Password"
            variant="outlined"
            type={showConfirmPassword ? 'text' : 'password'}
            fullWidth
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            autoComplete="new-password"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton 
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    edge="end"
                  >
                    {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          
          <SubmitButton 
            type="submit" 
            variant="contained" 
            fullWidth 
            disabled={isLoading}
          >
            {isLoading ? 'Resetting Password...' : 'Reset Password'}
          </SubmitButton>
        </form>
      </FormContainer>
      
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </Container>
  );
};

export default ResetPassword;




























// import React, { useState, useContext } from 'react';
// import { useNavigate } from 'react-router-dom';
// import Button from '@mui/material/Button';
// import TextField from '@mui/material/TextField';
// import IconButton from '@mui/material/IconButton';
// import InputAdornment from '@mui/material/InputAdornment';
// import { Visibility, VisibilityOff } from '@mui/icons-material';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { styled } from '@mui/material/styles';
// import { ArrowBack } from '@mui/icons-material';
// import { MyContext } from '../../App';

// // Styled components
// const Container = styled('div')({
//   display: 'flex',
//   justifyContent: 'center',
//   alignItems: 'center',
//   minHeight: '100vh',
//   backgroundColor: '#f8fafc',
//   padding: '1rem',
// });

// const FormContainer = styled('div')({
//   backgroundColor: '#fff',
//   padding: '2.5rem',
//   borderRadius: '12px',
//   boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
//   width: '100%',
//   maxWidth: '450px',
//   position: 'relative',
// });

// const BackButton = styled(Button)({
//   position: 'absolute',
//   top: '1rem',
//   left: '1rem',
//   minWidth: 'auto',
//   padding: '0.5rem',
//   color: '#6b7280',
//   '&:hover': {
//     backgroundColor: 'rgba(0, 0, 0, 0.04)',
//   },
// });

// const Heading = styled('h2')({
//   textAlign: 'center',
//   marginBottom: '0.5rem',
//   color: '#1f2937',
//   fontWeight: '600',
//   fontSize: '1.75rem',
//   marginTop: '0',
// });

// const Subtitle = styled('p')({
//   textAlign: 'center',
//   color: '#6b7280',
//   marginBottom: '2rem',
//   fontSize: '1rem',
//   lineHeight: '1.5',
// });

// const InputField = styled(TextField)({
//   marginBottom: '1.5rem',
//   '& .MuiOutlinedInput-root': {
//     borderRadius: '8px',
//   },
// });

// const SubmitButton = styled(Button)({
//   marginTop: '0.5rem',
//   backgroundColor: '#ef7921',
//   padding: '0.75rem',
//   borderRadius: '8px',
//   fontWeight: '600',
//   fontSize: '1rem',
//   textTransform: 'none',
//   '&:hover': {
//     backgroundColor: '#e06b15',
//   },
//   '&:disabled': {
//     backgroundColor: '#d1d5db',
//     color: '#9ca3af',
//   },
// });

// const ResetPassword = () => {
//   const [newPassword, setNewPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const navigate = useNavigate();
//   const context = useContext(MyContext);

//   // Get email from context
//   const userEmail = context.forgotPasswordEmail || '';

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsLoading(true);
    
//     if (!newPassword || !confirmPassword) {
//       toast.error('Please fill in all fields');
//       setIsLoading(false);
//       return;
//     }

//     if (newPassword !== confirmPassword) {
//       toast.error('Passwords do not match');
//       setIsLoading(false);
//       return;
//     }

//     if (newPassword.length < 6) {
//       toast.error('Password must be at least 6 characters long');
//       setIsLoading(false);
//       return;
//     }

//     // Simulate API call to reset password
//     await new Promise(resolve => setTimeout(resolve, 1500));
    
//     toast.success('Password reset successfully!');
//     setIsLoading(false);
    
//     // Clear the stored email from context
//     if (context.setForgotPasswordEmail) {
//       context.setForgotPasswordEmail('');
//     }
    
//     // Redirect to login page after a short delay
//     setTimeout(() => { 
//       navigate('/login');
//     }, 2000);
//   };

//   const handleBack = () => {
//     navigate(-1);
//   };

//   return (
//     <Container>
//       <FormContainer>
//         <BackButton onClick={handleBack}>
//           <ArrowBack />
//         </BackButton>
        
//         <Heading>Reset Your Password</Heading>
//         <Subtitle>
//           Create a new password for {userEmail || 'your account'}
//         </Subtitle>
        
//         <form onSubmit={handleSubmit}>
//           <InputField
//             label="New Password"
//             variant="outlined"
//             type={showPassword ? 'text' : 'password'}
//             fullWidth
//             value={newPassword}
//             onChange={(e) => setNewPassword(e.target.value)}
//             required
//             autoComplete="new-password"
//             InputProps={{
//               endAdornment: (
//                 <InputAdornment position="end">
//                   <IconButton 
//                     onClick={() => setShowPassword(!showPassword)}
//                     edge="end"
//                   >
//                     {showPassword ? <VisibilityOff /> : <Visibility />}
//                   </IconButton>
//                 </InputAdornment>
//               ),
//             }}
//           />
          
//           <InputField
//             label="Confirm New Password"
//             variant="outlined"
//             type={showConfirmPassword ? 'text' : 'password'}
//             fullWidth
//             value={confirmPassword}
//             onChange={(e) => setConfirmPassword(e.target.value)}
//             required
//             autoComplete="new-password"
//             InputProps={{
//               endAdornment: (
//                 <InputAdornment position="end">
//                   <IconButton 
//                     onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//                     edge="end"
//                   >
//                     {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
//                   </IconButton>
//                 </InputAdornment>
//               ),
//             }}
//           />
          
//           <SubmitButton 
//             type="submit" 
//             variant="contained" 
//             fullWidth 
//             disabled={isLoading}
//           >
//             {isLoading ? 'Resetting Password...' : 'Reset Password'}
//           </SubmitButton>
//         </form>
//       </FormContainer>
      
//       <ToastContainer
//         position="top-right"
//         autoClose={3000}
//         hideProgressBar={false}
//         newestOnTop={false}
//         closeOnClick
//         rtl={false}
//         pauseOnFocusLoss
//         draggable
//         pauseOnHover
//       />
//     </Container>
//   );
// };

// export default ResetPassword;