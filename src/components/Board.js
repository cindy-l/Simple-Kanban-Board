import React from "react";
import "./Board.css";
import DeleteIcon from "@material-ui/icons/DeleteRounded";

const Board = props => {
  return (
    <div className="Board">
      <header className="BoardHeader">
        {props.name}
        <DeleteIcon
          className="DeleteIcon"
          onClick={() => props.deleteBoard(props.id)}
        />
      </header>
    </div>
  );
};

export default Board;
