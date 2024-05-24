import { MockTodoRepository } from '../../data/repositories/MockTodoRepository';
import { DeleteTodoUsecase } from './DeleteTodoUsecase';

describe('CreateTodoUsecase', () => {
  let repository: MockTodoRepository;
  let usecase: DeleteTodoUsecase;

  beforeEach(() => {
    repository = new MockTodoRepository();
    usecase = new DeleteTodoUsecase(repository);
  });

  it('should be able to delete a todo by id', async () => {
    const created = await repository.create({
      title: 'Job',
      describe: 'something',
      status: 'PENDING',
    });

    if (created.result.type === 'FAILURE') {
      throw new Error('should not occurs');
    }

    const todos1 = await repository.listAll();
    expect(
      todos1.result.type === 'SUCCESS' && todos1.result.payload.length === 1,
    ).toBeTruthy();

    const { result } = await usecase.execute({
      id: created.result.payload.id,
    });

    expect(result.type === 'SUCCESS').toBeTruthy();

    const todos2 = await repository.listAll();
    expect(
      todos2.result.type === 'SUCCESS' && todos2.result.payload.length === 0,
    ).toBeTruthy();
  });

  it('should be able to delete a unexisting todo', async () => {
    const todos1 = await repository.listAll();
    expect(
      todos1.result.type === 'SUCCESS' && todos1.result.payload.length === 0,
    ).toBeTruthy();

    const { result } = await usecase.execute({
      id: 'unexisting-id',
    });

    expect(
      result.type === 'FAILURE' && result.data.code === 'NOT_FOUND',
    ).toBeTruthy();
  });
});
