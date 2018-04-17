import React, { Component } from 'react';
import Header from './components/Header';
import AddNewTodo from './components/AddNewTodo';
import TodoList from './components/TodoList';

class App extends Component {
  state = {
    todos: [],
    filter: 'all',
  }

  componentWillMount() {
    const json = localStorage.getItem('todos');
    const todos = JSON.parse(json);
    if (todos) {
      this.setState({ todos });
    }
  }

  componentDidUpdate() {
    const json = JSON.stringify(this.state.todos);
    localStorage.setItem('todos', json);
  }

  handleAddTodo = (todo) => {
    this.setState(prevState => ({
      todos: [
        ...prevState.todos,
        todo,
      ],
    }));
  }

  handleDeleteTodo = (id) => {
    const todos = this.state.todos.filter(todo => todo.id !== id);
    this.setState({ todos });
  }

  handleUpdateTodo = (id, text) => {
    const todos = this.state.todos.map((todo) => {
      if (todo.id === id) {
        return ({
          ...todo,
          text,
        });
      }
      return todo;
    });
    this.setState({ todos });
  }

  handleChangeStatus = (id) => {
    const todos = this.state.todos.map((todo) => {
      if (todo.id === id) {
        return ({
          ...todo,
          isDone: !todo.isDone,
        });
      }
      return todo;
    });
    this.setState({ todos });
  }

  handleDeleteAll = () => {
    this.setState({ todos: [] });
  }

  handleSetFilter = (filter) => {
    this.setState({ filter });
  }

  filterTodos = () => {
    const { todos, filter } = this.state;

    if (filter === 'all') {
      return todos;
    } else if (filter === 'active') {
      return todos.filter(todo => todo.isDone === false);
    } else if (filter === 'done') {
      return todos.filter(todo => todo.isDone === true);
    }
  }

  itemsLeft = () => this.state.todos.filter(todo => todo.isDone !== true).length;

  numberOfTodos = () => this.state.todos.length;

  render() {
    return (
      <div className="container px-xl-7">
        <Header />
        <AddNewTodo handleAddTodo={this.handleAddTodo} />
        <TodoList
          filterTodos={this.filterTodos}
          handleDeleteTodo={this.handleDeleteTodo}
          handleUpdateTodo={this.handleUpdateTodo}
          handleChangeStatus={this.handleChangeStatus}
          itemsLeft={this.itemsLeft}
          numberOfTodos={this.numberOfTodos}
          handleDeleteAll={this.handleDeleteAll}
          handleSetFilter={this.handleSetFilter}
          filter={this.state.filter}
        />
      </div>
    );
  }
}

export default App;
