import React, { useState } from "react";
import Button from "@mui/material/Button";
import Rating from "@mui/material/Rating";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import CompareArrowsIcon from "@mui/icons-material/CompareArrows";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";

// Styled components for better organization
const ProductContainer = styled('div')({
  display: "flex",
  gap: "2.5rem",
  maxWidth: "1000px", // Increased from 900px
  maxHeight: "500px",
  overflow: "hidden",
});

const ImageSection = styled('div')({
  flex: "0 0 40%", // Reduced from 45%
  display: "flex",
  flexDirection: "column",
  gap: "1rem",
});

const MainImage = styled('div')({
  border: "1px solid #e5e7eb",
  borderRadius: "8px",
  overflow: "hidden",
  height: "260px", // Reduced from 300px
  position: "relative",
  '& img': {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  }
});

const ThumbnailContainer = styled('div')({
  display: "flex",
  gap: "0.75rem",
  justifyContent: "center",
});

const Thumbnail = styled('div')(({ active }) => ({
  width: "55px", // Reduced from 60px
  height: "55px", // Reduced from 60px
  border: active ? "2px solid #ef7921" : "1px solid #e5e7eb",
  borderRadius: "6px",
  overflow: "hidden",
  cursor: "pointer",
  transition: "border-color 0.2s ease",
  '& img': {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  }
}));

const InfoSection = styled('div')({
  flex: "1",
  display: "flex",
  flexDirection: "column",
  gap: "1rem",
  overflowY: "auto",
  maxHeight: "400px",
  paddingRight: "0.5rem",
  
  // Custom scrollbar
  '&::-webkit-scrollbar': {
    width: '4px',
  },
  '&::-webkit-scrollbar-track': {
    background: '#f1f1f1',
    borderRadius: '10px',
  },
  '&::-webkit-scrollbar-thumb': {
    background: '#c1c1c1',
    borderRadius: '10px',
  },
});

const ProductTitle = styled('h2')({
  fontSize: "1.5rem",
  fontWeight: "600",
  margin: "0 0 0.5rem 0",
  color: "#1f2937",
  lineHeight: "1.3",
});

const RatingContainer = styled('div')({
  display: "flex",
  alignItems: "center",
  gap: "0.5rem",
  marginBottom: "0.5rem",
});

const PriceContainer = styled('div')({
  display: "flex",
  alignItems: "center",
  gap: "1rem",
  marginBottom: "0.5rem",
});

const OriginalPrice = styled('span')({
  textDecoration: "line-through",
  color: "#6b7280",
  fontSize: "1rem",
});

const DiscountedPrice = styled('span')({
  fontSize: "1.5rem",
  fontWeight: "600",
  color: "#ef7921",
});

const Description = styled('p')({
  fontSize: "0.9rem",
  color: "#6b7280",
  lineHeight: "1.5",
  margin: "0 0 1rem 0",
});

const ShippingInfo = styled('div')({
  display: "flex",
  alignItems: "center",
  gap: "0.5rem",
  backgroundColor: "#f3f4f6",
  padding: "0.75rem",
  borderRadius: "6px",
  marginBottom: "1rem",
  fontSize: "0.85rem",
});

const OptionGroup = styled('div')({
  marginBottom: "1rem",
});

const OptionTitle = styled('h4')({
  fontSize: "0.95rem",
  fontWeight: "500",
  margin: "0 0 0.5rem 0",
  color: "#374151",
});

const ColorOptions = styled('div')({
  display: "flex",
  gap: "0.5rem",
});

const ColorOption = styled('div')(({ selected, color }) => ({
  width: "28px",
  height: "28px",
  borderRadius: "50%",
  backgroundColor: color,
  border: selected ? "2px solid #ef7921" : "2px solid transparent",
  boxShadow: selected ? "0 0 0 2px rgba(239, 121, 33, 0.3)" : "none",
  cursor: "pointer",
}));

