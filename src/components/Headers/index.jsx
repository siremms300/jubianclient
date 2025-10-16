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

// Styled components for dropdown
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
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
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

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = () => {
    // Handle logout logic here
    console.log('User logged out');
    setIsDropdownOpen(false);
    // You would typically update context or state to reflect logout
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

            {/* LOGIN CONTEXT */}
              {!context.isLogin ? (
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
                      <h4 className="text-[14px] font-[500]">Idoga Emmanuel</h4> 
                      <span className="text-[12px] text-[#6b7280]">siremms300@gmail.com</span> 
                    </div>
                  </div>

                  {isDropdownOpen && (
                    <DropdownMenu>
                      <UserInfo>
                        <h4>Idoga Emmanuel</h4>
                        <span>siremms300@gmail.com</span>
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
                        to="/login" 
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
                <Tooltip title="Cart">
                  <IconButton aria-label="cart" onClick={() => context.setOpenCartPanel(true)}>
                    <StyledBadge badgeContent={4} color="primary">
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
























































































// import React, { useContext } from "react";
// import { Link } from "react-router-dom";
// import Search from "../Search";
// import Badge from "@mui/material/Badge";
// import { styled } from "@mui/material/styles";
// import IconButton from "@mui/material/IconButton";
// import { MdOutlineShoppingCart } from "react-icons/md";
// import { IoGitCompareOutline } from "react-icons/io5";
// import { FaRegHeart } from "react-icons/fa6";
// import Tooltip from "@mui/material/Tooltip";
// import Navigation from "./Navigation";
// import { MyContext } from "../../App";
// import { Button } from "@mui/material"; 
// import { FaUser } from "react-icons/fa";

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

// const Header = () => {


//   const context = useContext(MyContext) 
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
              
//               <ul
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
  

//                 {/* LOGIN */}
//                {
//                 context.isLogin ? 
//                  <li>
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
//                   {/* REGISTER */} 

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
//                 :
//                 // "user login" 
//                 <div className="myAccountWrap flex items-center gap-3 cursor-pointer">
//                   <Button className="!w-[30px] !h-[30px] !min-w-[30px] !rounded-full !bg-[#f1f1f1]"> 
//                     <FaUser className="text-[30px] text-[rgba(0,0,0,0.5)]"/> 
//                   </Button> 

//                   <div className="info flex flex-col">
//                     <h4 className="text-[12px] font-[400]">Idoga Emmanuel</h4> 
//                     <span className="text-[12px]">siremms300@gmail.com</span> 
//                   </div>
//                 </div>
//                 }
 
 
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
//                   <IconButton aria-label="cart" onClick={()=> context.setOpenCartPanel(true)}>
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






















// import React from "react";
// import { Link } from "react-router-dom";
// import Search from "../Search";
// import Badge from "@mui/material/Badge";
// import { styled } from "@mui/material/styles";
// import IconButton from "@mui/material/IconButton";
// import { MdOutlineShoppingCart } from "react-icons/md";
// import { IoGitCompareOutline } from "react-icons/io5";
// import { FaRegHeart } from "react-icons/fa6";
// import Tooltip from "@mui/material/Tooltip";
// import Navigation from "./Navigation";

// // 🎨 Styled Badge (reusable)
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

// // 🗂 Config: Top bar links
// const topLinks = [
//   { label: "Help Center", link: "/help-center" },
//   { label: "Order Tracking", link: "/order-tracking" },
// ];

// // 🗂 Config: Auth links
// const authLinks = [
//   { label: "Login", link: "/login" },
//   { label: "Register", link: "/register" },
// ];

// // 🗂 Config: Icon buttons with tooltips + badges
// const actionIcons = [
//   {
//     label: "Compare",
//     icon: <IoGitCompareOutline />,
//     badge: 4,
//     link: "/compare",
//   },
//   {
//     label: "Wishlist",
//     icon: <FaRegHeart />,
//     badge: 4,
//     link: "/wishlist",
//   },
//   {
//     label: "Cart",
//     icon: <MdOutlineShoppingCart />,
//     badge: 4,
//     link: "/cart",
//   },
// ];

// const Header = () => {
//   return (
//     <header className="bg-white py-2">
//       {/* 🔝 Top strip */}
//       <div
//         className="top-strip py-4 border-t-[0.5px] border-b-[1px]"
//         style={{ borderColor: "rgba(0, 0, 0, 0.5)" }}
//       >
//         <div className="container">
//           <div className="flex items-center justify-between">
//             <div className="col1 w-[50%]">
//               <p className="text-[12px] font-[500]">
//                 Get up to 50% off new season styles, limited time only
//               </p>
//             </div>

//             <div className="col2 flex items-center justify-end">
//               <ul className="flex items-center gap-3 justify-end w-full">
//                 {topLinks.map((item, index) => (
//                   <li key={index} className="list-none">
//                     <Link
//                       to={item.link}
//                       className="text-[13px] link font-[500] transition"
//                     >
//                       {item.label}
//                     </Link>
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* 🖼 Logo + Search + Icons */}
//       <div className="header py-6 border-b-[0.1px] border-none">
//         <div className="container flex items-center justify-between">
//           {/* Logo */}
//           <div className="col1 w-[25%]">
//             <Link to={"/"} className="block h-[40px]">
//               <img
//                 src="/logo.png"
//                 className="h-full w-auto object-contain"
//                 alt="The Jubian Marketplace"
//               />
//             </Link>
//           </div>

//           {/* Search */}
//           <div className="col2 w-[45%]">
//             <Search />
//           </div>

//           {/* Auth + Icons */}
//           <div className="col3 w-[30%] flex items-center pl-7">
//             <ul className="flex items-center justify-end gap-3 w-full">
//               {/* Auth Links */}
//               <li className="list-none">
//                 {authLinks.map((link, index) => (
//                   <React.Fragment key={index}>
//                     <Link
//                       to={link.link}
//                       className="link transition text-[15px] font-[588]"
//                     >
//                       {link.label}
//                     </Link>
//                     {index === 0 && " | "} {/* separator between Login/Register */}
//                   </React.Fragment>
//                 ))}
//               </li>

//               {/* Action Icons */}
//               {actionIcons.map((action, index) => (
//                 <li key={index}>
//                   <Tooltip title={action.label}>
//                     <IconButton aria-label={action.label.toLowerCase()}>
//                       <StyledBadge badgeContent={action.badge}>
//                         {action.icon}
//                       </StyledBadge>
//                     </IconButton>
//                   </Tooltip>
//                 </li>
//               ))}
//             </ul>
//           </div>
//         </div>
//       </div>

//       {/* Navigation Menu */}
//       <Navigation />
//     </header>
//   );
// };

// export default Header;


















// import React from "react";
// import { Link } from "react-router-dom";
// import Search from "../Search";
// import Badge from "@mui/material/Badge";
// import { styled } from "@mui/material/styles";
// import IconButton from "@mui/material/IconButton";
// import { MdOutlineShoppingCart } from "react-icons/md";
// import { IoGitCompareOutline } from "react-icons/io5";
// import { FaRegHeart } from "react-icons/fa6";
// import Tooltip from "@mui/material/Tooltip";
// import Navigation from "./Navigation";

// const StyledBadge = styled(Badge)(({ theme }) => ({
//     "& .MuiBadge-badge": {
//         right: -3,
//         top: 13,
//         border: `2px solid ${theme.palette.background.paper}`,
//         padding: "0.4px",
//         backgroundColor: '#ef7921', // Your orange
//         color: '#fff',
//     },
// }));

// const Header = () => {
//     return (
//         <header className="bg-white py-2">
//           <div className="top-strip py-4 border-t-[0.5px]  border-b-[1px]" style={{ borderColor: 'rgba(0, 0, 0, 0.5)' }}>
//              <div className="container">
//               <div className="flex items-center justify-between">
//                 <div className="col1 w-[50%]">
//                   <p className="text-[12px] font-[500]">
//                       Get up to 50% off new season styles, limited time only
//                   </p>
//                 </div>

                

//                  <div className="col2 flex items-center justify-end">
//                    <ul className='flex items-center gap-3 justify-end w-full'>
//                          <li className="list-none">
//                               <Link to='help-center' className='text-[13px] link font-[500] transition'> 
//                                   Help Center
//                              </Link>
//                          </li> 
//                            <li className="list-none">
//                              <Link to='order-tracking' className='text-[13px] link font-[500] transition'> 
//                                    Order Tracking
//                               </Link>
//                             </li>
//                         </ul>
//                   </div>
//               </div>
//              </div>
//           </div>
//           <div className="header py-6 border-b-[0.1px] border-none">
//             <div className="container flex items-center justify-between">
//                 <div className="col1 w-[25%]">
//                     <Link to={"/"} className="block h-[40px]" >
//                       <img 
//                         src='/logo.png' 
//                         className="h-full w-auto object-contain" 
//                         alt="The Jubian Marketplace"
//                       /> 
//                     </Link>
//                 </div>
                
//                 <div className="col2 w-[45%]">
//                     <Search />
//                 </div>
                
//                 <div className="col3 w-[30%] flex items-center pl-7">
//                     <ul className="flex items-center justify-end gap-3 w-full">
//                         <li className="list-none">
//                             <Link
//                                 to="/login"
//                                 className="link transition text-[15px] font-[588]"
//                             >
//                                 Login
//                             </Link>{" "}
//                             | &nbsp;
//                             <Link
//                                 to="/register"
//                                 className="link transition text-[15px] font-[588]"
//                             >
//                                 Register
//                             </Link>
//                         </li>
                        
//                         <li>
//                             <Tooltip title="Compare">
//                                 <IconButton aria-label="compare">
//                                     <StyledBadge badgeContent={4} color="primary">
//                                         <IoGitCompareOutline />
//                                     </StyledBadge>
//                                 </IconButton>
//                             </Tooltip>
//                         </li>
                        
//                         <li>
//                             <Tooltip title="Wishlist">
//                                 <IconButton aria-label="wishlist">
//                                     <StyledBadge badgeContent={4} color="primary">
//                                         <FaRegHeart />
//                                     </StyledBadge>
//                                 </IconButton>
//                             </Tooltip>
//                         </li>
                        
//                         <li>
//                             <Tooltip title="Cart">
//                                 <IconButton aria-label="cart">
//                                     <StyledBadge badgeContent={4} color="primary">
//                                         <MdOutlineShoppingCart />
//                                     </StyledBadge>
//                                 </IconButton>
//                             </Tooltip>
//                         </li>
//                     </ul>
//                 </div>
//             </div>
//           </div> 

//           <Navigation />
            
//         </header>
//     );
// };

// export default Header;













// import React from 'react';
// import { Link } from 'react-router-dom';
// import Search from '../Search';
// import { styled } from '@mui/material/styles';
// import IconButton from '@mui/material/IconButton';
// import { MdOutlineShoppingCart } from 'react-icons/md';
// import { IoIosGitCompare, IoIosHeartEmpty } from "react-icons/io";

// const StyledBadge = styled('span')(({ theme }) => ({
//   display: 'inline-block',
//   backgroundColor: '#ef7921',
//   color: '#fff',
//   borderRadius: '50%',
//   fontSize: '12px',
//   width: '18px',
//   height: '18px',
//   textAlign: 'center',
//   lineHeight: '18px',
//   position: 'absolute',
//   top: '-5px',
//   right: '-5px',
// }));

// const Header = () => {
//   return (
//     <header >
//       {/* Top Strip */}
//       <div className="bg-gray-50 text-gray-600 text-sm py-1 p-5">
//         <div className="container mx-auto flex justify-between items-center">
//           <p className="text-[13px]">
//             Get up to 50% off new season styles, limited time only
//           </p>
//           <ul className="flex gap-4">
//             <li>
//               <Link to="/help-center" className="hover:text-black">
//                 Help Center
//               </Link>
//             </li>
//             <li>
//               <Link to="/order-tracking" className="hover:text-black">
//                 Order Tracking
//               </Link>
//             </li>
//           </ul>
//         </div>
//       </div>

//       {/* Main Header */}

//       <div className="header py-3 p-3 border-b-[1px] border-gray-200"> 
//         <div className="container flex items-center justify-between">

//           <div className="col1 w-[25%]"> 
//             <Link to={"/"} className="block h-[40px]" >
//                 <img 
//                     src='/logo.png' 
//                     className="h-full w-auto object-contain" 
//                     alt="The Jubian Marketplace"
//                 /> 
//             </Link>
//           </div>

//           {/* Search */}
//            <div className="col2 w-[45%]">
//                 <Search />
//            </div>

//           <div className="col3 w-[30%] flex items-center">
//             <div>
//               <Link to="/login" className="hover:text-black">Login</Link>
//               <span className="mx-1">|</span>
//               <Link to="/register" className="hover:text-black">Register</Link>
//             </div>
//             <div className="flex gap-4 relative">
//               <IconButton>
//                 <IoIosGitCompare size={22} title='Compare'/>
//                 <StyledBadge>0</StyledBadge>
//               </IconButton>
//               <IconButton>
//                 <IoIosHeartEmpty size={22} title='Wishlist'/>
//                 <StyledBadge>0</StyledBadge>
//               </IconButton>
//               <IconButton>
//                 <MdOutlineShoppingCart size={22} title='Cart'/>
//                 <StyledBadge>0</StyledBadge>
//               </IconButton>
//             </div>
//           </div>
//         </div>
//       </div>
//     </header>
//   );
// };

// export default Header;

















// import React from 'react'
// import { Link } from 'react-router-dom'
// import Search from '../Search'

// // import Badge, { BadgeProps } from '@mui/material/Badge';
// import { styled } from '@mui/material/styles';
// import IconButton from '@mui/material/IconButton';
// import {MdOutlineShoppingCart} from 'react-icons/md'
// import {IoIosGitCompare} from 'react-icons/io' 
// import { IoIosHeartEmpty } from "react-icons/io";
// import Tooltip from '@mui/material/Tooltip';


// const StyledBadge = styled(Badge)<BadgeProps>(({ theme }) => ({
//   '& .MuiBadge-badge': {
//     right: -3,
//     top: 13,
//     border: `2px solid ${(theme.vars ?? theme).palette.background.paper}`,
//     padding: '0 4px',
//   },
// }));


// const Header = () => {
//   return (
//     <header>
//         <div className="top-strip py-2 border-t-[1px] border-gray-250 border-b-[1px] mt-5"> 
//             <div className="container">
//                 <div className="flex items-center justify-between">
//                     <div className="col1 w-[50%]">
//                         <p className='text-[14px]'> get up to 50% off new season styles. limited time only</p>
//                     </div>


//                     <div className="col2 flex items-center justify-end">
//                         <ul className='flex items-center gap-3 justify-end w-full'>
//                             <li className="list-none">
//                                 <Link to='help-center' className='text-[13px] link font-[500] transition'> 
//                                     Help Center
//                                 </Link>
//                             </li> 
//                             <li className="list-none">
//                                 <Link to='order-tracking' className='text-[13px] link font-[500] transition'> 
//                                     Order Tracking
//                                 </Link>
//                             </li>
//                         </ul>
//                     </div>
//                 </div> 
//             </div>
//         </div> 

//         <div className="header py-3">
//             <div className="container flex items-center justify-between">
//                 <div className="col1 w-[25%]">
//                     <Link to={"/"} className="block h-[40px]" >
//                         <img 
//                             src='/logo.png' 
//                             className="h-full w-auto object-contain" 
//                             alt="Company Logo"
//                         /> 
//                     </Link>
//                 </div>
//                 <div className="col2 w-[45%]">
//                     <Search />
//                 </div>
//                 <div className="col3 w-[30%] flex items-center">
//                     <ul className="flex items-center gap-3">
//                         <li className='list-none'>
//                             <Link to='/login' className='link transition text-[15px] font-[500]'>Login</Link> | &nbsp;
//                             <Link to='/register' className='link transition text-[15px] font-[500]'>Register</Link>
//                         </li> 

//                          <Tooltip title="Delete">
//                             <IconButton>
//                             <DeleteIcon />
//                             </IconButton>
//                         </Tooltip>
//                         <Tooltip describeChild title="Does not add if it already exists.">
//                             <Button>Add</Button>
//                         </Tooltip>

//                         <li>
//                             <IconButton aria-label="cart">
//                                 <StyledBadge badgeContent={4} color="secondary">
//                                     <IoIosGitCompare />
//                                 </StyledBadge>
//                             </IconButton>
//                         </li>
//                         <li>
//                             <IconButton aria-label="cart">
//                                 <StyledBadge badgeContent={4} color="secondary">
//                                     <IoIosHeartEmpty />
//                                 </StyledBadge>
//                             </IconButton>
//                         </li>
//                         <li>
//                             <IconButton aria-label="cart">
//                                 <StyledBadge badgeContent={4} color="secondary">
//                                     <MdOutlineShoppingCart />
//                                 </StyledBadge>
//                             </IconButton>
//                         </li>
//                     </ul>
//                 </div>
//             </div>
//         </div>
//     </header>
//   )
// }

// export default Header 
