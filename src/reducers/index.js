import {
  ADD_CARD,
  DELETE_CARD,
  EDIT_CARD,
  ADD_BOARD,
  DELETE_BOARD,
  DRAG_AND_DROP_CARD,
  EDIT_BOARD,
} from "../actions";

const reducer = (state, action) => {
  switch (action.type) {
    case ADD_CARD: {
      const { card, boardId } = action.payload;

      const newState = JSON.parse(JSON.stringify(state));

      const targetBoard = newState.find((board) => board.id === boardId);

      if (targetBoard) {
        targetBoard.cards.push({ ...card, boardId });
      }

      return newState;
    }

    case DELETE_CARD: {
      const { cardId, boardId } = action.payload;

      const newState = JSON.parse(JSON.stringify(state));

      const targetBoard = newState.find((board) => board.id === boardId);

      if (targetBoard) {
        targetBoard.cards = targetBoard.cards.filter(
          (card) => card.cardId !== cardId
        );
      }

      return newState;
    }

    case DRAG_AND_DROP_CARD: {
      const {
        boardIndex,
        cardIndex,
        targetBoardIndex,
        targetCardIndex,
      } = action.payload;

      const newState = JSON.parse(JSON.stringify(state));

      newState[targetBoardIndex].cards.splice(
        targetCardIndex,
        0,
        newState[boardIndex].cards.splice(cardIndex, 1)[0]
      );

      return newState;
    }

    case EDIT_CARD: {
      const { card: newCard, boardId } = action.payload;

      const newState = JSON.parse(JSON.stringify(state));

      const targetBoard = newState.find((board) => board.id === boardId);

      if (targetBoard) {
        const targetCardIndex = targetBoard.cards.findIndex(
          (card) => card.cardId === newCard.cardId
        );

        if (targetCardIndex >= 0) {
          targetBoard.cards[targetCardIndex] = {
            ...targetBoard.cards[targetCardIndex],
            ...newCard,
          };
        }
      }

      return newState;
    }

    case ADD_BOARD: {
      const { boardId, boardName } = action.payload;

      const newState = JSON.parse(JSON.stringify(state));

      return [...newState, { id: boardId, name: boardName, cards: [] }];
    }

    case DELETE_BOARD: {
      const { boardId } = action.payload;

      const newState = JSON.parse(JSON.stringify(state));

      return newState.filter((board) => board.id !== boardId);
    }

    case EDIT_BOARD: {
      const { boardId, newName } = action.payload;

      const newState = JSON.parse(JSON.stringify(state));

      return newState.map((board) => {
        if (board.id !== boardId) {
          return board;
        }
        return { ...board, name: newName };
      });
    }

    default:
      return state;
  }
};

export default reducer;
