import { TodoModel } from '../../data/model/TodoModel';
import { MockTodoRepository } from '../../data/repositories/MockTodoRepository';
import { Result } from '../../utils/Result';
import { Todo } from '../entities/Todo';
import { ListTodoUsecase } from './ListTodoUsecase';

const mockTodoRepository = new MockTodoRepository();
const listTodoUsecase = new ListTodoUsecase(mockTodoRepository);

describe('ListTodoUsecase', () => {
  it('should be able to list todos', async () => {
    const date = new Date();
    const todos: TodoModel[] = [
      {
        id: 'id-123',
        title: 'Task I',
        describe: 'do something',
        status: 'PENDING',
        createdAt: date,
        updatedAt: date,
      },
      {
        id: 'id-456',
        title: 'Task II',
        describe: 'do something',
        status: 'DONE',
        createdAt: date,
        updatedAt: date,
      },
    ];

    jest
      .spyOn(mockTodoRepository, 'listAll')
      .mockImplementationOnce(async () => Result.Success(todos));

    const { result } = await listTodoUsecase.execute();

    expect(result.type === 'SUCCESS').toBeTruthy();

    if (result.type === 'SUCCESS') {
      expect(result.payload.length).toBe(2);
      expect(result.payload).toStrictEqual([
        Todo.fromModel(todos[0]),
        Todo.fromModel(todos[1]),
      ]);
    }
  });
});
