import React, { useState, useEffect } from "react";
import { TypeChooser } from "react-stockcharts/lib/helper";
import CandleStickChart from "./HeikinAshiChart";
import LineChart from "./LineChart";
import MaxDiv from "../MaxDiv";
import ChartContainer from "./ChartContainer";
import ErrorBoundary from "../ErrorBoundary";

const StockChart = ({ chartType, ...rest }) => {
  if (!chartType) {
    chartType = "CandleStickChart";
  }

  return (
    <MaxDiv>
      <ErrorBoundary>
        <ChartContainer {...{ ...rest, ...{ chartType } }} />
      </ErrorBoundary>
    </MaxDiv>
  );
};

export default StockChart;
