import React, { Component } from "react";
import { connect } from "react-redux";
import addCard from "../actions/AddCard";
import deleteCard from "../actions/DeleteCard";
import Card from "../components/Card";
import "./CardContainer.css";

class CardContainer extends Component {
  constructor(props) {
    super(props);
    this.state = { [this.props.boardId]: "" };
  }

  handleAddCard = cardName => {
    this.props.addCard(
      cardName,
      this.props.boards[this.props.boardId].nextCardId,
      this.props.boardId
    );
  };

  handleDeleteCard = (cardId, boardId) => {
    this.props.deleteCard(cardId, boardId);
  };

  handleChange = event => {
    this.setState(
      Object.assign({}, this.state, { [event.target.name]: event.target.value })
    );
  };

  handleKeyDown = event => {
    if (event.key === "Enter") {
      const cardName = this.state[this.props.boardId].trim();
      if (!cardName) return;
      this.handleAddCard(cardName);
      //reset the input value after adding the card
      this.setState(
        Object.assign({}, this.state, { [this.props.boardId]: "" })
      );
    }
  };

  handleDrop = event => {
    const cardId = event.dataTransfer.getData("cardId");
    const cardName = event.dataTransfer.getData("cardName");
    const sourceBoardId = event.dataTransfer.getData("boardId");
    if (sourceBoardId === this.props.boardId) return;
    this.handleAddCard(cardName);
    this.handleDeleteCard(cardId, sourceBoardId);
    event.dataTransfer.clearData();
  };

  render() {
    const renderCards = Object.keys(this.props.cards).map(key => {
      return (
        <Card
          name={this.props.cards[key].cardName}
          key={key}
          id={key}
          boardId={this.props.boardId}
          addCard={(cardName, cardId, boardId) =>
            this.handleAddCard(cardName, cardId, boardId)
          }
          deleteCard={id => this.handleDeleteCard(id, this.props.boardId)}
        />
      );
    });

    return (
      <div className="CardContainer" onDrop={this.handleDrop}>
        <div className="Cards" onDragOver={event => event.preventDefault()}>
          {renderCards}
          <input
            className="NewCardInput"
            key={this.props.boardId}
            placeholder="Add card"
            name={this.props.boardId}
            value={this.state[this.props.boardId]}
            onChange={this.handleChange}
            onKeyDown={this.handleKeyDown}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { boards: state };
};

const mapDispatchToProps = {
  addCard,
  deleteCard
};

export default connect(mapStateToProps, mapDispatchToProps)(CardContainer);
