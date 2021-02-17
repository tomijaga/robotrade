import React, { useState, useEffect } from "react";
import MenuItem from "../Components/MenuItem";
import NotificationsIcon from "@material-ui/icons/Notifications";
import AddAlertIcon from "@material-ui/icons/AddAlert";
import BookmarkTwoToneIcon from "@material-ui/icons/BookmarkTwoTone";
import StockQuote from "../Components/StockQuote";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import IconButton from "@material-ui/core/IconButton";
import getETHours from "../UsefullFunctions/getETHours";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import ShowChartIcon from "@material-ui/icons/ShowChart";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { changeTradingPageSymbol } from "../WebPages/TradingPage/Redux/actions";
import { Tooltip } from "@material-ui/core";
import {
  isObjectValid,
  isArrayValid,
  finnhub as getFinnhubUrl,
} from "../Essential";
import KeyValue from "../Components/KeyValue";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import MenuList from "@material-ui/core/MenuList";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Popper from "@material-ui/core/Popper";
import NewEventDialog from "./Events/NewEventDialog";
import ErrorBoundary from "../Components/ErrorBoundary";
import RingLoader from "react-spinners/RingLoader";
import MaxDiv from "../Components/MaxDiv";
import Center from "../Components/Center";
import shortenNumber from "../UsefullFunctions/shortenNumber";

const mapDispatchToProps = (dispatch) => {
  return {
    changeTradingPageSymbol: (symbol) =>
      dispatch(changeTradingPageSymbol(symbol)),
  };
};

const mapStateToProps = (state) => {
  return {
    isUserLoggedIn: state.loginStatus.userIsLoggedIn,
    watchlists: state.watchlists.data,
    events: state.events,
    isUserDataPending: state.userDataObj.isPending,
    watchlists: state.watchlists.data,
  };
};

const isStockOpen = () => {
  let time = new Date();

  let hr = getETHours(time);

  const verifyDate = (time) => {
    let day = time.getUTCDay();
    let date = time.getUTCDate();

    if (day === 6) {
      date = date - 1;
    } else if (day === 0) {
      date = date - 2;
    }

    date = date + "/" + time.getUTCMonth();
    return date;
  };

  if (hr >= 9 && hr <= 16) {
    return (
      <Typography variant="subtitle2" align="left">
        Open {verifyDate(time)} 09:00 EDT
      </Typography>
    );
  }
  return (
    <Typography variant="subtitle2" align="left">
      Closed {verifyDate(time)} 16:00 EDT
    </Typography>
  );
};

