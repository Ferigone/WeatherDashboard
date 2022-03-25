export const reducer = (state: any, action: any) => {
  switch (action.type) {
    case "select_city":
      return {
        ...state,
        selectedCity: action.city,
      };
    case "set_cities":
      return {
        ...state,
        cities: action.cities,
      };
    case "set_chartType":
      return {
        ...state,
        chartType: action.chartType,
      };

    default:
      return state;
  }
};

export const initialState = {
  chartType: "temperature/max",
  selectedCity: {
    id: null,
    name: "warsaw",
    displayName: null,
  },
  cities: [],
};
