export const getTradedStock = (userData, symbol) => {
  let matchingTradedItem;
  userData.portfolio.traded_stocks.map((tradedItem) => {
    if (tradedItem.symbol === symbol) {
      matchingTradedItem = tradedItem;
    }
  });
  console.log("matchingTradedItem", matchingTradedItem);
  return matchingTradedItem; // returns undefined if it doesnt exist
};

const setNewData = (userData, tradedItem, stockItem, order) => {
  let startPrice = stockItem.executionPrice;
  let endPrice = order.executionPrice;

  let quantity = order.quantityFilled;

  let PnL = endPrice * quantity - startPrice * quantity;

  let newItem = { quantity, PnL, dateTime: order.endTime };
  tradedItem.data.push(newItem);
  tradedItem.total_PnL += PnL;
  tradedItem.total_quantity += quantity;

  userData.portfolio.stocks_PnL += PnL;
};

export const createTradedStock = (userData, stockItem, order) => {
  let tradedItem = {
    symbol: stockItem.symbol,
    data: [],
    total_PnL: 0,
    total_quantity: 0,
  };
  setNewData(userData, tradedItem, stockItem, order);
  userData.portfolio.traded_stocks.push(tradedItem);
};

export const addTradedItem = (userData, stockItem, order) => {
  let tradedItem = getTradedStock(userData, stockItem.symbol);

  if (tradedItem) {
    setNewData(userData, tradedItem, stockItem, order);
  } else {
    createTradedStock(userData, stockItem, order);
  }
};
