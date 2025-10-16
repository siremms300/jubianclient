import React, { useContext, useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import Search from "../Search";
import Badge from "@mui/material/Badge";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import { MdOutlineShoppingCart } from "react-icons/md";
import { IoGitCompareOutline } from "react-icons/io5";
import { FaRegHeart, FaUser, FaSignOutAlt, FaMapMarkerAlt, FaListAlt, FaClipboardList } from "react-icons/fa";
import Tooltip from "@mui/material/Tooltip";
import Navigation from "./Navigation";
import { MyContext } from "../../App";
import { Button } from "@mui/material"; 
import { useAuth } from "../../context/authContext";
import { logoutUser } from '../../utils/api';
import { cartApi } from '../../utils/cartApi';
import { toast } from "react-toastify";

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0.4px",
    backgroundColor: "#ef7921",
    color: "#fff",
  },
}));

const DropdownContainer = styled('div')({
  position: 'relative',
  display: 'inline-block',
});

const DropdownMenu = styled('div')({
  position: 'absolute',
  top: '100%',
  right: 0,
  backgroundColor: '#fff',
  borderRadius: '8px',
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
  border: '1px solid #e5e7eb',
  width: '220px',
  zIndex: 1000,
  marginTop: '0.5rem',
  overflow: 'hidden',
});

const DropdownItem = styled(Link)({
  display: 'flex',
  alignItems: 'center',
  padding: '0.75rem 1rem',
  textDecoration: 'none',
  color: '#374151',
  fontSize: '0.9rem',
  fontWeight: '500',
  transition: 'background-color 0.2s ease',
  borderBottom: '1px solid #f3f4f6',
  '&:hover': {
    backgroundColor: '#f9fafb',
    color: '#ef7921',
  },
  '&:last-child': {
    borderBottom: 'none',
  },
});

const DropdownIcon = styled('span')({
  marginRight: '0.75rem',
  color: '#6b7280',
  fontSize: '1rem',
  [`${DropdownItem}:hover &`]: {
    color: '#ef7921',
  },
});

const UserInfo = styled('div')({
  padding: '1rem',
  borderBottom: '1px solid #f3f4f6',
  '& h4': {
    margin: '0 0 0.25rem 0',
    fontSize: '0.95rem',
    fontWeight: '600',
    color: '#1f2937',
  },
  '& span': {
    fontSize: '0.8rem',
    color: '#6b7280',
  },
});

