import React, { useState } from 'react';
import {
  CalendarIcon,
  ClockIcon,
  UsersIcon,
  ExclamationTriangleIcon
} from '@heroicons/react/24/outline';
import Sidebar from '../../components/Sidebar';
import Header from '../../components/Header';
import CreateReminderModal from '../../components/CreateReminderModal';
import RemindersHistoryPage from '../hr/RemindersHistoryPage';
import NotificationsPage from '../../components/NotificationsPage';
import Calander from '../../components/Calander';

// --- Dummy Data ---
const allReminders = [
  { id: 1, title: 'Review new hire contract', date: '10/27/2025, 12:00 PM', createdBy: 'CTO', status: 'Approved', type: 'My reminders' },
  { id: 2, title: 'Submit quarterly report', date: '10/28/2025, 10:00 AM', createdBy: 'CTO', status: 'Pending', type: 'Shared by me' },
  { id: 3, title: 'Approve marketing budget', date: '10/29/2025, 03:30 PM', createdBy: 'Jane Doe', status: 'Urgent', type: 'Shared with me' },
  { id: 4, title: 'Team sync meeting', date: '10/30/2025, 09:00 AM', createdBy: 'CTO', status: 'Approved', type: 'My reminders' },
];

// --- Stat Card Component ---
const StatCard = ({ title, count, icon: Icon, colorClass, iconBgClass }) => (
  <div className="flex items-center justify-between p-6 bg-white rounded-xl shadow-lg border border-gray-100">
    <div>
      <p className="text-3xl font-bold text-gray-900">{count}</p>
      <p className="text-sm font-medium text-gray-500 mt-1">{title}</p>
    </div>
    <div className={`p-3 rounded-full ${iconBgClass}`}>
      <Icon className={`h-6 w-6 ${colorClass}`} aria-hidden="true" />
    </div>
  </div>
);

// --- Reminder Item Component ---
const ReminderItem = ({ reminder }) => {
  const getStatusBadge = (status) => {
    switch (status) {
      case 'Approved': return <span className="text-green-600 font-medium ml-2">✓ Approved</span>;
      case 'Pending': return <span className="text-yellow-600 font-medium ml-2">● Pending</span>;
      case 'Urgent': return <span className="text-red-600 font-medium ml-2">! Urgent</span>;
      default: return null;
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-4 border border-gray-200">
      <div className="flex justify-between items-start">
        <h3 className="text-lg font-semibold text-gray-900">{reminder.title}</h3>
        {reminder.status === 'Urgent' && (
          <span className="inline-flex items-center px-3 py-1 text-xs font-semibold text-red-700 bg-red-100 rounded-full">
            ! Urgent
          </span>
        )}
      </div>
      <div className="mt-2 text-sm text-gray-600">
        <p className="flex items-center mb-1">
          <UsersIcon className="h-4 w-4 mr-2 text-gray-400" />
          Created by: {reminder.createdBy}
        </p>
        <p className="flex items-center">
          <CalendarIcon className="h-4 w-4 mr-2 text-gray-400" />
          {reminder.date}
        </p>
      </div>
      <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between items-center">
        {reminder.status === 'Approved' ? (
          <p className="text-green-600 font-medium flex items-center">
            <span className="text-lg mr-2">✅</span> Approved
          </p>
        ) : (
          <div className="flex space-x-3">
            {reminder.status === 'Pending' && (
              <>
                <button className="px-4 py-2 text-sm font-medium text-red-600 bg-red-50 border border-red-200 rounded-lg hover:bg-red-100 transition-colors">
                  ❌ Reject
                </button>
                <button className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 transition-colors">
                  ✅ Approve
                </button>
              </>
            )}
            <span className="text-gray-500 text-sm flex items-center">
              {getStatusBadge(reminder.status)}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

// --- Main Page ---
export default function MyRemindersPage() {
  const [activeView, setActiveView] = useState('reminders');
  const [activeTab, setActiveTab] = useState('My reminders');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredReminders = allReminders.filter(r => r.type === activeTab);
  const totalCount = allReminders.length;
  const urgentCount = allReminders.filter(r => r.status === 'Urgent').length;
  const pendingCount = allReminders.filter(r => r.status === 'Pending').length;
  const tabs = ['My reminders', 'Shared by me', 'Shared with me'];

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const renderContent = () => {
    switch (activeView) {
      case 'reminders':
        return (
          <>
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-3xl font-bold text-gray-900">My Reminders</h1>
              <button
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg shadow-md hover:bg-blue-700 transition-colors"
                onClick={openModal}
              >
                + New Reminder
              </button>
            </div>

            {/* Stat Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <StatCard title="Total" count={totalCount} icon={UsersIcon} colorClass="text-blue-500" iconBgClass="bg-blue-100" />
              <StatCard title="Urgent" count={urgentCount} icon={ExclamationTriangleIcon} colorClass="text-red-500" iconBgClass="bg-red-100" />
              <StatCard title="Pending" count={pendingCount} icon={ClockIcon} colorClass="text-orange-500" iconBgClass="bg-orange-100" />
            </div>

            {/* Tabs */}
            <div className="flex space-x-4 mb-6 border-b border-gray-200">
              {tabs.map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`pb-3 text-sm font-medium transition-colors duration-150 ease-in-out ${
                    activeTab === tab ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Reminders */}
            <div>
              {filteredReminders.length > 0 ? (
                filteredReminders.map(reminder => <ReminderItem key={reminder.id} reminder={reminder} />)
              ) : (
                <div className="text-center p-10 bg-white rounded-lg shadow-md text-gray-500">
                  No reminders found in this category.
                </div>
              )}
            </div>

            <CreateReminderModal isOpen={isModalOpen} onClose={closeModal} />
          </>
        );

      case 'history':
        return <RemindersHistoryPage />;
      case 'notifications':
        return <NotificationsPage />;
      case 'calendar':
        return <Calander />;
      default:
        return <h2 className="p-8 text-2xl font-semibold">Page Coming Soon</h2>;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar activeView={activeView} setActiveView={setActiveView} />
   
      <div className="flex-1 flex flex-col">
           
         <Header setActiveView={setActiveView} />
     
      
      {/* Main Content */}
      {/* <div className="flex-1 flex flex-col" style={{ marginLeft: '16rem' }}> */}
      
        <main className="flex-1 p-6">
        {renderContent()}</main>
      </div>
      </div>
    
  );
}
