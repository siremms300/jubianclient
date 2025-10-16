import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Link } from 'react-router-dom';

import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';

const HomeCatSlider = () => {
  return (
    <div
      style={{
        paddingTop: "16px",
        paddingBottom: "32px",
        backgroundColor: "#f9f9f9",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          paddingLeft: "16px",
          paddingRight: "16px",
        }}
      >
        <Swiper
          slidesPerView={7}
          spaceBetween={30}
          modules={[Navigation]}
          navigation={true}
          style={{ paddingBottom: "10px" }}
        >
          {/* Item */}
          <SwiperSlide>
            <Link to="/">
              <div
                style={{
                  padding: "32px 12px",
                  backgroundColor: "#fff",
                  borderRadius: "6px",
                  textAlign: "center",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "all 0.3s ease",
                  boxShadow: "0 1px 4px rgba(0,0,0,0.05)",
                }}
              >
                <img
                  src="/src/assets/images/fashion.jpg"
                  alt="category"
                  style={{
                    width: "60px",
                    height: "60px",
                    objectFit: "contain",
                    transition: "transform 0.3s ease",
                  }}
                  onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.1)")}
                  onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
                />
                <h3
                  style={{
                    fontSize: "14px",
                    fontWeight: 400,
                    marginTop: "12px",
                    color: "#333",
                  }}
                >
                  Gold Watch
                </h3>
              </div>
            </Link>
          </SwiperSlide>

          {/* Repeat other slides */}
          <SwiperSlide>
            <Link to="/">
              <div
                style={{
                  padding: "32px 12px",
                  backgroundColor: "#fff",
                  borderRadius: "6px",
                  textAlign: "center",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "all 0.3s ease",
                  boxShadow: "0 1px 4px rgba(0,0,0,0.05)",
                }}
              >
                <img
                  src="/src/assets/images/beauty.jpg"
                  alt="category"
                  style={{
                    width: "60px",
                    height: "60px",
                    objectFit: "contain",
                    transition: "transform 0.3s ease",
                  }}
                  onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.1)")}
                  onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
                />
                <h3
                  style={{
                    fontSize: "14px",
                    fontWeight: 400,
                    marginTop: "12px",
                    color: "#333",
                  }}
                >
                  Lip Stick
                </h3>
              </div>
            </Link>
          </SwiperSlide> 
          <SwiperSlide>
            <Link to="/">
              <div
                style={{
                  padding: "32px 12px",
                  backgroundColor: "#fff",
                  borderRadius: "6px",
                  textAlign: "center",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "all 0.3s ease",
                  boxShadow: "0 1px 4px rgba(0,0,0,0.05)",
                }}
              >
                <img
                  src="/src/assets/images/beauty.jpg"
                  alt="category"
                  style={{
                    width: "60px",
                    height: "60px",
                    objectFit: "contain",
                    transition: "transform 0.3s ease",
                  }}
                  onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.1)")}
                  onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
                />
                <h3
                  style={{
                    fontSize: "14px",
                    fontWeight: 400,
                    marginTop: "12px",
                    color: "#333",
                  }}
                >
                  Lip Stick
                </h3>
              </div>
            </Link>
          </SwiperSlide>
          <SwiperSlide>
            <Link to="/">
              <div
                style={{
                  padding: "32px 12px",
                  backgroundColor: "#fff",
                  borderRadius: "6px",
                  textAlign: "center",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "all 0.3s ease",
                  boxShadow: "0 1px 4px rgba(0,0,0,0.05)",
                }}
              >
                <img
                  src="/src/assets/images/beauty.jpg"
                  alt="category"
                  style={{
                    width: "60px",
                    height: "60px",
                    objectFit: "contain",
                    transition: "transform 0.3s ease",
                  }}
                  onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.1)")}
                  onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
                />
                <h3
                  style={{
                    fontSize: "14px",
                    fontWeight: 400,
                    marginTop: "12px",
                    color: "#333",
                  }}
                >
                  Lip Stick
                </h3>
              </div>
            </Link>
          </SwiperSlide>
          <SwiperSlide>
            <Link to="/">
              <div
                style={{
                  padding: "32px 12px",
                  backgroundColor: "#fff",
                  borderRadius: "6px",
                  textAlign: "center",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "all 0.3s ease",
                  boxShadow: "0 1px 4px rgba(0,0,0,0.05)",
                }}
              >
                <img
                  src="/src/assets/images/beauty.jpg"
                  alt="category"
                  style={{
                    width: "60px",
                    height: "60px",
                    objectFit: "contain",
                    transition: "transform 0.3s ease",
                  }}
                  onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.1)")}
                  onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
                />
                <h3
                  style={{
                    fontSize: "14px",
                    fontWeight: 400,
                    marginTop: "12px",
                    color: "#333",
                  }}
                >
                  Lip Stick
                </h3>
              </div>
            </Link>
          </SwiperSlide>
          <SwiperSlide>
            <Link to="/">
              <div
                style={{
                  padding: "32px 12px",
                  backgroundColor: "#fff",
                  borderRadius: "6px",
                  textAlign: "center",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "all 0.3s ease",
                  boxShadow: "0 1px 4px rgba(0,0,0,0.05)",
                }}
              >
                <img
                  src="/src/assets/images/beauty.jpg"
                  alt="category"
                  style={{
                    width: "60px",
                    height: "60px",
                    objectFit: "contain",
                    transition: "transform 0.3s ease",
                  }}
                  onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.1)")}
                  onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
                />
                <h3
                  style={{
                    fontSize: "14px",
                    fontWeight: 400,
                    marginTop: "12px",
                    color: "#333",
                  }}
                >
                  Lip Stick
                </h3>
              </div>
            </Link>
          </SwiperSlide>
          <SwiperSlide>
            <Link to="/">
              <div
                style={{
                  padding: "32px 12px",
                  backgroundColor: "#fff",
                  borderRadius: "6px",
                  textAlign: "center",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "all 0.3s ease",
                  boxShadow: "0 1px 4px rgba(0,0,0,0.05)",
                }}
              >
                <img
                  src="/src/assets/images/beauty.jpg"
                  alt="category"
                  style={{
                    width: "60px",
                    height: "60px",
                    objectFit: "contain",
                    transition: "transform 0.3s ease",
                  }}
                  onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.1)")}
                  onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
                />
                <h3
                  style={{
                    fontSize: "14px",
                    fontWeight: 400,
                    marginTop: "12px",
                    color: "#333",
                  }}
                >
                  Lip Stick
                </h3>
              </div>
            </Link>
          </SwiperSlide>
          <SwiperSlide>
            <Link to="/">
              <div
                style={{
                  padding: "32px 12px",
                  backgroundColor: "#fff",
                  borderRadius: "6px",
                  textAlign: "center",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "all 0.3s ease",
                  boxShadow: "0 1px 4px rgba(0,0,0,0.05)",
                }}
              >
                <img
                  src="/src/assets/images/beauty.jpg"
                  alt="category"
                  style={{
                    width: "60px",
                    height: "60px",
                    objectFit: "contain",
                    transition: "transform 0.3s ease",
                  }}
                  onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.1)")}
                  onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
                />
                <h3
                  style={{
                    fontSize: "14px",
                    fontWeight: 400,
                    marginTop: "12px",
                    color: "#333",
                  }}
                >
                  Lip Stick
                </h3>
              </div>
            </Link>
          </SwiperSlide>

          

        </Swiper>
      </div>
    </div>
  );
};

