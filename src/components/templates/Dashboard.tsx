import React, { useEffect } from "react";
import Header from "./../organisms/Header";
import Content from "./../organisms/Content";

import { CitiesContext } from "./../../contexts/Cities";

const API_URL = process.env.REACT_APP_API_URL;

interface CityProps {
  id: number;
  name: string;
  displayName: string;
}

const Dashboard = () => {
  const [state, dispatch] = React.useContext(CitiesContext);

  useEffect(() => {
    fetch(`${API_URL}/cities`)
      .then((res) => res.json())
      .then((data) => {
        if (state.selectedCity) {
          let defaultCity = data.find(
            (c: CityProps) => c.name === state.selectedCity.name
          );
          dispatch({ type: "select_city", city: defaultCity });
        }
        dispatch({ type: "set_cities", cities: data });
      });
  }, []);

  return (
    <div className="flex flex-col items-center">
      <Header />
      <Content />
    </div>
  );
};

export default Dashboard;
