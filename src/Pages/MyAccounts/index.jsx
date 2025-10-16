import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import { Visibility, VisibilityOff, Edit, Save, CameraAlt } from '@mui/icons-material';  
import AccountSidebar from '../../components/AccountSidebar';

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

const MyAccount = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  
  // Determine active section based on current path or hash
  const getActiveSection = () => {
    if (location.hash === '#security') return 'password';
    return 'profile'; // Default to profile
  };
  
  const [activeSection, setActiveSection] = useState(getActiveSection());

  // Update active section when location changes
  useEffect(() => {
    setActiveSection(getActiveSection());
  }, [location]);

  const userData = {
    firstName: 'Idoga',
    lastName: 'Emmanuel',
    email: 'siremms300@gmail.com',
    phone: '+1 (234) 567-8900',
    joinDate: 'January 15, 2023',
    avatar: '/src/assets/images/user-avatar.jpg',
  };

  const [formData, setFormData] = useState({
    firstName: userData.firstName,
    lastName: userData.lastName,
    email: userData.email,
    phone: userData.phone,
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

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
  };

  const handleSave = () => {
    // Simulate save operation
    console.log('Saving data:', formData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData({
      firstName: userData.firstName,
      lastName: userData.lastName,
      email: userData.email,
      phone: userData.phone,
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    });
    setIsEditing(false);
  };

  const handleSectionChange = (section) => {
    setActiveSection(section);
    // Use hash navigation instead of full path change
    if (section === 'password') {
      navigate('/my-account#security');
    } else {
      navigate('/my-account');
    }
  };

  const renderProfileSection = () => (
    <>
      <ProfileImage>
        <Avatar>
          <img src={userData.avatar || '/src/assets/images/default-avatar.jpg'} alt="Profile" />
          <IconButton 
            style={{ 
              position: 'absolute', 
              bottom: '5px', 
              right: '5px', 
              backgroundColor: 'rgba(255,255,255,0.9)',
              width: '30px',
              height: '30px',
            }}
          >
            <CameraAlt fontSize="small" />
          </IconButton>
        </Avatar>
        <UploadButton variant="outlined" startIcon={<CameraAlt />}>
          Change Photo
        </UploadButton>
      </ProfileImage>

      <FormGrid>
        <InputField
          label="First Name"
          name="firstName"
          value={formData.firstName}
          onChange={handleInputChange}
          disabled={!isEditing}
          fullWidth
        />
        <InputField
          label="Last Name"
          name="lastName"
          value={formData.lastName}
          onChange={handleInputChange}
          disabled={!isEditing}
          fullWidth
        />
      </FormGrid>

      <InputField
        label="Email Address"
        name="email"
        type="email"
        value={formData.email}
        onChange={handleInputChange}
        disabled={!isEditing}
        fullWidth
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
          <SaveButton onClick={handleSave} startIcon={<Save />}>
            Save Changes
          </SaveButton>
          <Button variant="outlined" onClick={handleCancel}>
            Cancel
          </Button>
        </div>
      )}
    </>
  );

  const renderPasswordSection = () => (
    <>
      <InputField
        label="Current Password"
        name="currentPassword"
        type={showPassword ? 'text' : 'password'}
        value={formData.currentPassword}
        onChange={handleInputChange}
        fullWidth
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={() => setShowPassword(!showPassword)}>
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
      />

      <InputField
        label="Confirm New Password"
        name="confirmPassword"
        type={showPassword ? 'text' : 'password'}
        value={formData.confirmPassword}
        onChange={handleInputChange}
        fullWidth
      />

      <SaveButton style={{ marginTop: '1rem' }} startIcon={<Save />}>
        Update Password
      </SaveButton>
    </>
  );

  return (
    <AccountContainer>
      <PageHeader>
        <h1>My Account</h1>
        <p>Manage your profile, security settings, and preferences</p>
      </PageHeader>

      <AccountContent>
        {/* Use the reusable sidebar component */}
        <AccountSidebar 
          activeSection={activeSection} 
          onSectionChange={handleSectionChange} 
        />

        {/* Main Content */}
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

              {/* Recent Activity Section */}
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

          {activeSection === 'password' && (
            <Section>
              <SectionTitle>Password & Security</SectionTitle>
              {renderPasswordSection()}
            </Section>
          )}
        </MainContent>
      </AccountContent>
    </AccountContainer>
  );
};

export default MyAccount;






































// import React, { useState, useEffect } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import { styled } from '@mui/material/styles';
// import Button from '@mui/material/Button';
// import TextField from '@mui/material/TextField';
// import IconButton from '@mui/material/IconButton';
// import InputAdornment from '@mui/material/InputAdornment';
// import { Visibility, VisibilityOff, Edit, Save, CameraAlt } from '@mui/icons-material';  
// import AccountSidebar from '../../components/AccountSidebar';

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
//   const location = useLocation();
//   const navigate = useNavigate();
  
//   // Determine active section based on current path or hash
//   const getActiveSection = () => {
//     if (location.hash === '#security') return 'password';
//     return 'profile'; // Default to profile
//   };
  
//   const [activeSection, setActiveSection] = useState(getActiveSection());

//   // Update active section when location changes
//   useEffect(() => {
//     setActiveSection(getActiveSection());
//   }, [location]);

