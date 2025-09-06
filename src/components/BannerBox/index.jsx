
import React from "react";
import { Link } from "react-router-dom";

const BannerBox = (props) => {
  return (
    <div
      style={{
        overflow: "hidden",
        borderRadius: "12px",
        position: "relative",
      }}
    >
      <Link to="/" style={{ display: "block", width: "100%", height: "100%" }}>
        <img
          src={props.img}
          alt="banner"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            transition: "transform 0.3s ease-in-out",
          }}
          className="banner-img"
          onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
          onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
        />
      </Link>
    </div>
  );
};

export default BannerBox;











// import React from 'react'
// import { Link } from 'react-router-dom'




// const BannerBox = (props) => {
//   return (
//     <div className="box bannerBox overflow-hidden rounded-lg group">
//         <Link to='/'>
//             <img src={props.img} className='w-full transition-all group-hover:scale-105' alt='banner'/>
//         </Link>
//     </div>
//   )
// }

// export default BannerBox 