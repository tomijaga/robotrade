import requirejs from "requirejs";
import dotenv from "dotenv";
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
import notificationsRoute from "./routes/notifications.js";
import { ownedStocksRoute } from "./routes/ownedStocks.js";
import fs, { accessSync } from "fs";
import { fileURLToPath } from "url";
import { dirname } from "path";
import http from "http";
//import socketIO from "socket.io";
import initUser from "./initUser.js";
import userRoute from "./routes/user.js";
import cookieParser from "cookie-parser";
import express_session from "express-session";
import sharedsession from "express-socket.io-session";
import socketIOClient from "socket.io-client";
import mongo from "mongodb";
import mongoose from "mongoose";

import merge from "lodash/merge.js";
import { createUser } from "./RouteFunctions/userFunctions.js";
import { accountDeposit } from "./RouteFunctions/accountFunctions.js";
import { randomPrice, randomInteger } from "./Operations/randomn.js";
import {
  createOrder,
  createCompOrder,
} from "./RouteFunctions/orderFunctions.js";
import { executeOrder } from "./Operations/Execute.js";
import { login, logout, auth } from "./RouteFunctions/Authorize.js";
import UserModel from "./models/user.js";
import OrderModel from "./models/orders.js";
import EventModel from "./models/event.js";
import LoginModel from "./models/Login.js";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

var expressWs = requirejs("express-ws")(app);
const MongoDBStore = requirejs("connect-mongodb-session")(express_session);

let sessionStore = new MongoDBStore({
  uri: `mongodb+srv://tomijaga:robotrade@cluster.ftv5l.gcp.mongodb.net/robotradeDB?retryWrites=true&w=majority`,
  collection: "mySessions",
});

sessionStore.on("error", function (error) {
  console.log(error);
});

const session = express_session({
  secret: "some secret here",
  rolling: true,
  resave: true,
  name: "session",
  saveUninitialized: true,
  rolling: true,
  store: sessionStore,
  cookie: {
    maxAge: 1000 * 60 * 30,
  },
});

const server = http.createServer(app);
const io = requirejs("socket.io")(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

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
      "https://desolate-eyrie-26149.herokuapp.com/app/watchlist",
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

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});

//map db to app.locals
app.locals.db = mongoose.connection;

app.on("error", console.error.bind(console, "Database connection error:"));
app.locals.db.once("open", () => {
  //Start listening when database is connected

  server.listen(process.env.PORT || 8080, function () {
    console.log(
      "CORS-enabled web server listening on port " + (process.env.PORT || 8080)
    );
  });
});

const connections = [];
app.locals.io = io;
io.on("connection", (socket) => {
  connections.push(socket);

  console.log(connections.length + " conntected");

  // let rand = Math.floor(Math.random() * 3);
  // const order = {
  //   symbol: "OLTR",
  //   quantity: 100,
  //   quantityFilled: 25,
  //   side: "BUY",
  // };
  // switch (rand) {
  //   case 0:
  //     return socket.emit("order-filled", order);
  //   case 1:
  //     return socket.emit("order-partially-filled", order);
  //   case 2:
  //     return socket.emit("order-terminated", order);
  //   default:
  //     return;
  // }

  socket.on("received", (data) => {
    console.log("-----RECIEVED------");
  });

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
    console.log(connections.length + " conntected");
  });
});

app.ws("/api/ws", function (ws, req) {
  ws.on("message", function (msg) {
    ws.send(msg);
  });
});

app.use(express.static(path.join(__dirname, "build")));

const admin = (req, res, next) => {
  res.status(200).send("Welcome to admin Page ," + req.session.username);
  return;
};

app.use("/", indexRoute);
app.use("/api/notification", auth, notificationsRoute);
app.use("/api/watchlists", auth, watchlistRoute);
app.use("/api/account", auth, accountRoute);
app.use("/api/orders", auth, orderRoute);
app.use("/api/ownedStocks", auth, ownedStocksRoute);
app.use("/api/events", auth, eventsRoute);
app.use("/user", auth, userRoute);
app.use("/test", testRoute);
app.use("/api/stocks", stocksRoute);
app.get("/admin", auth, admin);

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

import "./Operations/EventsOperations.js";
// const processingOfOrder = (username, order) => {
//   const { compUsername, compOrder } = createComplementaryOrder(order);
//   console.log(compUsername, compOrder);
//   let randPrice = randomPrice(0.1, (randomInteger(0.1, 32) * 100) / 3);
//   return executeOrder(
//     username,
//     order.id,
//     compUsername,
//     compOrder.id,
//     randPrice
//   );
// };

export {io as socketIO} 