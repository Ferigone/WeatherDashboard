import React from "react";

const Temperature = ({ children }: { children: string }) => {
  return (
    <p className="text-5xl font-thin  text-gray-500 dark:text-gray-300 ordinal slashed-zero tabular-nums">
      {children}°C
    </p>
  );
};

export default Temperature;
