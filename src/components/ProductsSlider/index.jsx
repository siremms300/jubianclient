
import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Link } from 'react-router-dom';
import ProductItem from '../ProductItem';

import 'swiper/css';
import 'swiper/css/navigation';

import { Navigation } from 'swiper/modules';


const ProductsSlider = (props) => {
  return (
    <div className="productsSlider py-5">
        <Swiper
            slidesPerView={props.items}
            spaceBetween={30}
            modules={[Navigation]}
            className="mySwiper"
            navigation={true} 
        >
            <SwiperSlide>
                <ProductItem />
            </SwiperSlide>
            <SwiperSlide>
                <ProductItem />
            </SwiperSlide>
            <SwiperSlide>
                <ProductItem />
            </SwiperSlide>
            <SwiperSlide>
                <ProductItem />
            </SwiperSlide>
            <SwiperSlide>
                <ProductItem />
            </SwiperSlide>
            <SwiperSlide>
                <ProductItem />
            </SwiperSlide>
            <SwiperSlide>
                <ProductItem />
            </SwiperSlide>
            <SwiperSlide>
                <ProductItem />
            </SwiperSlide>
            <SwiperSlide>
                <ProductItem />
            </SwiperSlide>
            <SwiperSlide>
                <ProductItem />
            </SwiperSlide>
            <SwiperSlide>
                <ProductItem />
            </SwiperSlide>
            <SwiperSlide>
                <ProductItem />
            </SwiperSlide>
            <SwiperSlide>
                <ProductItem />
            </SwiperSlide>
            <SwiperSlide>
                <ProductItem />
            </SwiperSlide>
            <SwiperSlide>
                <ProductItem />
            </SwiperSlide>
        </Swiper>
    </div>
  )
} 

export default ProductsSlider