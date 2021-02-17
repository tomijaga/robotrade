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

import axios from "axios";
import { SERVER_URL } from "../../../Essential";

axios.defaults.withCredentials = true;

export const getTransactions = () => (dispatch) => {
  axios
    .post(`${SERVER_URL}/api/account/transactions`)
    .then((res) => {
      if (res.status === 200) {
        dispatch({ type: GET_TRANSACTIONS, payload: res.data });
      }
    })
    .catch((err) => alert(err));
};

export const getAccountDetails = () => (dispatch) => {
  axios
    .post(`${SERVER_URL}/api/account/details`)
    .then((res) => {
      if (res.status === 200) {
        dispatch({ type: GET_ACCOUNT_DETAILS, payload: res.data });
      }
    })
    .catch((err) => alert(err));
};

export const accountDeposit = (deposit) => (dispatch) => {
  dispatch({ type: ACCOUNT_DEPOSIT_PENDING });
  axios
    .put(`${SERVER_URL}/api/account/deposit`, {
      deposit: deposit,
    })
    .then((res) => {
      if (res.status === 200) {
        dispatch({ type: ACCOUNT_DEPOSIT_SUCCESS, payload: res.data });
      }
    })
    .catch((err) => dispatch({ type: ACCOUNT_DEPOSIT_FAILED, payload: err }));
};

export const accountWithdrawal = (withdrawal) => (dispatch) => {
  dispatch({ type: ACCOUNT_DEPOSIT_PENDING });

  axios
    .put(`${SERVER_URL}/account/withdrawal`, {
      withdrawal: withdrawal,
    })
    .then((res) => {
      if (res.status === 200) {
        dispatch({ type: ACCOUNT_WITHDRAWAL_SUCCESS, payload: res.data });
      }
    })
    .catch((err) =>
      dispatch({ type: ACCOUNT_WITHDRAWAL_FAILED, payload: err })
    );
};
