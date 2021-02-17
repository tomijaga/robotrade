import React, { Component } from "react";
import "./Scrollbar.css";

const Scrollbar = ({ height, children, style, className, ...rest }) => {
  return (
    <div
      {...rest}
      className={"scroll " + className}
      style={{ ...{ maxHeight: height }, ...style }}
    >
      {children}
    </div>
  );
};
export default Scrollbar;
