import React, { useState } from "react";

const ColumnWise = () => {
  const [toggle, setToggle] = useState({});

  const items = [
    { key: "module", label: "Module" },
    { key: "type", label: "Object Type" },
    { key: "category", label: "Object Category" },
    { key: "activity", label: "Activity" },
    { key: "tcode", label: "Object T.Code" },
    { key: "name", label: "Transaction Name" },
    { key: "language", label: "Language" },
    { key: "date", label: "Date" },
  ];

  const handleToggle = (key) => {
    const newState = !toggle[key];
    console.log(newState);
    setToggle((prev) => ({ ...prev, [key]: newState }));
  };

  return (
    <div>
      {items.map(({ key, label }) => (
        <div key={key} className="flex items-center justify-between mb-3">
          <p className=" text-sm text-gray-400 font-semibold">{label}</p>
          <button
            onClick={() => handleToggle(key)}
            className={`w-10 h-5 rounded-full p-1 transition-all ${toggle[key] ? "bg-blue-500" : "bg-gray-300"}`}
          >
            <div className={`w-3 h-3 bg-white rounded-full transition-transform ${toggle[key] ? "translate-x-5" : "translate-x-0"}`} />
          </button>
        </div>
      ))}
    </div>
  );
};

export default ColumnWise;
