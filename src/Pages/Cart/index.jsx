import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import { MdOutlineDeleteOutline, MdOutlineShoppingCart } from 'react-icons/md';
import { IoArrowBack } from 'react-icons/io5';
import { FaRegHeart } from 'react-icons/fa';
import BusinessIcon from '@mui/icons-material/Business';
import StorefrontIcon from '@mui/icons-material/Storefront';
import { cartApi } from '../../utils/cartApi';
import { toast } from 'react-toastify';
import { useAuth } from '../../context/authContext';

// Styled Components
const CartContainer = styled('div')({
  maxWidth: '1200px',
  margin: '0 auto',
  padding: '2rem 1rem',
  fontFamily: 'Arial, sans-serif',
});

const PageHeader = styled('div')({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginBottom: '2rem',
  '@media (max-width: 768px)': {
    flexDirection: 'column',
    gap: '1rem',
    alignItems: 'flex-start',
  },
});

const PageTitle = styled('h1')({
  fontSize: '2rem',
  fontWeight: '600',
  color: '#1f2937',
  margin: 0,
  display: 'flex',
  alignItems: 'center',
  gap: '0.5rem',
});

const ContinueShopping = styled(Link)({
  display: 'flex',
  alignItems: 'center',
  gap: '0.5rem',
  textDecoration: 'none',
  color: '#6b7280',
  fontSize: '0.9rem',
  fontWeight: '500',
  '&:hover': {
    color: '#ef7921',
  },
});

const CartContent = styled('div')({
  display: 'grid',
  gridTemplateColumns: '1fr 350px',
  gap: '2rem',
  '@media (max-width: 968px)': {
    gridTemplateColumns: '1fr',
  },
});

const CartItems = styled('div')({
  backgroundColor: '#fff',
  borderRadius: '8px',
  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
  border: '1px solid #e5e7eb',
  overflow: 'hidden',
});

const CartHeader = styled('div')({
  padding: '1rem 1.5rem',
  backgroundColor: '#f8f9fa',
  borderBottom: '1px solid #e9ecef',
  display: 'grid',
  gridTemplateColumns: '2fr 1fr 1fr 1fr',
  gap: '1rem',
  fontWeight: '600',
  color: '#374151',
  '@media (max-width: 768px)': {
    display: 'none',
  },
});

const CartItem = styled('div')({
  padding: '1.5rem',
  display: 'grid',
  gridTemplateColumns: '2fr 1fr 1fr 1fr',
  gap: '1rem',
  alignItems: 'center',
  borderBottom: '1px solid #f3f4f6',
  '&:last-child': {
    borderBottom: 'none',
  },
  '@media (max-width: 768px)': {
    gridTemplateColumns: '1fr',
    gap: '1rem',
    textAlign: 'center',
  },
});

