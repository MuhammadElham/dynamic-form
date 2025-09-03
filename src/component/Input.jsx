import React, { useState } from "react";

const Input = ({ config }) => {
  const [value, setValue] = useState("");

  if (!config.visible) return null;

  let inputElement = null;

  if (config.controltype === "TXT") {
    inputElement = (
      <input
        type="text"
        id={config.fieldid}
        name={config.fieldid}
        maxLength={config.inputlength}
        defaultValue={config.defaultvalue}
        style={{ width: config.controlwidth }}
        disabled={config.disable === 1}
        className="border p-2 rounded"
      />
    );
  } else if (config.controltype === "DATE") {
    inputElement = (
      <input
        type="date"
        id={config.fieldid}
        name={config.fieldid}
        defaultValue={config.defaultvalue}
        style={{ width: config.controlwidth }}
        disabled={config.disable === 1}
        className="border p-2 rounded"
      />
    );
  } else if (config.controltype === "NUM") {
    inputElement = (
      <input
        type="number"
        id={config.fieldid}
        name={config.fieldid}
        max={config.inputlength}
        defaultValue={config.defaultvalue}
        style={{ width: config.controlwidth }}
        disabled={config.disable === 1}
        className="border p-2 rounded"
      />
    );
  } else if (config.controltype === "DROPDOWN") {
    inputElement = (
      <select
        id={config.fieldid}
        name={config.fieldid}
        maxLength={config.inputlength}
        defaultValue={config.defaultvalue}
        style={{ width: config.controlwidth }}
        disabled={config.disable === 1}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="border p-2 rounded"
      >
        <option value="">-- Select --</option>
        <option value="INV001">INV001</option>
        <option value="INV002">INV002</option>
        <option value="INV003">INV003</option>
      </select>
    );
  }

  return (
    <div>
      <label htmlFor={config.fieldid} style={{ width: config.labelwidth }}>
        {config.label}
      </label>
      {inputElement}
    </div>
  );
};

export default Input;