const Header = () => {
  const context = useContext(MyContext);
  const { currentUser, logout } = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [loadingCart, setLoadingCart] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Fetch cart count when user logs in or component mounts
  useEffect(() => {
    if (currentUser) {
      fetchCartCount();
    } else {
      setCartCount(0);
    }
  }, [currentUser]);

  // Listen for cart refresh events
  useEffect(() => {
    const handleCartRefresh = () => {
      fetchCartCount();
    };

    window.addEventListener('cartRefresh', handleCartRefresh);
    
    return () => {
      window.removeEventListener('cartRefresh', handleCartRefresh);
    };
  }, [currentUser]);

  // Update context with refresh function
  useEffect(() => {
    if (context) {
      context.refreshCartCount = fetchCartCount;
    }
  }, [context]);

  const fetchCartCount = async () => {
    if (!currentUser) {
      setCartCount(0);
      return;
    }
    
    try {
      setLoadingCart(true);
      const response = await cartApi.getCartCount();
      setCartCount(response.data.totalItems || 0);
    } catch (error) {
      console.error('Error fetching cart count:', error);
      setCartCount(0);
    } finally {
      setLoadingCart(false);
    }
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = async () => {
    try {
      await logoutUser();
      logout();
      setIsDropdownOpen(false);
      setCartCount(0);
      toast.success('Logout successful!');
      
      if (context.setIsLogin) {
        context.setIsLogin(false);
      }
    } catch (error) {
      console.error('Logout error:', error);
      logout();
      setCartCount(0);
      if (context.setIsLogin) {
        context.setIsLogin(false);
      }
    }
  };

  const handleCartClick = () => {
    if (!currentUser) {
      toast.info('Please login to view your cart');
      return;
    }
    context.setOpenCartPanel(true);
  };

  return (
    <header style={{ background: "#fff", padding: "8px 0" }}>
      {/* Top Strip */}
      <div
        style={{
          padding: "12px 0",
          borderTop: "0.5px solid rgba(0,0,0,0.5)",
          borderBottom: "1px solid rgba(0,0,0,0.5)",
        }}
      >
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 16px" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            {/* Left text */}
            <div style={{ width: "50%" }}>
              <p style={{ fontSize: "12px", fontWeight: 500, margin: 0 }}>
                Get up to 50% off new season styles, limited time only
              </p>
            </div>

            {/* Right links */}
            <div style={{ width: "50%", display: "flex", justifyContent: "flex-end" }}>
              <ul
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "16px",
                  listStyle: "none",
                  margin: 0,
                  padding: 0,
                }}
              >
                <li>
                  <Link
                    to="help-center"
                    style={{
                      fontSize: "13px",
                      fontWeight: 500,
                      textDecoration: "none",
                      color: "inherit",
                    }}
                  >
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link
                    to="order-tracking"
                    style={{
                      fontSize: "13px",
                      fontWeight: 500,
                      textDecoration: "none",
                      color: "inherit",
                    }}
                  >
                    Order Tracking
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div style={{ padding: "24px 0", borderBottom: "0.5px solid transparent" }}>
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            padding: "0 16px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {/* Logo */}
          <div style={{ width: "25%" }}>
            <Link to={"/"} style={{ display: "block", height: "40px" }}>
              <img
                src="/logo.png"
                style={{ height: "100%", width: "auto", objectFit: "contain" }}
                alt="The Jubian Marketplace"
              />
            </Link>
          </div>

          {/* Search */}
          <div style={{ width: "40%" }}>
            <Search />
          </div>

          {/* User + Icons */}
          <div
            style={{
              width: "30%",
              display: "flex",
              alignItems: "center",
              paddingLeft: "20px",
            }}
          >
            <ul
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
                gap: "16px",
                listStyle: "none",
                margin: 0,
                padding: 0,
                width: "100%",
              }}
            > 
              {!currentUser ? (
                <li>
                  <Link
                    to="/login"
                    style={{
                      fontSize: "15px",
                      fontWeight: 600,
                      textDecoration: "none",
                      color: "inherit",
                    }}
                  >
                    Login
                  </Link>{" "}
                  | &nbsp;
                  <Link
                    to="/register"
                    style={{
                      fontSize: "15px",
                      fontWeight: 600,
                      textDecoration: "none",
                      color: "inherit",
                    }}
                  >
                    Register
                  </Link>
                </li>
              ) : (
                <DropdownContainer ref={dropdownRef}>
                  <div 
                    className="myAccountWrap flex items-center gap-3 cursor-pointer" 
                    onClick={toggleDropdown}
                  >
                    <Button className="!w-[40px] !h-[40px] !min-w-[40px] !rounded-full !bg-[#f1f1f1] hover:!bg-[#e5e5e5]"> 
                      <FaUser className="text-[20px] text-[rgba(0,0,0,0.5)]"/> 
                    </Button> 

                    <div className="info flex flex-col">
                      <h4 className="text-[14px] font-[500]">{currentUser.name}</h4> 
                      <span className="text-[12px] text-[#6b7280]">{currentUser.email}</span> 
                    </div>
                  </div>

                  {isDropdownOpen && (
                    <DropdownMenu>
                      <UserInfo>
                        <h4>{currentUser.name}</h4>
                        <span>{currentUser.email}</span>
                      </UserInfo>
                      
                      <DropdownItem to="/my-account" onClick={() => setIsDropdownOpen(false)}>
                        <DropdownIcon>
                          <FaUser />
                        </DropdownIcon>
                        My Account
                      </DropdownItem>
                      
                      <DropdownItem to="/address" onClick={() => setIsDropdownOpen(false)}>
                        <DropdownIcon>
                          <FaMapMarkerAlt />
                        </DropdownIcon>
                        Address
                      </DropdownItem>
                      
                      <DropdownItem to="/orders" onClick={() => setIsDropdownOpen(false)}>
                        <DropdownIcon>
                          <FaClipboardList />
                        </DropdownIcon>
                        Orders
                      </DropdownItem>
                      
                      <DropdownItem to="/wishlist" onClick={() => setIsDropdownOpen(false)}>
                        <DropdownIcon>
                          <FaRegHeart />
                        </DropdownIcon>
                        My Wishlist
                      </DropdownItem>
                      
                      <DropdownItem 
                        to="#" 
                        onClick={(e) => {
                          e.preventDefault();
                          handleLogout();
                        }}
                        style={{ color: '#ef4444' }}
                      >
                        <DropdownIcon>
                          <FaSignOutAlt />
                        </DropdownIcon>
                        Logout
                      </DropdownItem>
                    </DropdownMenu>
                  )}
                </DropdownContainer>
              )}

              <li>
                <Tooltip title="Compare">
                  <IconButton aria-label="compare">
                    <StyledBadge badgeContent={4} color="primary">
                      <IoGitCompareOutline />
                    </StyledBadge>
                  </IconButton>
                </Tooltip>
              </li>

              <li>
                <Tooltip title="Wishlist">
                  <IconButton aria-label="wishlist">
                    <StyledBadge badgeContent={4} color="primary">
                      <FaRegHeart />
                    </StyledBadge>
                  </IconButton>
                </Tooltip>
              </li>

              <li>
                <Tooltip title={currentUser ? "Cart" : "Login to view cart"}>
                  <IconButton 
                    aria-label="cart" 
                    onClick={handleCartClick}
                    disabled={loadingCart}
                  >
                    <StyledBadge 
                      badgeContent={loadingCart ? "..." : cartCount} 
                      color="primary"
                      showZero={true}
                    >
                      <MdOutlineShoppingCart />
                    </StyledBadge>
                  </IconButton>
                </Tooltip>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <Navigation />
    </header>
  );
};

