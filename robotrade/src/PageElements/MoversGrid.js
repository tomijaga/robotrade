import { FormatListNumbered, Watch } from "@material-ui/icons";
import * as React from "react";
import { useState, useEffect } from "react";
import { finnhub, alphaVantage } from "../Essential";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import { DataGrid } from "@material-ui/data-grid";
import { XGrid, useApiRef } from "@material-ui/x-grid";
import {
  randomStatusOptions,
  randomPrice,
} from "@material-ui/x-grid-data-generator";
import { useDemoData } from "@material-ui/x-grid-data-generator";
import "../PageElements/WatchlistGrid.css";
import shortenNumber from "../UsefullFunctions/shortenNumber";

const MoversGrid = ({ stockSymbols, active, data }) => {
  const [dataArray, setDataArray] = useState(null);
  const [rows, setRows] = useState([]);
  const apiRef = useApiRef();
  //const useStyles = makeStyles({});

  const setDataIntoRows = () => {
    if (data) {
      return data.map((row, i) => {
        // console.log(row);
        return {
          id: i + 1,
          symbol: row.ticker,
          name: row.standardName,
          percentChange: row.percentChange,
          change: row.priceChange,
          volume: row.volume,
          price: row.lastPrice,
        };
      });
    } else {
      return [];
    }
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

  const getSecondaryField = active
    ? {
        headerName: "% Change",
        field: "percentChange",

        sortable: false,
        ...percent,
      }
    : {
        headerName: "Volume",
        field: "volume",
        align: "right",
        sortable: false,
        ...shortForm,
      };

  const getMainField = active
    ? {
        headerName: "Volume",
        field: "volume",
        align: "right",
        sortable: false,
        ...shortForm,
      }
    : {
        headerName: "% Change",
        field: "percentChange",

        sortable: false,
        ...percent,
      };

  return (
    <div>
      <div style={{ height: "300px", width: "100%" }}>
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
            getMainField,

            {
              headerName: "+/-",
              field: "change",
              sortable: false,
              ...price,
            },

            getSecondaryField,
            {
              headerName: "Price",
              field: "price",
              sortable: false,
              ...price,
            },
          ]}
          rows={setDataIntoRows()}
        />
      </div>
    </div>
  );
};
export default MoversGrid;
