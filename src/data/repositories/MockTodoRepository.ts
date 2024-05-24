import { ExceptionHandler } from '../../utils/ExceptionHandler';
import { Result } from '../../utils/Result';
import {
  CreateTodoModel,
  TodoModel,
  UpdateTodoModel,
} from '../model/TodoModel';
import {
  TodoRepository,
  TodoRepositoryCreateRes,
  TodoRepositoryListAllRes,
  TodoRepositoryUpdateRes,
} from './TodoRepository';

export class MockTodoRepository implements TodoRepository {
  private todos: TodoModel[] = [];

  async create({
    title,
    describe,
    status,
  }: CreateTodoModel): TodoRepositoryCreateRes {
    const todo: TodoModel = {
      id: 'id-123',
      title,
      describe,
      status,
      createdAt: new Date(Date.now()),
      updatedAt: new Date(Date.now()),
    };

    this.todos.push(todo);

    return Result.Success(todo);
  }

  @ExceptionHandler()
  async listAll(): TodoRepositoryListAllRes {
    return Result.Success(this.todos);
  }

  @ExceptionHandler()
  async update({
    id,
    createdAt,
    describe,
    status,
    title,
    updatedAt,
  }: UpdateTodoModel): TodoRepositoryUpdateRes {
    const todoIndex = this.todos.findIndex(todo => todo.id === id);

    if (todoIndex === -1) {
      return Result.Failure({ code: 'NOT_FOUND' });
    }

    if (title) {
      this.todos[todoIndex].title = title;
    }
    if (describe) {
      this.todos[todoIndex].describe = describe;
    }
    if (status) {
      this.todos[todoIndex].status = status;
    }
    if (createdAt) {
      this.todos[todoIndex].createdAt = createdAt;
    }
    if (updatedAt) {
      this.todos[todoIndex].updatedAt = updatedAt;
    }

    return Result.Success(this.todos[todoIndex]);
  }
}
