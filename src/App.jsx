import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useState } from 'react';
import './App.css';
import Header from './components/Header';
import Home from './Pages/Home';
import ProductListing from './Pages/ProductListing';
import ProductDetails from './Pages/ProductDetails';
import Login from './Pages/Login';
import Register from './Pages/Register';
import MyAccount from './Pages/MyAccount';
import MyList from './Pages/MyList';
import Footer from './components/Footer';
import { createContext } from 'react';
import ProductDetailsComponent from './components/ProductDetailsComponent';
import Drawer from '@mui/material/Drawer';
import { IoIosClose } from 'react-icons/io';
import { ToastContainer } from 'react-toastify';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import CartPanel from './components/CartPanel'; 
import Cart from './Pages/Cart';
import Verify from './Pages/Verify';
import ResetPassword from './Pages/ResetPassword';
import Checkout from './Pages/Checkout';
import MyOrder from './Pages/MyOrder';
import Address from './Pages/Address';
import { AuthProvider } from './context/authContext';
import ProtectedRoute from './context/ProtectedRoute';
import OrderConfirmation from './Pages/OrderConfirmation';

const MyContext = createContext();

function App() {
  const [openProductModalDetails, setOpenProductModalDetails] = useState(false);
  const [openCartPanel, setOpenCartPanel] = useState(false);
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState('');
  const [isLogin, setIsLogin] = useState(false);

  const handleClickOpenProductModalDetails = () => {
    setOpenProductModalDetails(true);
  };

  const handleCloseProductModalDetails = () => {
    setOpenProductModalDetails(false);
  };

  const toggleCartPanel = () => {
    setOpenCartPanel(!openCartPanel);
  };

  const handleCloseCart = () => {
    setOpenCartPanel(false);
  };

  const values = {
    setOpenProductModalDetails,
    setOpenCartPanel: toggleCartPanel,
    forgotPasswordEmail,
    setForgotPasswordEmail,
    isLogin,
    setIsLogin,
    refreshCartCount: () => {
      // This will be overridden by Header component
      window.dispatchEvent(new Event('cartRefresh'));
    }
  };

  return (
    <> 
      <BrowserRouter>
        <AuthProvider>
          <MyContext.Provider value={values}>
            {/* Main App Content */}
            <div className="app-content">
              <Header />
              <Routes>
                {/* Public Routes */}
                <Route path={'/'} exact={true} element={<Home />} />
                <Route path={'/productListing'} exact={true} element={<ProductListing />} />
                <Route path={'/product/:id'} exact={true} element={<ProductDetails />} />
                
                {/* Auth Routes - Redirect to home if already authenticated */}
                <Route path={'/login'} exact={true} element={
                  <ProtectedRoute requireAuth={false}>
                    <Login />
                  </ProtectedRoute>
                } />
                <Route path={'/register'} exact={true} element={
                  <ProtectedRoute requireAuth={false}>
                    <Register />
                  </ProtectedRoute>
                } />
                <Route path={'/verify-email'} exact={true} element={
                  <ProtectedRoute requireAuth={false}>
                    <Verify />
                  </ProtectedRoute>
                } />
                <Route path={'/reset-password'} exact={true} element={
                  <ProtectedRoute requireAuth={false}>
                    <ResetPassword />
                  </ProtectedRoute>
                } />
                
                {/* Protected Routes - Redirect to login if not authenticated */}
                <Route path={'/my-account'} exact={true} element={
                  <ProtectedRoute requireAuth={true}>
                    <MyAccount />
                  </ProtectedRoute>
                } />
                <Route path={'/wishlist'} exact={true} element={
                  <ProtectedRoute requireAuth={true}>
                    <MyList />
                  </ProtectedRoute>
                } />
                <Route path={'/orders'} exact={true} element={
                  <ProtectedRoute requireAuth={true}>
                    <MyOrder />
                  </ProtectedRoute>
                } />
                <Route path={'/address'} exact={true} element={
                  <ProtectedRoute requireAuth={true}>
                    <Address />
                  </ProtectedRoute>
                } />
                <Route path={'/checkout'} exact={true} element={
                  <ProtectedRoute requireAuth={true}>
                    <Checkout />
                  </ProtectedRoute>
                } />
   
                {/* <Route path={'/checkout'} exact={true} element={
                  <ProtectedRoute requireAuth={true}>
                    <Checkout />
                  </ProtectedRoute>
                } /> */}
                <Route path={'/order-confirmation/:orderId'} exact={true} element={
                  <ProtectedRoute requireAuth={true}>
                    <OrderConfirmation />
                  </ProtectedRoute>
                } />
                <Route path={'/orders'} exact={true} element={
                  <ProtectedRoute requireAuth={true}>
                    <MyOrder /> {/* Your existing orders page */}
                  </ProtectedRoute>
                } />
                
                {/* Semi-protected routes (can be public but have different behavior when authenticated) */}
                <Route path={'/cart'} exact={true} element={
                  <ProtectedRoute requireAuth={true}>
                    <Cart />
                  </ProtectedRoute>
                } />
              </Routes>
              <Footer />
            </div>

            {/* Global Components that need Auth Context */}
            {/* Product Modal */}
            <Dialog
              open={openProductModalDetails}
              onClose={handleCloseProductModalDetails}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
              className="productDetailsModal"
            >
              <DialogContent>
                <div className="flex items-center w-full productDetailsModalContainer">
                  <div className="col1">
                    <ProductDetailsComponent />
                  </div>
                </div>
              </DialogContent>
            </Dialog>

            {/* Cart Panel */}
            <Drawer 
              open={openCartPanel} 
              onClose={handleCloseCart}
              anchor="right"
              className='cartPanel'
            >
              <CartPanel onClose={handleCloseCart} />
            </Drawer>
          </MyContext.Provider>
        </AuthProvider> 
      </BrowserRouter>

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
    </>
  );
}

