import React from 'react';

// Mock Data
const historyEntries = [
    { id: 1, title: 'Submit year-end Tax Documents', recipient: 'All Employees', created: 'Nov 02, 2025', color: 'red' },
    { id: 2, title: 'Sign Annual Performance Reviews', recipient: 'John Doe (CEO)', created: 'Nov 24, 2025', color: 'orange' },
    { id: 3, title: 'Approve Q4 Budget proposal', recipient: 'Jane Smith (CTO)', created: 'Nov 27, 2025', color: 'green' },
    { id: 4, title: 'Team Offsite Venue Selection', recipient: 'Marketing Team', created: 'Nov 29, 2025', color: 'blue' },
    { id: 5, title: 'Approve Q4 Budget proposal', recipient: 'Jane Smith (CTO)', created: 'Nov 27, 2025', color: 'red' },
];

function RemindersHistoryPage() {
    // Function to map color string to Tailwind border-color classes
    const getBorderColorClass = (color) => {
        switch (color) {
            case 'red':
                return 'border-red-500';
            case 'orange':
                return 'border-amber-500';
            case 'green':
                return 'border-emerald-500';
            case 'blue':
                return 'border-blue-500';
            default:
                return 'border-gray-300';
        }
    };

    return (
        // Equivalent to .reminders-history-page
        <div className="bg-white rounded-xl shadow-md m-8 lg:m-12 p-8 lg:p-10">
            <h2 className="text-2xl font-bold mb-8 text-slate-800">Reminders History</h2>

            <div className="flex flex-col space-y-4">
                {historyEntries.map(entry => (
                    <div 
                        key={entry.id} 
                        // history-item: pl-4, border-l-4 (using color function), subtle hover
                        className={`pl-4 border-l-4 transition-colors duration-100 hover:bg-gray-50 py-2 ${getBorderColorClass(entry.color)}`}
                    >
                        <h4 className="text-base font-semibold mb-0.5 text-slate-800">{entry.title}</h4>
                        <p className="text-sm text-slate-500 m-0">To: {entry.recipient}</p>
                        <p className="text-sm text-slate-500 m-0">Created: {entry.created}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default RemindersHistoryPage;