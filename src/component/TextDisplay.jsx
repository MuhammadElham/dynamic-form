import React from "react";
import { useSelector } from "react-redux";

const TextDisplay = ({ text }) => {
  const translations = useSelector((state) => state.webConfig.translation?.find((t) => t.controlkey === text));
  return <h2 className="text-lg font-bold mb-4">{translations.translation}</h2>;
};

export default TextDisplay;
