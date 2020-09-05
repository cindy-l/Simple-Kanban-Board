import React, { PureComponent } from "react";
import PropTypes from "prop-types";

import "../styles/BoardContainer.css";

class Board extends PureComponent {
  static propTypes = {
    id: PropTypes.string.isRequired,
    name: PropTypes.string,
    deleteBoard: PropTypes.func.isRequired,
  };

  render() {
    const { id, name, deleteBoard } = this.props;

    return (
      <div className="board">
        <div className="board-header">
          {name}
          <button
            className="mdc-icon-button material-icons icon-button"
            onClick={() => deleteBoard(id)}
          >
            delete
          </button>
        </div>
      </div>
    );
  }
}

export default Board;
