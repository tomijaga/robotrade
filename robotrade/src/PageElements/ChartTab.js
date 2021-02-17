import ChartContainer from "../Components/Charts/ChartContainer";
import AnyChart from "anychart-react";
import anychart from "anychart";
import React, { Component, useState, useEffect } from "react";
import debounce from "lodash/debounce";
import ReactDOM from "react-dom";

// const forthPlot = chart.plot(3);
// forthPlot
//   .line(msftDataTable.mapAs({ value: 4 }))
//   .name("MSFT")
//   .tooltip(null);
// forthPlot
//   .spline(orclDataTable.mapAs({ value: 4 }))
//   .name("ORCL")
//   .tooltip(null);
// forthPlot
//   .stepLine(cscoDataTable.mapAs({ value: 4 }))
//   .name("CSCO")
//   .tooltip(null);
// //chart.scroller().area(msftDataTable.mapAs({ value: 4 }));

// const dateWithYearPlus = (value = 0) => {
//   let todaysDate = new Date();
//   let x = todaysDate.getDate();
//   let y = todaysDate.getMonth();
//   let z = todaysDate.getFullYear();

//   x = x < 10 ? "0" + x : x + "";
//   y = y < 10 ? "0" + y : y + "";

//   return `${z + value}-${y}-${z}`;
// };
// chart.title("Stock Demo");
// chart.plot().legend(true);
// chart.selectRange(dateWithYearPlus(-2), dateWithYearPlus());
// chart.container("container");
// chart.draw();

export default class ChartTab extends Component {
  constructor() {
    super();
    this.x = 0;

    this.chartInstance = anychart.stock();
    this.dataTable = anychart.data.table();
    this.firstPlot = this.chartInstance.plot(0);

    this.chartInstance.splitters().normal().stroke({
      color: "red",
      dash: "3 4",
      thickness: 1,
      opacity: 0.9,
    });

    this.state = {
      data: [],
      dataIsRetrieved: false,
    };

    this.getDataThrottled = debounce(this.getFinnhubData, 2000);
  }

  // createChart = (stockSymbol) => {
  //   let url = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${stockSymbol}&interval=1min&apikey=RNZT6A08GD0ICJQQ`;

  //   fetch(url)
  //     .then((response) => response.json())
  //     .then((chartInfo) => {
  //       setChartInfo();
  //     });
  // };
  getFinnhubData = (symbol) => {
    const finnhub = require("finnhub");

    const api_key = finnhub.ApiClient.instance.authentications["api_key"];
    api_key.apiKey = "bu175nv48v6sgaqqtllg"; // Replace this
    const finnhubClient = new finnhub.DefaultApi();

    let currentTime = Math.floor(Date.now() / 1000);
    console.log("time", currentTime);
    // Stock candles
    finnhubClient.stockCandles(
      symbol,
      "D",
      currentTime - 365 * 24 * 3600,
      currentTime,
      { adjusted: true },
      (error, data, response) => {
        if (error) {
          console.log("Error", error);
        }
        if (data.s == "no_data") {
          console.log("status of data:", data.s);
          return console.log(response);
        } else {
          this.x = data;

          this.x = this.changeDataOrder(this.x);

          this.updateChart(symbol, this.x);
        }
      }
    );
  };

  updateChart = (symbol, data) => {
    //this.dataTable.remove();
    this.dataTable.addData(data);

    this.firstPlot = this.chartInstance.plot(0);
    this.firstPlot
      .candlestick(
        this.dataTable.mapAs({
          open: 1,
          high: 2,
          low: 3,
          close: 4,
          value: 5,
        })
      )
      .fill("#1976d2 0.65")
      .name(symbol);

    // this.secondPlot = this.chartInstance.plot(1);
    // this.secondPlot.column(this.dataTable.mapAs({ value: 5 })).name("Volume");

    //this.chartInstance.plot(0).legend(true);
    //this.chartInstance.selectRange("", "");
  };

  changeDataOrder = (data) => {
    // const { , h, c, l, v, t } = data;

    let newOrder = [];

    // console.log("the parsed data", data);

    for (let size = 0; size < data["c"].length; size++) {
      let array = [
        data["t"][size] * 1000,
        data["o"][size].toFixed(2),
        data["h"][size].toFixed(2),
        data["l"][size].toFixed(2),
        data["c"][size].toFixed(2),
        data["v"][size].toFixed(2),
      ];

      //console.log("Each Array", array);

      newOrder.push(array);
    }
    // console.log("New order", newOrder);
    return newOrder;
  };

  getDataAndUpdateChart = () => {
    this.getFinnhubData();
  };

  componentDidMount() {
    let symbol = sessionStorage.getItem("stockSymbol");
    if (symbol !== null) {
      this.getFinnhubData(symbol);
    } else {
      this.getFinnhubData("BA");
    }
  }

  someBTNOnClick(e) {
    console.log("Button Click");
  }

  render() {
    return (
      <div style={{ width: "100%" }}>
        <AnyChart
          instance={this.chartInstance}
          id="anychart"
          type="column"
          height={450}
        />
      </div>
    );
  }
}
