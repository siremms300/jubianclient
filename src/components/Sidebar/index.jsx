import React, { useState, useEffect } from "react";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { Collapse } from "react-collapse";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import Button from "@mui/material/Button";
import RangeSlider from "react-range-slider-input";
import "react-range-slider-input/dist/style.css";
import { categoryApi } from "../../utils/categoryApi";
import { useSearchParams } from "react-router-dom";

const Sidebar = ({ onFiltersChange }) => {
  const [isOpenCategoryFilter, setIsOpenCategoryFilter] = useState(true);
  const [isOpenPriceFilter, setIsOpenPriceFilter] = useState(true);
  const [isOpenStatusFilter, setIsOpenStatusFilter] = useState(true);
  
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [searchParams] = useSearchParams();
  
  // Filter states
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 100000]);
  const [selectedStatus, setSelectedStatus] = useState('');

  const categoryParam = searchParams.get('category');
  const minPriceParam = searchParams.get('minPrice');
  const maxPriceParam = searchParams.get('maxPrice');
  const statusParam = searchParams.get('status');

  // Fetch categories on component mount
  useEffect(() => {
    fetchCategories();
  }, []);

  // Sync with URL parameters
  useEffect(() => {
    if (categoryParam) {
      // Handle multiple categories from URL (comma separated)
      const categoriesFromUrl = categoryParam.split(',').filter(Boolean);
      setSelectedCategories(categoriesFromUrl);
    }
    
    if (minPriceParam || maxPriceParam) {
      setPriceRange([
        minPriceParam ? parseInt(minPriceParam) : 0,
        maxPriceParam ? parseInt(maxPriceParam) : 100000
      ]);
    }
    
    if (statusParam) {
      setSelectedStatus(statusParam);
    }
  }, [categoryParam, minPriceParam, maxPriceParam, statusParam]);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const response = await categoryApi.getMainCategories();
      if (response.success) {
        setCategories(response.data);
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
    } finally {
      setLoading(false);
    }
  };

  // Handle category selection
  const handleCategoryChange = (categoryId) => {
    const newSelectedCategories = selectedCategories.includes(categoryId)
      ? selectedCategories.filter(id => id !== categoryId)
      : [...selectedCategories, categoryId];
    
    setSelectedCategories(newSelectedCategories);
    applyFilters({ 
      category: newSelectedCategories.length > 0 ? newSelectedCategories.join(',') : null 
    });
  };

  // Handle select all/unselect all categories
  const handleSelectAllCategories = () => {
    if (selectedCategories.length === categories.length) {
      // Unselect all
      setSelectedCategories([]);
      applyFilters({ category: null });
    } else {
      // Select all
      const allCategoryIds = categories.map(cat => cat._id);
      setSelectedCategories(allCategoryIds);
      applyFilters({ category: allCategoryIds.join(',') });
    }
  };

  // Handle price range change
  const handlePriceRangeChange = (newRange) => {
    setPriceRange(newRange);
  };

  const handlePriceRangeFinalChange = (newRange) => {
    applyFilters({ 
      minPrice: newRange[0] > 0 ? newRange[0] : null,
      maxPrice: newRange[1] < 100000 ? newRange[1] : null
    });
  };

  // Handle status filter
  const handleStatusChange = (status) => {
    const newStatus = selectedStatus === status ? '' : status;
    setSelectedStatus(newStatus);
    applyFilters({ status: newStatus || null });
  };

  // Apply all filters
  const applyFilters = (updatedFilters = {}) => {
    const filters = {
      category: selectedCategories.length > 0 ? selectedCategories.join(',') : null,
      minPrice: priceRange[0] > 0 ? priceRange[0] : null,
      maxPrice: priceRange[1] < 100000 ? priceRange[1] : null,
      status: selectedStatus || null,
      ...updatedFilters
    };

    console.log('Applying filters:', filters);

    if (onFiltersChange) {
      onFiltersChange(filters);
    }
  };

  // Clear all filters
  const clearAllFilters = () => {
    setSelectedCategories([]);
    setPriceRange([0, 100000]);
    setSelectedStatus('');
    
    if (onFiltersChange) {
      onFiltersChange({
        category: null,
        minPrice: null,
        maxPrice: null,
        status: null
      });
    }
  };

  const boxStyle = {
    padding: "16px",
    border: "1px solid rgba(0,0,0,0.1)",
    borderRadius: "6px",
    marginBottom: "20px",
    backgroundColor: "#fff",
  };

  const headingStyle = {
    fontSize: "16px",
    fontWeight: 500,
    display: "flex",
    alignItems: "center",
    marginBottom: "12px",
  };

  const scrollStyle = {
    paddingLeft: "8px",
    display: "flex",
    flexDirection: "column",
    gap: "6px",
    maxHeight: "300px",
    overflowY: "auto",
  };

  const loadingStyle = {
    padding: "8px",
    textAlign: "center",
    color: "#6b7280",
    fontSize: "14px",
  };

  const statusOptions = [
    { value: 'Active', label: 'In Stock' },
    { value: 'Out of Stock', label: 'Out of Stock' }
  ];

  const hasActiveFilters = selectedCategories.length > 0 || priceRange[0] > 0 || priceRange[1] < 100000 || selectedStatus;

  // Check if all categories are selected
  const allCategoriesSelected = categories.length > 0 && selectedCategories.length === categories.length;
  // Check if some but not all categories are selected (for indeterminate state)
  const someCategoriesSelected = selectedCategories.length > 0 && selectedCategories.length < categories.length;

  return (
    <aside style={{ padding: "20px", width: "260px", backgroundColor: "#f9fafb" }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <h2 style={{ fontSize: "18px", fontWeight: 600, margin: 0 }}>Filters</h2>
        {hasActiveFilters && (
          <Button 
            onClick={clearAllFilters}
            sx={{ fontSize: "12px", textTransform: 'none', color: "#ef7921" }}
          >
            Clear All
          </Button>
        )}
      </div>

      {/* Categories */}
      <div style={boxStyle}>
        <h3 style={headingStyle}>
          Categories
          <Button
            style={{
              width: "30px",
              height: "30px",
              minWidth: "30px",
              borderRadius: "50%",
              marginLeft: "auto",
            }}
            onClick={() => setIsOpenCategoryFilter(!isOpenCategoryFilter)}
          >
            {isOpenCategoryFilter ? <FaAngleDown /> : <FaAngleUp />}
          </Button>
        </h3>
        <Collapse isOpened={isOpenCategoryFilter}>
          {loading ? (
            <div style={loadingStyle}>Loading categories...</div>
          ) : (
            <div style={scrollStyle}>
              {/* Select All / Unselect All checkbox */}
              <FormControlLabel 
                control={
                  <Checkbox 
                    size="small" 
                    checked={allCategoriesSelected}
                    indeterminate={someCategoriesSelected}
                    onChange={handleSelectAllCategories}
                  />
                } 
                label={
                  <span style={{ 
                    fontSize: '14px', 
                    fontWeight: 600,
                    color: allCategoriesSelected || someCategoriesSelected ? '#ef7921' : 'inherit'
                  }}>
                    {allCategoriesSelected ? 'Unselect All' : 'Select All'}
                  </span>
                } 
                sx={{ marginBottom: '8px', borderBottom: '1px solid #f0f0f0', paddingBottom: '8px' }}
              />
              
              {categories.map((category) => (
                <FormControlLabel 
                  key={category._id}
                  control={
                    <Checkbox 
                      size="small" 
                      checked={selectedCategories.includes(category._id)}
                      onChange={() => handleCategoryChange(category._id)}
                    />
                  } 
                  label={
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                      <span style={{ fontSize: '14px' }}>{category.name}</span>
                      {category.productCount > 0 && (
                        <span style={{ 
                          fontSize: '12px', 
                          color: '#6b7280',
                          backgroundColor: '#f3f4f6',
                          padding: '2px 6px',
                          borderRadius: '12px'
                        }}>
                          {category.productCount}
                        </span>
                      )}
                    </div>
                  } 
                />
              ))}
              
              {categories.length === 0 && (
                <div style={loadingStyle}>No categories available</div>
              )}
            </div>
          )}
        </Collapse>
      </div>

      {/* Price Filter */}
      <div style={boxStyle}>
        <h3 style={headingStyle}>
          Price Range
          <Button
            style={{
              width: "30px",
              height: "30px",
              minWidth: "30px",
              borderRadius: "50%",
              marginLeft: "auto",
            }}
            onClick={() => setIsOpenPriceFilter(!isOpenPriceFilter)}
          >
            {isOpenPriceFilter ? <FaAngleDown /> : <FaAngleUp />}
          </Button>
        </h3>
        <Collapse isOpened={isOpenPriceFilter}>
          <div style={{ padding: "0 8px" }}>
            <RangeSlider 
              min={0}
              max={100000}
              step={1000}
              value={priceRange}
              onInput={handlePriceRangeChange}
              onThumbDragEnd={handlePriceRangeFinalChange}
            />
            <div style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: "12px",
              fontSize: "14px",
            }}>
              <span>${priceRange[0].toLocaleString()}</span>
              <span>${priceRange[1].toLocaleString()}</span>
            </div>
            <div style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: "4px",
              fontSize: "12px",
              color: "#6b7280"
            }}>
              <span>Min: $0</span>
              <span>Max: $100,000</span>
            </div>
          </div>
        </Collapse>
      </div>

      {/* Status Filter */}
      <div style={boxStyle}>
        <h3 style={headingStyle}>
          Availability
          <Button
            style={{
              width: "30px",
              height: "30px",
              minWidth: "30px",
              borderRadius: "50%",
              marginLeft: "auto",
            }}
            onClick={() => setIsOpenStatusFilter(!isOpenStatusFilter)}
          >
            {isOpenStatusFilter ? <FaAngleDown /> : <FaAngleUp />}
          </Button>
        </h3>
        <Collapse isOpened={isOpenStatusFilter}>
          <div style={scrollStyle}>
            {statusOptions.map((option) => (
              <FormControlLabel 
                key={option.value}
                control={
                  <Checkbox 
                    size="small" 
                    checked={selectedStatus === option.value}
                    onChange={() => handleStatusChange(option.value)}
                  />
                } 
                label={option.label} 
              />
            ))}
          </div>
        </Collapse>
      </div>

      {/* Selected Categories Count (for debugging) */}
      {selectedCategories.length > 0 && (
        <div style={{ 
          fontSize: "12px", 
          color: "#6b7280", 
          textAlign: "center",
          marginTop: "8px"
        }}>
          {selectedCategories.length} categor{selectedCategories.length === 1 ? 'y' : 'ies'} selected
        </div>
      )}
    </aside>
  );
};

