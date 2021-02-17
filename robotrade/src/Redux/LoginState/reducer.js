import {
  LOGOUT_SUCCESS,
  LOGOUT_FAILED,
  CHANGE_LOGIN_STATUS,
} from "./constants";

const initLoginStatus = {
  userIsLoggedIn: false,
};

export const loginStatus = (state = initLoginStatus, action = {}) => {
  switch (action.type) {
    case CHANGE_LOGIN_STATUS:
      return { ...state, userIsLoggedIn: action.payload };

    case LOGOUT_SUCCESS:
      sessionStorage.clear();
      return { ...state, userIsLoggedIn: false };
    case LOGOUT_FAILED:
      alert(action.payload.message + "/n" + action.payload.response.data);
      return state;
    default:
      return state;
  }
};
