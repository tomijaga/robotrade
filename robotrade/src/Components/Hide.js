import React, { useState, useEffect } from "react";

const Hide = ({ show, children }) => {
  return (
    <div style={{ display: show === true ? "block" : "none" }}>{children}</div>
  );
};

export default Hide;
