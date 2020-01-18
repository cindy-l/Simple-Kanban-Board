import {
  ADD_CARD,
  DELETE_CARD,
  ADD_BOARD,
  DELETE_BOARD
} from "../actions/ActionTypes";

const reducer = (state, action) => {
  switch (action.type) {
    case ADD_CARD: {
      const { cardName, cardId, boardId } = action.payload;
      const boards = JSON.parse(JSON.stringify(state));
      boards[boardId].cards[cardId] = { cardName, boardId };
      boards[boardId].nextCardId++;
      return boards;
    }

    case DELETE_CARD: {
      const { cardId, boardId } = action.payload;
      const boards = JSON.parse(JSON.stringify(state));
      delete boards[boardId].cards[cardId];
      return boards;
    }

    case ADD_BOARD: {
      const { boardId, boardName } = action.payload;
      const boards = JSON.parse(JSON.stringify(state));
      boards[boardId] = { name: boardName, cards: {}, nextCardId: 0 };
      boards.nextBoardId++;
      return boards;
    }

    case DELETE_BOARD: {
      const { boardId } = action.payload;
      const boards = JSON.parse(JSON.stringify(state));
      delete boards[boardId];
      return boards;
    }

    default:
      return state;
  }
};

export default reducer;
