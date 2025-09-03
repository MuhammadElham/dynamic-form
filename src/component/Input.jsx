import React from "react";

const Input = ({ config }) => {
  const { visible, fieldid, defaultvalue, controlwidth, disable, inputlength, labelwidth, label, controltype } = config;

  if (!visible) return null;

  const commonProps = {
    id: fieldid,
    name: fieldid,
    defaultValue: defaultvalue,
    style: { width: controlwidth },
    disabled: disable === 1,
    className: "border border-gray-500 px-[8px] py-[3px] text-sm rounded-md w-[160px]",
  };

  const renderField = {
    TXT: <input type="text" maxLength={inputlength} {...commonProps} />,
    DATE: <input type="date" {...commonProps} />,
    NUM: <input type="number" max={inputlength} {...commonProps} />,
    DROPDOWN: (
      <select {...commonProps}>
        <option value="">-- Select --</option>
        <option value="INV001">INV001</option>
        <option value="INV002">INV002</option>
        <option value="INV003">INV003</option>
      </select>
    ),
  };

  return (
    <div className="flex gap-3 mb-4">
      <label htmlFor={fieldid} style={{ minWidth: "140px", width: labelwidth }} className="text-sm">
        {label}
      </label>
      {inputlength > 250 && controltype === "TXT" ? <textarea {...commonProps} maxLength={inputlength}></textarea> : renderField[controltype]}
    </div>
  );
};

export default Input;
