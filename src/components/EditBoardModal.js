import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import Modal from "react-bootstrap/Modal";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";

class EditBoardModal extends PureComponent {
  static propTypes = {
    editBoardInput: PropTypes.string.isRequired,
    show: PropTypes.bool.isRequired,
    onChange: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
    onHide: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired,
  };

  render() {
    const {
      editBoardInput,
      show,
      onChange,
      onDelete,
      onHide,
      onSave,
    } = this.props;

    return (
      <Modal show={show} onHide={onHide}>
        <Modal.Header>
          <Col xs={7} md={7}>
            <button
              className="mdc-icon-button material-icons custom-button"
              onClick={onHide}
            >
              arrow_back_ios
            </button>
          </Col>
          <Col xs={2} md={1}>
            <button
              className="mdc-icon-button material-icons custom-button"
              onClick={onSave}
            >
              done
            </button>
          </Col>
          <Col xs={2} md={2}>
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
            <Form.Group controlId="board-name-form">
              <Form.Label>Rename board</Form.Label>
              <Form.Control
                isInvalid={!editBoardInput}
                type="text"
                value={editBoardInput}
                onChange={onChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
      </Modal>
    );
  }
}

export default EditBoardModal;
