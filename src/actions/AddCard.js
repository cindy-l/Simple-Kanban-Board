import { ADD_CARD } from "./ActionTypes";
import { v4 as uuidv4 } from "uuid";

const addCard = (cardName, boardId) => ({
  type: ADD_CARD,
  payload: { cardName, cardId: uuidv4(), boardId },
});

export default addCard;
