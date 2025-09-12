import React, { useState } from "react";
import { AgGridReact } from "ag-grid-react";
import { useSelector } from "react-redux";
import { Search } from "lucide-react";

const ScreenGrid = () => {
  const gridHeader = useSelector((state) => state.webConfig.grids.Headers);

  const [menu, setMenu] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });

  const columnDefs = gridHeader.map((header) => ({
    headerName: header.label,
    field: header.fieldid,
    editable: true,
    hide: !(header.linedetailgroupboxno === "" || header.visible === true ) || header.fieldid === "opercol",
    minWidth: header.controlwidth,
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

  // ---- Other ----
  // fieldid: item?.fieldid,
  // flexobject: item?.flexobject,
  // label: item?.label,
  // headerName: item.label,
  // ...(item.helpobject !== "" && {
  //   headerComponent: (params) => {
  //     return (
  //       <p
  //         className="font-R-SemiBold font-xs "
  //         style={{
  //           width: "100%",
  //           fontSize: "12.2px",
  //           display: "flex",
  //           flexDirection: "row",
  //           justifyContent: "space-between",
  //           alignItems: "center",
  //         }}
  //       >
  //         {params.displayName}
  //         <span>
  //           <Search size={16} />
  //         </span>
  //       </p>
  //     );
  //   },
  // }),
  // inputlength: item?.inputlength,
  // columnposition: item?.columnposition,
  // controltype: item?.controltype,
  // controlwidth: item?.controlwidth,
  // enable: item?.enable,
  // helpobject: item?.helpobject,
  // helpwhere: item?.helpwhere,
  // linedetailfieldposition: item?.linedetailfieldposition,
  // linedetailgroupboxno: item?.linedetailgroupboxno,
  // visible: item?.visible,
  // minWidth: parseInt(item.inputlength),
  // filter: this?.props?.customGridConfig?.gridActions?.toggleFilter,
  // floatingFilter: this?.props?.customGridConfig?.gridActions?.toggleFilter,
  // hide: !item?.visible || item?.linedetailfieldposition !== 0 || item?.linedetailgroupboxno !== "" || (item.fieldid == "lineid" && true),
  // ...(item.helobject !== "" && { onCellDoubleClicked: (event) => this.handleRowDoubleClicked(event, item, flexobject) }),
  // cellEditor: item.editable ? "agTextCellEditor" : undefined,
  // cellDataType:
  //   item.controltype === "TXT"
  //     ? "text"
  //     : item.controltype === "AMT" || item.controltype === "PRI" || item.controltype === "NUM"
  //     ? "number"
  //     : item.controltype === "CHK"
  //     ? "boolean"
  //     : item.controltype === "DTE"
  //     ? "dateString"
  //     : "text",

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
