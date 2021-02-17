import { combineReducers } from "redux";
import { loginStatus } from "./LoginState/reducer";
import { userDataObj } from "./UserData/reducer";
import { watchlists } from "../WebPages/Watchlist/reducers";

import { tradingPage } from "../WebPages/TradingPage/Redux/reducers";

import { orders } from "../PageElements/Orders/Redux/reducers";

import { positions } from "../PageElements/Positions/Redux/reducers";

import { selectedNavbarItem } from "./appReducer";

import { stocksPage } from "../WebPages/StocksPage/Redux/reducers";

import { events } from "../PageElements/Events/Redux/reducers";

import { notifications } from "../PageElements/Notification/Redux/reducer";

import { account } from "../WebPages/Account/Redux/reducer";

const rootReducer = combineReducers({
  loginStatus,
  userDataObj,
  watchlists,
  tradingPage,
  events,
  stocksPage,
  orders,
  positions,
  selectedNavbarItem,
  notifications,
  account,
});

export default rootReducer;
