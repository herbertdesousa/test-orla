import { MockTodoRepository } from '../../data/repositories/MockTodoRepository';
import { Result } from '../../utils/Result';
import { Todo } from '../entities/Todo';
import { CreateTodoUsecase } from './CreateTodoUsecase';

const repository = new MockTodoRepository();
const usecase = new CreateTodoUsecase(repository);

describe('CreateTodoUsecase', () => {
  it('should be able to create and return todos', async () => {
    const dateNow = Date.now();
    const date = new Date(dateNow);

    jest.spyOn(Date, 'now').mockImplementation(() => dateNow);

    const todos1 = await repository.listAll();
    expect(
      todos1.result.type === 'SUCCESS' && todos1.result.payload.length === 0,
    ).toBeTruthy();

    const { result } = await usecase.execute({
      title: 'Task I',
      describe: 'do something',
    });

    expect(result.type === 'SUCCESS').toBeTruthy();

    if (result.type === 'FAILURE') {
      return;
    }

    const expected1: Todo = {
      id: result.payload[0].id,
      title: 'Task I',
      describe: 'do something',
      isDone: false,
      createdAt: date,
      updatedAt: date,
    };

    expect(result.payload).toEqual([expected1]);

    const todos2 = await repository.listAll();
    expect(
      todos2.result.type === 'SUCCESS' && todos2.result.payload.length === 1,
    ).toBeTruthy();
  });

  it('should not be able to create if validation fails', async () => {
    const { result } = await usecase.execute({
      title: '',
      describe: 'do something',
    });

    expect(result.type === 'FAILURE').toBeTruthy();

    if (result.type !== 'FAILURE') {
      return;
    }

    expect(result.data.code === 'VALIDATION').toBeTruthy();

    if (result.data.code !== 'VALIDATION') {
      return;
    }

    expect(result.data.payload?.title).toBeTruthy();
  });

  it('should catch error if creation failure', async () => {
    jest.spyOn(repository, 'create').mockImplementationOnce(async () => {
      return Result.Failure({ code: 'UNKNOWN' });
    });

    const { result } = await usecase.execute({
      title: 'Task I',
      describe: 'do something',
    });

    expect(
      result.type === 'FAILURE' && result.data.code === 'UNKNOWN',
    ).toBeTruthy();
  });

  it('should catch error if listing failure', async () => {
    jest.spyOn(repository, 'listAll').mockImplementationOnce(async () => {
      return Result.Failure({ code: 'UNKNOWN' });
    });

    const { result } = await usecase.execute({
      title: 'Task I',
      describe: 'do something',
    });

    expect(
      result.type === 'FAILURE' && result.data.code === 'UNKNOWN',
    ).toBeTruthy();
  });
});
