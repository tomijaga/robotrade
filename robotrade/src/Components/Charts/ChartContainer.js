import React, { useState, useEffect } from "react";
import { TypeChooser } from "react-stockcharts/lib/helper";
import MaxDiv from "../../Components/MaxDiv";
import { timeParse, timeFormat } from "d3-time-format";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Button from "@material-ui/core/Button";
import { API_KEY } from "../../Essential";
import { utcToZonedTime } from "date-fns-tz";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import HeikinAshiChart from "./HeikinAshiChart";
import CandleStickChart from "./CandleStickChart";
import LineChart from "./LineChart";
import debounce from "lodash/debounce";

import io from "socket.io-client";
import { addMonths } from "date-fns";
const finnhub = require("finnhub");

const parseDate = (date) =>
  timeParse("%Y-%m-%dT%H:%M:%S.%LZ")(timeFormat("%Y-%m-%dT%H:%M:%S.%LZ")(date));

// const parseDate = timeParse("%L");

const ChartContainer = (props) => {
  const { symbol, singleDay, ws } = props;

  const [chartData, setChartData] = useState([
    {
      date: new Date(),
      open: 20,
      high: 25,
      low: 10,
      close: 20,
      volume: 230987,
      split: "",
      dividend: "",
      absoluteChange: "",
      percentChange: "",
    },
    {
      date: new Date(),
      open: 20,
      high: 25,
      low: 10,
      close: 20,
      volume: 230987,
      split: "",
      dividend: "",
      absoluteChange: "",
      percentChange: "",
    },
    {
      date: new Date(),
      open: 20,
      high: 25,
      low: 10,
      close: 20,
      volume: 230987,
      split: "",
      dividend: "",
      absoluteChange: "",
      percentChange: "",
    },
  ]);
  const [selectedInterval, setSelectedInterval] = useState("1");
  const getIntervalTime = () => {
    const min = 1000 * 60;
    const hr = min * 60;
    const day = hr * 24;
    const week = day * 7;
    const month = week * 4;

    console.log({ selectedInterval });
    switch (selectedInterval) {
      case "1":
        return min;
      case "5":
        return min * 5;
      case "30":
        return min * 30;
      case "60":
        return hr;
      case "D":
        return day;
      case "W":
        return week;
      case "M":
        return month;
      default:
        return 60000;
    }
  };
  const getFinnhubData = () => {
    const api_key = finnhub.ApiClient.instance.authentications["api_key"];
    api_key.apiKey = API_KEY;
    const finnhubClient = new finnhub.DefaultApi();

    let intervalTime = getIntervalTime() / 1000;

    let currentTime = Math.floor(Date.now() / 1000);
    console.log("time", currentTime);

    // Stock candles
    finnhubClient.stockCandles(
      symbol,
      selectedInterval,
      currentTime - intervalTime * (3600 * 24 * 365),
      currentTime,
      { adjusted: true },
      (error, data, response) => {
        if (error) {
          console.log("Error", error);
        } else {
          if (data.s == "no_data") {
            console.log("status of data:", data.s);
            return console.log({ response });
          } else {
            let newDataOrder = [];
            console.log({ finnhubResponse: data });
            for (let size = 0; size < data["c"].length; size++) {
              let ohlc = {
                date: parseDate(data["t"][size] * 1000),
                open: parseFloat(data["o"][size]),
                high: parseFloat(data["h"][size]),
                low: parseFloat(data["l"][size]),
                close: parseFloat(data["c"][size]),
                volume: parseInt(data["v"][size]),
                split: "",
                dividend: "",
                absoluteChange: "",
                percentChange: "",
              };

              newDataOrder.push(ohlc);
            }
            console.log({ compare: parseDate(data["t"][0] * 1000) });
            console.log({ newDataOrder });
            setChartData(() => newDataOrder);
          }
        }
      }
    );
  };
  //console.log({ symbol, singleDay, selectedInterval });
  useEffect(() => {
    getFinnhubData();
  }, [symbol, selectedInterval]);

  const pollingTicks = () => {
    let high = 0;
    let low = Infinity;
    let open = 0;
    let close = 0;
    let timer = Date.now();
    let volume = 0;
    let count = 0;

    let intervalTime = getIntervalTime();
    intervalTime = timer % intervalTime;
    console.log({ intervalTime });

    const debounce_update = debounce(() => {
      //console.log({ close, open, high, low, volume });
      if (close && high && low !== Infinity && volume) {
        const appendData = {
          date: parseDate(Date.now()),
          open: open,
          high: high,
          low: low,
          close: close,
          volume: parseFloat(volume),
          split: "",
          dividend: "",
          absoluteChange: "",
          percentChange: "",
        };
        console.log({ appendData });

        if (intervalTime < getIntervalTime() && count === 0) {
          setChartData((data) => {
            let lastTick = data[data.length - 1];
            console.log({ lastTick });
            high = lastTick.high = lastTick.high > high ? lastTick.high : high;
            low = lastTick.low = lastTick.low < low ? lastTick.low : low;
            close = lastTick.close = close;
            volume = lastTick.volume += volume;
            console.log({ newLastTick: lastTick });
            data[data.length - 1] = lastTick;
            return [...data];
          });
          console.log("appending last tick");

          count++;
        } else {
          if (count === 0) {
            setChartData((data) => [...data, appendData]);
            count++;
            console.log("Creating new Tick");
          } else {
            setChartData((data) => {
              data[data.length - 1] = appendData;
              return [...data];
            });
            console.log("updating New Tick");
          }
        }
        if (intervalTime + timer <= Date.now()) {
          intervalTime = getIntervalTime();
          low = Infinity;
          high = 0;
          volume = 0;
          open = close;
          count = 0;
          timer = Date.now();
          console.log("Reset Timer");
        }
      }
    }, 16);

    if (symbol) {
      const socket = new WebSocket(
        "wss://ws.finnhub.io?token=btmdn7v48v6uocf2j9i0"
      );

      // Connection opened -> Subscribe
      socket.addEventListener("open", function (event) {
        // socket.send(JSON.stringify({ type: "subscribe", symbol: "AAPL" }));
        socket.send(JSON.stringify({ type: "subscribe", symbol }));
      });

      // Listen for messages
      socket.addEventListener("message", function (event) {
        let tickData = JSON.parse(event.data).data;
        if (tickData) {
          const tick = tickData[0];
          // console.log({ tick });
          close = tick.p;

          if (count === 0) {
            open = tick.p;
          }

          high = close > high ? close : high;
          low = close < low ? close : low;

          volume += tick.v;

          console.log({ close, open, high, low, volume });

          debounce_update();
        }
      });

      // Unsubscribe
      var unsubscribe = function (symbol) {
        socket.send(JSON.stringify({ type: "unsubscribe", symbol: symbol }));
      };
    }
  };
  useEffect(() => {
    pollingTicks();
  }, [selectedInterval]);

  // useEffect(() => {
  //   const interval = setInterval(() => {

  //   }, 1000);
  //   return () => clearInterval(interval);
  // }, [chartData]);

  //console.log({ wsData: chartData });

  const [chartType, setChartType] = useState(props.chartType);

  const getChartForContainer = () => {
    switch (chartType) {
      case "LineChart":
        return <LineChart data={chartData} />;

      case "CandleStickChart":
        return <CandleStickChart data={chartData} />;

      case "HeikinAshiChart":
        return <HeikinAshiChart data={chartData} />;
      default:
        return <>{new Error("chartType is not Specified")}</>;
    }
  };

  return (
    <MaxDiv style={{ backgroundColor: "rgb(255, 255, 255, 0.1), fill:azure" }}>
      <div
        style={{
          textAlign: "left",
          displY: "flex",
          justifyContent: "space-between",
        }}
      >
        {singleDay ? (
          <></>
        ) : (
          <ButtonGroup style={{ paddingLeft: "30px" }}>
            <Button onClick={() => setSelectedInterval("1")}>1</Button>
            <Button onClick={() => setSelectedInterval("5")}>5</Button>
            <Button onClick={() => setSelectedInterval("30")}>30</Button>
            <Button onClick={() => setSelectedInterval("60")}>1h</Button>
            <Button onClick={() => setSelectedInterval("D")}>D</Button>
            <Button onClick={() => setSelectedInterval("W")}>W</Button>
            <Button onClick={() => setSelectedInterval("M")}>Q</Button>
          </ButtonGroup>
        )}

        {singleDay ? (
          <></>
        ) : (
          <ButtonGroup>
            <Tooltip title="Area Chart">
              <IconButton onClick={() => setChartType("LineChart")}>
                AR
              </IconButton>
            </Tooltip>
            <Tooltip title="Candle Stick Chart">
              <IconButton onClick={() => setChartType("CandleStickChart")}>
                CS
              </IconButton>
            </Tooltip>
            <Tooltip title="Candle Stick Chart">
              <IconButton onClick={() => setChartType("HeikinAshiChart")}>
                HK
              </IconButton>
            </Tooltip>
          </ButtonGroup>
        )}
      </div>
      <div>{getChartForContainer()}</div>
    </MaxDiv>
  );
};

export default ChartContainer;
