import { TodoRepository } from '../../data/repositories/TodoRepository';
import { DefaultResultFailure, Result } from '../../utils/Result';
import { CreateTodo, Todo } from '../entities/Todo';
import { Usecase } from './Usecase';
import { ValidationCreateTodoUsecase } from './ValidationCreateTodoUsecase';

type Req = CreateTodo;
type Res = Result<
  Todo[],
  | DefaultResultFailure
  | { code: 'VALIDATION'; payload: Partial<Record<keyof CreateTodo, string[]>> }
>;

export class CreateTodoUsecase implements Usecase<Req, Res> {
  constructor(
    private todoRepository: TodoRepository,
    private validationUseCase: ValidationCreateTodoUsecase,
  ) {}

  async execute(payload: Req): Promise<Res> {
    const validation = await this.validationUseCase.execute(payload);

    if (validation.result.type === 'FAILURE') {
      if (validation.result.data.code === 'VALIDATION') {
        return Result.Failure({
          code: 'VALIDATION',
          payload: validation.result.data.payload,
        });
      }

      return Result.Failure({ code: 'UNKNOWN' });
    }

    const created = await this.todoRepository.create({
      title: payload.title,
      describe: payload.describe,
      status: 'PENDING',
    });

    if (created.result.type === 'FAILURE') {
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
