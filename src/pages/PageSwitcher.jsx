import React, { useState } from "react";

import AppLayout from "./hr/AppLayout";
import AdminDashboardContent from "./cto/AdminDashboardContent";
import AdminDashboard from "./admin/AdminDashboard";
import MyRemindersPage from "./ceo/MyRemindersPage";

function PageSwitcher() {
  const [activePage, setActivePage] = useState("admin");

  return (
    <>
      <nav className="navbar bg-gray-800 text-white flex justify-between items-center px-8 py-4 shadow-md">
        <div className="logo text-lg font-bold">Company Panel</div>

        <ul className="flex space-x-4">
          <li><button onClick={() => setActivePage("admin")}>Admin</button></li>
          <li><button onClick={() => setActivePage("hr")}>HR</button></li>
          <li><button onClick={() => setActivePage("cto")}>CTO</button></li>
          <li><button onClick={() => setActivePage("ceo")}>CEO</button></li>
        </ul>
      </nav>

      <div className="dashboard-container">
        {activePage === "admin" && <AdminDashboard />}
        {activePage === "hr" && <AppLayout />}
        {activePage === "cto" && <AdminDashboardContent />}
        {activePage === "ceo" && <MyRemindersPage />}

         
      </div>
    </>
  );
}

export default PageSwitcher;
