// import { AgGridReact } from "ag-grid-react";
// import React, { useState } from "react";
// import { useSelector } from "react-redux";
// import { themeQuartz } from "ag-grid-community";

// const MyGrid = () => {
//   const grids = useSelector((state) => state.webConfig.grids);
//   const [rowData, setRowData] = useState(JSON.parse(JSON.stringify(grids)));
//   const [colData, setColData] = useState([
//     { field: "name", flex: 1, headerName: "Full Name", filter: true, floatingFilter: true, editable: true, checkboxSelection: true },
//     { field: "email", flex: 1, headerName: "Email", filter: true, floatingFilter: true },
//     { field: "phone", flex: 1, headerName: "Phone", filter: true, floatingFilter: true },
//     { field: "section", flex: 1, headerName: "Section", filter: true, floatingFilter: true },
//     { field: "age", flex: 1, headerName: "Age", filter: true, floatingFilter: true },
//     { field: "date_of_birth", flex: 1, headerName: "Date of Birth", filter: true, floatingFilter: true },
//     { field: "date_of_admission", flex: 1, headerName: "Date of Admission", filter: true, floatingFilter: true },
//     {
//       headerName: "Address",
//       valueGetter: ({ data }) => {
//         const { state, street, pincode, city } = data.address;
//         return `${state},${street},${pincode},${city}`;
//       },
//       flex: 1,
//       filter: true,
//       floatingFilter: true,
//     },
//   ]);

//   return (
//     <div theme={themeQuartz} style={{ height: 500 }}>
//       <AgGridReact
//         rowData={rowData}
//         columnDefs={colData}
//         rowSelection={"multiple"}
//         pagination={true}
//         paginationPageSize={5}
//         paginationPageSizeSelector={[5, 10, 15, 20]}
//       />
//     </div>
//   );
// };

// export default MyGrid;
