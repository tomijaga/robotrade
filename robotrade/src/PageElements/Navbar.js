import React, { Component } from "react";
import WatchlistIcon from "../Icons/WatchlistIcon";
import marketIcon from "../Icons/worldwide.svg";
import StockIcon from "../Icons/StockIcon";
import TradeIcon from "../Icons/TradeIcon";
import RobotradeIcon from "../Icons/RobotradeIcon";
import IconWithInfoTip from "../Components/IconWithInfoTip.js";
import Center from "../Components/Center";
import PublicIcon from "@material-ui/icons/Public";
import "./Navbar.css";
import NotificationsActiveIcon from "@material-ui/icons/NotificationsActive";
import Avatar from "@material-ui/core/Avatar";
import WalletIcon from "../Icons/WalletIcon";
import SettingsIcon from "@material-ui/icons/Settings";
import PortfolioIcon from "../Icons/PortfolioIcon";
import { connect } from "react-redux";
import { setSelectedNavbarItem } from "../Redux/appActions";
import { Link } from "react-router-dom";

const mapDispatchToProps = (dispatch) => {
  return {
    setSelectedNavbarItem: (index) => dispatch(setSelectedNavbarItem(index)),
  };
};

const mapStateToProps = (state) => {
  return {
    selectedNavbarItem: state.selectedNavbarItem,
  };
};

const Navbar = ({ selectedNavbarItem, setSelectedNavbarItem, ...rest }) => {
  const getHighlightStyle = (id, value) => {
    if (id === selectedNavbarItem) {
      console.log("match");
      if (value === "className") {
        return "selected";
      } else if (value === "fill") {
        return "aqua";
      }
    }
  };

  const handleOnclick = (id) => {
    console.log(selectedNavbarItem);

    console.log({ selectedNavbarItem });
    setSelectedNavbarItem(id);
  };

  return (
    <div className="inline-right" {...rest}>
      <div
        style={{
          display: "grid",
          background: "rgb(10, 30, 40)",
          height: "100%",
          display: "flex",
          flexDirection: "column",

          width: "100%",
          zIndex: "99",
        }}
      >
        <div className="section-1">
          <div className={"navCenter "}>
            <Center className={getHighlightStyle(1, "className")}>
              <Link
                to="/app/"
                className="noStyle"
                onClick={() => handleOnclick(1)}
                id={1}
              >
                <PublicIcon id={1} fill={getHighlightStyle(1, "fill")} />
                <p id={1} className="iconText">
                  Market
                </p>
              </Link>
            </Center>
          </div>

          <div className={"navCenter "}>
            <Center className={getHighlightStyle(2, "className")}>
              <Link
                to="/app/watchlist"
                className="noStyle"
                onClick={() => handleOnclick(2)}
                id={2}
              >
                <WatchlistIcon
                  size="20pt"
                  className="navIcon"
                  fill={getHighlightStyle(2, "fill")}
                />
                <p className="iconText">Watchlists</p>
              </Link>
            </Center>
          </div>

          <div className={"navCenter "}>
            <Center className={getHighlightStyle(3, "className")}>
              <Link
                className="noStyle"
                onClick={() => handleOnclick(3)}
                to="/app/stocks"
                id={3}
              >
                {" "}
                <StockIcon
                  size="20pt"
                  className="navIcon"
                  fill={getHighlightStyle(3, "fill")}
                />
                <p className="iconText">Stocks</p>
              </Link>
            </Center>
          </div>

          <div className={"navCenter "}>
            <Center className={getHighlightStyle(4, "className")}>
              <Link
                className="noStyle"
                onClick={() => handleOnclick(4)}
                to="/app/portfolio"
                id={4}
              >
                <PortfolioIcon
                  size="25"
                  className="navIcon"
                  fill={getHighlightStyle(4, "fill")}
                />
                <p className="iconText">Portfolio</p>
              </Link>
            </Center>
          </div>

          <div className={"navCenter "}>
            <Center className={getHighlightStyle(5, "className")}>
              <Link
                className="noStyle"
                onClick={() => handleOnclick(5)}
                to="/app/trade"
                id={5}
              >
                <TradeIcon
                  size="25"
                  className="navIcon"
                  fill={getHighlightStyle(5, "fill")}
                />
                <p className="iconText">Trade</p>
              </Link>
            </Center>
          </div>

          {/* { <Center
              className={"navCenter " + getHighlightStyle(6, "className")}
            >
              <Link
                className="noStyle"
                onClick={() => handleOnclick(6)}
                to="/app/robo-trade"
                id={6}
              >
                <RobotradeIcon
                  size="25"
                  className="navIcon"
                  fill={getHighlightStyle(6, "fill")}
                />
                <p className="iconText">Robo-trade</p>
              </Link>
            </Center>} */}
        </div>
      </div>
    </div>
  );
};
export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
