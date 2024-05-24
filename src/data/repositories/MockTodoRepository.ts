import { ExceptionHandler } from '../../utils/ExceptionHandler';
import { Result } from '../../utils/Result';
import {
  TodoRepository,
  TodoRepositoryCreateRes,
  TodoRepositoryListAllRes,
} from './TodoRepository';

export class MockTodoRepository implements TodoRepository {
  async create(): TodoRepositoryCreateRes {
    return Result.Success({
      id: 'id-123',
      title: 'Task I',
      describe: 'do something',
      status: 'PENDING',
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }

  @ExceptionHandler()
  async listAll(): TodoRepositoryListAllRes {
    return Result.Success([
      {
        id: 'id-123',
        title: 'Task I',
        describe: 'do something',
        status: 'PENDING',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 'id-456',
        title: 'Task II',
        describe: 'do something',
        status: 'DONE',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  }
}
