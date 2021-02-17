import { TRADING_PAGE_SYMBOL } from "./constants";

export const changeTradingPageSymbol = (symbol) => ({
  type: TRADING_PAGE_SYMBOL,
  payload: symbol,
});
