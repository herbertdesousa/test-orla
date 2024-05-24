import { CreateTodo } from '../../domain/entities/Todo';
import { TodoModel } from '../model/TodoModel';
import { DatabaseDatasource } from './DatabaseDatasource';

export class InMemoryDatabaseDatasource implements DatabaseDatasource {
  private todos: TodoModel[] = [
    {
      id: 'id-123',
      title: 'Task I',
      describe: 'do something',
      status: 'PENDING',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 'id-456',
      title: 'Task II',
      describe: 'do something',
      status: 'DONE',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];

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

  async listAllTodos(): Promise<TodoModel[]> {
    return this.todos;
  }
}
