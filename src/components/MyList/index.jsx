import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import { FaShare, FaRegHeart } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ProductItem from '../../components/ProductItem';

// Styled components
const WishlistContainer = styled('div')({
  maxWidth: '1200px',
  margin: '0 auto',
  padding: '2rem 1rem',
  fontFamily: 'Arial, sans-serif',
});

const PageHeader = styled('div')({
  marginBottom: '2rem',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  flexWrap: 'wrap',
  gap: '1rem',
  '& h1': {
    fontSize: '2rem',
    fontWeight: '600',
    color: '#1f2937',
    margin: 0,
  },
  '& p': {
    color: '#6b7280',
    margin: '0.5rem 0 0 0',
  },
});

const ActionButtons = styled('div')({
  display: 'flex',
  gap: '1rem',
  '@media (max-width: 768px)': {
    width: '100%',
    '& button': {
      flex: 1,
    },
  },
});

const ShareButton = styled(Button)({
  borderColor: '#d1d5db',
  color: '#374151',
  textTransform: 'none',
  fontWeight: '500',
});

const EmptyWishlist = styled('div')({
  textAlign: 'center',
  padding: '4rem 1rem',
  color: '#9ca3af',
  '& svg': {
    marginBottom: '1.5rem',
    fontSize: '4rem',
  },
  '& h2': {
    fontSize: '1.5rem',
    fontWeight: '600',
    margin: '0 0 1rem 0',
    color: '#6b7280',
  },
  '& p': {
    margin: '0 0 2rem 0',
    fontSize: '1rem',
  },
});

const WishlistGrid = styled('div')({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
  gap: '1.5rem',
  marginBottom: '2rem',
  '@media (max-width: 1200px)': {
    gridTemplateColumns: 'repeat(auto-fill, minmax(230px, 1fr))',
  },
  '@media (max-width: 768px)': {
    gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
    gap: '1rem',
  },
});

const FiltersSection = styled('div')({
  backgroundColor: '#fff',
  borderRadius: '8px',
  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
  border: '1px solid #e5e7eb',
  padding: '1.25rem',
  marginBottom: '2rem',
});

const FilterTitle = styled('h3')({
  fontSize: '1rem',
  fontWeight: '600',
  color: '#1f2937',
  margin: '0 0 1rem 0',
});

const FilterOptions = styled('div')({
  display: 'flex',
  flexWrap: 'wrap',
  gap: '0.75rem',
});

const FilterButton = styled(Button)({
  borderColor: '#d1d5db',
  color: '#374151',
  textTransform: 'none',
  fontSize: '0.85rem',
  padding: '0.25rem 0.75rem',
  '&.active': {
    borderColor: '#ef7921',
    color: '#ef7921',
    backgroundColor: 'rgba(239, 121, 33, 0.1)',
  },
});

