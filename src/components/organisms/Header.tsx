import React from "react";
import SearchForm from "../molecules/SearchForm";
import HeaderTitle from "./../molecules/HeaderTitle";

const Header = () => {
  return (
    <div className="container p-5 flex items-center flex-col w-screen">
      <HeaderTitle />
      <SearchForm/>
    </div>
  );
};

export default Header;
