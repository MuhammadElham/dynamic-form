import React from "react";

const Button = ({ onClick, Icon, text }) => {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-2 px-3 py-2 border border-gray-300 rounded hover:bg-gray-50 mb-4 text-sm font-medium cursor-pointer"
    >
      {Icon && <Icon size={16} />}  {/* ✅ Now works */}
      {text && <span>{text}</span>}
    </button>
  );
};

export default Button;
