import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import Rating from "@mui/material/Rating";
import Button from "@mui/material/Button";
import { CiHeart } from "react-icons/ci";
import { IoIosGitCompare } from "react-icons/io";
import { MdOutlineZoomOutMap } from "react-icons/md";
import { CiShare1 } from "react-icons/ci";
import { FaShoppingCart } from "react-icons/fa";
import { MyContext } from "../../App";
import { ToastContainer, toast } from 'react-toastify';
import { cartApi } from "../../utils/cartApi";
import { useAuth } from "../../context/authContext";

const ProductItem = ({ product }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [addingToCart, setAddingToCart] = useState(false);
  const context = useContext(MyContext);
  const { currentUser } = useAuth();

  const handleAddToCart = async () => {
    if (!currentUser) {
      toast.error('Please login to add items to cart');
      return;
    }

    if (!product?._id) {
      toast.error('Product information is incomplete');
      return;
    }

    try {
      setAddingToCart(true);
      await cartApi.addToCart(product._id, 1);
      toast.success('Product added to cart');
      
      // Refresh cart count in header
      if (context.refreshCartCount) {
        context.refreshCartCount();
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
      toast.error(error.response?.data?.message || error.message || 'Failed to add to cart');
    } finally {
      setAddingToCart(false);
    }
  };

  if (!product) return null;

  const {
    name,
    category,
    price,
    oldPrice,
    wholesalePrice,
    moq = 1,
    wholesaleEnabled,
    images = [],
    rating = 0,
    _id,
    status = "In Stock"
  } = product;

  const mainImage = images[0]?.url || '/src/assets/images/grocery.jpg';

  const discountPercentage = oldPrice && oldPrice > price 
    ? Math.round(((oldPrice - price) / oldPrice) * 100)
    : 0;

  return (
    <div
      style={{
        borderRadius: "6px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        overflow: "hidden",
        border: "1px solid rgba(0,0,0,0.1)",
        backgroundColor: "#fff",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        style={{
          position: "relative",
          overflow: "hidden",
          borderRadius: "6px",
        }}
      >
        <Link to={`/product/${_id}`}>
          <div style={{ height: "150px", overflow: "hidden", position: "relative" }}>
            <img 
              src={mainImage} 
              style={{ 
                width: "100%", 
                height: "100%",
                objectFit: "cover",
                transform: isHovered ? "scale(1.1)" : "scale(1)",
                transition: "transform 0.3s ease",
              }} 
              alt={name}
              onError={(e) => {
                e.target.src = '/src/assets/images/grocery.jpg';
              }}
            />
          </div>
        </Link>

        {discountPercentage > 0 && (
          <span
            style={{
              position: "absolute",
              top: "10px",
              left: "10px",
              zIndex: 50,
              backgroundColor: "#ef7921",
              color: "#fff",
              borderRadius: "6px",
              padding: "3px 6px",
              fontSize: "10px",
              fontWeight: 500,
            }}
          >
            -{discountPercentage}%
          </span>
        )}

        {wholesaleEnabled && (
          <span
            style={{
              position: "absolute",
              top: "10px",
              right: "10px",
              zIndex: 50,
              backgroundColor: "#10b981",
              color: "#fff",
              borderRadius: "6px",
              padding: "4px 8px",
              fontSize: "10px",
              fontWeight: 500,
            }}
          >
            Wholesale Available
          </span>
        )}

        <div
          style={{
            position: "absolute",
            top: isHovered ? "10px" : "-200px",
            right: "5px",
            zIndex: 50,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "8px",
            width: "50px",
            transition: "top 0.3s ease",
            opacity: isHovered ? 1 : 0,
          }}
        >
          <Button
            style={{
              width: "35px",
              height: "35px",
              minWidth: "35px",
              borderRadius: "50%",
              backgroundColor: "#fff",
              color: "#000",
              boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
            }}
            onClick={() => context?.setOpenProductModalDetails?.(true)}
          >
            <MdOutlineZoomOutMap style={{ fontSize: "18px" }} />
          </Button>
          <Button
            style={{
              width: "35px",
              height: "35px",
              minWidth: "35px",
              borderRadius: "50%",
              backgroundColor: "#fff",
              color: "#000",
              boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
            }}
          >
            <CiHeart style={{ fontSize: "18px" }} />
          </Button>
          <Button
            style={{
              width: "35px",
              height: "35px",
              minWidth: "35px",
              borderRadius: "50%",
              backgroundColor: "#fff",
              color: "#000",
              boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
            }}
          >
            <IoIosGitCompare style={{ fontSize: "18px" }} />
          </Button>
          <Button
            style={{
              width: "35px",
              height: "35px",
              minWidth: "35px",
              borderRadius: "50%",
              backgroundColor: "#fff",
              color: "#000",
              boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
            }}
          >
            <CiShare1 style={{ fontSize: "18px" }} />
          </Button>
        </div>
      </div>

      <div
        style={{
          padding: "16px",
          boxShadow: "inset 0 1px 3px rgba(0,0,0,0.05)",
          backgroundColor: "#fff",
        }}
      >
        <h6 style={{ fontSize: "12px", margin: 0 }}>
          <Link to={`/products?category=${category?._id}`}>
            {category?.name || 'Uncategorized'}
          </Link>
        </h6>

        <Link to={`/product/${_id}`} style={{ textDecoration: "none", color: "inherit" }}>
          <h3
            style={{
              fontSize: "13px",
              marginTop: "6px",
              marginBottom: "6px",
              fontWeight: 500,
              color: "rgba(0,0,0,0.6)",
            }}
          >
            {name}
          </h3>
          <Rating name="size-small" value={rating} precision={0.5} size="small" readOnly />
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginTop: "8px" }}>
            {oldPrice && oldPrice > price && (
              <span
                style={{
                  textDecoration: "line-through",
                  color: "#6b7280",
                  fontSize: "16px",
                  fontWeight: "bold",
                }}
              >
                ${oldPrice}
              </span>
            )}
            <span
              style={{
                color: "#ef7921",
                fontWeight: 600,
                fontSize: "16px",
              }}
            >
              ${price}
            </span>
          </div>
          
          {wholesaleEnabled && wholesalePrice && (
            <div style={{ marginTop: "8px" }}>
              <div style={{ 
                display: "flex", 
                alignItems: "center", 
                gap: "8px",
                fontSize: "12px",
                color: "#10b981"
              }}>
                <span>Wholesale: ${wholesalePrice}</span>
                <span style={{ 
                  backgroundColor: "#10b981", 
                  color: "white", 
                  padding: "2px 6px", 
                  borderRadius: "4px",
                  fontSize: "10px"
                }}>
                  MOQ: {moq}
                </span>
              </div>
              <div style={{ 
                fontSize: "11px", 
                color: "#6b7280", 
                marginTop: "4px" 
              }}>
                Save ${(price - wholesalePrice).toFixed(2)} per unit
              </div>
            </div>
          )}
        </Link>

        <div style={{marginTop: "8px"}}>
          <Button 
            className="btn-org btn-org:hover gap-2 flex w-full"
            onClick={handleAddToCart}
            disabled={status === "Out of Stock" || addingToCart}
            startIcon={addingToCart ? null : <FaShoppingCart />}
          >
            {addingToCart ? "Adding..." : status === "Out of Stock" ? "Out of Stock" : "Add to Cart"}
          </Button>
        </div> 
      </div>
    </div>
  );
};

export default ProductItem;










































































































// import React, { useState, useContext } from "react";
// import { Link } from "react-router-dom";
// import Rating from "@mui/material/Rating";
// import Button from "@mui/material/Button";
// import { CiHeart } from "react-icons/ci";
// import { IoIosGitCompare } from "react-icons/io";
// import { MdOutlineZoomOutMap } from "react-icons/md";
// import { CiShare1 } from "react-icons/ci";
// import { FaShoppingCart } from "react-icons/fa";
// import { MyContext } from "../../App";
// import { ToastContainer, toast } from 'react-toastify';
// import { cartApi } from "../../utils/cartApi";



// const ProductItem = ({ product }) => {
//   const [isHovered, setIsHovered] = useState(false);
//   const context = useContext(MyContext);


//   // In your ProductItem component
//  const handleAddToCart = async () => {
//   // if (!context?.currentUser) {
//   //   toast.error('Please login to add items to cart');
//   //   return;
//   // }

//   try {
//     await cartApi.addToCart(_id, 1);
//     toast.success('Product added to cart');
//     // You might want to refresh cart count in header here
//   } catch (error) {
//     console.error('Error adding to cart:', error);
//     toast.error(error.message || 'Failed to add to cart');
//   }
//  };
 


//   if (!product) return null;

//   const {
//     name,
//     category,
//     price,
//     oldPrice,
//     wholesalePrice,
//     moq = 1,
//     wholesaleEnabled,
//     images = [],
//     rating = 0,
//     _id
//   } = product;

//   // Use only backend images - first image for both normal and hover state
//   const mainImage = images[0]?.url || '/src/assets/images/grocery.jpg';

//   const discountPercentage = oldPrice && oldPrice > price 
//     ? Math.round(((oldPrice - price) / oldPrice) * 100)
//     : 0;

//   return (
//     <div
//       style={{
//         borderRadius: "6px",
//         boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
//         overflow: "hidden",
//         border: "1px solid rgba(0,0,0,0.1)",
//         backgroundColor: "#fff",
//       }}
//       onMouseEnter={() => setIsHovered(true)}
//       onMouseLeave={() => setIsHovered(false)}
//     >
//       <div
//         style={{
//           position: "relative",
//           overflow: "hidden",
//           borderRadius: "6px",
//         }}
//       >
//         <Link to={`/product/${_id}`}>
//           <div style={{ height: "150px", overflow: "hidden", position: "relative" }}>
//             <img 
//               src={mainImage} 
//               style={{ 
//                 width: "100%", 
//                 height: "100%",
//                 objectFit: "cover",
//                 transform: isHovered ? "scale(1.1)" : "scale(1)",
//                 transition: "transform 0.3s ease",
//               }} 
//               alt={name}
//               onError={(e) => {
//                 e.target.src = '/src/assets/images/grocery.jpg';
//               }}
//             />
//           </div>
//         </Link>

//         {discountPercentage > 0 && (
//           <span
//             style={{
//               position: "absolute",
//               top: "10px",
//               left: "10px",
//               zIndex: 50,
//               backgroundColor: "#ef7921",
//               color: "#fff",
//               borderRadius: "6px",
//               padding: "3px 6px",
//               fontSize: "10px",
//               fontWeight: 500,
//             }}
//           >
//             -{discountPercentage}%
//           </span>
//         )}

//         {wholesaleEnabled && (
//           <span
//             style={{
//               position: "absolute",
//               top: "10px",
//               right: "10px",
//               zIndex: 50,
//               backgroundColor: "#10b981",
//               color: "#fff",
//               borderRadius: "6px",
//               padding: "4px 8px",
//               fontSize: "10px",
//               fontWeight: 500,
//             }}
//           >
//             Wholesale Available
//           </span>
//         )}

//         <div
//           style={{
//             position: "absolute",
//             top: isHovered ? "10px" : "-200px",
//             right: "5px",
//             zIndex: 50,
//             display: "flex",
//             flexDirection: "column",
//             alignItems: "center",
//             gap: "8px",
//             width: "50px",
//             transition: "top 0.3s ease",
//             opacity: isHovered ? 1 : 0,
//           }}
//         >
//           <Button
//             style={{
//               width: "35px",
//               height: "35px",
//               minWidth: "35px",
//               borderRadius: "50%",
//               backgroundColor: "#fff",
//               color: "#000",
//               boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
//             }}
//             onClick={() => context?.setOpenProductModalDetails?.(true)}
//           >
//             <MdOutlineZoomOutMap style={{ fontSize: "18px" }} />
//           </Button>
//           <Button
//             style={{
//               width: "35px",
//               height: "35px",
//               minWidth: "35px",
//               borderRadius: "50%",
//               backgroundColor: "#fff",
//               color: "#000",
//               boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
//             }}
//           >
//             <CiHeart style={{ fontSize: "18px" }} />
//           </Button>
//           <Button
//             style={{
//               width: "35px",
//               height: "35px",
//               minWidth: "35px",
//               borderRadius: "50%",
//               backgroundColor: "#fff",
//               color: "#000",
//               boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
//             }}
//           >
//             <IoIosGitCompare style={{ fontSize: "18px" }} />
//           </Button>
//           <Button
//             style={{
//               width: "35px",
//               height: "35px",
//               minWidth: "35px",
//               borderRadius: "50%",
//               backgroundColor: "#fff",
//               color: "#000",
//               boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
//             }}
//           >
//             <CiShare1 style={{ fontSize: "18px" }} />
//           </Button>
//         </div>
//       </div>

//       <div
//         style={{
//           padding: "16px",
//           boxShadow: "inset 0 1px 3px rgba(0,0,0,0.05)",
//           backgroundColor: "#fff",
//         }}
//       >
//         <h6 style={{ fontSize: "12px", margin: 0 }}>
//           <Link to={`/products?category=${category?._id}`}>
//             {category?.name || 'Uncategorized'}
//           </Link>
//         </h6>

//         <Link to={`/product/${_id}`} style={{ textDecoration: "none", color: "inherit" }}>
//           <h3
//             style={{
//               fontSize: "13px",
//               marginTop: "6px",
//               marginBottom: "6px",
//               fontWeight: 500,
//               color: "rgba(0,0,0,0.6)",
//             }}
//           >
//             {name} 
//             {/* {product?.brand} */}
//           </h3>
//           <Rating name="size-small" value={rating} precision={0.5} size="small" readOnly />
//           <div style={{ display: "flex", alignItems: "center", gap: "12px", marginTop: "8px" }}>
//             {oldPrice && oldPrice > price && (
//               <span
//                 style={{
//                   textDecoration: "line-through",
//                   color: "#6b7280",
//                   fontSize: "16px",
//                   fontWeight: "bold",
//                 }}
//               >
//                 ${oldPrice}
//               </span>
//             )}
//             <span
//               style={{
//                 color: "#ef7921",
//                 fontWeight: 600,
//                 fontSize: "16px",
//               }}
//             >
//               ${price}
//             </span>
//           </div>
          
//           {wholesaleEnabled && wholesalePrice && (
//             <div style={{ marginTop: "8px" }}>
//               <div style={{ 
//                 display: "flex", 
//                 alignItems: "center", 
//                 gap: "8px",
//                 fontSize: "12px",
//                 color: "#10b981"
//               }}>
//                 <span>Wholesale: ${wholesalePrice}</span>
//                 <span style={{ 
//                   backgroundColor: "#10b981", 
//                   color: "white", 
//                   padding: "2px 6px", 
//                   borderRadius: "4px",
//                   fontSize: "10px"
//                 }}>
//                   MOQ: {moq}
//                 </span>
//               </div>
//               <div style={{ 
//                 fontSize: "11px", 
//                 color: "#6b7280", 
//                 marginTop: "4px" 
//               }}>
//                 Save ${(price - wholesalePrice).toFixed(2)} per unit
//               </div>
//             </div>
//           )}
//         </Link>

//         <div style={{marginTop: "8px"}}>
//           {/* <Button className="btn-org btn-org:hover gap-2 flex w-full">
//             <FaShoppingCart /> Add to Cart
//           </Button> */}
//           <Button 
//             className="btn-org btn-org:hover gap-2 flex w-full"
//             onClick={handleAddToCart}
//             disabled={status === "Out of Stock"}
//           >
//             <FaShoppingCart />
//             {status === "Out of Stock" ? "Out of Stock" : "Add to Cart"}
//           </Button>
//         </div> 
//       </div>
//     </div>
//   );
// };

// export default ProductItem;






































// import React, { useState, useContext } from "react";
// import { Link } from "react-router-dom";
// import Rating from "@mui/material/Rating";
// import Button from "@mui/material/Button";
// import { CiHeart } from "react-icons/ci";
// import { IoIosGitCompare } from "react-icons/io";
// import { MdOutlineZoomOutMap } from "react-icons/md";
// import { CiShare1 } from "react-icons/ci";
// import { FaShoppingCart } from "react-icons/fa";
// import { MyContext } from "../../App";

// const ProductItem = ({ product }) => {
//   const [isHovered, setIsHovered] = useState(false);
//   const context = useContext(MyContext);

//   if (!product) return null;

//   const {
//     name,
//     category,
//     price,
//     oldPrice,
//     wholesalePrice,
//     moq = 1,
//     wholesaleEnabled,
//     images = [],
//     rating = 0,
//     _id
//   } = product;

//   const mainImage = images[0]?.url || '/src/assets/images/grocery.jpg';
//   const hoverImage = images[1]?.url || '/src/assets/images/beauty.jpg';

//   const discountPercentage = oldPrice && oldPrice > price 
//     ? Math.round(((oldPrice - price) / oldPrice) * 100)
//     : 0;

//   return (
//     <div
//       style={{
//         borderRadius: "6px",
//         boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
//         overflow: "hidden",
//         border: "1px solid rgba(0,0,0,0.1)",
//         backgroundColor: "#fff",
//       }}
//       onMouseEnter={() => setIsHovered(true)}
//       onMouseLeave={() => setIsHovered(false)}
//     >
//       <div
//         style={{
//           position: "relative",
//           overflow: "hidden",
//           borderRadius: "6px",
//         }}
//       >
//         <Link to={`/product/${_id}`}>
//           <div style={{ height: "150px", overflow: "hidden", position: "relative" }}>
//             <img 
//               src={mainImage} 
//               style={{ 
//                 width: "100%", 
//                 position: "absolute",
//                 top: 0,
//                 left: 0,
//                 opacity: isHovered ? 0 : 1,
//                 transition: "opacity 0.3s ease",
//               }} 
//               alt={name}
//               onError={(e) => {
//                 e.target.src = '/src/assets/images/grocery.jpg';
//               }}
//             />
            
//             <img
//               src={hoverImage}
//               style={{
//                 width: "100%",
//                 position: "absolute",
//                 top: 0,
//                 left: 0,
//                 opacity: isHovered ? 1 : 0,
//                 transition: "opacity 0.3s ease",
//               }}
//               alt={name}
//               onError={(e) => {
//                 e.target.src = '/src/assets/images/beauty.jpg';
//               }}
//             />
//           </div>
//         </Link>

//         {discountPercentage > 0 && (
//           <span
//             style={{
//               position: "absolute",
//               top: "10px",
//               left: "10px",
//               zIndex: 50,
//               backgroundColor: "#ef7921",
//               color: "#fff",
//               borderRadius: "6px",
//               padding: "3px 6px",
//               fontSize: "10px",
//               fontWeight: 500,
//             }}
//           >
//             -{discountPercentage}%
//           </span>
//         )}

//         {wholesaleEnabled && (
//           <span
//             style={{
//               position: "absolute",
//               top: "10px",
//               right: "10px",
//               zIndex: 50,
//               backgroundColor: "#10b981",
//               color: "#fff",
//               borderRadius: "6px",
//               padding: "4px 8px",
//               fontSize: "10px",
//               fontWeight: 500,
//             }}
//           >
//             Wholesale Available
//           </span>
//         )}

//         <div
//           style={{
//             position: "absolute",
//             top: isHovered ? "10px" : "-200px",
//             right: "5px",
//             zIndex: 50,
//             display: "flex",
//             flexDirection: "column",
//             alignItems: "center",
//             gap: "8px",
//             width: "50px",
//             transition: "top 0.3s ease",
//             opacity: isHovered ? 1 : 0,
//           }}
//         >
//           <Button
//             style={{
//               width: "35px",
//               height: "35px",
//               minWidth: "35px",
//               borderRadius: "50%",
//               backgroundColor: "#fff",
//               color: "#000",
//               boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
//             }}
//             onClick={() => context?.setOpenProductModalDetails?.(true)}
//           >
//             <MdOutlineZoomOutMap style={{ fontSize: "18px" }} />
//           </Button>
//           <Button
//             style={{
//               width: "35px",
//               height: "35px",
//               minWidth: "35px",
//               borderRadius: "50%",
//               backgroundColor: "#fff",
//               color: "#000",
//               boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
//             }}
//           >
//             <CiHeart style={{ fontSize: "18px" }} />
//           </Button>
//           <Button
//             style={{
//               width: "35px",
//               height: "35px",
//               minWidth: "35px",
//               borderRadius: "50%",
//               backgroundColor: "#fff",
//               color: "#000",
//               boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
//             }}
//           >
//             <IoIosGitCompare style={{ fontSize: "18px" }} />
//           </Button>
//           <Button
//             style={{
//               width: "35px",
//               height: "35px",
//               minWidth: "35px",
//               borderRadius: "50%",
//               backgroundColor: "#fff",
//               color: "#000",
//               boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
//             }}
//           >
//             <CiShare1 style={{ fontSize: "18px" }} />
//           </Button>
//         </div>
//       </div>

//       <div
//         style={{
//           padding: "16px",
//           boxShadow: "inset 0 1px 3px rgba(0,0,0,0.05)",
//           backgroundColor: "#fff",
//         }}
//       >
//         <h6 style={{ fontSize: "12px", margin: 0 }}>
//           <Link to={`/products?category=${category?._id}`}>
//             {category?.name || 'Uncategorized'}
//           </Link>
//         </h6>

//         <Link to={`/product/${_id}`} style={{ textDecoration: "none", color: "inherit" }}>
//           <h3
//             style={{
//               fontSize: "13px",
//               marginTop: "6px",
//               marginBottom: "6px",
//               fontWeight: 500,
//               color: "rgba(0,0,0,0.6)",
//             }}
//           >
//             {name}
//           </h3>
//           <Rating name="size-small" value={rating} precision={0.5} size="small" readOnly />
//           <div style={{ display: "flex", alignItems: "center", gap: "12px", marginTop: "8px" }}>
//             {oldPrice && oldPrice > price && (
//               <span
//                 style={{
//                   textDecoration: "line-through",
//                   color: "#6b7280",
//                   fontSize: "16px",
//                   fontWeight: "bold",
//                 }}
//               >
//                 ${oldPrice}
//               </span>
//             )}
//             <span
//               style={{
//                 color: "#ef7921",
//                 fontWeight: 600,
//                 fontSize: "16px",
//               }}
//             >
//               ${price}
//             </span>
//           </div>
          
//           {wholesaleEnabled && wholesalePrice && (
//             <div style={{ marginTop: "8px" }}>
//               <div style={{ 
//                 display: "flex", 
//                 alignItems: "center", 
//                 gap: "8px",
//                 fontSize: "12px",
//                 color: "#10b981"
//               }}>
//                 <span>Wholesale: ${wholesalePrice}</span>
//                 <span style={{ 
//                   backgroundColor: "#10b981", 
//                   color: "white", 
//                   padding: "2px 6px", 
//                   borderRadius: "4px",
//                   fontSize: "10px"
//                 }}>
//                   MOQ: {moq}
//                 </span>
//               </div>
//               <div style={{ 
//                 fontSize: "11px", 
//                 color: "#6b7280", 
//                 marginTop: "4px" 
//               }}>
//                 Save ${(price - wholesalePrice).toFixed(2)} per unit
//               </div>
//             </div>
//           )}
//         </Link>

//         <div style={{marginTop: "8px"}}>
//           <Button className="btn-org btn-org:hover gap-2 flex w-full">
//             <FaShoppingCart /> Add to Cart
//           </Button>
//         </div> 
//       </div>
//     </div>
//   );
// };

// export default ProductItem;











































// import React, { useState, useContext } from "react";
// import { Link } from "react-router-dom";
// import Rating from "@mui/material/Rating";
// import Button from "@mui/material/Button";
// import { CiHeart } from "react-icons/ci";
// import { IoIosGitCompare } from "react-icons/io";
// import { MdOutlineZoomOutMap } from "react-icons/md";
// import { CiShare1 } from "react-icons/ci";
// import { FaShoppingCart } from "react-icons/fa";
// import { MyContext } from "../../App";

// const ProductItem = () => {
//   const [isHovered, setIsHovered] = useState(false);
//   const context = useContext(MyContext);

//   const product = {
//     name: "Gold wristwatch for luxury",
//     category: "Wrist Watch",
//     retailPrice: 45,
//     originalPrice: 51,
//     wholesalePrice: 38,
//     moq: 3,
//     isWholesaleEligible: true,
//   };

//   return (
//     <div
//       style={{
//         borderRadius: "6px",
//         boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
//         overflow: "hidden",
//         border: "1px solid rgba(0,0,0,0.1)",
//         backgroundColor: "#fff",
//       }}
//       onMouseEnter={() => setIsHovered(true)}
//       onMouseLeave={() => setIsHovered(false)}
//     >
//       <div
//         style={{
//           position: "relative",
//           overflow: "hidden",
//           borderRadius: "6px",
//         }}
//       >
//         <Link to="/">
//           <div style={{ height: "150px", overflow: "hidden", position: "relative" }}>
//             <img 
//               src="/src/assets/images/grocery.jpg" 
//               style={{ 
//                 width: "100%", 
//                 position: "absolute",
//                 top: 0,
//                 left: 0,
//                 opacity: isHovered ? 0 : 1,
//                 transition: "opacity 0.3s ease",
//               }} 
//               alt="Product main view"
//             />
            
//             <img
//               src="/src/assets/images/beauty.jpg"
//               style={{
//                 width: "100%",
//                 position: "absolute",
//                 top: 0,
//                 left: 0,
//                 opacity: isHovered ? 1 : 0,
//                 transition: "opacity 0.3s ease",
//               }}
//               alt="Product alternate view"
//             />
//           </div>
//         </Link>

//         <span
//           style={{
//             position: "absolute",
//             top: "10px",
//             left: "10px",
//             zIndex: 50,
//             backgroundColor: "#ef7921",
//             color: "#fff",
//             borderRadius: "6px",
//             padding: "3px 6px",
//             fontSize: "10px",
//             fontWeight: 500,
//           }}
//         >
//           -12%
//         </span>

//         {product.isWholesaleEligible && (
//           <span
//             style={{
//               position: "absolute",
//               top: "10px",
//               right: "10px",
//               zIndex: 50,
//               backgroundColor: "#10b981",
//               color: "#fff",
//               borderRadius: "6px",
//               padding: "4px 8px",
//               fontSize: "10px",
//               fontWeight: 500,
//             }}
//           >
//             Wholesale Available
//           </span>
//         )}

//         <div
//           style={{
//             position: "absolute",
//             top: isHovered ? "10px" : "-200px",
//             right: "5px",
//             zIndex: 50,
//             display: "flex",
//             flexDirection: "column",
//             alignItems: "center",
//             gap: "8px",
//             width: "50px",
//             transition: "top 0.3s ease",
//             opacity: isHovered ? 1 : 0,
//           }}
//         >
//           <Button
//             style={{
//               width: "35px",
//               height: "35px",
//               minWidth: "35px",
//               borderRadius: "50%",
//               backgroundColor: "#fff",
//               color: "#000",
//               boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
//             }}
//           >
//             <MdOutlineZoomOutMap style={{ fontSize: "18px" }} onClick={() => context.setOpenProductModalDetails(true)}/>
//           </Button>
//           <Button
//             style={{
//               width: "35px",
//               height: "35px",
//               minWidth: "35px",
//               borderRadius: "50%",
//               backgroundColor: "#fff",
//               color: "#000",
//               boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
//             }}
//           >
//             <CiHeart style={{ fontSize: "18px" }} />
//           </Button>
//           <Button
//             style={{
//               width: "35px",
//               height: "35px",
//               minWidth: "35px",
//               borderRadius: "50%",
//               backgroundColor: "#fff",
//               color: "#000",
//               boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
//             }}
//           >
//             <IoIosGitCompare style={{ fontSize: "18px" }} />
//           </Button>
//           <Button
//             style={{
//               width: "35px",
//               height: "35px",
//               minWidth: "35px",
//               borderRadius: "50%",
//               backgroundColor: "#fff",
//               color: "#000",
//               boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
//             }}
//           >
//             <CiShare1 style={{ fontSize: "18px" }} />
//           </Button>
//         </div>
//       </div>

//       <div
//         style={{
//           padding: "16px",
//           boxShadow: "inset 0 1px 3px rgba(0,0,0,0.05)",
//           backgroundColor: "#fff",
//         }}
//       >
//         <h6 style={{ fontSize: "12px", margin: 0 }}>
//           <Link to="/">{product.category}</Link>
//         </h6>

//         <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
//           <h3
//             style={{
//               fontSize: "13px",
//               marginTop: "6px",
//               marginBottom: "6px",
//               fontWeight: 500,
//               color: "rgba(0,0,0,0.6)",
//             }}
//           >
//             {product.name}
//           </h3>
//           <Rating name="size-small" defaultValue={4} size="small" readOnly />
//           <div style={{ display: "flex", alignItems: "center", gap: "12px", marginTop: "8px" }}>
//             <span
//               style={{
//                 textDecoration: "line-through",
//                 color: "#6b7280",
//                 fontSize: "16px",
//                 fontWeight: "bold",
//               }}
//             >
//               ${product.originalPrice}
//             </span>
//             <span
//               style={{
//                 color: "#ef7921",
//                 fontWeight: 600,
//                 fontSize: "16px",
//               }}
//             >
//               ${product.retailPrice}
//             </span>
//           </div>
          
//           {product.isWholesaleEligible && (
//             <div style={{ marginTop: "8px" }}>
//               <div style={{ 
//                 display: "flex", 
//                 alignItems: "center", 
//                 gap: "8px",
//                 fontSize: "12px",
//                 color: "#10b981"
//               }}>
//                 <span>Wholesale: ${product.wholesalePrice}</span>
//                 <span style={{ 
//                   backgroundColor: "#10b981", 
//                   color: "white", 
//                   padding: "2px 6px", 
//                   borderRadius: "4px",
//                   fontSize: "10px"
//                 }}>
//                   MOQ: {product.moq}
//                 </span>
//               </div>
//               <div style={{ 
//                 fontSize: "11px", 
//                 color: "#6b7280", 
//                 marginTop: "4px" 
//               }}>
//                 Save ${(product.retailPrice - product.wholesalePrice).toFixed(2)} per unit
//               </div>
//             </div>
//           )}
//         </Link>

//         <div style={{marginTop: "8px"}}>
//           <Button className="btn-org btn-org:hover gap-2 flex w-full">
//             <FaShoppingCart /> Add to Cart
//           </Button>
//         </div> 
//       </div>
//     </div>
//   );
// };

// export default ProductItem;


























// import React, { useState, useContext } from "react";
// import { Link } from "react-router-dom";
// import Rating from "@mui/material/Rating";
// import Button from "@mui/material/Button";
// import { CiHeart } from "react-icons/ci";
// import { IoIosGitCompare } from "react-icons/io";
// import { MdOutlineZoomOutMap } from "react-icons/md";
// import { CiShare1 } from "react-icons/ci";
// import { FaShoppingCart } from "react-icons/fa";
// import { MyContext } from "../../App";

// const ProductItem = () => {
//   const [isHovered, setIsHovered] = useState(false);

//   const context = useContext(MyContext)

//   return (
//     <div
//       style={{
//         borderRadius: "6px",
//         boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
//         overflow: "hidden",
//         border: "1px solid rgba(0,0,0,0.1)",
//         backgroundColor: "#fff",
//       }}
//       onMouseEnter={() => setIsHovered(true)}
//       onMouseLeave={() => setIsHovered(false)}
//     >
//       {/* Image wrapper */}
//       <div
//         style={{
//           position: "relative",
//           overflow: "hidden",
//           borderRadius: "6px",
//         }}
//       >
//         <Link to="/">
//           <div style={{ height: "150px", overflow: "hidden", position: "relative" }}>
//             {/* Main image - always visible */}
//             <img 
//               src="/src/assets/images/grocery.jpg" 
//               style={{ 
//                 width: "100%", 
//                 position: "absolute",
//                 top: 0,
//                 left: 0,
//                 opacity: isHovered ? 0 : 1,
//                 transition: "opacity 0.3s ease",
//               }} 
//               alt="Product main view"
//             />
            
//             {/* Hover image - only visible on hover */}
//             <img
//               src="/src/assets/images/beauty.jpg" // Use a different image for hover effect
//               style={{
//                 width: "100%",
//                 position: "absolute",
//                 top: 0,
//                 left: 0,
//                 opacity: isHovered ? 1 : 0,
//                 transition: "opacity 0.3s ease",
//               }}
//               alt="Product alternate view"
//             />
//           </div>
//         </Link>

//         {/* Discount badge */}
//         <span
//           style={{
//             position: "absolute",
//             top: "10px",
//             left: "10px",
//             zIndex: 50,
//             backgroundColor: "#ef7921",
//             color: "#fff",
//             borderRadius: "6px",
//             padding: "4px 8px",
//             fontSize: "12px",
//             fontWeight: 500,
//           }}
//         >
//           -12%
//         </span>

//         {/* Action buttons - now visible on hover */}
//         <div
//           style={{
//             position: "absolute",
//             top: isHovered ? "10px" : "-200px",
//             right: "5px",
//             zIndex: 50,
//             display: "flex",
//             flexDirection: "column",
//             alignItems: "center",
//             gap: "8px",
//             width: "50px",
//             transition: "top 0.3s ease",
//             opacity: isHovered ? 1 : 0,
//           }}
//         >
//           <Button
//             style={{
//               width: "35px",
//               height: "35px",
//               minWidth: "35px",
//               borderRadius: "50%",
//               backgroundColor: "#fff",
//               color: "#000",
//               boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
//             }}
//           >
//             <MdOutlineZoomOutMap style={{ fontSize: "18px" }} onClick={()=>context.setOpenProductModalDetails(true)}/>
//           </Button>
//           <Button
//             style={{
//               width: "35px",
//               height: "35px",
//               minWidth: "35px",
//               borderRadius: "50%",
//               backgroundColor: "#fff",
//               color: "#000",
//               boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
//             }}
//           >
//             <CiHeart style={{ fontSize: "18px" }} />
//           </Button>
//           <Button
//             style={{
//               width: "35px",
//               height: "35px",
//               minWidth: "35px",
//               borderRadius: "50%",
//               backgroundColor: "#fff",
//               color: "#000",
//               boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
//             }}
//           >
//             <IoIosGitCompare style={{ fontSize: "18px" }} />
//           </Button>
//           <Button
//             style={{
//               width: "35px",
//               height: "35px",
//               minWidth: "35px",
//               borderRadius: "50%",
//               backgroundColor: "#fff",
//               color: "#000",
//               boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
//             }}
//           >
//             <CiShare1 style={{ fontSize: "18px" }} />
//           </Button>
//         </div>
//       </div>

//       {/* Info section */}
//       <div
//         style={{
//           padding: "16px",
//           boxShadow: "inset 0 1px 3px rgba(0,0,0,0.05)",
//           backgroundColor: "#fff",
//         }}
//       >
//         <h6 style={{ fontSize: "12px", margin: 0 }}>
//           <Link to="/">Wrist Watch</Link>
//         </h6>

//         <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
//           <h3
//             style={{
//               fontSize: "13px",
//               marginTop: "6px",
//               marginBottom: "6px",
//               fontWeight: 500,
//               color: "rgba(0,0,0,0.6)",
//             }}
//           >
//             Gold wristwatch for luxury
//           </h3>
//           <Rating name="size-small" defaultValue={4} size="small" readOnly />
//           <div style={{ display: "flex", alignItems: "center", gap: "12px", marginTop: "8px" }}>
//             <span
//               style={{
//                 textDecoration: "line-through",
//                 color: "#6b7280",
//                 fontSize: "16px",
//                 fontWeight: "bold",
//               }}
//             >
//               $51.00
//             </span>
//             <span
//               style={{
//                 color: "#ef7921",
//                 fontWeight: 600,
//                 fontSize: "16px",
//               }}
//             >
//               $45.00
//             </span>
//           </div>
//         </Link>

//         <div style={{marginTop: "8px"}}>
//             <Button className="btn-org btn-org:hover gap-2 flex w-full" > <FaShoppingCart /> Add to Cart</Button>
//         </div> 
//       </div>
//     </div>
//   );
// };

// export default ProductItem;










