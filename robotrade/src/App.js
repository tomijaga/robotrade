import React, { useState, useEffect } from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import WatchlistPage from "./WebPages/Watchlist/WatchlistPage.js";
import MarketPage from "./WebPages/MarketPage";
import AccountPage from "./WebPages/Account/AccountPage";
import StocksPage from "./WebPages/StocksPage/StocksPage";
import RoboTradingPage from "./WebPages/RoboTradingPage";
import TradingPage from "./WebPages/TradingPage/TradingPage";
import NoMatch from "./WebPages/NoMatch";
import PageContainer from "./WebPages/PageContainer";
import Login from "./PageElements/Login";
import { connect } from "react-redux";
import { requestUserData } from "./Redux/UserData/actions";
import LoginPage from "./WebPages/LoginPage/LoginPage";
import PortfolioPage from "./WebPages/Portfolio/PortfolioPage";
import PrivateRoute from "./Components/PrivateRoute";
import PublicRoute from "./Components/PublicRoute";
import { getPositions } from "./PageElements/Positions/Redux/actions";
import { getOrders } from "./PageElements/Orders/Redux/actions";
import { setSelectedNavbarItem } from "./Redux/appActions";
import { getWatchlists } from "./WebPages/Watchlist/actions";
import { logout } from "./Redux/LoginState/actions";
import { getNotifications } from "./PageElements/Notification/Redux/actions";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { orderToast } from "./PageElements/Orders/OrderResponseToasts";
import eventToast from "./PageElements/Events/ResponseToasts";
import {
  getAccountDetails,
  getTransactions,
} from "./WebPages/Account/Redux/actions";

const mapDispatchToProps = (dispatch) => {
  return {
    getNotifications: () => dispatch(getNotifications()),
    logout: () => dispatch(logout()),
    getUserData: () => dispatch(requestUserData()),
    getOrders: () => dispatch(getOrders()),
    getPositions: () => dispatch(getPositions()),
    getWatchlists: () => dispatch(getWatchlists()),
    getTransactions: () => dispatch(getTransactions()),
    getAccountDetails: () => dispatch(getAccountDetails()),
  };
};

const mapStateToProps = (state) => {
  return {
    userData: state.userDataObj.userData,
    isUserLoggedIn: state.loginStatus.userIsLoggedIn,
  };
};

const ENDPOINT = "http://localhost:8080";

function App({
  setSelectedNavbarItem,
  showLogin,
  getUserData,
  getWatchlists,
  userData,
  isUserLoggedIn,
  getOrders,
  logout,
  getNotifications,
  getTransactions,
  getAccountDetails,
}) {
  const [response, setResponse] = useState(0);
  const socket = io("http://localhost:" + (process.env.PORT || 8080));
  console.log("app reloaded");

  useEffect(() => {
    if (isUserLoggedIn) {
      getNotifications();
      getUserData();
      getOrders();
      getPositions();
      getWatchlists();
      getTransactions();
      getAccountDetails();
    }
  }, [isUserLoggedIn]);

  useEffect(() => {
    if (isUserLoggedIn) {
      /*global io*/

      socket.on("logout", () => {
        console.log("----LOGOUT-----");

        logout();
        socket.emit("recieved");
      });

      socket.on("order-terminated", (order) => {
        orderToast.terminated(order);
      });

      socket.on("order-filled", (order) => {
        orderToast.filled(order);
      });

      socket.on("order-partially-filled", (order) => {
        orderToast.partially_filled(order);
      });

      socket.on("new-order-alert", (alert) => {
        eventToast(alert);
      });

      socket.on("new-event-alert", (alert) => {
        eventToast(alert);
      });
    }
  }, [isUserLoggedIn]);

  const displayLogin = () => {
    if (showLogin) {
      return (
        <Login
          particles
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        />
      );
    }
  };

  return (
    <div className="App">
      <Router>
        <Switch>
          <PrivateRoute path="/app">
            <PageContainer>
              <Switch>
                <Route exact path="/app">
                  <MarketPage />{" "}
                </Route>
                <Route exact path="/app/watchlist">
                  <WatchlistPage />{" "}
                </Route>

                <Route exact path="/app/stocks">
                  <StocksPage />{" "}
                </Route>
                <Route exact path="/app/portfolio">
                  <PortfolioPage />
                </Route>
                <Route exact path="/app/trade">
                  <TradingPage />
                </Route>
                <Route exact path="/app/robo-trade">
                  <RoboTradingPage />
                </Route>

                <Route exact path="/app/account">
                  <AccountPage />{" "}
                </Route>
                <Route>
                  <Redirect to="/app" />
                </Route>
              </Switch>
              <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
              />
            </PageContainer>
          </PrivateRoute>

          <PublicRoute
            component={LoginPage}
            restricted={true}
            exact
            path="/login"
          />

          <PrivateRoute>
            <Redirect to="/app" />
          </PrivateRoute>
        </Switch>
      </Router>
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
