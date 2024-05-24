import { CreateTodo } from '../../domain/entities/Todo';
import { DefaultResultFailure, Result } from '../../utils/Result';
import { TodoModel } from '../model/TodoModel';

export type TodoRepositoryCreateRes = Promise<
  Result<TodoModel, DefaultResultFailure>
>;

export interface TodoRepository {
  create(payload: CreateTodo): TodoRepositoryCreateRes;
}
