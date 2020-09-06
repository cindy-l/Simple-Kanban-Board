import React, { PureComponent } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { addBoard, deleteBoard, editBoard } from "../actions";
import CardContainer from "./CardContainer";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import RenameBoardModal from "./RenameBoardModal";

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
    addBoard: PropTypes.func.isRequired,
    deleteBoard: PropTypes.func.isRequired,
    editBoard: PropTypes.func.isRequired,
  };

  state = { textInput: "", show: false };

  handleAddBoard = () => {
    const { addBoard } = this.props;

    const boardName = this.state.textInput.trim();

    if (!boardName) return;

    addBoard(boardName);

    this.setState({ textInput: "" });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.handleAddBoard();
  };

  closeModal = () => {
    this.setState({ show: false });
  };

  renderAddAnotherBoard = () => (
    <Col md={2} className="board">
      <Row className="board-header">
        <Form onSubmit={this.handleSubmit}>
          <Form.Group>
            <Form.Label className="board-name">Add new board</Form.Label>
            <Form.Control
              type="text"
              placeholder="Add new board"
              onChange={(event) =>
                this.setState({ textInput: event.target.value })
              }
              value={this.state.textInput}
            />
          </Form.Group>
        </Form>
      </Row>
    </Col>
  );

  renderContent = () => {
    const { boards, deleteBoard, editBoard } = this.props;

    const boardContainers = boards.map((board) => (
      <Col md={2} className="board" key={board.id}>
        <Row className="board-header">
          <Col md={9}>
            <p className="ellipsis-text">{board.name}</p>
          </Col>
          <Col md={1}>
            <button
              className="mdc-icon-button material-icons custom-button"
              onClick={() =>
                this.setState({
                  show: true,
                  editBoardId: board.id,
                  editBoardName: board.name,
                })
              }
            >
              edit
            </button>
          </Col>
        </Row>
        <CardContainer cards={board.cards} boardId={board.id} />
      </Col>
    ));

    return (
      <Row>
        {boardContainers}
        {this.renderAddAnotherBoard()}
        <RenameBoardModal
          name={this.state.editBoardName}
          id={this.state.editBoardId}
          show={this.state.show}
          onHide={this.closeModal}
          onSave={(id, newName) => {
            editBoard(id, newName);
            this.closeModal();
          }}
          onDelete={() => {
            deleteBoard(this.state.editBoardId);
            this.closeModal();
          }}
        />
      </Row>
    );
  };

  render() {
    return <div className="board-content">{this.renderContent()}</div>;
  }
}

const mapDispatchToProps = {
  addBoard,
  deleteBoard,
  editBoard,
};

const mapStateToProps = (state) => ({ boards: state });

export default connect(mapStateToProps, mapDispatchToProps)(BoardContainer);
