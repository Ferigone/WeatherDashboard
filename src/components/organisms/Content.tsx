import React from "react";
import CityContainer from "../molecules/CityContainer";
import ChartContainer from "../molecules/ChartContainer";

const Content = () => {

  return (
    <div className="container flex flex-col items-center flex-wrap w-full">
      <CityContainer />
      <ChartContainer />
    </div>
  );
};

export default Content;
