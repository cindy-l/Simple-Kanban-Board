import { ADD_BOARD } from "./ActionTypes";

const addBoard = (boardId, boardName) => ({
  type: ADD_BOARD,
  payload: { boardId, boardName },
});

export default addBoard;
