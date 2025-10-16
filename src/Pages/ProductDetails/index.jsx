import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import Button from '@mui/material/Button';
import Rating from '@mui/material/Rating';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import BusinessIcon from '@mui/icons-material/Business';
import StorefrontIcon from '@mui/icons-material/Storefront';
import { styled } from '@mui/material/styles';
import { productApi } from '../../utils/productApi';
import { cartApi } from '../../utils/cartApi';
import { useAuth } from '../../context/authContext';
import { MyContext } from '../../App';
import { toast } from 'react-toastify';

// Import components
import ReviewAndRatingComponent from '../../components/ReviewAndRatingComponent';
import RelatedProductsComponent from '../../components/RelatedProductsComponent';

// Styled components with improved proportions and spacing
const ProductContainer = styled('div')({
  display: 'flex',
  gap: '2.5rem',
  maxWidth: '1200px',
  margin: '0 auto',
  padding: '1.5rem',
  backgroundColor: '#ffffff',
  borderRadius: '12px',
  boxShadow: '0 2px 20px rgba(0, 0, 0, 0.08)',
  '@media (max-width: 768px)': {
    flexDirection: 'column',
    gap: '2rem',
    padding: '1rem',
  },
});

const ImageSection = styled('div')({
  flex: '0 0 48%',
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
  '@media (max-width: 768px)': {
    flex: '1',
  },
});

const MainImage = styled('div')({
  border: '1px solid #f1f5f9',
  borderRadius: '12px',
  overflow: 'hidden',
  height: '400px',
  position: 'relative',
  backgroundColor: '#fafafa',
  '& img': {
    width: '100%',
    height: '100%',
    objectFit: 'contain',
    padding: '1rem',
    transition: 'transform 0.3s ease',
  },
  '&:hover img': {
    transform: 'scale(1.02)',
  },
});

const ThumbnailContainer = styled('div')({
  display: 'flex',
  gap: '0.75rem',
  justifyContent: 'center',
  flexWrap: 'wrap',
});

const Thumbnail = styled('div')(({ active }) => ({
  width: '70px',
  height: '70px',
  border: active ? '2px solid #ef7921' : '1px solid #e2e8f0',
  borderRadius: '8px',
  overflow: 'hidden',
  cursor: 'pointer',
  transition: 'all 0.2s ease',
  backgroundColor: '#f8fafc',
  '&:hover': {
    borderColor: '#ef7921',
    transform: 'scale(1.05)',
  },
  '& img': {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
}));

const InfoSection = styled('div')({
  flex: '1',
  display: 'flex',
  flexDirection: 'column',
  gap: '1.25rem',
  padding: '0.5rem 0',
});

const ProductTitle = styled('h1')({
  fontSize: '1.75rem',
  fontWeight: '700',
  margin: '0 0 0.5rem 0',
  color: '#1e293b',
  lineHeight: '1.3',
  letterSpacing: '-0.025em',
  '@media (max-width: 768px)': {
    fontSize: '1.5rem',
  },
});

const PriceContainer = styled('div')({
  display: 'flex',
  alignItems: 'center',
  gap: '1rem',
  flexWrap: 'wrap',
  marginBottom: '0.5rem',
});

const OriginalPrice = styled('span')({
  textDecoration: 'line-through',
  color: '#64748b',
  fontSize: '1.1rem',
  fontWeight: '500',
});

const DiscountedPrice = styled('span')({
  fontSize: '1.75rem',
  fontWeight: '700',
  color: '#ef7921',
  letterSpacing: '-0.025em',
});

const DiscountBadge = styled('span')({
  backgroundColor: '#ef7921',
  color: 'white',
  padding: '0.25rem 0.75rem',
  borderRadius: '12px',
  fontSize: '0.8rem',
  fontWeight: '600',
  letterSpacing: '0.025em',
});

const TierBadge = styled('span')(({ type }) => ({
  padding: '0.375rem 0.75rem',
  borderRadius: '6px',
  fontSize: '0.75rem',
  fontWeight: '700',
  backgroundColor: type === 'wholesale' ? '#10b981' : '#6b7280',
  color: 'white',
  display: 'flex',
  alignItems: 'center',
  gap: '0.25rem',
  letterSpacing: '0.025em',
}));

const StockInfo = styled('div')({
  display: 'flex',
  alignItems: 'center',
  gap: '0.5rem',
  padding: '0.75rem',
  backgroundColor: '#f0fdf4',
  border: '1px solid #bbf7d0',
  borderRadius: '8px',
  color: '#166534',
  fontSize: '0.85rem',
  fontWeight: '500',
});

const OutOfStockInfo = styled('div')({
  display: 'flex',
  alignItems: 'center',
  gap: '0.5rem',
  padding: '0.75rem',
  backgroundColor: '#fef2f2',
  border: '1px solid #fecaca',
  borderRadius: '8px',
  color: '#dc2626',
  fontSize: '0.85rem',
  fontWeight: '500',
});

const Description = styled('p')({
  color: '#475569',
  lineHeight: '1.6',
  fontSize: '0.95rem',
  margin: '0',
  fontWeight: '400',
});

const ShippingInfo = styled('div')({
  display: 'flex',
  alignItems: 'center',
  gap: '0.75rem',
  padding: '0.875rem',
  backgroundColor: '#f8fafc',
  border: '1px solid #e2e8f0',
  borderRadius: '8px',
  fontSize: '0.85rem',
  color: '#475569',
  fontWeight: '500',
});

const OptionGroup = styled('div')({
  marginBottom: '1.25rem',
});

const OptionTitle = styled('h3')({
  fontSize: '0.95rem',
  fontWeight: '600',
  margin: '0 0 0.75rem 0',
  color: '#334155',
  textTransform: 'uppercase',
  letterSpacing: '0.05em',
});

const ColorOptions = styled('div')({
  display: 'flex',
  gap: '0.75rem',
  flexWrap: 'wrap',
});

const ColorOption = styled('div')(({ selected, color }) => ({
  width: '36px',
  height: '36px',
  borderRadius: '50%',
  backgroundColor: color,
  border: selected ? '3px solid #ef7921' : '2px solid #e2e8f0',
  cursor: 'pointer',
  transition: 'all 0.2s ease',
  boxShadow: selected ? '0 2px 8px rgba(239, 121, 33, 0.3)' : 'none',
  '&:hover': {
    transform: 'scale(1.1)',
  },
}));

const SizeOptions = styled('div')({
  display: 'flex',
  gap: '0.75rem',
  flexWrap: 'wrap',
});

const SizeOption = styled('div')(({ selected }) => ({
  padding: '0.625rem 1rem',
  border: selected ? '2px solid #ef7921' : '1px solid #cbd5e1',
  borderRadius: '6px',
  cursor: 'pointer',
  fontWeight: '600',
  fontSize: '0.85rem',
  backgroundColor: selected ? 'rgba(239, 121, 33, 0.1)' : '#ffffff',
  color: selected ? '#ef7921' : '#475569',
  minWidth: '44px',
  textAlign: 'center',
  transition: 'all 0.2s ease',
  '&:hover': {
    borderColor: '#ef7921',
    backgroundColor: 'rgba(239, 121, 33, 0.05)',
  },
}));

const QuantitySection = styled('div')({
  display: 'flex',
  alignItems: 'center',
  gap: '1rem',
  marginBottom: '1.25rem',
  flexWrap: 'wrap',
});

const QuantityControl = styled('div')({
  display: 'flex',
  alignItems: 'center',
  border: '2px solid #e2e8f0',
  borderRadius: '8px',
  overflow: 'hidden',
  backgroundColor: '#ffffff',
  boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
});

const QuantityButton = styled('button')({
  width: '40px',
  height: '40px',
  border: 'none',
  background: '#f8fafc',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '1.1rem',
  fontWeight: '500',
  color: '#475569',
  transition: 'all 0.2s ease',
  '&:hover': {
    backgroundColor: '#f1f5f9',
    color: '#ef7921',
  },
  '&:disabled': {
    backgroundColor: '#f8fafc',
    color: '#cbd5e1',
    cursor: 'not-allowed',
  },
});

const QuantityDisplay = styled('span')({
  width: '50px',
  textAlign: 'center',
  fontWeight: '600',
  fontSize: '0.95rem',
  color: '#1e293b',
});

const ActionButtons = styled('div')({
  display: 'flex',
  gap: '1rem',
  flexWrap: 'wrap',
  '@media (max-width: 768px)': {
    flexDirection: 'column',
  },
});

const PrimaryButton = styled(Button)({
  backgroundColor: '#ef7921',
  color: 'white',
  padding: '0.875rem 2rem',
  fontWeight: '600',
  fontSize: '0.95rem',
  borderRadius: '8px',
  textTransform: 'none',
  flex: '1',
  minWidth: '180px',
  boxShadow: '0 2px 8px rgba(239, 121, 33, 0.3)',
  '&:hover': {
    backgroundColor: '#e06b15',
    boxShadow: '0 4px 12px rgba(239, 121, 33, 0.4)',
    transform: 'translateY(-1px)',
  },
  '&:disabled': {
    backgroundColor: '#fbbf77',
    boxShadow: 'none',
    transform: 'none',
  },
  '&:active': {
    transform: 'translateY(0)',
  },
});

const SecondaryButton = styled(Button)({
  border: '1px solid #d1d5db',
  color: '#374151',
  padding: '0.75rem 1.25rem',
  fontWeight: '500',
  fontSize: '0.85rem',
  borderRadius: '8px',
  textTransform: 'none',
  flex: '1',
  minWidth: '120px',
  backgroundColor: '#ffffff',
  transition: 'all 0.2s ease',
  '&:hover': {
    borderColor: '#ef7921',
    color: '#ef7921',
    backgroundColor: 'rgba(239, 121, 33, 0.04)',
    transform: 'translateY(-1px)',
  },
});

const PricingTier = styled('div')({
  display: 'flex',
  alignItems: 'center',
  gap: '0.75rem',
  padding: '0.875rem',
  borderRadius: '8px',
  backgroundColor: '#fffbeb',
  fontSize: '0.85rem',
  color: '#92400e',
  border: '1px solid #fcd34d',
  marginBottom: '1rem',
});

const MOQIndicator = styled('div')({
  fontSize: '0.85rem',
  color: '#475569',
  padding: '0.875rem',
  backgroundColor: '#f8fafc',
  borderRadius: '8px',
  border: '1px solid #e2e8f0',
  marginBottom: '1rem',
  fontWeight: '500',
});

const TotalPriceDisplay = styled('div')({
  display: 'flex',
  alignItems: 'center',
  gap: '0.75rem',
  padding: '1rem',
  backgroundColor: '#f0fdf4',
  borderRadius: '8px',
  marginBottom: '1.5rem',
  border: '1px solid #bbf7d0',
  fontSize: '0.95rem',
});

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState('');
  const [addingToCart, setAddingToCart] = useState(false);
  const [buyingNow, setBuyingNow] = useState(false);

  const { currentUser } = useAuth();
  const context = useContext(MyContext);

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
        // Set default selections
        if (response.data.specifications?.color) {
          setSelectedColor(response.data.specifications.color);
        }
        if (response.data.size) {
          setSelectedSize(response.data.size);
        }
      }
    } catch (error) {
      console.error('Error fetching product:', error);
      toast.error('Failed to load product details');
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

  // Function to trigger cart count refresh
  const triggerCartCountRefresh = () => {
    console.log('Triggering cart count refresh...');
    
    // Method 1: Use context function if available
    if (context?.refreshCartCount) {
      console.log('Using context refreshCartCount function');
      context.refreshCartCount();
    }
    
    // Method 2: Dispatch custom event for Header component to listen to
    const cartRefreshEvent = new CustomEvent('cartRefresh', {
      detail: { timestamp: Date.now(), source: 'productDetails' }
    });
    window.dispatchEvent(cartRefreshEvent);
    console.log('Dispatched cartRefresh event');
    
    // Method 3: Force refresh by updating localStorage (fallback)
    const cartUpdateKey = 'cart_last_updated';
    localStorage.setItem(cartUpdateKey, Date.now().toString());
    
    // Method 4: Also try the setOpenCartPanel function if it exists (some implementations use this)
    if (context?.setOpenCartPanel) {
      // Briefly open and close cart panel to force refresh
      setTimeout(() => {
        context.setOpenCartPanel(true);
        setTimeout(() => context.setOpenCartPanel(false), 100);
      }, 500);
    }
  };

  const handleAddToCart = async () => {
    if (!currentUser) {
      toast.error('Please login to add items to cart');
      navigate('/login');
      return;
    }

    if (!product?._id) {
      toast.error('Product information is incomplete');
      return;
    }

    if (product.stock === 0) {
      toast.error('This product is out of stock');
      return;
    }

    if (quantity > product.stock) {
      toast.error(`Only ${product.stock} items available in stock`);
      return;
    }

    try {
      setAddingToCart(true);
      
      // Add item to cart
      await cartApi.addToCart(product._id, quantity);
      
      // Show success toast with product details
      toast.success(
        <div>
          <div style={{ fontWeight: 'bold', marginBottom: '4px' }}>
            ✅ Added to Cart!
          </div>
          <div style={{ fontSize: '14px', color: '#666' }}>
            {quantity} x {product.name}
          </div>
          <div style={{ fontSize: '14px', color: '#ef7921', fontWeight: '600' }}>
            Total: ${(quantity * (product.wholesaleEnabled && quantity >= product.moq ? product.wholesalePrice : product.price)).toFixed(2)}
          </div>
        </div>,
        {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        }
      );
      
      // TRIGGER CART COUNT REFRESH - Multiple methods to ensure it works
      triggerCartCountRefresh();
      
      // Additional delayed refresh to ensure count is updated after server processing
      setTimeout(() => {
        triggerCartCountRefresh();
      }, 1000);
      
    } catch (error) {
      console.error('Error adding to cart:', error);
      toast.error(error.response?.data?.message || error.message || 'Failed to add product to cart');
    } finally {
      setAddingToCart(false);
    }
  };

  const handleBuyNow = async () => {
    if (!currentUser) {
      toast.error('Please login to proceed with purchase');
      navigate('/login');
      return;
    }

    if (!product?._id) {
      toast.error('Product information is incomplete');
      return;
    }

    if (product.stock === 0) {
      toast.error('This product is out of stock');
      return;
    }

    if (quantity > product.stock) {
      toast.error(`Only ${product.stock} items available in stock`);
      return;
    }

    try {
      setBuyingNow(true);
      await cartApi.addToCart(product._id, quantity);
      
      // Trigger cart count refresh before navigating
      triggerCartCountRefresh();
      
      // Show quick toast before navigating to checkout
      toast.success('Redirecting to checkout...', {
        autoClose: 1000,
      });
      
      // Small delay to show the toast and ensure cart is updated, then navigate to checkout
      setTimeout(() => {
        navigate('/checkout');
      }, 1000);
      
    } catch (error) {
      console.error('Error adding to cart for checkout:', error);
      toast.error(error.response?.data?.message || error.message || 'Failed to proceed with purchase');
    } finally {
      setBuyingNow(false);
    }
  };

  const handleWishlist = () => {
    if (!currentUser) {
      toast.error('Please login to add items to wishlist');
      navigate('/login');
      return;
    }
    toast.info('Wishlist functionality coming soon!');
  };

  const handleCompare = () => {
    toast.info('Compare functionality coming soon!');
  };

  const handleViewCart = () => {
    // Trigger cart refresh before opening panel to ensure latest data
    triggerCartCountRefresh();
    
    if (context.setOpenCartPanel) {
      context.setOpenCartPanel(true);
    }
  };

  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        minHeight: '400px',
        fontSize: '1rem',
        color: '#64748b',
        fontWeight: '500'
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
        minHeight: '400px',
        fontSize: '1rem',
        color: '#64748b',
        fontWeight: '500'
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
    stock = 0,
    brand,
    category,
    specifications = {},
    size: productSize
  } = product;

  const isWholesale = wholesaleEnabled && quantity >= moq;
  const currentPrice = isWholesale ? wholesalePrice : price;
  const totalPrice = quantity * currentPrice;
  const discountPercentage = oldPrice && oldPrice > price 
    ? Math.round(((oldPrice - price) / oldPrice) * 100)
    : 0;

  // Available colors from specifications
  const availableColors = specifications.color ? [specifications.color] : ['#e53935', '#1e88e5', '#43a047'];
  // Available sizes
  const availableSizes = productSize ? [productSize] : ['S', 'M', 'L', 'XL'];

  return (
    <>
      <section style={{ backgroundColor: '#f8fafc', minHeight: '100vh', padding: '1rem 0' }}>
        {/* Breadcrumb */}
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1.5rem 1rem' }}>
          <Breadcrumbs aria-label="breadcrumb" style={{ marginBottom: '1rem' }}>
            <Link 
              underline="hover" 
              color="inherit" 
              href="/"
              style={{ fontSize: '0.85rem', textDecoration: 'none', color: '#64748b', fontWeight: '500' }}
            >
              Home
            </Link>
            <Link
              underline="hover"
              color="inherit"
              href="/products"
              style={{ fontSize: '0.85rem', textDecoration: 'none', color: '#64748b', fontWeight: '500' }}
            >
              Products
            </Link>
            {category && (
              <Link
                underline="hover"
                color="inherit"
                href={`/products?category=${category._id}`}
                style={{ fontSize: '0.85rem', textDecoration: 'none', color: '#64748b', fontWeight: '500' }}
              >
                {category.name}
              </Link>
            )}
            <span style={{ fontSize: '0.85rem', color: '#ef7921', fontWeight: '600' }}>
              {name}
            </span>
          </Breadcrumbs>
        </div>

        <ProductContainer>
          {/* Product Images */}
          <ImageSection>
            <MainImage>
              <img 
                src={activeImage} 
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

          {/* Product Info */}
          <InfoSection>
            <div>
              <ProductTitle>{name}</ProductTitle>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
                <Rating value={rating} precision={0.1} readOnly size="small" />
                <span style={{ fontSize: '0.85rem', color: '#64748b', fontWeight: '500' }}>
                  ({rating} rating{rating !== 1 ? 's' : ''})
                </span>
                {brand && (
                  <span style={{ fontSize: '0.85rem', color: '#64748b', fontWeight: '500' }}>
                    Brand: <strong style={{ color: '#374151' }}>{brand}</strong>
                  </span>
                )}
              </div>

              <PriceContainer>
                {oldPrice && oldPrice > price && (
                  <OriginalPrice>${oldPrice}</OriginalPrice>
                )}
                <DiscountedPrice>${currentPrice}</DiscountedPrice>
                {discountPercentage > 0 && (
                  <DiscountBadge>-{discountPercentage}%</DiscountBadge>
                )}
                {isWholesale && (
                  <TierBadge type="wholesale">
                    <BusinessIcon fontSize="small" /> Wholesale
                  </TierBadge>
                )}
              </PriceContainer>

              {stock > 0 ? (
                <StockInfo>
                  <span style={{ fontWeight: '600' }}>In Stock:</span>
                  <span>{stock} items available</span>
                </StockInfo>
              ) : (
                <OutOfStockInfo>
                  <span style={{ fontWeight: '600' }}>Out of Stock</span>
                </OutOfStockInfo>
              )}
            </div>

            <Description>{description}</Description>

            <ShippingInfo>
              <LocalShippingIcon fontSize="small" />
              <div>
                <div style={{ fontWeight: '600' }}>Free Shipping</div>
                <div>Delivery in 2-3 business days</div>
              </div>
            </ShippingInfo>

            {/* Color Selection */}
            {availableColors.length > 0 && (
              <OptionGroup>
                <OptionTitle>Color</OptionTitle>
                <ColorOptions>
                  {availableColors.map((color, index) => (
                    <ColorOption
                      key={index}
                      color={color}
                      selected={selectedColor === color}
                      onClick={() => setSelectedColor(color)}
                      title={color}
                    />
                  ))}
                </ColorOptions>
              </OptionGroup>
            )}

            {/* Size Selection */}
            {availableSizes.length > 0 && (
              <OptionGroup>
                <OptionTitle>Size</OptionTitle>
                <SizeOptions>
                  {availableSizes.map((size, index) => (
                    <SizeOption
                      key={index}
                      selected={selectedSize === size}
                      onClick={() => setSelectedSize(size)}
                    >
                      {size}
                    </SizeOption>
                  ))}
                </SizeOptions>
              </OptionGroup>
            )}

            {/* Wholesale Pricing Info */}
            {wholesaleEnabled && (
              <PricingTier>
                <StorefrontIcon fontSize="small" />
                <div>
                  <div style={{ fontWeight: '600' }}>Wholesale Pricing Available</div>
                  <div>Buy {moq}+ units for ${wholesalePrice} each (Save ${(price - wholesalePrice).toFixed(2)} per unit)</div>
                </div>
              </PricingTier>
            )}

            {/* Quantity Section */}
            <OptionGroup>
              <OptionTitle>Quantity</OptionTitle>
              {wholesaleEnabled && (
                <MOQIndicator>
                  {isWholesale 
                    ? `✓ Wholesale order (MOQ: ${moq}+ units) - You save $${((price - wholesalePrice) * quantity).toFixed(2)}`
                    : `Retail order - Add ${Math.max(0, moq - quantity)} more for wholesale pricing`
                  }
                </MOQIndicator>
              )}
              
              <QuantitySection>
                <QuantityControl>
                  <QuantityButton 
                    onClick={handleDecrement}
                    disabled={quantity <= 1}
                  >
                    -
                  </QuantityButton>
                  <QuantityDisplay>{quantity}</QuantityDisplay>
                  <QuantityButton 
                    onClick={handleIncrement}
                    disabled={quantity >= stock}
                  >
                    +
                  </QuantityButton>
                </QuantityControl>

                <TotalPriceDisplay>
                  <span style={{ fontWeight: '600', color: '#064e3b' }}>Total:</span>
                  <span style={{ fontSize: '1.1rem', fontWeight: '700', color: '#059669' }}>
                    ${totalPrice.toFixed(2)}
                  </span>
                </TotalPriceDisplay>
              </QuantitySection>
            </OptionGroup>

            {/* Action Buttons */}
            <ActionButtons>
              <PrimaryButton
                onClick={handleAddToCart}
                disabled={addingToCart || stock === 0}
                startIcon={addingToCart ? null : undefined}
              >
                {addingToCart ? 'Adding...' : stock === 0 ? 'Out of Stock' : 'Add to Cart'}
              </PrimaryButton>
              
              <PrimaryButton
                onClick={handleBuyNow}
                disabled={buyingNow || stock === 0}
                variant="outlined"
                style={{ 
                  backgroundColor: 'transparent', 
                  border: '2px solid #ef7921',
                  color: '#ef7921'
                }}
              >
                {buyingNow ? 'Processing...' : 'Buy Now'}
              </PrimaryButton>
            </ActionButtons>

            <ActionButtons>
              <SecondaryButton
                startIcon={<FavoriteBorderIcon />}
                onClick={handleWishlist}
              >
                Add to Wishlist
              </SecondaryButton>
              
              <SecondaryButton
                startIcon={<CompareArrowsIcon />}
                onClick={handleCompare}
              >
                Compare
              </SecondaryButton>

              {/* Optional: Add a "View Cart" button if you want to give users easy access */}
              <SecondaryButton
                onClick={handleViewCart}
                style={{ borderColor: '#10b981', color: '#10b981' }}
              >
                View Cart
              </SecondaryButton>
            </ActionButtons>
          </InfoSection>
        </ProductContainer>

        {/* Additional Sections */}
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem 1.5rem' }}>
          {/* Reviews Section */}
          <ReviewAndRatingComponent 
            productId={id}
            productName={name}
          />

          {/* Related Products Section */}
          <RelatedProductsComponent 
            categoryId={category?._id}
            currentProductId={id}
          />
        </div>
      </section>
    </>
  );
};

export default ProductDetails;








































































// import React, { useState, useEffect, useContext } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import Breadcrumbs from '@mui/material/Breadcrumbs';
// import Link from '@mui/material/Link';
// import Button from '@mui/material/Button';
// import Rating from '@mui/material/Rating';
// import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
// import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
// import LocalShippingIcon from '@mui/icons-material/LocalShipping';
// import BusinessIcon from '@mui/icons-material/Business';
// import StorefrontIcon from '@mui/icons-material/Storefront';
// import { styled } from '@mui/material/styles';
// import { productApi } from '../../utils/productApi';
// import { cartApi } from '../../utils/cartApi';
// import { useAuth } from '../../context/authContext';
// import { MyContext } from '../../App';
// import { toast } from 'react-toastify';

// // Import components
// import ReviewAndRatingComponent from '../../components/ReviewAndRatingComponent';
// import RelatedProductsComponent from '../../components/RelatedProductsComponent';

// // Styled components with improved proportions and spacing
// const ProductContainer = styled('div')({
//   display: 'flex',
//   gap: '2.5rem',
//   maxWidth: '1200px',
//   margin: '0 auto',
//   padding: '1.5rem',
//   backgroundColor: '#ffffff',
//   borderRadius: '12px',
//   boxShadow: '0 2px 20px rgba(0, 0, 0, 0.08)',
//   '@media (max-width: 768px)': {
//     flexDirection: 'column',
//     gap: '2rem',
//     padding: '1rem',
//   },
// });

// const ImageSection = styled('div')({
//   flex: '0 0 48%',
//   display: 'flex',
//   flexDirection: 'column',
//   gap: '1rem',
//   '@media (max-width: 768px)': {
//     flex: '1',
//   },
// });

// const MainImage = styled('div')({
//   border: '1px solid #f1f5f9',
//   borderRadius: '12px',
//   overflow: 'hidden',
//   height: '400px',
//   position: 'relative',
//   backgroundColor: '#fafafa',
//   '& img': {
//     width: '100%',
//     height: '100%',
//     objectFit: 'contain',
//     padding: '1rem',
//     transition: 'transform 0.3s ease',
//   },
//   '&:hover img': {
//     transform: 'scale(1.02)',
//   },
// });

// const ThumbnailContainer = styled('div')({
//   display: 'flex',
//   gap: '0.75rem',
//   justifyContent: 'center',
//   flexWrap: 'wrap',
// });

// const Thumbnail = styled('div')(({ active }) => ({
//   width: '70px',
//   height: '70px',
//   border: active ? '2px solid #ef7921' : '1px solid #e2e8f0',
//   borderRadius: '8px',
//   overflow: 'hidden',
//   cursor: 'pointer',
//   transition: 'all 0.2s ease',
//   backgroundColor: '#f8fafc',
//   '&:hover': {
//     borderColor: '#ef7921',
//     transform: 'scale(1.05)',
//   },
//   '& img': {
//     width: '100%',
//     height: '100%',
//     objectFit: 'cover',
//   },
// }));

// const InfoSection = styled('div')({
//   flex: '1',
//   display: 'flex',
//   flexDirection: 'column',
//   gap: '1.25rem',
//   padding: '0.5rem 0',
// });

// const ProductTitle = styled('h1')({
//   fontSize: '1.75rem',
//   fontWeight: '700',
//   margin: '0 0 0.5rem 0',
//   color: '#1e293b',
//   lineHeight: '1.3',
//   letterSpacing: '-0.025em',
//   '@media (max-width: 768px)': {
//     fontSize: '1.5rem',
//   },
// });

// const PriceContainer = styled('div')({
//   display: 'flex',
//   alignItems: 'center',
//   gap: '1rem',
//   flexWrap: 'wrap',
//   marginBottom: '0.5rem',
// });

// const OriginalPrice = styled('span')({
//   textDecoration: 'line-through',
//   color: '#64748b',
//   fontSize: '1.1rem',
//   fontWeight: '500',
// });

// const DiscountedPrice = styled('span')({
//   fontSize: '1.75rem',
//   fontWeight: '700',
//   color: '#ef7921',
//   letterSpacing: '-0.025em',
// });

