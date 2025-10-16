import React, { useState, useContext } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Google } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { MyContext } from '../../App'; 
import { styled } from '@mui/material/styles';
import { useAuth } from '../../context/authContext';
import { loginUser } from '../../utils/api';
import { forgotPassword } from '../../utils/api';

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
  maxWidth: '420px',
});

const Heading = styled('h2')({
  textAlign: 'center',
  marginBottom: '2rem',
  color: '#1f2937',
  fontWeight: '600',
  fontSize: '1.75rem',
});

const InputField = styled(TextField)({
  marginBottom: '1.25rem',
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
});

const GoogleButton = styled(Button)({
  marginTop: '1rem',
  padding: '0.75rem',
  borderRadius: '8px',
  fontWeight: '600',
  fontSize: '1rem',
  textTransform: 'none',
  borderColor: '#d1d5db',
  color: '#374151',
  '&:hover': {
    borderColor: '#9ca3af',
    backgroundColor: 'rgba(0, 0, 0, 0.04)',
  },
});

const SwitchLink = styled('p')({
  textAlign: 'center',
  marginTop: '1.5rem',
  color: '#6b7280',
  fontSize: '0.95rem',
});

const LinkText = styled('a')({
  color: '#ef7921',
  textDecoration: 'none',
  fontWeight: '500',
  cursor: 'pointer',
  '&:hover': {
    textDecoration: 'underline',
  },
});

const ForgotPassword = styled('div')({
  textAlign: 'right',
  marginTop: '-0.5rem',
  marginBottom: '1rem',
});

const ForgotLink = styled('a')({
  color: '#6b7280',
  textDecoration: 'none',
  fontSize: '0.9rem',
  cursor: 'pointer',
  '&:hover': {
    color: '#ef7921',
    textDecoration: 'underline',
  },
});

const Divider = styled('div')({
  display: 'flex',
  alignItems: 'center',
  margin: '1.5rem 0',
  color: '#9ca3af',
  '&::before, &::after': {
    content: '""',
    flex: 1,
    height: '1px',
    backgroundColor: '#e5e7eb',
  },
  '& span': {
    padding: '0 1rem',
    fontSize: '0.9rem',
  },
});

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const context = useContext(MyContext);
  const navigate = useNavigate();
  const { login } = useAuth();

  
// In your ForgotPassword component (if you have one)

const handleForgotPassword = async () => {
  if (!email) {
    toast.error('Please enter your email address first');
    return;
  }

  try {
    const response = await forgotPassword(email);
    
    if (response.success) {
      toast.info(`If the email exists, a password reset link has been sent to ${email}`);
      
      // Store email in context for use in reset password page
      if (context.setForgotPasswordEmail) {
        context.setForgotPasswordEmail(email);
      }
    } else {
      toast.error(response.message || 'Failed to send reset email');
    }
  } catch (error) {
    console.error('Forgot password error:', error);
    toast.error(error.message || 'Failed to send reset email. Please try again.');
  }
};

// In your Login component 

// const handleForgotPassword = async () => {
//   if (!email) {
//     toast.error('Please enter your email address first');
//     return;
//   }

//   try {
//     const response = await forgotPassword(email);
    
//     if (response.success) {
//       toast.info(`If the email exists, a password reset link has been sent to ${email}`);
      
//       // Store email in context for use in OTP and reset password pages
//       if (context.setForgotPasswordEmail) {
//         context.setForgotPasswordEmail(email);
//       }
      
