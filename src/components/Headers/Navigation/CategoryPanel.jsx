import React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import { IoCloseOutline } from "react-icons/io5";
import CategoryCollapse from '../../CategoryCollapse';

const CategoryPanel = ({ isOpenCategoryPanel, setIsOpenCategoryPanel }) => { 
  const toggleDrawer = (newOpen) => () => { 
    setIsOpenCategoryPanel(newOpen);
  };

  return (
    <Drawer 
      open={isOpenCategoryPanel} 
      onClose={toggleDrawer(false)}
      anchor="left"
    >  
      <Box
        sx={{
          width: 300,
          display: "flex",
          flexDirection: "column",
          height: "100%",
          bgcolor: "#fff",
        }}
      > 
        {/* Header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "12px 16px",
            borderBottom: "1px solid #e5e5e5",
          }}
        >
          <h3 style={{ fontSize: "18px", fontWeight: 500, margin: 0 }}>
            Shop by Category
          </h3>
          <IoCloseOutline  
            onClick={toggleDrawer(false)} 
            style={{
              fontSize: "22px",
              cursor: "pointer",
              color: "#333",
              transition: "color 0.2s ease-in-out",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "red")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#333")}
          /> 
        </div>

        {/* Categories */}
        <div style={{ padding: "12px 16px", overflowY: "auto", flex: 1 }}>
          <CategoryCollapse />
        </div>
      </Box>
    </Drawer>
  );
}

export default CategoryPanel;











// import React from 'react';
// import Box from '@mui/material/Box';
// import Drawer from '@mui/material/Drawer';
// import { IoCloseOutline } from "react-icons/io5";
// import CategoryCollapse from '../../CategoryCollapse';

// const CategoryPanel = ({ isOpenCategoryPanel, setIsOpenCategoryPanel }) => { 
//   const toggleDrawer = (newOpen) => () => { 
//     setIsOpenCategoryPanel(newOpen);
//   };

//   return (
//     <Drawer 
//       open={isOpenCategoryPanel} 
//       onClose={toggleDrawer(false)}
//       anchor="left"
//     >  
//       <Box sx={{ width: 300 }} className="categoryPanel"> 
//         {/* Header */}
//         <div className="flex items-center justify-between p-3 border-b">
//           <h3 style={{ fontSize: "18px", fontWeight: 500, margin: 0 }}>
//             Shop by Category
//           </h3>
//           <IoCloseOutline  
//             onClick={toggleDrawer(false)} 
//             className="cursor-pointer text-[20px] hover:text-red-500"
//           /> 
//         </div>

//         {/* Categories */}
//         <CategoryCollapse />
//       </Box>
//     </Drawer>
//   );
// }

// export default CategoryPanel;














// import React from 'react';
// import Box from '@mui/material/Box';
// import Drawer from '@mui/material/Drawer';
// import { IoCloseOutline } from "react-icons/io5";
// import CategoryCollapse from '../../CategoryCollapse';

// const CategoryPanel = (props) => { 
//   const toggleDrawer = (newOpen) => () => { 
//     props.setIsOpenCategoryPanel(newOpen);
//   };

//   const DrawerList = (
//     <Box sx={{ width: 300 }} className='categoryPanel'> 
//       <h3 className='p-3 text-[18px] font-[500] flex items-center justify-between border-b'>
//         Shop by Categories 
//         <IoCloseOutline  
//           onClick={toggleDrawer(false)} 
//           className='cursor-pointer text-[20px] hover:text-red-500'
//         /> 
//       </h3>
 
//       <CategoryCollapse />
//     </Box>
//   );

  
//   return (
//     <Drawer 
//       open={props.isOpenCategoryPanel} 
//       onClose={toggleDrawer(false)}
//       anchor="left"
//     >  
//       {DrawerList}
//     </Drawer>
//   );
// }

// export default CategoryPanel;













// import React from "react";
// import {
//   Accordion,
//   AccordionSummary,
//   AccordionDetails,
// } from "@mui/material";
// import { IoAdd, IoRemove } from "react-icons/io5";

// const CategoryCollapse = ({ className }) => {
//   return (
//     <div className={className}>
//       <Accordion>
//         <AccordionSummary
//           expandIcon={
//             <div className="pr-3">
//               {/* Add padding to right of expand icons */}
//               <IoAdd className="text-[18px]" />
//             </div>
//           }
//         >
//           Category 1
//         </AccordionSummary>
//         <AccordionDetails>
//           Sub-category 1
//         </AccordionDetails>
//       </Accordion>

//       <Accordion>
//         <AccordionSummary
//           expandIcon={
//             <div className="pr-3">
//               <IoRemove className="text-[18px]" />
//             </div>
//           }
//         >
//           Category 2
//         </AccordionSummary>
//         <AccordionDetails>
//           Sub-category 2
//         </AccordionDetails>
//       </Accordion>
//     </div>
//   );
// };

// export default CategoryCollapse;
