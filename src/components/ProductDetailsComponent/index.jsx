import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Button from "@mui/material/Button";
import Rating from "@mui/material/Rating";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import CompareArrowsIcon from "@mui/icons-material/CompareArrows";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import BusinessIcon from "@mui/icons-material/Business";
import StorefrontIcon from "@mui/icons-material/Storefront";
import { productApi } from "../../utils/productApi";

// Styled Components with improved spacing and proportions
const ProductContainer = styled('div')({
  display: "flex",
  gap: "2rem",
  maxWidth: "900px",
  padding: "1.5rem",
  backgroundColor: "#ffffff",
  borderRadius: "12px",
  boxShadow: "0 2px 16px rgba(0, 0, 0, 0.08)",
  margin: "0 auto",
});

const ImageSection = styled('div')({
  flex: "0 0 45%",
  display: "flex",
  flexDirection: "column",
  gap: "1rem",
});

const MainImage = styled('div')({
  border: "1px solid #f1f5f9",
  borderRadius: "12px",
  overflow: "hidden",
  height: "320px",
  position: "relative",
  backgroundColor: "#fafafa",
  '& img': {
    width: "100%",
    height: "100%",
    objectFit: "contain",
    padding: "0.5rem",
  }
});

const ThumbnailContainer = styled('div')({
  display: "flex",
  gap: "0.5rem",
  justifyContent: "center",
  flexWrap: "wrap",
});

