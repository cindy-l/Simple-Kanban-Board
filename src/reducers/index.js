import {
  ADD_CARD,
  DELETE_CARD,
  ADD_BOARD,
  DELETE_BOARD,
  EDIT_BOARD,
} from "../actions";

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

    case EDIT_BOARD: {
      const { boardId, newName } = action.payload;

      const index = state.findIndex((board) => board.id === boardId);
      const board = state[index];

      return [
        ...state.slice(0, index),
        { ...board, name: newName },
        ...state.slice(index + 1),
      ];
    }

    default:
      return state;
  }
};

export default reducer;