//   const userData = {
//     firstName: 'Idoga',
//     lastName: 'Emmanuel',
//     email: 'siremms300@gmail.com',
//     phone: '+1 (234) 567-8900',
//     joinDate: 'January 15, 2023',
//     avatar: '/src/assets/images/user-avatar.jpg',
//   };

//   const [formData, setFormData] = useState({
//     firstName: userData.firstName,
//     lastName: userData.lastName,
//     email: userData.email,
//     phone: userData.phone,
//     currentPassword: '',
//     newPassword: '',
//     confirmPassword: '',
//   });

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
//   };

//   const handleSave = () => {
//     // Simulate save operation
//     console.log('Saving data:', formData);
//     setIsEditing(false);
//   };

//   const handleCancel = () => {
//     setFormData({
//       firstName: userData.firstName,
//       lastName: userData.lastName,
//       email: userData.email,
//       phone: userData.phone,
//       currentPassword: '',
//       newPassword: '',
//       confirmPassword: '',
//     });
//     setIsEditing(false);
//   };

//   const handleSectionChange = (section) => {
//     setActiveSection(section);
//     // Use hash navigation instead of full path change
//     if (section === 'password') {
//       navigate('/my-account#security');
//     } else {
//       navigate('/my-account');
//     }
//   };

//   const renderProfileSection = () => (
//     <>
//       <ProfileImage>
//         <Avatar>
//           <img src={userData.avatar || '/src/assets/images/default-avatar.jpg'} alt="Profile" />
//           <IconButton 
//             style={{ 
//               position: 'absolute', 
//               bottom: '5px', 
//               right: '5px', 
//               backgroundColor: 'rgba(255,255,255,0.9)',
//               width: '30px',
//               height: '30px',
//             }}
//           >
//             <CameraAlt fontSize="small" />
//           </IconButton>
//         </Avatar>
//         <UploadButton variant="outlined" startIcon={<CameraAlt />}>
//           Change Photo
//         </UploadButton>
//       </ProfileImage>

//       <FormGrid>
//         <InputField
//           label="First Name"
//           name="firstName"
//           value={formData.firstName}
//           onChange={handleInputChange}
//           disabled={!isEditing}
//           fullWidth
//         />
//         <InputField
//           label="Last Name"
//           name="lastName"
//           value={formData.lastName}
//           onChange={handleInputChange}
//           disabled={!isEditing}
//           fullWidth
//         />
//       </FormGrid>

//       <InputField
//         label="Email Address"
//         name="email"
//         type="email"
//         value={formData.email}
//         onChange={handleInputChange}
//         disabled={!isEditing}
//         fullWidth
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
//           <SaveButton onClick={handleSave} startIcon={<Save />}>
//             Save Changes
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
//         InputProps={{
//           endAdornment: (
//             <InputAdornment position="end">
//               <IconButton onClick={() => setShowPassword(!showPassword)}>
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
//       />

//       <InputField
//         label="Confirm New Password"
//         name="confirmPassword"
//         type={showPassword ? 'text' : 'password'}
//         value={formData.confirmPassword}
//         onChange={handleInputChange}
//         fullWidth
//       />

//       <SaveButton style={{ marginTop: '1rem' }} startIcon={<Save />}>
//         Update Password
//       </SaveButton>
//     </>
//   );

//   return (
//     <AccountContainer>
//       <PageHeader>
//         <h1>My Account</h1>
//         <p>Manage your profile, security settings, and preferences</p>
//       </PageHeader>

//       <AccountContent>
//         {/* Use the reusable sidebar component */}
//         <AccountSidebar 
//           activeSection={activeSection} 
//           onSectionChange={handleSectionChange} 
//         />

//         {/* Main Content */}
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

//               {/* Recent Activity Section */}
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

























































// import React, { useState, useEffect } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import { styled } from '@mui/material/styles';
// import Button from '@mui/material/Button';
// import TextField from '@mui/material/TextField';
// import IconButton from '@mui/material/IconButton';
// import InputAdornment from '@mui/material/InputAdornment';
// import { Visibility, VisibilityOff, Edit, Save, CameraAlt } from '@mui/icons-material';  
// import AccountSidebar from '../../components/AccountSidebar';

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
//   const location = useLocation();
//   const navigate = useNavigate();
  
//   // Determine active section based on current path or hash
//   const getActiveSection = () => {
//     if (location.hash === '#security') return 'password';
//     return 'profile'; // Default to profile
//   };
  
//   const [activeSection, setActiveSection] = useState(getActiveSection());

//   // Update active section when location changes
//   useEffect(() => {
//     setActiveSection(getActiveSection());
//   }, [location]);

//   const userData = {
//     firstName: 'Idoga',
//     lastName: 'Emmanuel',
//     email: 'siremms300@gmail.com',
//     phone: '+1 (234) 567-8900',
//     joinDate: 'January 15, 2023',
//     avatar: '/src/assets/images/user-avatar.jpg',
//   };

//   const [formData, setFormData] = useState({
//     firstName: userData.firstName,
//     lastName: userData.lastName,
//     email: userData.email,
//     phone: userData.phone,
//     currentPassword: '',
//     newPassword: '',
//     confirmPassword: '',
//   });

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
//   };

//   const handleSave = () => {
//     // Simulate save operation
//     console.log('Saving data:', formData);
//     setIsEditing(false);
//   };

//   const handleCancel = () => {
//     setFormData({
//       firstName: userData.firstName,
//       lastName: userData.lastName,
//       email: userData.email,
//       phone: userData.phone,
//       currentPassword: '',
//       newPassword: '',
//       confirmPassword: '',
//     });
//     setIsEditing(false);
//   };

