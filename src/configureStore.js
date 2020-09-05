import { createStore, applyMiddleware } from "redux";
import reducer from "./reducers";
import { loadState, saveState } from "./localStorage";
import { v4 as uuidv4 } from "uuid";
import throttle from "lodash/throttle";
import { createLogger } from "redux-logger";

const configureStore = () => {
  let middlewares = [];

  const initialState = [
    { id: uuidv4(), name: "backlog", cards: [] },
    { id: uuidv4(), name: "todo", cards: [] },
    { id: uuidv4(), name: "doing", cards: [] },
    { id: uuidv4(), name: "done", cards: [] },
  ];

  if (process.env.NODE_ENV !== "production") {
    const logger = createLogger();
    middlewares.push(logger);
  }

  const store = createStore(
    reducer,
    loadState() || initialState,
    applyMiddleware(...middlewares)
  );

  store.subscribe(
    throttle(() => {
      saveState(store.getState());
    }, 1000)
  );

  return store;
};

export default configureStore;
