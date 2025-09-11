import React, { useState } from "react";
import { AgGridReact } from "ag-grid-react";
import { useSelector } from "react-redux";

const ScreenGrid = () => {
  const gridHeader = useSelector((state) => state.webConfig.grids.Headers);
  const [menu, setMenu] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });

  const columnDefs = gridHeader.map((header) => ({
    headerName: header.label || header.fieldid,
    field: header.fieldid,
    editable: true,
    hide: header.linedetailgroupboxno !== "",
    cellDataType: header.cellDataType === "STR",
  }));

  const rowData = Array.from({ length: 30 }, () => ({}));

  const menuItem = [
    { key: 0, label: "Add Row" },
    { key: 1, label: "Duplicate Row" },
    { key: 2, label: "Delete Row" },
    { key: 3, label: "Add Attachment" },
    { key: 4, label: "View Attachment" },
  ];

  const handleCellClick = (params) => {
    const x = params.event.clientX;
    const y = params.event.clientY;
    setMenuPosition({ x, y });
    setMenu(true);
  };

  return (
    <div className="relative">
      <div className="ag-theme-alpine" style={{ height: 400 }}>
        <AgGridReact columnDefs={columnDefs} rowData={rowData} onCellClicked={handleCellClick} />
      </div>
     {/* Display Menu */}
      {menu && (
        <ul
          style={{ top: menuPosition.y, left: menuPosition.x, position: "fixed" }} className="bg-white shadow-md rounded-sm border border-gray-400 text-xs font-semibold text-gray-700 z-[1000]">
          {menuItem.map((item) => (
            <li key={item.key} className="px-4 py-2 hover:bg-gray-100 cursor-pointer" onClick={()=> setMenu(false)}>
              {item.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ScreenGrid;
