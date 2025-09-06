import React from 'react'
import { useState } from 'react';
import Sidebar from '../../components/Sidebar'
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import ProductItem from '../../components/ProductItem'
import ProductItemListView from '../../components/ProductItemListView';
import Button from '@mui/material/Button';
import { IoGrid } from "react-icons/io5";
import { GiHamburgerMenu } from "react-icons/gi";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

import Pagination from '@mui/material/Pagination'; 









const ProductListing = () => {

  const [itemView, setItemView] = useState('grid')
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
 

  return (
    <section style={{ padding: "2rem 0" }}> {/* py-8 */}
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}> {/* container */}
        
        {/* Breadcrumb */}
        <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 2 }}>
          <Link 
            underline="hover" 
            color="inherit" 
            href="/"
            sx={{ fontSize: "14px", textDecoration: "none" }}
          >
            Home
          </Link>

          <Link
            underline="hover"
            color="inherit"
            href="/"
            sx={{ fontSize: "14px", textDecoration: "none" }}
          >
            Fashion
          </Link> 
        </Breadcrumbs>

      </div>

      <div style={{ background: "#fff", padding: "0.5rem" }}> {/* bg-white p-2 */}
        <div style={{ display: "flex", gap: "1rem", maxWidth: "1200px", margin: "0 auto" }}> 
          
          {/* Sidebar */}
          <div style={{ width: "20%", background: "#fff" }}>
            <Sidebar />
          </div>

          {/* Right content */}
          <div style={{ width: "80%", padding: "1rem 0" }}>

            {/* Top controls */}
            <div style={{ 
              background: "#f1f1f1", 
              padding: "0.5rem", 
              width: "100%", 
              marginBottom: "0.75rem", 
              borderRadius: "6px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between"
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                <Button 
                  sx={{ 
                    minWidth: "40px", 
                    width: "40px", 
                    height: "40px", 
                    borderRadius: "50%", 
                    color: itemView === "list" ? "#ef7921" : "#000" 
                  }}
                  onClick={() => setItemView('list')}
                >
                  <GiHamburgerMenu style={{ fontSize: "18px", color: itemView === "list" ? "#ef7921" : "rgba(0,0,0,0.7)" }} />
                </Button>

                <Button 
                  sx={{ 
                    minWidth: "40px", 
                    width: "40px", 
                    height: "40px", 
                    borderRadius: "50%", 
                    color: itemView === "grid" ? "#ef7921" : "#000" 
                  }}
                  onClick={() => setItemView('grid')}
                >
                  <IoGrid style={{ fontSize: "18px", color: itemView === "grid" ? "#ef7921" : "rgba(0,0,0,0.7)" }} />
                </Button>



                <span style={{ fontSize: "14px", fontWeight: 500, paddingLeft: "0.75rem", color: "rgba(0,0,0,0.7)" }}>
                  There are 18 products
                </span>
              </div>

              <div className="col2 ml-auto flex items-center justify-end">
                 <span style={{ fontSize: "14px", fontWeight: 500, paddingLeft: "0.75rem", color: "rgba(0,0,0,0.7)" }}>
                  Sort By:

                  <Button
                    id="basic-button"
                    aria-controls={open ? 'basic-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    onClick={handleClick}
                    className='!bg-[#ef7921] !text-[12px] !text-[#f1f1f1] !capitalize !border-2 !border-[#fff]'

                  >
                    Sales, highest to lowest 
                  </Button>
                  
                  <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    slotProps={{
                      list: {
                        'aria-labelledby': 'basic-button',
                      },
                    }}
                    
                  >
                    <MenuItem onClick={handleClose} className='!text-[12px]'>Sales, highest to lowest</MenuItem>
                    <MenuItem onClick={handleClose} className='!text-[12px]'>Relevance</MenuItem>
                    <MenuItem onClick={handleClose} className='!text-[12px]'>Name, A-Z </MenuItem>
                    <MenuItem onClick={handleClose} className='!text-[12px]'>Name, Z-A </MenuItem>
                    <MenuItem onClick={handleClose} className='!text-[12px]'>Price, low-high </MenuItem>
                    <MenuItem onClick={handleClose} className='!text-[12px]'>Price, high-low </MenuItem>
                  </Menu>
                </span>
              </div>
            </div>

            {/* Products grid */}
            {/* <div style={{ 
              display: "grid", 
              gridTemplateColumns: "repeat(4, 1fr)", 
              gap: "0.75rem" 
            }}> */}

            <div
              style={{
                display: "grid",
                gridTemplateColumns: itemView === "grid" ? "repeat(4, 1fr)" : "repeat(1, 1fr)",
                gap: "1rem" // Tailwind's gap-4 = 16px = 1rem
              }}
            >

              {
                itemView === 'grid' ? 
                <>
                  <ProductItem />
                  <ProductItem />
                  <ProductItem />
                  <ProductItem />
                  <ProductItem />
                  <ProductItem />
                  <ProductItem />
                  <ProductItem />
                  <ProductItem />
                  <ProductItem />
                </>

                :

                <>
                  <ProductItemListView />
                  <ProductItemListView />
                  <ProductItemListView />
                  <ProductItemListView />
                  <ProductItemListView />
                  <ProductItemListView />
                  <ProductItemListView />
                  <ProductItemListView />
                  <ProductItemListView />
                  <ProductItemListView />
                  <ProductItemListView />
                  <ProductItemListView />
                  <ProductItemListView />
                  <ProductItemListView />
                  <ProductItemListView />
                  <ProductItemListView />
                </>
              } 

              </div>


              <div className="flex items-center justify-center " style={{marginTop: '20px'}}>
                <Pagination count={10} showFirstButton showLastButton/>
              </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ProductListing











// import React from 'react'
// import Sidebar from '../../components/Sidebar'
// import Typography from '@mui/material/Typography';
// import Breadcrumbs from '@mui/material/Breadcrumbs';
// import Link from '@mui/material/Link';
// import ProductItem from '../../components/ProductItem'
// import Button from '@mui/material/Button';
// import { IoGrid } from "react-icons/io5";
// import { GiHamburgerMenu } from "react-icons/gi";



// function handleClick(event) {
//   event.preventDefault();
//   console.info('You clicked a breadcrumb.');
// }



// const ProductListing = () => {
//   return (
//     <section className='py-8'>
//       <div className="container">
//         <Breadcrumbs aria-label="breadcrumb">
//             <Link 
//               underline="hover" 
//               color="inherit" 
//               href="/"
//               className='link transition'
//             >
//               Home
//             </Link>

//             <Link
//               underline="hover"
//               color="inherit"
//               href="/"
//               className='link transition'
//             >
//               Fashion
//             </Link> 
//         </Breadcrumbs>
//       </div>
//       <div className="bg-white p-2">
//         <div className="container flex gap-3"> 
//         <div className="sidebarWrapper w-[20%] h-full bg-white">
//           <Sidebar />
//         </div>

//         <div className="rightContent w-[80%] py-3">

//           <div className="bg-[#f1f1f1] p-2 w-full mb-3 rounded-md flex items-center justify-between">
//             <div className="col1 flex items-center gap-3">
//               <Button className='!w-[40px] !h-[40px] !min-w-[40px] !rounded-full !text-[#000]'>
//                 <GiHamburgerMenu className='text-[rgba(0,0,0,0.7)]'/>
//               </Button>
//               <Button className='!w-[40px] !h-[40px] !min-w-[40px] !rounded-full !text-[#000]'>
//                 <IoGrid className='text-[rgba(0,0,0,0.7)]'/>
//               </Button>

//               <span className="text-[14px] font-[500] pl-3 text-[rgba(0,0,0,0.7)]">
//                 There are 18 products 
//               </span>
//             </div>
//           </div>

//           <div className="grid grid-cols-4 md:grid-cols-4 gap-3">
//             <ProductItem />
//             <ProductItem />
//             <ProductItem />
//             <ProductItem />
//             <ProductItem />
//             <ProductItem />
//             <ProductItem />
//             <ProductItem />
//             <ProductItem />
//             <ProductItem />
//           </div>
//         </div>
//       </div>
//       </div>
//     </section>
//   )
// }

// export default ProductListing