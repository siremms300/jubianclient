import React from 'react';
import '../Search/style.css';
import Button from '@mui/material/Button';
import { IoSearch } from "react-icons/io5";

const Search = () => {
  return (
    <div
      style={{
        width: '100%',
        height: '40px',                 // fixed height so everything lines up
        background: '#e5e5e5',
        borderRadius: '5px',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        padding: '0 8px'                // inner horizontal spacing
      }}
    >
      <input
        type="text"
        placeholder="Search for products..."
        style={{
          flex: 1,
          height: '100%',
          border: 'none',
          outline: 'none',
          background: 'transparent',
          paddingLeft: '10px',
          paddingRight: '52px',          // leave room for the button
          fontSize: '15px'
        }}
      />

      <Button
        aria-label="search"
        sx={{
          position: 'absolute',
          right: 8,
          width: 36,
          minWidth: 36,
          height: 36,
          borderRadius: '50%',
          padding: 0,
          boxShadow: 'none'              // keeps it flat like your design
        }}
      >
        <IoSearch style={{ fontSize: 18 }} />
      </Button>
    </div>
  );
};

export default Search;














// import React from 'react';
// import '../Search/style.css';
// import Button from '@mui/material/Button';
// import { IoSearch } from "react-icons/io5";

// const Search = () => {
//     return (
//         <div className='searchBox w-[100%] h-[35px] bg-[#e5e5e5] rounded-[5px] relative p-2'>
//             <input 
//                 type='text' 
//                 placeholder='Search for products...' 
//                 className='w-full h-[35px] focus:outline-none bg-inherit pl-4 pr-12 text-[15px]'
//             />
//             <Button 
//                 className="!absolute top-[8px] right-[5px] z-50 !w-[37px] !min-w-[37px] h-[25px] !rounded-full"
//             >
//                 <IoSearch className="text-lg" />
//             </Button>
//         </div>
//     );
// }

// export default Search;