export default App;
export { MyContext };
































































// import React from 'react';
// import { BrowserRouter, Route, Routes } from 'react-router-dom';
// import { useState } from 'react';
// import './App.css';
// import Header from './components/Header';
// import Home from './Pages/Home';
// import ProductListing from './Pages/ProductListing';
// import ProductDetails from './Pages/ProductDetails';
// import Login from './Pages/Login';
// import Register from './Pages/Register';
// import MyAccount from './Pages/MyAccount';
// import MyList from './Pages/MyList';
// import Footer from './components/Footer';
// import { createContext } from 'react';
// import ProductDetailsComponent from './components/ProductDetailsComponent';
// import Drawer from '@mui/material/Drawer';
// import { IoIosClose } from 'react-icons/io';
// import { ToastContainer } from 'react-toastify';
// import Button from '@mui/material/Button';
// import Dialog from '@mui/material/Dialog';
// import DialogActions from '@mui/material/DialogActions';
// import DialogContent from '@mui/material/DialogContent';
// import DialogContentText from '@mui/material/DialogContentText';
// import DialogTitle from '@mui/material/DialogTitle';
// import CartPanel from './components/CartPanel'; 
// import Cart from './Pages/Cart';
// import Verify from './Pages/Verify';
// import ResetPassword from './Pages/ResetPassword';
// import Checkout from './Pages/Checkout';
// import MyOrder from './Pages/MyOrder';
// import Address from './Pages/Address';
// import { AuthProvider } from './context/authContext';
// import ProtectedRoute from './context/ProtectedRoute';

// const MyContext = createContext();

// function App() {
//   const [openProductModalDetails, setOpenProductModalDetails] = useState(false);
//   const [openCartPanel, setOpenCartPanel] = useState(false);
//   const [forgotPasswordEmail, setForgotPasswordEmail] = useState('');
//   const [isLogin, setIsLogin] = useState(false);

