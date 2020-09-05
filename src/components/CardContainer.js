import React, { PureComponent } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { addCard, deleteCard } from "../actions";
import Card from "../components/Card";

import "../styles/CardContainer.css";

class CardContainer extends PureComponent {
  state = { [this.props.boardId]: "" };

  static propTypes = {
    cards: PropTypes.arrayOf(
      PropTypes.shape({
        cardId: PropTypes.string,
        cardName: PropTypes.string,
        boardId: PropTypes.string,
      })
    ).isRequired,
    boardId: PropTypes.string.isRequired,
  };

  handleAddCard = (cardName) => {
    const { addCard, boardId } = this.props;
    addCard(cardName, boardId);
  };

  handleDeleteCard = (cardId, boardId) => {
    this.props.deleteCard(cardId, boardId);
  };

  handleChange = (event) =>
    this.setState({ [event.target.name]: event.target.value });

  handleKeyDown = (event) => {
    const { boardId } = this.props;

    if (event.key === "Enter") {
      const cardName = this.state[boardId].trim();

      if (!cardName) return;

      this.handleAddCard(cardName);

      this.setState({ [boardId]: "" });
    }
  };

  handleDrop = (event) => {
    const cardId = event.dataTransfer.getData("cardId");
    const cardName = event.dataTransfer.getData("cardName");

    const sourceBoardId = event.dataTransfer.getData("boardId");
    if (sourceBoardId === this.props.boardId) return;

    this.handleAddCard(cardName);

    this.handleDeleteCard(cardId, sourceBoardId);

    event.dataTransfer.clearData();
  };

  render() {
    const { cards, boardId } = this.props;

    const renderCards = cards.map((card) => (
      <Card
        {...card}
        key={card.cardId}
        boardId={boardId}
        addCard={(cardName) => this.handleAddCard(cardName)}
        deleteCard={(id) => this.handleDeleteCard(id, boardId)}
      />
    ));

    return (
      <div className="card-container" onDrop={this.handleDrop}>
        <div className="cards" onDragOver={(event) => event.preventDefault()}>
          {renderCards}
          <input
            className="card"
            key={boardId}
            placeholder="Add card"
            name={boardId}
            value={this.state[boardId]}
            onChange={this.handleChange}
            onKeyDown={this.handleKeyDown}
          />
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = {
  addCard,
  deleteCard,
};

export default connect(null, mapDispatchToProps)(CardContainer);
