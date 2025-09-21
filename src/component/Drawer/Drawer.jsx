import React, { useEffect, useState } from "react";
// Icons
import { X, Funnel, Eye, FunnelX, Blocks } from "lucide-react";
// components
import FilterPage from "./pages/FilterPage";
import ViewPage from "./pages/ViewPage";
import ClearFilterPage from "./pages/ClearFilterPage";
import SuggestionPage from "./pages/SuggestionPage";

const Drawer = ({ isOpen, onClose }) => {
  const [showDrawer, setShowDrawer] = useState(isOpen);
  const [activePage, setActivePage] = useState("suggestion");

  const page = {
    filter: <FilterPage />,
    view: <ViewPage />,
    clear: <ClearFilterPage />,
    suggestion: <SuggestionPage />,
  };

  const navItems = [
    { key: "filter", icon: Funnel },
    { key: "view", icon: Eye },
    { key: "clear", icon: FunnelX },
    { key: "suggestion", icon: Blocks },
  ];

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
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-slate-800 text-white">
          <h1 className="text-lg font-semibold">Lookup</h1>
          <button className="p-2 hover:bg-slate-700 rounded-lg transition-colors" onClick={onClose}>
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex h-full">
          {/* Left Side */}
          <div className="w-16 bg-gray-50 border-r border-gray-200 flex flex-col items-center py-8 gap-6">
            {navItems.map(({ key, icon: Icon }) => (
              <button
                key={key}
                onClick={() => setActivePage(key)}
                className={`text-gray-600 hover:text-yellow-600 ${activePage == key ? "text-yellow-600" : ""}`}
              >
                <Icon className="w-5 h-5" />
              </button>
            ))}
          </div>

          {/* Right Side */}
          <div className="flex-1 flex flex-col mt-5">{page[activePage]}</div>
        </div>
      </div>
    </div>
  );
};

export default Drawer;
