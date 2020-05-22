import React from "react";
import "./Board.css";
import DeleteIcon from "@material-ui/icons/DeleteRounded";

const Board = ({ name, id, deleteBoard }) => {
  return (
    <div className="Board">
      <header className="BoardHeader">
        {name}
        <DeleteIcon className="DeleteIcon" onClick={() => deleteBoard(id)} />
      </header>
    </div>
  );
};

export default Board;
