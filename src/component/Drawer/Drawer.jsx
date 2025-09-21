import React, { useEffect, useState } from "react";
import { X, Funnel, Eye, FunnelX, Blocks } from "lucide-react";

const Drawer = ({ isOpen, onClose }) => {
  const [showDrawer, setShowDrawer] = useState(isOpen);

  useEffect(() => {
    let timer;
    if (isOpen) {
      timer = setTimeout(() => setShowDrawer(true), 1000);
    } else {
      timer = setTimeout(() => setShowDrawer(false), 1000);
    }
    return () => clearTimeout(timer);
  }, [isOpen]);

  if (!showDrawer && !isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex">
      <div className={`fixed inset-0 bg-black transition-opacity duration-1000 ${isOpen ? "opacity-40" : "opacity-0"}`} onClick={onClose} />

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-4/5 bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-slate-800 text-white">
          <h1 className="text-lg font-semibold">Lookup</h1>
          <button className="p-2 hover:bg-slate-700 rounded-lg transition-colors" onClick={onClose}>
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex h-full">
          {/* Left Side */}
          <div className="w-16 bg-gray-50 border-r border-gray-200 flex flex-col items-center py-8 gap-6">
            <button className="text-gray-600 hover:text-yellow-600">
              <Funnel className="w-5 h-5" />
            </button>
            <button className="text-gray-600 hover:text-yellow-600">
              <Eye className="w-5 h-5" />
            </button>
            <button className="text-gray-600 hover:text-yellow-600">
              <FunnelX className="w-5 h-5" />
            </button>
            <button className="text-gray-600 hover:text-yellow-600">
              <Blocks className="w-5 h-5" />
            </button>
          </div>

          {/* Right Side */}
          <div className="flex-1 flex flex-col mt-5">
            {/* Tab Navigation */}
            <div className="flex border-b-3 border-blue-700 bg-white px-4">
              <button className="px-4 py-2 rounded-t-lg bg-blue-50 text-blue-800 font-medium text-base">Employee</button>
              <button className="px-4 py-2 text-gray-500 hover:text-gray-700 font-medium text-base">Resigned Employees</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Drawer;
