export const accountDeposit = (userData, deposit) => {
  userData.portfolio.history.deposits.push({
    value: deposit,
    time: new Date(),
  });

  let errorOccured = false;

  if (!(userData.portfolio.account_value + deposit > 1000000000)) {
    userData.portfolio.account_value += deposit;
  } else {
    errorOccured = true;
  }

  return errorOccured;
};
