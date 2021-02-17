import React, { useState, useEffect } from "react";
import MaxDiv from "../../Components/MaxDiv";
import GridDiv from "../../Components/GridDiv";
import Chart from "react-google-charts";
import RingLoader from "react-spinners/RingLoader";
import Typography from "@material-ui/core/Typography";
import { isArrayValid } from "../../Essential";
import classnames from "classnames";
import Scrollbar from "../../Components/Scrollbar";
import format from "date-fns/format";
import FilledOrderTable from "../../PageElements/Orders/FilledOrderTable";
import Center from "../../Components/Center";
import { connect } from "react-redux";
import ErrorBoundary from "../../Components/ErrorBoundary";
import { utcToZonedTime, format as formatTz } from "date-fns-tz";

const TradedStockItems = ({ symbol, PnL, highlight, ...rest }) => {
  return (
    <div
      {...rest}
      className={classnames("component-hover", {
        highlight: Boolean(highlight),
      })}
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "20px",
      }}
    >
      <Typography variant="body2">{symbol}</Typography>
      <Typography className={PnL >= 0 ? "profit " : "loss "} variant="body2">
        {" "}
        <strong>{PnL}</strong>
      </Typography>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

const mapStateToProps = (state) => {
  return {
    past_orders:
      [
        {
          status: "FILLED",
          quantityFilled: 10,
          executionPrice: 100,
          side: "BUY",
          symbol: "PLTR",
          endTime: "2020-11-22T08:05:53.606Z",
        },
        {
          status: "FILLED",
          quantityFilled: 5,
          executionPrice: 120,
          side: "SELL",
          symbol: "PLTR",
          endTime: "2020-11-23T08:05:53.606Z",
        },
        {
          status: "FILLED",
          quantityFilled: 5,
          executionPrice: 200,
          side: "BUY",
          symbol: "PLTR",
          endTime: "2020-11-24T08:05:53.606Z",
        },
        {
          status: "FILLED",
          quantityFilled: 5,
          executionPrice: 180,
          side: "SELL",
          symbol: "PLTR",
          endTime: "2020-11-28T08:05:53.606Z",
        },
        {
          status: "FILLED",
          quantityFilled: 10,
          executionPrice: 100,
          side: "BUY",
          symbol: "ABBV",
          endTime: "2020-11-22T08:05:53.606Z",
        },
        {
          status: "FILLED",
          quantityFilled: 5,
          executionPrice: 120,
          side: "SELL",
          symbol: "ABBV",
          endTime: "2020-11-23T08:05:53.606Z",
        },
        {
          status: "FILLED",
          quantityFilled: 5,
          executionPrice: 200,
          side: "BUY",
          symbol: "ABBV",
          endTime: "2020-11-24T08:05:53.606Z",
        },
        {
          status: "FILLED",
          quantityFilled: 5,
          executionPrice: 180,
          side: "SELL",
          symbol: "ABBV",
          endTime: "2020-11-28T08:05:53.606Z",
        },
        {
          status: "FILLED",
          quantityFilled: 10,
          executionPrice: 100,
          side: "BUY",
          symbol: "ABBV",
          endTime: "2020-11-22T08:05:53.606Z",
        },
        {
          status: "FILLED",
          quantityFilled: 5,
          executionPrice: 120,
          side: "SELL",
          symbol: "ABBV",
          endTime: "2020-11-23T08:05:53.606Z",
        },
        {
          status: "FILLED",
          quantityFilled: 5,
          executionPrice: 200,
          side: "BUY",
          symbol: "ABBV",
          endTime: "2020-11-24T08:05:53.606Z",
        },
        {
          status: "FILLED",
          quantityFilled: 5,
          executionPrice: 180,
          side: "SELL",
          symbol: "ABBV",
          endTime: "2020-11-28T08:05:53.606Z",
        },
      ] || state.orders.past_orders,
    tradedStocks: [
      { symbol: "TSLA", PnL: -234 },
      { symbol: "ABBV", PnL: -123 },
      { symbol: "PLTR", PnL: 1542 },
      { symbol: "BTCUSD", PnL: 182 },
    ],
  };
};

