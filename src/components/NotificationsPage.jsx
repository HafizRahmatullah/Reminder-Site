import React, { useState } from 'react';

const allNotifications = [
  { id: 1, type: 'Approved', sender: 'Johan Doe', subject: "'Q3 Performance Review'", time: '5m ago', category: 'TODAY', status: 'Unread' },
  { id: 2, type: 'Reminder Due', sender: 'System', subject: "'Submit Timesheet'", time: '2h ago', category: 'TODAY', status: 'Due' },
  { id: 3, type: 'Approved', sender: 'Johan Doe', subject: "'Q3 Performance Review'", time: '1d ago', category: 'YESTERDAY', status: 'Read' },
  { id: 4, type: 'Reminder Due', sender: 'System', subject: "'Submit Timesheet'", time: '2d ago', category: 'YESTERDAY', status: 'Due' },
  { id: 5, type: 'New Task', sender: 'Alice', subject: "'Review Documentation'", time: '3d ago', category: 'YESTERDAY', status: 'Read' },
];

const NotificationItem = ({ notification }) => {
  const getInitials = (name) => {
    if (name === 'System') return 'SY';
    const parts = name.split(' ');
    return parts.length > 1
      ? (parts[0][0] + parts[1][0]).toUpperCase()
      : name[0].toUpperCase();
  };

  const getIconColor = (type) => {
    if (type === 'Approved') return 'bg-green-500';
    if (type === 'Reminder Due') return 'bg-red-500';
    return 'bg-blue-500';
  };

  return (
    <div className="flex items-start p-4 bg-white hover:bg-gray-50 transition duration-150 border-b border-gray-100 last:border-b-0">
      <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold text-white ${getIconColor(notification.type)} mr-4 mt-1`}>
        {getInitials(notification.sender)}
      </div>

      <div className="flex-grow">
        <p className="text-gray-900">
          <strong>{notification.sender}</strong> {notification.subject}
        </p>
        <p className="text-xs text-gray-400 mt-1">{notification.time}</p>
      </div>

      {notification.status === 'Unread' && (
        <span className="w-2 h-2 bg-blue-500 rounded-full self-start mt-3 ml-2" title="Unread"></span>
      )}
    </div>
  );
};

export default function NotificationsPage() {
  const [activeTab, setActiveTab] = useState('All');
  const tabs = ['All', 'Unread', 'Due'];

  const filteredNotifications = allNotifications.filter((notif) => {
    if (activeTab === 'All') return true;
    if (activeTab === 'Unread') return notif.status === 'Unread';
    if (activeTab === 'Due') return notif.status === 'Due';
    return true;
  });

  const notificationsByDay = filteredNotifications.reduce((acc, notif) => {
    acc[notif.category] = acc[notif.category] || [];
    acc[notif.category].push(notif);
    return acc;
  }, {});

  return (
    <div className="min-h-screen bg-gray-50 p-8 sm:ml-64">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Notifications</h1>

      {/* Tabs */}
      <div className="flex space-x-6 border-b border-gray-200 mb-8">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-3 text-base font-medium transition-colors duration-150 ease-in-out ${
              activeTab === tab
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Notification List */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        {Object.keys(notificationsByDay).map((category) => (
          <div key={category}>
            <h2 className="px-4 py-3 text-sm font-semibold text-gray-500 uppercase bg-gray-100 border-t border-gray-200">
              {category}
            </h2>
            {notificationsByDay[category].map((notif) => (
              <NotificationItem key={notif.id} notification={notif} />
            ))}
          </div>
        ))}
      </div>

      {Object.keys(notificationsByDay).length === 0 && (
        <div className="text-center p-10 bg-white rounded-lg shadow-md text-gray-500">
          No notifications match the filter criteria.
        </div>
      )}
    </div>
  );
}
