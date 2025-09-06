import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import {
  Card,
  CardContent,
  Chip,
  IconButton,
  Button,
  TextField,
  InputAdornment,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Box,
  Divider
} from '@mui/material';
import {
  Search,
  FilterList,
  Visibility,
  Download,
  ExpandMore,
  LocalShipping,
  CheckCircle,
  Pending,
  Cancel,
  ShoppingBag
} from '@mui/icons-material';
import AccountSidebar from '../../components/AccountSidebar';

// Styled components
const OrdersContainer = styled('div')({
  maxWidth: '1200px',
  margin: '0 auto',
  padding: '2rem 1rem',
  fontFamily: 'Arial, sans-serif',
});

const PageHeader = styled('div')({
  marginBottom: '2rem',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
  flexWrap: 'wrap',
  gap: '1rem',
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

const AccountContent = styled('div')({
  display: 'grid',
  gridTemplateColumns: '280px 1fr',
  gap: '2rem',
  '@media (max-width: 1024px)': {
    gridTemplateColumns: '1fr',
  },
});

const MainContent = styled('div')({
  backgroundColor: '#fff',
  borderRadius: '8px',
  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
  border: '1px solid #e5e7eb',
  padding: '2rem',
});

const FiltersSection = styled('div')({
  display: 'flex',
  flexWrap: 'wrap',
  gap: '1rem',
  marginBottom: '2rem',
  alignItems: 'center',
  padding: '1rem',
  backgroundColor: '#f9fafb',
  borderRadius: '8px',
});

const OrderCard = styled(Card)({
  marginBottom: '1.5rem',
  border: '1px solid #e5e7eb',
  borderRadius: '8px',
  boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
  transition: 'box-shadow 0.2s ease',
  '&:hover': {
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
  },
});

const OrderHeader = styled('div')({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
  flexWrap: 'wrap',
  gap: '1rem',
  marginBottom: '1rem',
});

const OrderDetailsGrid = styled('div')({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
  gap: '1rem',
  marginBottom: '1rem',
});

const DetailItem = styled('div')({
  '& h4': {
    fontSize: '0.8rem',
    fontWeight: '600',
    color: '#6b7280',
    margin: '0 0 0.25rem 0',
    textTransform: 'uppercase',
  },
  '& p': {
    fontSize: '0.95rem',
    color: '#1f2937',
    margin: 0,
  },
});

const StatusChip = styled(Chip)(({ status }) => {
  let color, icon;
  switch (status) {
    case 'Delivered':
      color = '#10b981';
      icon = <CheckCircle />;
      break;
    case 'Processing':
      color = '#f59e0b';
      icon = <Pending />;
      break;
    case 'Shipped':
      color = '#3b82f6';
      icon = <LocalShipping />;
      break;
    case 'Cancelled':
      color = '#ef4444';
      icon = <Cancel />;
      break;
    case 'Pending':
      color = '#6b7280';
      icon = <Pending />;
      break;
    default:
      color = '#6b7280';
      icon = <Pending />;
  }
  return {
    backgroundColor: `${color}15`,
    color: color,
    fontWeight: '600',
    '& .MuiChip-icon': {
      color: color,
    },
  };
});

const ActionButtons = styled('div')({
  display: 'flex',
  gap: '0.5rem',
  justifyContent: 'flex-end',
  marginTop: '1rem',
});

const EmptyState = styled('div')({
  textAlign: 'center',
  padding: '3rem 1rem',
  color: '#9ca3af',
  '& svg': {
    fontSize: '4rem',
    marginBottom: '1rem',
    color: '#d1d5db',
  },
  '& h3': {
    fontSize: '1.5rem',
    fontWeight: '600',
    margin: '0 0 0.5rem 0',
    color: '#6b7280',
  },
  '& p': {
    margin: '0 0 2rem 0',
  },
});

const MyOrder = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('all');
  const [expandedOrder, setExpandedOrder] = useState(null);

  // Sample order data - from customer perspective
  const orders = [
    {
      id: 'ORD-12345',
      paymentId: 'PAY-67890',
      name: 'John Doe',
      phone: '+1 (555) 123-4567',
      address: '123 Main St, Apt 4B, New York, NY',
      pincode: '10001',
      totalAmount: '$149.99',
      email: 'john.doe@example.com',
      userId: 'USER-001',
      status: 'Delivered',
      date: 'Oct 15, 2023',
      items: [
        { name: 'Wireless Headphones', quantity: 1, price: '$99.99' },
        { name: 'Phone Case', quantity: 2, price: '$25.00' }
      ],
      trackingNumber: 'TRK-78901234',
      estimatedDelivery: 'Oct 18, 2023',
      paymentMethod: 'Credit Card (****1234)'
    },
    {
      id: 'ORD-23456',
      paymentId: 'PAY-78901',
      name: 'Jane Smith',
      phone: '+1 (555) 987-6543',
      address: '456 Oak Ave, Suite 200, Los Angeles, CA',
      pincode: '90210',
      totalAmount: '$89.50',
      email: 'jane.smith@example.com',
      userId: 'USER-002',
      status: 'Processing',
      date: 'Oct 18, 2023',
      items: [
        { name: 'Smart Watch', quantity: 1, price: '$89.50' }
      ],
      estimatedDelivery: 'Oct 25, 2023',
      paymentMethod: 'PayPal'
    },
    {
      id: 'ORD-34567',
      paymentId: 'PAY-89012',
      name: 'Robert Johnson',
      phone: '+1 (555) 456-7890',
      address: '789 Pine Rd, Atlanta, GA',
      pincode: '30301',
      totalAmount: '$245.75',
      email: 'robert.j@example.com',
      userId: 'USER-003',
      status: 'Shipped',
      date: 'Oct 20, 2023',
      items: [
        { name: 'Gaming Console', quantity: 1, price: '$199.99' },
        { name: 'Game Controller', quantity: 1, price: '$45.76' }
      ],
      trackingNumber: 'TRK-56789012',
      estimatedDelivery: 'Oct 23, 2023',
      paymentMethod: 'Credit Card (****5678)'
    },
    {
      id: 'ORD-45678',
      paymentId: 'PAY-90123',
      name: 'Sarah Williams',
      phone: '+1 (555) 234-5678',
      address: '321 Elm St, Floor 3, Chicago, IL',
      pincode: '60601',
      totalAmount: '$52.25',
      email: 'sarah.w@example.com',
      userId: 'USER-004',
      status: 'Cancelled',
      date: 'Oct 22, 2023',
      items: [
        { name: 'Bluetooth Speaker', quantity: 1, price: '$52.25' }
      ],
      paymentMethod: 'Debit Card (****9012)'
    },
    {
      id: 'ORD-56789',
      paymentId: 'PAY-01234',
      name: 'Michael Brown',
      phone: '+1 (555) 876-5432',
      address: '654 Maple Ave, Dallas, TX',
      pincode: '75201',
      totalAmount: '$199.99',
      email: 'michael.b@example.com',
      userId: 'USER-005',
      status: 'Pending',
      date: 'Oct 25, 2023',
      items: [
        { name: 'Fitness Tracker', quantity: 1, price: '$79.99' },
        { name: 'Wireless Earbuds', quantity: 1, price: '$120.00' }
      ],
      paymentMethod: 'Apple Pay'
    },
  ];

  const filteredOrders = orders.filter(order => {
    const matchesSearch = 
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.name.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const handleViewOrder = (orderId) => {
    console.log(`Viewing order: ${orderId}`);
    // Navigate to order detail page
  };

  const handleTrackOrder = (orderId) => {
    console.log(`Tracking order: ${orderId}`);
    // Navigate to tracking page
  };

  const handleReorder = (orderId) => {
    console.log(`Reordering: ${orderId}`);
    // Add items to cart
  };

  const handleDownloadInvoice = (orderId) => {
    console.log(`Downloading invoice for: ${orderId}`);
    // Download invoice
  };

  const handleExpandOrder = (orderId) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId);
  };

  return (
    <OrdersContainer>
      <PageHeader>
        <div>
          <h1>My Orders</h1>
          <p>View your order history and track recent purchases</p>
        </div>
        <Link to="/">
            <Button 
                variant="contained" 
                startIcon={<ShoppingBag />}
                sx={{ backgroundColor: '#ef7921', '&:hover': { backgroundColor: '#e06b15' } }}
            >
                Continue Shopping
            </Button>
        </Link>
        
      </PageHeader>

      <AccountContent>
        <AccountSidebar />
        
        <MainContent>
          <FiltersSection>
            <TextField
              placeholder="Search by order ID or product..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search />
                  </InputAdornment>
                ),
              }}
              size="small"
              sx={{ minWidth: '250px' }}
            />
            
            <FormControl size="small" sx={{ minWidth: '150px' }}>
              <InputLabel>Order Status</InputLabel>
              <Select
                value={statusFilter}
                label="Order Status"
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <MenuItem value="all">All Orders</MenuItem>
                <MenuItem value="Delivered">Delivered</MenuItem>
                <MenuItem value="Processing">Processing</MenuItem>
                <MenuItem value="Shipped">Shipped</MenuItem>
                <MenuItem value="Cancelled">Cancelled</MenuItem>
                <MenuItem value="Pending">Pending</MenuItem>
              </Select>
            </FormControl>

            <FormControl size="small" sx={{ minWidth: '120px' }}>
              <InputLabel>Time Period</InputLabel>
              <Select
                value={dateFilter}
                label="Time Period"
                onChange={(e) => setDateFilter(e.target.value)}
              >
                <MenuItem value="all">All Time</MenuItem>
                <MenuItem value="7">Last 7 days</MenuItem>
                <MenuItem value="30">Last 30 days</MenuItem>
                <MenuItem value="90">Last 3 months</MenuItem>
              </Select>
            </FormControl>

            <Button
              variant="outlined"
              startIcon={<FilterList />}
              onClick={() => {
                setSearchTerm('');
                setStatusFilter('all');
                setDateFilter('all');
              }}
            >
              Clear Filters
            </Button>
          </FiltersSection>

          {filteredOrders.length > 0 ? (
            filteredOrders.map((order) => (
              <OrderCard key={order.id}>
                <CardContent>
                  <OrderHeader>
                    <div>
                      <Typography variant="h6" component="h2" gutterBottom>
                        Order #{order.id}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        Placed on {order.date}
                      </Typography>
                    </div>
                    <StatusChip 
                      icon={order.status === 'Delivered' ? <CheckCircle /> : 
                            order.status === 'Shipped' ? <LocalShipping /> : 
                            order.status === 'Cancelled' ? <Cancel /> : <Pending />}
                      label={order.status} 
                      status={order.status} 
                    />
                  </OrderHeader>

                  <OrderDetailsGrid>
                    <DetailItem>
                      <h4>Total Amount</h4>
                      <p>{order.totalAmount}</p>
                    </DetailItem>
                    <DetailItem>
                      <h4>Payment Method</h4>
                      <p>{order.paymentMethod}</p>
                    </DetailItem>
                    <DetailItem>
                      <h4>Items</h4>
                      <p>{order.items.length} item{order.items.length !== 1 ? 's' : ''}</p>
                    </DetailItem>
                    {order.trackingNumber && (
                      <DetailItem>
                        <h4>Tracking Number</h4>
                        <p>{order.trackingNumber}</p>
                      </DetailItem>
                    )}
                  </OrderDetailsGrid>

                  <Accordion 
                    expanded={expandedOrder === order.id}
                    onChange={() => handleExpandOrder(order.id)}
                    sx={{ boxShadow: 'none', '&:before': { display: 'none' } }}
                  >
                    <AccordionSummary expandIcon={<ExpandMore />}>
                      <Typography>Order Details</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Box sx={{ mb: 2 }}>
                        <Typography variant="subtitle2" gutterBottom>
                          Shipping Address
                        </Typography>
                        <Typography variant="body2">
                          {order.name}<br />
                          {order.address}<br />
                          {order.pincode}<br />
                          {order.phone}<br />
                          {order.email}
                        </Typography>
                      </Box>
                      
                      <Divider sx={{ my: 2 }} />
                      
                      <Typography variant="subtitle2" gutterBottom>
                        Order Items
                      </Typography>
                      {order.items.map((item, index) => (
                        <Box key={index} sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                          <Typography variant="body2">
                            {item.quantity} x {item.name}
                          </Typography>
                          <Typography variant="body2">
                            {item.price}
                          </Typography>
                        </Box>
                      ))}
                    </AccordionDetails>
                  </Accordion>

                  <ActionButtons>
                    <Button 
                      variant="outlined" 
                      size="small"
                      onClick={() => handleViewOrder(order.id)}
                    >
                      View Details
                    </Button>
                    {order.status === 'Shipped' && order.trackingNumber && (
                      <Button 
                        variant="outlined" 
                        size="small"
                        onClick={() => handleTrackOrder(order.id)}
                        startIcon={<LocalShipping />}
                      >
                        Track Order
                      </Button>
                    )}
                    {order.status === 'Delivered' && (
                      <>
                        <Button 
                          variant="outlined" 
                          size="small"
                          onClick={() => handleReorder(order.id)}
                        >
                          Reorder
                        </Button>
                        <Button 
                                          variant="outlined" 
                                          size="small"
                                          onClick={() => handleDownloadInvoice(order.id)}
                                          startIcon={<Download />}
                                        >
                                          Invoice
                                        </Button>
                                      </>
                                    )}
                                  </ActionButtons>
                                </CardContent>
                              </OrderCard>
                            ))
                          ) : (
                            <EmptyState>
                              <ShoppingBag />
                              <h3>No orders found</h3>
                              <p>You haven't placed any orders yet, or no orders match your search criteria.</p>
                              <Button 
                                variant="contained" 
                                sx={{ backgroundColor: '#ef7921', '&:hover': { backgroundColor: '#e06b15' } }}
                              >
                                Start Shopping
                              </Button>
                            </EmptyState>
                          )}
                        </MainContent>
                      </AccountContent>
                    </OrdersContainer>
                  );
                };
                
                export default MyOrder;