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
} from "../CustomFunctions/ReadWrite.js";
import {
  createOrder,
  saveActiveOrder,
  removeOrder,
  getOrder,
  setOrderStatus,
} from "../CustomFunctions/orderFunctions.js";

const router = express.Router();

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

router.get("/", (req, res) => {
  let username = req.session.username;
  readCustomerFile(username, (userData) => {
    console.log("All " + username + "'s Orders");
    console.log(userData.portfolio.active_orders);
    res.status(200).json(userData.portfolio.active_orders);
  });
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  let username = req.session.username;

  if (id) {
    readCustomerFile(username, (userData) => {
      let order = getOrder(userData, id);
      console.log("Getting Order", id);
      if (order) {
        console.log(order);
        res.status(200).json(order);
      } else {
        console.log("No Order With id [", id, "] was found");
        res.status(404).send("No Order With id [", id, "] was found");
      }
    });
  } else {
    console.log("ID not Specified");
    return res.status(400).send({ message: "ID not Specified" });
  }
});

router.post("/", (req, res) => {
  let username = req.session.username;
  let orderObj = req.body;
  readCustomerFile(username, (userData) => {
    let order = createOrder(userData, orderObj);
    writeToCustomerFile(username, userData, () => {
      saveActiveOrder(username, order);
      console.log("adding Order");
      console.log(order);
      res.json({ order: order });
    });
  });
});

router.delete("/:id", (req, res) => {
  let username = req.session.username;
  let id = req.params.id;

  readCustomerFile(username, (userData) => {
    if (getOrder(userData, id)) {
      setOrderStatus(userData, id, "CANCELLED");
      removeOrder(userData, id);
      writeToCustomerFile(username, userData, () => {
        console.log("Removed Order,", id);
        return res.json({ id: id });
      });
    } else {
      console.log("Order with id[" + id + "] Does not Exist");
      return res.status(404).send({
        message: "Order with id[" + id + "] Does not Exist",
      });
    }
  });
});

export default router;
