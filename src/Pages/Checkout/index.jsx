import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Divider from '@mui/material/Divider';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Styled components
const CheckoutContainer = styled('div')({
  maxWidth: '1200px',
  margin: '0 auto',
  padding: '2rem 1rem',
  fontFamily: 'Arial, sans-serif',
});

const PageHeader = styled('div')({
  marginBottom: '2rem',
  '& h1': {
    fontSize: '2rem',
    fontWeight: '600',
    color: '#1f2937',
    margin: '0 0 0.5rem 0',
  },
  '& p': {
    color: '#6b7280',
    margin: 0,
  },
});

const CheckoutContent = styled('div')({
  display: 'grid',
  gridTemplateColumns: '1fr 400px',
  gap: '2rem',
  '@media (max-width: 968px)': {
    gridTemplateColumns: '1fr',
  },
});

const CheckoutForm = styled('div')({
  backgroundColor: '#fff',
  borderRadius: '8px',
  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
  border: '1px solid #e5e7eb',
  padding: '2rem',
});

const CheckoutSummary = styled('div')({
  backgroundColor: '#fff',
  borderRadius: '8px',
  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
  border: '1px solid #e5e7eb',
  padding: '2rem',
  height: 'fit-content',
  position: 'sticky',
  top: '2rem',
});

const Section = styled('div')({
  marginBottom: '2.5rem',
  '&:last-child': {
    marginBottom: 0,
  },
});

const SectionTitle = styled('h2')({
  fontSize: '1.25rem',
  fontWeight: '600',
  color: '#1f2937',
  margin: '0 0 1.5rem 0',
  paddingBottom: '0.75rem',
  borderBottom: '1px solid #e5e7eb',
});

const FormRow = styled('div')({
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: '1rem',
  marginBottom: '1rem',
  '@media (max-width: 768px)': {
    gridTemplateColumns: '1fr',
  },
});

const InputField = styled(TextField)({
  marginBottom: '1rem',
  '& .MuiOutlinedInput-root': {
    borderRadius: '6px',
  },
});

