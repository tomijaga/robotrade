import {
  CREATE_EVENT_FAILED,
  CREATE_EVENT_SUCCESS,
  ACTIVATE_EVENT,
  DEACTIVATE_EVENT,
  DELETE_EVENT_SUCCESS,
  DELETE_EVENT_FAILED,
  GET_EVENT_PENDING,
  GET_EVENT_SUCCESS,
  GET_EVENT_FAILED,
} from "./constants";

import axios from "axios";

import { SERVER_URL } from "../../../Essential";

axios.defaults.withCredentials = true;

export const getEvents = () => (dispatch) => {
  dispatch({ type: GET_EVENT_PENDING });

  axios
    .get(`${SERVER_URL}/api/events`)
    .then((res) => {
      if (res.status === 200) {
        dispatch({ type: GET_EVENT_SUCCESS, payload: res.data });
      }
    })
    .catch((err) => dispatch({ type: GET_EVENT_FAILED, payload: err }));
};

export const createNewEvent = (eventObj) => (dispatch) => {
  axios
    .post(`${SERVER_URL}/api/events`, {
      ...eventObj,
    })
    .then((res) => {
      if (res.status === 200) {
        dispatch({ type: CREATE_EVENT_SUCCESS, payload: res.data });
      }
    })
    .catch((err) => dispatch({ type: CREATE_EVENT_FAILED, payload: err }));
};

export const changeActiveStatus = (id, active) => (dispatch) => {
  console.log({ eventID: id, activityValue: active });
  axios
    .put(`${SERVER_URL}/api/events/`, {
      id,
      eventIsActive: active,
    })
    .then((res) => {
      if (res.status === 200) {
        dispatch({
          type: active ? ACTIVATE_EVENT : DEACTIVATE_EVENT,
          payload: res.data,
        });
      }
    })
    .catch((err) => console.error(err));
};

export const deleteEvent = (id) => (dispatch) => {
  axios
    .delete(`${SERVER_URL}/api/events/${id}`)
    .then((res) => {
      if (res.status === 200) {
        dispatch({ type: DELETE_EVENT_SUCCESS, payload: res.data });
      }
    })
    .catch((err) => dispatch({ type: DELETE_EVENT_SUCCESS, payload: err }));
};
