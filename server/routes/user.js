import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import fs from "fs";
import bodyParser from "body-parser";
import {
  nextId,
  readCustomerFile,
  writeToCustomerFile,
} from "../CustomFunctions/ReadWrite.js";
import initUser from "../initUser.js";
import { createUser } from "../CustomFunctions/userFunctions.js";
import { auth } from "../CustomFunctions/Authorize.js";

const router = express.Router();

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

router.get("/", (req, res) => {
  let username = req.session.username;
  readCustomerFile(username, (userData) => {
    console.log("sent", username + "'s", "userData ");
    res.status(200).json(userData);
  });
});

export default router;