// const DiscountBadge = styled('span')({
//   backgroundColor: '#ef7921',
//   color: 'white',
//   padding: '0.25rem 0.75rem',
//   borderRadius: '12px',
//   fontSize: '0.8rem',
//   fontWeight: '600',
//   letterSpacing: '0.025em',
// });

// const TierBadge = styled('span')(({ type }) => ({
//   padding: '0.375rem 0.75rem',
//   borderRadius: '6px',
//   fontSize: '0.75rem',
//   fontWeight: '700',
//   backgroundColor: type === 'wholesale' ? '#10b981' : '#6b7280',
//   color: 'white',
//   display: 'flex',
//   alignItems: 'center',
//   gap: '0.25rem',
//   letterSpacing: '0.025em',
// }));

// const StockInfo = styled('div')({
//   display: 'flex',
//   alignItems: 'center',
//   gap: '0.5rem',
//   padding: '0.75rem',
//   backgroundColor: '#f0fdf4',
//   border: '1px solid #bbf7d0',
//   borderRadius: '8px',
//   color: '#166534',
//   fontSize: '0.85rem',
//   fontWeight: '500',
// });

// const OutOfStockInfo = styled('div')({
//   display: 'flex',
//   alignItems: 'center',
//   gap: '0.5rem',
//   padding: '0.75rem',
//   backgroundColor: '#fef2f2',
//   border: '1px solid #fecaca',
//   borderRadius: '8px',
//   color: '#dc2626',
//   fontSize: '0.85rem',
//   fontWeight: '500',
// });

// const Description = styled('p')({
//   color: '#475569',
//   lineHeight: '1.6',
//   fontSize: '0.95rem',
//   margin: '0',
//   fontWeight: '400',
// });

// const ShippingInfo = styled('div')({
//   display: 'flex',
//   alignItems: 'center',
//   gap: '0.75rem',
//   padding: '0.875rem',
//   backgroundColor: '#f8fafc',
//   border: '1px solid #e2e8f0',
//   borderRadius: '8px',
//   fontSize: '0.85rem',
//   color: '#475569',
//   fontWeight: '500',
// });

// const OptionGroup = styled('div')({
//   marginBottom: '1.25rem',
// });

// const OptionTitle = styled('h3')({
//   fontSize: '0.95rem',
//   fontWeight: '600',
//   margin: '0 0 0.75rem 0',
//   color: '#334155',
//   textTransform: 'uppercase',
//   letterSpacing: '0.05em',
// });

// const ColorOptions = styled('div')({
//   display: 'flex',
//   gap: '0.75rem',
//   flexWrap: 'wrap',
// });

// const ColorOption = styled('div')(({ selected, color }) => ({
//   width: '36px',
//   height: '36px',
//   borderRadius: '50%',
//   backgroundColor: color,
//   border: selected ? '3px solid #ef7921' : '2px solid #e2e8f0',
//   cursor: 'pointer',
//   transition: 'all 0.2s ease',
//   boxShadow: selected ? '0 2px 8px rgba(239, 121, 33, 0.3)' : 'none',
//   '&:hover': {
//     transform: 'scale(1.1)',
//   },
// }));

// const SizeOptions = styled('div')({
//   display: 'flex',
//   gap: '0.75rem',
//   flexWrap: 'wrap',
// });

// const SizeOption = styled('div')(({ selected }) => ({
//   padding: '0.625rem 1rem',
//   border: selected ? '2px solid #ef7921' : '1px solid #cbd5e1',
//   borderRadius: '6px',
//   cursor: 'pointer',
//   fontWeight: '600',
//   fontSize: '0.85rem',
//   backgroundColor: selected ? 'rgba(239, 121, 33, 0.1)' : '#ffffff',
//   color: selected ? '#ef7921' : '#475569',
//   minWidth: '44px',
//   textAlign: 'center',
//   transition: 'all 0.2s ease',
//   '&:hover': {
//     borderColor: '#ef7921',
//     backgroundColor: 'rgba(239, 121, 33, 0.05)',
//   },
// }));

// const QuantitySection = styled('div')({
//   display: 'flex',
//   alignItems: 'center',
//   gap: '1rem',
//   marginBottom: '1.25rem',
//   flexWrap: 'wrap',
// });

// const QuantityControl = styled('div')({
//   display: 'flex',
//   alignItems: 'center',
//   border: '2px solid #e2e8f0',
//   borderRadius: '8px',
//   overflow: 'hidden',
//   backgroundColor: '#ffffff',
//   boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
// });

// const QuantityButton = styled('button')({
//   width: '40px',
//   height: '40px',
//   border: 'none',
//   background: '#f8fafc',
//   cursor: 'pointer',
//   display: 'flex',
//   alignItems: 'center',
//   justifyContent: 'center',
//   fontSize: '1.1rem',
//   fontWeight: '500',
//   color: '#475569',
//   transition: 'all 0.2s ease',
//   '&:hover': {
//     backgroundColor: '#f1f5f9',
//     color: '#ef7921',
//   },
//   '&:disabled': {
//     backgroundColor: '#f8fafc',
//     color: '#cbd5e1',
//     cursor: 'not-allowed',
//   },
// });

// const QuantityDisplay = styled('span')({
//   width: '50px',
//   textAlign: 'center',
//   fontWeight: '600',
//   fontSize: '0.95rem',
//   color: '#1e293b',
// });

// const ActionButtons = styled('div')({
//   display: 'flex',
//   gap: '1rem',
//   flexWrap: 'wrap',
//   '@media (max-width: 768px)': {
//     flexDirection: 'column',
//   },
// });

// const PrimaryButton = styled(Button)({
//   backgroundColor: '#ef7921',
//   color: 'white',
//   padding: '0.875rem 2rem',
//   fontWeight: '600',
//   fontSize: '0.95rem',
//   borderRadius: '8px',
//   textTransform: 'none',
//   flex: '1',
//   minWidth: '180px',
//   boxShadow: '0 2px 8px rgba(239, 121, 33, 0.3)',
//   '&:hover': {
//     backgroundColor: '#e06b15',
//     boxShadow: '0 4px 12px rgba(239, 121, 33, 0.4)',
//     transform: 'translateY(-1px)',
//   },
//   '&:disabled': {
//     backgroundColor: '#fbbf77',
//     boxShadow: 'none',
//     transform: 'none',
//   },
//   '&:active': {
//     transform: 'translateY(0)',
//   },
// });

// const SecondaryButton = styled(Button)({
//   border: '1px solid #d1d5db',
//   color: '#374151',
//   padding: '0.75rem 1.25rem',
//   fontWeight: '500',
//   fontSize: '0.85rem',
//   borderRadius: '8px',
//   textTransform: 'none',
//   flex: '1',
//   minWidth: '120px',
//   backgroundColor: '#ffffff',
//   transition: 'all 0.2s ease',
//   '&:hover': {
//     borderColor: '#ef7921',
//     color: '#ef7921',
//     backgroundColor: 'rgba(239, 121, 33, 0.04)',
//     transform: 'translateY(-1px)',
//   },
// });

// const PricingTier = styled('div')({
//   display: 'flex',
//   alignItems: 'center',
//   gap: '0.75rem',
//   padding: '0.875rem',
//   borderRadius: '8px',
//   backgroundColor: '#fffbeb',
//   fontSize: '0.85rem',
//   color: '#92400e',
//   border: '1px solid #fcd34d',
//   marginBottom: '1rem',
// });

// const MOQIndicator = styled('div')({
//   fontSize: '0.85rem',
//   color: '#475569',
//   padding: '0.875rem',
//   backgroundColor: '#f8fafc',
//   borderRadius: '8px',
//   border: '1px solid #e2e8f0',
//   marginBottom: '1rem',
//   fontWeight: '500',
// });

// const TotalPriceDisplay = styled('div')({
//   display: 'flex',
//   alignItems: 'center',
//   gap: '0.75rem',
//   padding: '1rem',
//   backgroundColor: '#f0fdf4',
//   borderRadius: '8px',
//   marginBottom: '1.5rem',
//   border: '1px solid #bbf7d0',
//   fontSize: '0.95rem',
// });

// const ProductDetails = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [product, setProduct] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [selectedColor, setSelectedColor] = useState('');
//   const [selectedSize, setSelectedSize] = useState('');
//   const [quantity, setQuantity] = useState(1);
//   const [activeImage, setActiveImage] = useState('');
//   const [addingToCart, setAddingToCart] = useState(false);
//   const [buyingNow, setBuyingNow] = useState(false);

//   const { currentUser } = useAuth();
//   const context = useContext(MyContext);

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
//         // Set default selections
//         if (response.data.specifications?.color) {
//           setSelectedColor(response.data.specifications.color);
//         }
//         if (response.data.size) {
//           setSelectedSize(response.data.size);
//         }
//       }
//     } catch (error) {
//       console.error('Error fetching product:', error);
//       toast.error('Failed to load product details');
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

//   const handleAddToCart = async () => {
//     if (!currentUser) {
//       toast.error('Please login to add items to cart');
//       navigate('/login');
//       return;
//     }

//     if (!product?._id) {
//       toast.error('Product information is incomplete');
//       return;
//     }

//     if (product.stock === 0) {
//       toast.error('This product is out of stock');
//       return;
//     }

//     if (quantity > product.stock) {
//       toast.error(`Only ${product.stock} items available in stock`);
//       return;
//     }

//     try {
//       setAddingToCart(true);
//       await cartApi.addToCart(product._id, quantity);
      
//       // Show success toast with product details
//       toast.success(
//         <div>
//           <div style={{ fontWeight: 'bold', marginBottom: '4px' }}>
//             ✅ Added to Cart!
//           </div>
//           <div style={{ fontSize: '14px', color: '#666' }}>
//             {quantity} x {product.name}
//           </div>
//           <div style={{ fontSize: '14px', color: '#ef7921', fontWeight: '600' }}>
//             Total: ${(quantity * (product.wholesaleEnabled && quantity >= product.moq ? product.wholesalePrice : product.price)).toFixed(2)}
//           </div>
//         </div>,
//         {
//           position: "top-right",
//           autoClose: 3000,
//           hideProgressBar: false,
//           closeOnClick: true,
//           pauseOnHover: true,
//           draggable: true,
//         }
//       );
      
//       // Refresh cart count in header (silently in background)
//       if (context.refreshCartCount) {
//         context.refreshCartCount();
//       }
      
//       // DO NOT automatically open cart panel - let user decide when to view cart
      
//     } catch (error) {
//       console.error('Error adding to cart:', error);
//       toast.error(error.response?.data?.message || error.message || 'Failed to add product to cart');
//     } finally {
//       setAddingToCart(false);
//     }
//   };

//   const handleBuyNow = async () => {
//     if (!currentUser) {
//       toast.error('Please login to proceed with purchase');
//       navigate('/login');
//       return;
//     }

//     if (!product?._id) {
//       toast.error('Product information is incomplete');
//       return;
//     }

//     if (product.stock === 0) {
//       toast.error('This product is out of stock');
//       return;
//     }

//     if (quantity > product.stock) {
//       toast.error(`Only ${product.stock} items available in stock`);
//       return;
//     }

//     try {
//       setBuyingNow(true);
//       await cartApi.addToCart(product._id, quantity);
      
//       // Refresh cart count in header
//       if (context.refreshCartCount) {
//         context.refreshCartCount();
//       }
      
//       // Show quick toast before navigating to checkout
//       toast.success('Redirecting to checkout...', {
//         autoClose: 1000,
//       });
      
//       // Small delay to show the toast, then navigate to checkout
//       setTimeout(() => {
//         navigate('/checkout');
//       }, 1000);
      
//     } catch (error) {
//       console.error('Error adding to cart for checkout:', error);
//       toast.error(error.response?.data?.message || error.message || 'Failed to proceed with purchase');
//     } finally {
//       setBuyingNow(false);
//     }
//   };

//   const handleWishlist = () => {
//     if (!currentUser) {
//       toast.error('Please login to add items to wishlist');
//       navigate('/login');
//       return;
//     }
//     toast.info('Wishlist functionality coming soon!');
//   };

//   const handleCompare = () => {
//     toast.info('Compare functionality coming soon!');
//   };

//   const handleViewCart = () => {
//     if (context.setOpenCartPanel) {
//       context.setOpenCartPanel(true);
//     }
//   };

//   if (loading) {
//     return (
//       <div style={{ 
//         display: 'flex', 
//         justifyContent: 'center', 
//         alignItems: 'center', 
//         minHeight: '400px',
//         fontSize: '1rem',
//         color: '#64748b',
//         fontWeight: '500'
//       }}>
//         Loading product details...
//       </div>
//     );
//   }

//   if (!product) {
//     return (
//       <div style={{ 
//         display: 'flex', 
//         justifyContent: 'center', 
//         alignItems: 'center', 
//         minHeight: '400px',
//         fontSize: '1rem',
//         color: '#64748b',
//         fontWeight: '500'
//       }}>
//         Product not found
//       </div>
//     );
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
//     stock = 0,
//     brand,
//     category,
//     specifications = {},
//     size: productSize
//   } = product;

//   const isWholesale = wholesaleEnabled && quantity >= moq;
//   const currentPrice = isWholesale ? wholesalePrice : price;
//   const totalPrice = quantity * currentPrice;
//   const discountPercentage = oldPrice && oldPrice > price 
//     ? Math.round(((oldPrice - price) / oldPrice) * 100)
//     : 0;

//   // Available colors from specifications
//   const availableColors = specifications.color ? [specifications.color] : ['#e53935', '#1e88e5', '#43a047'];
//   // Available sizes
//   const availableSizes = productSize ? [productSize] : ['S', 'M', 'L', 'XL'];

//   return (
//     <>
//       <section style={{ backgroundColor: '#f8fafc', minHeight: '100vh', padding: '1rem 0' }}>
//         {/* Breadcrumb */}
//         <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1.5rem 1rem' }}>
//           <Breadcrumbs aria-label="breadcrumb" style={{ marginBottom: '1rem' }}>
//             <Link 
//               underline="hover" 
//               color="inherit" 
//               href="/"
//               style={{ fontSize: '0.85rem', textDecoration: 'none', color: '#64748b', fontWeight: '500' }}
//             >
//               Home
//             </Link>
//             <Link
//               underline="hover"
//               color="inherit"
//               href="/products"
//               style={{ fontSize: '0.85rem', textDecoration: 'none', color: '#64748b', fontWeight: '500' }}
//             >
//               Products
//             </Link>
//             {category && (
//               <Link
//                 underline="hover"
//                 color="inherit"
//                 href={`/products?category=${category._id}`}
//                 style={{ fontSize: '0.85rem', textDecoration: 'none', color: '#64748b', fontWeight: '500' }}
//               >
//                 {category.name}
//               </Link>
//             )}
//             <span style={{ fontSize: '0.85rem', color: '#ef7921', fontWeight: '600' }}>
//               {name}
//             </span>
//           </Breadcrumbs>
//         </div>

//         <ProductContainer>
//           {/* Product Images */}
//           <ImageSection>
//             <MainImage>
//               <img 
//                 src={activeImage} 
//                 alt={name}
//                 onError={(e) => {
//                   e.target.src = '/src/assets/images/grocery.jpg';
//                 }}
//               />
//             </MainImage>
            
//             <ThumbnailContainer>
//               {images.map((image, index) => (
//                 <Thumbnail
//                   key={image._id || index}
//                   active={activeImage === image.url}
//                   onClick={() => handleThumbnailClick(image.url)}
//                 >
//                   <img 
//                     src={image.url} 
//                     alt={`${name} ${index + 1}`}
//                     onError={(e) => {
//                       e.target.src = '/src/assets/images/grocery.jpg';
//                     }}
//                   />
//                 </Thumbnail>
//               ))}
//             </ThumbnailContainer>
//           </ImageSection>

//           {/* Product Info */}
//           <InfoSection>
//             <div>
//               <ProductTitle>{name}</ProductTitle>
              
//               <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
//                 <Rating value={rating} precision={0.1} readOnly size="small" />
//                 <span style={{ fontSize: '0.85rem', color: '#64748b', fontWeight: '500' }}>
//                   ({rating} rating{rating !== 1 ? 's' : ''})
//                 </span>
//                 {brand && (
//                   <span style={{ fontSize: '0.85rem', color: '#64748b', fontWeight: '500' }}>
//                     Brand: <strong style={{ color: '#374151' }}>{brand}</strong>
//                   </span>
//                 )}
//               </div>

//               <PriceContainer>
//                 {oldPrice && oldPrice > price && (
//                   <OriginalPrice>${oldPrice}</OriginalPrice>
//                 )}
//                 <DiscountedPrice>${currentPrice}</DiscountedPrice>
//                 {discountPercentage > 0 && (
//                   <DiscountBadge>-{discountPercentage}%</DiscountBadge>
//                 )}
//                 {isWholesale && (
//                   <TierBadge type="wholesale">
//                     <BusinessIcon fontSize="small" /> Wholesale
//                   </TierBadge>
//                 )}
//               </PriceContainer>

//               {stock > 0 ? (
//                 <StockInfo>
//                   <span style={{ fontWeight: '600' }}>In Stock:</span>
//                   <span>{stock} items available</span>
//                 </StockInfo>
//               ) : (
//                 <OutOfStockInfo>
//                   <span style={{ fontWeight: '600' }}>Out of Stock</span>
//                 </OutOfStockInfo>
//               )}
//             </div>

//             <Description>{description}</Description>

//             <ShippingInfo>
//               <LocalShippingIcon fontSize="small" />
//               <div>
//                 <div style={{ fontWeight: '600' }}>Free Shipping</div>
//                 <div>Delivery in 2-3 business days</div>
//               </div>
//             </ShippingInfo>

//             {/* Color Selection */}
//             {availableColors.length > 0 && (
//               <OptionGroup>
//                 <OptionTitle>Color</OptionTitle>
//                 <ColorOptions>
//                   {availableColors.map((color, index) => (
//                     <ColorOption
//                       key={index}
//                       color={color}
//                       selected={selectedColor === color}
//                       onClick={() => setSelectedColor(color)}
//                       title={color}
//                     />
//                   ))}
//                 </ColorOptions>
//               </OptionGroup>
//             )}

//             {/* Size Selection */}
//             {availableSizes.length > 0 && (
//               <OptionGroup>
//                 <OptionTitle>Size</OptionTitle>
//                 <SizeOptions>
//                   {availableSizes.map((size, index) => (
//                     <SizeOption
//                       key={index}
//                       selected={selectedSize === size}
//                       onClick={() => setSelectedSize(size)}
//                     >
//                       {size}
//                     </SizeOption>
//                   ))}
//                 </SizeOptions>
//               </OptionGroup>
//             )}

//             {/* Wholesale Pricing Info */}
//             {wholesaleEnabled && (
//               <PricingTier>
//                 <StorefrontIcon fontSize="small" />
//                 <div>
//                   <div style={{ fontWeight: '600' }}>Wholesale Pricing Available</div>
//                   <div>Buy {moq}+ units for ${wholesalePrice} each (Save ${(price - wholesalePrice).toFixed(2)} per unit)</div>
//                 </div>
//               </PricingTier>
//             )}

//             {/* Quantity Section */}
//             <OptionGroup>
//               <OptionTitle>Quantity</OptionTitle>
//               {wholesaleEnabled && (
//                 <MOQIndicator>
//                   {isWholesale 
//                     ? `✓ Wholesale order (MOQ: ${moq}+ units) - You save $${((price - wholesalePrice) * quantity).toFixed(2)}`
//                     : `Retail order - Add ${Math.max(0, moq - quantity)} more for wholesale pricing`
//                   }
//                 </MOQIndicator>
//               )}
              
//               <QuantitySection>
//                 <QuantityControl>
//                   <QuantityButton 
//                     onClick={handleDecrement}
//                     disabled={quantity <= 1}
//                   >
//                     -
//                   </QuantityButton>
//                   <QuantityDisplay>{quantity}</QuantityDisplay>
//                   <QuantityButton 
//                     onClick={handleIncrement}
//                     disabled={quantity >= stock}
//                   >
//                     +
//                   </QuantityButton>
//                 </QuantityControl>

//                 <TotalPriceDisplay>
//                   <span style={{ fontWeight: '600', color: '#064e3b' }}>Total:</span>
//                   <span style={{ fontSize: '1.1rem', fontWeight: '700', color: '#059669' }}>
//                     ${totalPrice.toFixed(2)}
//                   </span>
//                 </TotalPriceDisplay>
//               </QuantitySection>
//             </OptionGroup>

//             {/* Action Buttons */}
//             <ActionButtons>
//               <PrimaryButton
//                 onClick={handleAddToCart}
//                 disabled={addingToCart || stock === 0}
//                 startIcon={addingToCart ? null : undefined}
//               >
//                 {addingToCart ? 'Adding...' : stock === 0 ? 'Out of Stock' : 'Add to Cart'}
//               </PrimaryButton>
              
//               <PrimaryButton
//                 onClick={handleBuyNow}
//                 disabled={buyingNow || stock === 0}
//                 variant="outlined"
//                 style={{ 
//                   backgroundColor: 'transparent', 
//                   border: '2px solid #ef7921',
//                   color: '#ef7921'
//                 }}
//               >
//                 {buyingNow ? 'Processing...' : 'Buy Now'}
//               </PrimaryButton>
//             </ActionButtons>

//             <ActionButtons>
//               <SecondaryButton
//                 startIcon={<FavoriteBorderIcon />}
//                 onClick={handleWishlist}
//               >
//                 Add to Wishlist
//               </SecondaryButton>
              
//               <SecondaryButton
//                 startIcon={<CompareArrowsIcon />}
//                 onClick={handleCompare}
//               >
//                 Compare
//               </SecondaryButton>

//               {/* Optional: Add a "View Cart" button if you want to give users easy access */}
//               <SecondaryButton
//                 onClick={handleViewCart}
//                 style={{ borderColor: '#10b981', color: '#10b981' }}
//               >
//                 View Cart
//               </SecondaryButton>
//             </ActionButtons>
//           </InfoSection>
//         </ProductContainer>

//         {/* Additional Sections */}
//         <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem 1.5rem' }}>
//           {/* Reviews Section */}
//           <ReviewAndRatingComponent 
//             productId={id}
//             productName={name}
//           />

//           {/* Related Products Section */}
//           <RelatedProductsComponent 
//             categoryId={category?._id}
//             currentProductId={id}
//           />
//         </div>
//       </section>
//     </>
//   );
// };

// export default ProductDetails;





















































































// import React, { useState, useEffect, useContext } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import Breadcrumbs from '@mui/material/Breadcrumbs';
// import Link from '@mui/material/Link';
// import Button from '@mui/material/Button';
// import Rating from '@mui/material/Rating';
// import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
// import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
// import LocalShippingIcon from '@mui/icons-material/LocalShipping';
// import BusinessIcon from '@mui/icons-material/Business';
// import StorefrontIcon from '@mui/icons-material/Storefront';
// import { styled } from '@mui/material/styles';
// import { productApi } from '../../utils/productApi';
// import { cartApi } from '../../utils/cartApi';
// import { useAuth } from '../../context/authContext';
// import { MyContext } from '../../App';
// import { toast } from 'react-toastify';

// // Import components
// import ReviewAndRatingComponent from '../../components/ReviewAndRatingComponent';
// import RelatedProductsComponent from '../../components/RelatedProductsComponent';

// // Styled components with improved proportions and spacing
// const ProductContainer = styled('div')({
//   display: 'flex',
//   gap: '2.5rem',
//   maxWidth: '1200px',
//   margin: '0 auto',
//   padding: '1.5rem',
//   backgroundColor: '#ffffff',
//   borderRadius: '12px',
//   boxShadow: '0 2px 20px rgba(0, 0, 0, 0.08)',
//   '@media (max-width: 768px)': {
//     flexDirection: 'column',
//     gap: '2rem',
//     padding: '1rem',
//   },
// });

// const ImageSection = styled('div')({
//   flex: '0 0 48%',
//   display: 'flex',
//   flexDirection: 'column',
//   gap: '1rem',
//   '@media (max-width: 768px)': {
//     flex: '1',
//   },
// });

// const MainImage = styled('div')({
//   border: '1px solid #f1f5f9',
//   borderRadius: '12px',
//   overflow: 'hidden',
//   height: '400px',
//   position: 'relative',
//   backgroundColor: '#fafafa',
//   '& img': {
//     width: '100%',
//     height: '100%',
//     objectFit: 'contain',
//     padding: '1rem',
//     transition: 'transform 0.3s ease',
//   },
//   '&:hover img': {
//     transform: 'scale(1.02)',
//   },
// });

// const ThumbnailContainer = styled('div')({
//   display: 'flex',
//   gap: '0.75rem',
//   justifyContent: 'center',
//   flexWrap: 'wrap',
// });

// const Thumbnail = styled('div')(({ active }) => ({
//   width: '70px',
//   height: '70px',
//   border: active ? '2px solid #ef7921' : '1px solid #e2e8f0',
//   borderRadius: '8px',
//   overflow: 'hidden',
//   cursor: 'pointer',
//   transition: 'all 0.2s ease',
//   backgroundColor: '#f8fafc',
//   '&:hover': {
//     borderColor: '#ef7921',
//     transform: 'scale(1.05)',
//   },
//   '& img': {
//     width: '100%',
//     height: '100%',
//     objectFit: 'cover',
//   },
// }));

// const InfoSection = styled('div')({
//   flex: '1',
//   display: 'flex',
//   flexDirection: 'column',
//   gap: '1.25rem',
//   padding: '0.5rem 0',
// });

// const ProductTitle = styled('h1')({
//   fontSize: '1.75rem',
//   fontWeight: '700',
//   margin: '0 0 0.5rem 0',
//   color: '#1e293b',
//   lineHeight: '1.3',
//   letterSpacing: '-0.025em',
//   '@media (max-width: 768px)': {
//     fontSize: '1.5rem',
//   },
// });

// const PriceContainer = styled('div')({
//   display: 'flex',
//   alignItems: 'center',
//   gap: '1rem',
//   flexWrap: 'wrap',
//   marginBottom: '0.5rem',
// });

// const OriginalPrice = styled('span')({
//   textDecoration: 'line-through',
//   color: '#64748b',
//   fontSize: '1.1rem',
//   fontWeight: '500',
// });

// const DiscountedPrice = styled('span')({
//   fontSize: '1.75rem',
//   fontWeight: '700',
//   color: '#ef7921',
//   letterSpacing: '-0.025em',
// });

// const DiscountBadge = styled('span')({
//   backgroundColor: '#ef7921',
//   color: 'white',
//   padding: '0.25rem 0.75rem',
//   borderRadius: '12px',
//   fontSize: '0.8rem',
//   fontWeight: '600',
//   letterSpacing: '0.025em',
// });

// const TierBadge = styled('span')(({ type }) => ({
//   padding: '0.375rem 0.75rem',
//   borderRadius: '6px',
//   fontSize: '0.75rem',
//   fontWeight: '700',
//   backgroundColor: type === 'wholesale' ? '#10b981' : '#6b7280',
//   color: 'white',
//   display: 'flex',
//   alignItems: 'center',
//   gap: '0.25rem',
//   letterSpacing: '0.025em',
// }));

// const StockInfo = styled('div')({
//   display: 'flex',
//   alignItems: 'center',
//   gap: '0.5rem',
//   padding: '0.75rem',
//   backgroundColor: '#f0fdf4',
//   border: '1px solid #bbf7d0',
//   borderRadius: '8px',
//   color: '#166534',
//   fontSize: '0.85rem',
//   fontWeight: '500',
// });

// const OutOfStockInfo = styled('div')({
//   display: 'flex',
//   alignItems: 'center',
//   gap: '0.5rem',
//   padding: '0.75rem',
//   backgroundColor: '#fef2f2',
//   border: '1px solid #fecaca',
//   borderRadius: '8px',
//   color: '#dc2626',
//   fontSize: '0.85rem',
//   fontWeight: '500',
// });

