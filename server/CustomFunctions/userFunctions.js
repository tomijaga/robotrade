import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import fs from "fs";
import bodyParser from "body-parser";
import cloneDeep from "lodash/cloneDeep.js";
import {
  nextId,
  readCustomerFile,
  readLoginFile,
  writeToLoginFile,
  writeToCustomerFile,
} from "./ReadWrite.js";
import { createOrder, saveActiveOrder } from "./orderFunctions.js";
import initUser from "../initUser.js";
import bcrypt from "bcrypt";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const createUser = (username, password, callback) => {
  let userData = cloneDeep(initUser);
  userData.username = username;

  readLoginFile((loginData) => {
    bcrypt.hash(password, 10, (err, hash) => {
      loginData.push({
        username: username,
        password: hash,
      });
      writeToLoginFile(loginData, () => {
        writeToCustomerFile(username, userData, callback);
      });
    });
  });
};

export const getUser = (req, res, next) => {};
