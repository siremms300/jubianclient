import React from 'react'
import { useState, useEffect } from 'react';
import Sidebar from '../../components/Sidebar'
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import ProductItem from '../../components/ProductItem'
import ProductItemListView from '../../components/ProductItemListView';
import Button from '@mui/material/Button';
import { IoGrid } from "react-icons/io5";
import { GiHamburgerMenu } from "react-icons/gi";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Pagination from '@mui/material/Pagination';
import { productApi } from '../../utils/productApi';
import { useSearchParams } from 'react-router-dom';

const ProductListing = () => {
  const [itemView, setItemView] = useState('grid');
  const [anchorEl, setAnchorEl] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 12,
    total: 0,
    pages: 0
  });
  const [searchParams, setSearchParams] = useSearchParams();

  const open = Boolean(anchorEl);

  // Get filter parameters from URL
  const currentPage = parseInt(searchParams.get('page')) || 1;
  const sortBy = searchParams.get('sortBy') || 'createdAt';
  const sortOrder = searchParams.get('sortOrder') || 'desc';
  const category = searchParams.get('category');
  const minPrice = searchParams.get('minPrice');
  const maxPrice = searchParams.get('maxPrice');
  const search = searchParams.get('search');
  const status = searchParams.get('status');
  const featured = searchParams.get('featured');

  useEffect(() => {
    fetchProducts();
  }, [searchParams]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      
      // Build filters object based on URL parameters
      const filters = {
        page: currentPage,
        limit: pagination.limit,
        sortBy,
        sortOrder,
        ...(category && { category }),
        ...(minPrice && { minPrice: parseFloat(minPrice) }),
        ...(maxPrice && { maxPrice: parseFloat(maxPrice) }),
        ...(search && { search }),
        ...(status && { status }),
        ...(featured && { featured })
      };

      console.log('Fetching products with filters:', filters);

      const response = await productApi.getProducts(filters);
      
      if (response.success) {
        setProducts(response.data || []);
        setPagination({
          page: response.pagination?.currentPage || 1,
          limit: pagination.limit,
          total: response.pagination?.totalProducts || 0,
          pages: response.pagination?.totalPages || 1
        });
      } else {
        setProducts([]);
        setPagination({
          page: 1,
          limit: pagination.limit,
          total: 0,
          pages: 0
        });
      }
    } catch (error) {
      console.error('Error fetching products:', error);
      setProducts([]);
      setPagination({
        page: 1,
        limit: pagination.limit,
        total: 0,
        pages: 0
      });
    } finally {
      setLoading(false);
    }
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSortChange = (sortValue) => {
    let newSortBy = 'createdAt';
    let newSortOrder = 'desc';

    switch (sortValue) {
      case 'Sales, highest to lowest':
        newSortBy = 'salesCount';
        newSortOrder = 'desc';
        break;
      case 'Relevance':
        newSortBy = 'relevance';
        newSortOrder = 'desc';
        break;
      case 'Name, A-Z':
        newSortBy = 'name';
        newSortOrder = 'asc';
        break;
      case 'Name, Z-A':
        newSortBy = 'name';
        newSortOrder = 'desc';
        break;
      case 'Price, low to high':
        newSortBy = 'price';
        newSortOrder = 'asc';
        break;
      case 'Price, high to low':
        newSortBy = 'price';
        newSortOrder = 'desc';
        break;
      default:
        newSortBy = 'createdAt';
        newSortOrder = 'desc';
    }

    const newParams = new URLSearchParams(searchParams);
    newParams.set('sortBy', newSortBy);
    newParams.set('sortOrder', newSortOrder);
    newParams.set('page', '1'); // Reset to first page when sorting
    setSearchParams(newParams);
    handleClose();
  };

  const handlePageChange = (event, value) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set('page', value);
    setSearchParams(newParams);
  };

  const handleFiltersChange = (filters) => {
    const newParams = new URLSearchParams();
    
    // Preserve search and sort parameters
    if (search) newParams.set('search', search);
    if (sortBy) newParams.set('sortBy', sortBy);
    if (sortOrder) newParams.set('sortOrder', sortOrder);
    
    // Add new filters (only include if they have values)
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== null && value !== undefined && value !== '') {
        newParams.set(key, value);
      } else {
        // Remove the parameter if it's null/empty
        newParams.delete(key);
      }
    });
    
    // Always reset to first page when filters change
    newParams.set('page', '1');
    
    setSearchParams(newParams);
  };

  const getCurrentSortText = () => {
    switch (sortBy) {
      case 'salesCount': return 'Sales, highest to lowest';
      case 'relevance': return 'Relevance';
      case 'name': return sortOrder === 'asc' ? 'Name, A-Z' : 'Name, Z-A';
      case 'price': return sortOrder === 'asc' ? 'Price, low to high' : 'Price, high to low';
      case 'createdAt': return sortOrder === 'desc' ? 'Newest First' : 'Oldest First';
      default: return 'Newest First';
    }
  };

  const clearAllFilters = () => {
    setSearchParams(new URLSearchParams());
  };

  const hasActiveFilters = category || minPrice || maxPrice || status || featured;

  return (
    <section style={{ padding: "2rem 0" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        
        {/* Breadcrumb */}
        <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 2 }}>
          <Link 
            underline="hover" 
            color="inherit" 
            href="/"
            sx={{ fontSize: "14px", textDecoration: "none" }}
          >
            Home
          </Link>
          <Link
            underline="hover"
            color="inherit"
            href="/products"
            sx={{ fontSize: "14px", textDecoration: "none" }}
          >
            Products
          </Link>
          {category && (
            <Typography sx={{ fontSize: "14px", color: "text.primary" }}>
              {category}
            </Typography>
          )}
          {search && (
            <Typography sx={{ fontSize: "14px", color: "text.primary" }}>
              Search: "{search}"
            </Typography>
          )}
        </Breadcrumbs>

      </div>

      <div style={{ background: "#fff", padding: "0.5rem" }}>
        <div style={{ display: "flex", gap: "1rem", maxWidth: "1200px", margin: "0 auto" }}>
          
          {/* Sidebar */}
          <div style={{ width: "20%", background: "#fff" }}>
            <Sidebar onFiltersChange={handleFiltersChange} />
          </div>

          {/* Right content */}
          <div style={{ width: "80%", padding: "1rem 0" }}>

            {/* Top controls */}
            <div style={{ 
              background: "#f1f1f1", 
              padding: "0.5rem", 
              width: "100%", 
              marginBottom: "0.75rem", 
              borderRadius: "6px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between"
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                <Button 
                  sx={{ 
                    minWidth: "40px", 
                    width: "40px", 
                    height: "40px", 
                    borderRadius: "50%", 
                    color: itemView === "list" ? "#ef7921" : "#000",
                    backgroundColor: itemView === "list" ? "rgba(239, 121, 33, 0.1)" : "transparent"
                  }}
                  onClick={() => setItemView('list')}
                >
                  <GiHamburgerMenu style={{ fontSize: "18px", color: itemView === "list" ? "#ef7921" : "rgba(0,0,0,0.7)" }} />
                </Button>

                <Button 
                  sx={{ 
                    minWidth: "40px", 
                    width: "40px", 
                    height: "40px", 
                    borderRadius: "50%", 
                    color: itemView === "grid" ? "#ef7921" : "#000",
                    backgroundColor: itemView === "grid" ? "rgba(239, 121, 33, 0.1)" : "transparent"
                  }}
                  onClick={() => setItemView('grid')}
                >
                  <IoGrid style={{ fontSize: "18px", color: itemView === "grid" ? "#ef7921" : "rgba(0,0,0,0.7)" }} />
                </Button>

                <span style={{ fontSize: "14px", fontWeight: 500, paddingLeft: "0.75rem", color: "rgba(0,0,0,0.7)" }}>
                  {loading ? 'Loading...' : `Showing ${products.length} of ${pagination.total} products`}
                </span>

                {hasActiveFilters && (
                  <Button 
                    onClick={clearAllFilters}
                    sx={{ 
                      fontSize: "12px", 
                      textTransform: 'none',
                      color: "#ef7921",
                      border: "1px solid #ef7921",
                      marginLeft: "1rem"
                    }}
                  >
                    Clear Filters
                  </Button>
                )}
              </div>

              <div style={{ display: "flex", alignItems: "center", justifyContent: "end" }}>
                 <span style={{ fontSize: "14px", fontWeight: 500, color: "rgba(0,0,0,0.7)" }}>
                  Sort By:
                  <Button
                    id="basic-button"
                    aria-controls={open ? 'basic-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    onClick={handleClick}
                    sx={{
                      backgroundColor: "#ef7921",
                      color: "#f1f1f1",
                      fontSize: "12px",
                      textTransform: "capitalize",
                      border: "2px solid #fff",
                      marginLeft: "0.5rem",
                      minWidth: "200px",
                      '&:hover': {
                        backgroundColor: "#e06b15"
                      }
                    }}
                  >
                    {getCurrentSortText()}
                  </Button>
                  
                  <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    slotProps={{
                      list: {
                        'aria-labelledby': 'basic-button',
                      },
                    }}
                  >
                    <MenuItem 
                      onClick={() => handleSortChange('Sales, highest to lowest')} 
                      sx={{ fontSize: "12px" }}
                    >
                      Sales, highest to lowest
                    </MenuItem>
                    <MenuItem 
                      onClick={() => handleSortChange('Relevance')} 
                      sx={{ fontSize: "12px" }}
                    >
                      Relevance
                    </MenuItem>
                    <MenuItem 
                      onClick={() => handleSortChange('Name, A-Z')} 
                      sx={{ fontSize: "12px" }}
                    >
                      Name, A-Z
                    </MenuItem>
                    <MenuItem 
                      onClick={() => handleSortChange('Name, Z-A')} 
                      sx={{ fontSize: "12px" }}
                    >
                      Name, Z-A
                    </MenuItem>
                    <MenuItem 
                      onClick={() => handleSortChange('Price, low to high')} 
                      sx={{ fontSize: "12px" }}
                    >
                      Price, low to high
                    </MenuItem>
                    <MenuItem 
                      onClick={() => handleSortChange('Price, high to low')} 
                      sx={{ fontSize: "12px" }}
                    >
                      Price, high to low
                    </MenuItem>
                    <MenuItem 
                      onClick={() => handleSortChange('Newest First')} 
                      sx={{ fontSize: "12px" }}
                    >
                      Newest First
                    </MenuItem>
                  </Menu>
                </span>
              </div>
            </div>

            {/* Products grid/list */}
            {loading ? (
              <div style={{ 
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center', 
                height: '200px',
                fontSize: '16px',
                color: '#666'
              }}>
                Loading products...
              </div>
            ) : products.length === 0 ? (
              <div style={{ 
                display: 'flex', 
                flexDirection: 'column',
                justifyContent: 'center', 
                alignItems: 'center', 
                height: '200px',
                fontSize: '16px',
                color: '#666',
                textAlign: 'center'
              }}>
                <p>No products found matching your criteria.</p>
                {hasActiveFilters && (
                  <Button 
                    onClick={clearAllFilters}
                    sx={{ 
                      marginTop: '1rem',
                      color: "#ef7921",
                      border: "1px solid #ef7921"
                    }}
                  >
                    Clear all filters
                  </Button>
                )}
              </div>
            ) : (
              <>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: itemView === "grid" ? "repeat(4, 1fr)" : "repeat(1, 1fr)",
                    gap: "1rem"
                  }}
                >
                  {products.map((product) => (
                    itemView === 'grid' ? 
                    <ProductItem key={product._id} product={product} />
                    :
                    <ProductItemListView key={product._id} product={product} />
                  ))}
                </div>

                {/* Pagination */}
                {pagination.pages > 1 && (
                  <div style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
                    <Pagination 
                      count={pagination.pages} 
                      page={pagination.page}
                      onChange={handlePageChange}
                      showFirstButton 
                      showLastButton
                      color="primary"
                    />
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

export default ProductListing



























































// import React from 'react'
// import { useState, useEffect } from 'react';
// import Sidebar from '../../components/Sidebar'
// import Typography from '@mui/material/Typography';
// import Breadcrumbs from '@mui/material/Breadcrumbs';
// import Link from '@mui/material/Link';
// import ProductItem from '../../components/ProductItem'
// import ProductItemListView from '../../components/ProductItemListView';
// import Button from '@mui/material/Button';
// import { IoGrid } from "react-icons/io5";
// import { GiHamburgerMenu } from "react-icons/gi";
// import Menu from '@mui/material/Menu';
// import MenuItem from '@mui/material/MenuItem';
// import Pagination from '@mui/material/Pagination';
// import { productApi } from '../../utils/productApi';
// import { useSearchParams } from 'react-router-dom';

// const ProductListing = () => {
//   const [itemView, setItemView] = useState('grid');
//   const [anchorEl, setAnchorEl] = useState(null);
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [pagination, setPagination] = useState({
//     page: 1,
//     limit: 12,
//     total: 0,
//     pages: 0
//   });
//   const [searchParams, setSearchParams] = useSearchParams();

//   const open = Boolean(anchorEl);

//   // Get filter parameters from URL
//   const currentPage = parseInt(searchParams.get('page')) || 1;
//   const sortBy = searchParams.get('sort') || 'createdAt';
//   const sortOrder = searchParams.get('order') || 'desc';
//   const category = searchParams.get('category');
//   const minPrice = searchParams.get('minPrice');
//   const maxPrice = searchParams.get('maxPrice');
//   const rating = searchParams.get('rating');
//   const availability = searchParams.get('availability');
//   const size = searchParams.get('size');
//   const searchQuery = searchParams.get('search');

//   useEffect(() => {
//     fetchProducts();
//   }, [searchParams]);

//   const fetchProducts = async () => {
//     try {
//       setLoading(true);
      
//       const filters = {
//         page: currentPage,
//         limit: pagination.limit,
//         sortBy,
//         sortOrder,
//         ...(category && { category }),
//         ...(minPrice && { minPrice: parseFloat(minPrice) }),
//         ...(maxPrice && { maxPrice: parseFloat(maxPrice) }),
//         ...(rating && { minRating: parseFloat(rating) }),
//         ...(availability && { availability }),
//         ...(size && { size }),
//         ...(searchQuery && { search: searchQuery })
//       };

//       const response = await productApi.getProducts(filters);
      
//       if (response.success) {
//         setProducts(response.data.products || []);
//         setPagination({
//           page: response.data.currentPage,
//           limit: response.data.limit,
//           total: response.data.total,
//           pages: response.data.pages
//         });
//       }
//     } catch (error) {
//       console.error('Error fetching products:', error);
//       setProducts([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleClick = (event) => {
//     setAnchorEl(event.currentTarget);
//   };

//   const handleClose = () => {
//     setAnchorEl(null);
//   };

//   const handleSortChange = (sortValue) => {
//     let newSortBy = 'createdAt';
//     let newSortOrder = 'desc';

//     switch (sortValue) {
//       case 'Sales, highest to lowest':
//         newSortBy = 'salesCount';
//         newSortOrder = 'desc';
//         break;
//       case 'Relevance':
//         newSortBy = 'relevance';
//         newSortOrder = 'desc';
//         break;
//       case 'Name, A-Z':
//         newSortBy = 'name';
//         newSortOrder = 'asc';
//         break;
//       case 'Name, Z-A':
//         newSortBy = 'name';
//         newSortOrder = 'desc';
//         break;
//       case 'Price, low-high':
//         newSortBy = 'price';
//         newSortOrder = 'asc';
//         break;
//       case 'Price, high-low':
//         newSortBy = 'price';
//         newSortOrder = 'desc';
//         break;
//       default:
//         newSortBy = 'createdAt';
//         newSortOrder = 'desc';
//     }

//     const newParams = new URLSearchParams(searchParams);
//     newParams.set('sort', newSortBy);
//     newParams.set('order', newSortOrder);
//     setSearchParams(newParams);
//     handleClose();
//   };

//   const handlePageChange = (event, value) => {
//     const newParams = new URLSearchParams(searchParams);
//     newParams.set('page', value);
//     setSearchParams(newParams);
//   };

//   const getCurrentSortText = () => {
//     switch (sortBy) {
//       case 'salesCount': return 'Sales, highest to lowest';
//       case 'relevance': return 'Relevance';
//       case 'name': return sortOrder === 'asc' ? 'Name, A-Z' : 'Name, Z-A';
//       case 'price': return sortOrder === 'asc' ? 'Price, low-high' : 'Price, high-low';
//       default: return 'Sales, highest to lowest';
//     }
//   };

//   return (
//     <section style={{ padding: "2rem 0" }}>
//       <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        
//         {/* Breadcrumb */}
//         <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 2 }}>
//           <Link 
//             underline="hover" 
//             color="inherit" 
//             href="/"
//             sx={{ fontSize: "14px", textDecoration: "none" }}
//           >
//             Home
//           </Link>
//           <Link
//             underline="hover"
//             color="inherit"
//             href="/products"
//             sx={{ fontSize: "14px", textDecoration: "none" }}
//           >
//             Products
//           </Link>
//           {category && (
//             <Typography sx={{ fontSize: "14px", color: "text.primary" }}>
//               {category}
//             </Typography>
//           )}
//           {searchQuery && (
//             <Typography sx={{ fontSize: "14px", color: "text.primary" }}>
//               Search: "{searchQuery}"
//             </Typography>
//           )}
//         </Breadcrumbs>

//       </div>

//       <div style={{ background: "#fff", padding: "0.5rem" }}>
//         <div style={{ display: "flex", gap: "1rem", maxWidth: "1200px", margin: "0 auto" }}>
          
//           {/* Sidebar */}
//           <div style={{ width: "20%", background: "#fff" }}>
//             <Sidebar 
//               onFiltersChange={(filters) => {
//                 const newParams = new URLSearchParams();
                
//                 // Preserve existing params
//                 if (searchQuery) newParams.set('search', searchQuery);
//                 if (sortBy) newParams.set('sort', sortBy);
//                 if (sortOrder) newParams.set('order', sortOrder);
                
//                 // Add new filters
//                 Object.entries(filters).forEach(([key, value]) => {
//                   if (value) {
//                     newParams.set(key, value);
//                   }
//                 });
                
//                 setSearchParams(newParams);
//               }}
//             />
//           </div>

//           {/* Right content */}
//           <div style={{ width: "80%", padding: "1rem 0" }}>

//             {/* Top controls */}
//             <div style={{ 
//               background: "#f1f1f1", 
//               padding: "0.5rem", 
//               width: "100%", 
//               marginBottom: "0.75rem", 
//               borderRadius: "6px",
//               display: "flex",
//               alignItems: "center",
//               justifyContent: "space-between"
//             }}>
//               <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
//                 <Button 
//                   sx={{ 
//                     minWidth: "40px", 
//                     width: "40px", 
//                     height: "40px", 
//                     borderRadius: "50%", 
//                     color: itemView === "list" ? "#ef7921" : "#000" 
//                   }}
//                   onClick={() => setItemView('list')}
//                 >
//                   <GiHamburgerMenu style={{ fontSize: "18px", color: itemView === "list" ? "#ef7921" : "rgba(0,0,0,0.7)" }} />
//                 </Button>

//                 <Button 
//                   sx={{ 
//                     minWidth: "40px", 
//                     width: "40px", 
//                     height: "40px", 
//                     borderRadius: "50%", 
//                     color: itemView === "grid" ? "#ef7921" : "#000" 
//                   }}
//                   onClick={() => setItemView('grid')}
//                 >
//                   <IoGrid style={{ fontSize: "18px", color: itemView === "grid" ? "#ef7921" : "rgba(0,0,0,0.7)" }} />
//                 </Button>

//                 <span style={{ fontSize: "14px", fontWeight: 500, paddingLeft: "0.75rem", color: "rgba(0,0,0,0.7)" }}>
//                   {loading ? 'Loading...' : `There are ${pagination.total} products`}
//                 </span>
//               </div>

//               <div style={{ display: "flex", alignItems: "center", justifyContent: "end" }}>
//                  <span style={{ fontSize: "14px", fontWeight: 500, paddingLeft: "0.75rem", color: "rgba(0,0,0,0.7)" }}>
//                   Sort By:
//                   <Button
//                     id="basic-button"
//                     aria-controls={open ? 'basic-menu' : undefined}
//                     aria-haspopup="true"
//                     aria-expanded={open ? 'true' : undefined}
//                     onClick={handleClick}
//                     sx={{
//                       backgroundColor: "#ef7921",
//                       color: "#f1f1f1",
//                       fontSize: "12px",
//                       textTransform: "capitalize",
//                       border: "2px solid #fff",
//                       marginLeft: "0.5rem",
//                       '&:hover': {
//                         backgroundColor: "#e06b15"
//                       }
//                     }}
//                   >
//                     {getCurrentSortText()}
//                   </Button>
                  
//                   <Menu
//                     id="basic-menu"
//                     anchorEl={anchorEl}
//                     open={open}
//                     onClose={handleClose}
//                     slotProps={{
//                       list: {
//                         'aria-labelledby': 'basic-button',
//                       },
//                     }}
//                   >
//                     <MenuItem 
//                       onClick={() => handleSortChange('Sales, highest to lowest')} 
//                       sx={{ fontSize: "12px" }}
//                     >
//                       Sales, highest to lowest
//                     </MenuItem>
//                     <MenuItem 
//                       onClick={() => handleSortChange('Relevance')} 
//                       sx={{ fontSize: "12px" }}
//                     >
//                       Relevance
//                     </MenuItem>
//                     <MenuItem 
//                       onClick={() => handleSortChange('Name, A-Z')} 
//                       sx={{ fontSize: "12px" }}
//                     >
//                       Name, A-Z
//                     </MenuItem>
//                     <MenuItem 
//                       onClick={() => handleSortChange('Name, Z-A')} 
//                       sx={{ fontSize: "12px" }}
//                     >
//                       Name, Z-A
//                     </MenuItem>
//                     <MenuItem 
//                       onClick={() => handleSortChange('Price, low-high')} 
//                       sx={{ fontSize: "12px" }}
//                     >
//                       Price, low-high
//                     </MenuItem>
//                     <MenuItem 
//                       onClick={() => handleSortChange('Price, high-low')} 
//                       sx={{ fontSize: "12px" }}
//                     >
//                       Price, high-low
//                     </MenuItem>
//                   </Menu>
//                 </span>
//               </div>
//             </div>

//             {/* Products grid/list */}
//             {loading ? (
//               <div style={{ 
//                 display: 'flex', 
//                 justifyContent: 'center', 
//                 alignItems: 'center', 
//                 height: '200px',
//                 fontSize: '16px',
//                 color: '#666'
//               }}>
//                 Loading products...
//               </div>
//             ) : products.length === 0 ? (
//               <div style={{ 
//                 display: 'flex', 
//                 justifyContent: 'center', 
//                 alignItems: 'center', 
//                 height: '200px',
//                 fontSize: '16px',
//                 color: '#666'
//               }}>
//                 No products found matching your criteria.
//               </div>
//             ) : (
//               <>
//                 <div
//                   style={{
//                     display: "grid",
//                     gridTemplateColumns: itemView === "grid" ? "repeat(4, 1fr)" : "repeat(1, 1fr)",
//                     gap: "1rem"
//                   }}
//                 >
//                   {products.map((product) => (
//                     itemView === 'grid' ? 
//                     <ProductItem key={product._id} product={product} />
//                     :
//                     <ProductItemListView key={product._id} product={product} />
//                   ))}
//                 </div>

//                 {/* Pagination */}
//                 {pagination.pages > 1 && (
//                   <div style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
//                     <Pination 
//                       count={pagination.pages} 
//                       page={pagination.page}
//                       onChange={handlePageChange}
//                       showFirstButton 
//                       showLastButton
//                       color="primary"
//                     />
//                   </div>
//                 )}
//               </>
//             )}
//           </div>
//         </div>
//       </div>
//     </section>
//   )
// }

// export default ProductListing








































































// import React from 'react'
// import { useState } from 'react';
// import Sidebar from '../../components/Sidebar'
// import Typography from '@mui/material/Typography';
// import Breadcrumbs from '@mui/material/Breadcrumbs';
// import Link from '@mui/material/Link';
// import ProductItem from '../../components/ProductItem'
// import ProductItemListView from '../../components/ProductItemListView';
// import Button from '@mui/material/Button';
// import { IoGrid } from "react-icons/io5";
// import { GiHamburgerMenu } from "react-icons/gi";
// import Menu from '@mui/material/Menu';
// import MenuItem from '@mui/material/MenuItem';

// import Pagination from '@mui/material/Pagination'; 









// const ProductListing = () => {

//   const [itemView, setItemView] = useState('grid')
//   const [anchorEl, setAnchorEl] = useState(null);
//   const open = Boolean(anchorEl);
//   const handleClick = (event) => {
//     setAnchorEl(event.currentTarget);
//   };
//   const handleClose = () => {
//     setAnchorEl(null);
//   };
 

//   return (
//     <section style={{ padding: "2rem 0" }}> {/* py-8 */}
//       <div style={{ maxWidth: "1200px", margin: "0 auto" }}> {/* container */}
        
//         {/* Breadcrumb */}
//         <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 2 }}>
//           <Link 
//             underline="hover" 
//             color="inherit" 
//             href="/"
//             sx={{ fontSize: "14px", textDecoration: "none" }}
//           >
//             Home
//           </Link>

//           <Link
//             underline="hover"
//             color="inherit"
//             href="/"
//             sx={{ fontSize: "14px", textDecoration: "none" }}
//           >
//             Fashion
//           </Link> 
//         </Breadcrumbs>

//       </div>

//       <div style={{ background: "#fff", padding: "0.5rem" }}> {/* bg-white p-2 */}
//         <div style={{ display: "flex", gap: "1rem", maxWidth: "1200px", margin: "0 auto" }}> 
          
//           {/* Sidebar */}
//           <div style={{ width: "20%", background: "#fff" }}>
//             <Sidebar />
//           </div>

//           {/* Right content */}
//           <div style={{ width: "80%", padding: "1rem 0" }}>

//             {/* Top controls */}
//             <div style={{ 
//               background: "#f1f1f1", 
//               padding: "0.5rem", 
//               width: "100%", 
//               marginBottom: "0.75rem", 
//               borderRadius: "6px",
//               display: "flex",
//               alignItems: "center",
//               justifyContent: "space-between"
//             }}>
//               <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
//                 <Button 
//                   sx={{ 
//                     minWidth: "40px", 
//                     width: "40px", 
//                     height: "40px", 
//                     borderRadius: "50%", 
//                     color: itemView === "list" ? "#ef7921" : "#000" 
//                   }}
//                   onClick={() => setItemView('list')}
//                 >
//                   <GiHamburgerMenu style={{ fontSize: "18px", color: itemView === "list" ? "#ef7921" : "rgba(0,0,0,0.7)" }} />
//                 </Button>

//                 <Button 
//                   sx={{ 
//                     minWidth: "40px", 
//                     width: "40px", 
//                     height: "40px", 
//                     borderRadius: "50%", 
//                     color: itemView === "grid" ? "#ef7921" : "#000" 
//                   }}
//                   onClick={() => setItemView('grid')}
//                 >
//                   <IoGrid style={{ fontSize: "18px", color: itemView === "grid" ? "#ef7921" : "rgba(0,0,0,0.7)" }} />
//                 </Button>



//                 <span style={{ fontSize: "14px", fontWeight: 500, paddingLeft: "0.75rem", color: "rgba(0,0,0,0.7)" }}>
//                   There are 18 products
//                 </span>
//               </div>

//               <div className="col2 ml-auto flex items-center justify-end">
//                  <span style={{ fontSize: "14px", fontWeight: 500, paddingLeft: "0.75rem", color: "rgba(0,0,0,0.7)" }}>
//                   Sort By:

//                   <Button
//                     id="basic-button"
//                     aria-controls={open ? 'basic-menu' : undefined}
//                     aria-haspopup="true"
//                     aria-expanded={open ? 'true' : undefined}
//                     onClick={handleClick}
//                     className='!bg-[#ef7921] !text-[12px] !text-[#f1f1f1] !capitalize !border-2 !border-[#fff]'

//                   >
//                     Sales, highest to lowest 
//                   </Button>
                  
//                   <Menu
//                     id="basic-menu"
//                     anchorEl={anchorEl}
//                     open={open}
//                     onClose={handleClose}
//                     slotProps={{
//                       list: {
//                         'aria-labelledby': 'basic-button',
//                       },
//                     }}
                    
//                   >
//                     <MenuItem onClick={handleClose} className='!text-[12px]'>Sales, highest to lowest</MenuItem>
//                     <MenuItem onClick={handleClose} className='!text-[12px]'>Relevance</MenuItem>
//                     <MenuItem onClick={handleClose} className='!text-[12px]'>Name, A-Z </MenuItem>
//                     <MenuItem onClick={handleClose} className='!text-[12px]'>Name, Z-A </MenuItem>
//                     <MenuItem onClick={handleClose} className='!text-[12px]'>Price, low-high </MenuItem>
//                     <MenuItem onClick={handleClose} className='!text-[12px]'>Price, high-low </MenuItem>
//                   </Menu>
//                 </span>
//               </div>
//             </div>

//             {/* Products grid */}
//             {/* <div style={{ 
//               display: "grid", 
//               gridTemplateColumns: "repeat(4, 1fr)", 
//               gap: "0.75rem" 
//             }}> */}

//             <div
//               style={{
//                 display: "grid",
//                 gridTemplateColumns: itemView === "grid" ? "repeat(4, 1fr)" : "repeat(1, 1fr)",
//                 gap: "1rem" // Tailwind's gap-4 = 16px = 1rem
//               }}
//             >

//               {
//                 itemView === 'grid' ? 
//                 <>
//                   <ProductItem />
//                   <ProductItem />
//                   <ProductItem />
//                   <ProductItem />
//                   <ProductItem />
//                   <ProductItem />
//                   <ProductItem />
//                   <ProductItem />
//                   <ProductItem />
//                   <ProductItem />
//                 </>

//                 :

//                 <>
//                   <ProductItemListView />
//                   <ProductItemListView />
//                   <ProductItemListView />
//                   <ProductItemListView />
//                   <ProductItemListView />
//                   <ProductItemListView />
//                   <ProductItemListView />
//                   <ProductItemListView />
//                   <ProductItemListView />
//                   <ProductItemListView />
//                   <ProductItemListView />
//                   <ProductItemListView />
//                   <ProductItemListView />
//                   <ProductItemListView />
//                   <ProductItemListView />
//                   <ProductItemListView />
//                 </>
//               } 

//               </div>


//               <div className="flex items-center justify-center " style={{marginTop: '20px'}}>
//                 <Pagination count={10} showFirstButton showLastButton/>
//               </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   )
// }

// export default ProductListing











// import React from 'react'
// import Sidebar from '../../components/Sidebar'
// import Typography from '@mui/material/Typography';
// import Breadcrumbs from '@mui/material/Breadcrumbs';
// import Link from '@mui/material/Link';
// import ProductItem from '../../components/ProductItem'
// import Button from '@mui/material/Button';
// import { IoGrid } from "react-icons/io5";
// import { GiHamburgerMenu } from "react-icons/gi";



// function handleClick(event) {
//   event.preventDefault();
//   console.info('You clicked a breadcrumb.');
// }



// const ProductListing = () => {
//   return (
//     <section className='py-8'>
//       <div className="container">
//         <Breadcrumbs aria-label="breadcrumb">
//             <Link 
//               underline="hover" 
//               color="inherit" 
//               href="/"
//               className='link transition'
//             >
//               Home
//             </Link>

//             <Link
//               underline="hover"
//               color="inherit"
//               href="/"
//               className='link transition'
//             >
//               Fashion
//             </Link> 
//         </Breadcrumbs>
//       </div>
//       <div className="bg-white p-2">
//         <div className="container flex gap-3"> 
//         <div className="sidebarWrapper w-[20%] h-full bg-white">
//           <Sidebar />
//         </div>

//         <div className="rightContent w-[80%] py-3">

//           <div className="bg-[#f1f1f1] p-2 w-full mb-3 rounded-md flex items-center justify-between">
//             <div className="col1 flex items-center gap-3">
//               <Button className='!w-[40px] !h-[40px] !min-w-[40px] !rounded-full !text-[#000]'>
//                 <GiHamburgerMenu className='text-[rgba(0,0,0,0.7)]'/>
//               </Button>
//               <Button className='!w-[40px] !h-[40px] !min-w-[40px] !rounded-full !text-[#000]'>
//                 <IoGrid className='text-[rgba(0,0,0,0.7)]'/>
//               </Button>

//               <span className="text-[14px] font-[500] pl-3 text-[rgba(0,0,0,0.7)]">
//                 There are 18 products 
//               </span>
//             </div>
//           </div>

//           <div className="grid grid-cols-4 md:grid-cols-4 gap-3">
//             <ProductItem />
//             <ProductItem />
//             <ProductItem />
//             <ProductItem />
//             <ProductItem />
//             <ProductItem />
//             <ProductItem />
//             <ProductItem />
//             <ProductItem />
//             <ProductItem />
//           </div>
//         </div>
//       </div>
//       </div>
//     </section>
//   )
// }

// export default ProductListing