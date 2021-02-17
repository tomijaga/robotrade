import {
  ACCOUNT_DEPOSIT_SUCCESS,
  ACCOUNT_DEPOSIT_FAILED,
  ACCOUNT_WITHDRAWAL_SUCCESS,
  ACCOUNT_WITHDRAWAL_FAILED,
  GET_TRANSACTIONS,
  GET_ACCOUNT_DETAILS,
  ACCOUNT_DEPOSIT_PENDING,
  ACCOUNT_WITHDRAWAL_PENDING,
} from "./constants";

const initAccount = {
  isPending: false,
  buying_power: 0,
  net_value: 0,
  equity: 0,
  unrealized_PnL: 0,
  realized_PnL: 0,
  transactions: [],
};

export const account = (state = initAccount, action = {}) => {
  switch (action.type) {
    case GET_ACCOUNT_DETAILS:
      return { ...state, ...action.payload };

    case GET_TRANSACTIONS:
      return { ...state, transactions: action.payload };

    default:
      return state;
  }
};
