import React from "react";
import SearchButton from "../atoms/SearchButton";
import SearchInput from "./../atoms/SearchInput";
import SearchSuggestion from "../atoms/SearchSuggestion";

import { CitiesContext } from "./../../contexts/Cities";

interface City {
  id: number;
  name: string;
  displayName: string;
}

const SearchForm = () => {
  const [state, dispatch] = React.useContext(CitiesContext);

  const [search, setSearch] = React.useState<string>("");
  const [filter, setFilter] = React.useState<City[]>([]);
  const [focus, setFocus] = React.useState<boolean>(false);

  const searchCity = () => {
    const stateSearch = state.cities.find(
      (c: City) =>
        c.name.toLowerCase() === search.toLowerCase() ||
        c.displayName.toLowerCase() === search.toLowerCase()
    );
    if (stateSearch) {
      dispatch({ type: "select_city", city: stateSearch });
    }
  };

  const filterCity = (input: string) => {
    setSearch(input);
    let searchResult = state.cities.filter(
      (c: City) =>
        c.name.includes(input.toLowerCase()) ||
        c.displayName.toLowerCase().includes(input.toLowerCase())
    );
    setFilter(searchResult);
  };
  return (
    <div className="flex flex-row items-center relative">
      {focus && (
        <div className="absolute top-14 bg-white rounded-lg shadow-xl w-full">
          {filter.map((el: City) => (
            <SearchSuggestion>{el.displayName}</SearchSuggestion>
          ))}
        </div>
      )}
      <SearchInput
        onChange={({ target }: { target: any }) => {
          filterCity(target.value);
        }}
        onFocus={() => {
          setFocus(true);
        }}
        onBlur={() => {
          setFocus(false);
        }}
      />
      <SearchButton
        onClick={() => {
          searchCity();
        }}
      />
    </div>
  );
};

export default SearchForm;
