import React, { Component } from "react";
import Board from "../components/Board";
import { connect } from "react-redux";
import addBoard from "../actions/AddBoard";
import deleteBoard from "../actions/DeleteBoard";
import CardContainer from "./CardContainer";
import AddIcon from "@material-ui/icons/AddRounded";
import "./BoardContainer.css";

class BoardContainer extends Component {
  state = { textInput: "" };

  handleAddBoard = () => {
    const {
      addBoard,
      boardsInfo: { nextBoardId },
    } = this.props;

    const boardName = this.state.textInput.trim();

    if (!boardName) return;

    addBoard(nextBoardId, boardName);

    //reset input value after adding the board
    this.setState({ textInput: "" });
  };

  handleKeyDown = (event) => {
    if (event.key === "Enter") {
      this.handleAddBoard();
    }
  };

  renderAddAnotherBoard = () => (
    <div className="NewBoard">
      <input
        className="NewBoardInput"
        type="text"
        placeholder="Create new board"
        value={this.state.textInput}
        onChange={(event) => this.setState({ textInput: event.target.value })}
        onKeyDown={this.handleKeyDown}
      />
      <AddIcon className="AddIcon" onClick={this.handleAddBoard} />
    </div>
  );

  renderContent = () => {
    const {
      boardsInfo: { nextBoardId, ...boardObjects },
      deleteBoard,
    } = this.props;

    const numOfBoards = Object.keys(boardObjects).length;

    const boards = Object.keys(boardObjects).map((key) => (
      <div className="BoardContainer" key={key}>
        <Board
          name={boardObjects[key].name}
          id={key}
          deleteBoard={(id) => deleteBoard(id)}
        />
        <CardContainer cards={boardObjects[key].cards} boardId={key} />
      </div>
    ));

    return (
      <div className="App">
        {numOfBoards !== 0 && boards}
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

const mapStateToProps = (state) => ({ boardsInfo: state });

export default connect(mapStateToProps, mapDispatchToProps)(BoardContainer);
