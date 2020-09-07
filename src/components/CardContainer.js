import React, { PureComponent } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { addCard, deleteCard, editCard } from "../actions";
import Card from "react-bootstrap/Card";
import EditCardModal from "../components/EditCardModal";

import "../styles/CardContainer.css";
import "../styles/BoardContainer.css";

const KanbanCard = ({ text, onClick }) => (
  <Card draggable={true} onDragStart={}>
    <button className="custom-button" onClick={onClick}>
      <Card.Body>
        <Card.Text>{text}</Card.Text>
      </Card.Body>
    </button>
  </Card>
);

class CardContainer extends PureComponent {
  static propTypes = {
    cards: PropTypes.arrayOf(
      PropTypes.shape({
        boardId: PropTypes.string,
        cardDueDate: PropTypes.string,
        cardId: PropTypes.string,
        cardName: PropTypes.string,
      })
    ).isRequired,
    boardId: PropTypes.string.isRequired,
    addCard: PropTypes.func.isRequired,
    deleteCard: PropTypes.func.isRequired,
    editCard: PropTypes.func.isRequired,
  };

  state = {
    show: false,
    cardId: "",
    editCardNameInput: "",
    editCardDueDateInput: "",
    addNewCardMode: false,
  };

  handleAddCard = () => {
    const { addCard, boardId } = this.props;
    const { cardId, editCardNameInput, editCardDueDateInput } = this.state;

    if (!editCardNameInput) {
      return;
    }

    addCard(
      {
        cardId,
        cardName: editCardNameInput,
        cardDueDate: editCardDueDateInput,
      },
      boardId
    );

    this.closeModal();
  };

  handleNameChange = (event) => {
    this.setState({ editCardNameInput: event.target.value });
  };

  handleDueDateChange = (event) => {
    this.setState({ editCardDueDateInput: event.target.value });
  };

  handleDeleteCard = () => {
    const { boardId, deleteCard } = this.props;

    deleteCard(this.state.cardId, boardId);

    this.closeModal();
  };

  handleEditCard = () => {
    const { boardId, editCard } = this.props;
    const { cardId, editCardNameInput, editCardDueDateInput } = this.state;

    if (!editCardNameInput) {
      return;
    }

    editCard(
      {
        cardId,
        cardName: editCardNameInput,
        cardDueDate: editCardDueDateInput,
      },
      boardId
    );

    this.closeModal();
  };

  closeModal = () => {
    this.setState({ show: false });
  };

  render() {
    const { cards } = this.props;

    return (
      <div className="card-container">
        <div className="cards">
          {cards.map(({ cardId, cardName, cardDueDate }) => (
            <KanbanCard
              key={cardId}
              text={cardName}
              onClick={() =>
                this.setState({
                  show: true,
                  cardId: cardId,
                  editCardNameInput: cardName,
                  editCardDueDateInput: cardDueDate,
                  addNewCardMode: false,
                })
              }
            />
          ))}
          <KanbanCard
            text="Add new card"
            onClick={() =>
              this.setState({
                show: true,
                cardId: "",
                editCardNameInput: "",
                editCardDueDateInput: "",
                addNewCardMode: true,
              })
            }
          />
        </div>

        <EditCardModal
          {...this.state}
          onDueDateChange={this.handleDueDateChange}
          onNameChange={this.handleNameChange}
          onDelete={this.handleDeleteCard}
          onHide={this.closeModal}
          onSave={
            this.state.addNewCardMode ? this.handleAddCard : this.handleEditCard
          }
        />
      </div>
    );
  }
}

const mapDispatchToProps = {
  addCard,
  deleteCard,
  editCard,
};

export default connect(null, mapDispatchToProps)(CardContainer);
