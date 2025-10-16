// import React, { useState } from "react";
// import { FaRegPlusSquare, FaRegMinusSquare } from "react-icons/fa";
// import { Collapse } from "@mui/material";
// import { Link } from "react-router-dom";

// const CategoryCollapse = ({ categories = [] }) => {
//   const [openCategories, setOpenCategories] = useState({});
//   const [openSubcategories, setOpenSubcategories] = useState({});

//   const toggleCategory = (catIndex) => {
//     setOpenCategories((prev) => ({
//       ...prev,
//       [catIndex]: !prev[catIndex],
//     }));
//   };

//   const toggleSubcategory = (catIndex, subIndex) => {
//     setOpenSubcategories((prev) => ({
//       ...prev,
//       [`${catIndex}-${subIndex}`]: !prev[`${catIndex}-${subIndex}`],
//     }));
//   };

//   if (!categories || categories.length === 0) {
//     return (
//       <div style={{ 
//         padding: "24px", 
//         textAlign: "center",
//         background: "#f9fafb",
//         minHeight: "200px",
//         display: "flex",
//         alignItems: "center",
//         justifyContent: "center"
//       }}>
//         <div>No categories available</div>
//       </div>
//     );
//   }

//   return (
//     <div
//       style={{
//         overflowY: "auto",
//         maxHeight: "calc(100vh - 70px)",
//         padding: "24px",
//         background: "#f9fafb",
//       }}
//     >
//       <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "12px" }}>
//         {categories.map((category, catIndex) => (
//           <li
//             key={category._id}
//             style={{
//               background: "#fff",
//               borderRadius: "12px",
//               transition: "all 0.3s ease",
//               boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
//               overflow: "hidden",
//             }}
//           >
//             {/* Main Category */}
//             <div
//               onClick={() => toggleCategory(catIndex)}
//               style={{
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "space-between",
//                 padding: "16px 24px",
//                 cursor: "pointer",
//               }}
//             >
//               <span style={{ color: "#1f2937", fontWeight: 500, fontSize: "16px" }}>
//                 {category.name}
//               </span>
//               {category.subcategories && category.subcategories.length > 0 &&
//                 (openCategories[catIndex] ? (
//                   <FaRegMinusSquare style={{ color: "#6b7280", transition: "color 0.2s" }} />
//                 ) : (
//                   <FaRegPlusSquare style={{ color: "#6b7280", transition: "color 0.2s" }} />
//                 ))}
//             </div>

//             {/* Subcategories */}
//             <Collapse in={openCategories[catIndex]}>
//               <div style={{ padding: "0 16px 16px 32px", background: "#f9fafb" }}>
//                 <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "12px" }}>
//                   {category.subcategories && category.subcategories.map((subcategory, subIndex) => (
//                     <li
//                       key={subcategory._id}
//                       style={{
//                         background: "#fff",
//                         borderRadius: "8px",
//                         overflow: "hidden",
//                         boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
//                       }}
//                     >
//                       <div
//                         onClick={() => toggleSubcategory(catIndex, subIndex)}
//                         style={{
//                           display: "flex",
//                           alignItems: "center",
//                           justifyContent: "space-between",
//                           padding: "12px 20px",
//                           cursor: "pointer",
//                           transition: "background 0.2s",
//                         }}
//                         onMouseEnter={(e) => (e.currentTarget.style.background = "#f3f4f6")}
//                         onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
//                       >
//                         <span style={{ color: "#374151", fontWeight: 500, fontSize: "15px" }}>
//                           {subcategory.name}
//                         </span>
//                         {subcategory.subcategories && subcategory.subcategories.length > 0 &&
//                           (openSubcategories[`${catIndex}-${subIndex}`] ? (
//                             <FaRegMinusSquare style={{ color: "#9ca3af", transition: "color 0.2s" }} />
//                           ) : (
//                             <FaRegPlusSquare style={{ color: "#9ca3af", transition: "color 0.2s" }} />
//                           ))}
//                       </div>