//   const handleSectionChange = (section) => {
//     setActiveSection(section);
//     // Use hash navigation instead of full path change
//     if (section === 'password') {
//       navigate('/my-account#security');
//     } else {
//       navigate('/my-account');
//     }
//   };

//   const renderProfileSection = () => (
//     <>
//       <ProfileImage>
//         <Avatar>
//           <img src={userData.avatar || '/src/assets/images/default-avatar.jpg'} alt="Profile" />
//           <IconButton 
//             style={{ 
//               position: 'absolute', 
//               bottom: '5px', 
//               right: '5px', 
//               backgroundColor: 'rgba(255,255,255,0.9)',
//               width: '30px',
//               height: '30px',
//             }}
//           >
//             <CameraAlt fontSize="small" />
//           </IconButton>
//         </Avatar>
//         <UploadButton variant="outlined" startIcon={<CameraAlt />}>
//           Change Photo
//         </UploadButton>
//       </ProfileImage>

//       <FormGrid>
//         <InputField
//           label="First Name"
//           name="firstName"
//           value={formData.firstName}
//           onChange={handleInputChange}
//           disabled={!isEditing}
//           fullWidth
//         />
//         <InputField
//           label="Last Name"
//           name="lastName"
//           value={formData.lastName}
//           onChange={handleInputChange}
//           disabled={!isEditing}
//           fullWidth
//         />
//       </FormGrid>

//       < InputField
//         label="Email Address"
//         name="email"
//         type="email'
//         value={formData.email}
//         onChange={handleInputChange}
//         disabled={!isEditing}
//         fullWidth
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
//           <SaveButton onClick={handleSave} startIcon={<Save />}>
//             Save Changes
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
//         InputProps={{
//           endAdornment: (
//             <InputAdornment position="end">
//               <IconButton onClick={() => setShowPassword(!showPassword)}>
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
//       />

//       <InputField
//         label="Confirm New Password"
//         name="confirmPassword"
//         type={showPassword ? 'text' : 'password'}
//         value={formData.confirmPassword}
//         onChange={handleInputChange}
//         fullWidth
//       />

//       <SaveButton style={{ marginTop: '1rem' }} startIcon={<Save />}>
//         Update Password
//       </SaveButton>
//     </>
//   );

//   return (
//     <AccountContainer>
//       <PageHeader>
//         <h1>My Account</h1>
//         <p>Manage your profile, security settings, and preferences</p>
//       </PageHeader>

//       <AccountContent>
//         {/* Use the reusable sidebar component */}
//         <AccountSidebar 
//           activeSection={activeSection} 
//           onSectionChange={handleSectionChange} 
//         />

//         {/* Main Content */}
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

//               {/* Recent Activity Section */}
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

















































// import React, { useState, useEffect } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import { styled } from '@mui/material/styles';
// import Button from '@mui/material/Button';
// import TextField from '@mui/material/TextField';
// import IconButton from '@mui/material/IconButton';
// import InputAdornment from '@mui/material/InputAdornment';
// import { Visibility, VisibilityOff, Edit, Save, CameraAlt } from '@mui/icons-material';  
// import MyList from '../MyList';
// import AccountSidebar from '../../components/AccountSidebar';

// // Styled components (only the ones that are still needed)
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
//   border: '1px solid ',
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

// const StyledMyList = styled('div')({
//   '& .wishlist-container': {
//     maxWidth: '100%',
//     padding: 0,
//     margin: 0,
//   },
//   '& .wishlist-header': {
//     marginBottom: '1.5rem',
//   },
//   '& .wishlist-grid': {
//     gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
//     gap: '1rem',
//   },
// });

// const MyAccount = () => {
//   const [isEditing, setIsEditing] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);
//   const location = useLocation();
//   const navigate = useNavigate();
  
//   // Determine active section based on current path or hash
//   const getActiveSection = () => {
//     if (location.pathname === '/wishlist' || location.hash === '#wishlist') return 'wishlist';
//     if (location.hash === '#security') return 'password';
//     return 'profile'; // Default to profile
//   };
  
//   const [activeSection, setActiveSection] = useState(getActiveSection());

//   // Update active section when location changes
//   useEffect(() => {
//     setActiveSection(getActiveSection());
//   }, [location]);

//   const userData = {
//     firstName: 'Idoga',
//     lastName: 'Emmanuel',
//     email: 'siremms300@gmail.com',
//     phone: '+1 (234) 567-8900',
//     joinDate: 'January 15, 2023',
//     avatar: '/src/assets/images/user-avatar.jpg',
//   };

//   const [formData, setFormData] = useState({
//     firstName: userData.firstName,
//     lastName: userData.lastName,
//     email: userData.email,
//     phone: userData.phone,
//     currentPassword: '',
//     newPassword: '',
//     confirmPassword: '',
//   });

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
//   };

//   const handleSave = () => {
//     // Simulate save operation
//     console.log('Saving data:', formData);
//     setIsEditing(false);
//   };

//   const handleCancel = () => {
//     setFormData({
//       firstName: userData.firstName,
//       lastName: userData.lastName,
//       email: userData.email,
//       phone: userData.phone,
//       currentPassword: '',
//       newPassword: '',
//       confirmPassword: '',
//     });
//     setIsEditing(false);
//   };

