import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import PropTypes from 'prop-types';
import TodoForm from './TodoForm';

class TodoListItem extends Component {
  state = {
    isUpdate: false,
    modal: false,
  };

  handleOnClickDeleteButton = () => {
    this.props.handleDeleteTodo(this.props.todo.id);
    this.toggleModal();
  }

  handleOnClickUpdateButton = () => {
    this.setState({ isUpdate: true });
  }

  handleOnChangeStatus = () => {
    this.props.handleChangeStatus(this.props.todo.id);
  }

  handleAddTodoText = (text) => {
    this.props.handleUpdateTodo(this.props.todo.id, text);
    this.setState({ isUpdate: false });
  }

  toggleModal = () => {
    this.setState({
      modal: !this.state.modal,
    });
  }

  render() {
    const { id, text, isDone } = this.props.todo;

    let content;
    if (this.state.isUpdate) {
      content = <TodoForm text={text} handleAddTodoText={this.handleAddTodoText} />;
    } else {
      content = <span className={isDone ? 'todo-item__done' : undefined}>{text}</span>;
    }

    return (
      <div className="todo-list__item py-3">
        <div className={this.state.isUpdate ? 'updating' : 'todo-list__content'}>
          <label
            htmlFor={id}
            className={this.state.isUpdate ? 'd-none' : 'checkbox-wrapper'}
          >
            <span className="done" />
            <input
              type="checkbox"
              id={id}
              checked={isDone}
              onChange={this.handleOnChangeStatus}
            />
            <span className="checkmark" />
          </label>
          {content}
        </div>
        <div className={this.state.isUpdate ? 'd-none' : undefined}>
          <Button
            color="info"
            className="mx-1"
            disabled={isDone && isDone}
            onClick={this.handleOnClickUpdateButton}
          >
            Update
          </Button>
          <Button
            color="danger"
            onClick={this.toggleModal}
          >
            Delete
          </Button>
          <Modal isOpen={this.state.modal} toggle={this.toggleModal}>
            <ModalHeader toggle={this.toggleModal}>Delete todo</ModalHeader>
            <ModalBody>
              Are you sure you want to delete this todo?
            </ModalBody>
            <ModalFooter>
              <Button color="danger" onClick={this.handleOnClickDeleteButton}>Delete</Button>{' '}
              <Button color="secondary" onClick={this.toggleModal}>Cancel</Button>
            </ModalFooter>
          </Modal>
        </div>
      </div>
    );
  }
}

TodoListItem.propTypes = {
  todo: PropTypes.shape({
    id: PropTypes.string,
    text: PropTypes.string,
    isDone: PropTypes.bool,
  }).isRequired,
  handleDeleteTodo: PropTypes.func.isRequired,
  handleUpdateTodo: PropTypes.func.isRequired,
  handleChangeStatus: PropTypes.func.isRequired,
};

export default TodoListItem;
