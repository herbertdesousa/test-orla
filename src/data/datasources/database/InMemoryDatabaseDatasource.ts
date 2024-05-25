import { TodoModel, UpdateTodoModel } from '../../model/TodoModel';
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

  private normalize(str: string): string {
    return str
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase();
  }

  async queryAnyTodoField(query: string): Promise<TodoModel[]> {
    const queryNorm = this.normalize(query);

    const queried = this.todos.filter(todo => {
      return [
        this.normalize(todo.title),
        this.normalize(todo.status),
        this.normalize(todo.describe),
        String(todo.createdAt),
        String(todo.updatedAt),
      ].some(field => field.includes(queryNorm));
    });

    return queried;
  }

  async updateTodo(payload: UpdateTodoModel): Promise<TodoModel | null> {
    const todoIndex = this.todos.findIndex(todo => todo.id === payload.id);

    if (todoIndex === -1) {
      return null;
    }

    if (payload?.title !== undefined) {
      this.todos[todoIndex].title = payload.title;
    }
    if (payload?.describe !== undefined) {
      this.todos[todoIndex].describe = payload.describe;
    }
    if (payload?.status !== undefined) {
      this.todos[todoIndex].status = payload.status;
    }
    if (payload?.createdAt !== undefined) {
      this.todos[todoIndex].createdAt = payload.createdAt;
    }
    if (payload?.updatedAt !== undefined) {
      this.todos[todoIndex].updatedAt = payload.updatedAt;
    }

    return this.todos[todoIndex];
  }

  async deleteTodo(id: string): Promise<TodoModel | null> {
    const todoIndex = this.todos.findIndex(todo => todo.id === id);

    if (todoIndex === -1) {
      return null;
    }

    const todo = this.todos[todoIndex];

    this.todos = this.todos.filter(todo => todo.id !== id);

    return todo;
  }
}
