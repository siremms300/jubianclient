 


import React, { useState } from 'react';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import Button from '@mui/material/Button';
import Rating from '@mui/material/Rating';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import TextField from '@mui/material/TextField';
import Avatar from '@mui/material/Avatar';
import { styled } from '@mui/material/styles';
import ProductsSlider from '../../components/ProductsSlider';

// Create a custom image component with zoom effect
const ZoomableImage = styled('div')(({ src }) => ({
  width: '100%',
  height: '100%',
  backgroundImage: `url(${src})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  transition: 'transform 0.5s ease',
  '&:hover': {
    transform: 'scale(1.5)',
    cursor: 'zoom-in'
  }
}));

// Custom styling for the ProductsSlider container
const SliderContainer = styled('div')({
  marginTop: '2rem',
  padding: '1.5rem 0',
  borderTop: '1px solid #e5e7eb',
  
  '& .slick-slide': {
    padding: '0 10px',
  },
  
  '& .product-item': {
    borderRadius: '8px',
    overflow: 'hidden',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    border: '1px solid #e5e7eb',
    backgroundColor: '#fff',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    
    '&:hover': {
      transform: 'translateY(-5px)',
      boxShadow: '0 8px 20px rgba(0,0,0,0.15)',
    }
  },
  
  '& .product-image': {
    height: '200px',
    overflow: 'hidden',
    position: 'relative',
    
    '& img': {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      transition: 'transform 0.5s ease',
    },
    
    '&:hover img': {
      transform: 'scale(1.05)',
    }
  },
  
  '& .product-info': {
    padding: '1rem',
    
    '& h3': {
      fontSize: '14px',
      fontWeight: '500',
      margin: '0 0 0.5rem 0',
      color: '#374151',
      lineHeight: '1.3',
      height: '36px',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      display: '-webkit-box',
      WebkitLineClamp: 2,
      WebkitBoxOrient: 'vertical',
    },
    
    '& .price': {
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      marginBottom: '0.5rem',
      
      '& .original-price': {
        fontSize: '14px',
        color: '#6b7280',
        textDecoration: 'line-through',
      },
      
      '& .discounted-price': {
        fontSize: '16px',
        fontWeight: '600',
        color: '#ef7921',
      }
    },
    
    '& .rating': {
      marginBottom: '0.5rem',
    }
  }
});

const ProductDetails = () => {
  const [selectedColor, setSelectedColor] = useState('red');
  const [selectedSize, setSelectedSize] = useState('m');
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState('/src/assets/images/grocery.jpg');
  const [isHovered, setIsHovered] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [showReviews, setShowReviews] = useState(false);
  const [userRating, setUserRating] = useState(0);
  const [reviewText, setReviewText] = useState('');
  const [userName, setUserName] = useState('');
  const [reviews, setReviews] = useState([
    {
      id: 1,
      name: 'Sarah Johnson',
      rating: 5,
      comment: 'Absolutely love this saree! The quality is exceptional and it looks even better in person.',
      date: '2023-10-15'
    },
    {
      id: 2,
      name: 'Michael Chen',
      rating: 4,
      comment: 'Good product, but the delivery took longer than expected. The saree itself is beautiful.',
      date: '2023-09-22'
    }
  ]);

  const handleIncrement = () => {
    setQuantity(prev => prev + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  const handleThumbnailClick = (image) => {
    setActiveImage(image);
  };

  const handleMouseMove = (e) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setPosition({ x, y });
  };

  const toggleReviews = () => {
    setShowReviews(!showReviews);
  };

  const handleSubmitReview = (e) => {
    e.preventDefault();
    if (userRating === 0 || !reviewText.trim() || !userName.trim()) {
      alert('Please provide a rating, your name, and a review comment.');
      return;
    }

    const newReview = {
      id: reviews.length + 1,
      name: userName,
      rating: userRating,
      comment: reviewText,
      date: new Date().toISOString().split('T')[0]
    };

    setReviews([...reviews, newReview]);
    setUserRating(0);
    setReviewText('');
    setUserName('');
    alert('Thank you for your review!');
  };

  // Sample images (replace with your actual image paths)
  const images = [
    '/src/assets/images/grocery.jpg',
    '/src/assets/images/fashion.jpg',
    '/src/assets/images/handbag.jpg'
  ];

  // Calculate average rating
  const averageRating = reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length;

  return (
    <>
      <section style={{ padding: "2rem 0", maxWidth: "1200px", margin: "0 auto", fontFamily: "Arial, sans-serif" }}>
        {/* Breadcrumb */}
        <Breadcrumbs aria-label="breadcrumb" style={{ marginBottom: "1.5rem" }}>
          <Link 
            underline="hover" 
            color="inherit" 
            href="/"
            style={{ fontSize: "14px", textDecoration: "none", color: "#6b7280" }}
          >
            Home
          </Link>
          <Link
            underline="hover"
            color="inherit"
            href="/"
            style={{ fontSize: "14px", textDecoration: "none", color: "#6b7280" }}
          >
            Fashion
          </Link>
          <Link
            underline="hover"
            color="text.primary"
            href="/"
            style={{ fontSize: "14px", textDecoration: "none", color: "#ef7921" }}
          >
            Sarees
          </Link>
        </Breadcrumbs>
     
        <div style={{ display: "flex", gap: "2rem", flexWrap: "wrap" }}>
          {/* Product Images - 30% width */}
          <div style={{ flex: "0 0 30%", minWidth: "300px" }}>
            <div 
              style={{ 
                border: "1px solid #e5e7eb", 
                borderRadius: "6px", 
                overflow: "hidden",
                marginBottom: "1rem",
                height: "350px",
                position: "relative"
              }}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              onMouseMove={handleMouseMove}
            >
              <div
                style={{
                  width: '100%',
                  height: '100%',
                  overflow: 'hidden',
                  position: 'relative'
                }}
              >
                <img 
                  src={activeImage} 
                  alt="Product"
                  style={{ 
                    width: "100%", 
                    height: "100%", 
                    objectFit: "cover",
                    display: "block",
                    transform: isHovered ? 'scale(1.5)' : 'scale(1)',
                    transformOrigin: `${position.x}% ${position.y}%`,
                    transition: isHovered ? 'transform 0.1s ease' : 'none'
                  }}
                />
              </div>
              {isHovered && (
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  pointerEvents: 'none',
                  background: 'rgba(255, 255, 255, 0.1)'
                }} />
              )}
            </div>
            
            {/* Additional thumbnails */}
            <div style={{ display: "flex", gap: "0.75rem", justifyContent: "center" }}>
              {images.map((image, index) => (
                <div 
                  key={index}
                  style={{ 
                    width: "60px", 
                    height: "60px", 
                    border: activeImage === image ? "2px solid #ef7921" : "2px solid #e5e7eb", 
                    borderRadius: "6px", 
                    overflow: "hidden",
                    cursor: "pointer"
                  }}
                  onClick={() => handleThumbnailClick(image)}
                >
                  <img 
                    src={image} 
                    alt={`Thumbnail ${index + 1}`}
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Product Info - 70% width */}
          <div style={{ flex: "1", minWidth: "300px" }}>
            <h1 style={{ 
              fontSize: "1.5rem", 
              fontWeight: "600", 
              marginBottom: "0.75rem", 
              color: "#1f2937",
              lineHeight: "1.2"
            }}>
              Embellished Sequinned Ready to Wear Saree
            </h1>
            
            <div style={{ display: "flex", alignItems: "center", gap: "1.5rem", marginBottom: "0.75rem" }}>
              <span style={{ fontSize: "0.9rem", color: "#6b7280" }}>
                Brand: <strong style={{ color: "#374151" }}>Tikhi Inili</strong>
              </span>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <Rating value={averageRating} precision={0.1} size="small" readOnly />
                <span 
                  style={{ fontSize: "0.9rem", color: "#6b7280", cursor: "pointer" }}
                  onClick={toggleReviews}
                >
                  ({reviews.length} reviews)
                </span>
              </div>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.25rem" }}>
              <span style={{ 
                fontSize: "1.1rem", 
                color: "#6b7280", 
                textDecoration: "line-through" 
              }}>
                $2650
              </span>
              <span style={{ 
                fontSize: "1.35rem", 
                fontWeight: "600", 
                color: "#ef7921" 
              }}>
                $2450
              </span>
              <span style={{ 
                fontSize: "0.85rem", 
                color: "#10b981", 
                marginLeft: "auto" 
              }}>
                Available in Stock: 8556 Items
              </span>
            </div>

            <p style={{ 
              color: "#6b7280", 
              lineHeight: "1.5", 
              marginBottom: "1.25rem",
              fontSize: "0.9rem"
            }}>
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
              Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
              when an unknown printer took a galley of type and scrambled it to make a type specimen book.
            </p>

            <div style={{ 
              display: "flex", 
              alignItems: "center", 
              gap: "0.5rem", 
              padding: "0.6rem", 
              backgroundColor: "#f3f4f6", 
              borderRadius: "6px", 
              marginBottom: "1.25rem",
              fontSize: "0.85rem",
              color: "#374151"
            }}>
              <LocalShippingIcon fontSize="small" />
              <span>Free Shipping (Est. Delivery Time 2-3 Days)</span>
            </div>

            {/* Color Selection */}
            <div style={{ marginBottom: "1.25rem" }}>
              <h3 style={{ 
                fontSize: "0.95rem", 
                fontWeight: "500", 
                marginBottom: "0.5rem", 
                color: "#374151" 
              }}>
                Color:
              </h3>
              <div style={{ display: "flex", gap: "0.6rem" }}>
                <div 
                  style={{
                    width: "28px",
                    height: "28px",
                    borderRadius: "50%",
                    backgroundColor: "#e53935",
                    cursor: "pointer",
                    border: selectedColor === 'red' ? "2px solid #ef7921" : "2px solid transparent",
                    boxShadow: selectedColor === 'red' ? "0 0 0 2px rgba(239, 121, 33, 0.3)" : "none"
                  }}
                  onClick={() => setSelectedColor('red')}
                ></div>
                <div 
                  style={{
                    width: "28px",
                    height: "28px",
                    borderRadius: "50%",
                    backgroundColor: "#1e88e5",
                    cursor: "pointer",
                    border: selectedColor === 'blue' ? "2px solid #ef7921" : "2px solid transparent",
                    boxShadow: selectedColor === 'blue' ? "0 0 0 2px rgba(239, 121, 33, 0.3)" : "none"
                  }}
                  onClick={() => setSelectedColor('blue')}
                ></div>
                <div 
                  style={{
                    width: "28px",
                    height: "28px",
                    borderRadius: "50%",
                    backgroundColor: "#43a047",
                    cursor: "pointer",
                    border: selectedColor === 'green' ? "2px solid #ef7921" : "2px solid transparent",
                    boxShadow: selectedColor === 'green' ? "0 0 0 2px rgba(239, 121, 33, 0.3)" : "none"
                  }}
                  onClick={() => setSelectedColor('green')}
                ></div>
              </div>
            </div>

            {/* Size, Wishlist and Compare - Side by Side */}
            <div style={{ display: "flex", gap: "1rem", marginBottom: "1.25rem", alignItems: "flex-start", flexWrap: "wrap" }}>
              {/* Size Selection */}
              <div style={{ flex: "1", minWidth: "200px" }}>
                <h3 style={{ 
                  fontSize: "0.95rem", 
                  fontWeight: "500", 
                  marginBottom: "0.5rem", 
                  color: "#374151" 
                }}>
                  Size:
                </h3>
                <div style={{ display: "flex", gap: "0.6rem" }}>
                  {['s', 'm', 'l', 'xl'].map(size => (
                    <div 
                      key={size}
                      style={{
                        width: "36px",
                        height: "36px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        border: selectedSize === size ? "1px solid #ef7921" : "1px solid #d1d5db",
                        borderRadius: "4px",
                        cursor: "pointer",
                        fontWeight: "500",
                        fontSize: "0.9rem",
                        backgroundColor: selectedSize === size ? "rgba(239, 121, 33, 0.1)" : "transparent",
                        color: selectedSize === size ? "#ef7921" : "#374151"
                      }}
                      onClick={() => setSelectedSize(size)}
                    >
                      {size.toUpperCase()}
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Wishlist and Compare Buttons - Now horizontal */}
              <div style={{ flex: "1", display: "flex", gap: "0.5rem", marginTop: "1.5rem", minWidth: "200px" }}>
                <Button 
                  variant="outlined" 
                  startIcon={<FavoriteBorderIcon />}
                  style={{ 
                    borderColor: "#d1d5db", 
                    color: "#4b5563",
                    fontSize: "0.85rem",
                    padding: "0.4rem 0.8rem",
                    flex: 1
                  }}
                >
                  Wishlist
                </Button>
                <Button 
                  variant="outlined" 
                  startIcon={<CompareArrowsIcon />}
                  style={{ 
                    borderColor: "#d1d5db", 
                    color: "#4b5563",
                    fontSize: "0.85rem",
                    padding: "0.4rem 0.8rem",
                    flex: 1
                  }}
                >
                  Compare
                </Button>
              </div>
            </div>

            {/* Quantity and Add to Cart - Side by Side */}
            <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.25rem", flexWrap: "wrap" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.8rem" }}>
                <h3 style={{ 
                  fontSize: "0.95rem", 
                  fontWeight: "500", 
                  color: "#374151",
                  margin: 0
                }}>
                  Quantity:
                </h3>
                <div style={{ 
                  display: "flex", 
                  alignItems: "center", 
                  border: "1px solid #d1d5db", 
                  borderRadius: "4px", 
                  overflow: "hidden" 
                }}>
                  <button 
                    style={{ 
                      width: "32px", 
                      height: "32px", 
                      background: "#f9fafb", 
                      border: "none", 
                      fontSize: "1.1rem", 
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center"
                    }}
                    onClick={handleDecrement}
                  >
                    -
                  </button>
                  <span style={{ 
                    width: "36px", 
                    textAlign: "center", 
                    fontWeight: "500",
                    fontSize: "0.95rem"
                  }}>
                    {quantity}
                  </span>
                  <button 
                    style={{ 
                      width: "32px", 
                      height: "32px", 
                      background: " #f9fafb", 
                      border: "none", 
                      fontSize: "1.1rem", 
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center"
                    }}
                    onClick={handleIncrement}
                  >
                    +
                  </button>
                </div>
              </div>
              
              <Button 
                variant="contained" 
                style={{ 
                  backgroundColor: "#ef7921", 
                  color: "white", 
                  padding: "0.5rem 1rem", 
                  fontWeight: "500", 
                  textTransform: "uppercase",
                  fontSize: "0.9rem",
                  height: "40px",
                  flex: 1,
                  maxWidth: "200px"
                }}
              >
                ADD TO CART
              </Button>
            </div>
          </div>
        </div> 

        {/* Reviews Section */}
        <div style={{ marginTop: "3rem", borderTop: "1px solid #e5e7eb", paddingTop: "2rem" }}>
          <div 
            style={{ 
              display: "flex", 
              justifyContent: "space-between", 
              alignItems: "center", 
              cursor: "pointer",
              padding: "1rem",
              backgroundColor: "#f9fafb",
              borderRadius: "6px"
            }}
            onClick={toggleReviews}
          >
            <h2 style={{ margin: 0, fontSize: "1.25rem", color: "#374151" }}>
              Reviews & Ratings ({reviews.length})
            </h2>
            {showReviews ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </div>

          {showReviews && (
            <div style={{ padding: "1.5rem", border: "1px solid #e5e7eb", borderTop: "none", borderRadius: "0 0 6px 6px" }}>
              {/* Existing Reviews */}
              <div style={{ marginBottom: "2rem" }}>
                <h3 style={{ marginBottom: "1rem", color: "#374151" }}>Customer Reviews</h3>
                {reviews.length > 0 ? (
                  reviews.map((review) => (
                    <div key={review.id} style={{ padding: "1rem 0", borderBottom: "1px solid #f3f4f6" }}>
                      <div style={{ display: "flex", alignItems: "center", marginBottom: "0.5rem" }}>
                        <Avatar sx={{ width: 40, height: 40, marginRight: "1rem", backgroundColor: "#ef7921" }}>
                          {review.name.charAt(0)}
                        </Avatar>
                        <div>
                          <div style={{ fontWeight: "500" }}>{review.name}</div>
                          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                            <Rating value={review.rating} size="small" readOnly />
                            <span style={{ fontSize: "0.85rem", color: "#6b7280" }}>{review.date}</span>
                          </div>
                        </div>
                      </div>
                      <p style={{ margin: 0, color: "#4b5563" }}>{review.comment}</p>
                    </div>
                  ))
                ) : (
                  <p style={{ color: "#6b7280" }}>No reviews yet. Be the first to review this product!</p>
                )}
              </div>

              {/* Add Review Form */}
              <div>
                <h3 style={{ marginBottom: "1rem", color: "#374151" }}>Add Your Review</h3>
                <form onSubmit={handleSubmitReview}>
                  <div style={{ marginBottom: "1rem" }}>
                    <TextField
                      fullWidth
                      label="Your Name"
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                      size="small"
                      required
                    />
                  </div>
                  <div style={{ marginBottom: "1rem" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.5rem" }}>
                      <span style={{ fontSize: "0.9rem" }}>Your Rating:</span>
                      <Rating
                        value={userRating}
                        onChange={(event, newValue) => {
                          setUserRating(newValue);
                        }}
                        size="medium"
                      />
                    </div>
                  </div>
                  <div style={{ marginBottom: "1rem" }}>
                    <TextField
                      fullWidth
                      multiline
                      rows={4}
                      label="Your Review"
                      value={reviewText}
                      onChange={(e) => setReviewText(e.target.value)}
                      required
                    />
                  </div>
                  <Button
                    type="submit"
                    variant="contained"
                    style={{ 
                      backgroundColor: "#ef7921", 
                      color: "white",
                    }}
                  >
                    Submit Review
                  </Button>
                </form>
              </div>
            </div>
          )}
        </div>

        {/* Related Products Section with Improved Styling */}
        <SliderContainer>
          <h2 style={{ 
            fontSize: "1.5rem", 
            fontWeight: "600", 
            marginBottom: "1.5rem", 
            color: "#1f2937",
            paddingLeft: "10px"
          }}>
            Related Products
          </h2>
          <ProductsSlider items={6} />
        </SliderContainer>
      </section>
    </>
  );
};

export default ProductDetails;













