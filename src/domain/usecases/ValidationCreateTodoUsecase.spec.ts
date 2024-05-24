import { ValidationCreateTodoUsecase } from './ValidationCreateTodoUsecase';

const usecase = new ValidationCreateTodoUsecase();

describe('ValidationCreateTodoUsecase.spec', () => {
  it('should be to validate required fields', async () => {
    const { result } = await usecase.execute({
      title: '',
      describe: 'do something',
    });

    expect(result.type === 'FAILURE').toBeTruthy();

    if (result.type === 'FAILURE') {
      return;
    }

    expect(result.payload.title).toBeTruthy();

    //

    const { result: result2 } = await usecase.execute({
      title: 'Task I',
      describe: 'do something',
    });

    expect(result2.type === 'SUCCESS').toBeTruthy();

    if (result2.type === 'SUCCESS') {
      return;
    }

    expect(result2.data).toMatchObject({
      title: 'Task I',
      describe: 'do something',
    });
  });
});