const Thumbnail = styled('div')(({ active }) => ({
  width: "60px",
  height: "60px",
  border: active ? "2px solid #ef7921" : "1px solid #e2e8f0",
  borderRadius: "8px",
  overflow: "hidden",
  cursor: "pointer",
  transition: "all 0.2s ease",
  backgroundColor: "#f8fafc",
  '&:hover': {
    borderColor: "#ef7921",
    transform: "scale(1.05)",
  },
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
  gap: "1.25rem",
  maxHeight: "500px",
  padding: "0.5rem 0.25rem 0.5rem 0",
  
  '&::-webkit-scrollbar': {
    width: '4px',
  },
  '&::-webkit-scrollbar-track': {
    background: '#f8fafc',
    borderRadius: '10px',
  },
  '&::-webkit-scrollbar-thumb': {
    background: '#cbd5e1',
    borderRadius: '10px',
  },
  '&::-webkit-scrollbar-thumb:hover': {
    background: '#94a3b8',
  },
});

const ProductTitle = styled('h2')({
  fontSize: "1.5rem",
  fontWeight: "700",
  margin: "0 0 0.75rem 0",
  color: "#1e293b",
  lineHeight: "1.3",
  letterSpacing: "-0.025em",
});

const RatingContainer = styled('div')({
  display: "flex",
  alignItems: "center",
  gap: "0.75rem",
  marginBottom: "0.75rem",
});

const PriceContainer = styled('div')({
  display: "flex",
  alignItems: "center",
  gap: "1rem",
  marginBottom: "0.75rem",
  flexWrap: "wrap",
});

const OriginalPrice = styled('span')({
  textDecoration: "line-through",
  color: "#64748b",
  fontSize: "1rem",
  fontWeight: "500",
});

const DiscountedPrice = styled('span')({
  fontSize: "1.75rem",
  fontWeight: "700",
  color: "#ef7921",
  letterSpacing: "-0.025em",
});

const Description = styled('p')({
  fontSize: "0.9rem",
  color: "#475569",
  lineHeight: "1.6",
  margin: "0 0 1rem 0",
  fontWeight: "400",
});

const ShippingInfo = styled('div')({
  display: "flex",
  alignItems: "center",
  gap: "0.75rem",
  backgroundColor: "#f0fdf4",
  padding: "0.875rem",
  borderRadius: "8px",
  marginBottom: "1rem",
  fontSize: "0.85rem",
  color: "#166534",
  border: "1px solid #bbf7d0",
});

const OptionGroup = styled('div')({
  marginBottom: "1.25rem",
});

const OptionTitle = styled('h4')({
  fontSize: "0.95rem",
  fontWeight: "600",
  margin: "0 0 0.75rem 0",
  color: "#334155",
  textTransform: "uppercase",
  letterSpacing: "0.05em",
});

const ColorOptions = styled('div')({
  display: "flex",
  gap: "0.75rem",
  flexWrap: "wrap",
});

const ColorOption = styled('div')(({ selected, color }) => ({
  width: "32px",
  height: "32px",
  borderRadius: "50%",
  backgroundColor: color,
  border: selected ? "3px solid #ef7921" : "2px solid #e2e8f0",
  cursor: "pointer",
  transition: "all 0.2s ease",
  boxShadow: selected ? "0 2px 8px rgba(239, 121, 33, 0.3)" : "none",
  '&:hover': {
    transform: "scale(1.1)",
  },
}));

const SizeOptions = styled('div')({
  display: "flex",
  gap: "0.75rem",
  flexWrap: "wrap",
});

const SizeOption = styled('div')(({ selected }) => ({
  padding: "0.625rem 1rem",
  border: selected ? "2px solid #ef7921" : "1px solid #cbd5e1",
  borderRadius: "6px",
  cursor: "pointer",
  fontWeight: "600",
  fontSize: "0.85rem",
  backgroundColor: selected ? "rgba(239, 121, 33, 0.1)" : "#ffffff",
  color: selected ? "#ef7921" : "#475569",
  minWidth: "44px",
  textAlign: "center",
  transition: "all 0.2s ease",
  '&:hover': {
    borderColor: "#ef7921",
    backgroundColor: "rgba(239, 121, 33, 0.05)",
  },
}));

const ActionContainer = styled('div')({
  display: "flex",
  alignItems: "center",
  gap: "1rem",
  marginTop: "1rem",
  flexWrap: "wrap",
});

const QuantityControl = styled('div')({
  display: "flex",
  alignItems: "center",
  border: "2px solid #e2e8f0",
  borderRadius: "8px",
  overflow: "hidden",
  backgroundColor: "#ffffff",
  boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
});

const QuantityButton = styled('button')({
  width: "36px",
  height: "36px",
  border: "none",
  background: "#f8fafc",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "1.1rem",
  fontWeight: "500",
  color: "#475569",
  transition: "all 0.2s ease",
  '&:hover': {
    backgroundColor: "#f1f5f9",
    color: "#ef7921",
  },
  '&:disabled': {
    backgroundColor: "#f8fafc",
    color: "#cbd5e1",
    cursor: "not-allowed",
  }
});

const QuantityDisplay = styled('span')({
  width: "44px",
  textAlign: "center",
  fontWeight: "600",
  fontSize: "0.95rem",
  color: "#1e293b",
});

const SecondaryActions = styled('div')({
  display: "flex",
  gap: "0.75rem",
  marginTop: "1rem",
});

const PricingTier = styled('div')({
  display: "flex",
  alignItems: "center",
  gap: "0.75rem",
  marginBottom: "0.75rem",
  padding: "0.875rem",
  borderRadius: "8px",
  backgroundColor: "#fffbeb",
  fontSize: "0.85rem",
  color: "#92400e",
  border: "1px solid #fcd34d",
});

const TierBadge = styled('span')(({ type }) => ({
  padding: "0.375rem 0.75rem",
  borderRadius: "6px",
  fontSize: "0.75rem",
  fontWeight: "700",
  backgroundColor: type === 'wholesale' ? "#10b981" : "#6b7280",
  color: "white",
  display: "flex",
  alignItems: "center",
  gap: "0.375rem",
  letterSpacing: "0.025em",
}));

const MOQIndicator = styled('div')({
  fontSize: "0.85rem",
  color: "#475569",
  marginTop: "0.75rem",
  padding: "0.875rem",
  backgroundColor: "#f8fafc",
  borderRadius: "8px",
  border: "1px solid #e2e8f0",
  fontWeight: "500",
});

const TotalPriceDisplay = styled('div')({
  display: "flex",
  alignItems: "center",
  gap: "0.75rem",
  padding: "1rem",
  backgroundColor: "#f0fdf4",
  borderRadius: "8px",
  marginBottom: "1rem",
  border: "1px solid #bbf7d0",
  fontSize: "0.95rem",
});

const AddToCartButton = styled(Button)({
  backgroundColor: "#ef7921",
  color: "white",
  fontWeight: "600",
  padding: "0.75rem 1.5rem",
  borderRadius: "8px",
  fontSize: "0.9rem",
  textTransform: "none",
  boxShadow: "0 2px 8px rgba(239, 121, 33, 0.3)",
  '&:hover': {
    backgroundColor: "#e06b15",
    boxShadow: "0 4px 12px rgba(239, 121, 33, 0.4)",
    transform: "translateY(-1px)",
  },
  '&:active': {
    transform: "translateY(0)",
  },
});

const ActionIconButton = styled(IconButton)({
  border: "1px solid #e2e8f0",
  backgroundColor: "#ffffff",
  width: "40px",
  height: "40px",
  borderRadius: "8px",
  transition: "all 0.2s ease",
  '&:hover': {
    backgroundColor: "#f8fafc",
    borderColor: "#ef7921",
    color: "#ef7921",
    transform: "scale(1.05)",
  },
});

const ProductDetailsComponent = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedColor, setSelectedColor] = useState("red");
  const [selectedSize, setSelectedSize] = useState("m");
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState('');

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      setLoading(true);
      const response = await productApi.getProduct(id);
      if (response.success) {
        setProduct(response.data);
        if (response.data.images && response.data.images.length > 0) {
          setActiveImage(response.data.images[0].url);
        }
      }
    } catch (error) {
      console.error('Error fetching product:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleThumbnailClick = (imageUrl) => {
    setActiveImage(imageUrl);
  };

  const handleDecrement = () => {
    setQuantity((q) => Math.max(1, q - 1));
  };

  const handleIncrement = () => {
    setQuantity((q) => q + 1);
  };

  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '400px',
        fontSize: '1rem',
        color: '#64748b'
      }}>
        Loading product details...
      </div>
    );
  }

  if (!product) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '400px',
        fontSize: '1rem',
        color: '#64748b'
      }}>
        Product not found
      </div>
    );
  }

  const {
    name,
    description,
    price,
    oldPrice,
    wholesalePrice,
    moq = 1,
    wholesaleEnabled,
    images = [],
    rating = 0,
    category
  } = product;

  const isWholesale = wholesaleEnabled && quantity >= moq;
  const currentPrice = isWholesale ? wholesalePrice : price;
  const priceDisplay = isWholesale ? wholesalePrice : price;
  const totalPrice = quantity * currentPrice;

  return (
    <ProductContainer>
      <ImageSection>
        <MainImage>
          <img 
            src={activeImage || '/src/assets/images/grocery.jpg'} 
            alt={name}
            onError={(e) => {
              e.target.src = '/src/assets/images/grocery.jpg';
            }}
          />
        </MainImage>
        
        <ThumbnailContainer>
          {images.map((image, index) => (
            <Thumbnail
              key={image._id || index}
              active={activeImage === image.url}
              onClick={() => handleThumbnailClick(image.url)}
            >
              <img 
                src={image.url} 
                alt={`${name} ${index + 1}`}
                onError={(e) => {
                  e.target.src = '/src/assets/images/grocery.jpg';
                }}
              />
            </Thumbnail>
          ))}
        </ThumbnailContainer>
      </ImageSection>

      <InfoSection>
        <div>
          <ProductTitle>{name}</ProductTitle>
          
          <RatingContainer>
            <Rating value={rating} precision={0.5} readOnly size="small" />
            <span style={{ fontSize: "0.85rem", color: "#64748b", fontWeight: "500" }}>
              ({Math.round(rating * 2)} reviews)
            </span>
          </RatingContainer>

          <PriceContainer>
            {oldPrice && oldPrice > price && (
              <OriginalPrice>${oldPrice}</OriginalPrice>
            )}
            <DiscountedPrice>${priceDisplay}</DiscountedPrice>
            {isWholesale && (
              <TierBadge type="wholesale">
                <BusinessIcon fontSize="small" /> Wholesale
              </TierBadge>
            )}
          </PriceContainer>

          {/* Total Price Display */}
          <TotalPriceDisplay>
            <span style={{ fontSize: "0.9rem", color: "#064e3b", fontWeight: "600" }}>Total Price:</span>
            <span style={{ fontSize: "1.1rem", fontWeight: "700", color: "#059669" }}>
              ${totalPrice.toFixed(2)}
            </span>
          </TotalPriceDisplay>

          {wholesaleEnabled && quantity < moq && (
            <PricingTier>
              <StorefrontIcon fontSize="small" />
              <span>Buy {moq}+ units for wholesale pricing: </span>
              <strong style={{ color: "#dc2626" }}>${wholesalePrice} each</strong>
            </PricingTier>
          )}

          <Description>{description}</Description>
        </div>

        <ShippingInfo>
          <LocalShippingIcon fontSize="small" />
          <span style={{ fontWeight: "500" }}>Free Shipping - Delivery in 2-3 business days</span>
        </ShippingInfo>

        <OptionGroup>
          <OptionTitle>Color</OptionTitle>
          <ColorOptions>
            <ColorOption
              color="#e53935"
              selected={selectedColor === "red"}
              onClick={() => setSelectedColor("red")}
              title="Red"
            />
            <ColorOption
              color="#1e88e5"
              selected={selectedColor === "blue"}
              onClick={() => setSelectedColor("blue")}
              title="Blue"
            />
            <ColorOption
              color="#43a047"
              selected={selectedColor === "green"}
              onClick={() => setSelectedColor("green")}
              title="Green"
            />
          </ColorOptions>
        </OptionGroup>

        <OptionGroup>
          <OptionTitle>Size</OptionTitle>
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

        <OptionGroup>
          <OptionTitle>Quantity</OptionTitle>
          <MOQIndicator>
            {isWholesale 
              ? `✓ Wholesale order (MOQ: ${moq}+ units) - You save $${((price - wholesalePrice) * quantity).toFixed(2)}`
              : `Retail order - Add ${Math.max(0, moq - quantity)} more for wholesale pricing`
            }
          </MOQIndicator>
          <ActionContainer>
            <QuantityControl>
              <QuantityButton 
                onClick={handleDecrement}
                disabled={quantity <= 1}
              >
                -
              </QuantityButton>
              <QuantityDisplay>{quantity}</QuantityDisplay>
              <QuantityButton onClick={handleIncrement}>
                +
              </QuantityButton>
            </QuantityControl>

            <AddToCartButton
              variant="contained"
            >
              Add to Cart
            </AddToCartButton>
          </ActionContainer>
        </OptionGroup>

        <SecondaryActions>
          <ActionIconButton size="small" title="Add to Wishlist">
            <FavoriteBorderIcon fontSize="small" />
          </ActionIconButton>
          <ActionIconButton size="small" title="Compare Product">
            <CompareArrowsIcon fontSize="small" />
          </ActionIconButton>
        </SecondaryActions>
      </InfoSection>
    </ProductContainer>
  );
};