export default Sidebar;















































































// import React, { useState, useEffect } from "react";
// import FormControlLabel from "@mui/material/FormControlLabel";
// import Checkbox from "@mui/material/Checkbox";
// import { Collapse } from "react-collapse";
// import { FaAngleDown, FaAngleUp } from "react-icons/fa";
// import Button from "@mui/material/Button";
// import RangeSlider from "react-range-slider-input";
// import "react-range-slider-input/dist/style.css";
// import { categoryApi } from "../../utils/categoryApi";
// import { useSearchParams } from "react-router-dom";

// const Sidebar = ({ onFiltersChange }) => {
//   const [isOpenCategoryFilter, setIsOpenCategoryFilter] = useState(true);
//   const [isOpenPriceFilter, setIsOpenPriceFilter] = useState(true);
//   const [isOpenStatusFilter, setIsOpenStatusFilter] = useState(true);
  
//   const [categories, setCategories] = useState([]);
//   const [loading, setLoading] = useState(true);
  
//   const [searchParams] = useSearchParams();
  
//   // Filter states
//   const [selectedCategories, setSelectedCategories] = useState([]);
//   const [priceRange, setPriceRange] = useState([0, 10000]);
//   const [selectedStatus, setSelectedStatus] = useState('');

//   const categoryParam = searchParams.get('category');
//   const minPriceParam = searchParams.get('minPrice');
//   const maxPriceParam = searchParams.get('maxPrice');
//   const statusParam = searchParams.get('status');

//   // Fetch categories on component mount
//   useEffect(() => {
//     fetchCategories();
//   }, []);

//   // Sync with URL parameters
//   useEffect(() => {
//     if (categoryParam) {
//       setSelectedCategories([categoryParam]);
//     }
    
//     if (minPriceParam || maxPriceParam) {
//       setPriceRange([
//         minPriceParam ? parseInt(minPriceParam) : 0,
//         maxPriceParam ? parseInt(maxPriceParam) : 10000
//       ]);
//     }
    
//     if (statusParam) {
//       setSelectedStatus(statusParam);
//     }
//   }, [categoryParam, minPriceParam, maxPriceParam, statusParam]);

//   const fetchCategories = async () => {
//     try {
//       setLoading(true);
//       const response = await categoryApi.getMainCategories();
//       if (response.success) {
//         setCategories(response.data);
//       }
//     } catch (error) {
//       console.error('Error fetching categories:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Handle category selection
//   const handleCategoryChange = (categoryId) => {
//     const newSelectedCategories = selectedCategories.includes(categoryId)
//       ? selectedCategories.filter(id => id !== categoryId)
//       : [categoryId];
    
//     setSelectedCategories(newSelectedCategories);
//     applyFilters({ 
//       category: newSelectedCategories.length > 0 ? newSelectedCategories[0] : null 
//     });
//   };

//   // Handle price range change
//   const handlePriceRangeChange = (newRange) => {
//     setPriceRange(newRange);
//   };

//   const handlePriceRangeFinalChange = (newRange) => {
//     applyFilters({ 
//       minPrice: newRange[0] > 0 ? newRange[0] : null,
//       maxPrice: newRange[1] < 10000 ? newRange[1] : null
//     });
//   };