export default Header;






































































// import React, { useContext, useState, useRef, useEffect } from "react";
// import { Link } from "react-router-dom";
// import Search from "../Search";
// import Badge from "@mui/material/Badge";
// import { styled } from "@mui/material/styles";
// import IconButton from "@mui/material/IconButton";
// import { MdOutlineShoppingCart } from "react-icons/md";
// import { IoGitCompareOutline } from "react-icons/io5";
// import { FaRegHeart, FaUser, FaSignOutAlt, FaMapMarkerAlt, FaListAlt, FaClipboardList } from "react-icons/fa";
// import Tooltip from "@mui/material/Tooltip";
// import Navigation from "./Navigation";
// import { MyContext } from "../../App";
// import { Button } from "@mui/material"; 
// import { useAuth } from "../../context/authContext";
// import { logoutUser } from '../../utils/api';
// import { cartApi } from '../../utils/cartApi';
// import { toast } from "react-toastify";

// const StyledBadge = styled(Badge)(({ theme }) => ({
//   "& .MuiBadge-badge": {
//     right: -3,
//     top: 13,
//     border: `2px solid ${theme.palette.background.paper}`,
//     padding: "0.4px",
//     backgroundColor: "#ef7921",
//     color: "#fff",
//   },
// }));

// // Styled components for dropdown
// const DropdownContainer = styled('div')({
//   position: 'relative',
//   display: 'inline-block',
// });

// const DropdownMenu = styled('div')({
//   position: 'absolute',
//   top: '100%',
//   right: 0,
//   backgroundColor: '#fff',
//   borderRadius: '8px',
//   boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
//   border: '1px solid #e5e7eb',
//   width: '220px',
//   zIndex: 1000,
//   marginTop: '0.5rem',
//   overflow: 'hidden',
// });

// const DropdownItem = styled(Link)({
//   display: 'flex',
//   alignItems: 'center',
//   padding: '0.75rem 1rem',
//   textDecoration: 'none',
//   color: '#374151',
//   fontSize: '0.9rem',
//   fontWeight: '500',
//   transition: 'background-color 0.2s ease',
//   borderBottom: '1px solid #f3f4f6',
//   '&:hover': {
//     backgroundColor: '#f9fafb',
//     color: '#ef7921',
//   },
//   '&:last-child': {
//     borderBottom: 'none',
//   },
// });