const TradedStocksTab = ({ tradedStocks, past_orders }) => {
  const [selectedSymbol, setSelectedSymbol] = useState("");
  const [tradedData, setTradedData] = useState([]);

  const [filledOrders, setFilledOrders] = useState([]);
  const [areaChartData, setAreaChartData] = useState([]);

  const displayTradedStocks = (data) => {
    if (isArrayValid(data)) {
      return data.map((obj, i) => {
        return (
          <div key={i} className="inline-bottom">
            <TradedStockItems
              highlight={selectedSymbol === obj.symbol}
              onClick={(event) => {
                setSelectedSymbol(obj.symbol);
              }}
              symbol={obj.symbol}
              PnL={obj.PnL}
            />
          </div>
        );
      });
    }
    return <></>;
  };

  useEffect(() => {
    setTradedData(() => tradedStocks.sort((a, b) => b.PnL - a.PnL));
    setSelectedSymbol(() => tradedStocks[0].symbol);
  }, [tradedStocks]);

  useEffect(() => {
    console.log({ past_orders });

    const filled = past_orders.filter((order) => {
      return order.status === "FILLED" && order.symbol === selectedSymbol;
    });

    const chart = [];
    filled.reduce((acc, order, i) => {
      const quantity = order.quantityFilled;
      const price = order.executionPrice;
      const equity = quantity * price;

      if (i === 0) {
        chart.push([
          new Date(utcToZonedTime(order.endTime, "America/New_York")),
          0,
        ]);
        return {
          quantity: quantity,
          price: price,
          prevPnL: 0,
        };
      } else {
        if (order.side === "BUY") {
          acc.quantity += quantity;
          acc.price = (acc.price + price) / 2;
        } else if (order.side === "SELL") {
          acc.quantity -= quantity;
          const PnL = equity - quantity * acc.price;
          chart.push([
            new Date(utcToZonedTime(order.endTime, "America/New_York")),
            acc.prevPnL + PnL,
          ]);
          acc.prevPnL += PnL;
        }
      }

      return acc;
    }, {});

    chart.unshift(["Time", "P&L"]);

    console.log({ chart });

    setFilledOrders(() => filled);
    setAreaChartData(() => chart);
  }, [past_orders, selectedSymbol]);

  return (
    <GridDiv container column="1fr" row="1fr">
      <GridDiv item column="1/2" row="1/2">
        <MaxDiv style={{ display: "flex", flexWrap: "wrap" }}>
          <Scrollbar height="calc( 100vh - 4rem)" className="outline-right">
            <div
              className="inline-bottom"
              style={{
                display: "flex",
                justifyContent: "space-between",
                width: "200px",
                padding: "20px 20px 0px 20px",
              }}
            >
              <Typography style={{ opacity: "0.7" }} variant="subtitle2">
                Symbol
              </Typography>
              <Typography style={{ opacity: "0.7" }} variant="subtitle2">
                {" "}
                P&L(USD)
              </Typography>
            </div>
            {displayTradedStocks(tradedData)}
          </Scrollbar>
          <div style={{ width: "auto", height: "calc( 100vh - 4rem) " }}>
            <div style={{ display: "flex", justofyContent: "space-between" }}>
              <Typography>All</Typography>
              <Typography>Pick date</Typography>
            </div>

            <GridDiv container column="1fr" row="auto auto">
              <GridDiv item column="1/2" row="1/2">
                <Chart
                  style={{ backgroundColor: "darkslategray" }}
                  width={450}
                  height={400}
                  chartType="AreaChart"
                  loader={
                    <MaxDiv>
                      <Center>
                        <RingLoader size={60} color="#34D7B7" />
                      </Center>
                    </MaxDiv>
                  }
                  data={areaChartData}
                  options={{
                    backgroundColor: "transparent",
                    isStacked: true,
                    legend: { position: "top", maxLines: 3 },
                    vAxis: {
                      textStyle: {
                        color: "azure",

                        fontSize: 13,
                        bold: false,
                      },
                      hAxis: {
                        format: "MMM d, y",
                        textStyle: {
                          color: "azure",

                          fontSize: 13,
                          bold: false,
                        },
                      },
                    },
                  }}
                  legendToggle
                />
              </GridDiv>
              <GridDiv item column="1/2" row="2/3">
                <Typography variant="subtitle2">Filled Orders</Typography>

                <FilledOrderTable height="100px" simple orders={filledOrders} />
              </GridDiv>
            </GridDiv>
          </div>
        </MaxDiv>
      </GridDiv>
    </GridDiv>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(TradedStocksTab);
