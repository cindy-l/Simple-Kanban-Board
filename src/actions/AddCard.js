import { ADD_CARD } from "./ActionTypes";

const addCard = (cardName, cardId, boardId) => ({
  type: ADD_CARD,
  payload: { cardName, cardId, boardId },
});

export default addCard;
