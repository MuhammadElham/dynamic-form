import React from "react";
import { useSelector } from "react-redux";
import Input from "../../Input";

const FilterPage = () => {
  const helpGridConfig = useSelector((state) => state.webConfig.helpGridConfig.Criteria);

  return (
    <div>
      <div className="mx-5">
        {helpGridConfig.map((item, key) => (
          <Input key={key} fieldid={item.fieldid} />
        ))}
      </div>
      <div className="flex items-center justify-end gap-5 mr-7 mt-30">
        <button className="px-5 py-1 text-sm border border-gray-400 outline-none text-gray-400 bg-gray-100 rounded">Clear All</button>
        <button className="px-6 py-1.5 text-sm border outline-none text-white bg-blue-800 rounded">Load</button>
      </div>
    </div>
  );
};

export default FilterPage;
