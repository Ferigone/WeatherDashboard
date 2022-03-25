import React from "react";

const SearchInput = ({
  onChange,
  onFocus,
  onBlur,
}: {
  onChange: React.ChangeEventHandler;
  onFocus: React.ChangeEventHandler;
  onBlur: React.ChangeEventHandler;
}) => {
  return (
    <input
      onChange={onChange}
      onFocus={onFocus}
      onBlur={onBlur}
      type="text"
      className="rounded-l-lg border-2 h-12 px-2"
      placeholder="Nazwa miasta"
    />
  );
};

export default SearchInput;
