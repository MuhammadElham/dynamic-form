import React, { useEffect, useMemo, useState } from "react";
import Employee from "./Employee";
import ResignedEmployee from "./ResignedEmployee";
import { useSelector } from "react-redux";

const SuggestionPage = () => {
  const helpGridConfig = useSelector((state) => state.webConfig.helpGridConfig);
  // console.log(helpGridConfig.LinkHelp.map((item) => console.log("Item = ",item) || []));

  const [activePage, setActivePage] = useState("");

  const tabs = useMemo(() => {
    const mainTab = {
      key: "mainTab",
      text: helpGridConfig?.Grid?.Config[0].helpname,
    };

    const otherTab =
      helpGridConfig?.LinkHelp?.map((item) => ({
        key: item.linkhelpobject,
        text: item.stxt,
      })) || [];

    return [mainTab, ...otherTab];
  }, [helpGridConfig]);

  useEffect(() => {
    if (tabs.length > 0 && !activePage) {
      setActivePage(tabs[0].key);
    }
  }, [tabs, activePage]);

  // const page = { employee: <Employee />, resignedEmployee: <ResignedEmployee /> };

  // const menuItem = [
  //   { key: "employee", text: "Employee" },
  //   { key: "resignedEmployee", text: "Resigned Employee" },
  // ];

  return (
    <div>
      <div className="flex border-b-3 border-blue-800 bg-white gap-2">
        {tabs.map(({ key, text }) => (
          <button
            key={key}
            onClick={() => setActivePage(key)}
            className={`px-4 py-2 rounded-t-lg font-medium text-base transition-colors duration-200 ${
              activePage === key ? "bg-blue-50 text-blue-800" : "text-gray-500 hover:text-gray-700"
            }`}
          >
            {text}
          </button>
        ))}
      </div>
      {/* Content Page */}
      {/* <div className="mt-6">{page[activePage]}</div> */}
    </div>
  );
};

export default SuggestionPage;
