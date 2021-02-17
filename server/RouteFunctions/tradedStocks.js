import UserModel from "../models/user.js";

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

export const addTradedItem = (order, PnL) => {
  UserModel.findOne({ username: order.username }).exec((err, user) => {
    if (err) {
      console.error(err);
    } else {
      let tradedItem = user.portfolio.traded_stocks.find((stock) => {
        return stock.symbol === order.symbol;
      });

      if (tradedItem) {
        setNewData(userData, tradedItem, stockItem, order);

        tradedItem.PnL += PnL;
      } else {
        tradedItems.push({ symbol: order.symbol, PnL: PnL });
      }
      user.save();
    }
  });
};
