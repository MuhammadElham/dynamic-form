import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Search } from "lucide-react";
//
import { registerHandleRowSelectFromDrawer, setActiveField, setActiveDrawerConfig } from "../redux/webConfigSlice";
import { openDrawer, closeDrawer } from "../redux/webConfigSlice";

const Input = ({ fieldid, value, onChange }) => {
  const dispatch = useDispatch();
  const inputFieldConfig = useSelector((state) => state.webConfig.fieldConfig);
  const fieldFromConfig = inputFieldConfig.find((f) => f.fieldid === fieldid);
  const fieldFromHeader = useSelector((state) => state.webConfig.fieldHeaders?.find((f) => f.fieldid === fieldid));
  const fieldInputGridConfig = useSelector((state) => state.webConfig.inputGridConfig?.Criteria?.find((f) => f.fieldid === fieldid));
  //
  const drawerConfig = useSelector((state) => state.webConfig.inputGridConfig.Criteria);

  // Priority logic: Header first, then Config
  let field = null;
  let source = "";

  if (fieldInputGridConfig && fieldInputGridConfig.displayhelpobject) {
    field = fieldInputGridConfig;
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

  // Function of Drawer row selection
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
    const matchingField = returnFields.find((field) => field === fieldid);

    if (matchingField && selectedRowData[matchingField]) {
      const selectedValue = selectedRowData[matchingField];

      // Directly update the DOM element
      const inputElement = document.getElementById(fieldid);

      if (inputElement) {
        inputElement.value = selectedValue;

        // Trigger change event
        const event = new Event("input", { bubbles: true });
        inputElement.dispatchEvent(event);
      } else {
        console.log("❌ Input element not found with id:", fieldid);
      }
    } else {
      console.log("❌ No matching field or no value found");
    }
  };
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
          <button
            onClick={() => {
              dispatch(setActiveField(fieldid));
              const config = drawerConfig.find((item) => item.displayhelpobject == displayhelpobject);

              if (config) {
                dispatch(setActiveDrawerConfig(config));
                dispatch(openDrawer());
              } else {
                console.log(`Config "${displayhelpobject}" not found`);
              }
            }}
            className="p-1 border rounded hover:bg-gray-100 cursor-pointer"
          >
            <Search size={16} />
          </button>
        )}
      </div>
    </div>
  );
};

export default Input;
