import React from "react";

const Input = ({ config }) => {
  if (!config.visible) return null;

  const commonProps = {
    id: config.fieldid,
    name: config.fieldid,
    defaultValue: config.defaultvalue,
    style: { width: config.controlwidth },
    disabled: config.disable === 1,
    className: "border border-gray-500 px-[8px] py-[3px] text-sm rounded-md w-full",
  };

  const renderField = {
    TXT: <input type="text" maxLength={config.inputlength} {...commonProps} />,
    DATE: <input type="date" {...commonProps} />,
    NUM: <input type="number" max={config.inputlength} {...commonProps} />,
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
      <label htmlFor={config.fieldid} style={{ width: config.labelwidth }} className="text-sm">
        {config.label}
      </label>
      {config.inputlength > 8 && config.controltype === "TXT" ? (
        <textarea {...commonProps} maxLength={config.inputlength}></textarea>
      ) : (
        renderField[config.controltype]
      )}
    </div>
  );
};

export default Input;
