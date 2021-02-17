import React from "react";
import ErrorBoundary from "../../Components/ErrorBoundary";
import MaxDiv from '../../Components/MaxDiv';

const Portfolio = () => {
  return (
    <ErrorBoundary>
      {" "}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gridTemplateRows: "1fr 1fr",
          height: "100%",
          width: "100%",
        }}
      >
        <div
          style={{
            backgroundColor: "transparent",
            height: "100%",
            width: "100%",

            gridRow: "1 / span 2",
          }}
        >
          <p style={{ color: "azure" }}>1</p>
        </div>
        <div
          style={{
            backgroundColor: "transparent",
            height: "100%",
            width: "100%",
          }}
        >
          <p style={{ color: "azure" }}>2</p>
        </div>
        <div
          style={{
            backgroundColor: "tansparent",
            height: "100%",
            width: "100%",
          }}
        >
          <p style={{ color: "azure" }}>3</p>
        </div>
      </div>
    </ErrorBoundary>
  );
};

export default Portfolio;
