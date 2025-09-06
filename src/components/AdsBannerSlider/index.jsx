import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import BannerBox from "../BannerBox";

const AdsBannerSlider = (props) => {
  return (
    <div style={{ padding: "20px 0", width: "100%" }}>
      <Swiper
        slidesPerView={props.items}
        spaceBetween={10}
        navigation={true}
        modules={[Navigation]}
        className="smlBtn"
      >
        <SwiperSlide>
          <BannerBox img={"/src/assets/images/ad1.jpg"} link={"/"} />
        </SwiperSlide>
        <SwiperSlide>
          <BannerBox img={"/src/assets/images/ad2.jpg"} link={"/"} />
        </SwiperSlide>
        <SwiperSlide>
          <BannerBox img={"/src/assets/images/ad3.jpg"} link={"/"} />
        </SwiperSlide>
        <SwiperSlide>
          <BannerBox img={"/src/assets/images/ad1.jpg"} link={"/"} />
        </SwiperSlide>
        <SwiperSlide>
          <BannerBox img={"/src/assets/images/ad2.jpg"} link={"/"} />
        </SwiperSlide>
        <SwiperSlide>
          <BannerBox img={"/src/assets/images/ad3.jpg"} link={"/"} />
        </SwiperSlide>
        <SwiperSlide>
          <BannerBox img={"/src/assets/images/ad1.jpg"} link={"/"} />
        </SwiperSlide>
        <SwiperSlide>
          <BannerBox img={"/src/assets/images/ad2.jpg"} link={"/"} />
        </SwiperSlide>
        <SwiperSlide>
          <BannerBox img={"/src/assets/images/ad3.jpg"} link={"/"} />
        </SwiperSlide>
        <SwiperSlide>
          <BannerBox img={"/src/assets/images/ad1.jpg"} link={"/"} />
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default AdsBannerSlider;















// import React from "react";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Navigation } from "swiper/modules";

// import "swiper/css";
// import "swiper/css/navigation";
// import BannerBox from "../BannerBox";

// const AdsBannerSlider = (props) => {
//   return (
//     <div className="py-5 w-full">
//       <Swiper
//         slidesPerView={props.items}
//         spaceBetween={10}
//         navigation={true}
//         modules={[Navigation]}
//         className="smlBtn"
//       >
//         <SwiperSlide>
//           <BannerBox img={'/src/assets/images/ad1.jpg'} link={'/'}/>
//         </SwiperSlide>  
//         <SwiperSlide>
//           <BannerBox img={'/src/assets/images/ad2.jpg'} link={'/'}/>
//         </SwiperSlide>  
//         <SwiperSlide>
//           <BannerBox img={'/src/assets/images/ad3.jpg'} link={'/'}/>
//         </SwiperSlide>  
//         <SwiperSlide>
//           <BannerBox img={'/src/assets/images/ad1.jpg'} link={'/'}/>
//         </SwiperSlide>  
//         <SwiperSlide>
//           <BannerBox img={'/src/assets/images/ad2.jpg'} link={'/'}/>
//         </SwiperSlide>  
//         <SwiperSlide>
//           <BannerBox img={'/src/assets/images/ad3.jpg'} link={'/'}/>
//         </SwiperSlide>  
//         <SwiperSlide>
//           <BannerBox img={'/src/assets/images/ad1.jpg'} link={'/'}/>
//         </SwiperSlide>  
//         <SwiperSlide>
//           <BannerBox img={'/src/assets/images/ad2.jpg'} link={'/'}/>
//         </SwiperSlide>  
//         <SwiperSlide>
//           <BannerBox img={'/src/assets/images/ad3.jpg'} link={'/'}/>
//         </SwiperSlide>  
//         <SwiperSlide>
//           <BannerBox img={'/src/assets/images/ad1.jpg'} link={'/'}/>
//         </SwiperSlide>  
//       </Swiper>
//     </div>
//   );
// };

// export default AdsBannerSlider;
