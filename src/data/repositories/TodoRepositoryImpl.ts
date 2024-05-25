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

  @ExceptionHandler()
  async create({
    title,
    describe,
    status,
  }: CreateTodoModel): TodoRepositoryCreateRes {
    this.cache.clear();

    const todo = await this.datasource.createTodo({
      id: `id-${Math.random() * 100}`,
      title,
      describe,
      status,
      createdAt: new Date(Date.now()),
      updatedAt: new Date(Date.now()),
    });

    if (!todo) {
      return Result.Failure({ code: 'SERIALIZATION' });
    }

    return Result.Success(todo);
  }

  @ExceptionHandler()
  async listAll(): TodoRepositoryListAllRes {
    const cachedTodos = this.cache.get(CACHE_LIST_ALL_KEY);

    if (cachedTodos) {
      return Result.Success(cachedTodos);
    }

    const todos = await this.datasource.listAllTodos();

    if (!todos) {
      return Result.Failure({ code: 'SERIALIZATION' });
    }

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

    this.cache.clear();

    return Result.Success(todo);
  }

  @ExceptionHandler()
  async delete(id: string): TodoRepositoryDeleteRes {
    this.cache.clear();

    const deletedTodo = await this.datasource.deleteTodo(id);

    if (!deletedTodo) {
      return Result.Failure({ code: 'NOT_FOUND' });
    }

    return Result.Success(deletedTodo);
  }

  @ExceptionHandler()
  async queryAnyField(query: string): TodoRepositoryListAllRes {
    const cached = this.cache.get(query);

    if (cached) {
      return Result.Success(cached);
    }

    const queried = await this.datasource.queryAnyTodoField(query);

    if (queried === null) {
      return Result.Failure({ code: 'SERIALIZATION' });
    }

    this.cache.set(query, queried);

    return Result.Success(queried);
  }
}