//   // Handle status filter
//   const handleStatusChange = (status) => {
//     const newStatus = selectedStatus === status ? '' : status;
//     setSelectedStatus(newStatus);
//     applyFilters({ status: newStatus || null });
//   };

//   // Apply all filters
//   const applyFilters = (updatedFilters = {}) => {
//     const filters = {
//       category: selectedCategories.length > 0 ? selectedCategories[0] : null,
//       minPrice: priceRange[0] > 0 ? priceRange[0] : null,
//       maxPrice: priceRange[1] < 10000 ? priceRange[1] : null,
//       status: selectedStatus || null,
//       ...updatedFilters
//     };

//     console.log('Applying filters:', filters);

//     if (onFiltersChange) {
//       onFiltersChange(filters);
//     }
//   };

//   // Clear all filters
//   const clearAllFilters = () => {
//     setSelectedCategories([]);
//     setPriceRange([0, 10000]);
//     setSelectedStatus('');
    
//     if (onFiltersChange) {
//       onFiltersChange({
//         category: null,
//         minPrice: null,
//         maxPrice: null,
//         status: null
//       });
//     }
//   };

//   const boxStyle = {
//     padding: "16px",
//     border: "1px solid rgba(0,0,0,0.1)",
//     borderRadius: "6px",
//     marginBottom: "20px",
//     backgroundColor: "#fff",
//   };

//   const headingStyle = {
//     fontSize: "16px",
//     fontWeight: 500,
//     display: "flex",
//     alignItems: "center",
//     marginBottom: "12px",
//   };

//   const scrollStyle = {
//     paddingLeft: "8px",
//     display: "flex",
//     flexDirection: "column",
//     gap: "6px",
//     maxHeight: "300px",
//     overflowY: "auto",
//   };

//   const loadingStyle = {
//     padding: "8px",
//     textAlign: "center",
//     color: "#6b7280",
//     fontSize: "14px",
//   };

//   const statusOptions = [
//     { value: 'Active', label: 'In Stock' },
//     { value: 'Out of Stock', label: 'Out of Stock' }
//   ];

//   const hasActiveFilters = selectedCategories.length > 0 || priceRange[0] > 0 || priceRange[1] < 10000 || selectedStatus;

//   return (
//     <aside style={{ padding: "20px", width: "260px", backgroundColor: "#f9fafb" }}>
//       {/* Header */}
//       <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
//         <h2 style={{ fontSize: "18px", fontWeight: 600, margin: 0 }}>Filters</h2>
//         {hasActiveFilters && (
//           <Button 
//             onClick={clearAllFilters}
//             sx={{ fontSize: "12px", textTransform: 'none', color: "#ef7921" }}
//           >
//             Clear All
//           </Button>
//         )}
//       </div>

//       {/* Categories */}
//       <div style={boxStyle}>
//         <h3 style={headingStyle}>
//           Categories
//           <Button
//             style={{
//               width: "30px",
//               height: "30px",
//               minWidth: "30px",
//               borderRadius: "50%",
//               marginLeft: "auto",
//             }}
//             onClick={() => setIsOpenCategoryFilter(!isOpenCategoryFilter)}
//           >
//             {isOpenCategoryFilter ? <FaAngleDown /> : <FaAngleUp />}
//           </Button>
//         </h3>
//         <Collapse isOpened={isOpenCategoryFilter}>
//           {loading ? (
//             <div style={loadingStyle}>Loading categories...</div>
//           ) : (
//             <div style={scrollStyle}>
//               {categories.map((category) => (
//                 <FormControlLabel 
//                   key={category._id}
//                   control={
//                     <Checkbox 
//                       size="small" 
//                       checked={selectedCategories.includes(category._id)}
//                       onChange={() => handleCategoryChange(category._id)}
//                     />
//                   } 
//                   label={
//                     <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
//                       <span style={{ fontSize: '14px' }}>{category.name}</span>
//                     </div>
//                   } 
//                 />
//               ))}
              
//               {categories.length === 0 && (
//                 <div style={loadingStyle}>No categories available</div>
//               )}
//             </div>
//           )}
//         </Collapse>
//       </div>

//       {/* Price Filter */}
//       <div style={boxStyle}>
//         <h3 style={headingStyle}>
//           Price Range
//           <Button
//             style={{
//               width: "30px",
//               height: "30px",
//               minWidth: "30px",
//               borderRadius: "50%",
//               marginLeft: "auto",
//             }}
//             onClick={() => setIsOpenPriceFilter(!isOpenPriceFilter)}
//           >
//             {isOpenPriceFilter ? <FaAngleDown /> : <FaAngleUp />}
//           </Button>
//         </h3>
//         <Collapse isOpened={isOpenPriceFilter}>
//           <div style={{ padding: "0 8px" }}>
//             <RangeSlider 
//               min={0}
//               max={10000}
//               step={100}
//               value={priceRange}
//               onInput={handlePriceRangeChange}
//               onThumbDragEnd={handlePriceRangeFinalChange}
//             />
//             <div style={{
//               display: "flex",
//               justifyContent: "space-between",
//               marginTop: "12px",
//               fontSize: "14px",
//             }}>
//               <span>${priceRange[0]}</span>
//               <span>${priceRange[1]}</span>
//             </div>
//           </div>
//         </Collapse>
//       </div>

//       {/* Status Filter */}
//       <div style={boxStyle}>
//         <h3 style={headingStyle}>
//           Availability
//           <Button
//             style={{
//               width: "30px",
//               height: "30px",
//               minWidth: "30px",
//               borderRadius: "50%",
//               marginLeft: "auto",
//             }}
//             onClick={() => setIsOpenStatusFilter(!isOpenStatusFilter)}
//           >
//             {isOpenStatusFilter ? <FaAngleDown /> : <FaAngleUp />}
//           </Button>
//         </h3>
//         <Collapse isOpened={isOpenStatusFilter}>
//           <div style={scrollStyle}>
//             {statusOptions.map((option) => (
//               <FormControlLabel 
//                 key={option.value}
//                 control={
//                   <Checkbox 
//                     size="small" 
//                     checked={selectedStatus === option.value}
//                     onChange={() => handleStatusChange(option.value)}
//                   />
//                 } 
//                 label={option.label} 
//               />
//             ))}
//           </div>
//         </Collapse>
//       </div>
//     </aside>
//   );
// };

// export default Sidebar;









































































// import React, { useState, useEffect } from "react";
// import FormControlLabel from "@mui/material/FormControlLabel";
// import Checkbox from "@mui/material/Checkbox";
// import { Collapse } from "react-collapse";
// import { FaAngleDown, FaAngleUp } from "react-icons/fa";
// import Button from "@mui/material/Button";
// import RangeSlider from "react-range-slider-input";
// import "react-range-slider-input/dist/style.css";
// import Rating from "@mui/material/Rating";
// import { categoryApi } from "../../utils/categoryApi";
// import { useSearchParams } from "react-router-dom";

