import React from "react";
import Time from "../Components/Time";
//import DateDiv from "../Components/DateDiv";

const Footer = (props) => (
  <div {...props}>
    <div
      style={{
        display: "flex",
        justifyContent: "flex-end",
        background: "rgb(10, 20, 30)",
        height: "1.5rem",
        width: `calc(100vw-${30 * 2}pt)`,
        padding: "0px 20pt",
        alignItems: "center",
        fontSize: "0.8rem",
      }}
    >
      <p>Eastern Time </p>
      <span style={{ padding: "0px 10pt" }}></span>
      <Time />
    </div>
  </div>
);

export default Footer;
