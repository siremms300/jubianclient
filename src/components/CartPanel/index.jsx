import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import { MdOutlineDeleteOutline } from 'react-icons/md';
import { IoClose } from 'react-icons/io5';

// Styled components
const CartContainer = styled('div')({
  width: '100%',
  maxWidth: '400px',
  backgroundColor: '#fff',
  borderRadius: '8px',
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
  overflow: 'hidden',
});

const CartHeader = styled('div')({
  padding: '1rem 1.5rem',
  backgroundColor: '#f8f9fa',
  borderBottom: '1px solid #e9ecef',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  '& h3': {
    margin: 0,
    fontSize: '1.25rem',
    fontWeight: '600',
    color: '#2d3748',
  },
});

const CloseButton = styled(IconButton)({
  color: '#6b7280',
  padding: '4px',
  '&:hover': {
    color: '#ef4444',
    backgroundColor: 'rgba(239, 68, 68, 0.1)',
  },
});

const ScrollContainer = styled('div')({
  maxHeight: '300px',
  overflowY: 'auto',
  overflowX: 'hidden',
  padding: '0.5rem',
  
  // Custom scrollbar styling
  '&::-webkit-scrollbar': {
    width: '6px',
  },
  '&::-webkit-scrollbar-track': {
    background: '#f1f1f1',
    borderRadius: '10px',
  },
  '&::-webkit-scrollbar-thumb': {
    background: '#c1c1c1',
    borderRadius: '10px',
  },
  '&::-webkit-scrollbar-thumb:hover': {
    background: '#a8a8a8',
  },
});

const CartItem = styled('div')({
  display: 'flex',
  alignItems: 'flex-start',
  gap: '1rem',
  padding: '1rem',
  borderRadius: '8px',
  transition: 'background-color 0.2s ease',
  '&:hover': {
    backgroundColor: '#f8f9fa',
  },
});

const ItemImage = styled('div')({
  width: '80px',
  height: '80px',
  borderRadius: '6px',
  overflow: 'hidden',
  flexShrink: 0,
  '& img': {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
});

const ItemInfo = styled('div')({
  flex: 1,
  position: 'relative',
});

const ItemName = styled('a')({
  fontSize: '0.95rem',
  fontWeight: '500',
  color: '#2d3748',
  textDecoration: 'none',
  display: 'block',
  marginBottom: '0.5rem',
  cursor: 'pointer',
  '&:hover': {
    color: '#ef7921',
  },
});

const ItemDetails = styled('div')({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: '0.5rem',
});

const Quantity = styled('span')({
  fontSize: '0.85rem',
  color: '#6b7280',
});

const Price = styled('span')({
  fontSize: '1rem',
  fontWeight: '600',
  color: '#ef7921',
});

const DeleteButton = styled(IconButton)({
  position: 'absolute',
  top: 0,
  right: 0,
  color: '#9ca3af',
  padding: '4px',
  '&:hover': {
    color: '#ef4444',
    backgroundColor: 'rgba(239, 68, 68, 0.1)',
  },
});

const CartFooter = styled('div')({
  padding: '1.5rem',
  backgroundColor: '#f8f9fa',
  borderTop: '1px solid #e9ecef',
});

const Subtotal = styled('div')({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: '1rem',
  '& span:first-of-type': {
    fontSize: '1rem',
    fontWeight: '500',
    color: '#4b5563',
  },
  '& span:last-of-type': {
    fontSize: '1.25rem',
    fontWeight: '600',
    color: '#2d3748',
  },
});

const ActionButtons = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  gap: '0.75rem',
});

const EmptyCart = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '2rem 1rem',
  color: '#9ca3af',
  '& p': {
    margin: '1rem 0 0 0',
    fontSize: '0.95rem',
    textAlign: 'center',
  },
});

