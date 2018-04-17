import React from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import PropTypes from 'prop-types';
import TodoListHeader from './TodoListHeader';
import TodoListItem from './TodoListItem';

const TodoList = (props) => {
  const todos = props.filterTodos();

  let listOfTodos;
  if (todos.length > 0) {
    listOfTodos = todos.map(todo => (
      <CSSTransition
        classNames="fade"
        timeout={1000}
        key={todo.id}
      >
        <TodoListItem
          key={todo.id}
          todo={todo}
          handleDeleteTodo={props.handleDeleteTodo}
          handleUpdateTodo={props.handleUpdateTodo}
          handleChangeStatus={props.handleChangeStatus}
        />
      </CSSTransition>
    ));
  } else {
    listOfTodos = (
      <CSSTransition
        classNames="fade"
        timeout={1000}
      >
        <p className="text-center my-4">There are no items yet</p>
      </CSSTransition>
    );
  }

  return (
    <div className="todo-list">
      <TodoListHeader
        itemsLeft={props.itemsLeft}
        numberOfTodos={props.numberOfTodos}
        handleDeleteAll={props.handleDeleteAll}
        handleSetFilter={props.handleSetFilter}
        filter={props.filter}
      />
      <TransitionGroup
        component="div"
        className="list"
      >
        { listOfTodos }
      </TransitionGroup>
    </div>
  );
};

TodoList.propTypes = {
  filterTodos: PropTypes.func.isRequired,
  handleDeleteTodo: PropTypes.func.isRequired,
  handleUpdateTodo: PropTypes.func.isRequired,
  handleChangeStatus: PropTypes.func.isRequired,
  itemsLeft: PropTypes.func.isRequired,
  numberOfTodos: PropTypes.func.isRequired,
  handleDeleteAll: PropTypes.func.isRequired,
  handleSetFilter: PropTypes.func.isRequired,
  filter: PropTypes.string.isRequired,
};

export default TodoList;
