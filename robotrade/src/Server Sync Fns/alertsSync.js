import { getOrder } from "./orderSync.js";
import { nextId } from "../CustomFunctions/ReadWrite.js";

export const createOrderAlert = (userData, order) => {
  let dateTime = order.endTime;
  let side = order.side;
  let stat = order.quantityFilled;
  let type = "ORDER";
  let orderStatus = order.status;
  let seen = false;
  let symbol = order.symbol;
  let id = nextId();

  const alert = { symbol, dateTime, side, stat, type, orderStatus, seen, id };

  userData.events.alerts.push(alert);
};
