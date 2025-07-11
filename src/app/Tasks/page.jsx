// /app/page.jsx
'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const List = () => {
  const [task, setTask] = useState(['buymilk', 'buffalo', 'walkdog']);
  const router = useRouter();

  useEffect(() => {
    setTask((prev) => [...prev, 'NewTask']);
  }, []);

  useEffect(() => {
    console.log(task);
  }, [task]);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-2">Task List</h2>
      <ul className="list-disc ml-5 mb-4">
        {task.map((item, index) => (
          <li key={index} className="mb-1">{item}</li>
        ))}
      </ul>

      <button 
        onClick={() => router.push('/order')}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Go to Order Page
      </button>
    </div>
  );
};

export default List;
