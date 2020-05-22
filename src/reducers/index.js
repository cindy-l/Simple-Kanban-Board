import {
  ADD_CARD,
  DELETE_CARD,
  ADD_BOARD,
  DELETE_BOARD,
} from "../actions/ActionTypes";

const reducer = (state, action) => {
  switch (action.type) {
    case ADD_CARD: {
      const { cardName, cardId, boardId } = action.payload;
      return state.map((board) => {
        if (board.id !== boardId) {
          return board;
        }
        return {
          ...board,
          cards: [...board.cards, { cardName, cardId, boardId }],
        };
      });
    }

    case DELETE_CARD: {
      const { cardId, boardId } = action.payload;
      return state.map((board) => {
        if (board.id !== boardId) {
          return board;
        }
        return {
          ...board,
          cards: board.cards.filter((card) => card.cardId !== cardId),
        };
      });
    }

    case ADD_BOARD: {
      const { boardId, boardName } = action.payload;
      return [...state, { id: boardId, name: boardName, cards: [] }];
    }

    case DELETE_BOARD: {
      const { boardId } = action.payload;
      return state.filter((board) => board.id !== boardId);
    }

    default:
      return state;
  }
};

export default reducer;
