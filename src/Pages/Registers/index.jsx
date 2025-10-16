import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Google } from '@mui/icons-material'; // Google logo from Material-UI

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    
  };

  return (
    <div style={styles.container}>
      <div style={styles.form}>
        <h2 style={styles.heading}>Register</h2>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Full Name"
            variant="outlined"
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={styles.input}
          />
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={styles.input}
          />
          <TextField
            label="Password"
            variant="outlined"
            type={showPassword ? 'text' : 'password'}
            fullWidth 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            style={styles.input} 
            InputProps={{ 
              endAdornment: ( 
                <InputAdornment position="end"> 
                  <IconButton onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Button type="submit" variant="contained" fullWidth style={styles.submitButton}>
            Register
          </Button>
        </form>
        <Button
          variant="outlined"
          fullWidth
          style={styles.googleButton}
          startIcon={<Google />} // Adding Google logo to button
        >
          Sign up with Google
        </Button>
        <p style={styles.switchLink}>
          Already have an account? <a href="/login" style={styles.link}>Login</a>
        </p>
      </div>
      <ToastContainer />
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    backgroundColor: '#f0f0f0',
  },
  form: {
    backgroundColor: '#fff',
    padding: '2rem',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    width: '400px',
  },
  heading: {
    textAlign: 'center',
    marginBottom: '1.5rem',
  },
  input: {
    marginBottom: '1rem',
  },
  submitButton: {
    marginTop: '1rem',
    backgroundColor: '#ef7921',
  },
  googleButton: {
    marginTop: '1rem',
  },
  switchLink: {
    textAlign: 'center',
    marginTop: '1rem',
  },
  link: {
    color: '#ef7921',
    textDecoration: 'none',
  },
};

export default Register;









// import React, { useState } from 'react';
// import Button from '@mui/material/Button';
// import TextField from '@mui/material/TextField';
// import IconButton from '@mui/material/IconButton';
// import InputAdornment from '@mui/material/InputAdornment';
// import { Visibility, VisibilityOff } from '@mui/icons-material';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// const Register = () => {
//   const [fullName, setFullName] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [showPassword, setShowPassword] = useState(false);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     toast.success('Registration successful!');
//   };

//   return (
//     <div style={styles.container}>
//       <div style={styles.form}>
//         <h2 style={styles.heading}>Register</h2>
//         <form onSubmit={handleSubmit}>
//           <TextField
//             label="Full Name"
//             variant="outlined"
//             fullWidth
//             value={fullName}
//             onChange={(e) => setFullName(e.target.value)}
//             style={styles.input}
//           />
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
//             Register
//           </Button>
//         </form>
//         <Button variant="outlined" fullWidth style={styles.googleButton}>
//           Sign up with Google
//         </Button>
//         <p style={styles.switchLink}>
//           Already have an account? <a href="/login" style={styles.link}>Login</a>
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

// export default Register;












// import React, { useState } from 'react';
// import Button from '@mui/material/Button';
// import TextField from '@mui/material/TextField';
// import IconButton from '@mui/material/IconButton';
// import InputAdornment from '@mui/material/InputAdornment';
// import { Visibility, VisibilityOff } from '@mui/icons-material';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// const Register = () => {
//   const [fullName, setFullName] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [showPassword, setShowPassword] = useState(false);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     toast.success('Registration successful!');
//   };

//   return (
//     <div style={styles.container}>
//       <div style={styles.form}>
//         <h2 style={styles.heading}>Register</h2>
//         <form onSubmit={handleSubmit}>
//           <TextField
//             label="Full Name"
//             variant="outlined"
//             fullWidth
//             value={fullName}
//             onChange={(e) => setFullName(e.target.value)}
//             style={styles.input}
//           />
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
//             Register
//           </Button>
//         </form>
//         <Button variant="outlined" fullWidth style={styles.googleButton}>
//           Sign up with Google
//         </Button>
//         <p style={styles.switchLink}>
//           Already have an account? <a href="/login" style={styles.link}>Login</a>
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

// export default Register;

















// import React, { useState } from 'react';
// import Button from '@mui/material/Button';
// import TextField from '@mui/material/TextField';
// import IconButton from '@mui/material/IconButton';
// import InputAdornment from '@mui/material/InputAdornment';
// import { Visibility, VisibilityOff } from '@mui/icons-material';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// const Register = () => {
//   const [fullName, setFullName] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [showPassword, setShowPassword] = useState(false);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // Here, you can add logic to handle registration, call API, etc.
//     toast.success('Registration successful!');
//   };

//   return (
//     <div style={styles.container}>
//       <div style={styles.form}>
//         <h2 style={styles.heading}>Register</h2>
//         <form onSubmit={handleSubmit}>
//           <TextField
//             label="Full Name"
//             variant="outlined"
//             fullWidth
//             value={fullName}
//             onChange={(e) => setFullName(e.target.value)}
//             style={styles.input}
//           />
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
//             Register
//           </Button>
//         </form>
//         <Button variant="outlined" fullWidth style={styles.googleButton}>
//           Sign up with Google
//         </Button>
//         <p style={styles.switchLink}>
//           Already have an account? <a href="/login" style={styles.link}>Login</a>
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

// export default Register;
