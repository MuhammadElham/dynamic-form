import React from "react";

const SuggestionPage = () => {
  return (
    <div className="flex border-b-3 border-blue-700 bg-white px-4">
      <button className="px-4 py-2 rounded-t-lg bg-blue-50 text-blue-800 font-medium text-base">Employee</button>
      <button className="px-4 py-2 text-gray-500 hover:text-gray-700 font-medium text-base">Resigned Employees</button>
    </div>
  );
};

export default SuggestionPage;