const MyList = () => {
  const [wishlistItems, setWishlistItems] = useState([
    {
      id: 1,
      name: 'Premium Leather Wristwatch',
      category: 'Accessories',
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=300&fit=crop',
      hoverImage: 'https://images.unsplash.com/photo-1539874754764-5a96559165b0?w=300&h=300&fit=crop',
      price: 45,
      originalPrice: 51,
      rating: 4.5,
      stock: 'in-stock',
      stockQuantity: 15,
    },
    {
      id: 2,
      name: 'Luxury Handbag',
      category: 'Fashion',
      image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=300&h=300&fit=crop',
      hoverImage: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=300&h=300&fit=crop',
      price: 89,
      originalPrice: 120,
      rating: 4.2,
      stock: 'low-stock',
      stockQuantity: 3,
    },
    {
      id: 3,
      name: 'Wireless Bluetooth Headphones',
      category: 'Electronics',
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop',
      hoverImage: 'https://images.unsplash.com/photo-1572536147248-ac59a8abfa4b?w=300&h=300&fit=crop',
      price: 65,
      originalPrice: 85,
      rating: 4.8,
      stock: 'in-stock',
      stockQuantity: 20,
    },
    {
      id: 4,
      name: 'Designer Sunglasses',
      category: 'Accessories',
      image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=300&h=300&fit=crop',
      hoverImage: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=300&h=300&fit=crop',
      price: 42,
      originalPrice: 55,
      rating: 4.3,
      stock: 'out-of-stock',
      stockQuantity: 0,
    },
  ]);

  const [activeFilter, setActiveFilter] = useState('all');

  const handleRemoveItem = (id) => {
    setWishlistItems(wishlistItems.filter(item => item.id !== id));
    toast.success('Item removed from wishlist');
  };

  const handleAddToCart = (item) => {
    toast.success(`${item.name} added to cart`);
  };

  const handleShareWishlist = () => {
    toast.info('Wishlist sharing feature coming soon!');
  };

  const filteredItems = activeFilter === 'all' 
    ? wishlistItems 
    : wishlistItems.filter(item => item.stock === activeFilter);

  if (wishlistItems.length === 0) {
    return (
      <WishlistContainer>
        <PageHeader>
          <div>
            <h1>My Wishlist</h1>
            <p>Your favorite items saved for later</p>
          </div>
        </PageHeader>

        <EmptyWishlist>
          <FaRegHeart />
          <h2>Your wishlist is empty</h2>
          <p>Start saving your favorite items to see them here</p>
          <Button
            variant="contained"
            component={Link}
            to="/"
            style={{
              backgroundColor: "#ef7921",
              color: "white",
              fontWeight: "600",
              padding: "0.75rem 2rem",
            }}
          >
            Start Shopping
          </Button>
        </EmptyWishlist>

        <ToastContainer />
      </WishlistContainer>
    );
  }

  return (
    <WishlistContainer>
      <PageHeader>
        <div>
          <h1>My Wishlist</h1>
          <p>{wishlistItems.length} items saved</p>
        </div>
        <ActionButtons>
          <ShareButton
            variant="outlined"
            startIcon={<FaShare />}
            onClick={handleShareWishlist}
          >
            Share Wishlist
          </ShareButton>
        </ActionButtons>
      </PageHeader>

      <FiltersSection>
        <FilterTitle>Filter by:</FilterTitle>
        <FilterOptions>
          <FilterButton
            variant="outlined"
            className={activeFilter === 'all' ? 'active' : ''}
            onClick={() => setActiveFilter('all')}
          >
            All Items
          </FilterButton>
          <FilterButton
            variant="outlined"
            className={activeFilter === 'in-stock' ? 'active' : ''}
            onClick={() => setActiveFilter('in-stock')}
          >
            In Stock
          </FilterButton>
          <FilterButton
            variant="outlined"
            className={activeFilter === 'low-stock' ? 'active' : ''}
            onClick={() => setActiveFilter('low-stock')}
          >
            Low Stock
          </FilterButton>
          <FilterButton
            variant="outlined"
            className={activeFilter === 'out-of-stock' ? 'active' : ''}
            onClick={() => setActiveFilter('out-of-stock')}
          >
            Out of Stock
          </FilterButton>
        </FilterOptions>
      </FiltersSection>

      <WishlistGrid>
        {filteredItems.map((item) => (
          <div key={item.id} style={{ position: 'relative' }}>
            <ProductItem 
              // Pass all necessary props to ProductItem
              name={item.name}
              category={item.category}
              price={item.price}
              originalPrice={item.originalPrice}
              rating={item.rating}
              image={item.image}
              hoverImage={item.hoverImage}
            />
            {/* Add remove button overlay */}
            <button
              onClick={() => handleRemoveItem(item.id)}
              style={{
                position: 'absolute',
                top: '10px',
                right: '10px',
                zIndex: 100,
                width: '30px',
                height: '30px',
                borderRadius: '50%',
                backgroundColor: '#fff',
                color: '#ef7921',
                border: 'none',
                boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '16px',
              }}
              title="Remove from wishlist"
            >
              ×
            </button>
          </div>
        ))}
      </WishlistGrid>

      <ToastContainer />
    </WishlistContainer>
  );
};

export default MyList;