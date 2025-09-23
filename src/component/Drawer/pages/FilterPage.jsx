import React from "react";

const FilterPage = () => {
  const inputField = [
    { key: "module", type: "text", label: "Module" },
    { key: "type", type: "text", label: "Object Type" },
    { key: "category", type: "text", label: "Object Category" },
    { key: "activity", type: "text", label: "Activity" },
    { key: "tcode", type: "text", label: "Object T.Code" },
    { key: "name", type: "text", label: "Transaction Name" },
    { key: "language", type: "text", label: "Language" },
    { key: "date", type: "text", label: "Date" },
  ];
  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 px-8 overflow-y-auto">
        {inputField.map(({ key, type, label }) => (
          <div key={key} className="flex gap-5 items-center mb-2.5">
            <label htmlFor={key} className="text-sm font-medium text-gray-700 mb-1">
              {label}
            </label>
            <input
              id={key}
              type={type}
              className="border border-gray-400 rounded px-2 py-1 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
        ))}
      </div>
      <div className="flex items-center justify-end gap-5 mr-7 mt-30">
        <button className="px-5 py-1 text-sm border border-gray-400 outline-none text-gray-400 bg-gray-100 rounded">Clear All</button>
        <button className="px-6 py-1.5 text-sm border outline-none text-white bg-blue-800 rounded">Load</button>
      </div>
    </div>
  );
};

export default FilterPage;
