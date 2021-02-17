import express from "express";
import path from "path";
import cors from "cors";
import http from "http";
import { fileURLToPath } from "url";
import { dirname } from "path";
import requirejs from "requirejs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

const server = http.createServer(app);

// const io = requirejs("socket.io-client");

// const socket = io.connect("http://localhost:8080");

const io = requirejs("socket.io")(server);
io.on("connection", (socket) => {
  console.log("Connection");

  socket.on("connect", () => {
    console.log("Connected");
  });

  socket.emit("server2", "secret Message");

  socket.on("FromAPI", (data) => {
    console.log("ran From API");
    console.log(data);
  });
});

server.listen(8001, console.log("running"));
