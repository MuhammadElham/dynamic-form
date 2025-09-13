import React, { useState, useMemo } from "react";
import { AgGridReact } from "ag-grid-react";
import { useSelector } from "react-redux";
import { Search } from "lucide-react";

const ScreenGrid = () => {
  const gridHeader = useSelector((state) => state.webConfig.grids.Headers);

  const [menu, setMenu] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });

  // For Icon
  const SearchHeader = ({ label, helpobject }) => (
    <div className="w-full flex items-center justify-between">
      <span>{label}</span>
      {helpobject !== "" && <Search size={16} className="cursor-pointer" />}
    </div>
  );

  const columnDefs = useMemo(() => {
    return gridHeader
      .slice()
      .sort((a, b) => a.columnposition - b.columnposition)
      .map((header) => ({
        headerName: header.label,
        field: header.fieldid,
        editable:true,
        hide:
          !header.visible ||
          header.linedetailfieldposition !== 0 ||
          header.linedetailgroupboxno !== "" ||
          header.fieldid === "opercol",
        minWidth: parseInt(header.inputlength) || header.controlwidth,
        headerComponent: () => <SearchHeader label={header.label} helpobject={header.helpobject} />,
        cellDataType:
          header.applicationcontroltype === "TXT"
            ? "text"
            : header.applicationcontroltype === "AMT" || header.applicationcontroltype === "PRI"
            ? "number"
            : header.applicationcontroltype === "CHK"
            ? "boolean"
            : header.applicationcontroltype === "DTE"
            ? "date"
            : header.applicationcontroltype === "TME"
            ? "dateTime"
            : "text",
      }));
  }, [gridHeader]);

  const rowData = useMemo(() => Array.from({ length: 30 }, () => ({})), []);

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
        <AgGridReact columnDefs={columnDefs} rowData={rowData} onCellClicked={handleCellClick} singleClickEdit={true} />
      </div>
      {/* Display Menu */}
      {/* {menu && (
        <ul
          style={{ top: menuPosition.y, left: menuPosition.x, position: "fixed" }}
          className="bg-white shadow-md rounded-sm border border-gray-400 text-xs font-semibold text-gray-700 z-[1000]"
        >
          {menuItem.map((item) => (
            <li key={item.key} className="px-4 py-2 hover:bg-gray-100 cursor-pointer" onClick={() => setMenu(false)}>
              {item.label}
            </li>
          ))}
        </ul>
      )} */}
    </div>
  );
};

export default ScreenGrid;
