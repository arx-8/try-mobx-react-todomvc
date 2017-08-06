// @flow
import PropTypes from 'prop-types';
import React from 'react';
import ReactDOM from 'react-dom';
import TodoStore from '../stores/TodoStore'
import { observer } from 'mobx-react';

const ENTER_KEY = 13;

@observer
export default class TodoEntry extends React.Component {
  props: {
    todoStore: TodoStore
  };

  render() {
    return (<input
      ref="newField"
      className="new-todo"
      placeholder="What needs to be done?"
      onKeyDown={this.handleNewTodoKeyDown}
      autoFocus={true}
    />);
  }

  /**
   * flow-typedもマスターしないとだ
   * http://qiita.com/kuy/items/90fe63a9cc6710815c09
   */
  handleNewTodoKeyDown = (event: KeyboardEventHandler) => {
    if (event.keyCode !== ENTER_KEY) {
      return;
    }

    event.preventDefault();

    var val = ReactDOM.findDOMNode(this.refs.newField).value.trim();

    if (val) {
      this.props.todoStore.addTodo(val);
      ReactDOM.findDOMNode(this.refs.newField).value = '';
    }
  };
}

TodoEntry.propTypes = {
  todoStore: PropTypes.object.isRequired
};
