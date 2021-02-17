import {
  GET_NOTIFICATIONS_SUCCESS,
  GET_NOTIFICATIONS_FAILED,
  CREATE_NOTIFICATION_SUCCESS,
  CREATE_NOTIFICATION_FAILED,
} from "./constants";

const initState = {
  data: [],
  not_seen: 0,
};
export const notifications = (state = initState, action = {}) => {
  switch (action.type) {
    case GET_NOTIFICATIONS_SUCCESS:
      let notSeenCount = 0;
      const notifications = action.payload;

      notifications.find((alert, i) => {
        notSeenCount = i;
        return alert.seen === true;
      });
      return { ...state, data: action.payload, not_seen: notSeenCount };
    case GET_NOTIFICATIONS_FAILED:
      alert(action.payload.message + "\n");
      return state;
    case CREATE_NOTIFICATION_SUCCESS:
      return {
        ...state,
        not_seen: state.not_seen++,
        data: [action.payload, ...state.data],
      };
    case CREATE_NOTIFICATION_FAILED:
      alert("Not _ seen failed");
      return state;

    default:
      return state;
  }
};
