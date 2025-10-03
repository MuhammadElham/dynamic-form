import { AgGridReact } from "ag-grid-react";
import React, { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";

const TabGrid = () => {
  const inputGridConfig = useSelector((state) => state.webConfig.inputGridConfig);
  // import fn from Redux
  const handleRowSelectFromDrawer = useSelector((state) => state.webConfig.handleRowSelectFromDrawerFn);

  const columnDefs = useMemo(() => {
    return (
      inputGridConfig?.Grid?.Header?.map((header) => ({
        headerName: header.ColumnText,
        field: header.ColumnID,
        minWidth: parseInt(header.ColumnWidth) || header.ColumnWidth,
        cellDataType:
          header.controltype === "TXT"
            ? "text"
            : header.controltype === "UNK"
            ? "text"
            : header.controltype === "AMT" || header.controltype === "PRI"
            ? "number"
            : header.controltype === "CHK"
            ? "boolean"
            : header.controltype === "DTE"
            ? "date"
            : "text",
        valueFormatter:
          header.controltype === "DTE"
            ? (para) => {
                if (!para.value) return "";
                const date = new Date(para.value);
                return date.toLocaleDateString("en-GB");
              }
            : undefined,
      })) || []
    );
  }, [inputGridConfig]);

  const rowData = useMemo(() => {
    return inputGridConfig?.Grid?.Detail || [];
  }, [inputGridConfig]);

  const handleRowDoubleClick = (params) => {
    // CallBack Function
    if (handleRowSelectFromDrawer) {
      handleRowSelectFromDrawer({
        selectedRowConfig: inputGridConfig?.Grid?.Config,
        selectedRowData: params.data,
      });
    }
  };

  return (
    <div className="ag-theme-alpine" style={{ height: 400 }}>
      <AgGridReact columnDefs={columnDefs} rowData={rowData} onRowDoubleClicked={handleRowDoubleClick} rowSelection="single" />
    </div>
  );
};

export default TabGrid;
