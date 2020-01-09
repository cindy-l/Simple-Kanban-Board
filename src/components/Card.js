import React from "react";
import DeleteIcon from "@material-ui/icons/DeleteRounded";
import "./Card.css";

const Card = props => {
  return (
    <div className="Card">
      <div className="CardName">{props.name}</div>
      <DeleteIcon
        className="DeleteIcon"
        onClick={() => props.deleteCard(props.id)}
      />
    </div>
  );
};

export default Card;
