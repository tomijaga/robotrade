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
import { auth } from "../RouteFunctions/Authorize.js";
import {
  getWatchlist,
  createNewWatchlist,
  deleteWatchlist,
  removeWatchlistSymbol,
} from "../RouteFunctions/watchlistFunctions.js";
import UserModel from "../models/user.js";
import WatchlistModel, { watchlistSchema } from "../models/watchlist.js";
import watchlist from "../models/watchlist.js";

const router = express.Router();

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

router.get("/", getAllWatchlists);
router.get("/:watchlistName", doesWatchlistExist, getWatchlistFromName);
router.post("/:watchlistName", addWatchlist);
router.put(
  "/:watchlistName/:symbol",
  doesWatchlistExist,
  symbol_is_in_watchlist,
  addSymbolToWatchlist
);
router.delete("/:watchlistName", doesWatchlistExist, removeWatchlist);
router.delete(
  "/:watchlistName/:symbol",
  doesWatchlistExist,
  symbol_is_in_watchlist,
  removeSymbolFromWatchlist
);

async function doesWatchlistExist(req, res, next) {
  let username = req.session.username;
  let watchlistName = req.params.watchlistName;

  let exists = await UserModel.exists({
    username,
    "watchlists.name": watchlistName,
  });

  if (!exists) {
    console.log("Watchlist Does Not Exist");
    return res.status(404).send("Watchlist Does Not Exist");
  }

  next();
}

async function symbol_is_in_watchlist(req, res, next) {
  let username = req.session.username;
  let { watchlistName, symbol } = req.params;

  req.params.symbol = symbol = symbol.toUpperCase();

  let exists = await UserModel.findOne({
    username,
  })
    .select("watchlists -_id ")
    .lean();

  console.log(watchlistName);
  console.log(exists);
  exists = exists.watchlists.find((list) => list.name === watchlistName);
  console.log(exists);
  exists = exists.symbols.includes(symbol);
  console.log("symbol Exists", exists);
  req.params.symbolExists = exists;
  next();
}

async function getAllWatchlists(req, res, next) {
  let username = req.session.username;

  UserModel.findOne({ username }).then((user) => {
    console.log("sent", username + "'s watchlists");
    res.status(200).json(user.watchlists);
  });
}

async function getWatchlistFromName(req, res, next) {
  let username = req.session.username;
  const { watchlistName } = req.params;

  let watchlist = await UserModel.findOne({ username }).select({
    watchlists: { $elemMatch: { name: watchlistName } },
  });
  watchlist = watchlist.watchlists[0];

  console.log(watchlist);
  res.status(200).json(watchlist);
}

async function addWatchlist(req, res) {
  let username = req.session.username;
  let watchlistName = req.params.watchlistName;
  console.log(watchlistName);

  let exists = await UserModel.exists({
    username,
    "watchlists.name": watchlistName,
  });
  if (!exists) {
    let newWatchlist = new WatchlistModel({ name: watchlistName });

    await UserModel.findOneAndUpdate(
      { username },
      { $push: { watchlists: newWatchlist } }
    ).then(async (user) => {
      console.log(
        "adding '",
        watchlistName,
        "' to " + username + "'s Watchlists"
      );
      res.status(200).json({ watchlistName: watchlistName });
    });
  } else {
    console.log("Watchlist already Exists");
    res.status(409).send("Watchlist already Exists");
  }
}

async function addSymbolToWatchlist(req, res) {
  let username = req.session.username;
  const { watchlistName, symbol, symbolExists } = req.params;

  if (!symbolExists) {
    UserModel.findOne({ username }).exec((err, user) => {
      if (err) return res.status(404).send("Could not save Symbol to database");

      let watchlist = user.watchlists.find(
        (list) => list.name === watchlistName
      );

      watchlist.symbols.push(symbol);
      user.save();
      console.log(
        `symbol (${symbol}) has been added to watchlist (${watchlistName})`
      );
      res.status(200).json({ symbol, watchlistName });
    });
  } else {
    console.log(
      "Symbol:[" + symbol + "] is Already in watchlist:[" + watchlistName + "]"
    );
    res
      .status(409)
      .send(
        "Symbol (" +
          symbol +
          ") is Already in watchlist (" +
          watchlistName +
          ")"
      );
  }
}

async function removeWatchlist(req, res) {
  let username = req.session.username;
  const watchlistName = req.params.watchlistName;

  UserModel.findOneAndUpdate(
    { username },
    { $pull: { watchlists: { name: watchlistName } } }
  ).exec((err) => {
    if (err) {
      throw err;
    } else {
      console.log("watchlist (" + watchlistName + ") has been deleted");
      res.status(200).json({ watchlistName });
    }
  });
}

async function removeSymbolFromWatchlist(req, res) {
  let username = req.session.username;
  const { watchlistName, symbol, symbolExists } = req.params;

  if (symbolExists) {
    UserModel.findOne({ username }).then(async (user) => {
      let watchlist = user.watchlists.find(
        (list) => list.name === watchlistName
      );
      //console.log(watchlist);
      removeWatchlistSymbol(watchlist, symbol);
      //console.log(watchlist);

      await user.save();
    });
    console.log(
      "Symbol (" +
        symbol +
        ") has been removed from watchlist (" +
        watchlistName +
        ")"
    );
    res.status(200).json({ watchlistName: watchlistName, symbol: symbol });
  } else {
    console.log(
      "Symbol (" +
        symbol +
        ") does not Exist in watchlist (" +
        watchlistName +
        ")"
    );
    res
      .status(404)
      .send(
        "Symbol (" +
          symbol +
          ") does not Exist in watchlist (" +
          watchlistName +
          ")"
      );
  }
}

export default router;