export default ProductDetailsComponent;



























































// import React, { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";
// import Button from "@mui/material/Button";
// import Rating from "@mui/material/Rating";
// import LocalShippingIcon from "@mui/icons-material/LocalShipping";
// import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
// import CompareArrowsIcon from "@mui/icons-material/CompareArrows";
// import { styled } from "@mui/material/styles";
// import IconButton from "@mui/material/IconButton";
// import BusinessIcon from "@mui/icons-material/Business";
// import StorefrontIcon from "@mui/icons-material/Storefront";
// import { productApi } from "../../utils/productApi";

// const ProductContainer = styled('div')({
//   display: "flex",
//   gap: "2.5rem",
//   maxWidth: "1000px",
//   maxHeight: "500px",
//   overflow: "hidden",
// });

// const ImageSection = styled('div')({
//   flex: "0 0 40%",
//   display: "flex",
//   flexDirection: "column",
//   gap: "1rem",
// });

// const MainImage = styled('div')({
//   border: "1px solid #e5e7eb",
//   borderRadius: "8px",
//   overflow: "hidden",
//   height: "260px",
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
//   width: "55px",
//   height: "55px",
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

// const PricingTier = styled('div')({
//   display: "flex",
//   alignItems: "center",
//   gap: "0.5rem",
//   marginBottom: "0.5rem",
//   padding: "0.5rem",
//   borderRadius: "4px",
//   backgroundColor: "#f8f9fa",
//   fontSize: "0.9rem",
// });

