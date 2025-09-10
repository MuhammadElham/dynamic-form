import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Search } from "lucide-react";
import MyGrid from "./MyGrid";
import HelpGrid from "./HelpGrid/HelpGrid";

const Input = ({ fieldid }) => {
  const field = useSelector((state) => state.webConfig.config?.find((f) => f.fieldid === fieldid));

  if (!field) return null;
  const { label, defaultvalue, controlwidth, disable, inputlength, controltype, displayhelpobject } = field;
  const [showGrid, setShowGrid] = useState(false);
  const finalWidth = controlwidth > 160 ? controlwidth : 160;

  const commonProps = {
    id: fieldid,
    name: fieldid,
    defaultValue: defaultvalue,
    disabled: disable === 1,
    className: "border border-gray-500 px-[8px] py-[3px] text-sm rounded-sm",
    style: { width: finalWidth },
    readOnly: displayhelpobject ? true : false,
  };

  const renderField = {
    TXT: <input type="text" maxLength={inputlength} {...commonProps} />,
    DTE: <input type="date" {...commonProps} />,
    NUM: <input type="number" max={inputlength} {...commonProps} />,
  };

  return (
    <>
      <div className="flex gap-3 mb-4">
        <label htmlFor={fieldid} className="text-sm min-w-[140px]">
          {label}
        </label>
        <div className="flex items-center gap-2">
          {inputlength > 250 && controltype === "TXT" ? (
            <textarea {...commonProps} style={{ width: finalWidth, height: "150px" }} />
          ) : (
            renderField[controltype]
          )}
          {displayhelpobject && (
            <button onClick={() => setShowGrid(!showGrid ? true : false)} className="p-1 border rounded hover:bg-gray-100 cursor-pointer">
              <Search size={16} />
            </button>
          )}
        </div>
      </div>
      {showGrid && (
        <div className="my-4 border p-3 rounded shadow">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-sm font-bold">Search Results</h2>
            <button className="text-red-500 text-xs font-semibold cursor-pointer" onClick={() => setShowGrid(false)}>
              Close
            </button>
          </div>
          <HelpGrid />
        </div>
      )}
    </>
  );
};
export default Input;
