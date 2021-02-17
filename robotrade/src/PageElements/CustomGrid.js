import React, { useState, useEffect } from "react";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import TabPanel from "../Components/TabPanel";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";

const currencyFormatter = Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});
const usdPrice = {
  type: "number",
  valueFormatter: ({ value }) => currencyFormatter.format(Number(value)),
  cellClassName: "",
};

const price = {
  type: "number",
  valueFormatter: ({ value }) =>
    currencyFormatter.format(Number(value)).substring(1),
  cellClassName: "",
};

const shortForm = {
  type: "number",
  valueFormatter: ({ value }) => shortenNumber(value, 2),
};

const percent = {
  type: "string",
  align: "right",
  valueFormatter: ({ value }) => parseFloat(value).toFixed(2) + "%",
  sortComparator: (v1, v2, row1, row2) => {
    //row.data.field //field is any field on the row
    //eg. row1.data.name
    return v1 - v2;
  },
};

const columnFormat = {
  usdPrice: usdPrice,
  price: price,
  precent: percent,
  shortForm: shortForm,
};
const CustomGrid = ({ columns, data }) => {
  const setDataIntoRows = (dataArray) => {
    if (dataArray) {
      return dataArray.map((data, i) => {
        const { financials, quote, symb } = data;
        const change = quote.c - quote.pc;
        console.log("quote", quote);
        return {};
      });
    }
  };

  return (
    <div>
      <DataGrid />
    </div>
  );
};

export default CustomGrid;
