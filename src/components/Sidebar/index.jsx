import React, { useState } from "react";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { Collapse } from "react-collapse";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import Button from "@mui/material/Button";
import RangeSlider from "react-range-slider-input";
import "react-range-slider-input/dist/style.css";
import Rating from "@mui/material/Rating";

const Sidebar = () => {
  const [isOpenCategoryFilter, setIsOpenCategoryFilter] = useState(true);
  const [isOpenAvailableFilter, setIsOpenAvailableFilter] = useState(true);
  const [isOpenSizeFilter, setIsOpenSizeFilter] = useState(true);

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
  };

  return (
    <aside style={{ padding: "20px", width: "260px", backgroundColor: "#f9fafb" }}>
      {/* Categories */}
      <div style={boxStyle}>
        <h3 style={headingStyle}>
          Shop by Category
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
          <div style={scrollStyle}>
            <FormControlLabel control={<Checkbox size="small" />} label="Fashion" />
            <FormControlLabel control={<Checkbox size="small" />} label="Electronics" />
            <FormControlLabel control={<Checkbox size="small" />} label="Bags" />
            <FormControlLabel control={<Checkbox size="small" />} label="Footwear" />
            <FormControlLabel control={<Checkbox size="small" />} label="Grocery" />
            <FormControlLabel control={<Checkbox size="small" />} label="Beauty" />
            <FormControlLabel control={<Checkbox size="small" />} label="Jewelry" />
          </div>
        </Collapse>
      </div>

      {/* Availability */}
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
            onClick={() => setIsOpenAvailableFilter(!isOpenAvailableFilter)}
          >
            {isOpenAvailableFilter ? <FaAngleDown /> : <FaAngleUp />}
          </Button>
        </h3>
        <Collapse isOpened={isOpenAvailableFilter}>
          <div style={scrollStyle}>
            <FormControlLabel control={<Checkbox size="small" />} label="Available (12)" />
            <FormControlLabel control={<Checkbox size="small" />} label="In Stock (8)" />
            <FormControlLabel control={<Checkbox size="small" />} label="Out of Stock (2)" />
          </div>
        </Collapse>
      </div>

      {/* Sizes */}
      <div style={boxStyle}>
        <h3 style={headingStyle}>
          Size
          <Button
            style={{
              width: "30px",
              height: "30px",
              minWidth: "30px",
              borderRadius: "50%",
              marginLeft: "auto",
            }}
            onClick={() => setIsOpenSizeFilter(!isOpenSizeFilter)}
          >
            {isOpenSizeFilter ? <FaAngleDown /> : <FaAngleUp />}
          </Button>
        </h3>
        <Collapse isOpened={isOpenSizeFilter}>
          <div style={scrollStyle}>
            <FormControlLabel control={<Checkbox size="small" />} label="Small - SM" />
            <FormControlLabel control={<Checkbox size="small" />} label="Medium" />
            <FormControlLabel control={<Checkbox size="small" />} label="Large" />
            <FormControlLabel control={<Checkbox size="small" />} label="XL" />
            <FormControlLabel control={<Checkbox size="small" />} label="XXL" />
          </div>
        </Collapse>
      </div>

      {/* Price Filter */}
      <div style={boxStyle}>
        <h3 style={headingStyle}>Filter by Price</h3>
        <RangeSlider />
        <div
          style={{
            display: "flex",
            marginTop: "16px",
            paddingTop: "12px",
            borderTop: "1px solid rgba(0,0,0,0.1)",
            fontSize: "14px",
          }}
        >
          <span>
            From: <strong>$100</strong>
          </span>
          <span style={{ marginLeft: "auto" }}>
            To: <strong>$5000</strong>
          </span>
        </div>
      </div>

      {/* Rating Filter */}
      <div style={boxStyle}>
        <h3 style={headingStyle}>Filter by Rating</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
          <Rating name="rating-5" defaultValue={5} size="small" readOnly />
          <Rating name="rating-4" defaultValue={4} size="small" readOnly />
          <Rating name="rating-3" defaultValue={3} size="small" readOnly />
          <Rating name="rating-2" defaultValue={2} size="small" readOnly />
          <Rating name="rating-1" defaultValue={1} size="small" readOnly />
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;














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