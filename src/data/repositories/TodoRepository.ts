import { DefaultResultFailure, Result } from '../../utils/Result';
import { CreateTodoModel, TodoModel } from '../model/TodoModel';

export type TodoRepositoryCreateRes = Promise<
  Result<TodoModel, DefaultResultFailure>
>;

export type TodoRepositoryListAllRes = Promise<
  Result<TodoModel[], DefaultResultFailure>
>;

export interface TodoRepository {
  create(payload: CreateTodoModel): TodoRepositoryCreateRes;

  listAll(): TodoRepositoryListAllRes;
}
