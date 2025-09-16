import React from "react";
import { Dropdown } from "antd";

const ContextMenu = ({ menuVisible, menuPosition, setMenuVisible, handleBtnExport }) => {
  // Menu Dataset
  const menu = {
    items: [
      { key: "addrow", label: "Add Row" },
      { key: "duplicaterow", label: "Duplicate Row" },
      { key: "deleterow", label: "Delete Row" },
      { key: "addattachment", label: "Add Attachment" },
      { key: "viewattachment", label: "View Attachment" },
      { key: "exportdata", label: "Export Data", onClick: handleBtnExport },
    ],
  };
  return (
    <>
      {/* Context Menu */}
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
            <div />
          </Dropdown>
        </div>
      )}
    </>
  );
};

export default ContextMenu;
