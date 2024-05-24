import { DefaultResultFailure, Result } from '../../utils/Result';
import { CreateTodo } from '../entities/Todo';
import { Usecase } from './Usecase';

type Req = CreateTodo;
type Res = Result<
  CreateTodo,
  | DefaultResultFailure
  | { code: 'VALIDATION'; payload: Partial<Record<keyof CreateTodo, string[]>> }
>;

export class ValidationCreateTodoUsecase implements Usecase<Req, Res> {
  async execute(payload: Req): Promise<Res> {
    const validation = CreateTodo.safeParse(payload);

    if (!validation.success) {
      return Result.Failure({
        code: 'VALIDATION',
        payload: validation.error.flatten().fieldErrors,
      });
    }

    return Result.Success(payload);
  }
}
