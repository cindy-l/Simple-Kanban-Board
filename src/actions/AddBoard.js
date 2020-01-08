import { ADD_BOARD } from "./ActionTypes";

const addBoard = (boardId, boardName) => {
  return { type: ADD_BOARD, payload: { boardId, boardName } };
};

export default addBoard;
