import { TodoRepository } from '../../data/repositories/TodoRepository';
import { DefaultResultFailure, Result } from '../../utils/Result';
import { Todo } from '../entities/Todo';
import { Usecase } from './Usecase';

type Req = { id: string };
type Res = Result<Todo[], DefaultResultFailure | { code: 'NOT_FOUND' }>;

export class DeleteTodoUsecase implements Usecase<Req, Res> {
  constructor(private todoRepository: TodoRepository) {}

  async execute(payload: Req): Promise<Res> {
    const deleted = await this.todoRepository.delete(payload.id);

    if (deleted.result.type === 'FAILURE') {
      if (deleted.result.data.code === 'NOT_FOUND') {
        return Result.Failure({ code: 'NOT_FOUND' });
      }

      return Result.Failure({ code: 'UNKNOWN' });
    }

    const todos = await this.todoRepository.listAll();

    if (todos.result.type === 'FAILURE') {
      return Result.Failure({ code: 'UNKNOWN' });
    }

    return Result.Success(
      todos.result.payload.map(todo => Todo.fromModel(todo)),
    );
  }
}