// const TierBadge = styled('span')(({ type }) => ({
//   padding: "0.25rem 0.5rem",
//   borderRadius: "4px",
//   fontSize: "0.75rem",
//   fontWeight: "600",
//   backgroundColor: type === 'wholesale' ? "#ef7921" : "#6b7280",
//   color: "white",
//   display: "flex",
//   alignItems: "center",
//   gap: "0.25rem",
// }));

// const MOQIndicator = styled('div')({
//   fontSize: "0.85rem",
//   color: "#6b7280",
//   marginTop: "0.5rem",
//   padding: "0.5rem",
//   backgroundColor: "#f8f9fa",
//   borderRadius: "4px",
// });

// const TotalPriceDisplay = styled('div')({
//   display: "flex",
//   alignItems: "center",
//   gap: "0.5rem",
//   padding: "0.5rem",
//   backgroundColor: "#f8f9fa",
//   borderRadius: "4px",
//   marginBottom: "1rem",
//   border: "1px solid #e5e7eb",
// });

// const ProductDetailsComponent = () => {
//   const { id } = useParams();
//   const [product, setProduct] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [selectedColor, setSelectedColor] = useState("red");
//   const [selectedSize, setSelectedSize] = useState("m");
//   const [quantity, setQuantity] = useState(1);
//   const [activeImage, setActiveImage] = useState('');

