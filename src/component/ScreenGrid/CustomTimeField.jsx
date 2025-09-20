import React, { useEffect, useRef } from "react";

const CustomTimeField = (props) => {
  // save value on every rendering
  const inputRef = useRef();
  // focus on Input
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);
  // getting value from input
  const getValue = () => {
    return inputRef.current.value;
  };
  return (
    <input
      ref={inputRef}
      type="time"
      defaultValue={props.value ? props.value.slice(0, 5) : ""}
      style={{
        width: "100%",
        height: "100%",
        border: "none",
        outline: "none",
      }}
    />
  );
};

export default CustomTimeField;
