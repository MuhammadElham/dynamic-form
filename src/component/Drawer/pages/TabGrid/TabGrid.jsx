import { AgGridReact } from "ag-grid-react";
import React, { useMemo } from "react";
import { useSelector } from "react-redux";

const TabGrid = ({ onRowDoubleClick }) => {
  const helpGridConfig = useSelector((state) => state.webConfig.helpGridConfig);

  const columnDefs = useMemo(() => {
    return (
      helpGridConfig?.Grid?.Header?.map((header) => ({
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
  }, [helpGridConfig]);

  const rowData = useMemo(() => {
    return helpGridConfig?.Grid?.Detail || [];
  }, [helpGridConfig]);

  const handleRowDoubleClick = (params) => {
    // CallBack Function
    if (onRowDoubleClick) {
      onRowDoubleClick({
        selectedRowConfig: helpGridConfig?.Grid?.Config,
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
