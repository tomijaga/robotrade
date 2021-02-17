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

const initEvents = {
  data: [],
  isPending: false,
};

export const events = (state = initEvents, action = {}) => {
  switch (action.type) {
    case GET_EVENT_PENDING:
      return { ...initEvents, isPending: true };
    case GET_EVENT_SUCCESS:
      return { ...initEvents, data: [...action.payload], isPending: false };
    case GET_EVENT_FAILED:
      return { ...state, isPending: false };

    case CREATE_EVENT_SUCCESS:
      return { ...state, data: [...state.data, action.payload] };
    case CREATE_EVENT_FAILED:
      alert(
        `${action.payload.message} \n  ${action.payload.response.data}\nCould Not Create Event`
      );
      return { ...state, error: action.payload };

    case ACTIVATE_EVENT:
      if (true) {
        const event = state.data.find(
          (event) => event._id === action.payload.id
        );
        event.active = true;
        return { ...state, data: [...state.data] };
      }

    case DEACTIVATE_EVENT:
      if (true) {
        const event = state.data.find(
          (event) => event._id === action.payload.id
        );
        event.active = false;
        return { ...state, data: [...state.data] };
      }

    case DELETE_EVENT_SUCCESS:
      const events = state.data.filter((event) => {
        if (event._id === action.payload.id) {
          return false;
        }
        return true;
      });
      return { ...state, data: [...events] };
    case DELETE_EVENT_FAILED:
      alert(
        `${action.payload.message} \n  ${action.payload.response.data}\nCould Not Delete Event`
      );

      return state;

    default:
      return state;
  }
};