// const Description = styled('p')({
//   color: '#475569',
//   lineHeight: '1.6',
//   fontSize: '0.95rem',
//   margin: '0',
//   fontWeight: '400',
// });

// const ShippingInfo = styled('div')({
//   display: 'flex',
//   alignItems: 'center',
//   gap: '0.75rem',
//   padding: '0.875rem',
//   backgroundColor: '#f8fafc',
//   border: '1px solid #e2e8f0',
//   borderRadius: '8px',
//   fontSize: '0.85rem',
//   color: '#475569',
//   fontWeight: '500',
// });

// const OptionGroup = styled('div')({
//   marginBottom: '1.25rem',
// });

// const OptionTitle = styled('h3')({
//   fontSize: '0.95rem',
//   fontWeight: '600',
//   margin: '0 0 0.75rem 0',
//   color: '#334155',
//   textTransform: 'uppercase',
//   letterSpacing: '0.05em',
// });

// const ColorOptions = styled('div')({
//   display: 'flex',
//   gap: '0.75rem',
//   flexWrap: 'wrap',
// });

// const ColorOption = styled('div')(({ selected, color }) => ({
//   width: '36px',
//   height: '36px',
//   borderRadius: '50%',
//   backgroundColor: color,
//   border: selected ? '3px solid #ef7921' : '2px solid #e2e8f0',
//   cursor: 'pointer',
//   transition: 'all 0.2s ease',
//   boxShadow: selected ? '0 2px 8px rgba(239, 121, 33, 0.3)' : 'none',
//   '&:hover': {
//     transform: 'scale(1.1)',
//   },
// }));

// const SizeOptions = styled('div')({
//   display: 'flex',
//   gap: '0.75rem',
//   flexWrap: 'wrap',
// });

// const SizeOption = styled('div')(({ selected }) => ({
//   padding: '0.625rem 1rem',
//   border: selected ? '2px solid #ef7921' : '1px solid #cbd5e1',
//   borderRadius: '6px',
//   cursor: 'pointer',
//   fontWeight: '600',
//   fontSize: '0.85rem',
//   backgroundColor: selected ? 'rgba(239, 121, 33, 0.1)' : '#ffffff',
//   color: selected ? '#ef7921' : '#475569',
//   minWidth: '44px',
//   textAlign: 'center',
//   transition: 'all 0.2s ease',
//   '&:hover': {
//     borderColor: '#ef7921',
//     backgroundColor: 'rgba(239, 121, 33, 0.05)',
//   },
// }));

// const QuantitySection = styled('div')({
//   display: 'flex',
//   alignItems: 'center',
//   gap: '1rem',
//   marginBottom: '1.25rem',
//   flexWrap: 'wrap',
// });

// const QuantityControl = styled('div')({
//   display: 'flex',
//   alignItems: 'center',
//   border: '2px solid #e2e8f0',
//   borderRadius: '8px',
//   overflow: 'hidden',
//   backgroundColor: '#ffffff',
//   boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
// });

// const QuantityButton = styled('button')({
//   width: '40px',
//   height: '40px',
//   border: 'none',
//   background: '#f8fafc',
//   cursor: 'pointer',
//   display: 'flex',
//   alignItems: 'center',
//   justifyContent: 'center',
//   fontSize: '1.1rem',
//   fontWeight: '500',
//   color: '#475569',
//   transition: 'all 0.2s ease',
//   '&:hover': {
//     backgroundColor: '#f1f5f9',
//     color: '#ef7921',
//   },
//   '&:disabled': {
//     backgroundColor: '#f8fafc',
//     color: '#cbd5e1',
//     cursor: 'not-allowed',
//   },
// });

// const QuantityDisplay = styled('span')({
//   width: '50px',
//   textAlign: 'center',
//   fontWeight: '600',
//   fontSize: '0.95rem',
//   color: '#1e293b',
// });

// const ActionButtons = styled('div')({
//   display: 'flex',
//   gap: '1rem',
//   flexWrap: 'wrap',
//   '@media (max-width: 768px)': {
//     flexDirection: 'column',
//   },
// });

// const PrimaryButton = styled(Button)({
//   backgroundColor: '#ef7921',
//   color: 'white',
//   padding: '0.875rem 2rem',
//   fontWeight: '600',
//   fontSize: '0.95rem',
//   borderRadius: '8px',
//   textTransform: 'none',
//   flex: '1',
//   minWidth: '180px',
//   boxShadow: '0 2px 8px rgba(239, 121, 33, 0.3)',
//   '&:hover': {
//     backgroundColor: '#e06b15',
//     boxShadow: '0 4px 12px rgba(239, 121, 33, 0.4)',
//     transform: 'translateY(-1px)',
//   },
//   '&:disabled': {
//     backgroundColor: '#fbbf77',
//     boxShadow: 'none',
//     transform: 'none',
//   },
//   '&:active': {
//     transform: 'translateY(0)',
//   },
// });

// const SecondaryButton = styled(Button)({
//   border: '1px solid #d1d5db',
//   color: '#374151',
//   padding: '0.75rem 1.25rem',
//   fontWeight: '500',
//   fontSize: '0.85rem',
//   borderRadius: '8px',
//   textTransform: 'none',
//   flex: '1',
//   minWidth: '120px',
//   backgroundColor: '#ffffff',
//   transition: 'all 0.2s ease',
//   '&:hover': {
//     borderColor: '#ef7921',
//     color: '#ef7921',
//     backgroundColor: 'rgba(239, 121, 33, 0.04)',
//     transform: 'translateY(-1px)',
//   },
// });

// const PricingTier = styled('div')({
//   display: 'flex',
//   alignItems: 'center',
//   gap: '0.75rem',
//   padding: '0.875rem',
//   borderRadius: '8px',
//   backgroundColor: '#fffbeb',
//   fontSize: '0.85rem',
//   color: '#92400e',
//   border: '1px solid #fcd34d',
//   marginBottom: '1rem',
// });

// const MOQIndicator = styled('div')({
//   fontSize: '0.85rem',
//   color: '#475569',
//   padding: '0.875rem',
//   backgroundColor: '#f8fafc',
//   borderRadius: '8px',
//   border: '1px solid #e2e8f0',
//   marginBottom: '1rem',
//   fontWeight: '500',
// });

// const TotalPriceDisplay = styled('div')({
//   display: 'flex',
//   alignItems: 'center',
//   gap: '0.75rem',
//   padding: '1rem',
//   backgroundColor: '#f0fdf4',
//   borderRadius: '8px',
//   marginBottom: '1.5rem',
//   border: '1px solid #bbf7d0',
//   fontSize: '0.95rem',
// });

// const ProductDetails = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [product, setProduct] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [selectedColor, setSelectedColor] = useState('');
//   const [selectedSize, setSelectedSize] = useState('');
//   const [quantity, setQuantity] = useState(1);
//   const [activeImage, setActiveImage] = useState('');
//   const [addingToCart, setAddingToCart] = useState(false);
//   const [buyingNow, setBuyingNow] = useState(false);

//   const { currentUser } = useAuth();
//   const context = useContext(MyContext);

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
//         // Set default selections
//         if (response.data.specifications?.color) {
//           setSelectedColor(response.data.specifications.color);
//         }
//         if (response.data.size) {
//           setSelectedSize(response.data.size);
//         }
//       }
//     } catch (error) {
//       console.error('Error fetching product:', error);
//       toast.error('Failed to load product details');
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

//   const handleAddToCart = async () => {
//     if (!currentUser) {
//       toast.error('Please login to add items to cart');
//       navigate('/login');
//       return;
//     }

//     if (!product?._id) {
//       toast.error('Product information is incomplete');
//       return;
//     }

//     if (product.stock === 0) {
//       toast.error('This product is out of stock');
//       return;
//     }

//     if (quantity > product.stock) {
//       toast.error(`Only ${product.stock} items available in stock`);
//       return;
//     }

//     try {
//       setAddingToCart(true);
//       await cartApi.addToCart(product._id, quantity);
//       toast.success('Product added to cart successfully!');
      
//       // Refresh cart count in header
//       if (context.refreshCartCount) {
//         context.refreshCartCount();
//       }
      
//       // Open cart panel
//       if (context.setOpenCartPanel) {
//         context.setOpenCartPanel(true);
//       }
//     } catch (error) {
//       console.error('Error adding to cart:', error);
//       toast.error(error.response?.data?.message || error.message || 'Failed to add product to cart');
//     } finally {
//       setAddingToCart(false);
//     }
//   };

//   const handleBuyNow = async () => {
//     if (!currentUser) {
//       toast.error('Please login to proceed with purchase');
//       navigate('/login');
//       return;
//     }

//     if (!product?._id) {
//       toast.error('Product information is incomplete');
//       return;
//     }

//     if (product.stock === 0) {
//       toast.error('This product is out of stock');
//       return;
//     }

//     if (quantity > product.stock) {
//       toast.error(`Only ${product.stock} items available in stock`);
//       return;
//     }

//     try {
//       setBuyingNow(true);
//       await cartApi.addToCart(product._id, quantity);
      
//       // Refresh cart count in header
//       if (context.refreshCartCount) {
//         context.refreshCartCount();
//       }
      
//       // Navigate to checkout
//       navigate('/checkout');
//     } catch (error) {
//       console.error('Error adding to cart for checkout:', error);
//       toast.error(error.response?.data?.message || error.message || 'Failed to proceed with purchase');
//     } finally {
//       setBuyingNow(false);
//     }
//   };

//   const handleWishlist = () => {
//     if (!currentUser) {
//       toast.error('Please login to add items to wishlist');
//       navigate('/login');
//       return;
//     }
//     toast.info('Wishlist functionality coming soon!');
//   };

//   const handleCompare = () => {
//     toast.info('Compare functionality coming soon!');
//   };

//   if (loading) {
//     return (
//       <div style={{ 
//         display: 'flex', 
//         justifyContent: 'center', 
//         alignItems: 'center', 
//         minHeight: '400px',
//         fontSize: '1rem',
//         color: '#64748b',
//         fontWeight: '500'
//       }}>
//         Loading product details...
//       </div>
//     );
//   }

//   if (!product) {
//     return (
//       <div style={{ 
//         display: 'flex', 
//         justifyContent: 'center', 
//         alignItems: 'center', 
//         minHeight: '400px',
//         fontSize: '1rem',
//         color: '#64748b',
//         fontWeight: '500'
//       }}>
//         Product not found
//       </div>
//     );
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
//     stock = 0,
//     brand,
//     category,
//     specifications = {},
//     size: productSize
//   } = product;

//   const isWholesale = wholesaleEnabled && quantity >= moq;
//   const currentPrice = isWholesale ? wholesalePrice : price;
//   const totalPrice = quantity * currentPrice;
//   const discountPercentage = oldPrice && oldPrice > price 
//     ? Math.round(((oldPrice - price) / oldPrice) * 100)
//     : 0;

//   // Available colors from specifications
//   const availableColors = specifications.color ? [specifications.color] : ['#e53935', '#1e88e5', '#43a047'];
//   // Available sizes
//   const availableSizes = productSize ? [productSize] : ['S', 'M', 'L', 'XL'];

//   return (
//     <>
//       <section style={{ backgroundColor: '#f8fafc', minHeight: '100vh', padding: '1rem 0' }}>
//         {/* Breadcrumb */}
//         <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1.5rem 1rem' }}>
//           <Breadcrumbs aria-label="breadcrumb" style={{ marginBottom: '1rem' }}>
//             <Link 
//               underline="hover" 
//               color="inherit" 
//               href="/"
//               style={{ fontSize: '0.85rem', textDecoration: 'none', color: '#64748b', fontWeight: '500' }}
//             >
//               Home
//             </Link>
//             <Link
//               underline="hover"
//               color="inherit"
//               href="/products"
//               style={{ fontSize: '0.85rem', textDecoration: 'none', color: '#64748b', fontWeight: '500' }}
//             >
//               Products
//             </Link>
//             {category && (
//               <Link
//                 underline="hover"
//                 color="inherit"
//                 href={`/products?category=${category._id}`}
//                 style={{ fontSize: '0.85rem', textDecoration: 'none', color: '#64748b', fontWeight: '500' }}
//               >
//                 {category.name}
//               </Link>
//             )}
//             <span style={{ fontSize: '0.85rem', color: '#ef7921', fontWeight: '600' }}>
//               {name}
//             </span>
//           </Breadcrumbs>
//         </div>

//         <ProductContainer>
//           {/* Product Images */}
//           <ImageSection>
//             <MainImage>
//               <img 
//                 src={activeImage} 
//                 alt={name}
//                 onError={(e) => {
//                   e.target.src = '/src/assets/images/grocery.jpg';
//                 }}
//               />
//             </MainImage>
            
//             <ThumbnailContainer>
//               {images.map((image, index) => (
//                 <Thumbnail
//                   key={image._id || index}
//                   active={activeImage === image.url}
//                   onClick={() => handleThumbnailClick(image.url)}
//                 >
//                   <img 
//                     src={image.url} 
//                     alt={`${name} ${index + 1}`}
//                     onError={(e) => {
//                       e.target.src = '/src/assets/images/grocery.jpg';
//                     }}
//                   />
//                 </Thumbnail>
//               ))}
//             </ThumbnailContainer>
//           </ImageSection>

//           {/* Product Info */}
//           <InfoSection>
//             <div>
//               <ProductTitle>{name}</ProductTitle>
              
//               <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
//                 <Rating value={rating} precision={0.1} readOnly size="small" />
//                 <span style={{ fontSize: '0.85rem', color: '#64748b', fontWeight: '500' }}>
//                   ({rating} rating{rating !== 1 ? 's' : ''})
//                 </span>
//                 {brand && (
//                   <span style={{ fontSize: '0.85rem', color: '#64748b', fontWeight: '500' }}>
//                     Brand: <strong style={{ color: '#374151' }}>{brand}</strong>
//                   </span>
//                 )}
//               </div>

//               <PriceContainer>
//                 {oldPrice && oldPrice > price && (
//                   <OriginalPrice>${oldPrice}</OriginalPrice>
//                 )}
//                 <DiscountedPrice>${currentPrice}</DiscountedPrice>
//                 {discountPercentage > 0 && (
//                   <DiscountBadge>-{discountPercentage}%</DiscountBadge>
//                 )}
//                 {isWholesale && (
//                   <TierBadge type="wholesale">
//                     <BusinessIcon fontSize="small" /> Wholesale
//                   </TierBadge>
//                 )}
//               </PriceContainer>

//               {stock > 0 ? (
//                 <StockInfo>
//                   <span style={{ fontWeight: '600' }}>In Stock:</span>
//                   <span>{stock} items available</span>
//                 </StockInfo>
//               ) : (
//                 <OutOfStockInfo>
//                   <span style={{ fontWeight: '600' }}>Out of Stock</span>
//                 </OutOfStockInfo>
//               )}
//             </div>

//             <Description>{description}</Description>

//             <ShippingInfo>
//               <LocalShippingIcon fontSize="small" />
//               <div>
//                 <div style={{ fontWeight: '600' }}>Free Shipping</div>
//                 <div>Delivery in 2-3 business days</div>
//               </div>
//             </ShippingInfo>

//             {/* Color Selection */}
//             {availableColors.length > 0 && (
//               <OptionGroup>
//                 <OptionTitle>Color</OptionTitle>
//                 <ColorOptions>
//                   {availableColors.map((color, index) => (
//                     <ColorOption
//                       key={index}
//                       color={color}
//                       selected={selectedColor === color}
//                       onClick={() => setSelectedColor(color)}
//                       title={color}
//                     />
//                   ))}
//                 </ColorOptions>
//               </OptionGroup>
//             )}

//             {/* Size Selection */}
//             {availableSizes.length > 0 && (
//               <OptionGroup>
//                 <OptionTitle>Size</OptionTitle>
//                 <SizeOptions>
//                   {availableSizes.map((size, index) => (
//                     <SizeOption
//                       key={index}
//                       selected={selectedSize === size}
//                       onClick={() => setSelectedSize(size)}
//                     >
//                       {size}
//                     </SizeOption>
//                   ))}
//                 </SizeOptions>
//               </OptionGroup>
//             )}

//             {/* Wholesale Pricing Info */}
//             {wholesaleEnabled && (
//               <PricingTier>
//                 <StorefrontIcon fontSize="small" />
//                 <div>
//                   <div style={{ fontWeight: '600' }}>Wholesale Pricing Available</div>
//                   <div>Buy {moq}+ units for ${wholesalePrice} each (Save ${(price - wholesalePrice).toFixed(2)} per unit)</div>
//                 </div>
//               </PricingTier>
//             )}

//             {/* Quantity Section */}
//             <OptionGroup>
//               <OptionTitle>Quantity</OptionTitle>
//               {wholesaleEnabled && (
//                 <MOQIndicator>
//                   {isWholesale 
//                     ? `✓ Wholesale order (MOQ: ${moq}+ units) - You save $${((price - wholesalePrice) * quantity).toFixed(2)}`
//                     : `Retail order - Add ${Math.max(0, moq - quantity)} more for wholesale pricing`
//                   }
//                 </MOQIndicator>
//               )}
              
//               <QuantitySection>
//                 <QuantityControl>
//                   <QuantityButton 
//                     onClick={handleDecrement}
//                     disabled={quantity <= 1}
//                   >
//                     -
//                   </QuantityButton>
//                   <QuantityDisplay>{quantity}</QuantityDisplay>
//                   <QuantityButton 
//                     onClick={handleIncrement}
//                     disabled={quantity >= stock}
//                   >
//                     +
//                   </QuantityButton>
//                 </QuantityControl>

//                 <TotalPriceDisplay>
//                   <span style={{ fontWeight: '600', color: '#064e3b' }}>Total:</span>
//                   <span style={{ fontSize: '1.1rem', fontWeight: '700', color: '#059669' }}>
//                     ${totalPrice.toFixed(2)}
//                   </span>
//                 </TotalPriceDisplay>
//               </QuantitySection>
//             </OptionGroup>

//             {/* Action Buttons */}
//             <ActionButtons>
//               <PrimaryButton
//                 onClick={handleAddToCart}
//                 disabled={addingToCart || stock === 0}
//                 startIcon={addingToCart ? null : undefined}
//               >
//                 {addingToCart ? 'Adding...' : stock === 0 ? 'Out of Stock' : 'Add to Cart'}
//               </PrimaryButton>
              
//               <PrimaryButton
//                 onClick={handleBuyNow}
//                 disabled={buyingNow || stock === 0}
//                 variant="outlined"
//                 style={{ 
//                   backgroundColor: 'transparent', 
//                   border: '2px solid #ef7921',
//                   color: '#ef7921'
//                 }}
//               >
//                 {buyingNow ? 'Processing...' : 'Buy Now'}
//               </PrimaryButton>
//             </ActionButtons>

//             <ActionButtons>
//               <SecondaryButton
//                 startIcon={<FavoriteBorderIcon />}
//                 onClick={handleWishlist}
//               >
//                 Add to Wishlist
//               </SecondaryButton>
              
//               <SecondaryButton
//                 startIcon={<CompareArrowsIcon />}
//                 onClick={handleCompare}
//               >
//                 Compare
//               </SecondaryButton>
//             </ActionButtons>
//           </InfoSection>
//         </ProductContainer>

//         {/* Additional Sections */}
//         <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem 1.5rem' }}>
//           {/* Reviews Section */}
//           <ReviewAndRatingComponent 
//             productId={id}
//             productName={name}
//           />

//           {/* Related Products Section */}
//           <RelatedProductsComponent 
//             categoryId={category?._id}
//             currentProductId={id}
//           />
//         </div>
//       </section>
//     </>
//   );
// };

// export default ProductDetails; 






































































// // import React, { useState, useEffect } from 'react';
// // import { useParams } from 'react-router-dom';
// // import Breadcrumbs from '@mui/material/Breadcrumbs';
// // import Link from '@mui/material/Link';
// // import Button from '@mui/material/Button';
// // import Rating from '@mui/material/Rating';
// // import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
// // import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
// // import LocalShippingIcon from '@mui/icons-material/LocalShipping';
// // import BusinessIcon from '@mui/icons-material/Business';
// // import StorefrontIcon from '@mui/icons-material/Storefront';
// // import { styled } from '@mui/material/styles';
// // import { productApi } from '../../utils/productApi';
// // import { toast } from 'react-toastify';

// // // Import components
// // import ReviewAndRatingComponent from '../../components/ReviewAndRatingComponent';
// // import RelatedProductsComponent from '../../components/RelatedProductsComponent';

// // // Styled components with improved proportions and spacing
// // const ProductContainer = styled('div')({
// //   display: 'flex',
// //   gap: '2.5rem',
// //   maxWidth: '1200px',
// //   margin: '0 auto',
// //   padding: '1.5rem',
// //   backgroundColor: '#ffffff',
// //   borderRadius: '12px',
// //   boxShadow: '0 2px 20px rgba(0, 0, 0, 0.08)',
// //   '@media (max-width: 768px)': {
// //     flexDirection: 'column',
// //     gap: '2rem',
// //     padding: '1rem',
// //   },
// // });

// // const ImageSection = styled('div')({
// //   flex: '0 0 48%',
// //   display: 'flex',
// //   flexDirection: 'column',
// //   gap: '1rem',
// //   '@media (max-width: 768px)': {
// //     flex: '1',
// //   },
// // });

// // const MainImage = styled('div')({
// //   border: '1px solid #f1f5f9',
// //   borderRadius: '12px',
// //   overflow: 'hidden',
// //   height: '400px',
// //   position: 'relative',
// //   backgroundColor: '#fafafa',
// //   '& img': {
// //     width: '100%',
// //     height: '100%',
// //     objectFit: 'contain',
// //     padding: '1rem',
// //     transition: 'transform 0.3s ease',
// //   },
// //   '&:hover img': {
// //     transform: 'scale(1.02)',
// //   },
// // });

// // const ThumbnailContainer = styled('div')({
// //   display: 'flex',
// //   gap: '0.75rem',
// //   justifyContent: 'center',
// //   flexWrap: 'wrap',
// // });

// // const Thumbnail = styled('div')(({ active }) => ({
// //   width: '70px',
// //   height: '70px',
// //   border: active ? '2px solid #ef7921' : '1px solid #e2e8f0',
// //   borderRadius: '8px',
// //   overflow: 'hidden',
// //   cursor: 'pointer',
// //   transition: 'all 0.2s ease',
// //   backgroundColor: '#f8fafc',
// //   '&:hover': {
// //     borderColor: '#ef7921',
// //     transform: 'scale(1.05)',
// //   },
// //   '& img': {
// //     width: '100%',
// //     height: '100%',
// //     objectFit: 'cover',
// //   },
// // }));

// // const InfoSection = styled('div')({
// //   flex: '1',
// //   display: 'flex',
// //   flexDirection: 'column',
// //   gap: '1.25rem',
// //   padding: '0.5rem 0',
// // });

// // const ProductTitle = styled('h1')({
// //   fontSize: '1.75rem',
// //   fontWeight: '700',
// //   margin: '0 0 0.5rem 0',
// //   color: '#1e293b',
// //   lineHeight: '1.3',
// //   letterSpacing: '-0.025em',
// //   '@media (max-width: 768px)': {
// //     fontSize: '1.5rem',
// //   },
// // });

// // const PriceContainer = styled('div')({
// //   display: 'flex',
// //   alignItems: 'center',
// //   gap: '1rem',
// //   flexWrap: 'wrap',
// //   marginBottom: '0.5rem',
// // });

// // const OriginalPrice = styled('span')({
// //   textDecoration: 'line-through',
// //   color: '#64748b',
// //   fontSize: '1.1rem',
// //   fontWeight: '500',
// // });

// // const DiscountedPrice = styled('span')({
// //   fontSize: '1.75rem',
// //   fontWeight: '700',
// //   color: '#ef7921',
// //   letterSpacing: '-0.025em',
// // });

// // const DiscountBadge = styled('span')({
// //   backgroundColor: '#ef7921',
// //   color: 'white',
// //   padding: '0.25rem 0.75rem',
// //   borderRadius: '12px',
// //   fontSize: '0.8rem',
// //   fontWeight: '600',
// //   letterSpacing: '0.025em',
// // });

// // const TierBadge = styled('span')(({ type }) => ({
// //   padding: '0.375rem 0.75rem',
// //   borderRadius: '6px',
// //   fontSize: '0.75rem',
// //   fontWeight: '700',
// //   backgroundColor: type === 'wholesale' ? '#10b981' : '#6b7280',
// //   color: 'white',
// //   display: 'flex',
// //   alignItems: 'center',
// //   gap: '0.25rem',
// //   letterSpacing: '0.025em',
// // }));

// // const StockInfo = styled('div')({
// //   display: 'flex',
// //   alignItems: 'center',
// //   gap: '0.5rem',
// //   padding: '0.75rem',
// //   backgroundColor: '#f0fdf4',
// //   border: '1px solid #bbf7d0',
// //   borderRadius: '8px',
// //   color: '#166534',
// //   fontSize: '0.85rem',
// //   fontWeight: '500',
// // });

// // const Description = styled('p')({
// //   color: '#475569',
// //   lineHeight: '1.6',
// //   fontSize: '0.95rem',
// //   margin: '0',
// //   fontWeight: '400',
// // });

// // const ShippingInfo = styled('div')({
// //   display: 'flex',
// //   alignItems: 'center',
// //   gap: '0.75rem',
// //   padding: '0.875rem',
// //   backgroundColor: '#f8fafc',
// //   border: '1px solid #e2e8f0',
// //   borderRadius: '8px',
// //   fontSize: '0.85rem',
// //   color: '#475569',
// //   fontWeight: '500',
// // });

// // const OptionGroup = styled('div')({
// //   marginBottom: '1.25rem',
// // });

// // const OptionTitle = styled('h3')({
// //   fontSize: '0.95rem',
// //   fontWeight: '600',
// //   margin: '0 0 0.75rem 0',
// //   color: '#334155',
// //   textTransform: 'uppercase',
// //   letterSpacing: '0.05em',
// // });

// // const ColorOptions = styled('div')({
// //   display: 'flex',
// //   gap: '0.75rem',
// //   flexWrap: 'wrap',
// // });

// // const ColorOption = styled('div')(({ selected, color }) => ({
// //   width: '36px',
// //   height: '36px',
// //   borderRadius: '50%',
// //   backgroundColor: color,
// //   border: selected ? '3px solid #ef7921' : '2px solid #e2e8f0',
// //   cursor: 'pointer',
// //   transition: 'all 0.2s ease',
// //   boxShadow: selected ? '0 2px 8px rgba(239, 121, 33, 0.3)' : 'none',
// //   '&:hover': {
// //     transform: 'scale(1.1)',
// //   },
// // }));

// // const SizeOptions = styled('div')({
// //   display: 'flex',
// //   gap: '0.75rem',
// //   flexWrap: 'wrap',
// // });

// // const SizeOption = styled('div')(({ selected }) => ({
// //   padding: '0.625rem 1rem',
// //   border: selected ? '2px solid #ef7921' : '1px solid #cbd5e1',
// //   borderRadius: '6px',
// //   cursor: 'pointer',
// //   fontWeight: '600',
// //   fontSize: '0.85rem',
// //   backgroundColor: selected ? 'rgba(239, 121, 33, 0.1)' : '#ffffff',
// //   color: selected ? '#ef7921' : '#475569',
// //   minWidth: '44px',
// //   textAlign: 'center',
// //   transition: 'all 0.2s ease',
// //   '&:hover': {
// //     borderColor: '#ef7921',
// //     backgroundColor: 'rgba(239, 121, 33, 0.05)',
// //   },
// // }));

