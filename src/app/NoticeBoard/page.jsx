'use client';
import React from 'react';

const weeklyData = [
  { week: 'Week 1', rating: 80 },
  { week: 'Week 2', rating: 60 },
  { week: 'Week 3', rating: 90 },
  { week: 'Week 4', rating: 50 },
];

export default function NoticeBoard() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">📋 Notice Board</h1>

      {/* Performance Bars */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Performance</h2>

        <div className="mb-4">
          <p>Best Performance</p>
          <div className="w-full bg-gray-200 h-4 rounded">
            <div className="bg-green-500 h-4 rounded" style={{ width: '90%' }}></div>
          </div>
        </div>

        <div>
          <p>Weak Performance</p>
          <div className="w-full bg-gray-200 h-4 rounded">
            <div className="bg-red-500 h-4 rounded" style={{ width: '50%' }}></div>
          </div>
        </div>
      </div>
{/* 
      Weekly Ratings */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Your Weekly Rating</h2>
        {weeklyData.map((week, index) => (
          <div key={index} className="mb-4">
            <p className="font-medium">{week.week}</p>
            <div className="w-full bg-gray-200 h-4 rounded">
              <div
                className="bg-blue-500 h-4 rounded"
                style={{ width: `${week.rating}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
