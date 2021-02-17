import {
  USER_DATA_PENDING,
  USER_DATA_SUCCESS,
  USER_DATA_FAILED,
  DELETE_USER_DATA,
} from "./constants";

import {
  ACCOUNT_DEPOSIT_SUCCESS,
  ACCOUNT_DEPOSIT_FAILED,
  ACCOUNT_WITHDRAWAL_SUCCESS,
  ACCOUNT_WITHDRAWAL_FAILED,
} from "../Account/constants";

import {
  createNewWatchlist,
  deleteWatchlist,
  getWatchlist,
  removeWatchlistSymbol,
} from "../../Server Sync Fns/watchlistSync";

import {
  createEvent,
  getEvent,
  deleteEvent,
} from "../../Server Sync Fns/eventSync";

import { useEffect } from "react";

import { accountDeposit, accountWithdrawal } from "../Account/actions";
import { requestUserData } from "./actions";

import merge from "lodash/merge";
const initUserData = {
  userData: {
    username: "",
    adminType: "none",
    watchlists: [
      {
        name: "default",
        symbols: ["TSLA", "AMZN", "AAPL"],
      },
    ],
    stockCrawler: [],
    events: {
      alerts: [],
      events: [],
    },
    portfolio: {
      account_value: 0,
      active_orders: [],
      owned_stocks: [],
      traded_stocks: [],
      stocks_PnL: 0,
      history: {
        deposits: [],
        withdrawals: [],
        orders: [],
        daily: [],
      },
    },

    Robotrade_portfolio: {
      trading_style: "Aggressive",
      deposit: 0,
      amount_allocated: 0,
      net_value: 0,
      profit_or_loss: 0,
      trade_with_profits: "no",
      orders: [],
      stock_to_trade: [],
      traded_stocks: [],
      history: {
        deposits: [],
        withdrawals: [],
        orders: [],
        daily: [],
      },
    },
  },
  isPending: false,
  error: "",
};

export const userDataObj = (state = initUserData, action = {}) => {
  let userData = state.userData;
  let watchlist;
  let event;

  switch (action.type) {
    case USER_DATA_PENDING:
      return { ...state, isPending: true };
    case USER_DATA_SUCCESS:
      return { ...state, isPending: false, userData: action.payload };
    case USER_DATA_FAILED:
      return { ...state, error: action.payload };

    default:
      return state;
  }
};
