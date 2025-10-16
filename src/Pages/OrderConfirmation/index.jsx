// Pages/OrderConfirmation.js
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import {
  Container,
  Paper,
  Typography,
  Button,
  Box,
  Divider,
  CircularProgress
} from '@mui/material';
import { orderApi } from '../../utils/orderApi';
import { CheckCircle, ShoppingBag } from '@mui/icons-material';

const ConfirmationContainer = styled(Container)({
  padding: '2rem 1rem',
  maxWidth: '800px',
  textAlign: 'center',
});

const SuccessIcon = styled(CheckCircle)({
  fontSize: '4rem',
  color: '#10b981',
  marginBottom: '1rem',
});

const OrderConfirmation = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrder();
  }, [orderId]);

  const fetchOrder = async () => {
    try {
      const response = await orderApi.getOrder(orderId);
      setOrder(response.data);
    } catch (error) {
      console.error('Error fetching order:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <ConfirmationContainer>
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
          <CircularProgress />
        </Box>
      </ConfirmationContainer>
    );
  }

  if (!order) {
    return (
      <ConfirmationContainer>
        <Typography variant="h4" color="error">
          Order not found
        </Typography>
        <Button component={Link} to="/" variant="contained" sx={{ mt: 2 }}>
          Continue Shopping
        </Button>
      </ConfirmationContainer>
    );
  }

  return (
    <ConfirmationContainer>
      <SuccessIcon />
      <Typography variant="h3" component="h1" gutterBottom fontWeight="600">
        Order Confirmed!
      </Typography>
      <Typography variant="h6" color="textSecondary" gutterBottom>
        Thank you for your purchase
      </Typography>
      <Typography variant="body1" gutterBottom>
        Your order <strong>{order.orderId}</strong> has been successfully placed.
      </Typography>

      <Paper sx={{ p: 3, mt: 3, textAlign: 'left' }}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="h6">Order Details</Typography>
          <Typography variant="body2" color="textSecondary">
            Status: <strong style={{ color: '#ef7921' }}>{order.order_status}</strong>
          </Typography>
        </Box>
        
        <Divider sx={{ my: 2 }} />

        <Box mb={2}>
          <Typography variant="subtitle1" fontWeight="600">Items:</Typography>
          {order.items.map((item, index) => (
            <Box key={index} display="flex" justifyContent="space-between" my={1}>
              <Typography>
                {item.quantity} × {item.name}
              </Typography>
              <Typography>${(item.quantity * item.price).toFixed(2)}</Typography>
            </Box>
          ))}
        </Box>

        <Divider sx={{ my: 2 }} />

        <Box display="flex" justifyContent="space-between" mb={1}>
          <Typography>Subtotal:</Typography>
          <Typography>${order.subtotal.toFixed(2)}</Typography>
        </Box>
        <Box display="flex" justifyContent="space-between" mb={1}>
          <Typography>Shipping:</Typography>
          <Typography>{order.shipping === 0 ? 'FREE' : `$${order.shipping.toFixed(2)}`}</Typography>
        </Box>
        {order.totalSavings > 0 && (
          <Box display="flex" justifyContent="space-between" mb={1}>
            <Typography color="success.main">Savings:</Typography>
            <Typography color="success.main">-${order.totalSavings.toFixed(2)}</Typography>
          </Box>
        )}
        <Box display="flex" justifyContent="space-between" fontWeight="600" fontSize="1.1rem">
          <Typography>Total:</Typography>
          <Typography>${order.total.toFixed(2)}</Typography>
        </Box>
      </Paper>

      <Box mt={3} display="flex" gap={2} justifyContent="center">
        <Button
          variant="contained"
          component={Link}
          to="/orders"
          startIcon={<ShoppingBag />}
        >
          View My Orders
        </Button>
        <Button
          variant="outlined"
          component={Link}
          to="/"
        >
          Continue Shopping
        </Button>
      </Box>
    </ConfirmationContainer>
  );
};

export default OrderConfirmation;