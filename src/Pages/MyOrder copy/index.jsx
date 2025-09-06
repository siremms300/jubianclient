import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  IconButton,
  Button,
  TextField,
  InputAdornment,
  Select,
  MenuItem,
  FormControl,
  InputLabel
} from '@mui/material';
import {
  Search,
  FilterList,
  Visibility,
  Download,
  Print,
  Refresh
} from '@mui/icons-material';
import AccountSidebar from '../../components/AccountSidebar';

// Styled components
const OrdersContainer = styled('div')({
  maxWidth: '1400px',
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

const ActionButtons = styled('div')({
  display: 'flex',
  gap: '0.5rem',
  marginBottom: '1.5rem',
  justifyContent: 'flex-end',
});

const StatusChip = styled(Chip)(({ status }) => {
  let color;
  switch (status) {
    case 'Delivered':
      color = '#10b981';
      break;
    case 'Processing':
      color = '#f59e0b';
      break;
    case 'Shipped':
      color = '#3b82f6';
      break;
    case 'Cancelled':
      color = '#ef4444';
      break;
    case 'Pending':
      color = '#6b7280';
      break;
    default:
      color = '#6b7280';
  }
  return {
    backgroundColor: `${color}15`,
    color: color,
    fontWeight: '600',
  };
});

const StyledTableContainer = styled(TableContainer)({
  borderRadius: '8px',
  border: '1px solid #e5e7eb',
});

const StyledTableHead = styled(TableHead)({
  backgroundColor: '#f9fafb',
  '& .MuiTableCell-root': {
    fontWeight: '600',
    color: '#374151',
  },
});

const StyledTableCell = styled(TableCell)({
  padding: '1rem',
});

const MyOrder = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('all');

  // Sample order data
  const orders = [
    {
      id: 'ORD-12345',
      paymentId: 'PAY-67890',
      name: 'John Doe',
      phone: '+1 (555) 123-4567',
      address: '123 Main St, Apt 4B',
      pincode: '10001',
      totalAmount: '$149.99',
      email: 'john.doe@example.com',
      userId: 'USER-001',
      status: 'Delivered',
      date: '2023-10-15',
    },
    {
      id: 'ORD-23456',
      paymentId: 'PAY-78901',
      name: 'Jane Smith',
      phone: '+1 (555) 987-6543',
      address: '456 Oak Ave, Suite 200',
      pincode: '90210',
      totalAmount: '$89.50',
      email: 'jane.smith@example.com',
      userId: 'USER-002',
      status: 'Processing',
      date: '2023-10-18',
    },
    {
      id: 'ORD-34567',
      paymentId: 'PAY-89012',
      name: 'Robert Johnson',
      phone: '+1 (555) 456-7890',
      address: '789 Pine Rd',
      pincode: '30301',
      totalAmount: '$245.75',
      email: 'robert.j@example.com',
      userId: 'USER-003',
      status: 'Shipped',
      date: '2023-10-20',
    },
    {
      id: 'ORD-45678',
      paymentId: 'PAY-90123',
      name: 'Sarah Williams',
      phone: '+1 (555) 234-5678',
      address: '321 Elm St, Floor 3',
      pincode: '60601',
      totalAmount: '$52.25',
      email: 'sarah.w@example.com',
      userId: 'USER-004',
      status: 'Cancelled',
      date: '2023-10-22',
    },
    {
      id: 'ORD-56789',
      paymentId: 'PAY-01234',
      name: 'Michael Brown',
      phone: '+1 (555) 876-5432',
      address: '654 Maple Ave',
      pincode: '75201',
      totalAmount: '$199.99',
      email: 'michael.b@example.com',
      userId: 'USER-005',
      status: 'Pending',
      date: '2023-10-25',
    },
  ];

  const filteredOrders = orders.filter(order => {
    const matchesSearch = 
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const handleViewOrder = (orderId) => {
    console.log(`Viewing order: ${orderId}`);
    // Navigate to order detail page or show modal
  };

  return (
    <OrdersContainer>
      <PageHeader>
        <h1>My Orders</h1>
        <p>View and manage your order history</p>
      </PageHeader>

      <AccountContent>
        <AccountSidebar />
        
        <MainContent>
          <FiltersSection>
            <TextField
              placeholder="Search orders..."
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
              <InputLabel>Status</InputLabel>
              <Select
                value={statusFilter}
                label="Status"
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <MenuItem value="all">All Statuses</MenuItem>
                <MenuItem value="Delivered">Delivered</MenuItem>
                <MenuItem value="Processing">Processing</MenuItem>
                <MenuItem value="Shipped">Shipped</MenuItem>
                <MenuItem value="Cancelled">Cancelled</MenuItem>
                <MenuItem value="Pending">Pending</MenuItem>
              </Select>
            </FormControl>

            <FormControl size="small" sx={{ minWidth: '120px' }}>
              <InputLabel>Date</InputLabel>
              <Select
                value={dateFilter}
                label="Date"
                onChange={(e) => setDateFilter(e.target.value)}
              >
                <MenuItem value="all">All Dates</MenuItem>
                <MenuItem value="7">Last 7 days</MenuItem>
                <MenuItem value="30">Last 30 days</MenuItem>
                <MenuItem value="90">Last 90 days</MenuItem>
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

          <ActionButtons>
            <Button variant="outlined" startIcon={<Refresh />}>
              Refresh
            </Button>
            <Button variant="outlined" startIcon={<Download />}>
              Export
            </Button>
            <Button variant="outlined" startIcon={<Print />}>
              Print
            </Button>
          </ActionButtons>

          <StyledTableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="orders table">
              <StyledTableHead>
                <TableRow>
                  <StyledTableCell>Order ID</StyledTableCell>
                  <StyledTableCell>Date</StyledTableCell>
                  <StyledTableCell>Customer</StyledTableCell>
                  <StyledTableCell>Contact</StyledTableCell>
                  <StyledTableCell>Address</StyledTableCell>
                  <StyledTableCell>Amount</StyledTableCell>
                  <StyledTableCell>Status</StyledTableCell>
                  <StyledTableCell align="center">Actions</StyledTableCell>
                </TableRow>
              </StyledTableHead>
              <TableBody>
                {filteredOrders.map((order) => (
                  <TableRow
                    key={order.id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <StyledTableCell component="th" scope="row">
                      {order.id}
                    </StyledTableCell>
                    <StyledTableCell>{order.date}</StyledTableCell>
                    <StyledTableCell>
                      <div>{order.name}</div>
                      <div style={{ fontSize: '0.8rem', color: '#6b7280' }}>
                        {order.email}
                      </div>
                    </StyledTableCell>
                    <StyledTableCell>{order.phone}</StyledTableCell>
                    <StyledTableCell>
                      <div>{order.address}</div>
                      <div style={{ fontSize: '0.8rem', color: '#6b7280' }}>
                        PIN: {order.pincode}
                      </div>
                    </StyledTableCell>
                    <StyledTableCell>{order.totalAmount}</StyledTableCell>
                    <StyledTableCell>
                      <StatusChip label={order.status} status={order.status} size="small" />
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      <IconButton
                        color="primary"
                        onClick={() => handleViewOrder(order.id)}
                        title="View Order Details"
                      >
                        <Visibility />
                      </IconButton>
                    </StyledTableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </StyledTableContainer>

          {filteredOrders.length === 0 && (
            <div style={{ textAlign: 'center', padding: '2rem', color: '#6b7280' }}>
              <p>No orders found matching your criteria.</p>
            </div>
          )}
        </MainContent>
      </AccountContent>
    </OrdersContainer>
  );
};

export default MyOrder;