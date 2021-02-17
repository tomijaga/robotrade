import {
  ACCOUNT_DEPOSIT_SUCCESS,
  ACCOUNT_DEPOSIT_FAILED,
  ACCOUNT_WITHDRAWAL_SUCCESS,
  ACCOUNT_WITHDRAWAL_FAILED,
} from "./constants";

import axios from "axios";

import { SERVER_URL } from "../../Essential";

axios.defaults.withCredentials = true;

export const accountDeposit = (deposit) => (dispatch) => {
  axios
    .put(`${SERVER_URL}/account/deposit`, {
      deposit: deposit,
    })
    .then((res) => {
      if (res.status === 200) {
        dispatch({ type: ACCOUNT_DEPOSIT_SUCCESS, payload: res.data });
      } else {
        dispatch({ type: ACCOUNT_DEPOSIT_FAILED, payload: res.data });
      }
    })
    .catch((err) => dispatch({ type: ACCOUNT_DEPOSIT_FAILED, payload: err }));
};

export const accountWithdrawal = (withdrawal) => (dispatch) => {
  axios
    .put(`${SERVER_URL}/account/withdrawal`, {
      withdrawal: withdrawal,
    })
    .then((res) => {
      if (res.status === 200) {
        dispatch({ type: ACCOUNT_WITHDRAWAL_SUCCESS, payload: res.data });
      } else {
        dispatch({ type: ACCOUNT_WITHDRAWAL_FAILED, payload: res.data });
      }
    })
    .catch((err) =>
      dispatch({ type: ACCOUNT_WITHDRAWAL_FAILED, payload: err })
    );
};