const CartPanel = ({ onClose }) => {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: 'Premium Leather Wristwatch',
      image: '/src/assets/images/electronics.jpg',
      price: 18,
      quantity: 2,
    },
    {
      id: 2,
      name: 'Luxury Handbag',
      image: '/src/assets/images/handbag.jpg',
      price: 45,
      quantity: 1,
    },
    {
      id: 3,
      name: 'Jewelry',
      image: '/src/assets/images/jewelry.jpg',
      price: 32,
      quantity: 1,
    },
  ]);

  const handleRemoveItem = (itemId) => {
    setCartItems(cartItems.filter(item => item.id !== itemId));
  };

  const handleViewCart = () => {
    // Navigate to cart page
    console.log('Navigate to cart page');
    window.location.href = '/cart'; // Uncomment if you want actual navigation
  };

  const handleCheckout = () => {
    // Navigate to checkout page
    // console.log('Navigate to checkout page');
    window.location.href = '/checkout'; // Uncomment if you want actual navigation
  };

  const handleProductClick = (productId) => {
    // Navigate to product detail page
    console.log('Navigate to product page:', productId);
    // window.location.href = `/product/${productId}`; // Uncomment if you want actual navigation
  };

  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  if (cartItems.length === 0) {
    return (
      <CartContainer>
        <CartHeader>
          <h3>Shopping Cart</h3>
          <CloseButton onClick={onClose} aria-label="Close cart">
            <IoClose />
          </CloseButton>
        </CartHeader>
        <EmptyCart>
          <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 3H5L5.4 5M7 13H17L21 5H5.4M7 13L5.4 5M7 13L4.707 15.293C4.077 15.923 4.523 17 5.414 17H17M17 17C16.4696 17 15.9609 17.2107 15.5858 17.5858C15.2107 17.9609 15 18.4696 15 19C15 19.5304 15.2107 20.0391 15.5858 20.4142C15.9609 20.7893 16.4696 21 17 21C17.5304 21 18.0391 20.7893 18.4142 20.4142C18.7893 20.0391 19 19.5304 19 19C19 18.4696 18.7893 17.9609 18.4142 17.5858C18.0391 17.2107 17.5304 17 17 17ZM9 19C9 19.5304 8.78929 20.0391 8.41421 20.4142C8.03914 20.7893 7.53043 21 7 21C6.46957 21 5.96086 20.7893 5.58579 20.4142C5.21071 20.0391 5 19.5304 5 19C5 18.4696 5.21071 17.9609 5.58579 17.5858C5.96086 17.2107 6.46957 17 7 17C7.53043 17 8.03914 17.2107 8.41421 17.5858C8.78929 17.9609 9 18.4696 9 19Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <p>Your cart is empty</p>
        </EmptyCart>
      </CartContainer>
    );
  }

  return (
    <CartContainer>
      <CartHeader>
        <h3>Shopping Cart ({cartItems.length})</h3>
        <CloseButton onClick={onClose} aria-label="Close cart">
          <IoClose />
        </CloseButton>
      </CartHeader>
      
      <ScrollContainer>
        {cartItems.map((item) => (
          <div key={item.id}>
            <CartItem>
              <ItemImage>
                <img src={item.image} alt={item.name} />
              </ItemImage>
              
              <ItemInfo>
                <ItemName 
                  onClick={() => handleProductClick(item.id)}
                  onKeyPress={(e) => e.key === 'Enter' && handleProductClick(item.id)}
                  tabIndex={0}
                  role="link"
                >
                  {item.name}
                </ItemName>
                
                <ItemDetails>
                  <Quantity>Qty: {item.quantity}</Quantity>
                  <Price>${(item.price * item.quantity).toFixed(2)}</Price>
                </ItemDetails>
                
                <DeleteButton 
                  size="small" 
                  onClick={() => handleRemoveItem(item.id)}
                  aria-label="Remove item"
                >
                  <MdOutlineDeleteOutline />
                </DeleteButton>
              </ItemInfo>
            </CartItem>
            <Divider />
          </div>
        ))}
      </ScrollContainer>
      
      <CartFooter>
        <Subtotal>
          <span>Subtotal:</span>
          <span>${calculateSubtotal().toFixed(2)}</span>
        </Subtotal>
        
        <ActionButtons> 
          <Button 
            variant="outlined" 
            fullWidth
            onClick={handleViewCart}  style={{
              borderColor: '#ef7921',
              color: '#ef7921',
            }}
          >
            View Cart
          </Button> 
          <Button 
            variant="contained" 
            fullWidth
            onClick={handleCheckout}
            style={{
              backgroundColor: '#ef7921',
              color: 'white',
            }}
          >
            Checkout
          </Button>
        </ActionButtons>
      </CartFooter>
    </CartContainer>
  );
};

export default CartPanel; 
























// import React, { useState } from 'react';
// import { styled } from '@mui/material/styles';
// import IconButton from '@mui/material/IconButton';
// import Button from '@mui/material/Button';
// import Divider from '@mui/material/Divider';
// import { MdOutlineDeleteOutline } from 'react-icons/md';
// // import { Link } from 'react-router-dom';

// // Styled components
// const CartContainer = styled('div')({
//   width: '100%',
//   maxWidth: '400px',
//   backgroundColor: '#fff',
//   borderRadius: '8px',
//   boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
//   overflow: 'hidden',
// });

// const CartHeader = styled('div')({
//   padding: '1rem 1.5rem',
//   backgroundColor: '#f8f9fa',
//   borderBottom: '1px solid #e9ecef',
//   '& h3': {
//     margin: 0,
//     fontSize: '1.25rem',
//     fontWeight: '600',
//     color: '#2d3748',
//   },
// });

// const ScrollContainer = styled('div')({
//   maxHeight: '300px',
//   overflowY: 'auto',
//   overflowX: 'hidden',
//   padding: '0.5rem',
  