const SummaryItem = styled('div')({
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

const Total = styled('div')({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  margin: '1.5rem 0',
  paddingTop: '1rem',
  borderTop: '2px solid #e5e7eb',
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

const ProductItem = styled('div')({
  display: 'flex',
  alignItems: 'center',
  gap: '1rem',
  marginBottom: '1rem',
  paddingBottom: '1rem',
  borderBottom: '1px solid #f3f4f6',
  '&:last-child': {
    marginBottom: 0,
    paddingBottom: 0,
    borderBottom: 'none',
  },
});

const ProductImage = styled('div')({
  width: '60px',
  height: '60px',
  borderRadius: '6px',
  overflow: 'hidden',
  flexShrink: 0,
  '& img': {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
});

const ProductInfo = styled('div')({
  flex: 1,
  '& h4': {
    margin: '0 0 0.25rem 0',
    fontSize: '0.95rem',
    fontWeight: '500',
    color: '#1f2937',
  },
  '& p': {
    margin: 0,
    fontSize: '0.85rem',
    color: '#6b7280',
  },
});

const ProductPrice = styled('div')({
  fontSize: '1rem',
  fontWeight: '600',
  color: '#ef7921',
});

const Checkout = () => {
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('credit-card');
  const [saveShipping, setSaveShipping] = useState(true);
  const [savePayment, setSavePayment] = useState(true);

  const cartItems = [
    {
      id: 1,
      name: 'Premium Leather Wristwatch',
      image: '/src/assets/images/electronics.jpg',
      price: 18,
      quantity: 2,
      color: 'Black',
    },
    {
      id: 2,
      name: 'Luxury Handbag',
      image: '/src/assets/images/handbag.jpg',
      price: 45,
      quantity: 1,
      color: 'Brown',
    },
  ];

  const shippingAddress = {
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    address: '123 Main Street',
    city: 'New York',
    state: 'NY',
    zipCode: '10001',
    country: 'United States',
  };

  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const calculateTotal = () => {
    const subtotal = calculateSubtotal();
    const shipping = 5.99;
    const tax = subtotal * 0.08; // 8% tax
    return subtotal + shipping + tax;
  };

  const handlePlaceOrder = async () => {
    setIsProcessing(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    toast.success('Order placed successfully!');
    setIsProcessing(false);
    
    // Redirect to order confirmation page
    setTimeout(() => {
      navigate('/order-confirmation');
    }, 1500);
  };

  return (
    <CheckoutContainer>
      <PageHeader>
        <h1>Checkout</h1>
        <p>Complete your purchase with secure payment</p>
      </PageHeader>

      <CheckoutContent>
        {/* Left Column - Checkout Form */}
        <CheckoutForm>
          {/* Contact Information */}
          <Section>
            <SectionTitle>Contact Information</SectionTitle>
            <FormRow>
              <InputField
                label="First Name"
                variant="outlined"
                fullWidth
                defaultValue={shippingAddress.firstName}
              />
              <InputField
                label="Last Name"
                variant="outlined"
                fullWidth
                defaultValue={shippingAddress.lastName}
              />
            </FormRow>
            <InputField
              label="Email Address"
              variant="outlined"
              fullWidth
              type="email"
              defaultValue={shippingAddress.email}
            />
            <InputField
              label="Phone Number"
              variant="outlined"
              fullWidth
              defaultValue={shippingAddress.phone}
            />
          </Section>

          {/* Shipping Address */}
          <Section>
            <SectionTitle>Shipping Address</SectionTitle>
            <InputField
              label="Address"
              variant="outlined"
              fullWidth
              defaultValue={shippingAddress.address}
            />
            <FormRow>
              <InputField
                label="City"
                variant="outlined"
                fullWidth
                defaultValue={shippingAddress.city}
              />
              <InputField
                label="State/Province"
                variant="outlined"
                fullWidth
                defaultValue={shippingAddress.state}
              />
            </FormRow>
            <FormRow>
              <InputField
                label="ZIP/Postal Code"
                variant="outlined"
                fullWidth
                defaultValue={shippingAddress.zipCode}
              />
              <InputField
                label="Country"
                variant="outlined"
                fullWidth
                defaultValue={shippingAddress.country}
              />
            </FormRow>
            <FormControlLabel
              control={
                <Checkbox
                  checked={saveShipping}
                  onChange={(e) => setSaveShipping(e.target.checked)}
                  color="primary"
                />
              }
              label="Save shipping information for next time"
            />
          </Section>

          {/* Payment Method */}
          <Section>
            <SectionTitle>Payment Method</SectionTitle>
            <FormControl component="fieldset" fullWidth>
              <FormLabel component="legend">Select Payment Method</FormLabel>
              <RadioGroup
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
              >
                <FormControlLabel
                  value="credit-card"
                  control={<Radio />}
                  label="Credit/Debit Card"
                />
                <FormControlLabel
                  value="paypal"
                  control={<Radio />}
                  label="PayPal"
                />
                <FormControlLabel
                  value="bank-transfer"
                  control={<Radio />}
                  label="Bank Transfer"
                />
              </RadioGroup>
            </FormControl>

            {paymentMethod === 'credit-card' && (
              <>
                <FormRow>
                  <InputField
                    label="Card Number"
                    variant="outlined"
                    fullWidth
                    placeholder="1234 5678 9012 3456"
                  />
                  <InputField
                    label="Name on Card"
                    variant="outlined"
                    fullWidth
                  />
                </FormRow>
                <FormRow>
                  <InputField
                    label="Expiration Date"
                    variant="outlined"
                    fullWidth
                    placeholder="MM/YY"
                  />
                  <InputField
                    label="CVV"
                    variant="outlined"
                    fullWidth
                    placeholder="123"
                  />
                </FormRow>
              </>
            )}

            <FormControlLabel
              control={
                <Checkbox
                  checked={savePayment}
                  onChange={(e) => setSavePayment(e.target.checked)}
                  color="primary"
                />
              }
              label="Save payment method for future purchases"
            />
          </Section>
        </CheckoutForm>

        {/* Right Column - Order Summary */}
        <CheckoutSummary>
          <SectionTitle>Order Summary</SectionTitle>
          
          {/* Products */}
          {cartItems.map((item) => (
            <ProductItem key={item.id}>
              <ProductImage>
                <img src={item.image} alt={item.name} />
              </ProductImage>
              <ProductInfo>
                <h4>{item.name}</h4>
                <p>Qty: {item.quantity} • Color: {item.color}</p>
              </ProductInfo>
              <ProductPrice>${(item.price * item.quantity).toFixed(2)}</ProductPrice>
            </ProductItem>
          ))}

          <Divider />

          {/* Pricing Breakdown */}
          <SummaryItem>
            <span>Subtotal</span>
            <strong>${calculateSubtotal().toFixed(2)}</strong>
          </SummaryItem>
          <SummaryItem>
            <span>Shipping</span>
            <strong>$5.99</strong>
          </SummaryItem>
          <SummaryItem>
            <span>Tax</span>
            <strong>${(calculateSubtotal() * 0.08).toFixed(2)}</strong>
          </SummaryItem>

          <Total>
            <span>Total</span>
            <strong>${calculateTotal().toFixed(2)}</strong>
          </Total>

          <Button
            variant="contained"
            fullWidth
            onClick={handlePlaceOrder}
            disabled={isProcessing}
            style={{
              backgroundColor: "#ef7921",
              color: "white",
              fontWeight: "600",
              padding: "1rem",
              fontSize: "1.1rem",
            }}
          >
            {isProcessing ? 'Processing...' : 'Place Order'}
          </Button>

          <p style={{ 
            fontSize: '0.8rem', 
            color: '#6b7280', 
            textAlign: 'center', 
            marginTop: '1rem' 
          }}>
            By completing your purchase, you agree to our Terms of Service and Privacy Policy.
          </p>
        </CheckoutSummary>
      </CheckoutContent>

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
    </CheckoutContainer>
  );
};

export default Checkout;