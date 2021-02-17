import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import fs from "fs";
import bodyParser from "body-parser";
import {
  nextId,
  readCustomerFile,
  writeToCustomerFile,
} from "../RouteFunctions/ReadWrite.js";
import { getOrder, removeOrder } from "../RouteFunctions/orderFunctions.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const validateOrderTransaction = (username1, id1, username2, id2) => {
  let userData1 = readCustomerFile(username1);
  let order1 = getOrder(userData1, id1);

  let userData2 = readCustomerFile(username2);
  let order2 = getOrder(userData2, id2);

  let proceed = true;

  if (order1.side === order2.side) {
    proceed = false;
  }

  if (order1.symbol !== order1.symbol) {
    proceed = false;
  }

  if (order1.quantity >= order1.quantityFilled) {
    proceed = false;
  }
  if (order2.quantity >= order2.quantityFilled) {
    proceed = false;
  }

  return proceed;
};