// const Sidebar = ({ onFiltersChange }) => {
//   const [isOpenCategoryFilter, setIsOpenCategoryFilter] = useState(true);
//   const [isOpenAvailableFilter, setIsOpenAvailableFilter] = useState(true);
//   const [isOpenSizeFilter, setIsOpenSizeFilter] = useState(true);
//   const [isOpenPriceFilter, setIsOpenPriceFilter] = useState(true);
//   const [isOpenRatingFilter, setIsOpenRatingFilter] = useState(true);
  
//   const [categories, setCategories] = useState([]);
//   const [loading, setLoading] = useState(true);
  
//   const [searchParams] = useSearchParams();
  
//   // Filter states
//   const [selectedCategories, setSelectedCategories] = useState([]);
//   const [selectedAvailability, setSelectedAvailability] = useState([]);
//   const [selectedSizes, setSelectedSizes] = useState([]);
//   const [priceRange, setPriceRange] = useState([0, 10000]);
//   const [selectedRating, setSelectedRating] = useState(0);

//   const categoryParam = searchParams.get('category');
//   const minPriceParam = searchParams.get('minPrice');
//   const maxPriceParam = searchParams.get('maxPrice');
//   const ratingParam = searchParams.get('rating');
//   const availabilityParam = searchParams.get('availability');
//   const sizeParam = searchParams.get('size');

//   // Fetch categories on component mount
//   useEffect(() => {
//     fetchCategories();
//   }, []);

//   // Sync with URL parameters
//   useEffect(() => {
//     if (categoryParam) {
//       setSelectedCategories([categoryParam]);
//     }
    
//     if (minPriceParam && maxPriceParam) {
//       setPriceRange([parseInt(minPriceParam), parseInt(maxPriceParam)]);
//     }
    
//     if (ratingParam) {
//       setSelectedRating(parseInt(ratingParam));
//     }
    
//     if (availabilityParam) {
//       setSelectedAvailability([availabilityParam]);
//     }
    
//     if (sizeParam) {
//       setSelectedSizes([sizeParam]);
//     }
//   }, [categoryParam, minPriceParam, maxPriceParam, ratingParam, availabilityParam, sizeParam]);

//   const fetchCategories = async () => {
//     try {
//       setLoading(true);
//       const response = await categoryApi.getMainCategories();
//       if (response.success) {
//         setCategories(response.data);
//       }
//     } catch (error) {
//       console.error('Error fetching categories:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Handle category selection
//   const handleCategoryChange = (categoryId) => {
//     const newSelectedCategories = selectedCategories.includes(categoryId)
//       ? selectedCategories.filter(id => id !== categoryId)
//       : [...selectedCategories, categoryId];
    
//     setSelectedCategories(newSelectedCategories);
//     applyFilters({ category: newSelectedCategories.length > 0 ? newSelectedCategories[0] : null });
//   };

//   // Handle availability filter
//   const handleAvailabilityChange = (availability) => {
//     const newSelectedAvailability = selectedAvailability.includes(availability)
//       ? selectedAvailability.filter(item => item !== availability)
//       : [...selectedAvailability, availability];
    
//     setSelectedAvailability(newSelectedAvailability);
//     applyFilters({ availability: newSelectedAvailability.length > 0 ? newSelectedAvailability[0] : null });
//   };

//   // Handle size filter
//   const handleSizeChange = (size) => {
//     const newSelectedSizes = selectedSizes.includes(size)
//       ? selectedSizes.filter(item => item !== size)
//       : [...selectedSizes, size];
    
//     setSelectedSizes(newSelectedSizes);
//     applyFilters({ size: newSelectedSizes.length > 0 ? newSelectedSizes[0] : null });
//   };

//   // Handle price range change
//   const handlePriceRangeChange = (newRange) => {
//     setPriceRange(newRange);
//     applyFilters({ 
//       minPrice: newRange[0],
//       maxPrice: newRange[1]
//     });
//   };

//   // Handle rating filter
//   const handleRatingChange = (rating) => {
//     const newRating = selectedRating === rating ? 0 : rating;
//     setSelectedRating(newRating);
//     applyFilters({ rating: newRating > 0 ? newRating : null });
//   };

//   // Apply all filters
//   const applyFilters = (updatedFilters = {}) => {
//     const filters = {
//       category: selectedCategories.length > 0 ? selectedCategories[0] : null,
//       minPrice: priceRange[0],
//       maxPrice: priceRange[1],
//       rating: selectedRating > 0 ? selectedRating : null,
//       availability: selectedAvailability.length > 0 ? selectedAvailability[0] : null,
//       size: selectedSizes.length > 0 ? selectedSizes[0] : null,
//       ...updatedFilters
//     };

//     // Update the selected states based on updated filters
//     if (updatedFilters.category !== undefined) {
//       setSelectedCategories(updatedFilters.category ? [updatedFilters.category] : []);
//     }
//     if (updatedFilters.availability !== undefined) {
//       setSelectedAvailability(updatedFilters.availability ? [updatedFilters.availability] : []);
//     }
//     if (updatedFilters.size !== undefined) {
//       setSelectedSizes(updatedFilters.size ? [updatedFilters.size] : []);
//     }
//     if (updatedFilters.minPrice !== undefined && updatedFilters.maxPrice !== undefined) {
//       setPriceRange([updatedFilters.minPrice, updatedFilters.maxPrice]);
//     }
//     if (updatedFilters.rating !== undefined) {
//       setSelectedRating(updatedFilters.rating || 0);
//     }

//     if (onFiltersChange) {
//       onFiltersChange(filters);
//     }
//   };

//   // Clear all filters
//   const clearAllFilters = () => {
//     setSelectedCategories([]);
//     setSelectedAvailability([]);
//     setSelectedSizes([]);
//     setPriceRange([0, 10000]);
//     setSelectedRating(0);
    
//     if (onFiltersChange) {
//       onFiltersChange({
//         category: null,
//         minPrice: null,
//         maxPrice: null,
//         rating: null,
//         availability: null,
//         size: null
//       });
//     }
//   };

//   const boxStyle = {
//     padding: "16px",
//     border: "1px solid rgba(0,0,0,0.1)",
//     borderRadius: "6px",
//     marginBottom: "20px",
//     backgroundColor: "#fff",
//   };

//   const headingStyle = {
//     fontSize: "16px",
//     fontWeight: 500,
//     display: "flex",
//     alignItems: "center",
//     marginBottom: "12px",
//   };

//   const scrollStyle = {
//     paddingLeft: "8px",
//     display: "flex",
//     flexDirection: "column",
//     gap: "6px",
//     maxHeight: "300px",
//     overflowY: "auto",
//   };

//   const loadingStyle = {
//     padding: "8px",
//     textAlign: "center",
//     color: "#6b7280",
//     fontSize: "14px",
//   };

