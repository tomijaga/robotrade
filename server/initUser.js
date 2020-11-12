const user = {
  username: "",
  adminType: "none",
  watchlists: [],
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
};

export default user;
