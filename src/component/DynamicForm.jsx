import React, { useState } from "react";
import Input from "./Input";
import { fieldConfig } from "../assets/assets.js";

const DynamicForm = () => {
  const [formData, setFormData] = useState({});

  const handleChange = (fieldId, value) => {
    setFormData((prev) => ({
      ...prev,
      [fieldId]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data = ", formData);
  };

  return (
    <div className="p-14">
      <div className="bg-white p-7">
        <form onSubmit={handleSubmit}>
          {fieldConfig.map((field) => {
            if (field.type === "heading") {
              return (
                <h1 key={`heading-${field.index}`} className="text-2xl font-bold mb-8">
                  {field.label}
                </h1>
              );
            }
            return <Input key={field.tabindex} config={field} onChange={handleChange} />;
          })}
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded mt-6 cursor-pointer">
            Save
          </button>
        </form>
      </div>
    </div>
  );
};

export default DynamicForm;
