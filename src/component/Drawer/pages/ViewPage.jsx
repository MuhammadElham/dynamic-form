import React from "react";

const ViewPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">View Page</h2>
      <p className="text-gray-600 text-center max-w-md">
        This is the <span className="font-semibold text-blue-600">View Page</span> lorem, ipsum dolor sit amet consectetur adipisicing elit. Tempora
        voluptates vel ipsam hic earum, fuga qui quasi asperiores dicta! Voluptatum.
      </p>
      <div className="mt-6 w-full max-w-sm bg-gray-100 border border-gray-300 rounded-xl shadow p-4">
        <p className="text-sm text-gray-500">Sample Data:</p>
        <ul className="list-disc list-inside text-gray-700">
          <li>Employee ID: 12345</li>
          <li>Name: John Doe</li>
          <li>Status: Active</li>
        </ul>
      </div>
    </div>
  );
};

export default ViewPage;
