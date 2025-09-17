import React, { useState, useMemo, useRef } from "react";
import { AgGridReact } from "ag-grid-react";
import ContextMenu from "./ContextMenu";
import Button from "./Button";
import { useSelector } from "react-redux";
import { Download, Search, Blocks } from "lucide-react";
import _ from "lodash";
import RenderTabs from "./RenderTabs";

const ScreenGrid = () => {
  const gridHeader = useSelector((state) => state.webConfig.grids.Headers);
  // Menu State
  const [menuVisible, setMenuVisible] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });
  const gridRef = useRef();
  // Tabs State
  const [showTabs, setShowTabs] = useState(true);
  const [selectedRowData, setSelectedRowData] = useState({});
  const [selectedRow, setSelectedRow] = useState(null);

  // Condition for linedetailfieldconfig
  const lineDetailFieldConfig = _(gridHeader)
    .filter((item) => !item.linedetailgroupboxno == "")
    .groupBy("linedetailgroupboxno")
    .value();
  // Search Icon (Function)
  const SearchHeader = ({ label, helpobject }) => (
    <div className="w-full flex items-center justify-between">
      <span>{label}</span>
      {helpobject !== "" && <Search size={16} className="cursor-pointer" />}
    </div>
  );
  // Context Menu (Function)
  const handleCellContextMenu = (params) => {
    setMenuPosition({ x: params.event.clientX, y: params.event.clientY });
    setMenuVisible(true);
  };
  // Buttons (Function)
  const handleBtnExport = () =>
    gridRef.current.api.exportDataAsCsv({
      fileName: "grid-data.csv",
    });
  const handleBtnSuggestion = () => {
    if (selectedRow) {
      setShowTabs(true);
    } else {
      alert("Please select a row first!");
    }
  };
  // Coloumn
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

  return (
    <div className="relative">
      {/* Export */}
      <div className="flex items-center gap-2">
        <Button onClick={handleBtnExport} Icon={Download} text="Export to CSV" />
        <Button onClick={handleBtnSuggestion} Icon={Blocks} text="Suggestion" />
      </div>
      {/* Ag Grid */}
      <div className="ag-theme-alpine" style={{ height: 400 }} onContextMenu={(e) => e.preventDefault()}>
        <AgGridReact
          ref={gridRef}
          columnDefs={columnDefs}
          rowData={rowData}
          singleClickEdit={true}
          onCellContextMenu={handleCellContextMenu}
          rowSelection="single"
          rowHeight={45}
        />
      </div>
      {/* Line Details */}
      {showTabs && (
        <div className="mt-4 border border-gray-300">
          {/* Heading */}
          <div className="flex items-center justify-between p-3 bg-gray-50 border-b border-b-gray-300 font-medium">
            <h3>Line Details</h3>
            <button onClick={() => setShowTabs(false)} className="cursor-pointer text-gray-500 hover:text-gray-700 text-xl">
              x
            </button>
          </div>
          {/* Fields */}
            {Object.keys(lineDetailFieldConfig).length > 0 ? (
              <RenderTabs lineDetailFieldConfig={lineDetailFieldConfig} />
            ) : (
              <p className="p-4">No detail field available</p>
            )}
          {/* Save & Cancel Button */}
          <div className="flex justify-end gap-2 p-3 border-t border-t-gray-300 bg-gray-50">
            <button className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50 cursor-pointer" onClick={() => setShowTabs(false)}>
              Cancel
            </button>
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 cursor-pointer"
              onClick={() => {
                console.log("Saved Data = ", selectedRowData), setShowTabs(false);
              }}
            >
              Save
            </button>
          </div>
        </div>
      )}
      {/* Context Menu */}
      <ContextMenu menuVisible={menuVisible} menuPosition={menuPosition} setMenuVisible={setMenuVisible} handleBtnExport={handleBtnExport} />
    </div>
  );
};

export default ScreenGrid;
