'use client';
import { useState } from 'react';

export default function OrderPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    location: '',
  });

  const [submittedData, setSubmittedData] = useState(null); // ✅ New state

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmittedData(formData); // ✅ Save submitted data
    setFormData({ name: '', email: '', location: '' }); // (Optional) clear form
  };

  const handleReset = () => {
    setFormData({
      name: '',
      email: '',
      location: '',
    });
    setSubmittedData(null); // Clear the message too
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Order Page</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name */}
        <div>
          <label className="block font-semibold mb-1">Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="border border-gray-400 px-3 py-1 rounded w-full"
            required
          />
        </div>

        {/* Email */}
        <div>
          <label className="block font-semibold mb-1">Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="border border-gray-400 px-3 py-1 rounded w-full"
            required
          />
        </div>

        {/* Location */}
        <div>
          <label className="block font-semibold mb-1">Location:</label>
          <select
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="border border-gray-400 px-3 py-1 rounded w-full"
            required
          >
            <option value="">-- Select Location --</option>
            <option value="Hyderabad">Hyderabad</option>
            <option value="Bangalore">Bangalore</option>
            <option value="Mumbai">Mumbai</option>
          </select>
        </div>

        {/* Buttons */}
        <div className="flex gap-4">
          <button
            type="submit"
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Submit
          </button>
          <button
            type="button"
            onClick={handleReset}
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
          >
            Reset
          </button>
        </div>
      </form>

      {/* ✅ Show submitted result below */}
      {submittedData && (
        <div className="mt-6 p-4 border rounded bg-green-100 text-green-800">
          <h2 className="font-bold mb-2">✅ Submitted Application:</h2>
          <p><strong>Name:</strong> {submittedData.name}</p>
          <p><strong>Email:</strong> {submittedData.email}</p>
          <p><strong>Location:</strong> {submittedData.location}</p>
        </div>
      )}
    </div>
  );
}
