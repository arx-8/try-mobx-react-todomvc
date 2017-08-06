// @flow
import * as Utils from '../utils';

import { computed, observable, reaction } from 'mobx';

import TodoModel from '../models/TodoModel'

export default class TodoStore {
  @observable todos: Array<TodoModel> = [];

  @computed get activeTodoCount(): number {
    return this.todos.reduce(
      (sum, todo) => sum + (todo.completed ? 0 : 1),
      0
    )
  }

  @computed get completedCount(): number {
    return this.todos.length - this.activeTodoCount;
  }

  subscribeServerToStore() {
    reaction(
      () => this.toJS(),
      todos => window.fetch && fetch('/api/todos', {
        method: 'post',
        body: JSON.stringify({ todos }),
        headers: new Headers({ 'Content-Type': 'application/json' })
      })
    );
  }

  subscribeLocalstorageToStore() {
    reaction(
      () => this.toJS(),
      todos => localStorage.setItem('mobx-react-todomvc-todos', JSON.stringify({ todos }))
    );
  }

  addTodo(titleStr: string) {
    this.todos.push(new TodoModel(this, Utils.uuid(), titleStr, false));
  }

  toggleAll(checked: string) {
    this.todos.forEach(
      todo => todo.completed = checked
    );
  }

  clearCompleted() {
    this.todos = this.todos.filter(
      todo => !todo.completed
    );
  }

  toJS() {
    return this.todos.map(todo => todo.toJS());
  }

  static fromJS(array) {
    const todoStore = new TodoStore();
    todoStore.todos = array.map(item => TodoModel.fromJS(todoStore, item));
    return todoStore;
  }
}
