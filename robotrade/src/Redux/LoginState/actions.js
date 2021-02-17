import {
  LOGOUT_SUCCESS,
  LOGOUT_FAILED,
  CHANGE_LOGIN_STATUS,
} from "./constants";
import { SERVER_URL } from "../../Essential";

import axios from "axios";

axios.defaults.withCredentials = true;

export const changeLoginStatus = (status) => ({
  type: CHANGE_LOGIN_STATUS,
  payload: status,
});

export const logout = () => (dispatch) => {
  axios
    .get(`${SERVER_URL}/logout`)
    .then((res) => {
      if (res.status === 200) {
        dispatch({ type: LOGOUT_SUCCESS });
      }
    })
    .catch((err) => {
      dispatch({ type: LOGOUT_FAILED });
    });
};