//   const handleSectionChange = (section) => {
//     setActiveSection(section);
//     // Use hash navigation instead of full path change
//     if (section === 'wishlist') {
//       navigate('/my-account#wishlist');
//     } else if (section === 'password') {
//       navigate('/my-account#security');
//     } else {
//       navigate('/my-account');
//     }
//   };

//   const renderProfileSection = () => (
//     <>
//       <ProfileImage>
//         <Avatar>
//           <img src={userData.avatar || '/src/assets/images/default-avatar.jpg'} alt="Profile" />
//           <IconButton 
//             style={{ 
//               position: 'absolute', 
//               bottom: '5px', 
//               right: '5px', 
//               backgroundColor: 'rgba(255,255,255,0.9)',
//               width: '30px',
//               height: '30px',
//             }}
//           >
//             <CameraAlt fontSize="small" />
//           </IconButton>
//         </Avatar>
//         <UploadButton variant="outlined" startIcon={<CameraAlt />}>
//           Change Photo
//         </UploadButton>
//       </ProfileImage>

//       <FormGrid>
//         <InputField
//           label="First Name"
//           name="firstName"
//           value={formData.firstName}
//           onChange={handleInputChange}
//           disabled={!isEditing}
//           fullWidth
//         />
//         <InputField
//           label="Last Name"
//           name="lastName"
//           value={formData.lastName}
//           onChange={handleInputChange}
//           disabled={!isEditing}
//           fullWidth
//         />
//       </FormGrid>

//       <InputField
//         label="Email Address"
//         name="email"
//         type="email"
//         value={formData.email}
//         onChange={handleInputChange}
//         disabled={!isEditing}
//         fullWidth
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
//           <SaveButton onClick={handleSave} startIcon={<Save />}>
//             Save Changes
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
//         InputProps={{
//           endAdornment: (
//             <InputAdornment position="end">
//               <IconButton onClick={() => setShowPassword(!showPassword)}>
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
//       />

//       <InputField
//         label="Confirm New Password"
//         name="confirmPassword"
//         type={showPassword ? 'text' : 'password'}
//         value={formData.confirmPassword}
//         onChange={handleInputChange}
//         fullWidth
//       />

//       <SaveButton style={{ marginTop: '1rem' }} startIcon={<Save />}>
//         Update Password
//       </SaveButton>
//     </>
//   );

//   return (
//     <AccountContainer>
//       <PageHeader>
//         <h1>My Account</h1>
//         <p>Manage your profile, security settings, and preferences</p>
//       </PageHeader>

//       <AccountContent>
//         {/* Use the reusable sidebar component */}
//         <AccountSidebar 
//           activeSection={activeSection} 
//           onSectionChange={handleSectionChange} 
//         />

//         {/* Main Content */}
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

//               {/* Recent Activity Section */}
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

//           {activeSection === 'wishlist' && (
//             <StyledMyList>
//               <MyList />
//             </StyledMyList>
//           )}
//         </MainContent>
//       </AccountContent>
//     </AccountContainer>
//   );
// };

// export default MyAccount;




























// import React, { useState } from 'react';
// import { Link, Routes, Route, useLocation } from 'react-router-dom';
// import { styled } from '@mui/material/styles';
// import Button from '@mui/material/Button';
// import TextField from '@mui/material/TextField';
// import IconButton from '@mui/material/IconButton';
// import InputAdornment from '@mui/material/InputAdornment';
// import { Visibility, VisibilityOff, Edit, Save, CameraAlt } from '@mui/icons-material';  
// import MyList from '../MyList';





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

// const Sidebar = styled('div')({
//   backgroundColor: '#fff',
//   borderRadius: '8px',
//   boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
//   border: '1px solid #e5e7eb',
//   padding: '1.5rem',
//   height: 'fit-content',
// });

// const SidebarItem = styled(Link)({
//   display: 'flex',
//   alignItems: 'center',
//   padding: '0.75rem 1rem',
//   textDecoration: 'none',
//   color: '#374151',
//   fontSize: '0.95rem',
//   fontWeight: '500',
//   borderRadius: '6px',
//   marginBottom: '0.5rem',
//   transition: 'all 0.2s ease',
//   '&:hover': {
//     backgroundColor: '#f9fafb',
//     color: '#ef7921',
//   },
//   '&.active': {
//     backgroundColor: '#ef7921',
//     color: '#fff',
//   },
//   '&:last-child': {
//     marginBottom: 0,
//   },
// });

// const SidebarIcon = styled('span')({
//   marginRight: '0.75rem',
//   fontSize: '1.1rem',
// });

// const MainContent = styled('div')({
//   backgroundColor: '#fff',
//   borderRadius: '8px',
//   boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
//   border: '1px solid #e5e7eb',
//   padding: '2rem',
//   minHeight: '500px', // Ensure consistent height
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

// // Create a styled version of MyList to integrate with MyAccount
// const StyledMyList = styled('div')({
//   '& .wishlist-container': {
//     maxWidth: '100%',
//     padding: 0,
//     margin: 0,
//   },
//   '& .wishlist-header': {
//     marginBottom: '1.5rem',
//   },
//   '& .wishlist-grid': {
//     gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
//     gap: '1rem',
//   },
// });

// const MyAccount = () => {
//   const [isEditing, setIsEditing] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);
//   const location = useLocation();
  
