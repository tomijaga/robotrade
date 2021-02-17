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
import FormatListNumberedRoundedIcon from "@material-ui/icons/FormatListNumberedRounded";
import DeleteForeverOutlinedIcon from "@material-ui/icons/DeleteForeverOutlined";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Popover from "@material-ui/core/Popover";
import Search from "../Components/Search";
import { connect } from "react-redux";
import { addSymbol, removeSymbol } from "../WebPages/Watchlist/actions";
import { confirmAlert } from "react-confirm-alert";
import "./Grids/Grid.css";
import Tooltip from "@material-ui/core/Tooltip";
import { isArrayValid } from "../Essential";
import MaxDiv from "../Components/MaxDiv";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    border: 0,
    color:
      theme.palette.type === "light"
        ? "rgba(0,0,0,.85)"
        : "rgba(255,255,255,0.85)",
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
    WebkitFontSmoothing: "auto",
    letterSpacing: "normal",
    "& .MuiDataGrid-cellWithRenderer": {
      padding: "0px",
      margin: "0px",
    },
    "& .MuiDataGrid-columnsContainer": {
      backgroundColor: theme.palette.type === "light" ? "#fafafa" : "#1d1d1d",
    },
    "& .MuiDataGrid-iconSeparator": {
      display: "none",
    },
    "& .MuiDataGrid-colCell, .MuiDataGrid-cell": {
      borderRight: `1px solid ${
        theme.palette.type === "light" ? "#f0f0f0" : "#303030"
      }`,
    },
    "& .MuiDataGrid-columnsContainer, .MuiDataGrid-cell": {
      borderBottom: `1px solid ${
        theme.palette.type === "light" ? "#f0f0f0" : "#303030"
      }`,
    },
    "& .MuiDataGrid-cell": {},
    "& .MuiPaginationItem-root": {
      borderRadius: 0,
    },
  },
}));

const mapDispatchToProps = (dispatch) => {
  return {
    addSymbol: (name, symbol) => dispatch(addSymbol(name, symbol)),
    removeSymbol: (name, symbol) => dispatch(removeSymbol(name, symbol)),
  };
};

const mapStateToProps = (state) => {
  return {
    isUserLoggedIn: state.loginStatus.userIsLoggedIn,
    watchlists: state.watchlists.data,
    isWatchlistPending: state.watchlists.isPending,
    isUserDataPending: state.userDataObj.isPending,
    selectedWatchlistIndex: state.watchlists.selectedIndex,
    stockSymbols: state.watchlists.data[state.watchlists.selectedIndex].symbols,
  };
};

