import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

const HomeSlider = () => {
  return (
    <div className="homeSlider py-4">
      <div className="container">
        <Swiper 
          spaceBetween={10} 
          loop={true}
          autoplay={{
          delay: 2500,
          disableOnInteraction: false,
          }} 
          navigation={true}
          modules={[Autoplay, Navigation]}
          className="sliderHome w-full h-[400px]"
        >
          <SwiperSlide>
            {/* <div className="rounded-[20px]"> */}
              <img src="/swipe1.jpg" alt="Jubian market" className="w-full h-full object-cover rounded-[20px] overflow-hidden" />
            {/* </div> */}
          </SwiperSlide>
          <SwiperSlide>
            {/* <div className="item rounded-[20px]"> */}
            <img src="/swipe2.jpg" alt="Jubian banner" className="w-full h-full object-cover rounded-[20px] overflow-hidden" />
            {/* </div> */}
          </SwiperSlide>
          <SwiperSlide>
            {/* <div className="item rounded-[20px]"> */}
            <img src="/swipe3.jpg" alt="Jubian cover" className="w-full h-full object-cover rounded-[20px] overflow-hidden" />
            {/* </div> */}
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
};

export default HomeSlider;






 