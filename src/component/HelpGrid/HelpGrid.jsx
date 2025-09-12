import React, { useMemo } from "react";
import { AgGridReact } from "ag-grid-react";
import { useSelector } from "react-redux";

const HelpGrid = () => {
  const gridConfig = useSelector((state) => state.webConfig.grids?.Config?.[0]);
  const gridHeader = useSelector((state) => state.webConfig.grids?.Headers);
  
  // Row Selection
  const rowSelection = useMemo(() => {
    return {
      mode: "multiRow",
    };
  }, []);
  
  const rowData = useMemo(() => {
    if (!gridHeader.length) return [];

    return Array.from({ length: 10 }, (_, rowIndex) => {
      const row = {};
      gridHeader.forEach((header, colIndex) => {
        row[header.fieldid] = `Row${rowIndex + 1}-Col${colIndex + 1}`;
      });
      return row;
    });
  }, [gridHeader, gridConfig]);

  const columnDefs = gridHeader.map((header) => ({
    headerName: header.label || header.fieldid,
    field: header.fieldid,
    filter: true,
    floatingFilter: true,
    sortable: true,
    resizable: true,
    editable:true
  }));

  return (
    <div className="ag-theme-alpine" style={{ height: 400, width: "100%" }}>
      <AgGridReact
        rowData={rowData}
        columnDefs={columnDefs}
        pagination={true}
        paginationPageSize={5}
        paginationPageSizeSelector={[5, 10]}
        rowSelection={rowSelection}
      />
    </div>
  );
};

export default HelpGrid;
