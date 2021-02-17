const user = {
  username: "",
  adminType: "none",
  watchlists: [],
  stockCrawler: {
    visible: true,
    symbols: [],
  },

  alerts: [],
  events: [],

  trading_portfolio: {
    buying_power: 0,
    active_orders: [],
    currently_owned_stocks: [],
    realised_PnL: 0,
    all_traded_stocks: [],
    unrealised_PnL: 0,
    net_account_value: 0,
    history: {
      transactions: [],
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