//       // Redirect to verify page (if using OTP) or show success message
//       navigate('/reset-password');
//     } else {
//       toast.error(response.message || 'Failed to send reset email');
//     }
//   } catch (error) {
//     console.error('Forgot password error:', error);
//     toast.error(error.message || 'Failed to send reset email. Please try again.');
//   }
// };
  
  
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const credentials = { email, password };
      const response = await loginUser(credentials);
      
      if (response.success) {
        // Store user data and token using auth context
        login(response.data, response.token);
        
        // Update global context if needed
        if (context.setIsLogin) {
          context.setIsLogin(true);
        }
        
        toast.success('Login successful!');
        navigate('/'); // Redirect to home page
      } else {
        toast.error(response.message || 'Login failed');
      }
    } catch (error) {
      console.error('Login error:', error);
      toast.error(error.message || 'Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignup = () => {
    toast.info('Redirecting to Google authentication...');
  };

  return (
    <Container>
      <FormContainer>
        <Heading>Welcome Back</Heading>
        
        <form onSubmit={handleSubmit}>
          <InputField
            label="Email Address"
            variant="outlined"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            type="email"
          />
          
          <InputField
            label="Password"
            variant="outlined"
            type={showPassword ? 'text' : 'password'}
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
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
          
          <ForgotPassword>
            <ForgotLink onClick={handleForgotPassword}>
              Forgot your password?
            </ForgotLink>
          </ForgotPassword>
          
          <SubmitButton 
            type="submit" 
            variant="contained" 
            fullWidth 
            disabled={isLoading}
          >
            {isLoading ? 'Signing in...' : 'Sign In'}
          </SubmitButton>
        </form>
        
        <Divider>
          <span>or</span>
        </Divider>
        
        <GoogleButton
          variant="outlined"
          fullWidth
          onClick={handleGoogleSignup}
          startIcon={<Google />}
        >
          Continue with Google
        </GoogleButton>
        
        <SwitchLink>
          Don't have an account?{' '}
          <LinkText href="/register">
            Create an account
          </LinkText>
        </SwitchLink>
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

export default Login;
































// import React, { useState, useContext } from 'react';
// import Button from '@mui/material/Button';
// import TextField from '@mui/material/TextField';
// import IconButton from '@mui/material/IconButton';
// import InputAdornment from '@mui/material/InputAdornment';
// import { Visibility, VisibilityOff } from '@mui/icons-material';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { Google } from '@mui/icons-material';
// import { useNavigate } from 'react-router-dom';
// import { MyContext } from '../../App'; 
// import { styled } from '@mui/material/styles';

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
//   maxWidth: '420px',
// });

// const Heading = styled('h2')({
//   textAlign: 'center',
//   marginBottom: '2rem',
//   color: '#1f2937',
//   fontWeight: '600',
//   fontSize: '1.75rem',
// });

// const InputField = styled(TextField)({
//   marginBottom: '1.25rem',
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
// });

// const GoogleButton = styled(Button)({
//   marginTop: '1rem',
//   padding: '0.75rem',
//   borderRadius: '8px',
//   fontWeight: '600',
//   fontSize: '1rem',
//   textTransform: 'none',
//   borderColor: '#d1d5db',
//   color: '#374151',
//   '&:hover': {
//     borderColor: '#9ca3af',
//     backgroundColor: 'rgba(0, 0, 0, 0.04)',
//   },
// });

// const SwitchLink = styled('p')({
//   textAlign: 'center',
//   marginTop: '1.5rem',
//   color: '#6b7280',
//   fontSize: '0.95rem',
// });

// const LinkText = styled('a')({
//   color: '#ef7921',
//   textDecoration: 'none',
//   fontWeight: '500',
//   cursor: 'pointer',
//   '&:hover': {
//     textDecoration: 'underline',
//   },
// });

// const ForgotPassword = styled('div')({
//   textAlign: 'right',
//   marginTop: '-0.5rem',
//   marginBottom: '1rem',
// });

// const ForgotLink = styled('a')({
//   color: '#6b7280',
//   textDecoration: 'none',
//   fontSize: '0.9rem',
//   cursor: 'pointer',
//   '&:hover': {
//     color: '#ef7921',
//     textDecoration: 'underline',
//   },
// });

// const Divider = styled('div')({
//   display: 'flex',
//   alignItems: 'center',
//   margin: '1.5rem 0',
//   color: '#9ca3af',
//   '&::before, &::after': {
//     content: '""',
//     flex: 1,
//     height: '1px',
//     backgroundColor: '#e5e7eb',
//   },
//   '& span': {
//     padding: '0 1rem',
//     fontSize: '0.9rem',
//   },
// });

// const Login = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [showPassword, setShowPassword] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);

//   const context = useContext(MyContext);
//   const navigate = useNavigate();

//   const handleForgotPassword = () => {
//     if (!email) {
//       toast.error('Please enter your email address first');
//       return;
//     }

//     // Simulate sending OTP
//     toast.info(`OTP sent to ${email}`);
    
//     // Store email in context for use in OTP and reset password pages
//     if (context.setForgotPasswordEmail) {
//       context.setForgotPasswordEmail(email);
//     }
    
//     // Redirect to OTP verification page
//     navigate('/verify');
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsLoading(true);
    
//     // Simulate API call
//     await new Promise(resolve => setTimeout(resolve, 1500));
    
//     toast.success('Login successful!');
//     setIsLoading(false);
//   };

//   const handleGoogleSignup = () => {
//     toast.info('Redirecting to Google authentication...');
//   };

//   return (
//     <Container>
//       <FormContainer>
//         <Heading>Welcome Back</Heading>
        
//         <form onSubmit={handleSubmit}>
//           <InputField
//             label="Email Address"
//             variant="outlined"
//             fullWidth
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//             type="email"
//           />
          
//           <InputField
//             label="Password"
//             variant="outlined"
//             type={showPassword ? 'text' : 'password'}
//             fullWidth
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
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
          
//           <ForgotPassword>
//             <ForgotLink onClick={handleForgotPassword}>
//               Forgot your password?
//             </ForgotLink>
//           </ForgotPassword>
          
//           <SubmitButton 
//             type="submit" 
//             variant="contained" 
//             fullWidth 
//             disabled={isLoading}
//           >
//             {isLoading ? 'Signing in...' : 'Sign In'}
//           </SubmitButton>
//         </form>
        
//         <Divider>
//           <span>or</span>
//         </Divider>
        
//         <GoogleButton
//           variant="outlined"
//           fullWidth
//           onClick={handleGoogleSignup}
//           startIcon={<Google />}
//         >
//           Continue with Google
//         </GoogleButton>
        
//         <SwitchLink>
//           Don't have an account?{' '}
//           <LinkText href="/register">
//             Create an account
//           </LinkText>
//         </SwitchLink>
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

// export default Login;


































// import React, { useState, useContext } from 'react';
// import Button from '@mui/material/Button';
// import TextField from '@mui/material/TextField';
// import IconButton from '@mui/material/IconButton';
// import InputAdornment from '@mui/material/InputAdornment';
// import { Visibility, VisibilityOff } from '@mui/icons-material';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { Google } from '@mui/icons-material'; // Google logo from Material-UI
// import { useNavigate } from 'react-router-dom';
// import { MyContext } from '../../App'; 








// const Login = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [showPassword, setShowPassword] = useState(false);


//   const context = useContext(MyContext) 


//   const history = useNavigate() 

//   const forgotPassword = ()=> {
//     // if (email === "") {
//       history("/verify") 
//     // }
//   }

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     toast.success('Login successful!');
//   };

//   const handleGoogleSignup = () => {
//     toast.info('Sign up with Google clicked!');
//   };

//   return (
//     <div style={styles.container}>
//       <div style={styles.form}>
//         <h2 style={styles.heading}>Login</h2>
//         <form onSubmit={handleSubmit}>
//           <TextField
//             label="Email"
//             variant="outlined"
//             fullWidth
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             style={styles.input}
//           />
//           <TextField
//             label="Password"
//             variant="outlined"
//             type={showPassword ? 'text' : 'password'}
//             fullWidth
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             style={styles.input}
//             InputProps={{
//               endAdornment: (
//                 <InputAdornment position="end">
//                   <IconButton onClick={() => setShowPassword(!showPassword)}>
//                     {showPassword ? <VisibilityOff /> : <Visibility />}
//                   </IconButton>
//                 </InputAdornment>
//               ),
//             }}
//           />
//           <a className='link cursor-pointer text-[14px] font-[500]' onClick={forgotPassword}>Forgot Password</a>
//           <Button type="submit" variant="contained" fullWidth style={styles.submitButton}>
//             Login
//           </Button>
//         </form>
//         <Button
//           variant="outlined"
//           fullWidth
//           style={styles.googleButton}
//           onClick={handleGoogleSignup}
//           startIcon={<Google />} // Adding Google logo to button
//         >
//           Sign in with Google
//         </Button>
//         <p style={styles.switchLink}>
//           Don’t have an account? <a href="/register" style={styles.link}>Sign Up</a>
//         </p>
//       </div>
//       <ToastContainer />
//     </div>
//   );
// };

// const styles = {
//   container: {
//     display: 'flex',
//     justifyContent: 'center',
//     alignItems: 'center',
//     minHeight: '100vh',
//     backgroundColor: '#f0f0f0',
//   },
//   form: {
//     backgroundColor: '#fff',
//     padding: '2rem',
//     borderRadius: '8px',
//     boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
//     width: '400px',
//   },
//   heading: {
//     textAlign: 'center',
//     marginBottom: '1.5rem',
//   },
//   input: {
//     marginBottom: '1rem',
//   },
//   submitButton: {
//     marginTop: '1rem',
//     backgroundColor: '#ef7921',
//   },
//   googleButton: {
//     marginTop: '1rem',
//   },
//   switchLink: {
//     textAlign: 'center',
//     marginTop: '1rem',
//   },
//   link: {
//     color: '#ef7921',
//     textDecoration: 'none',
//   },
// };

// export default Login;











// import React, { useState } from 'react';
// import Button from '@mui/material/Button';
// import TextField from '@mui/material/TextField';
// import IconButton from '@mui/material/IconButton';
// import InputAdornment from '@mui/material/InputAdornment';
// import { Visibility, VisibilityOff } from '@mui/icons-material';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// const Login = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [showPassword, setShowPassword] = useState(false);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     toast.success('Login successful!');
//   };

//   const handleGoogleSignup = () => {
//     toast.info('Sign up with Google clicked!');
//   };

//   return (
//     <div style={styles.container}>
//       <div style={styles.form}>
//         <h2 style={styles.heading}>Login</h2>
//         <form onSubmit={handleSubmit}>
//           <TextField
//             label="Email"
//             variant="outlined"
//             fullWidth
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             style={styles.input}
//           />
//           <TextField
//             label="Password"
//             variant="outlined"
//             type={showPassword ? 'text' : 'password'}
//             fullWidth
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             style={styles.input}
//             InputProps={{
//               endAdornment: (
//                 <InputAdornment position="end">
//                   <IconButton onClick={() => setShowPassword(!showPassword)}>
//                     {showPassword ? <VisibilityOff /> : <Visibility />}
//                   </IconButton>
//                 </InputAdornment>
//               ),
//             }}
//           />
//           <Button type="submit" variant="contained" fullWidth style={styles.submitButton}>
//             Login
//           </Button>
//         </form>
//         <Button variant="outlined" fullWidth style={styles.googleButton} onClick={handleGoogleSignup}>
//           Sign up with Google
//         </Button>
//         <p style={styles.switchLink}>
//           Don’t have an account? <a href="/register" style={styles.link}>Sign Up</a>
//         </p>
//       </div>
//       <ToastContainer />
//     </div>
//   );
// };

// const styles = {
//   container: {
//     display: 'flex',
//     justifyContent: 'center',
//     alignItems: 'center',
//     minHeight: '100vh',
//     backgroundColor: '#f0f0f0',
//   },
//   form: {
//     backgroundColor: '#fff',
//     padding: '2rem',
//     borderRadius: '8px',
//     boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
//     width: '400px', // Increased width
//   },
//   heading: {
//     textAlign: 'center',
//     marginBottom: '1.5rem',
//   },
//   input: {
//     marginBottom: '1rem',
//   },
//   submitButton: {
//     marginTop: '1rem',
//     backgroundColor: '#ef7921',
//   },
//   googleButton: {
//     marginTop: '1rem',
//   },
//   switchLink: {
//     textAlign: 'center',
//     marginTop: '1rem',
//   },
//   link: {
//     color: '#ef7921',
//     textDecoration: 'none',
//   },
// };

// export default Login;










// import React, { useState } from 'react';
// import Button from '@mui/material/Button';
// import TextField from '@mui/material/TextField';
// import IconButton from '@mui/material/IconButton';
// import InputAdornment from '@mui/material/InputAdornment';
// import { Visibility, VisibilityOff } from '@mui/icons-material';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// const Login = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [showPassword, setShowPassword] = useState(false);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // Here, you can add logic to verify login credentials, call API, etc.
//     toast.success('Login successful!');
//   };

//   const handleGoogleSignup = () => {
//     toast.info('Sign up with Google clicked!');
//   };

//   return (
//     <div style={styles.container}>
//       <div style={styles.form}>
//         <h2 style={styles.heading}>Login</h2>
//         <form onSubmit={handleSubmit}>
//           <TextField
//             label="Email"
//             variant="outlined"
//             fullWidth
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             style={styles.input}
//           />
//           <TextField
//             label="Password"
//             variant="outlined"
//             type={showPassword ? 'text' : 'password'}
//             fullWidth
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             style={styles.input}
//             InputProps={{
//               endAdornment: (
//                 <InputAdornment position="end">
//                   <IconButton onClick={() => setShowPassword(!showPassword)}>
//                     {showPassword ? <VisibilityOff /> : <Visibility />}
//                   </IconButton>
//                 </InputAdornment>
//               ),
//             }}
//           />
//           <Button type="submit" variant="contained" fullWidth style={styles.submitButton}>
//             Login
//           </Button>
//         </form>
//         <Button variant="outlined" fullWidth style={styles.googleButton} onClick={handleGoogleSignup}>
//           Sign up with Google
//         </Button>
//         <p style={styles.switchLink}>
//           Don’t have an account? <a href="/register" style={styles.link}>Sign Up</a>
//         </p>
//       </div>
//       <ToastContainer />
//     </div>
//   );
// };

// const styles = {
//   container: {
//     display: 'flex',
//     justifyContent: 'center',
//     alignItems: 'center',
//     minHeight: '100vh',
//     backgroundColor: '#f0f0f0',
//   },
//   form: {
//     backgroundColor: '#fff',
//     padding: '2rem',
//     borderRadius: '8px',
//     boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
//     width: '300px',
//   },
//   heading: {
//     textAlign: 'center',
//     marginBottom: '1.5rem',
//   },
//   input: {
//     marginBottom: '1rem',
//   },
//   submitButton: {
//     marginTop: '1rem',
//     backgroundColor: '#ef7921',
//   },
//   googleButton: {
//     marginTop: '1rem',
//   },
//   switchLink: {
//     textAlign: 'center',
//     marginTop: '1rem',
//   },
//   link: {
//     color: '#ef7921',
//     textDecoration: 'none',
//   },
// };

// export default Login;
