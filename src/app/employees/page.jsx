'use client';

import { useState } from 'react';
import { MdEdit } from 'react-icons/md';

const initialEmployees = [
  {
    name: 'Papisetty Sudhakar',
    designation: 'Front-End-Developer',
    joining: 'Not Specified',
    image: null,
    initials: 'SP',
  },
  {
    name: 'Manda Sai Bharath Reddy',
    designation: 'Front-End-Developer',
    joining: 'Not Specified',
    image: null,
    initials: 'SB',
  },
  {
    name: 'NAgi Reddy',
    designation: 'Back-End-Developer',
    joining: 'Not Specified',
    image: null,
    initials: 'NR',
  },
    {
    name: 'Ashok T',
    designation: 'Back-End-Developer',
    joining: 'Not Specified',
    image: null,
    initials: 'AT',
  },
    {
    name: 'Asif Shaik',
    designation: 'Front-End Developer(Team Leader)',
    joining: 'Not Specified',
    image: null,
    initials: 'AS',
  },
    {
    name: 'Naveen T',
    designation: 'Back-End Developer',
    joining: 'Not Specified', 
    image: null,
    initials: 'NT',
  },
    {
    name: 'Subramanyam',
    designation: 'Mobile Developer',
    joining: 'Not Specified',
    image: null,
    initials: 'SS',
  },
    {
    name: 'Narasimha Reddy',
    designation: 'Front-End Developer',
    joining: 'Not Specified',
    image: null,
    initials: 'NR',
  },
      {
    name:'Divya D',
    designation: 'Devops Engineer',
    joining: 'Not Specified',
    image: null,
    initials: 'DD',
  },
      {
    name: 'Yamini Telugu',
    designation: 'Back-End Developer',
    joining: 'Not Specified',
    image: null,
    initials: 'NR',
  },
];

export default function EmployeesPage() {
  const [employees, setEmployees] = useState(initialEmployees);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newEmployee, setNewEmployee] = useState({
    name: '',
    designation: '',
    joining: '',
    initials: '',
    image: null,
  });

  // 🔧 Edit
  const handleEdit = (employee, index) => {
    setSelectedEmployee({ ...employee, index });
    setIsEditModalOpen(true);
  };

  const handleEditChange = (e) => {
    setSelectedEmployee({ ...selectedEmployee, [e.target.name]: e.target.value });
  };

  const handleEditSave = () => {
    const updated = [...employees];
    updated[selectedEmployee.index] = {
      ...updated[selectedEmployee.index],
      name: selectedEmployee.name,
      designation: selectedEmployee.designation,
      joining: selectedEmployee.joining,
      initials: selectedEmployee.initials,
    };
    setEmployees(updated);
    setIsEditModalOpen(false);
    setSelectedEmployee(null);
  };

  // ➕ Add
  const handleNewChange = (e) => {
    setNewEmployee({ ...newEmployee, [e.target.name]: e.target.value });
  };

  const handleAddEmployee = () => {
    setEmployees([...employees, newEmployee]);
    setNewEmployee({
      name: '',
      designation: '',
      joining: '',
      initials: '',
      image: null,
    });
    setIsAddModalOpen(false);
  };

  return (
    <div className="p-6 h-full overflow-y-auto">
      {/* 🔹 Top Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Employees</h1>
        <div className="flex gap-4">
          <select className="border border-gray-300 rounded px-4 py-2 text-sm">
            <option>All Projects</option>
            <option>Project A</option>
            <option>Project B</option>
          </select>
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 text-sm"
            onClick={() => setIsAddModalOpen(true)}
          >
            Add New Employee
          </button>
        </div>
      </div>

      {/* 🔹 Cards */}
     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-11">
  {employees.map((emp, index) => (
  <div
  key={index}
  className="bg-white shadow-md rounded-2xl p-4 relative w-full max-w-sm mx-auto hover:scale-105 transition-transform duration-300 min-h-[300px]"
>

            <button
              className="absolute top-2 right-2 text-gray-600 hover:text-blue-600"
              onClick={() => handleEdit(emp, index)}
            >
              <MdEdit size={20} />
            </button>

            <div className="flex flex-col items-center mt-4">
              {emp.image ? (
                <img
                  src={emp.image}
                  alt={emp.name}
                  width={80}
                  height={80}
                  className="rounded-full border-2 border-blue-500"
                />
              ) : (
                <div className="w-20 h-20 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 text-white flex items-center justify-center text-xl font-bold border-2 border-blue-500">
                  {emp.initials}
                </div>
              )}
              <h2 className="mt-4 text-lg font-semibold text-center">{emp.name}</h2>
              <p className="text-sm text-gray-500">{emp.designation}</p>
              <p className="text-sm text-gray-600 mt-1">📅 {emp.joining}</p>
            </div>
          </div>
        ))}
      </div>

      {/* 🔹 Edit Modal */}
      {isEditModalOpen && selectedEmployee && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-96 shadow-xl">
            <h2 className="text-xl font-bold mb-4 text-center">Edit Employee</h2>
            <input
              type="text"
              name="name"
              value={selectedEmployee.name}
              onChange={handleEditChange}
              placeholder="Name"
              className="w-full mb-3 px-3 py-2 border rounded"
            />
            <input
              type="text"
              name="designation"
              value={selectedEmployee.designation}
              onChange={handleEditChange}
              placeholder="Designation"
              className="w-full mb-3 px-3 py-2 border rounded"
            />
            <input
              type="text"
              name="joining"
              value={selectedEmployee.joining}
              onChange={handleEditChange}
              placeholder="Joining Info"
              className="w-full mb-3 px-3 py-2 border rounded"
            />
            <input
              type="text"
              name="initials"
              value={selectedEmployee.initials}
              onChange={handleEditChange}
              placeholder="Initials"
              className="w-full mb-4 px-3 py-2 border rounded"
            />
            <div className="flex justify-end gap-3">
              <button
                className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
                onClick={() => {
                  setIsEditModalOpen(false);
                  setSelectedEmployee(null);
                }}
              >
                Cancel
              </button>
              <button
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                onClick={handleEditSave}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 🔹 Add Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-96 shadow-xl">
            <h2 className="text-xl font-bold mb-4 text-center">Add New Employee</h2>
            <input
              type="text"
              name="name"
              value={newEmployee.name}
              onChange={handleNewChange}
              placeholder="Name"
              className="w-full mb-3 px-3 py-2 border rounded"
            />
            <input
              type="text"
              name="designation"
              value={newEmployee.designation}
              onChange={handleNewChange}
              placeholder="Designation"
              className="w-full mb-3 px-3 py-2 border rounded"
            />
            <input
              type="text"
              name="joining"
              value={newEmployee.joining}
              onChange={handleNewChange}
              placeholder="Joining Info"
              className="w-full mb-3 px-3 py-2 border rounded"
            />
            <input
              type="text"
              name="initials"
              value={newEmployee.initials}
              onChange={handleNewChange}
              placeholder="Initials"
              className="w-full mb-4 px-3 py-2 border rounded"
            />
            <div className="flex justify-end gap-3">
              <button
                className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
                onClick={() => {
                  setIsAddModalOpen(false);
                  setNewEmployee({
                    name: '',
                    designation: '',
                    joining: '',
                    initials: '',
                    image: null,
                  });
                }}
              >
                Cancel
              </button>
              <button
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                onClick={handleAddEmployee}
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
