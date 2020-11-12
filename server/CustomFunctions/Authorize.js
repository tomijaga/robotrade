import {
  readCustomerFile,
  customerExist,
  writeToCustomerFile,
  readLoginFile,
} from "./ReadWrite.js";
import { createUser } from "./userFunctions.js";
import bcrypt from "bcrypt";

export const auth = (req, res, next) => {
  if (!req.session.loggedIn) {
    console.log("Unauthorized. Cant access " + req.url);
    res.status(401).send("Unauthorized. Cant access " + req.url);
    return;
  }

  console.log("- Access Granted");
  next();
};

export const signup = (req, res, next) => {
  const { username, password } = req.body;

  if (customerExist(username)) {
    res.status(200).send("User already Exists");
    return;
  } else {
    createUser(username, password, (err, data) => {
      console.log("Creating User ...", username);
      res.status(200).send("User " + username + ", Created");
    });
  }
};

export const login = (req, res, next) => {
  //console.log(req.session);
  //console.log("sessionID",req.sessionID);
  if (req.session.loggedIn) {
    res.status(200).send("Already logged In");
    return;
  }

  const { username, password } = req.body;
  // req.session.loggedIn = true;
  let user;
  console.log("'" + username + "'", "attempting to login");

  if (username && customerExist(username)) {
    readLoginFile(async (loginData) => {
      const hash = loginData.find((login) => login.username === username);

      const match = await bcrypt.compare(password, hash.password);
      //console.log("match", match);
      if (match) {
        //console.log("Correct Password");
        req.session.loggedIn = true;
        req.session.username = username;
        console.log(username, "Logged In");
        res.status(200).send("logged In");
      } else {
        console.log("Not authorized. Invalid password.");
        res.status(401).send("Not authorized. Invalid password.");
      }
    });
  } else {
    console.log("Not authorized. Invalid username");
    res.status(401).send("Not authorized. Invalid username.");
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