const SizeOptions = styled('div')({
  display: "flex",
  gap: "0.5rem",
});

const SizeOption = styled('div')(({ selected }) => ({
  padding: "0.5rem 0.75rem",
  border: selected ? "1px solid #ef7921" : "1px solid #d1d5db",
  borderRadius: "4px",
  cursor: "pointer",
  fontWeight: "500",
  fontSize: "0.9rem",
  backgroundColor: selected ? "rgba(239, 121, 33, 0.1)" : "transparent",
  color: selected ? "#ef7921" : "#374151",
  minWidth: "40px",
  textAlign: "center",
}));

const ActionContainer = styled('div')({
  display: "flex",
  alignItems: "center",
  gap: "1rem",
  marginTop: "1rem",
});

const QuantityControl = styled('div')({
  display: "flex",
  alignItems: "center",
  border: "1px solid #d1d5db",
  borderRadius: "4px",
  overflow: "hidden",
});

const QuantityButton = styled('button')({
  width: "32px",
  height: "32px",
  border: "none",
  background: "#f9fafb",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "1.1rem",
  '&:hover': {
    backgroundColor: "#f3f4f6",
  }
});

const QuantityDisplay = styled('span')({
  width: "40px",
  textAlign: "center",
  fontWeight: "500",
});

const SecondaryActions = styled('div')({
  display: "flex",
  gap: "0.5rem",
  marginTop: "1rem",
});

const ProductDetailsComponent = () => {
  const [selectedColor, setSelectedColor] = useState("red");
  const [selectedSize, setSelectedSize] = useState("m");
  const [quantity, setQuantity] = useState(1);

  const images = [
    "/src/assets/images/grocery.jpg",
    "/src/assets/images/fashion.jpg",
    "/src/assets/images/handbag.jpg",
  ];
  const [activeImage, setActiveImage] = useState(images[0]);

  const handleThumbnailClick = (image) => {
    setActiveImage(image);
  };

  const handleDecrement = () => {
    setQuantity((q) => Math.max(1, q - 1));
  };

  const handleIncrement = () => {
    setQuantity((q) => q + 1);
  };

  return (
    <ProductContainer>
      <ImageSection>
        <MainImage>
          <img
            src={activeImage}
            alt="Product"
          />
        </MainImage>
        
        <ThumbnailContainer>
          {images.map((image, index) => (
            <Thumbnail
              key={index}
              active={activeImage === image}
              onClick={() => handleThumbnailClick(image)}
            >
              <img
                src={image}
                alt={`Thumbnail ${index + 1}`}
              />
            </Thumbnail>
          ))}
        </ThumbnailContainer>
      </ImageSection>

      <InfoSection>
        <div>
          <ProductTitle>
            Embellished Sequinned Ready to Wear Saree
          </ProductTitle>
          
          <RatingContainer>
            <Rating value={4.5} precision={0.5} readOnly size="small" />
            <span style={{ fontSize: "0.9rem", color: "#6b7280" }}>(12 reviews)</span>
          </RatingContainer>

          <PriceContainer>
            <OriginalPrice>$2650</OriginalPrice>
            <DiscountedPrice>$2450</DiscountedPrice>
          </PriceContainer>

          <Description>
            Premium quality saree with elegant sequin embellishments. Perfect for weddings, parties, and festive occasions. 
            Made from high-quality fabric that ensures comfort and durability. This ready-to-wear saree comes with 
            pre-stitched pleats for easy wearing.
          </Description>
        </div>

        <ShippingInfo>
          <LocalShippingIcon fontSize="small" />
          <span>Free Shipping - Delivery in 2-3 business days</span>
        </ShippingInfo>

        <OptionGroup>
          <OptionTitle>Color:</OptionTitle>
          <ColorOptions>
            <ColorOption
              color="#e53935"
              selected={selectedColor === "red"}
              onClick={() => setSelectedColor("red")}
            />
            <ColorOption
              color="#1e88e5"
              selected={selectedColor === "blue"}
              onClick={() => setSelectedColor("blue")}
            />
            <ColorOption
              color="#43a047"
              selected={selectedColor === "green"}
              onClick={() => setSelectedColor("green")}
            />
          </ColorOptions>
        </OptionGroup>

        <OptionGroup>
          <OptionTitle>Size:</OptionTitle>
          <SizeOptions>
            {["s", "m", "l", "xl"].map((size) => (
              <SizeOption
                key={size}
                selected={selectedSize === size}
                onClick={() => setSelectedSize(size)}
              >
                {size.toUpperCase()}
              </SizeOption>
            ))}
          </SizeOptions>
        </OptionGroup>

        <ActionContainer>
          <QuantityControl>
            <QuantityButton onClick={handleDecrement}>-</QuantityButton>
            <QuantityDisplay>{quantity}</QuantityDisplay>
            <QuantityButton onClick={handleIncrement}>+</QuantityButton>
          </QuantityControl>

          <Button
            variant="contained"
            style={{ 
              backgroundColor: "#ef7921", 
              color: "white", 
              fontWeight: "600",
              padding: "0.5rem 1.5rem",
            }}
          >
            Add to Cart
          </Button>
        </ActionContainer>

        <SecondaryActions>
          <IconButton size="small" style={{ border: "1px solid #d1d5db" }}>
            <FavoriteBorderIcon fontSize="small" />
          </IconButton>
          <IconButton size="small" style={{ border: "1px solid #d1d5db" }}>
            <CompareArrowsIcon fontSize="small" />
          </IconButton>
        </SecondaryActions>
      </InfoSection>
    </ProductContainer>
  );
};

