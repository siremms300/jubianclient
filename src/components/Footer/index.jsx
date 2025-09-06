import React from "react";
import { FaShippingFast } from "react-icons/fa";
import { PiKeyReturn } from "react-icons/pi";
import { IoWalletOutline } from "react-icons/io5";
import { CiGift } from "react-icons/ci";
import { BiSupport } from "react-icons/bi";
import { Link } from "react-router-dom";
import { IoIosChatbubbles } from "react-icons/io";
import Button from "@mui/material/Button";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

const Footer = () => {
  return (
    <footer style={{ padding: "24px 0", backgroundColor: "#fff" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 16px" }}>
        {/* Top Features */}
        <div
        style={{
            display: "flex",
            alignItems: "stretch",
            justifyContent: "center",
            gap: "16px",
            padding: "32px 0",
            backgroundColor: "#f3f4f6",
        }}
        >
        {[
            { icon: <FaShippingFast size={40} />, title: "Free Shipping", text: "for orders above $100" },
            { icon: <PiKeyReturn size={40} />, title: "30 Days Returns", text: "For an Exchange Product" },
            { icon: <IoWalletOutline size={40} />, title: "Secure Payment", text: "from anywhere in the world" },
            { icon: <CiGift size={40} />, title: "Special Gifts", text: "for orders above $100" },
            { icon: <BiSupport size={40} />, title: "24/7 Support", text: "we’re here to help you" },
        ].map((item, idx) => (
            <div
            key={idx}
            style={{
                flex: "1",
                textAlign: "center",
                cursor: "default",
                transition: "all 0.3s ease",
                display: "flex",
                flexDirection: "column",
                alignItems: "center", // 👈 makes icon and text stack centered
                justifyContent: "flex-start",
            }}
            >
            <div
                style={{
                marginBottom: "12px",
                color: "#333",
                display: "flex",
                alignItems: "center",
                justifyContent: "center", // 👈 ensures icon is centered horizontally
                width: "100%",
                }}
            >
                {item.icon}
            </div>
            <h3 style={{ fontSize: "16px", fontWeight: 500, margin: "8px 0" }}>{item.title}</h3>
            <p style={{ fontSize: "12px", fontWeight: 400, margin: 0 }}>{item.text}</p>
            </div>
        ))}
        </div>


        {/* Bottom Footer */}
        <div
          style={{
            display: "flex",
            gap: "24px",
            padding: "32px 0",
            borderTop: "1px solid rgba(0,0,0,0.1)",
          }}
        >
          {/* Contact Section */}
          <div style={{ width: "25%" }}>
            <h2 style={{ fontSize: "18px", fontWeight: 500, marginBottom: "16px" }}>Contact us</h2>
            <p style={{ fontSize: "13px", fontWeight: 400, marginBottom: "16px" }}>
              Classyshop - Mega Super Store <br />
              507-Union Trade Centre France
            </p>
            <Link
              to="mailto:jubianmarket@gmail.com"
              style={{ fontSize: "13px", textDecoration: "none", color: "inherit" }}
            >
              jubianmarket@gmail.com
            </Link>
            <span
              style={{
                fontSize: "18px",
                fontWeight: 600,
                display: "block",
                marginTop: "12px",
                marginBottom: "20px",
                color: "#ef7921",
              }}
            >
              +234906555555
            </span>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <IoIosChatbubbles size={28} style={{ paddingLeft: "8px" }} />
              <span style={{ fontSize: "16px", fontWeight: 500 }}>Chat with support</span>
            </div>
          </div>

          {/* Products Links */}
          <div style={{ width: "40%", display: "flex", paddingLeft: "24px" }}>
            {[1, 2].map((col) => (
              <div key={col} style={{ width: "50%" }}>
                <h2 style={{ fontSize: "18px", fontWeight: 500, marginBottom: "16px" }}>Products</h2>
                <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                  {[...Array(5)].map((_, idx) => (
                    <li key={idx} style={{ marginBottom: "8px" }}>
                      <Link
                        to="/"
                        style={{ fontSize: "13px", textDecoration: "none", color: "inherit" }}
                      >
                        Prices Drop
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Newsletter */}
          <div style={{ width: "35%", paddingLeft: "24px", paddingRight: "24px" }}>
            <h2 style={{ fontSize: "18px", fontWeight: 500, marginBottom: "16px" }}>
              Subscribe to Newsletter
            </h2>
            <p style={{ fontSize: "13px", marginBottom: "16px" }}>
              Subscribe to our latest newsletter to get news about special discounts.
            </p>
            <form>
              <input
                type="text"
                placeholder="Your Email Address"
                style={{
                  width: "100%",
                  height: "35px",
                  border: "1px solid rgba(0,0,0,0.2)",
                  outline: "none",
                  padding: "0 12px",
                  borderRadius: "4px",
                  marginBottom: "16px",
                  marginTop: "12px",
                  fontSize: "13px",
                }}
              />
              <Button
                variant="contained"
                style={{
                  backgroundColor: "#ef7921",
                  color: "#fff",
                  fontSize: "13px",
                  padding: "6px 16px",
                  borderRadius: "4px",
                  marginBottom: "12px",
                }}
              >
                SUBSCRIBE
              </Button>
              <FormControlLabel
                control={<Checkbox defaultChecked />}
                label="I agree to the terms and conditions and the privacy policy"
                style={{ fontSize: "12px" }}
              />
            </form>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

















// import React from 'react'
// import { FaShippingFast } from "react-icons/fa";
// import { PiKeyReturn } from "react-icons/pi";
// import { IoWalletOutline } from "react-icons/io5";
// import { CiGift } from "react-icons/ci";
// import { BiSupport } from "react-icons/bi";
// import { Link } from 'react-router-dom';
// import { IoIosChatbubbles } from "react-icons/io";
// import Button from '@mui/material/Button';

// import FormGroup from '@mui/material/FormGroup';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import Checkbox from '@mui/material/Checkbox';




// const Footer = () => {
//   return (
//     <footer className='py-6 bg-white '>
//         <div className="container">
//             <div className="flex items-center justify-center gap-2 py-8 bg-gray-100">
//                 <div className="col flex items-center justify-center flex-col group w-[20%]">
//                     <FaShippingFast className='text-[40px] transition-all duration-300 group-hover:translate-y-1 group-hover:text-[#ef7921]'/>
//                     <h3 className='text-[16px] font-[500] mt-3'>Free Shipping</h3> 
//                     <p className='text-[12px] font-[400]'> for orders above $100</p>
//                 </div> 
//                 <div className="col flex items-center justify-center flex-col group w-[20%]">
//                     <PiKeyReturn className='text-[40px] transition-all duration-300 group-hover:translate-y-1 group-hover:text-[#ef7921]'/>
//                     <h3 className='text-[16px] font-[500] mt-3'>30 Days Returns</h3> 
//                     <p className='text-[12px] font-[400]'> For an Exchange Product</p>
//                 </div> 
//                 <div className="col flex items-center justify-center flex-col group w-[20%]">
//                     <IoWalletOutline className='text-[40px] transition-all duration-300 group-hover:translate-y-1 group-hover:text-[#ef7921]'/>
//                     <h3 className='text-[16px] font-[500] mt-3'>Secure Payment</h3> 
//                     <p className='text-[12px] font-[400]'> from anywhere in the world</p>
//                 </div> 
//                 <div className="col flex items-center justify-center flex-col group w-[20%]">
//                     <CiGift className='text-[40px] transition-all duration-300 group-hover:translate-y-1 group-hover:text-[#ef7921]'/>
//                     <h3 className='text-[16px] font-[500] mt-3'>Special gifts</h3> 
//                     <p className='text-[12px] font-[400]'> for orders above $100</p>
//                 </div> 
//                 <div className="col flex items-center justify-center flex-col group w-[20%]">
//                     <BiSupport className='text-[40px] transition-all duration-300 group-hover:translate-y-1 group-hover:text-[#ef7921]'/>
//                     <h3 className='text-[16px] font-[500] mt-3'>Free Shipping</h3> 
//                     <p className='text-[12px] font-[400]'> for orders above $100</p>
//                 </div> 
//             </div> 

             
//             <div className="footer flex py-8 pt-8">
//                 <div className="part1 w-[25%]">
//                     <h2 className='text-[18px] font-[500] mb-4'>Contact us</h2> 
//                     <p className='text-[13px] font-[400] pb-4'>Classyshop - Mega Super Store <br/>
//                         507-Union Trade Centre France
//                     </p> 
//                     <Link className='link text-[13px]' to='mailto:jubianmarket@gmail.com'>jubianmarket@gmail.com</Link> 
//                     <span className='text-[18px] font-[600] block w-full mt-3 mb-5 text-[#ef7921]'>+234906555555</span>
//                     <div className="flex items-center gap-2">
//                         <IoIosChatbubbles className='text-[30px] pl-5'/> 
//                         <span className='text-[20px]font-[500]'>Chat with support</span>
//                     </div>
//                 </div>

//                 <div className="part2 w-[40%] flex pl-8">
//                     <div className="par2_col1 w-[50%]">
//                         <h2 className='text-[18px] font-[500] mb-4'>Products</h2> 
//                         <ul className='list'>
//                             <li className='list-none text-[13px] w-full mb-2'><Link className='link' to='/'>Prices Drop</Link></li>
//                             <li className='list-none text-[13px] w-full mb-2'><Link className='link' to='/'>Prices Drop</Link></li> 
//                             <li className='list-none text-[13px] w-full mb-2'><Link className='link' to='/'>Prices Drop</Link></li>
//                             <li className='list-none text-[13px] w-full mb-2'><Link className='link' to='/'>Prices Drop</Link></li>
//                             <li className='list-none text-[13px] w-full mb-2'><Link className='link' to='/'>Prices Drop</Link></li>
                    
//                         </ul>
//                     </div>
//                     <div className="par2_col2 w-[50%]">
//                         <h2 className='text-[18px] font-[500] mb-4'>Products</h2> 
//                         <ul className='list'>
//                             <li className='list-none text-[13px] w-full mb-2'><Link className='link' to='/'>Prices Drop</Link></li>
//                             <li className='list-none text-[13px] w-full mb-2'><Link className='link' to='/'>Prices Drop</Link></li> 
//                             <li className='list-none text-[13px] w-full mb-2'><Link className='link' to='/'>Prices Drop</Link></li>
//                             <li className='list-none text-[13px] w-full mb-2'><Link className='link' to='/'>Prices Drop</Link></li>
//                             <li className='list-none text-[13px] w-full mb-2'><Link className='link' to='/'>Prices Drop</Link></li>
                    
//                         </ul>
//                     </div>
                    
//                 </div> 

//                 <div className="part2 w-[35%] flex pl-8 flex-col pr-8">
//                     <h2 className='text-[18px] font-[500] mb-4'>Subscribe to Newsletter</h2> 
//                     <p className='text-[13px]'>Subscribe to our latest newsletter to get news about special discounts.</p>

//                     <form className='mt-5'>
//                         <input type='text' className='w-full h-[35px] border outline-none pl-4 pr-4 rounded-sm mb-4 mt-4 focus:border-[rgba(0,0,0,0.3)]' placeholder='Your Email Address'/>
//                         <Button className='btn-org'>SUBSCRIBE</Button>
//                         <FormControlLabel control={<Checkbox defaultChecked />} label="I agree to the terms and conditions and the privacy policy" />
//                     </form>
//                 </div>
//             </div>
//         </div>
//     </footer>
//   ) 
// }
 
// export default Footer 