//   const commonSizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
//   const availabilityOptions = [
//     { value: 'in-stock', label: 'In Stock' },
//     { value: 'out-of-stock', label: 'Out of Stock' },
//     { value: 'pre-order', label: 'Pre-order' }
//   ];

//   return (
//     <aside style={{ padding: "20px", width: "260px", backgroundColor: "#f9fafb" }}>
//       {/* Header */}
//       <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
//         <h2 style={{ fontSize: "18px", fontWeight: 600, margin: 0 }}>Filters</h2>
//         <Button 
//           onClick={clearAllFilters}
//           sx={{ fontSize: "12px", textTransform: 'none' }}
//         >
//           Clear All
//         </Button>
//       </div>

//       {/* Categories */}
//       <div style={boxStyle}>
//         <h3 style={headingStyle}>
//           Categories
//           <Button
//             style={{
//               width: "30px",
//               height: "30px",
//               minWidth: "30px",
//               borderRadius: "50%",
//               marginLeft: "auto",
//             }}
//             onClick={() => setIsOpenCategoryFilter(!isOpenCategoryFilter)}
//           >
//             {isOpenCategoryFilter ? <FaAngleDown /> : <FaAngleUp />}
//           </Button>
//         </h3>
//         <Collapse isOpened={isOpenCategoryFilter}>
//           {loading ? (
//             <div style={loadingStyle}>Loading categories...</div>
//           ) : (
//             <div style={scrollStyle}>
//               {categories.map((category) => (
//                 <FormControlLabel 
//                   key={category._id}
//                   control={
//                     <Checkbox 
//                       size="small" 
//                       checked={selectedCategories.includes(category._id)}
//                       onChange={() => handleCategoryChange(category._id)}
//                     />
//                   } 
//                   label={
//                     <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
//                       <span>{category.name}</span>
//                       {category.productCount > 0 && (
//                         <span style={{ 
//                           fontSize: '12px', 
//                           color: '#6b7280',
//                           backgroundColor: '#f3f4f6',
//                           padding: '2px 6px',
//                           borderRadius: '12px'
//                         }}>
//                           {category.productCount}
//                         </span>
//                       )}
//                     </div>
//                   } 
//                 />
//               ))}
              
//               {categories.length === 0 && (
//                 <div style={loadingStyle}>No categories available</div>
//               )}
//             </div>
//           )}
//         </Collapse>
//       </div>

//       {/* Price Filter */}
//       <div style={boxStyle}>
//         <h3 style={headingStyle}>
//           Price Range
//           <Button
//             style={{
//               width: "30px",
//               height: "30px",
//               minWidth: "30px",
//               borderRadius: "50%",
//               marginLeft: "auto",
//             }}
//             onClick={() => setIsOpenPriceFilter(!isOpenPriceFilter)}
//           >
//             {isOpenPriceFilter ? <FaAngleDown /> : <FaAngleUp />}
//           </Button>
//         </h3>
//         <Collapse isOpened={isOpenPriceFilter}>
//           <div style={{ padding: "0 8px" }}>
//             <RangeSlider 
//               min={0}
//               max={10000}
//               step={100}
//               value={priceRange}
//               onInput={handlePriceRangeChange}
//             />
//             <div style={{
//               display: "flex",
//               justifyContent: "space-between",
//               marginTop: "12px",
//               fontSize: "14px",
//             }}>
//               <span>${priceRange[0]}</span>
//               <span>${priceRange[1]}</span>
//             </div>
//           </div>
//         </Collapse>
//       </div>

//       {/* Rating Filter */}
//       <div style={boxStyle}>
//         <h3 style={headingStyle}>
//           Customer Rating
//           <Button
//             style={{
//               width: "30px",
//               height: "30px",
//               minWidth: "30px",
//               borderRadius: "50%",
//               marginLeft: "auto",
//             }}
//             onClick={() => setIsOpenRatingFilter(!isOpenRatingFilter)}
//           >
//             {isOpenRatingFilter ? <FaAngleDown /> : <FaAngleUp />}
//           </Button>
//         </h3>
//         <Collapse isOpened={isOpenRatingFilter}>
//           <div style={{ display: "flex", flexDirection: "column", gap: "8px", padding: "0 8px" }}>
//             {[5, 4, 3, 2, 1].map((rating) => (
//               <FormControlLabel
//                 key={rating}
//                 control={
//                   <Checkbox 
//                     size="small" 
//                     checked={selectedRating === rating}
//                     onChange={() => handleRatingChange(rating)}
//                   />
//                 }
//                 label={
//                   <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
//                     <Rating value={rating} readOnly size="small" />
//                     <span style={{ fontSize: '14px' }}>& above</span>
//                   </div>
//                 }
//               />
//             ))}
//           </div>
//         </Collapse>
//       </div>

//       {/* Availability */}
//       <div style={boxStyle}>
//         <h3 style={headingStyle}>
//           Availability
//           <Button
//             style={{
//               width: "30px",
//               height: "30px",
//               minWidth: "30px",
//               borderRadius: "50%",
//               marginLeft: "auto",
//             }}
//             onClick={() => setIsOpenAvailableFilter(!isOpenAvailableFilter)}
//           >
//             {isOpenAvailableFilter ? <FaAngleDown /> : <FaAngleUp />}
//           </Button>
//         </h3>
//         <Collapse isOpened={isOpenAvailableFilter}>
//           <div style={scrollStyle}>
//             {availabilityOptions.map((option) => (
//               <FormControlLabel 
//                 key={option.value}
//                 control={
//                   <Checkbox 
//                     size="small" 
//                     checked={selectedAvailability.includes(option.value)}
//                     onChange={() => handleAvailabilityChange(option.value)}
//                   />
//                 } 
//                 label={option.label} 
//               />
//             ))}
//           </div>
//         </Collapse>
//       </div>

//       {/* Sizes */}
//       <div style={boxStyle}>
//         <h3 style={headingStyle}>
//           Size
//           <Button
//             style={{
//               width: "30px",
//               height: "30px",
//               minWidth: "30px",
//               borderRadius: "50%",
//               marginLeft: "auto",
//             }}
//             onClick={() => setIsOpenSizeFilter(!isOpenSizeFilter)}
//           >
//             {isOpenSizeFilter ? <FaAngleDown /> : <FaAngleUp />}
//           </Button>
//         </h3>
//         <Collapse isOpened={isOpenSizeFilter}>
//           <div style={{ ...scrollStyle, flexDirection: 'row', flexWrap: 'wrap' }}>
//             {commonSizes.map((size) => (
//               <FormControlLabel 
//                 key={size}
//                 control={
//                   <Checkbox 
//                     size="small" 
//                     checked={selectedSizes.includes(size)}
//                     onChange={() => handleSizeChange(size)}
//                   />
//                 } 
//                 label={size}
//                 sx={{ 
//                   margin: 0,
//                   '& .MuiFormControlLabel-label': { fontSize: '14px' }
//                 }}
//               />
//             ))}
//           </div>
//         </Collapse>
//       </div>
//     </aside>
//   );
// };

