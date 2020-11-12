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
import { auth } from "../CustomFunctions/Authorize.js";
import {
  getWatchlist,
  createNewWatchlist,
  deleteWatchlist,
  removeWatchlistSymbol,
} from "../CustomFunctions/watchlistFunctions.js";

const router = express.Router();

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

router.get("/", (req, res, next) => {
  let username = req.session.username;
  readCustomerFile(username, (userData) => {
    console.log(username + "'s watchlists", userData.watchlists);
    res.status(200).json(userData.watchlists);
  });
});

router.get("/:watchlistName", (req, res, next) => {
  console.log("getting watchlist ...");
  let username = req.session.username;
  const { watchlistName } = req.params;

  readCustomerFile(username, (userData) => {
    let watchlist = getWatchlist(userData, watchlistName);
    if (watchlist) {
      console.log(watchlist);
      res.status(200).json(watchlist);
    } else {
      console.log("watchlist '" + watchlistName + "' does not exist");
      res
        .status(404)
        .send({ message: "watchlist '" + watchlistName + "' does not exist" });
    }
  });
});

router.post("/:watchlistName", (req, res) => {
  let username = req.session.username;
  let watchlistName = req.params.watchlistName;
  console.log(watchlistName);
  if (("entered", watchlistName)) {
    readCustomerFile(username, (userData) => {
      if (!getWatchlist(userData, watchlistName)) {
        createNewWatchlist(userData, watchlistName);
        writeToCustomerFile(username, userData, () => {
          console.log("adding '", watchlistName, "' to Watchlist");
          res.status(200).json({ watchlistName: watchlistName });
        });
      } else {
        console.log("watchlist '" + watchlistName + "' Already Exists ");
        res
          .status(409)
          .json("watchlist '" + watchlistName + "' Already Exists ");
      }
    });
  } else {
    console.log("watchlistName not defined");
    res.status(400).send("watchlistName not defined");
  }
});

router.put("/:watchlistName/:symbol", (req, res) => {
  let username = req.session.username;
  const { watchlistName, symbol } = req.params;

  if (watchlistName && symbol) {
    readCustomerFile(username, (userData) => {
      const watchlist = getWatchlist(userData, watchlistName);
      if (watchlist) {
        watchlist.symbols.push(symbol);
        writeToCustomerFile(username, userData, () => {
          console.log("adding '", symbol, "' to ", watchlistName);
          res
            .status(200)
            .json({ watchlistName: watchlistName, symbol: symbol });
        });
      } else {
        console.log(`Watchlist '${watchlistName}' does not Exist`);
        res.status(404).send(`Watchlist '${watchlistName}' does not Exist`);
      }
    });
  } else {
    console.log("watchlistName or symbol not defined");
    res.status(400).send("watchlistName or symbol not defined");
  }
});

router.delete("/:watchlistName", (req, res) => {
  let username = req.session.username;
  const watchlistName = req.params.watchlistName;

  if (watchlistName) {
    readCustomerFile(username, (userData) => {
      deleteWatchlist(userData, watchlistName);
      writeToCustomerFile(username, userData, () => {
        console.log("deleting '", watchlistName, "' watchlist");
        res.status(200).json({ watchlistName: watchlistName });
      });
    });
  } else {
    console.log("watchlistName not defined");
    res.status(400).send("watchlistName not defined");
  }
});

router.delete("/:watchlistName/:symbol", (req, res) => {
  let username = req.session.username;
  const { watchlistName, symbol } = req.params;

  if (watchlistName && symbol) {
    readCustomerFile(username, (userData) => {
      const watchlist = getWatchlist(userData, watchlistName);

      if (watchlist) {
        removeWatchlistSymbol(watchlist, symbol);
        writeToCustomerFile(username, userData, () => {
          console.log("removing '", symbol, "' from ", watchlistName);
          res
            .status(200)
            .json({ watchlistName: watchlistName, symbol: symbol });
        });
      } else {
        console.log(`Watchlist '${watchlistName}' does not Exist`);
        res.status(404).send(`Watchlist '${watchlistName}' does not Exist`);
      }
    });
  } else {
    console.log("watchlistName or symbol not defined");
    res.status(400).send("watchlistName or symbol not defined");
  }
});

export default router;
