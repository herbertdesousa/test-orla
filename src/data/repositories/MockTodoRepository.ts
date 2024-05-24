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
  async update(req: UpdateTodoModel): TodoRepositoryUpdateRes {
    const todoIndex = this.todos.findIndex(todo => todo.id === req.id);

    if (todoIndex === -1) {
      return Result.Failure({ code: 'NOT_FOUND' });
    }

    if (req.title !== undefined) {
      this.todos[todoIndex].title = req.title;
    }
    if (req.describe !== undefined) {
      this.todos[todoIndex].describe = req.describe;
    }
    if (req.status !== undefined) {
      this.todos[todoIndex].status = req.status;
    }
    if (req.createdAt !== undefined) {
      this.todos[todoIndex].createdAt = req.createdAt;
    }
    if (req.updatedAt !== undefined) {
      this.todos[todoIndex].updatedAt = req.updatedAt;
    }

    return Result.Success(this.todos[todoIndex]);
  }
}