//   useEffect(() => {
//     fetchProduct();
//   }, [id]);

//   const fetchProduct = async () => {
//     try {
//       setLoading(true);
//       const response = await productApi.getProduct(id);
//       if (response.success) {
//         setProduct(response.data);
//         if (response.data.images && response.data.images.length > 0) {
//           setActiveImage(response.data.images[0].url);
//         }
//       }
//     } catch (error) {
//       console.error('Error fetching product:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleThumbnailClick = (imageUrl) => {
//     setActiveImage(imageUrl);
//   };

//   const handleDecrement = () => {
//     setQuantity((q) => Math.max(1, q - 1));
//   };

//   const handleIncrement = () => {
//     setQuantity((q) => q + 1);
//   };

//   if (loading) {
//     return <div>Loading product...</div>;
//   }

//   if (!product) {
//     return <div>Product not found</div>;
//   }

//   const {
//     name,
//     description,
//     price,
//     oldPrice,
//     wholesalePrice,
//     moq = 1,
//     wholesaleEnabled,
//     images = [],
//     rating = 0,
//     category
//   } = product;

//   const isWholesale = wholesaleEnabled && quantity >= moq;
//   const currentPrice = isWholesale ? wholesalePrice : price;
//   const priceDisplay = isWholesale ? wholesalePrice : price;
//   const totalPrice = quantity * currentPrice;

//   return (
//     <ProductContainer>
//       <ImageSection>
//         <MainImage>
//           <img 
//             src={activeImage || '/src/assets/images/grocery.jpg'} 
//             alt={name}
//             onError={(e) => {
//               e.target.src = '/src/assets/images/grocery.jpg';
//             }}
//           />
//         </MainImage>
        
//         <ThumbnailContainer>
//           {images.map((image, index) => (
//             <Thumbnail
//               key={image._id || index}
//               active={activeImage === image.url}
//               onClick={() => handleThumbnailClick(image.url)}
//             >
//               <img 
//                 src={image.url} 
//                 alt={`${name} ${index + 1}`}
//                 onError={(e) => {
//                   e.target.src = '/src/assets/images/grocery.jpg';
//                 }}
//               />
//             </Thumbnail>
//           ))}
//         </ThumbnailContainer>
//       </ImageSection>

//       <InfoSection>
//         <div>
//           <ProductTitle>{name}</ProductTitle>
          
//           <RatingContainer>
//             <Rating value={rating} precision={0.5} readOnly size="small" />
//             <span style={{ fontSize: "0.9rem", color: "#6b7280" }}>(12 reviews)</span>
//           </RatingContainer>

//           <PriceContainer>
//             {oldPrice && oldPrice > price && (
//               <OriginalPrice>${oldPrice}</OriginalPrice>
//             )}
//             <DiscountedPrice>${priceDisplay}</DiscountedPrice>
//             {isWholesale && (
//               <TierBadge type="wholesale">
//                 <BusinessIcon fontSize="small" /> Wholesale
//               </TierBadge>
//             )}
//           </PriceContainer>

//           {/* Total Price Display */}
//           <TotalPriceDisplay>
//             <span style={{ fontSize: "0.9rem", color: "#374151", fontWeight: "500" }}>Total Price:</span>
//             <span style={{ fontSize: "1.1rem", fontWeight: "600", color: "#ef7921" }}>
//               ${totalPrice.toFixed(2)}
//             </span>
//           </TotalPriceDisplay>

//           {wholesaleEnabled && quantity < moq && (
//             <PricingTier>
//               <StorefrontIcon fontSize="small" />
//               <span>Buy {moq}+ units for wholesale pricing: </span>
//               <strong>${wholesalePrice} each</strong>
//             </PricingTier>
//           )}

//           <Description>{description}</Description>
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

//         <OptionGroup>
//           <OptionTitle>Quantity:</OptionTitle>
//           <MOQIndicator>
//             {isWholesale 
//               ? `✓ Wholesale order (MOQ: ${moq}+ units) - You save $${(price - wholesalePrice) * quantity}`
//               : `Retail order - Add ${moq - quantity} more for wholesale pricing`
//             }
//           </MOQIndicator>
//           <ActionContainer>
//             <QuantityControl>
//               <QuantityButton onClick={handleDecrement}>-</QuantityButton>
//               <QuantityDisplay>{quantity}</QuantityDisplay>
//               <QuantityButton onClick={handleIncrement}>+</QuantityButton>
//             </QuantityControl>

