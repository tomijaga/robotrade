import React from "react";

const Center = (props) => (
  <div
    {...props}
    style={{
      width: "100%",
      height: "100%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    }}
  >
    {props.children}
  </div>
);

export default Center;
