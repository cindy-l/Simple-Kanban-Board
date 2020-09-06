import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import Modal from "react-bootstrap/Modal";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";

class EditBoardModal extends PureComponent {
  static propTypes = {
    show: PropTypes.bool.isRequired,
    onDelete: PropTypes.func.isRequired,
    onHide: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired,
  };

  state = { textInput: "" };

  render() {
    const { show, onHide, onSave, onDelete, board } = this.props;
    const { name, id } = board;

    return (
      <Modal show={show} onHide={onHide}>
        <Modal.Header>
          <Col md={9}>
            <button
              className="mdc-icon-button material-icons custom-button"
              onClick={onHide}
            >
              arrow_back_ios
            </button>
          </Col>
          <Col md={1}>
            <button
              className="mdc-icon-button material-icons custom-button"
              onClick={() => onSave(id, this.state.textInput)}
            >
              done
            </button>
          </Col>
          <Col md={1}>
            <button
              className="mdc-icon-button material-icons custom-button"
              onClick={onDelete}
            >
              delete
            </button>
          </Col>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={(event) => event.preventDefault()}>
            <Form.Group controlId={id}>
              <Form.Label>Rename board</Form.Label>
              <Form.Control
                type="text"
                value={name}
                onChange={(event) =>
                  this.setState({ textInput: event.target.value })
                }
              />
            </Form.Group>
          </Form>
        </Modal.Body>
      </Modal>
    );
  }
}

export default EditBoardModal;
