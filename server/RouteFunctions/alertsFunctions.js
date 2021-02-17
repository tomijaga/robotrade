import { getOrder } from "./orderFunctions.js";
import { nextId } from "./ReadWrite.js";
import UserModel from "../models/user.js";

export const createOrderAlert = async (order) => {
  let newAlert = { ...order, stat: order.quantityFilled, type: "ORDER" };
  await UserModel.updateOne(
    { username: order.username },
    {
      $push: {
        order_alerts: newAlert,
      },
    }
  );
  return newAlert;
};

export const createEventAlert =  (event) => {
  let newAlert = { ...event,type: "EVENT" };
   UserModel.updateOne(
    { username: event.username },
    {
      $push: {
        normal_alerts: newAlert,
      },
    }
  );
  return newAlert;
};