import { ExceptionHandler } from '../../utils/ExceptionHandler';
import { Result } from '../../utils/Result';
import { CreateTodoModel, TodoModel } from '../model/TodoModel';
import {
  TodoRepository,
  TodoRepositoryCreateRes,
  TodoRepositoryListAllRes,
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
}
