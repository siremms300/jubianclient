import React, { useState, useEffect } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import ProductItem from '../ProductItem';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import { productApi } from '../../utils/productApi';

const ProductsSlider = (props) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, [props.categoryId, props.type]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      let response;

      if (props.categoryId) {
        // Fetch products by category
        response = await productApi.getProductsByCategory(props.categoryId, {
          limit: props.items || 10,
          status: 'Active'
        });
      } else if (props.type === 'featured') {
        // Fetch featured products
        response = await productApi.getFeaturedProducts(props.items || 10);
      } else if (props.type === 'latest') {
        // Fetch latest products
        response = await productApi.getLatestProducts(props.items || 10);
      } else {
        // Fetch all active products
        response = await productApi.getProducts({
          limit: props.items || 10,
          status: 'Active'
        });
      }

      if (response.success) {
        setProducts(response.data);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="productsSlider py-5">
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          height: '200px' 
        }}>
          <div>Loading products...</div>
        </div>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="productsSlider py-5">
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          height: '200px',
          color: '#6b7280'
        }}>
          No products found
        </div>
      </div>
    );
  }

  return (
    <div className="productsSlider py-5">
        <Swiper
            slidesPerView={props.items || 5}
            spaceBetween={30}
            modules={[Navigation]}
            className="mySwiper"
            navigation={true}
            breakpoints={{
              320: {
                slidesPerView: 1,
                spaceBetween: 10
              },
              640: {
                slidesPerView: 2,
                spaceBetween: 20
              },
              768: {
                slidesPerView: 3,
                spaceBetween: 25
              },
              1024: {
                slidesPerView: props.items || 4,
                spaceBetween: 30
              },
              1280: {
                slidesPerView: props.items || 5,
                spaceBetween: 30
              }
            }}
        >
            {products.map((product) => (
                <SwiperSlide key={product._id}>
                    <ProductItem product={product} />
                </SwiperSlide>
            ))}
        </Swiper>
    </div>
  );
} 

export default ProductsSlider;

































// import React from 'react'
// import { Swiper, SwiperSlide } from 'swiper/react';
// import { Link } from 'react-router-dom';
// import ProductItem from '../ProductItem';

// import 'swiper/css';
// import 'swiper/css/navigation';

// import { Navigation } from 'swiper/modules';


// const ProductsSlider = (props) => {
//   return (
//     <div className="productsSlider py-5">
//         <Swiper
//             slidesPerView={props.items}
//             spaceBetween={30}
//             modules={[Navigation]}
//             className="mySwiper"
//             navigation={true} 
//         >
//             <SwiperSlide>
//                 <ProductItem />
//             </SwiperSlide>
//             <SwiperSlide>
//                 <ProductItem />
//             </SwiperSlide>
//             <SwiperSlide>
//                 <ProductItem />
//             </SwiperSlide>
//             <SwiperSlide>
//                 <ProductItem />
//             </SwiperSlide>
//             <SwiperSlide>
//                 <ProductItem />
//             </SwiperSlide>
//             <SwiperSlide>
//                 <ProductItem />
//             </SwiperSlide>
//             <SwiperSlide>
//                 <ProductItem />
//             </SwiperSlide>
//             <SwiperSlide>
//                 <ProductItem />
//             </SwiperSlide>
//             <SwiperSlide>
//                 <ProductItem />
//             </SwiperSlide>
//             <SwiperSlide>
//                 <ProductItem />
//             </SwiperSlide>
//             <SwiperSlide>
//                 <ProductItem />
//             </SwiperSlide>
//             <SwiperSlide>
//                 <ProductItem />
//             </SwiperSlide>
//             <SwiperSlide>
//                 <ProductItem />
//             </SwiperSlide>
//             <SwiperSlide>
//                 <ProductItem />
//             </SwiperSlide>
//             <SwiperSlide>
//                 <ProductItem />
//             </SwiperSlide>
//         </Swiper>
//     </div>
//   )
// } 

// export default ProductsSlider

