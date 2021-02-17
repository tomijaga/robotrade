import {
  USER_DATA_PENDING,
  USER_DATA_SUCCESS,
  USER_DATA_FAILED,
  DELETE_USER_DATA,
} from "./constants";

import { SERVER_URL } from "../../Essential";
import axios from "axios";

axios.defaults.withCredentials = true;

export const requestUserData = () => (dispatch) => {
  dispatch({ type: USER_DATA_PENDING });

  axios
    .get(`${SERVER_URL}/user`)
    .then((res) => {
      if (res.status === 200) {
        dispatch({ type: USER_DATA_SUCCESS, payload: res.data });
      }
    })
    .catch((error) => {
      dispatch({ type: USER_DATA_FAILED, payload: error });
    });
};

export const deleteUserData = () => ({
  type: DELETE_USER_DATA,
  payload: "",
});
