import { v4 as uuidv4 } from "uuid";

export const ADD_CARD = "ADD_CARD";
export const DELETE_CARD = "DELETE_CARD";
export const ADD_BOARD = "ADD_BOARD";
export const DELETE_BOARD = "DELETE_BOARD";

export const addCard = (cardName, boardId) => ({
  type: ADD_CARD,
  payload: { cardName, cardId: uuidv4(), boardId },
});

export const deleteCard = (cardId, boardId) => ({
  type: DELETE_CARD,
  payload: { cardId, boardId },
});

export const addBoard = (boardName) => ({
  type: ADD_BOARD,
  payload: { boardId: uuidv4(), boardName },
});

export const deleteBoard = (boardId) => ({
  type: DELETE_BOARD,
  payload: { boardId },
});