//   // Determine active section based on current path
//   const getActiveSection = () => {
//     if (location.pathname === '/wishlist') return 'wishlist';
//     return 'profile'; // Default to profile
//   };
  
//   const [activeSection, setActiveSection] = useState(getActiveSection());

//   const userData = {
//     firstName: 'Idoga',
//     lastName: 'Emmanuel',
//     email: 'siremms300@gmail.com',
//     phone: '+1 (234) 567-8900',
//     joinDate: 'January 15, 2023',
//     avatar: '/src/assets/images/user-avatar.jpg',
//   };

//   const [formData, setFormData] = useState({
//     firstName: userData.firstName,
//     lastName: userData.lastName,
//     email: userData.email,
//     phone: userData.phone,
//     currentPassword: '',
//     newPassword: '',
//     confirmPassword: '',
//   });

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
//   };

//   const handleSave = () => {
//     // Simulate save operation
//     console.log('Saving data:', formData);
//     setIsEditing(false);
//     // Here you would typically make an API call to update user data
//   };

//   const handleCancel = () => {
//     setFormData({
//       firstName: userData.firstName,
//       lastName: userData.lastName,
//       email: userData.email,
//       phone: userData.phone,
//       currentPassword: '',
//       newPassword: '',
//       confirmPassword: '',
//     });
//     setIsEditing(false);
//   };

//   const renderProfileSection = () => (
//     <>
//       <ProfileImage>
//         <Avatar>
//           <img src={userData.avatar || '/src/assets/images/default-avatar.jpg'} alt="Profile" />
//           <IconButton 
//             style={{ 
//               position: 'absolute', 
//               bottom: '5px', 
//               right: '5px', 
//               backgroundColor: 'rgba(255,255,255,0.9)',
//               width: '30px',
//               height: '30px',
//             }}
//           >
//             <CameraAlt fontSize="small" />
//           </IconButton>
//         </Avatar>
//         <UploadButton variant="outlined" startIcon={<CameraAlt />}>
//           Change Photo
//         </UploadButton>
//       </ProfileImage>

//       <FormGrid>
//         <InputField
//           label="First Name"
//           name="firstName"
//           value={formData.firstName}
//           onChange={handleInputChange}
//           disabled={!isEditing}
//           fullWidth
//         />
//         <InputField
//           label="Last Name"
//           name="lastName"
//           value={formData.lastName}
//           onChange={handleInputChange}
//           disabled={!isEditing}
//           fullWidth
//         />
//       </FormGrid>

//       <InputField
//         label="Email Address"
//         name="email"
//         type="email"
//         value={formData.email}
//         onChange={handleInputChange}
//         disabled={!isEditing}
//         fullWidth
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
//           <SaveButton onClick={handleSave} startIcon={<Save />}>
//             Save Changes
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
//         InputProps={{
//           endAdornment: (
//             <InputAdornment position="end">
//               <IconButton onClick={() => setShowPassword(!showPassword)}>
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
//       />

//       <InputField
//         label="Confirm New Password"
//         name="confirmPassword"
//         type={showPassword ? 'text' : 'password'}
//         value={formData.confirmPassword}
//         onChange={handleInputChange}
//         fullWidth
//       />

//       <SaveButton style={{ marginTop: '1rem' }} startIcon={<Save />}>
//         Update Password
//       </SaveButton>
//     </>
//   );

//   return (
//     <AccountContainer>
//       <PageHeader>
//         <h1>My Account</h1>
//         <p>Manage your profile, security settings, and preferences</p>
//       </PageHeader>

//       <AccountContent>
//         {/* Sidebar Navigation */}
//         <Sidebar>
//           <SidebarItem 
//             to="/my-account" 
//             className={activeSection === 'profile' ? 'active' : ''}
//             onClick={() => setActiveSection('profile')}
//           >
//             <SidebarIcon>👤</SidebarIcon>
//             Profile Information
//           </SidebarItem>
//           <SidebarItem 
//             to="/my-account/security" 
//             className={activeSection === 'password' ? 'active' : ''}
//             onClick={() => setActiveSection('password')}
//           >
//             <SidebarIcon>🔒</SidebarIcon>
//             Password & Security
//           </SidebarItem>
//           <SidebarItem to="/orders">
//             <SidebarIcon>📦</SidebarIcon>
//             Order History
//           </SidebarItem>
//           <SidebarItem to="/address">
//             <SidebarIcon>📍</SidebarIcon>
//             Address Book
//           </SidebarItem>
//           <SidebarItem 
//             to="/wishlist" 
//             className={activeSection === 'wishlist' ? 'active' : ''}
//             onClick={() => setActiveSection('wishlist')}
//           >
//             <SidebarIcon>❤️</SidebarIcon>
//             Wishlist
//           </SidebarItem>
//           <SidebarItem to="/payment-methods">
//             <SidebarIcon>💳</SidebarIcon>
//             Payment Methods
//           </SidebarItem>
//         </Sidebar>

//         {/* Main Content */}
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
//             </Section>
//           )}

//           {activeSection === 'password' && (
//             <Section>
//               <SectionTitle>Password & Security</SectionTitle>
//               {renderPasswordSection()}
//             </Section>
//           )}

//           {activeSection === 'wishlist' && (
//             <StyledMyList>
//               <MyList />
//             </StyledMyList>
//           )}

