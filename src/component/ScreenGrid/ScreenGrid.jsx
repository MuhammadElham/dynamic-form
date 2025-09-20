import React, { useState, useMemo, useRef } from "react";
import { AgGridReact } from "ag-grid-react";
import ContextMenu from "./ContextMenu";
import Button from "./Button";
import CustomTimeField from "./CustomTimeField";
import { useSelector } from "react-redux";
import { Download, Search, Blocks } from "lucide-react";
import _ from "lodash";
import RenderTabs from "./RenderTabs";

const ScreenGrid = () => {
  const gridHeaderRedux = useSelector((state) => state.webConfig.grids.Headers);

  // GridHeader State
  const [gridHeader, setGridHeader] = useState(gridHeaderRedux);

  // Menu State
  const [menuVisible, setMenuVisible] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });
  const gridRef = useRef();

  // Tabs State
  const [showTabs, setShowTabs] = useState(false);
  const [selectedRowData, setSelectedRowData] = useState({});
  const [selectedRow, setSelectedRow] = useState(null);
  const [selectedRowIndex, setSelectedRowIndex] = useState(null);

  // LineDetail State
  const [lineDetailData, setLineDetailData] = useState({});

  // Row
  const [rowData, setRowData] = useState(() => Array.from({ length: 30 }, () => ({})));

  // Condition for linedetailfieldconfig
  const lineDetailFieldConfig = useMemo(() => {
    return _(gridHeaderRedux)
      .filter((item) => item.linedetailgroupboxno !== "")
      .groupBy("linedetailgroupboxno")
      .value();
  }, [gridHeaderRedux]);

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

  // Export Buttons (Function)
  const handleBtnExport = () =>
    gridRef.current.api.exportDataAsCsv({
      fileName: "grid-data.csv",
    });

  const handleBtnSuggestion = () => {
    if (selectedRow) {
      setShowTabs(true);
      // Cleaning the Field Data
      const initialData = {};
      // field_id ko empty karawaya he
      Object.values(lineDetailFieldConfig)
        .flat()
        .forEach((field) => {
          initialData[field.fieldid] = "";
        });
      setLineDetailData(initialData);
    } else {
      alert("Please select a row first!");
    }
  };

  // Selected Row (Function)
  const handleRowClick = (params) => {
    setSelectedRow(params.node);
    setSelectedRowData(params.data);
    setSelectedRowIndex(params.rowIndex);
  };

  // Handle Save (Function)
  const handleSave = () => {
    if (selectedRowIndex !== null) {
      // Update row data with line detail data
      setRowData((prevRowData) => {
        const updatedRowData = [...prevRowData];
        updatedRowData[selectedRowIndex] = {
          ...updatedRowData[selectedRowIndex],
          ...lineDetailData,
        };
        console.log("Row data after save:", updatedRowData[selectedRowIndex]);

        return updatedRowData;
      });

      // Close tabs and reset line detail data
      setShowTabs(false);
      setLineDetailData({});
    } else {
      console.log("No row selected!");
    }
  };

  // handle linedetail
  const handleLineDetailDataChange = (fieldId, value) =>
    setLineDetailData((prev) => ({
      ...prev,
      [fieldId]: value,
    }));

  // // Generate Line ID
  // const generateLineIds = () => {
  //   const existingIds = rowData.map((row) => parseInt(row.lineid)).filter((id) => !isNaN(id));
  //   const maxId = existingIds.length > 0 ? Math.max(...existingIds) : 0;
  //   return (maxId + 1).toString().padStart(3, "0");
  // };

  // //  Check row has already line id
  // const checkAndGenerateLineId = (rowIndex, colField) => {
  //   const currentRow = rowData[rowIndex];
  //   // Col ka Obj nikalo
  //   const columnObj = gridHeader.find((col) => col.fieldid == colField);

  //   if (!columnObj?.ismandatory) {
  //     console.warn(`Line ID not generated: Column '${colField}' is not mandatory.`);
  //     return currentRow.lineid;
  //   }
  //   // lineId check
  //   if (currentRow.lineid) {
  //     return currentRow.lineid;
  //   } else {
  //     const newLineId = generateLineIds();

  //     // Update RowData with NewLineID
  //     setRowData((prevRowData) => {
  //       const newRowData = [...prevRowData];
  //       newRowData[rowIndex] = {
  //         ...newRowData[rowIndex],
  //         lineid: newLineId,
  //       };
  //       return newRowData;
  //     });
  //     return newLineId;
  //   }
  // };

  // handle cell clicked
  // handle cell clicked
  const handleCellClick = (params) => {
    console.log("Cell clicked:", params.rowIndex, params.colDef.field);

    // Step:1 Check if current row already has Line ID
    const currentRow = rowData[params.rowIndex];
    if (currentRow.lineid) {
      console.log("Row already has Line ID:", currentRow.lineid);
      setSelectedRow(params.node);
      setSelectedRowData(params.data);
      setSelectedRowIndex(params.rowIndex);
      return;
    }

    // Step:2 Check if column is mandatory (only if no Line ID)
    const columnObj = gridHeader.find((col) => col.fieldid == params.colDef.field);
    if (!columnObj?.ismandatory) {
      alert("Line ID cannot be generated because this column is not mandatory!");
      return;
    }

    // Step:3 Check previous row is empty
    if (params.rowIndex > 0) {
      const prevRow = rowData[params.rowIndex - 1];
      const isPrevRowEmpty = Object.keys(prevRow).every((val) => val === "" || val === undefined || val === null);

      if (isPrevRowEmpty) {
        alert("Previous row is empty! Please fill it before moving to this row.");
        return;
      }
    }

    // Step:4 Generate new LineID
    const existingIds = rowData.map((row) => parseInt(row.lineid)).filter((id) => !isNaN(id));
    const maxId = existingIds.length > 0 ? Math.max(...existingIds) : 0;
    const lineId = (maxId + 1).toString().padStart(3, "0");

    // Step:5 Update rowData with new line ID
    setRowData((prevRowData) => {
      const newRowData = [...prevRowData];
      newRowData[params.rowIndex] = {
        ...newRowData[params.rowIndex],
        lineid: lineId,
      };
      return newRowData;
    });

    // Step:6 Set the Selected RowData
    setSelectedRow(params.node);
    setSelectedRowData({ ...params.data, lineId });
    setSelectedRowIndex(params.rowIndex);
  };
  // Step:6 Add cell value
  const handleCellValueChanged = (params) => {
    console.log("Cell value changed:", params.rowIndex, params.colDef.field);

    // Check if current row already has Line ID
    const currentRow = rowData[params.rowIndex];
    if (currentRow.lineid) {
      return;
    }

    // Only validate if no Line ID exists
    const columnObj = gridHeader.find((col) => col.fieldid == params.colDef.field);
    if (!columnObj?.ismandatory) {
      alert("Line ID cannot be generated because this column is not mandatory!");
      params.node.setDataValue(params.colDef.field, params.oldValue || "");
      return;
    }

    if (params.rowIndex > 0) {
      const prevRow = rowData[params.rowIndex - 1];
      const isPrevRowEmpty = Object.keys(prevRow).every((val) => val === "" || val === undefined || val === null);

      if (isPrevRowEmpty) {
        alert("Previous row is empty! Please fill it before moving to this row.");
        params.node.setDataValue(params.colDef.field, params.oldValue || "");
        return;
      }
    }
  };

  // menu click
  const handleMenuClick = (action) => {
    setMenuVisible(false);
    if (action == "duplicaterow") {
      duplicateSelectedRow();
    } else if (action == "deleterow") {
      deleteSelectedRow();
    }
  };

  // Duplicate Row - Fixed Version
  const duplicateSelectedRow = () => {
    setRowData((prevData) => {
      const currentRow = prevData[selectedRowIndex];
      if (!currentRow?.lineid || currentRow.lineid.trim() === "") {
        alert("Cannot duplicate this row because it doesn't have Line ID");
        return prevData;
      }

      const newData = [...prevData];
      const rowToDuplicate = { ...newData[selectedRowIndex] };

      // Generate next line ID
      const existingIds = newData.map((row) => parseInt(row.lineid)).filter((id) => !isNaN(id));
      const maxId = existingIds.length > 0 ? Math.max(...existingIds) : 0;
      rowToDuplicate.lineid = (maxId + 1).toString().padStart(3, "0");

      newData.splice(selectedRowIndex + 1, 0, rowToDuplicate);
      return newData;
    });
  };
  // Delete Row
  const deleteSelectedRow = () => {
    setRowData((prevData) => prevData.filter((_, idx) => idx !== selectedRowIndex));
  };
  // Coloumn
  const columnDefs = useMemo(() => {
    return gridHeader
      .slice()
      .sort((a, b) => a.columnposition - b.columnposition)
      .map((header) => {
        const isTimeField = header.applicationcontroltype == "TME";
        return {
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
              : "text",
          cellEditor: isTimeField ? CustomTimeField : undefined,
        };
      });
  }, [gridHeader]);

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
          onCellClicked={handleCellClick}
          onCellValueChanged={handleCellValueChanged}
          onRowClicked={handleRowClick}
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
            <RenderTabs lineDetailFieldConfig={lineDetailFieldConfig} lineDetailData={lineDetailData} onDataChange={handleLineDetailDataChange} />
          ) : (
            <p className="p-4">No detail field available</p>
          )}
          {/* Save & Cancel Button */}
          <div className="flex justify-end gap-2 p-3 border-t border-t-gray-300 bg-gray-50">
            <button className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50 cursor-pointer" onClick={() => setShowTabs(false)}>
              Cancel
            </button>
            <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 cursor-pointer" onClick={handleSave}>
              Save
            </button>
          </div>
        </div>
      )}
      {/* Context Menu */}
      <ContextMenu
        menuVisible={menuVisible}
        menuPosition={menuPosition}
        setMenuVisible={setMenuVisible}
        handleBtnExport={handleBtnExport}
        handleMenuClick={handleMenuClick}
      />
    </div>
  );
};

export default ScreenGrid;
