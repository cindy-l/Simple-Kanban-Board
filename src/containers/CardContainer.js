import React, { Component } from "react";
import { connect } from "react-redux";
import addCard from "../actions/AddCard";
import deleteCard from "../actions/DeleteCard";
import Card from "../components/Card";
import "./CardContainer.css";

class CardContainer extends Component {
  state = { [this.props.boardId]: "" };

  handleAddCard = (cardName) => {
    const { addCard, boardInfo, boardId } = this.props;
    addCard(cardName, boardInfo[boardId].nextCardId, boardId);
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
      //reset the input value after adding the card
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
    const renderCards = Object.keys(cards).map((key) => {
      return (
        <Card
          name={cards[key].cardName}
          key={key}
          id={key}
          boardId={boardId}
          addCard={(cardName, cardId, boardId) =>
            this.handleAddCard(cardName, cardId, boardId)
          }
          deleteCard={(id) => this.handleDeleteCard(id, boardId)}
        />
      );
    });

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

const mapStateToProps = (state) => {
  return { boardInfo: state };
};

const mapDispatchToProps = {
  addCard,
  deleteCard,
};

export default connect(mapStateToProps, mapDispatchToProps)(CardContainer);
