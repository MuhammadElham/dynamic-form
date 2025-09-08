import React from "react";
import Input from "./Input";
import TextDisplay from "./TextDisplay";

const DynamicForm = () => {
  return (
    <div className="p-12">
      <div className="bg-white shadow-md p-7 rounded-md">
        <Input fieldid="purchaseorderno" />
        <Input fieldid="purchasetype" />
        <TextDisplay text="GRBPSPOGRB09" />
        <Input fieldid="purchaseaccount" />
        <Input fieldid="invoiceaccount" />
        <Input fieldid="invoiceaddressid" />
        <TextDisplay text="GRBPSPOGRB10" />
        <Input fieldid="postingdate" />
        <Input fieldid="requireddate" />
        <Input fieldid="notes" />
        {/* <TextDisplay text="GRBPSPOGRB02" />
        <Input fieldid="deliverytermno" />
        <Input fieldid="deliverymodeno" />
        <Input fieldid="contactno" />
        <Input fieldid="deliveryaddress" /> */}
      </div>
    </div>
  );
};

export default DynamicForm;
