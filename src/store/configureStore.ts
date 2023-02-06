import createSagaMiddleware from "@redux-saga/core";
import { createInjectorsEnhancer, forceReducerReload } from "redux-injectors";
import { createReducer } from "./reducers";
import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
export function configureAppStore() {
  const reduxSagaMonitorOptions = {};
  const sagaMiddleware = createSagaMiddleware(reduxSagaMonitorOptions);
  const { run: runSaga } = sagaMiddleware;

  let middlewares = [sagaMiddleware];
  if (process.env.NODE_ENV === "development") {
    const { logger } = require("redux-logger");
    middlewares = [...middlewares, logger];
  }

  const enhancers = [
    createInjectorsEnhancer({
      createReducer,
      runSaga,
    }),
  ];

  const defaultMiddleware: any[] = getDefaultMiddleware({
    serializableCheck: false,
    immutableCheck: false,
  });

  const store = configureStore({
    reducer: createReducer(),
    middleware: [...defaultMiddleware, ...middlewares],
    devTools:
      process.env.NODE_ENV !== "production" ||
      process.env.PUBLIC_URL.length > 0,
    enhancers,
  });
  
  if (module.hot) {
    module.hot.accept("./reducers", () => {
      forceReducerReload(store);
    });
  }
  return store;
}

export const RootState = configureAppStore()
