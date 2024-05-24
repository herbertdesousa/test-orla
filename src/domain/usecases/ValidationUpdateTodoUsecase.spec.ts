import { ValidationUpdateTodoUsecase } from './ValidationUpdateTodoUsecase';

const usecase = new ValidationUpdateTodoUsecase();

describe('ValidationUpdateTodoUsecase', () => {
  it('should be to validate required fields', async () => {
    const { result } = await usecase.execute({
      id: 'id-123',
    });

    expect(result.type === 'SUCCESS').toBeTruthy();

    //

    const { result: result2 } = await usecase.execute({
      id: 'id-123',
      title: '',
      describe: '',
      isDone: true,
    });

    expect(result2.type === 'FAILURE').toBeTruthy();

    if (result2.type === 'FAILURE') {
      expect(result2.data.code === 'VALIDATION').toBeTruthy();

      if (result2.data.code === 'VALIDATION') {
        expect(result2.data.payload.title).toBeTruthy();
      }
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