//                       {/* Nested Subcategories */}
//                       <Collapse in={openSubcategories[`${catIndex}-${subIndex}`]}>
//                         <ul
//                           style={{
//                             listStyle: "none",
//                             padding: "12px 0 12px 32px",
//                             margin: 0,
//                             display: "flex",
//                             flexDirection: "column",
//                             gap: "8px",
//                             background: "#f9fafb",
//                           }}
//                         >
//                           {subcategory.subcategories && subcategory.subcategories.map((nestedSub) => (
//                             <li key={nestedSub._id} style={{ marginLeft: "8px" }}>
//                               <Link
//                                 to={`/products?category=${category._id}&subcategory=${nestedSub._id}`}
//                                 style={{
//                                   display: "block",
//                                   padding: "8px 16px",
//                                   fontSize: "14px",
//                                   color: "#4b5563",
//                                   borderRadius: "6px",
//                                   textDecoration: "none",
//                                   transition: "all 0.2s",
//                                 }}
//                                 onMouseEnter={(e) => {
//                                   e.currentTarget.style.background = "#f3f4f6";
//                                   e.currentTarget.style.color = "#111827";
//                                 }}
//                                 onMouseLeave={(e) => {
//                                   e.currentTarget.style.background = "transparent";
//                                   e.currentTarget.style.color = "#4b5563";
//                                 }}
//                               >
//                                 {nestedSub.name}
//                               </Link>
//                             </li>
//                           ))}
//                         </ul>
//                       </Collapse>
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             </Collapse>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default CategoryCollapse;

























import React, { useState, useEffect } from "react";
import { FaRegPlusSquare, FaRegMinusSquare } from "react-icons/fa";
import { Collapse } from "@mui/material";
import { Link } from "react-router-dom";
import { categoryApi } from "../../utils/categoryApi";

