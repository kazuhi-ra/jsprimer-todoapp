import { EventEmitter } from "../EventEmitter.js";

export class TodoListModel extends EventEmitter {
  constructor(items = []) {
    super();
    this.items = items;
  }

  /**
   * Todoアイテムの合計個数をreturn
   * @returns {number}
   */
  getTotalCount() {
    return this.items.length;
  }

  /**
   * 表示できるTodoItemの配列をreturn
   * @returns {TodoItemModel[]}
   */
  getTodoItems() {
    return this.items;
  }

  /**
   * TodoListの状態が更新された時に呼ばれる関数の登録
   * @param {Function} listener
   */
  onChange(listener) {
    this.addEventListener("change", listener);
  }

  /**
   * 状態が変化された時に呼ぶ
   */
  emitChange() {
    this.emit("change");
  }

  /**
   * TodoItemを追加する
   * @param {TodoItemModel} todoItem
   */
  addTodo(todoItem) {
    this.items.push(todoItem);
    this.emitChange();
  }
}