const StockInfoBar = ({
  stockDetails,
  watchlists,
  symbol,
  changeTradingPageSymbol,
}) => {
  const [data, setData] = useState({});
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(async () => {
    const urls = [];
    urls.push(getFinnhubUrl(symbol, "all-financials"));
    urls.push(getFinnhubUrl(symbol, "quote"));
    urls.push(getFinnhubUrl(symbol, "profile"));

    await Promise.all(
      urls.map((url) => {
        return fetch(url).then((resp) => resp.json());
      })
    ).then((res) => {
      const financials = res[0].metric;
      const quote = res[1];
      const profile = res[2];

      setData({ financials, quote, profile });
      console.log("info Bar Set");
    });
  }, [symbol]);

  const watchlistAnchorRef = React.useRef(null);
  const [watchlistOpen, setWatchlistOpen] = useState(false);

  const watchlistPopperOption = {
    toggle: () => setWatchlistOpen((prevOpen) => !prevOpen),
    close: () => setWatchlistOpen(false),
    add: (event) => {
      console.log(event.currentTarget);
    },
    remove: (event) => {
      console.log(event.currentTarget);
    },
  };

  const getList = () => {
    if (isArrayValid(watchlists)) {
      return watchlists.map((watchlist, i) => {
        return (
          <ListItem
            key={i}
            style={{ minWidth: "150px" }}
            onClick={watchlistPopperOption.close}
          >
            <ListItemText>{watchlist.name}</ListItemText>
            <ListItemSecondaryAction>
              <BookmarkTwoToneIcon
                fill={watchlist.symbols.includes(symbol) ? "cyan" : "red"}
              />
            </ListItemSecondaryAction>
          </ListItem>
        );
      });
    }

    return <></>;
  };

  const watchlistPopper = () => {
    return (
      <Popper
        style={{ zIndex: "100" }}
        open={watchlistOpen}
        anchorEl={watchlistAnchorRef.current}
        role={undefined}
        position={"bottom"}
        transition
        disablePortal
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === "bottom" ? "center top" : "center bottom",
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={watchlistPopperOption.close}>
                <List dense={true}>{getList()}</List>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    );
  };

  return (
    <ErrorBoundary>
      {isObjectValid(data) ? (
        <>
          {" "}
          <Paper>
            <CardContent>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-evenly",
                }}
              >
                <Tooltip title={data.profile.weburl}>
                  <a href={data.profile.weburl} target="_blank">
                    <img
                      style={{ background: "rgb(0,0,0, 0.2)" }}
                      height="30px"
                      width="30px"
                      src={data.profile.logo}
                    />
                  </a>
                </Tooltip>
                <StockQuote symbol={symbol} name={data.profile.name} />
              </div>
            </CardContent>
            <CardContent> {isStockOpen()}</CardContent>{" "}
            <CardContent>
              <Typography>Profile</Typography>
              <hr />
              <KeyValue entry={{ key: "IPO data", value: data.profile.ipo }} />
              <KeyValue
                entry={{ key: "Industry", value: data.profile.finnhubIndustry }}
              />
              <KeyValue
                entry={{ key: "Exchange", value: data.profile.exchange }}
              />
            </CardContent>
            <CardActions>
              <Tooltip title="Add to Watchlist">
                <IconButton
                  aria-haspopup="true"
                  ref={watchlistAnchorRef}
                  onClick={watchlistPopperOption.toggle}
                  aria-label="add to watchlist"
                  size="small"
                >
                  <BookmarkTwoToneIcon />
                </IconButton>
              </Tooltip>

              <Tooltip title="Create Event">
                <IconButton onCLick={() => setDialogOpen(true)}>
                  <AddAlertIcon />
                </IconButton>
              </Tooltip>
              <Link to="/app/trade" style={{ textDecoration: "none" }}>
                <Button
                  variant="contained"
                  color="default"
                  startIcon={<ShowChartIcon />}
                  onClick={() => {
                    changeTradingPageSymbol(symbol);
                  }}
                >
                  {" "}
                  Trade
                </Button>
              </Link>
            </CardActions>
            <Card>
              <CardHeader title="Company Financials" subheader="" />
              <CardContent>
                <Grid container direction="row">
                  <Grid item xs>
                    <KeyValue entry={{ key: "Open", value: data.quote.o }} />
                    <KeyValue entry={{ key: "High", value: data.quote.h }} />
                    <KeyValue
                      entry={{
                        key: "Vol",
                        value: shortenNumber(
                          (data.financials["10DayAverageTradingVolume"] *
                            1000000) /
                            10,
                          2
                        ),
                      }}
                    />

                    <KeyValue
                      entry={{
                        key: "Avg Vol(3M)",
                        value: shortenNumber(
                          (data.financials["3MonthAverageTradingVolume"] *
                            1000000) /
                            (5 * 3 * 4),
                          2
                        ),
                      }}
                    />
                    <KeyValue
                      entry={{
                        key: "52 Wk High",
                        value: shortenNumber(data.financials["52WeekHigh"], 2),
                      }}
                    />
                    <KeyValue
                      entry={{
                        key: "Mkt Cap",
                        value: shortenNumber(
                          data.profile.marketCapitalization * 1000000,
                          2
                        ),
                      }}
                    />
                    <KeyValue
                      entry={{
                        key: "EPS",
                        value: shortenNumber(
                          data.financials.epsNormalizedAnnual,
                          3
                        ),
                      }}
                    />
                    <KeyValue
                      entry={{
                        key: "Shares Out",
                        value: shortenNumber(
                          data.profile.shareOutstanding * 1000000,
                          2
                        ),
                      }}
                    />
                  </Grid>
                  <Grid item xs>
                    <KeyValue
                      entry={{ key: "Prev Close", value: data.quote.pc }}
                    />
                    <KeyValue entry={{ key: "Low", value: data.quote.l }} />

                    <KeyValue
                      entry={{
                        key: "Range",
                        value:
                          (
                            (data.quote.c - data.quote.pc) /
                            data.quote.c
                          ).toFixed(2) + "%",
                      }}
                    />
                    <KeyValue
                      entry={{
                        key: "52 Wk Low",
                        value: data.financials["52WeekLow"],
                      }}
                    />
                    <KeyValue
                      entry={{
                        key: "P/E",
                        value: data.financials.peNormalizedAnnual,
                      }}
                    />
                    <KeyValue
                      entry={{
                        key: "Dividend",
                        value: data.financials.dividendPerShareAnnual,
                      }}
                    />
                    <KeyValue
                      entry={{
                        key: "Div Yield",
                        value: data.financials.dividendYield5Y,
                      }}
                    />
                    <KeyValue
                      entry={{
                        key: "P/B",
                        value: shortenNumber(data.financials.pbAnnual, 2),
                      }}
                    />

                    <KeyValue
                      entry={{ key: "Beta", value: data.financials.beta }}
                    />
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Paper>
          <div></div>
        </>
      ) : (
        <MaxDiv>
          <Center>
            <RingLoader size={40} color="#34D7B7" />
          </Center>
        </MaxDiv>
      )}

      {watchlistPopper()}
      {
        <NewEventDialog
          symbol={symbol}
          open={dialogOpen}
          handleClose={() => setDialogOpen(false)}
        />
      }
    </ErrorBoundary>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(StockInfoBar);
