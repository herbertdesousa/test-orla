import { DefaultResultFailure, Result } from '../../utils/Result';
import { UpdateTodo } from '../entities/Todo';
import { Usecase } from './Usecase';

type Req = UpdateTodo;
type Res = Result<
  UpdateTodo,
  | DefaultResultFailure
  | { code: 'VALIDATION'; payload: Partial<Record<keyof UpdateTodo, string[]>> }
>;

export class ValidationUpdateTodoUsecase implements Usecase<Req, Res> {
  async execute(payload: Req): Promise<Res> {
    const validation = UpdateTodo.safeParse(payload);

    if (!validation.success) {
      return Result.Failure({
        code: 'VALIDATION',
        payload: validation.error.flatten().fieldErrors,
      });
    }

    return Result.Success(payload);
  }
}
