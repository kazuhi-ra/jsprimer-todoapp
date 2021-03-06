import { TodoListModel } from "./model/TodoListModel.js";
import { TodoItemModel } from "./model/TodoItemModel.js";
import { element, render } from "./view/html-util.js";

console.log("App.js: loaded");

export class App {
  constructor() {
    // 1. TodoListの初期化
    this.todoListModel = new TodoListModel();
  }

  mount() {
    const formElement = document.querySelector("#js-form");
    const inputElement = document.querySelector("#js-form-input");
    const containerElement = document.querySelector("#js-todo-list");
    const todoItemCountElement = document.querySelector("#js-todo-count");
    // 2. todoListModelの状態が更新されたら表示を更新する
    this.todoListModel.onChange(() => {
      // TodoリストをまとめるList要素
      const todoListElement = element`<ul />`;
      // それぞれのTodoItem要素をtodoListElement以下へ追加する
      const todoItems = this.todoListModel.getTodoItems();
      todoItems.forEach((item) => {
        const todoItemElement = item.completed
          ? element`<li><input type="checkbox" class="checkbox"><s>${item.title}</s><button class="delete">x</button></input></li>`
          : element`<li><input type="checkbox" class="checkbox">${item.title}<button class="delete">x</button></input></li>`;
        // checkbox
        const inputCheckboxElement = todoItemElement.querySelector(".checkbox");
        inputCheckboxElement.addEventListener("change", () => {
          this.todoListModel.updateTodo({
            id: item.id,
            completed: !item.completed,
          });
        });
        // 削除ボタンをクリックでTodoListModelからアイテムを削除
        const deleteButtonElement = todoItemElement.querySelector(".delete");
        deleteButtonElement.addEventListener("click", () => {
          this.todoListModel.deleteTodo({ id: item.id });
        });
        todoListElement.appendChild(todoItemElement);
      });
      // containerElementの中身をtodoListElementで上書きする
      render(todoListElement, containerElement);
      // アイテム数の表示を更新
      todoItemCountElement.textContent = `Todoアイテム数: ${this.todoListModel.getTotalCount()}`;
    });
    // 3. フォームを送信したら、新しいTodoItemModelを追加する
    formElement.addEventListener("submit", (event) => {
      console.log("submit");
      event.preventDefault();
      this.todoListModel.addTodo(
        new TodoItemModel({
          title: inputElement.value,
          completed: false,
        })
      );
      inputElement.value = "";
    });
  }
}
