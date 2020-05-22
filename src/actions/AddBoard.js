import { ADD_BOARD } from "./ActionTypes";
import { v4 as uuidv4 } from "uuid";

const addBoard = (boardName) => ({
  type: ADD_BOARD,
  payload: { boardId: uuidv4(), boardName },
});

export default addBoard;