//   const handleClickOpenProductModalDetails = () => {
//     setOpenProductModalDetails(true);
//   };

//   const handleCloseProductModalDetails = () => {
//     setOpenProductModalDetails(false);
//   };

//   const toggleCartPanel = () => {
//     setOpenCartPanel(!openCartPanel);
//   };

//   const handleCloseCart = () => {
//     setOpenCartPanel(false);
//   };

//   const values = {
//     setOpenProductModalDetails,
//     setOpenCartPanel: toggleCartPanel,
//     forgotPasswordEmail,
//     setForgotPasswordEmail,
//     isLogin,
//     setIsLogin
//   };

//   return (
//     <> 
//       <BrowserRouter>
//         <AuthProvider>
//           <MyContext.Provider value={values}>
//             {/* Main App Content */}
//             <div className="app-content">
//               <Header />
//               <Routes>
//                 {/* Public Routes */}
//                 <Route path={'/'} exact={true} element={<Home />} />
//                 <Route path={'/productListing'} exact={true} element={<ProductListing />} />
//                 <Route path={'/product/:id'} exact={true} element={<ProductDetails />} />
                
//                 {/* Auth Routes - Redirect to home if already authenticated */}
//                 <Route path={'/login'} exact={true} element={
//                   <ProtectedRoute requireAuth={false}>
//                     <Login />
//                   </ProtectedRoute>
//                 } />
//                 <Route path={'/register'} exact={true} element={
//                   <ProtectedRoute requireAuth={false}>
//                     <Register />
//                   </ProtectedRoute>
//                 } />
//                 <Route path={'/verify-email'} exact={true} element={
//                   <ProtectedRoute requireAuth={false}>
//                     <Verify />
//                   </ProtectedRoute>
//                 } />
//                 <Route path={'/reset-password'} exact={true} element={
//                   <ProtectedRoute requireAuth={false}>
//                     <ResetPassword />
//                   </ProtectedRoute>
//                 } />
                
//                 {/* Protected Routes - Redirect to login if not authenticated */}
//                 <Route path={'/my-account'} exact={true} element={
//                   <ProtectedRoute requireAuth={true}>
//                     <MyAccount />
//                   </ProtectedRoute>
//                 } />
//                 <Route path={'/wishlist'} exact={true} element={
//                   <ProtectedRoute requireAuth={true}>
//                     <MyList />
//                   </ProtectedRoute>
//                 } />
//                 <Route path={'/orders'} exact={true} element={
//                   <ProtectedRoute requireAuth={true}>
//                     <MyOrder />
//                   </ProtectedRoute>
//                 } />
//                 <Route path={'/address'} exact={true} element={
//                   <ProtectedRoute requireAuth={true}>
//                     <Address />
//                   </ProtectedRoute>
//                 } />
//                 <Route path={'/checkout'} exact={true} element={
//                   <ProtectedRoute requireAuth={true}>
//                     <Checkout />
//                   </ProtectedRoute>
//                 } />
                
//                 {/* Semi-protected routes (can be public but have different behavior when authenticated) */}
//                 <Route path={'/cart'} exact={true} element={<Cart />} />
//               </Routes>
//               <Footer />
//             </div>

//             {/* Global Components that need Auth Context */}
//             {/* Product Modal */}
//             <Dialog
//               open={openProductModalDetails}
//               onClose={handleCloseProductModalDetails}
//               aria-labelledby="alert-dialog-title"
//               aria-describedby="alert-dialog-description"
//               className="productDetailsModal"
//             >
//               <DialogContent>
//                 <div className="flex items-center w-full productDetailsModalContainer">
//                   <div className="col1">
//                     <ProductDetailsComponent />
//                   </div>
//                 </div>
//               </DialogContent>
//             </Dialog>

