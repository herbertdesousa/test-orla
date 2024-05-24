import { TodoRepository } from '../../data/repositories/TodoRepository';
import { ExceptionHandler } from '../../utils/ExceptionHandler';
import { DefaultResultFailure, Result } from '../../utils/Result';
import { Todo } from '../entities/Todo';
import { Usecase } from './Usecase';

type Req = {};
type Res = Result<Todo[], DefaultResultFailure>;

export class ListTodoUsecase implements Usecase<Req, Res> {
  constructor(private todoRepository: TodoRepository) {}

  @ExceptionHandler()
  async execute(): Promise<Res> {
    const { result } = await this.todoRepository.listAll();

    if (result.type === 'FAILURE') {
      return Result.Failure({ code: 'UNKNOWN' });
    }

    const todos = result.payload;

    return Result.Success(todos.map(todo => Todo.fromModel(todo)));
  }
}
