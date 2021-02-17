export const accountDeposit = (userData, deposit) => {
  userData.portfolio.history.deposits.push({
    value: deposit,
    time: new Date(),
  });

  userData.portfolio.account_value += deposit;
};

export const accountWithdrawal = (userData, withdrawal) => {
  userData.portfolio.history.withdrawals.push({
    value: withdrawal,
    time: new Date(),
  });

  userData.portfolio.account_value -= withdrawal;
};
