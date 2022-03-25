import React from "react";
import Dashboard from "./components/templates/Dashboard";

import { CitiesProvider } from "./contexts/Cities";

const App = () => {
  return (
    <CitiesProvider>
      <Dashboard />
    </CitiesProvider>
  );
};

export default App;
