import Button from '@mui/material/Button'
import React, { useState, useEffect } from 'react'
import { RiMenuLine } from "react-icons/ri";
import { FaAngleDown } from "react-icons/fa6";
import { IoRocketOutline } from "react-icons/io5";
import { Link } from 'react-router-dom';
import CategoryPanel from './CategoryPanel';
import '../Navigation/style.css'
import { categoryApi } from '../../../utils/categoryApi';

const Navigation = () => {
  const [isOpenCategoryPanel, setIsOpenCategoryPanel] = useState(false);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch categories on component mount
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

  const openCategoryPanel = () => {
    setIsOpenCategoryPanel(true);
  };

  return (
    <>
      <nav>
        <div className="container flex items-center justify-end gap-8">
          <div className="col_1 w-[20%]">
            <Button className='!text-black' onClick={openCategoryPanel}>
              <RiMenuLine className='text-[18px]'/>
              Shop By Categories
              <FaAngleDown className='text-[14px] ml-auto font-bold cursor-pointer'/>
            </Button>
          </div>

          <div className="col_2 w-[60%]">
            <ul className="flex items-center gap-4 nav">
              <li className="list-none">
                <Link to='/' className='link transition text-[14px] font-[500]'>
                  <Button className='link transition font-[500] hover:!text-[red] !py-4'>Home</Button> 
                </Link>
              </li>
              
              {/* Dynamic Categories from API */}
              {categories.slice(0, 7).map((category) => (
                <li key={category._id} className="list-none relative group">
                  <Link 
                    to={`/productListing?category=${category._id}`} 
                    className='link transition text-[14px] font-[500]'
                  >
                    <Button className='link transition font-[500] hover:!text-[red] !py-4'>
                      {category.name}
                    </Button> 
                  </Link>

                  {/* Subcategories Dropdown */}
                  {category.subcategories && category.subcategories.length > 0 && (
                    <div className="submenu absolute top-full left-0 min-w-[200px] bg-white shadow-lg border border-gray-200 rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                      <ul className="py-2">
                        {category.subcategories.map((subcategory) => (
                          <li key={subcategory._id} className="list-none w-full hover:bg-gray-50">
                            <Link 
                              to={`/productListing?category=${category._id}`} 
                              className="w-full block"
                            >
                              <Button className='!text-gray-700 hover:!text-red-600 w-full !text-left !justify-start !rounded-none !normal-case !text-sm'>
                                {subcategory.name}
                              </Button>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </div> 

          <div className="col_2 w-[20%]">
            <p className="text-[13px] font-[500] flex items-center gap-3 mt-0 mb-0">
              <IoRocketOutline />
              Free International Delivery
            </p>
          </div>
        </div>
      </nav>

      {/* Category Panel with real data */}
      <CategoryPanel 
        isOpenCategoryPanel={isOpenCategoryPanel} 
        setIsOpenCategoryPanel={setIsOpenCategoryPanel}
        categories={categories}
      /> 
    </>
  );
};

export default Navigation;

























































// import Button from '@mui/material/Button'
// import React, { useState, useEffect } from 'react'
// import { RiMenuLine } from "react-icons/ri";
// import { FaAngleDown } from "react-icons/fa6";
// import { IoRocketOutline } from "react-icons/io5";
// import { Link } from 'react-router-dom';
// import CategoryPanel from './CategoryPanel';
// import '../Navigation/style.css'
// import { categoryApi } from '../../../utils/categoryApi';

// const Navigation = () => {
//   const [isOpenCategoryPanel, setIsOpenCategoryPanel] = useState(false);
//   const [categories, setCategories] = useState([]);
//   const [loading, setLoading] = useState(true);

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

//   const openCategoryPanel = () => {
//     setIsOpenCategoryPanel(true);
//   };

//   return (
//     <>
//       <nav>
//         <div className="container flex items-center justify-end gap-8">
//           <div className="col_1 w-[20%]">
//             <Button className='!text-black' onClick={openCategoryPanel}>
//               <RiMenuLine className='text-[18px]'/>
//               Shop By Categories
//               <FaAngleDown className='text-[14px] ml-auto font-bold cursor-pointer'/>
//             </Button>
//           </div>

//           <div className="col_2 w-[60%]">
//             <ul className="flex items-center gap-4 nav">
//               <li className="list-none">
//                 <Link to='/' className='link transition text-[14px] font-[500]'>
//                   <Button className='link transition font-[500] hover:!text-[red] !py-4'>Home</Button> 
//                 </Link>
//               </li>
              
//               {/* Dynamic Categories from API */}
//               {categories.slice(0, 7).map((category) => (
//                 <li key={category._id} className="list-none relative">
//                   <Link 
//                     to={`/products?category=${category._id}`} 
//                     className='link transition text-[14px] font-[500]'
//                   >
//                     <Button className='link transition font-[500] hover:!text-[red] !py-4'>
//                       {category.name}
//                     </Button> 
//                   </Link>

//                   {/* Subcategories Dropdown */}
//                   {category.subcategories && category.subcategories.length > 0 && (
//                     <div className="submenu absolute top-[120%] left-[0%] min-w-[200px] bg-white shadow-md opacity-0 transition-all">
//                       <ul>
//                         {category.subcategories.map((subcategory) => (
//                           <li key={subcategory._id} className="list-none w-full">
//                             <Link 
//                               to={`/products?category=${category._id}&subcategory=${subcategory._id}`} 
//                               className="w-full"
//                             >
//                               <Button className='!text-[rgba(0,0,0,0.8)] w-full !text-left !justify-start !rounded-none'>
//                                 {subcategory.name}
//                               </Button>
//                             </Link>
//                           </li>
//                         ))}
//                       </ul>
//                     </div>
//                   )}
//                 </li>
//               ))}
//             </ul>
//           </div> 

//           <div className="col_2 w-[20%]">
//             <p className="text-[13px] font-[500] flex items-center gap-3 mt-0 mb-0">
//               <IoRocketOutline />
//               Free International Delivery
//             </p>
//           </div>
//         </div>
//       </nav>

//       {/* Category Panel with real data */}
//       <CategoryPanel 
//         isOpenCategoryPanel={isOpenCategoryPanel} 
//         setIsOpenCategoryPanel={setIsOpenCategoryPanel}
//         categories={categories}
//       /> 
//     </>
//   );
// };

// export default Navigation; 
































 
// import Button from '@mui/material/Button'
// import React, {useState} from 'react'
// import { RiMenuLine } from "react-icons/ri";
// import { FaAngleDown } from "react-icons/fa6";
// import { IoRocketOutline } from "react-icons/io5";
// import { Link } from 'react-router-dom';
// import CategoryPanel from './CategoryPanel';
// import '../Navigation/style.css'

// const Navigation = () => {

//     const [isOpenCategoryPanel, setIsOpenCategoryPanel] = useState(false) 

//     // const openCategoryPanel = ()=> {
//     //     setIsOpenCategoryPanel(true)
//     // } 

//     const openCategoryPanel = () => {
//         setIsOpenCategoryPanel(true);
//     };

    
//   return (
//     <>
//         <nav >
//             <div className="container flex items-center justify-end gap-8">
//                 <div className="col_1 w-[20%]">
//                     <Button className='!text-black' onClick={openCategoryPanel}>
//                         <RiMenuLine className='text-[18px]'/>
//                         Shop By Categories
//                         <FaAngleDown className='text-[14px] ml-auto font-bold cursor-pointer'/>
//                     </Button>
//                 </div>

//                 <div className="col_2 w-[60%]">
//                     <ul className="flex items-center gap-4 nav">
//                         <li className="list-none">
//                             <Link to='/' className='link transition text-[14px] font-[500]'>
//                                 <Button className='link transition font-[500] hover:!text-[red] !py-4'>Home</Button> 
//                             </Link>
//                         </li>
//                         <li className="list-none relative">
//                             <Link to='/productListing' className='link transition text-[14px] font-[500]'>
//                                 <Button className='link transition font-[500] hover:!text-[red] !py-4'>Fashion</Button> 
//                             </Link>


//                             <div className="submenu absolute top-[120%] left-[0%] min-w-[200px] 
//                             bg-white shadow-md opacity-0 transition-all">
//                                 <ul>
//                                     <li className="list-none w-full relative">
//                                         <Link to='/' className='w-full'>
//                                             <Button className='!text-[rgba(0,0,0,0.8)] w-full !text-left !justify-start !rounded-none'>
//                                                 T-shirt
//                                             </Button>


//                                             <div className="submenu absolute top-[0%] left-[100%] min-w-[150px] 
//                                                 bg-white shadow-md opacity-0 transition-all">
//                                                     <ul>
//                                                         <li className="list-none w-full">
//                                                             <Link to='/' className='w-full'>
//                                                                 <Button className='!text-[rgba(0,0,0,0.8)] w-full !text-left !justify-start !rounded-none'>
//                                                                     T-shirt
//                                                                 </Button>
//                                                             </Link>
//                                                         </li>
//                                                         <li className="list-none w-full">
//                                                             <Link to='/' className="w-full">
//                                                                 <Button className='!text-[rgba(0,0,0,0.8)] w-full !text-left !justify-start !rounded-none'>
//                                                                     Gowns
//                                                                 </Button>
//                                                             </Link>
//                                                         </li>
//                                                         <li className="list-none w-full">
//                                                         <Link to='/' className="w-full">
//                                                             <Button className='!text-[rgba(0,0,0,0.8)] w-full !text-left !justify-start !rounded-none'>
//                                                                 Wrist watches
//                                                             </Button>
//                                                         </Link>
//                                                         </li>
//                                                         <li className="list-none w-full">
//                                                             <Link to='/' className="w-full">
//                                                                 <Button className='!text-[rgba(0,0,0,0.8)] w-full !text-left !justify-start !rounded-none'>
//                                                                 Jeans
//                                                                 </Button>
//                                                             </Link>
//                                                         </li>
//                                                         <li className="list-none w-full">
//                                                             <Link className="w-full">
//                                                                 <Button className='!text-[rgba(0,0,0,0.8)] w-full !text-left !justify-start !rounded-none'>
//                                                                 Shoes
//                                                                 </Button>
//                                                             </Link>
//                                                         </li>
//                                                     </ul>
//                                                 </div>
//                                         </Link>

                                        


//                                     </li>
//                                     <li className="list-none w-full">
//                                         <Link to='/' className="w-full">
//                                             <Button className='!text-[rgba(0,0,0,0.8)] w-full !text-left !justify-start !rounded-none'>
//                                                 Gowns
//                                             </Button>
//                                         </Link>
//                                     </li>
//                                     <li className="list-none w-full">
//                                        <Link to='/' className="w-full">
//                                          <Button className='!text-[rgba(0,0,0,0.8)] w-full !text-left !justify-start !rounded-none'>
//                                             Wrist watches
//                                         </Button>
//                                        </Link>
//                                     </li>
//                                     <li className="list-none w-full">
//                                         <Link to='/' className="w-full">
//                                             <Button className='!text-[rgba(0,0,0,0.8)] w-full !text-left !justify-start !rounded-none'>
//                                             Jeans
//                                             </Button>
//                                         </Link>
//                                     </li>
//                                     <li className="list-none w-full">
//                                         <Link className="w-full">
//                                             <Button className='!text-[rgba(0,0,0,0.8)] w-full !text-left !justify-start !rounded-none'>
//                                             Shoes
//                                             </Button>
//                                         </Link>
//                                     </li>
//                                 </ul>
//                             </div>
//                         </li>
//                         <li className="list-none">
//                             <Link to='/' className='link transition text-[14px] font-[500]'>
//                                 <Button className='link transition font-[500] hover:!text-[red] !py-4'>Electronics</Button> 
//                             </Link>
//                         </li>
//                         <li className="list-none">
//                             <Link to='/' className='link transition text-[14px] font-[500]'>
//                                 <Button className='link transition font-[500] hover:!text-[red] !py-4'>Bags</Button> 
//                             </Link>
//                         </li>
//                         <li className="list-none">
//                             <Link to='/' className='link transition text-[14px] font-[500]'>
//                                 <Button className='link transition font-[500] hover:!text-[red] !py-4'>Footwear</Button> 
//                             </Link>
//                         </li>
//                         <li className="list-none">
//                             <Link to='/' className='link transition text-[14px] font-[500]'>
//                                 <Button className='link transition font-[500] hover:!text-[red] !py-4'>Groceries</Button> 
//                             </Link>
//                         </li>
//                         <li className="list-none">
//                             <Link to='/' className='link transition text-[14px] font-[500]'>
//                                 <Button className='link transition font-[500] hover:!text-[red] !py-4'>Beauty</Button> 
//                             </Link>
//                         </li>
//                         <li className="list-none">
//                             <Link to='/' className='link transition text-[14px] font-[500]'>
//                                 <Button className='link transition font-[500] hover:!text-[red] !py-4'>Jewelry</Button> 
//                             </Link>
//                         </li>
//                     </ul>
//                 </div> 

//                 <div className="col_2 w-[20%]">
//                     <p className="text-[13px] font-[500] flex items-center gap-3 mt-0 mb-0">
//                         <IoRocketOutline />
//                         Free International Delivery
//                     </p>
//                 </div>

                
//             </div>
//         </nav>

//         {/* category panel component */}
//         <CategoryPanel openCategoryPanel={openCategoryPanel} setIsOpenCategoryPanel={setIsOpenCategoryPanel} isOpenCategoryPanel={isOpenCategoryPanel}/> 
        
//     </>
//   )
// }

// export default Navigation