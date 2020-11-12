import { createOrderAlert } from "./alertsFunctions.js";
import { reflectOrder } from "./ownedStockFunctions.js";
import {
  nextId,
  readActiveOrders,
  writeToActiveOrders,
  readCustomerFile,
  writeToCustomerFile,
} from "./ReadWrite.js";

export const getOrder = (userData, id) => {
  let matchingOrder;
  userData.portfolio.active_orders.map((order) => {
    if (order.id === id) {
      matchingOrder = order;
    }
  });
  //console.log("matchingOrder", matchingOrder);
  return matchingOrder;
};

const removeAndDump = (userData, id) => {
  let removedOrder;

  userData.portfolio.active_orders = userData.portfolio.active_orders.filter(
    (order) => {
      if (order.id === id) {
        removedOrder = order;
        return false;
      }
      return true;
    }
  );

  userData.portfolio.history.orders.push(removedOrder);
};

export const createOrder = (userData, orderObj) => {
  const {
    side,
    symbol,
    orderType,
    quantity,
    limitPrice,
    cancelType,
  } = orderObj;

  let startTime = new Date();

  let id = nextId();

  let status = "WORKING"; //FILLED, TERMINATED, PARTIALLY_FILLED
  let quantityFilled = 0;
  let endTime = null;
  let executionPrice = null;

  const order = {
    side,
    symbol,
    orderType,
    quantity,
    limitPrice,
    cancelType,
    startTime,
    id,
    status,
    quantityFilled,
    endTime,
    executionPrice,
  };

  userData.portfolio.active_orders.push(order);

  return order;
};

const orderComparator = (o1, o2) => {
  const asc = [-1, 1];
  const desc = [1, -1];

  if (o1.side === "BUY") {
    if (o1.orderType === "MARKET") {
      return desc[0];
    } else if (o2.orderType === "MARKET") {
      return desc[1];
    }
    return o2.limitPrice - o1.limitPrice;
  } else if (o1.side === "SELL") {
    if (o1.orderType === "MARKET") {
      return asc[0];
    } else if (o2.orderType === "MARKET") {
      return asc[1];
    }
    return o1.limitPrice - o2.limitPrice;
  }
};

//userData must be saved before this is implemented
export const saveActiveOrder = (username, order) => {
  let activeOrders = readActiveOrders();
  let symbol = order.symbol;
  let symbolOrders = activeOrders[symbol];

  if (!symbolOrders) {
    activeOrders[symbol] = { buy: [], sell: [] };
  }

  order.username = username;

  if (order.side === "BUY") {
    activeOrders[symbol].buy.push(order);
    activeOrders[symbol].buy.sort(orderComparator);
  } else if (order.side === "SELL") {
    activeOrders[symbol].sell.push(order);
    activeOrders[symbol].sell.sort(orderComparator);
  }

  writeToActiveOrders(activeOrders);
};

export const removeOrder = (userData, id) => {
  let order = getOrder(userData, id);
  if (order.status !== "CANCELLED") {
    createOrderAlert(userData, order);
    if (order.status !== "TERMINATED") {
      reflectOrder(userData, order);
    }
  }
  if (order.status !== "PARTIALLY_FILLED") {
    removeAndDump(userData, id);
  }
};

export const setOrderStatus = (userData, id, status) => {
  if (typeof status === "string") {
    if (
      ["CANCELLED", "FILLED", "PARTIALLY_FILLED", "TERMINATED"].includes(status)
    ) {
      let order = getOrder(userData, id);
      order.status = status;
    } else {
      throw new Error("order status Not Specified Correctly");
    }
  }
};
