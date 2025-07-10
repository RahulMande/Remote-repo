'use client';

import React, { useState, useEffect } from 'react';
import * as XLSX from 'xlsx';

export default function MedicalPage() {
  const [parentData, setParentData] = useState([]);
  const [child1Data, setChild1Data] = useState([]);
  const [visible, setVisible] = useState(null);
  const [filterKey, setFilterKey] = useState('');
  const [filterValue, setFilterValue] = useState('');

  const normalizeHeaders = (row) => {
    const normalized = {};
    Object.keys(row).forEach((key) => {
      normalized[key.trim().toLowerCase()] = row[key];
    });
    return normalized;
  };

  useEffect(() => {
    const storedParent = localStorage.getItem('parentData');
    const storedChild1 = localStorage.getItem('child1Data');
    if (storedParent) setParentData(JSON.parse(storedParent));
    if (storedChild1) setChild1Data(JSON.parse(storedChild1));
  }, []);

  useEffect(() => {
    localStorage.setItem('parentData', JSON.stringify(parentData));
  }, [parentData]);

  useEffect(() => {
    localStorage.setItem('child1Data', JSON.stringify(child1Data));
  }, [child1Data]);

  const handleUpload = (e, sheet) => {
    const file = e.target.files[0];
    if (!file) return;

    const fileExtension = file.name.split('.').pop().toLowerCase();
    const reader = new FileReader();

    reader.onload = (evt) => {
      const parseData = (data) => {
        return data.map((row) => {
          const normalized = normalizeHeaders(row);
          if (!normalized.hasOwnProperty('discount')) {
            normalized['discount'] = '';
          }
          return normalized;
        });
      };

      if (fileExtension === 'json') {
        try {
          const json = parseData(JSON.parse(evt.target.result));
          if (sheet === 'parent') {
            setParentData(json);
            setVisible('parent');
          } else if (sheet === 'child1') {
            setChild1Data(json);
            setVisible('child1');
          }
        } catch (err) {
          alert('Invalid JSON file');
        }
      } else {
        const data = new Uint8Array(evt.target.result);
        const wb = XLSX.read(data, { type: 'array' });
        const ws = wb.Sheets[wb.SheetNames[0]];
        const json = parseData(XLSX.utils.sheet_to_json(ws, { raw: true }));
        if (sheet === 'parent') {
          setParentData(json);
          setVisible('parent');
        } else if (sheet === 'child1') {
          setChild1Data(json);
          setVisible('child1');
        }
      }
    };

    if (fileExtension === 'json') {
      reader.readAsText(file);
    } else {
      reader.readAsArrayBuffer(file);
    }
  };

  const handleEdit = (rowIndex, key, value, sheet) => {
    const lowerKey = key.trim().toLowerCase();

    if (sheet === 'parent') {
      const updated = [...parentData];
      const actualKey = Object.keys(updated[rowIndex]).find(
        (k) => k.trim().toLowerCase() === lowerKey
      );
      if (actualKey) updated[rowIndex][actualKey] = value;
      else updated[rowIndex][key] = value;
      setParentData(updated);
    } else if (sheet === 'child1') {
      const updatedChild = [...child1Data];
      const actualKey = Object.keys(updatedChild[rowIndex]).find(
        (k) => k.trim().toLowerCase() === lowerKey
      );
      if (actualKey) updatedChild[rowIndex][actualKey] = value;
      else updatedChild[rowIndex][key] = value;
      setChild1Data(updatedChild);
      localStorage.setItem('child1Data', JSON.stringify(updatedChild));

      const childRow = normalizeHeaders(updatedChild[rowIndex]);
      const matchName = childRow['customer name'];
      const matchPin = childRow['medicine pin'];

      const updatedParent = parentData.map((row) => {
        const normalizedRow = normalizeHeaders(row);
        const rowCustomer = normalizedRow['customer name'];
        const rowPin = normalizedRow['medicine pin'];

        if (rowCustomer === matchName && rowPin === matchPin) {
          const updatedRow = { ...row };
          const keyToUpdate = Object.keys(updatedRow).find(
            (k) => k.trim().toLowerCase() === lowerKey
          );
          updatedRow[keyToUpdate || key] = value;
          return updatedRow;
        }

        return row;
      });
      setParentData(updatedParent);
      localStorage.setItem('parentData', JSON.stringify(updatedParent));
    }
  };

  const downloadMergedFile = () => {
    const wb = XLSX.utils.book_new();
    if (parentData.length) {
      const wsParent = XLSX.utils.json_to_sheet(parentData);
      XLSX.utils.book_append_sheet(wb, wsParent, 'Parent');
    }
    if (child1Data.length) {
      const wsChild1 = XLSX.utils.json_to_sheet(child1Data);
      XLSX.utils.book_append_sheet(wb, wsChild1, 'Child1');
    }
    const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([wbout], { type: 'application/octet-stream' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'merged_report.xlsx';
    a.click();
    URL.revokeObjectURL(url);
  };

  const getFilteredData = (data) => {
    if (!filterKey || !filterValue) return data;
    return data.filter((row) => {
      const value = row[filterKey.trim().toLowerCase()];
      return value && String(value).toLowerCase().includes(filterValue.trim().toLowerCase());
    });
  };

  const renderTable = (data, sheet) => {
    if (!data.length) return null;
    const headers = Object.keys(data[0]);
    const filteredData = getFilteredData(data);

    return (
      <div className="overflow-y-auto max-h-[426px] bg-white shadow rounded p-4 mt-4">
        <table className="min-w-full border border-gray-300">
          <thead className="bg-gray-200">
            <tr>
              {headers.map((h) => (
                <th key={h} className="border px-4 py-2 text-left font-semibold">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredData.map((row, r) => {
              const highlightRow = filterKey && filterValue && row[filterKey.trim().toLowerCase()]?.toLowerCase().includes(filterValue.trim().toLowerCase());
              return (
                <tr key={r} className={highlightRow ? 'bg-yellow-100' : ''}>
                  {headers.map((h) => (
                    <td key={h} className="border px-4 py-2">
                      <input
                        className="w-full"
                        value={row[h] || ''}
                        onChange={(e) => handleEdit(r, h, e.target.value, sheet)}
                      />
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div className="p-6 bg-gray-100">
      <h1 className="text-2xl font-bold mb-6">Medical Report</h1>
      <div className="flex justify-between flex-wrap mb-6 gap-4">
        <label className="bg-blue-600 text-white px-4 py-2 rounded cursor-pointer">
          Upload Parent File
          <input type="file" accept=".xlsx,.xls,.json" hidden onChange={(e) => handleUpload(e, 'parent')} />
        </label>
        <label className="bg-green-600 text-white px-4 py-2 rounded cursor-pointer">
          Upload Child File 1
          <input type="file" accept=".xlsx,.xls,.json" hidden onChange={(e) => handleUpload(e, 'child1')} />
        </label>
      </div>
      {child1Data.length > 0 && (
        <div className="flex flex-wrap gap-4 mb-4">
          <select
            className="border p-2 rounded"
            value={filterKey}
            onChange={(e) => setFilterKey(e.target.value)}
          >
            <option value="">Select Column</option>
            {Object.keys(child1Data[0]).map((key) => (
              <option key={key} value={key.trim().toLowerCase()}>{key}</option>
            ))}
          </select>
          <input
            className="border p-2 rounded"
            placeholder="Enter value"
            value={filterValue}
            onChange={(e) => setFilterValue(e.target.value)}
          />
        </div>
      )}
      {visible === 'parent' && parentData.length > 0 && (
        <>
          {renderTable(getFilteredData(parentData), 'parent')}
          <div className="flex justify-end mt-4">
            <button onClick={downloadMergedFile} className="bg-red-600 text-white px-4 py-2 rounded">
              Download Merged File
            </button>
          </div>
        </>
      )}
      {visible === 'child1' && (
        <>
          {renderTable(getFilteredData(child1Data), 'child1')}
          <div className="flex justify-end mt-4">
            <button onClick={downloadMergedFile} className="bg-red-600 text-white px-4 py-2 rounded">
              Download Merged File
            </button>
          </div>
        </>
      )}
    </div>
  );
}
