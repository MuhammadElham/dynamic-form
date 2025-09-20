import React from "react";
import { useSelector } from "react-redux";
import { Search } from "lucide-react";

const Input = ({ fieldid, value, onChange }) => {
  const fieldFromConfig = useSelector((state) => state.webConfig.fieldConfig?.find((f) => f.fieldid === fieldid));
  const fieldFromHeader = useSelector((state) => state.webConfig.fieldHeaders?.find((f) => f.fieldid === fieldid));

  // Priority logic: Header first, then Config
  let field = null;
  let source = "";

  if (fieldFromHeader) {
    field = fieldFromHeader;
    source = "HEADER";
  } else if (fieldFromConfig) {
    field = fieldFromConfig;
    source = "CONFIG";
  }

  // Early return if no field found
  if (!field) {
    console.warn(`❌ Field "${fieldid}" not found in any source`);
    return null;
  }

  const { label, defaultvalue, controlwidth, disable, inputlength, controltype, displayhelpobject } = field;

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

  // Handle controlled component
  if (value !== undefined && onChange) {
    commonProps.value = value;
    commonProps.onChange = (e) => onChange(e.target.value);
    delete commonProps.defaultValue;
  }

  const renderField = {
    TXT: <input type="text" maxLength={inputlength} {...commonProps} />,
    DTE: <input type="date" {...commonProps} />,
    NUM: <input type="number" max={inputlength} {...commonProps} />,
  };

  return (
    <div className="flex gap-3 mb-4" data-source={source}>
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
          <button className="p-1 border rounded hover:bg-gray-100 cursor-pointer">
            <Search size={16} />
          </button>
        )}
      </div>
    </div>
  );
};

export default Input;
