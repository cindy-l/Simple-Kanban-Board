import { DELETE_BOARD } from "./ActionTypes";

const deleteBoard = boardId => {
  return { type: DELETE_BOARD, payload: { boardId } };
};

export default deleteBoard;
