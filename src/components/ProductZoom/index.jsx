import React from 'react'
import ImageZoom from 'react-image-magnifier-zoom';  
import 'react-inner-image-zoom/lib/styles.min.css';




const ProductZoom = () => {
  return (
    <>
        <div className="">
            <ImageZoom
                src="/src/assets/images/fashion.jpg"
                width={300}
                height={300}
                magnifierSize={100}
                zoomLevel={2.5}
                enabled={true}
            />
            
        </div>
    </>
  )
}

export default ProductZoom 