//             {/* Cart Panel - Now inside AuthProvider */}
//             <Drawer 
//               open={openCartPanel} 
//               onClose={handleCloseCart}
//               anchor="right"
//               className='cartPanel'
//             >
//               <CartPanel onClose={handleCloseCart} />
//             </Drawer>
//           </MyContext.Provider>
//         </AuthProvider> 
//       </BrowserRouter>

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
//     </>
//   );
// }

// export default App;
// export { MyContext };


































// import React from 'react';
// import { BrowserRouter, Route, Routes } from 'react-router-dom';
// import { useState } from 'react';
// import './App.css';
// import Header from './components/Header';
// import Home from './Pages/Home';
// import ProductListing from './Pages/ProductListing';
// import ProductDetails from './Pages/ProductDetails';
// import Login from './Pages/Login';
// import Register from './Pages/Register';
// import MyAccount from './Pages/MyAccount';
// import MyList from './Pages/MyList';
// import Footer from './components/Footer';
// import { createContext } from 'react';
// import ProductDetailsComponent from './components/ProductDetailsComponent';
// import Drawer from '@mui/material/Drawer';
// import { IoIosClose } from 'react-icons/io';
// import { ToastContainer } from 'react-toastify';
// import Button from '@mui/material/Button';
// import Dialog from '@mui/material/Dialog';
// import DialogActions from '@mui/material/DialogActions';
// import DialogContent from '@mui/material/DialogContent';
// import DialogContentText from '@mui/material/DialogContentText';
// import DialogTitle from '@mui/material/DialogTitle';
// import CartPanel from './components/CartPanel'; 
// import Cart from './Pages/Cart';
// import Verify from './Pages/Verify';
// import ResetPassword from './Pages/ResetPassword';
// import Checkout from './Pages/Checkout';
// import MyOrder from './Pages/MyOrder';
// import Address from './Pages/Address';
// import { AuthProvider } from './context/authContext';
// import ProtectedRoute from './context/ProtectedRoute';

// const MyContext = createContext();

// function App() {
//   const [openProductModalDetails, setOpenProductModalDetails] = useState(false);
//   const [openCartPanel, setOpenCartPanel] = useState(false);
//   const [forgotPasswordEmail, setForgotPasswordEmail] = useState('');
//   const [isLogin, setIsLogin] = useState(false);

//   const handleClickOpenProductModalDetails = () => {
//     setOpenProductModalDetails(true);
//   };

//   const handleCloseProductModalDetails = () => {
//     setOpenProductModalDetails(false);
//   };

//   const toggleCartPanel = () => {
//     setOpenCartPanel(!openCartPanel);
//   };

//   const handleCloseCart = () => {
//     setOpenCartPanel(false);
//   };

//   const values = {
//     setOpenProductModalDetails,
//     setOpenCartPanel: toggleCartPanel,
//     forgotPasswordEmail,
//     setForgotPasswordEmail,
//     isLogin,
//     setIsLogin
//   };

//   return (
//     <> 
//       <BrowserRouter>
//         <AuthProvider>
//           <MyContext.Provider value={values}>
//             <Header />
//             <Routes>
//               {/* Public Routes */}
//               <Route path={'/'} exact={true} element={<Home />} />
//               <Route path={'/productListing'} exact={true} element={<ProductListing />} />
//               <Route path={'/product/:id'} exact={true} element={<ProductDetails />} />
              
//               {/* Auth Routes - Redirect to home if already authenticated */}
//               <Route path={'/login'} exact={true} element={
//                 <ProtectedRoute requireAuth={false}>
//                   <Login />
//                 </ProtectedRoute>
//               } />
//               <Route path={'/register'} exact={true} element={
//                 <ProtectedRoute requireAuth={false}>
//                   <Register />
//                 </ProtectedRoute>
//               } />
//               <Route path={'/verify-email'} exact={true} element={
//                 <ProtectedRoute requireAuth={false}>
//                   <Verify />
//                 </ProtectedRoute>
//               } />
//               <Route path={'/reset-password'} exact={true} element={
//                 <ProtectedRoute requireAuth={false}>
//                   <ResetPassword />
//                 </ProtectedRoute>
//               } />
              
