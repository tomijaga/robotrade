import path from "path";
import express from "express";
import { fileURLToPath } from "url";
import { dirname } from "path";
import { signup, login, logout } from "../RouteFunctions/Authorize.js";
import UserModel from "../models/user.js";

const router = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// front-end Routes
router.get(/^\/(?!api)(?!logout).*/, async (req, res, next) => {
  res.sendFile(path.join(__dirname, "../build", "app.html"));
  console.log("Build served");
});

router.post("/signup", signup);
router.post("/login", login);
router.get("/logout", logout);

export { router as indexRoute };