const WatchlistGrid = ({
  stockSymbols,
  addSymbol,
  removeSymbol,
  watchlists,
  selectedWatchlistIndex,
  isUserDataPending,
}) => {
  const [anchorAdd, setAnchorAdd] = useState(null);
  const [dataArray, setDataArray] = useState(null);
  const [rows, setRows] = useState([]);

  const handleClose = () => {
    setAnchorAdd(null);
  };
  const handleAnchor = (event) => {
    setAnchorAdd(event.currentTarget);
  };

  const mapData = async (symbol, i) => {
    let quote;
    let financials;
    let symb;

    const url1 = finnhub(symbol, "financials");
    const url2 = finnhub(symbol, "quote");
    // const url3 = alphaVantage(symbol, "financials");

    const urls = [url1, url2];
    //Financials
    await Promise.all(
      urls.map((url) => {
        return fetch(url).then((resp) => resp.json());
      })
    )
      .then((results) => {
        financials = results[0].metric;
        symb = results[0].symbol;
        quote = results[1];
      })
      .catch(
        console.error(Error("Error at WatchlistGrid Primise.all Api Call"))
      );

    return { quote: quote, financials: financials, symb: symb };
  };

  const retrieveData = async () => {
    if (isArrayValid(stockSymbols)) {
      let array = await stockSymbols.map(mapData);
      console.log("stockSymbols", stockSymbols);
      await Promise.all(array.map((row) => row)).then((finalResult) => {
        setDataArray(finalResult);
        setRows(setDataIntoRows(finalResult));
      });
    }
    //console.log(rows);
  };

  const setDataIntoRows = (dataArray) => {
    if (dataArray) {
      return dataArray.map((data, i) => {
        const { financials, quote, symb } = data;
        const change = quote.c - quote.pc;
        console.log("quote", quote);
        return {
          menuIcon: "",
          id: i + 1,
          symbol: symb,
          name: "--",
          price: quote.c,
          change: change,
          percentChange: change / quote.pc,
          movement: 12,
          prevClose: quote.pc,
          open: quote.o,
          low: quote.l,
          high: quote.h,
          vol: 0,
          avgVol:
            (financials["3MonthAverageTradingVolume"] * 1000000) / (5 * 3 * 4),
          mktCap: financials.marketCapitalization * 1000000,
          fiftyTwoWkLow: financials["52WeekLow"],
          fiftyTwoWkHigh: financials["52WeekHigh"],
        };
      });
    }
  };

  const classes = useStyles();

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

  function deleteSymbolOptions(watchlistName, symbol) {
    return {
      title: "Are You Sure?",
      message: `You want to delete "${symbol}" from ${watchlistName}`,
      buttons: [
        {
          label: "Yes",
          onClick: () => removeSymbol(watchlistName, symbol),
        },
        {
          label: "No",
        },
      ],
      closeOnEscape: true,
      closeOnClickOutside: true,
    };
  }

  useEffect(() => {
    console.log("STOCKSYMBOLS CHANGED");
    retrieveData();
  }, [watchlists]);

  return (
    <MaxDiv>
      <div style={{ height: "300px", width: "100%" }}>
        <DataGrid
          rowHeight={28}
          headerHeight={30}
          disableMultipleSelection
          scrollbarSize={10}
          hideFooterPagination
          hideFooter
          loading={isUserDataPending}
          autoHeight={false}
          className={classes.root}
          columns={[
            {
              field: "menuIcon",
              headerName: "",
              resizable: false,
              width: 20,
              sortable: false,
              align: "left",
              renderCell: (row) => {
                const symbol = row.data.symbol;
                return (
                  <Tooltip title={`delete ${symbol}`}>
                    <IconButton size="small" color="inherit">
                      <DeleteForeverOutlinedIcon
                        fontSize="small"
                        fill="azure"
                        onClick={(e) => {
                          //call delete function to delete cell row
                          //then update with new row
                          //chack the mui api for details
                          confirmAlert(
                            deleteSymbolOptions(
                              watchlists[selectedWatchlistIndex].name,
                              symbol
                            )
                          );
                        }}
                      />
                    </IconButton>
                  </Tooltip>
                );
              },
            },
            {
              headerName: "No.",
              field: "id",
              type: "string",
              sortable: false,
              resizable: false,
              width: 30,
              align: "center",
            },
            {
              headerName: "Symbol",
              field: "symbol",
              align: "left",
              type: "string",
            },
            {
              headerName: "Redirect ...",
              align: "left",
              field: "name",
              renderCell: (row) => {
                const symbol = row.data.symbol;
                return (
                  <Tooltip title={`link to stocks page`}>
                    <Link className="no-a-style" to="/app/stocks">
                      <Button variant="inherit">Stock Info ...</Button>
                    </Link>
                  </Tooltip>
                );
              },
            },
            { headerName: "Movement", field: "movement" },
            { headerName: "Price", field: "price", ...price },
            { headerName: "+/-", field: "change", ...price },
            { headerName: "%∆", field: "percentChange", ...percent },
            { headerName: "Prev Close", field: "prevClose", ...price },
            { headerName: "Open", field: "open", ...price },
            { headerName: "High", field: "high", ...price },
            { headerName: "Low", field: "low", ...price },
            { headerName: "Vol", field: "vol", ...shortForm },
            { headerName: "Avg Vol", field: "avgVol", ...shortForm },
            { headerName: "Mkt Cap", field: "mktCap", ...shortForm },
            {
              headerName: "52 Wk High",
              field: "fiftyTwoWkHigh",
              ...price,
            },
            { headerName: "52 Wk Low", field: "fiftyTwoWkLow", ...price },
          ]}
          rows={rows}
        />
      </div>
      <div>
        {watchlists.length > 0 ? (
          <IconButton color="inherit">
            <Typography variant="subtitle1" onClick={handleAnchor}>
              + Add Symbol
            </Typography>
          </IconButton>
        ) : (
          ""
        )}
        <Popover
          id="add-Symbol-popover"
          open={Boolean(anchorAdd)}
          anchorEl={anchorAdd}
          anchorOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
          transformOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          onClose={handleClose}
        >
          <Search
            style={{ color: "azure" }}
            relative
            height="200px"
            onClick={(event) => {
              const symbol = event.currentTarget.querySelector(".symbol")
                .innerText;

              addSymbol(watchlists[selectedWatchlistIndex].name, symbol);
              handleClose();
            }}
          />
        </Popover>
      </div>
    </MaxDiv>
  );
};
export default connect(mapStateToProps, mapDispatchToProps)(WatchlistGrid);
