import {CreateTodo} from '../../domain/entities/Todo';
import {ExceptionHandler} from '../../utils/ExceptionHandler';
import {Result} from '../../utils/Result';
import {DatabaseDatasource} from '../datasources/DatabaseDatasource';
import {TodoRepository, TodoRepositoryCreateRes} from './TodoRepository';

export class TodoRepositoryImpl implements TodoRepository {
  constructor(private todoDatasource: DatabaseDatasource) {}

  @ExceptionHandler()
  async create(payload: CreateTodo): TodoRepositoryCreateRes {
    const todo = await this.todoDatasource.createTodo(payload);

    return Result.Success(todo);
  }
}
