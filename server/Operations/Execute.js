import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import fs from "fs";
import bodyParser from "body-parser";
import StockHistoryModel from "../models/stocks.js";

import {
  getOrder,
  createCompOrder,
  removeOrder,
  deleteOrder,
} from "../RouteFunctions/orderFunctions.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const executeOrder = async (order, price) => {
  let compOrder = await createCompOrder(order);

  let quantity;
  let dateTime;
  console.log("price type", typeof price);

  if (order && compOrder) {
    order.executionPrice = compOrder.executionPrice = price;
    order.endTime = compOrder.endTime = dateTime = new Date(
      new Date().getTime() - 1000 * 60 * 60 * 4
    );
    const buyerName =
      order.side === "BUY" ? order.username : compOrder.username;
    const sellerName =
      compOrder.side === "SELL" ? compOrder.username : order.username;

    if (order.quantity > compOrder.quantity) {
      quantity = compOrder.quantity;

      order.quantityFilled = compOrder.quantityFilled = quantity;
      compOrder.status = "FILLED";
      order.status = "PARTIALLY_FILLED";
    } else if (order.quantity < compOrder.quantity) {
      quantity = order.quantity;

      compOrder.quantityFilled = order.quantityFilled = quantity;
      order.status = "FILLED";
      compOrder.status = "PARTIALLY_FILLED";
    } else {
      order.status = compOrder.status = "FILLED";

      order.quantityFilled = compOrder.quantityFilled = quantity =
        compOrder.quantity;
    }

    const { symbol } = order;

    let orderHistory = {
      buyerName,
      sellerName,
      buyPrice: price,
      sellPrice: price,
      quantity,
      dateTime,
    };

    let stockExists = await StockHistoryModel.exists({ symbol });

    if (stockExists) {
      StockHistoryModel.findOne({ symbol }).then((stock) => {
        stock.history.push(orderHistory);
        stock.save();
      });
    } else {
      let newStock = new StockHistoryModel({
        ...orderHistory,
        symbol,
      });
      newStock.save();
    }

    let newAlert;
    await removeOrder(order)
      .then((alert) => (newAlert = alert))
      .catch(console.log);

    return {
      alert: newAlert,
      order: order,
      compOrder: compOrder,
      orderHistory,
    };
  } else {
    console.log("EXECUTION ERROR");
    console.error("COULD not Find ORDERS");

    return { message: "ERROR:COULD NOT FIND ORDERs" };
  }
};
