import { createOrderAlert } from "./alertsFunctions.js";
import { reflectOrder } from "./ownedStockFunctions.js";
import {
  nextId,
  readActiveOrders,
  writeToActiveOrders,
  readCustomerFile,
  writeToCustomerFile,
} from "./ReadWrite.js";
import UserModel from "../models/user.js";
import OrderModel from "../models/orders.js";
import { randomInteger } from "../Operations/randomn.js";
import cloneDeep from "lodash/cloneDeep.js";
import omit from "lodash/omit.js";
import mongoose from "mongoose";
import fetch from "node-fetch";

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

export const createOrder = async (username, orderObj) => {
  const {
    side,
    symbol,
    orderType,
    quantity,
    limitPrice,
    expireType,
  } = orderObj;

  if (side && symbol && orderType && quantity && expireType) {
    let _id = new mongoose.Types.ObjectId();
    const order = {
      side,
      symbol,
      orderType,
      quantity,
      limitPrice,
      expireType,
      _id,
    };

    let newOrder = new OrderModel(orderObj);
    let newOrderRef = new OrderModel({ ...order, username });

    UserModel.findOne({ username }).then(async (user) => {
      user.portfolio.active_orders.push(newOrder);
      await user.save();
      await newOrderRef.save();
    });
    return newOrderRef;
  } else {
    return false;
  }
};

export const createCompOrder = async (order) => {
  const compObj = cloneDeep(order);

  let promise = new Promise((resolve, reject) => {
    fetch("https://randomuser.me/api/1.3?nat=us,dk,fr,gb")
      .then((res) => res.json())
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });

  await promise
    .then((res) => {
      const { first, last } = res.results[0].name;
      compObj.username = `${first}_${last}`;
      compObj.side = order.side === "BUY" ? "SELL" : "BUY";
      compObj.quantity = randomInteger(
        compObj.quantity * 0.1,
        compObj.quantity * 1.5
      );
    })
    .catch((err) => {
      throw err;
    });

  return compObj;
};

export const deleteOrder = async (order) => {
  const { _id, username } = order;
  console.log(order);
  let exists = await OrderModel.exists({ _id });

  if (exists) {
    await OrderModel.findByIdAndDelete({ _id });
    await UserModel.updateOne(
      { username },
      { $pull: { "portfolio.active_orders": { _id } } }
    );

    await UserModel.updateOne(
      { username },
      {
        $push: {
          "portfolio.past_orders": order,
        },
      }
    );

    console.log(`Deleted order (${_id})`);
    return order;
  } else {
    throw new Error("Cant delete because order does not exist");
  }
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

export const removeOrder = async (order) => {
  console.log(order);
  if (order.status !== "TERMINATED") {
    reflectOrder(order);
  }

  // if (order.status !== "PARTIALLY_FILLED") {
  //   deleteOrder(order);
  // }
  return createOrderAlert(order);
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