// const DropdownIcon = styled('span')({
//   marginRight: '0.75rem',
//   color: '#6b7280',
//   fontSize: '1rem',
//   [`${DropdownItem}:hover &`]: {
//     color: '#ef7921',
//   },
// });

// const UserInfo = styled('div')({
//   padding: '1rem',
//   borderBottom: '1px solid #f3f4f6',
//   '& h4': {
//     margin: '0 0 0.25rem 0',
//     fontSize: '0.95rem',
//     fontWeight: '600',
//     color: '#1f2937',
//   },
//   '& span': {
//     fontSize: '0.8rem',
//     color: '#6b7280',
//   },
// });

// const Header = () => {
//   const context = useContext(MyContext);
//   const { currentUser, logout } = useAuth();
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);
//   const [cartCount, setCartCount] = useState(0);
//   const [loadingCart, setLoadingCart] = useState(false);
//   const dropdownRef = useRef(null);

//   // Close dropdown when clicking outside
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//         setIsDropdownOpen(false);
//       }
//     };

//     document.addEventListener('mousedown', handleClickOutside);
//     return () => {
//       document.removeEventListener('mousedown', handleClickOutside);
//     };
//   }, []);

//   // Fetch cart count when user logs in or component mounts
//   useEffect(() => {
//     if (currentUser) {
//       fetchCartCount();
//     } else {
//       setCartCount(0);
//     }
//   }, [currentUser]);

//   const fetchCartCount = async () => {
//     if (!currentUser) return;
    
//     try {
//       setLoadingCart(true);
//       const response = await cartApi.getCartCount();
//       setCartCount(response.data.totalItems || 0);
//     } catch (error) {
//       console.error('Error fetching cart count:', error);
//       // Don't show error toast for cart count to avoid annoyance
//       setCartCount(0);
//     } finally {
//       setLoadingCart(false);
//     }
//   };

//   const toggleDropdown = () => {
//     setIsDropdownOpen(!isDropdownOpen);
//   };

//   const handleLogout = async () => {
//     try {
//       await logoutUser();
//       logout();
//       setIsDropdownOpen(false);
//       setCartCount(0); // Reset cart count on logout
//       toast.success('Logout successful!');
      
//       if (context.setIsLogin) {
//         context.setIsLogin(false);
//       }
//     } catch (error) {
//       console.error('Logout error:', error);
//       // Still clear local state even if server logout fails
//       logout();
//       setCartCount(0);
//       if (context.setIsLogin) {
//         context.setIsLogin(false);
//       }
//     }
//   };

//   const handleCartClick = () => {
//     if (!currentUser) {
//       toast.info('Please login to view your cart');
//       return;
//     }
//     context.setOpenCartPanel(true);
//   };

//   return (
//     <header style={{ background: "#fff", padding: "8px 0" }}>
//       {/* Top Strip */}
//       <div
//         style={{
//           padding: "12px 0",
//           borderTop: "0.5px solid rgba(0,0,0,0.5)",
//           borderBottom: "1px solid rgba(0,0,0,0.5)",
//         }}
//       >
//         <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 16px" }}>
//           <div
//             style={{
//               display: "flex",
//               alignItems: "center",
//               justifyContent: "space-between",
//             }}
//           >
//             {/* Left text */}
//             <div style={{ width: "50%" }}>
//               <p style={{ fontSize: "12px", fontWeight: 500, margin: 0 }}>
//                 Get up to 50% off new season styles, limited time only
//               </p>
//             </div>

