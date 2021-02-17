import {
  ADD_ORDER_PENDING,
  ADD_ORDER_SUCCESS,
  ADD_ORDER_FAILED,
  REQUEST_ORDERS_PENDING,
  REQUEST_ORDERS_SUCCESS,
  REQUEST_ORDERS_FAILED,
} from "./constants";

const initActiveOrders = {
  active_orders: [],
  past_orders: [],
  isPending: false,
};

export const orders = (state = initActiveOrders, action = {}) => {
  switch (action.type) {
    case REQUEST_ORDERS_PENDING:
      return { ...state, isPending: true };

    case REQUEST_ORDERS_SUCCESS:
      return {
        active_orders: [...action.payload.active_orders],
        past_orders: [...action.payload.past_orders],
        isPending: false,
      };

    case REQUEST_ORDERS_FAILED:
      return { ...state, isPending: false };

    case ADD_ORDER_SUCCESS:
      if (true) {
        const active_orders = state.active_orders;

        return {
          ...state,
          active_orders: [action.payload, ...active_orders],
          isPending: false,
        };
      }

    case ADD_ORDER_FAILED:
      alert(action.payload.message + "/n" + action.payload.response.data);
      return state;

    default:
      return state;
  }
};
