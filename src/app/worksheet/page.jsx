'use client';
import React from 'react';

const days = [
  { day: 'Monday', date: '26-05-2025' },
  { day: 'Tuesday', date: '27-05-2025' },
  { day: 'Wednesday', date: '28-05-2025' },
  { day: 'Thursday', date: '29-05-2025' },
  { day: 'Friday', date: '30-05-2025' },
  { day: 'Saturday', date: '31-05-2025' },
  { day: 'Sunday', date: '01-06-2025' },
];

export default function WorksheetPage() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">
        Week 1 (26-05-2025 - 01-06-2025)
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {days.map((item, index) => (
          <div
            key={index}
            className="border border-gray-300 rounded shadow-sm p-4 bg-white"
          >
            <h2 className="text-lg font-semibold mb-2">
              {item.day} ({item.date})
            </h2>
            <textarea
              placeholder="Write your tasks or notes here..."
              className="w-full h-32 border border-gray-300 rounded p-2 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
