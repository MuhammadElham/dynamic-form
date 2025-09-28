import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Search } from "lucide-react";
//
import { registerHandleRowSelectFromDrawer } from "../redux/webConfigSlice";
import { openDrawer, closeDrawer } from "../redux/webConfigSlice";

const Input = ({ fieldid, value, onChange, onSearchClick }) => {
  const dispatch = useDispatch();
  const inputFieldConfig = useSelector((state) => state.webConfig.fieldConfig);
  const fieldFromConfig = inputFieldConfig.find((f) => f.fieldid === fieldid);
  const fieldFromHeader = useSelector((state) => state.webConfig.fieldHeaders?.find((f) => f.fieldid === fieldid));
  const fieldHelpGridConfig = useSelector((state) => state.webConfig.helpGridConfig?.Criteria?.find((f) => f.fieldid === fieldid));

  // Priority logic: Header first, then Config
  let field = null;
  let source = "";

  if (fieldHelpGridConfig && fieldHelpGridConfig.displayhelpobject) {
    field = fieldHelpGridConfig;
    source = "CRITERIA";
  } else if (fieldFromHeader) {
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

  //
  const handleRowSelectFromDrawer = ({ selectedRowConfig, selectedRowData }) => {
  
  dispatch(closeDrawer());

  const config = selectedRowConfig[0];
  
  let returnFields = [];
  if (config.multireturn === true) {
    returnFields = config.multireturncolumn.split(",").map((field) => field.trim());
  } else {
    returnFields = [config.singlereturncolumn];
  }

  // Check if current input field matches any return field
  const matchingField = returnFields.find(field => field === fieldid);
  
  if (matchingField && selectedRowData[matchingField]) {
    const selectedValue = selectedRowData[matchingField];

    // Directly update the DOM element
    const inputElement = document.getElementById(fieldid);
    
    if (inputElement) {
      inputElement.value = selectedValue;
      
      // Trigger change event
      const event = new Event('input', { bubbles: true });
      inputElement.dispatchEvent(event);
    } else {
      console.log("❌ Input element not found with id:", fieldid);
    }
  } else {
    console.log("❌ No matching field or no value found");
  }
};
  // const handleRowSelectFromDrawer = ({ selectedRowConfig, selectedRowData }) => {
  //   dispatch(closeDrawer());

  //   console.log("selectedRowData = ", selectedRowData);

  //   // Step 1: Get config (first item from array)
  //   const config = selectedRowConfig[0];

  //   // Step 2: Determine return fields based on multireturn flag
  //   let returnFields = [];
  //   if (config.multireturn === true) {
  //     // Split comma-separated string: "fullnamelang,name" -> ["fullnamelang", "name"]
  //     returnFields = config.multireturncolumn.split(",").map((field) => field.trim());
  //   } else {
  //     // Single return: ["employeeno"]
  //     returnFields = [config.singlereturncolumn];
  //   }

  //   // Build Data for Input Field
  //   const dataToUpdate = [];
  //   returnFields.forEach((field) => {
  //     const mainGridColumn = inputFieldConfig.find((header) => header.fieldid == field);
  //     dataToUpdate[field] = selectedRowData[field];
  //     // dataToUpdate = [employeeno: '03000001']
  //   });

  //   if (onChange) {
  //     onChange(selectedValue);
  //   } else {
  //     commonProps.readOnly = false;
  //   }
  // };
  React.useEffect(() => {
    dispatch(registerHandleRowSelectFromDrawer(handleRowSelectFromDrawer));
  }, [dispatch, handleRowSelectFromDrawer]);

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
          <button onClick={() => onSearchClick && onSearchClick()} className="p-1 border rounded hover:bg-gray-100 cursor-pointer">
            <Search size={16} />
          </button>
        )}
      </div>
    </div>
  );
};

export default Input;
