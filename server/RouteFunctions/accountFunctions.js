import UserModel from "../models/user.js";

export const accountDeposit = async (user, deposit) => {
  let errorOccured = false;

  if (!(user.portfolio.buying_power + deposit > 1000000000)) {
    user.portfolio.buying_power += deposit;
    user.portfolio.transactions.push({
      value: deposit,
      time: new Date(),
      type: "DEPOSIT",
    });
  } else {
    errorOccured = true;
  }

  return errorOccured;
};

export const accountWithdrawal = async (user, withdrawal) => {
  let errorOccured = false;

  if (!(user.portfolio.buying_power - withdrawal < 0)) {
    user.portfolio.buying_power -= withdrawal;
    user.portfolio.transactions.push({
      value: withdrawal,
      time: new Date(),
      type: "WITHDRAWAL",
    });
  } else {
    errorOccured = true;
  }

  return errorOccured;
};

export const updateAccount = (equity, order, PnL) => {
  UserModel.findOne({ username: order.username }).exec((err, user) => {
    const { buying_power, realized_PnL, net_value } = user.portfolio;
    buying_power += equity;
    realized_PnL += PnL;
    net_value = buying_power + realized_PnL;
    user.save();
  });
};
