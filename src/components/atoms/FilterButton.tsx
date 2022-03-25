import React from "react";

const FilterButton = ({
  onClick,
  active,
  children,
}: {
  onClick: React.MouseEventHandler;
  active: boolean;
  children: string;
}) => {
  return (
    <button
      className={active ? "text-blue-500 pl-4" : "text-gray-500 pl-4"}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default FilterButton;
