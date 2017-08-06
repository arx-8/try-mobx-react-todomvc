// @flow
import TodoTitleModel, { ValidationError } from './TodoTitleModel'

import TodoStore from '../stores/TodoStore'
import { observable } from 'mobx';

export default class TodoModel {
  store: TodoStore;
  id: string;
  @observable title: TodoTitleModel;
  @observable completed: boolean;

  constructor(store: TodoStore, id: string, titleStr: string, completed: boolean) {
    this.store = store;
    this.id = id;
    this.completed = completed;

    try {
      this.title = new TodoTitleModel(titleStr);
    } catch (error) {
      alert(error.message);
      // 処理中断させるためにそのままぶん投げ
      throw error;
    }
  }

  toggle() {
    this.completed = !this.completed;
  }

  destroy() {
    this.store.todos.remove(this);
  }

  setTitle(titleStr: string) {
    try {
      this.title = new TodoTitleModel(titleStr);
    } catch (error) {
      alert(error.message);
      // NOP
      return;
    }
  }

  toJS(): { id: string, title: string, completed: boolean } {
    return {
      id: this.id,
      title: this.title.text,
      completed: this.completed
    };
  }

  static fromJS(store, object) {
    return new TodoModel(store, object.id, object.title, object.completed);
  }
}
