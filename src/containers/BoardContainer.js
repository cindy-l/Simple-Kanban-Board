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
    const { addBoard } = this.props;

    const boardName = this.state.textInput.trim();

    if (!boardName) return;

    addBoard(boardName);

    this.setState(Object.assign({}, this.state, { textInput: "" }));
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
    const { boards, deleteBoard } = this.props;

    const numOfBoards = boards.length;

    const boardContainers = boards.map((board) => (
      <div className="BoardContainer" key={board.id}>
        <Board
          name={board.name}
          id={board.id}
          deleteBoard={(id) => deleteBoard(id)}
        />
        <CardContainer cards={board.cards} boardId={board.id} />
      </div>
    ));

    return (
      <div className="App">
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
