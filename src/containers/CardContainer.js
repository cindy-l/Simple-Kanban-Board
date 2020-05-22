import React, { Component } from "react";
import { connect } from "react-redux";
import addCard from "../actions/AddCard";
import deleteCard from "../actions/DeleteCard";
import Card from "../components/Card";
import "./CardContainer.css";

class CardContainer extends Component {
  state = { [this.props.boardId]: "" };

  handleAddCard = (cardName) => {
    const { addCard, boardId } = this.props;
    addCard(cardName, boardId);
  };

  handleDeleteCard = (cardId, boardId) => {
    this.props.deleteCard(cardId, boardId);
  };

  handleChange = (event) => {
    this.setState(
      Object.assign({}, this.state, { [event.target.name]: event.target.value })
    );
  };

  handleKeyDown = (event) => {
    const { boardId } = this.props;

    if (event.key === "Enter") {
      const cardName = this.state[boardId].trim();

      if (!cardName) return;

      this.handleAddCard(cardName);

      this.setState(Object.assign({}, this.state, { [boardId]: "" }));
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
        name={card.cardName}
        key={card.cardId}
        id={card.cardId}
        boardId={boardId}
        addCard={(cardName, cardId, boardId) =>
          this.handleAddCard(cardName, cardId, boardId)
        }
        deleteCard={(id) => this.handleDeleteCard(id, boardId)}
      />
    ));

    return (
      <div className="CardContainer" onDrop={this.handleDrop}>
        <div className="Cards" onDragOver={(event) => event.preventDefault()}>
          {renderCards}
          <input
            className="NewCardInput"
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
