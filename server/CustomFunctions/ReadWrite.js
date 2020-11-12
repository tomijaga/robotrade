import fs from "fs";
import path from "path";
import { nanoid } from "nanoid";
import { fileURLToPath } from "url";
import { dirname } from "path";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const nextId = () => {
  return nanoid();
};

export const customerExist = (username) => {
  if (
    fs.existsSync(path.resolve(__dirname, "../Data/Users", username + ".json"))
  ) {
    return true;
  }
  return false;
};

export const writeToCustomerFile = (username, userData, callback) => {
  let userFile = username + ".json";
  console.log("- About to Write to", userFile);
  fs.writeFile(
    path.resolve(__dirname, "../Data/Users", userFile),
    JSON.stringify(userData),
    (err, data) => {
      if (err) {
        console.log("Could not Write To Customer File");
      } else {
        if (callback) {
          callback();
        }
      }
    }
  );
};

const callbackWrap = (err, data) => {
  if (err) {
    console.log("Could not Read Customer File");
  } else {
    let userData = JSON.parse(data);
    callback();
  }
};

export const readCustomerFile = (username, callback) => {
  let userFile = username + ".json";
  console.log("- About to Read", userFile);
  fs.readFile(
    path.resolve(__dirname, "../Data/Users", userFile),
    (err, data) => {
      if (err) {
        return console.log("Could not Get File");
      } else {
        let userData = JSON.parse(data);
        if (callback) {
          callback(userData);
          console.log();
        }
      }
    }
  );
};

export const readLoginFile = (callback) => {
  console.log("- About to Read Login Data");
  fs.readFile(
    path.resolve(__dirname, "../Data/Authentication/login.json"),
    (err, data) => {
      if (err) {
        return console.log("Could not Get File");
      } else {
        let loginData = JSON.parse(data);

        if (callback) {
          callback(loginData);
          console.log();
        }
      }
    }
  );
};

export const writeToLoginFile = (loginData, callback) => {
  fs.writeFile(
    path.resolve(__dirname, "../Data/Authentication/login.json"),
    JSON.stringify(loginData),
    (err, data) => {
      if (err) {
        console.log("Could not Write To Customer File");
      } else {
        if (callback) {
          callback();
        }
      }
    }
  );
};

export const readStockHistory = (symbol) => {
  let stockOrders = fs.readFileSync(
    path.resolve(__dirname, "../Data/Stocks", symbol + ".json")
  );
  stockOrders = JSON.parse(stockOrders);
  return stockOrders;
};

export const writeToStockHistory = (symbol, orderHistory) => {
  let filePath = path.resolve(__dirname, "../Data/Stocks", symbol + ".json");

  let stockOrders = [];
  if (fs.existsSync(filePath)) {
    console.log("===", "order added to History", "===");
    stockOrders = readStockHistory(symbol);
  }

  stockOrders.push(orderHistory);
  fs.writeFileSync(filePath, JSON.stringify(stockOrders));
};

export const readActiveOrders = () => {
  const filePath = path.resolve(
    __dirname,
    "../Data/Active Orders/active_orders.json"
  );

  let activeOrders = fs.readFileSync(filePath);
  activeOrders = JSON.parse(activeOrders);
  return activeOrders;
};

export const writeToActiveOrders = (activeOrders) => {
  const filePath = path.resolve(
    __dirname,
    "../Data/Active Orders/active_orders.json"
  );

  console.log(activeOrders);

  fs.writeFileSync(filePath, JSON.stringify(activeOrders));
};
