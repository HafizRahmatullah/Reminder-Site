// // src/pages/HistoryPage.jsx
// import React from "react";

// const historyData = [
//   { id: 1, title: "Review new hire contract", date: "Nov 3, 2025", createdBy: "HR", status: "Approved", priority: "High" },
//   { id: 2, title: "Finalize Q1 budget", date: "Nov 4, 2025", createdBy: "John Doe", status: "Pending", priority: "Normal" },
//   { id: 3, title: "Marketing Campaign proposal", date: "Nov 3, 2025", createdBy: "Marketing Team", status: "Rejected", priority: "Low" },
// ];

// const getStatusClasses = (status) => {
//   if (status === "Approved") return "text-green-600 bg-green-100";
//   if (status === "Pending") return "text-yellow-600 bg-yellow-100";
//   if (status === "Rejected") return "text-red-600 bg-red-100";
//   return "text-gray-600";
// };

// const getPriorityClasses = (priority) => {
//   if (priority === "High") return "text-red-700 bg-red-100";
//   if (priority === "Normal") return "text-yellow-700 bg-yellow-100";
//   if (priority === "Low") return "text-blue-700 bg-blue-100";
//   return "text-gray-700 bg-gray-100";
// };

// const HistoryPage = () => {
//   return (
//     <div className="flex flex-col flex-1 p-6">
//       <h1 className="text-2xl font-bold mb-6">Reminders History</h1>
//       <div className="bg-white rounded-lg shadow-lg overflow-x-auto">
//         <div className="grid grid-cols-5 text-sm font-semibold text-gray-500 uppercase border-b border-gray-200 py-3 px-6">
//           <div>Title</div>
//           <div>Date</div>
//           <div>Created By</div>
//           <div>Status</div>
//           <div className="text-right">Priority</div>
//         </div>
//         <div className="divide-y divide-gray-100">
//           {historyData.map((item) => (
//             <div key={item.id} className="grid grid-cols-5 items-center text-sm py-4 px-6 hover:bg-gray-50">
//               <div>{item.title}</div>
//               <div>{item.date}</div>
//               <div>{item.createdBy}</div>
//               <div>
//                 <span className={`flex items-center font-medium ${getStatusClasses(item.status)}`}>
//                   <span
//                     className={`h-1.5 w-1.5 rounded-full mr-2 ${
//                       item.status === "Approved" ? "bg-green-600" :
//                       item.status === "Pending" ? "bg-yellow-600" : "bg-red-600"
//                     }`}
//                   />
//                   {item.status}
//                 </span>
//               </div>
//               <div className="text-right">
//                 <span className={`inline-flex items-center px-3 py-1 text-xs font-semibold rounded-full ${getPriorityClasses(item.priority)}`}>
//                   {item.priority}
//                 </span>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default HistoryPage;
import React from 'react'

const Historypage = () => {
  return (
    <div>Historypage</div>
  )
}

export default Historypage