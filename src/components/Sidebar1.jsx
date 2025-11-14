
import React from "react";



// --- Icon Definitions (Inline SVGs) ---
const SvgIcon = ({ children, className = "w-5 h-5", size = "20", color = "currentColor", fill = "none", viewBox = "0 0 24 24" }) => (
    <svg className={className} width={size} height={size} viewBox={viewBox} fill={fill} stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
        {children}
    </svg>
);

const FaTh = (props) => (
    <SvgIcon {...props}><rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" /></SvgIcon>
);
const FaChartBar = (props) => (
    <SvgIcon {...props}><line x1="12" y1="20" x2="12" y2="10" /><line x1="18" y1="20" x2="18" y2="4" /><line x1="6" y1="20" x2="6" y2="16" /><line x1="3" y1="20" x2="21" y2="20" /></SvgIcon>
);
const FaUsers = (props) => (
    <SvgIcon {...props}><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M12 3a4 4 0 1 1 0 8 4 4 0 0 1 0-8ZM20 21v-2a4 4 0 0 0-3-3.87M20 3a3 3 0 1 1 0 6 3 3 0 0 1 0-6Z" /></SvgIcon>
);
const FaSignOutAlt = (props) => (
    <SvgIcon {...props}><path d="M10 12H20M20 12L17 15M20 12L17 9M10 4H4C2.9 4 2 4.9 2 6V18C2 19.1 2.9 20 4 20H10" /></SvgIcon>
);

// --- Sidebar ---
// Note: This component assumes 'activeView' and 'setActiveView' 
// props are passed from a parent (like your main App.js)
function Sidebar1({ activeView, setActiveView }) {
    
    const navItems = [
        { name: "Dashboard", key: "dashboard", Icon: FaChartBar },
        { name: "Users", key: "users", Icon: FaUsers },
    ];

    return (
<div className="w-64 min-h-screen bg-gray-900 text-white flex flex-col shadow-xl flex-shrink-0">
            {/* --- Top Section (Logo) --- */}
            <div className="flex items-center gap-3 px-6 py-5 border-b border-gray-700/50">
                <FaTh className="text-2xl text-blue-400" size="24" color="#93c5fd" />
                <div>
                    <h1 className="font-bold text-lg">Admin</h1>
                    <p className="text-xs text-gray-400">Admin Dashboard</p>
                </div>
            </div>

            {/* --- Navigation --- */}
            <nav className="flex-1 mt-4 space-y-1">
                {navItems.map((item) => (
                    <button
                        key={item.key}
                        onClick={() => setActiveView(item.key)}
                        className={`w-full flex items-center gap-3 px-6 py-3 text-left transition-all duration-200 focus:outline-none ${
                            activeView === item.key
                                ? "bg-blue-600 text-white border-l-4 border-blue-700"
                                : "text-gray-300 hover:bg-gray-800/70 hover:text-white"
                        }`}
                        style={{ borderRadius: '0 8px 8px 0' }}
                    >
                        <item.Icon className="text-lg" size="18" color="currentColor" />
                        <span className="text-sm font-medium">{item.name}</span>
                    </button>
                ))}
            </nav>

            {/* --- Bottom Section (Logout) --- */}
            <div className="border-t border-gray-700/50 mt-auto">
                <button
                    className="w-full flex items-center gap-3 px-6 py-4 text-gray-300 hover:bg-gray-800/70 hover:text-white transition-all duration-200 focus:outline-none"
                    onClick={() => console.log("Logging out...")}
                >
                    <FaSignOutAlt className="text-lg" size="18" />
                    <span className="text-sm font-medium">Logout</span>
                </button>
            </div>
        </div>
    );
}

export default Sidebar1;