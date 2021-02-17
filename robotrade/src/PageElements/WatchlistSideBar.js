import React, { useState, useEffect } from "react";
import "./WatchlistSideBar.css";
import CustomTab from "./CustomTab";
import ListItems from "../Components/ListItems";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import { makeStyles } from "@material-ui/core/styles";
import ErrorBoundary from "../Components/ErrorBoundary";
import Button from "@material-ui/core/Button";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import Hide from "../Components/Hide";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { connect } from "react-redux";
import { isArrayValid } from "../Essential";

const useStyles = makeStyles((theme) => ({
  root: {
    ...theme.typography.button,
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(1),
  },
}));

const mapDispatchToProps = (dispatch) => {
  return {};
};

const mapStateToProps = (state) => {
  return {
    isUserLoggedIn: state.loginStatus.userIsLoggedIn,
    watchlists: state.watchlists.data,
    isWatchlistPending: state.watchlists.isPending,
    events: state.userDataObj.userData.events,
    isUserDataPending: state.userDataObj.isPending,
    selectedWatchlistIndex: state.IndexIndex,
  };
};

const WatchlistBar = ({
  watchlists,
  notWatchlist,
  name,
  stocks,
  onSymbolChange,
}) => {
  notWatchlist
    ? console.log("recentStocks", stocks)
    : console.log("watchlists", watchlists);

  const [selected, setSelected] = useState(0);
  const [anchorElement, setAnchorElement] = useState(null);

  const handleClick = (event) => {
    setAnchorElement(event.currentTarget);
  };

  const handleClose = (event) => {
    setAnchorElement(null);
    console.log("setting selected", event.currentTarget.id * 1);
    setSelected(event.currentTarget.id * 1);
  };
  const getMenuItems = () => {
    if (isArrayValid(watchlists)) {
      return watchlists.map((listItem, i) => {
        return (
          <MenuItem
            onClick={onSymbolChange}
            className="menuItems"
            key={i}
            id={i}
            onClick={handleClose}
          >
            {listItem.name}
          </MenuItem>
        );
      });
    }
  };

  const getMenu = () => {
    if (!notWatchlist) {
      return (
        <Menu
          id="watchlist-bar"
          anchorEl={anchorElement}
          keepMounted
          open={Boolean(anchorElement)}
          onClose={handleClose}
        >
          {getMenuItems()}
        </Menu>
      );
    }
  };

  const getListItems = () => {
    if (notWatchlist) {
      return (
        <ListItems onClick={onSymbolChange} stockSymbols={stocks}></ListItems>
      );
    } else if (isArrayValid(watchlists)) {
      return watchlists.map((list, i) => {
        return (
          <Hide key={i} show={selected === i}>
            <ListItems
              onClick={onSymbolChange}
              stockSymbols={list.symbols}
            ></ListItems>
          </Hide>
        );
      });
    }
  };

  const getDisplayName = () => {
    if (notWatchlist && name) {
      return name;
    } else if (watchlists) {
      return watchlists[selected].name;
    }
    return "Name Is not Provided";
  };

  const classes = useStyles();

  return (
    <ErrorBoundary>
      {getMenu()}
      {getListItems()}
    </ErrorBoundary>
  );
};

const WatchlistSideBar = ({ watchlists, recentStocks, onSymbolChange }) => {
  return (
    <ErrorBoundary>
      <div style={{ width: "100%" }} className="watchlistSideBar">
        <CustomTab tabs={["Watchlists", "Recently"]}>
          {[
            <WatchlistBar
              onSymbolChange={onSymbolChange}
              watchlists={watchlists}
            />,
            <WatchlistBar
              notWatchlist
              onSymbolChange={onSymbolChange}
              name="Recently Viewed Stocks"
              stocks={recentStocks}
            />,
          ]}
        </CustomTab>
      </div>
    </ErrorBoundary>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(WatchlistSideBar);