//   // Custom scrollbar styling
//   '&::-webkit-scrollbar': {
//     width: '6px',
//   },
//   '&::-webkit-scrollbar-track': {
//     background: '#f1f1f1',
//     borderRadius: '10px',
//   },
//   '&::-webkit-scrollbar-thumb': {
//     background: '#c1c1c1',
//     borderRadius: '10px',
//   },
//   '&::-webkit-scrollbar-thumb:hover': {
//     background: '#a8a8a8',
//   },
// });

// const CartItem = styled('div')({
//   display: 'flex',
//   alignItems: 'flex-start',
//   gap: '1rem',
//   padding: '1rem',
//   borderRadius: '8px',
//   transition: 'background-color 0.2s ease',
//   '&:hover': {
//     backgroundColor: '#f8f9fa',
//   },
// });

// const ItemImage = styled('div')({
//   width: '80px',
//   height: '80px',
//   borderRadius: '6px',
//   overflow: 'hidden',
//   flexShrink: 0,
//   '& img': {
//     width: '100%',
//     height: '100%',
//     objectFit: 'cover',
//   },
// });

// const ItemInfo = styled('div')({
//   flex: 1,
//   position: 'relative',
// });

// const ItemName = styled('a')({
//   fontSize: '0.95rem',
//   fontWeight: '500',
//   color: '#2d3748',
//   textDecoration: 'none',
//   display: 'block',
//   marginBottom: '0.5rem',
//   cursor: 'pointer',
//   '&:hover': {
//     color: '#ef7921',
//   },
// });

// const ItemDetails = styled('div')({
//   display: 'flex',
//   justifyContent: 'space-between',
//   alignItems: 'center',
//   marginBottom: '0.5rem',
// });

// const Quantity = styled('span')({
//   fontSize: '0.85rem',
//   color: '#6b7280',
// });

// const Price = styled('span')({
//   fontSize: '1rem',
//   fontWeight: '600',
//   color: '#ef7921',
// });

// const DeleteButton = styled(IconButton)({
//   position: 'absolute',
//   top: 0,
//   right: 0,
//   color: '#9ca3af',
//   padding: '4px',
//   '&:hover': {
//     color: '#ef4444',
//     backgroundColor: 'rgba(239, 68, 68, 0.1)',
//   },
// });

// const CartFooter = styled('div')({
//   padding: '1.5rem',
//   backgroundColor: '#f8f9fa',
//   borderTop: '1px solid #e9ecef',
// });

// const Subtotal = styled('div')({
//   display: 'flex',
//   justifyContent: 'space-between',
//   alignItems: 'center',
//   marginBottom: '1rem',
//   '& span:first-of-type': {
//     fontSize: '1rem',
//     fontWeight: '500',
//     color: '#4b5563',
//   },
//   '& span:last-of-type': {
//     fontSize: '1.25rem',
//     fontWeight: '600',
//     color: '#2d3748',
//   },
// });

// const ActionButtons = styled('div')({
//   display: 'flex',
//   flexDirection: 'column',
//   gap: '0.75rem',
// });

// const EmptyCart = styled('div')({
//   display: 'flex',
//   flexDirection: 'column',
//   alignItems: 'center',
//   justifyContent: 'center',
//   padding: '2rem 1rem',
//   color: '#9ca3af',
//   '& p': {
//     margin: '1rem 0 0 0',
//     fontSize: '0.95rem',
//     textAlign: 'center',
//   },
// });









// const CartPanel = () => {
//   const [cartItems, setCartItems] = useState([
//     {
//       id: 1,
//       name: 'Premium Leather Wristwatch',
//       image: '/src/assets/images/electronics.jpg',
//       price: 18,
//       quantity: 2,
//     },
//     {
//       id: 2,
//       name: 'Luxury Handbag',
//       image: '/src/assets/images/handbag.jpg',
//       price: 45,
//       quantity: 1,
//     },
//     {
//       id: 3,
//       name: 'Jewelry',
//       image: '/src/assets/images/jewelry.jpg',
//       price: 32,
//       quantity: 1,
//     },
//   ]);

//   const handleRemoveItem = (itemId) => {
//     setCartItems(cartItems.filter(item => item.id !== itemId));
//   };

//   const handleViewCart = () => {
//     // Navigate to cart page
//     console.log('Navigate to cart page');
//     window.location.href = '/cart'; // Uncomment if you want actual navigation
//   };

//   const handleCheckout = () => {
//     // Navigate to checkout page
//     // console.log('Navigate to checkout page');
//     window.location.href = '/checkout'; // Uncomment if you want actual navigation
//   };

//   const handleProductClick = (productId) => {
//     // Navigate to product detail page
//     console.log('Navigate to product page:', productId);
//     // window.location.href = `/product/${productId}`; // Uncomment if you want actual navigation
//   };