//             {/* Right links */}
//             <div style={{ width: "50%", display: "flex", justifyContent: "flex-end" }}>
//               <ul
//                 style={{
//                   display: "flex",
//                   alignItems: "center",
//                   gap: "16px",
//                   listStyle: "none",
//                   margin: 0,
//                   padding: 0,
//                 }}
//               >
//                 <li>
//                   <Link
//                     to="help-center"
//                     style={{
//                       fontSize: "13px",
//                       fontWeight: 500,
//                       textDecoration: "none",
//                       color: "inherit",
//                     }}
//                   >
//                     Help Center
//                   </Link>
//                 </li>
//                 <li>
//                   <Link
//                     to="order-tracking"
//                     style={{
//                       fontSize: "13px",
//                       fontWeight: 500,
//                       textDecoration: "none",
//                       color: "inherit",
//                     }}
//                   >
//                     Order Tracking
//                   </Link>
//                 </li>
//               </ul>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Main Header */}
//       <div style={{ padding: "24px 0", borderBottom: "0.5px solid transparent" }}>
//         <div
//           style={{
//             maxWidth: "1200px",
//             margin: "0 auto",
//             padding: "0 16px",
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "space-between",
//           }}
//         >
//           {/* Logo */}
//           <div style={{ width: "25%" }}>
//             <Link to={"/"} style={{ display: "block", height: "40px" }}>
//               <img
//                 src="/logo.png"
//                 style={{ height: "100%", width: "auto", objectFit: "contain" }}
//                 alt="The Jubian Marketplace"
//               />
//             </Link>
//           </div>

//           {/* Search */}
//           <div style={{ width: "40%" }}>
//             <Search />
//           </div>

//           {/* User + Icons */}
//           <div
//             style={{
//               width: "30%",
//               display: "flex",
//               alignItems: "center",
//               paddingLeft: "20px",
//             }}
//           >
//             <ul
//               style={{
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "flex-end",
//                 gap: "16px",
//                 listStyle: "none",
//                 margin: 0,
//                 padding: 0,
//                 width: "100%",
//               }}
//             > 

//             {/* LOGIN CONTEXT */}
//               {!currentUser ? (
//                 <li>
//                   <Link
//                     to="/login"
//                     style={{
//                       fontSize: "15px",
//                       fontWeight: 600,
//                       textDecoration: "none",
//                       color: "inherit",
//                     }}
//                   >
//                     Login
//                   </Link>{" "}
//                   | &nbsp;
//                   <Link
//                     to="/register"
//                     style={{
//                       fontSize: "15px",
//                       fontWeight: 600,
//                       textDecoration: "none",
//                       color: "inherit",
//                     }}
//                   >
//                     Register
//                   </Link>
//                 </li>
//               ) : (
//                 <DropdownContainer ref={dropdownRef}>
//                   <div 
//                     className="myAccountWrap flex items-center gap-3 cursor-pointer" 
//                     onClick={toggleDropdown}
//                   >
//                     <Button className="!w-[40px] !h-[40px] !min-w-[40px] !rounded-full !bg-[#f1f1f1] hover:!bg-[#e5e5e5]"> 
//                       <FaUser className="text-[20px] text-[rgba(0,0,0,0.5)]"/> 
//                     </Button> 

//                     <div className="info flex flex-col">
//                       <h4 className="text-[14px] font-[500]">{currentUser.name}</h4> 
//                       <span className="text-[12px] text-[#6b7280]">{currentUser.email}</span> 
//                     </div>
//                   </div>

//                   {isDropdownOpen && (
//                     <DropdownMenu>
//                       <UserInfo>
//                         <h4>{currentUser.name}</h4>
//                         <span>{currentUser.email}</span>
//                       </UserInfo>
                      
//                       <DropdownItem to="/my-account" onClick={() => setIsDropdownOpen(false)}>
//                         <DropdownIcon>
//                           <FaUser />
//                         </DropdownIcon>
//                         My Account
//                       </DropdownItem>
                      
//                       <DropdownItem to="/address" onClick={() => setIsDropdownOpen(false)}>
//                         <DropdownIcon>
//                           <FaMapMarkerAlt />
//                         </DropdownIcon>
//                         Address
//                       </DropdownItem>
                      
//                       <DropdownItem to="/orders" onClick={() => setIsDropdownOpen(false)}>
//                         <DropdownIcon>
//                           <FaClipboardList />
//                         </DropdownIcon>
//                         Orders
//                       </DropdownItem>
                      
//                       <DropdownItem to="/wishlist" onClick={() => setIsDropdownOpen(false)}>
//                         <DropdownIcon>
//                           <FaRegHeart />
//                         </DropdownIcon>
//                         My Wishlist
//                       </DropdownItem>
                      
