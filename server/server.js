import express from "express";
import path from "path";
import cors from "cors";
import { indexRoute } from "./routes/index.js";
import watchlistRoute from "./routes/watchlist.js";
import accountRoute from "./routes/account.js";
import orderRoute from "./routes/order.js";
import eventsRoute from "./routes/events.js";
import testRoute from "./routes/test.js";
import stocksRoute from "./routes/stocks.js";
import fs, { accessSync } from "fs";
import { fileURLToPath } from "url";
import { dirname } from "path";
import http from "http";
//import socketIO from "socket.io";
import WebSocket from "ws";
import initUser from "./initUser.js";
import userRoute from "./routes/user.js";
import cookieParser from "cookie-parser";
import express_session from "express-session";
import sharedsession from "express-socket.io-session";
import socketIOClient from "socket.io-client";
import requirejs from "requirejs";
import {
  writeToStockHistory,
  readCustomerFile,
  writeToCustomerFile,
} from "./CustomFunctions/ReadWrite.js";
import merge from "lodash/merge.js";
import { createUser } from "./CustomFunctions/userFunctions.js";
import { accountDeposit } from "./CustomFunctions/accountFunctions.js";
import { randomPrice, randomInteger } from "./CustomFunctions/randomn.js";
import { createOrder } from "./CustomFunctions/orderFunctions.js";
import { executeOrder } from "./CustomFunctions/Execute.js";
import { login, logout, auth } from "./CustomFunctions/Authorize.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

const session = express_session({
  secret: "some secret here",
  rolling: true,
  resave: true,
  name: "session",
  saveUninitialized: true,
  rolling: true,
  cookie: {
    maxAge: 1000 * 60 * 30,
  },
});

const server = http.createServer(app);
const io = requirejs("socket.io")(server);

// if (process.env.NODE_ENV === "development") {
//   app.use(cors());
// }
app.use(
  cors({
    origin: [
      "http://localhost:8080",
      "https://localhost:8080",
      "https://localhost:3000",
      "http://localhost:3000",
    ],
    credentials: true,
    exposedHeaders: ["set-cookie"],
  })
);
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(session);

io.use(
  sharedsession(session, {
    autoSave: true,
  })
);

const connections = [];
io.on("connection", (socket) => {
  connections.push(socket);

  console.log(" %s sockets are connected", connections.length);
  socket.on("login", function (userdata) {
    socket.handshake.session.userdata = userdata;
    socket.handshake.session.save();
  });
  socket.on("logout", function (userdata) {
    if (socket.handshake.session.userdata) {
      delete socket.handshake.session.userdata;
      socket.handshake.session.save();
    }
  });
  socket.on("disconnect", () => {
    connections.splice(connections.indexOf(socket), 1);
    console.log("disconnected");
  });
});

app.use(express.static(path.join(__dirname, "build")));

const admin = (req, res, next) => {
  res.status(200).send("Welcome to admin Page ," + req.session.username);
  return;
};

app.use("/", indexRoute);
app.use("/watchlists", auth, watchlistRoute);
app.use("/account", auth, accountRoute);
app.use("/orders", auth, orderRoute);
app.use("/events", auth, eventsRoute);
app.use("/user", auth, userRoute);
app.use("/test", testRoute);
app.use("/stocks", stocksRoute);
app.get("/admin", auth, admin);

server.listen(8080, function () {
  console.log("CORS-enabled web server listening on port 8080");
});

app.get("/", (req, res, next) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
  next();
});

const shutDownServer = () => {
  console.log("\nReceived kill signal");
  console.log("Shutting D... o.. w. n");
  process.exit(0);
  server.close(() => {
    console.log("Shutting D... o.. w. n");
  });
};

process.on("SIGTERM", shutDownServer);
process.on("SIGINT", shutDownServer);
process.on(
  "uncaughtException",
  (err) => {
    console.log("------Uncaught Exception------");
    console.error(err);
  },
  shutDownServer
);

app.post("/update", (req, res, next) => {
  let userFile = req.body.username + ".json";

  let userData = fs.readFileSync(
    path.resolve(__dirname, "./Data/Users", userFile)
  );
  userData = JSON.parse(userData);

  let objMerge = merge(initUser, userData);
  console.log(objMerge);
  fs.writeFileSync(
    path.resolve(__dirname, "./Data/Users", userFile),
    JSON.stringify(objMerge)
  );
  res.json(objMerge);
});

const create40Robots = () => {
  for (let i = 1; i <= 40; i++) {
    let username = "robot" + (i < 10 ? "0" + i : i);

    let userData = createUser(username);
    accountDeposit(userData, 1000000);

    if (i >= 30) {
      userData.adminType = "SELLER_BOT";
    }

    writeToCustomerFile(username, userData);
    console.log(username, "created!:", userData.portfolio.account_value);
  }
};

app.post("/create40Robots", (req, res) => {
  create40Robots();
  console.log(initUser.portfolio.account_value);
  res.json({ "40 Robots Created!!": "key" });
});

const createRandomnOrder = (username) => {
  let userData = readCustomerFile(username);

  let side = "BUY"; //randomInteger(0, 1) === 0 ? "BUY" : "BUY";
  let symbol = "TSLA";
  let orderType = "MARKET";
  let quantity = randomInteger(25, 300);

  let orderObj = { side, symbol, orderType, quantity };
  let createdOrder = createOrder(userData, orderObj);
  writeToCustomerFile(username, userData);

  return createdOrder;
};

const createComplementaryOrder = (order) => {
  let compUsername;

  if (order.side === "SELL") {
    let random = randomInteger(1, 29);
    compUsername = "robot" + (random < 10 ? "0" + random : random);
  } else if (order.side === "BUY") {
    compUsername = "robot" + randomInteger(30, 40);
  }

  console.log(compUsername);

  let userData = readCustomerFile(compUsername);

  let side = order.side === "BUY" ? "SELL" : "BUY";
  let symbol = "TSLA";
  let orderType = "MARKET";
  let quantity = randomInteger(25, 300);

  let orderObj = { side, symbol, orderType, quantity };
  let compOrder = createOrder(userData, orderObj);
  writeToCustomerFile(compUsername, userData);

  return { compUsername, compOrder };
};

const processingOfOrder = (username, order) => {
  const { compUsername, compOrder } = createComplementaryOrder(order);
  console.log(compUsername, compOrder);
  let randPrice = randomPrice(0.1, (randomInteger(0.1, 32) * 100) / 3);
  return executeOrder(
    username,
    order.id,
    compUsername,
    compOrder.id,
    randPrice
  );
};

app.use("/test/processOrder", (req, res) => {
  let rand = randomInteger(1, 29);
  let username = "robot" + (rand < 10 ? "0" + rand : rand);
  username = req.body.username;
  console.log(username);
  let order = createRandomnOrder(username);
  console.log(order);
  let orderDetails = processingOfOrder(username, order);

  res.json(orderDetails);
});