const ItemInfo = styled('div')({
  display: 'flex',
  alignItems: 'center',
  gap: '1rem',
  '@media (max-width: 768px)': {
    flexDirection: 'column',
    textAlign: 'center',
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

const ItemDetails = styled('div')({
  flex: 1,
  '& h3': {
    margin: '0 0 0.5rem 0',
    fontSize: '1rem',
    fontWeight: '500',
    color: '#1f2937',
  },
  '& p': {
    margin: 0,
    fontSize: '0.9rem',
    color: '#6b7280',
  },
});

const ItemPrice = styled('div')({
  fontSize: '1rem',
  fontWeight: '600',
  color: '#1f2937',
  display: 'flex',
  flexDirection: 'column',
  gap: '0.25rem',
  '@media (max-width: 768px)': {
    '&::before': {
      content: '"Price: "',
      fontWeight: '500',
      color: '#6b7280',
    },
  },
});

const TierBadge = styled('span')(({ tier }) => ({
  fontSize: '0.75rem',
  padding: '0.25rem 0.5rem',
  borderRadius: '4px',
  backgroundColor: tier === 'wholesale' ? '#10b981' : '#6b7280',
  color: 'white',
  display: 'flex',
  alignItems: 'center',
  gap: '0.25rem',
  width: 'fit-content',
}));

const QuantityControl = styled('div')({
  display: 'flex',
  alignItems: 'center',
  border: '1px solid #d1d5db',
  borderRadius: '4px',
  overflow: 'hidden',
  width: 'fit-content',
  '@media (max-width: 768px)': {
    margin: '0 auto',
  },
});

const QuantityButton = styled('button')({
  width: '32px',
  height: '32px',
  border: 'none',
  background: '#f9fafb',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '1.1rem',
  '&:hover': {
    backgroundColor: '#f3f4f6',
  },
  '&:disabled': {
    backgroundColor: '#f9fafb',
    color: '#d1d5db',
    cursor: 'not-allowed',
  },
});

const QuantityDisplay = styled('span')({
  width: '40px',
  textAlign: 'center',
  fontWeight: '500',
});

const ItemSubtotal = styled('div')({
  fontSize: '1rem',
  fontWeight: '600',
  color: '#ef7921',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  '@media (max-width: 768px)': {
    '&::before': {
      content: '"Subtotal: "',
      fontWeight: '500',
      color: '#6b7280',
    },
  },
});

const DeleteButton = styled(IconButton)({
  color: '#9ca3af',
  padding: '4px',
  '&:hover': {
    color: '#ef4444',
    backgroundColor: 'rgba(239, 68, 68, 0.1)',
  },
});

const CartSummary = styled('div')({
  backgroundColor: '#fff',
  borderRadius: '8px',
  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
  border: '1px solid #e5e7eb',
  padding: '1.5rem',
  height: 'fit-content',
});

const SummaryTitle = styled('h2')({
  fontSize: '1.25rem',
  fontWeight: '600',
  margin: '0 0 1.5rem 0',
  color: '#1f2937',
  paddingBottom: '1rem',
  borderBottom: '1px solid #e5e7eb',
});

const SummaryRow = styled('div')({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: '1rem',
  '& span': {
    fontSize: '0.95rem',
    color: '#6b7280',
  },
  '& strong': {
    fontSize: '1rem',
    color: '#1f2937',
  },
});

const TotalRow = styled('div')({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  margin: '1.5rem 0',
  paddingTop: '1rem',
  borderTop: '1px solid #e5e7eb',
  '& span': {
    fontSize: '1.1rem',
    fontWeight: '600',
    color: '#1f2937',
  },
  '& strong': {
    fontSize: '1.25rem',
    color: '#ef7921',
  },
});

const PromoCode = styled('div')({
  margin: '1.5rem 0',
  '& h3': {
    fontSize: '1rem',
    fontWeight: '500',
    margin: '0 0 0.5rem 0',
    color: '#374151',
  },
});

const EmptyCart = styled('div')({
  textAlign: 'center',
  padding: '3rem 1rem',
  color: '#9ca3af',
  '& svg': {
    marginBottom: '1rem',
  },
  '& h2': {
    fontSize: '1.5rem',
    fontWeight: '600',
    margin: '0 0 1rem 0',
    color: '#6b7280',
  },
  '& p': {
    margin: '0 0 2rem 0',
    fontSize: '1rem',
  },
});

const LoadingSpinner = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '3rem',
  '&::after': {
    content: '""',
    width: '40px',
    height: '40px',
    border: '4px solid #f3f3f3',
    borderTop: '4px solid #ef7921',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
  },
  '@keyframes spin': {
    '0%': { transform: 'rotate(0deg)' },
    '100%': { transform: 'rotate(360deg)' },
  },
});

const Cart = () => {
  const { currentUser } = useAuth();
  const [cartData, setCartData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [promoCode, setPromoCode] = useState('');

  useEffect(() => {
    if (currentUser) {
      fetchCart();
    } else {
      setLoading(false);
    }
  }, [currentUser]);

  const fetchCart = async () => {
    try {
      setLoading(true);
      const response = await cartApi.getCart();
      console.log('Cart data:', response.data);
      setCartData(response.data);
    } catch (error) {
      console.error('Error fetching cart:', error);
      toast.error('Failed to load cart');
    } finally {
      setLoading(false);
    }
  };

  const handleQuantityChange = async (cartItemId, newQuantity) => {
    if (!currentUser) {
      toast.error('Please login to update cart');
      return;
    }

    if (newQuantity < 1) {
      // If quantity becomes 0, remove the item
      await handleRemoveItem(cartItemId);
      return;
    }

    try {
      setUpdating(true);
      await cartApi.updateCartItem(cartItemId, newQuantity);
      await fetchCart(); // Refresh cart data
      toast.success('Cart updated successfully');
    } catch (error) {
      console.error('Error updating quantity:', error);
      toast.error(error.response?.data?.message || 'Failed to update quantity');
    } finally {
      setUpdating(false);
    }
  };

  const handleRemoveItem = async (cartItemId) => {
    if (!currentUser) {
      toast.error('Please login to modify cart');
      return;
    }

    try {
      setUpdating(true);
      await cartApi.removeCartItem(cartItemId);
      await fetchCart(); // Refresh cart data
      toast.success('Item removed from cart');
    } catch (error) {
      console.error('Error removing item:', error);
      toast.error(error.response?.data?.message || 'Failed to remove item');
    } finally {
      setUpdating(false);
    }
  };

  const handleClearCart = async () => {
    if (!currentUser) {
      toast.error('Please login to modify cart');
      return;
    }

    if (!window.confirm('Are you sure you want to clear your entire cart?')) {
      return;
    }

    try {
      setUpdating(true);
      await cartApi.clearCart();
      setCartData(null);
      toast.success('Cart cleared successfully');
    } catch (error) {
      console.error('Error clearing cart:', error);
      toast.error(error.response?.data?.message || 'Failed to clear cart');
    } finally {
      setUpdating(false);
    }
  };

  const handleApplyPromo = () => {
    if (!promoCode.trim()) {
      toast.error('Please enter a promo code');
      return;
    }
    toast.info('Promo code functionality coming soon!');
    // Implement promo code logic here
  };

  if (loading) {
    return (
      <CartContainer>
        <LoadingSpinner />
      </CartContainer>
    );
  }

  if (!currentUser) {
    return (
      <CartContainer>
        <EmptyCart>
          <svg width="80" height="80" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 3H5L5.4 5M7 13H17L21 5H5.4M7 13L5.4 5M7 13L4.707 15.293C4.077 15.923 4.523 17 5.414 17H17M17 17C16.4696 17 15.9609 17.2107 15.5858 17.5858C15.2107 17.9609 15 18.4696 15 19C15 19.5304 15.2107 20.0391 15.5858 20.4142C15.9609 20.7893 16.4696 21 17 21C17.5304 21 18.0391 20.7893 18.4142 20.4142C18.7893 20.0391 19 19.5304 19 19C19 18.4696 18.7893 17.9609 18.4142 17.5858C18.0391 17.2107 17.5304 17 17 17ZM9 19C9 19.5304 8.78929 20.0391 8.41421 20.4142C8.03914 20.7893 7.53043 21 7 21C6.46957 21 5.96086 20.7893 5.58579 20.4142C5.21071 20.0391 5 19.5304 5 19C5 18.4696 5.21071 17.9609 5.58579 17.5858C5.96086 17.2107 6.46957 17 7 17C7.53043 17 8.03914 17.2107 8.41421 17.5858C8.78929 17.9609 9 18.4696 9 19Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <h2>Please Login</h2>
          <p>You need to be logged in to view your cart.</p>
          <Button
            variant="contained"
            component={Link}
            to="/login"
            style={{
              backgroundColor: "#ef7921",
              color: "white",
              fontWeight: "600",
              padding: "0.75rem 2rem",
            }}
          >
            Login to View Cart
          </Button>
        </EmptyCart>
      </CartContainer>
    );
  }

  if (!cartData || !cartData.items || cartData.items.length === 0) {
    return (
      <CartContainer>
        <PageHeader>
          <PageTitle>
            <MdOutlineShoppingCart size={28} />
            Shopping Cart
          </PageTitle>
          <ContinueShopping to="/">
            <IoArrowBack />
            Continue Shopping
          </ContinueShopping>
        </PageHeader>
        
        <EmptyCart>
          <svg width="80" height="80" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 3H5L5.4 5M7 13H17L21 5H5.4M7 13L5.4 5M7 13L4.707 15.293C4.077 15.923 4.523 17 5.414 17H17M17 17C16.4696 17 15.9609 17.2107 15.5858 17.5858C15.2107 17.9609 15 18.4696 15 19C15 19.5304 15.2107 20.0391 15.5858 20.4142C15.9609 20.7893 16.4696 21 17 21C17.5304 21 18.0391 20.7893 18.4142 20.4142C18.7893 20.0391 19 19.5304 19 19C19 18.4696 18.7893 17.9609 18.4142 17.5858C18.0391 17.2107 17.5304 17 17 17ZM9 19C9 19.5304 8.78929 20.0391 8.41421 20.4142C8.03914 20.7893 7.53043 21 7 21C6.46957 21 5.96086 20.7893 5.58579 20.4142C5.21071 20.0391 5 19.5304 5 19C5 18.4696 5.21071 17.9609 5.58579 17.5858C5.96086 17.2107 6.46957 17 7 17C7.53043 17 8.03914 17.2107 8.41421 17.5858C8.78929 17.9609 9 18.4696 9 19Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <h2>Your cart is empty</h2>
          <p>Looks like you haven't added any items to your cart yet.</p>
          <Button
            variant="contained"
            component={Link}
            to="/"
            style={{
              backgroundColor: "#ef7921",
              color: "white",
              fontWeight: "600",
              padding: "0.75rem 2rem",
            }}
          >
            Start Shopping
          </Button>
        </EmptyCart>
      </CartContainer>
    );
  }

  const { items, summary } = cartData;

  return (
    <CartContainer>
      <PageHeader>
        <PageTitle>
          <MdOutlineShoppingCart size={28} />
          Shopping Cart ({summary.totalItems})
        </PageTitle>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <Button
            variant="outlined"
            onClick={handleClearCart}
            disabled={updating}
            style={{ 
              color: '#ef4444', 
              borderColor: '#ef4444',
              fontSize: '0.8rem',
              padding: '0.5rem 1rem'
            }}
          >
            {updating ? 'Clearing...' : 'Clear Cart'}
          </Button>
          <ContinueShopping to="/">
            <IoArrowBack />
            Continue Shopping
          </ContinueShopping>
        </div>
      </PageHeader>

      <CartContent>
        <CartItems>
          <CartHeader>
            <span>Product</span>
            <span>Price</span>
            <span>Quantity</span>
            <span>Subtotal</span>
          </CartHeader>

          {items.map((item) => (
            <CartItem key={item._id}>
              <ItemInfo>
                <ItemImage>
                  <img 
                    src={item.product.images[0]?.url || '/src/assets/images/grocery.jpg'} 
                    alt={item.product.name}
                    onError={(e) => {
                      e.target.src = '/src/assets/images/grocery.jpg';
                    }}
                  />
                </ItemImage>
                <ItemDetails>
                  <Link 
                    to={`/product/${item.product._id}`}
                    style={{ textDecoration: 'none', color: 'inherit' }}
                  >
                    <h3>{item.product.name}</h3>
                  </Link>
                  <p>Status: {item.product.status || 'Available'}</p>
                  {item.product.brand && <p>Brand: {item.product.brand}</p>}
                  {item.product.stock && (
                    <p style={{ 
                      color: item.product.stock > 0 ? '#10b981' : '#ef4444',
                      fontSize: '0.8rem'
                    }}>
                      Stock: {item.product.stock} available
                    </p>
                  )}
                  {item.pricingTier === 'wholesale' && (
                    <div style={{ fontSize: '0.8rem', color: '#10b981', marginTop: '0.25rem' }}>
                      ✓ Wholesale pricing applied
                    </div>
                  )}
                </ItemDetails>
              </ItemInfo>

              <ItemPrice>
                ${item.itemPrice?.toFixed(2) || '0.00'}
                <TierBadge tier={item.pricingTier}>
                  {item.pricingTier === 'wholesale' ? <BusinessIcon fontSize="small" /> : <StorefrontIcon fontSize="small" />}
                  {item.pricingTier}
                </TierBadge>
                {item.canWholesale && (
                  <span style={{ fontSize: '0.75rem', color: '#6b7280', marginTop: '0.25rem' }}>
                    Add {item.moqRequired} more for wholesale
                  </span>
                )}
              </ItemPrice>

              <QuantityControl>
                <QuantityButton 
                  onClick={() => handleQuantityChange(item._id, item.quantity - 1)}
                  disabled={updating || item.quantity <= 1}
                >
                  -
                </QuantityButton>
                <QuantityDisplay>{item.quantity}</QuantityDisplay>
                <QuantityButton 
                  onClick={() => handleQuantityChange(item._id, item.quantity + 1)}
                  disabled={updating || (item.product.stock && item.quantity >= item.product.stock)}
                >
                  +
                </QuantityButton>
              </QuantityControl>

              <ItemSubtotal>
                <span>${item.subtotal?.toFixed(2) || '0.00'}</span>
                {item.savings > 0 && (
                  <span style={{ fontSize: '0.75rem', color: '#10b981' }}>
                    Saved: ${item.savings?.toFixed(2) || '0.00'}
                  </span>
                )}
                <DeleteButton 
                  size="small" 
                  onClick={() => handleRemoveItem(item._id)}
                  disabled={updating}
                  aria-label="Remove item"
                >
                  <MdOutlineDeleteOutline />
                </DeleteButton>
              </ItemSubtotal>
            </CartItem>
          ))}
        </CartItems>

        <CartSummary>
          <SummaryTitle>Order Summary</SummaryTitle>

          <SummaryRow>
            <span>Subtotal ({summary.totalItems} items)</span>
            <strong>${summary.subtotal?.toFixed(2) || '0.00'}</strong>
          </SummaryRow>

          <SummaryRow>
            <span>Shipping</span>
            <strong>{summary.shipping === 0 ? 'Free' : `$${summary.shipping?.toFixed(2) || '0.00'}`}</strong>
          </SummaryRow>

          {summary.totalSavings > 0 && (
            <SummaryRow>
              <span>Wholesale Savings</span>
              <strong style={{ color: '#10b981' }}>
                -${summary.totalSavings?.toFixed(2) || '0.00'}
              </strong>
            </SummaryRow>
          )}

          <PromoCode>
            <h3>Promo Code</h3>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <TextField
                size="small"
                placeholder="Enter code"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                fullWidth
              />
              <Button 
                variant="outlined"
                onClick={handleApplyPromo}
                style={{ 
                  borderColor: '#ef7921',
                  color: '#ef7921',
                  whiteSpace: 'nowrap',
                }}
              >
                Apply
              </Button>
            </div>
          </PromoCode>

          <TotalRow>
            <span>Total</span>
            <strong>${summary.total?.toFixed(2) || '0.00'}</strong>
          </TotalRow>

          <Button
            variant="contained"
            fullWidth
            component={Link}
            to="/checkout"
            style={{
              backgroundColor: "#ef7921",
              color: "white",
              fontWeight: "600",
              padding: "0.75rem",
              marginBottom: "1rem",
            }}
          >
            Proceed to Checkout
          </Button>

          <Button
            variant="outlined"
            fullWidth
            startIcon={<FaRegHeart />}
            style={{
              borderColor: "#d1d5db",
              color: "#4b5563",
            }}
          >
            Save for Later
          </Button>
        </CartSummary>
      </CartContent>
    </CartContainer>
  );
};

export default Cart;
















































// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import { styled } from '@mui/material/styles';
// import Button from '@mui/material/Button';
// import IconButton from '@mui/material/IconButton';
// import TextField from '@mui/material/TextField';
// import { MdOutlineDeleteOutline, MdOutlineShoppingCart } from 'react-icons/md';
// import { IoArrowBack } from 'react-icons/io5';
// import { FaRegHeart } from 'react-icons/fa';
// import BusinessIcon from '@mui/icons-material/Business';
// import StorefrontIcon from '@mui/icons-material/Storefront';
// import { cartApi } from '../../utils/cartApi';
// import { toast } from 'react-toastify';
// import { useAuth } from '../../context/authContext';

// // ... (keep all your existing styled components)

// const CartContainer = styled('div')({
//   maxWidth: '1200px',
//   margin: '0 auto',
//   padding: '2rem 1rem',
//   fontFamily: 'Arial, sans-serif',
// });

// const PageHeader = styled('div')({
//   display: 'flex',
//   alignItems: 'center',
//   justifyContent: 'space-between',
//   marginBottom: '2rem',
// });

// const PageTitle = styled('h1')({
//   fontSize: '2rem',
//   fontWeight: '600',
//   color: '#1f2937',
//   margin: 0,
//   display: 'flex',
//   alignItems: 'center',
//   gap: '0.5rem',
// });

// const ContinueShopping = styled(Link)({
//   display: 'flex',
//   alignItems: 'center',
//   gap: '0.5rem',
//   textDecoration: 'none',
//   color: '#6b7280',
//   fontSize: '0.9rem',
//   fontWeight: '500',
//   '&:hover': {
//     color: '#ef7921',
//   },
// });

// const CartContent = styled('div')({
//   display: 'grid',
//   gridTemplateColumns: '1fr 350px',
//   gap: '2rem',
//   '@media (max-width: 968px)': {
//     gridTemplateColumns: '1fr',
//   },
// });

// const CartItems = styled('div')({
//   backgroundColor: '#fff',
//   borderRadius: '8px',
//   boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
//   border: '1px solid #e5e7eb',
//   overflow: 'hidden',
// });

// const CartHeader = styled('div')({
//   padding: '1rem 1.5rem',
//   backgroundColor: '#f8f9fa',
//   borderBottom: '1px solid #e9ecef',
//   display: 'grid',
//   gridTemplateColumns: '2fr 1fr 1fr 1fr',
//   gap: '1rem',
//   fontWeight: '600',
//   color: '#374151',
//   '@media (max-width: 768px)': {
//     display: 'none',
//   },
// });

// const CartItem = styled('div')({
//   padding: '1.5rem',
//   display: 'grid',
//   gridTemplateColumns: '2fr 1fr 1fr 1fr',
//   gap: '1rem',
//   alignItems: 'center',
//   borderBottom: '1px solid #f3f4f6',
//   '&:last-child': {
//     borderBottom: 'none',
//   },
//   '@media (max-width: 768px)': {
//     gridTemplateColumns: '1fr',
//     gap: '1rem',
//     textAlign: 'center',
//   },
// });

// const ItemInfo = styled('div')({
//   display: 'flex',
//   alignItems: 'center',
//   gap: '1rem',
//   '@media (max-width: 768px)': {
//     flexDirection: 'column',
//     textAlign: 'center',
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

// const ItemDetails = styled('div')({
//   '& h3': {
//     margin: '0 0 0.5rem 0',
//     fontSize: '1rem',
//     fontWeight: '500',
//     color: '#1f2937',
//   },
//   '& p': {
//     margin: 0,
//     fontSize: '0.9rem',
//     color: '#6b7280',
//   },
// });

// const ItemPrice = styled('div')({
//   fontSize: '1rem',
//   fontWeight: '600',
//   color: '#1f2937',
//   display: 'flex',
//   flexDirection: 'column',
//   gap: '0.25rem',
//   '@media (max-width: 768px)': {
//     '&::before': {
//       content: '"Price: "',
//       fontWeight: '500',
//       color: '#6b7280',
//     },
//   },
// });

// const TierBadge = styled('span')(({ tier }) => ({
//   fontSize: '0.75rem',
//   padding: '0.25rem 0.5rem',
//   borderRadius: '4px',
//   backgroundColor: tier === 'wholesale' ? '#10b981' : '#6b7280',
//   color: 'white',
//   display: 'flex',
//   alignItems: 'center',
//   gap: '0.25rem',
//   width: 'fit-content',
// }));

// const QuantityControl = styled('div')({
//   display: 'flex',
//   alignItems: 'center',
//   border: '1px solid #d1d5db',
//   borderRadius: '4px',
//   overflow: 'hidden',
//   width: 'fit-content',
//   '@media (max-width: 768px)': {
//     margin: '0 auto',
//   },
// });

// const QuantityButton = styled('button')({
//   width: '32px',
//   height: '32px',
//   border: 'none',
//   background: '#f9fafb',
//   cursor: 'pointer',
//   display: 'flex',
//   alignItems: 'center',
//   justifyContent: 'center',
//   fontSize: '1.1rem',
//   '&:hover': {
//     backgroundColor: '#f3f4f6',
//   },
// });

// const QuantityDisplay = styled('span')({
//   width: '40px',
//   textAlign: 'center',
//   fontWeight: '500',
// });

// const ItemSubtotal = styled('div')({
//   fontSize: '1rem',
//   fontWeight: '600',
//   color: '#ef7921',
//   display: 'flex',
//   alignItems: 'center',
//   justifyContent: 'space-between',
//   '@media (max-width: 768px)': {
//     '&::before': {
//       content: '"Subtotal: "',
//       fontWeight: '500',
//       color: '#6b7280',
//     },
//   },
// });

// const DeleteButton = styled(IconButton)({
//   color: '#9ca3af',
//   padding: '4px',
//   '&:hover': {
//     color: '#ef4444',
//     backgroundColor: 'rgba(239, 68, 68, 0.1)',
//   },
// });

// const CartSummary = styled('div')({
//   backgroundColor: '#fff',
//   borderRadius: '8px',
//   boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
//   border: '1px solid #e5e7eb',
//   padding: '1.5rem',
//   height: 'fit-content',
// });

// const SummaryTitle = styled('h2')({
//   fontSize: '1.25rem',
//   fontWeight: '600',
//   margin: '0 0 1.5rem 0',
//   color: '#1f2937',
//   paddingBottom: '1rem',
//   borderBottom: '1px solid #e5e7eb',
// });

// const SummaryRow = styled('div')({
//   display: 'flex',
//   justifyContent: 'space-between',
//   alignItems: 'center',
//   marginBottom: '1rem',
//   '& span': {
//     fontSize: '0.95rem',
//     color: '#6b7280',
//   },
//   '& strong': {
//     fontSize: '1rem',
//     color: '#1f2937',
//   },
// });

// const TotalRow = styled('div')({
//   display: 'flex',
//   justifyContent: 'space-between',
//   alignItems: 'center',
//   margin: '1.5rem 0',
//   paddingTop: '1rem',
//   borderTop: '1px solid #e5e7eb',
//   '& span': {
//     fontSize: '1.1rem',
//     fontWeight: '600',
//     color: '#1f2937',
//   },
//   '& strong': {
//     fontSize: '1.25rem',
//     color: '#ef7921',
//   },
// });

// const PromoCode = styled('div')({
//   margin: '1.5rem 0',
//   '& h3': {
//     fontSize: '1rem',
//     fontWeight: '500',
//     margin: '0 0 0.5rem 0',
//     color: '#374151',
//   },
// });

// const EmptyCart = styled('div')({
//   textAlign: 'center',
//   padding: '3rem 1rem',
//   color: '#9ca3af',
//   '& svg': {
//     marginBottom: '1rem',
//   },
//   '& h2': {
//     fontSize: '1.5rem',
//     fontWeight: '600',
//     margin: '0 0 1rem 0',
//     color: '#6b7280',
//   },
//   '& p': {
//     margin: '0 0 2rem 0',
//     fontSize: '1rem',
//   },
// });

// const Cart = () => {
//   const [cartItems, setCartItems] = useState([
//     {
//       id: 1,
//       name: 'Premium Leather Wristwatch',
//       image: '/src/assets/images/electronics.jpg',
//       retailPrice: 18,
//       wholesalePrice: 15,
//       quantity: 2,
//       moq: 3,
//       color: 'Black',
//       size: 'M',
//     },
//     {
//       id: 2,
//       name: 'Luxury Handbag',
//       image: '/src/assets/images/handbag.jpg',
//       retailPrice: 45,
//       wholesalePrice: 38,
//       quantity: 4,
//       moq: 3,
//       color: 'Brown',
//       size: 'One Size',
//     },
//     {
//       id: 3,
//       name: 'Diamond Jewelry Set',
//       image: '/src/assets/images/jewelry.jpg',
//       retailPrice: 32,
//       wholesalePrice: 28,
//       quantity: 1,
//       moq: 2,
//       color: 'Silver',
//       size: 'S',
//     },
//   ]);


// const Cart = () => {
//   const { currentUser } = useAuth();
//   const [cartData, setCartData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [updating, setUpdating] = useState(false);
//   const [promoCode, setPromoCode] = useState('');

//   useEffect(() => {
//     if (currentUser) {
//       fetchCart();
//     } else {
//       setLoading(false);
//     }
//   }, [currentUser]);

//   const fetchCart = async () => {
//     try {
//       setLoading(true);
//       const response = await cartApi.getCart();
//       setCartData(response.data);
//     } catch (error) {
//       console.error('Error fetching cart:', error);
//       toast.error('Failed to load cart');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleQuantityChange = async (cartItemId, newQuantity) => {
//     if (!currentUser) {
//       toast.error('Please login to update cart');
//       return;
//     }

//     if (newQuantity < 1) return;

//     try {
//       setUpdating(true);
//       await cartApi.updateCartItem(cartItemId, newQuantity);
//       await fetchCart(); // Refresh cart data
//       toast.success('Cart updated');
//     } catch (error) {
//       console.error('Error updating quantity:', error);
//       toast.error(error.message || 'Failed to update quantity');
//     } finally {
//       setUpdating(false);
//     }
//   };

//   const handleRemoveItem = async (cartItemId) => {
//     if (!currentUser) {
//       toast.error('Please login to modify cart');
//       return;
//     }

//     try {
//       setUpdating(true);
//       await cartApi.removeCartItem(cartItemId);
//       await fetchCart(); // Refresh cart data
//       toast.success('Item removed from cart');
//     } catch (error) {
//       console.error('Error removing item:', error);
//       toast.error(error.message || 'Failed to remove item');
//     } finally {
//       setUpdating(false);
//     }
//   };

//   const handleAddToCart = async (productId, quantity = 1) => {
//     if (!currentUser) {
//       toast.error('Please login to add items to cart');
//       return;
//     }

//     try {
//       await cartApi.addToCart(productId, quantity);
//       await fetchCart(); // Refresh cart data
//       toast.success('Product added to cart');
//     } catch (error) {
//       console.error('Error adding to cart:', error);
//       toast.error(error.message || 'Failed to add to cart');
//     }
//   };

//   const handleClearCart = async () => {
//     if (!currentUser) {
//       toast.error('Please login to modify cart');
//       return;
//     }

//     try {
//       await cartApi.clearCart();
//       setCartData(null);
//       toast.success('Cart cleared');
//     } catch (error) {
//       console.error('Error clearing cart:', error);
//       toast.error(error.message || 'Failed to clear cart');
//     }
//   };

//   if (loading) {
//     return (
//       <CartContainer>
//         <div style={{ textAlign: 'center', padding: '3rem' }}>
//           <p>Loading cart...</p>
//         </div>
//       </CartContainer>
//     );
//   }

//   if (!currentUser) {
//     return (
//       <CartContainer>
//         <EmptyCart>
//           <h2>Please Login</h2>
//           <p>You need to be logged in to view your cart.</p>
//           <Button
//             variant="contained"
//             component={Link}
//             to="/login"
//             style={{
//               backgroundColor: "#ef7921",
//               color: "white",
//               fontWeight: "600",
//               padding: "0.75rem 2rem",
//             }}
//           >
//             Login
//           </Button>
//         </EmptyCart>
//       </CartContainer>
//     );
//   }

//   if (!cartData || cartData.items.length === 0) {
//     return (
//       <CartContainer>
//         <PageHeader>
//           <PageTitle>
//             <MdOutlineShoppingCart size={28} />
//             Shopping Cart
//           </PageTitle>
//           <ContinueShopping to="/">
//             <IoArrowBack />
//             Continue Shopping
//           </ContinueShopping>
//         </PageHeader>
        
//         <EmptyCart>
//           <svg width="80" height="80" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//             <path d="M3 3H5L5.4 5M7 13H17L21 5H5.4M7 13L5.4 5M7 13L4.707 15.293C4.077 15.923 4.523 17 5.414 17H17M17 17C16.4696 17 15.9609 17.2107 15.5858 17.5858C15.2107 17.9609 15 18.4696 15 19C15 19.5304 15.2107 20.0391 15.5858 20.4142C15.9609 20.7893 16.4696 21 17 21C17.5304 21 18.0391 20.7893 18.4142 20.4142C18.7893 20.0391 19 19.5304 19 19C19 18.4696 18.7893 17.9609 18.4142 17.5858C18.0391 17.2107 17.5304 17 17 17ZM9 19C9 19.5304 8.78929 20.0391 8.41421 20.4142C8.03914 20.7893 7.53043 21 7 21C6.46957 21 5.96086 20.7893 5.58579 20.4142C5.21071 20.0391 5 19.5304 5 19C5 18.4696 5.21071 17.9609 5.58579 17.5858C5.96086 17.2107 6.46957 17 7 17C7.53043 17 8.03914 17.2107 8.41421 17.5858C8.78929 17.9609 9 18.4696 9 19Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
//           </svg>
//           <h2>Your cart is empty</h2>
//           <p>Looks like you haven't added any items to your cart yet.</p>
//           <Button
//             variant="contained"
//             component={Link}
//             to="/"
//             style={{
//               backgroundColor: "#ef7921",
//               color: "white",
//               fontWeight: "600",
//               padding: "0.75rem 2rem",
//             }}
//           >
//             Start Shopping
//           </Button>
//         </EmptyCart>
//       </CartContainer>
//     );
//   }

//   const { items, summary } = cartData;

//   return (
//     <CartContainer>
//       <PageHeader>
//         <PageTitle>
//           <MdOutlineShoppingCart size={28} />
//           Shopping Cart ({summary.totalItems})
//         </PageTitle>
//         <div style={{ display: 'flex', gap: '1rem' }}>
//           <Button
//             variant="outlined"
//             onClick={handleClearCart}
//             style={{ color: '#ef4444', borderColor: '#ef4444' }}
//           >
//             Clear Cart
//           </Button>
//           <ContinueShopping to="/">
//             <IoArrowBack />
//             Continue Shopping
//           </ContinueShopping>
//         </div>
//       </PageHeader>

//       <CartContent>
//         <CartItems>
//           <CartHeader>
//             <span>Product</span>
//             <span>Price</span>
//             <span>Quantity</span>
//             <span>Subtotal</span>
//           </CartHeader>

//           {items.map((item) => (
//             <CartItem key={item._id}>
//               <ItemInfo>
//                 <ItemImage>
//                   <img 
//                     src={item.product.images[0]?.url || '/src/assets/images/grocery.jpg'} 
//                     alt={item.product.name}
//                     onError={(e) => {
//                       e.target.src = '/src/assets/images/grocery.jpg';
//                     }}
//                   />
//                 </ItemImage>
//                 <ItemDetails>
//                   <h3>{item.product.name}</h3>
//                   <p>Status: {item.product.status}</p>
//                   {item.product.brand && <p>Brand: {item.product.brand}</p>}
//                   {item.pricingTier === 'wholesale' && (
//                     <div style={{ fontSize: '0.8rem', color: '#10b981', marginTop: '0.25rem' }}>
//                       ✓ Wholesale pricing applied
//                     </div>
//                   )}
//                 </ItemDetails>
//               </ItemInfo>

//               <ItemPrice>
//                 ${item.itemPrice.toFixed(2)}
//                 <TierBadge tier={item.pricingTier}>
//                   {item.pricingTier === 'wholesale' ? <BusinessIcon fontSize="small" /> : <StorefrontIcon fontSize="small" />}
//                   {item.pricingTier}
//                 </TierBadge>
//                 {item.canWholesale && (
//                   <span style={{ fontSize: '0.75rem', color: '#6b7280' }}>
//                     Add {item.moqRequired} more for wholesale
//                   </span>
//                 )}
//               </ItemPrice>

//               <QuantityControl>
//                 <QuantityButton 
//                   onClick={() => handleQuantityChange(item._id, item.quantity - 1)}
//                   disabled={updating || item.quantity <= 1}
//                 >
//                   -
//                 </QuantityButton>
//                 <QuantityDisplay>{item.quantity}</QuantityDisplay>
//                 <QuantityButton 
//                   onClick={() => handleQuantityChange(item._id, item.quantity + 1)}
//                   disabled={updating}
//                 >
//                   +
//                 </QuantityButton>
//               </QuantityControl>

//               <ItemSubtotal>
//                 <span>${item.subtotal.toFixed(2)}</span>
//                 {item.savings > 0 && (
//                   <span style={{ fontSize: '0.75rem', color: '#10b981' }}>
//                     Saved: ${item.savings.toFixed(2)}
//                   </span>
//                 )}
//                 <DeleteButton 
//                   size="small" 
//                   onClick={() => handleRemoveItem(item._id)}
//                   disabled={updating}
//                   aria-label="Remove item"
//                 >
//                   <MdOutlineDeleteOutline />
//                 </DeleteButton>
//               </ItemSubtotal>
//             </CartItem>
//           ))}
//         </CartItems>

//         <CartSummary>
//           <SummaryTitle>Order Summary</SummaryTitle>

//           <SummaryRow>
//             <span>Subtotal ({summary.totalItems} items)</span>
//             <strong>${summary.subtotal.toFixed(2)}</strong>
//           </SummaryRow>

//           <SummaryRow>
//             <span>Shipping</span>
//             <strong>{summary.shipping === 0 ? 'Free' : `$${summary.shipping.toFixed(2)}`}</strong>
//           </SummaryRow>

//           {summary.totalSavings > 0 && (
//             <SummaryRow>
//               <span>Wholesale Savings</span>
//               <strong style={{ color: '#10b981' }}>
//                 -${summary.totalSavings.toFixed(2)}
//               </strong>
//             </SummaryRow>
//           )}

//           <PromoCode>
//             <h3>Promo Code</h3>
//             <div style={{ display: 'flex', gap: '0.5rem' }}>
//               <TextField
//                 size="small"
//                 placeholder="Enter code"
//                 value={promoCode}
//                 onChange={(e) => setPromoCode(e.target.value)}
//                 fullWidth
//               />
//               <Button 
//                 variant="outlined"
//                 style={{ 
//                   borderColor: '#ef7921',
//                   color: '#ef7921',
//                   whiteSpace: 'nowrap',
//                 }}
//               >
//                 Apply
//               </Button>
//             </div>
//           </PromoCode>

//           <TotalRow>
//             <span>Total</span>
//             <strong>${summary.total.toFixed(2)}</strong>
//           </TotalRow>

//           <Button
//             variant="contained"
//             fullWidth
//             component={Link}
//             to="/checkout"
//             style={{
//               backgroundColor: "#ef7921",
//               color: "white",
//               fontWeight: "600",
//               padding: "0.75rem",
//               marginBottom: "1rem",
//             }}
//           >
//             Proceed to Checkout
//           </Button>

//           <Button
//             variant="outlined"
//             fullWidth
//             startIcon={<FaRegHeart />}
//             style={{
//               borderColor: "#d1d5db",
//               color: "#4b5563",
//             }}
//           >
//             Save for Later
//           </Button>
//         </CartSummary>
//       </CartContent>
//     </CartContainer>
//   );
// };
// }
// export default Cart; 













































// // import React, { useState } from 'react';
// // import { Link } from 'react-router-dom';
// // import { styled } from '@mui/material/styles';
// // import Button from '@mui/material/Button';
// // import IconButton from '@mui/material/IconButton';
// // import TextField from '@mui/material/TextField';
// // import Divider from '@mui/material/Divider';
// // import { MdOutlineDeleteOutline, MdOutlineShoppingCart } from 'react-icons/md';
// // import { IoArrowBack } from 'react-icons/io5';
// // import { FaRegHeart } from 'react-icons/fa';
// // import BusinessIcon from '@mui/icons-material/Business';
// // import StorefrontIcon from '@mui/icons-material/Storefront';

// // const CartContainer = styled('div')({
// //   maxWidth: '1200px',
// //   margin: '0 auto',
// //   padding: '2rem 1rem',
// //   fontFamily: 'Arial, sans-serif',
// // });

// // const PageHeader = styled('div')({
// //   display: 'flex',
// //   alignItems: 'center',
// //   justifyContent: 'space-between',
// //   marginBottom: '2rem',
// // });

// // const PageTitle = styled('h1')({
// //   fontSize: '2rem',
// //   fontWeight: '600',
// //   color: '#1f2937',
// //   margin: 0,
// //   display: 'flex',
// //   alignItems: 'center',
// //   gap: '0.5rem',
// // });

// // const ContinueShopping = styled(Link)({
// //   display: 'flex',
// //   alignItems: 'center',
// //   gap: '0.5rem',
// //   textDecoration: 'none',
// //   color: '#6b7280',
// //   fontSize: '0.9rem',
// //   fontWeight: '500',
// //   '&:hover': {
// //     color: '#ef7921',
// //   },
// // });

// // const CartContent = styled('div')({
// //   display: 'grid',
// //   gridTemplateColumns: '1fr 350px',
// //   gap: '2rem',
// //   '@media (max-width: 968px)': {
// //     gridTemplateColumns: '1fr',
// //   },
// // });

// // const CartItems = styled('div')({
// //   backgroundColor: '#fff',
// //   borderRadius: '8px',
// //   boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
// //   border: '1px solid #e5e7eb',
// //   overflow: 'hidden',
// // });

// // const CartHeader = styled('div')({
// //   padding: '1rem 1.5rem',
// //   backgroundColor: '#f8f9fa',
// //   borderBottom: '1px solid #e9ecef',
// //   display: 'grid',
// //   gridTemplateColumns: '2fr 1fr 1fr 1fr',
// //   gap: '1rem',
// //   fontWeight: '600',
// //   color: '#374151',
// //   '@media (max-width: 768px)': {
// //     display: 'none',
// //   },
// // });

// // const CartItem = styled('div')({
// //   padding: '1.5rem',
// //   display: 'grid',
// //   gridTemplateColumns: '2fr 1fr 1fr 1fr',
// //   gap: '1rem',
// //   alignItems: 'center',
// //   borderBottom: '1px solid #f3f4f6',
// //   '&:last-child': {
// //     borderBottom: 'none',
// //   },
// //   '@media (max-width: 768px)': {
// //     gridTemplateColumns: '1fr',
// //     gap: '1rem',
// //     textAlign: 'center',
// //   },
// // });

// // const ItemInfo = styled('div')({
// //   display: 'flex',
// //   alignItems: 'center',
// //   gap: '1rem',
// //   '@media (max-width: 768px)': {
// //     flexDirection: 'column',
// //     textAlign: 'center',
// //   },
// // });

// // const ItemImage = styled('div')({
// //   width: '80px',
// //   height: '80px',
// //   borderRadius: '6px',
// //   overflow: 'hidden',
// //   flexShrink: 0,
// //   '& img': {
// //     width: '100%',
// //     height: '100%',
// //     objectFit: 'cover',
// //   },
// // });

// // const ItemDetails = styled('div')({
// //   '& h3': {
// //     margin: '0 0 0.5rem 0',
// //     fontSize: '1rem',
// //     fontWeight: '500',
// //     color: '#1f2937',
// //   },
// //   '& p': {
// //     margin: 0,
// //     fontSize: '0.9rem',
// //     color: '#6b7280',
// //   },
// // });

// // const ItemPrice = styled('div')({
// //   fontSize: '1rem',
// //   fontWeight: '600',
// //   color: '#1f2937',
// //   display: 'flex',
// //   flexDirection: 'column',
// //   gap: '0.25rem',
// //   '@media (max-width: 768px)': {
// //     '&::before': {
// //       content: '"Price: "',
// //       fontWeight: '500',
// //       color: '#6b7280',
// //     },
// //   },
// // });

// // const TierBadge = styled('span')(({ tier }) => ({
// //   fontSize: '0.75rem',
// //   padding: '0.25rem 0.5rem',
// //   borderRadius: '4px',
// //   backgroundColor: tier === 'wholesale' ? '#10b981' : '#6b7280',
// //   color: 'white',
// //   display: 'flex',
// //   alignItems: 'center',
// //   gap: '0.25rem',
// //   width: 'fit-content',
// // }));

// // const QuantityControl = styled('div')({
// //   display: 'flex',
// //   alignItems: 'center',
// //   border: '1px solid #d1d5db',
// //   borderRadius: '4px',
// //   overflow: 'hidden',
// //   width: 'fit-content',
// //   '@media (max-width: 768px)': {
// //     margin: '0 auto',
// //   },
// // });

// // const QuantityButton = styled('button')({
// //   width: '32px',
// //   height: '32px',
// //   border: 'none',
// //   background: '#f9fafb',
// //   cursor: 'pointer',
// //   display: 'flex',
// //   alignItems: 'center',
// //   justifyContent: 'center',
// //   fontSize: '1.1rem',
// //   '&:hover': {
// //     backgroundColor: '#f3f4f6',
// //   },
// // });

// // const QuantityDisplay = styled('span')({
// //   width: '40px',
// //   textAlign: 'center',
// //   fontWeight: '500',
// // });

// // const ItemSubtotal = styled('div')({
// //   fontSize: '1rem',
// //   fontWeight: '600',
// //   color: '#ef7921',
// //   display: 'flex',
// //   alignItems: 'center',
// //   justifyContent: 'space-between',
// //   '@media (max-width: 768px)': {
// //     '&::before': {
// //       content: '"Subtotal: "',
// //       fontWeight: '500',
// //       color: '#6b7280',
// //     },
// //   },
// // });

// // const DeleteButton = styled(IconButton)({
// //   color: '#9ca3af',
// //   padding: '4px',
// //   '&:hover': {
// //     color: '#ef4444',
// //     backgroundColor: 'rgba(239, 68, 68, 0.1)',
// //   },
// // });

// // const CartSummary = styled('div')({
// //   backgroundColor: '#fff',
// //   borderRadius: '8px',
// //   boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
// //   border: '1px solid #e5e7eb',
// //   padding: '1.5rem',
// //   height: 'fit-content',
// // });

// // const SummaryTitle = styled('h2')({
// //   fontSize: '1.25rem',
// //   fontWeight: '600',
// //   margin: '0 0 1.5rem 0',
// //   color: '#1f2937',
// //   paddingBottom: '1rem',
// //   borderBottom: '1px solid #e5e7eb',
// // });

// // const SummaryRow = styled('div')({
// //   display: 'flex',
// //   justifyContent: 'space-between',
// //   alignItems: 'center',
// //   marginBottom: '1rem',
// //   '& span': {
// //     fontSize: '0.95rem',
// //     color: '#6b7280',
// //   },
// //   '& strong': {
// //     fontSize: '1rem',
// //     color: '#1f2937',
// //   },
// // });

// // const TotalRow = styled('div')({
// //   display: 'flex',
// //   justifyContent: 'space-between',
// //   alignItems: 'center',
// //   margin: '1.5rem 0',
// //   paddingTop: '1rem',
// //   borderTop: '1px solid #e5e7eb',
// //   '& span': {
// //     fontSize: '1.1rem',
// //     fontWeight: '600',
// //     color: '#1f2937',
// //   },
// //   '& strong': {
// //     fontSize: '1.25rem',
// //     color: '#ef7921',
// //   },
// // });

// // const PromoCode = styled('div')({
// //   margin: '1.5rem 0',
// //   '& h3': {
// //     fontSize: '1rem',
// //     fontWeight: '500',
// //     margin: '0 0 0.5rem 0',
// //     color: '#374151',
// //   },
// // });

// // const EmptyCart = styled('div')({
// //   textAlign: 'center',
// //   padding: '3rem 1rem',
// //   color: '#9ca3af',
// //   '& svg': {
// //     marginBottom: '1rem',
// //   },
// //   '& h2': {
// //     fontSize: '1.5rem',
// //     fontWeight: '600',
// //     margin: '0 0 1rem 0',
// //     color: '#6b7280',
// //   },
// //   '& p': {
// //     margin: '0 0 2rem 0',
// //     fontSize: '1rem',
// //   },
// // });

// // const Cart = () => {
// //   const [cartItems, setCartItems] = useState([
// //     {
// //       id: 1,
// //       name: 'Premium Leather Wristwatch',
// //       image: '/src/assets/images/electronics.jpg',
// //       retailPrice: 18,
// //       wholesalePrice: 15,
// //       quantity: 2,
// //       moq: 3,
// //       color: 'Black',
// //       size: 'M',
// //     },
// //     {
// //       id: 2,
// //       name: 'Luxury Handbag',
// //       image: '/src/assets/images/handbag.jpg',
// //       retailPrice: 45,
// //       wholesalePrice: 38,
// //       quantity: 4,
// //       moq: 3,
// //       color: 'Brown',
// //       size: 'One Size',
// //     },
// //     {
// //       id: 3,
// //       name: 'Diamond Jewelry Set',
// //       image: '/src/assets/images/jewelry.jpg',
// //       retailPrice: 32,
// //       wholesalePrice: 28,
// //       quantity: 1,
// //       moq: 2,
// //       color: 'Silver',
// //       size: 'S',
// //     },
// //   ]);

// //   const [promoCode, setPromoCode] = useState('');

// //   const calculateItemPrice = (item) => {
// //     return item.quantity >= item.moq ? item.wholesalePrice : item.retailPrice;
// //   };

// //   const getPricingTier = (item) => {
// //     return item.quantity >= item.moq ? 'wholesale' : 'retail';
// //   };

// //   const calculateSubtotal = () => {
// //     return cartItems.reduce((total, item) => total + (calculateItemPrice(item) * item.quantity), 0);
// //   };

// //   const calculateWholesaleSavings = () => {
// //     return cartItems.reduce((savings, item) => {
// //       if (item.quantity >= item.moq) {
// //         return savings + ((item.retailPrice - item.wholesalePrice) * item.quantity);
// //       }
// //       return savings;
// //     }, 0);
// //   };

// //   const calculateTotal = () => {
// //     const subtotal = calculateSubtotal();
// //     const shipping = subtotal > 0 ? 5 : 0;
// //     const discount = promoCode === 'SAVE10' ? subtotal * 0.1 : 0;
// //     return subtotal + shipping - discount;
// //   };

// //   const handleQuantityChange = (id, newQuantity) => {
// //     if (newQuantity < 1) return;
// //     setCartItems(cartItems.map(item => 
// //       item.id === id ? { ...item, quantity: newQuantity } : item
// //     ));
// //   };

// //   const handleRemoveItem = (id) => {
// //     setCartItems(cartItems.filter(item => item.id !== id));
// //   };

// //   if (cartItems.length === 0) {
// //     return (
// //       <CartContainer>
// //         <PageHeader>
// //           <PageTitle>
// //             <MdOutlineShoppingCart size={28} />
// //             Shopping Cart
// //           </PageTitle>
// //           <ContinueShopping to="/">
// //             <IoArrowBack />
// //             Continue Shopping
// //           </ContinueShopping>
// //         </PageHeader>
        
// //         <EmptyCart>
// //           <svg width="80" height="80" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
// //             <path d="M3 3H5L5.4 5M7 13H17L21 5H5.4M7 13L5.4 5M7 13L4.707 15.293C4.077 15.923 4.523 17 5.414 17H17M17 17C16.4696 17 15.9609 17.2107 15.5858 17.5858C15.2107 17.9609 15 18.4696 15 19C15 19.5304 15.2107 20.0391 15.5858 20.4142C15.9609 20.7893 16.4696 21 17 21C17.5304 21 18.0391 20.7893 18.4142 20.4142C18.7893 20.0391 19 19.5304 19 19C19 18.4696 18.7893 17.9609 18.4142 17.5858C18.0391 17.2107 17.5304 17 17 17ZM9 19C9 19.5304 8.78929 20.0391 8.41421 20.4142C8.03914 20.7893 7.53043 21 7 21C6.46957 21 5.96086 20.7893 5.58579 20.4142C5.21071 20.0391 5 19.5304 5 19C5 18.4696 5.21071 17.9609 5.58579 17.5858C5.96086 17.2107 6.46957 17 7 17C7.53043 17 8.03914 17.2107 8.41421 17.5858C8.78929 17.9609 9 18.4696 9 19Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
// //           </svg>
// //           <h2>Your cart is empty</h2>
// //           <p>Looks like you haven't added any items to your cart yet.</p>
// //           <Button
// //             variant="contained"
// //             component={Link}
// //             to="/"
// //             style={{
// //               backgroundColor: "#ef7921",
// //               color: "white",
// //               fontWeight: "600",
// //               padding: "0.75rem 2rem",
// //             }}
// //           >
// //             Start Shopping
// //           </Button>
// //         </EmptyCart>
// //       </CartContainer>
// //     );
// //   }

// //   return (
// //     <CartContainer>
// //       <PageHeader>
// //         <PageTitle>
// //           <MdOutlineShoppingCart size={28} />
// //           Shopping Cart ({cartItems.length})
// //         </PageTitle>
// //         <ContinueShopping to="/">
// //           <IoArrowBack />
// //           Continue Shopping
// //         </ContinueShopping>
// //       </PageHeader>

// //       <CartContent>
// //         <CartItems>
// //           <CartHeader>
// //             <span>Product</span>
// //             <span>Price</span>
// //             <span>Quantity</span>
// //             <span>Subtotal</span>
// //           </CartHeader>

// //           {cartItems.map((item) => {
// //             const itemPrice = calculateItemPrice(item);
// //             const tier = getPricingTier(item);
// //             const savings = tier === 'wholesale' ? (item.retailPrice - item.wholesalePrice) * item.quantity : 0;

// //             return (
// //               <CartItem key={item.id}>
// //                 <ItemInfo>
// //                   <ItemImage>
// //                     <img src={item.image} alt={item.name} />
// //                   </ItemImage>
// //                   <ItemDetails>
// //                     <h3>{item.name}</h3>
// //                     <p>Color: {item.color} | Size: {item.size}</p>
// //                     {tier === 'wholesale' && (
// //                       <div style={{ fontSize: '0.8rem', color: '#10b981', marginTop: '0.25rem' }}>
// //                         ✓ Wholesale pricing applied
// //                       </div>
// //                     )}
// //                   </ItemDetails>
// //                 </ItemInfo>

// //                 <ItemPrice>
// //                   ${itemPrice.toFixed(2)}
// //                   <TierBadge tier={tier}>
// //                     {tier === 'wholesale' ? <BusinessIcon fontSize="small" /> : <StorefrontIcon fontSize="small" />}
// //                     {tier}
// //                   </TierBadge>
// //                   {tier === 'retail' && item.quantity < item.moq && (
// //                     <span style={{ fontSize: '0.75rem', color: '#6b7280' }}>
// //                       Add {item.moq - item.quantity} more for wholesale
// //                     </span>
// //                   )}
// //                 </ItemPrice>

// //                 <QuantityControl>
// //                   <QuantityButton 
// //                     onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
// //                   >
// //                     -
// //                   </QuantityButton>
// //                   <QuantityDisplay>{item.quantity}</QuantityDisplay>
// //                   <QuantityButton 
// //                     onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
// //                   >
// //                     +
// //                   </QuantityButton>
// //                 </QuantityControl>

// //                 <ItemSubtotal>
// //                   <span>${(itemPrice * item.quantity).toFixed(2)}</span>
// //                   {savings > 0 && (
// //                     <span style={{ fontSize: '0.75rem', color: '#10b981' }}>
// //                       Saved: ${savings.toFixed(2)}
// //                     </span>
// //                   )}
// //                   <DeleteButton 
// //                     size="small" 
// //                     onClick={() => handleRemoveItem(item.id)}
// //                     aria-label="Remove item"
// //                   >
// //                     <MdOutlineDeleteOutline />
// //                   </DeleteButton>
// //                 </ItemSubtotal>
// //               </CartItem>
// //             );
// //           })}
// //         </CartItems>

// //         <CartSummary>
// //           <SummaryTitle>Order Summary</SummaryTitle>

// //           <SummaryRow>
// //             <span>Subtotal</span>
// //             <strong>${calculateSubtotal().toFixed(2)}</strong>
// //           </SummaryRow>

// //           <SummaryRow>
// //             <span>Shipping</span>
// //             <strong>{calculateSubtotal() > 0 ? '$5.00' : 'Free'}</strong>
// //           </SummaryRow>

// //           {calculateWholesaleSavings() > 0 && (
// //             <SummaryRow>
// //               <span>Wholesale Savings</span>
// //               <strong style={{ color: '#10b981' }}>
// //                 -${calculateWholesaleSavings().toFixed(2)}
// //               </strong>
// //             </SummaryRow>
// //           )}

// //           {promoCode === 'SAVE10' && (
// //             <SummaryRow>
// //               <span>Discount (10%)</span>
// //               <strong style={{ color: '#10b981' }}>
// //                 -${(calculateSubtotal() * 0.1).toFixed(2)}
// //               </strong>
// //             </SummaryRow>
// //           )}

// //           <PromoCode>
// //             <h3>Promo Code</h3>
// //             <div style={{ display: 'flex', gap: '0.5rem' }}>
// //               <TextField
// //                 size="small"
// //                 placeholder="Enter code"
// //                 value={promoCode}
// //                 onChange={(e) => setPromoCode(e.target.value)}
// //                 fullWidth
// //               />
// //               <Button 
// //                 variant="outlined"
// //                 style={{ 
// //                   borderColor: '#ef7921',
// //                   color: '#ef7921',
// //                   whiteSpace: 'nowrap',
// //                 }}
// //               >
// //                 Apply
// //               </Button>
// //             </div>
// //             {promoCode === 'SAVE10' && (
// //               <p style={{ color: '#10b981', fontSize: '0.8rem', margin: '0.5rem 0 0 0' }}>
// //                 ✓ 10% discount applied!
// //               </p>
// //             )}
// //           </PromoCode>

// //           <TotalRow>
// //             <span>Total</span>
// //             <strong>${calculateTotal().toFixed(2)}</strong>
// //           </TotalRow>

// //           <Button
// //             variant="contained"
// //             fullWidth
// //             component={Link}
// //             to="/checkout"
// //             style={{
// //               backgroundColor: "#ef7921",
// //               color: "white",
// //               fontWeight: "600",
// //               padding: "0.75rem",
// //               marginBottom: "1rem",
// //             }}
// //           >
// //             Proceed to Checkout
// //           </Button>

// //           <Button
// //             variant="outlined"
// //             fullWidth
// //             startIcon={<FaRegHeart />}
// //             style={{
// //               borderColor: "#d1d5db",
// //               color: "#4b5563",
// //             }}
// //           >
// //             Save for Later
// //           </Button>
// //         </CartSummary>
// //       </CartContent>
// //     </CartContainer>
// //   );
// // };

// // export default Cart;
















































// // import React, { useState } from 'react';
// // import { Link } from 'react-router-dom';
// // import { styled } from '@mui/material/styles';
// // import Button from '@mui/material/Button';
// // import IconButton from '@mui/material/IconButton';
// // import TextField from '@mui/material/TextField';
// // import Divider from '@mui/material/Divider';
// // import { MdOutlineDeleteOutline, MdOutlineShoppingCart } from 'react-icons/md';
// // import { IoArrowBack } from 'react-icons/io5';
// // import { FaRegHeart } from 'react-icons/fa';

// // // Styled components
// // const CartContainer = styled('div')({
// //   maxWidth: '1200px',
// //   margin: '0 auto',
// //   padding: '2rem 1rem',
// //   fontFamily: 'Arial, sans-serif',
// // });

// // const PageHeader = styled('div')({
// //   display: 'flex',
// //   alignItems: 'center',
// //   justifyContent: 'space-between',
// //   marginBottom: '2rem',
// // });

// // const PageTitle = styled('h1')({
// //   fontSize: '2rem',
// //   fontWeight: '600',
// //   color: '#1f2937',
// //   margin: 0,
// //   display: 'flex',
// //   alignItems: 'center',
// //   gap: '0.5rem',
// // });

// // const ContinueShopping = styled(Link)({
// //   display: 'flex',
// //   alignItems: 'center',
// //   gap: '0.5rem',
// //   textDecoration: 'none',
// //   color: '#6b7280',
// //   fontSize: '0.9rem',
// //   fontWeight: '500',
// //   '&:hover': {
// //     color: '#ef7921',
// //   },
// // });

// // const CartContent = styled('div')({
// //   display: 'grid',
// //   gridTemplateColumns: '1fr 350px',
// //   gap: '2rem',
// //   '@media (max-width: 968px)': {
// //     gridTemplateColumns: '1fr',
// //   },
// // });

// // const CartItems = styled('div')({
// //   backgroundColor: '#fff',
// //   borderRadius: '8px',
// //   boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
// //   border: '1px solid #e5e7eb',
// //   overflow: 'hidden',
// // });

// // const CartHeader = styled('div')({
// //   padding: '1rem 1.5rem',
// //   backgroundColor: '#f8f9fa',
// //   borderBottom: '1px solid #e9ecef',
// //   display: 'grid',
// //   gridTemplateColumns: '2fr 1fr 1fr 1fr',
// //   gap: '1rem',
// //   fontWeight: '600',
// //   color: '#374151',
// //   '@media (max-width: 768px)': {
// //     display: 'none',
// //   },
// // });

// // const CartItem = styled('div')({
// //   padding: '1.5rem',
// //   display: 'grid',
// //   gridTemplateColumns: '2fr 1fr 1fr 1fr',
// //   gap: '1rem',
// //   alignItems: 'center',
// //   borderBottom: '1px solid #f3f4f6',
// //   '&:last-child': {
// //     borderBottom: 'none',
// //   },
// //   '@media (max-width: 768px)': {
// //     gridTemplateColumns: '1fr',
// //     gap: '1rem',
// //     textAlign: 'center',
// //   },
// // });

// // const ItemInfo = styled('div')({
// //   display: 'flex',
// //   alignItems: 'center',
// //   gap: '1rem',
// //   '@media (max-width: 768px)': {
// //     flexDirection: 'column',
// //     textAlign: 'center',
// //   },
// // });

// // const ItemImage = styled('div')({
// //   width: '80px',
// //   height: '80px',
// //   borderRadius: '6px',
// //   overflow: 'hidden',
// //   flexShrink: 0,
// //   '& img': {
// //     width: '100%',
// //     height: '100%',
// //     objectFit: 'cover',
// //   },
// // });

// // const ItemDetails = styled('div')({
// //   '& h3': {
// //     margin: '0 0 0.5rem 0',
// //     fontSize: '1rem',
// //     fontWeight: '500',
// //     color: '#1f2937',
// //   },
// //   '& p': {
// //     margin: 0,
// //     fontSize: '0.9rem',
// //     color: '#6b7280',
// //   },
// // });

// // const ItemPrice = styled('div')({
// //   fontSize: '1rem',
// //   fontWeight: '600',
// //   color: '#1f2937',
// //   '@media (max-width: 768px)': {
// //     '&::before': {
// //       content: '"Price: "',
// //       fontWeight: '500',
// //       color: '#6b7280',
// //     },
// //   },
// // });

// // const QuantityControl = styled('div')({
// //   display: 'flex',
// //   alignItems: 'center',
// //   border: '1px solid #d1d5db',
// //   borderRadius: '4px',
// //   overflow: 'hidden',
// //   width: 'fit-content',
// //   '@media (max-width: 768px)': {
// //     margin: '0 auto',
// //   },
// // });

// // const QuantityButton = styled('button')({
// //   width: '32px',
// //   height: '32px',
// //   border: 'none',
// //   background: '#f9fafb',
// //   cursor: 'pointer',
// //   display: 'flex',
// //   alignItems: 'center',
// //   justifyContent: 'center',
// //   fontSize: '1.1rem',
// //   '&:hover': {
// //     backgroundColor: '#f3f4f6',
// //   },
// // });

// // const QuantityDisplay = styled('span')({
// //   width: '40px',
// //   textAlign: 'center',
// //   fontWeight: '500',
// // });

// // const ItemSubtotal = styled('div')({
// //   fontSize: '1rem',
// //   fontWeight: '600',
// //   color: '#ef7921',
// //   display: 'flex',
// //   alignItems: 'center',
// //   justifyContent: 'space-between',
// //   '@media (max-width: 768px)': {
// //     '&::before': {
// //       content: '"Subtotal: "',
// //       fontWeight: '500',
// //       color: '#6b7280',
// //     },
// //   },
// // });

// // const DeleteButton = styled(IconButton)({
// //   color: '#9ca3af',
// //   padding: '4px',
// //   '&:hover': {
// //     color: '#ef4444',
// //     backgroundColor: 'rgba(239, 68, 68, 0.1)',
// //   },
// // });

// // const CartSummary = styled('div')({
// //   backgroundColor: '#fff',
// //   borderRadius: '8px',
// //   boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
// //   border: '1px solid #e5e7eb',
// //   padding: '1.5rem',
// //   height: 'fit-content',
// // });

// // const SummaryTitle = styled('h2')({
// //   fontSize: '1.25rem',
// //   fontWeight: '600',
// //   margin: '0 0 1.5rem 0',
// //   color: '#1f2937',
// //   paddingBottom: '1rem',
// //   borderBottom: '1px solid #e5e7eb',
// // });

// // const SummaryRow = styled('div')({
// //   display: 'flex',
// //   justifyContent: 'space-between',
// //   alignItems: 'center',
// //   marginBottom: '1rem',
// //   '& span': {
// //     fontSize: '0.95rem',
// //     color: '#6b7280',
// //   },
// //   '& strong': {
// //     fontSize: '1rem',
// //     color: '#1f2937',
// //   },
// // });

// // const TotalRow = styled('div')({
// //   display: 'flex',
// //   justifyContent: 'space-between',
// //   alignItems: 'center',
// //   margin: '1.5rem 0',
// //   paddingTop: '1rem',
// //   borderTop: '1px solid #e5e7eb',
// //   '& span': {
// //     fontSize: '1.1rem',
// //     fontWeight: '600',
// //     color: '#1f2937',
// //   },
// //   '& strong': {
// //     fontSize: '1.25rem',
// //     color: '#ef7921',
// //   },
// // });

// // const PromoCode = styled('div')({
// //   margin: '1.5rem 0',
// //   '& h3': {
// //     fontSize: '1rem',
// //     fontWeight: '500',
// //     margin: '0 0 0.5rem 0',
// //     color: '#374151',
// //   },
// // });

// // const EmptyCart = styled('div')({
// //   textAlign: 'center',
// //   padding: '3rem 1rem',
// //   color: '#9ca3af',
// //   '& svg': {
// //     marginBottom: '1rem',
// //   },
// //   '& h2': {
// //     fontSize: '1.5rem',
// //     fontWeight: '600',
// //     margin: '0 0 1rem 0',
// //     color: '#6b7280',
// //   },
// //   '& p': {
// //     margin: '0 0 2rem 0',
// //     fontSize: '1rem',
// //   },
// // });

// // const Cart = () => {
// //   const [cartItems, setCartItems] = useState([
// //     {
// //       id: 1,
// //       name: 'Premium Leather Wristwatch',
// //       image: '/src/assets/images/electronics.jpg',
// //       price: 18,
// //       quantity: 2,
// //       color: 'Black',
// //       size: 'M',
// //     },
// //     {
// //       id: 2,
// //       name: 'Luxury Handbag',
// //       image: '/src/assets/images/handbag.jpg',
// //       price: 45,
// //       quantity: 1,
// //       color: 'Brown',
// //       size: 'One Size',
// //     },
// //     {
// //       id: 3,
// //       name: 'Diamond Jewelry Set',
// //       image: '/src/assets/images/jewelry.jpg',
// //       price: 32,
// //       quantity: 1,
// //       color: 'Silver',
// //       size: 'S',
// //     },
// //   ]);

// //   const [promoCode, setPromoCode] = useState('');

// //   const handleQuantityChange = (id, newQuantity) => {
// //     if (newQuantity < 1) return;
// //     setCartItems(cartItems.map(item => 
// //       item.id === id ? { ...item, quantity: newQuantity } : item
// //     ));
// //   };

// //   const handleRemoveItem = (id) => {
// //     setCartItems(cartItems.filter(item => item.id !== id));
// //   };

// //   const calculateSubtotal = () => {
// //     return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
// //   };

// //   const calculateTotal = () => {
// //     const subtotal = calculateSubtotal();
// //     const shipping = subtotal > 0 ? 5 : 0;
// //     const discount = promoCode === 'SAVE10' ? subtotal * 0.1 : 0;
// //     return subtotal + shipping - discount;
// //   };

// //   if (cartItems.length === 0) {
// //     return (
// //       <CartContainer>
// //         <PageHeader>
// //           <PageTitle>
// //             <MdOutlineShoppingCart size={28} />
// //             Shopping Cart
// //           </PageTitle>
// //           <ContinueShopping to="/">
// //             <IoArrowBack />
// //             Continue Shopping
// //           </ContinueShopping>
// //         </PageHeader>
        
// //         <EmptyCart>
// //           <svg width="80" height="80" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
// //             <path d="M3 3H5L5.4 5M7 13H17L21 5H5.4M7 13L5.4 5M7 13L4.707 15.293C4.077 15.923 4.523 17 5.414 17H17M17 17C16.4696 17 15.9609 17.2107 15.5858 17.5858C15.2107 17.9609 15 18.4696 15 19C15 19.5304 15.2107 20.0391 15.5858 20.4142C15.9609 20.7893 16.4696 21 17 21C17.5304 21 18.0391 20.7893 18.4142 20.4142C18.7893 20.0391 19 19.5304 19 19C19 18.4696 18.7893 17.9609 18.4142 17.5858C18.0391 17.2107 17.5304 17 17 17ZM9 19C9 19.5304 8.78929 20.0391 8.41421 20.4142C8.03914 20.7893 7.53043 21 7 21C6.46957 21 5.96086 20.7893 5.58579 20.4142C5.21071 20.0391 5 19.5304 5 19C5 18.4696 5.21071 17.9609 5.58579 17.5858C5.96086 17.2107 6.46957 17 7 17C7.53043 17 8.03914 17.2107 8.41421 17.5858C8.78929 17.9609 9 18.4696 9 19Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
// //           </svg>
// //           <h2>Your cart is empty</h2>
// //           <p>Looks like you haven't added any items to your cart yet.</p>
// //           <Button
// //             variant="contained"
// //             component={Link}
// //             to="/"
// //             style={{
// //               backgroundColor: "#ef7921",
// //               color: "white",
// //               fontWeight: "600",
// //               padding: "0.75rem 2rem",
// //             }}
// //           >
// //             Start Shopping
// //           </Button>
// //         </EmptyCart>
// //       </CartContainer>
// //     );
// //   }

// //   return (
// //     <CartContainer>
// //       <PageHeader>
// //         <PageTitle>
// //           <MdOutlineShoppingCart size={28} />
// //           Shopping Cart ({cartItems.length})
// //         </PageTitle>
// //         <ContinueShopping to="/">
// //           <IoArrowBack />
// //           Continue Shopping
// //         </ContinueShopping>
// //       </PageHeader>

// //       <CartContent>
// //         <CartItems>
// //           <CartHeader>
// //             <span>Product</span>
// //             <span>Price</span>
// //             <span>Quantity</span>
// //             <span>Subtotal</span>
// //           </CartHeader>

// //           {cartItems.map((item) => (
// //             <CartItem key={item.id}>
// //               <ItemInfo>
// //                 <ItemImage>
// //                   <img src={item.image} alt={item.name} />
// //                 </ItemImage>
// //                 <ItemDetails>
// //                   <h3>{item.name}</h3>
// //                   <p>Color: {item.color} | Size: {item.size}</p>
// //                 </ItemDetails>
// //               </ItemInfo>

// //               <ItemPrice>${item.price.toFixed(2)}</ItemPrice>

// //               <QuantityControl>
// //                 <QuantityButton 
// //                   onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
// //                 >
// //                   -
// //                 </QuantityButton>
// //                 <QuantityDisplay>{item.quantity}</QuantityDisplay>
// //                 <QuantityButton 
// //                   onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
// //                 >
// //                   +
// //                 </QuantityButton>
// //               </QuantityControl>

// //               <ItemSubtotal>
// //                 <span>${(item.price * item.quantity).toFixed(2)}</span>
// //                 <DeleteButton 
// //                   size="small" 
// //                   onClick={() => handleRemoveItem(item.id)}
// //                   aria-label="Remove item"
// //                 >
// //                   <MdOutlineDeleteOutline />
// //                 </DeleteButton>
// //               </ItemSubtotal>
// //             </CartItem>
// //           ))}
// //         </CartItems>

// //         <CartSummary>
// //           <SummaryTitle>Order Summary</SummaryTitle>

// //           <SummaryRow>
// //             <span>Subtotal</span>
// //             <strong>${calculateSubtotal().toFixed(2)}</strong>
// //           </SummaryRow>

// //           <SummaryRow>
// //             <span>Shipping</span>
// //             <strong>{calculateSubtotal() > 0 ? '$5.00' : 'Free'}</strong>
// //           </SummaryRow>

// //           {promoCode === 'SAVE10' && (
// //             <SummaryRow>
// //               <span>Discount (10%)</span>
// //               <strong style={{ color: '#10b981' }}>-${(calculateSubtotal() * 0.1).toFixed(2)}</strong>
// //             </SummaryRow>
// //           )}

// //           <PromoCode>
// //             <h3>Promo Code</h3>
// //             <div style={{ display: 'flex', gap: '0.5rem' }}>
// //               <TextField
// //                 size="small"
// //                 placeholder="Enter code"
// //                 value={promoCode}
// //                 onChange={(e) => setPromoCode(e.target.value)}
// //                 fullWidth
// //               />
// //               <Button 
// //                 variant="outlined"
// //                 style={{ 
// //                   borderColor: '#ef7921',
// //                   color: '#ef7921',
// //                   whiteSpace: 'nowrap',
// //                 }}
// //               >
// //                 Apply
// //               </Button>
// //             </div>
// //             {promoCode === 'SAVE10' && (
// //               <p style={{ color: '#10b981', fontSize: '0.8rem', margin: '0.5rem 0 0 0' }}>
// //                 ✓ 10% discount applied!
// //               </p>
// //             )}
// //           </PromoCode>

// //           <TotalRow>
// //             <span>Total</span>
// //             <strong>${calculateTotal().toFixed(2)}</strong>
// //           </TotalRow>

// //           <Button
// //             variant="contained"
// //             fullWidth
// //             component={Link}
// //             to="/checkout"
// //             style={{
// //               backgroundColor: "#ef7921",
// //               color: "white",
// //               fontWeight: "600",
// //               padding: "0.75rem",
// //               marginBottom: "1rem",
// //             }}
// //           >
// //             Proceed to Checkout
// //           </Button>

// //           <Button
// //             variant="outlined"
// //             fullWidth
// //             startIcon={<FaRegHeart />}
// //             style={{
// //               borderColor: "#d1d5db",
// //               color: "#4b5563",
// //             }}
// //           >
// //             Save for Later
// //           </Button>
// //         </CartSummary>
// //       </CartContent>
// //     </CartContainer>
// //   );
// // };

// // export default Cart;
