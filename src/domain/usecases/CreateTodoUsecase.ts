import { TodoRepository } from '../../data/repositories/TodoRepository';
import { DefaultResultFailure, Result } from '../../utils/Result';
import { CreateTodo, Todo } from '../entities/Todo';
import { Usecase } from './Usecase';

type Req = CreateTodo;
type Res = Result<
  Todo[],
  | DefaultResultFailure
  | { code: 'VALIDATION'; payload: Partial<Record<keyof CreateTodo, string[]>> }
>;

export class CreateTodoUsecase implements Usecase<Req, Res> {
  constructor(private todoRepository: TodoRepository) {}

  async execute(payload: Req): Promise<Res> {
    const validation = CreateTodo.safeParse(payload);

    if (!validation.success) {
      return Result.Failure({
        code: 'VALIDATION',
        payload: validation.error.flatten().fieldErrors,
      });
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