//             <Button
//               variant="contained"
//               style={{ 
//                 backgroundColor: "#ef7921", 
//                 color: "white", 
//                 fontWeight: "600",
//                 padding: "0.5rem 1.5rem",
//               }}
//             >
//               Add to Cart
//             </Button>
//           </ActionContainer>
//         </OptionGroup>

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














































// import React, { useState } from "react";
// import Button from "@mui/material/Button";
// import Rating from "@mui/material/Rating";
// import LocalShippingIcon from "@mui/icons-material/LocalShipping";
// import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
// import CompareArrowsIcon from "@mui/icons-material/CompareArrows";
// import { styled } from "@mui/material/styles";
// import IconButton from "@mui/material/IconButton";
// import BusinessIcon from "@mui/icons-material/Business";
// import StorefrontIcon from "@mui/icons-material/Storefront";

// const ProductContainer = styled('div')({
//   display: "flex",
//   gap: "2.5rem",
//   maxWidth: "1000px",
//   maxHeight: "500px",
//   overflow: "hidden",
// });

// const ImageSection = styled('div')({
//   flex: "0 0 40%",
//   display: "flex",
//   flexDirection: "column",
//   gap: "1rem",
// });

// const MainImage = styled('div')({
//   border: "1px solid #e5e7eb",
//   borderRadius: "8px",
//   overflow: "hidden",
//   height: "260px",
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
//   width: "55px",
//   height: "55px",
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

// const PricingTier = styled('div')({
//   display: "flex",
//   alignItems: "center",
//   gap: "0.5rem",
//   marginBottom: "0.5rem",
//   padding: "0.5rem",
//   borderRadius: "4px",
//   backgroundColor: "#f8f9fa",
//   fontSize: "0.9rem",
// });

// const TierBadge = styled('span')(({ type }) => ({
//   padding: "0.25rem 0.5rem",
//   borderRadius: "4px",
//   fontSize: "0.75rem",
//   fontWeight: "600",
//   backgroundColor: type === 'wholesale' ? "#ef7921" : "#6b7280",
//   color: "white",
//   display: "flex",
//   alignItems: "center",
//   gap: "0.25rem",
// }));

// const MOQIndicator = styled('div')({
//   fontSize: "0.85rem",
//   color: "#6b7280",
//   marginTop: "0.5rem",
//   padding: "0.5rem",
//   backgroundColor: "#f8f9fa",
//   borderRadius: "4px",
// });

// const TotalPriceDisplay = styled('div')({
//   display: "flex",
//   alignItems: "center",
//   gap: "0.5rem",
//   padding: "0.5rem",
//   backgroundColor: "#f8f9fa",
//   borderRadius: "4px",
//   marginBottom: "1rem",
//   border: "1px solid #e5e7eb",
// });

// const ProductDetailsComponent = () => {
//   const [selectedColor, setSelectedColor] = useState("red");
//   const [selectedSize, setSelectedSize] = useState("m");
//   const [quantity, setQuantity] = useState(1);

//   const product = {
//     name: "Embellished Sequinned Ready to Wear Saree",
//     description: "Premium quality saree with elegant sequin embellishments. Perfect for weddings, parties, and festive occasions. Made from high-quality fabric that ensures comfort and durability. This ready-to-wear saree comes with pre-stitched pleats for easy wearing.",
//     retailPrice: 2450,
//     originalRetailPrice: 2650,
//     wholesalePrice: 2200,
//     moq: 5,
//     images: [
//       "/src/assets/images/grocery.jpg",
//       "/src/assets/images/fashion.jpg",
//       "/src/assets/images/handbag.jpg",
//     ],
//   };

//   const [activeImage, setActiveImage] = useState(product.images[0]);

//   const isWholesale = quantity >= product.moq;
//   const currentPrice = isWholesale ? product.wholesalePrice : product.retailPrice;
//   const priceDisplay = isWholesale ? product.wholesalePrice : product.retailPrice;
//   const totalPrice = quantity * currentPrice;

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
//           <img src={activeImage} alt="Product" />
//         </MainImage>
        
//         <ThumbnailContainer>
//           {product.images.map((image, index) => (
//             <Thumbnail
//               key={index}
//               active={activeImage === image}
//               onClick={() => handleThumbnailClick(image)}
//             >
//               <img src={image} alt={`Thumbnail ${index + 1}`} />
//             </Thumbnail>
//           ))}
//         </ThumbnailContainer>
//       </ImageSection>