export default ProductDetailsComponent;















































// import React, { useState } from "react";
// import Button from "@mui/material/Button";
// import Rating from "@mui/material/Rating";
// import LocalShippingIcon from "@mui/icons-material/LocalShipping";
// import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
// import CompareArrowsIcon from "@mui/icons-material/CompareArrows";
// import { styled } from "@mui/material/styles";
// import IconButton from "@mui/material/IconButton";

// // Styled components for better organization
// const ProductContainer = styled('div')({
//   display: "flex",
//   gap: "2rem",
//   // maxWidth: "900px",
//   // maxHeight: "500px",
//   // overflow: "hidden",

//   maxWidth: "1200px", // 🔥 Increased width
//   width: "100%",
//   maxHeight: "600px",
//   overflow: "hidden",
//   margin: "0 auto", // Center it inside modal
// });

// const ImageSection = styled('div')({
//   flex: "0 0 45%",
//   display: "flex",
//   flexDirection: "column",
//   gap: "1rem",
// });

// const MainImage = styled('div')({
//   border: "1px solid #e5e7eb",
//   borderRadius: "8px",
//   overflow: "hidden",
//   height: "300px",
//   position: "relative",
//   '& img': {
//     width: "100%",
//     height: "100%",
//     objectFit: "cover",
//   }
// });

// const ThumbnailContainer = styled('div')({
//   display: "flex",
//   gap: "0.75rem",
//   justifyContent: "center",
// });

// const Thumbnail = styled('div')(({ active }) => ({
//   width: "60px",
//   height: "60px",
//   border: active ? "2px solid #ef7921" : "1px solid #e5e7eb",
//   borderRadius: "6px",
//   overflow: "hidden",
//   cursor: "pointer",
//   transition: "border-color 0.2s ease",
//   '& img': {
//     width: "100%",
//     height: "100%",
//     objectFit: "cover",
//   }
// }));

// const InfoSection = styled('div')({
//   flex: "1",
//   display: "flex",
//   flexDirection: "column",
//   gap: "1rem",
//   overflowY: "auto",
//   maxHeight: "400px",
//   paddingRight: "0.5rem",
  
