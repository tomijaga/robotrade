import {
  SET_SELECTED_INDEX,
  ADD_WATCHLIST_PENDING,
  ADD_WATCHLIST_SUCCESS,
  ADD_WATCHLIST_FAILED,
  ADD_SYMBOL_PENDING,
  ADD_SYMBOL_SUCCESS,
  ADD_SYMBOL_FAILED,
  DELETE_WATCHLIST_PENDING,
  DELETE_WATCHLIST_SUCCESS,
  DELETE_WATCHLIST_FAILED,
  REMOVE_SYMBOL_PENDING,
  REMOVE_SYMBOL_SUCCESS,
  REMOVE_SYMBOL_FAILED,
  GET_WATCHLIST_PENDING,
  GET_WATCHLIST_SUCCESS,
  GET_WATCHLIST_FAILED,
} from "./constants";

import axios from "axios";

import { SERVER_URL } from "../../Essential";

axios.defaults.withCredentials = true;

export const setSelectedWatchlistIndex = (index) => ({
  type: SET_SELECTED_INDEX,
  payload: index,
});

export const getWatchlists = () => (dispatch) => {
  dispatch({ type: GET_WATCHLIST_PENDING });

  axios
    .get(`${SERVER_URL}/api/watchlists`)
    .then((res) => dispatch({ type: GET_WATCHLIST_SUCCESS, payload: res.data }))
    .catch((error) => dispatch({ type: GET_WATCHLIST_FAILED, payload: error }));
};

export const addWatchlist = (watchlistName) => (dispatch) => {
  dispatch({ type: ADD_WATCHLIST_PENDING });

  console.log(watchlistName);
  axios
    .post(`${SERVER_URL}/api/watchlists/${watchlistName}`)
    .then((res) =>
      dispatch({ type: ADD_WATCHLIST_SUCCESS, payload: res.data.watchlistName })
    )
    .catch((error) => dispatch({ type: ADD_WATCHLIST_FAILED, payload: error }));
};

export const addSymbol = (watchlistName, symbol) => (dispatch) => {
  dispatch({ type: ADD_SYMBOL_PENDING });

  const url = `${SERVER_URL}/api/watchlists/${watchlistName}/${symbol}`;

  axios
    .put(url)
    .then((res) => {
      if (res.status === 200) {
        dispatch({ type: ADD_SYMBOL_SUCCESS, payload: res.data });
      }
    })
    .catch((error) => dispatch({ type: ADD_SYMBOL_FAILED, payload: error }));
};

export const deleteWatchlist = (watchlistName) => (dispatch) => {
  dispatch({ type: DELETE_WATCHLIST_PENDING });

  axios
    .delete(`${SERVER_URL}/api/watchlists/${watchlistName}`)
    .then((res) =>
      dispatch({
        type: DELETE_WATCHLIST_SUCCESS,
        payload: res.data.watchlistName,
      })
    )
    .catch((err) => dispatch({ type: DELETE_WATCHLIST_FAILED, payload: err }));
};

export const removeSymbol = (watchlistName, symbol) => (dispatch) => {
  dispatch({ type: REMOVE_SYMBOL_PENDING });

  const url = `${SERVER_URL}/api/watchlists/${watchlistName}/${symbol}`;

  axios
    .delete(url)
    .then((res) => {
      if (res.status === 200) {
        dispatch({ type: REMOVE_SYMBOL_SUCCESS, payload: res.data });
      }
    })
    .catch((error) => dispatch({ type: REMOVE_SYMBOL_FAILED, payload: error }));
};
