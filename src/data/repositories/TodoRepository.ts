import { DefaultResultFailure, Result } from '../../utils/Result';
import {
  CreateTodoModel,
  TodoModel,
  UpdateTodoModel,
} from '../model/TodoModel';

export type TodoRepositoryCreateRes = Promise<
  Result<TodoModel, DefaultResultFailure>
>;

export type TodoRepositoryListAllRes = Promise<
  Result<TodoModel[], DefaultResultFailure>
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

  update(payload: UpdateTodoModel): TodoRepositoryUpdateRes;

  delete(id: string): TodoRepositoryDeleteRes;
}
