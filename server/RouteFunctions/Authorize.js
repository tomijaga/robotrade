import {
  readCustomerFile,
  customerExist,
  writeToCustomerFile,
  readLoginFile,
} from "./ReadWrite.js";
import mongoose from "mongoose";
import UserModel from "../models/user.js";
import LoginModel from "../models/Login.js";
import bcrypt from "bcrypt";

export const auth = (req, res, next) => {
  if (!req.session.loggedIn) {
    console.log(
      "Unauthorized. Cant access " + req.get("host") + req.originalUrl
    );
    res
      .status(401)
      .send("Unauthorized. Cant access " + req.get("host") + req.originalUrl);
    return;
  }

  next();
};

export const isIdValid = (req, res, next) => {
  let id = req.params.id;

  if (mongoose.Types.ObjectId.isValid(id)) {
    req.params.objectId = mongoose.Types.ObjectId(id);
  } else {
    console.log("Invalid Id (" + id + ")");
    return res.status(400).send("Invalid Id");
  }
  next();
};

export const signup = async (req, res, next) => {
  const { username, password } = req.body;

  if (req.session.loggedIn) {
    console.log("Sign Up Error: Currently Logged into an Account");
    return res
      .status(400)
      .send("Sign Up Error: Currently Logged into an Account");
  }
  const userExists = await UserModel.exists({ username: username });
  //console.log("userExists", userExists);
  if (!userExists) {
    const hash = await bcrypt.hash(password, 10);
    const uniqueID = new mongoose.Types.ObjectId();
    let newUser = new UserModel({ username: username, _id: uniqueID });

    await newUser.save();
    let newLogin = new LoginModel({
      _id: uniqueID,
      username: username,
      password: hash,
    });
    await newLogin.save().then(() => {
      req.session.loggedIn = true;
      req.session.username = username;
      console.log(username + " successfully signed up");
      res.status(200).send("User Created");
    });
  } else {
    console.log("Sign Up Error: user '" + username + "' already Exists ");
    return res.status(409).send("User already Exists");
  }
  next();
};

export const login = async (req, res, next) => {
  //console.log(req.session);
  //console.log("sessionID",req.sessionID);
  if (req.session.loggedIn) {
    res.status(200).send("Already logged In");
    return;
  }

  const { username, password } = req.body;
  // req.session.loggedIn = true;
  console.log("'" + username + "'", "attempting to login");

  const userExists = await UserModel.exists({ username: username });

  if (userExists) {
    LoginModel.findOne({ username: username }).then(async (user) => {
      const password_is_a_match = await bcrypt.compare(password, user.password);

      if (password_is_a_match) {
        req.session.loggedIn = true;
        req.session.username = username;
        console.log(username, "Logged In");
        res.status(200).send("Logged In");
      } else {
        console.log("Not authorized. Invalid password.");
        return res.status(401).send("Not authorized. Invalid password.");
      }
    });
  } else {
    console.log("Not authorized. Invalid username");
    return res.status(401).send("Not authorized. Invalid username.");
  }
};

export const logout = (req, res) => {
  if (req.session.loggedIn) {
    req.session.loggedIn = false;
    console.log(req.session.username, "Logged Out");
    req.session.destroy();
    res.status(200).send("Logged Out");
  } else {
    res.status(200).send("You cant logout because you were not loggedIn");
  }
};
