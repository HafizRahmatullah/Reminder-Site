import React, { useState, useMemo } from "react";
import { ChevronLeft, ChevronRight, User, Clock, Hourglass, Star, Calendar, Check } from "lucide-react";
import CreateReminderModal from "../../components/CreateReminderModal";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import Calander from "../../components/Calander";
// import HistoryPage from "./Historypage";
import SettingPage from "./SettingPage";

// --- Stat Card ---
const StatCard = ({ total, label, IconComponent, bgColor, textColor }) => (
  <div className="bg-white p-4 rounded-lg shadow-sm flex justify-between items-center border border-gray-100 w-full">
    <div>
      <div className="text-2xl font-bold text-gray-800">{total}</div>
      <div className="text-sm text-gray-500 mt-1">{label}</div>
    </div>
    <div className={`p-3 rounded-full ${bgColor} ${textColor}`}>
      <IconComponent className="w-6 h-6" />
    </div>
  </div>
);

// --- Calendar Section ---
const CalendarSection = ({ month, year, selectedDay, setSelectedDay }) => {
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const daysInMonth = 31;
  const startDayOffset = 3;

  return (
    <div className="bg-white p-3 rounded-lg shadow-sm border border-gray-100 w-full max-w-[250px]">
      <div className="flex justify-between items-center mb-2 text-gray-700">
        <h3 className="font-semibold text-sm">
          {month} {year}
        </h3>
        <div className="flex space-x-1">
          <button className="p-1 rounded-full hover:bg-gray-100">
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button className="p-1 rounded-full hover:bg-gray-100">
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
      <div className="grid grid-cols-7 gap-1 text-[11px] text-center">
        {daysOfWeek.map((day) => (
          <div key={day} className="font-medium text-gray-500">
            {day}
          </div>
        ))}
        {Array.from({ length: startDayOffset }).map((_, i) => (
          <div key={`offset-${i}`} />
        ))}
        {Array.from({ length: daysInMonth }, (_, i) => i + 1).map((day) => (
          <div
            key={day}
            onClick={() => setSelectedDay(day)}
            className={`p-1.5 rounded-full cursor-pointer transition-colors ${
              day === selectedDay
                ? "bg-blue-600 text-white font-bold shadow-sm"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            {day}
          </div>
        ))}
      </div>
    </div>
  );
};

// --- Reminder Card ---
const ReminderCard = ({ reminder, onUpdateStatus }) => {
  const showActions = reminder.status === "Pending";
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 mb-3 transition-shadow hover:shadow-md text-sm w-full max-w-xs">
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-base font-semibold text-gray-800">{reminder.title}</h3>
        <div className="flex items-center space-x-1">
          {reminder.isUrgent && (
            <span className="text-[10px] font-bold text-red-600 border border-red-300 px-2 py-0.5 rounded-full bg-red-50">
              ! Urgent
            </span>
          )}
          <Star className="w-4 h-4 text-gray-400 cursor-pointer hover:text-yellow-500 transition-colors" />
        </div>
      </div>
      <div className="flex flex-col space-y-0.5 text-gray-500">
        <p className="flex items-center">
          <User className="w-3.5 h-3.5 mr-1 text-gray-400" /> Created By: {reminder.creator}
        </p>
        <p className="flex items-center">
          <Calendar className="w-3.5 h-3.5 mr-1 text-gray-400" /> {reminder.date}
        </p>
      </div>
      {reminder.status === "Approved" && (
        <span className="inline-flex items-center px-2 py-0.5 mt-2 text-[10px] font-medium bg-green-100 text-green-800 rounded-full">
          <Check className="w-3 h-3 mr-1" /> Approved
        </span>
      )}
      {showActions && (
        <div className="mt-2 pt-2 border-t border-gray-100 flex justify-end space-x-2">
          <button
            onClick={() => onUpdateStatus(reminder.id, "Rejected")}
            className="px-3 py-1 text-xs font-medium text-white bg-red-500 rounded-md hover:bg-red-600"
          >
            Reject
          </button>
          <button
            onClick={() => onUpdateStatus(reminder.id, "Approved")}
            className="px-3 py-1 text-xs font-medium text-white bg-green-500 rounded-md hover:bg-green-600"
          >
            Approve
          </button>
        </div>
      )}
    </div>
  );
};

// --- Main Dashboard ---
const AdminDashboardContent = () => {
  const [activeView, setActiveView] = useState("dashboard");
  const [activeTab, setActiveTab] = useState("My Reminders");
  const [selectedDay, setSelectedDay] = useState(27);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const initialRemindersData = [
    {
      id: 1,
      title: "Review new hire contract",
      creator: "CTO",
      date: "10/27/2025, 12:00 PM",
      day: 27,
      status: "Approved",
      isUrgent: true,
      type: "My Reminders",
    },
    {
      id: 2,
      title: "Review marketing pitch",
      creator: "CTO",
      date: "10/27/2025, 02:30 PM",
      day: 27,
      status: "Pending",
      isUrgent: false,
      type: "My Reminders",
    },
  ];

  const [reminders, setReminders] = useState(initialRemindersData);

  const handleUpdateStatus = (id, newStatus) => {
    setReminders((prev) => prev.map((r) => (r.id === id ? { ...r, status: newStatus } : r)));
  };

  const filteredReminders = useMemo(
    () => reminders.filter((r) => r.type === activeTab && r.day === selectedDay),
    [reminders, activeTab, selectedDay]
  );

  const statsData = [
    { total: 20, label: "Total", IconComponent: User, bgColor: "bg-blue-100", textColor: "text-blue-600" },
    { total: 26, label: "Urgent", IconComponent: Clock, bgColor: "bg-red-100", textColor: "text-red-600" },
    { total: 29, label: "Pending", IconComponent: Hourglass, bgColor: "bg-orange-100", textColor: "text-orange-600" },
  ];

  const month = "October";
  const year = 2025;

  const renderContent = () => {
    switch (activeView) {
      case "calendar":
        return <Calander />;
      // case "history":
      //   return <HistoryPage />;
      case "settings":
        return <SettingPage />;
      default:
        return (
          <>
            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mb-6">
              {statsData.map((stat, idx) => (
                <StatCard key={idx} {...stat} />
              ))}
            </div>

            {/* Tabs + New Reminder */}
            <div className="flex justify-between items-center mb-6">
              <div className="flex space-x-4 text-sm font-medium">
                {["My Reminders", "Shared with me", "Shared by me"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`pb-2 transition-all ${
                      activeTab === tab
                        ? "text-blue-600 border-b-2 border-blue-600"
                        : "text-gray-500 hover:text-gray-700 border-b-2 border-transparent"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
              <h2 className="text-3xl font-bold text-gray-800">CTO Dashboard</h2>
              <button
                className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition-colors duration-200"
                onClick={() => setIsModalOpen(true)}
              >
                + New Reminder
              </button>
            </div>

            {/* Calendar + Reminders */}
            <div className="flex space-x-8">
              <CalendarSection month={month} year={year} selectedDay={selectedDay} setSelectedDay={setSelectedDay} />
              <div className="flex-grow">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Reminders for {month} {selectedDay}, {year}
                </h2>
                {filteredReminders.length > 0 ? (
                  <div className="space-y-4">
                    {filteredReminders.map((r) => (
                      <ReminderCard key={r.id} reminder={r} onUpdateStatus={handleUpdateStatus} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center p-10 bg-white rounded-xl shadow-md text-gray-500">
                    No reminders scheduled for {activeTab} on {month} {selectedDay}.
                  </div>
                )}
              </div>
            </div>

            {/* Modal */}
            <CreateReminderModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
          </>
        );
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar activeView={activeView} setActiveView={setActiveView} />

      {/* Main content */}
      <div className="flex flex-col flex-1">
        <Header setActiveView={setActiveView}/>
        <main className="flex-1 overflow-y-auto p-6 ml-75">{renderContent()}</main>
      </div>
    </div>
  );
};

export default AdminDashboardContent;
