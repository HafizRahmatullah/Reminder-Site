// src/components/SettingPage.jsx
import React from 'react';
import { UserCircleIcon } from '@heroicons/react/24/solid'




const SettingPage = () => {
  return (
    // This div represents the main content area
    <div className="flex flex-col flex-1 p-6">
      
      {/* Page Title */}
      <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
      <p className="text-sm text-gray-500 mt-1">Manage your account and preferences</p>

      {/* Settings Card Container */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 mt-6 max-w-lg">
        
        {/* User Info Section */}
        <div className="flex items-center space-x-4">
          
          {/* Icon */}
          <UserCircleIcon className="h-12 w-12 text-gray-400" />
          
          {/* User Details */}
          <div>
            <h2 className="text-lg font-semibold text-gray-800">CTO</h2>
            <p className="text-sm text-gray-500">ctoexample@gmail.com</p>
          </div>
          
        </div>

        {/* You could add more settings sections below */}
        {/* 
        <div className="border-t border-gray-200 mt-6 pt-6">
          <h3 className="text-lg font-medium text-gray-800">Preferences</h3>
          ...
        </div> 
        */}

      </div>
    </div>
  );
};

export default SettingPage;