//               {/* Protected Routes - Redirect to login if not authenticated */}
//               <Route path={'/my-account'} exact={true} element={
//                 <ProtectedRoute requireAuth={true}>
//                   <MyAccount />
//                 </ProtectedRoute>
//               } />
//               <Route path={'/wishlist'} exact={true} element={
//                 <ProtectedRoute requireAuth={true}>
//                   <MyList />
//                 </ProtectedRoute>
//               } />
//               <Route path={'/orders'} exact={true} element={
//                 <ProtectedRoute requireAuth={true}>
//                   <MyOrder />
//                 </ProtectedRoute>
//               } />
//               <Route path={'/address'} exact={true} element={
//                 <ProtectedRoute requireAuth={true}>
//                   <Address />
//                 </ProtectedRoute>
//               } />
//               <Route path={'/checkout'} exact={true} element={
//                 <ProtectedRoute requireAuth={true}>
//                   <Checkout />
//                 </ProtectedRoute>
//               } />
              
//               {/* Semi-protected routes (can be public but have different behavior when authenticated) */}
//               <Route path={'/cart'} exact={true} element={<Cart />} />
//             </Routes>
//             <Footer />
//           </MyContext.Provider>
//         </AuthProvider>
//       </BrowserRouter>

//       {/* Product Modal */}
//       <Dialog
//         open={openProductModalDetails}
//         onClose={handleCloseProductModalDetails}
//         aria-labelledby="alert-dialog-title"
//         aria-describedby="alert-dialog-description"
//         className="productDetailsModal"
//       >
//         <DialogContent>
//           <div className="flex items-center w-full productDetailsModalContainer">
//             <div className="col1">
//               <ProductDetailsComponent />
//             </div>
//           </div>
//         </DialogContent>
//       </Dialog>

//       {/* Cart Panel */}
//       <Drawer 
//         open={openCartPanel} 
//         onClose={handleCloseCart}
//         anchor="right"
//         className='cartPanel'
//       >
//         <CartPanel onClose={handleCloseCart} />
//       </Drawer>

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
//     </>
//   );
// }

// export default App;
// export { MyContext };























// import React from 'react';
// import { BrowserRouter, Route, Routes } from 'react-router-dom';
// import { useState } from 'react';
// import './App.css';
// import Header from './components/Header';
// import Home from './Pages/Home';
// import ProductListing from './Pages/ProductListing';
// import ProductDetails from './Pages/ProductDetails';
// import Login from './Pages/Login';
// import Register from './Pages/Register';
// import MyAccount from './Pages/MyAccount';
// import MyList from './Pages/MyList';
// import Footer from './components/Footer';
// import { createContext } from 'react';
// import ProductDetailsComponent from './components/ProductDetailsComponent';
// import Drawer from '@mui/material/Drawer';
// import { IoIosClose } from 'react-icons/io';
// import { ToastContainer } from 'react-toastify';

// import Button from '@mui/material/Button';
// import Dialog from '@mui/material/Dialog';
// import DialogActions from '@mui/material/DialogActions';
// import DialogContent from '@mui/material/DialogContent';
// import DialogContentText from '@mui/material/DialogContentText';
// import DialogTitle from '@mui/material/DialogTitle';
// import CartPanel from './components/CartPanel'; 
// import Cart from './Pages/Cart';
// import Verify from './Pages/Verify';
// import ResetPassword from './Pages/ResetPassword';
// import Checkout from './Pages/Checkout';
// import MyOrder from './Pages/MyOrder';
// import Address from './Pages/Address';
// import { AuthProvider } from './context/authContext';
// import ProtectedRoute from './context/ProtectedRoute'


// // import { ToastContainer, toast } from 'react-toastify';
// // import 'react-toastify/dist/ReactToastify.css';

// const MyContext = createContext();

// function App() {
//   const [openProductModalDetails, setOpenProductModalDetails] = useState(false);
//   const [openCartPanel, setOpenCartPanel] = useState(false);
//   const [forgotPasswordEmail, setForgotPasswordEmail] = useState('');
//   const [isLogin, setIsLogin] = useState(false)


//   const handleClickOpenProductModalDetails = () => {
//     setOpenProductModalDetails(true);
//   };

//   const handleCloseProductModalDetails = () => {
//     setOpenProductModalDetails(false);
//   };

//   const toggleCartPanel = () => {
//     setOpenCartPanel(!openCartPanel);
//   };

//   const handleCloseCart = () => {
//     setOpenCartPanel(false);
//   };

//   const values = {
//     setOpenProductModalDetails,
//     setOpenCartPanel: toggleCartPanel, // Pass the toggle function to context
//     forgotPasswordEmail,
//     setForgotPasswordEmail,
//     isLogin,
//     setIsLogin
//   };

//   return (
//     <> 
//       <BrowserRouter>
//       <AuthProvider>
//         <MyContext.Provider value={values}>
//           <Header />
//           <Routes>
             
//             <Route path={'/'} exact={true} element={<Home />} />
//             <Route path={'/productListing'} exact={true} element={<ProductListing />} />
//             <Route path={'/product/:id'} exact={true} element={<ProductDetails />} />
//             {/* <Route path={'/login'} exact={true} element={<Login />} /> */}
//             <Route path={'/login'} exact={true} element={
//               <ProtectedRoute requireAuth={false}>
//                   <Login />
//                 </ProtectedRoute>
//             } />
//             <Route path={'/register'} exact={true} element={<Register />} />
//             <Route path={'/cart'} exact={true} element={<Cart />} />
//             <Route path={'/verify-email'} exact={true} element={<Verify />} />
//             <Route path={'/reset-password'} exact={true} element={<ResetPassword />} /> 
//             <Route path={'/checkout'} exact={true} element={<Checkout />} />
//             <Route path={'/my-account'} exact={true} element={<MyAccount />} /> 
//             <Route path={'/wishlist'} exact={true} element={<MyList />} /> 
//             <Route path={'/orders'} exact={true} element={<MyOrder />} /> 
//             <Route path={'/address'} exact={true} element={<Address />} /> 
//           </Routes>
//           <Footer />
//         </MyContext.Provider>
//         </AuthProvider>
//       </BrowserRouter>

//       {/* Product Modal */}
//       <Dialog
//         open={openProductModalDetails}
//         onClose={handleCloseProductModalDetails}
//         aria-labelledby="alert-dialog-title"
//         aria-describedby="alert-dialog-description"
//         className="productDetailsModal"
//       >
//         <DialogContent>
//           <div className="flex items-center w-full productDetailsModalContainer">
//             <div className="col1">
//               <ProductDetailsComponent />
//             </div>
//           </div>
//         </DialogContent>
//       </Dialog>

//       {/* Cart Panel */}
//       <Drawer 
//         open={openCartPanel} 
//         onClose={handleCloseCart}
//         anchor="right"
//         className='cartPanel'
//       >
//         <CartPanel onClose={handleCloseCart} />
//       </Drawer>

//        <ToastContainer
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
//     </>
//   );
// }

// export default App;

// export { MyContext };































// import React from 'react';
// import { BrowserRouter, Route, Routes } from 'react-router-dom';
// import { useState } from 'react';
// import './App.css';
// import Header from './components/Header';
// import Home from './Pages/Home';
// import ProductListing from './Pages/ProductListing';
// import ProductDetails from './Pages/ProductDetails';
// import Login from './Pages/Login';
// import Register from './Pages/Register';
// import MyAccount from './Pages/MyAccount';
// import MyList from './Pages/MyList';
// import Footer from './components/Footer';
// import { createContext } from 'react';
// import ProductDetailsComponent from './components/ProductDetailsComponent';
// import Drawer from '@mui/material/Drawer';
// import { IoIosClose } from 'react-icons/io';

