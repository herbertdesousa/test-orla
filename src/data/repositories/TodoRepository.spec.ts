import { InMemoryCacheDatasource } from '../datasources/cache/InMemoryCacheDatasource';
import { InMemoryDatabaseDatasource } from '../datasources/database/InMemoryDatabaseDatasource';
import { TodoModel } from '../model/TodoModel';
import { TodoRepositoryImpl } from './TodoRepositoryImpl';

const databaseDatasource = new InMemoryDatabaseDatasource();
const cacheDatasource = new InMemoryCacheDatasource<TodoModel[]>();
const todoRepository = new TodoRepositoryImpl(
  databaseDatasource,
  cacheDatasource,
);

describe('TodoRepository', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    it('should be able to create a todo', async () => {
      const cacheClear = jest.spyOn(cacheDatasource, 'clear');

      const dateNow = Date.now();
      const date = new Date(dateNow);

      jest.spyOn(Date, 'now').mockImplementation(() => dateNow);

      const { result } = await todoRepository.create({
        title: 'Task I',
        describe: 'do something',
        status: 'PENDING',
      });

      expect(cacheClear).toHaveBeenCalledTimes(1);

      expect(result.type === 'SUCCESS').toBeTruthy();

      if (result.type === 'SUCCESS') {
        expect(result.payload).toMatchObject({
          id: `id-1`,
          title: 'Task I',
          describe: 'do something',
          status: 'PENDING',
          createdAt: date,
          updatedAt: date,
        });
      }
    });
  });

  describe('listAll', () => {
    it('should be able to list all todos', async () => {
      const todos: TodoModel[] = [
        {
          id: 'id-1',
          title: 'Task I',
          describe: 'do something',
          status: 'PENDING',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 'id-2',
          title: 'Task II',
          describe: 'do something 2',
          status: 'DONE',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];

      const databaselistAllTodos = jest
        .spyOn(databaseDatasource, 'listAllTodos')
        .mockImplementationOnce(async () => todos);

      const { result } = await todoRepository.listAll();

      expect(databaselistAllTodos).toHaveBeenCalledTimes(1);
      expect(result.type === 'SUCCESS').toBeTruthy();

      if (result.type === 'SUCCESS') {
        expect(result.payload).toEqual(todos);
      }
    });

    it('should be able to cache todos', async () => {
      const todos: TodoModel[] = [
        {
          id: 'id-1',
          title: 'Task I',
          describe: 'do something',
          status: 'PENDING',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 'id-2',
          title: 'Task II',
          describe: 'do something 2',
          status: 'DONE',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];

      jest.spyOn(cacheDatasource, 'get').mockImplementationOnce(() => todos);

      const databaselistAllTodos = jest.spyOn(
        databaseDatasource,
        'listAllTodos',
      );

      const { result } = await todoRepository.listAll();

      expect(databaselistAllTodos).toHaveBeenCalledTimes(0);
      expect(result.type === 'SUCCESS').toBeTruthy();

      if (result.type === 'SUCCESS') {
        expect(result.payload).toEqual(todos);
      }
    });
  });
});
