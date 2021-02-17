import {
  GET_OWNED_STOCKS_PENDING,
  GET_OWNED_STOCKS_SUCCESS,
  GET_OWNED_STOCKS_FAILED,
} from "./constants";

import axios from "axios";
import { SERVER_URL } from "../../../Essential";

export const getPositions = () => (dispatch) => {
  dispatch({ type: GET_OWNED_STOCKS_PENDING });

  axios
    .post(`${SERVER_URL}/api/ownedStocks`)
    .then((res) =>
      dispatch({ type: GET_OWNED_STOCKS_SUCCESS, payload: res.data })
    )
    .catch((error) =>
      dispatch({ type: GET_OWNED_STOCKS_FAILED, payload: error })
    );
};
