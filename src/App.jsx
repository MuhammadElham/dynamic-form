import React from "react";
import DynamicForm from "./component/DynamicForm";
import ScreenGrid from "./component/ScreenGrid/ScreenGrid";
import HelpGrid from "./component/HelpGrid/HelpGrid";

function App() {
  return (
    <>
      <div className="w-full h-full bg-blue-50 ">
        <DynamicForm />
        <div className="p-12">
          <div className="bg-white shadow-md p-7 rounded-md">
            <HelpGrid />
          </div>
        </div>
        <div className="p-12">
          <div className="bg-white shadow-md p-7 rounded-md">
            <ScreenGrid />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
