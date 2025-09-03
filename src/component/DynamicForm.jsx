import React from "react";
import Input from "./Input";
import { fieldConfig } from "../assets/assets.js";

const DynamicForm = () => {
  return (
    <div className="p-20">
      <form>
        {fieldConfig.map((field) => {
          if (field.type === "heading") {
            return <h1 className="text-2xl font-bold mb-8">{field.label}</h1>;
          }
          return <Input key={field.tabindex} config={field} />;
        })}
      </form>
    </div>
  );
};

export default DynamicForm;
