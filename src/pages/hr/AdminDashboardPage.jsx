import React, { useState } from "react";

const AdminDashboardPage = () => {
  const [users] = useState([
    { id: 1, name: "Jane Doe", status: "Active" },
    { id: 2, name: "John Smith", status: "Inactive" },
  ]);

  const totalUsers = users.length;
  const activeUsers = users.filter((u) => u.status === "Active").length;
  const inactiveUsers = totalUsers - activeUsers;

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-6">Admin Dashboard</h2>

      {/* Info Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="bg-white shadow rounded p-4 flex items-center justify-between">
          <div>
            <div className="text-2xl font-bold">{totalUsers}</div>
            <div className="text-sm text-gray-500">Total users</div>
          </div>
          <div className="text-blue-500 text-3xl">👥</div>
        </div>
        <div className="bg-white shadow rounded p-4 flex items-center justify-between">
          <div>
            <div className="text-2xl font-bold">{activeUsers}</div>
            <div className="text-sm text-gray-500">Active users</div>
          </div>
          <div className="text-green-500 text-3xl">✅</div>
        </div>
        <div className="bg-white shadow rounded p-4 flex items-center justify-between">
          <div>
            <div className="text-2xl font-bold">{inactiveUsers}</div>
            <div className="text-sm text-gray-500">Inactive users</div>
          </div>
          <div className="text-red-500 text-3xl">🚫</div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardPage;