//           {/* Recent Activity Section - Only show on profile page */}
//           {activeSection === 'profile' && (
//             <RecentActivity>
//               <SectionTitle>Recent Activity</SectionTitle>
//               {recentActivities.map(activity => (
//                 <ActivityItem key={activity.id}>
//                   <ActivityIcon>{activity.icon}</ActivityIcon>
//                   <ActivityContent>
//                     <h4>{activity.title}</h4>
//                     <p>{activity.description}</p>
//                   </ActivityContent>
//                   <ActivityTime>{activity.time}</ActivityTime>
//                 </ActivityItem>
//               ))}
//             </RecentActivity>
//           )}
//         </MainContent>
//       </AccountContent>
//     </AccountContainer>
//   );
// };

// export default MyAccount;





































































// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// import { styled } from '@mui/material/styles';
// import Button from '@mui/material/Button';
// import TextField from '@mui/material/TextField';
// import IconButton from '@mui/material/IconButton';
// import InputAdornment from '@mui/material/InputAdornment';
// import { Visibility, VisibilityOff, Edit, Save, CameraAlt } from '@mui/icons-material';

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

// const Sidebar = styled('div')({
//   backgroundColor: '#fff',
//   borderRadius: '8px',
//   boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
//   border: '1px solid #e5e7eb',
//   padding: '1.5rem',
//   height: 'fit-content',
// });

// const SidebarItem = styled(Link)({
//   display: 'flex',
//   alignItems: 'center',
//   padding: '0.75rem 1rem',
//   textDecoration: 'none',
//   color: '#374151',
//   fontSize: '0.95rem',
//   fontWeight: '500',
//   borderRadius: '6px',
//   marginBottom: '0.5rem',
//   transition: 'all 0.2s ease',
//   '&:hover': {
//     backgroundColor: '#f9fafb',
//     color: '#ef7921',
//   },
//   '&.active': {
//     backgroundColor: '#ef7921',
//     color: '#fff',
//   },
//   '&:last-child': {
//     marginBottom: 0,
//   },
// });

// const SidebarIcon = styled('span')({
//   marginRight: '0.75rem',
//   fontSize: '1.1rem',
// });

// const MainContent = styled('div')({
//   backgroundColor: '#fff',
//   borderRadius: '8px',
//   boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
//   border: '1px solid #e5e7eb',
//   padding: '2rem',
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
//   const [activeSection, setActiveSection] = useState('profile');

//   const userData = {
//     firstName: 'Idoga',
//     lastName: 'Emmanuel',
//     email: 'siremms300@gmail.com',
//     phone: '+1 (234) 567-8900',
//     joinDate: 'January 15, 2023',
//     avatar: '/src/assets/images/user-avatar.jpg',
//   };

//   const [formData, setFormData] = useState({
//     firstName: userData.firstName,
//     lastName: userData.lastName,
//     email: userData.email,
//     phone: userData.phone,
//     currentPassword: '',
//     newPassword: '',
//     confirmPassword: '',
//   });

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
//   };

//   const handleSave = () => {
//     // Simulate save operation
//     console.log('Saving data:', formData);
//     setIsEditing(false);
//     // Here you would typically make an API call to update user data
//   };

//   const handleCancel = () => {
//     setFormData({
//       firstName: userData.firstName,
//       lastName: userData.lastName,
//       email: userData.email,
//       phone: userData.phone,
//       currentPassword: '',
//       newPassword: '',
//       confirmPassword: '',
//     });
//     setIsEditing(false);
//   };

//   const renderProfileSection = () => (
//     <>
//       <ProfileImage>
//         <Avatar>
//           <img src={userData.avatar || '/src/assets/images/default-avatar.jpg'} alt="Profile" />
//           <IconButton 
//             style={{ 
//               position: 'absolute', 
//               bottom: '5px', 
//               right: '5px', 
//               backgroundColor: 'rgba(255,255,255,0.9)',
//               width: '30px',
//               height: '30px',
//             }}
//           >
//             <CameraAlt fontSize="small" />
//           </IconButton>
//         </Avatar>
//         <UploadButton variant="outlined" startIcon={<CameraAlt />}>
//           Change Photo
//         </UploadButton>
//       </ProfileImage>

//       <FormGrid>
//         <InputField
//           label="First Name"
//           name="firstName"
//           value={formData.firstName}
//           onChange={handleInputChange}
//           disabled={!isEditing}
//           fullWidth
//         />
//         <InputField
//           label="Last Name"
//           name="lastName"
//           value={formData.lastName}
//           onChange={handleInputChange}
//           disabled={!isEditing}
//           fullWidth
//         />
//       </FormGrid>

//       <InputField
//         label="Email Address"
//         name="email"
//         type="email"
//         value={formData.email}
//         onChange={handleInputChange}
//         disabled={!isEditing}
//         fullWidth
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
//           <SaveButton onClick={handleSave} startIcon={<Save />}>
//             Save Changes
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
//         InputProps={{
//           endAdornment: (
//             <InputAdornment position="end">
//               <IconButton onClick={() => setShowPassword(!showPassword)}>
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
//       />

//       <InputField
//         label="Confirm New Password"
//         name="confirmPassword"
//         type={showPassword ? 'text' : 'password'}
//         value={formData.confirmPassword}
//         onChange={handleInputChange}
//         fullWidth
//       />

//       <SaveButton style={{ marginTop: '1rem' }} startIcon={<Save />}>
//         Update Password
//       </SaveButton>
//     </>
//   );

