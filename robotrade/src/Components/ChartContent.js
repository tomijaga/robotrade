import Anychart from "anychart-react.min.js";
import React from "react";
import React, { useState, useEffect } from "react";

const Anychart = (props) => {
  const [chartInfo, setChartInfo] = useState(0);

  const createChart = (stockSymbol) => {
    let url = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${stockSymbol}&interval=1min&apikey=RNZT6A08GD0ICJQQ`;

    fetch(url)
      .then((response) => response.json())
      .then((chartInfo) => {
        setChartInfo;
      });
  };

  const getFinnhubData = () => {
    const finnhub = require("finnhub");

    const api_key = finnhub.ApiClient.instance.authentications["api_key"];

    api_key.apiKey = "btmdn7v48v6uocf2j9i0"; // Replace this
    const finnhubClient = new finnhub.DefaultApi();

    // Stock candles
    finnhubClient.stockCandles(
      "AAPL",
      "D",
      1590988249,
      1591852249,
      {},
      (error, data, response) => {
        console.log(data);
      }
    );
  };

  return <Anychart />;
};
export default Anychart;
