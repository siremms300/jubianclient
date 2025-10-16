import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { styled } from '@mui/material/styles';

// Styled components
const SidebarContainer = styled('div')({
  backgroundColor: '#fff',
  borderRadius: '8px',
  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
  border: '1px solid #e5e7eb',
  padding: '1.5rem',
  height: 'fit-content',
});

const SidebarItem = styled(Link)({
  display: 'flex',
  alignItems: 'center',
  padding: '0.75rem 1rem',
  textDecoration: 'none',
  color: '#374151',
  fontSize: '0.95rem',
  fontWeight: '500',
  borderRadius: '6px',
  marginBottom: '0.5rem',
  transition: 'all 0.2s ease',
  '&:hover': {
    backgroundColor: '#f9fafb',
    color: '#ef7921',
  },
  '&.active': {
    backgroundColor: '#ef7921',
    color: '#fff',
  },
  '&:last-child': {
    marginBottom: 0,
  },
});

const SidebarIcon = styled('span')({
  marginRight: '0.75rem',
  fontSize: '1.1rem',
});

const AccountSidebar = () => {
  const location = useLocation();
  
  // Determine active section based on current path
  const getActiveSection = () => {
    if (location.pathname === '/wishlist') return 'wishlist';
    if (location.pathname === '/my-account') return 'profile';
    return '';
  };
  
  const activeSection = getActiveSection();

  return (
    <SidebarContainer>
      <SidebarItem 
        to="/my-account" 
        className={activeSection === 'profile' ? 'active' : ''}
      >
        <SidebarIcon>👤</SidebarIcon>
        Profile Information
      </SidebarItem>
      <SidebarItem 
        to="/wishlist" 
        className={activeSection === 'wishlist' ? 'active' : ''}
      >
        <SidebarIcon>❤️</SidebarIcon>
        Wishlist
      </SidebarItem>
      <SidebarItem to="/orders">
        <SidebarIcon>📦</SidebarIcon>
        Order History
      </SidebarItem>
      <SidebarItem to="/address">
        <SidebarIcon>📍</SidebarIcon>
        Address Book
      </SidebarItem>
      <SidebarItem to="/payment-methods">
        <SidebarIcon>💳</SidebarIcon>
        Payment Methods
      </SidebarItem>
    </SidebarContainer>
  );
};

export default AccountSidebar;






































// import React from 'react';
// import { Link, useLocation } from 'react-router-dom';
// import { styled } from '@mui/material/styles';

// // Styled components
// const SidebarContainer = styled('div')({
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

// const AccountSidebar = () => {
//   const location = useLocation();
  
//   // Determine active section based on current path
//   const getActiveSection = () => {
//     if (location.pathname === '/wishlist') return 'wishlist';
//     if (location.pathname === '/my-account' && location.hash === '#security') return 'password';
//     if (location.pathname === '/my-account') return 'profile';
//     return '';
//   };
  
//   const activeSection = getActiveSection();

//   return (
//     <SidebarContainer>
//       <SidebarItem 
//         to="/my-account" 
//         className={activeSection === 'profile' ? 'active' : ''}
//       >
//         <SidebarIcon>👤</SidebarIcon>
//         Profile Information
//       </SidebarItem>
//       <SidebarItem 
//         to="/my-account#security" 
//         className={activeSection === 'password' ? 'active' : ''}
//       >
//         <SidebarIcon>🔒</SidebarIcon>
//         Password & Security
//       </SidebarItem>
//       <SidebarItem 
//         to="/wishlist" 
//         className={activeSection === 'wishlist' ? 'active' : ''}
//       >
//         <SidebarIcon>❤️</SidebarIcon>
//         Wishlist
//       </SidebarItem>
//       <SidebarItem to="/orders">
//         <SidebarIcon>📦</SidebarIcon>
//         Order History
//       </SidebarItem>
//       <SidebarItem to="/address">
//         <SidebarIcon>📍</SidebarIcon>
//         Address Book
//       </SidebarItem>
//       <SidebarItem to="/payment-methods">
//         <SidebarIcon>💳</SidebarIcon>
//         Payment Methods
//       </SidebarItem>
//     </SidebarContainer>
//   );
// };

// export default AccountSidebar;






















// import React from 'react';
// import { Link } from 'react-router-dom';
// import { styled } from '@mui/material/styles';

// // Styled components
// const SidebarContainer = styled('div')({
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

// const AccountSidebar = ({ activeSection, onSectionChange }) => {
//   const handleItemClick = (section, e) => {
//     // Prevent default only for internal sections to avoid page reload
//     if (section === 'profile' || section === 'password' || section === 'wishlist') {
//       e.preventDefault();
//       onSectionChange(section);
//     }
//   };

//   return (
//     <SidebarContainer>
//       <SidebarItem 
//         to="/my-account" 
//         className={activeSection === 'profile' ? 'active' : ''}
//         onClick={(e) => handleItemClick('profile', e)}
//       >
//         <SidebarIcon>👤</SidebarIcon>
//         Profile Information
//       </SidebarItem>
//       <SidebarItem 
//         to="/my-account/security" 
//         className={activeSection === 'password' ? 'active' : ''}
//         onClick={(e) => handleItemClick('password', e)}
//       >
//         <SidebarIcon>🔒</SidebarIcon>
//         Password & Security
//       </SidebarItem>
//       <SidebarItem 
//         to="/wishlist" 
//         className={activeSection === 'wishlist' ? 'active' : ''}
//         onClick={(e) => handleItemClick('wishlist', e)}
//       >
//         <SidebarIcon>❤️</SidebarIcon>
//         Wishlist
//       </SidebarItem>
//       <SidebarItem to="/orders">
//         <SidebarIcon>📦</SidebarIcon>
//         Order History
//       </SidebarItem>
//       <SidebarItem to="/address">
//         <SidebarIcon>📍</SidebarIcon>
//         Address Book
//       </SidebarItem>
//       <SidebarItem to="/payment-methods">
//         <SidebarIcon>💳</SidebarIcon>
//         Payment Methods
//       </SidebarItem>
//     </SidebarContainer>
//   );
// };

// export default AccountSidebar;