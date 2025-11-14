import React, { useState, useMemo } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";

// --- Dummy Data ---
const allReminders = [
  { id: 1, recipient: "Alice Johnson", subject: "Project Kickoff", date: "2025-10-01", status: "Sent" },
  { id: 2, recipient: "Bob Smith", subject: "Follow-up Meeting", date: "2025-10-03", status: "Draft" },
  { id: 3, recipient: "Charlie Brown", subject: "Quarterly Review", date: "2025-10-05", status: "Sent" },
  { id: 4, recipient: "Dana Scully", subject: "New Policy Update", date: "2025-10-08", status: "Failed" },
  { id: 5, recipient: "Erin Carter", subject: "Team Lunch", date: "2025-10-10", status: "Sent" },
  { id: 6, recipient: "Frank Castle", subject: "System Maintenance", date: "2025-10-12", status: "Draft" },
  { id: 7, recipient: "Grace Lee", subject: "Client Feedback", date: "2025-10-15", status: "Sent" },
  { id: 8, recipient: "Hank Pym", subject: "Q4 Budget", date: "2025-10-18", status: "Failed" },
  { id: 9, recipient: "Ivy Pepper", subject: "Training Session", date: "2025-10-20", status: "Sent" },
  { id: 10, recipient: "Jack Ryan", subject: "Security Audit", date: "2025-10-22", status: "Sent" },
  { id: 11, recipient: "Kelly Foster", subject: "Onboarding Docs", date: "2025-10-25", status: "Draft" },
];

const statusOptions = ["All", "Sent", "Draft", "Failed"];
const REMINDERS_PER_PAGE = 5;

// --- Helper function for status badge ---
const getStatusBadge = (status) => {
  const base = "inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset";
  switch (status) {
    case "Sent":
      return <span className={`${base} bg-green-50 text-green-700 ring-green-600/20`}>Sent</span>;
    case "Draft":
      return <span className={`${base} bg-yellow-50 text-yellow-800 ring-yellow-600/20`}>Draft</span>;
    case "Failed":
      return <span className={`${base} bg-red-50 text-red-700 ring-red-600/20`}>Failed</span>;
    default:
      return <span className={`${base} bg-gray-50 text-gray-600 ring-gray-500/10`}>{status}</span>;
  }
};

// --- Main Component ---
export default function SentRemindersPage() {
  const [filterStatus, setFilterStatus] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);

  // Filter reminders
  const filteredReminders = useMemo(() => {
    return filterStatus === "All"
      ? allReminders
      : allReminders.filter((r) => r.status === filterStatus);
  }, [filterStatus]);

  // Pagination
  const totalPages = Math.ceil(filteredReminders.length / REMINDERS_PER_PAGE);
  const start = (currentPage - 1) * REMINDERS_PER_PAGE;
  const end = start + REMINDERS_PER_PAGE;
  const currentReminders = filteredReminders.slice(start, end);

  // Page navigation
  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  // Handle filter change
  const handleFilterChange = (status) => {
    setFilterStatus(status);
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      {/* --- Header --- */}
      <header className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">📬 Sent Reminders</h1>
        <p className="mt-1 text-sm text-gray-500">
          A list of all scheduled and sent reminders.
        </p>
      </header>

      {/* --- Filter Section --- */}
      <div className="mb-6 flex flex-wrap items-center gap-4 p-4 bg-white shadow-sm rounded-lg border border-gray-200">
        <h3 className="text-base font-semibold text-gray-700">Filter by Status:</h3>
        {statusOptions.map((status) => (
          <button
            key={status}
            onClick={() => handleFilterChange(status)}
            className={`px-3 py-1.5 text-sm font-medium rounded-full transition-colors duration-150 ease-in-out ${
              filterStatus === status
                ? "bg-indigo-600 text-white shadow-md hover:bg-indigo-700"
                : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-100"
            }`}
          >
            {status} (
            {allReminders.filter((r) => status === "All" || r.status === status).length})
          </button>
        ))}
      </div>

      {/* --- Table --- */}
      <div className="overflow-x-auto shadow-xl ring-1 ring-black ring-opacity-5 sm:rounded-lg">
        <table className="min-w-full divide-y divide-gray-300">
          <thead className="bg-gray-50">
            <tr>
              <th className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                Recipient
              </th>
              <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Subject</th>
              <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Date</th>
              <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Status</th>
              <th className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                <span className="sr-only">View</span>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {currentReminders.length > 0 ? (
              currentReminders.map((reminder) => (
                <tr
                  key={reminder.id}
                  className="hover:bg-gray-50 transition duration-100"
                >
                  <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                    {reminder.recipient}
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    {reminder.subject}
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    {reminder.date}
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm">
                    {getStatusBadge(reminder.status)}
                  </td>
                  <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                    <a href="#" className="text-indigo-600 hover:text-indigo-900">
                      View<span className="sr-only">, {reminder.subject}</span>
                    </a>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="5"
                  className="px-6 py-4 text-center text-sm text-gray-500"
                >
                  No reminders found for the selected filter.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* --- Pagination --- */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6 mt-6 rounded-lg shadow-md">
          <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
            <p className="text-sm text-gray-700">
              Showing <span className="font-medium">{start + 1}</span> to{" "}
              <span className="font-medium">
                {Math.min(end, filteredReminders.length)}
              </span>{" "}
              of <span className="font-medium">{filteredReminders.length}</span> results
            </p>
            <nav
              className="isolate inline-flex -space-x-px rounded-md shadow-sm"
              aria-label="Pagination"
            >
              <button
                onClick={() => goToPage(currentPage - 1)}
                disabled={currentPage === 1}
                className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 disabled:opacity-50"
              >
                <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
              </button>

              {[...Array(totalPages).keys()].map((index) => (
                <button
                  key={index + 1}
                  onClick={() => goToPage(index + 1)}
                  className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ${
                    currentPage === index + 1
                      ? "bg-indigo-600 text-white"
                      : "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                  }`}
                >
                  {index + 1}
                </button>
              ))}

              <button
                onClick={() => goToPage(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 disabled:opacity-50"
              >
                <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
              </button>
            </nav>
          </div>
        </div>
      )}
    </div>
  );
}
