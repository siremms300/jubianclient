// Pages/MyAccount.js - Updated with password section in profile
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import CircularProgress from '@mui/material/CircularProgress';
import { 
  Visibility, 
  VisibilityOff, 
  Edit, 
  Save, 
  CameraAlt, 
  Delete,
  AddAPhoto 
} from '@mui/icons-material';  
import AccountSidebar from '../../components/AccountSidebar';
import { useAuth } from '../../context/authContext'; 
import { userApi } from '../../utils/userApi';
import { toast } from 'react-toastify';

// Styled components
const AccountContainer = styled('div')({
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

const AccountContent = styled('div')({
  display: 'grid',
  gridTemplateColumns: '300px 1fr',
  gap: '2rem',
  '@media (max-width: 968px)': {
    gridTemplateColumns: '1fr',
  },
});

const MainContent = styled('div')({
  backgroundColor: '#fff',
  borderRadius: '8px',
  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
  border: '1px solid #e5e7eb',
  padding: '2rem',
  minHeight: '500px',
});

const Section = styled('div')({
  marginBottom: '2.5rem',
  '&:last-child': {
    marginBottom: 0,
  },
});

const SectionTitle = styled('h2')({
  fontSize: '1.5rem',
  fontWeight: '600',
  color: '#1f2937',
  margin: '0 0 1.5rem 0',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
});

const SubSectionTitle = styled('h3')({
  fontSize: '1.2rem',
  fontWeight: '600',
  color: '#1f2937',
  margin: '2rem 0 1rem 0',
  paddingBottom: '0.5rem',
  borderBottom: '2px solid #f3f4f6',
});

const EditButton = styled(Button)({
  color: '#ef7921',
  fontSize: '0.9rem',
  fontWeight: '500',
  '&:hover': {
    backgroundColor: 'rgba(239, 121, 33, 0.1)',
  },
});

const FormGrid = styled('div')({
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

const SaveButton = styled(Button)({
  backgroundColor: '#ef7921',
  color: 'white',
  fontWeight: '600',
  padding: '0.75rem 2rem',
  borderRadius: '6px',
  '&:hover': {
    backgroundColor: '#e06b15',
  },
});

const ProfileImage = styled('div')({
  display: 'flex',
  alignItems: 'center',
  marginBottom: '2rem',
  gap: '1.5rem',
});

const Avatar = styled('div')({
  width: '100px',
  height: '100px',
  borderRadius: '50%',
  overflow: 'hidden',
  position: 'relative',
  border: '3px solid #e5e7eb',
  '& img': {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
});

const UploadButton = styled(Button)({
  borderColor: '#d1d5db',
  color: '#374151',
  textTransform: 'none',
  fontSize: '0.9rem',
});

const RecentActivity = styled('div')({
  marginTop: '2rem',
});

const ActivityItem = styled('div')({
  display: 'flex',
  alignItems: 'center',
  padding: '1rem',
  border: '1px solid #e5e7eb',
  borderRadius: '6px',
  marginBottom: '1rem',
  '&:last-child': {
    marginBottom: 0,
  },
});

const ActivityIcon = styled('div')({
  width: '40px',
  height: '40px',
  borderRadius: '50%',
  backgroundColor: '#f3f4f6',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginRight: '1rem',
  color: '#ef7921',
});

const ActivityContent = styled('div')({
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

const ActivityTime = styled('span')({
  fontSize: '0.8rem',
  color: '#9ca3af',
});

const PasswordSection = styled('div')({
  marginTop: '2rem',
  padding: '1.5rem',
  backgroundColor: '#f9fafb',
  borderRadius: '8px',
  border: '1px solid #e5e7eb',
});

const MyAccount = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isUpdatingPassword, setIsUpdatingPassword] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { currentUser, login } = useAuth();
  
  // Determine active section based on current path or hash
  const getActiveSection = () => {
    if (location.pathname === '/wishlist') return 'wishlist';
    return 'profile'; // Default to profile
  };
  
  const [activeSection, setActiveSection] = useState(getActiveSection());
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState({});

  const handleSectionChange = (section) => {
    setActiveSection(section);
    if (section === 'wishlist') {
      navigate('/wishlist');
    } else {
      navigate('/my-account');
    }
  };

  // Initialize form data with user data
  useEffect(() => {
    if (currentUser) {
      setFormData({
        firstName: currentUser.name?.split(' ')[0] || '',
        lastName: currentUser.name?.split(' ').slice(1).join(' ') || '',
        email: currentUser.email || '',
        phone: currentUser.mobile || '',
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      });
    }
  }, [currentUser]);

  // Update active section when location changes
  useEffect(() => {
    setActiveSection(getActiveSection());
  }, [location]);

  const recentActivities = [
    {
      id: 1,
      type: 'order',
      title: 'Order Delivered',
      description: 'Your order #12345 has been delivered',
      time: '2 hours ago',
      icon: '📦',
    },
    {
      id: 2,
      type: 'wishlist',
      title: 'Item Back in Stock',
      description: 'Premium Watch is back in stock',
      time: '1 day ago',
      icon: '❤️',
    },
    {
      id: 3,
      type: 'account',
      title: 'Profile Updated',
      description: 'You updated your profile information',
      time: '3 days ago',
      icon: '👤',
    },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateProfileForm = () => {
    const newErrors = {};
    
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }
    
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validatePasswordForm = () => {
    const newErrors = {};
    
    if (!formData.currentPassword) {
      newErrors.currentPassword = 'Current password is required';
    }
    
    if (!formData.newPassword) {
      newErrors.newPassword = 'New password is required';
    } else if (formData.newPassword.length < 6) {
      newErrors.newPassword = 'Password must be at least 6 characters';
    }
    
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.newPassword !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSaveProfile = async () => {
    if (!validateProfileForm()) return;

    try {
      setIsSaving(true);
      
      const profileData = {
        name: `${formData.firstName} ${formData.lastName}`.trim(),
        mobile: formData.phone || null
      };

      const response = await userApi.updateProfile(profileData);
      
      toast.success('Profile updated successfully!');
      login(response.data); // Update user context with new data
      setIsEditing(false);
      
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error(error.message || 'Failed to update profile');
    } finally {
      setIsSaving(false);
    }
  };

  const handleUpdatePassword = async () => {
    if (!validatePasswordForm()) return;

    try {
      setIsUpdatingPassword(true);
      
      const passwordData = {
        currentPassword: formData.currentPassword,
        newPassword: formData.newPassword
      };

      await userApi.updatePassword(passwordData);
      
      toast.success('Password updated successfully!');
      
      // Clear password fields
      setFormData(prev => ({
        ...prev,
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      }));
      
      setErrors({});
      
    } catch (error) {
      console.error('Error updating password:', error);
      toast.error(error.message || 'Failed to update password');
    } finally {
      setIsUpdatingPassword(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      firstName: currentUser.name?.split(' ')[0] || '',
      lastName: currentUser.name?.split(' ').slice(1).join(' ') || '',
      email: currentUser.email || '',
      phone: currentUser.mobile || '',
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    });
    setIsEditing(false);
    setErrors({});
  };

  const handleAvatarUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    // Validate file type and size
    if (!file.type.startsWith('image/')) {
      toast.error('Please select an image file');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error('Image size must be less than 5MB');
      return;
    }

    try {
      setIsUploading(true);
      const response = await userApi.uploadAvatar(file);
      
      toast.success('Profile picture updated successfully!');
      login(response.data); // Update user context with new data
      
    } catch (error) {
      console.error('Error uploading avatar:', error);
      toast.error(error.message || 'Failed to upload profile picture');
    } finally {
      setIsUploading(false);
      // Reset file input
      event.target.value = '';
    }
  };

  const handleAvatarDelete = async () => {
    try {
      setIsUploading(true);
      const response = await userApi.deleteAvatar();
      
      toast.success('Profile picture removed successfully!');
      login(response.data); // Update user context with new data
      
    } catch (error) {
      console.error('Error deleting avatar:', error);
      toast.error(error.message || 'Failed to remove profile picture');
    } finally {
      setIsUploading(false);
    }
  };

  const renderProfileSection = () => (
    <>
      <ProfileImage>
        <Avatar>
          <img 
            src={currentUser?.avatar || '/src/assets/images/default-avatar.jpg'} 
            alt="Profile" 
            onError={(e) => {
              e.target.src = '/src/assets/images/default-avatar.jpg';
            }}
          />
          <input
            type="file"
            id="avatar-upload"
            accept="image/*"
            style={{ display: 'none' }}
            onChange={handleAvatarUpload}
            disabled={isUploading}
          />
          <label htmlFor="avatar-upload">
            <IconButton 
              component="span"
              style={{ 
                position: 'absolute', 
                bottom: '5px', 
                right: '5px', 
                backgroundColor: 'rgba(255,255,255,0.9)',
                width: '30px',
                height: '30px',
              }}
              disabled={isUploading}
            >
              <CameraAlt fontSize="small" />
            </IconButton>
          </label>
        </Avatar>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <label htmlFor="avatar-upload">
            <UploadButton 
              variant="outlined" 
              component="span" 
              startIcon={<AddAPhoto />}
              disabled={isUploading}
            >
              {isUploading ? 'Uploading...' : 'Change Photo'}
            </UploadButton>
          </label>
          {currentUser?.avatar && (
            <Button
              variant="outlined"
              color="error"
              startIcon={<Delete />}
              onClick={handleAvatarDelete}
              disabled={isUploading}
              size="small"
            >
              Remove Photo
            </Button>
          )}
        </div>
      </ProfileImage>

      <FormGrid>
        <InputField
          label="First Name"
          name="firstName"
          value={formData.firstName}
          onChange={handleInputChange}
          disabled={!isEditing}
          fullWidth
          error={!!errors.firstName}
          helperText={errors.firstName}
        />
        <InputField
          label="Last Name"
          name="lastName"
          value={formData.lastName}
          onChange={handleInputChange}
          disabled={!isEditing}
          fullWidth
          error={!!errors.lastName}
          helperText={errors.lastName}
        />
      </FormGrid>

      <InputField
        label="Email Address"
        name="email"
        type="email"
        value={formData.email}
        onChange={handleInputChange}
        disabled={true} // Email cannot be changed
        fullWidth
        error={!!errors.email}
        helperText={errors.email}
      />

      <InputField
        label="Phone Number"
        name="phone"
        value={formData.phone}
        onChange={handleInputChange}
        disabled={!isEditing}
        fullWidth
      />

      {isEditing && (
        <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
          <SaveButton 
            onClick={handleSaveProfile} 
            startIcon={isSaving ? <CircularProgress size={20} /> : <Save />}
            disabled={isSaving}
          >
            {isSaving ? 'Saving...' : 'Save Changes'}
          </SaveButton>
          <Button variant="outlined" onClick={handleCancel}>
            Cancel
          </Button>
        </div>
      )}

      {/* Password Update Section */}
      <PasswordSection>
        <SubSectionTitle>Update Password</SubSectionTitle>
        
        <InputField
          label="Current Password"
          name="currentPassword"
          type={showPassword ? 'text' : 'password'}
          value={formData.currentPassword}
          onChange={handleInputChange}
          fullWidth
          error={!!errors.currentPassword}
          helperText={errors.currentPassword}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowPassword(!showPassword)}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <InputField
          label="New Password"
          name="newPassword"
          type={showPassword ? 'text' : 'password'}
          value={formData.newPassword}
          onChange={handleInputChange}
          fullWidth
          error={!!errors.newPassword}
          helperText={errors.newPassword}
        />

        <InputField
          label="Confirm New Password"
          name="confirmPassword"
          type={showPassword ? 'text' : 'password'}
          value={formData.confirmPassword}
          onChange={handleInputChange}
          fullWidth
          error={!!errors.confirmPassword}
          helperText={errors.confirmPassword}
        />

        <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
          <SaveButton 
            onClick={handleUpdatePassword} 
            startIcon={isUpdatingPassword ? <CircularProgress size={20} /> : <Save />}
            disabled={isUpdatingPassword}
          >
            {isUpdatingPassword ? 'Updating...' : 'Update Password'}
          </SaveButton>
          <Button 
            variant="outlined" 
            onClick={() => {
              setFormData(prev => ({
                ...prev,
                currentPassword: '',
                newPassword: '',
                confirmPassword: ''
              }));
              setErrors({});
            }}
          >
            Clear
          </Button>
        </div>
      </PasswordSection>
    </>
  );

  return (
    <AccountContainer>
      <PageHeader>
        <h1>My Account</h1>
        <p>Manage your profile, security settings, and preferences</p>
      </PageHeader>

      <AccountContent>
        <AccountSidebar 
          activeSection={activeSection} 
          onSectionChange={handleSectionChange} 
        />

        <MainContent>
          {activeSection === 'profile' && (
            <Section>
              <SectionTitle>
                Profile Information
                {!isEditing && (
                  <EditButton 
                    startIcon={<Edit />} 
                    onClick={() => setIsEditing(true)}
                  >
                    Edit Profile
                  </EditButton>
                )}
              </SectionTitle>
              {renderProfileSection()}

              <RecentActivity>
                <SectionTitle>Recent Activity</SectionTitle>
                {recentActivities.map(activity => (
                  <ActivityItem key={activity.id}>
                    <ActivityIcon>{activity.icon}</ActivityIcon>
                    <ActivityContent>
                      <h4>{activity.title}</h4>
                      <p>{activity.description}</p>
                    </ActivityContent>
                    <ActivityTime>{activity.time}</ActivityTime>
                  </ActivityItem>
                ))}
              </RecentActivity>
            </Section>
          )}
        </MainContent>
      </AccountContent>
    </AccountContainer>
  );
};

export default MyAccount;
















































//  // Pages/MyAccount.js - Updated with real functionality
// import React, { useState, useEffect } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import { styled } from '@mui/material/styles';
// import Button from '@mui/material/Button';
// import TextField from '@mui/material/TextField';
// import IconButton from '@mui/material/IconButton';
// import InputAdornment from '@mui/material/InputAdornment';
// import CircularProgress from '@mui/material/CircularProgress';
// import { 
//   Visibility, 
//   VisibilityOff, 
//   Edit, 
//   Save, 
//   CameraAlt, 
//   Delete,
//   AddAPhoto 
// } from '@mui/icons-material';  
// import AccountSidebar from '../../components/AccountSidebar';
// import { useAuth } from '../../context/authContext'; 
// import { userApi } from '../../utils/userApi';
// import { toast } from 'react-toastify';

// // ... (keep all your existing styled components)


// // Styled components
// const AccountContainer = styled('div')({
//   maxWidth: '1200px',
//   margin: '0 auto',
//   padding: '2rem 1rem',
//   fontFamily: 'Arial, sans-serif',
// });

// const PageHeader = styled('div')({
//   marginBottom: '2rem',
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
//   gridTemplateColumns: '300px 1fr',
//   gap: '2rem',
//   '@media (max-width: 968px)': {
//     gridTemplateColumns: '1fr',
//   },
// });

// const MainContent = styled('div')({
//   backgroundColor: '#fff',
//   borderRadius: '8px',
//   boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
//   border: '1px solid #e5e7eb',
//   padding: '2rem',
//   minHeight: '500px',
// });

// const Section = styled('div')({
//   marginBottom: '2.5rem',
//   '&:last-child': {
//     marginBottom: 0,
//   },
// });

// const SectionTitle = styled('h2')({
//   fontSize: '1.5rem',
//   fontWeight: '600',
//   color: '#1f2937',
//   margin: '0 0 1.5rem 0',
//   display: 'flex',
//   alignItems: 'center',
//   justifyContent: 'space-between',
// });

// const EditButton = styled(Button)({
//   color: '#ef7921',
//   fontSize: '0.9rem',
//   fontWeight: '500',
//   '&:hover': {
//     backgroundColor: 'rgba(239, 121, 33, 0.1)',
//   },
// });

// const FormGrid = styled('div')({
//   display: 'grid',
//   gridTemplateColumns: '1fr 1fr',
//   gap: '1rem',
//   marginBottom: '1rem',
//   '@media (max-width: 768px)': {
//     gridTemplateColumns: '1fr',
//   },
// });

// const InputField = styled(TextField)({
//   marginBottom: '1rem',
//   '& .MuiOutlinedInput-root': {
//     borderRadius: '6px',
//   },
// });

// const SaveButton = styled(Button)({
//   backgroundColor: '#ef7921',
//   color: 'white',
//   fontWeight: '600',
//   padding: '0.75rem 2rem',
//   borderRadius: '6px',
//   '&:hover': {
//     backgroundColor: '#e06b15',
//   },
// });

// const ProfileImage = styled('div')({
//   display: 'flex',
//   alignItems: 'center',
//   marginBottom: '2rem',
//   gap: '1.5rem',
// });

// const Avatar = styled('div')({
//   width: '100px',
//   height: '100px',
//   borderRadius: '50%',
//   overflow: 'hidden',
//   position: 'relative',
//   border: '3px solid #e5e7eb',
//   '& img': {
//     width: '100%',
//     height: '100%',
//     objectFit: 'cover',
//   },
// });

// const UploadButton = styled(Button)({
//   borderColor: '#d1d5db',
//   color: '#374151',
//   textTransform: 'none',
//   fontSize: '0.9rem',
// });

// const RecentActivity = styled('div')({
//   marginTop: '2rem',
// });

// const ActivityItem = styled('div')({
//   display: 'flex',
//   alignItems: 'center',
//   padding: '1rem',
//   border: '1px solid #e5e7eb',
//   borderRadius: '6px',
//   marginBottom: '1rem',
//   '&:last-child': {
//     marginBottom: 0,
//   },
// });

// const ActivityIcon = styled('div')({
//   width: '40px',
//   height: '40px',
//   borderRadius: '50%',
//   backgroundColor: '#f3f4f6',
//   display: 'flex',
//   alignItems: 'center',
//   justifyContent: 'center',
//   marginRight: '1rem',
//   color: '#ef7921',
// });

// const ActivityContent = styled('div')({
//   flex: 1,
//   '& h4': {
//     margin: '0 0 0.25rem 0',
//     fontSize: '0.95rem',
//     fontWeight: '500',
//     color: '#1f2937',
//   },
//   '& p': {
//     margin: 0,
//     fontSize: '0.85rem',
//     color: '#6b7280',
//   },
// });

// const ActivityTime = styled('span')({
//   fontSize: '0.8rem',
//   color: '#9ca3af',
// });



// const MyAccount = () => {
//   const [isEditing, setIsEditing] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);
//   const [isUploading, setIsUploading] = useState(false);
//   const [isSaving, setIsSaving] = useState(false);
//   const location = useLocation();
//   const navigate = useNavigate();
//   const { currentUser, login } = useAuth();
  
//   // Determine active section based on current path or hash
//   const getActiveSection = () => {
//     if (location.hash === '#security') return 'password';
//     return 'profile'; // Default to profile
//   };
  
//   const [activeSection, setActiveSection] = useState(getActiveSection());
//   const [formData, setFormData] = useState({
//     firstName: '',
//     lastName: '',
//     email: '',
//     phone: '',
//     currentPassword: '',
//     newPassword: '',
//     confirmPassword: '',
//   });

//   const [errors, setErrors] = useState({});

//   const handleSectionChange = (section) => {
//     setActiveSection(section);
//     // Use hash navigation instead of full path change
//     if (section === 'password') {
//       navigate('/my-account#security');
//     } else {
//       navigate('/my-account');
//     }
//   };

//   // Initialize form data with user data
//   useEffect(() => {
//     if (currentUser) {
//       setFormData({
//         firstName: currentUser.name?.split(' ')[0] || '',
//         lastName: currentUser.name?.split(' ').slice(1).join(' ') || '',
//         email: currentUser.email || '',
//         phone: currentUser.mobile || '',
//         currentPassword: '',
//         newPassword: '',
//         confirmPassword: '',
//       });
//     }
//   }, [currentUser]);

//   // Update active section when location changes
//   useEffect(() => {
//     setActiveSection(getActiveSection());
//   }, [location]);

//   const recentActivities = [
//     {
//       id: 1,
//       type: 'order',
//       title: 'Order Delivered',
//       description: 'Your order #12345 has been delivered',
//       time: '2 hours ago',
//       icon: '📦',
//     },
//     {
//       id: 2,
//       type: 'wishlist',
//       title: 'Item Back in Stock',
//       description: 'Premium Watch is back in stock',
//       time: '1 day ago',
//       icon: '❤️',
//     },
//     {
//       id: 3,
//       type: 'account',
//       title: 'Profile Updated',
//       description: 'You updated your profile information',
//       time: '3 days ago',
//       icon: '👤',
//     },
//   ];

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: value
//     }));
//     // Clear error when user starts typing
//     if (errors[name]) {
//       setErrors(prev => ({
//         ...prev,
//         [name]: ''
//       }));
//     }
//   };

//   const validateProfileForm = () => {
//     const newErrors = {};
    
//     if (!formData.firstName.trim()) {
//       newErrors.firstName = 'First name is required';
//     }
    
//     if (!formData.lastName.trim()) {
//       newErrors.lastName = 'Last name is required';
//     }
    
//     if (!formData.email.trim()) {
//       newErrors.email = 'Email is required';
//     } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
//       newErrors.email = 'Email is invalid';
//     }
    
//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const validatePasswordForm = () => {
//     const newErrors = {};
    
//     if (!formData.currentPassword) {
//       newErrors.currentPassword = 'Current password is required';
//     }
    
//     if (!formData.newPassword) {
//       newErrors.newPassword = 'New password is required';
//     } else if (formData.newPassword.length < 6) {
//       newErrors.newPassword = 'Password must be at least 6 characters';
//     }
    
//     if (!formData.confirmPassword) {
//       newErrors.confirmPassword = 'Please confirm your password';
//     } else if (formData.newPassword !== formData.confirmPassword) {
//       newErrors.confirmPassword = 'Passwords do not match';
//     }
    
//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSaveProfile = async () => {
//     if (!validateProfileForm()) return;

//     try {
//       setIsSaving(true);
      
//       const profileData = {
//         name: `${formData.firstName} ${formData.lastName}`.trim(),
//         mobile: formData.phone || null
//       };

//       const response = await userApi.updateProfile(profileData);
      
//       toast.success('Profile updated successfully!');
//       login(response.data); // Update user context with new data
//       setIsEditing(false);
      
//     } catch (error) {
//       console.error('Error updating profile:', error);
//       toast.error(error.message || 'Failed to update profile');
//     } finally {
//       setIsSaving(false);
//     }
//   };

//   const handleUpdatePassword = async () => {
//     if (!validatePasswordForm()) return;

//     try {
//       setIsSaving(true);
      
//       const passwordData = {
//         currentPassword: formData.currentPassword,
//         newPassword: formData.newPassword
//       };

//       await userApi.updatePassword(passwordData);
      
//       toast.success('Password updated successfully!');
      
//       // Clear password fields
//       setFormData(prev => ({
//         ...prev,
//         currentPassword: '',
//         newPassword: '',
//         confirmPassword: ''
//       }));
      
//       setErrors({});
      
//     } catch (error) {
//       console.error('Error updating password:', error);
//       toast.error(error.message || 'Failed to update password');
//     } finally {
//       setIsSaving(false);
//     }
//   };

//   const handleCancel = () => {
//     setFormData({
//       firstName: currentUser.name?.split(' ')[0] || '',
//       lastName: currentUser.name?.split(' ').slice(1).join(' ') || '',
//       email: currentUser.email || '',
//       phone: currentUser.mobile || '',
//       currentPassword: '',
//       newPassword: '',
//       confirmPassword: '',
//     });
//     setIsEditing(false);
//     setErrors({});
//   };

//   const handleAvatarUpload = async (event) => {
//     const file = event.target.files[0];
//     if (!file) return;

//     // Validate file type and size
//     if (!file.type.startsWith('image/')) {
//       toast.error('Please select an image file');
//       return;
//     }

//     if (file.size > 5 * 1024 * 1024) {
//       toast.error('Image size must be less than 5MB');
//       return;
//     }

//     try {
//       setIsUploading(true);
//       const response = await userApi.uploadAvatar(file);
      
//       toast.success('Profile picture updated successfully!');
//       login(response.data); // Update user context with new data
      
//     } catch (error) {
//       console.error('Error uploading avatar:', error);
//       toast.error(error.message || 'Failed to upload profile picture');
//     } finally {
//       setIsUploading(false);
//       // Reset file input
//       event.target.value = '';
//     }
//   };

//   const handleAvatarDelete = async () => {
//     try {
//       setIsUploading(true);
//       const response = await userApi.deleteAvatar();
      
//       toast.success('Profile picture removed successfully!');
//       login(response.data); // Update user context with new data
      
//     } catch (error) {
//       console.error('Error deleting avatar:', error);
//       toast.error(error.message || 'Failed to remove profile picture');
//     } finally {
//       setIsUploading(false);
//     }
//   };

//   const renderProfileSection = () => (
//     <>
//       <ProfileImage>
//         <Avatar>
//           <img 
//             src={currentUser?.avatar || '/src/assets/images/default-avatar.jpg'} 
//             alt="Profile" 
//             onError={(e) => {
//               e.target.src = '/src/assets/images/default-avatar.jpg';
//             }}
//           />
//           <input
//             type="file"
//             id="avatar-upload"
//             accept="image/*"
//             style={{ display: 'none' }}
//             onChange={handleAvatarUpload}
//             disabled={isUploading}
//           />
//           <label htmlFor="avatar-upload">
//             <IconButton 
//               component="span"
//               style={{ 
//                 position: 'absolute', 
//                 bottom: '5px', 
//                 right: '5px', 
//                 backgroundColor: 'rgba(255,255,255,0.9)',
//                 width: '30px',
//                 height: '30px',
//               }}
//               disabled={isUploading}
//             >
//               <CameraAlt fontSize="small" />
//             </IconButton>
//           </label>
//         </Avatar>
//         <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
//           <label htmlFor="avatar-upload">
//             <UploadButton 
//               variant="outlined" 
//               component="span" 
//               startIcon={<AddAPhoto />}
//               disabled={isUploading}
//             >
//               {isUploading ? 'Uploading...' : 'Change Photo'}
//             </UploadButton>
//           </label>
//           {currentUser?.avatar && (
//             <Button
//               variant="outlined"
//               color="error"
//               startIcon={<Delete />}
//               onClick={handleAvatarDelete}
//               disabled={isUploading}
//               size="small"
//             >
//               Remove Photo
//             </Button>
//           )}
//         </div>
//       </ProfileImage>

//       <FormGrid>
//         <InputField
//           label="First Name"
//           name="firstName"
//           value={formData.firstName}
//           onChange={handleInputChange}
//           disabled={!isEditing}
//           fullWidth
//           error={!!errors.firstName}
//           helperText={errors.firstName}
//         />
//         <InputField
//           label="Last Name"
//           name="lastName"
//           value={formData.lastName}
//           onChange={handleInputChange}
//           disabled={!isEditing}
//           fullWidth
//           error={!!errors.lastName}
//           helperText={errors.lastName}
//         />
//       </FormGrid>

//       <InputField
//         label="Email Address"
//         name="email"
//         type="email"
//         value={formData.email}
//         onChange={handleInputChange}
//         disabled={true} // Email cannot be changed
//         fullWidth
//         error={!!errors.email}
//         helperText={errors.email}
//       />

//       <InputField
//         label="Phone Number"
//         name="phone"
//         value={formData.phone}
//         onChange={handleInputChange}
//         disabled={!isEditing}
//         fullWidth
//       />

//       {isEditing && (
//         <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
//           <SaveButton 
//             onClick={handleSaveProfile} 
//             startIcon={isSaving ? <CircularProgress size={20} /> : <Save />}
//             disabled={isSaving}
//           >
//             {isSaving ? 'Saving...' : 'Save Changes'}
//           </SaveButton>
//           <Button variant="outlined" onClick={handleCancel}>
//             Cancel
//           </Button>
//         </div>
//       )}
//     </>
//   );

//   const renderPasswordSection = () => (
//     <>
//       <InputField
//         label="Current Password"
//         name="currentPassword"
//         type={showPassword ? 'text' : 'password'}
//         value={formData.currentPassword}
//         onChange={handleInputChange}
//         fullWidth
//         error={!!errors.currentPassword}
//         helperText={errors.currentPassword}
//         InputProps={{
//           endAdornment: (
//             <InputAdornment position="end">
//               <IconButton
//                 onClick={() => setShowPassword(!showPassword)}
//                 edge="end"
//               >
//                 {showPassword ? <VisibilityOff /> : <Visibility />}
//               </IconButton>
//             </InputAdornment>
//           ),
//         }}
//       />

//       <InputField
//         label="New Password"
//         name="newPassword"
//         type={showPassword ? 'text' : 'password'}
//         value={formData.newPassword}
//         onChange={handleInputChange}
//         fullWidth
//         error={!!errors.newPassword}
//         helperText={errors.newPassword}
//       />

//       <InputField
//         label="Confirm New Password"
//         name="confirmPassword"
//         type={showPassword ? 'text' : 'password'}
//         value={formData.confirmPassword}
//         onChange={handleInputChange}
//         fullWidth
//         error={!!errors.confirmPassword}
//         helperText={errors.confirmPassword}
//       />

//       <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
//         <SaveButton 
//           onClick={handleUpdatePassword} 
//           startIcon={isSaving ? <CircularProgress size={20} /> : <Save />}
//           disabled={isSaving}
//         >
//           {isSaving ? 'Updating...' : 'Update Password'}
//         </SaveButton>
//         <Button 
//           variant="outlined" 
//           onClick={() => {
//             setFormData(prev => ({
//               ...prev,
//               currentPassword: '',
//               newPassword: '',
//               confirmPassword: ''
//             }));
//             setErrors({});
//           }}
//         >
//           Clear
//         </Button>
//       </div>
//     </>
//   );

//   return (
//     <AccountContainer>
//       <PageHeader>
//         <h1>My Account</h1>
//         <p>Manage your profile, security settings, and preferences</p>
//       </PageHeader>

//       <AccountContent>
//         <AccountSidebar 
//           activeSection={activeSection} 
//           onSectionChange={handleSectionChange} 
//         />

//         <MainContent>
//           {activeSection === 'profile' && (
//             <Section>
//               <SectionTitle>
//                 Profile Information
//                 {!isEditing && (
//                   <EditButton 
//                     startIcon={<Edit />} 
//                     onClick={() => setIsEditing(true)}
//                   >
//                     Edit Profile
//                   </EditButton>
//                 )}
//               </SectionTitle>
//               {renderProfileSection()}

//               <RecentActivity>
//                 <SectionTitle>Recent Activity</SectionTitle>
//                 {recentActivities.map(activity => (
//                   <ActivityItem key={activity.id}>
//                     <ActivityIcon>{activity.icon}</ActivityIcon>
//                     <ActivityContent>
//                       <h4>{activity.title}</h4>
//                       <p>{activity.description}</p>
//                     </ActivityContent>
//                     <ActivityTime>{activity.time}</ActivityTime>
//                   </ActivityItem>
//                 ))}
//               </RecentActivity>
//             </Section>
//           )}

//           {activeSection === 'password' && (
//             <Section>
//               <SectionTitle>Password & Security</SectionTitle>
//               {renderPasswordSection()}
//             </Section>
//           )}
//         </MainContent>
//       </AccountContent>
//     </AccountContainer>
//   );
// };

// export default MyAccount;














































































// // import React, { useState, useEffect } from 'react';
// // import { useLocation, useNavigate } from 'react-router-dom';
// // import { styled } from '@mui/material/styles';
// // import Button from '@mui/material/Button';
// // import TextField from '@mui/material/TextField';
// // import IconButton from '@mui/material/IconButton';
// // import InputAdornment from '@mui/material/InputAdornment';
// // import { 
// //   Visibility, 
// //   VisibilityOff, 
// //   Edit, 
// //   Save, 
// //   CameraAlt, 
// //   Delete,
// //   AddAPhoto 
// // } from '@mui/icons-material';  
// // import AccountSidebar from '../../components/AccountSidebar';
// // import { useAuth } from '../../context/authContext'; 
// // import { toast } from 'react-toastify';


// // // Styled components
// // const AccountContainer = styled('div')({
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

// // const AccountContent = styled('div')({
// //   display: 'grid',
// //   gridTemplateColumns: '300px 1fr',
// //   gap: '2rem',
// //   '@media (max-width: 968px)': {
// //     gridTemplateColumns: '1fr',
// //   },
// // });

// // const MainContent = styled('div')({
// //   backgroundColor: '#fff',
// //   borderRadius: '8px',
// //   boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
// //   border: '1px solid #e5e7eb',
// //   padding: '2rem',
// //   minHeight: '500px',
// // });

// // const Section = styled('div')({
// //   marginBottom: '2.5rem',
// //   '&:last-child': {
// //     marginBottom: 0,
// //   },
// // });

// // const SectionTitle = styled('h2')({
// //   fontSize: '1.5rem',
// //   fontWeight: '600',
// //   color: '#1f2937',
// //   margin: '0 0 1.5rem 0',
// //   display: 'flex',
// //   alignItems: 'center',
// //   justifyContent: 'space-between',
// // });

// // const EditButton = styled(Button)({
// //   color: '#ef7921',
// //   fontSize: '0.9rem',
// //   fontWeight: '500',
// //   '&:hover': {
// //     backgroundColor: 'rgba(239, 121, 33, 0.1)',
// //   },
// // });

// // const FormGrid = styled('div')({
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

// // const SaveButton = styled(Button)({
// //   backgroundColor: '#ef7921',
// //   color: 'white',
// //   fontWeight: '600',
// //   padding: '0.75rem 2rem',
// //   borderRadius: '6px',
// //   '&:hover': {
// //     backgroundColor: '#e06b15',
// //   },
// // });

// // const ProfileImage = styled('div')({
// //   display: 'flex',
// //   alignItems: 'center',
// //   marginBottom: '2rem',
// //   gap: '1.5rem',
// // });

// // const Avatar = styled('div')({
// //   width: '100px',
// //   height: '100px',
// //   borderRadius: '50%',
// //   overflow: 'hidden',
// //   position: 'relative',
// //   border: '3px solid #e5e7eb',
// //   '& img': {
// //     width: '100%',
// //     height: '100%',
// //     objectFit: 'cover',
// //   },
// // });

// // const UploadButton = styled(Button)({
// //   borderColor: '#d1d5db',
// //   color: '#374151',
// //   textTransform: 'none',
// //   fontSize: '0.9rem',
// // });

// // const RecentActivity = styled('div')({
// //   marginTop: '2rem',
// // });

// // const ActivityItem = styled('div')({
// //   display: 'flex',
// //   alignItems: 'center',
// //   padding: '1rem',
// //   border: '1px solid #e5e7eb',
// //   borderRadius: '6px',
// //   marginBottom: '1rem',
// //   '&:last-child': {
// //     marginBottom: 0,
// //   },
// // });

// // const ActivityIcon = styled('div')({
// //   width: '40px',
// //   height: '40px',
// //   borderRadius: '50%',
// //   backgroundColor: '#f3f4f6',
// //   display: 'flex',
// //   alignItems: 'center',
// //   justifyContent: 'center',
// //   marginRight: '1rem',
// //   color: '#ef7921',
// // });

// // const ActivityContent = styled('div')({
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

// // const ActivityTime = styled('span')({
// //   fontSize: '0.8rem',
// //   color: '#9ca3af',
// // });


// // const MyAccount = () => {
// //   const [isEditing, setIsEditing] = useState(false);
// //   const [showPassword, setShowPassword] = useState(false);
// //   const [isUploading, setIsUploading] = useState(false);
// //   const location = useLocation();
// //   const navigate = useNavigate();
// //   const { currentUser, login } = useAuth();
  
// //   // Determine active section based on current path or hash
// //   const getActiveSection = () => {
// //     if (location.hash === '#security') return 'password';
// //     return 'profile'; // Default to profile
// //   };
  
// //   const [activeSection, setActiveSection] = useState(getActiveSection());
// //   const [formData, setFormData] = useState({
// //     firstName: '',
// //     lastName: '',
// //     email: '',
// //     phone: '',
// //     currentPassword: '',
// //     newPassword: '',
// //     confirmPassword: '',
// //   });


// //   const handleSectionChange = (section) => {
// //     setActiveSection(section);
// //     // Use hash navigation instead of full path change
// //     if (section === 'password') {
// //       navigate('/my-account#security');
// //     } else {
// //       navigate('/my-account');
// //     }
// //   };

// //   // Initialize form data with user data
// //   useEffect(() => {
// //     if (currentUser) {
// //       setFormData({
// //         firstName: currentUser.name?.split(' ')[0] || '',
// //         lastName: currentUser.name?.split(' ').slice(1).join(' ') || '',
// //         email: currentUser.email || '',
// //         phone: currentUser.mobile || '',
// //         currentPassword: '',
// //         newPassword: '',
// //         confirmPassword: '',
// //       });
// //     }
// //   }, [currentUser]);

// //   // Update active section when location changes
// //   useEffect(() => {
// //     setActiveSection(getActiveSection());
// //   }, [location]);

// //   const recentActivities = [
// //     {
// //       id: 1,
// //       type: 'order',
// //       title: 'Order Delivered',
// //       description: 'Your order #12345 has been delivered',
// //       time: '2 hours ago',
// //       icon: '📦',
// //     },
// //     {
// //       id: 2,
// //       type: 'wishlist',
// //       title: 'Item Back in Stock',
// //       description: 'Premium Watch is back in stock',
// //       time: '1 day ago',
// //       icon: '❤️',
// //     },
// //     {
// //       id: 3,
// //       type: 'account',
// //       title: 'Profile Updated',
// //       description: 'You updated your profile information',
// //       time: '3 days ago',
// //       icon: '👤',
// //     },
// //   ];

// //   const handleInputChange = (e) => {
// //     const { name, value } = e.target;
// //     setFormData(prev => ({
// //       ...prev,
// //       [name]: value
// //     }));
// //   };

// //   const handleSave = () => {
// //     // Simulate save operation
// //     console.log('Saving data:', formData);
// //     setIsEditing(false);
// //   };

// //   const handleCancel = () => {
// //     setFormData({
// //       firstName: currentUser.name?.split(' ')[0] || '',
// //       lastName: currentUser.name?.split(' ').slice(1).join(' ') || '',
// //       email: currentUser.email || '',
// //       phone: currentUser.mobile || '',
// //       currentPassword: '',
// //       newPassword: '',
// //       confirmPassword: '',
// //     });
// //     setIsEditing(false);
// //   };

  
// //   const renderProfileSection = () => (
// //     <>
// //       <ProfileImage>
// //         <Avatar>
// //           <img 
// //             src={currentUser?.avatar || '/src/assets/images/default-avatar.jpg'} 
// //             alt="Profile" 
// //             onError={(e) => {
// //               e.target.src = '/src/assets/images/default-avatar.jpg';
// //             }}
// //           />
// //           <input
// //             type="file"
// //             id="avatar-upload"
// //             accept="image/*"
// //             style={{ display: 'none' }}
// //             // onChange={handleAvatarUpload}
// //             disabled={isUploading}
// //           />
// //           <label htmlFor="avatar-upload">
// //             <IconButton 
// //               component="span"
// //               style={{ 
// //                 position: 'absolute', 
// //                 bottom: '5px', 
// //                 right: '5px', 
// //                 backgroundColor: 'rgba(255,255,255,0.9)',
// //                 width: '30px',
// //                 height: '30px',
// //               }}
// //               disabled={isUploading}
// //             >
// //               <CameraAlt fontSize="small" />
// //             </IconButton>
// //           </label>
// //         </Avatar>
// //         <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
// //           <label htmlFor="avatar-upload">
// //             <UploadButton 
// //               variant="outlined" 
// //               component="span" 
// //               startIcon={<AddAPhoto />}
// //               disabled={isUploading}
// //             >
// //               {isUploading ? 'Uploading...' : 'Change Photo'}
// //             </UploadButton>
// //           </label>
// //           {currentUser?.avatar && (
// //             <Button
// //               variant="outlined"
// //               color="error"
// //               startIcon={<Delete />}
// //               onClick={handleAvatarDelete}
// //               disabled={isUploading}
// //               size="small"
// //             >
// //               Remove Photo
// //             </Button>
// //           )}
// //         </div>
// //       </ProfileImage>


// //       <FormGrid>
// //         <InputField
// //           label="First Name"
// //           name="firstName"
// //           value={formData.firstName}
// //           onChange={handleInputChange}
// //           disabled={!isEditing}
// //           fullWidth
// //         />
// //         <InputField
// //           label="Last Name"
// //           name="lastName"
// //           value={formData.lastName}
// //           onChange={handleInputChange}
// //           disabled={!isEditing}
// //           fullWidth
// //         />
// //       </FormGrid>

// //       <InputField
// //         label="Email Address"
// //         name="email"
// //         type="email"
// //         value={formData.email}
// //         onChange={handleInputChange}
// //         disabled={!isEditing}
// //         fullWidth
// //       />

// //       <InputField
// //         label="Phone Number"
// //         name="phone"
// //         value={formData.phone}
// //         onChange={handleInputChange}
// //         disabled={!isEditing}
// //         fullWidth
// //       />

// //       {isEditing && (
// //         <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
// //           <SaveButton onClick={handleSave} startIcon={<Save />}>
// //             Save Changes
// //           </SaveButton>
// //           <Button variant="outlined" onClick={handleCancel}>
// //             Cancel
// //           </Button>
// //         </div>
// //       )}
// //     </>
// //   );

// //   // ... rest of your component remains the same
// //   return (
// //     <AccountContainer>
// //       <PageHeader>
// //         <h1>My Account</h1>
// //         <p>Manage your profile, security settings, and preferences</p>
// //       </PageHeader>

// //       <AccountContent>
// //         {/* Use the reusable sidebar component */}
// //         <AccountSidebar 
// //           activeSection={activeSection} 
// //           onSectionChange={handleSectionChange} 
// //         />

// //         {/* Main Content */}
// //         <MainContent>
// //           {activeSection === 'profile' && (
// //             <Section>
// //               <SectionTitle>
// //                 Profile Information
// //                 {!isEditing && (
// //                   <EditButton 
// //                     startIcon={<Edit />} 
// //                     onClick={() => setIsEditing(true)}
// //                   >
// //                     Edit Profile
// //                   </EditButton>
// //                 )}
// //               </SectionTitle>
// //               {renderProfileSection()}

// //               {/* Recent Activity Section */}
// //               <RecentActivity>
// //                 <SectionTitle>Recent Activity</SectionTitle>
// //                 {recentActivities.map(activity => (
// //                   <ActivityItem key={activity.id}>
// //                     <ActivityIcon>{activity.icon}</ActivityIcon>
// //                     <ActivityContent>
// //                       <h4>{activity.title}</h4>
// //                       <p>{activity.description}</p>
// //                     </ActivityContent>
// //                     <ActivityTime>{activity.time}</ActivityTime>
// //                   </ActivityItem>
// //                 ))}
// //               </RecentActivity>
// //             </Section>
// //           )}

// //           {activeSection === 'password' && (
// //             <Section>
// //               <SectionTitle>Password & Security</SectionTitle>
// //               {renderPasswordSection()}
// //             </Section>
// //           )}
// //         </MainContent>
// //       </AccountContent>
// //     </AccountContainer>
// //   );
// // };

// // export default MyAccount;












































// // import React, { useState, useEffect } from 'react';
// // import { useLocation, useNavigate } from 'react-router-dom';
// // import { styled } from '@mui/material/styles';
// // import Button from '@mui/material/Button';
// // import TextField from '@mui/material/TextField';
// // import IconButton from '@mui/material/IconButton';
// // import InputAdornment from '@mui/material/InputAdornment';
// // import { Visibility, VisibilityOff, Edit, Save, CameraAlt } from '@mui/icons-material';  
// // import AccountSidebar from '../../components/AccountSidebar';

// // // Styled components
// // const AccountContainer = styled('div')({
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

// // const AccountContent = styled('div')({
// //   display: 'grid',
// //   gridTemplateColumns: '300px 1fr',
// //   gap: '2rem',
// //   '@media (max-width: 968px)': {
// //     gridTemplateColumns: '1fr',
// //   },
// // });

// // const MainContent = styled('div')({
// //   backgroundColor: '#fff',
// //   borderRadius: '8px',
// //   boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
// //   border: '1px solid #e5e7eb',
// //   padding: '2rem',
// //   minHeight: '500px',
// // });

// // const Section = styled('div')({
// //   marginBottom: '2.5rem',
// //   '&:last-child': {
// //     marginBottom: 0,
// //   },
// // });

// // const SectionTitle = styled('h2')({
// //   fontSize: '1.5rem',
// //   fontWeight: '600',
// //   color: '#1f2937',
// //   margin: '0 0 1.5rem 0',
// //   display: 'flex',
// //   alignItems: 'center',
// //   justifyContent: 'space-between',
// // });

// // const EditButton = styled(Button)({
// //   color: '#ef7921',
// //   fontSize: '0.9rem',
// //   fontWeight: '500',
// //   '&:hover': {
// //     backgroundColor: 'rgba(239, 121, 33, 0.1)',
// //   },
// // });

// // const FormGrid = styled('div')({
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

// // const SaveButton = styled(Button)({
// //   backgroundColor: '#ef7921',
// //   color: 'white',
// //   fontWeight: '600',
// //   padding: '0.75rem 2rem',
// //   borderRadius: '6px',
// //   '&:hover': {
// //     backgroundColor: '#e06b15',
// //   },
// // });

// // const ProfileImage = styled('div')({
// //   display: 'flex',
// //   alignItems: 'center',
// //   marginBottom: '2rem',
// //   gap: '1.5rem',
// // });

// // const Avatar = styled('div')({
// //   width: '100px',
// //   height: '100px',
// //   borderRadius: '50%',
// //   overflow: 'hidden',
// //   position: 'relative',
// //   border: '3px solid #e5e7eb',
// //   '& img': {
// //     width: '100%',
// //     height: '100%',
// //     objectFit: 'cover',
// //   },
// // });

// // const UploadButton = styled(Button)({
// //   borderColor: '#d1d5db',
// //   color: '#374151',
// //   textTransform: 'none',
// //   fontSize: '0.9rem',
// // });

// // const RecentActivity = styled('div')({
// //   marginTop: '2rem',
// // });

// // const ActivityItem = styled('div')({
// //   display: 'flex',
// //   alignItems: 'center',
// //   padding: '1rem',
// //   border: '1px solid #e5e7eb',
// //   borderRadius: '6px',
// //   marginBottom: '1rem',
// //   '&:last-child': {
// //     marginBottom: 0,
// //   },
// // });

// // const ActivityIcon = styled('div')({
// //   width: '40px',
// //   height: '40px',
// //   borderRadius: '50%',
// //   backgroundColor: '#f3f4f6',
// //   display: 'flex',
// //   alignItems: 'center',
// //   justifyContent: 'center',
// //   marginRight: '1rem',
// //   color: '#ef7921',
// // });

// // const ActivityContent = styled('div')({
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

// // const ActivityTime = styled('span')({
// //   fontSize: '0.8rem',
// //   color: '#9ca3af',
// // });

// // const MyAccount = () => {
// //   const [isEditing, setIsEditing] = useState(false);
// //   const [showPassword, setShowPassword] = useState(false);
// //   const location = useLocation();
// //   const navigate = useNavigate();
  
// //   // Determine active section based on current path or hash
// //   const getActiveSection = () => {
// //     if (location.hash === '#security') return 'password';
// //     return 'profile'; // Default to profile
// //   };
  
// //   const [activeSection, setActiveSection] = useState(getActiveSection());

// //   // Update active section when location changes
// //   useEffect(() => {
// //     setActiveSection(getActiveSection());
// //   }, [location]);

// //   const userData = {
// //     firstName: 'Idoga',
// //     lastName: 'Emmanuel',
// //     email: 'siremms300@gmail.com',
// //     phone: '+1 (234) 567-8900',
// //     joinDate: 'January 15, 2023',
// //     avatar: '/src/assets/images/user-avatar.jpg',
// //   };

// //   const [formData, setFormData] = useState({
// //     firstName: userData.firstName,
// //     lastName: userData.lastName,
// //     email: userData.email,
// //     phone: userData.phone,
// //     currentPassword: '',
// //     newPassword: '',
// //     confirmPassword: '',
// //   });

// //   const recentActivities = [
// //     {
// //       id: 1,
// //       type: 'order',
// //       title: 'Order Delivered',
// //       description: 'Your order #12345 has been delivered',
// //       time: '2 hours ago',
// //       icon: '📦',
// //     },
// //     {
// //       id: 2,
// //       type: 'wishlist',
// //       title: 'Item Back in Stock',
// //       description: 'Premium Watch is back in stock',
// //       time: '1 day ago',
// //       icon: '❤️',
// //     },
// //     {
// //       id: 3,
// //       type: 'account',
// //       title: 'Profile Updated',
// //       description: 'You updated your profile information',
// //       time: '3 days ago',
// //       icon: '👤',
// //     },
// //   ];

// //   const handleInputChange = (e) => {
// //     const { name, value } = e.target;
// //     setFormData(prev => ({
// //       ...prev,
// //       [name]: value
// //     }));
// //   };

// //   const handleSave = () => {
// //     // Simulate save operation
// //     console.log('Saving data:', formData);
// //     setIsEditing(false);
// //   };

// //   const handleCancel = () => {
// //     setFormData({
// //       firstName: userData.firstName,
// //       lastName: userData.lastName,
// //       email: userData.email,
// //       phone: userData.phone,
// //       currentPassword: '',
// //       newPassword: '',
// //       confirmPassword: '',
// //     });
// //     setIsEditing(false);
// //   };

// //   const handleSectionChange = (section) => {
// //     setActiveSection(section);
// //     // Use hash navigation instead of full path change
// //     if (section === 'password') {
// //       navigate('/my-account#security');
// //     } else {
// //       navigate('/my-account');
// //     }
// //   };

// //   const renderProfileSection = () => (
// //     <>
// //       <ProfileImage>
// //         <Avatar>
// //           <img src={userData.avatar || '/src/assets/images/default-avatar.jpg'} alt="Profile" />
// //           <IconButton 
// //             style={{ 
// //               position: 'absolute', 
// //               bottom: '5px', 
// //               right: '5px', 
// //               backgroundColor: 'rgba(255,255,255,0.9)',
// //               width: '30px',
// //               height: '30px',
// //             }}
// //           >
// //             <CameraAlt fontSize="small" />
// //           </IconButton>
// //         </Avatar>
// //         <UploadButton variant="outlined" startIcon={<CameraAlt />}>
// //           Change Photo
// //         </UploadButton>
// //       </ProfileImage>

// //       <FormGrid>
// //         <InputField
// //           label="First Name"
// //           name="firstName"
// //           value={formData.firstName}
// //           onChange={handleInputChange}
// //           disabled={!isEditing}
// //           fullWidth
// //         />
// //         <InputField
// //           label="Last Name"
// //           name="lastName"
// //           value={formData.lastName}
// //           onChange={handleInputChange}
// //           disabled={!isEditing}
// //           fullWidth
// //         />
// //       </FormGrid>

// //       <InputField
// //         label="Email Address"
// //         name="email"
// //         type="email"
// //         value={formData.email}
// //         onChange={handleInputChange}
// //         disabled={!isEditing}
// //         fullWidth
// //       />

// //       <InputField
// //         label="Phone Number"
// //         name="phone"
// //         value={formData.phone}
// //         onChange={handleInputChange}
// //         disabled={!isEditing}
// //         fullWidth
// //       />

// //       {isEditing && (
// //         <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
// //           <SaveButton onClick={handleSave} startIcon={<Save />}>
// //             Save Changes
// //           </SaveButton>
// //           <Button variant="outlined" onClick={handleCancel}>
// //             Cancel
// //           </Button>
// //         </div>
// //       )}
// //     </>
// //   );

// //   const renderPasswordSection = () => (
// //     <>
// //       <InputField
// //         label="Current Password"
// //         name="currentPassword"
// //         type={showPassword ? 'text' : 'password'}
// //         value={formData.currentPassword}
// //         onChange={handleInputChange}
// //         fullWidth
// //         InputProps={{
// //           endAdornment: (
// //             <InputAdornment position="end">
// //               <IconButton onClick={() => setShowPassword(!showPassword)}>
// //                 {showPassword ? <VisibilityOff /> : <Visibility />}
// //               </IconButton>
// //             </InputAdornment>
// //           ),
// //         }}
// //       />

// //       <InputField
// //         label="New Password"
// //         name="newPassword"
// //         type={showPassword ? 'text' : 'password'}
// //         value={formData.newPassword}
// //         onChange={handleInputChange}
// //         fullWidth
// //       />

// //       <InputField
// //         label="Confirm New Password"
// //         name="confirmPassword"
// //         type={showPassword ? 'text' : 'password'}
// //         value={formData.confirmPassword}
// //         onChange={handleInputChange}
// //         fullWidth
// //       />

// //       <SaveButton style={{ marginTop: '1rem' }} startIcon={<Save />}>
// //         Update Password
// //       </SaveButton>
// //     </>
// //   );

// //   return (
// //     <AccountContainer>
// //       <PageHeader>
// //         <h1>My Account</h1>
// //         <p>Manage your profile, security settings, and preferences</p>
// //       </PageHeader>

// //       <AccountContent>
// //         {/* Use the reusable sidebar component */}
// //         <AccountSidebar 
// //           activeSection={activeSection} 
// //           onSectionChange={handleSectionChange} 
// //         />

// //         {/* Main Content */}
// //         <MainContent>
// //           {activeSection === 'profile' && (
// //             <Section>
// //               <SectionTitle>
// //                 Profile Information
// //                 {!isEditing && (
// //                   <EditButton 
// //                     startIcon={<Edit />} 
// //                     onClick={() => setIsEditing(true)}
// //                   >
// //                     Edit Profile
// //                   </EditButton>
// //                 )}
// //               </SectionTitle>
// //               {renderProfileSection()}

// //               {/* Recent Activity Section */}
// //               <RecentActivity>
// //                 <SectionTitle>Recent Activity</SectionTitle>
// //                 {recentActivities.map(activity => (
// //                   <ActivityItem key={activity.id}>
// //                     <ActivityIcon>{activity.icon}</ActivityIcon>
// //                     <ActivityContent>
// //                       <h4>{activity.title}</h4>
// //                       <p>{activity.description}</p>
// //                     </ActivityContent>
// //                     <ActivityTime>{activity.time}</ActivityTime>
// //                   </ActivityItem>
// //                 ))}
// //               </RecentActivity>
// //             </Section>
// //           )}

// //           {activeSection === 'password' && (
// //             <Section>
// //               <SectionTitle>Password & Security</SectionTitle>
// //               {renderPasswordSection()}
// //             </Section>
// //           )}
// //         </MainContent>
// //       </AccountContent>
// //     </AccountContainer>
// //   );
// // };

// // export default MyAccount;




