// // const QuantitySection = styled('div')({
// //   display: 'flex',
// //   alignItems: 'center',
// //   gap: '1rem',
// //   marginBottom: '1.25rem',
// //   flexWrap: 'wrap',
// // });

// // const QuantityControl = styled('div')({
// //   display: 'flex',
// //   alignItems: 'center',
// //   border: '2px solid #e2e8f0',
// //   borderRadius: '8px',
// //   overflow: 'hidden',
// //   backgroundColor: '#ffffff',
// //   boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
// // });

// // const QuantityButton = styled('button')({
// //   width: '40px',
// //   height: '40px',
// //   border: 'none',
// //   background: '#f8fafc',
// //   cursor: 'pointer',
// //   display: 'flex',
// //   alignItems: 'center',
// //   justifyContent: 'center',
// //   fontSize: '1.1rem',
// //   fontWeight: '500',
// //   color: '#475569',
// //   transition: 'all 0.2s ease',
// //   '&:hover': {
// //     backgroundColor: '#f1f5f9',
// //     color: '#ef7921',
// //   },
// //   '&:disabled': {
// //     backgroundColor: '#f8fafc',
// //     color: '#cbd5e1',
// //     cursor: 'not-allowed',
// //   },
// // });

// // const QuantityDisplay = styled('span')({
// //   width: '50px',
// //   textAlign: 'center',
// //   fontWeight: '600',
// //   fontSize: '0.95rem',
// //   color: '#1e293b',
// // });

// // const ActionButtons = styled('div')({
// //   display: 'flex',
// //   gap: '1rem',
// //   flexWrap: 'wrap',
// //   '@media (max-width: 768px)': {
// //     flexDirection: 'column',
// //   },
// // });

// // const PrimaryButton = styled(Button)({
// //   backgroundColor: '#ef7921',
// //   color: 'white',
// //   padding: '0.875rem 2rem',
// //   fontWeight: '600',
// //   fontSize: '0.95rem',
// //   borderRadius: '8px',
// //   textTransform: 'none',
// //   flex: '1',
// //   minWidth: '180px',
// //   boxShadow: '0 2px 8px rgba(239, 121, 33, 0.3)',
// //   '&:hover': {
// //     backgroundColor: '#e06b15',
// //     boxShadow: '0 4px 12px rgba(239, 121, 33, 0.4)',
// //     transform: 'translateY(-1px)',
// //   },
// //   '&:disabled': {
// //     backgroundColor: '#fbbf77',
// //     boxShadow: 'none',
// //     transform: 'none',
// //   },
// //   '&:active': {
// //     transform: 'translateY(0)',
// //   },
// // });

// // const SecondaryButton = styled(Button)({
// //   border: '1px solid #d1d5db',
// //   color: '#374151',
// //   padding: '0.75rem 1.25rem',
// //   fontWeight: '500',
// //   fontSize: '0.85rem',
// //   borderRadius: '8px',
// //   textTransform: 'none',
// //   flex: '1',
// //   minWidth: '120px',
// //   backgroundColor: '#ffffff',
// //   transition: 'all 0.2s ease',
// //   '&:hover': {
// //     borderColor: '#ef7921',
// //     color: '#ef7921',
// //     backgroundColor: 'rgba(239, 121, 33, 0.04)',
// //     transform: 'translateY(-1px)',
// //   },
// // });

// // const PricingTier = styled('div')({
// //   display: 'flex',
// //   alignItems: 'center',
// //   gap: '0.75rem',
// //   padding: '0.875rem',
// //   borderRadius: '8px',
// //   backgroundColor: '#fffbeb',
// //   fontSize: '0.85rem',
// //   color: '#92400e',
// //   border: '1px solid #fcd34d',
// //   marginBottom: '1rem',
// // });

// // const MOQIndicator = styled('div')({
// //   fontSize: '0.85rem',
// //   color: '#475569',
// //   padding: '0.875rem',
// //   backgroundColor: '#f8fafc',
// //   borderRadius: '8px',
// //   border: '1px solid #e2e8f0',
// //   marginBottom: '1rem',
// //   fontWeight: '500',
// // });

// // const TotalPriceDisplay = styled('div')({
// //   display: 'flex',
// //   alignItems: 'center',
// //   gap: '0.75rem',
// //   padding: '1rem',
// //   backgroundColor: '#f0fdf4',
// //   borderRadius: '8px',
// //   marginBottom: '1.5rem',
// //   border: '1px solid #bbf7d0',
// //   fontSize: '0.95rem',
// // });

// // const ProductDetails = () => {
// //   const { id } = useParams();
// //   const [product, setProduct] = useState(null);
// //   const [loading, setLoading] = useState(true);
// //   const [selectedColor, setSelectedColor] = useState('');
// //   const [selectedSize, setSelectedSize] = useState('');
// //   const [quantity, setQuantity] = useState(1);
// //   const [activeImage, setActiveImage] = useState('');
// //   const [addingToCart, setAddingToCart] = useState(false);

// //   useEffect(() => {
// //     fetchProduct();
// //   }, [id]);

