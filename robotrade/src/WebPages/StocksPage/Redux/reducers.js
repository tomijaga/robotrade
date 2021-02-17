import { SET_STOCKS_PAGE_SYMBOL } from "./constants";

const init = {
  symbol: "",
};

export const stocksPage = (state = init, action = {}) => {
  switch (action.type) {
    case SET_STOCKS_PAGE_SYMBOL:
      return { ...state, symbol: action.payload };
    default:
      return state;
  }
};
