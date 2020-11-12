import path from "path";
import express from "express";
import { fileURLToPath } from "url";
import { dirname } from "path";
import fs from "fs";
import bodyParser from "body-parser";
import { readStockHistory } from "../CustomFunctions/ReadWrite.js";
import reverse from "lodash/reverse.js";
import fetch from "node-fetch";
import { FinnhubAPI } from "@stoqey/finnhub/dist/api/index.js";
import FINNHUB from "../ssl/Finnhub.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const router = express.Router();

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

router.get("/:symbol/history", symbolHistory);
router.get("/:symbol", stockData);
router.get("/", async (req, res) => {
  const { symbol, minPrice, maxPrice } = req.query;
});

async function symbolHistory(req, res) {
  const { symbol } = req.params;
  let { startDate, endDate, minQuantity, maxQuantity } = req.query;

  if (startDate) {
    startDate = reverse(startDate.split("/")).join("/");
    startDate = new Date(new Date(startDate).getTime() - 1000 * 60 * 60 * 4);
  } else {
    console.log("auto startDate");
    startDate = new Date("2020-11-04T00:00:00.000Z");
  }
  if (endDate) {
    endDate = reverse(endDate.split("/")).join("/");
    endDate = new Date(new Date(endDate).getTime() - 1000 * 60 * 60 * 4);
  } else {
    endDate = new Date(new Date().getTime() - 1000 * 60 * 60 * 4);
  }

  console.log("\nreq.params and Query");
  console.log({ ...req.params, ...req.query });

  minQuantity = minQuantity ? minQuantity * 1 : 0;
  maxQuantity = maxQuantity ? maxQuantity * 1 : Infinity;

  let filePath = path.resolve(__dirname, "../Data/Stocks", symbol + ".json");

  if (fs.existsSync(filePath)) {
    console.log("\nNew Stock History Query ...");
    let stockHistory = readStockHistory(symbol);

    console.log("startDate:", startDate);
    console.log("endDate:", endDate);
    console.log("minQuantity:", minQuantity);
    console.log("maxQuantity", maxQuantity);

    if (minQuantity <= maxQuantity) {
      stockHistory = stockHistory.filter((order) => {
        if (order.quantity >= minQuantity && order.quantity <= maxQuantity) {
          return true;
        }
        return false;
      });
    }

    stockHistory = stockHistory.filter((order) => {
      let date = new Date(order.dateTime);
      return (
        endDate.getTime() >= date.getTime() &&
        startDate.getTime() <= date.getTime()
      );
    });

    console.log(stockHistory);

    return res.json({
      symbol,
      startDate: startDate.toUTCString().substring(5, 16),
      endDate: endDate.toUTCString().substring(5, 16),
      minQuantity,
      maxQuantity,
      history: stockHistory,
    });
  } else {
    return res.json({
      message:
        "We dont Have any transaction history on symbol: " + `'${symbol}'`,
    });
  }
}

async function stockData(req, res) {
  const { symbol } = req.params;

  let { startDate, endDate } = req.query;

  if (!(startDate || endDate)) {
    console.log("not defined");

    let date = new Date();
    let x = {
      day: date.getDate(),
      month: date.getMonth(),
      year: date.getFullYear(),
    };

    startDate = new Date(
      `${x.year}-${x.month + 1}-${
        x.day < 10 ? "0" + x.day : x.day
      }T00:00:00.000Z`
    );

    endDate = new Date();
  } else {
    if (startDate) {
      startDate = reverse(startDate.split("/")).join("-") + "T00:00:00.000Z";
      startDate = new Date(startDate);
    } else {
      startDate = new Date("2020-11-04T00:00:00.000Z");
    }
    if (endDate) {
      endDate = reverse(endDate.split("/")).join("-") + "T00:00:00.000Z";
      endDate = new Date(endDate);
    } else {
      endDate = new Date();
    }
  }

  const finnhub = new FinnhubAPI(FINNHUB);

  const candles = await finnhub.getCandles(symbol, startDate, endDate, "D");

  console.log("startDate", startDate);
  console.log("endDate", endDate);
  console.log(candles);
  if (candles.length === 0) {
    if (
      startDate.toString() === "Invalid Date" ||
      endDate.toString() === "Invalid Date"
    ) {
      console.log({ Error: "use the dd/mm/yyyy format for date query" });
      return res.status(404).json({
        Error: "use the dd/mm/yyyy format for date query",
      });
    } else if (startDate.getTime() > endDate.getTime()) {
      console.log({ Error: "startDate should be before endDate" });
      return res.status(404).json({
        Error: "startDate should be before endDate",
      });
    }
  }
  res.json({
    symbol,
    startDate: startDate.toUTCString().substring(5, 16),
    endDate: endDate.toUTCString().substring(5, 16),
    stockInfo: candles,
  });
}
export default router;
