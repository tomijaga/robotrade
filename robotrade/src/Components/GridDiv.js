import React from "react";
import ErrorBoundary from "./ErrorBoundary";
import MaxDiv from "./MaxDiv";
import "../App.css";

const GridDiv = ({
  container,
  item,
  height,
  width,
  children,
  row,
  column,
  style,
  ...otherProps
}) => {
  console.log({ otherProps });
  return container ? (
    <MaxDiv
      {...otherProps}
      width={width}
      height={height}
      style={{
        ...{
          display: "grid",
          gridTemplateColumns: column || "1fr 1fr",
          gridTemplateRows: row || "1fr 1fr",
        },
        ...style,
      }}
    >
      {children}
    </MaxDiv>
  ) : item ? (
    <MaxDiv
      {...otherProps}
      width={width}
      height={height}
      style={{
        ...{
          gridColumn: column,
          gridRow: row,
        },
        ...style,
      }}
    >
      {children}
    </MaxDiv>
  ) : (
    <ErrorBoundary>
      {Error("Specify GridDiv prop:container or item")}
    </ErrorBoundary>
  );
};

export default GridDiv;
