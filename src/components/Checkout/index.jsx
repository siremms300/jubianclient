// Pages/Checkout.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import {
  Container,
  Paper,
  Typography,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormLabel,
  Divider,
  Box,
  Alert,
  CircularProgress
} from '@mui/material';
import { cartApi } from '../../utils/cartApi';
import { orderApi } from '../../utils/orderApi';
import { useAuth } from '../../context/authContext';
import { toast } from 'react-toastify';

// Styled Components
const CheckoutContainer = styled(Container)({
  padding: '2rem 1rem',
  maxWidth: '1200px',
});

const Section = styled(Paper)({
  padding: '2rem',
  marginBottom: '2rem',
});

const SectionTitle = styled(Typography)({
  marginBottom: '1.5rem',
  fontWeight: '600',
  color: '#1f2937',
});

const OrderSummaryItem = styled('div')({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: '1rem',
  '&:last-child': {
    marginBottom: 0,
  },
});

const Checkout = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [cartData, setCartData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [placingOrder, setPlacingOrder] = useState(false);
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('cod');
  const [notes, setNotes] = useState('');

  // Form fields for new address
  const [newAddress, setNewAddress] = useState({
    address_line: '',
    city: '',
    state: '',
    pincode: '',
    country: 'United States',
    mobile: ''
  });

  useEffect(() => {
    if (currentUser) {
      fetchCart();
      fetchAddresses();
    } else {
      setLoading(false);
      navigate('/login');
    }
  }, [currentUser, navigate]);

  const fetchCart = async () => {
    try {
      setLoading(true);
      const response = await cartApi.getCart();
      setCartData(response.data);
    } catch (error) {
      console.error('Error fetching cart:', error);
      toast.error('Failed to load cart');
    } finally {
      setLoading(false);
    }
  };

  const fetchAddresses = async () => {
    // For now, we'll use mock addresses. You can replace this with your address API
    const mockAddresses = [
      {
        _id: '1',
        address_line: '123 Main Street',
        city: 'New York',
        state: 'NY',
        pincode: '10001',
        country: 'United States',
        mobile: '1234567890'
      },
      {
        _id: '2',
        address_line: '456 Oak Avenue',
        city: 'Los Angeles',
        state: 'CA',
        pincode: '90210',
        country: 'United States',
        mobile: '0987654321'
      }
    ];
    setAddresses(mockAddresses);
    if (mockAddresses.length > 0) {
      setSelectedAddress(mockAddresses[0]._id);
    }
  };

  const handlePlaceOrder = async () => {
    if (!selectedAddress) {
      toast.error('Please select a delivery address');
      return;
    }

    if (!cartData || cartData.items.length === 0) {
      toast.error('Your cart is empty');
      return;
    }

    try {
      setPlacingOrder(true);
      
      const orderData = {
        delivery_address: selectedAddress,
        payment_method: paymentMethod,
        notes: notes
      };

      const response = await orderApi.createOrder(orderData);
      
      toast.success('Order placed successfully!');
      
      // Redirect to order confirmation page
      navigate(`/order-confirmation/${response.data.orderId}`);
      
    } catch (error) {
      console.error('Error placing order:', error);
      toast.error(error.message || 'Failed to place order');
    } finally {
      setPlacingOrder(false);
    }
  };

  const handleNewAddressChange = (field, value) => {
    setNewAddress(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleAddNewAddress = () => {
    // Validate new address
    const { address_line, city, state, pincode, country, mobile } = newAddress;
    if (!address_line || !city || !state || !pincode || !country || !mobile) {
      toast.error('Please fill all address fields');
      return;
    }

    const newAddressObj = {
      _id: `new-${Date.now()}`,
      ...newAddress
    };

    setAddresses(prev => [...prev, newAddressObj]);
    setSelectedAddress(newAddressObj._id);
    setNewAddress({
      address_line: '',
      city: '',
      state: '',
      pincode: '',
      country: 'United States',
      mobile: ''
    });
  };

  if (loading) {
    return (
      <CheckoutContainer>
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
          <CircularProgress />
        </Box>
      </CheckoutContainer>
    );
  }

  if (!cartData || cartData.items.length === 0) {
    return (
      <CheckoutContainer>
        <Alert severity="info">
          Your cart is empty. <Button onClick={() => navigate('/')}>Continue Shopping</Button>
        </Alert>
      </CheckoutContainer>
    );
  }

  const { items, summary } = cartData;

  return (
    <CheckoutContainer>
      <Typography variant="h4" component="h1" gutterBottom fontWeight="600">
        Checkout
      </Typography>

      <Box display="grid" gridTemplateColumns={{ md: '2fr 1fr' }} gap={4}>
        {/* Left Column - Forms */}
        <Box>
          {/* Delivery Address Section */}
          <Section>
            <SectionTitle variant="h5">Delivery Address</SectionTitle>
            
            {/* Existing Addresses */}
            <FormControl fullWidth margin="normal">
              <InputLabel>Select Address</InputLabel>
              <Select
                value={selectedAddress}
                onChange={(e) => setSelectedAddress(e.target.value)}
                label="Select Address"
              >
                {addresses.map((address) => (
                  <MenuItem key={address._id} value={address._id}>
                    {address.address_line}, {address.city}, {address.state} {address.pincode}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {/* Add New Address */}
            <Typography variant="h6" sx={{ mt: 3, mb: 2 }}>Or Add New Address</Typography>
            <Box display="grid" gap={2}>
              <TextField
                label="Address Line"
                value={newAddress.address_line}
                onChange={(e) => handleNewAddressChange('address_line', e.target.value)}
                fullWidth
              />
              <Box display="grid" gridTemplateColumns="1fr 1fr" gap={2}>
                <TextField
                  label="City"
                  value={newAddress.city}
                  onChange={(e) => handleNewAddressChange('city', e.target.value)}
                />
                <TextField
                  label="State"
                  value={newAddress.state}
                  onChange={(e) => handleNewAddressChange('state', e.target.value)}
                />
              </Box>
              <Box display="grid" gridTemplateColumns="1fr 1fr" gap={2}>
                <TextField
                  label="Pincode"
                  value={newAddress.pincode}
                  onChange={(e) => handleNewAddressChange('pincode', e.target.value)}
                />
                <TextField
                  label="Country"
                  value={newAddress.country}
                  onChange={(e) => handleNewAddressChange('country', e.target.value)}
                />
              </Box>
              <TextField
                label="Mobile Number"
                value={newAddress.mobile}
                onChange={(e) => handleNewAddressChange('mobile', e.target.value)}
                fullWidth
              />
              <Button
                variant="outlined"
                onClick={handleAddNewAddress}
                sx={{ alignSelf: 'start' }}
              >
                Add Address
              </Button>
            </Box>
          </Section>

          {/* Payment Method Section */}
          <Section>
            <SectionTitle variant="h5">Payment Method</SectionTitle>
            <FormControl component="fieldset">
              <FormLabel component="legend">Select Payment Method</FormLabel>
              <RadioGroup
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
              >
                <FormControlLabel
                  value="cod"
                  control={<Radio />}
                  label="Cash on Delivery"
                />
                <FormControlLabel
                  value="card"
                  control={<Radio />}
                  label="Credit/Debit Card (Coming Soon)"
                  disabled
                />
                <FormControlLabel
                  value="paypal"
                  control={<Radio />}
                  label="PayPal (Coming Soon)"
                  disabled
                />
              </RadioGroup>
            </FormControl>
          </Section>

          {/* Order Notes */}
          <Section>
            <SectionTitle variant="h5">Order Notes (Optional)</SectionTitle>
            <TextField
              label="Any special instructions for your order?"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              fullWidth
              multiline
              rows={3}
              placeholder="e.g., Leave at front door if I'm not home"
            />
          </Section>
        </Box>

        {/* Right Column - Order Summary */}
        <Box>
          <Section>
            <SectionTitle variant="h5">Order Summary</SectionTitle>
            
            {/* Order Items */}
            {items.map((item) => (
              <OrderSummaryItem key={item._id}>
                <Box>
                  <Typography variant="body1" fontWeight="500">
                    {item.product.name}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Qty: {item.quantity} × ${item.itemPrice.toFixed(2)}
                    {item.pricingTier === 'wholesale' && ' (Wholesale)'}
                  </Typography>
                </Box>
                <Typography variant="body1" fontWeight="600">
                  ${item.subtotal.toFixed(2)}
                </Typography>
              </OrderSummaryItem>
            ))}

            <Divider sx={{ my: 2 }} />

            {/* Order Totals */}
            <OrderSummaryItem>
              <Typography>Subtotal</Typography>
              <Typography>${summary.subtotal.toFixed(2)}</Typography>
            </OrderSummaryItem>
            
            <OrderSummaryItem>
              <Typography>Shipping</Typography>
              <Typography>
                {summary.shipping === 0 ? 'FREE' : `$${summary.shipping.toFixed(2)}`}
              </Typography>
            </OrderSummaryItem>

            {summary.totalSavings > 0 && (
              <OrderSummaryItem>
                <Typography color="success.main">Wholesale Savings</Typography>
                <Typography color="success.main">
                  -${summary.totalSavings.toFixed(2)}
                </Typography>
              </OrderSummaryItem>
            )}

            <Divider sx={{ my: 2 }} />

            <OrderSummaryItem>
              <Typography variant="h6" fontWeight="600">Total</Typography>
              <Typography variant="h6" fontWeight="600" color="primary">
                ${summary.total.toFixed(2)}
              </Typography>
            </OrderSummaryItem>

            <Button
              variant="contained"
              fullWidth
              size="large"
              onClick={handlePlaceOrder}
              disabled={placingOrder || !selectedAddress}
              sx={{ mt: 3, py: 1.5 }}
            >
              {placingOrder ? (
                <>
                  <CircularProgress size={20} sx={{ mr: 1 }} />
                  Placing Order...
                </>
              ) : (
                `Place Order ($${summary.total.toFixed(2)})`
              )}
            </Button>

            <Button
              variant="outlined"
              fullWidth
              onClick={() => navigate('/cart')}
              sx={{ mt: 1 }}
            >
              Back to Cart
            </Button>
          </Section>
        </Box>
      </Box>
    </CheckoutContainer>
  );
};

export default Checkout;