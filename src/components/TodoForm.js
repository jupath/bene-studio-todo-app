import React, { Component } from 'react';
import { Button, Form, Input } from 'reactstrap';
import PropTypes from 'prop-types';

class TodoForm extends Component {
  state = {
    text: this.props.text,
    error: false,
  };

  handleOnChangeField = (event) => {
    const text = event.target.value;
    this.setState({ text });
  }

  handleOnSubmitForm = (event) => {
    event.preventDefault();

    if (this.state.text === '') {
      this.setState({
        error: 'Please, fill out the field!',
      });
    } else {
      this.setState({
        text: '',
        error: false,
      });

      this.props.handleAddTodoText(this.state.text);
    }
  }

  render() {
    return (
      <div>
        <Form onSubmit={this.handleOnSubmitForm}>
          <Input
            type="text"
            name="enterTodo"
            value={this.state.text}
            placeholder="Enter your todo..."
            onChange={this.handleOnChangeField}
          />
          <Button className="text-uppercase" color="success">Save</Button>
        </Form>
        { this.state.error && <p className="text-danger">{this.state.error}</p> }
      </div>
    );
  }
}

TodoForm.propTypes = {
  handleAddTodoText: PropTypes.func.isRequired,
  text: PropTypes.string,
};

TodoForm.defaultProps = {
  text: '',
};

export default TodoForm;
