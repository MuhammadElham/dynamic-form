import React from "react";
import { AgGridReact } from "ag-grid-react";
import { useSelector } from "react-redux";

const ScreenGrid = () => {
  const gridHeader = useSelector((state) => state.webConfig.grids.Headers);
  
  const columnDefs = gridHeader.map((header) => ({
    headerName: header.label || header.fieldid,
    field: header.fieldid,
    editable: true,
    hide: header.linedetailgroupboxno !== "",
    cellDataType: header.cellDataType === "STR",
  }));
  
  const rowData = Array.from({ length: 30 }, () => ({}));

  return (
    <div className="ag-theme-alpine" style={{ height: 400 }}>
      <AgGridReact columnDefs={columnDefs} rowData={rowData} />
    </div>
  );
};

export default ScreenGrid;