// export default Sidebar;






































































// import React, { useState, useEffect } from "react";
// import FormControlLabel from "@mui/material/FormControlLabel";
// import Checkbox from "@mui/material/Checkbox";
// import { Collapse } from "react-collapse";
// import { FaAngleDown, FaAngleUp } from "react-icons/fa";
// import Button from "@mui/material/Button";
// import RangeSlider from "react-range-slider-input";
// import "react-range-slider-input/dist/style.css";
// import Rating from "@mui/material/Rating";
// import { categoryApi } from "../../utils/categoryApi";

// const Sidebar = () => {
//   const [isOpenCategoryFilter, setIsOpenCategoryFilter] = useState(true);
//   const [isOpenAvailableFilter, setIsOpenAvailableFilter] = useState(true);
//   const [isOpenSizeFilter, setIsOpenSizeFilter] = useState(true);
//   const [categories, setCategories] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [selectedCategories, setSelectedCategories] = useState([]);

//   // Fetch categories on component mount
//   useEffect(() => {
//     fetchCategories();
//   }, []);

//   const fetchCategories = async () => {
//     try {
//       setLoading(true);
//       const response = await categoryApi.getMainCategories();
//       if (response.success) {
//         setCategories(response.data);
//       }
//     } catch (error) {
//       console.error('Error fetching categories:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Handle category selection
//   const handleCategoryChange = (categoryId) => {
//     setSelectedCategories(prev => {
//       if (prev.includes(categoryId)) {
//         return prev.filter(id => id !== categoryId);
//       } else {
//         return [...prev, categoryId];
//       }
//     });
//   };

//   // Handle select all categories
//   const handleSelectAll = () => {
//     if (selectedCategories.length === categories.length) {
//       setSelectedCategories([]);
//     } else {
//       const allCategoryIds = categories.map(cat => cat._id);
//       setSelectedCategories(allCategoryIds);
//     }
//   };

//   const boxStyle = {
//     padding: "16px",
//     border: "1px solid rgba(0,0,0,0.1)",
//     borderRadius: "6px",
//     marginBottom: "20px",
//     backgroundColor: "#fff",
//   };

//   const headingStyle = {
//     fontSize: "16px",
//     fontWeight: 500,
//     display: "flex",
//     alignItems: "center",
//     marginBottom: "12px",
//   };

//   const scrollStyle = {
//     paddingLeft: "8px",
//     display: "flex",
//     flexDirection: "column",
//     gap: "6px",
//     maxHeight: "300px",
//     overflowY: "auto",
//   };

//   const loadingStyle = {
//     padding: "8px",
//     textAlign: "center",
//     color: "#6b7280",
//     fontSize: "14px",
//   };

//   return (
//     <aside style={{ padding: "20px", width: "260px", backgroundColor: "#f9fafb" }}>
//       {/* Categories */}
//       <div style={boxStyle}>
//         <h3 style={headingStyle}>
//           Shop by Category
//           <Button
//             style={{
//               width: "30px",
//               height: "30px",
//               minWidth: "30px",
//               borderRadius: "50%",
//               marginLeft: "auto",
//             }}
//             onClick={() => setIsOpenCategoryFilter(!isOpenCategoryFilter)}
//           >
//             {isOpenCategoryFilter ? <FaAngleDown /> : <FaAngleUp />}
//           </Button>
//         </h3>
//         <Collapse isOpened={isOpenCategoryFilter}>
//           {loading ? (
//             <div style={loadingStyle}>Loading categories...</div>
//           ) : (
//             <div style={scrollStyle}>
//               {/* Select All checkbox */}
//               <FormControlLabel 
//                 control={
//                   <Checkbox 
//                     size="small" 
//                     checked={selectedCategories.length === categories.length && categories.length > 0}
//                     indeterminate={selectedCategories.length > 0 && selectedCategories.length < categories.length}
//                     onChange={handleSelectAll}
//                   />
//                 } 
//                 label="Select All" 
//               />
              
//               {/* Category checkboxes */}
//               {categories.map((category) => (
//                 <FormControlLabel 
//                   key={category._id}
//                   control={
//                     <Checkbox 
//                       size="small" 
//                       checked={selectedCategories.includes(category._id)}
//                       onChange={() => handleCategoryChange(category._id)}
//                     />
//                   } 
//                   label={
//                     <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
//                       <span>{category.name}</span>
//                       {category.subcategories && category.subcategories.length > 0 && (
//                         <span style={{ 
//                           fontSize: '12px', 
//                           color: '#6b7280',
//                           backgroundColor: '#f3f4f6',
//                           padding: '2px 6px',
//                           borderRadius: '12px'
//                         }}>
//                           {category.subcategories.length}
//                         </span>
//                       )}
//                     </div>
//                   } 
//                 />
//               ))}
              
//               {categories.length === 0 && (
//                 <div style={loadingStyle}>No categories available</div>
//               )}
//             </div>
//           )}
//         </Collapse>
//       </div>

//       {/* Availability */}
//       <div style={boxStyle}>
//         <h3 style={headingStyle}>
//           Availability
//           <Button
//             style={{
//               width: "30px",
//               height: "30px",
//               minWidth: "30px",
//               borderRadius: "50%",
//               marginLeft: "auto",
//             }}
//             onClick={() => setIsOpenAvailableFilter(!isOpenAvailableFilter)}
//           >
//             {isOpenAvailableFilter ? <FaAngleDown /> : <FaAngleUp />}
//           </Button>
//         </h3>
//         <Collapse isOpened={isOpenAvailableFilter}>
//           <div style={scrollStyle}>
//             <FormControlLabel control={<Checkbox size="small" />} label="Available (12)" />
//             <FormControlLabel control={<Checkbox size="small" />} label="In Stock (8)" />
//             <FormControlLabel control={<Checkbox size="small" />} label="Out of Stock (2)" />
//           </div>
//         </Collapse>
//       </div>

//       {/* Sizes */}
//       <div style={boxStyle}>
//         <h3 style={headingStyle}>
//           Size
//           <Button
//             style={{
//               width: "30px",
//               height: "30px",
//               minWidth: "30px",
//               borderRadius: "50%",
//               marginLeft: "auto",
//             }}
//             onClick={() => setIsOpenSizeFilter(!isOpenSizeFilter)}
//           >
//             {isOpenSizeFilter ? <FaAngleDown /> : <FaAngleUp />}
//           </Button>
//         </h3>
//         <Collapse isOpened={isOpenSizeFilter}>
//           <div style={scrollStyle}>
//             <FormControlLabel control={<Checkbox size="small" />} label="Small - SM" />
//             <FormControlLabel control={<Checkbox size="small" />} label="Medium" />
//             <FormControlLabel control={<Checkbox size="small" />} label="Large" />
//             <FormControlLabel control={<Checkbox size="small" />} label="XL" />
//             <FormControlLabel control={<Checkbox size="small" />} label="XXL" />
//           </div>
//         </Collapse>
//       </div>