//   // Custom scrollbar
//   '&::-webkit-scrollbar': {
//     width: '4px',
//   },
//   '&::-webkit-scrollbar-track': {
//     background: '#f1f1f1',
//     borderRadius: '10px',
//   },
//   '&::-webkit-scrollbar-thumb': {
//     background: '#c1c1c1',
//     borderRadius: '10px',
//   },
// });

// const ProductTitle = styled('h2')({
//   fontSize: "1.5rem",
//   fontWeight: "600",
//   margin: "0 0 0.5rem 0",
//   color: "#1f2937",
//   lineHeight: "1.3",
// });

// const RatingContainer = styled('div')({
//   display: "flex",
//   alignItems: "center",
//   gap: "0.5rem",
//   marginBottom: "0.5rem",
// });

// const PriceContainer = styled('div')({
//   display: "flex",
//   alignItems: "center",
//   gap: "1rem",
//   marginBottom: "0.5rem",
// });

// const OriginalPrice = styled('span')({
//   textDecoration: "line-through",
//   color: "#6b7280",
//   fontSize: "1rem",
// });

// const DiscountedPrice = styled('span')({
//   fontSize: "1.5rem",
//   fontWeight: "600",
//   color: "#ef7921",
// });

// const Description = styled('p')({
//   fontSize: "0.9rem",
//   color: "#6b7280",
//   lineHeight: "1.5",
//   margin: "0 0 1rem 0",
// });

// const ShippingInfo = styled('div')({
//   display: "flex",
//   alignItems: "center",
//   gap: "0.5rem",
//   backgroundColor: "#f3f4f6",
//   padding: "0.75rem",
//   borderRadius: "6px",
//   marginBottom: "1rem",
//   fontSize: "0.85rem",
// });

// const OptionGroup = styled('div')({
//   marginBottom: "1rem",
// });

// const OptionTitle = styled('h4')({
//   fontSize: "0.95rem",
//   fontWeight: "500",
//   margin: "0 0 0.5rem 0",
//   color: "#374151",
// });

// const ColorOptions = styled('div')({
//   display: "flex",
//   gap: "0.5rem",
// });

// const ColorOption = styled('div')(({ selected, color }) => ({
//   width: "28px",
//   height: "28px",
//   borderRadius: "50%",
//   backgroundColor: color,
//   border: selected ? "2px solid #ef7921" : "2px solid transparent",
//   boxShadow: selected ? "0 0 0 2px rgba(239, 121, 33, 0.3)" : "none",
//   cursor: "pointer",
// }));

// const SizeOptions = styled('div')({
//   display: "flex",
//   gap: "0.5rem",
// });

// const SizeOption = styled('div')(({ selected }) => ({
//   padding: "0.5rem 0.75rem",
//   border: selected ? "1px solid #ef7921" : "1px solid #d1d5db",
//   borderRadius: "4px",
//   cursor: "pointer",
//   fontWeight: "500",
//   fontSize: "0.9rem",
//   backgroundColor: selected ? "rgba(239, 121, 33, 0.1)" : "transparent",
//   color: selected ? "#ef7921" : "#374151",
//   minWidth: "40px",
//   textAlign: "center",
// }));

// const ActionContainer = styled('div')({
//   display: "flex",
//   alignItems: "center",
//   gap: "1rem",
//   marginTop: "1rem",
// });

// const QuantityControl = styled('div')({
//   display: "flex",
//   alignItems: "center",
//   border: "1px solid #d1d5db",
//   borderRadius: "4px",
//   overflow: "hidden",
// });

// const QuantityButton = styled('button')({
//   width: "32px",
//   height: "32px",
//   border: "none",
//   background: "#f9fafb",
//   cursor: "pointer",
//   display: "flex",
//   alignItems: "center",
//   justifyContent: "center",
//   fontSize: "1.1rem",
//   '&:hover': {
//     backgroundColor: "#f3f4f6",
//   }
// });

