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
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
  Checkbox
} from '@mui/material';
import { cartApi } from '../../utils/cartApi';
import { orderApi } from '../../utils/orderApi';
import { addressApi } from '../../utils/addressApi';
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

const AddressCard = styled(Paper)({
  padding: '1rem',
  marginBottom: '1rem',
  border: '1px solid #e5e7eb',
  cursor: 'pointer',
  transition: 'all 0.2s ease',
  '&:hover': {
    borderColor: '#ef7921',
    backgroundColor: '#fef6ee',
  },
  '&.selected': {
    borderColor: '#ef7921',
    backgroundColor: '#fef6ee',
    borderWidth: '2px',
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
  const [addAddressDialog, setAddAddressDialog] = useState(false);
  const [addingAddress, setAddingAddress] = useState(false);

  // Form fields for new address
  const [newAddress, setNewAddress] = useState({
    address_line: '',
    city: '',
    state: '',
    pincode: '',
    country: 'United States',
    mobile: '',
    status: false
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
    try {
      const response = await addressApi.getUserAddresses();
      setAddresses(response.data);
      
      // Set default address as selected
      const defaultAddress = response.data.find(addr => addr.status === true);
      if (defaultAddress) {
        setSelectedAddress(defaultAddress._id);
      } else if (response.data.length > 0) {
        setSelectedAddress(response.data[0]._id);
      }
    } catch (error) {
      console.error('Error fetching addresses:', error);
      toast.error('Failed to load addresses');
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

  const handleAddNewAddress = async () => {
    // Validate new address
    const { address_line, city, state, pincode, country, mobile } = newAddress;
    if (!address_line || !city || !state || !pincode || !country || !mobile) {
      toast.error('Please fill all address fields');
      return;
    }

    try {
      setAddingAddress(true);
      await addressApi.createAddress(newAddress);
      toast.success('Address added successfully!');
      await fetchAddresses(); // Refresh addresses
      setAddAddressDialog(false);
      setNewAddress({
        address_line: '',
        city: '',
        state: '',
        pincode: '',
        country: 'United States',
        mobile: '',
        status: false
      });
    } catch (error) {
      console.error('Error adding address:', error);
      toast.error(error.message || 'Failed to add address');
    } finally {
      setAddingAddress(false);
    }
  };

  const openAddAddressDialog = () => {
    setNewAddress({
      address_line: '',
      city: '',
      state: '',
      pincode: '',
      country: 'United States',
      mobile: '',
      status: addresses.length === 0 // Set as default if no addresses exist
    });
    setAddAddressDialog(true);
  };

  const closeAddAddressDialog = () => {
    setAddAddressDialog(false);
  };

  const handleSetDefaultAddress = async (addressId) => {
    try {
      await addressApi.setDefaultAddress(addressId);
      toast.success('Default address updated successfully');
      await fetchAddresses(); // Refresh addresses
    } catch (error) {
      console.error('Error setting default address:', error);
      toast.error(error.message || 'Failed to set default address');
    }
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
            
            {addresses.length === 0 ? (
              <Box textAlign="center" py={4}>
                <Typography color="textSecondary" mb={2}>
                  No addresses found. Please add a delivery address.
                </Typography>
                <Button 
                  variant="contained" 
                  onClick={openAddAddressDialog}
                  sx={{ backgroundColor: '#ef7921', '&:hover': { backgroundColor: '#e06b15' } }}
                >
                  Add Your First Address
                </Button>
              </Box>
            ) : (
              <>
                <Typography variant="subtitle1" gutterBottom>
                  Select a delivery address:
                </Typography>
                
                {addresses.map((address) => (
                  <AddressCard 
                    key={address._id}
                    className={selectedAddress === address._id ? 'selected' : ''}
                    onClick={() => setSelectedAddress(address._id)}
                  >
                    <Box display="flex" justifyContent="space-between" alignItems="flex-start">
                      <Box flex={1}>
                        <Typography variant="body1" fontWeight="500">
                          {address.address_line}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                          {address.city}, {address.state} {address.pincode}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                          {address.country}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                          {address.mobile}
                        </Typography>
                        {address.status && (
                          <Typography variant="caption" color="primary" fontWeight="500">
                            ✓ Default Address
                          </Typography>
                        )}
                      </Box>
                      {!address.status && (
                        <Button
                          size="small"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleSetDefaultAddress(address._id);
                          }}
                        >
                          Set Default
                        </Button>
                      )}
                    </Box>
                  </AddressCard>
                ))}
                
                <Button
                  variant="outlined"
                  onClick={openAddAddressDialog}
                  sx={{ mt: 2 }}
                >
                  + Add New Address
                </Button>
              </>
            )}
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
              disabled={placingOrder || !selectedAddress || addresses.length === 0}
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

      {/* Add Address Dialog */}
      <Dialog open={addAddressDialog} onClose={closeAddAddressDialog} maxWidth="sm" fullWidth>
        <DialogTitle>Add New Address</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Address Line"
                name="address_line"
                value={newAddress.address_line}
                onChange={(e) => handleNewAddressChange('address_line', e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="City"
                name="city"
                value={newAddress.city}
                onChange={(e) => handleNewAddressChange('city', e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="State/Province"
                name="state"
                value={newAddress.state}
                onChange={(e) => handleNewAddressChange('state', e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="ZIP/Postal Code"
                name="pincode"
                value={newAddress.pincode}
                onChange={(e) => handleNewAddressChange('pincode', e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Country"
                name="country"
                value={newAddress.country}
                onChange={(e) => handleNewAddressChange('country', e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Mobile Number"
                name="mobile"
                value={newAddress.mobile}
                onChange={(e) => handleNewAddressChange('mobile', e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Checkbox
                    name="status"
                    checked={newAddress.status}
                    onChange={(e) => handleNewAddressChange('status', e.target.checked)}
                  />
                }
                label="Set as default shipping address"
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeAddAddressDialog}>Cancel</Button>
          <Button 
            onClick={handleAddNewAddress} 
            variant="contained"
            disabled={addingAddress}
          >
            {addingAddress ? <CircularProgress size={20} /> : 'Save Address'}
          </Button>
        </DialogActions>
      </Dialog>
    </CheckoutContainer>
  );
};

export default Checkout;



























































// // Pages/Checkout.js
// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { styled } from '@mui/material/styles';
// import {
//   Container,
//   Paper,
//   Typography,
//   Button,
//   TextField,
//   FormControl,
//   InputLabel,
//   Select,
//   MenuItem,
//   Radio,
//   RadioGroup,
//   FormControlLabel,
//   FormLabel,
//   Divider,
//   Box,
//   Alert,
//   CircularProgress
// } from '@mui/material';
// import { cartApi } from '../../utils/cartApi';
// import { orderApi } from '../../utils/orderApi';
// import { useAuth } from '../../context/authContext';
// import { toast } from 'react-toastify';

// // Styled Components
// const CheckoutContainer = styled(Container)({
//   padding: '2rem 1rem',
//   maxWidth: '1200px',
// });

// const Section = styled(Paper)({
//   padding: '2rem',
//   marginBottom: '2rem',
// });

// const SectionTitle = styled(Typography)({
//   marginBottom: '1.5rem',
//   fontWeight: '600',
//   color: '#1f2937',
// });

// const OrderSummaryItem = styled('div')({
//   display: 'flex',
//   justifyContent: 'space-between',
//   alignItems: 'center',
//   marginBottom: '1rem',
//   '&:last-child': {
//     marginBottom: 0,
//   },
// });

// const Checkout = () => {
//   const navigate = useNavigate();
//   const { currentUser } = useAuth();
//   const [cartData, setCartData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [placingOrder, setPlacingOrder] = useState(false);
//   const [addresses, setAddresses] = useState([]);
//   const [selectedAddress, setSelectedAddress] = useState('');
//   const [paymentMethod, setPaymentMethod] = useState('cod');
//   const [notes, setNotes] = useState('');

//   // Form fields for new address
//   const [newAddress, setNewAddress] = useState({
//     address_line: '',
//     city: '',
//     state: '',
//     pincode: '',
//     country: 'United States',
//     mobile: ''
//   });

//   useEffect(() => {
//     if (currentUser) {
//       fetchCart();
//       fetchAddresses();
//     } else {
//       setLoading(false);
//       navigate('/login');
//     }
//   }, [currentUser, navigate]);

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

//   const fetchAddresses = async () => {
//     // For now, we'll use mock addresses. You can replace this with your address API
//     const mockAddresses = [
//       {
//         _id: '1',
//         address_line: '123 Main Street',
//         city: 'New York',
//         state: 'NY',
//         pincode: '10001',
//         country: 'United States',
//         mobile: '1234567890'
//       },
//       {
//         _id: '2',
//         address_line: '456 Oak Avenue',
//         city: 'Los Angeles',
//         state: 'CA',
//         pincode: '90210',
//         country: 'United States',
//         mobile: '0987654321'
//       }
//     ];
//     setAddresses(mockAddresses);
//     if (mockAddresses.length > 0) {
//       setSelectedAddress(mockAddresses[0]._id);
//     }
//   };

//   const handlePlaceOrder = async () => {
//     if (!selectedAddress) {
//       toast.error('Please select a delivery address');
//       return;
//     }

//     if (!cartData || cartData.items.length === 0) {
//       toast.error('Your cart is empty');
//       return;
//     }

//     try {
//       setPlacingOrder(true);
      
//       const orderData = {
//         delivery_address: selectedAddress,
//         payment_method: paymentMethod,
//         notes: notes
//       };

//       const response = await orderApi.createOrder(orderData);
      
//       toast.success('Order placed successfully!');
      
//       // Redirect to order confirmation page
//       navigate(`/order-confirmation/${response.data.orderId}`);
      
//     } catch (error) {
//       console.error('Error placing order:', error);
//       toast.error(error.message || 'Failed to place order');
//     } finally {
//       setPlacingOrder(false);
//     }
//   };

//   const handleNewAddressChange = (field, value) => {
//     setNewAddress(prev => ({
//       ...prev,
//       [field]: value
//     }));
//   };

//   const handleAddNewAddress = () => {
//     // Validate new address
//     const { address_line, city, state, pincode, country, mobile } = newAddress;
//     if (!address_line || !city || !state || !pincode || !country || !mobile) {
//       toast.error('Please fill all address fields');
//       return;
//     }

//     const newAddressObj = {
//       _id: `new-${Date.now()}`,
//       ...newAddress
//     };

//     setAddresses(prev => [...prev, newAddressObj]);
//     setSelectedAddress(newAddressObj._id);
//     setNewAddress({
//       address_line: '',
//       city: '',
//       state: '',
//       pincode: '',
//       country: 'United States',
//       mobile: ''
//     });
//   };

//   if (loading) {
//     return (
//       <CheckoutContainer>
//         <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
//           <CircularProgress />
//         </Box>
//       </CheckoutContainer>
//     );
//   }

//   if (!cartData || cartData.items.length === 0) {
//     return (
//       <CheckoutContainer>
//         <Alert severity="info">
//           Your cart is empty. <Button onClick={() => navigate('/')}>Continue Shopping</Button>
//         </Alert>
//       </CheckoutContainer>
//     );
//   }

//   const { items, summary } = cartData;

//   return (
//     <CheckoutContainer>
//       <Typography variant="h4" component="h1" gutterBottom fontWeight="600">
//         Checkout
//       </Typography>

//       <Box display="grid" gridTemplateColumns={{ md: '2fr 1fr' }} gap={4}>
//         {/* Left Column - Forms */}
//         <Box>
//           {/* Delivery Address Section */}
//           <Section>
//             <SectionTitle variant="h5">Delivery Address</SectionTitle>
            
//             {/* Existing Addresses */}
//             <FormControl fullWidth margin="normal">
//               <InputLabel>Select Address</InputLabel>
//               <Select
//                 value={selectedAddress}
//                 onChange={(e) => setSelectedAddress(e.target.value)}
//                 label="Select Address"
//               >
//                 {addresses.map((address) => (
//                   <MenuItem key={address._id} value={address._id}>
//                     {address.address_line}, {address.city}, {address.state} {address.pincode}
//                   </MenuItem>
//                 ))}
//               </Select>
//             </FormControl>

//             {/* Add New Address */}
//             <Typography variant="h6" sx={{ mt: 3, mb: 2 }}>Or Add New Address</Typography>
//             <Box display="grid" gap={2}>
//               <TextField
//                 label="Address Line"
//                 value={newAddress.address_line}
//                 onChange={(e) => handleNewAddressChange('address_line', e.target.value)}
//                 fullWidth
//               />
//               <Box display="grid" gridTemplateColumns="1fr 1fr" gap={2}>
//                 <TextField
//                   label="City"
//                   value={newAddress.city}
//                   onChange={(e) => handleNewAddressChange('city', e.target.value)}
//                 />
//                 <TextField
//                   label="State"
//                   value={newAddress.state}
//                   onChange={(e) => handleNewAddressChange('state', e.target.value)}
//                 />
//               </Box>
//               <Box display="grid" gridTemplateColumns="1fr 1fr" gap={2}>
//                 <TextField
//                   label="Pincode"
//                   value={newAddress.pincode}
//                   onChange={(e) => handleNewAddressChange('pincode', e.target.value)}
//                 />
//                 <TextField
//                   label="Country"
//                   value={newAddress.country}
//                   onChange={(e) => handleNewAddressChange('country', e.target.value)}
//                 />
//               </Box>
//               <TextField
//                 label="Mobile Number"
//                 value={newAddress.mobile}
//                 onChange={(e) => handleNewAddressChange('mobile', e.target.value)}
//                 fullWidth
//               />
//               <Button
//                 variant="outlined"
//                 onClick={handleAddNewAddress}
//                 sx={{ alignSelf: 'start' }}
//               >
//                 Add Address
//               </Button>
//             </Box>
//           </Section>

//           {/* Payment Method Section */}
//           <Section>
//             <SectionTitle variant="h5">Payment Method</SectionTitle>
//             <FormControl component="fieldset">
//               <FormLabel component="legend">Select Payment Method</FormLabel>
//               <RadioGroup
//                 value={paymentMethod}
//                 onChange={(e) => setPaymentMethod(e.target.value)}
//               >
//                 <FormControlLabel
//                   value="cod"
//                   control={<Radio />}
//                   label="Cash on Delivery"
//                 />
//                 <FormControlLabel
//                   value="card"
//                   control={<Radio />}
//                   label="Credit/Debit Card (Coming Soon)"
//                   disabled
//                 />
//                 <FormControlLabel
//                   value="paypal"
//                   control={<Radio />}
//                   label="PayPal (Coming Soon)"
//                   disabled
//                 />
//               </RadioGroup>
//             </FormControl>
//           </Section>

//           {/* Order Notes */}
//           <Section>
//             <SectionTitle variant="h5">Order Notes (Optional)</SectionTitle>
//             <TextField
//               label="Any special instructions for your order?"
//               value={notes}
//               onChange={(e) => setNotes(e.target.value)}
//               fullWidth
//               multiline
//               rows={3}
//               placeholder="e.g., Leave at front door if I'm not home"
//             />
//           </Section>
//         </Box>

//         {/* Right Column - Order Summary */}
//         <Box>
//           <Section>
//             <SectionTitle variant="h5">Order Summary</SectionTitle>
            
//             {/* Order Items */}
//             {items.map((item) => (
//               <OrderSummaryItem key={item._id}>
//                 <Box>
//                   <Typography variant="body1" fontWeight="500">
//                     {item.product.name}
//                   </Typography>
//                   <Typography variant="body2" color="textSecondary">
//                     Qty: {item.quantity} × ${item.itemPrice.toFixed(2)}
//                     {item.pricingTier === 'wholesale' && ' (Wholesale)'}
//                   </Typography>
//                 </Box>
//                 <Typography variant="body1" fontWeight="600">
//                   ${item.subtotal.toFixed(2)}
//                 </Typography>
//               </OrderSummaryItem>
//             ))}

//             <Divider sx={{ my: 2 }} />

//             {/* Order Totals */}
//             <OrderSummaryItem>
//               <Typography>Subtotal</Typography>
//               <Typography>${summary.subtotal.toFixed(2)}</Typography>
//             </OrderSummaryItem>
            
//             <OrderSummaryItem>
//               <Typography>Shipping</Typography>
//               <Typography>
//                 {summary.shipping === 0 ? 'FREE' : `$${summary.shipping.toFixed(2)}`}
//               </Typography>
//             </OrderSummaryItem>

//             {summary.totalSavings > 0 && (
//               <OrderSummaryItem>
//                 <Typography color="success.main">Wholesale Savings</Typography>
//                 <Typography color="success.main">
//                   -${summary.totalSavings.toFixed(2)}
//                 </Typography>
//               </OrderSummaryItem>
//             )}

//             <Divider sx={{ my: 2 }} />

//             <OrderSummaryItem>
//               <Typography variant="h6" fontWeight="600">Total</Typography>
//               <Typography variant="h6" fontWeight="600" color="primary">
//                 ${summary.total.toFixed(2)}
//               </Typography>
//             </OrderSummaryItem>

//             <Button
//               variant="contained"
//               fullWidth
//               size="large"
//               onClick={handlePlaceOrder}
//               disabled={placingOrder || !selectedAddress}
//               sx={{ mt: 3, py: 1.5 }}
//             >
//               {placingOrder ? (
//                 <>
//                   <CircularProgress size={20} sx={{ mr: 1 }} />
//                   Placing Order...
//                 </>
//               ) : (
//                 `Place Order ($${summary.total.toFixed(2)})`
//               )}
//             </Button>

//             <Button
//               variant="outlined"
//               fullWidth
//               onClick={() => navigate('/cart')}
//               sx={{ mt: 1 }}
//             >
//               Back to Cart
//             </Button>
//           </Section>
//         </Box>
//       </Box>
//     </CheckoutContainer>
//   );
// };

// export default Checkout;










































































// // import React, { useState } from 'react';
// // import { useNavigate } from 'react-router-dom';
// // import { styled } from '@mui/material/styles';
// // import Button from '@mui/material/Button';
// // import TextField from '@mui/material/TextField';
// // import FormControlLabel from '@mui/material/FormControlLabel';
// // import Checkbox from '@mui/material/Checkbox';
// // import Radio from '@mui/material/Radio';
// // import RadioGroup from '@mui/material/RadioGroup';
// // import FormControl from '@mui/material/FormControl';
// // import FormLabel from '@mui/material/FormLabel';
// // import Divider from '@mui/material/Divider';
// // import { ToastContainer, toast } from 'react-toastify';
// // import 'react-toastify/dist/ReactToastify.css';
// // import BusinessIcon from '@mui/icons-material/Business';
// // import StorefrontIcon from '@mui/icons-material/Storefront';

// // const CheckoutContainer = styled('div')({
// //   maxWidth: '1200px',
// //   margin: '0 auto',
// //   padding: '2rem 1rem',
// //   fontFamily: 'Arial, sans-serif',
// // });

// // const PageHeader = styled('div')({
// //   marginBottom: '2rem',
// //   '& h1': {
// //     fontSize: '2rem',
// //     fontWeight: '600',
// //     color: '#1f2937',
// //     margin: '0 0 0.5rem 0',
// //   },
// //   '& p': {
// //     color: '#6b7280',
// //     margin: 0,
// //   },
// // });

// // const CheckoutContent = styled('div')({
// //   display: 'grid',
// //   gridTemplateColumns: '1fr 400px',
// //   gap: '2rem',
// //   '@media (max-width: 968px)': {
// //     gridTemplateColumns: '1fr',
// //   },
// // });

// // const CheckoutForm = styled('div')({
// //   backgroundColor: '#fff',
// //   borderRadius: '8px',
// //   boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
// //   border: '1px solid #e5e7eb',
// //   padding: '2rem',
// // });

// // const CheckoutSummary = styled('div')({
// //   backgroundColor: '#fff',
// //   borderRadius: '8px',
// //   boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
// //   border: '1px solid #e5e7eb',
// //   padding: '2rem',
// //   height: 'fit-content',
// //   position: 'sticky',
// //   top: '2rem',
// // });

// // const Section = styled('div')({
// //   marginBottom: '2.5rem',
// //   '&:last-child': {
// //     marginBottom: 0,
// //   },
// // });

// // const SectionTitle = styled('h2')({
// //   fontSize: '1.25rem',
// //   fontWeight: '600',
// //   color: '#1f2937',
// //   margin: '0 0 1.5rem 0',
// //   paddingBottom: '0.75rem',
// //   borderBottom: '1px solid #e5e7eb',
// // });

// // const FormRow = styled('div')({
// //   display: 'grid',
// //   gridTemplateColumns: '1fr 1fr',
// //   gap: '1rem',
// //   marginBottom: '1rem',
// //   '@media (max-width: 768px)': {
// //     gridTemplateColumns: '1fr',
// //   },
// // });

// // const InputField = styled(TextField)({
// //   marginBottom: '1rem',
// //   '& .MuiOutlinedInput-root': {
// //     borderRadius: '6px',
// //   },
// // });

// // const SummaryItem = styled('div')({
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

// // const Total = styled('div')({
// //   display: 'flex',
// //   justifyContent: 'space-between',
// //   alignItems: 'center',
// //   margin: '1.5rem 0',
// //   paddingTop: '1rem',
// //   borderTop: '2px solid #e5e7eb',
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

// // const ProductItem = styled('div')({
// //   display: 'flex',
// //   alignItems: 'center',
// //   gap: '1rem',
// //   marginBottom: '1rem',
// //   paddingBottom: '1rem',
// //   borderBottom: '1px solid #f3f4f6',
// //   '&:last-child': {
// //     marginBottom: 0,
// //     paddingBottom: 0,
// //     borderBottom: 'none',
// //   },
// // });

// // const ProductImage = styled('div')({
// //   width: '60px',
// //   height: '60px',
// //   borderRadius: '6px',
// //   overflow: 'hidden',
// //   flexShrink: 0,
// //   '& img': {
// //     width: '100%',
// //     height: '100%',
// //     objectFit: 'cover',
// //   },
// // });

// // const ProductInfo = styled('div')({
// //   flex: 1,
// //   '& h4': {
// //     margin: '0 0 0.25rem 0',
// //     fontSize: '0.95rem',
// //     fontWeight: '500',
// //     color: '#1f2937',
// //   },
// //   '& p': {
// //     margin: 0,
// //     fontSize: '0.85rem',
// //     color: '#6b7280',
// //   },
// // });

// // const ProductPrice = styled('div')({
// //   fontSize: '1rem',
// //   fontWeight: '600',
// //   color: '#ef7921',
// //   display: 'flex',
// //   flexDirection: 'column',
// //   alignItems: 'flex-end',
// //   gap: '0.25rem',
// // });

// // const TierBadge = styled('span')(({ tier }) => ({
// //   fontSize: '0.7rem',
// //   padding: '0.2rem 0.4rem',
// //   borderRadius: '4px',
// //   backgroundColor: tier === 'wholesale' ? '#10b981' : '#6b7280',
// //   color: 'white',
// // }));

// // const Checkout = () => {
// //   const navigate = useNavigate();
// //   const [isProcessing, setIsProcessing] = useState(false);
// //   const [paymentMethod, setPaymentMethod] = useState('credit-card');
// //   const [saveShipping, setSaveShipping] = useState(true);
// //   const [savePayment, setSavePayment] = useState(true);

// //   const cartItems = [
// //     {
// //       id: 1,
// //       name: 'Premium Leather Wristwatch',
// //       image: '/src/assets/images/electronics.jpg',
// //       retailPrice: 18,
// //       wholesalePrice: 15,
// //       quantity: 4,
// //       moq: 3,
// //       color: 'Black',
// //       pricingTier: 'wholesale',
// //     },
// //     {
// //       id: 2,
// //       name: 'Luxury Handbag',
// //       image: '/src/assets/images/handbag.jpg',
// //       retailPrice: 45,
// //       wholesalePrice: 38,
// //       quantity: 2,
// //       moq: 3,
// //       color: 'Brown',
// //       pricingTier: 'retail',
// //     },
// //   ];

// //   const calculateItemPrice = (item) => {
// //     return item.pricingTier === 'wholesale' ? item.wholesalePrice : item.retailPrice;
// //   };

// //   const calculateSubtotal = () => {
// //     return cartItems.reduce((total, item) => 
// //       total + (calculateItemPrice(item) * item.quantity), 0);
// //   };

// //   const calculateWholesaleSavings = () => {
// //     return cartItems.reduce((savings, item) => {
// //       if (item.pricingTier === 'wholesale') {
// //         return savings + ((item.retailPrice - item.wholesalePrice) * item.quantity);
// //       }
// //       return savings;
// //     }, 0);
// //   };

// //   const shippingAddress = {
// //     firstName: 'John',
// //     lastName: 'Doe',
// //     email: 'john.doe@example.com',
// //     phone: '+1 (555) 123-4567',
// //     address: '123 Main Street',
// //     city: 'New York',
// //     state: 'NY',
// //     zipCode: '10001',
// //     country: 'United States',
// //   };

// //   const calculateTotal = () => {
// //     const subtotal = calculateSubtotal();
// //     const shipping = 5.99;
// //     const tax = subtotal * 0.08;
// //     return subtotal + shipping + tax;
// //   };

// //   const handlePlaceOrder = async () => {
// //     setIsProcessing(true);
// //     await new Promise(resolve => setTimeout(resolve, 2000));
// //     toast.success('Order placed successfully!');
// //     setIsProcessing(false);
// //     setTimeout(() => {
// //       navigate('/order-confirmation');
// //     }, 1500);
// //   };

// //   return (
// //     <CheckoutContainer>
// //       <PageHeader>
// //         <h1>Checkout</h1>
// //         <p>Complete your purchase with secure payment</p>
// //       </PageHeader>

// //       <CheckoutContent>
// //         <CheckoutForm>
// //           <Section>
// //             <SectionTitle>Contact Information</SectionTitle>
// //             <FormRow>
// //               <InputField
// //                 label="First Name"
// //                 variant="outlined"
// //                 fullWidth
// //                 defaultValue={shippingAddress.firstName}
// //               />
// //               <InputField
// //                 label="Last Name"
// //                 variant="outlined"
// //                 fullWidth
// //                 defaultValue={shippingAddress.lastName}
// //               />
// //             </FormRow>
// //             <InputField
// //               label="Email Address"
// //               variant="outlined"
// //               fullWidth
// //               type="email"
// //               defaultValue={shippingAddress.email}
// //             />
// //             <InputField
// //               label="Phone Number"
// //               variant="outlined"
// //               fullWidth
// //               defaultValue={shippingAddress.phone}
// //             />
// //           </Section>

// //           <Section>
// //             <SectionTitle>Shipping Address</SectionTitle>
// //             <InputField
// //               label="Address"
// //               variant="outlined"
// //               fullWidth
// //               defaultValue={shippingAddress.address}
// //             />
// //             <FormRow>
// //               <InputField
// //                 label="City"
// //                 variant="outlined"
// //                 fullWidth
// //                 defaultValue={shippingAddress.city}
// //               />
// //               <InputField
// //                 label="State/Province"
// //                 variant="outlined"
// //                 fullWidth
// //                 defaultValue={shippingAddress.state}
// //               />
// //             </FormRow>
// //             <FormRow>
// //               <InputField
// //                 label="ZIP/Postal Code"
// //                 variant="outlined"
// //                 fullWidth
// //                 defaultValue={shippingAddress.zipCode}
// //               />
// //               <InputField
// //                 label="Country"
// //                 variant="outlined"
// //                 fullWidth
// //                 defaultValue={shippingAddress.country}
// //               />
// //             </FormRow>
// //             <FormControlLabel
// //               control={
// //                 <Checkbox
// //                   checked={saveShipping}
// //                   onChange={(e) => setSaveShipping(e.target.checked)}
// //                   color="primary"
// //                 />
// //               }
// //               label="Save shipping information for next time"
// //             />
// //           </Section>

// //           <Section>
// //             <SectionTitle>Payment Method</SectionTitle>
// //             <FormControl component="fieldset" fullWidth>
// //               <FormLabel component="legend">Select Payment Method</FormLabel>
// //               <RadioGroup
// //                 value={paymentMethod}
// //                 onChange={(e) => setPaymentMethod(e.target.value)}
// //               >
// //                 <FormControlLabel
// //                   value="credit-card"
// //                   control={<Radio />}
// //                   label="Credit/Debit Card"
// //                 />
// //                 <FormControlLabel
// //                   value="paypal"
// //                   control={<Radio />}
// //                   label="PayPal"
// //                 />
// //                 <FormControlLabel
// //                   value="bank-transfer"
// //                   control={<Radio />}
// //                   label="Bank Transfer"
// //                 />
// //               </RadioGroup>
// //             </FormControl>

// //             {paymentMethod === 'credit-card' && (
// //               <>
// //                 <FormRow>
// //                   <InputField
// //                     label="Card Number"
// //                     variant="outlined"
// //                     fullWidth
// //                     placeholder="1234 5678 9012 3456"
// //                   />
// //                   <InputField
// //                     label="Name on Card"
// //                     variant="outlined"
// //                     fullWidth
// //                   />
// //                 </FormRow>
// //                 <FormRow>
// //                   <InputField
// //                     label="Expiration Date"
// //                     variant="outlined"
// //                     fullWidth
// //                     placeholder="MM/YY"
// //                   />
// //                   <InputField
// //                     label="CVV"
// //                     variant="outlined"
// //                     fullWidth
// //                     placeholder="123"
// //                   />
// //                 </FormRow>
// //               </>
// //             )}

// //             <FormControlLabel
// //               control={
// //                 <Checkbox
// //                   checked={savePayment}
// //                   onChange={(e) => setSavePayment(e.target.checked)}
// //                   color="primary"
// //                 />
// //               }
// //               label="Save payment method for future purchases"
// //             />
// //           </Section>
// //         </CheckoutForm>

// //         <CheckoutSummary>
// //           <SectionTitle>Order Summary</SectionTitle>
          
// //           {cartItems.map((item) => {
// //             const itemPrice = calculateItemPrice(item);
// //             const savings = item.pricingTier === 'wholesale' 
// //               ? (item.retailPrice - item.wholesalePrice) * item.quantity 
// //               : 0;

// //             return (
// //               <ProductItem key={item.id}>
// //                 <ProductImage>
// //                   <img src={item.image} alt={item.name} />
// //                 </ProductImage>
// //                 <ProductInfo>
// //                   <h4>{item.name}</h4>
// //                   <p>
// //                     Qty: {item.quantity} • Color: {item.color}
// //                     <TierBadge tier={item.pricingTier}>
// //                       {item.pricingTier}
// //                     </TierBadge>
// //                   </p>
// //                   {item.pricingTier === 'retail' && item.quantity < item.moq && (
// //                     <p style={{ fontSize: '0.75rem', color: '#ef7921', marginTop: '0.25rem' }}>
// //                       Add {item.moq - item.quantity} more for wholesale
// //                     </p>
// //                   )}
// //                 </ProductInfo>
// //                 <ProductPrice>
// //                   ${(itemPrice * item.quantity).toFixed(2)}
// //                   {savings > 0 && (
// //                     <span style={{ fontSize: '0.75rem', color: '#10b981' }}>
// //                       Saved: ${savings.toFixed(2)}
// //                     </span>
// //                   )}
// //                 </ProductPrice>
// //               </ProductItem>
// //             );
// //           })}

// //           <Divider />

// //           <SummaryItem>
// //             <span>Subtotal</span>
// //             <strong>${calculateSubtotal().toFixed(2)}</strong>
// //           </SummaryItem>
          
// //           {calculateWholesaleSavings() > 0 && (
// //             <SummaryItem>
// //               <span>Wholesale Savings</span>
// //               <strong style={{ color: '#10b981' }}>
// //                 -${calculateWholesaleSavings().toFixed(2)}
// //               </strong>
// //             </SummaryItem>
// //           )}

// //           <SummaryItem>
// //             <span>Shipping</span>
// //             <strong>$5.99</strong>
// //           </SummaryItem>
          
// //           <SummaryItem>
// //             <span>Tax</span>
// //             <strong>${(calculateSubtotal() * 0.08).toFixed(2)}</strong>
// //           </SummaryItem>

// //           <Total>
// //             <span>Total</span>
// //             <strong>${calculateTotal().toFixed(2)}</strong>
// //           </Total>

// //           <Button
// //             variant="contained"
// //             fullWidth
// //             onClick={handlePlaceOrder}
// //             disabled={isProcessing}
// //             style={{
// //               backgroundColor: "#ef7921",
// //               color: "white",
// //               fontWeight: "600",
// //               padding: "1rem",
// //               fontSize: "1.1rem",
// //             }}
// //           >
// //             {isProcessing ? 'Processing...' : 'Place Order'}
// //           </Button>

// //           <p style={{ 
// //             fontSize: '0.8rem', 
// //             color: '#6b7280', 
// //             textAlign: 'center', 
// //             marginTop: '1rem' 
// //           }}>
// //             By completing your purchase, you agree to our Terms of Service and Privacy Policy.
// //           </p>
// //         </CheckoutSummary>
// //       </CheckoutContent>

// //       <ToastContainer
// //         position="top-right"
// //         autoClose={3000}
// //         hideProgressBar={false}
// //         newestOnTop={false}
// //         closeOnClick
// //         rtl={false}
// //         pauseOnFocusLoss
// //         draggable
// //         pauseOnHover
// //       />
// //     </CheckoutContainer>
// //   );
// // };

// // export default Checkout;











































// // // import React, { useState } from 'react';
// // // import { useNavigate } from 'react-router-dom';
// // // import { styled } from '@mui/material/styles';
// // // import Button from '@mui/material/Button';
// // // import TextField from '@mui/material/TextField';
// // // import FormControlLabel from '@mui/material/FormControlLabel';
// // // import Checkbox from '@mui/material/Checkbox';
// // // import Radio from '@mui/material/Radio';
// // // import RadioGroup from '@mui/material/RadioGroup';
// // // import FormControl from '@mui/material/FormControl';
// // // import FormLabel from '@mui/material/FormLabel';
// // // import Divider from '@mui/material/Divider';
// // // import { ToastContainer, toast } from 'react-toastify';
// // // import 'react-toastify/dist/ReactToastify.css';

// // // // Styled components
// // // const CheckoutContainer = styled('div')({
// // //   maxWidth: '1200px',
// // //   margin: '0 auto',
// // //   padding: '2rem 1rem',
// // //   fontFamily: 'Arial, sans-serif',
// // // });

// // // const PageHeader = styled('div')({
// // //   marginBottom: '2rem',
// // //   '& h1': {
// // //     fontSize: '2rem',
// // //     fontWeight: '600',
// // //     color: '#1f2937',
// // //     margin: '0 0 0.5rem 0',
// // //   },
// // //   '& p': {
// // //     color: '#6b7280',
// // //     margin: 0,
// // //   },
// // // });

// // // const CheckoutContent = styled('div')({
// // //   display: 'grid',
// // //   gridTemplateColumns: '1fr 400px',
// // //   gap: '2rem',
// // //   '@media (max-width: 968px)': {
// // //     gridTemplateColumns: '1fr',
// // //   },
// // // });

// // // const CheckoutForm = styled('div')({
// // //   backgroundColor: '#fff',
// // //   borderRadius: '8px',
// // //   boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
// // //   border: '1px solid #e5e7eb',
// // //   padding: '2rem',
// // // });

// // // const CheckoutSummary = styled('div')({
// // //   backgroundColor: '#fff',
// // //   borderRadius: '8px',
// // //   boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
// // //   border: '1px solid #e5e7eb',
// // //   padding: '2rem',
// // //   height: 'fit-content',
// // //   position: 'sticky',
// // //   top: '2rem',
// // // });

// // // const Section = styled('div')({
// // //   marginBottom: '2.5rem',
// // //   '&:last-child': {
// // //     marginBottom: 0,
// // //   },
// // // });

// // // const SectionTitle = styled('h2')({
// // //   fontSize: '1.25rem',
// // //   fontWeight: '600',
// // //   color: '#1f2937',
// // //   margin: '0 0 1.5rem 0',
// // //   paddingBottom: '0.75rem',
// // //   borderBottom: '1px solid #e5e7eb',
// // // });

// // // const FormRow = styled('div')({
// // //   display: 'grid',
// // //   gridTemplateColumns: '1fr 1fr',
// // //   gap: '1rem',
// // //   marginBottom: '1rem',
// // //   '@media (max-width: 768px)': {
// // //     gridTemplateColumns: '1fr',
// // //   },
// // // });

// // // const InputField = styled(TextField)({
// // //   marginBottom: '1rem',
// // //   '& .MuiOutlinedInput-root': {
// // //     borderRadius: '6px',
// // //   },
// // // });

// // // const SummaryItem = styled('div')({
// // //   display: 'flex',
// // //   justifyContent: 'space-between',
// // //   alignItems: 'center',
// // //   marginBottom: '1rem',
// // //   '& span': {
// // //     fontSize: '0.95rem',
// // //     color: '#6b7280',
// // //   },
// // //   '& strong': {
// // //     fontSize: '1rem',
// // //     color: '#1f2937',
// // //   },
// // // });

// // // const Total = styled('div')({
// // //   display: 'flex',
// // //   justifyContent: 'space-between',
// // //   alignItems: 'center',
// // //   margin: '1.5rem 0',
// // //   paddingTop: '1rem',
// // //   borderTop: '2px solid #e5e7eb',
// // //   '& span': {
// // //     fontSize: '1.1rem',
// // //     fontWeight: '600',
// // //     color: '#1f2937',
// // //   },
// // //   '& strong': {
// // //     fontSize: '1.25rem',
// // //     color: '#ef7921',
// // //   },
// // // });

// // // const ProductItem = styled('div')({
// // //   display: 'flex',
// // //   alignItems: 'center',
// // //   gap: '1rem',
// // //   marginBottom: '1rem',
// // //   paddingBottom: '1rem',
// // //   borderBottom: '1px solid #f3f4f6',
// // //   '&:last-child': {
// // //     marginBottom: 0,
// // //     paddingBottom: 0,
// // //     borderBottom: 'none',
// // //   },
// // // });

// // // const ProductImage = styled('div')({
// // //   width: '60px',
// // //   height: '60px',
// // //   borderRadius: '6px',
// // //   overflow: 'hidden',
// // //   flexShrink: 0,
// // //   '& img': {
// // //     width: '100%',
// // //     height: '100%',
// // //     objectFit: 'cover',
// // //   },
// // // });

// // // const ProductInfo = styled('div')({
// // //   flex: 1,
// // //   '& h4': {
// // //     margin: '0 0 0.25rem 0',
// // //     fontSize: '0.95rem',
// // //     fontWeight: '500',
// // //     color: '#1f2937',
// // //   },
// // //   '& p': {
// // //     margin: 0,
// // //     fontSize: '0.85rem',
// // //     color: '#6b7280',
// // //   },
// // // });

// // // const ProductPrice = styled('div')({
// // //   fontSize: '1rem',
// // //   fontWeight: '600',
// // //   color: '#ef7921',
// // // });

// // // const Checkout = () => {
// // //   const navigate = useNavigate();
// // //   const [isProcessing, setIsProcessing] = useState(false);
// // //   const [paymentMethod, setPaymentMethod] = useState('credit-card');
// // //   const [saveShipping, setSaveShipping] = useState(true);
// // //   const [savePayment, setSavePayment] = useState(true);

// // //   const cartItems = [
// // //     {
// // //       id: 1,
// // //       name: 'Premium Leather Wristwatch',
// // //       image: '/src/assets/images/electronics.jpg',
// // //       price: 18,
// // //       quantity: 2,
// // //       color: 'Black',
// // //     },
// // //     {
// // //       id: 2,
// // //       name: 'Luxury Handbag',
// // //       image: '/src/assets/images/handbag.jpg',
// // //       price: 45,
// // //       quantity: 1,
// // //       color: 'Brown',
// // //     },
// // //   ];

// // //   const shippingAddress = {
// // //     firstName: 'John',
// // //     lastName: 'Doe',
// // //     email: 'john.doe@example.com',
// // //     phone: '+1 (555) 123-4567',
// // //     address: '123 Main Street',
// // //     city: 'New York',
// // //     state: 'NY',
// // //     zipCode: '10001',
// // //     country: 'United States',
// // //   };

// // //   const calculateSubtotal = () => {
// // //     return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
// // //   };

// // //   const calculateTotal = () => {
// // //     const subtotal = calculateSubtotal();
// // //     const shipping = 5.99;
// // //     const tax = subtotal * 0.08; // 8% tax
// // //     return subtotal + shipping + tax;
// // //   };

// // //   const handlePlaceOrder = async () => {
// // //     setIsProcessing(true);
    
// // //     // Simulate API call
// // //     await new Promise(resolve => setTimeout(resolve, 2000));
    
// // //     toast.success('Order placed successfully!');
// // //     setIsProcessing(false);
    
// // //     // Redirect to order confirmation page
// // //     setTimeout(() => {
// // //       navigate('/order-confirmation');
// // //     }, 1500);
// // //   };

// // //   return (
// // //     <CheckoutContainer>
// // //       <PageHeader>
// // //         <h1>Checkout</h1>
// // //         <p>Complete your purchase with secure payment</p>
// // //       </PageHeader>

// // //       <CheckoutContent>
// // //         {/* Left Column - Checkout Form */}
// // //         <CheckoutForm>
// // //           {/* Contact Information */}
// // //           <Section>
// // //             <SectionTitle>Contact Information</SectionTitle>
// // //             <FormRow>
// // //               <InputField
// // //                 label="First Name"
// // //                 variant="outlined"
// // //                 fullWidth
// // //                 defaultValue={shippingAddress.firstName}
// // //               />
// // //               <InputField
// // //                 label="Last Name"
// // //                 variant="outlined"
// // //                 fullWidth
// // //                 defaultValue={shippingAddress.lastName}
// // //               />
// // //             </FormRow>
// // //             <InputField
// // //               label="Email Address"
// // //               variant="outlined"
// // //               fullWidth
// // //               type="email"
// // //               defaultValue={shippingAddress.email}
// // //             />
// // //             <InputField
// // //               label="Phone Number"
// // //               variant="outlined"
// // //               fullWidth
// // //               defaultValue={shippingAddress.phone}
// // //             />
// // //           </Section>

// // //           {/* Shipping Address */}
// // //           <Section>
// // //             <SectionTitle>Shipping Address</SectionTitle>
// // //             <InputField
// // //               label="Address"
// // //               variant="outlined"
// // //               fullWidth
// // //               defaultValue={shippingAddress.address}
// // //             />
// // //             <FormRow>
// // //               <InputField
// // //                 label="City"
// // //                 variant="outlined"
// // //                 fullWidth
// // //                 defaultValue={shippingAddress.city}
// // //               />
// // //               <InputField
// // //                 label="State/Province"
// // //                 variant="outlined"
// // //                 fullWidth
// // //                 defaultValue={shippingAddress.state}
// // //               />
// // //             </FormRow>
// // //             <FormRow>
// // //               <InputField
// // //                 label="ZIP/Postal Code"
// // //                 variant="outlined"
// // //                 fullWidth
// // //                 defaultValue={shippingAddress.zipCode}
// // //               />
// // //               <InputField
// // //                 label="Country"
// // //                 variant="outlined"
// // //                 fullWidth
// // //                 defaultValue={shippingAddress.country}
// // //               />
// // //             </FormRow>
// // //             <FormControlLabel
// // //               control={
// // //                 <Checkbox
// // //                   checked={saveShipping}
// // //                   onChange={(e) => setSaveShipping(e.target.checked)}
// // //                   color="primary"
// // //                 />
// // //               }
// // //               label="Save shipping information for next time"
// // //             />
// // //           </Section>

// // //           {/* Payment Method */}
// // //           <Section>
// // //             <SectionTitle>Payment Method</SectionTitle>
// // //             <FormControl component="fieldset" fullWidth>
// // //               <FormLabel component="legend">Select Payment Method</FormLabel>
// // //               <RadioGroup
// // //                 value={paymentMethod}
// // //                 onChange={(e) => setPaymentMethod(e.target.value)}
// // //               >
// // //                 <FormControlLabel
// // //                   value="credit-card"
// // //                   control={<Radio />}
// // //                   label="Credit/Debit Card"
// // //                 />
// // //                 <FormControlLabel
// // //                   value="paypal"
// // //                   control={<Radio />}
// // //                   label="PayPal"
// // //                 />
// // //                 <FormControlLabel
// // //                   value="bank-transfer"
// // //                   control={<Radio />}
// // //                   label="Bank Transfer"
// // //                 />
// // //               </RadioGroup>
// // //             </FormControl>

// // //             {paymentMethod === 'credit-card' && (
// // //               <>
// // //                 <FormRow>
// // //                   <InputField
// // //                     label="Card Number"
// // //                     variant="outlined"
// // //                     fullWidth
// // //                     placeholder="1234 5678 9012 3456"
// // //                   />
// // //                   <InputField
// // //                     label="Name on Card"
// // //                     variant="outlined"
// // //                     fullWidth
// // //                   />
// // //                 </FormRow>
// // //                 <FormRow>
// // //                   <InputField
// // //                     label="Expiration Date"
// // //                     variant="outlined"
// // //                     fullWidth
// // //                     placeholder="MM/YY"
// // //                   />
// // //                   <InputField
// // //                     label="CVV"
// // //                     variant="outlined"
// // //                     fullWidth
// // //                     placeholder="123"
// // //                   />
// // //                 </FormRow>
// // //               </>
// // //             )}

// // //             <FormControlLabel
// // //               control={
// // //                 <Checkbox
// // //                   checked={savePayment}
// // //                   onChange={(e) => setSavePayment(e.target.checked)}
// // //                   color="primary"
// // //                 />
// // //               }
// // //               label="Save payment method for future purchases"
// // //             />
// // //           </Section>
// // //         </CheckoutForm>

// // //         {/* Right Column - Order Summary */}
// // //         <CheckoutSummary>
// // //           <SectionTitle>Order Summary</SectionTitle>
          
// // //           {/* Products */}
// // //           {cartItems.map((item) => (
// // //             <ProductItem key={item.id}>
// // //               <ProductImage>
// // //                 <img src={item.image} alt={item.name} />
// // //               </ProductImage>
// // //               <ProductInfo>
// // //                 <h4>{item.name}</h4>
// // //                 <p>Qty: {item.quantity} • Color: {item.color}</p>
// // //               </ProductInfo>
// // //               <ProductPrice>${(item.price * item.quantity).toFixed(2)}</ProductPrice>
// // //             </ProductItem>
// // //           ))}

// // //           <Divider />

// // //           {/* Pricing Breakdown */}
// // //           <SummaryItem>
// // //             <span>Subtotal</span>
// // //             <strong>${calculateSubtotal().toFixed(2)}</strong>
// // //           </SummaryItem>
// // //           <SummaryItem>
// // //             <span>Shipping</span>
// // //             <strong>$5.99</strong>
// // //           </SummaryItem>
// // //           <SummaryItem>
// // //             <span>Tax</span>
// // //             <strong>${(calculateSubtotal() * 0.08).toFixed(2)}</strong>
// // //           </SummaryItem>

// // //           <Total>
// // //             <span>Total</span>
// // //             <strong>${calculateTotal().toFixed(2)}</strong>
// // //           </Total>

// // //           <Button
// // //             variant="contained"
// // //             fullWidth
// // //             onClick={handlePlaceOrder}
// // //             disabled={isProcessing}
// // //             style={{
// // //               backgroundColor: "#ef7921",
// // //               color: "white",
// // //               fontWeight: "600",
// // //               padding: "1rem",
// // //               fontSize: "1.1rem",
// // //             }}
// // //           >
// // //             {isProcessing ? 'Processing...' : 'Place Order'}
// // //           </Button>

// // //           <p style={{ 
// // //             fontSize: '0.8rem', 
// // //             color: '#6b7280', 
// // //             textAlign: 'center', 
// // //             marginTop: '1rem' 
// // //           }}>
// // //             By completing your purchase, you agree to our Terms of Service and Privacy Policy.
// // //           </p>
// // //         </CheckoutSummary>
// // //       </CheckoutContent>

// // //       <ToastContainer
// // //         position="top-right"
// // //         autoClose={3000}
// // //         hideProgressBar={false}
// // //         newestOnTop={false}
// // //         closeOnClick
// // //         rtl={false}
// // //         pauseOnFocusLoss
// // //         draggable
// // //         pauseOnHover
// // //       />
// // //     </CheckoutContainer>
// // //   );
// // // };

// // // export default Checkout;