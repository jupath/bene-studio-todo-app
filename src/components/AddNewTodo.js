import React, { Component } from 'react';
import uuid from 'uuid';
import PropTypes from 'prop-types';
import TodoForm from './TodoForm';

class AddNewTodo extends Component {
  handleAddTodoText = (text) => {
    this.props.handleAddTodo({
      id: uuid(),
      text,
      isDone: false,
    });
  }

  render() {
    return (
      <div className="add-todo">
        <TodoForm handleAddTodoText={this.handleAddTodoText} />
      </div>
    );
  }
}

AddNewTodo.propTypes = {
  handleAddTodo: PropTypes.func.isRequired,
};

export default AddNewTodo;