// const QuantityDisplay = styled('span')({
//   width: "40px",
//   textAlign: "center",
//   fontWeight: "500",
// });

// const SecondaryActions = styled('div')({
//   display: "flex",
//   gap: "0.5rem",
//   marginTop: "1rem",
// });

// const ProductDetailsComponent = () => {
//   const [selectedColor, setSelectedColor] = useState("red");
//   const [selectedSize, setSelectedSize] = useState("m");
//   const [quantity, setQuantity] = useState(1);

//   const images = [
//     "/src/assets/images/grocery.jpg",
//     "/src/assets/images/fashion.jpg",
//     "/src/assets/images/handbag.jpg",
//   ];
//   const [activeImage, setActiveImage] = useState(images[0]);

//   const handleThumbnailClick = (image) => {
//     setActiveImage(image);
//   };

//   const handleDecrement = () => {
//     setQuantity((q) => Math.max(1, q - 1));
//   };

//   const handleIncrement = () => {
//     setQuantity((q) => q + 1);
//   };

//   return (
//     <ProductContainer>
//       <ImageSection>
//         <MainImage>
//           <img
//             src={activeImage}
//             alt="Product"
//           />
//         </MainImage>
        
//         <ThumbnailContainer>
//           {images.map((image, index) => (
//             <Thumbnail
//               key={index}
//               active={activeImage === image}
//               onClick={() => handleThumbnailClick(image)}
//             >
//               <img
//                 src={image}
//                 alt={`Thumbnail ${index + 1}`}
//               />
//             </Thumbnail>
//           ))}
//         </ThumbnailContainer>
//       </ImageSection>

//       <InfoSection>
//         <div>
//           <ProductTitle>
//             Embellished Sequinned Ready to Wear Saree
//           </ProductTitle>
          
//           <RatingContainer>
//             <Rating value={4.5} precision={0.5} readOnly size="small" />
//             <span style={{ fontSize: "0.9rem", color: "#6b7280" }}>(12 reviews)</span>
//           </RatingContainer>

//           <PriceContainer>
//             <OriginalPrice>$2650</OriginalPrice>
//             <DiscountedPrice>$2450</DiscountedPrice>
//           </PriceContainer>

//           <Description>
//             Premium quality saree with elegant sequin embellishments. Perfect for weddings, parties, and festive occasions. 
//             Made from high-quality fabric that ensures comfort and durability. This ready-to-wear saree comes with 
//             pre-stitched pleats for easy wearing.
//           </Description>
//         </div>

//         <ShippingInfo>
//           <LocalShippingIcon fontSize="small" />
//           <span>Free Shipping - Delivery in 2-3 business days</span>
//         </ShippingInfo>

//         <OptionGroup>
//           <OptionTitle>Color:</OptionTitle>
//           <ColorOptions>
//             <ColorOption
//               color="#e53935"
//               selected={selectedColor === "red"}
//               onClick={() => setSelectedColor("red")}
//             />
//             <ColorOption
//               color="#1e88e5"
//               selected={selectedColor === "blue"}
//               onClick={() => setSelectedColor("blue")}
//             />
//             <ColorOption
//               color="#43a047"
//               selected={selectedColor === "green"}
//               onClick={() => setSelectedColor("green")}
//             />
//           </ColorOptions>
//         </OptionGroup>

//         <OptionGroup>
//           <OptionTitle>Size:</OptionTitle>
//           <SizeOptions>
//             {["s", "m", "l", "xl"].map((size) => (
//               <SizeOption
//                 key={size}
//                 selected={selectedSize === size}
//                 onClick={() => setSelectedSize(size)}
//               >
//                 {size.toUpperCase()}
//               </SizeOption>
//             ))}
//           </SizeOptions>
//         </OptionGroup>

