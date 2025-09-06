import React from 'react'

import HomeSlider from '../../components/HomeSlider'
import HomeCatSlider from '../../components/HomeCatSlider'
import AdsBannerSlider from '../../components/AdsBannerSlider';
import { LiaShippingFastSolid } from "react-icons/lia";
import BlogItem from '../../components/BlogItem';

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab'; 
import ProductsSlider from '../../components/ProductsSlider';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Link } from 'react-router-dom';

import 'swiper/css';
import 'swiper/css/navigation';

import { Navigation } from 'swiper/modules';

const Home = () => {
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <HomeSlider />  
      <br /> 
      <HomeCatSlider /> 
      <br />

      {/* Popular Products Section */}
      <section style={{ background: "#fff", padding: "60px 0" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div>
              <h3 style={{ fontSize: "18px", fontWeight: 500 }}>Popular Products</h3> 
              <p style={{ fontSize: "16px", fontWeight: 400 }}>Do not miss out on our popular fast selling products</p>
            </div> 

            <div style={{ width: "60%" }}>
              <Tabs
                value={value}
                onChange={handleChange}
                variant="scrollable"
                scrollButtons="auto"
                aria-label="scrollable auto tabs example"
              >
                <Tab label="Fashion" />
                <Tab label="Electronics" />
                <Tab label="Bags" />
                <Tab label="Footwear" />
                <Tab label="Groceries" />
                <Tab label="Beauty" />
                <Tab label="Jewelry" />
              </Tabs>
            </div>
          </div>

          <ProductsSlider items={5}/>
        </div>
      </section> 

      <br />

      {/* Free Shipping + Ads Banner */}
      <section style={{ padding: "64px 8px", background: "#fff" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 16px" }}>
          
          <div 
            style={{ 
              background: "#fff",
              width: "80%",
              margin: "0 auto",
              padding: "16px",
              border: "1px solid #ef7921",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              borderRadius: "8px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
              marginBottom: "28px"
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
              <LiaShippingFastSolid style={{ fontSize: "50px", color: "#ef7921" }} />
              <span style={{ fontSize: "20px", fontWeight: 500 }}>Free Shipping</span>
            </div> 

            <div>
              <p style={{ margin: 0, fontWeight: 500, color: "#ef7921" }}>
                Free Delivery on your first order above $200
              </p>
            </div>

            <p style={{ fontSize: "20px", fontWeight: "bold", color: "#ef7921" }}>
              Only $200
            </p>
          </div>

          <br />

          <AdsBannerSlider items={4}/>
        </div>
      </section>

      <br />

      {/* Latest Products */}
      <section style={{ padding: "20px 0", background: "#fff" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <h3 style={{ fontSize: "18px", fontWeight: 500 }}>Latest Products</h3> 
          <ProductsSlider items={5} />
          <br />
          <AdsBannerSlider items={3}/>
        </div>
      </section>

      {/* Featured Products */}
      <section style={{ padding: "20px 0", background: "#fff" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <h3 style={{ fontSize: "18px", fontWeight: 500 }}>Featured Products</h3> 
          <ProductsSlider items={5} /> 
          <AdsBannerSlider items={3}/>
        </div>
      </section>

      {/* Blog Section (commented out) */}
      {/* <section style={{ padding: "20px 0", background: "#fff" }}>
        <div style={{ padding: "20px 0" }}>
          <Swiper
            slidesPerView={3}
            spaceBetween={30}
            modules={[Navigation]}
            className="blogSlider"
            navigation={true} 
          >
            <SwiperSlide>
              <BlogItem />
            </SwiperSlide>
          </Swiper>
        </div>
      </section> */}

      <br /> 
      <br /> 
    </>
  )
}

export default Home











// import React from 'react'

// import HomeSlider from '../../components/HomeSlider'
// import HomeCatSlider from '../../components/HomeCatSlider'
// import AdsBannerSlider from '../../components/AdsBannerSlider';
// import { LiaShippingFastSolid } from "react-icons/lia";
// import BlogItem from '../../components/BlogItem';

// import Tabs from '@mui/material/Tabs';
// import Tab from '@mui/material/Tab'; 
// import ProductsSlider from '../../components/ProductsSlider';

 
// import { Swiper, SwiperSlide } from 'swiper/react';
// import { Link } from 'react-router-dom';

// import 'swiper/css';
// import 'swiper/css/navigation';

// import { Navigation } from 'swiper/modules';



// const Home = () => {

//    const [value, setValue] = React.useState(0);
//    const handleChange = (event, newValue) => {
//     setValue(newValue);
//   };


//   return (
//     <>
//       <HomeSlider />  
//       <br /> 
//       <HomeCatSlider /> 
//       <br />

//       <section className='bg-white py-15'>
//         <div className="container">
//           <div className="flex items-center justify-between">
//             <div className="leftSec">
//               <h3 className='text-[18px] font-[500]'>Popular Products</h3> 
//               <p className='text-[16px] font-[400]'>Do not miss out on our popular fast selling products</p>
//             </div> 


//             <div className="rightSec w-[60%]">
//                <Tabs
//                   value={value}
//                   onChange={handleChange}
//                   variant="scrollable"
//                   scrollButtons="auto"
//                   aria-label="scrollable auto tabs example"
//                 >
//                   <Tab label="Fashion" />
//                   <Tab label="Electronics" />
//                   <Tab label="Bags" />
//                   <Tab label="Footwear" />
//                   <Tab label="Groceries" />
//                   <Tab label="Beauty" />
//                   <Tab label="Jewelry" />
//                 </Tabs>
//             </div>
//           </div>

//           <ProductsSlider items={5}/>
//         </div>
//       </section> 

//       <br />

//       <section className="py-16 p-2 bg-white">
//         <div className="container mx-auto px-4">
//           {/* I replaced w-full with w-[80%] m-auto below */}
//           <div className="freeShipping bg-white w-[80%] m-auto py-4 p-4 border border-[#ff5252] flex items-center justify-between rounded-md shadow-md mb-7">
//             <div className="col1 flex items-center gap-4">
//               <LiaShippingFastSolid className="text-[50px] text-[#ff5252]" />
//               <span className="text-[20px] font-[500]">Free Shipping</span>
//             </div> 

//             <div className="col2">
//               <p className='mb-0 font-[500] text-gray-700'>Free Delivery on your first order above $200</p>
//             </div>

//             <p className="font-md text-[20px] font-bold text-[#ff5252]">
//               Only $200
//             </p>
//           </div>
//           <br />

//           <AdsBannerSlider items={4}/>
//         </div>
//       </section>

//       <br />


//       <section className="py-5 bg-white">
//         <div className="container">
//           <h3 className='text-[18px] font-[500]'>Latest Products</h3> 
//           <ProductsSlider items={5} />
//           <br />
//           <AdsBannerSlider items={3}/>
//         </div>
//       </section>

//       <section className="py-5 bg-white">
//         <div className="container">
//           <h3 className='text-[18px] font-[500]'>Featured Products</h3> 
//           <ProductsSlider items={5} /> 
//           <AdsBannerSlider items={3}/>
//         </div>
//       </section>

//       {/* <section className="py-5 bg-white blogSection">
//         <div className="py-5">
//           <Swiper
//             slidesPerView={3}
//             spaceBetween={30}
//             modules={[Navigation]}
//             className="blogSlider"
//             navigation={true} 
//         >
//             <SwiperSlide>
//                 <BlogItem />
//             </SwiperSlide>
//           </Swiper>
//         </div>
//       </section> */}

//       <br />
 

//       <br /> 
//     </>
//   )
// }

// export default Home 

