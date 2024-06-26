import { DefaultResultFailure, Result } from '../../utils/Result';
import {
  CreateTodoModel,
  TodoModel,
  UpdateTodoModel,
} from '../model/TodoModel';

export type TodoRepositoryCreateRes = Promise<
  Result<TodoModel, DefaultResultFailure | { code: 'SERIALIZATION' }>
>;

export type TodoRepositoryListAllRes = Promise<
  Result<TodoModel[], DefaultResultFailure | { code: 'SERIALIZATION' }>
>;

export type TodoRepositoryUpdateRes = Promise<
  Result<TodoModel, DefaultResultFailure | { code: 'NOT_FOUND' }>
>;

export type TodoRepositoryDeleteRes = Promise<
  Result<TodoModel, DefaultResultFailure | { code: 'NOT_FOUND' }>
>;

export interface TodoRepository {
  create(payload: CreateTodoModel): TodoRepositoryCreateRes;

  listAll(): TodoRepositoryListAllRes;

  queryAnyField(query: string): TodoRepositoryListAllRes;

  update(payload: UpdateTodoModel): TodoRepositoryUpdateRes;

  delete(id: string): TodoRepositoryDeleteRes;
}