export default HomeCatSlider;


















// import React from 'react'
// import { Swiper, SwiperSlide } from 'swiper/react';
// import { Link } from 'react-router-dom';

// import 'swiper/css';
// import 'swiper/css/navigation';

// import { Navigation } from 'swiper/modules';




// const HomeCatSlider = () => {
//   return (
//     <>
      
//        <div className="homeCatSlider pt-4 py-8">
//         <div className="container">
//             <Swiper
//                 slidesPerView={7}
//                 spaceBetween={30}
//                 modules={[Navigation]}
//                 className="mySwiper"
//                 navigation={true} 
//             >
//                 <SwiperSlide>
//                     <Link to='/'>
//                         <div className="item py-8 px-3 bg-white rounded-sm text-center flex items-center justify-center flex-col">
//                         <img src='/src/assets/images/fashion.jpg' className='w-[60px] transition-all'/>
//                         <h3 className='text-[14px] font-[400] mt-3'>Gold Watch</h3>
//                     </div>
//                     </Link>
//                 </SwiperSlide> 
//                 <SwiperSlide>
//                     <Link to='/'>
//                         <div className="item py-8 px-3 bg-white rounded-sm text-center flex items-center justify-center flex-col">
//                         <img src='/src/assets/images/beauty.jpg' className='w-[60px] transition-all'/>
//                         <h3 className='text-[14px] font-[400] mt-3'>Lip stick</h3>
//                     </div>
//                     </Link>
//                 </SwiperSlide> 
//                 <SwiperSlide>
//                     <Link to='/'>
//                         <div className="item py-8 px-3 bg-white rounded-sm text-center flex items-center justify-center flex-col">
//                         <img src='/src/assets/images/electronics.jpg' className='w-[60px] transition-all'/>
//                         <h3 className='text-[14px] font-[400] mt-3'> hp Laptop</h3>
//                     </div>
//                     </Link>
//                 </SwiperSlide> 
//                 <SwiperSlide>
//                     <Link to='/'>
//                         <div className="item py-8 px-3 bg-white rounded-sm text-center flex items-center justify-center flex-col">
//                         <img src='/src/assets/images/grocery.jpg' className='w-[60px] transition-all'/>
//                         <h3 className='text-[14px] font-[400] mt-3'>Grocery</h3>
//                     </div>
//                     </Link>
//                 </SwiperSlide> 
//                 <SwiperSlide>
//                     <Link to='/'>
//                         <div className="item py-8 px-3 bg-white rounded-sm text-center flex items-center justify-center flex-col">
//                         <img src='/src/assets/images/handbag.jpg' className='w-[60px] transition-all'/>
//                         <h3 className='text-[14px] font-[400] mt-3'>Luxury Bag</h3>
//                     </div>
//                     </Link>
//                 </SwiperSlide> 
//                 <SwiperSlide>
//                     <Link to='/'>
//                         <div className="item py-8 px-3 bg-white rounded-sm text-center flex items-center justify-center flex-col">
//                         <img src='/src/assets/images/jewelry.jpg' className='w-[60px] transition-all'/>
//                         <h3 className='text-[14px] font-[400] mt-3'>Jewelry</h3>
//                     </div>
//                     </Link>
//                 </SwiperSlide> 
//                 <SwiperSlide>
//                     <Link to='/'>
//                         <div className="item py-8 px-3 bg-white rounded-sm text-center flex items-center justify-center flex-col">
//                         <img src='/src/assets/images/fashion.jpg' className='w-[60px] transition-all'/>
//                         <h3 className='text-[14px] font-[400] mt-3'>Gold Watch</h3>
//                     </div>
//                     </Link>
//                 </SwiperSlide> 
//                 <SwiperSlide>
//                     <Link to='/'>
//                         <div className="item py-8 px-3 bg-white rounded-sm text-center flex items-center justify-center flex-col">
//                         <img src='/src/assets/images/fashion.jpg' className='w-[60px] transition-all'/>
//                         <h3 className='text-[14px] font-[400] mt-3'>Gold Watch</h3>
//                     </div>
//                     </Link>
//                 </SwiperSlide> 
                

//             </Swiper>
//         </div>
//        </div>
          
//     </>
//   );
// }

// export default HomeCatSlider 