import { ExceptionHandler } from '../../utils/ExceptionHandler';
import { Result } from '../../utils/Result';
import { CacheDatasource } from '../datasources/CacheDatasource';
import { DatabaseDatasource } from '../datasources/DatabaseDatasource';
import { CreateTodoModel, TodoModel } from '../model/TodoModel';
import {
  TodoRepository,
  TodoRepositoryCreateRes,
  TodoRepositoryListAllRes,
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
}
