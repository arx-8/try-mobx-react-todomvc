import { ACTIVE_TODOS, COMPLETED_TODOS } from '../constants';

import PropTypes from 'prop-types';
import React from 'react';
import TodoItem from './todoItem';
import TodoStore from '../stores/TodoStore'
import ViewStore from '../stores/ViewStore'
import { observer } from 'mobx-react';

@observer
export default class TodoOverview extends React.Component {
  props: {
    todoStore: TodoStore;
    viewStore: ViewStore;
  }

  render() {
    const { todoStore, viewStore } = this.props;
    if (todoStore.todos.length === 0)
      return null;
    return <section className="main">
      <input
        className="toggle-all"
        type="checkbox"
        onChange={this.toggleAll}
        checked={todoStore.activeTodoCount === 0}
      />
      <ul className="todo-list">
        {this.getVisibleTodos().map(todo =>
          (<TodoItem
            key={todo.id}
            todo={todo}
            viewStore={viewStore}
          />)
        )}
      </ul>
    </section>
  }

  getVisibleTodos() {
    return this.props.todoStore.todos.filter(todo => {
      switch (this.props.viewStore.todoFilter) {
        case ACTIVE_TODOS:
          return !todo.completed;
        case COMPLETED_TODOS:
          return todo.completed;
        default:
          return true;
      }
    });
  }

  toggleAll = (event) => {
    var checked = event.target.checked;
    this.props.todoStore.toggleAll(checked);
  };
}


TodoOverview.propTypes = {
  viewStore: PropTypes.object.isRequired,
  todoStore: PropTypes.object.isRequired
}
