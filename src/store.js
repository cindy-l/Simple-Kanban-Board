import { createStore } from "redux";
import reducer from "./reducers";
import { loadState } from "./localStorage";

const initialState = {
  0: { name: "backlog", cards: {}, nextCardId: 0 },
  1: { name: "todo", cards: {}, nextCardId: 0 },
  2: { name: "doing", cards: {}, nextCardId: 0 },
  3: { name: "done", cards: {}, nextCardId: 0 },
  nextBoardId: 4,
};

const store = createStore(reducer, loadState() || initialState);

export default store;
