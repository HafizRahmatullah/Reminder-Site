// Corrected and Working Calendar.jsx
import React, { useState } from "react";

import {
  CalendarIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ClockIcon,
  ExclamationTriangleIcon,
  StarIcon,
  UserIcon,
  CheckIcon,
} from "@heroicons/react/24/outline";

import {
  CheckCircleIcon,
  XMarkIcon,
} from "@heroicons/react/20/solid";

const calendarReminders = [
  { id: 101, date: 27, status: "Pending", urgent: false, approved: false },
  { id: 102, date: 27, status: "Approved", urgent: true, approved: true },
  { id: 103, date: 27, status: "Pending", urgent: false, approved: false },
  { id: 104, date: 17, status: "Urgent", urgent: true, approved: false },
  { id: 105, date: 18, status: "Pending", urgent: false, approved: false },
];

const daysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
const firstDayOfMonth = (year, month) => new Date(year, month, 1).getDay();

function CalendarReminderItem({ reminder }) {
  const isApproved = reminder.status === "Approved";
  const isPending = reminder.status === "Pending";
  const isUrgent = reminder.status === "Urgent";

  return (
    <div className="bg-white rounded-lg shadow-md p-5 mb-4 border-l-4 border-gray-100">
      <div className="flex justify-between items-start">
        <h3 className="text-lg font-semibold text-gray-900">Review new hire contract</h3>

        <div className="flex space-x-2">
          {reminder.urgent && (
            <span className="text-red-500 text-sm flex items-center">
              <ExclamationTriangleIcon className="w-4 h-4 mr-1" /> Urgent
            </span>
          )}

          <StarIcon
            className={`w-5 h-5 ${reminder.urgent ? "text-yellow-400" : "text-gray-300"}`}
          />
        </div>
      </div>

      <div className="text-sm text-gray-500 mt-1 space-y-1">
        <p className="flex items-center">
          <UserIcon className="w-4 h-4 mr-2 text-gray-400" /> Created by:
          <strong className="ml-1 text-gray-700">CTO</strong>
        </p>

        <p className="flex items-center">
          <CalendarIcon className="w-4 h-4 mr-2 text-gray-400" /> 10/27/2025, 12:00 PM
        </p>
      </div>

      {isApproved && (
        <div className="mt-4 text-green-600 text-sm font-medium flex items-center">
          <CheckCircleIcon className="w-5 h-5 mr-1" /> Approved
        </div>
      )}

      {isUrgent && !isApproved && (
        <div className="mt-4 text-red-600 text-sm font-medium flex items-center">
          <ExclamationTriangleIcon className="w-5 h-5 mr-1" /> Urgent Action Required
        </div>
      )}

      <div className="flex justify-end space-x-3 mt-4">
        {isPending && (
          <>
            <button className="flex items-center px-4 py-2 text-sm font-medium text-white bg-red-500 rounded-lg hover:bg-red-600 transition duration-150">
              <XMarkIcon className="w-5 h-5 mr-1" /> Reject
            </button>

            <button className="flex items-center px-4 py-2 text-sm font-medium text-white bg-green-500 rounded-lg hover:bg-green-600 transition duration-150">
              <CheckIcon className="w-5 h-5 mr-1" /> Approve
            </button>

            <div className="flex items-center text-gray-500 text-sm">
              <ClockIcon className="w-5 h-5 mr-1" /> Pending
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default function Calendar() {
  const today = new Date();
  const targetMonth = 9;
  const targetYear = 2025;

  const [currentDate, setCurrentDate] = useState(
    new Date(targetYear, targetMonth, today.getDate())
  );

  const [selectedDay, setSelectedDay] = useState(27);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const totalDays = daysInMonth(year, month);
  const startDay = firstDayOfMonth(year, month);

  const days = [];
  for (let i = 0; i < startDay; i++) days.push(null);
  for (let i = 1; i <= totalDays; i++) days.push(i);

  const handleMonthChange = (direction) => {
    const newDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + direction,
      1
    );
    setCurrentDate(newDate);
  };

  const remindersForSelectedDay = calendarReminders.filter(
    (r) => r.date === selectedDay
  );

  return (
    <div className="min-h-screen bg-gray-50 p-8 w-full flex space-x-8">
      <div className="w-1/3 min-w-[320px] bg-white rounded-xl shadow-lg p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Calendar</h1>

        <div className="flex justify-between items-center mb-4">
          <select
            value={month}
            onChange={(e) =>
              setCurrentDate(new Date(year, parseInt(e.target.value), 1))
            }
            className="text-lg font-medium py-1 px-2 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
          >
            {monthNames.map((name, index) => (
              <option key={index} value={index}>
                {name} {year}
              </option>
            ))}
          </select>

          <div className="flex space-x-2">
            <button
              onClick={() => handleMonthChange(-1)}
              className="p-2 rounded-full hover:bg-gray-100 transition"
            >
              <ChevronLeftIcon className="w-5 h-5 text-gray-600" />
            </button>

            <button
              onClick={() => handleMonthChange(1)}
              className="p-2 rounded-full hover:bg-gray-100 transition"
            >
              <ChevronRightIcon className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-7 text-center text-sm">
          {daysOfWeek.map((day) => (
            <div key={day} className="font-semibold text-gray-500 p-2">
              {day}
            </div>
          ))}

          {days.map((day, index) => (
            <div
              key={index}
              onClick={() => day && setSelectedDay(day)}
              className={`p-2 cursor-pointer transition duration-150 ease-in-out h-10 w-10 mx-auto rounded-full flex items-center justify-center
                ${day === selectedDay ? "bg-blue-600 text-white font-bold shadow-md" : day !== null ? "hover:bg-blue-100 text-gray-800" : "cursor-default"}
                ${day === 17 ? "border-2 border-red-500" : ""}`}
            >
              {day}
            </div>
          ))}
        </div>
      </div>

      <div className="flex-grow">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">
          Reminders for {monthNames[month]} {selectedDay}, {year}
        </h1>

        {remindersForSelectedDay.length > 0 ? (
          remindersForSelectedDay.map((reminder) => (
            <CalendarReminderItem key={reminder.id} reminder={reminder} />
          ))
        ) : (
          <div className="text-center p-10 bg-white rounded-xl shadow-md text-gray-500">
            No reminders scheduled for this date.
          </div>
        )}
      </div>
    </div>
  );
}