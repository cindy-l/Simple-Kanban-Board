import React from "react";
import PropTypes from "prop-types";

import "../styles/CardContainer.css";

const KanbanCard = ({
  text,
  handleClick,
  handleDragEnter,
  handleDragStart,
  handleDrop,
  ...props
}) => (
  <button
    draggable="true"
    onClick={handleClick}
    onDragEnter={handleDragEnter}
    onDragOver={(event) => event.preventDefault()}
    onDragStart={handleDragStart}
    onDrop={handleDrop}
    {...props}
  >
    {text}
  </button>
);

export default KanbanCard;

KanbanCard.propTypes = {
  text: PropTypes.string,
  handleClick: PropTypes.func.isRequired,
  handleDragEnter: PropTypes.func.isRequired,
  handleDragStart: PropTypes.func.isRequired,
  handleDrop: PropTypes.func.isRequired,
};