//   return (
//     <AccountContainer>
//       <PageHeader>
//         <h1>My Account</h1>
//         <p>Manage your profile, security settings, and preferences</p>
//       </PageHeader>

//       <AccountContent>
//         {/* Sidebar Navigation */}
//         <Sidebar>
//           <SidebarItem 
//             to="#" 
//             className={activeSection === 'profile' ? 'active' : ''}
//             onClick={() => setActiveSection('profile')}
//           >
//             <SidebarIcon>👤</SidebarIcon>
//             Profile Information
//           </SidebarItem>
//           <SidebarItem 
//             to="#" 
//             className={activeSection === 'password' ? 'active' : ''}
//             onClick={() => setActiveSection('password')}
//           >
//             <SidebarIcon>🔒</SidebarIcon>
//             Password & Security
//           </SidebarItem>
//           <SidebarItem to="/orders">
//             <SidebarIcon>📦</SidebarIcon>
//             Order History
//           </SidebarItem>
//           <SidebarItem to="/address">
//             <SidebarIcon>📍</SidebarIcon>
//             Address Book
//           </SidebarItem>
//           <SidebarItem to="/wishlist">
//             <SidebarIcon>❤️</SidebarIcon>
//             Wishlist
//           </SidebarItem>
//           <SidebarItem to="/payment-methods">
//             <SidebarIcon>💳</SidebarIcon>
//             Payment Methods
//           </SidebarItem>
//         </Sidebar>

//         {/* Main Content */}
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
//             </Section>
//           )}

//           {activeSection === 'password' && (
//             <Section>
//               <SectionTitle>Password & Security</SectionTitle>
//               {renderPasswordSection()}
//             </Section>
//           )}

//           {/* Recent Activity Section */}
//           <RecentActivity>
//             <SectionTitle>Recent Activity</SectionTitle>
//             {recentActivities.map(activity => (
//               <ActivityItem key={activity.id}>
//                 <ActivityIcon>{activity.icon}</ActivityIcon>
//                 <ActivityContent>
//                   <h4>{activity.title}</h4>
//                   <p>{activity.description}</p>
//                 </ActivityContent>
//                 <ActivityTime>{activity.time}</ActivityTime>
//               </ActivityItem>
//             ))}
//           </RecentActivity>
//         </MainContent>
//       </AccountContent>
//     </AccountContainer>
//   );
// };

// export default MyAccount;














































// import React, { useState, useEffect } from 'react';
// import { Link, useLocation, useNavigate } from 'react-router-dom';
// import { styled } from '@mui/material/styles';
// import Button from '@mui/material/Button';
// import TextField from '@mui/material/TextField';
// import IconButton from '@mui/material/IconButton';
// import InputAdornment from '@mui/material/InputAdornment';
// import { Visibility, VisibilityOff, Edit, Save, CameraAlt } from '@mui/icons-material';
// import MyList from '../MyList';

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

// const Sidebar = styled('div')({
//   backgroundColor: '#fff',
//   borderRadius: '8px',
//   boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
//   border: '1px solid #e5e7eb',
//   padding: '1.5rem',
//   height: 'fit-content',
// });

// const SidebarButton = styled('button')({
//   display: 'flex',
//   alignItems: 'center',
//   padding: '0.75rem 1rem',
//   textDecoration: 'none',
//   backgroundColor: 'transparent',
//   border: 'none',
//   width: '100%',
//   textAlign: 'left',
//   color: '#374151',
//   fontSize: '0.95rem',
//   fontWeight: '500',
//   borderRadius: '6px',
//   marginBottom: '0.5rem',
//   transition: 'all 0.2s ease',
//   cursor: 'pointer',
//   '&:hover': {
//     backgroundColor: '#f9fafb',
//     color: '#ef7921',
//   },
//   '&.active': {
//     backgroundColor: '#ef7921',
//     color: '#fff',
//   },
//   '&:last-child': {
//     marginBottom: 0,
//   },
// });

// const SidebarIcon = styled('span')({
//   marginRight: '0.75rem',
//   fontSize: '1.1rem',
// });

// const MainContent = styled('div')({
//   backgroundColor: '#fff',
//   borderRadius: '8px',
//   boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
//   border: '1px solid #e5e7eb',
//   padding: '2rem',
//   minHeight: '500px', // Ensure consistent height
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

// // Create a styled version of MyList to integrate with MyAccount
// const StyledMyList = styled('div')({
//   '& .wishlist-container': {
//     maxWidth: '100%',
//     padding: 0,
//     margin: 0,
//   },
//   '& .wishlist-header': {
//     marginBottom: '1.5rem',
//   },
//   '& .wishlist-grid': {
//     gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
//     gap: '1rem',
//   },
// });

// const MyAccount = () => {
//   const [isEditing, setIsEditing] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);
//   const location = useLocation();
//   const navigate = useNavigate();
  
//   // Determine active section based on current path or hash
//   const getActiveSection = () => {
//     if (location.pathname === '/wishlist') return 'wishlist';
//     if (location.hash === '#wishlist') return 'wishlist';
//     if (location.hash === '#security') return 'password';
//     return 'profile'; // Default to profile
//   };
  
//   const [activeSection, setActiveSection] = useState(getActiveSection());

//   // Update active section when location changes
//   useEffect(() => {
//     setActiveSection(getActiveSection());
//   }, [location]);