//       {/* Price Filter */}
//       <div style={boxStyle}>
//         <h3 style={headingStyle}>Filter by Price</h3>
//         <RangeSlider />
//         <div
//           style={{
//             display: "flex",
//             marginTop: "16px",
//             paddingTop: "12px",
//             borderTop: "1px solid rgba(0,0,0,0.1)",
//             fontSize: "14px",
//           }}
//         >
//           <span>
//             From: <strong>$100</strong>
//           </span>
//           <span style={{ marginLeft: "auto" }}>
//             To: <strong>$5000</strong>
//           </span>
//         </div>
//       </div>

//       {/* Rating Filter */}
//       <div style={boxStyle}>
//         <h3 style={headingStyle}>Filter by Rating</h3>
//         <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
//           <Rating name="rating-5" defaultValue={5} size="small" readOnly />
//           <Rating name="rating-4" defaultValue={4} size="small" readOnly />
//           <Rating name="rating-3" defaultValue={3} size="small" readOnly />
//           <Rating name="rating-2" defaultValue={2} size="small" readOnly />
//           <Rating name="rating-1" defaultValue={1} size="small" readOnly />
//         </div>
//       </div>

//       {/* Selected Categories Debug (optional - remove in production) */}
//       {selectedCategories.length > 0 && (
//         <div style={{ 
//           padding: "12px", 
//           backgroundColor: "#e5e7eb", 
//           borderRadius: "6px", 
//           fontSize: "12px",
//           marginTop: "16px"
//         }}>
//           <strong>Selected Categories:</strong> {selectedCategories.length}
//         </div>
//       )}
//     </aside>
//   );
// };

// export default Sidebar;
































// import React, { useState } from "react";
// import FormControlLabel from "@mui/material/FormControlLabel";
// import Checkbox from "@mui/material/Checkbox";
// import { Collapse } from "react-collapse";
// import { FaAngleDown, FaAngleUp } from "react-icons/fa";
// import Button from "@mui/material/Button";
// import RangeSlider from "react-range-slider-input";
// import "react-range-slider-input/dist/style.css";
// import Rating from "@mui/material/Rating";

// const Sidebar = () => {
//   const [isOpenCategoryFilter, setIsOpenCategoryFilter] = useState(true);
//   const [isOpenAvailableFilter, setIsOpenAvailableFilter] = useState(true);
//   const [isOpenSizeFilter, setIsOpenSizeFilter] = useState(true);

//   const boxStyle = {
//     padding: "16px",
//     border: "1px solid rgba(0,0,0,0.1)",
//     borderRadius: "6px",
//     marginBottom: "20px",
//     backgroundColor: "#fff",
//   };

//   const headingStyle = {
//     fontSize: "16px",
//     fontWeight: 500,
//     display: "flex",
//     alignItems: "center",
//     marginBottom: "12px",
//   };

//   const scrollStyle = {
//     paddingLeft: "8px",
//     display: "flex",
//     flexDirection: "column",
//     gap: "6px",
//   };

//   return (
//     <aside style={{ padding: "20px", width: "260px", backgroundColor: "#f9fafb" }}>
//       {/* Categories */}
//       <div style={boxStyle}>
//         <h3 style={headingStyle}>
//           Shop by Category
//           <Button
//             style={{
//               width: "30px",
//               height: "30px",
//               minWidth: "30px",
//               borderRadius: "50%",
//               marginLeft: "auto",
//             }}
//             onClick={() => setIsOpenCategoryFilter(!isOpenCategoryFilter)}
//           >
//             {isOpenCategoryFilter ? <FaAngleDown /> : <FaAngleUp />}
//           </Button>
//         </h3>
//         <Collapse isOpened={isOpenCategoryFilter}>
//           <div style={scrollStyle}>
//             <FormControlLabel control={<Checkbox size="small" />} label="Fashion" />
//             <FormControlLabel control={<Checkbox size="small" />} label="Electronics" />
//             <FormControlLabel control={<Checkbox size="small" />} label="Bags" />
//             <FormControlLabel control={<Checkbox size="small" />} label="Footwear" />
//             <FormControlLabel control={<Checkbox size="small" />} label="Grocery" />
//             <FormControlLabel control={<Checkbox size="small" />} label="Beauty" />
//             <FormControlLabel control={<Checkbox size="small" />} label="Jewelry" />
//           </div>
//         </Collapse>
//       </div>

//       {/* Availability */}
//       <div style={boxStyle}>
//         <h3 style={headingStyle}>
//           Availability
//           <Button
//             style={{
//               width: "30px",
//               height: "30px",
//               minWidth: "30px",
//               borderRadius: "50%",
//               marginLeft: "auto",
//             }}
//             onClick={() => setIsOpenAvailableFilter(!isOpenAvailableFilter)}
//           >
//             {isOpenAvailableFilter ? <FaAngleDown /> : <FaAngleUp />}
//           </Button>
//         </h3>
//         <Collapse isOpened={isOpenAvailableFilter}>
//           <div style={scrollStyle}>
//             <FormControlLabel control={<Checkbox size="small" />} label="Available (12)" />
//             <FormControlLabel control={<Checkbox size="small" />} label="In Stock (8)" />
//             <FormControlLabel control={<Checkbox size="small" />} label="Out of Stock (2)" />
//           </div>
//         </Collapse>
//       </div>

//       {/* Sizes */}
//       <div style={boxStyle}>
//         <h3 style={headingStyle}>
//           Size
//           <Button
//             style={{
//               width: "30px",
//               height: "30px",
//               minWidth: "30px",
//               borderRadius: "50%",
//               marginLeft: "auto",
//             }}
//             onClick={() => setIsOpenSizeFilter(!isOpenSizeFilter)}
//           >
//             {isOpenSizeFilter ? <FaAngleDown /> : <FaAngleUp />}
//           </Button>
//         </h3>
//         <Collapse isOpened={isOpenSizeFilter}>
//           <div style={scrollStyle}>
//             <FormControlLabel control={<Checkbox size="small" />} label="Small - SM" />
//             <FormControlLabel control={<Checkbox size="small" />} label="Medium" />
//             <FormControlLabel control={<Checkbox size="small" />} label="Large" />
//             <FormControlLabel control={<Checkbox size="small" />} label="XL" />
//             <FormControlLabel control={<Checkbox size="small" />} label="XXL" />
//           </div>
//         </Collapse>
//       </div>

//       {/* Price Filter */}
//       <div style={boxStyle}>
//         <h3 style={headingStyle}>Filter by Price</h3>
//         <RangeSlider />
//         <div
//           style={{
//             display: "flex",
//             marginTop: "16px",
//             paddingTop: "12px",
//             borderTop: "1px solid rgba(0,0,0,0.1)",
//             fontSize: "14px",
//           }}
//         >
//           <span>
//             From: <strong>$100</strong>
//           </span>
//           <span style={{ marginLeft: "auto" }}>
//             To: <strong>$5000</strong>
//           </span>
//         </div>
//       </div>

