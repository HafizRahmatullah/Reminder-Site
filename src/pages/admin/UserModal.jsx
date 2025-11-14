import React, { useState, useEffect } from 'react';

// --- Icon Definitions (Inline SVGs) ---
const SvgIcon = ({ children, className = "w-5 h-5", size = "20", color = "currentColor", fill = "none", viewBox = "0 0 24 24" }) => (
    <svg className={className} width={size} height={size} viewBox={viewBox} fill={fill} stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
        {children}
    </svg>
);
const FaTimes = (props) => (
    <SvgIcon {...props}><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></SvgIcon>
);

const roleOptions = ['Admin', 'CEO', 'HR', 'CTO'];

const UserModal = ({ mode, userData, onClose, onCreate, onUpdate }) => { 
  const isEditMode = mode === 'edit';
  const [formState, setFormState] = useState({
    username: '', email: '', password: '', role: 'HR', activeStatus: true,
  });

  useEffect(() => {
    if (isEditMode && userData) {
      setFormState({
        username: userData.name || '',
        email: userData.email || '',
        password: '',
        role: userData.role || 'HR',
        activeStatus: userData.status === 'Active',
      });
    } else {
      setFormState({ 
        username: '', email: '', password: '', role: 'HR', activeStatus: true 
      });
    }
  }, [isEditMode, userData]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormState(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditMode) {
      onUpdate({ ...formState, id: userData.id }); 
    } else {
      onCreate(formState); 
    }
  };

  // Custom Tailwind Toggle Switch Component
  const ToggleSwitch = ({ name, checked, onChange }) => (
    <label className="relative inline-flex items-center cursor-pointer">
      <input type="checkbox" name={name} checked={checked} onChange={onChange} className="sr-only peer" />
      <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
    </label>
  );

  return (
    // Backdrop
    <div className="fixed inset-0 bg-black bg-opacity-50 z-40 flex items-center justify-center p-4"> 
      {/* Modal Content */}
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
        <header className="flex justify-between items-center mb-2">
          <h3 className="text-xl font-bold text-gray-800">
            {isEditMode ? 'Edit User' : 'Create New User'}
          </h3>
          <button className="p-1 text-gray-400 hover:text-gray-700 rounded-full" onClick={onClose}>
            <FaTimes size="20" />
          </button>
        </header>

        <p className="text-sm text-gray-500 mb-6">
            {isEditMode ? 'Update user information' : 'Add a new user to the system'}
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
            <input 
              type="text" name="username" value={formState.username} onChange={handleChange} 
              required placeholder="e.g., Jane Doe"
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input 
              type="email" name="email" value={formState.email} onChange={handleChange}
              required placeholder="jane.doe@company.com"
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          
          {!isEditMode && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                <input 
                  type="password" name="password" value={formState.password} onChange={handleChange}
                  required placeholder="Enter password"
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
            <select 
              name="role" value={formState.role} onChange={handleChange} required
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 bg-white"
            >
              {roleOptions.map(role => <option key={role} value={role}>{role}</option>)}
            </select>
          </div>

          {/* Active Status Toggle */}
          <div className="flex items-center justify-between pt-2">
            <span className="text-sm font-medium text-gray-700">Active Status</span>
            <ToggleSwitch name="activeStatus" checked={formState.activeStatus} onChange={handleChange} />
          </div>

          {/* Modal Actions */}
          <div className="flex justify-end gap-4 pt-4 border-t border-gray-200 mt-6">
            <button type="button" 
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200" 
              onClick={onClose}>
              Cancel
            </button>
            <button type="submit" 
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700">
              {isEditMode ? 'Update User' : 'Create User'} 
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserModal;