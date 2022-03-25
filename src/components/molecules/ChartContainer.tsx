import React from "react";
import LineChart from "./../atoms/LineChart";
import FilterTitle from "./../atoms/FilterTitle";
import FilterButton from "./../atoms/FilterButton";

import { CitiesContext } from "./../../contexts/Cities";

const ChartContainer = () => {
  const [state, dispatch] = React.useContext(CitiesContext);
  return (
    <div className="w-full">
      <div className="dark:bg-gray-700 w-full flex flex-row items-center pt-4 px-4">
        <FilterTitle>Ostatnie 14 dni</FilterTitle>
        <FilterButton
          active={state.chartType === "temperature"}
          onClick={() => {
            dispatch({ type: "set_chartType", chartType: "temperature" });
          }}
        >
          Wszystkie
        </FilterButton>
        <FilterButton
          active={state.chartType === "temperature/max"}
          onClick={() => {
            dispatch({ type: "set_chartType", chartType: "temperature/max" });
          }}
        >
          Maksymalne
        </FilterButton>
      </div>
      <LineChart />
    </div>
  );
};

export default ChartContainer;
