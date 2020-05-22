import { DELETE_BOARD } from "./ActionTypes";

const deleteBoard = (boardId) => ({ type: DELETE_BOARD, payload: { boardId } });

export default deleteBoard;
