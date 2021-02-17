import {
  ADD_ORDER_PENDING,
  ADD_ORDER_SUCCESS,
  ADD_ORDER_FAILED,
  REQUEST_ORDERS_PENDING,
  REQUEST_ORDERS_SUCCESS,
  REQUEST_ORDERS_FAILED,
} from "./constants";

import axios from "axios";

import { SERVER_URL } from "../../../Essential";

axios.defaults.withCredentials = true;

export const createOrder = (orderObj) => (dispatch) => {
  dispatch({ type: ADD_ORDER_PENDING });

  axios
    .post(`${SERVER_URL}/api/orders`, {
      ...{ orderObj },
    })
    .then((res) => dispatch({ type: ADD_ORDER_SUCCESS, payload: res.data }))
    .catch((error) => dispatch({ type: ADD_ORDER_FAILED, payload: error }));
};

export const getOrders = () => (dispatch) => {
  dispatch({ type: REQUEST_ORDERS_PENDING });

  axios
    .get(`${SERVER_URL}/api/orders/`)
    .then((res) =>
      dispatch({ type: REQUEST_ORDERS_SUCCESS, payload: res.data })
    )
    .catch((error) =>
      dispatch({ type: REQUEST_ORDERS_FAILED, payload: error })
    );
};
