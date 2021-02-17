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

import omit from "lodash/omit";

const initWatchlists = {
  selectedIndex: 0,
  isPending: false,
  data: [],
};

export const watchlists = (state = initWatchlists, action = {}) => {
  switch (action.type) {
    case SET_SELECTED_INDEX:
      return { ...state, selectedIndex: action.payload };

    case GET_WATCHLIST_PENDING:
      return { ...state, isPending: true };

    case GET_WATCHLIST_SUCCESS:
      console.log({});
      return { ...state, isPending: false, data: action.payload };

    case GET_WATCHLIST_FAILED:
      return { ...state, isPending: false };

    case ADD_WATCHLIST_SUCCESS:
      return {
        ...state,
        selectedIndex: state.data.length,
        data: [...state.data, { name: action.payload, symbols: [] }],
      };
    case ADD_WATCHLIST_FAILED:
      alert(
        `${action.payload.message} \n  ${action.payload.response.data} \nCould Not Add Watchlist`
      );
      return state;

    case DELETE_WATCHLIST_SUCCESS:
      if (true) {
        let deletedIndex = 0;
        const watchlists = state.data.filter((watchlist, i) => {
          deletedIndex = watchlist.name === action.payload ? i : deletedIndex;
          return watchlist.name !== action.payload;
        });
        const calculateSelectedIndex = () => {
          let solution = 0;
          const index = state.selectedIndex;
          const length = state.data.length - 1;

          if (index === deletedIndex) {
            solution = 0;
          } else if (deletedIndex < index) {
            solution = index - 1;
          } else {
            solution = index;
          }
          return solution;
        };
        return {
          ...state,
          isPending: state.isPending,
          data: [...watchlists],
          selectedIndex: calculateSelectedIndex(),
        };
      }
    case DELETE_WATCHLIST_FAILED:
      alert(
        `${action.payload.message} \n  ${action.payload.response.data} \nCould Not Delete Watchlist`
      );
      return state;

    case ADD_SYMBOL_SUCCESS:
      if (true) {
        const watchlist = state.data.find(
          (watchlist) => watchlist.name === action.payload.watchlistName
        );
        watchlist.symbols.push(action.payload.symbol);

        const watchlists = state.data;

        return { ...state, data: [...watchlists] };
      }
    case ADD_SYMBOL_FAILED:
      alert(
        `${action.payload.message} \n  ${action.payload.response.data}\nCould Not Add Symbol`
      );
      return state;

    case REMOVE_SYMBOL_SUCCESS:
      if (true) {
        const watchlist = state.data.find(
          (watchlist) => watchlist.name === action.payload.watchlistName
        );
        watchlist.symbols = watchlist.symbols.filter((symbol) => {
          return symbol !== action.payload.symbol;
        });
      }
      return { ...state, isPending: false, data: [...state.data] };
    case REMOVE_SYMBOL_FAILED:
      alert(
        `${action.payload.message} \n  ${action.payload.response.data}\nCould Not Delete Symbol`
      );
      return state;
    default:
      return state;
  }
};
