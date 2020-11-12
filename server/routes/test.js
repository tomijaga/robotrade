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
import { executeOrder } from "../CustomFunctions/Execute.js";

const router = express.Router();

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

router.post("/execute", (req, res) => {
  const { username1, username2, id1, id2, price } = req.body;
  let result = executeOrder(username1, id1, username2, id2, price);

  res.json(result);
});

export default router;
