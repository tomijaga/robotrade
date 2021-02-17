import React from "react";
import ReactDOM from "react-dom";
import { Provider, connect } from "react-redux";
import { createStore, applyMiddleware, combineReducers } from "redux";
import { createLogger } from "redux-logger";
import thunkMiddleware from "redux-thunk";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage/session";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { search, requestSearchedStocks } from "./Redux/appReducer";
import rootReducer from "./Redux/rootReducer";
import { PersistGate } from "redux-persist/integration/react";
import RingLoader from "react-spinners/RingLoader";
import {
  createStateSyncMiddleware,
  initMessageListener,
  withReduxStateSync,
  initStateWithPrevTab,
} from "redux-state-sync";

const stateSyncConfig = {
  blacklist: [
    "loginState",
    "showLogin",
    "persist/PERSIST",
    "persist/REHYDRATE",
    "selectedWatchlistIndex",
  ],
};

const persistConfig = {
  key: "root",
  storage,
  blacklist: ["persist/PERSIST", "persist/REHYDRATE"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const logger = createLogger({
  duration: true,
});

const stateSyncMiddleware = [createStateSyncMiddleware(stateSyncConfig)];

const store = createStore(
  withReduxStateSync(persistedReducer),
  applyMiddleware(thunkMiddleware, logger, ...stateSyncMiddleware)
);

const persistor = persistStore(store);

//initMessageListener(store);
initStateWithPrevTab(store);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate
        loading={<RingLoader size={400} color="#34D7B7" />}
        persistor={persistor}
      >
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
