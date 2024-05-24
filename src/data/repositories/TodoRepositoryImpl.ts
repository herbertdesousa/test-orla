import { ExceptionHandler } from '../../utils/ExceptionHandler';
import { Result } from '../../utils/Result';
import { CacheDatasource } from '../datasources/cache/CacheDatasource';
import { DatabaseDatasource } from '../datasources/database/DatabaseDatasource';
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

export class TodoRepositoryImpl implements TodoRepository {
  constructor(
    private datasource: DatabaseDatasource,
    private cache: CacheDatasource<TodoModel[]>,
  ) {}

  private lastIndex = 0;

  @ExceptionHandler()
  async create({
    title,
    describe,
    status,
  }: CreateTodoModel): TodoRepositoryCreateRes {
    this.cache.clear();

    this.lastIndex++;

    const todo = await this.datasource.createTodo({
      id: `id-${this.lastIndex}`,
      title,
      describe,
      status,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return Result.Success(todo);
  }

  @ExceptionHandler()
  async listAll(): TodoRepositoryListAllRes {
    const cachedTodos = this.cache.get();

    if (cachedTodos !== null) {
      return Result.Success(cachedTodos);
    }

    const todos = await this.datasource.listAllTodos();

    this.cache.set(todos);

    return Result.Success(todos);
  }

  @ExceptionHandler()
  async update({
    id,
    title,
    describe,
    status,
  }: UpdateTodoModel): TodoRepositoryUpdateRes {
    const todo = await this.datasource.updateTodo({
      id,
      title,
      describe,
      status,
      updatedAt: new Date(Date.now()),
    });

    if (todo === null) {
      return Result.Failure({ code: 'NOT_FOUND' });
    }

    this.cache.clear();

    return Result.Success(todo);
  }
}
