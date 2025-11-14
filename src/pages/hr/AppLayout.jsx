import React, { useState } from 'react';
import Sidebar from '../../components/Sidebar';
import Header from '../../components/Header';
import HRDashboard from './HRDashboard';
import RemindersHistoryPage from './RemindersHistoryPage';
import SentRemindersPage from './SentRemindersPag';
import NotificationsPage from '../../components/NotificationsPage';
import Calander from '../../components/Calander';


function AppLayout() {
  const [activeView, setActiveView] = useState('reminders');

  const renderContent = () => {
    switch (activeView) {
      case 'reminders':
        return <HRDashboard />;
      case 'sent_reminders':
        return <SentRemindersPage />;
      case 'calendar':
        return <Calander/>;
      case 'history':
        return <RemindersHistoryPage />;
      case 'notifications': // ✅ Added
        return <NotificationsPage />;
      case 'setting':
        return <h2 className="p-8 text-2xl font-semibold">⚙️ Settings Page</h2>;
      default:
        return <HRDashboard />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* ✅ Header always on top */}
      <Header setActiveView={setActiveView} />

      {/* ✅ Sidebar + Main Area */}
      <div className="flex flex-grow">
        {/* Sidebar (except special views) */}
        {activeView !== 'dashboard' && activeView !== 'users' && (
          <Sidebar activeView={activeView} setActiveView={setActiveView} />
        )}

        {/* ✅ Main Page Area */}
        <main className="flex-grow ml-64 p-6 mt-[64px] bg-gray-50">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}

export default AppLayout;
