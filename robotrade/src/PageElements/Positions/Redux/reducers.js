import {
  GET_OWNED_STOCKS_PENDING,
  GET_OWNED_STOCKS_SUCCESS,
  GET_OWNED_STOCKS_FAILED,
} from "./constants";

const initPositions = {
  positions: [],
};

export const positions = (state = initPositions, action = {}) => {
  switch (action.type) {
    case GET_OWNED_STOCKS_SUCCESS:
      alert(action.payload);
      return { ...state, positions: action.payload };
    case GET_OWNED_STOCKS_FAILED:
      alert(action.payload);
      return state;
    default:
      return state;
  }
};
