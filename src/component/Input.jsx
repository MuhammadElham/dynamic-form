import React, { useState } from "react";

const Input = ({ config }) => {
  const [value, setValue] = useState("");

  if (!config.visible) return null;

  const commonProps = {
    id: config.fieldid,
    name: config.fieldid,
    defaultValue: config.defaultvalue,
    style: { width: config.controlwidth },
    disabled: config.disable === 1,
    className: "border p-2 rounded",
  };
  const renderField = {
    TXT: <input type="text" maxLength={config.inputlength} {...commonProps} />,
    DATE: <input type="date" {...commonProps} />,
    NUM: <input type="number" max={config.inputlength} {...commonProps} />,
    DROPDOWN: (
      <select maxLength={config.inputlength} {...commonProps} value={value} onChange={(e) => setValue(e.target.value)}>
        <option value="">-- Select --</option>
        <option value="INV001">INV001</option>
        <option value="INV002">INV002</option>
        <option value="INV003">INV003</option>
      </select>
    ),
  };

  return (
    <div>
      <label htmlFor={config.fieldid} style={{ width: config.labelwidth }}>
        {config.label}
      </label>
      {renderField[config.controltype]}
    </div>
  );
};

export default Input;