// //   const fetchProduct = async () => {
// //     try {
// //       setLoading(true);
// //       const response = await productApi.getProduct(id);
// //       if (response.success) {
// //         setProduct(response.data);
// //         if (response.data.images && response.data.images.length > 0) {
// //           setActiveImage(response.data.images[0].url);
// //         }
// //         // Set default selections
// //         if (response.data.specifications?.color) {
// //           setSelectedColor(response.data.specifications.color);
// //         }
// //         if (response.data.size) {
// //           setSelectedSize(response.data.size);
// //         }
// //       }
// //     } catch (error) {
// //       console.error('Error fetching product:', error);
// //       toast.error('Failed to load product details');
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const handleThumbnailClick = (imageUrl) => {
// //     setActiveImage(imageUrl);
// //   };

// //   const handleDecrement = () => {
// //     setQuantity((q) => Math.max(1, q - 1));
// //   };

// //   const handleIncrement = () => {
// //     setQuantity((q) => q + 1);
// //   };

// //   const handleAddToCart = async () => {
// //     try {
// //       setAddingToCart(true);
// //       // Add to cart logic here
// //       await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
// //       toast.success('Product added to cart successfully!');
// //     } catch (error) {
// //       toast.error('Failed to add product to cart');
// //     } finally {
// //       setAddingToCart(false);
// //     }
// //   };

// //   const handleBuyNow = async () => {
// //     await handleAddToCart();
// //     // Navigate to checkout
// //   };

// //   if (loading) {
// //     return (
// //       <div style={{ 
// //         display: 'flex', 
// //         justifyContent: 'center', 
// //         alignItems: 'center', 
// //         minHeight: '400px',
// //         fontSize: '1rem',
// //         color: '#64748b',
// //         fontWeight: '500'
// //       }}>
// //         Loading product details...
// //       </div>
// //     );
// //   }

// //   if (!product) {
// //     return (
// //       <div style={{ 
// //         display: 'flex', 
// //         justifyContent: 'center', 
// //         alignItems: 'center', 
// //         minHeight: '400px',
// //         fontSize: '1rem',
// //         color: '#64748b',
// //         fontWeight: '500'
// //       }}>
// //         Product not found
// //       </div>
// //     );
// //   }

// //   const {
// //     name,
// //     description,
// //     price,
// //     oldPrice,
// //     wholesalePrice,
// //     moq = 1,
// //     wholesaleEnabled,
// //     images = [],
// //     rating = 0,
// //     stock = 0,
// //     brand,
// //     category,
// //     specifications = {},
// //     size: productSize
// //   } = product;

// //   const isWholesale = wholesaleEnabled && quantity >= moq;
// //   const currentPrice = isWholesale ? wholesalePrice : price;
// //   const totalPrice = quantity * currentPrice;
// //   const discountPercentage = oldPrice && oldPrice > price 
// //     ? Math.round(((oldPrice - price) / oldPrice) * 100)
// //     : 0;

// //   // Available colors from specifications
// //   const availableColors = specifications.color ? [specifications.color] : ['#e53935', '#1e88e5', '#43a047'];
// //   // Available sizes
// //   const availableSizes = productSize ? [productSize] : ['S', 'M', 'L', 'XL'];

// //   return (
// //     <>
// //       <section style={{ backgroundColor: '#f8fafc', minHeight: '100vh', padding: '1rem 0' }}>
// //         {/* Breadcrumb */}
// //         <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1.5rem 1rem' }}>
// //           <Breadcrumbs aria-label="breadcrumb" style={{ marginBottom: '1rem' }}>
// //             <Link 
// //               underline="hover" 
// //               color="inherit" 
// //               href="/"
// //               style={{ fontSize: '0.85rem', textDecoration: 'none', color: '#64748b', fontWeight: '500' }}
// //             >
// //               Home
// //             </Link>
// //             <Link
// //               underline="hover"
// //               color="inherit"
// //               href="/products"
// //               style={{ fontSize: '0.85rem', textDecoration: 'none', color: '#64748b', fontWeight: '500' }}
// //             >
// //               Products
// //             </Link>
// //             {category && (
// //               <Link
// //                 underline="hover"
// //                 color="inherit"
// //                 href={`/products?category=${category._id}`}
// //                 style={{ fontSize: '0.85rem', textDecoration: 'none', color: '#64748b', fontWeight: '500' }}
// //               >
// //                 {category.name}
// //               </Link>
// //             )}
// //             <span style={{ fontSize: '0.85rem', color: '#ef7921', fontWeight: '600' }}>
// //               {name}
// //             </span>
// //           </Breadcrumbs>
// //         </div>

// //         <ProductContainer>
// //           {/* Product Images */}
// //           <ImageSection>
// //             <MainImage>
// //               <img 
// //                 src={activeImage} 
// //                 alt={name}
// //                 onError={(e) => {
// //                   e.target.src = '/src/assets/images/grocery.jpg';
// //                 }}
// //               />
// //             </MainImage>
            
// //             <ThumbnailContainer>
// //               {images.map((image, index) => (
// //                 <Thumbnail
// //                   key={image._id || index}
// //                   active={activeImage === image.url}
// //                   onClick={() => handleThumbnailClick(image.url)}
// //                 >
// //                   <img 
// //                     src={image.url} 
// //                     alt={`${name} ${index + 1}`}
// //                     onError={(e) => {
// //                       e.target.src = '/src/assets/images/grocery.jpg';
// //                     }}
// //                   />
// //                 </Thumbnail>
// //               ))}
// //             </ThumbnailContainer>
// //           </ImageSection>

// //           {/* Product Info */}
// //           <InfoSection>
// //             <div>
// //               <ProductTitle>{name}</ProductTitle>
              
// //               <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
// //                 <Rating value={rating} precision={0.1} readOnly size="small" />
// //                 <span style={{ fontSize: '0.85rem', color: '#64748b', fontWeight: '500' }}>
// //                   ({rating} rating{rating !== 1 ? 's' : ''})
// //                 </span>
// //                 {brand && (
// //                   <span style={{ fontSize: '0.85rem', color: '#64748b', fontWeight: '500' }}>
// //                     Brand: <strong style={{ color: '#374151' }}>{brand}</strong>
// //                   </span>
// //                 )}
// //               </div>

// //               <PriceContainer>
// //                 {oldPrice && oldPrice > price && (
// //                   <OriginalPrice>${oldPrice}</OriginalPrice>
// //                 )}
// //                 <DiscountedPrice>${currentPrice}</DiscountedPrice>
// //                 {discountPercentage > 0 && (
// //                   <DiscountBadge>-{discountPercentage}%</DiscountBadge>
// //                 )}
// //                 {isWholesale && (
// //                   <TierBadge type="wholesale">
// //                     <BusinessIcon fontSize="small" /> Wholesale
// //                   </TierBadge>
// //                 )}
// //               </PriceContainer>

// //               <StockInfo>
// //                 <span style={{ fontWeight: '600' }}>In Stock:</span>
// //                 <span>{stock} items available</span>
// //               </StockInfo>
// //             </div>

// //             <Description>{description}</Description>

// //             <ShippingInfo>
// //               <LocalShippingIcon fontSize="small" />
// //               <div>
// //                 <div style={{ fontWeight: '600' }}>Free Shipping</div>
// //                 <div>Delivery in 2-3 business days</div>
// //               </div>
// //             </ShippingInfo>

// //             {/* Color Selection */}
// //             {availableColors.length > 0 && (
// //               <OptionGroup>
// //                 <OptionTitle>Color</OptionTitle>
// //                 <ColorOptions>
// //                   {availableColors.map((color, index) => (
// //                     <ColorOption
// //                       key={index}
// //                       color={color}
// //                       selected={selectedColor === color}
// //                       onClick={() => setSelectedColor(color)}
// //                       title={color}
// //                     />
// //                   ))}
// //                 </ColorOptions>
// //               </OptionGroup>
// //             )}

// //             {/* Size Selection */}
// //             {availableSizes.length > 0 && (
// //               <OptionGroup>
// //                 <OptionTitle>Size</OptionTitle>
// //                 <SizeOptions>
// //                   {availableSizes.map((size, index) => (
// //                     <SizeOption
// //                       key={index}
// //                       selected={selectedSize === size}
// //                       onClick={() => setSelectedSize(size)}
// //                     >
// //                       {size}
// //                     </SizeOption>
// //                   ))}
// //                 </SizeOptions>
// //               </OptionGroup>
// //             )}

// //             {/* Wholesale Pricing Info */}
// //             {wholesaleEnabled && (
// //               <PricingTier>
// //                 <StorefrontIcon fontSize="small" />
// //                 <div>
// //                   <div style={{ fontWeight: '600' }}>Wholesale Pricing Available</div>
// //                   <div>Buy {moq}+ units for ${wholesalePrice} each (Save ${(price - wholesalePrice).toFixed(2)} per unit)</div>
// //                 </div>
// //               </PricingTier>
// //             )}

// //             {/* Quantity Section */}
// //             <OptionGroup>
// //               <OptionTitle>Quantity</OptionTitle>
// //               <MOQIndicator>
// //                 {isWholesale 
// //                   ? `✓ Wholesale order (MOQ: ${moq}+ units) - You save $${((price - wholesalePrice) * quantity).toFixed(2)}`
// //                   : `Retail order - Add ${Math.max(0, moq - quantity)} more for wholesale pricing`
// //                 }
// //               </MOQIndicator>
              
// //               <QuantitySection>
// //                 <QuantityControl>
// //                   <QuantityButton 
// //                     onClick={handleDecrement}
// //                     disabled={quantity <= 1}
// //                   >
// //                     -
// //                   </QuantityButton>
// //                   <QuantityDisplay>{quantity}</QuantityDisplay>
// //                   <QuantityButton onClick={handleIncrement}>
// //                     +
// //                   </QuantityButton>
// //                 </QuantityControl>

// //                 <TotalPriceDisplay>
// //                   <span style={{ fontWeight: '600', color: '#064e3b' }}>Total:</span>
// //                   <span style={{ fontSize: '1.1rem', fontWeight: '700', color: '#059669' }}>
// //                     ${totalPrice.toFixed(2)}
// //                   </span>
// //                 </TotalPriceDisplay>
// //               </QuantitySection>
// //             </OptionGroup>

// //             {/* Action Buttons */}
// //             <ActionButtons>
// //               <PrimaryButton
// //                 onClick={handleAddToCart}
// //                 disabled={addingToCart || stock === 0}
// //               >
// //                 {addingToCart ? 'Adding...' : stock === 0 ? 'Out of Stock' : 'Add to Cart'}
// //               </PrimaryButton>
              
// //               <PrimaryButton
// //                 onClick={handleBuyNow}
// //                 disabled={addingToCart || stock === 0}
// //                 variant="outlined"
// //                 style={{ 
// //                   backgroundColor: 'transparent', 
// //                   border: '2px solid #ef7921',
// //                   color: '#ef7921'
// //                 }}
// //               >
// //                 Buy Now
// //               </PrimaryButton>
// //             </ActionButtons>

// //             <ActionButtons>
// //               <SecondaryButton
// //                 startIcon={<FavoriteBorderIcon />}
// //               >
// //                 Add to Wishlist
// //               </SecondaryButton>
              
// //               <SecondaryButton
// //                 startIcon={<CompareArrowsIcon />}
// //               >
// //                 Compare
// //               </SecondaryButton>
// //             </ActionButtons>
// //           </InfoSection>
// //         </ProductContainer>

// //         {/* Additional Sections */}
// //         <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem 1.5rem' }}>
// //           {/* Reviews Section */}
// //           <ReviewAndRatingComponent 
// //             productId={id}
// //             productName={name}
// //           />

// //           {/* Related Products Section */}
// //           <RelatedProductsComponent 
// //             categoryId={category?._id}
// //             currentProductId={id}
// //           />
// //         </div>
// //       </section>
// //     </>
// //   );
// // };

// // export default ProductDetails;



























































































// // import React, { useState, useEffect } from 'react';
// // import { useParams } from 'react-router-dom';
// // import Breadcrumbs from '@mui/material/Breadcrumbs';
// // import Link from '@mui/material/Link';
// // import Button from '@mui/material/Button';
// // import Rating from '@mui/material/Rating';
// // import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
// // import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
// // import LocalShippingIcon from '@mui/icons-material/LocalShipping';
// // import BusinessIcon from '@mui/icons-material/Business';
// // import StorefrontIcon from '@mui/icons-material/Storefront';
// // import { styled } from '@mui/material/styles';
// // import { productApi } from '../../utils/productApi';
// // import { toast } from 'react-toastify';

// // // Import components
// // import ReviewAndRatingComponent from '../../components/ReviewAndRatingComponent';
// // import RelatedProductsComponent from '../../components/RelatedProductsComponent';

// // // Styled components
// // const ProductContainer = styled('div')({
// //   display: 'flex',
// //   gap: '3rem',
// //   maxWidth: '1400px',
// //   margin: '0 auto',
// //   padding: '2rem 1rem',
// //   '@media (max-width: 768px)': {
// //     flexDirection: 'column',
// //     gap: '2rem',
// //   },
// // });

// // const ImageSection = styled('div')({
// //   flex: '0 0 45%',
// //   display: 'flex',
// //   flexDirection: 'column',
// //   gap: '1rem',
// //   '@media (max-width: 768px)': {
// //     flex: '1',
// //   },
// // });

// // const MainImage = styled('div')({
// //   border: '1px solid #e5e7eb',
// //   borderRadius: '12px',
// //   overflow: 'hidden',
// //   height: '500px',
// //   position: 'relative',
// //   cursor: 'zoom-in',
// //   '& img': {
// //     width: '100%',
// //     height: '100%',
// //     objectFit: 'cover',
// //     transition: 'transform 0.3s ease',
// //   },
// //   '&:hover img': {
// //     transform: 'scale(1.05)',
// //   },
// // });

// // const ThumbnailContainer = styled('div')({
// //   display: 'flex',
// //   gap: '0.75rem',
// //   justifyContent: 'center',
// //   flexWrap: 'wrap',
// // });

// // const Thumbnail = styled('div')(({ active }) => ({
// //   width: '80px',
// //   height: '80px',
// //   border: active ? '3px solid #ef7921' : '2px solid #e5e7eb',
// //   borderRadius: '8px',
// //   overflow: 'hidden',
// //   cursor: 'pointer',
// //   transition: 'all 0.2s ease',
// //   '&:hover': {
// //     borderColor: '#ef7921',
// //   },
// //   '& img': {
// //     width: '100%',
// //     height: '100%',
// //     objectFit: 'cover',
// //   },
// // }));

// // const InfoSection = styled('div')({
// //   flex: '1',
// //   display: 'flex',
// //   flexDirection: 'column',
// //   gap: '1.5rem',
// // });

// // const ProductTitle = styled('h1')({
// //   fontSize: '2rem',
// //   fontWeight: '700',
// //   margin: '0 0 0.5rem 0',
// //   color: '#1f2937',
// //   lineHeight: '1.2',
// //   '@media (max-width: 768px)': {
// //     fontSize: '1.5rem',
// //   },
// // });

// // const PriceContainer = styled('div')({
// //   display: 'flex',
// //   alignItems: 'center',
// //   gap: '1rem',
// //   flexWrap: 'wrap',
// // });

// // const OriginalPrice = styled('span')({
// //   textDecoration: 'line-through',
// //   color: '#6b7280',
// //   fontSize: '1.2rem',
// //   fontWeight: '500',
// // });

// // const DiscountedPrice = styled('span')({
// //   fontSize: '2rem',
// //   fontWeight: '700',
// //   color: '#ef7921',
// //   '@media (max-width: 768px)': {
// //     fontSize: '1.5rem',
// //   },
// // });

// // const DiscountBadge = styled('span')({
// //   backgroundColor: '#ef7921',
// //   color: 'white',
// //   padding: '0.25rem 0.75rem',
// //   borderRadius: '20px',
// //   fontSize: '0.875rem',
// //   fontWeight: '600',
// // });

// // const TierBadge = styled('span')(({ type }) => ({
// //   padding: '0.5rem 0.75rem',
// //   borderRadius: '6px',
// //   fontSize: '0.875rem',
// //   fontWeight: '600',
// //   backgroundColor: type === 'wholesale' ? '#10b981' : '#6b7280',
// //   color: 'white',
// //   display: 'flex',
// //   alignItems: 'center',
// //   gap: '0.25rem',
// // }));

// // const StockInfo = styled('div')({
// //   display: 'flex',
// //   alignItems: 'center',
// //   gap: '0.5rem',
// //   padding: '0.75rem',
// //   backgroundColor: '#f0fdf4',
// //   border: '1px solid #bbf7d0',
// //   borderRadius: '8px',
// //   color: '#166534',
// //   fontSize: '0.9rem',
// // });

// // const Description = styled('p')({
// //   color: '#6b7280',
// //   lineHeight: '1.6',
// //   fontSize: '1rem',
// //   margin: '0',
// // });

// // const ShippingInfo = styled('div')({
// //   display: 'flex',
// //   alignItems: 'center',
// //   gap: '0.75rem',
// //   padding: '1rem',
// //   backgroundColor: '#f8fafc',
// //   border: '1px solid #e2e8f0',
// //   borderRadius: '8px',
// //   fontSize: '0.9rem',
// //   color: '#475569',
// // });

// // const OptionGroup = styled('div')({
// //   marginBottom: '1.5rem',
// // });

// // const OptionTitle = styled('h3')({
// //   fontSize: '1rem',
// //   fontWeight: '600',
// //   margin: '0 0 0.75rem 0',
// //   color: '#374151',
// // });

// // const ColorOptions = styled('div')({
// //   display: 'flex',
// //   gap: '0.75rem',
// //   flexWrap: 'wrap',
// // });

// // const ColorOption = styled('div')(({ selected, color }) => ({
// //   width: '40px',
// //   height: '40px',
// //   borderRadius: '50%',
// //   backgroundColor: color,
// //   border: selected ? '3px solid #ef7921' : '2px solid #d1d5db',
// //   cursor: 'pointer',
// //   transition: 'all 0.2s ease',
// //   boxShadow: selected ? '0 0 0 3px rgba(239, 121, 33, 0.2)' : 'none',
// //   '&:hover': {
// //     borderColor: '#ef7921',
// //   },
// // }));

// // const SizeOptions = styled('div')({
// //   display: 'flex',
// //   gap: '0.75rem',
// //   flexWrap: 'wrap',
// // });

// // const SizeOption = styled('div')(({ selected }) => ({
// //   padding: '0.75rem 1rem',
// //   border: selected ? '2px solid #ef7921' : '1px solid #d1d5db',
// //   borderRadius: '8px',
// //   cursor: 'pointer',
// //   fontWeight: '500',
// //   fontSize: '0.9rem',
// //   backgroundColor: selected ? 'rgba(239, 121, 33, 0.1)' : 'transparent',
// //   color: selected ? '#ef7921' : '#374151',
// //   minWidth: '50px',
// //   textAlign: 'center',
// //   transition: 'all 0.2s ease',
// //   '&:hover': {
// //     borderColor: '#ef7921',
// //     backgroundColor: 'rgba(239, 121, 33, 0.05)',
// //   },
// // }));

// // const QuantitySection = styled('div')({
// //   display: 'flex',
// //   alignItems: 'center',
// //   gap: '1rem',
// //   marginBottom: '1.5rem',
// //   flexWrap: 'wrap',
// // });

// // const QuantityControl = styled('div')({
// //   display: 'flex',
// //   alignItems: 'center',
// //   border: '2px solid #e5e7eb',
// //   borderRadius: '8px',
// //   overflow: 'hidden',
// //   backgroundColor: 'white',
// // });

// // const QuantityButton = styled('button')({
// //   width: '44px',
// //   height: '44px',
// //   border: 'none',
// //   background: '#f8fafc',
// //   cursor: 'pointer',
// //   display: 'flex',
// //   alignItems: 'center',
// //   justifyContent: 'center',
// //   fontSize: '1.2rem',
// //   fontWeight: '500',
// //   color: '#374151',
// //   transition: 'all 0.2s ease',
// //   '&:hover': {
// //     backgroundColor: '#f1f5f9',
// //     color: '#ef7921',
// //   },
// //   '&:disabled': {
// //     backgroundColor: '#f8fafc',
// //     color: '#d1d5db',
// //     cursor: 'not-allowed',
// //   },
// // });

// // const QuantityDisplay = styled('span')({
// //   width: '60px',
// //   textAlign: 'center',
// //   fontWeight: '600',
// //   fontSize: '1rem',
// //   color: '#374151',
// // });

// // const ActionButtons = styled('div')({
// //   display: 'flex',
// //   gap: '1rem',
// //   flexWrap: 'wrap',
// //   '@media (max-width: 768px)': {
// //     flexDirection: 'column',
// //   },
// // });

// // const PrimaryButton = styled(Button)({
// //   backgroundColor: '#ef7921',
// //   color: 'white',
// //   padding: '0.75rem 2rem',
// //   fontWeight: '600',
// //   fontSize: '1rem',
// //   borderRadius: '8px',
// //   textTransform: 'none',
// //   flex: '1',
// //   minWidth: '200px',
// //   '&:hover': {
// //     backgroundColor: '#e06b15',
// //   },
// //   '&:disabled': {
// //     backgroundColor: '#fbbf77',
// //   },
// // });

// // const SecondaryButton = styled(Button)({
// //   borderColor: '#d1d5db',
// //   color: '#374151',
// //   padding: '0.75rem 1.5rem',
// //   fontWeight: '500',
// //   fontSize: '0.9rem',
// //   borderRadius: '8px',
// //   textTransform: 'none',
// //   flex: '1',
// //   minWidth: '140px',
// //   '&:hover': {
// //     borderColor: '#ef7921',
// //     color: '#ef7921',
// //     backgroundColor: 'rgba(239, 121, 33, 0.04)',
// //   },
// // });

// // const PricingTier = styled('div')({
// //   display: 'flex',
// //   alignItems: 'center',
// //   gap: '0.5rem',
// //   padding: '1rem',
// //   backgroundColor: '#f8f9fa',
// //   borderRadius: '8px',
// //   border: '1px solid #e5e7eb',
// //   fontSize: '0.9rem',
// //   marginBottom: '1rem',
// // });

// // const MOQIndicator = styled('div')({
// //   fontSize: '0.9rem',
// //   color: '#6b7280',
// //   padding: '0.75rem',
// //   backgroundColor: '#f8f9fa',
// //   borderRadius: '8px',
// //   border: '1px solid #e5e7eb',
// //   marginBottom: '1rem',
// // });

// // const TotalPriceDisplay = styled('div')({
// //   display: 'flex',
// //   alignItems: 'center',
// //   gap: '0.75rem',
// //   padding: '1rem',
// //   backgroundColor: '#f0fdf4',
// //   borderRadius: '8px',
// //   border: '1px solid #bbf7d0',
// //   marginBottom: '1.5rem',
// // });

// // const ProductDetails = () => {
// //   const { id } = useParams();
// //   const [product, setProduct] = useState(null);
// //   const [loading, setLoading] = useState(true);
// //   const [selectedColor, setSelectedColor] = useState('');
// //   const [selectedSize, setSelectedSize] = useState('');
// //   const [quantity, setQuantity] = useState(1);
// //   const [activeImage, setActiveImage] = useState('');
// //   const [addingToCart, setAddingToCart] = useState(false);

// //   useEffect(() => {
// //     fetchProduct();
// //   }, [id]);

// //   const fetchProduct = async () => {
// //     try {
// //       setLoading(true);
// //       const response = await productApi.getProduct(id);
// //       if (response.success) {
// //         setProduct(response.data);
// //         if (response.data.images && response.data.images.length > 0) {
// //           setActiveImage(response.data.images[0].url);
// //         }
// //         // Set default selections
// //         if (response.data.specifications?.color) {
// //           setSelectedColor(response.data.specifications.color);
// //         }
// //         if (response.data.size) {
// //           setSelectedSize(response.data.size);
// //         }
// //       }
// //     } catch (error) {
// //       console.error('Error fetching product:', error);
// //       toast.error('Failed to load product details');
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const handleThumbnailClick = (imageUrl) => {
// //     setActiveImage(imageUrl);
// //   };

// //   const handleDecrement = () => {
// //     setQuantity((q) => Math.max(1, q - 1));
// //   };

// //   const handleIncrement = () => {
// //     setQuantity((q) => q + 1);
// //   };

// //   const handleAddToCart = async () => {
// //     try {
// //       setAddingToCart(true);
// //       // Add to cart logic here
// //       await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
// //       toast.success('Product added to cart successfully!');
// //     } catch (error) {
// //       toast.error('Failed to add product to cart');
// //     } finally {
// //       setAddingToCart(false);
// //     }
// //   };

// //   const handleBuyNow = async () => {
// //     await handleAddToCart();
// //     // Navigate to checkout
// //   };

// //   if (loading) {
// //     return (
// //       <div style={{ 
// //         display: 'flex', 
// //         justifyContent: 'center', 
// //         alignItems: 'center', 
// //         minHeight: '400px',
// //         fontSize: '1.1rem',
// //         color: '#6b7280'
// //       }}>
// //         Loading product details...
// //       </div>
// //     );
// //   }

// //   if (!product) {
// //     return (
// //       <div style={{ 
// //         display: 'flex', 
// //         justifyContent: 'center', 
// //         alignItems: 'center', 
// //         minHeight: '400px',
// //         fontSize: '1.1rem',
// //         color: '#6b7280'
// //       }}>
// //         Product not found
// //       </div>
// //     );
// //   }

// //   const {
// //     name,
// //     description,
// //     price,
// //     oldPrice,
// //     wholesalePrice,
// //     moq = 1,
// //     wholesaleEnabled,
// //     images = [],
// //     rating = 0,
// //     stock = 0,
// //     brand,
// //     category,
// //     specifications = {},
// //     size: productSize
// //   } = product;

// //   const isWholesale = wholesaleEnabled && quantity >= moq;
// //   const currentPrice = isWholesale ? wholesalePrice : price;
// //   const totalPrice = quantity * currentPrice;
// //   const discountPercentage = oldPrice && oldPrice > price 
// //     ? Math.round(((oldPrice - price) / oldPrice) * 100)
// //     : 0;

// //   // Available colors from specifications
// //   const availableColors = specifications.color ? [specifications.color] : ['#e53935', '#1e88e5', '#43a047'];
// //   // Available sizes
// //   const availableSizes = productSize ? [productSize] : ['S', 'M', 'L', 'XL'];

// //   return (
// //     <>
// //       <section style={{ backgroundColor: '#f8fafc', minHeight: '100vh' }}>
// //         {/* Breadcrumb */}
// //         <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '1.5rem 1rem 0' }}>
// //           <Breadcrumbs aria-label="breadcrumb" style={{ marginBottom: '1.5rem' }}>
// //             <Link 
// //               underline="hover" 
// //               color="inherit" 
// //               href="/"
// //               style={{ fontSize: '14px', textDecoration: 'none', color: '#6b7280' }}
// //             >
// //               Home
// //             </Link>
// //             <Link
// //               underline="hover"
// //               color="inherit"
// //               href="/products"
// //               style={{ fontSize: '14px', textDecoration: 'none', color: '#6b7280' }}
// //             >
// //               Products
// //             </Link>
// //             {category && (
// //               <Link
// //                 underline="hover"
// //                 color="inherit"
// //                 href={`/products?category=${category._id}`}
// //                 style={{ fontSize: '14px', textDecoration: 'none', color: '#6b7280' }}
// //               >
// //                 {category.name}
// //               </Link>
// //             )}
// //             <span style={{ fontSize: '14px', color: '#ef7921' }}>
// //               {name}
// //             </span>
// //           </Breadcrumbs>
// //         </div>

// //         <ProductContainer>
// //           {/* Product Images */}
// //           <ImageSection>
// //             <MainImage>
// //               <img 
// //                 src={activeImage} 
// //                 alt={name}
// //                 onError={(e) => {
// //                   e.target.src = '/src/assets/images/grocery.jpg';
// //                 }}
// //               />
// //             </MainImage>
            
// //             <ThumbnailContainer>
// //               {images.map((image, index) => (
// //                 <Thumbnail
// //                   key={image._id || index}
// //                   active={activeImage === image.url}
// //                   onClick={() => handleThumbnailClick(image.url)}
// //                 >
// //                   <img 
// //                     src={image.url} 
// //                     alt={`${name} ${index + 1}`}
// //                     onError={(e) => {
// //                       e.target.src = '/src/assets/images/grocery.jpg';
// //                     }}
// //                   />
// //                 </Thumbnail>
// //               ))}
// //             </ThumbnailContainer>
// //           </ImageSection>

// //           {/* Product Info */}
// //           <InfoSection>
// //             <div>
// //               <ProductTitle>{name}</ProductTitle>
              
// //               <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
// //                 <Rating value={rating} precision={0.1} readOnly size="medium" />
// //                 <span style={{ fontSize: '0.9rem', color: '#6b7280' }}>
// //                   ({rating} rating{rating !== 1 ? 's' : ''})
// //                 </span>
// //                 {brand && (
// //                   <span style={{ fontSize: '0.9rem', color: '#6b7280' }}>
// //                     Brand: <strong style={{ color: '#374151' }}>{brand}</strong>
// //                   </span>
// //                 )}
// //               </div>

// //               <PriceContainer>
// //                 {oldPrice && oldPrice > price && (
// //                   <OriginalPrice>${oldPrice}</OriginalPrice>
// //                 )}
// //                 <DiscountedPrice>${currentPrice}</DiscountedPrice>
// //                 {discountPercentage > 0 && (
// //                   <DiscountBadge>-{discountPercentage}%</DiscountBadge>
// //                 )}
// //                 {isWholesale && (
// //                   <TierBadge type="wholesale">
// //                     <BusinessIcon fontSize="small" /> Wholesale
// //                   </TierBadge>
// //                 )}
// //               </PriceContainer>

// //               <StockInfo>
// //                 <span style={{ fontWeight: '600' }}>In Stock:</span>
// //                 <span>{stock} items available</span>
// //               </StockInfo>
// //             </div>

// //             <Description>{description}</Description>

// //             <ShippingInfo>
// //               <LocalShippingIcon fontSize="small" />
// //               <div>
// //                 <div style={{ fontWeight: '600' }}>Free Shipping</div>
// //                 <div>Delivery in 2-3 business days</div>
// //               </div>
// //             </ShippingInfo>

// //             {/* Color Selection */}
// //             {availableColors.length > 0 && (
// //               <OptionGroup>
// //                 <OptionTitle>Color</OptionTitle>
// //                 <ColorOptions>
// //                   {availableColors.map((color, index) => (
// //                     <ColorOption
// //                       key={index}
// //                       color={color}
// //                       selected={selectedColor === color}
// //                       onClick={() => setSelectedColor(color)}
// //                       title={color}
// //                     />
// //                   ))}
// //                 </ColorOptions>
// //               </OptionGroup>
// //             )}

// //             {/* Size Selection */}
// //             {availableSizes.length > 0 && (
// //               <OptionGroup>
// //                 <OptionTitle>Size</OptionTitle>
// //                 <SizeOptions>
// //                   {availableSizes.map((size, index) => (
// //                     <SizeOption
// //                       key={index}
// //                       selected={selectedSize === size}
// //                       onClick={() => setSelectedSize(size)}
// //                     >
// //                       {size}
// //                     </SizeOption>
// //                   ))}
// //                 </SizeOptions>
// //               </OptionGroup>
// //             )}

// //             {/* Wholesale Pricing Info */}
// //             {wholesaleEnabled && (
// //               <PricingTier>
// //                 <StorefrontIcon fontSize="small" />
// //                 <div>
// //                   <div style={{ fontWeight: '600' }}>Wholesale Pricing Available</div>
// //                   <div>Buy {moq}+ units for ${wholesalePrice} each (Save ${(price - wholesalePrice).toFixed(2)} per unit)</div>
// //                 </div>
// //               </PricingTier>
// //             )}

// //             {/* Quantity Section */}
// //             <OptionGroup>
// //               <OptionTitle>Quantity</OptionTitle>
// //               <MOQIndicator>
// //                 {isWholesale 
// //                   ? `✓ Wholesale order (MOQ: ${moq}+ units) - You save $${((price - wholesalePrice) * quantity).toFixed(2)}`
// //                   : `Retail order - Add ${Math.max(0, moq - quantity)} more for wholesale pricing`
// //                 }
// //               </MOQIndicator>
              
// //               <QuantitySection>
// //                 <QuantityControl>
// //                   <QuantityButton 
// //                     onClick={handleDecrement}
// //                     disabled={quantity <= 1}
// //                   >
// //                     -
// //                   </QuantityButton>
// //                   <QuantityDisplay>{quantity}</QuantityDisplay>
// //                   <QuantityButton onClick={handleIncrement}>
// //                     +
// //                   </QuantityButton>
// //                 </QuantityControl>

// //                 <TotalPriceDisplay>
// //                   <span style={{ fontWeight: '600', color: '#374151' }}>Total:</span>
// //                   <span style={{ fontSize: '1.25rem', fontWeight: '700', color: '#ef7921' }}>
// //                     ${totalPrice.toFixed(2)}
// //                   </span>
// //                 </TotalPriceDisplay>
// //               </QuantitySection>
// //             </OptionGroup>

// //             {/* Action Buttons */}
// //             <ActionButtons>
// //               <PrimaryButton
// //                 onClick={handleAddToCart}
// //                 disabled={addingToCart || stock === 0}
// //                 startIcon={addingToCart ? null : '🛒'}
// //               >
// //                 {addingToCart ? 'Adding...' : stock === 0 ? 'Out of Stock' : 'Add to Cart'}
// //               </PrimaryButton>
              
// //               <PrimaryButton
// //                 onClick={handleBuyNow}
// //                 disabled={addingToCart || stock === 0}
// //                 variant="outlined"
// //                 style={{ 
// //                   backgroundColor: 'transparent', 
// //                   border: '2px solid #ef7921',
// //                   color: '#ef7921'
// //                 }}
// //               >
// //                 Buy Now
// //               </PrimaryButton>
// //             </ActionButtons>

// //             <ActionButtons>
// //               <SecondaryButton
// //                 startIcon={<FavoriteBorderIcon />}
// //               >
// //                 Add to Wishlist
// //               </SecondaryButton>
              
// //               <SecondaryButton
// //                 startIcon={<CompareArrowsIcon />}
// //               >
// //                 Compare
// //               </SecondaryButton>
// //             </ActionButtons>
// //           </InfoSection>
// //         </ProductContainer>

// //         {/* Additional Sections */}
// //         <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '3rem 1rem' }}>
// //           {/* Reviews Section */}
// //           <ReviewAndRatingComponent 
// //             productId={id}
// //             productName={name}
// //           />

// //           {/* Related Products Section */}
// //           <RelatedProductsComponent 
// //             categoryId={category?._id}
// //             currentProductId={id}
// //           />
// //         </div>
// //       </section>
// //     </>
// //   );
// // };

// // export default ProductDetails;























































// // import React from 'react';
// // import { useParams } from 'react-router-dom';
// // ProductDetailsComponent
// // import ProductsSlider from '../../components/ProductsSlider';
// // // import ReviewAndRatingComponent from '../../components/ReviewAndRatingComponent';
// // import ProductDetailsComponent from '../../components/ProductDetailsComponent';

// // const ProductDetails = () => {
// //   const { id } = useParams();

// //   return (
// //     <div style={{ padding: '40px 0', background: '#fff' }}>
// //       <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 16px' }}>
// //         {/* Product Details */}
// //         <ProductDetailsComponent />

// //         {/* Reviews Section */}
// //          {/* <ReviewAndRatingComponent 
// //            reviews={reviews} 
// //            averageRating={averageRating} 
// //          /> */}
        
// //         {/* Related Products */}
// //         <div style={{ marginTop: '60px' }}>
// //           <h3 style={{ fontSize: '24px', fontWeight: 600, marginBottom: '24px' }}>
// //             Related Products
// //           </h3>
// //           <ProductsSlider items={4} />
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default ProductDetails;

























































































// // import React, { useState } from 'react';
// // import Breadcrumbs from '@mui/material/Breadcrumbs';
// // import Link from '@mui/material/Link';
// // import Button from '@mui/material/Button';
// // import Rating from '@mui/material/Rating';
// // import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
// // import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
// // import LocalShippingIcon from '@mui/icons-material/LocalShipping';
// // import BusinessIcon from '@mui/icons-material/Business';
// // import StorefrontIcon from '@mui/icons-material/Storefront';
// // import { styled } from '@mui/material/styles';

// // // Import the new components
// // import ReviewAndRatingComponent from '../../components/ReviewAndRatingComponent';
// // import RelatedProductsComponent from '../../components/RelatedProductsComponent';

// // // Create a custom image component with zoom effect
// // const ZoomableImage = styled('div')(({ src }) => ({
// //   width: '100%',
// //   height: '100%',
// //   backgroundImage: `url(${src})`,
// //   backgroundSize: 'cover',
// //   backgroundPosition: 'center',
// //   transition: 'transform 0.5s ease',
// //   '&:hover': {
// //     transform: 'scale(1.5)',
// //     cursor: 'zoom-in'
// //   }
// // }));

// // // Styled components for wholesale features
// // const PricingTier = styled('div')({
// //   display: "flex",
// //   alignItems: "center",
// //   gap: "0.5rem",
// //   marginBottom: "0.5rem",
// //   padding: "0.5rem",
// //   borderRadius: "4px",
// //   backgroundColor: "#f8f9fa",
// //   fontSize: "0.9rem",
// // });

// // const TierBadge = styled('span')(({ type }) => ({
// //   padding: "0.25rem 0.5rem",
// //   borderRadius: "4px",
// //   fontSize: "0.75rem",
// //   fontWeight: "600",
// //   backgroundColor: type === 'wholesale' ? "#ef7921" : "#6b7280",
// //   color: "white",
// //   display: "flex",
// //   alignItems: "center",
// //   gap: "0.25rem",
// // }));

// // const MOQIndicator = styled('div')({
// //   fontSize: "0.85rem",
// //   color: "#6b7280",
// //   marginTop: "0.5rem",
// //   padding: "0.5rem",
// //   backgroundColor: "#f8f9fa",
// //   borderRadius: "4px",
// //   border: "1px solid #e5e7eb",
// // });

// // const TotalPriceDisplay = styled('div')({
// //   display: "flex",
// //   alignItems: "center",
// //   gap: "0.5rem",
// //   padding: "0.5rem",
// //   backgroundColor: "#f8f9fa",
// //   borderRadius: "4px",
// //   marginTop: "0.5rem",
// //   border: "1px solid #e5e7eb",
// // });

// // const ProductDetails = () => {
// //   const [selectedColor, setSelectedColor] = useState('red');
// //   const [selectedSize, setSelectedSize] = useState('m');
// //   const [quantity, setQuantity] = useState(1);
// //   const [activeImage, setActiveImage] = useState('/src/assets/images/grocery.jpg');
// //   const [isHovered, setIsHovered] = useState(false);
// //   const [position, setPosition] = useState({ x: 0, y: 0 });

// //   // Reviews data
// //   const [reviews, setReviews] = useState([
// //     {
// //       id: 1,
// //       name: 'Sarah Johnson',
// //       rating: 5,
// //       comment: 'Absolutely love this saree! The quality is exceptional and it looks even better in person.',
// //       date: '2023-10-15'
// //     },
// //     {
// //       id: 2,
// //       name: 'Michael Chen',
// //       rating: 4,
// //       comment: 'Good product, but the delivery took longer than expected. The saree itself is beautiful.',
// //       date: '2023-09-22'
// //     }
// //   ]);

// //   // Product data with wholesale/retail pricing
// //   const product = {
// //     name: "Embellished Sequinned Ready to Wear Saree",
// //     description: "Premium quality saree with elegant sequin embellishments. Perfect for weddings, parties, and festive occasions. Made from high-quality fabric that ensures comfort and durability.",
// //     retailPrice: 2450,
// //     originalRetailPrice: 2650,
// //     wholesalePrice: 2200,
// //     moq: 5,
// //     stock: 8556,
// //     brand: "Tikhi Inili",
// //     images: [
// //       '/src/assets/images/grocery.jpg',
// //       '/src/assets/images/fashion.jpg',
// //       '/src/assets/images/handbag.jpg'
// //     ],
// //   };

// //   const isWholesale = quantity >= product.moq;
// //   const currentPrice = isWholesale ? product.wholesalePrice : product.retailPrice;
// //   const priceDisplay = isWholesale ? product.wholesalePrice : product.retailPrice;
// //   const totalPrice = quantity * currentPrice;

// //   // Calculate average rating
// //   const averageRating = reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length;

// //   const handleIncrement = () => {
// //     setQuantity(prev => prev + 1);
// //   };

// //   const handleDecrement = () => {
// //     if (quantity > 1) {
// //       setQuantity(prev => prev - 1);
// //     }
// //   };

// //   const handleThumbnailClick = (image) => {
// //     setActiveImage(image);
// //   };

// //   const handleMouseMove = (e) => {
// //     const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
// //     const x = ((e.clientX - left) / width) * 100;
// //     const y = ((e.clientY - top) / height) * 100;
// //     setPosition({ x, y });
// //   };

// //   return (
// //     <>
// //       <section style={{ padding: "2rem 0", maxWidth: "1200px", margin: "0 auto", fontFamily: "Arial, sans-serif" }}>
// //         {/* Breadcrumb */}
// //         <Breadcrumbs aria-label="breadcrumb" style={{ marginBottom: "1.5rem" }}>
// //           <Link 
// //             underline="hover" 
// //             color="inherit" 
// //             href="/"
// //             style={{ fontSize: "14px", textDecoration: "none", color: "#6b7280" }}
// //           >
// //             Home
// //           </Link>
// //           <Link
// //             underline="hover"
// //             color="inherit"
// //             href="/"
// //             style={{ fontSize: "14px", textDecoration: "none", color: "#6b7280" }}
// //           >
// //             Fashion
// //           </Link>
// //           <Link
// //             underline="hover"
// //             color="text.primary"
// //             href="/"
// //             style={{ fontSize: "14px", textDecoration: "none", color: "#ef7921" }}
// //           >
// //             Sarees
// //           </Link>
// //         </Breadcrumbs>
     
// //         <div style={{ display: "flex", gap: "2rem", flexWrap: "wrap" }}>
// //           {/* Product Images - 30% width */}
// //           <div style={{ flex: "0 0 30%", minWidth: "300px" }}>
// //             <div 
// //               style={{ 
// //                 border: "1px solid #e5e7eb", 
// //                 borderRadius: "6px", 
// //                 overflow: "hidden",
// //                 marginBottom: "1rem",
// //                 height: "350px",
// //                 position: "relative"
// //               }}
// //               onMouseEnter={() => setIsHovered(true)}
// //               onMouseLeave={() => setIsHovered(false)}
// //               onMouseMove={handleMouseMove}
// //             >
// //               <div
// //                 style={{
// //                   width: '100%',
// //                   height: '100%',
// //                   overflow: 'hidden',
// //                   position: 'relative'
// //                 }}
// //               >
// //                 <img 
// //                   src={activeImage} 
// //                   alt="Product"
// //                   style={{ 
// //                     width: "100%", 
// //                     height: "100%", 
// //                     objectFit: "cover",
// //                     display: "block",
// //                     transform: isHovered ? 'scale(1.5)' : 'scale(1)',
// //                     transformOrigin: `${position.x}% ${position.y}%`,
// //                     transition: isHovered ? 'transform 0.1s ease' : 'none'
// //                   }}
// //                 />
// //               </div>
// //               {isHovered && (
// //                 <div style={{
// //                   position: 'absolute',
// //                   top: 0,
// //                   left: 0,
// //                   width: '100%',
// //                   height: '100%',
// //                   pointerEvents: 'none',
// //                   background: 'rgba(255, 255, 255, 0.1)'
// //                 }} />
// //               )}
// //             </div>
            
// //             {/* Additional thumbnails */}
// //             <div style={{ display: "flex", gap: "0.75rem", justifyContent: "center" }}>
// //               {product.images.map((image, index) => (
// //                 <div 
// //                   key={index}
// //                   style={{ 
// //                     width: "60px", 
// //                     height: "60px", 
// //                     border: activeImage === image ? "2px solid #ef7921" : "2px solid #e5e7eb", 
// //                     borderRadius: "6px", 
// //                     overflow: "hidden",
// //                     cursor: "pointer"
// //                   }}
// //                   onClick={() => handleThumbnailClick(image)}
// //                 >
// //                   <img 
// //                     src={image} 
// //                     alt={`Thumbnail ${index + 1}`}
// //                     style={{ width: "100%", height: "100%", objectFit: "cover" }}
// //                   />
// //                 </div>
// //               ))}
// //             </div>
// //           </div>

// //           {/* Product Info - 70% width */}
// //           <div style={{ flex: "1", minWidth: "300px" }}>
// //             <h1 style={{ 
// //               fontSize: "1.5rem", 
// //               fontWeight: "600", 
// //               marginBottom: "0.75rem", 
// //               color: "#1f2937",
// //               lineHeight: "1.2"
// //             }}>
// //               {product.name}
// //             </h1>
            
// //             <div style={{ display: "flex", alignItems: "center", gap: "1.5rem", marginBottom: "0.75rem" }}>
// //               <span style={{ fontSize: "0.9rem", color: "#6b7280" }}>
// //                 Brand: <strong style={{ color: "#374151" }}>{product.brand}</strong>
// //               </span>
// //               <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
// //                 <Rating value={averageRating} precision={0.1} size="small" readOnly />
// //                 <span 
// //                   style={{ fontSize: "0.9rem", color: "#6b7280" }}
// //                 >
// //                   ({reviews.length} reviews)
// //                 </span>
// //               </div>
// //             </div>

// //             {/* Pricing Section with Wholesale/Retail */}
// //             <div style={{ marginBottom: "1.25rem" }}>
// //               <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "0.5rem" }}>
// //                 <span style={{ 
// //                   fontSize: "1.1rem", 
// //                   color: "#6b7280", 
// //                   textDecoration: "line-through" 
// //                 }}>
// //                   ${product.originalRetailPrice}
// //                 </span>
// //                 <span style={{ 
// //                   fontSize: "1.35rem", 
// //                   fontWeight: "600", 
// //                   color: "#ef7921" 
// //                 }}>
// //                   ${priceDisplay}
// //                 </span>
// //                 {isWholesale && (
// //                   <TierBadge type="wholesale">
// //                     <BusinessIcon fontSize="small" /> Wholesale
// //                   </TierBadge>
// //                 )}
// //                 <span style={{ 
// //                   fontSize: "0.85rem", 
// //                   color: "#10b981", 
// //                   marginLeft: "auto" 
// //                 }}>
// //                   Available in Stock: {product.stock} Items
// //                 </span>
// //               </div>

// //               {/* Total Price Display */}
// //               <TotalPriceDisplay>
// //                 <span style={{ fontSize: "0.9rem", color: "#374151", fontWeight: "500" }}>Total Price:</span>
// //                 <span style={{ fontSize: "1.1rem", fontWeight: "600", color: "#ef7921" }}>
// //                   ${totalPrice.toFixed(2)}
// //                 </span>
// //               </TotalPriceDisplay>

// //               {/* Wholesale Pricing Info */}
// //               {quantity < product.moq && (
// //                 <PricingTier className="">
// //                   <StorefrontIcon fontSize="small" />
// //                   <span>Buy {product.moq}+ units for wholesale pricing: </span>
// //                   <strong>${product.wholesalePrice} each</strong>
// //                 </PricingTier> 
// //               )}
// //             </div>

// //             <p style={{ 
// //               color: "#6b7280", 
// //               lineHeight: "1.5", 
// //               marginBottom: "1.25rem",
// //               fontSize: "0.9rem"
// //             }}>
// //               {product.description}
// //             </p>

// //             <div style={{ 
// //               display: "flex", 
// //               alignItems: "center", 
// //               gap: "0.5rem", 
// //               padding: "0.6rem", 
// //               backgroundColor: "#f3f4f6", 
// //               borderRadius: "6px", 
// //               marginBottom: "1.25rem",
// //               fontSize: "0.85rem",
// //               color: "#374151"
// //             }}>
// //               <LocalShippingIcon fontSize="small" />
// //               <span>Free Shipping (Est. Delivery Time 2-3 Days)</span>
// //             </div>

// //             {/* Color Selection */}
// //             <div style={{ marginBottom: "1.25rem" }}>
// //               <h3 style={{ 
// //                 fontSize: "0.95rem", 
// //                 fontWeight: "500", 
// //                 marginBottom: "0.5rem", 
// //                 color: "#374151" 
// //               }}>
// //                 Color:
// //               </h3>
// //               <div style={{ display: "flex", gap: "0.6rem" }}>
// //                 <div 
// //                   style={{
// //                     width: "28px",
// //                     height: "28px",
// //                     borderRadius: "50%",
// //                     backgroundColor: "#e53935",
// //                     cursor: "pointer",
// //                     border: selectedColor === 'red' ? "2px solid #ef7921" : "2px solid transparent",
// //                     boxShadow: selectedColor === 'red' ? "0 0 0 2px rgba(239, 121, 33, 0.3)" : "none"
// //                   }}
// //                   onClick={() => setSelectedColor('red')}
// //                 ></div>
// //                 <div 
// //                   style={{
// //                     width: "28px",
// //                     height: "28px",
// //                     borderRadius: "50%",
// //                     backgroundColor: "#1e88e5",
// //                     cursor: "pointer",
// //                     border: selectedColor === 'blue' ? "2px solid #ef7921" : "2px solid transparent",
// //                     boxShadow: selectedColor === 'blue' ? "0 0 0 2px rgba(239, 121, 33, 0.3)" : "none"
// //                   }}
// //                   onClick={() => setSelectedColor('blue')}
// //                 ></div>
// //                 <div 
// //                   style={{
// //                     width: "28px",
// //                     height: "28px",
// //                     borderRadius: "50%",
// //                     backgroundColor: "#43a047",
// //                     cursor: "pointer",
// //                     border: selectedColor === 'green' ? "2px solid #ef7921" : "2px solid transparent",
// //                     boxShadow: selectedColor === 'green' ? "0 0 0 2px rgba(239, 121, 33, 0.3)" : "none"
// //                   }}
// //                   onClick={() => setSelectedColor('green')}
// //                 ></div>
// //               </div>
// //             </div>

// //             {/* Size, Wishlist and Compare - Side by Side */}
// //             <div style={{ display: "flex", gap: "1rem", marginBottom: "1.25rem", alignItems: "flex-start", flexWrap: "wrap" }}>
// //               {/* Size Selection */}
// //               <div style={{ flex: "1", minWidth: "200px" }}>
// //                 <h3 style={{ 
// //                   fontSize: "0.95rem", 
// //                   fontWeight: "500", 
// //                   marginBottom: "0.5rem", 
// //                   color: "#374151" 
// //                 }}>
// //                   Size:
// //                 </h3>
// //                 <div style={{ display: "flex", gap: "0.6rem" }}>
// //                   {['s', 'm', 'l', 'xl'].map(size => (
// //                     <div 
// //                       key={size}
// //                       style={{
// //                         width: "36px",
// //                         height: "36px",
// //                         display: "flex",
// //                         alignItems: "center",
// //                         justifyContent: "center",
// //                         border: selectedSize === size ? "1px solid #ef7921" : "1px solid #d1d5db",
// //                         borderRadius: "4px",
// //                         cursor: "pointer",
// //                         fontWeight: "500",
// //                         fontSize: "0.9rem",
// //                         backgroundColor: selectedSize === size ? "rgba(239, 121, 33, 0.1)" : "transparent",
// //                         color: selectedSize === size ? "#ef7921" : "#374151"
// //                       }}
// //                       onClick={() => setSelectedSize(size)}
// //                     >
// //                       {size.toUpperCase()}
// //                     </div>
// //                   ))}
// //                 </div>
// //               </div>
              
// //               {/* Wishlist and Compare Buttons */}
// //               <div style={{ flex: "1", display: "flex", gap: "0.5rem", marginTop: "1.5rem", minWidth: "200px" }}>
// //                 <Button 
// //                   variant="outlined" 
// //                   startIcon={<FavoriteBorderIcon />}
// //                   style={{ 
// //                     borderColor: "#d1d5db", 
// //                     color: "#4b5563",
// //                     fontSize: "0.85rem",
// //                     padding: "0.4rem 0.8rem",
// //                     flex: 1
// //                   }}
// //                 >
// //                   Wishlist
// //                 </Button>
// //                 <Button 
// //                   variant="outlined" 
// //                   startIcon={<CompareArrowsIcon />}
// //                   style={{ 
// //                     borderColor: "#d1d5db", 
// //                     color: "#4b5563",
// //                     fontSize: "0.85rem",
// //                     padding: "0.4rem 0.8rem",
// //                     flex: 1
// //                   }}
// //                 >
// //                   Compare
// //                 </Button>
// //               </div>
// //             </div>

// //             {/* Quantity Section with MOQ Indicator */}
// //             <div style={{ marginBottom: "1.25rem" }}>
// //               <h3 style={{ 
// //                 fontSize: "0.95rem", 
// //                 fontWeight: "500", 
// //                 marginBottom: "0.5rem", 
// //                 color: "#374151" 
// //               }}>
// //                 Quantity:
// //               </h3>
              
// //               <MOQIndicator>
// //                 {isWholesale 
// //                   ? `✓ Wholesale order (MOQ: ${product.moq}+ units) - You save $${(product.retailPrice - product.wholesalePrice) * quantity}`
// //                   : `Retail order - Add ${product.moq - quantity} more for wholesale pricing`
// //                 }
// //               </MOQIndicator>
// //             </div>

// //             {/* Quantity and Add to Cart - Side by Side */}
// //             <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.25rem", flexWrap: "wrap" }}>
// //               <div style={{ display: "flex", alignItems: "center", gap: "0.8rem" }}>
// //                 <div style={{ 
// //                   display: "flex", 
// //                   alignItems: "center", 
// //                   border: "1px solid #d1d5db", 
// //                   borderRadius: "4px", 
// //                   overflow: "hidden" 
// //                 }}>
// //                   <button 
// //                     style={{ 
// //                       width: "32px", 
// //                       height: "32px", 
// //                       background: "#f9fafb", 
// //                       border: "none", 
// //                       fontSize: "1.1rem", 
// //                       cursor: "pointer",
// //                       display: "flex",
// //                       alignItems: "center",
// //                       justifyContent: "center"
// //                     }}
// //                     onClick={handleDecrement}
// //                   >
// //                     -
// //                   </button>
// //                   <span style={{ 
// //                     width: "36px", 
// //                     textAlign: "center", 
// //                     fontWeight: "500",
// //                     fontSize: "0.95rem"
// //                   }}>
// //                     {quantity}
// //                   </span>
// //                   <button 
// //                     style={{ 
// //                       width: "32px", 
// //                       height: "32px", 
// //                       background: " #f9fafb", 
// //                       border: "none", 
// //                       fontSize: "1.1rem", 
// //                       cursor: "pointer",
// //                       display: "flex",
// //                       alignItems: "center",
// //                       justifyContent: "center"
// //                     }}
// //                     onClick={handleIncrement}
// //                   >
// //                     +
// //                   </button>
// //                 </div>
// //               </div>
              
// //               <Button 
// //                 variant="contained" 
// //                 style={{ 
// //                   backgroundColor: "#ef7921", 
// //                   color: "white", 
// //                   padding: "0.5rem 1rem", 
// //                   fontWeight: "500", 
// //                   textTransform: "uppercase",
// //                   fontSize: "0.9rem",
// //                   height: "40px",
// //                   flex: 1,
// //                   maxWidth: "200px"
// //                 }}
// //               >
// //                 ADD TO CART
// //               </Button>
// //             </div>
// //           </div>
// //         </div> 

// //         {/* Reviews Section */}
// //         <ReviewAndRatingComponent 
// //           reviews={reviews} 
// //           averageRating={averageRating} 
// //         />

// //         {/* Related Products Section */}
// //         <RelatedProductsComponent />
// //       </section>
// //     </>
// //   );
// // };

// // export default ProductDetails;


































































// // import React, { useState } from 'react';
// // import Breadcrumbs from '@mui/material/Breadcrumbs';
// // import Link from '@mui/material/Link';
// // import Button from '@mui/material/Button';
// // import Rating from '@mui/material/Rating';
// // import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
// // import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
// // import LocalShippingIcon from '@mui/icons-material/LocalShipping';
// // import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
// // import ExpandLessIcon from '@mui/icons-material/ExpandLess';
// // import TextField from '@mui/material/TextField';
// // import Avatar from '@mui/material/Avatar';
// // import { styled } from '@mui/material/styles';
// // import ProductsSlider from '../../components/ProductsSlider';
// // import BusinessIcon from '@mui/icons-material/Business';
// // import StorefrontIcon from '@mui/icons-material/Storefront';

// // // Create a custom image component with zoom effect
// // const ZoomableImage = styled('div')(({ src }) => ({
// //   width: '100%',
// //   height: '100%',
// //   backgroundImage: `url(${src})`,
// //   backgroundSize: 'cover',
// //   backgroundPosition: 'center',
// //   transition: 'transform 0.5s ease',
// //   '&:hover': {
// //     transform: 'scale(1.5)',
// //     cursor: 'zoom-in'
// //   }
// // }));

// // // Custom styling for the ProductsSlider container
// // const SliderContainer = styled('div')({
// //   marginTop: '2rem',
// //   padding: '1.5rem 0',
// //   borderTop: '1px solid #e5e7eb',
  
// //   '& .slick-slide': {
// //     padding: '0 10px',
// //   },
  
// //   '& .product-item': {
// //     borderRadius: '8px',
// //     overflow: 'hidden',
// //     boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
// //     border: '1px solid #e5e7eb',
// //     backgroundColor: '#fff',
// //     transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    
// //     '&:hover': {
// //       transform: 'translateY(-5px)',
// //       boxShadow: '0 8px 20px rgba(0,0,0,0.15)',
// //     }
// //   },
  
// //   '& .product-image': {
// //     height: '200px',
// //     overflow: 'hidden',
// //     position: 'relative',
    
// //     '& img': {
// //       width: '100%',
// //       height: '100%',
// //       objectFit: 'cover',
// //       transition: 'transform 0.5s ease',
// //     },
    
// //     '&:hover img': {
// //       transform: 'scale(1.05)',
// //     }
// //   },
  
// //   '& .product-info': {
// //     padding: '1rem',
    
// //     '& h3': {
// //       fontSize: '14px',
// //       fontWeight: '500',
// //       margin: '0 0 0.5rem 0',
// //       color: '#374151',
// //       lineHeight: '1.3',
// //       height: '36px',
// //       overflow: 'hidden',
// //       textOverflow: 'ellipsis',
// //       display: '-webkit-box',
// //       WebkitLineClamp: 2,
// //       WebkitBoxOrient: 'vertical',
// //     },
    
// //     '& .price': {
// //       display: 'flex',
// //       alignItems: 'center',
// //       gap: '0.5rem',
// //       marginBottom: '0.5rem',
      
// //       '& .original-price': {
// //         fontSize: '14px',
// //         color: '#6b7280',
// //         textDecoration: 'line-through',
// //       },
      
// //       '& .discounted-price': {
// //         fontSize: '16px',
// //         fontWeight: '600',
// //         color: '#ef7921',
// //       }
// //     },
    
// //     '& .rating': {
// //       marginBottom: '0.5rem',
// //     }
// //   }
// // });

// // // Styled components for wholesale features
// // const PricingTier = styled('div')({
// //   display: "flex",
// //   alignItems: "center",
// //   gap: "0.5rem",
// //   marginBottom: "0.5rem",
// //   padding: "0.5rem",
// //   borderRadius: "4px",
// //   backgroundColor: "#f8f9fa",
// //   fontSize: "0.9rem",
// // });

// // const TierBadge = styled('span')(({ type }) => ({
// //   padding: "0.25rem 0.5rem",
// //   borderRadius: "4px",
// //   fontSize: "0.75rem",
// //   fontWeight: "600",
// //   backgroundColor: type === 'wholesale' ? "#ef7921" : "#6b7280",
// //   color: "white",
// //   display: "flex",
// //   alignItems: "center",
// //   gap: "0.25rem",
// // }));

// // const MOQIndicator = styled('div')({
// //   fontSize: "0.85rem",
// //   color: "#6b7280",
// //   marginTop: "0.5rem",
// //   padding: "0.5rem",
// //   backgroundColor: "#f8f9fa",
// //   borderRadius: "4px",
// //   border: "1px solid #e5e7eb",
// // });

// // const TotalPriceDisplay = styled('div')({
// //   display: "flex",
// //   alignItems: "center",
// //   gap: "0.5rem",
// //   padding: "0.5rem",
// //   backgroundColor: "#f8f9fa",
// //   borderRadius: "4px",
// //   marginTop: "0.5rem",
// //   border: "1px solid #e5e7eb",
// // });

// // const ProductDetails = () => {
// //   const [selectedColor, setSelectedColor] = useState('red');
// //   const [selectedSize, setSelectedSize] = useState('m');
// //   const [quantity, setQuantity] = useState(1);
// //   const [activeImage, setActiveImage] = useState('/src/assets/images/grocery.jpg');
// //   const [isHovered, setIsHovered] = useState(false);
// //   const [position, setPosition] = useState({ x: 0, y: 0 });
// //   const [showReviews, setShowReviews] = useState(false);
// //   const [userRating, setUserRating] = useState(0);
// //   const [reviewText, setReviewText] = useState('');
// //   const [userName, setUserName] = useState('');
// //   const [reviews, setReviews] = useState([
// //     {
// //       id: 1,
// //       name: 'Sarah Johnson',
// //       rating: 5,
// //       comment: 'Absolutely love this saree! The quality is exceptional and it looks even better in person.',
// //       date: '2023-10-15'
// //     },
// //     {
// //       id: 2,
// //       name: 'Michael Chen',
// //       rating: 4,
// //       comment: 'Good product, but the delivery took longer than expected. The saree itself is beautiful.',
// //       date: '2023-09-22'
// //     }
// //   ]);

// //   // Product data with wholesale/retail pricing
// //   const product = {
// //     name: "Embellished Sequinned Ready to Wear Saree",
// //     description: "Premium quality saree with elegant sequin embellishments. Perfect for weddings, parties, and festive occasions. Made from high-quality fabric that ensures comfort and durability.",
// //     retailPrice: 2450,
// //     originalRetailPrice: 2650,
// //     wholesalePrice: 2200,
// //     moq: 5,
// //     stock: 8556,
// //     brand: "Tikhi Inili",
// //     images: [
// //       '/src/assets/images/grocery.jpg',
// //       '/src/assets/images/fashion.jpg',
// //       '/src/assets/images/handbag.jpg'
// //     ],
// //   };

// //   const isWholesale = quantity >= product.moq;
// //   const currentPrice = isWholesale ? product.wholesalePrice : product.retailPrice;
// //   const priceDisplay = isWholesale ? product.wholesalePrice : product.retailPrice;
// //   const totalPrice = quantity * currentPrice;

// //   const handleIncrement = () => {
// //     setQuantity(prev => prev + 1);
// //   };

// //   const handleDecrement = () => {
// //     if (quantity > 1) {
// //       setQuantity(prev => prev - 1);
// //     }
// //   };

// //   const handleThumbnailClick = (image) => {
// //     setActiveImage(image);
// //   };

// //   const handleMouseMove = (e) => {
// //     const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
// //     const x = ((e.clientX - left) / width) * 100;
// //     const y = ((e.clientY - top) / height) * 100;
// //     setPosition({ x, y });
// //   };

// //   const toggleReviews = () => {
// //     setShowReviews(!showReviews);
// //   };

// //   const handleSubmitReview = (e) => {
// //     e.preventDefault();
// //     if (userRating === 0 || !reviewText.trim() || !userName.trim()) {
// //       alert('Please provide a rating, your name, and a review comment.');
// //       return;
// //     }

// //     const newReview = {
// //       id: reviews.length + 1,
// //       name: userName,
// //       rating: userRating,
// //       comment: reviewText,
// //       date: new Date().toISOString().split('T')[0]
// //     };

// //     setReviews([...reviews, newReview]);
// //     setUserRating(0);
// //     setReviewText('');
// //     setUserName('');
// //     alert('Thank you for your review!');
// //   };

// //   // Calculate average rating
// //   const averageRating = reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length;

// //   return (
// //     <>
// //       <section style={{ padding: "2rem 0", maxWidth: "1200px", margin: "0 auto", fontFamily: "Arial, sans-serif" }}>
// //         {/* Breadcrumb */}
// //         <Breadcrumbs aria-label="breadcrumb" style={{ marginBottom: "1.5rem" }}>
// //           <Link 
// //             underline="hover" 
// //             color="inherit" 
// //             href="/"
// //             style={{ fontSize: "14px", textDecoration: "none", color: "#6b7280" }}
// //           >
// //             Home
// //           </Link>
// //           <Link
// //             underline="hover"
// //             color="inherit"
// //             href="/"
// //             style={{ fontSize: "14px", textDecoration: "none", color: "#6b7280" }}
// //           >
// //             Fashion
// //           </Link>
// //           <Link
// //             underline="hover"
// //             color="text.primary"
// //             href="/"
// //             style={{ fontSize: "14px", textDecoration: "none", color: "#ef7921" }}
// //           >
// //             Sarees
// //           </Link>
// //         </Breadcrumbs>
     
// //         <div style={{ display: "flex", gap: "2rem", flexWrap: "wrap" }}>
// //           {/* Product Images - 30% width */}
// //           <div style={{ flex: "0 0 30%", minWidth: "300px" }}>
// //             <div 
// //               style={{ 
// //                 border: "1px solid #e5e7eb", 
// //                 borderRadius: "6px", 
// //                 overflow: "hidden",
// //                 marginBottom: "1rem",
// //                 height: "350px",
// //                 position: "relative"
// //               }}
// //               onMouseEnter={() => setIsHovered(true)}
// //               onMouseLeave={() => setIsHovered(false)}
// //               onMouseMove={handleMouseMove}
// //             >
// //               <div
// //                 style={{
// //                   width: '100%',
// //                   height: '100%',
// //                   overflow: 'hidden',
// //                   position: 'relative'
// //                 }}
// //               >
// //                 <img 
// //                   src={activeImage} 
// //                   alt="Product"
// //                   style={{ 
// //                     width: "100%", 
// //                     height: "100%", 
// //                     objectFit: "cover",
// //                     display: "block",
// //                     transform: isHovered ? 'scale(1.5)' : 'scale(1)',
// //                     transformOrigin: `${position.x}% ${position.y}%`,
// //                     transition: isHovered ? 'transform 0.1s ease' : 'none'
// //                   }}
// //                 />
// //               </div>
// //               {isHovered && (
// //                 <div style={{
// //                   position: 'absolute',
// //                   top: 0,
// //                   left: 0,
// //                   width: '100%',
// //                   height: '100%',
// //                   pointerEvents: 'none',
// //                   background: 'rgba(255, 255, 255, 0.1)'
// //                 }} />
// //               )}
// //             </div>
            
// //             {/* Additional thumbnails */}
// //             <div style={{ display: "flex", gap: "0.75rem", justifyContent: "center" }}>
// //               {product.images.map((image, index) => (
// //                 <div 
// //                   key={index}
// //                   style={{ 
// //                     width: "60px", 
// //                     height: "60px", 
// //                     border: activeImage === image ? "2px solid #ef7921" : "2px solid #e5e7eb", 
// //                     borderRadius: "6px", 
// //                     overflow: "hidden",
// //                     cursor: "pointer"
// //                   }}
// //                   onClick={() => handleThumbnailClick(image)}
// //                 >
// //                   <img 
// //                     src={image} 
// //                     alt={`Thumbnail ${index + 1}`}
// //                     style={{ width: "100%", height: "100%", objectFit: "cover" }}
// //                   />
// //                 </div>
// //               ))}
// //             </div>
// //           </div>

// //           {/* Product Info - 70% width */}
// //           <div style={{ flex: "1", minWidth: "300px" }}>
// //             <h1 style={{ 
// //               fontSize: "1.5rem", 
// //               fontWeight: "600", 
// //               marginBottom: "0.75rem", 
// //               color: "#1f2937",
// //               lineHeight: "1.2"
// //             }}>
// //               {product.name}
// //             </h1>
            
// //             <div style={{ display: "flex", alignItems: "center", gap: "1.5rem", marginBottom: "0.75rem" }}>
// //               <span style={{ fontSize: "0.9rem", color: "#6b7280" }}>
// //                 Brand: <strong style={{ color: "#374151" }}>{product.brand}</strong>
// //               </span>
// //               <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
// //                 <Rating value={averageRating} precision={0.1} size="small" readOnly />
// //                 <span 
// //                   style={{ fontSize: "0.9rem", color: "#6b7280", cursor: "pointer" }}
// //                   onClick={toggleReviews}
// //                 >
// //                   ({reviews.length} reviews)
// //                 </span>
// //               </div>
// //             </div>

// //             {/* Pricing Section with Wholesale/Retail */}
// //             <div style={{ marginBottom: "1.25rem" }}>
// //               <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "0.5rem" }}>
// //                 <span style={{ 
// //                   fontSize: "1.1rem", 
// //                   color: "#6b7280", 
// //                   textDecoration: "line-through" 
// //                 }}>
// //                   ${product.originalRetailPrice}
// //                 </span>
// //                 <span style={{ 
// //                   fontSize: "1.35rem", 
// //                   fontWeight: "600", 
// //                   color: "#ef7921" 
// //                 }}>
// //                   ${priceDisplay}
// //                 </span>
// //                 {isWholesale && (
// //                   <TierBadge type="wholesale">
// //                     <BusinessIcon fontSize="small" /> Wholesale
// //                   </TierBadge>
// //                 )}
// //                 <span style={{ 
// //                   fontSize: "0.85rem", 
// //                   color: "#10b981", 
// //                   marginLeft: "auto" 
// //                 }}>
// //                   Available in Stock: {product.stock} Items
// //                 </span>
// //               </div>

// //               {/* Total Price Display */}
// //               <TotalPriceDisplay>
// //                 <span style={{ fontSize: "0.9rem", color: "#374151", fontWeight: "500" }}>Total Price:</span>
// //                 <span style={{ fontSize: "1.1rem", fontWeight: "600", color: "#ef7921" }}>
// //                   ${totalPrice.toFixed(2)}
// //                 </span>
// //               </TotalPriceDisplay>

// //               {/* Wholesale Pricing Info */}
// //               {quantity < product.moq && (
// //                 <PricingTier className="">
// //                   <StorefrontIcon fontSize="small" />
// //                   <span>Buy {product.moq}+ units for wholesale pricing: </span>
// //                   <strong>${product.wholesalePrice} each</strong>
// //                 </PricingTier> 

// //               )}
// //             </div>

// //             <p style={{ 
// //               color: "#6b7280", 
// //               lineHeight: "1.5", 
// //               marginBottom: "1.25rem",
// //               fontSize: "0.9rem"
// //             }}>
// //               {product.description}
// //             </p>

// //             <div style={{ 
// //               display: "flex", 
// //               alignItems: "center", 
// //               gap: "0.5rem", 
// //               padding: "0.6rem", 
// //               backgroundColor: "#f3f4f6", 
// //               borderRadius: "6px", 
// //               marginBottom: "1.25rem",
// //               fontSize: "0.85rem",
// //               color: "#374151"
// //             }}>
// //               <LocalShippingIcon fontSize="small" />
// //               <span>Free Shipping (Est. Delivery Time 2-3 Days)</span>
// //             </div>

// //             {/* Color Selection */}
// //             <div style={{ marginBottom: "1.25rem" }}>
// //               <h3 style={{ 
// //                 fontSize: "0.95rem", 
// //                 fontWeight: "500", 
// //                 marginBottom: "0.5rem", 
// //                 color: "#374151" 
// //               }}>
// //                 Color:
// //               </h3>
// //               <div style={{ display: "flex", gap: "0.6rem" }}>
// //                 <div 
// //                   style={{
// //                     width: "28px",
// //                     height: "28px",
// //                     borderRadius: "50%",
// //                     backgroundColor: "#e53935",
// //                     cursor: "pointer",
// //                     border: selectedColor === 'red' ? "2px solid #ef7921" : "2px solid transparent",
// //                     boxShadow: selectedColor === 'red' ? "0 0 0 2px rgba(239, 121, 33, 0.3)" : "none"
// //                   }}
// //                   onClick={() => setSelectedColor('red')}
// //                 ></div>
// //                 <div 
// //                   style={{
// //                     width: "28px",
// //                     height: "28px",
// //                     borderRadius: "50%",
// //                     backgroundColor: "#1e88e5",
// //                     cursor: "pointer",
// //                     border: selectedColor === 'blue' ? "2px solid #ef7921" : "2px solid transparent",
// //                     boxShadow: selectedColor === 'blue' ? "0 0 0 2px rgba(239, 121, 33, 0.3)" : "none"
// //                   }}
// //                   onClick={() => setSelectedColor('blue')}
// //                 ></div>
// //                 <div 
// //                   style={{
// //                     width: "28px",
// //                     height: "28px",
// //                     borderRadius: "50%",
// //                     backgroundColor: "#43a047",
// //                     cursor: "pointer",
// //                     border: selectedColor === 'green' ? "2px solid #ef7921" : "2px solid transparent",
// //                     boxShadow: selectedColor === 'green' ? "0 0 0 2px rgba(239, 121, 33, 0.3)" : "none"
// //                   }}
// //                   onClick={() => setSelectedColor('green')}
// //                 ></div>
// //               </div>
// //             </div>

// //             {/* Size, Wishlist and Compare - Side by Side */}
// //             <div style={{ display: "flex", gap: "1rem", marginBottom: "1.25rem", alignItems: "flex-start", flexWrap: "wrap" }}>
// //               {/* Size Selection */}
// //               <div style={{ flex: "1", minWidth: "200px" }}>
// //                 <h3 style={{ 
// //                   fontSize: "0.95rem", 
// //                   fontWeight: "500", 
// //                   marginBottom: "0.5rem", 
// //                   color: "#374151" 
// //                 }}>
// //                   Size:
// //                 </h3>
// //                 <div style={{ display: "flex", gap: "0.6rem" }}>
// //                   {['s', 'm', 'l', 'xl'].map(size => (
// //                     <div 
// //                       key={size}
// //                       style={{
// //                         width: "36px",
// //                         height: "36px",
// //                         display: "flex",
// //                         alignItems: "center",
// //                         justifyContent: "center",
// //                         border: selectedSize === size ? "1px solid #ef7921" : "1px solid #d1d5db",
// //                         borderRadius: "4px",
// //                         cursor: "pointer",
// //                         fontWeight: "500",
// //                         fontSize: "0.9rem",
// //                         backgroundColor: selectedSize === size ? "rgba(239, 121, 33, 0.1)" : "transparent",
// //                         color: selectedSize === size ? "#ef7921" : "#374151"
// //                       }}
// //                       onClick={() => setSelectedSize(size)}
// //                     >
// //                       {size.toUpperCase()}
// //                     </div>
// //                   ))}
// //                 </div>
// //               </div>
              
// //               {/* Wishlist and Compare Buttons */}
// //               <div style={{ flex: "1", display: "flex", gap: "0.5rem", marginTop: "1.5rem", minWidth: "200px" }}>
// //                 <Button 
// //                   variant="outlined" 
// //                   startIcon={<FavoriteBorderIcon />}
// //                   style={{ 
// //                     borderColor: "#d1d5db", 
// //                     color: "#4b5563",
// //                     fontSize: "0.85rem",
// //                     padding: "0.4rem 0.8rem",
// //                     flex: 1
// //                   }}
// //                 >
// //                   Wishlist
// //                 </Button>
// //                 <Button 
// //                   variant="outlined" 
// //                   startIcon={<CompareArrowsIcon />}
// //                   style={{ 
// //                     borderColor: "#d1d5db", 
// //                     color: "#4b5563",
// //                     fontSize: "0.85rem",
// //                     padding: "0.4rem 0.8rem",
// //                     flex: 1
// //                   }}
// //                 >
// //                   Compare
// //                 </Button>
// //               </div>
// //             </div>

// //             {/* Quantity Section with MOQ Indicator */}
// //             <div style={{ marginBottom: "1.25rem" }}>
// //               <h3 style={{ 
// //                 fontSize: "0.95rem", 
// //                 fontWeight: "500", 
// //                 marginBottom: "0.5rem", 
// //                 color: "#374151" 
// //               }}>
// //                 Quantity:
// //               </h3>
              
// //               <MOQIndicator>
// //                 {isWholesale 
// //                   ? `✓ Wholesale order (MOQ: ${product.moq}+ units) - You save $${(product.retailPrice - product.wholesalePrice) * quantity}`
// //                   : `Retail order - Add ${product.moq - quantity} more for wholesale pricing`
// //                 }
// //               </MOQIndicator>
// //             </div>

// //             {/* Quantity and Add to Cart - Side by Side */}
// //             <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.25rem", flexWrap: "wrap" }}>
// //               <div style={{ display: "flex", alignItems: "center", gap: "0.8rem" }}>
// //                 <div style={{ 
// //                   display: "flex", 
// //                   alignItems: "center", 
// //                   border: "1px solid #d1d5db", 
// //                   borderRadius: "4px", 
// //                   overflow: "hidden" 
// //                 }}>
// //                   <button 
// //                     style={{ 
// //                       width: "32px", 
// //                       height: "32px", 
// //                       background: "#f9fafb", 
// //                       border: "none", 
// //                       fontSize: "1.1rem", 
// //                       cursor: "pointer",
// //                       display: "flex",
// //                       alignItems: "center",
// //                       justifyContent: "center"
// //                     }}
// //                     onClick={handleDecrement}
// //                   >
// //                     -
// //                   </button>
// //                   <span style={{ 
// //                     width: "36px", 
// //                     textAlign: "center", 
// //                     fontWeight: "500",
// //                     fontSize: "0.95rem"
// //                   }}>
// //                     {quantity}
// //                   </span>
// //                   <button 
// //                     style={{ 
// //                       width: "32px", 
// //                       height: "32px", 
// //                       background: " #f9fafb", 
// //                       border: "none", 
// //                       fontSize: "1.1rem", 
// //                       cursor: "pointer",
// //                       display: "flex",
// //                       alignItems: "center",
// //                       justifyContent: "center"
// //                     }}
// //                     onClick={handleIncrement}
// //                   >
// //                     +
// //                   </button>
// //                 </div>
// //               </div>
              
// //               <Button 
// //                 variant="contained" 
// //                 style={{ 
// //                   backgroundColor: "#ef7921", 
// //                   color: "white", 
// //                   padding: "0.5rem 1rem", 
// //                   fontWeight: "500", 
// //                   textTransform: "uppercase",
// //                   fontSize: "0.9rem",
// //                   height: "40px",
// //                   flex: 1,
// //                   maxWidth: "200px"
// //                 }}
// //               >
// //                 ADD TO CART
// //               </Button>
// //             </div>
// //           </div>
// //         </div> 

// //         {/* Reviews Section */}
// //         <div style={{ marginTop: "3rem", borderTop: "1px solid #e5e7eb", paddingTop: "2rem" }}>
// //           <div 
// //             style={{ 
// //               display: "flex", 
// //               justifyContent: "space-between", 
// //               alignItems: "center", 
// //               cursor: "pointer",
// //               padding: "1rem",
// //               backgroundColor: "#f9fafb",
// //               borderRadius: "6px"
// //             }}
// //             onClick={toggleReviews}
// //           >
// //             <h2 style={{ margin: 0, fontSize: "1.25rem", color: "#374151" }}>
// //               Reviews & Ratings ({reviews.length})
// //             </h2>
// //             {showReviews ? <ExpandLessIcon /> : <ExpandMoreIcon />}
// //           </div>

// //           {showReviews && (
// //             <div style={{ padding: "1.5rem", border: "1px solid #e5e7eb", borderTop: "none", borderRadius: "0 0 6px 6px" }}>
// //               {/* Existing Reviews */}
// //               <div style={{ marginBottom: "2rem" }}>
// //                 <h3 style={{ marginBottom: "1rem", color: "#374151" }}>Customer Reviews</h3>
// //                 {reviews.length > 0 ? (
// //                   reviews.map((review) => (
// //                     <div key={review.id} style={{ padding: "1rem 0", borderBottom: "1px solid #f3f4f6" }}>
// //                       <div style={{ display: "flex", alignItems: "center", marginBottom: "0.5rem" }}>
// //                         <Avatar sx={{ width: 40, height: 40, marginRight: "1rem", backgroundColor: "#ef7921" }}>
// //                           {review.name.charAt(0)}
// //                         </Avatar>
// //                         <div>
// //                           <div style={{ fontWeight: "500" }}>{review.name}</div>
// //                           <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
// //                             <Rating value={review.rating} size="small" readOnly />
// //                             <span style={{ fontSize: "0.85rem", color: "#6b7280" }}>{review.date}</span>
// //                           </div>
// //                         </div>
// //                       </div>
// //                       <p style={{ margin: 0, color: "#4b5563" }}>{review.comment}</p>
// //                     </div>
// //                   ))
// //                 ) : (
// //                   <p style={{ color: "#6b7280" }}>No reviews yet. Be the first to review this product!</p>
// //                 )}
// //               </div>

// //               {/* Add Review Form */}
// //               <div>
// //                 <h3 style={{ marginBottom: "1rem", color: "#374151" }}>Add Your Review</h3>
// //                 <form onSubmit={handleSubmitReview}>
// //                   <div style={{ marginBottom: "1rem" }}>
// //                     <TextField
// //                       fullWidth
// //                       label="Your Name"
// //                       value={userName}
// //                       onChange={(e) => setUserName(e.target.value)}
// //                       size="small"
// //                       required
// //                     />
// //                   </div>
// //                   <div style={{ marginBottom: "1rem" }}>
// //                     <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.5rem" }}>
// //                       <span style={{ fontSize: "0.9rem" }}>Your Rating:</span>
// //                       <Rating
// //                         value={userRating}
// //                         onChange={(event, newValue) => {
// //                           setUserRating(newValue);
// //                         }}
// //                         size="medium"
// //                       />
// //                     </div>
// //                   </div>
// //                   <div style={{ marginBottom: "1rem" }}>
// //                     <TextField
// //                       fullWidth
// //                       multiline
// //                       rows={4}
// //                       label="Your Review"
// //                       value={reviewText}
// //                       onChange={(e) => setReviewText(e.target.value)}
// //                       required
// //                     />
// //                   </div>
// //                   <Button
// //                     type="submit"
// //                     variant="contained"
// //                     style={{ 
// //                       backgroundColor: "#ef7921", 
// //                       color: "white",
// //                     }}
// //                   >
// //                     Submit Review
// //                   </Button>
// //                 </form>
// //               </div>
// //             </div>
// //           )}
// //         </div>

// //         {/* Related Products Section with Improved Styling */}
// //         <SliderContainer>
// //           <h2 style={{ 
// //             fontSize: "1.5rem", 
// //             fontWeight: "600", 
// //             marginBottom: "1.5rem", 
// //             color: "#1f2937",
// //             paddingLeft: "10px"
// //           }}>
// //             Related Products
// //           </h2>
// //           <ProductsSlider items={6} />
// //         </SliderContainer>
// //       </section>
// //     </>
// //   );
// // };

// // export default ProductDetails;

















































// // import React, { useState } from 'react';
// // import Breadcrumbs from '@mui/material/Breadcrumbs';
// // import Link from '@mui/material/Link';
// // import Button from '@mui/material/Button';
// // import Rating from '@mui/material/Rating';
// // import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
// // import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
// // import LocalShippingIcon from '@mui/icons-material/LocalShipping';
// // import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
// // import ExpandLessIcon from '@mui/icons-material/ExpandLess';
// // import TextField from '@mui/material/TextField';
// // import Avatar from '@mui/material/Avatar';
// // import { styled } from '@mui/material/styles';
// // import ProductsSlider from '../../components/ProductsSlider';
// // import BusinessIcon from '@mui/icons-material/Business';
// // import StorefrontIcon from '@mui/icons-material/Storefront';

// // // Create a custom image component with zoom effect
// // const ZoomableImage = styled('div')(({ src }) => ({
// //   width: '100%',
// //   height: '100%',
// //   backgroundImage: `url(${src})`,
// //   backgroundSize: 'cover',
// //   backgroundPosition: 'center',
// //   transition: 'transform 0.5s ease',
// //   '&:hover': {
// //     transform: 'scale(1.5)',
// //     cursor: 'zoom-in'
// //   }
// // }));

// // // Custom styling for the ProductsSlider container
// // const SliderContainer = styled('div')({
// //   marginTop: '2rem',
// //   padding: '1.5rem 0',
// //   borderTop: '1px solid #e5e7eb',
  
// //   '& .slick-slide': {
// //     padding: '0 10px',
// //   },
  
// //   '& .product-item': {
// //     borderRadius: '8px',
// //     overflow: 'hidden',
// //     boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
// //     border: '1px solid #e5e7eb',
// //     backgroundColor: '#fff',
// //     transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    
// //     '&:hover': {
// //       transform: 'translateY(-5px)',
// //       boxShadow: '0 8px 20px rgba(0,0,0,0.15)',
// //     }
// //   },
  
// //   '& .product-image': {
// //     height: '200px',
// //     overflow: 'hidden',
// //     position: 'relative',
    
// //     '& img': {
// //       width: '100%',
// //       height: '100%',
// //       objectFit: 'cover',
// //       transition: 'transform 0.5s ease',
// //     },
    
// //     '&:hover img': {
// //       transform: 'scale(1.05)',
// //     }
// //   },
  
// //   '& .product-info': {
// //     padding: '1rem',
    
// //     '& h3': {
// //       fontSize: '14px',
// //       fontWeight: '500',
// //       margin: '0 0 0.5rem 0',
// //       color: '#374151',
// //       lineHeight: '1.3',
// //       height: '36px',
// //       overflow: 'hidden',
// //       textOverflow: 'ellipsis',
// //       display: '-webkit-box',
// //       WebkitLineClamp: 2,
// //       WebkitBoxOrient: 'vertical',
// //     },
    
// //     '& .price': {
// //       display: 'flex',
// //       alignItems: 'center',
// //       gap: '0.5rem',
// //       marginBottom: '0.5rem',
      
// //       '& .original-price': {
// //         fontSize: '14px',
// //         color: '#6b7280',
// //         textDecoration: 'line-through',
// //       },
      
// //       '& .discounted-price': {
// //         fontSize: '16px',
// //         fontWeight: '600',
// //         color: '#ef7921',
// //       }
// //     },
    
// //     '& .rating': {
// //       marginBottom: '0.5rem',
// //     }
// //   }
// // });

// // // Styled components for wholesale features
// // const PricingTier = styled('div')({
// //   display: "flex",
// //   alignItems: "center",
// //   gap: "0.5rem",
// //   marginBottom: "0.5rem",
// //   padding: "0.5rem",
// //   borderRadius: "4px",
// //   backgroundColor: "#f8f9fa",
// //   fontSize: "0.9rem",
// // });

// // const TierBadge = styled('span')(({ type }) => ({
// //   padding: "0.25rem 0.5rem",
// //   borderRadius: "4px",
// //   fontSize: "0.75rem",
// //   fontWeight: "600",
// //   backgroundColor: type === 'wholesale' ? "#ef7921" : "#6b7280",
// //   color: "white",
// //   display: "flex",
// //   alignItems: "center",
// //   gap: "0.25rem",
// // }));

// // const MOQIndicator = styled('div')({
// //   fontSize: "0.85rem",
// //   color: "#6b7280",
// //   marginTop: "0.5rem",
// //   padding: "0.5rem",
// //   backgroundColor: "#f8f9fa",
// //   borderRadius: "4px",
// //   border: "1px solid #e5e7eb",
// // });

// // const ProductDetails = () => {
// //   const [selectedColor, setSelectedColor] = useState('red');
// //   const [selectedSize, setSelectedSize] = useState('m');
// //   const [quantity, setQuantity] = useState(1);
// //   const [activeImage, setActiveImage] = useState('/src/assets/images/grocery.jpg');
// //   const [isHovered, setIsHovered] = useState(false);
// //   const [position, setPosition] = useState({ x: 0, y: 0 });
// //   const [showReviews, setShowReviews] = useState(false);
// //   const [userRating, setUserRating] = useState(0);
// //   const [reviewText, setReviewText] = useState('');
// //   const [userName, setUserName] = useState('');
// //   const [reviews, setReviews] = useState([
// //     {
// //       id: 1,
// //       name: 'Sarah Johnson',
// //       rating: 5,
// //       comment: 'Absolutely love this saree! The quality is exceptional and it looks even better in person.',
// //       date: '2023-10-15'
// //     },
// //     {
// //       id: 2,
// //       name: 'Michael Chen',
// //       rating: 4,
// //       comment: 'Good product, but the delivery took longer than expected. The saree itself is beautiful.',
// //       date: '2023-09-22'
// //     }
// //   ]);

// //   // Product data with wholesale/retail pricing
// //   const product = {
// //     name: "Embellished Sequinned Ready to Wear Saree",
// //     description: "Premium quality saree with elegant sequin embellishments. Perfect for weddings, parties, and festive occasions. Made from high-quality fabric that ensures comfort and durability.",
// //     retailPrice: 2450,
// //     originalRetailPrice: 2650,
// //     wholesalePrice: 2200,
// //     moq: 5,
// //     stock: 8556,
// //     brand: "Tikhi Inili",
// //     images: [
// //       '/src/assets/images/grocery.jpg',
// //       '/src/assets/images/fashion.jpg',
// //       '/src/assets/images/handbag.jpg'
// //     ],
// //   };

// //   const isWholesale = quantity >= product.moq;
// //   const currentPrice = isWholesale ? product.wholesalePrice : product.retailPrice;
// //   const priceDisplay = isWholesale ? product.wholesalePrice : product.retailPrice;
// //   const totalPrice = quantity * currentPrice;

// //   const handleIncrement = () => {
// //     setQuantity(prev => prev + 1);
// //   };

// //   const handleDecrement = () => {
// //     if (quantity > 1) {
// //       setQuantity(prev => prev - 1);
// //     }
// //   };

// //   const handleThumbnailClick = (image) => {
// //     setActiveImage(image);
// //   };

// //   const handleMouseMove = (e) => {
// //     const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
// //     const x = ((e.clientX - left) / width) * 100;
// //     const y = ((e.clientY - top) / height) * 100;
// //     setPosition({ x, y });
// //   };

// //   const toggleReviews = () => {
// //     setShowReviews(!showReviews);
// //   };

// //   const handleSubmitReview = (e) => {
// //     e.preventDefault();
// //     if (userRating === 0 || !reviewText.trim() || !userName.trim()) {
// //       alert('Please provide a rating, your name, and a review comment.');
// //       return;
// //     }

// //     const newReview = {
// //       id: reviews.length + 1,
// //       name: userName,
// //       rating: userRating,
// //       comment: reviewText,
// //       date: new Date().toISOString().split('T')[0]
// //     };

// //     setReviews([...reviews, newReview]);
// //     setUserRating(0);
// //     setReviewText('');
// //     setUserName('');
// //     alert('Thank you for your review!');
// //   };

// //   // Calculate average rating
// //   const averageRating = reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length;

// //   return (
// //     <>
// //       <section style={{ padding: "2rem 0", maxWidth: "1200px", margin: "0 auto", fontFamily: "Arial, sans-serif" }}>
// //         {/* Breadcrumb */}
// //         <Breadcrumbs aria-label="breadcrumb" style={{ marginBottom: "1.5rem" }}>
// //           <Link 
// //             underline="hover" 
// //             color="inherit" 
// //             href="/"
// //             style={{ fontSize: "14px", textDecoration: "none", color: "#6b7280" }}
// //           >
// //             Home
// //           </Link>
// //           <Link
// //             underline="hover"
// //             color="inherit"
// //             href="/"
// //             style={{ fontSize: "14px", textDecoration: "none", color: "#6b7280" }}
// //           >
// //             Fashion
// //           </Link>
// //           <Link
// //             underline="hover"
// //             color="text.primary"
// //             href="/"
// //             style={{ fontSize: "14px", textDecoration: "none", color: "#ef7921" }}
// //           >
// //             Sarees
// //           </Link>
// //         </Breadcrumbs>
     
// //         <div style={{ display: "flex", gap: "2rem", flexWrap: "wrap" }}>
// //           {/* Product Images - 30% width */}
// //           <div style={{ flex: "0 0 30%", minWidth: "300px" }}>
// //             <div 
// //               style={{ 
// //                 border: "1px solid #e5e7eb", 
// //                 borderRadius: "6px", 
// //                 overflow: "hidden",
// //                 marginBottom: "1rem",
// //                 height: "350px",
// //                 position: "relative"
// //               }}
// //               onMouseEnter={() => setIsHovered(true)}
// //               onMouseLeave={() => setIsHovered(false)}
// //               onMouseMove={handleMouseMove}
// //             >
// //               <div
// //                 style={{
// //                   width: '100%',
// //                   height: '100%',
// //                   overflow: 'hidden',
// //                   position: 'relative'
// //                 }}
// //               >
// //                 <img 
// //                   src={activeImage} 
// //                   alt="Product"
// //                   style={{ 
// //                     width: "100%", 
// //                     height: "100%", 
// //                     objectFit: "cover",
// //                     display: "block",
// //                     transform: isHovered ? 'scale(1.5)' : 'scale(1)',
// //                     transformOrigin: `${position.x}% ${position.y}%`,
// //                     transition: isHovered ? 'transform 0.1s ease' : 'none'
// //                   }}
// //                 />
// //               </div>
// //               {isHovered && (
// //                 <div style={{
// //                   position: 'absolute',
// //                   top: 0,
// //                   left: 0,
// //                   width: '100%',
// //                   height: '100%',
// //                   pointerEvents: 'none',
// //                   background: 'rgba(255, 255, 255, 0.1)'
// //                 }} />
// //               )}
// //             </div>
            
// //             {/* Additional thumbnails */}
// //             <div style={{ display: "flex", gap: "0.75rem", justifyContent: "center" }}>
// //               {product.images.map((image, index) => (
// //                 <div 
// //                   key={index}
// //                   style={{ 
// //                     width: "60px", 
// //                     height: "60px", 
// //                     border: activeImage === image ? "2px solid #ef7921" : "2px solid #e5e7eb", 
// //                     borderRadius: "6px", 
// //                     overflow: "hidden",
// //                     cursor: "pointer"
// //                   }}
// //                   onClick={() => handleThumbnailClick(image)}
// //                 >
// //                   <img 
// //                     src={image} 
// //                     alt={`Thumbnail ${index + 1}`}
// //                     style={{ width: "100%", height: "100%", objectFit: "cover" }}
// //                   />
// //                 </div>
// //               ))}
// //             </div>
// //           </div>

// //           {/* Product Info - 70% width */}
// //           <div style={{ flex: "1", minWidth: "300px" }}>
// //             <h1 style={{ 
// //               fontSize: "1.5rem", 
// //               fontWeight: "600", 
// //               marginBottom: "0.75rem", 
// //               color: "#1f2937",
// //               lineHeight: "1.2"
// //             }}>
// //               {product.name}
// //             </h1>
            
// //             <div style={{ display: "flex", alignItems: "center", gap: "1.5rem", marginBottom: "0.75rem" }}>
// //               <span style={{ fontSize: "0.9rem", color: "#6b7280" }}>
// //                 Brand: <strong style={{ color: "#374151" }}>{product.brand}</strong>
// //               </span>
// //               <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
// //                 <Rating value={averageRating} precision={0.1} size="small" readOnly />
// //                 <span 
// //                   style={{ fontSize: "0.9rem", color: "#6b7280", cursor: "pointer" }}
// //                   onClick={toggleReviews}
// //                 >
// //                   ({reviews.length} reviews)
// //                 </span>
// //               </div>
// //             </div>

// //             {/* Pricing Section with Wholesale/Retail */}
// //             <div style={{ marginBottom: "1.25rem" }}>
// //               <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "0.5rem" }}>
// //                 <span style={{ 
// //                   fontSize: "1.1rem", 
// //                   color: "#6b7280", 
// //                   textDecoration: "line-through" 
// //                 }}>
// //                   ${product.originalRetailPrice}
// //                 </span>
// //                 <span style={{ 
// //                   fontSize: "1.35rem", 
// //                   fontWeight: "600", 
// //                   color: "#ef7921" 
// //                 }}>
// //                   ${priceDisplay}
// //                 </span>
// //                 {isWholesale && (
// //                   <TierBadge type="wholesale">
// //                     <BusinessIcon fontSize="small" /> Wholesale
// //                   </TierBadge>
// //                 )}
// //                 <span style={{ 
// //                   fontSize: "0.85rem", 
// //                   color: "#10b981", 
// //                   marginLeft: "auto" 
// //                 }}>
// //                   Available in Stock: {product.stock} Items
// //                 </span>
// //               </div>

// //               {/* Wholesale Pricing Info */}
// //               {quantity < product.moq && (
// //                 <PricingTier>
// //                   <StorefrontIcon fontSize="small" />
// //                   <span>Buy {product.moq}+ units for wholesale pricing: </span>
// //                   <strong>${product.wholesalePrice} each</strong>
// //                 </PricingTier>
// //               )}
// //             </div>

// //             <p style={{ 
// //               color: "#6b7280", 
// //               lineHeight: "1.5", 
// //               marginBottom: "1.25rem",
// //               fontSize: "0.9rem"
// //             }}>
// //               {product.description}
// //             </p>

// //             <div style={{ 
// //               display: "flex", 
// //               alignItems: "center", 
// //               gap: "0.5rem", 
// //               padding: "0.6rem", 
// //               backgroundColor: "#f3f4f6", 
// //               borderRadius: "6px", 
// //               marginBottom: "1.25rem",
// //               fontSize: "0.85rem",
// //               color: "#374151"
// //             }}>
// //               <LocalShippingIcon fontSize="small" />
// //               <span>Free Shipping (Est. Delivery Time 2-3 Days)</span>
// //             </div>

// //             {/* Color Selection */}
// //             <div style={{ marginBottom: "1.25rem" }}>
// //               <h3 style={{ 
// //                 fontSize: "0.95rem", 
// //                 fontWeight: "500", 
// //                 marginBottom: "0.5rem", 
// //                 color: "#374151" 
// //               }}>
// //                 Color:
// //               </h3>
// //               <div style={{ display: "flex", gap: "0.6rem" }}>
// //                 <div 
// //                   style={{
// //                     width: "28px",
// //                     height: "28px",
// //                     borderRadius: "50%",
// //                     backgroundColor: "#e53935",
// //                     cursor: "pointer",
// //                     border: selectedColor === 'red' ? "2px solid #ef7921" : "2px solid transparent",
// //                     boxShadow: selectedColor === 'red' ? "0 0 0 2px rgba(239, 121, 33, 0.3)" : "none"
// //                   }}
// //                   onClick={() => setSelectedColor('red')}
// //                 ></div>
// //                 <div 
// //                   style={{
// //                     width: "28px",
// //                     height: "28px",
// //                     borderRadius: "50%",
// //                     backgroundColor: "#1e88e5",
// //                     cursor: "pointer",
// //                     border: selectedColor === 'blue' ? "2px solid #ef7921" : "2px solid transparent",
// //                     boxShadow: selectedColor === 'blue' ? "0 0 0 2px rgba(239, 121, 33, 0.3)" : "none"
// //                   }}
// //                   onClick={() => setSelectedColor('blue')}
// //                 ></div>
// //                 <div 
// //                   style={{
// //                     width: "28px",
// //                     height: "28px",
// //                     borderRadius: "50%",
// //                     backgroundColor: "#43a047",
// //                     cursor: "pointer",
// //                     border: selectedColor === 'green' ? "2px solid #ef7921" : "2px solid transparent",
// //                     boxShadow: selectedColor === 'green' ? "0 0 0 2px rgba(239, 121, 33, 0.3)" : "none"
// //                   }}
// //                   onClick={() => setSelectedColor('green')}
// //                 ></div>
// //               </div>
// //             </div>

// //             {/* Size, Wishlist and Compare - Side by Side */}
// //             <div style={{ display: "flex", gap: "1rem", marginBottom: "1.25rem", alignItems: "flex-start", flexWrap: "wrap" }}>
// //               {/* Size Selection */}
// //               <div style={{ flex: "1", minWidth: "200px" }}>
// //                 <h3 style={{ 
// //                   fontSize: "0.95rem", 
// //                   fontWeight: "500", 
// //                   marginBottom: "0.5rem", 
// //                   color: "#374151" 
// //                 }}>
// //                   Size:
// //                 </h3>
// //                 <div style={{ display: "flex", gap: "0.6rem" }}>
// //                   {['s', 'm', 'l', 'xl'].map(size => (
// //                     <div 
// //                       key={size}
// //                       style={{
// //                         width: "36px",
// //                         height: "36px",
// //                         display: "flex",
// //                         alignItems: "center",
// //                         justifyContent: "center",
// //                         border: selectedSize === size ? "1px solid #ef7921" : "1px solid #d1d5db",
// //                         borderRadius: "4px",
// //                         cursor: "pointer",
// //                         fontWeight: "500",
// //                         fontSize: "0.9rem",
// //                         backgroundColor: selectedSize === size ? "rgba(239, 121, 33, 0.1)" : "transparent",
// //                         color: selectedSize === size ? "#ef7921" : "#374151"
// //                       }}
// //                       onClick={() => setSelectedSize(size)}
// //                     >
// //                       {size.toUpperCase()}
// //                     </div>
// //                   ))}
// //                 </div>
// //               </div>
              
// //               {/* Wishlist and Compare Buttons */}
// //               <div style={{ flex: "1", display: "flex", gap: "0.5rem", marginTop: "1.5rem", minWidth: "200px" }}>
// //                 <Button 
// //                   variant="outlined" 
// //                   startIcon={<FavoriteBorderIcon />}
// //                   style={{ 
// //                     borderColor: "#d1d5db", 
// //                     color: "#4b5563",
// //                     fontSize: "0.85rem",
// //                     padding: "0.4rem 0.8rem",
// //                     flex: 1
// //                   }}
// //                 >
// //                   Wishlist
// //                 </Button>
// //                 <Button 
// //                   variant="outlined" 
// //                   startIcon={<CompareArrowsIcon />}
// //                   style={{ 
// //                     borderColor: "#d1d5db", 
// //                     color: "#4b5563",
// //                     fontSize: "0.85rem",
// //                     padding: "0.4rem 0.8rem",
// //                     flex: 1
// //                   }}
// //                 >
// //                   Compare
// //                 </Button>
// //               </div>
// //             </div>

// //             {/* Quantity Section with MOQ Indicator */}
// //             <div style={{ marginBottom: "1.25rem" }}>
// //               <h3 style={{ 
// //                 fontSize: "0.95rem", 
// //                 fontWeight: "500", 
// //                 marginBottom: "0.5rem", 
// //                 color: "#374151" 
// //               }}>
// //                 Quantity:
// //               </h3>
              
// //               <MOQIndicator>
// //                 {isWholesale 
// //                   ? `✓ Wholesale order (MOQ: ${product.moq}+ units) - You save $${(product.retailPrice - product.wholesalePrice) * quantity}`
// //                   : `Retail order - Add ${product.moq - quantity} more for wholesale pricing`
// //                 }
// //               </MOQIndicator>
// //             </div>

// //             {/* Quantity and Add to Cart - Side by Side */}
// //             <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.25rem", flexWrap: "wrap" }}>
// //               <div style={{ display: "flex", alignItems: "center", gap: "0.8rem" }}>
// //                 <div style={{ 
// //                   display: "flex", 
// //                   alignItems: "center", 
// //                   border: "1px solid #d1d5db", 
// //                   borderRadius: "4px", 
// //                   overflow: "hidden" 
// //                 }}>
// //                   <button 
// //                     style={{ 
// //                       width: "32px", 
// //                       height: "32px", 
// //                       background: "#f9fafb", 
// //                       border: "none", 
// //                       fontSize: "1.1rem", 
// //                       cursor: "pointer",
// //                       display: "flex",
// //                       alignItems: "center",
// //                       justifyContent: "center"
// //                     }}
// //                     onClick={handleDecrement}
// //                   >
// //                     -
// //                   </button>
// //                   <span style={{ 
// //                     width: "36px", 
// //                     textAlign: "center", 
// //                     fontWeight: "500",
// //                     fontSize: "0.95rem"
// //                   }}>
// //                     {quantity}
// //                   </span>
// //                   <button 
// //                     style={{ 
// //                       width: "32px", 
// //                       height: "32px", 
// //                       background: " #f9fafb", 
// //                       border: "none", 
// //                       fontSize: "1.1rem", 
// //                       cursor: "pointer",
// //                       display: "flex",
// //                       alignItems: "center",
// //                       justifyContent: "center"
// //                     }}
// //                     onClick={handleIncrement}
// //                   >
// //                     +
// //                   </button>
// //                 </div>
// //               </div>
              
// //               <Button 
// //                 variant="contained" 
// //                 style={{ 
// //                   backgroundColor: "#ef7921", 
// //                   color: "white", 
// //                   padding: "0.5rem 1rem", 
// //                   fontWeight: "500", 
// //                   textTransform: "uppercase",
// //                   fontSize: "0.9rem",
// //                   height: "40px",
// //                   flex: 1,
// //                   maxWidth: "200px"
// //                 }}
// //               >
// //                 ADD TO CART (${totalPrice.toFixed(2)})
// //               </Button>
// //             </div>
// //           </div>
// //         </div> 

// //         {/* Reviews Section */}
// //         <div style={{ marginTop: "3rem", borderTop: "1px solid #e5e7eb", paddingTop: "2rem" }}>
// //           <div 
// //             style={{ 
// //               display: "flex", 
// //               justifyContent: "space-between", 
// //               alignItems: "center", 
// //               cursor: "pointer",
// //               padding: "1rem",
// //               backgroundColor: "#f9fafb",
// //               borderRadius: "6px"
// //             }}
// //             onClick={toggleReviews}
// //           >
// //             <h2 style={{ margin: 0, fontSize: "1.25rem", color: "#374151" }}>
// //               Reviews & Ratings ({reviews.length})
// //             </h2>
// //             {showReviews ? <ExpandLessIcon /> : <ExpandMoreIcon />}
// //           </div>

// //           {showReviews && (
// //             <div style={{ padding: "1.5rem", border: "1px solid #e5e7eb", borderTop: "none", borderRadius: "0 0 6px 6px" }}>
// //               {/* Existing Reviews */}
// //               <div style={{ marginBottom: "2rem" }}>
// //                 <h3 style={{ marginBottom: "1rem", color: "#374151" }}>Customer Reviews</h3>
// //                 {reviews.length > 0 ? (
// //                   reviews.map((review) => (
// //                     <div key={review.id} style={{ padding: "1rem 0", borderBottom: "1px solid #f3f4f6" }}>
// //                       <div style={{ display: "flex", alignItems: "center", marginBottom: "0.5rem" }}>
// //                         <Avatar sx={{ width: 40, height: 40, marginRight: "1rem", backgroundColor: "#ef7921" }}>
// //                           {review.name.charAt(0)}
// //                         </Avatar>
// //                         <div>
// //                           <div style={{ fontWeight: "500" }}>{review.name}</div>
// //                           <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
// //                             <Rating value={review.rating} size="small" readOnly />
// //                             <span style={{ fontSize: "0.85rem", color: "#6b7280" }}>{review.date}</span>
// //                           </div>
// //                         </div>
// //                       </div>
// //                       <p style={{ margin: 0, color: "#4b5563" }}>{review.comment}</p>
// //                     </div>
// //                   ))
// //                 ) : (
// //                   <p style={{ color: "#6b7280" }}>No reviews yet. Be the first to review this product!</p>
// //                 )}
// //               </div>

// //               {/* Add Review Form */}
// //               <div>
// //                 <h3 style={{ marginBottom: "1rem", color: "#374151" }}>Add Your Review</h3>
// //                 <form onSubmit={handleSubmitReview}>
// //                   <div style={{ marginBottom: "1rem" }}>
// //                     <TextField
// //                       fullWidth
// //                       label="Your Name"
// //                       value={userName}
// //                       onChange={(e) => setUserName(e.target.value)}
// //                       size="small"
// //                       required
// //                     />
// //                   </div>
// //                   <div style={{ marginBottom: "1rem" }}>
// //                     <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.5rem" }}>
// //                       <span style={{ fontSize: "0.9rem" }}>Your Rating:</span>
// //                       <Rating
// //                         value={userRating}
// //                         onChange={(event, newValue) => {
// //                           setUserRating(newValue);
// //                         }}
// //                         size="medium"
// //                       />
// //                     </div>
// //                   </div>
// //                   <div style={{ marginBottom: "1rem" }}>
// //                     <TextField
// //                       fullWidth
// //                       multiline
// //                       rows={4}
// //                       label="Your Review"
// //                       value={reviewText}
// //                       onChange={(e) => setReviewText(e.target.value)}
// //                       required
// //                     />
// //                   </div>
// //                   <Button
// //                     type="submit"
// //                     variant="contained"
// //                     style={{ 
// //                       backgroundColor: "#ef7921", 
// //                       color: "white",
// //                     }}
// //                   >
// //                     Submit Review
// //                   </Button>
// //                 </form>
// //               </div>
// //             </div>
// //           )}
// //         </div>

// //         {/* Related Products Section with Improved Styling */}
// //         <SliderContainer>
// //           <h2 style={{ 
// //             fontSize: "1.5rem", 
// //             fontWeight: "600", 
// //             marginBottom: "1.5rem", 
// //             color: "#1f2937",
// //             paddingLeft: "10px"
// //           }}>
// //             Related Products
// //           </h2>
// //           <ProductsSlider items={6} />
// //         </SliderContainer>
// //       </section>
// //     </>
// //   );
// // };

// // export default ProductDetails;


























































// // import React, { useState } from 'react';
// // import Breadcrumbs from '@mui/material/Breadcrumbs';
// // import Link from '@mui/material/Link';
// // import Button from '@mui/material/Button';
// // import Rating from '@mui/material/Rating';
// // import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
// // import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
// // import LocalShippingIcon from '@mui/icons-material/LocalShipping';
// // import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
// // import ExpandLessIcon from '@mui/icons-material/ExpandLess';
// // import TextField from '@mui/material/TextField';
// // import Avatar from '@mui/material/Avatar';
// // import { styled } from '@mui/material/styles';
// // import ProductsSlider from '../../components/ProductsSlider';

// // // Create a custom image component with zoom effect
// // const ZoomableImage = styled('div')(({ src }) => ({
// //   width: '100%',
// //   height: '100%',
// //   backgroundImage: `url(${src})`,
// //   backgroundSize: 'cover',
// //   backgroundPosition: 'center',
// //   transition: 'transform 0.5s ease',
// //   '&:hover': {
// //     transform: 'scale(1.5)',
// //     cursor: 'zoom-in'
// //   }
// // }));

// // // Custom styling for the ProductsSlider container
// // const SliderContainer = styled('div')({
// //   marginTop: '2rem',
// //   padding: '1.5rem 0',
// //   borderTop: '1px solid #e5e7eb',
  
// //   '& .slick-slide': {
// //     padding: '0 10px',
// //   },
  
// //   '& .product-item': {
// //     borderRadius: '8px',
// //     overflow: 'hidden',
// //     boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
// //     border: '1px solid #e5e7eb',
// //     backgroundColor: '#fff',
// //     transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    
// //     '&:hover': {
// //       transform: 'translateY(-5px)',
// //       boxShadow: '0 8px 20px rgba(0,0,0,0.15)',
// //     }
// //   },
  
// //   '& .product-image': {
// //     height: '200px',
// //     overflow: 'hidden',
// //     position: 'relative',
    
// //     '& img': {
// //       width: '100%',
// //       height: '100%',
// //       objectFit: 'cover',
// //       transition: 'transform 0.5s ease',
// //     },
    
// //     '&:hover img': {
// //       transform: 'scale(1.05)',
// //     }
// //   },
  
// //   '& .product-info': {
// //     padding: '1rem',
    
// //     '& h3': {
// //       fontSize: '14px',
// //       fontWeight: '500',
// //       margin: '0 0 0.5rem 0',
// //       color: '#374151',
// //       lineHeight: '1.3',
// //       height: '36px',
// //       overflow: 'hidden',
// //       textOverflow: 'ellipsis',
// //       display: '-webkit-box',
// //       WebkitLineClamp: 2,
// //       WebkitBoxOrient: 'vertical',
// //     },
    
// //     '& .price': {
// //       display: 'flex',
// //       alignItems: 'center',
// //       gap: '0.5rem',
// //       marginBottom: '0.5rem',
      
// //       '& .original-price': {
// //         fontSize: '14px',
// //         color: '#6b7280',
// //         textDecoration: 'line-through',
// //       },
      
// //       '& .discounted-price': {
// //         fontSize: '16px',
// //         fontWeight: '600',
// //         color: '#ef7921',
// //       }
// //     },
    
// //     '& .rating': {
// //       marginBottom: '0.5rem',
// //     }
// //   }
// // });

// // const ProductDetails = () => {
// //   const [selectedColor, setSelectedColor] = useState('red');
// //   const [selectedSize, setSelectedSize] = useState('m');
// //   const [quantity, setQuantity] = useState(1);
// //   const [activeImage, setActiveImage] = useState('/src/assets/images/grocery.jpg');
// //   const [isHovered, setIsHovered] = useState(false);
// //   const [position, setPosition] = useState({ x: 0, y: 0 });
// //   const [showReviews, setShowReviews] = useState(false);
// //   const [userRating, setUserRating] = useState(0);
// //   const [reviewText, setReviewText] = useState('');
// //   const [userName, setUserName] = useState('');
// //   const [reviews, setReviews] = useState([
// //     {
// //       id: 1,
// //       name: 'Sarah Johnson',
// //       rating: 5,
// //       comment: 'Absolutely love this saree! The quality is exceptional and it looks even better in person.',
// //       date: '2023-10-15'
// //     },
// //     {
// //       id: 2,
// //       name: 'Michael Chen',
// //       rating: 4,
// //       comment: 'Good product, but the delivery took longer than expected. The saree itself is beautiful.',
// //       date: '2023-09-22'
// //     }
// //   ]);

// //   const handleIncrement = () => {
// //     setQuantity(prev => prev + 1);
// //   };

// //   const handleDecrement = () => {
// //     if (quantity > 1) {
// //       setQuantity(prev => prev - 1);
// //     }
// //   };

// //   const handleThumbnailClick = (image) => {
// //     setActiveImage(image);
// //   };

// //   const handleMouseMove = (e) => {
// //     const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
// //     const x = ((e.clientX - left) / width) * 100;
// //     const y = ((e.clientY - top) / height) * 100;
// //     setPosition({ x, y });
// //   };

// //   const toggleReviews = () => {
// //     setShowReviews(!showReviews);
// //   };

// //   const handleSubmitReview = (e) => {
// //     e.preventDefault();
// //     if (userRating === 0 || !reviewText.trim() || !userName.trim()) {
// //       alert('Please provide a rating, your name, and a review comment.');
// //       return;
// //     }

// //     const newReview = {
// //       id: reviews.length + 1,
// //       name: userName,
// //       rating: userRating,
// //       comment: reviewText,
// //       date: new Date().toISOString().split('T')[0]
// //     };

// //     setReviews([...reviews, newReview]);
// //     setUserRating(0);
// //     setReviewText('');
// //     setUserName('');
// //     alert('Thank you for your review!');
// //   };

// //   // Sample images (replace with your actual image paths)
// //   const images = [
// //     '/src/assets/images/grocery.jpg',
// //     '/src/assets/images/fashion.jpg',
// //     '/src/assets/images/handbag.jpg'
// //   ];

// //   // Calculate average rating
// //   const averageRating = reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length;

// //   return (
// //     <>
// //       <section style={{ padding: "2rem 0", maxWidth: "1200px", margin: "0 auto", fontFamily: "Arial, sans-serif" }}>
// //         {/* Breadcrumb */}
// //         <Breadcrumbs aria-label="breadcrumb" style={{ marginBottom: "1.5rem" }}>
// //           <Link 
// //             underline="hover" 
// //             color="inherit" 
// //             href="/"
// //             style={{ fontSize: "14px", textDecoration: "none", color: "#6b7280" }}
// //           >
// //             Home
// //           </Link>
// //           <Link
// //             underline="hover"
// //             color="inherit"
// //             href="/"
// //             style={{ fontSize: "14px", textDecoration: "none", color: "#6b7280" }}
// //           >
// //             Fashion
// //           </Link>
// //           <Link
// //             underline="hover"
// //             color="text.primary"
// //             href="/"
// //             style={{ fontSize: "14px", textDecoration: "none", color: "#ef7921" }}
// //           >
// //             Sarees
// //           </Link>
// //         </Breadcrumbs>
     
// //         <div style={{ display: "flex", gap: "2rem", flexWrap: "wrap" }}>
// //           {/* Product Images - 30% width */}
// //           <div style={{ flex: "0 0 30%", minWidth: "300px" }}>
// //             <div 
// //               style={{ 
// //                 border: "1px solid #e5e7eb", 
// //                 borderRadius: "6px", 
// //                 overflow: "hidden",
// //                 marginBottom: "1rem",
// //                 height: "350px",
// //                 position: "relative"
// //               }}
// //               onMouseEnter={() => setIsHovered(true)}
// //               onMouseLeave={() => setIsHovered(false)}
// //               onMouseMove={handleMouseMove}
// //             >
// //               <div
// //                 style={{
// //                   width: '100%',
// //                   height: '100%',
// //                   overflow: 'hidden',
// //                   position: 'relative'
// //                 }}
// //               >
// //                 <img 
// //                   src={activeImage} 
// //                   alt="Product"
// //                   style={{ 
// //                     width: "100%", 
// //                     height: "100%", 
// //                     objectFit: "cover",
// //                     display: "block",
// //                     transform: isHovered ? 'scale(1.5)' : 'scale(1)',
// //                     transformOrigin: `${position.x}% ${position.y}%`,
// //                     transition: isHovered ? 'transform 0.1s ease' : 'none'
// //                   }}
// //                 />
// //               </div>
// //               {isHovered && (
// //                 <div style={{
// //                   position: 'absolute',
// //                   top: 0,
// //                   left: 0,
// //                   width: '100%',
// //                   height: '100%',
// //                   pointerEvents: 'none',
// //                   background: 'rgba(255, 255, 255, 0.1)'
// //                 }} />
// //               )}
// //             </div>
            
// //             {/* Additional thumbnails */}
// //             <div style={{ display: "flex", gap: "0.75rem", justifyContent: "center" }}>
// //               {images.map((image, index) => (
// //                 <div 
// //                   key={index}
// //                   style={{ 
// //                     width: "60px", 
// //                     height: "60px", 
// //                     border: activeImage === image ? "2px solid #ef7921" : "2px solid #e5e7eb", 
// //                     borderRadius: "6px", 
// //                     overflow: "hidden",
// //                     cursor: "pointer"
// //                   }}
// //                   onClick={() => handleThumbnailClick(image)}
// //                 >
// //                   <img 
// //                     src={image} 
// //                     alt={`Thumbnail ${index + 1}`}
// //                     style={{ width: "100%", height: "100%", objectFit: "cover" }}
// //                   />
// //                 </div>
// //               ))}
// //             </div>
// //           </div>

// //           {/* Product Info - 70% width */}
// //           <div style={{ flex: "1", minWidth: "300px" }}>
// //             <h1 style={{ 
// //               fontSize: "1.5rem", 
// //               fontWeight: "600", 
// //               marginBottom: "0.75rem", 
// //               color: "#1f2937",
// //               lineHeight: "1.2"
// //             }}>
// //               Embellished Sequinned Ready to Wear Saree
// //             </h1>
            
// //             <div style={{ display: "flex", alignItems: "center", gap: "1.5rem", marginBottom: "0.75rem" }}>
// //               <span style={{ fontSize: "0.9rem", color: "#6b7280" }}>
// //                 Brand: <strong style={{ color: "#374151" }}>Tikhi Inili</strong>
// //               </span>
// //               <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
// //                 <Rating value={averageRating} precision={0.1} size="small" readOnly />
// //                 <span 
// //                   style={{ fontSize: "0.9rem", color: "#6b7280", cursor: "pointer" }}
// //                   onClick={toggleReviews}
// //                 >
// //                   ({reviews.length} reviews)
// //                 </span>
// //               </div>
// //             </div>

// //             <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.25rem" }}>
// //               <span style={{ 
// //                 fontSize: "1.1rem", 
// //                 color: "#6b7280", 
// //                 textDecoration: "line-through" 
// //               }}>
// //                 $2650
// //               </span>
// //               <span style={{ 
// //                 fontSize: "1.35rem", 
// //                 fontWeight: "600", 
// //                 color: "#ef7921" 
// //               }}>
// //                 $2450
// //               </span>
// //               <span style={{ 
// //                 fontSize: "0.85rem", 
// //                 color: "#10b981", 
// //                 marginLeft: "auto" 
// //               }}>
// //                 Available in Stock: 8556 Items
// //               </span>
// //             </div>

// //             <p style={{ 
// //               color: "#6b7280", 
// //               lineHeight: "1.5", 
// //               marginBottom: "1.25rem",
// //               fontSize: "0.9rem"
// //             }}>
// //               Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
// //               Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
// //               when an unknown printer took a galley of type and scrambled it to make a type specimen book.
// //             </p>

// //             <div style={{ 
// //               display: "flex", 
// //               alignItems: "center", 
// //               gap: "0.5rem", 
// //               padding: "0.6rem", 
// //               backgroundColor: "#f3f4f6", 
// //               borderRadius: "6px", 
// //               marginBottom: "1.25rem",
// //               fontSize: "0.85rem",
// //               color: "#374151"
// //             }}>
// //               <LocalShippingIcon fontSize="small" />
// //               <span>Free Shipping (Est. Delivery Time 2-3 Days)</span>
// //             </div>

// //             {/* Color Selection */}
// //             <div style={{ marginBottom: "1.25rem" }}>
// //               <h3 style={{ 
// //                 fontSize: "0.95rem", 
// //                 fontWeight: "500", 
// //                 marginBottom: "0.5rem", 
// //                 color: "#374151" 
// //               }}>
// //                 Color:
// //               </h3>
// //               <div style={{ display: "flex", gap: "0.6rem" }}>
// //                 <div 
// //                   style={{
// //                     width: "28px",
// //                     height: "28px",
// //                     borderRadius: "50%",
// //                     backgroundColor: "#e53935",
// //                     cursor: "pointer",
// //                     border: selectedColor === 'red' ? "2px solid #ef7921" : "2px solid transparent",
// //                     boxShadow: selectedColor === 'red' ? "0 0 0 2px rgba(239, 121, 33, 0.3)" : "none"
// //                   }}
// //                   onClick={() => setSelectedColor('red')}
// //                 ></div>
// //                 <div 
// //                   style={{
// //                     width: "28px",
// //                     height: "28px",
// //                     borderRadius: "50%",
// //                     backgroundColor: "#1e88e5",
// //                     cursor: "pointer",
// //                     border: selectedColor === 'blue' ? "2px solid #ef7921" : "2px solid transparent",
// //                     boxShadow: selectedColor === 'blue' ? "0 0 0 2px rgba(239, 121, 33, 0.3)" : "none"
// //                   }}
// //                   onClick={() => setSelectedColor('blue')}
// //                 ></div>
// //                 <div 
// //                   style={{
// //                     width: "28px",
// //                     height: "28px",
// //                     borderRadius: "50%",
// //                     backgroundColor: "#43a047",
// //                     cursor: "pointer",
// //                     border: selectedColor === 'green' ? "2px solid #ef7921" : "2px solid transparent",
// //                     boxShadow: selectedColor === 'green' ? "0 0 0 2px rgba(239, 121, 33, 0.3)" : "none"
// //                   }}
// //                   onClick={() => setSelectedColor('green')}
// //                 ></div>
// //               </div>
// //             </div>

// //             {/* Size, Wishlist and Compare - Side by Side */}
// //             <div style={{ display: "flex", gap: "1rem", marginBottom: "1.25rem", alignItems: "flex-start", flexWrap: "wrap" }}>
// //               {/* Size Selection */}
// //               <div style={{ flex: "1", minWidth: "200px" }}>
// //                 <h3 style={{ 
// //                   fontSize: "0.95rem", 
// //                   fontWeight: "500", 
// //                   marginBottom: "0.5rem", 
// //                   color: "#374151" 
// //                 }}>
// //                   Size:
// //                 </h3>
// //                 <div style={{ display: "flex", gap: "0.6rem" }}>
// //                   {['s', 'm', 'l', 'xl'].map(size => (
// //                     <div 
// //                       key={size}
// //                       style={{
// //                         width: "36px",
// //                         height: "36px",
// //                         display: "flex",
// //                         alignItems: "center",
// //                         justifyContent: "center",
// //                         border: selectedSize === size ? "1px solid #ef7921" : "1px solid #d1d5db",
// //                         borderRadius: "4px",
// //                         cursor: "pointer",
// //                         fontWeight: "500",
// //                         fontSize: "0.9rem",
// //                         backgroundColor: selectedSize === size ? "rgba(239, 121, 33, 0.1)" : "transparent",
// //                         color: selectedSize === size ? "#ef7921" : "#374151"
// //                       }}
// //                       onClick={() => setSelectedSize(size)}
// //                     >
// //                       {size.toUpperCase()}
// //                     </div>
// //                   ))}
// //                 </div>
// //               </div>
              
// //               {/* Wishlist and Compare Buttons - Now horizontal */}
// //               <div style={{ flex: "1", display: "flex", gap: "0.5rem", marginTop: "1.5rem", minWidth: "200px" }}>
// //                 <Button 
// //                   variant="outlined" 
// //                   startIcon={<FavoriteBorderIcon />}
// //                   style={{ 
// //                     borderColor: "#d1d5db", 
// //                     color: "#4b5563",
// //                     fontSize: "0.85rem",
// //                     padding: "0.4rem 0.8rem",
// //                     flex: 1
// //                   }}
// //                 >
// //                   Wishlist
// //                 </Button>
// //                 <Button 
// //                   variant="outlined" 
// //                   startIcon={<CompareArrowsIcon />}
// //                   style={{ 
// //                     borderColor: "#d1d5db", 
// //                     color: "#4b5563",
// //                     fontSize: "0.85rem",
// //                     padding: "0.4rem 0.8rem",
// //                     flex: 1
// //                   }}
// //                 >
// //                   Compare
// //                 </Button>
// //               </div>
// //             </div>

// //             {/* Quantity and Add to Cart - Side by Side */}
// //             <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.25rem", flexWrap: "wrap" }}>
// //               <div style={{ display: "flex", alignItems: "center", gap: "0.8rem" }}>
// //                 <h3 style={{ 
// //                   fontSize: "0.95rem", 
// //                   fontWeight: "500", 
// //                   color: "#374151",
// //                   margin: 0
// //                 }}>
// //                   Quantity:
// //                 </h3>
// //                 <div style={{ 
// //                   display: "flex", 
// //                   alignItems: "center", 
// //                   border: "1px solid #d1d5db", 
// //                   borderRadius: "4px", 
// //                   overflow: "hidden" 
// //                 }}>
// //                   <button 
// //                     style={{ 
// //                       width: "32px", 
// //                       height: "32px", 
// //                       background: "#f9fafb", 
// //                       border: "none", 
// //                       fontSize: "1.1rem", 
// //                       cursor: "pointer",
// //                       display: "flex",
// //                       alignItems: "center",
// //                       justifyContent: "center"
// //                     }}
// //                     onClick={handleDecrement}
// //                   >
// //                     -
// //                   </button>
// //                   <span style={{ 
// //                     width: "36px", 
// //                     textAlign: "center", 
// //                     fontWeight: "500",
// //                     fontSize: "0.95rem"
// //                   }}>
// //                     {quantity}
// //                   </span>
// //                   <button 
// //                     style={{ 
// //                       width: "32px", 
// //                       height: "32px", 
// //                       background: " #f9fafb", 
// //                       border: "none", 
// //                       fontSize: "1.1rem", 
// //                       cursor: "pointer",
// //                       display: "flex",
// //                       alignItems: "center",
// //                       justifyContent: "center"
// //                     }}
// //                     onClick={handleIncrement}
// //                   >
// //                     +
// //                   </button>
// //                 </div>
// //               </div>
              
// //               <Button 
// //                 variant="contained" 
// //                 style={{ 
// //                   backgroundColor: "#ef7921", 
// //                   color: "white", 
// //                   padding: "0.5rem 1rem", 
// //                   fontWeight: "500", 
// //                   textTransform: "uppercase",
// //                   fontSize: "0.9rem",
// //                   height: "40px",
// //                   flex: 1,
// //                   maxWidth: "200px"
// //                 }}
// //               >
// //                 ADD TO CART
// //               </Button>
// //             </div>
// //           </div>
// //         </div> 

// //         {/* Reviews Section */}
// //         <div style={{ marginTop: "3rem", borderTop: "1px solid #e5e7eb", paddingTop: "2rem" }}>
// //           <div 
// //             style={{ 
// //               display: "flex", 
// //               justifyContent: "space-between", 
// //               alignItems: "center", 
// //               cursor: "pointer",
// //               padding: "1rem",
// //               backgroundColor: "#f9fafb",
// //               borderRadius: "6px"
// //             }}
// //             onClick={toggleReviews}
// //           >
// //             <h2 style={{ margin: 0, fontSize: "1.25rem", color: "#374151" }}>
// //               Reviews & Ratings ({reviews.length})
// //             </h2>
// //             {showReviews ? <ExpandLessIcon /> : <ExpandMoreIcon />}
// //           </div>

// //           {showReviews && (
// //             <div style={{ padding: "1.5rem", border: "1px solid #e5e7eb", borderTop: "none", borderRadius: "0 0 6px 6px" }}>
// //               {/* Existing Reviews */}
// //               <div style={{ marginBottom: "2rem" }}>
// //                 <h3 style={{ marginBottom: "1rem", color: "#374151" }}>Customer Reviews</h3>
// //                 {reviews.length > 0 ? (
// //                   reviews.map((review) => (
// //                     <div key={review.id} style={{ padding: "1rem 0", borderBottom: "1px solid #f3f4f6" }}>
// //                       <div style={{ display: "flex", alignItems: "center", marginBottom: "0.5rem" }}>
// //                         <Avatar sx={{ width: 40, height: 40, marginRight: "1rem", backgroundColor: "#ef7921" }}>
// //                           {review.name.charAt(0)}
// //                         </Avatar>
// //                         <div>
// //                           <div style={{ fontWeight: "500" }}>{review.name}</div>
// //                           <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
// //                             <Rating value={review.rating} size="small" readOnly />
// //                             <span style={{ fontSize: "0.85rem", color: "#6b7280" }}>{review.date}</span>
// //                           </div>
// //                         </div>
// //                       </div>
// //                       <p style={{ margin: 0, color: "#4b5563" }}>{review.comment}</p>
// //                     </div>
// //                   ))
// //                 ) : (
// //                   <p style={{ color: "#6b7280" }}>No reviews yet. Be the first to review this product!</p>
// //                 )}
// //               </div>

// //               {/* Add Review Form */}
// //               <div>
// //                 <h3 style={{ marginBottom: "1rem", color: "#374151" }}>Add Your Review</h3>
// //                 <form onSubmit={handleSubmitReview}>
// //                   <div style={{ marginBottom: "1rem" }}>
// //                     <TextField
// //                       fullWidth
// //                       label="Your Name"
// //                       value={userName}
// //                       onChange={(e) => setUserName(e.target.value)}
// //                       size="small"
// //                       required
// //                     />
// //                   </div>
// //                   <div style={{ marginBottom: "1rem" }}>
// //                     <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.5rem" }}>
// //                       <span style={{ fontSize: "0.9rem" }}>Your Rating:</span>
// //                       <Rating
// //                         value={userRating}
// //                         onChange={(event, newValue) => {
// //                           setUserRating(newValue);
// //                         }}
// //                         size="medium"
// //                       />
// //                     </div>
// //                   </div>
// //                   <div style={{ marginBottom: "1rem" }}>
// //                     <TextField
// //                       fullWidth
// //                       multiline
// //                       rows={4}
// //                       label="Your Review"
// //                       value={reviewText}
// //                       onChange={(e) => setReviewText(e.target.value)}
// //                       required
// //                     />
// //                   </div>
// //                   <Button
// //                     type="submit"
// //                     variant="contained"
// //                     style={{ 
// //                       backgroundColor: "#ef7921", 
// //                       color: "white",
// //                     }}
// //                   >
// //                     Submit Review
// //                   </Button>
// //                 </form>
// //               </div>
// //             </div>
// //           )}
// //         </div>

// //         {/* Related Products Section with Improved Styling */}
// //         <SliderContainer>
// //           <h2 style={{ 
// //             fontSize: "1.5rem", 
// //             fontWeight: "600", 
// //             marginBottom: "1.5rem", 
// //             color: "#1f2937",
// //             paddingLeft: "10px"
// //           }}>
// //             Related Products
// //           </h2>
// //           <ProductsSlider items={6} />
// //         </SliderContainer>
// //       </section>
// //     </>
// //   );
// // };

// // export default ProductDetails;













