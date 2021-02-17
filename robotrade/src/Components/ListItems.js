import React, { useState, useEffect } from "react";
import ErrorBoundary from "./ErrorBoundary";
import MenuItem from "./MenuItem";
import { finnhub } from "../Essential";
import Scrollbar from "../Components/Scrollbar";

const ListItems = ({ stockSymbols, display, onClick }) => {
  const [stockData, setStockData] = useState([]);

  const displayStocks = () => {
    if (stockData) {
      return stockData.map((data, i) => {
        const quote = {
          className: "menu-item",
          symbol: stockSymbols[i],
          name: "--",
          price: data.c,
          change: data.c - data.pc,
          percentChange: (data.c - data.pc) / data.pc,
          onClick: onClick,
        };
        return (
          <ErrorBoundary key={i}>
            <div
              style={{
                borderBottom: "1px solid azure",
                paddingTop: "4px",
              }}
              className="component-hover"
            >
              <MenuItem {...quote}></MenuItem>
            </div>
          </ErrorBoundary>
        );
      });
    }
    return [];
  };
  console.log("listItems", stockSymbols);

  useEffect(() => {
    if (stockSymbols) {
      const urls = stockSymbols.map((symbol, i) => {
        return finnhub(symbol, "quote");
      });

      Promise.all(
        urls.map((url) => {
          return fetch(url).then((resp) => resp.json());
        })
      ).then((resp) => {
        console.log("stock Quotes", resp);
        setStockData(resp);
      });
    }
  }, []);

  return (
    <ErrorBoundary>
      <div
        style={{
          fontSize: "0.7rem",
          display: "flex",
          justifyContent: "space-between",
          borderBottom: "1px solid azure",
          padding: "0px 14px",
        }}
      >
        <span>Name</span>
        <span>Price/Change</span>
      </div>
      <Scrollbar height="700px">{displayStocks()}</Scrollbar>
    </ErrorBoundary>
  );
};

export default ListItems;
