import path from "path";
import express from "express";
import { fileURLToPath } from "url";
import { dirname } from "path";
import UserModel from "../models/user.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const router = express.Router();

router.get("/", getOwnedStocks);

async function getOwnedStocks(req, res) {
  const username = req.session.username;

  await UserModel.findOne({ username })
    .select("portfolio.currently_owned_stocks _id")
    .exec((err, result) => {
      if (err) {
        res.status(500).send("Something went wrong");
      }
      console.log(result);
      res.status(200).json(result.portfolio.currently_owned_stocks);
    });
}

export { router as ownedStocksRoute };
