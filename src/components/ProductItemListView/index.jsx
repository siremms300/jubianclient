import React, { useState } from "react";
import { Link } from "react-router-dom";
import Rating from "@mui/material/Rating";
import Button from "@mui/material/Button";
import { CiHeart } from "react-icons/ci";
import { IoIosGitCompare } from "react-icons/io";
import { MdOutlineZoomOutMap } from "react-icons/md";
import { CiShare1 } from "react-icons/ci";
import { FaShoppingCart } from "react-icons/fa";

const ProductItemListView = ({ product }) => {
  const [isHovered, setIsHovered] = useState(false);

  // Safely extract product data with fallbacks
  const {
    _id,
    name = "Product Name",
    description = "No description available",
    price = 0,
    oldPrice,
    images = [],
    rating = 0,
    ratingCount = 0,
    discountPercentage,
    status = "Active",
    brand,
    category
  } = product || {};

  // Calculate discount percentage if not provided
  const calculatedDiscount = discountPercentage || (oldPrice && oldPrice > price 
    ? Math.round(((oldPrice - price) / oldPrice) * 100)
    : 0);

  // Get image URLs
  const mainImage = images[0]?.url || "/src/assets/images/grocery.jpg";
  const hoverImage = images[1]?.url || images[0]?.url || "/src/assets/images/beauty.jpg";

  // Format price
  const formattedPrice = price?.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD'
  });

  const formattedOldPrice = oldPrice?.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD'
  });

  // Handle add to cart
  const handleAddToCart = () => {
    // Add to cart logic here
    console.log("Adding to cart:", product);
  };

  // Handle quick view
  const handleQuickView = () => {
    // Quick view logic here
    console.log("Quick view:", product);
  };

  // Handle add to wishlist
  const handleAddToWishlist = () => {
    // Add to wishlist logic here
    console.log("Add to wishlist:", product);
  };

  // Handle compare
  const handleCompare = () => {
    // Compare logic here
    console.log("Compare product:", product);
  };

  // Handle share
  const handleShare = () => {
    // Share logic here
    console.log("Share product:", product);
  };

  return (
    <div
      style={{
        borderRadius: "6px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        overflow: "hidden",
        border: "1px solid rgba(0,0,0,0.1)",
        backgroundColor: "#fff",
        display: "flex",
        alignItems: "center",
        opacity: status === "Out of Stock" ? 0.6 : 1,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image wrapper */}
      <div
        style={{
          position: "relative",
          overflow: "hidden",
          borderRadius: "6px",
          width: "25%"
        }}
      >
        <Link to={`/product/${_id}`}>
          <div style={{ height: "220px", overflow: "hidden", position: "relative" }}>
            {/* Main image - always visible */}
            <img 
              src={mainImage} 
              style={{ 
                width: "100%", 
                height: "100%",
                objectFit: "cover",
                position: "absolute",
                top: 0,
                left: 0,
                opacity: isHovered ? 0 : 1,
                transition: "opacity 0.3s ease",
              }} 
              alt={name}
              onError={(e) => {
                e.target.src = "/src/assets/images/grocery.jpg";
              }}
            />
            
            {/* Hover image - only visible on hover */}
            <img
              src={hoverImage}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                position: "absolute",
                top: 0,
                left: 0,
                opacity: isHovered ? 1 : 0,
                transition: "opacity 0.3s ease",
              }}
              alt={name}
              onError={(e) => {
                e.target.src = "/src/assets/images/beauty.jpg";
              }}
            />
          </div>
        </Link>

        {/* Discount badge */}
        {calculatedDiscount > 0 && (
          <span
            style={{
              position: "absolute",
              top: "10px",
              left: "10px",
              zIndex: 50,
              backgroundColor: "#ef7921",
              color: "#fff",
              borderRadius: "6px",
              padding: "4px 8px",
              fontSize: "12px",
              fontWeight: 500,
            }}
          >
            -{calculatedDiscount}%
          </span>
        )}

        {/* Out of Stock badge */}
        {status === "Out of Stock" && (
          <span
            style={{
              position: "absolute",
              top: "10px",
              left: "10px",
              zIndex: 50,
              backgroundColor: "#ef4444",
              color: "#fff",
              borderRadius: "6px",
              padding: "4px 8px",
              fontSize: "12px",
              fontWeight: 500,
            }}
          >
            Out of Stock
          </span>
        )}

        {/* Action buttons - now visible on hover */}
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
            onClick={handleQuickView}
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
            <MdOutlineZoomOutMap style={{ fontSize: "18px" }} />
          </Button>
          <Button
            onClick={handleAddToWishlist}
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
            onClick={handleCompare}
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
            onClick={handleShare}
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

      {/* Info section */}
      <div
        style={{
          padding: "16px",
          boxShadow: "inset 0 1px 3px rgba(0,0,0,0.05)",
          backgroundColor: "#fff",
          width: "75%", 
        }}
      >
        {/* Category/Brand */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "4px" }}>
          {brand && (
            <h6 style={{ fontSize: "12px", margin: 0, color: "#6b7280" }}>
              {brand}
            </h6>
          )}
          {category?.name && (
            <h6 style={{ fontSize: "12px", margin: 0, color: "#6b7280" }}>
              {category.name}
            </h6>
          )}
        </div>

        {/* Product Name */}
        <Link to={`/product/${_id}`} style={{ textDecoration: "none", color: "inherit" }}>
          <h3
            style={{
              fontSize: "18px",
              marginTop: "6px",
              marginBottom: "8px",
              fontWeight: 600,
              color: "rgba(0,0,0,0.9)",
              lineHeight: "1.3",
            }}
          >
            {name}
          </h3>
        </Link>

        {/* Rating */}
        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
          <Rating 
            name="product-rating" 
            value={rating} 
            precision={0.1} 
            size="small" 
            readOnly 
          />
          <span style={{ fontSize: "14px", color: "#6b7280" }}>
            ({ratingCount || 0} review{ratingCount !== 1 ? 's' : ''})
          </span>
        </div>

        {/* Description */}
        <p style={{ 
          fontSize: "14px", 
          color: "#6b7280", 
          margin: "8px 0", 
          lineHeight: "1.5",
          display: "-webkit-box",
          WebkitLineClamp: 2,
          WebkitBoxOrient: "vertical",
          overflow: "hidden"
        }}>
          {description}
        </p>

        {/* Price */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px", margin: "12px 0" }}>
          {oldPrice && oldPrice > price && (
            <span
              style={{
                textDecoration: "line-through",
                color: "#6b7280",
                fontSize: "16px",
                fontWeight: "500",
              }}
            >
              {formattedOldPrice}
            </span>
          )}
          <span
            style={{
              color: "#ef7921",
              fontWeight: 600,
              fontSize: "18px",
            }}
          >
            {formattedPrice}
          </span>
        </div>

        {/* Add to Cart Button */}
        <div style={{ marginTop: "12px" }}>
          <Button 
            className="btn-org gap-2 flex" 
            onClick={handleAddToCart}
            disabled={status === "Out of Stock"}
            style={{
              backgroundColor: status === "Out of Stock" ? "#9ca3af" : "#ef7921",
              color: "white",
              padding: "8px 16px",
              borderRadius: "6px",
              textTransform: "none",
              fontWeight: "500",
              fontSize: "14px",
              '&:hover': {
                backgroundColor: status === "Out of Stock" ? "#9ca3af" : "#e06b15",
              }
            }}
          >
            <FaShoppingCart /> 
            {status === "Out of Stock" ? "Out of Stock" : "Add to Cart"}
          </Button>
        </div>

        {/* Additional Info */}
        <div style={{ 
          display: "flex", 
          alignItems: "center", 
          gap: "16px", 
          marginTop: "12px",
          fontSize: "12px",
          color: "#6b7280"
        }}>
          {product?.sku && (
            <span>SKU: {product.sku}</span>
          )}
          {product?.inStock !== undefined && (
            <span>In Stock: {product.inStock ? "Yes" : "No"}</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductItemListView;





















































































// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import Rating from "@mui/material/Rating";
// import Button from "@mui/material/Button";
// import { CiHeart } from "react-icons/ci";
// import { IoIosGitCompare } from "react-icons/io";
// import { MdOutlineZoomOutMap } from "react-icons/md";
// import { CiShare1 } from "react-icons/ci";
// import { FaShoppingCart } from "react-icons/fa";

// const ProductItemListView = () => {
//   const [isHovered, setIsHovered] = useState(false);

//   return (
//     <div
//       style={{
//         borderRadius: "6px",
//         boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
//         overflow: "hidden",
//         border: "1px solid rgba(0,0,0,0.1)",
//         backgroundColor: "#fff",
//         display: "flex",
//         alignItems: "center",
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
//           width: "25%"
//         }}
//       >
//         <Link to="/">
//           <div style={{ height: "220px", overflow: "hidden", position: "relative" }}>
//             {/* Main image - always visible */}
//             <img 
//               src="/src/assets/images/grocery.jpg" 
//               style={{ 
//                 width: "100%", 
//                 height: "100%",
//                 objectFit: "cover",
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
//               src="/src/assets/images/beauty.jpg"
//               style={{
//                 width: "100%",
//                 height: "100%",
//                 objectFit: "cover",
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

//       {/* Info section */}
//       <div
//         style={{
//           padding: "16px",
//           boxShadow: "inset 0 1px 3px rgba(0,0,0,0.05)",
//           backgroundColor: "#fff",
//           width: "75%", 
//         }}
//       >
//         <h6 style={{ fontSize: "12px", margin: 0 }}>
//           <Link to="/">Wrist Watch</Link>
//         </h6>

//         <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
//           <h3
//             style={{
//               fontSize: "16px",
//               marginTop: "6px",
//               marginBottom: "6px",
//               fontWeight: 500,
//               color: "rgba(0,0,0,0.8)",
//             }}
//           >
//             Gold wristwatch for luxury
//           </h3>
//           <Rating name="size-small" defaultValue={4} size="small" readOnly />
//           <p style={{ fontSize: "14px", color: "#6b7280", margin: "8px 0" }}>
//             This luxurious gold wristwatch features premium materials and exquisite craftsmanship, making it the perfect accessory for formal occasions.
//           </p>
//           <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
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
//           <Button className="btn-org gap-2 flex" > <FaShoppingCart /> Add to Cart</Button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProductItemListView;











// import React from "react";
// import { Link } from "react-router-dom";
// import Rating from "@mui/material/Rating";
// import Button from "@mui/material/Button";
// import { CiHeart } from "react-icons/ci";
// import { IoIosGitCompare } from "react-icons/io";
// import { MdOutlineZoomOutMap } from "react-icons/md";
// import { CiShare1 } from "react-icons/ci";

// const ProductItemListView = () => {
//   return (
//     <div
//       style={{
//         borderRadius: "6px",
//         boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
//         overflow: "hidden",
//         border: "1px solid rgba(0,0,0,0.1)",
//         backgroundColor: "#fff",
//         display: "flex",
//         alignItems: "center"
//       }}
//     >
//       {/* Image wrapper */}
//       <div
//         style={{
//           position: "relative",
//           overflow: "hidden",
//           borderRadius: "6px",
//           width: "25%"
//         }}
//       >
//         <Link to="/">
//           <div style={{ height: "220px", overflow: "hidden" }}>
//             <img src="/src/assets/images/beauty.jpg" style={{ width: "100%" }} />
//             <img src="/src/assets/images/beauty.jpg" style={{ width: "100%" }} />
//             <img
//               src="/src/assets/images/beauty.jpg"
//               style={{
//                 width: "100%",
//                 position: "absolute",
//                 top: 0,
//                 left: 0,
//                 opacity: 0,
//                 transition: "opacity 0.3s ease",
//               }}
//               className="hoverImage"
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

//         {/* Action buttons */}
//         <div
//           style={{
//             position: "absolute",
//             top: "-200px",
//             right: "5px",
//             zIndex: 50,
//             display: "flex",
//             flexDirection: "column",
//             alignItems: "center",
//             gap: "8px",
//             width: "50px",
//             transition: "all 0.5s ease",
//             opacity: 0,
//           }}
//           className="actionButtons"
//         >
//           <Button
//             style={{
//               width: "35px",
//               height: "35px",
//               minWidth: "35px",
//               borderRadius: "50%",
//               backgroundColor: "#fff",
//               color: "#000",
//             }}
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
//           width: "75%", 
//         }}
//       >
//         <h6 style={{ fontSize: "12px", margin: 0 }}>
//           <Link to="/">Writst Watch</Link>
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
//           <Rating name="size-small" defaultValue={2} size="small" readOnly />
//           <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
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
//       </div>
//     </div>
//   );
// };

// export default ProductItemListView;







