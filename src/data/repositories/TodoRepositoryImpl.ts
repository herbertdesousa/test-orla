import { CreateTodo } from '../../domain/entities/Todo';
import { ExceptionHandler } from '../../utils/ExceptionHandler';
import { Result } from '../../utils/Result';
import { CacheDatasource } from '../datasources/CacheDatasource';
import { DatabaseDatasource } from '../datasources/DatabaseDatasource';
import { TodoModel } from '../model/TodoModel';
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

  @ExceptionHandler()
  async create(payload: CreateTodo): TodoRepositoryCreateRes {
    this.cache.clear();

    const todo = await this.datasource.createTodo(payload);

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
