import React from 'react';

function TaskReminderItem({ task, onAction }) {
  const { id, title, createdBy, dueDate, status } = task;

  // Function to map status to Tailwind classes
  const getStatusClasses = (currentStatus) => {
    switch (currentStatus) {
      case 'Pending':
        return 'bg-blue-100 text-blue-700';
      case 'Approved':
        return 'bg-green-100 text-green-700';
      case 'Rejected':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const isPending = status === 'Pending';

  return (
    // Equivalent to .task-item
    <div className="flex flex-col bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
      <h3 className="text-lg font-semibold mb-1">{title}</h3>
      <p className="text-sm text-slate-600 mb-1">
        Created by: <strong className="font-semibold text-slate-700">{createdBy}</strong>
      </p>
      <p className="text-sm text-slate-600 mb-4">🗓️ {dueDate}</p>
      
      <div className="flex justify-end items-center mt-2">
        {/* Reject Button (Red) */}
        <button 
          className="px-4 py-2 text-white font-semibold rounded-md transition-opacity duration-200 disabled:opacity-50 
            bg-red-500 hover:bg-red-600 mr-4" 
          onClick={() => onAction(id, 'Rejected')}
          disabled={!isPending} 
        >
          Reject
        </button>
        
        {/* Approve Button (Green) */}
        <button 
          className="px-4 py-2 text-white font-semibold rounded-md transition-opacity duration-200 disabled:opacity-50 
            bg-green-500 hover:bg-green-600" 
          onClick={() => onAction(id, 'Approved')}
          disabled={!isPending}
        >
          Approve
        </button>
        
        {/* Status Pill */}
        <span className={`ml-6 px-3 py-1 text-xs font-medium rounded-full ${getStatusClasses(status)}`}>
          {status}
        </span>
      </div>
    </div>
  );
}
export default TaskReminderItem;