const CategoryCollapse = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openCategories, setOpenCategories] = useState({});
  const [openSubcategories, setOpenSubcategories] = useState({});

  // Fetch categories from API
  useEffect(() => {
    fetchCategories();
  }, []);

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

  const toggleCategory = (catIndex) => {
    setOpenCategories((prev) => ({
      ...prev,
      [catIndex]: !prev[catIndex],
    }));
  };

  const toggleSubcategory = (catIndex, subIndex) => {
    setOpenSubcategories((prev) => ({
      ...prev,
      [`${catIndex}-${subIndex}`]: !prev[`${catIndex}-${subIndex}`],
    }));
  };

  if (loading) {
    return (
      <div style={{ 
        padding: "24px", 
        textAlign: "center",
        background: "#f9fafb",
        minHeight: "200px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}>
        <div>Loading categories...</div>
      </div>
    );
  }

  return (
    <div
      style={{
        overflowY: "auto",
        maxHeight: "calc(100vh - 70px)",
        padding: "24px",
        background: "#f9fafb",
      }}
    >
      <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "12px" }}>
        {categories.map((category, catIndex) => (
          <li
            key={category._id}
            style={{
              background: "#fff",
              borderRadius: "12px",
              transition: "all 0.3s ease",
              boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
              overflow: "hidden",
            }}
          >
            {/* Main Category */}
            <div
              onClick={() => toggleCategory(catIndex)}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "16px 24px",
                cursor: "pointer",
              }}
            >
              <span style={{ color: "#1f2937", fontWeight: 500, fontSize: "16px" }}>
                {category.name}
              </span>
              {category.subcategories && category.subcategories.length > 0 &&
                (openCategories[catIndex] ? (
                  <FaRegMinusSquare style={{ color: "#6b7280", transition: "color 0.2s" }} />
                ) : (
                  <FaRegPlusSquare style={{ color: "#6b7280", transition: "color 0.2s" }} />
                ))}
            </div>

            {/* Subcategories */}
            <Collapse in={openCategories[catIndex]}>
              <div style={{ padding: "0 16px 16px 32px", background: "#f9fafb" }}>
                <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "12px" }}>
                  {category.subcategories && category.subcategories.map((subcategory, subIndex) => (
                    <li
                      key={subcategory._id}
                      style={{
                        background: "#fff",
                        borderRadius: "8px",
                        overflow: "hidden",
                        boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
                      }}
                    >
                      <div
                        onClick={() => toggleSubcategory(catIndex, subIndex)}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          padding: "12px 20px",
                          cursor: "pointer",
                          transition: "background 0.2s",
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.background = "#f3f4f6")}
                        onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                      >
                        <span style={{ color: "#374151", fontWeight: 500, fontSize: "15px" }}>
                          {subcategory.name}
                        </span>
                        {subcategory.subcategories && subcategory.subcategories.length > 0 &&
                          (openSubcategories[`${catIndex}-${subIndex}`] ? (
                            <FaRegMinusSquare style={{ color: "#9ca3af", transition: "color 0.2s" }} />
                          ) : (
                            <FaRegPlusSquare style={{ color: "#9ca3af", transition: "color 0.2s" }} />
                          ))}
                      </div>

                      {/* Nested Subcategories */}
                      <Collapse in={openSubcategories[`${catIndex}-${subIndex}`]}>
                        <ul
                          style={{
                            listStyle: "none",
                            padding: "12px 0 12px 32px",
                            margin: 0,
                            display: "flex",
                            flexDirection: "column",
                            gap: "8px",
                            background: "#f9fafb",
                          }}
                        >
                          {subcategory.subcategories && subcategory.subcategories.map((nestedSub, idx) => (
                            <li key={nestedSub._id} style={{ marginLeft: "8px" }}>
                              <Link
                                to={`/products?category=${category._id}&subcategory=${nestedSub._id}`}
                                style={{
                                  display: "block",
                                  padding: "8px 16px",
                                  fontSize: "14px",
                                  color: "#4b5563",
                                  borderRadius: "6px",
                                  textDecoration: "none",
                                  transition: "all 0.2s",
                                }}
                                onMouseEnter={(e) => {
                                  e.currentTarget.style.background = "#f3f4f6";
                                  e.currentTarget.style.color = "#111827";
                                }}
                                onMouseLeave={(e) => {
                                  e.currentTarget.style.background = "transparent";
                                  e.currentTarget.style.color = "#4b5563";
                                }}
                              >
                                {nestedSub.name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </Collapse>
                    </li>
                  ))}
                </ul>
              </div>
            </Collapse>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryCollapse;





















































// import React, { useState } from "react";
// import { FaRegPlusSquare, FaRegMinusSquare } from "react-icons/fa";
// import { Collapse } from "@mui/material";
// import { Link } from "react-router-dom";

// const categories = [
//   {
//     name: "Fashion",
//     sub: [{ name: "Apparel", items: ["T-shirt", "Gowns", "Wrist watches", "Jeans", "Shoes"] }],
//   },
//   {
//     name: "Electronics",
//     sub: [{ name: "Mobiles", items: ["Smartphones", "Feature Phones", "Tablets", "Chargers", "Earphones"] }],
//   },
//   {
//     name: "Bags",
//     sub: [{ name: "Types", items: ["Handbags", "Backpacks", "Laptop Bags", "Travel Bags", "Wallets"] }],
//   },
//   {
//     name: "Footwear",
//     sub: [{ name: "Types", items: ["Sneakers", "Sandals", "Loafers", "Formal Shoes", "Slippers"] }],
//   },
//   {
//     name: "Groceries",
//     sub: [{ name: "Categories", items: ["Fruits", "Vegetables", "Beverages", "Snacks", "Dairy Products"] }],
//   },
//   {
//     name: "Beauty",
//     sub: [{ name: "Products", items: ["Makeup", "Skincare", "Haircare", "Fragrances", "Personal Care"] }],
//   },
//   {
//     name: "Jewelry",
//     sub: [{ name: "Types", items: ["Necklaces", "Earrings", "Bracelets", "Rings", "Anklets"] }],
//   },
// ];

// const CategoryCollapse = () => {
//   const [openCategories, setOpenCategories] = useState({});
//   const [openSubcategories, setOpenSubcategories] = useState({});

//   const toggleCategory = (catIndex) => {
//     setOpenCategories((prev) => ({
//       ...prev,
//       [catIndex]: !prev[catIndex],
//     }));
//   };

//   const toggleSubcategory = (catIndex, subIndex) => {
//     setOpenSubcategories((prev) => ({
//       ...prev,
//       [`${catIndex}-${subIndex}`]: !prev[`${catIndex}-${subIndex}`],
//     }));
//   };

//   return (
//     <div
//       style={{
//         overflowY: "auto",
//         maxHeight: "calc(100vh - 70px)",
//         padding: "24px",
//         background: "#f9fafb", // gray-50
//       }}
//     >
//       <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "12px" }}>
//         {categories.map((category, catIndex) => (
//           <li
//             key={catIndex}
//             style={{
//               background: "#fff",
//               borderRadius: "12px",
//               transition: "all 0.3s ease",
//               boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
//               overflow: "hidden",
//             }}
//           >
//             {/* Main Category */}
//             <div
//               onClick={() => toggleCategory(catIndex)}
//               style={{
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "space-between",
//                 padding: "16px 24px",
//                 cursor: "pointer",
//               }}
//             >
//               <span style={{ color: "#1f2937", fontWeight: 500, fontSize: "16px" }}>{category.name}</span>
//               {category.sub.length > 0 &&
//                 (openCategories[catIndex] ? (
//                   <FaRegMinusSquare style={{ color: "#6b7280", transition: "color 0.2s" }} />
//                 ) : (
//                   <FaRegPlusSquare style={{ color: "#6b7280", transition: "color 0.2s" }} />
//                 ))}
//             </div>

//             {/* Subcategories */}
//             <Collapse in={openCategories[catIndex]}>
//               <div style={{ padding: "0 16px 16px 32px", background: "#f9fafb" }}>
//                 <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "12px" }}>
//                   {category.sub.map((subcat, subIndex) => (
//                     <li
//                       key={subIndex}
//                       style={{
//                         background: "#fff",
//                         borderRadius: "8px",
//                         overflow: "hidden",
//                         boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
//                       }}
//                     >
//                       <div
//                         onClick={() => toggleSubcategory(catIndex, subIndex)}
//                         style={{
//                           display: "flex",
//                           alignItems: "center",
//                           justifyContent: "space-between",
//                           padding: "12px 20px",
//                           cursor: "pointer",
//                           transition: "background 0.2s",
//                         }}
//                         onMouseEnter={(e) => (e.currentTarget.style.background = "#f3f4f6")}
//                         onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
//                       >
//                         <span style={{ color: "#374151", fontWeight: 500, fontSize: "15px" }}>{subcat.name}</span>
//                         {subcat.items.length > 0 &&
//                           (openSubcategories[`${catIndex}-${subIndex}`] ? (
//                             <FaRegMinusSquare style={{ color: "#9ca3af", transition: "color 0.2s" }} />
//                           ) : (
//                             <FaRegPlusSquare style={{ color: "#9ca3af", transition: "color 0.2s" }} />
//                           ))}
//                       </div>

//                       {/* Subcategory Items */}
//                       <Collapse in={openSubcategories[`${catIndex}-${subIndex}`]}>
//                         <ul
//                           style={{
//                             listStyle: "none",
//                             padding: "12px 0 12px 32px",
//                             margin: 0,
//                             display: "flex",
//                             flexDirection: "column",
//                             gap: "8px",
//                             background: "#f9fafb",
//                           }}
//                         >
//                           {subcat.items.map((item, idx) => (
//                             <li key={idx} style={{ marginLeft: "8px" }}>
//                               <Link
//                                 to="/"
//                                 style={{
//                                   display: "block",
//                                   padding: "8px 16px",
//                                   fontSize: "14px",
//                                   color: "#4b5563",
//                                   borderRadius: "6px",
//                                   textDecoration: "none",
//                                   transition: "all 0.2s",
//                                 }}
//                                 onMouseEnter={(e) => {
//                                   e.currentTarget.style.background = "#f3f4f6";
//                                   e.currentTarget.style.color = "#111827";
//                                 }}
//                                 onMouseLeave={(e) => {
//                                   e.currentTarget.style.background = "transparent";
//                                   e.currentTarget.style.color = "#4b5563";
//                                 }}
//                               >
//                                 {item}
//                               </Link>
//                             </li>
//                           ))}
//                         </ul>
//                       </Collapse>
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             </Collapse>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default CategoryCollapse;














// import React, { useState } from 'react';
// import { FaRegPlusSquare, FaRegMinusSquare } from "react-icons/fa";
// import { Collapse } from '@mui/material';
// import { Link } from 'react-router-dom';

// const categories = [
//   {
//     name: "Fashion",
//     sub: [{ name: "Apparel", items: ["T-shirt", "Gowns", "Wrist watches", "Jeans", "Shoes"] }]
//   },
//   {
//     name: "Electronics",
//     sub: [{ name: "Mobiles", items: ["Smartphones", "Feature Phones", "Tablets", "Chargers", "Earphones"] }]
//   },
//   {
//     name: "Bags",
//     sub: [{ name: "Types", items: ["Handbags", "Backpacks", "Laptop Bags", "Travel Bags", "Wallets"] }]
//   },
//   {
//     name: "Footwear",
//     sub: [{ name: "Types", items: ["Sneakers", "Sandals", "Loafers", "Formal Shoes", "Slippers"] }]
//   },
//   {
//     name: "Groceries",
//     sub: [{ name: "Categories", items: ["Fruits", "Vegetables", "Beverages", "Snacks", "Dairy Products"] }]
//   },
//   {
//     name: "Beauty",
//     sub: [{ name: "Products", items: ["Makeup", "Skincare", "Haircare", "Fragrances", "Personal Care"] }]
//   },
//   {
//     name: "Jewelry",
//     sub: [{ name: "Types", items: ["Necklaces", "Earrings", "Bracelets", "Rings", "Anklets"] }]
//   }
// ];

// const CategoryCollapse = () => {
//   const [openCategories, setOpenCategories] = useState({});
//   const [openSubcategories, setOpenSubcategories] = useState({});

//   const toggleCategory = (catIndex) => {
//     setOpenCategories(prev => ({
//       ...prev,
//       [catIndex]: !prev[catIndex]
//     }));
//   };

//   const toggleSubcategory = (catIndex, subIndex) => {
//     setOpenSubcategories(prev => ({
//       ...prev,
//       [`${catIndex}-${subIndex}`]: !prev[`${catIndex}-${subIndex}`]
//     }));
//   };

//   return (
//     <div className="overflow-y-auto max-h-[calc(100vh-70px)] p-6 bg-gray-50"> 
      
//       <ul className="space-y-3">
//         {categories.map((category, catIndex) => (
//           <li
//             key={catIndex}
//             className="bg-white rounded-xl transition-all duration-300 shadow-sm hover:shadow-md overflow-hidden"
//           >
//             {/* Main Category */}
//             <div
//               className="flex items-center justify-between px-6 py-4 cursor-pointer"
//               onClick={() => toggleCategory(catIndex)}
//             >
//               <span className="text-gray-800 font-medium text-[16px]">
//                 {category.name}
//               </span>
//               {category.sub.length > 0 && (
//                 openCategories[catIndex] ? (
//                   <FaRegMinusSquare className="text-gray-500 hover:text-red-500 transition" />
//                 ) : (
//                   <FaRegPlusSquare className="text-gray-500 hover:text-red-500 transition" />
//                 )
//               )}
//             </div>

//             {/* Subcategories - Indented */}
//             <Collapse in={openCategories[catIndex]}>
//               <div className="pl-8 pr-4 pb-4 bg-gray-50">
//                 <ul className="space-y-3">
//                   {category.sub.map((subcat, subIndex) => (
//                     <li
//                       key={subIndex}
//                       className="bg-white rounded-lg overflow-hidden shadow-sm"
//                     >
//                       <div
//                         className="flex items-center justify-between px-5 py-3 cursor-pointer hover:bg-gray-100 transition-colors"
//                         onClick={() => toggleSubcategory(catIndex, subIndex)}
//                       >
//                         <span className="text-gray-700 font-medium text-[15px]">
//                           {subcat.name}
//                         </span>
//                         {subcat.items.length > 0 && (
//                           openSubcategories[`${catIndex}-${subIndex}`] ? (
//                             <FaRegMinusSquare className="text-gray-400 hover:text-gray-600 transition" />
//                           ) : (
//                             <FaRegPlusSquare className="text-gray-400 hover:text-gray-600 transition" />
//                           )
//                         )}
//                       </div>

//                       {/* Subcategory Items - Further Indented */}
//                       <Collapse in={openSubcategories[`${catIndex}-${subIndex}`]}>
//                         <ul className="pl-8 space-y-2 py-3 bg-gray-50">
//                           {subcat.items.map((item, idx) => (
//                             <li key={idx} className="ml-2">
//                               <Link
//                                 to="/"
//                                 className="block px-4 py-2 text-sm text-gray-600 rounded-md hover:bg-gray-100 hover:text-gray-900 transition-all duration-200"
//                               >
//                                 {item}
//                               </Link>
//                             </li>
//                           ))}
//                         </ul>
//                       </Collapse>
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             </Collapse>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default CategoryCollapse;

