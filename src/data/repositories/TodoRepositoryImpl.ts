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
  TodoRepositoryDeleteRes,
  TodoRepositoryListAllRes,
  TodoRepositoryUpdateRes,
} from './TodoRepository';

const CACHE_LIST_ALL_KEY = '@LIST_LIST_ALL_KEY' + Math.random() * 100;

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
    this.cache.remove(CACHE_LIST_ALL_KEY);

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
    const cachedTodos = this.cache.get(CACHE_LIST_ALL_KEY);

    if (cachedTodos) {
      return Result.Success(cachedTodos);
    }

    const todos = await this.datasource.listAllTodos();

    this.cache.set(CACHE_LIST_ALL_KEY, todos);

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

    this.cache.remove(CACHE_LIST_ALL_KEY);

    return Result.Success(todo);
  }

  @ExceptionHandler()
  async delete(id: string): TodoRepositoryDeleteRes {
    this.cache.remove(CACHE_LIST_ALL_KEY);

    const deletedTodo = await this.datasource.deleteTodo(id);

    if (!deletedTodo) {
      return Result.Failure({ code: 'NOT_FOUND' });
    }

    return Result.Success(deletedTodo);
  }
}
