import React, { Component } from "react";
import Board from "../components/Board";
import { connect } from "react-redux";
import addBoard from "../actions/AddBoard";
import deleteBoard from "../actions/DeleteBoard";
import CardContainer from "./CardContainer";
import AddIcon from "@material-ui/icons/AddRounded";
import "./BoardContainer.css";

class BoardContainer extends Component {
  constructor(props) {
    super(props);
    this.state = { newBoardInputName: "" };
  }

  handleAddBoard = () => {
    const boardName = this.state.newBoardInputName;
    if (!boardName) return;
    this.props.addBoard(this.props.boards.nextBoardId, boardName);
    //reset input value after adding the board
    this.setState({ newBoardInputName: "" });
  };

  handleChange = event => {
    this.setState({ newBoardInputName: event.target.value });
  };

  handleKeyDown = event => {
    if (event.key === "Enter") {
      this.handleAddBoard();
    }
  };

  renderAddAnotherBoard = () => {
    return (
      <div className="NewBoard">
        <input
          className="NewBoardInput"
          type="text"
          placeholder="Create new board"
          value={this.state.newBoardInputName}
          onChange={this.handleChange}
          onKeyDown={this.handleKeyDown}
        />
        <AddIcon className="AddIcon" onClick={this.handleAddBoard} />
      </div>
    );
  };

  renderContent = () => {
    const numOfBoards = Object.keys(this.props.boards).length;

    if (numOfBoards === 0) {
      return <div className="EmptyBoard">{this.renderAddAnotherBoard()}</div>;
    } else {
      const boards = Object.keys(this.props.boards)
        .filter(key => key !== "nextBoardId")
        .map(key => (
          <div className="Boards" key={key}>
            <Board
              name={this.props.boards[key].name}
              id={key}
              deleteBoard={id => this.props.deleteBoard(id)}
            />
            <CardContainer cards={this.props.boards[key].cards} boardId={key} />
          </div>
        ));
      return (
        <div className="BoardContainer">
          {boards}
          {this.renderAddAnotherBoard()}
        </div>
      );
    }
  };

  render() {
    return <React.Fragment>{this.renderContent()}</React.Fragment>;
  }
}

const mapDispatchToProps = {
  addBoard,
  deleteBoard
};

const mapStateToProps = state => {
  return { boards: state };
};

export default connect(mapStateToProps, mapDispatchToProps)(BoardContainer);
