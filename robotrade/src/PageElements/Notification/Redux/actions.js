import {
  GET_NOTIFICATIONS_SUCCESS,
  GET_NOTIFICATIONS_FAILED,
  CREATE_NOTIFICATION_SUCCESS,
  CREATE_NOTIFICATION_FAILED,
} from "./constants";

import axios from "axios";
import { SERVER_URL } from "../../../Essential";

axios.defaults.withCredentials = true;

export const getNotifications = () => (dispatch) => {
  axios
    .get(`${SERVER_URL}/api/notification`)
    .then((res) =>
      dispatch({ type: GET_NOTIFICATIONS_SUCCESS, payload: res.data })
    )
    .catch((err) => dispatch({ type: GET_NOTIFICATIONS_FAILED, payload: err }));
};

export const seenAllNotifications = () => (dispatch) => {
  axios
    .put(`${SERVER_URL}/api/notification`)
    .then((res) => dispatch({ type: CREATE_NOTIFICATION_SUCCESS }))
    .catch((err) => dispatch({ type: CREATE_NOTIFICATION_FAILED }));
};
