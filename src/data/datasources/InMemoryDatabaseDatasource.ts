import { TodoModel } from '../model/TodoModel';
import { DatabaseDatasource } from './DatabaseDatasource';

export class InMemoryDatabaseDatasource implements DatabaseDatasource {
  private todos: TodoModel[] = [];

  async createTodo(createTodo: TodoModel): Promise<TodoModel> {
    this.todos.push(createTodo);

    return createTodo;
  }

  async listAllTodos(): Promise<TodoModel[]> {
    return this.todos;
  }
}
