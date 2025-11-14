
import React from "react";


// --- SVG Icon Wrapper ---
const SvgIcon = ({
  children,
  className = "w-5 h-5",
  size = "20",
  color = "currentColor",
  fill = "none",
  viewBox = "0 0 24 24",
}) => (
  <svg
    className={className}
    width={size}
    height={size}
    viewBox={viewBox}
    fill={fill}
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    xmlns="http://www.w3.org/2000/svg"
  >
    {children}
  </svg>
);

const FaSearch = (props) => (
  <SvgIcon {...props}>
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </SvgIcon>
);

const FaBell = (props) => (
  <SvgIcon {...props}>
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
    <path d="M13.73 21a2 2 0 0 1-3.46 0" />
  </SvgIcon>
);

const Header = ({ setActiveView }) => {
  return (
<header className="flex items-center justify-end p-4 bg-white border-b border-gray-200 shadow-sm sticky top-0 z-10" >
      {/* 🔍 Search Bar */}
      <div className="flex items-center relative w-full max-w-sm">
        <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm" size="14" />
        <input
          type="text"
          placeholder="Search by name or email"
          className="w-full py-2.5 pl-12 pr-4 text-sm text-gray-700 placeholder-gray-500 bg-gray-100 border-none rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* 🔔 Notification + Avatar */}
      <div className="flex items-center space-x-3 ml-6">
        <div
          className="relative p-2 text-gray-600 cursor-pointer hover:text-blue-600 transition duration-150 rounded-full hover:bg-gray-100"
          onClick={() => setActiveView('notifications')}
        >
          <FaBell className="text-xl" size="20" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
        </div>

    
      </div>
    </header>
  );
};

export default Header;
