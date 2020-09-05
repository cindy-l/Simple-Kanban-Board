import React, { PureComponent } from "react";
import PropTypes from "prop-types";

import "../styles/CardContainer.css";

class Card extends PureComponent {
  static propTypes = {
    cardName: PropTypes.string.isRequired,
    cardId: PropTypes.string.isRequired,
    boardId: PropTypes.string.isRequired,
    deleteCard: PropTypes.func.isRequired,
  };

  handleDragStart = (event) => {
    const { cardId, cardName, boardId } = this.props;
    event.dataTransfer.setData("cardId", cardId);
    event.dataTransfer.setData("cardName", cardName);
    event.dataTransfer.setData("boardId", boardId);
  };

  render() {
    const { cardName, cardId, deleteCard } = this.props;

    return (
      <div
        className="card"
        draggable="true"
        onDragStart={(event) => this.handleDragStart(event)}
        onDragOver={(event) => event.preventDefault()}
      >
        <div className="card-name">{cardName}</div>
        <button
          className="mdc-icon-button material-icons icon-button"
          onClick={() => deleteCard(cardId)}
        >
          delete
        </button>
      </div>
    );
  }
}

export default Card;