//       {/* Rating Filter */}
//       <div style={boxStyle}>
//         <h3 style={headingStyle}>Filter by Rating</h3>
//         <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
//           <Rating name="rating-5" defaultValue={5} size="small" readOnly />
//           <Rating name="rating-4" defaultValue={4} size="small" readOnly />
//           <Rating name="rating-3" defaultValue={3} size="small" readOnly />
//           <Rating name="rating-2" defaultValue={2} size="small" readOnly />
//           <Rating name="rating-1" defaultValue={1} size="small" readOnly />
//         </div>
//       </div>
//     </aside>
//   );
// };

// export default Sidebar;














// import React, { useState } from 'react'
// // import CategoryCollapse from '../CategoryCollapse'
// import '../Sidebar/style.css'
// import FormControlLabel from '@mui/material/FormControlLabel';
// import Checkbox from '@mui/material/Checkbox';
// import { Collapse } from 'react-collapse';
// import { FaAngleDown } from 'react-icons/fa';
// import { FaAngleUp } from 'react-icons/fa';
// import Button from '@mui/material/Button';
// import RangeSlider from 'react-range-slider-input' 
// import 'react-range-slider-input/dist/style.css'
// import Rating from '@mui/material/Rating';

// const Sidebar = () => {

//   const [isOpenCategoryFilter, setIsOpenCategoryFilter] = useState(true)
//   const [isOpenAvailableFilter, setIsOpenAvailableFilter] = useState(true)
//   const [isOpenSizeFilter, setIsOpenSizeFilter] = useState(true) 
//   return (
//     <aside className="sidebar py-5">
//         <div className="box">
//             <h3 className='w-full mb-18 text-[18px] font-[500] flex items center'>
//               Shop by Categories
//               <Button className='!w-[30px] !h-[30px] !min-w-[30px] !rounded-full ml-auto' onClick={()=> setIsOpenCategoryFilter(!isOpenCategoryFilter)}>
//                 {
//                   isOpenCategoryFilter===true ? <FaAngleDown /> : <FaAngleUp />
//                 }
                 
//               </Button>
//             </h3> 
//             {/* <CategoryCollapse /> */} 
//             <Collapse isOpened={isOpenCategoryFilter}>
//                 <div className="scroll px-3 relative ">
//                 <FormControlLabel control={<Checkbox size="small"/>} label="Fashion" className='w-[80%]'/>
//                 <FormControlLabel control={<Checkbox size="small"/>} label="Electronics"  className='w-full' />
//                 <FormControlLabel control={<Checkbox size="small"/>} label="Bags"  className='w-full'  />
//                 <FormControlLabel control={<Checkbox size="small"/>} label="Footwear" className='w-full' />
//                 <FormControlLabel control={<Checkbox size="small"/>} label="Grocery" className='w-full' />
//                 <FormControlLabel control={<Checkbox size="small"/>} label="Beauty" className='w-full' />
//                 <FormControlLabel control={<Checkbox size="small"/>} label="Jewelry" className='w-full' />
//             </div>
//             </Collapse>
             
//         </div>

//         <div className="box">
//             <h3 className='w-full mb-18 text-[18px] font-[500] flex items center'>
//               Availability
//               <Button className='!w-[30px] !h-[30px] !min-w-[30px] !rounded-full ml-auto' onClick={()=> setIsOpenAvailableFilter(!isOpenAvailableFilter)}>
//                 {
//                   isOpenAvailableFilter===true ? <FaAngleDown /> : <FaAngleUp />
//                 }
                 
//               </Button>
//             </h3> 
//             {/* <CategoryCollapse /> */} 
//             <Collapse isOpened={isOpenAvailableFilter}>
//                 <div className="scroll px-3 relative ">
//                 <FormControlLabel control={<Checkbox size="small"/>} label="Available(12)" className='w-[80%]'/>
//                 <FormControlLabel control={<Checkbox size="small"/>} label="In Stock(8)"  className='w-full' />
//                 <FormControlLabel control={<Checkbox size="small"/>} label="Out of Stock(2)"  className='w-full'  />
//             </div>
//             </Collapse>
             
//         </div>

//         <div className="box">
//             <h3 className='w-full mb-18 text-[18px] font-[500] flex items center'>
//               Size
//               <Button className='!w-[30px] !h-[30px] !min-w-[30px] !rounded-full ml-auto' onClick={()=> setIsOpenSizeFilter(!isOpenSizeFilter)}>
//                 {
//                   isOpenSizeFilter===true ? <FaAngleDown /> : <FaAngleUp />
//                 }
                 
//               </Button>
//             </h3> 
//             {/* <CategoryCollapse /> */} 
//             <Collapse isOpened={isOpenSizeFilter}>
//                 <div className="scroll px-3 relative ">
//                 <FormControlLabel control={<Checkbox size="small"/>} label="Small-SM" className='w-[80%]'/>
//                 <FormControlLabel control={<Checkbox size="small"/>} label="Medium"  className='w-full' />
//                 <FormControlLabel control={<Checkbox size="small"/>} label="Large"  className='w-full'  />
//                 <FormControlLabel control={<Checkbox size="small"/>} label="XL"  className='w-full'  />
//                 <FormControlLabel control={<Checkbox size="small"/>} label="XXL"  className='w-full'  />
//             </div>
//             </Collapse>
             
//         </div>

//         <div className="box mt-3">
//           <h3 className='w-full mb-18 text-[18px] font-[500] flex items center'>
//             Filter by Price 
//           </h3>

//           <RangeSlider />

//           <div className="flex mt-5 pt-4 pb-2 priceRange">
//             <span className='text-[14px]'>
//                 From: <strong class="text-dark">$: {100}</strong>
//             </span>
//             <span className="ml-auto text-[14px]">
//                 To: <strong class="text-dark">$: {5000}</strong>
//             </span>
//           </div>
//         </div> 

//         <div className="box mt-3">
//           <h3 className='w-full mb-18 text-[18px] font-[500] flex items center'>
//             Filter by Rating 
//           </h3>

//           <div className="w-full">
//             <Rating name="small-size" defaultValue={5} size='small' readOnly />
//           </div>
//           <div className="w-full">
//             <Rating name="small-size" defaultValue={4} size='small' readOnly />
//           </div>
//           <div className="w-full">
//             <Rating name="small-size" defaultValue={3} size='small' readOnly />
//           </div>
//           <div className="w-full">
//             <Rating name="small-size" defaultValue={2} size='small' readOnly />
//           </div>
//           <div className="w-full">
//             <Rating name="small-size" defaultValue={1} size='small' readOnly />
//           </div>
          
//         </div>
//     </aside>
//   )
// }
 
// export default Sidebar