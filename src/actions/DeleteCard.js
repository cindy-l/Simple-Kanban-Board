import { DELETE_CARD } from "./ActionTypes";

const deleteCard = (cardId, boardId) => ({
  type: DELETE_CARD,
  payload: { cardId, boardId },
});

export default deleteCard;
