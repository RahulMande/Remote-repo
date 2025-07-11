'use client';
import { useState } from 'react';

export default function LeavesPage() {
  const [filter, setFilter] = useState('All');
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    subject: '',
    days: '',
    startDate: '',
    endDate: '',
    reason: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Leave submitted:\n\n${JSON.stringify(formData, null, 2)}`);
    setShowForm(false);
    setFormData({ subject: '', days: '', startDate: '', endDate: '', reason: '' });
  };

  const handleCancel = () => {
    setShowForm(false);
    setFormData({ subject: '', days: '', startDate: '', endDate: '', reason: '' });
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Leave Requests</h1>

      {/* Top Buttons and Filter */}
      <div className="flex flex-wrap gap-4 mb-6">
        <button
          onClick={() => setShowForm(false)}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          All Requests
        </button>

        <button
          onClick={() => setShowForm(true)}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Request Leave
        </button>

        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="border border-gray-400 px-3 py-2 rounded"
        >
          <option value="All">All</option>
          <option value="Approved">Approved</option>
          <option value="Pending">Pending</option>
          <option value="Rejected">Rejected</option>
        </select>
      </div>

      {/* Request Leave Form */}
      {showForm && (
        <form onSubmit={handleSubmit} className="space-y-4 bg-gray-100 p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Leave Request Form</h2>

          {/* Subject */}
          <div>
            <label className="block font-medium mb-1">Subject:</label>
            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              className="w-full border border-gray-400 px-3 py-2 rounded"
              placeholder="Enter subject of leave"
              required
            />
          </div>

          {/* Number of Days */}
          <div>
            <label className="block font-medium mb-1">Number of Days:</label>
            <select
              name="days"
              value={formData.days}
              onChange={handleChange}
              className="w-full border border-gray-400 px-3 py-2 rounded"
              required
            >
              <option value="">-- Select --</option>
              <option value="Half Day">Half Day</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
            </select>
          </div>

          {/* Start Date */}
          <div>
            <label className="block font-medium mb-1">Start Date:</label>
            <input
              type="date"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
              className="w-full border border-gray-400 px-3 py-2 rounded"
              required
            />
          </div>

          {/* End Date */}
          <div>
            <label className="block font-medium mb-1">End Date:</label>
            <input
              type="date"
              name="endDate"
              value={formData.endDate}
              onChange={handleChange}
              className="w-full border border-gray-400 px-3 py-2 rounded"
              required
            />
          </div>

          {/* Reason */}
          <div>
            <label className="block font-medium mb-1">Reason:</label>
            <textarea
              name="reason"
              value={formData.reason}
              onChange={handleChange}
              className="w-full border border-gray-400 px-3 py-2 rounded"
              rows="4"
              placeholder="Enter your reason"
              required
            ></textarea>
          </div>

          {/* Buttons */}
          <div className="flex gap-4">
            <button
              type="button"
              onClick={handleCancel}
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Submit
            </button>
          </div>
        </form>
      )}

      {!showForm && (
        <p className="text-gray-700 mt-4">
          Showing <strong>{filter}</strong> requests.
        </p>
      )}
    </div>
  );
}
