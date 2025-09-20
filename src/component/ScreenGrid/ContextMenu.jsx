import React, { useEffect, useRef } from "react";
import { Dropdown } from "antd";

const ContextMenu = ({ menuVisible, menuPosition, setMenuVisible, handleBtnExport, handleMenuClick }) => {
  const menuRef = useRef(null);
  // Closing Outside Click
  useEffect(() => {
    if (!menuVisible) return;

    const handleClickOutSide = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuVisible(false);
      }
    };
    // Detect Outside
    document.addEventListener("click", handleClickOutSide);
    return () => document.removeEventListener("click", handleClickOutSide);
  }, [menuVisible]);
  // Menu Dataset
  const menu = {
    items: [
      { key: "addrow", label: "Add Row", onClick: () => handleMenuClick("addrow") },
      { key: "duplicaterow", label: "Duplicate Row", onClick: () => handleMenuClick("duplicaterow") },
      { key: "deleterow", label: "Delete Row", onClick: () => handleMenuClick("deleterow") },
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
          ref={menuRef}
          style={{
            position: "fixed",
            top: menuPosition.y,
            left: menuPosition.x,
            zIndex: 1000,
            borderRadius: "4px",
            width: "180px",
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
