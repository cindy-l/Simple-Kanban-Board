import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import Modal from "react-bootstrap/Modal";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";

class EditCardModal extends PureComponent {
  static propTypes = {
    editCardNameInput: PropTypes.string,
    editCardDueDateInput: PropTypes.string,
    show: PropTypes.bool.isRequired,
    onDelete: PropTypes.func.isRequired,
    onDueDateChange: PropTypes.func.isRequired,
    onHide: PropTypes.func.isRequired,
    onNameChange: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired,
  };

  render() {
    const {
      editCardNameInput,
      editCardDueDateInput,
      show,
      onDelete,
      onDueDateChange,
      onHide,
      onNameChange,
      onSave,
    } = this.props;

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
              onClick={onSave}
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
            <Form.Group controlId="card-name-form">
              <Form.Label>Edit task</Form.Label>
              <Form.Control
                type="text"
                isInvalid={!editCardNameInput}
                onChange={onNameChange}
                value={editCardNameInput}
              />
            </Form.Group>
            <Form.Group controlId="card-due-date-form">
              <Form.Label>Due Date</Form.Label>
              <Form.Control
                type="text"
                onChange={onDueDateChange}
                value={editCardDueDateInput}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
      </Modal>
    );
  }
}

export default EditCardModal;