//                       <DropdownItem 
//                         to="#" 
//                         onClick={(e) => {
//                           e.preventDefault();
//                           handleLogout();
//                         }}
//                         style={{ color: '#ef4444' }}
//                       >
//                         <DropdownIcon>
//                           <FaSignOutAlt />
//                         </DropdownIcon>
//                         Logout
//                       </DropdownItem>
//                     </DropdownMenu>
//                   )}
//                 </DropdownContainer>
//               )}

//               <li>
//                 <Tooltip title="Compare">
//                   <IconButton aria-label="compare">
//                     <StyledBadge badgeContent={4} color="primary">
//                       <IoGitCompareOutline />
//                     </StyledBadge>
//                   </IconButton>
//                 </Tooltip>
//               </li>

//               <li>
//                 <Tooltip title="Wishlist">
//                   <IconButton aria-label="wishlist">
//                     <StyledBadge badgeContent={4} color="primary">
//                       <FaRegHeart />
//                     </StyledBadge>
//                   </IconButton>
//                 </Tooltip>
//               </li>

//               <li>
//                 <Tooltip title={currentUser ? "Cart" : "Login to view cart"}>
//                   <IconButton 
//                     aria-label="cart" 
//                     onClick={handleCartClick}
//                     disabled={loadingCart}
//                   >
//                     <StyledBadge 
//                       badgeContent={loadingCart ? "..." : cartCount} 
//                       color="primary"
//                       showZero={true}
//                     >
//                       <MdOutlineShoppingCart />
//                     </StyledBadge>
//                   </IconButton>
//                 </Tooltip>
//               </li>
//             </ul>
//           </div>
//         </div>
//       </div>

//       <Navigation />
//     </header>
//   );
// };

// export default Header;























































// import React, { useContext, useState, useRef, useEffect } from "react";
// import { Link } from "react-router-dom";
// import Search from "../Search";
// import Badge from "@mui/material/Badge";
// import { styled } from "@mui/material/styles";
// import IconButton from "@mui/material/IconButton";
// import { MdOutlineShoppingCart } from "react-icons/md";
// import { IoGitCompareOutline } from "react-icons/io5";
// import { FaRegHeart, FaUser, FaSignOutAlt, FaMapMarkerAlt, FaListAlt, FaClipboardList } from "react-icons/fa";
// import Tooltip from "@mui/material/Tooltip";
// import Navigation from "./Navigation";
// import { MyContext } from "../../App";
// import { Button } from "@mui/material"; 
// import { useAuth } from "../../context/authContext";
// import { logoutUser } from '../../utils/api';
// import { toast } from "react-toastify";

// const StyledBadge = styled(Badge)(({ theme }) => ({
//   "& .MuiBadge-badge": {
//     right: -3,
//     top: 13,
//     border: `2px solid ${theme.palette.background.paper}`,
//     padding: "0.4px",
//     backgroundColor: "#ef7921",
//     color: "#fff",
//   },
// }));

// // Styled components for dropdown
// const DropdownContainer = styled('div')({
//   position: 'relative',
//   display: 'inline-block',
// });

// const DropdownMenu = styled('div')({
//   position: 'absolute',
//   top: '100%',
//   right: 0,
//   backgroundColor: '#fff',
//   borderRadius: '8px',
//   boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
//   border: '1px solid #e5e7eb',
//   width: '220px',
//   zIndex: 1000,
//   marginTop: '0.5rem',
//   overflow: 'hidden',
// });

// const DropdownItem = styled(Link)({
//   display: 'flex',
//   alignItems: 'center',
//   padding: '0.75rem 1rem',
//   textDecoration: 'none',
//   color: '#374151',
//   fontSize: '0.9rem',
//   fontWeight: '500',
//   transition: 'background-color 0.2s ease',
//   borderBottom: '1px solid #f3f4f6',
//   '&:hover': {
//     backgroundColor: '#f9fafb',
//     color: '#ef7921',
//   },
//   '&:last-child': {
//     borderBottom: 'none',
//   },
// });

// const DropdownIcon = styled('span')({
//   marginRight: '0.75rem',
//   color: '#6b7280',
//   fontSize: '1rem',
//   [`${DropdownItem}:hover &`]: {
//     color: '#ef7921',
//   },
// });

