import React, { useState } from "react";
import Input from "./Input";
import TextDisplay from "./TextDisplay";
import Drawer from "./Drawer/Drawer";
import { useDispatch, useSelector } from "react-redux";
import { openDrawer, closeDrawer } from "../redux/webConfigSlice";

const DynamicForm = () => {
  const dispatch = useDispatch();
  const isDrawerOpen = useSelector((state) => state.webConfig.isOpen);

  return (
    <div className="p-12">
      <div className="bg-white shadow-md p-7 rounded-md">
        <Input fieldid="purchaseorderno" onSearchClick={() => dispatch(openDrawer(),closeDrawer())} />
        <Input fieldid="purchasetype" onSearchClick={() => dispatch(openDrawer())} />
        <TextDisplay text="GRBPSPOGRB09" />
        <Input fieldid="purchaseaccount" onSearchClick={() => dispatch(openDrawer())} />
        <Input fieldid="invoiceaccount" onSearchClick={() => dispatch(openDrawer())} />
        <Input fieldid="invoiceaddressid" onSearchClick={() => dispatch(openDrawer())} />
        <TextDisplay text="GRBPSPOGRB10" />
        <Input fieldid="postingdate" onSearchClick={() => dispatch(openDrawer())} />
        <Input fieldid="requireddate" onSearchClick={() => dispatch(openDrawer())} />
        <Input fieldid="notes" onSearchClick={() => dispatch(openDrawer())} />
        <TextDisplay text="GRBPSPOGRB02" />
        <Input fieldid="deliverytermno" onSearchClick={() => dispatch(openDrawer())} />
        <Input fieldid="deliverymodeno" onSearchClick={() => dispatch(openDrawer())} />
        <Input fieldid="contactno" onSearchClick={() => dispatch(openDrawer())} />
        <Input fieldid="deliveryaddress" onSearchClick={() => dispatch(openDrawer())} />
        <Input fieldid="employeeno" onSearchClick={() => dispatch(openDrawer())} />
      </div>
      {isDrawerOpen && <Drawer isOpen={isDrawerOpen} onClose={() => dispatch(closeDrawer())} />}
    </div>
  );
};

export default DynamicForm;