//   const calculateSubtotal = () => {
//     return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
//   };

//   if (cartItems.length === 0) {
//     return (
//       <CartContainer>
//         <CartHeader>
//           <h3>Shopping Cart</h3>
//         </CartHeader>
//         <EmptyCart>
//           <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//             <path d="M3 3H5L5.4 5M7 13H17L21 5H5.4M7 13L5.4 5M7 13L4.707 15.293C4.077 15.923 4.523 17 5.414 17H17M17 17C16.4696 17 15.9609 17.2107 15.5858 17.5858C15.2107 17.9609 15 18.4696 15 19C15 19.5304 15.2107 20.0391 15.5858 20.4142C15.9609 20.7893 16.4696 21 17 21C17.5304 21 18.0391 20.7893 18.4142 20.4142C18.7893 20.0391 19 19.5304 19 19C19 18.4696 18.7893 17.9609 18.4142 17.5858C18.0391 17.2107 17.5304 17 17 17ZM9 19C9 19.5304 8.78929 20.0391 8.41421 20.4142C8.03914 20.7893 7.53043 21 7 21C6.46957 21 5.96086 20.7893 5.58579 20.4142C5.21071 20.0391 5 19.5304 5 19C5 18.4696 5.21071 17.9609 5.58579 17.5858C5.96086 17.2107 6.46957 17 7 17C7.53043 17 8.03914 17.2107 8.41421 17.5858C8.78929 17.9609 9 18.4696 9 19Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
//           </svg>
//           <p>Your cart is empty</p>
//         </EmptyCart>
//       </CartContainer>
//     );
//   }

//   return (
//     <CartContainer>
//       <CartHeader>
//         <h3>Shopping Cart ({cartItems.length})</h3>
//       </CartHeader>
      
//       <ScrollContainer>
//         {cartItems.map((item) => (
//           <div key={item.id}>
//             <CartItem>
//               <ItemImage>
//                 <img src={item.image} alt={item.name} />
//               </ItemImage>
              
//               <ItemInfo>
//                 <ItemName 
//                   onClick={() => handleProductClick(item.id)}
//                   onKeyPress={(e) => e.key === 'Enter' && handleProductClick(item.id)}
//                   tabIndex={0}
//                   role="link"
//                 >
//                   {item.name}
//                 </ItemName>
                
//                 <ItemDetails>
//                   <Quantity>Qty: {item.quantity}</Quantity>
//                   <Price>${(item.price * item.quantity).toFixed(2)}</Price>
//                 </ItemDetails>
                
//                 <DeleteButton 
//                   size="small" 
//                   onClick={() => handleRemoveItem(item.id)}
//                   aria-label="Remove item"
//                 >
//                   <MdOutlineDeleteOutline />
//                 </DeleteButton>
//               </ItemInfo>
//             </CartItem>
//             <Divider />
//           </div>
//         ))}
//       </ScrollContainer>
      
//       <CartFooter>
//         <Subtotal>
//           <span>Subtotal:</span>
//           <span>${calculateSubtotal().toFixed(2)}</span>
//         </Subtotal>
        
//         <ActionButtons> 
//           <Button 
//             variant="outlined" 
//             fullWidth
//             onClick={handleViewCart}  style={{
//               borderColor: '#ef7921',
//               color: '#ef7921',
//             }}
//           >
//             View Cart
//           </Button> 
//           <Button 
//             variant="contained" 
//             fullWidth
//             onClick={handleCheckout}
//             style={{
//               backgroundColor: '#ef7921',
//               color: 'white',
//             }}
//           >
//             Checkout
//           </Button>
//         </ActionButtons>
//       </CartFooter>
//     </CartContainer>
//   );
// };

// export default CartPanel;




















// import React from 'react'
// import { Link } from 'react-router-dom'
// import { MdOutlineDeleteOutline } from 'react-icons/md'

// const CartPanel = () => {
//   return (
//     <>
//         <div className="scroll w-full max-h-[300px] overflow-y-scroll overflow-x-hidden">
//             <div className="cartItem w-full flex items-center gap-4">
//                 <div className="img w-[30%]">
//                 <img src="/src/assets/images/electronics.jpg" alt="imamge"/>
//                 </div>

//                 <div className="info w-[70%]">
//                 <h4 className='text-[16px] font-[500]'> 
//                     Wristwatch 
//                 </h4>
//                 <p className="flex items-center gap-5" style={{marginTop: "2", marginBottom: "2"}}> 
//                   <span><span>Qty: 2</span></span>
//                   <span className='text-[#ef7921] font-bold'> Price: $18</span>
//                 </p>

//                 <MdOutlineDeleteOutline />
//                 </div>
//             </div>
//         </div>
//     </>
//   )
// }

// export default CartPanel 



