// import Button from '@mui/material/Button';
// import Dialog from '@mui/material/Dialog';
// import DialogActions from '@mui/material/DialogActions';
// import DialogContent from '@mui/material/DialogContent';
// import DialogContentText from '@mui/material/DialogContentText';
// import DialogTitle from '@mui/material/DialogTitle';
// import CartPanel from './components/CartPanel'; 
// import Cart from './Pages/Cart';
// import Verify from './Pages/Verify';
// import ResetPassword from './Pages/ResetPassword';
// import Checkout from './Pages/Checkout';
// import MyOrder from './Pages/MyOrder';
// import Address from './Pages/Address';


// // import { ToastContainer, toast } from 'react-toastify';
// // import 'react-toastify/dist/ReactToastify.css';

// const MyContext = createContext();

// function App() {
//   const [openProductModalDetails, setOpenProductModalDetails] = useState(false);
//   const [openCartPanel, setOpenCartPanel] = useState(false);
//   const [forgotPasswordEmail, setForgotPasswordEmail] = useState('');
//   const [isLogin, setIsLogin] = useState(false) 


//   const handleClickOpenProductModalDetails = () => {
//     setOpenProductModalDetails(true);
//   };

//   const handleCloseProductModalDetails = () => {
//     setOpenProductModalDetails(false);
//   };

//   const toggleCartPanel = () => {
//     setOpenCartPanel(!openCartPanel);
//   };

//   const handleCloseCart = () => {
//     setOpenCartPanel(false);
//   };

//   const values = {
//     setOpenProductModalDetails,
//     setOpenCartPanel: toggleCartPanel, // Pass the toggle function to context
//     forgotPasswordEmail,
//     setForgotPasswordEmail,
//     isLogin,
//     setIsLogin
//   };

//   return (
//     <> 
//       <BrowserRouter>
//         <MyContext.Provider value={values}>
//           <Header />
//           <Routes>
//             <Route path={'/'} exact={true} element={<Home />} />
//             <Route path={'/productListing'} exact={true} element={<ProductListing />} />
//             <Route path={'/product/:id'} exact={true} element={<ProductDetails />} />
//             <Route path={'/login'} exact={true} element={<Login />} />
//             <Route path={'/register'} exact={true} element={<Register />} />
//             <Route path={'/cart'} exact={true} element={<Cart />} />
//             <Route path={'/verify'} exact={true} element={<Verify />} />
//             <Route path={'/reset-password'} exact={true} element={<ResetPassword />} /> 
//             <Route path={'/checkout'} exact={true} element={<Checkout />} />
//             <Route path={'/my-account'} exact={true} element={<MyAccount />} /> 
//             <Route path={'/wishlist'} exact={true} element={<MyList />} /> 
//             <Route path={'/orders'} exact={true} element={<MyOrder />} /> 
//             <Route path={'/address'} exact={true} element={<Address />} /> 
//           </Routes>
//           <Footer />
//         </MyContext.Provider>
//       </BrowserRouter>

//       {/* Product Modal */}
//       <Dialog
//         open={openProductModalDetails}
//         onClose={handleCloseProductModalDetails}
//         aria-labelledby="alert-dialog-title"
//         aria-describedby="alert-dialog-description"
//         className="productDetailsModal"
//       >
//         <DialogContent>
//           <div className="flex items-center w-full productDetailsModalContainer">
//             <div className="col1">
//               <ProductDetailsComponent />
//             </div>
//           </div>
//         </DialogContent>
//       </Dialog>

//       {/* Cart Panel */}
//       <Drawer 
//         open={openCartPanel} 
//         onClose={handleCloseCart}
//         anchor="right"
//         className='cartPanel'
//       >
//         <CartPanel onClose={handleCloseCart} />
//       </Drawer>
//     </>
//   );
// }

