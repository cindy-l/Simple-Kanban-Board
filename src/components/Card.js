import React from "react";
import DeleteIcon from "@material-ui/icons/DeleteRounded";
import "./Card.css";

const Card = ({ name, id, boardId, deleteCard }) => {
  const handleDragStart = (event, cardId, cardName, boardId) => {
    event.dataTransfer.setData("cardId", cardId);
    event.dataTransfer.setData("cardName", cardName);
    event.dataTransfer.setData("boardId", boardId);
  };

  return (
    <div
      className="Card"
      draggable="true"
      onDragStart={(event) => handleDragStart(event, id, name, boardId)}
      onDragOver={(event) => event.preventDefault()}
    >
      <div className="CardName">{name}</div>
      <DeleteIcon className="DeleteIcon" onClick={() => deleteCard(id)} />
    </div>
  );
};

export default Card;
