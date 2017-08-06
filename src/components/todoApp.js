import { ACTIVE_TODOS, ALL_TODOS, COMPLETED_TODOS } from '../constants';

import PropTypes from 'prop-types';
import React from 'react';
import TodoEntry from './todoEntry';
import TodoFooter from './todoFooter';
import TodoOverview from './todoOverview';
import { observer } from 'mobx-react';

@observer
export default class TodoApp extends React.Component {
  render() {
    const { todoStore, viewStore } = this.props;
    return (
      <div>
        <header className="header">
          <h1>todos</h1>
          <TodoEntry todoStore={todoStore} />
        </header>
        <TodoOverview todoStore={todoStore} viewStore={viewStore} />
        <TodoFooter todoStore={todoStore} viewStore={viewStore} />
      </div>
    );
  }

  componentDidMount() {
    if (__CLIENT__) {
      var { Router } = require('director/build/director');
      var viewStore = this.props.viewStore;
      var router = Router({
        '/': function () { viewStore.todoFilter = ALL_TODOS; },
        '/active': function () { viewStore.todoFilter = ACTIVE_TODOS; },
        '/completed': function () { viewStore.todoFilter = COMPLETED_TODOS; }
      });
      router.init('/');
    }
  }
}

TodoApp.propTypes = {
  viewStore: PropTypes.object.isRequired,
  todoStore: PropTypes.object.isRequired
};
