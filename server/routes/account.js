import path from "path";
import express from "express";
import { fileURLToPath } from "url";
import { dirname } from "path";
import fs from "fs";
import bodyParser from "body-parser";
import {
  accountDeposit,
  accountWithdrawal,
} from "../RouteFunctions/accountFunctions.js";
import UserModel from "../models/user.js";
import paypal from "@paypal/checkout-server-sdk";
import { nextId } from "../RouteFunctions/ReadWrite.js";
import fetch from "node-fetch";

const router = express.Router();

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

router.post("/transactions", getTransactions);
router.get("/details", getDetails);

router.put("/deposit", place_a_deposit);
router.put("/withdrawal", request_a_withdrawal, withdraw_using_paypal);



async function getTransactions(req, res) {
  let username = req.session.username;

  UserModel.findOne({ username }).then((user) => {
    console.log("getting " + username + "'s withdrawals");
    console.log(user.portfolio.transactions);
    res.status(200).json(user.portfolio.transactions);
  });
}
async function getDetails(req, res) {
  let username = req.session.username;

  UserModel.findOne({ username }).then((user) => {
     const {buying_power, net_value, realized_PnL, unrealized_PnL, equity } =  user.portfolio
    let details = {buying_power, net_value, realized_PnL, unrealized_PnL,equity}
    console.log("getting " + username + "'account details");
    console.log(details);
    res.status(200).json(details);
  });
}

async function place_a_deposit(req, res) {
  let username = req.session.username;
  let deposit = req.body.deposit;

  if (deposit && typeof deposit === "number") {
    UserModel.findOne({ username }).then(async (user) => {
      accountDeposit(user, deposit).then((err) => {
        if (err) {
          return res.status(404).send({
            Error: "Cant have more than $1B in the Account",
          });
        } else {
          user.save();
          console.log("- adding '", deposit, "' to account");

          res.json({ deposit: deposit });
        }
      });
    });
  } else {
    console.log("Deposit Value Is not a valid Number");
    res.status(404).send("Deposit Value Is not a valid Number");
  }
}

async function request_a_withdrawal(req, res, next) {
  let username = req.session.username;
  const { withdrawal, userEmail } = req.body;

  if (userEmail && typeof withdrawal === "number") {
    UserModel.findOne({ username }).then(async (user) => {
      accountWithdrawal(user, withdrawal).then((err) => {
        if (err) {
          console.log("Cant Withdraw more Than Available Amount");
          return res.status(404).send({
            Error: "Cant Withdraw more Than Available Amount",
          });
        } else {
          user.save();
          console.log("- removing '", withdrawal, "' from account");
        }
      });
    });
  } else {
    console.log("Withdraw Value Is not a valid Number");
    res.status(404).send("Withdraw Value Is not a valid Number");
  }

  next();
}

async function withdraw_using_paypal(req, res) {
  const { withdrawal, userEmail } = req.body;

  // 1c. Set up the SDK client
  const env = new paypal.core.SandboxEnvironment(
    process.env.PAYPAL_CLIENT,
    process.env.PAYPAL_SECRET
  );
  const paypalClient = new paypal.core.PayPalHttpClient(env);

  // 3. Call PayPal to set up a transaction with payee
  const request = new paypal.orders.OrdersCreateRequest();
  request.prefer("return=representation");
  request.requestBody({
    intent: "CAPTURE",
    purchase_units: [
      {
        amount: {
          currency_code: "USD",
          value: withdrawal,
        },
        payee: {
          email_address: userEmail,
        },
      },
    ],
  });

  // const url ="https://api.sandbox.paypal.com/v2/checkout/orders"

  // fetch(url, {
  // method:"POST",
  // headers: { 'Content-Type': 'application/json',
  // 'prefer':'return=representation',
  //  'Authorization': Bearer },
  // ,
  // body:JSON.stringify( ),
  // }).then((resp)=>resp.json())
  // .then(resp=>console.log(resp))

  let order;
  try {
    console.log(paypalClient);
    order = await paypalClient.execute(request);
  } catch (err) {
    // 4. Handle any errors from the call
    console.error(err);
    return res.sendStatus(500);
  }

  // 5. Return a successful response to the client with the order ID
  res.status(200).json({
    orderID: order.result.id,
    withdrawal: withdrawal,
  });
}
export default router;
