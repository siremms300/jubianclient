// Pages/Address.js - Updated with real API calls
import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import {
  Card,
  CardContent,
  Button,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControlLabel,
  Checkbox,
  Grid,
  Typography,
  Box,
  Divider,
  CircularProgress,
  Alert
} from '@mui/material';
import {
  Add,
  Edit,
  Delete,
  LocationOn,
  Home,
  Work,
  Star
} from '@mui/icons-material';
import AccountSidebar from '../../components/AccountSidebar';
import { addressApi } from '../../utils/addressApi';
import { toast } from 'react-toastify';




// Styled components
const AddressContainer = styled('div')({
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

const AddressGrid = styled('div')({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
  gap: '1.5rem',
  marginBottom: '2rem',
});

const AddressCard = styled(Card)({
  height: '100%',
  border: '1px solid #e5e7eb',
  borderRadius: '8px',
  boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
  transition: 'box-shadow 0.2s ease, transform 0.2s ease',
  position: 'relative',
  '&:hover': {
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    transform: 'translateY(-2px)',
  },
  '&.default': {
    borderColor: '#ef7921',
    borderWidth: '2px',
  },
});

const AddressType = styled('div')({
  display: 'flex',
  alignItems: 'center',
  gap: '0.5rem',
  marginBottom: '1rem',
  '& svg': {
    color: '#6b7280',
  },
});

const DefaultBadge = styled('div')({
  position: 'absolute',
  top: '1rem',
  right: '1rem',
  backgroundColor: '#ef7921',
  color: 'white',
  fontSize: '0.7rem',
  fontWeight: '600',
  padding: '0.25rem 0.5rem',
  borderRadius: '4px',
  display: 'flex',
  alignItems: 'center',
  gap: '0.25rem',
});

const ActionButtons = styled('div')({
  display: 'flex',
  gap: '0.5rem',
  marginTop: '1.5rem',
  justifyContent: 'flex-end',
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




const Address = () => {
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);
  const [formData, setFormData] = useState({
    address_line: '',
    city: '',
    state: '',
    pincode: '',
    country: 'United States',
    mobile: '',
    status: false
  });

  // Fetch addresses on component mount
  useEffect(() => {
    fetchAddresses();
  }, []);

  const fetchAddresses = async () => {
    try {
      setLoading(true);
      const response = await addressApi.getUserAddresses();
      setAddresses(response.data);
    } catch (error) {
      console.error('Error fetching addresses:', error);
      toast.error('Failed to load addresses');
    } finally {
      setLoading(false);
    }
  };

  const handleOpenDialog = (address = null) => {
    if (address) {
      setEditingAddress(address);
      setFormData({
        address_line: address.address_line || '',
        city: address.city || '',
        state: address.state || '',
        pincode: address.pincode || '',
        country: address.country || 'United States',
        mobile: address.mobile || '',
        status: address.status || false
      });
    } else {
      setEditingAddress(null);
      setFormData({
        address_line: '',
        city: '',
        state: '',
        pincode: '',
        country: 'United States',
        mobile: '',
        status: addresses.length === 0 // Set as default if no addresses exist
      });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingAddress(null);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      if (editingAddress) {
        // Update existing address
        await addressApi.updateAddress(editingAddress._id, formData);
        toast.success('Address updated successfully');
      } else {
        // Add new address
        await addressApi.createAddress(formData);
        toast.success('Address created successfully');
      }
      
      await fetchAddresses(); // Refresh the list
      handleCloseDialog();
    } catch (error) {
      console.error('Error saving address:', error);
      toast.error(error.message || 'Failed to save address');
    }
  };

  const handleDelete = async (addressId) => {
    if (window.confirm('Are you sure you want to delete this address?')) {
      try {
        await addressApi.deleteAddress(addressId);
        toast.success('Address deleted successfully');
        await fetchAddresses(); // Refresh the list
      } catch (error) {
        console.error('Error deleting address:', error);
        toast.error(error.message || 'Failed to delete address');
      }
    }
  };

  const setAsDefault = async (addressId) => {
    try {
      await addressApi.setDefaultAddress(addressId);
      toast.success('Default address updated successfully');
      await fetchAddresses(); // Refresh the list
    } catch (error) {
      console.error('Error setting default address:', error);
      toast.error(error.message || 'Failed to set default address');
    }
  };

  const getAddressIcon = (address) => {
    // You can add logic to determine icon based on address type if you add that field
    return <Home />;
  };

  const getAddressTypeLabel = (address) => {
    // You can add logic to determine label based on address type if you add that field
    return 'Address';
  };

  if (loading) {
    return (
      <AddressContainer>
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
          <CircularProgress />
        </Box>
      </AddressContainer>
    );
  }

  return (
    <AddressContainer>
      <PageHeader>
        <div>
          <h1>My Addresses</h1>
          <p>Manage your shipping addresses for faster checkout</p>
        </div>
        <Button 
          variant="contained" 
          startIcon={<Add />}
          onClick={() => handleOpenDialog()}
          sx={{ backgroundColor: '#ef7921', '&:hover': { backgroundColor: '#e06b15' } }}
        >
          Add New Address
        </Button>
      </PageHeader>

      <AccountContent>
        <AccountSidebar />
        
        <MainContent>
          {addresses.length > 0 ? (
            <AddressGrid>
              {addresses.map((address) => (
                <AddressCard 
                  key={address._id} 
                  className={address.status ? 'default' : ''}
                >
                  <CardContent>
                    {address.status && (
                      <DefaultBadge>
                        <Star fontSize="small" /> DEFAULT
                      </DefaultBadge>
                    )}
                    
                    <AddressType>
                      {getAddressIcon(address)}
                      <Typography variant="subtitle2" color="textSecondary">
                        {getAddressTypeLabel(address)}
                      </Typography>
                    </AddressType>
                    
                    <Typography variant="body2" color="textSecondary" paragraph>
                      {address.address_line}<br />
                      {address.city}, {address.state} {address.pincode}<br />
                      {address.country}<br />
                      {address.mobile}
                    </Typography>
                    
                    <ActionButtons>
                      <IconButton 
                        size="small" 
                        onClick={() => setAsDefault(address._id)}
                        disabled={address.status}
                        title={address.status ? "Default address" : "Set as default"}
                      >
                        <Star color={address.status ? "primary" : "action"} />
                      </IconButton>
                      <IconButton 
                        size="small" 
                        onClick={() => handleOpenDialog(address)}
                        title="Edit address"
                      >
                        <Edit />
                      </IconButton>
                      <IconButton 
                        size="small" 
                        onClick={() => handleDelete(address._id)}
                        title="Delete address"
                      >
                        <Delete />
                      </IconButton>
                    </ActionButtons>
                  </CardContent>
                </AddressCard>
              ))}
            </AddressGrid>
          ) : (
            <EmptyState>
              <LocationOn />
              <h3>No addresses saved</h3>
              <p>Add your first address to make checkout faster and easier.</p>
              <Button 
                variant="contained" 
                startIcon={<Add />}
                onClick={() => handleOpenDialog()}
                sx={{ backgroundColor: '#ef7921', '&:hover': { backgroundColor: '#e06b15' } }}
              >
                Add Your First Address
              </Button>
            </EmptyState>
          )}
        </MainContent>
      </AccountContent>

      {/* Add/Edit Address Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>
          {editingAddress ? 'Edit Address' : 'Add New Address'}
        </DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Address Line"
                  name="address_line"
                  value={formData.address_line}
                  onChange={handleInputChange}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="City"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="State/Province"
                  name="state"
                  value={formData.state}
                  onChange={handleInputChange}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="ZIP/Postal Code"
                  name="pincode"
                  value={formData.pincode}
                  onChange={handleInputChange}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Country"
                  name="country"
                  value={formData.country}
                  onChange={handleInputChange}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Mobile Number"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleInputChange}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox
                      name="status"
                      checked={formData.status}
                      onChange={handleInputChange}
                    />
                  }
                  label="Set as default shipping address"
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}>Cancel</Button>
            <Button type="submit" variant="contained">
              {editingAddress ? 'Update Address' : 'Save Address'}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </AddressContainer>
  );
};

export default Address;





















































// import React, { useState } from 'react';
// import { styled } from '@mui/material/styles';
// import {
//   Card,
//   CardContent,
//   Button,
//   IconButton,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   TextField,
//   FormControlLabel,
//   Checkbox,
//   Grid,
//   Typography,
//   Box,
//   Divider
// } from '@mui/material';
// import {
//   Add,
//   Edit,
//   Delete,
//   LocationOn,
//   Home,
//   Work,
//   Star
// } from '@mui/icons-material';
// import AccountSidebar from '../../components/AccountSidebar';

// // Styled components
// const AddressContainer = styled('div')({
//   maxWidth: '1200px',
//   margin: '0 auto',
//   padding: '2rem 1rem',
//   fontFamily: 'Arial, sans-serif',
// });

// const PageHeader = styled('div')({
//   marginBottom: '2rem',
//   display: 'flex',
//   justifyContent: 'space-between',
//   alignItems: 'flex-start',
//   flexWrap: 'wrap',
//   gap: '1rem',
//   '& h1': {
//     fontSize: '2rem',
//     fontWeight: '600',
//     color: '#1f2937',
//     margin: '0 0 0.5rem 0',
//   },
//   '& p': {
//     color: '#6b7280',
//     margin: 0,
//   },
// });

// const AccountContent = styled('div')({
//   display: 'grid',
//   gridTemplateColumns: '280px 1fr',
//   gap: '2rem',
//   '@media (max-width: 1024px)': {
//     gridTemplateColumns: '1fr',
//   },
// });

// const MainContent = styled('div')({
//   backgroundColor: '#fff',
//   borderRadius: '8px',
//   boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
//   border: '1px solid #e5e7eb',
//   padding: '2rem',
// });

// const AddressGrid = styled('div')({
//   display: 'grid',
//   gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
//   gap: '1.5rem',
//   marginBottom: '2rem',
// });

// const AddressCard = styled(Card)({
//   height: '100%',
//   border: '1px solid #e5e7eb',
//   borderRadius: '8px',
//   boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
//   transition: 'box-shadow 0.2s ease, transform 0.2s ease',
//   position: 'relative',
//   '&:hover': {
//     boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
//     transform: 'translateY(-2px)',
//   },
//   '&.default': {
//     borderColor: '#ef7921',
//     borderWidth: '2px',
//   },
// });

// const AddressType = styled('div')({
//   display: 'flex',
//   alignItems: 'center',
//   gap: '0.5rem',
//   marginBottom: '1rem',
//   '& svg': {
//     color: '#6b7280',
//   },
// });

// const DefaultBadge = styled('div')({
//   position: 'absolute',
//   top: '1rem',
//   right: '1rem',
//   backgroundColor: '#ef7921',
//   color: 'white',
//   fontSize: '0.7rem',
//   fontWeight: '600',
//   padding: '0.25rem 0.5rem',
//   borderRadius: '4px',
//   display: 'flex',
//   alignItems: 'center',
//   gap: '0.25rem',
// });

// const ActionButtons = styled('div')({
//   display: 'flex',
//   gap: '0.5rem',
//   marginTop: '1.5rem',
//   justifyContent: 'flex-end',
// });

// const EmptyState = styled('div')({
//   textAlign: 'center',
//   padding: '3rem 1rem',
//   color: '#9ca3af',
//   '& svg': {
//     fontSize: '4rem',
//     marginBottom: '1rem',
//     color: '#d1d5db',
//   },
//   '& h3': {
//     fontSize: '1.5rem',
//     fontWeight: '600',
//     margin: '0 0 0.5rem 0',
//     color: '#6b7280',
//   },
//   '& p': {
//     margin: '0 0 2rem 0',
//   },
// });

// const Address = () => {
//   const [addresses, setAddresses] = useState([
//     {
//       id: 1,
//       name: 'John Doe',
//       phone: '+1 (555) 123-4567',
//       addressLine1: '123 Main Street',
//       addressLine2: 'Apt 4B',
//       city: 'New York',
//       state: 'NY',
//       zipCode: '10001',
//       country: 'United States',
//       type: 'home',
//       isDefault: true
//     },
//     {
//       id: 2,
//       name: 'John Doe',
//       phone: '+1 (555) 987-6543',
//       addressLine1: '456 Office Park',
//       addressLine2: 'Suite 300',
//       city: 'New York',
//       state: 'NY',
//       zipCode: '10002',
//       country: 'United States',
//       type: 'work',
//       isDefault: false
//     }
//   ]);

//   const [openDialog, setOpenDialog] = useState(false);
//   const [editingAddress, setEditingAddress] = useState(null);
//   const [formData, setFormData] = useState({
//     name: '',
//     phone: '',
//     addressLine1: '',
//     addressLine2: '',
//     city: '',
//     state: '',
//     zipCode: '',
//     country: 'United States',
//     type: 'home',
//     isDefault: false
//   });

//   const handleOpenDialog = (address = null) => {
//     if (address) {
//       setEditingAddress(address);
//       setFormData(address);
//     } else {
//       setEditingAddress(null);
//       setFormData({
//         name: '',
//         phone: '',
//         addressLine1: '',
//         addressLine2: '',
//         city: '',
//         state: '',
//         zipCode: '',
//         country: 'United States',
//         type: 'home',
//         isDefault: addresses.length === 0 // Set as default if no addresses exist
//       });
//     }
//     setOpenDialog(true);
//   };

//   const handleCloseDialog = () => {
//     setOpenDialog(false);
//     setEditingAddress(null);
//   };

//   const handleInputChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: type === 'checkbox' ? checked : value
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
    
//     if (editingAddress) {
//       // Update existing address
//       const updatedAddresses = addresses.map(address => 
//         address.id === editingAddress.id 
//           ? { ...formData, id: editingAddress.id }
//           : formData.isDefault ? { ...address, isDefault: false } : address
//       );
//       setAddresses(updatedAddresses);
//     } else {
//       // Add new address
//       const newAddress = {
//         ...formData,
//         id: Date.now() // Simple ID generation
//       };
      
//       let updatedAddresses;
//       if (formData.isDefault) {
//         // If new address is default, remove default from others
//         updatedAddresses = addresses.map(address => ({
//           ...address,
//           isDefault: false
//         }));
//         updatedAddresses.push(newAddress);
//       } else {
//         updatedAddresses = [...addresses, newAddress];
//       }
      
//       setAddresses(updatedAddresses);
//     }
    
//     handleCloseDialog();
//   };

//   const handleDelete = (id) => {
//     if (window.confirm('Are you sure you want to delete this address?')) {
//       const updatedAddresses = addresses.filter(address => address.id !== id);
//       // If we deleted the default address and there are other addresses, set the first one as default
//       if (updatedAddresses.length > 0 && addresses.find(a => a.id === id)?.isDefault) {
//         updatedAddresses[0].isDefault = true;
//       }
//       setAddresses(updatedAddresses);
//     }
//   };

//   const setAsDefault = (id) => {
//     const updatedAddresses = addresses.map(address => ({
//       ...address,
//       isDefault: address.id === id
//     }));
//     setAddresses(updatedAddresses);
//   };

//   const getAddressIcon = (type) => {
//     switch (type) {
//       case 'home': return <Home />;
//       case 'work': return <Work />;
//       default: return <LocationOn />;
//     }
//   };

//   const getAddressTypeLabel = (type) => {
//     switch (type) {
//       case 'home': return 'Home';
//       case 'work': return 'Work';
//       default: return 'Other';
//     }
//   };

//   return (
//     <AddressContainer>
//       <PageHeader>
//         <div>
//           <h1>My Addresses</h1>
//           <p>Manage your shipping addresses for faster checkout</p>
//         </div>
//         <Button 
//           variant="contained" 
//           startIcon={<Add />}
//           onClick={() => handleOpenDialog()}
//           sx={{ backgroundColor: '#ef7921', '&:hover': { backgroundColor: '#e06b15' } }}
//         >
//           Add New Address
//         </Button>
//       </PageHeader>

//       <AccountContent>
//         <AccountSidebar />
        
//         <MainContent>
//           {addresses.length > 0 ? (
//             <AddressGrid>
//               {addresses.map((address) => (
//                 <AddressCard 
//                   key={address.id} 
//                   className={address.isDefault ? 'default' : ''}
//                 >
//                   <CardContent>
//                     {address.isDefault && (
//                       <DefaultBadge>
//                         <Star fontSize="small" /> DEFAULT
//                       </DefaultBadge>
//                     )}
                    
//                     <AddressType>
//                       {getAddressIcon(address.type)}
//                       <Typography variant="subtitle2" color="textSecondary">
//                         {getAddressTypeLabel(address.type)}
//                       </Typography>
//                     </AddressType>
                    
//                     <Typography variant="body1" gutterBottom>
//                       {address.name}
//                     </Typography>
                    
//                     <Typography variant="body2" color="textSecondary" paragraph>
//                       {address.addressLine1}<br />
//                       {address.addressLine2 && <>{address.addressLine2}<br /></>}
//                       {address.city}, {address.state} {address.zipCode}<br />
//                       {address.country}<br />
//                       {address.phone}
//                     </Typography>
                    
//                     <ActionButtons>
//                       <IconButton 
//                         size="small" 
//                         onClick={() => setAsDefault(address.id)}
//                         disabled={address.isDefault}
//                         title={address.isDefault ? "Default address" : "Set as default"}
//                       >
//                         <Star color={address.isDefault ? "primary" : "action"} />
//                       </IconButton>
//                       <IconButton 
//                         size="small" 
//                         onClick={() => handleOpenDialog(address)}
//                         title="Edit address"
//                       >
//                         <Edit />
//                       </IconButton>
//                       <IconButton 
//                         size="small" 
//                         onClick={() => handleDelete(address.id)}
//                         title="Delete address"
//                       >
//                         <Delete />
//                       </IconButton>
//                     </ActionButtons>
//                   </CardContent>
//                 </AddressCard>
//               ))}
//             </AddressGrid>
//           ) : (
//             <EmptyState>
//               <LocationOn />
//               <h3>No addresses saved</h3>
//               <p>Add your first address to make checkout faster and easier.</p>
//               <Button 
//                 variant="contained" 
//                 startIcon={<Add />}
//                 onClick={() => handleOpenDialog()}
//                 sx={{ backgroundColor: '#ef7921', '&:hover': { backgroundColor: '#e06b15' } }}
//               >
//                 Add Your First Address
//               </Button>
//             </EmptyState>
//           )}
//         </MainContent>
//       </AccountContent>

//       {/* Add/Edit Address Dialog */}
//       <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
//         <DialogTitle>
//           {editingAddress ? 'Edit Address' : 'Add New Address'}
//         </DialogTitle>
//         <form onSubmit={handleSubmit}>
//           <DialogContent>
//             <Grid container spacing={2}>
//               <Grid item xs={12}>
//                 <TextField
//                   fullWidth
//                   label="Full Name"
//                   name="name"
//                   value={formData.name}
//                   onChange={handleInputChange}
//                   required
//                 />
//               </Grid>
//               <Grid item xs={12}>
//                 <TextField
//                   fullWidth
//                   label="Phone Number"
//                   name="phone"
//                   value={formData.phone}
//                   onChange={handleInputChange}
//                   required
//                 />
//               </Grid>
//               <Grid item xs={12}>
//                 <TextField
//                   fullWidth
//                   label="Address Line 1"
//                   name="addressLine1"
//                   value={formData.addressLine1}
//                   onChange={handleInputChange}
//                   required
//                 />
//               </Grid>
//               <Grid item xs={12}>
//                 <TextField
//                   fullWidth
//                   label="Address Line 2 (Optional)"
//                   name="addressLine2"
//                   value={formData.addressLine2}
//                   onChange={handleInputChange}
//                 />
//               </Grid>
//               <Grid item xs={12} sm={6}>
//                 <TextField
//                   fullWidth
//                   label="City"
//                   name="city"
//                   value={formData.city}
//                   onChange={handleInputChange}
//                   required
//                 />
//               </Grid>
//               <Grid item xs={12} sm={6}>
//                 <TextField
//                   fullWidth
//                   label="State/Province"
//                   name="state"
//                   value={formData.state}
//                   onChange={handleInputChange}
//                   required
//                 />
//               </Grid>
//               <Grid item xs={12} sm={6}>
//                 <TextField
//                   fullWidth
//                   label="ZIP/Postal Code"
//                   name="zipCode"
//                   value={formData.zipCode}
//                   onChange={handleInputChange}
//                   required
//                 />
//               </Grid>
//               <Grid item xs={12} sm={6}>
//                 <TextField
//                   fullWidth
//                   label="Country"
//                   name="country"
//                   value={formData.country}
//                   onChange={handleInputChange}
//                   required
//                 />
//               </Grid>
//               <Grid item xs={12}>
//                 <TextField
//                   fullWidth
//                   select
//                   label="Address Type"
//                   name="type"
//                   value={formData.type}
//                   onChange={handleInputChange}
//                   SelectProps={{
//                     native: true,
//                   }}
//                 >
//                   <option value="home">Home</option>
//                   <option value="work">Work</option>
//                   <option value="other">Other</option>
//                 </TextField>
//               </Grid>
//               <Grid item xs={12}>
//                 <FormControlLabel
//                   control={
//                     <Checkbox
//                       name="isDefault"
//                       checked={formData.isDefault}
//                       onChange={handleInputChange}
//                     />
//                   }
//                   label="Set as default shipping address"
//                 />
//               </Grid>
//             </Grid>
//           </DialogContent>
//           <DialogActions>
//             <Button onClick={handleCloseDialog}>Cancel</Button>
//             <Button type="submit" variant="contained">
//               {editingAddress ? 'Update Address' : 'Save Address'}
//             </Button>
//           </DialogActions>
//         </form>
//       </Dialog>
//     </AddressContainer>
//   );
// };

// export default Address;