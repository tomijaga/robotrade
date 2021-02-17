import path from "path";
import express from "express";
import { fileURLToPath } from "url";
import { dirname } from "path";
import fs from "fs";
import bodyParser from "body-parser";
import {
  nextId,
  readCustomerFile,
  writeToCustomerFile,
} from "../RouteFunctions/ReadWrite.js";
import {
  createOrder,
  saveActiveOrder,
  removeOrder,
  getOrder,
  setOrderStatus,
  deleteOrder,
} from "../RouteFunctions/orderFunctions.js";

import { executeOrder } from "../Operations/Execute.js";

import { isIdValid } from "../RouteFunctions/Authorize.js";

import OrderModel from "../models/orders.js";
import UserModel from "../models/user.js";

import finnhubPkg from "@stoqey/finnhub/dist/api/index.js";
const { FinnhubAPI } = finnhubPkg;
const finnhub = new FinnhubAPI(process.env.FINNHUB_KEY);

const router = express.Router();

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

router.get("/", async (req, res) => {
  let username = req.session.username;

  let orders = await UserModel.findOne({ username }).select([
    "portfolio.active_orders",
    "portfolio.past_orders",
    "-_id",
  ]);

  orders = orders.portfolio;

  console.log("Sent " + username + "'s orders");
  res.status(200).json(orders);
});

router.get("/:id", isIdValid, (req, res) => {
  let id = req.params.objectId;

  OrderModel.findById({ _id: id }).then((order) => {
    console.log("Sent order " + id + "\n");
    res.status(200).json(order);
  });
});

router.post("/", (req, res) => {
  let username = req.session.username;
  let orderObj = req.body.orderObj;

  createOrder(username, orderObj).then(async (order) => {
    if (order) {
      if (order.orderType === "MARKET") {
        const quote = await finnhub.getQuote(order.symbol);
        console.log("current Price of " + order.symbol, quote.close);

        executeOrder(order, quote.close).then((results) => {
          const { order, alert } = results;
          switch (order.status) {
            case "PARTIALLY_FILLED":
              return req.app.locals.io.emit("order-partially-filled", order);
            case "FILLED":
              return req.app.locals.io.emit("order-filled", order);
            case "TERMINATED":
              return req.app.locals.io.emit("order-terminated", order);
          }

          if (alert) {
            return req.app.locals.io.emit("new-order-alert", alert);
          }
        });
      }

      console.log("Order Created", order);
      return res.status(200).json(order);
    } else {
      console.log("Insufficient Info: Order could not be created");
      return res
        .status(400)
        .send("Insufficient Info: Order could not be created");
    }
  });
});

router.delete("/:id", isIdValid, (req, res) => {
  let username = req.session.username;
  let id = req.params.objectId;

  deleteOrder();
});

export default router;
