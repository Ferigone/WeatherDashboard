import React from "react";

const CityName = ({ children }: { children: string }) => {
  return (
    <h3 className="text-2xl sm:text-xl text-gray-700 font-semibold dark:text-white">
      {children}
    </h3>
  );
};

export default CityName;
