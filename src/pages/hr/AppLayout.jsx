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
    <div className="flex min-h-screen bg-gray-100">
      {/* ✅ Header always on top */}
    

      {/* ✅ Sidebar + Main Area */}
            {activeView !== 'dashboard' && activeView !== 'users' && (
          <Sidebar activeView={activeView} setActiveView={setActiveView} />
        )}
        
      <div className="flex-1 flex flex-col">
        {/* Sidebar (except special views) */}
          <Header setActiveView={setActiveView} />
       
       

        {/* ✅ Main Page Area */}
        <main className="flex-1 p-6">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}

export default AppLayout;