//         <ActionContainer>
//           <QuantityControl>
//             <QuantityButton onClick={handleDecrement}>-</QuantityButton>
//             <QuantityDisplay>{quantity}</QuantityDisplay>
//             <QuantityButton onClick={handleIncrement}>+</QuantityButton>
//           </QuantityControl>

//           <Button
//             variant="contained"
//             style={{ 
//               backgroundColor: "#ef7921", 
//               color: "white", 
//               fontWeight: "600",
//               padding: "0.5rem 1.5rem",
//             }}
//           >
//             Add to Cart
//           </Button>
//         </ActionContainer>

//         <SecondaryActions>
//           <IconButton size="small" style={{ border: "1px solid #d1d5db" }}>
//             <FavoriteBorderIcon fontSize="small" />
//           </IconButton>
//           <IconButton size="small" style={{ border: "1px solid #d1d5db" }}>
//             <CompareArrowsIcon fontSize="small" />
//           </IconButton>
//         </SecondaryActions>
//       </InfoSection>
//     </ProductContainer>
//   );
// };

// export default ProductDetailsComponent;



























// // src/components/ProductDetailsComponent.jsx
// import React, { useState } from "react";
// import Button from "@mui/material/Button";
// import Rating from "@mui/material/Rating";
// import LocalShippingIcon from "@mui/icons-material/LocalShipping";

// const ProductDetailsComponent = () => {
//   const [selectedColor, setSelectedColor] = useState("red");
//   const [selectedSize, setSelectedSize] = useState("m");
//   const [quantity, setQuantity] = useState(1);
//   const [activeImage, setActiveImage] = useState("/src/assets/images/grocery.jpg");
//   const [isHovered, setIsHovered] = useState(false);
//   const [position, setPosition] = useState({ x: 0, y: 0 });

//   const images = [
//     "/src/assets/images/grocery.jpg",
//     "/src/assets/images/fashion.jpg",
//     "/src/assets/images/handbag.jpg",
//   ];

//   const handleThumbnailClick = (image) => {
//     setActiveImage(image);
//   };

//   const handleMouseMove = (e) => {
//     const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
//     const x = ((e.clientX - left) / width) * 100;
//     const y = ((e.clientY - top) / height) * 100;
//     setPosition({ x, y });
//   };

//   return (
//     <div style={{ display: "flex", gap: "2rem", flexWrap: "wrap", maxWidth: "900px" }}>
//       {/* Product Images */}
//       <div style={{ flex: "0 0 40%", minWidth: "280px" }}>
//         <div
//           style={{
//             border: "1px solid #e5e7eb",
//             borderRadius: "6px",
//             overflow: "hidden",
//             marginBottom: "1rem",
//             height: "320px",
//             position: "relative",
//           }}
//           onMouseEnter={() => setIsHovered(true)}
//           onMouseLeave={() => setIsHovered(false)}
//           onMouseMove={handleMouseMove}
//         >
//           <img
//             src={activeImage}
//             alt="Product"
//             style={{
//               width: "100%",
//               height: "100%",
//               objectFit: "cover",
//               transform: isHovered ? "scale(1.5)" : "scale(1)",
//               transformOrigin: `${position.x}% ${position.y}%`,
//               transition: isHovered ? "transform 0.1s ease" : "none",
//             }}
//           />
//         </div>

//         {/* Thumbnails */}
//         <div style={{ display: "flex", gap: "0.5rem", justifyContent: "center" }}>
//           {images.map((image, index) => (
//             <div
//               key={index}
//               style={{
//                 width: "55px",
//                 height: "55px",
//                 border: activeImage === image ? "2px solid #ef7921" : "1px solid #e5e7eb",
//                 borderRadius: "6px",
//                 overflow: "hidden",
//                 cursor: "pointer",
//               }}
//               onClick={() => handleThumbnailClick(image)}
//             >
//               <img
//                 src={image}
//                 alt={`Thumbnail ${index + 1}`}
//                 style={{ width: "100%", height: "100%", objectFit: "cover" }}
//               />
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Product Info */}
//       <div style={{ flex: "1", minWidth: "280px" }}>
//         <h2 style={{ fontSize: "1.25rem", fontWeight: "600", marginBottom: "0.5rem" }}>
//           Embellished Sequinned Ready to Wear Saree
//         </h2>

