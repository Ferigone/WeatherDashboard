import React from "react";
import { reducer, initialState } from "./reducer";

export const CitiesContext: any = React.createContext({
  state: initialState,
  dispatch: () => null,
});

export const CitiesProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  return (
    <CitiesContext.Provider value={[state, dispatch]}>
      {children}
    </CitiesContext.Provider>
  );
};
