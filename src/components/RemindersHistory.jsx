// RemindersHistory.jsx
import React from "react";

function RemindersHistory({ reminders }) {
  return (
    <div className="p-6 bg-white rounded-lg shadow-md border border-gray-100">
      <h2 className="text-xl font-semibold mb-4">Reminders History</h2>

      {reminders.length === 0 ? (
        <p className="text-gray-500 text-sm">No reminders yet.</p>
      ) : (
        <ul className="space-y-3">
          {reminders.map((r) => (
            <li
              key={r.id}
              className="p-4 bg-gray-50 rounded flex justify-between items-center hover:bg-gray-100"
            >
              <div>
                <div className="font-medium text-gray-800">{r.description}</div>
                <div className="text-sm text-gray-500">
                  {r.dueDate} • {r.assignTo}
                </div>
              </div>
              <span
                className={`text-xs font-medium px-3 py-1 rounded-full ${
                  r.priority === "High"
                    ? "bg-red-100 text-red-600"
                    : r.priority === "Low"
                    ? "bg-green-100 text-green-600"
                    : "bg-yellow-100 text-yellow-600"
                }`}
              >
                {r.priority}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default RemindersHistory;
