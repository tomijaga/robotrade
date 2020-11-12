import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import fs from "fs";
import bodyParser from "body-parser";
import {
  nextId,
  readCustomerFile,
  writeToCustomerFile,
  writeToStockHistory,
} from "./ReadWrite.js";
import { getOrder, removeOrder } from "./orderFunctions.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const executeOrder = (username1, id1, username2, id2, price) => {
  let userData1 = readCustomerFile(username1);
  let order1 = getOrder(userData1, id1);

  let userData2 = readCustomerFile(username2);
  let order2 = getOrder(userData2, id2);
  let quantity;
  let dateTime;

  if (order1 && order2) {
    order1.executionPrice = order2.executionPrice = price;
    order1.endTime = order2.endTime = dateTime = new Date(
      new Date().getTime() - 1000 * 60 * 60 * 4
    );
    const buyerName = order1.side === "BUY" ? username1 : username2;
    const sellerName = order2.side === "SELL" ? username2 : username1;

    if (order1.quantity > order2.quantity) {
      quantity = order2.quantity;

      order1.quantityFilled = order2.quantityFilled = quantity;
      order2.status = "FILLED";
      order1.status = "PARTIALLY_FILLED";
    } else if (order1.quantity < order2.quantity) {
      quantity = order1.quantity;

      order2.quantityFilled = order1.quantityFilled = quantity;
      order1.status = "FILLED";
      order2.status = "PARTIALLY_FILLED";
    } else {
      order1.status = order2.status = "FILLED";

      order1.quantityFilled = order2.quantityFilled = quantity =
        order2.quantity;
    }

    const orderHistory = {
      buyerName,
      sellerName,
      buyPrice: price,
      sellPrice: price,
      quantity,
      dateTime,
    };

    removeOrder(userData1, id1);
    removeOrder(userData2, id2);

    writeToCustomerFile(username1, userData1);
    writeToCustomerFile(username2, userData2);

    writeToStockHistory(order1.symbol, orderHistory);

    console.log("EXECUTED ORDER:");
    console.log(orderHistory);

    return { [username1]: order1, [username2]: order2, orderHistory };
  } else {
    console.log("EXECUTION ERROR");
    console.error("COULD not Find ORDERS");

    return { message: "ERROR:COULD NOT FIND ORDERs" };
  }
};
