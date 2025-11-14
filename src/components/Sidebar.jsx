import React from 'react';

// Mock icons (can replace with Heroicons or Lucide later)
const icons = {
  reminders: '🔔',
  calendar: '🗓️',
  history: '⌚',
  setting: '⚙️',
  logout: '➡️',
};

// Sidebar navigation items
const navItems = [
  { name: 'Dashboard', key: 'dashboard', icon: icons.reminders }, // aligns with AppLayout2 default
  { name: 'Sent Reminders', key: 'sent_reminders', icon: icons.reminders },
  { name: 'Calendar', key: 'calendar', icon: icons.calendar },
  { name: 'History', key: 'history', icon: icons.history },
  { name: 'Settings', key: 'settings', icon: icons.setting }, // match activeView key
];

function Sidebar({ activeView, setActiveView }) {
  return (
    <aside className="fixed flex flex-col w-64 h-screen bg-slate-900 text-gray-50 shadow-xl p-4">
      
      {/* Header */}
      <div className="flex items-center p-4 mb-4 border-b border-slate-700">
        <div className="text-xl mr-2 text-blue-500">🔳</div>
        <span className="text-base font-semibold whitespace-nowrap">CTO Dashboard</span>
      </div>

      {/* Navigation */}
      <nav className="flex-grow">
        <ul>
          {navItems.map((item) => (
            <li key={item.key}>
              <button
                type="button"
                className={`w-full flex items-center p-3 rounded-lg text-gray-300 transition-colors duration-200
                  ${activeView === item.key 
                    ? 'bg-blue-600 text-white font-semibold border-l-4 border-white' 
                    : 'hover:bg-slate-700 hover:text-white'
                  }`}
                onClick={() => setActiveView(item.key)}
              >
                <span className="text-xl mr-4">{item.icon}</span>
                {item.name}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* Footer: Logout */}
      <div className="pt-4 border-t border-slate-700">
        <a
          href="/logout"
          className="flex items-center p-3 text-gray-300 hover:bg-slate-700 hover:text-white rounded-lg transition-colors duration-200"
        >
          <span className="text-xl mr-4">{icons.logout}</span>
          Logout
        </a>
      </div>
    </aside>
  );
}

export default Sidebar;
