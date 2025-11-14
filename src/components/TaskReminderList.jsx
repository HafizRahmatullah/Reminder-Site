import React from 'react';
import TaskReminderItem from './TaskReminderItem';

function TaskReminderList({ tasks, onAction }) {
  if (!tasks || tasks.length === 0) {
    return (
      <div className="p-8 bg-white border border-dashed border-gray-300 rounded-lg text-center text-gray-500">
        <p className="text-lg font-medium">🎉 No pending reminders! You're all caught up.</p>
      </div>
    );
  }

  return (
    // Equivalent to .task-list
    <div className="flex flex-col space-y-4">
      {tasks.map((task) => (
        <TaskReminderItem 
          key={task.id} 
          task={task} 
          onAction={onAction} 
        />
      ))}
    </div>
  );
}

export default TaskReminderList;