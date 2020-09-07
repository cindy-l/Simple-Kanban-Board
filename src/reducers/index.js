import {
  ADD_CARD,
  DELETE_CARD,
  EDIT_CARD,
  ADD_BOARD,
  DELETE_BOARD,
  EDIT_BOARD,
} from "../actions";

const reducer = (state, action) => {
  switch (action.type) {
    case ADD_CARD: {
      const { card, boardId } = action.payload;

      return state.map((board) => {
        if (board.id !== boardId) {
          return board;
        }
        return {
          ...board,
          cards: [...board.cards, { ...card, boardId }],
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

    case EDIT_CARD: {
      const { card: newCard, boardId } = action.payload;
      const { cardId } = newCard;

      return state.map((board) => {
        if (board.id !== boardId) {
          return board;
        }
        return {
          ...board,
          cards: board.cards.map((card) => {
            if (card.cardId !== cardId) {
              return card;
            }
            return { ...newCard };
          }),
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

      return state.map((board) => {
        if (board.id !== boardId) {
          return board;
        }
        return {
          ...board,
          name: newName,
        };
      });
    }

    default:
      return state;
  }
};

export default reducer;
