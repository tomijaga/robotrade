import { FormatListNumbered, Watch } from "@material-ui/icons";
import React from "react";
import { useState, useEffect } from "react";
import { finnhub, alphaVantage } from "../../Essential";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import { DataGrid } from "@material-ui/data-grid";
import { useDemoData } from "@material-ui/x-grid-data-generator";
import "../WatchlistGrid.css";
import shortenNumber from "../../UsefullFunctions/shortenNumber";
import "./Grid.css";

const EarningsGrid = ({ data }) => {
  const setDataIntoRows = () => {
    if (data) {
      return data.map((row, i) => {
        // console.log(row);
        let date = row.date.split("-");
        return {
          id: i + 1,
          symbol: row.symbol,
          releaseDate: new Date(date[0], date[1] - 1, date[2]),
          revenueEstimate: row.revenueEstimate,
          epsEstimate: row.epsEstimate,
        };
      });
    }
    return [];
  };

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

  const inputRows = () => {};

  return (
    <div>
      <div style={{ height: "300px", width: "100%" }} className="grid">
        <DataGrid
          rowHeight={28}
          headerHeight={32}
          disableMultipleSelection
          scrollbarSize={10}
          hideFooter
          loading={false}
          showColumnRightBorder={false}
          disableExtendRowFullWidth={false}
          columns={[
            {
              hide: true,
              field: "id",
              headerName: "",
              type: "number",
            },
            ,
            {
              field: "symbol",
              headerName: "Symbol",
              sortable: false,
              align: "left",
              type: "string",
            },
            {
              field: "name",
              headerName: "Name",
              sortable: false,
              align: "left",
              type: "string",
            },
            {
              headerName: "Realease Date",
              field: "releaseDate",
              sortable: false,
              type: "date",
              width: 150,
            },
            {
              headerName: "Revenue Estimate",
              field: "revenueEstimate",
              sortable: false,

              width: 150,
              ...shortForm,
            },

            {
              headerName: "Eps Estimate",
              field: "epsEstimate",
              sortable: false,
              type: "number",
              width: 150,
            },
          ]}
          rows={setDataIntoRows()}
        />
      </div>
    </div>
  );
};
export default EarningsGrid;
