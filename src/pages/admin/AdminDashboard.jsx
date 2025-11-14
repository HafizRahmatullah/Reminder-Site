import React, { useState } from "react";
import Sidebar1 from "../../components/Sidebar1";
import Header from "../../components/Header";
import UserModal from "./UserModal";

// --- Initial Data ---
const INITIAL_USERS = [
  { id: 1, name: "Jane Doe", role: "Admin", status: "Active", email: "jane.doe@company.com" },
  { id: 2, name: "John Smith", role: "Admin", status: "Active", email: "john.smith@company.com" },
  { id: 3, name: "David Lee", role: "CEO", status: "Active", email: "david.lee@company.com" },
  { id: 4, name: "Sarah Connor", role: "CTO", status: "Inactive", email: "sarah.c@company.com" },
  { id: 5, name: "Michel Chen", role: "HR", status: "Active", email: "michel.chen@company.com" },
];

const AdminDashboard = () => {
  // --- States ---
  const [users, setUsers] = useState(INITIAL_USERS);
  const [openMenuId, setOpenMenuId] = useState(null);
  const [activeTab, setActiveTab] = useState("All");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("create");
  const [currentUser, setCurrentUser] = useState(null);
  const [activeView, setActiveView] = useState("dashboard"); // ✅ Fixed Missing State

  // --- Modal Handlers ---
  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentUser(null);
    setOpenMenuId(null);
  };

  const openCreateModal = () => {
    setModalMode("create");
    setCurrentUser(null);
    setIsModalOpen(true);
  };

  const openEditModal = (user) => {
    setModalMode("edit");
    setCurrentUser(user);
    setIsModalOpen(true);
  };

  // --- CRUD Handlers ---
  const handleCreateUser = (data) => {
    setUsers([
      ...users,
      {
        id: Date.now(),
        name: data.username,
        email: data.email,
        role: data.role,
        status: data.activeStatus ? "Active" : "Inactive",
      },
    ]);
    closeModal();
  };

  const handleUpdateUser = (data) => {
    setUsers(
      users.map((user) =>
        user.id === data.id
          ? {
              ...user,
              name: data.username,
              email: data.email,
              role: data.role,
              status: data.activeStatus ? "Active" : "Inactive",
            }
          : user
      )
    );
    closeModal();
  };

  const handleDeleteUser = (id) => {
    if (window.confirm("Delete this user?")) {
      setUsers(users.filter((u) => u.id !== id));
    }
    setOpenMenuId(null);
  };

  const toggleMenu = (id) => setOpenMenuId(openMenuId === id ? null : id);

  // --- Derived Data ---
  const filteredUsers = users.filter((u) => activeTab === "All" || u.role === activeTab);
  const totalUsers = users.length;
  const activeUsers = users.filter((u) => u.status === "Active").length;
  const inactiveUsers = totalUsers - activeUsers;
  const roleCounts = users.reduce((acc, u) => {
    acc[u.role] = (acc[u.role] || 0) + 1;
    return acc;
  }, {});

  // --- JSX ---
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar1 activeView={activeView} setActiveView={setActiveView} />

      {/* Main Section */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <Header setActiveView={setActiveView} />

        {/* Content */}
        <main className="flex-1 p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Admin Dashboard</h2>

          {/* Info Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
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

          {/* User Management */}
          <div className="bg-white shadow rounded p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">User Management</h3>
              <button
                onClick={openCreateModal}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                + Add user
              </button>
            </div>

            {/* Role Filters */}
            <div className="flex flex-wrap gap-2 mb-4">
              <button
                className={`px-3 py-1 rounded border ${
                  activeTab === "All"
                    ? "bg-blue-600 text-white"
                    : "bg-white text-gray-700 border-gray-300"
                }`}
                onClick={() => setActiveTab("All")}
              >
                All ({totalUsers})
              </button>
              {Object.keys(roleCounts).map((role) => (
                <button
                  key={role}
                  className={`px-3 py-1 rounded border ${
                    activeTab === role
                      ? "bg-blue-600 text-white"
                      : "bg-white text-gray-700 border-gray-300"
                  }`}
                  onClick={() => setActiveTab(role)}
                >
                  {role} ({roleCounts[role]})
                </button>
              ))}
            </div>

            {/* User List */}
            <div className="divide-y">
              {filteredUsers.map((user) => (
                <div key={user.id} className="flex justify-between items-center py-3">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
                    <div>
                      <div className="font-medium text-gray-800">{user.name}</div>
                      <div className="text-sm text-gray-500">{user.role}</div>
                    </div>
                  </div>
                  <div>
                    <span
                      className={`px-3 py-1 rounded-full text-sm ${
                        user.status === "Active"
                          ? "bg-green-100 text-green-600"
                          : "bg-red-100 text-red-600"
                      }`}
                    >
                      {user.status}
                    </span>
                  </div>
                  <div className="relative">
                    <button
                      onClick={() => toggleMenu(user.id)}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      ⋮
                    </button>
                    {openMenuId === user.id && (
                      <div className="absolute right-0 mt-2 w-28 bg-white border rounded shadow-md z-10">
                        <button
                          onClick={() => openEditModal(user)}
                          className="block w-full text-left px-3 py-2 hover:bg-gray-100"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteUser(user.id)}
                          className="block w-full text-left px-3 py-2 hover:bg-gray-100 text-red-600"
                        >
                          Delete
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <UserModal
          mode={modalMode}
          userData={currentUser}
          onClose={closeModal}
          onCreate={handleCreateUser}
          onUpdate={handleUpdateUser}
        />
      )}
    </div>
  );
};

export default AdminDashboard;