//         <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1rem" }}>
//           <Rating value={4.5} precision={0.5} readOnly size="small" />
//           <span style={{ fontSize: "0.9rem", color: "#6b7280" }}>(12 reviews)</span>
//         </div>

//         <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1rem" }}>
//           <span style={{ textDecoration: "line-through", color: "#6b7280" }}>$2650</span>
//           <span style={{ fontSize: "1.25rem", fontWeight: "600", color: "#ef7921" }}>$2450</span>
//         </div>

//         <p style={{ fontSize: "0.9rem", color: "#6b7280", marginBottom: "1rem" }}>
//           Premium quality saree with elegant design. Perfect for weddings and festive occasions.
//         </p>

//         <div
//           style={{
//             display: "flex",
//             alignItems: "center",
//             gap: "0.5rem",
//             backgroundColor: "#f3f4f6",
//             padding: "0.5rem",
//             borderRadius: "6px",
//             marginBottom: "1rem",
//           }}
//         >
//           <LocalShippingIcon fontSize="small" />
//           <span style={{ fontSize: "0.85rem" }}>Free Shipping (2-3 Days)</span>
//         </div>

//         {/* Color */}
//         <div style={{ marginBottom: "1rem" }}>
//           <h4 style={{ fontSize: "0.9rem", marginBottom: "0.5rem" }}>Color:</h4>
//           <div style={{ display: "flex", gap: "0.5rem" }}>
//             {["red", "blue", "green"].map((color) => (
//               <div
//                 key={color}
//                 style={{
//                   width: "25px",
//                   height: "25px",
//                   borderRadius: "50%",
//                   backgroundColor: color,
//                   border: selectedColor === color ? "2px solid #ef7921" : "1px solid #d1d5db",
//                   cursor: "pointer",
//                 }}
//                 onClick={() => setSelectedColor(color)}
//               ></div>
//             ))}
//           </div>
//         </div>

//         {/* Size */}
//         <div style={{ marginBottom: "1rem" }}>
//           <h4 style={{ fontSize: "0.9rem", marginBottom: "0.5rem" }}>Size:</h4>
//           <div style={{ display: "flex", gap: "0.5rem" }}>
//             {["s", "m", "l", "xl"].map((size) => (
//               <div
//                 key={size}
//                 style={{
//                   padding: "0.4rem 0.7rem",
//                   border: selectedSize === size ? "1px solid #ef7921" : "1px solid #d1d5db",
//                   borderRadius: "4px",
//                   cursor: "pointer",
//                   color: selectedSize === size ? "#ef7921" : "#374151",
//                 }}
//                 onClick={() => setSelectedSize(size)}
//               >
//                 {size.toUpperCase()}
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Quantity + Add to Cart */}
//         <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
//           <div style={{ display: "flex", alignItems: "center", border: "1px solid #d1d5db", borderRadius: "4px" }}>
//             <button
//               style={{ width: "30px", height: "30px", border: "none", background: "#f9fafb", cursor: "pointer" }}
//               onClick={() => setQuantity((q) => Math.max(1, q - 1))}
//             >
//               -
//             </button>
//             <span style={{ padding: "0 1rem" }}>{quantity}</span>
//             <button
//               style={{ width: "30px", height: "30px", border: "none", background: "#f9fafb", cursor: "pointer" }}
//               onClick={() => setQuantity((q) => q + 1)}
//             >
//               +
//             </button>
//           </div>

//           <Button
//             variant="contained"
//             style={{ backgroundColor: "#ef7921", color: "white", fontWeight: "600" }}
//           >
//             Add to Cart
//           </Button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProductDetailsComponent;
