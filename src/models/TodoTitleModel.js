// @flow
import { observable } from 'mobx'

/**
 * Todoのタイトルに制約を設けるためのModel
 */
export default class TodoTitleModel {
  /**
   * 試しにめっちゃ短く
   */
  static MAX_LENGTH_OF_TITLE = 30;

  @observable text: string;

  /**
   * @throws {ValidationError}
   */
  constructor(text: string) {
    TodoTitleModel.validateTitle(text);
    this.text = text;
  }

  /**
   * @throws {ValidationError}
   */
  static validateTitle(text: ?string): boolean {
    if (text == null) {
      throw new Error('null not allowed');
    }
    if (TodoTitleModel.MAX_LENGTH_OF_TITLE < text.length) {
      throw new ValidationError('too long');
    }
    return true;
  }
}

export class ValidationError extends Error {
  // NOP
}
