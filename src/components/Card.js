import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

import "../styles/CardContainer.css";

class Card extends PureComponent {
  static propTypes = {
    cardName: PropTypes.string.isRequired,
    cardId: PropTypes.string.isRequired,
    boardId: PropTypes.string.isRequired,
    deleteCard: PropTypes.func.isRequired,
  };

  state = {
    show: false,
  };

  handleDragStart = (event) => {
    const { cardId, cardName, boardId } = this.props;
    event.dataTransfer.setData("cardId", cardId);
    event.dataTransfer.setData("cardName", cardName);
    event.dataTransfer.setData("boardId", boardId);
  };

  closeModal = () => {
    this.setState({ show: false });
  };

  render() {
    const { cardName, cardId, deleteCard } = this.props;

    return (
      <div
        className="card"
        draggable="true"
        onDragStart={(event) => this.handleDragStart(event)}
        onDragOver={(event) => event.preventDefault()}
      >
        <div className="ellipsis-text">{cardName}</div>
        <button variant="primary" onClick={() => this.setState({ show: true })}>
          edit
        </button>

        <Modal show={this.state.show} onHide={this.closeModal}>
          <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.closeModal}>
              Close
            </Button>
            <Button variant="primary" onClick={this.closeModal}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default Card;
