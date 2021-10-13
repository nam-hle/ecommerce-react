import { applyMiddleware, compose, createStore } from "redux";
import { persistCombineReducers, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import createSagaMiddleware from "redux-saga";

import { rootReducer } from "../reducers";
import { rootSaga } from "../sagas";

const sagaMiddleware = createSagaMiddleware();
// @ts-ignore
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const authPersistConfig = {
  key: "root",
  storage,
  whitelist: ["auth", "profile", "basket", "checkout"],
};

export const createAppStore = () => {
  const store = createStore(
    persistCombineReducers(authPersistConfig, rootReducer),
    composeEnhancer(applyMiddleware(sagaMiddleware))
  );
  const persistor = persistStore(store);
  sagaMiddleware.run(rootSaga);
  return { store, persistor };
};
