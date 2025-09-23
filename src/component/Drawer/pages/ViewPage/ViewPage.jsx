import React, { useState } from "react";
import ColumnWise from "./ColumnWise";
import CompanyColumnWise from "./CompanyColumnWise";

const ViewPage = () => {
  const [activePage, setActivePage] = useState("coloumn");

  const page = {
    coloumn: <ColumnWise />,
    company: <CompanyColumnWise />,
  };

  const navigationItems = [
    { key: "coloumn", text: "Column Wise" },
    { key: "company", text: "Company Column Wise" },
  ];
  return (
    <div>
      {/* Tabs */}
      <div className="flex items-center justify-between mb-3 border-b-3 border-blue-800 mx-5">
        {navigationItems.map(({ key, text }) => (
          <button
            key={key}
            onClick={() => setActivePage(key)}
            className={`px-4 py-2 rounded-t-lg font-medium text-sm transition-colors duration-200 ${
              activePage === key ? "bg-blue-50 text-blue-800" : "text-gray-500 hover:text-gray-700"
            }`}
          >
            {text}
          </button>
        ))}
      </div>
      {/* Redering Tabs */}
      <div className="mx-5">{page[activePage]}</div>
    </div>
  );
};

export default ViewPage;
