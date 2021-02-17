import { addTradedItem } from "./tradedStocks.js";
import UserModel from "../models/user.js";
import finnhubPkg from "@stoqey/finnhub/dist/api/index.js";
import { updateAccount } from "./accountFunctions.js";
const { FinnhubAPI } = finnhubPkg;
const finnhub = new FinnhubAPI(process.env.FINNHUB_KEY);

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

export const removeOwnedStockItem = async (username, symbol) => {
  await UserModel.findOneAndUpdate(
    { username },
    {
      $pull: {
        "portfolio.currently_owned_stocks": { $elemMatch: { symbol: symbol } },
      },
    }
  );
};

export const createOwnedStockItem = (order) => {
  if (order.side === "BUY") {
    UserModel.findOneAndUpdate(
      { username: order.username },
      {
        $push: {
          "portfolio.currently_owned_stocks": {
            ...order,
            quantity: order.quantityFilled,
          },
        },
      }
    ).then(() =>
      console.log("Adding " + order.symbol + " To Your Purchased Stocks ...")
    );
  }
};

export const avgPrice = (
  { price1, quantity1, price2, quantity2 },
  shouldAdd
) => {
  let tp;

  if (shouldAdd) {
    tp = price1 * quantity1 + price2 * quantity2;
    let avg = tp / (quantity1 + quantity2);

    return Number(avg.toFixed(2));
  } else {
    tp = price1 * quantity1 - price2 * quantity2;

    let avg = tp / (quantity1 - quantity2);
    return Number(avg.toFixed(2));
  }
};

export const updateOwnedStockItem = async (order) => {
  let exists = await UserModel.exists({
    "portfolio.currently_owned_stocks.symbol": order.symbol,
  });

  if (exists) {
    let user = await UserModel.findOne({
      username: order.username,
    });

    let ownedStock = user.portfolio.currently_owned_stocks;
    ownedStock = ownedStock.find((stock) => {
      return stock.symbol === order.symbol;
    });

    console.log(ownedStock);

    console.log(order);
    let evaluate = {
      price1: order.executionPrice,
      quantity1: order.quantityFilled,
      price2: ownedStock.executionPrice,
      quantity2: ownedStock.quantity,
    };
    if (order.side === "BUY") {
      let newQuantity = order.quantity + ownedStock.quantity;
      await UserModel.updateOne(
        {
          username: order.username,
          "portfolio.currently_owned_stocks.symbol": order.symbol,
        },
        {
          $set: {
            "portfolio.currently_owned_stocks.$.quantity": newQuantity,
            "portfolio.currently_owned_stocks.$.executionPrice": avgPrice(
              evaluate,
              true
            ),
          },
        }
      );
    } else if (order.side === "SELL") {
      let newQuantity = ownedStock.quantity - order.quantityFilled;
      await UserModel.updateOne(
        {
          username: order.username,
          "portfolio.currently_owned_stocks.symbol": order.symbol,
        },
        {
          $set: {
            "portfolio.currently_owned_stocks.$.quantity": newQuantity,
          },
        }
      );

      const quote = await finnhub.getQuote(order.symbol);

      let position = user.portfolio.currently_owned_stocks;
      position = position.find((stock) => {
        return stock.symbol === order.symbol;
      });

      let equity = order.quantityFilled * position.executionPrice;
      let mktValue = order.quantityFilled * quote.close;

      position.currentPrice = quote.close;

      const PnL = mktValue - equity;

      addTradedItem(order, PnL);
      updateAccount(equity, order, PnL);
      if (newQuantity === 0) {
        removeOwnedStockItem(order.username, order.symbol);
      }
    }
    user.save();
  } else {
    createOwnedStockItem(order);
  }
};

export const reflectOrder = async (order) => {
  console.log("reflecting Order (" + order._id + ")");
  await updateOwnedStockItem(order);
  //removeOwnedStockItem(order.username, order.symbol);
};
