import { ValidationUpdateTodoUsecase } from './ValidationUpdateTodoUsecase';

const usecase = new ValidationUpdateTodoUsecase();

describe('ValidationUpdateTodoUsecase', () => {
  it('should be to validate required fields', async () => {
    const { result } = await usecase.execute({
      id: 'id-123',
    });

    expect(result.type === 'SUCCESS').toBeTruthy();

    if (result.type === 'SUCCESS') {
      return;
    }

    //

    const { result: result2 } = await usecase.execute({
      id: 'id-123',
      title: '',
      describe: '',
      isDone: true,
    });

    expect(result2.type === 'SUCCESS').toBeTruthy();

    if (result2.type === 'SUCCESS') {
      return;
    }

    //

    const { result: result3 } = await usecase.execute({
      id: 'id-123',
      title: 'Task I',
      describe: 'do something',
      isDone: true,
    });

    expect(result3.type === 'SUCCESS').toBeTruthy();
  });
});
