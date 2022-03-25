import React from "react";

const SearchButton = ({ onClick }: { onClick: React.MouseEventHandler }) => {
  return (
    <button
      onClick={onClick}
      className="py-1 px-2 flex justify-center items-center  bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 focus:ring-offset-blue-200 text-white w-auto transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 h-12 rounded-r-lg "
    >
      <img
        className="h-8 mr-2"
        src="https://img.icons8.com/color/search"
        alt="Search"
      />
      Szukaj
    </button>
  );
};

export default SearchButton;
