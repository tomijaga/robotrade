import React from "react";

const SearchBox = ({ placeholder, style, ...others }) => {
  const inputStyle = {
    width: "100%",
    background: "azure",
    height: "1.5rem",
    color: "black",
    paddingLeft: "18px",
    borderColor: "transparent",
    borderRadius: "4px",
    marginBottom: "4px",
    fontWeight: "bold",
    top: "0%",
  };

  return (
    <div>
      <input
        type="search"
        placeholder={placeholder}
        style={{ ...inputStyle, ...style }}
        {...others}
      />
    </div>
  );
};

export default SearchBox;
