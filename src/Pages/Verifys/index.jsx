import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { styled } from '@mui/material/styles';
import { ArrowBack } from '@mui/icons-material';
import { MyContext } from '../../App';

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

const ResendLink = styled('div')({
  textAlign: 'center',
  marginTop: '1.5rem',
});

const ResendButton = styled('button')({
  background: 'none',
  border: 'none',
  color: '#ef7921',
  cursor: 'pointer',
  fontSize: '0.95rem',
  fontWeight: '500',
  textDecoration: 'underline',
  '&:hover': {
    color: '#e06b15',
  },
  '&:disabled': {
    color: '#9ca3af',
    cursor: 'not-allowed',
  },
});

const Countdown = styled('span')({
  color: '#6b7280',
  fontSize: '0.9rem',
  marginLeft: '0.5rem',
});

const Verify = () => {
  const [verificationCode, setVerificationCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [canResend, setCanResend] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const navigate = useNavigate();
  const context = useContext(MyContext);

  // Get email from context
  const userEmail = context.forgotPasswordEmail || '';

  // Initialize with empty values and no auto-fill
  useEffect(() => {
    setVerificationCode('');
    setCanResend(true);
  }, []);

  // Countdown timer effect
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else if (countdown === 0 && !canResend) {
      setCanResend(true);
    }
  }, [countdown, canResend]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    if (!verificationCode) {
      toast.error('Please enter the verification code');
      setIsLoading(false);
      return;
    }

    // Simulate API call to verify OTP
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Check if OTP is correct (in real app, this would be API validation)
    if (verificationCode === '123456') { // Demo code
      toast.success('OTP verified successfully!');
      setIsLoading(false);
      navigate('/reset-password'); // Redirect to reset password page
    } else {
      toast.error('Invalid verification code. Please try again.');
      setIsLoading(false);
    }
  };

  const handleResendCode = () => {
    if (!userEmail) {
      toast.error('No email address found');
      return;
    }

    if (!canResend) return;

    // Start countdown (60 seconds)
    setCanResend(false);
    setCountdown(60);
    
    // Simulate sending verification code
    toast.info(`Verification code sent to ${userEmail}`);
  };

  const handleBack = () => {
    navigate(-1);
  };

  const formatCountdown = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <Container>
      <FormContainer>
        <BackButton onClick={handleBack}>
          <ArrowBack />
        </BackButton>
        
        <Heading>Verify Your Email</Heading>
        <Subtitle>
          Enter the 6-digit verification code sent to {userEmail || 'your email'}
        </Subtitle>
        
        <form onSubmit={handleSubmit}>
          <InputField
            label="Verification Code"
            variant="outlined"
            fullWidth
            value={verificationCode}
            onChange={(e) => setVerificationCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
            required
            placeholder="Enter 6-digit code"
            autoComplete="off"
            inputProps={{
              maxLength: 6,
              autoComplete: 'new-password',
            }}
          />
          
          <SubmitButton 
            type="submit" 
            variant="contained" 
            fullWidth 
            disabled={isLoading}
          >
            {isLoading ? 'Verifying...' : 'Verify Code'}
          </SubmitButton>
        </form>
        
        <ResendLink>
          Didn't receive the code?{' '}
          <ResendButton
            type="button"
            onClick={handleResendCode}
            disabled={!canResend}
          >
            Resend code
          </ResendButton>
          {countdown > 0 && (
            <Countdown>
              (wait {formatCountdown(countdown)})
            </Countdown>
          )}
        </ResendLink>
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

export default Verify;





































// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import Button from '@mui/material/Button';
// import TextField from '@mui/material/TextField';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { styled } from '@mui/material/styles';
// import { ArrowBack } from '@mui/icons-material';

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

// const ResendLink = styled('div')({
//   textAlign: 'center',
//   marginTop: '1.5rem',
// });

// const ResendButton = styled('button')({
//   background: 'none',
//   border: 'none',
//   color: '#ef7921',
//   cursor: 'pointer',
//   fontSize: '0.95rem',
//   fontWeight: '500',
//   textDecoration: 'underline',
//   '&:hover': {
//     color: '#e06b15',
//   },
//   '&:disabled': {
//     color: '#9ca3af',
//     cursor: 'not-allowed',
//   },
// });

// const Countdown = styled('span')({
//   color: '#6b7280',
//   fontSize: '0.9rem',
//   marginLeft: '0.5rem',
// });

// const Verify = () => {
//   const [email, setEmail] = useState('');
//   const [verificationCode, setVerificationCode] = useState('');
//   const [isLoading, setIsLoading] = useState(false);
//   const [canResend, setCanResend] = useState(false);
//   const [countdown, setCountdown] = useState(0);
//   const navigate = useNavigate();

//   // Initialize with empty values and no auto-fill
//   useEffect(() => {
//     // Clear any potential auto-fill values
//     setEmail('');
//     setVerificationCode('');
    
//     // Start with canResend as true (no countdown initially)
//     setCanResend(true);
//   }, []);

//   // Countdown timer effect
//   useEffect(() => {
//     if (countdown > 0) {
//       const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
//       return () => clearTimeout(timer);
//     } else if (countdown === 0 && !canResend) {
//       setCanResend(true);
//     }
//   }, [countdown, canResend]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsLoading(true);
    
//     if (!email || !verificationCode) {
//       toast.error('Please fill in all fields');
//       setIsLoading(false);
//       return;
//     }

//     // Simulate API call
//     await new Promise(resolve => setTimeout(resolve, 1500));
    
//     toast.success('Email verified successfully!');
//     setIsLoading(false);
//     navigate('/reset-password'); // Redirect to reset password page
//   };

//   const handleResendCode = () => {
//     if (!email) {
//       toast.error('Please enter your email address first');
//       return;
//     }

//     if (!canResend) return;

//     // Start countdown (60 seconds)
//     setCanResend(false);
//     setCountdown(60);
    
//     // Simulate sending verification code
//     toast.info(`Verification code sent to ${email}`);
//   };

//   const handleBack = () => {
//     navigate(-1); // Go back to previous page
//   };

//   const formatCountdown = (seconds) => {
//     const mins = Math.floor(seconds / 60);
//     const secs = seconds % 60;
//     return `${mins}:${secs.toString().padStart(2, '0')}`;
//   };

//   return (
//     <Container>
//       <FormContainer>
//         <BackButton onClick={handleBack}>
//           <ArrowBack />
//         </BackButton>
        
//         <Heading>Verify Your Email</Heading>
//         <Subtitle>
//           Enter the verification code sent to your email address
//         </Subtitle>
        
//         <form onSubmit={handleSubmit}>
//           <InputField
//             label="Email Address"
//             variant="outlined"
//             fullWidth
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//             type="email"
//             autoComplete="off"
//             inputProps={{
//               autoComplete: 'new-email', // Prevent auto-fill
//             }}
//           />
          
//           <InputField
//             label="Verification Code"
//             variant="outlined"
//             fullWidth
//             value={verificationCode}
//             onChange={(e) => setVerificationCode(e.target.value)}
//             required
//             placeholder="Enter 6-digit code"
//             autoComplete="off"
//             inputProps={{
//               maxLength: 6,
//               autoComplete: 'new-password', // Prevent auto-fill
//             }}
//           />
          
//           <SubmitButton 
//             type="submit" 
//             variant="contained" 
//             fullWidth 
//             disabled={isLoading}
//           >
//             {isLoading ? 'Verifying...' : 'Verify Email'}
//           </SubmitButton>
//         </form>
        
//         <ResendLink>
//           Didn't receive the code?{' '}
//           <ResendButton
//             type="button"
//             onClick={handleResendCode}
//             disabled={!canResend || !email}
//           >
//             Resend code
//           </ResendButton>
//           {countdown > 0 && (
//             <Countdown>
//               (wait {formatCountdown(countdown)})
//             </Countdown>
//           )}
//         </ResendLink>
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

// export default Verify;
