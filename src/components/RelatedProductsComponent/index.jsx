import React from 'react';
import ProductsSlider from '../../components/ProductsSlider';
import { styled } from '@mui/material/styles';

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

const RelatedProductsComponent = () => {
  return (
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
  );
};

export default RelatedProductsComponent;