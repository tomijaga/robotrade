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
import { accountDeposit } from "../CustomFunctions/accountFunctions.js";
import { auth } from "../CustomFunctions/Authorize.js";

const router = express.Router();

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

router.get("/", (req, res) => {
  let username = req.session.username;

  readCustomerFile(username, (userData) => {
    console.log("getting account");
    console.log(userData.portfolio.account_value);
    res.status(200).json({ account: userData.portfolio.account_value });
  });
});

router.get("/deposit", (req, res) => {
  let username = req.session.username;

  readCustomerFile(username, (userData) => {
    console.log("getting " + username + "'s deposits");
    console.log(userData.portfolio.history.deposits);
    res.status(200).json({ deposits: userData.portfolio.history.deposits });
  });
});

router.get("/withdrawal", (req, res) => {
  let username = req.session.username;

  readCustomerFile(username, (userData) => {
    console.log("getting " + username + "'s withdrawals");
    console.log(userData.portfolio.history.withdrawals);
    res
      .status(200)
      .json({ withdrawals: userData.portfolio.history.withdrawals });
  });
});

router.put("/deposit", (req, res) => {
  let username = req.session.username;
  let deposit = req.body.deposit;

  if (deposit && typeof deposit === "number") {
    readCustomerFile(username, (userData) => {
      let errorOccurred = accountDeposit(userData, deposit);
      if (errorOccurred) {
        return res.status(404).send({
          message: "Cant have more than $1B in the Account",
        });
      } else {
        writeToCustomerFile(username, userData, () => {
          console.log("- Writing to file");
          console.log("- adding '", deposit, "' to account");
          res.json({ deposit: deposit });
        });
      }
    });
  } else {
    console.log("Deposit Value Is not a valid Number");
    res.status(404).send("Deposit Value Is not a valid Number");
  }
});

router.put("/withdrawal", (req, res) => {
  let username = req.session.username;
  const withdrawal = req.body.withdrawal;

  if (withdrawal && typeof withdrawal === "number") {
    readCustomerFile(username, (userData) => {
      if (!(userData.portfolio.account_value - withdrawal < 0)) {
        userData.portfolio.account_value -= withdrawal;
        userData.portfolio.history.withdrawals.push({
          value: withdrawal,
          time: new Date(),
        });
      } else {
        return res.status(404).send({
          message: "Cant Withdraw More Than Your Account Value!",
        });
      }

      writeToCustomerFile(username, userData, () => {
        console.log("withdrawing '", withdrawal, "' from account");
        res.json({ withdrawal: withdrawal });
      });
    });
  } else {
    console.log("Withdraw Value Is not a valid Number");
    res.status(404).send("Withdraw Value Is not a valid Number");
  }
});

export default router;