//       <InfoSection>
//         <div>
//           <ProductTitle>{product.name}</ProductTitle>
          
//           <RatingContainer>
//             <Rating value={4.5} precision={0.5} readOnly size="small" />
//             <span style={{ fontSize: "0.9rem", color: "#6b7280" }}>(12 reviews)</span>
//           </RatingContainer>

//           <PriceContainer>
//             <OriginalPrice>${product.originalRetailPrice}</OriginalPrice>
//             <DiscountedPrice>${priceDisplay}</DiscountedPrice>
//             {isWholesale && (
//               <TierBadge type="wholesale">
//                 <BusinessIcon fontSize="small" /> Wholesale
//               </TierBadge>
//             )}
//           </PriceContainer>

//           {/* Total Price Display */}
//           <TotalPriceDisplay>
//             <span style={{ fontSize: "0.9rem", color: "#374151", fontWeight: "500" }}>Total Price:</span>
//             <span style={{ fontSize: "1.1rem", fontWeight: "600", color: "#ef7921" }}>
//               ${totalPrice.toFixed(2)}
//             </span>
//           </TotalPriceDisplay>

//           {quantity < product.moq && (
//             <PricingTier>
//               <StorefrontIcon fontSize="small" />
//               <span>Buy {product.moq}+ units for wholesale pricing: </span>
//               <strong>${product.wholesalePrice} each</strong>
//             </PricingTier>
//           )}

//           <Description>{product.description}</Description>
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

//         <OptionGroup>
//           <OptionTitle>Quantity:</OptionTitle>
//           <MOQIndicator>
//             {isWholesale 
//               ? `✓ Wholesale order (MOQ: ${product.moq}+ units) - You save $${(product.retailPrice - product.wholesalePrice) * quantity}`
//               : `Retail order - Add ${product.moq - quantity} more for wholesale pricing`
//             }
//           </MOQIndicator>
//           <ActionContainer>
//             <QuantityControl>
//               <QuantityButton onClick={handleDecrement}>-</QuantityButton>
//               <QuantityDisplay>{quantity}</QuantityDisplay>
//               <QuantityButton onClick={handleIncrement}>+</QuantityButton>
//             </QuantityControl>

//             <Button
//               variant="contained"
//               style={{ 
//                 backgroundColor: "#ef7921", 
//                 color: "white", 
//                 fontWeight: "600",
//                 padding: "0.5rem 1.5rem",
//               }}
//             >
//               Add to Cart
//             </Button>
//           </ActionContainer>
//         </OptionGroup>

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





























































// import React, { useState } from "react";
// import Button from "@mui/material/Button";
// import Rating from "@mui/material/Rating";
// import LocalShippingIcon from "@mui/icons-material/LocalShipping";
// import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
// import CompareArrowsIcon from "@mui/icons-material/CompareArrows";
// import { styled } from "@mui/material/styles";
// import IconButton from "@mui/material/IconButton";
// import BusinessIcon from "@mui/icons-material/Business";
// import StorefrontIcon from "@mui/icons-material/Storefront";

// const ProductContainer = styled('div')({
//   display: "flex",
//   gap: "2.5rem",
//   maxWidth: "1000px",
//   maxHeight: "500px",
//   overflow: "hidden",
// });

// const ImageSection = styled('div')({
//   flex: "0 0 40%",
//   display: "flex",
//   flexDirection: "column",
//   gap: "1rem",
// });

// const MainImage = styled('div')({
//   border: "1px solid #e5e7eb",
//   borderRadius: "8px",
//   overflow: "hidden",
//   height: "260px",
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
//   width: "55px",
//   height: "55px",
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

// const PricingTier = styled('div')({
//   display: "flex",
//   alignItems: "center",
//   gap: "0.5rem",
//   marginBottom: "0.5rem",
//   padding: "0.5rem",
//   borderRadius: "4px",
//   backgroundColor: "#f8f9fa",
//   fontSize: "0.9rem",
// });

// const TierBadge = styled('span')(({ type }) => ({
//   padding: "0.25rem 0.5rem",
//   borderRadius: "4px",
//   fontSize: "0.75rem",
//   fontWeight: "600",
//   backgroundColor: type === 'wholesale' ? "#ef7921" : "#6b7280",
//   color: "white",
//   display: "flex",
//   alignItems: "center",
//   gap: "0.25rem",
// }));

// const MOQIndicator = styled('div')({
//   fontSize: "0.85rem",
//   color: "#6b7280",
//   marginTop: "0.5rem",
//   padding: "0.5rem",
//   backgroundColor: "#f8f9fa",
//   borderRadius: "4px",
// });