// const UserInfo = styled('div')({
//   padding: '1rem',
//   borderBottom: '1px solid #f3f4f6',
//   '& h4': {
//     margin: '0 0 0.25rem 0',
//     fontSize: '0.95rem',
//     fontWeight: '600',
//     color: '#1f2937',
//   },
//   '& span': {
//     fontSize: '0.8rem',
//     color: '#6b7280',
//   },
// });

// const Header = () => {
//   const context = useContext(MyContext);
//   const { currentUser, logout } = useAuth();
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);
//   const dropdownRef = useRef(null);

//   // Close dropdown when clicking outside
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//         setIsDropdownOpen(false);
//       }
//     };

//     document.addEventListener('mousedown', handleClickOutside);
//     return () => {
//       document.removeEventListener('mousedown', handleClickOutside);
//     };
//   }, []);

//   const toggleDropdown = () => {
//     setIsDropdownOpen(!isDropdownOpen);
//   };

//   const handleLogout = async () => {
//     try {
//       await logoutUser();
//       logout();
//       setIsDropdownOpen(false);

//       toast.success('Logout successful!');
      
//       if (context.setIsLogin) {
//         context.setIsLogin(false);
//       }
//     } catch (error) {
//       console.error('Logout error:', error);
//       // Still clear local state even if server logout fails
//       logout();
//       if (context.setIsLogin) {
//         context.setIsLogin(false);
//       }
//     }
//   };

//   return (
//     <header style={{ background: "#fff", padding: "8px 0" }}>
//       {/* Top Strip */}
//       <div
//         style={{
//           padding: "12px 0",
//           borderTop: "0.5px solid rgba(0,0,0,0.5)",
//           borderBottom: "1px solid rgba(0,0,0,0.5)",
//         }}
//       >
//         <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 16px" }}>
//           <div
//             style={{
//               display: "flex",
//               alignItems: "center",
//               justifyContent: "space-between",
//             }}
//           >
//             {/* Left text */}
//             <div style={{ width: "50%" }}>
//               <p style={{ fontSize: "12px", fontWeight: 500, margin: 0 }}>
//                 Get up to 50% off new season styles, limited time only
//               </p>
//             </div>

//             {/* Right links */}
//             <div style={{ width: "50%", display: "flex", justifyContent: "flex-end" }}>
//               <ul
//                 style={{
//                   display: "flex",
//                   alignItems: "center",
//                   gap: "16px",
//                   listStyle: "none",
//                   margin: 0,
//                   padding: 0,
//                 }}
//               >
//                 <li>
//                   <Link
//                     to="help-center"
//                     style={{
//                       fontSize: "13px",
//                       fontWeight: 500,
//                       textDecoration: "none",
//                       color: "inherit",
//                     }}
//                   >
//                     Help Center
//                   </Link>
//                 </li>
//                 <li>
//                   <Link
//                     to="order-tracking"
//                     style={{
//                       fontSize: "13px",
//                       fontWeight: 500,
//                       textDecoration: "none",
//                       color: "inherit",
//                     }}
//                   >
//                     Order Tracking
//                   </Link>
//                 </li>
//               </ul>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Main Header */}
//       <div style={{ padding: "24px 0", borderBottom: "0.5px solid transparent" }}>
//         <div
//           style={{
//             maxWidth: "1200px",
//             margin: "0 auto",
//             padding: "0 16px",
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "space-between",
//           }}
//         >
//           {/* Logo */}
//           <div style={{ width: "25%" }}>
//             <Link to={"/"} style={{ display: "block", height: "40px" }}>
//               <img
//                 src="/logo.png"
//                 style={{ height: "100%", width: "auto", objectFit: "contain" }}
//                 alt="The Jubian Marketplace"
//               />
//             </Link>
//           </div>

//           {/* Search */}
//           <div style={{ width: "40%" }}>
//             <Search />
//           </div>

//           {/* User + Icons */}
//           <div
//             style={{
//               width: "30%",
//               display: "flex",
//               alignItems: "center",
//               paddingLeft: "20px",
//             }}
//           >
//             <ul
//               style={{
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "flex-end",
//                 gap: "16px",
//                 listStyle: "none",
//                 margin: 0,
//                 padding: 0,
//                 width: "100%",
//               }}
//             > 