//   const userData = {
//     firstName: 'Idoga',
//     lastName: 'Emmanuel',
//     email: 'siremms300@gmail.com',
//     phone: '+1 (234) 567-8900',
//     joinDate: 'January 15, 2023',
//     avatar: '/src/assets/images/user-avatar.jpg',
//   };

//   const [formData, setFormData] = useState({
//     firstName: userData.firstName,
//     lastName: userData.lastName,
//     email: userData.email,
//     phone: userData.phone,
//     currentPassword: '',
//     newPassword: '',
//     confirmPassword: '',
//   });

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
//   };

//   const handleSave = () => {
//     // Simulate save operation
//     console.log('Saving data:', formData);
//     setIsEditing(false);
//     // Here you would typically make an API call to update user data
//   };

//   const handleCancel = () => {
//     setFormData({
//       firstName: userData.firstName,
//       lastName: userData.lastName,
//       email: userData.email,
//       phone: userData.phone,
//       currentPassword: '',
//       newPassword: '',
//       confirmPassword: '',
//     });
//     setIsEditing(false);
//   };

//   const handleSectionChange = (section) => {
//     setActiveSection(section);
//     // Use hash navigation instead of full path change
//     if (section === 'wishlist') {
//       navigate('/my-account#wishlist');
//     } else if (section === 'password') {
//       navigate('/my-account#security');
//     } else {
//       navigate('/my-account');
//     }
//   };

//   const renderProfileSection = () => (
//     <>
//       <ProfileImage>
//         <Avatar>
//           <img src={userData.avatar || '/src/assets/images/default-avatar.jpg'} alt="Profile" />
//           <IconButton 
//             style={{ 
//               position: 'absolute', 
//               bottom: '5px', 
//               right: '5px', 
//               backgroundColor: 'rgba(255,255,255,0.9)',
//               width: '30px',
//               height: '30px',
//             }}
//           >
//             <CameraAlt fontSize="small" />
//           </IconButton>
//         </Avatar>
//         <UploadButton variant="outlined" startIcon={<CameraAlt />}>
//           Change Photo
//         </UploadButton>
//       </ProfileImage>

//       <FormGrid>
//         <InputField
//           label="First Name"
//           name="firstName"
//           value={formData.firstName}
//           onChange={handleInputChange}
//           disabled={!isEditing}
//           fullWidth
//         />
//         <InputField
//           label="Last Name"
//           name="lastName"
//           value={formData.lastName}
//           onChange={handleInputChange}
//           disabled={!isEditing}
//           fullWidth
//         />
//       </FormGrid>

//       <InputField
//         label="Email Address"
//         name="email"
//         type="email"
//         value={formData.email}
//         onChange={handleInputChange}
//         disabled={!isEditing}
//         fullWidth
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
//           <SaveButton onClick={handleSave} startIcon={<Save />}>
//             Save Changes
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
//         InputProps={{
//           endAdornment: (
//             <InputAdornment position="end">
//               <IconButton onClick={() => setShowPassword(!showPassword)}>
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
//       />

//       <InputField
//         label="Confirm New Password"
//         name="confirmPassword"
//         type={showPassword ? 'text' : 'password'}
//         value={formData.confirmPassword}
//         onChange={handleInputChange}
//         fullWidth
//       />

//       <SaveButton style={{ marginTop: '1rem' }} startIcon={<Save />}>
//         Update Password
//       </SaveButton>
//     </>
//   );

//   return (
//     <AccountContainer>
//       <PageHeader>
//         <h1>My Account</h1>
//         <p>Manage your profile, security settings, and preferences</p>
//       </PageHeader>

//       <AccountContent>
//         {/* Sidebar Navigation */}
//         <Sidebar>
//           <SidebarButton 
//             className={activeSection === 'profile' ? 'active' : ''}
//             onClick={() => handleSectionChange('profile')}
//           >
//             <SidebarIcon>👤</SidebarIcon>
//             Profile Information
//           </SidebarButton>
//           <SidebarButton 
//             className={activeSection === 'password' ? 'active' : ''}
//             onClick={() => handleSectionChange('password')}
//           >
//             <SidebarIcon>🔒</SidebarIcon>
//             Password & Security
//           </SidebarButton>
//           <SidebarButton 
//             className={activeSection === 'wishlist' ? 'active' : ''}
//             onClick={() => handleSectionChange('wishlist')}
//           >
//             <SidebarIcon>❤️</SidebarIcon>
//             Wishlist
//           </SidebarButton>
//           <Link to="/orders" style={{ textDecoration: 'none' }}>
//             <SidebarButton>
//               <SidebarIcon>📦</SidebarIcon>
//               Order History
//             </SidebarButton>
//           </Link>
//           <Link to="/address" style={{ textDecoration: 'none' }}>
//             <SidebarButton>
//               <SidebarIcon>📍</SidebarIcon>
//               Address Book
//             </SidebarButton>
//           </Link>
//           <Link to="/payment-methods" style={{ textDecoration: 'none' }}>
//             <SidebarButton>
//               <SidebarIcon>💳</SidebarIcon>
//               Payment Methods
//             </SidebarButton>
//           </Link>
//         </Sidebar>

//         {/* Main Content */}
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

//               {/* Recent Activity Section */}
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

//           {activeSection === 'wishlist' && (
//             <StyledMyList>
//               <MyList />
//             </StyledMyList>
//           )}
//         </MainContent>
//       </AccountContent>
//     </AccountContainer>
//   );
// };

// export default MyAccount;












































