// const ProductDetailsComponent = () => {
//   const [selectedColor, setSelectedColor] = useState("red");
//   const [selectedSize, setSelectedSize] = useState("m");
//   const [quantity, setQuantity] = useState(1);

//   const product = {
//     name: "Embellished Sequinned Ready to Wear Saree",
//     description: "Premium quality saree with elegant sequin embellishments. Perfect for weddings, parties, and festive occasions. Made from high-quality fabric that ensures comfort and durability. This ready-to-wear saree comes with pre-stitched pleats for easy wearing.",
//     retailPrice: 2450,
//     originalRetailPrice: 2650,
//     wholesalePrice: 2200,
//     moq: 5,
//     images: [
//       "/src/assets/images/grocery.jpg",
//       "/src/assets/images/fashion.jpg",
//       "/src/assets/images/handbag.jpg",
//     ],
//   };

//   const [activeImage, setActiveImage] = useState(product.images[0]);

//   const isWholesale = quantity >= product.moq;
//   const currentPrice = isWholesale ? product.wholesalePrice : product.retailPrice;
//   const priceDisplay = isWholesale ? product.wholesalePrice : product.retailPrice;

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
//           <img src={activeImage} alt="Product" />
//         </MainImage>
        
//         <ThumbnailContainer>
//           {product.images.map((image, index) => (
//             <Thumbnail
//               key={index}
//               active={activeImage === image}
//               onClick={() => handleThumbnailClick(image)}
//             >
//               <img src={image} alt={`Thumbnail ${index + 1}`} />
//             </Thumbnail>
//           ))}
//         </ThumbnailContainer>
//       </ImageSection>

//       <InfoSection>
//         <div>
//           <ProductTitle>{product.name}</ProductTitle>
          
//           <RatingContainer>
//             <Rating value={4.5} precision={0.5} readOnly size="small" />
//             <span style={{ fontSize: "0.9rem", color: "#6b7280" }}>(12 reviews)</span>
//           </RatingContainer>

//           <PriceContainer>
//             <OriginalPrice>${product.originalRetailPrice}</OriginalPrice>
//             <DiscountedPrice>${priceDisplay}</DiscountedPrice>
//             {isWholesale && (
//               <TierBadge type="wholesale">
//                 <BusinessIcon fontSize="small" /> Wholesale
//               </TierBadge>
//             )}
//           </PriceContainer>

//           {quantity < product.moq && (
//             <PricingTier>
//               <StorefrontIcon fontSize="small" />
//               <span>Buy {product.moq}+ units for wholesale pricing: </span>
//               <strong>${product.wholesalePrice} each</strong>
//             </PricingTier>
//           )}

//           <Description>{product.description}</Description>
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

//         <OptionGroup>
//           <OptionTitle>Quantity:</OptionTitle>
//           <MOQIndicator>
//             {isWholesale 
//               ? `✓ Wholesale order (MOQ: ${product.moq}+ units) - You save $${(product.retailPrice - product.wholesalePrice) * quantity}`
//               : `Retail order - Add ${product.moq - quantity} more for wholesale pricing`
//             }
//           </MOQIndicator>
//           <ActionContainer>
//             <QuantityControl>
//               <QuantityButton onClick={handleDecrement}>-</QuantityButton>
//               <QuantityDisplay>{quantity}</QuantityDisplay>
//               <QuantityButton onClick={handleIncrement}>+</QuantityButton>
//             </QuantityControl>

//             <Button
//               variant="contained"
//               style={{ 
//                 backgroundColor: "#ef7921", 
//                 color: "white", 
//                 fontWeight: "600",
//                 padding: "0.5rem 1.5rem",
//               }}
//             >
//               Add to Cart (${(quantity * currentPrice).toFixed(2)})
//             </Button>
//           </ActionContainer>
//         </OptionGroup>

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
//   gap: "2.5rem",
//   maxWidth: "1000px", // Increased from 900px
//   maxHeight: "500px",
//   overflow: "hidden",
// });

// const ImageSection = styled('div')({
//   flex: "0 0 40%", // Reduced from 45%
//   display: "flex",
//   flexDirection: "column",
//   gap: "1rem",
// });

// const MainImage = styled('div')({
//   border: "1px solid #e5e7eb",
//   borderRadius: "8px",
//   overflow: "hidden",
//   height: "260px", // Reduced from 300px
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
//   width: "55px", // Reduced from 60px
//   height: "55px", // Reduced from 60px
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
