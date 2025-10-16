import React, { useState } from 'react';
import Rating from '@mui/material/Rating';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import TextField from '@mui/material/TextField';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';

const ReviewAndRatingComponent = ({ reviews: initialReviews, averageRating }) => {
  const [showReviews, setShowReviews] = useState(false);
  const [userRating, setUserRating] = useState(0);
  const [reviewText, setReviewText] = useState('');
  const [userName, setUserName] = useState('');
  const [reviews, setReviews] = useState(initialReviews);

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

  return (
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
          Reviews & Ratings 
          {/* Reviews & Ratings ({reviews.length}) */}
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
  );
};

export default ReviewAndRatingComponent;