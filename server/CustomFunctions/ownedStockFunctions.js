import { addTradedItem } from "./tradedStocks.js";

export const getOwnedStockItem = (userData, symbol) => {
  let matchingStockItem;
  userData.portfolio.owned_stocks.map((stockItem) => {
    if (stockItem.symbol === symbol) {
      matchingStockItem = stockItem;
    }
  });
  // console.log("matchingStockItem", matchingStockItem);
  return matchingStockItem; // returns undefined if it doesnt exist
};

export const removeOwnedStockItem = (userData, symbol) => {
  userData.portfolio.owned_stocks = userData.portfolio.owned_stocks.filter(
    (stockItem) => {
      if (stockItem.symbol === symbol && stockItem.quantity === 0) {
        return false;
      }
      return true;
    }
  );
};

export const createOwnedStockItem = (userData, order) => {
  if (order.side === "BUY") {
    let quantity = order.quantityFilled;
    const { symbol, executionPrice } = order;
    let currentPrice;

    const stockItem = { symbol, currentPrice, quantity, executionPrice };

    userData.portfolio.owned_stocks.push(stockItem);
  }
};

export const evaluteExecutionPrice = (
  { price1, quantity1, price2, quantity2 },
  shouldAdd
) => {
  let tp;
  if (shouldAdd) {
    tp = price1 * quantity1 + price2 * quantity2;

    return tp / (quantity1 + quantity2);
  }
  tp = price1 * quantity1 - price2 * quantity2;

  return tp / (quantity1 - quantity2);
};

export const updateOwnedStockItem = (userData, order) => {
  let stockItem = getOwnedStockItem(userData, order.symbol);
  if (stockItem) {
    let evaluate = {
      price1: stockItem.executionPrice,
      quantity1: stockItem.quantity,
      price2: order.executionPrice,
      quantity2: order.quantityFilled,
    };
    if (order.side === "BUY") {
      stockItem.executionPrice = evaluteExecutionPrice(evaluate, true);
      stockItem.quantity += order.quantityFilled;
    } else if (order.side === "SELL" && userData.adminType !== "SELLER_BOT") {
      stockItem.quantity -= order.quantityFilled;
      addTradedItem(userData, stockItem, order);
      if (stockItem.quantity === 0) {
        removeOwnedStockItem(userData, stockItem.symbol);
      }
    }
  } else {
    createOwnedStockItem(userData, order);
  }
};

export const reflectOrder = (userData, order) => {
  updateOwnedStockItem(userData, order);
};
