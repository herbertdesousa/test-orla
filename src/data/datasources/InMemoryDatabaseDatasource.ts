import {CreateTodo} from '../../domain/entities/Todo';
import {TodoModel} from '../model/TodoModel';
import {DatabaseDatasource} from './DatabaseDatasource';

export class InMemoryDatabaseDatasource implements DatabaseDatasource {
  private todos: TodoModel[] = [];

  async createTodo(createTodo: CreateTodo): Promise<TodoModel> {
    const todo: TodoModel = {
      id: String(Math.random() * 100),
      title: createTodo.title,
      describe: createTodo.describe,
      status: 'PENDING',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.todos.push(todo);

    return todo;
  }
}