import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import PropTypes from 'prop-types';

class TodoListHeader extends Component {
  state = {
    modal: false,
  }

  toggleModal = () => {
    this.setState({
      modal: !this.state.modal,
    });
  }

  handleOnClickDeleteAll = () => {
    this.props.handleDeleteAll();
    this.toggleModal();
  }

  render() {
    const itemsLeft = this.props.itemsLeft();
    const numberOfTodos = this.props.numberOfTodos();

    return (
      <div className="todo-list__header py-3 px-2 mt-4">
        <div className="row">
          <div className="col-sm-3 mb-2 mb-sm-0 text-center text-sm-left">
            {itemsLeft} item{itemsLeft === 1 ? '' : 's'} left
          </div>
          <div className="col-sm-6 mb-2 mb-sm-0 text-center">
            <Button
              disabled={this.props.filter === 'all' ? true : undefined}
              color="info"
              onClick={() => this.props.handleSetFilter('all')}
            >
              All
            </Button>
            <Button
              disabled={this.props.filter === 'active' ? true : undefined}
              color="info"
              className="mx-1"
              onClick={() => this.props.handleSetFilter('active')}
            >
              Undone
            </Button>
            <Button
              disabled={this.props.filter === 'done' ? true : undefined}
              color="info"
              onClick={() => this.props.handleSetFilter('done')}
            >
              Done
            </Button>
          </div>
          <div className="col-sm-3 text-center text-sm-right">
            <Button
              disabled={numberOfTodos === 0 ? true : undefined}
              color="danger"
              onClick={this.toggleModal}
            >
              Delete All
            </Button>
            <Modal isOpen={this.state.modal} toggle={this.toggleModal}>
              <ModalHeader toggle={this.toggleModal}>Delete all todos</ModalHeader>
              <ModalBody>
                Are you sure you want to delete all todos?
              </ModalBody>
              <ModalFooter>
                <Button color="danger" onClick={this.handleOnClickDeleteAll}>Delete</Button>{' '}
                <Button color="secondary" onClick={this.toggleModal}>Cancel</Button>
              </ModalFooter>
            </Modal>
          </div>
        </div>
      </div>
    );
  }
}

TodoListHeader.propTypes = {
  itemsLeft: PropTypes.func.isRequired,
  handleDeleteAll: PropTypes.func.isRequired,
  handleSetFilter: PropTypes.func.isRequired,
  filter: PropTypes.string.isRequired,
  numberOfTodos: PropTypes.func.isRequired,
};

export default TodoListHeader;
