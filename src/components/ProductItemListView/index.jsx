import React, { useState } from "react";
import { Link } from "react-router-dom";
import Rating from "@mui/material/Rating";
import Button from "@mui/material/Button";
import { CiHeart } from "react-icons/ci";
import { IoIosGitCompare } from "react-icons/io";
import { MdOutlineZoomOutMap } from "react-icons/md";
import { CiShare1 } from "react-icons/ci";
import { FaShoppingCart } from "react-icons/fa";

const ProductItemListView = () => {
  const [isHovered, setIsHovered] = useState(false);

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
        <Link to="/">
          <div style={{ height: "220px", overflow: "hidden", position: "relative" }}>
            {/* Main image - always visible */}
            <img 
              src="/src/assets/images/grocery.jpg" 
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
              alt="Product main view"
            />
            
            {/* Hover image - only visible on hover */}
            <img
              src="/src/assets/images/beauty.jpg"
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
              alt="Product alternate view"
            />
          </div>
        </Link>

        {/* Discount badge */}
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
          -12%
        </span>

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

      {/* Info section */}
      <div
        style={{
          padding: "16px",
          boxShadow: "inset 0 1px 3px rgba(0,0,0,0.05)",
          backgroundColor: "#fff",
          width: "75%", 
        }}
      >
        <h6 style={{ fontSize: "12px", margin: 0 }}>
          <Link to="/">Wrist Watch</Link>
        </h6>

        <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
          <h3
            style={{
              fontSize: "16px",
              marginTop: "6px",
              marginBottom: "6px",
              fontWeight: 500,
              color: "rgba(0,0,0,0.8)",
            }}
          >
            Gold wristwatch for luxury
          </h3>
          <Rating name="size-small" defaultValue={4} size="small" readOnly />
          <p style={{ fontSize: "14px", color: "#6b7280", margin: "8px 0" }}>
            This luxurious gold wristwatch features premium materials and exquisite craftsmanship, making it the perfect accessory for formal occasions.
          </p>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <span
              style={{
                textDecoration: "line-through",
                color: "#6b7280",
                fontSize: "16px",
                fontWeight: "bold",
              }}
            >
              $51.00
            </span>
            <span
              style={{
                color: "#ef7921",
                fontWeight: 600,
                fontSize: "16px",
              }}
            >
              $45.00
            </span>
          </div>
        </Link>

        <div style={{marginTop: "8px"}}>
          <Button className="btn-org gap-2 flex" > <FaShoppingCart /> Add to Cart</Button>
        </div>
      </div>
    </div>
  );
};

export default ProductItemListView;











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







