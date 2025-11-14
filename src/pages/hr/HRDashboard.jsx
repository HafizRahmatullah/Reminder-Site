import React, { useState } from 'react';

import TaskReminderList from '../../components/TaskReminderList';
import CreateReminderModal from '../../components/CreateReminderModal';

// Mock data structure (simplified for brevity)
const initialTasks = [
  { id: 1, title: "Review new hire contract", createdBy: "CTO", dueDate: "10/27/2025, 12:00 PM", status: "Pending" },
  { id: 2, title: "Approve Q4 Budget proposal", createdBy: "CFO", dueDate: "11/05/2025, 09:00 AM", status: "Pending" },
];

function HRDashboard() {
  const [tasks, setTasks] = useState(initialTasks);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAction = (taskId, actionType) => {
    console.log(`Task ${taskId} was ${actionType}`);
    // In a real app, update task status here:
    // setTasks(tasks.map(task => 
    //   task.id === taskId ? { ...task, status: actionType } : task
    // ));
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">

      {/* ✅ Global Header (fixed top) */}
      

      {/* Main Dashboard Content */}
      <div className="p-8 lg:p-12 flex-grow "> 
        {/* mt-16 pushes content below the fixed header */}

        {/* Dashboard Header Section */}
        <header className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800">HR Dashboard</h2>
          <button
            className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition-colors duration-200"
            onClick={openModal}
          >
            + New Reminder
          </button>
        </header>

        {/* Task List */}
        <TaskReminderList tasks={tasks} onAction={handleAction} />

        {/* Create Reminder Modal */}
        <CreateReminderModal isOpen={isModalOpen} onClose={closeModal} />
      </div>
    </div>
  );
}

export default HRDashboard;
