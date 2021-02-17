import { TRADING_PAGE_SYMBOL } from "./constants";

const init = {
  symbol: "",
};

export const tradingPage = (state = init, action = {}) => {
  switch (action.type) {
    case TRADING_PAGE_SYMBOL:
      return { ...state, symbol: action.payload };

    default:
      return state;
  }
};