// export default App;

// export { MyContext };



















// import React from 'react';
// import { BrowserRouter, Route, Routes } from 'react-router-dom';
// import { useState } from 'react';
// import './App.css';
// import Header from './components/Header';
// import Home from './Pages/Home';
// import ProductListing from './Pages/ProductListing';
// import ProductDetails from './Pages/ProductDetails';
// import Login from './Pages/Login';
// import Register from './Pages/Register';
// import Footer from './components/Footer';
// import { createContext } from 'react';
// import ProductDetailsComponent from './components/ProductDetailsComponent';
// import Drawer from '@mui/material/Drawer';
// import { IoIosClose } from 'react-icons/io';

// import Button from '@mui/material/Button';
// import Dialog from '@mui/material/Dialog';
// import DialogActions from '@mui/material/DialogActions';
// import DialogContent from '@mui/material/DialogContent';
// import DialogContentText from '@mui/material/DialogContentText';
// import DialogTitle from '@mui/material/DialogTitle';
// import CartPanel from './components/CartPanel'; 








// const MyContext = createContext();

// function App() {
//   const [openProductModalDetails, setOpenProductModalDetails] = useState(false);
//   const [openCartPanel, setOpenCartPanel] = useState(false);

//   const handleClickOpenProductModalDetails = () => {
//     setOpenProductModalDetails(true);
//   };

//   const handleCloseProductModalDetails = () => {
//     setOpenProductModalDetails(false);
//   };

//   const toggleCartPanel = (newOpen) => () => {
//     setOpenCartPanel(newOpen);
//   };


//   const [isCartOpen, setIsCartOpen] = useState(true);

//   const handleCloseCart = () => {
//     setIsCartOpen(false);
//   };

//   if (!isCartOpen) {
//     return null; // Or your main content when cart is closed
//   }

//   const values = {
//     setOpenProductModalDetails,
//     setOpenCartPanel,
//   };

//   return (
//     <>
//       <BrowserRouter>
//         <MyContext.Provider value={values}>
//           <Header />
//           <Routes>
//             <Route path={'/'} exact={true} element={<Home />} />
//             <Route path={'/productListing'} exact={true} element={<ProductListing />} />
//             <Route path={'/product/:id'} exact={true} element={<ProductDetails />} />
//             <Route path={'/login'} exact={true} element={<Login />} />
//             <Route path={'/register'} exact={true} element={<Register />} />
//           </Routes>
//           <Footer />
//         </MyContext.Provider>
//       </BrowserRouter>

//       {/* Product Modal */}
//       <Dialog
//         open={openProductModalDetails}
//         onClose={handleCloseProductModalDetails}
//         aria-labelledby="alert-dialog-title"
//         aria-describedby="alert-dialog-description"
//         className="productDetailsModal"
//       >
//         <DialogContent>
//           <div className="flex items-center w-full productDetailsModalContainer">
//             <div className="col1">
//               <ProductDetailsComponent />
//             </div>
//           </div>
//         </DialogContent>
//       </Dialog>

//       {/* Cart Panel */}
//       <Drawer 
//         open={openCartPanel} 
//         // onClose={toggleCartPanel(false)} 
//         // onClose={handleCloseCart} 
//         anchor="right"
//         className='cartPanel'
//       >
//         {/* <div 
//           className="flex items-center justify-between gap-2 border-b border-amber-200" 
//           style={{ padding: '6px' }}
//         >
//           <h4>Shopping Cart (1)</h4>
//           <IoIosClose
//             className="text-[20px] cursor-pointer"
//             onClick={toggleCartPanel(false)} // Now properly using onClick to trigger the function
//           />
//         </div> */}


//         <CartPanel onClose={handleCloseCart} />

        
//       </Drawer>
//     </>
//   );
// }

// export default App;

// export { MyContext };


