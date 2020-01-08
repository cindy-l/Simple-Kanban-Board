import { createStore } from "redux";
import reducer from "./reducers";

const initialState = {
  0: { name: "backlog", cards: [] },
  1: { name: "todo", cards: [] },
  2: { name: "doing", cards: [] },
  3: { name: "done", cards: [] }
};

const store = createStore(reducer, initialState);

export default store;
