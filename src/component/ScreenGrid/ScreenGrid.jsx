import React, { useState, useMemo } from "react";
import { AgGridReact } from "ag-grid-react";
import { useSelector } from "react-redux";
import { Search } from "lucide-react";
import { Dropdown } from "antd";

const ScreenGrid = () => {
  const gridHeader = useSelector((state) => state.webConfig.grids.Headers);

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
        editable: true,
        hide: !header.visible || header.linedetailfieldposition !== 0 || header.linedetailgroupboxno !== "" || header.fieldid === "opercol",
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
  // Row
  const rowData = useMemo(() => Array.from({ length: 30 }, () => ({})), []);

  // Menu
  const [menuVisible, setMenuVisible] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });

  const menu = {
    items: [
      { key: "addrow", label: "Add Row" },
      { key: "duplicaterow", label: "Duplicate Row" },
      { key: "deleterow", label: "Delete Row" },
      { key: "addattachment", label: "Add Attachment" },
      { key: "viewattachment", label: "View Attachment" },
    ],
  };

  const handleCellContextMenu = (params) => {
    setMenuPosition({ x: params.event.clientX, y: params.event.clientY });
    setMenuVisible(true);
  };

  return (
    <div className="relative">
      <div className="ag-theme-alpine" style={{ height: 400 }} onContextMenu={(e) => e.preventDefault()}>
        <AgGridReact columnDefs={columnDefs} rowData={rowData} singleClickEdit={true} onCellContextMenu={handleCellContextMenu} />
      </div>
      {/* Display Menu */}
      {menuVisible && (
        <div
          style={{
            position: "fixed",
            top: menuPosition.y,
            left: menuPosition.x,
            zIndex: 1000,
            borderRadius: "4px", // less rounded
            width: "180px", // increase width
            overflow: "hidden",
            boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
          }}
        >
          <Dropdown menu={menu} open={true} trigger={[]} onOpenChange={() => setMenuVisible(false)}>
            {/* aik child ka hona lazmi he */}
            <div />
          </Dropdown>
        </div>
      )}
    </div>
  );
};

export default ScreenGrid;
