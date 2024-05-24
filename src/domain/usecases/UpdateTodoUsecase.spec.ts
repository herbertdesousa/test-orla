import { MockTodoRepository } from '../../data/repositories/MockTodoRepository';
import { Result } from '../../utils/Result';
import { Todo } from '../entities/Todo';
import { UpdateTodoUsecase } from './UpdateTodoUsecase';
import { ValidationUpdateTodoUsecase } from './ValidationUpdateTodoUsecase';

describe('UpdateTodoUsecase', () => {
  let repository: MockTodoRepository;
  let validationTodoUsecase: ValidationUpdateTodoUsecase;
  let usecase: UpdateTodoUsecase;

  beforeEach(() => {
    repository = new MockTodoRepository();
    validationTodoUsecase = new ValidationUpdateTodoUsecase();
    usecase = new UpdateTodoUsecase(repository, validationTodoUsecase);
  });

  it('should be able to update and return todos', async () => {
    const dateNow = Date.now();
    const date = new Date(dateNow);

    jest.spyOn(Date, 'now').mockImplementation(() => dateNow);

    await repository.create({
      title: 'Job',
      describe: 'something',
      status: 'PENDING',
    });

    const { result } = await usecase.execute({
      id: 'id-123',
      title: 'Task I',
      describe: 'do something',
      isDone: true,
    });

    expect(result.type === 'SUCCESS').toBeTruthy();

    if (result.type === 'FAILURE') {
      return;
    }

    const expected1: Todo = {
      id: result.payload[0].id,
      title: 'Task I',
      describe: 'do something',
      isDone: true,
      createdAt: date,
      updatedAt: date,
    };

    expect(result.payload).toEqual([expected1]);
  });

  it('should be able to update describe to empty string', async () => {
    const dateNow = Date.now();
    const date = new Date(dateNow);

    jest.spyOn(Date, 'now').mockImplementation(() => dateNow);

    await repository.create({
      title: 'Job',
      describe: 'something',
      status: 'PENDING',
    });

    const { result } = await usecase.execute({
      id: 'id-123',
      title: 'Task I',
      describe: '',
      isDone: true,
    });

    expect(result.type === 'SUCCESS').toBeTruthy();

    if (result.type === 'FAILURE') {
      return;
    }

    const expected1: Todo = {
      id: result.payload[0].id,
      title: 'Task I',
      describe: '',
      isDone: true,
      createdAt: date,
      updatedAt: date,
    };

    expect(result.payload).toEqual([expected1]);
  });

  it('should be able to update and return todos without fields', async () => {
    const dateNow = Date.now();
    const date = new Date(dateNow);

    jest.spyOn(Date, 'now').mockImplementation(() => dateNow);

    await repository.create({
      title: 'Job',
      describe: 'something',
      status: 'PENDING',
    });

    const { result } = await usecase.execute({
      id: 'id-123',
    });

    expect(result.type === 'SUCCESS').toBeTruthy();

    if (result.type === 'FAILURE') {
      return;
    }

    const expected1: Todo = {
      id: result.payload[0].id,
      title: 'Job',
      describe: 'something',
      isDone: false,
      createdAt: date,
      updatedAt: date,
    };

    expect(result.payload).toEqual([expected1]);
  });

  it('should not be able to create if validation fails', async () => {
    jest
      .spyOn(validationTodoUsecase, 'execute')
      .mockImplementationOnce(async () => {
        return Result.Failure({
          code: 'VALIDATION',
          payload: { title: ['Required'] },
        });
      });

    const { result } = await usecase.execute({
      id: 'id-123',
    });

    expect(result.type === 'FAILURE').toBeTruthy();

    if (result.type !== 'FAILURE') {
      return;
    }

    expect(result.data.code === 'VALIDATION').toBeTruthy();
  });

  it('should catch error if creation failure', async () => {
    jest.spyOn(repository, 'create').mockImplementationOnce(async () => {
      return Result.Failure({ code: 'UNKNOWN' });
    });

    const { result } = await usecase.execute({
      id: 'id-123',
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
      id: 'id-123',
    });

    expect(
      result.type === 'FAILURE' && result.data.code === 'UNKNOWN',
    ).toBeTruthy();
  });
});