//             {/* LOGIN CONTEXT */}
//               {!currentUser ? (
//                 <li>
//                   <Link
//                     to="/login"
//                     style={{
//                       fontSize: "15px",
//                       fontWeight: 600,
//                       textDecoration: "none",
//                       color: "inherit",
//                     }}
//                   >
//                     Login
//                   </Link>{" "}
//                   | &nbsp;
//                   <Link
//                     to="/register"
//                     style={{
//                       fontSize: "15px",
//                       fontWeight: 600,
//                       textDecoration: "none",
//                       color: "inherit",
//                     }}
//                   >
//                     Register
//                   </Link>
//                 </li>
//               ) : (
//                 <DropdownContainer ref={dropdownRef}>
//                   <div 
//                     className="myAccountWrap flex items-center gap-3 cursor-pointer" 
//                     onClick={toggleDropdown}
//                   >
//                     <Button className="!w-[40px] !h-[40px] !min-w-[40px] !rounded-full !bg-[#f1f1f1] hover:!bg-[#e5e5e5]"> 
//                       <FaUser className="text-[20px] text-[rgba(0,0,0,0.5)]"/> 
//                     </Button> 

//                     <div className="info flex flex-col">
//                       <h4 className="text-[14px] font-[500]">{currentUser.name}</h4> 
//                       <span className="text-[12px] text-[#6b7280]">{currentUser.email}</span> 
//                     </div>
//                   </div>

//                   {isDropdownOpen && (
//                     <DropdownMenu>
//                       <UserInfo>
//                         <h4>{currentUser.name}</h4>
//                         <span>{currentUser.email}</span>
//                       </UserInfo>
                      
//                       <DropdownItem to="/my-account" onClick={() => setIsDropdownOpen(false)}>
//                         <DropdownIcon>
//                           <FaUser />
//                         </DropdownIcon>
//                         My Account
//                       </DropdownItem>
                      
//                       <DropdownItem to="/address" onClick={() => setIsDropdownOpen(false)}>
//                         <DropdownIcon>
//                           <FaMapMarkerAlt />
//                         </DropdownIcon>
//                         Address
//                       </DropdownItem>
                      
//                       <DropdownItem to="/orders" onClick={() => setIsDropdownOpen(false)}>
//                         <DropdownIcon>
//                           <FaClipboardList />
//                         </DropdownIcon>
//                         Orders
//                       </DropdownItem>
                      
//                       <DropdownItem to="/wishlist" onClick={() => setIsDropdownOpen(false)}>
//                         <DropdownIcon>
//                           <FaRegHeart />
//                         </DropdownIcon>
//                         My Wishlist
//                       </DropdownItem>
                      
//                       <DropdownItem 
//                         to="#" 
//                         onClick={(e) => {
//                           e.preventDefault();
//                           handleLogout();
//                         }}
//                         style={{ color: '#ef4444' }}
//                       >
//                         <DropdownIcon>
//                           <FaSignOutAlt />
//                         </DropdownIcon>
//                         Logout
//                       </DropdownItem>
//                     </DropdownMenu>
//                   )}
//                 </DropdownContainer>
//               )}

//               <li>
//                 <Tooltip title="Compare">
//                   <IconButton aria-label="compare">
//                     <StyledBadge badgeContent={4} color="primary">
//                       <IoGitCompareOutline />
//                     </StyledBadge>
//                   </IconButton>
//                 </Tooltip>
//               </li>

//               <li>
//                 <Tooltip title="Wishlist">
//                   <IconButton aria-label="wishlist">
//                     <StyledBadge badgeContent={4} color="primary">
//                       <FaRegHeart />
//                     </StyledBadge>
//                   </IconButton>
//                 </Tooltip>
//               </li>

//               <li>
//                 <Tooltip title="Cart">
//                   <IconButton aria-label="cart" onClick={() => context.setOpenCartPanel(true)}>
//                     <StyledBadge badgeContent={4} color="primary">
//                       <MdOutlineShoppingCart />
//                     </StyledBadge>
//                   </IconButton>
//                 </Tooltip>
//               </li>
//             </ul>
//           </div>
//         </div>
//       </div>

//       <Navigation />
//     </header>
//   );
// };

// export default Header;