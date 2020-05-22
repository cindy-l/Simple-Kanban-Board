import { createStore } from "redux";
import reducer from "./reducers";
import { loadState } from "./localStorage";
import { v4 as uuidv4 } from "uuid";

const initialState = [
  { id: uuidv4(), name: "backlog", cards: [] },
  { id: uuidv4(), name: "todo", cards: [] },
  { id: uuidv4(), name: "doing", cards: [] },
  { id: uuidv4(), name: "done", cards: [] },
];

const store = createStore(reducer, loadState() || initialState);

export default store;
