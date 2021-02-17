import { SET_STOCKS_PAGE_SYMBOL } from "./constants";

export const setStocksPageSymbol = (symbol) => ({
  type: SET_STOCKS_PAGE_SYMBOL,
  payload: symbol,
});
