import React from "react";
import { useState, useRef } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { addBoard, deleteBoard, dragAndDropCard, editBoard } from "../actions";
import CardContainer from "./CardContainer";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import EditBoardModal from "./EditBoardModal";

import "../styles/BoardContainer.css";

const BoardContainer = (props) => {
  const [newBoardInput, setInput] = useState("");
  const [editBoardInput, setEditBoardInput] = useState("");
  const [boardId, setBoardId] = useState("");
  const [show, setShow] = useState(false);

  const draggedRef = useRef();
  const draggedNode = useRef();
  const dropTargetRef = useRef();
  const [isDragging, setDragging] = useState(false);

  const handleDragStart = (event, boardIndex, cardIndex) => {
    draggedRef.current = { boardIndex, cardIndex };
    draggedNode.current = event.target;
    draggedNode.current.addEventListener("dragend", handleDragEnd);
    setTimeout(() => setDragging(true), 0);
  };

  const handleDragEnd = () => {
    draggedNode.current.removeEventListener("dragend", handleDragEnd);
    draggedRef.current = null;
    draggedNode.current = null;
    dropTargetRef.current = null;
    setDragging(false);
  };

  const handleDragEnter = (event, boardIndex, cardIndex) => {
    if (event.target !== draggedNode.current) {
      dropTargetRef.current = { boardIndex, cardIndex };
    }
  };

  const handleDrop = (event) => {
    event.preventDefault();

    if (!draggedRef.current) {
      return;
    }

    const {
      boardIndex: currBoardIndex,
      cardIndex: currCardIndex,
    } = draggedRef.current;

    const {
      boardIndex: targetBoardIndex,
      cardIndex: targetCardIndex,
    } = dropTargetRef.current;

    props.dragAndDropCard(
      currBoardIndex,
      currCardIndex,
      targetBoardIndex,
      targetCardIndex
    );
  };

  const getClassName = (boardIndex, cardIndex) => {
    const {
      boardIndex: currBoardIndex,
      cardIndex: currCardIndex,
    } = draggedRef.current;

    if (boardIndex === currBoardIndex && cardIndex === currCardIndex) {
      return "gray-background kanban-card";
    } else {
      return "kanban-card";
    }
  };

  const handleAddBoard = () => {
    const { addBoard } = props;

    const boardName = newBoardInput.trim();

    if (!boardName) return;

    addBoard(boardName);

    setInput("");
  };

  const handleChange = (event) => {
    setEditBoardInput(event.target.value);
  };

  const handleEditBoard = () => {
    const { editBoard } = props;

    if (!editBoardInput) {
      return;
    }

    editBoard(boardId, editBoardInput);

    closeModal();
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    handleAddBoard();
  };

  const closeModal = () => {
    setShow(false);
  };

  const renderAddAnotherBoard = () => (
    <div className="board">
      <Row className="board-header">
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label className="board-name">Add new board</Form.Label>
            <Form.Control
              type="text"
              placeholder="Add new board"
              onChange={(event) => setInput(event.target.value)}
              value={newBoardInput}
            />
          </Form.Group>
        </Form>
      </Row>
    </div>
  );

  const renderContent = () => {
    const { boards, deleteBoard } = props;

    const boardContainers = boards.map(({ cards, id, name }, index) => (
      <div className="board" key={id}>
        <Row className="board-header">
          <Col xs={8} md={8}>
            <p className="ellipsis-text">{name}</p>
          </Col>
          <Col>
            <button
              className="mdc-icon-button material-icons custom-button"
              onClick={() => {
                setShow(true);
                setBoardId(id);
                setEditBoardInput(name);
              }}
            >
              edit
            </button>
          </Col>
        </Row>
        <CardContainer
          cards={cards}
          boardId={id}
          boardIndex={index}
          isDragging={isDragging}
          handleDragEnter={handleDragEnter}
          handleDragStart={handleDragStart}
          handleDrop={handleDrop}
          getClassName={getClassName}
        />
      </div>
    ));

    return (
      <>
        {boardContainers}
        {renderAddAnotherBoard()}
        <EditBoardModal
          id={boardId}
          editBoardInput={editBoardInput}
          show={show}
          onChange={handleChange}
          onDelete={() => {
            deleteBoard(boardId);
            closeModal();
          }}
          onHide={closeModal}
          onSave={handleEditBoard}
        />
      </>
    );
  };

  return <div className="board-content">{renderContent()}</div>;
};

const mapDispatchToProps = {
  addBoard,
  deleteBoard,
  dragAndDropCard,
  editBoard,
};

const mapStateToProps = (state) => ({ boards: state });

export default connect(mapStateToProps, mapDispatchToProps)(BoardContainer);

BoardContainer.propTypes = {
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
  dragAndDropCard: PropTypes.func.isRequired,
  editBoard: PropTypes.func.isRequired,
};
