import express from "express";
import { fileURLToPath } from "url";
import { dirname } from "path";
import bodyParser from "body-parser";
import UserModel from "../models/user.js";
import compareDesc from "date-fns/compareDesc/index.js";

const router = express.Router();
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

router.get("/", (req, res) => {
  let username = req.session.username;

  UserModel.findOne({ username }).exec((err, user) => {
    let normal_alerts = user.normal_alerts;
    let order_alerts = user.order_alerts;

    const notifications = [...normal_alerts, ...order_alerts];
    notifications.sort((a, b) => {
      compareDesc(a.dateTime, b.dateTime);
    });
    console.log("Sent Notifications");
    return res.status(200).json(notifications);
  });
});

router.put("/", (req, res) => {
  let username = req.session.username;

  UserModel.find({ username }).exec((err, user) => {
    const { normal_alerts, order_alerts } = user;

    const notifications = [...normal_alerts, ...order_alerts];
    notifications.forEach((alert) => {
      alert.seen = true;
    });

    notifications.length =
      notifications.length > 500 ? 500 : notifications.length;

    user.save();
  });
});

export default router;
