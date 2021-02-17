import React from "react";

const MaxDiv = ({ height, width, children, style, ...otherProps }) => {
  return (
    <div
      style={{
        ...{ height: height || "100%", width: width || "100%" },
        ...style,
      }}
      {...otherProps}
    >
      {children}
    </div>
  );
};

export default MaxDiv;
