import React, { Component } from "react";
import DeleteIcon from "@material-ui/icons/DeleteRounded";
import "./Card.css";

class Card extends Component {
  handleDragStart = (event, cardId, cardName, boardId) => {
    event.dataTransfer.setData("cardId", cardId);
    event.dataTransfer.setData("cardName", cardName);
    event.dataTransfer.setData("boardId", boardId);
  };

  render() {
    return (
      <div
        className="Card"
        draggable="true"
        onDragStart={event =>
          this.handleDragStart(
            event,
            this.props.id,
            this.props.name,
            this.props.boardId
          )
        }
        onDragOver={event => event.preventDefault()}
      >
        <div className="CardName">{this.props.name}</div>
        <DeleteIcon
          className="DeleteIcon"
          onClick={() => this.props.deleteCard(this.props.id)}
        />
      </div>
    );
  }
}

export default Card;
