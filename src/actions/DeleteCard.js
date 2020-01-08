import { DELETE_CARD } from "./ActionTypes";

const deleteCard = (cardId, boardId) => {
  return { type: DELETE_CARD, payload: { cardId, boardId } };
};

export default deleteCard;
