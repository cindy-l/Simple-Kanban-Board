import React, { PureComponent } from "react";
import { connect } from "react-redux";
import Board from "./Board";
import PropTypes from "prop-types";
import { addBoard, deleteBoard } from "../actions";
import CardContainer from "./CardContainer";
import "../styles/BoardContainer.css";

class BoardContainer extends PureComponent {
  static propTypes = {
    boards: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string,
        name: PropTypes.string,
        cards: PropTypes.arrayOf(
          PropTypes.shape({
            cardId: PropTypes.string,
            cardName: PropTypes.string,
            boardId: PropTypes.string,
          })
        ),
      })
    ).isRequired,
  };

  state = { textInput: "" };

  handleAddBoard = () => {
    const { addBoard } = this.props;

    const boardName = this.state.textInput.trim();

    if (!boardName) return;

    addBoard(boardName);

    this.setState({ textInput: "" });
  };

  handleKeyDown = (event) => {
    if (event.key === "Enter") {
      this.handleAddBoard();
    }
  };

  renderAddAnotherBoard = () => (
    <div className="board-container">
      <textarea
        className="new-board-input"
        type="text"
        placeholder="Create new board"
        value={this.state.textInput}
        onChange={(event) => this.setState({ textInput: event.target.value })}
        onKeyDown={this.handleKeyDown}
      />
      <button
        className="mdc-icon-button material-icons icon-button"
        onClick={this.handleAddBoard}
      >
        add
      </button>
    </div>
  );

  renderContent = () => {
    const { boards, deleteBoard } = this.props;

    const numOfBoards = boards.length;

    const boardContainers = boards.map((board) => (
      <div className="board-container" key={board.id}>
        <Board
          name={board.name}
          id={board.id}
          deleteBoard={(id) => deleteBoard(id)}
        />
        <CardContainer cards={board.cards} boardId={board.id} />
      </div>
    ));

    return (
      <div>
        {numOfBoards !== 0 && boardContainers}
        {this.renderAddAnotherBoard()}
      </div>
    );
  };

  render() {
    return <React.Fragment>{this.renderContent()}</React.Fragment>;
  }
}

const mapDispatchToProps = {
  addBoard,
  deleteBoard,
};

const mapStateToProps = (state) => ({ boards: state });

export default connect(mapStateToProps, mapDispatchToProps)(BoardContainer);
