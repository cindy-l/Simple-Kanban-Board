import { v4 as uuidv4 } from "uuid";

export const ADD_CARD = "ADD_CARD";
export const DELETE_CARD = "DELETE_CARD";
export const DRAG_AND_DROP_CARD = " DRAG_AND_DROP_CARD";
export const EDIT_CARD = "EDIT_CARD";

export const ADD_BOARD = "ADD_BOARD";
export const DELETE_BOARD = "DELETE_BOARD";
export const EDIT_BOARD = "EDIT_BOARD";

export const addCard = (card, boardId) => ({
  type: ADD_CARD,
  payload: { card: { ...card, cardId: uuidv4() }, boardId },
});

export const deleteCard = (cardId, boardId) => ({
  type: DELETE_CARD,
  payload: { cardId, boardId },
});

export const dragAndDropCard = (
  boardIndex,
  cardIndex,
  targetBoardIndex,
  targetCardIndex
) => ({
  type: DRAG_AND_DROP_CARD,
  payload: { boardIndex, cardIndex, targetBoardIndex, targetCardIndex },
});

export const editCard = (card, boardId) => ({
  type: EDIT_CARD,
  payload: { card, boardId },
});

export const addBoard = (boardName) => ({
  type: ADD_BOARD,
  payload: { boardId: uuidv4(), boardName },
});

export const deleteBoard = (boardId) => ({
  type: DELETE_BOARD,
  payload: { boardId },
});

export const editBoard = (boardId, newName) => ({
  type: EDIT_BOARD,
  payload: { boardId, newName },
});
