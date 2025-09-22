import React, { useEffect, useState } from "react";
// Icons
import { X, Funnel, Eye, FunnelX, Blocks, Info } from "lucide-react";
// Components
import FilterPage from "./pages/FilterPage";
import ViewPage from "./pages/ViewPage";
import ClearFilterPage from "./pages/ClearFilterPage";
import SuggestionPage from "./pages/Suggestion/SuggestionPage";

const Drawer = ({ isOpen, onClose }) => {
  const [showDrawer, setShowDrawer] = useState(isOpen);
  const [activePage, setActivePage] = useState("suggestion");

  // Page configuration
  const pages = {
    filter: <FilterPage />,
    view: <ViewPage />,
    clear: <ClearFilterPage />,
    suggestion: <SuggestionPage />,
  };

  // Navigation items configuration
  const navigationItems = [
    { key: "filter", icon: Funnel, label: "Filter" },
    { key: "view", icon: Eye, label: "View" },
    { key: "clear", icon: FunnelX, label: "Clear Filter" },
    { key: "suggestion", icon: Blocks, label: "Suggestion" },
  ];

  // Handle drawer animation timing
  useEffect(() => {
    let timer;
    if (isOpen) {
      timer = setTimeout(() => setShowDrawer(true), 100);
    } else {
      timer = setTimeout(() => setShowDrawer(false), 300);
    }
    return () => clearTimeout(timer);
  }, [isOpen]);

  // Handle page navigation
  const handlePageChange = (pageKey) => {
    setActivePage(pageKey);
  };

  // Render navigation button
  const renderNavigationButton = ({ key, icon: Icon, label }) => (
    <button
      key={key}
      onClick={() => handlePageChange(key)}
      className={`text-gray-600 hover:text-yellow-600 transition-colors duration-200 ${activePage === key ? "text-yellow-600" : ""}`}
      aria-label={label}
      title={label}
    >
      <Icon className="w-6 h-6" />
    </button>
  );

  // Early return if drawer should not be visible
  if (!showDrawer && !isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex">
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/30 backdrop-blur-sm transition-opacity duration-1000 ${isOpen ? "opacity-100" : "opacity-0"}`}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer Panel */}
      <div
        className={`fixed top-0 right-0 h-full w-4/5 bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="drawer-title"
      >
        <div className="flex h-full">
          {/* Left Side */}
          <aside className="w-20 bg-gray-50 border-r border-gray-200 flex flex-col items-center pt-5">
            {/* Top Icon */}
            <div className="mb-8">
              <Info className="w-6 h-6 text-yellow-600" aria-hidden="true" />
            </div>

            {/* Navigation Buttons */}
            <nav className="flex flex-col gap-6 mt-8" role="navigation" aria-label="Drawer navigation">
              {navigationItems.map(renderNavigationButton)}
            </nav>
          </aside>

          {/* Right Side */}
          <main className="h-full w-full flex flex-col">
            {/* Header */}
            <header className="flex items-center justify-between mx-5 mt-6 mb-8">
              <div className="inline-block">
                <h1 id="drawer-title" className="text-xl font-bold flex gap-2 pb-1">
                  Lookup
                  <Info className="w-5 h-5 text-yellow-600" aria-hidden="true" />
                </h1>
                <div className="w-12 h-1.5 bg-blue-800 rounded-full" aria-hidden="true" />
              </div>

              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
                aria-label="Close drawer"
                title="Close drawer"
              >
                <X className="w-5 h-5" />
              </button>
            </header>

            {/* Page Content */}
            <div className="flex-1 mx-5 overflow-hidden">{pages[activePage]}</div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Drawer;
