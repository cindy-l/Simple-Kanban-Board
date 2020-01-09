import React, { Component } from "react";
import { connect } from "react-redux";
import addCard from "../actions/AddCard";
import deleteCard from "../actions/DeleteCard";
import Card from "../components/Card";
import "./CardContainer.css";

class CardContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleAddCard = () => {
    const cardName = this.state[this.props.boardId];
    if (!cardName) return;
    this.props.addCard(
      cardName,
      this.props.boards[this.props.boardId].nextCardId,
      this.props.boardId
    );
    //reset the input value after adding the card
    this.setState(Object.assign({}, this.state, { [this.props.boardId]: "" }));
  };

  handleChange = event => {
    this.setState(
      Object.assign({}, this.state, { [event.target.name]: event.target.value })
    );
  };

  handleKeyDown = event => {
    if (event.key === "Enter") {
      this.handleAddCard();
    }
  };

  render() {
    const renderCards = Object.keys(this.props.cards).map(key => {
      return (
        <Card
          name={this.props.cards[key].cardName}
          key={key}
          id={key}
          deleteCard={id => this.props.deleteCard(id, this.props.boardId)}
        />
      );
    });

    return (
      <div className="CardContainer">
        <div className="Cards">
          {renderCards}
          <textarea
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
