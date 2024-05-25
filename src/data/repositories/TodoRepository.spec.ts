import { InMemoryCacheDatasource } from '../datasources/cache/InMemoryCacheDatasource';
import { InMemoryDatabaseDatasource } from '../datasources/database/InMemoryDatabaseDatasource';
import { TodoModel } from '../model/TodoModel';
import { TodoRepositoryImpl } from './TodoRepositoryImpl';

describe('TodoRepository', () => {
  let databaseDatasource: InMemoryDatabaseDatasource;
  let cacheDatasource: InMemoryCacheDatasource<TodoModel[]>;
  let todoRepository: TodoRepositoryImpl;

  beforeEach(() => {
    jest.clearAllMocks();

    databaseDatasource = new InMemoryDatabaseDatasource();
    cacheDatasource = new InMemoryCacheDatasource<TodoModel[]>();
    todoRepository = new TodoRepositoryImpl(
      databaseDatasource,
      cacheDatasource,
    );
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
          id: expect.anything(),
          title: 'Task I',
          describe: 'do something',
          status: 'PENDING',
          createdAt: date,
          updatedAt: date,
        });
      }
    });

    it('should be able to catch serialization fail', async () => {
      jest
        .spyOn(databaseDatasource, 'createTodo')
        .mockImplementationOnce(async () => null);

      const { result } = await todoRepository.create({
        title: 'Task I',
        describe: 'do something',
        status: 'PENDING',
      });

      expect(
        result.type === 'FAILURE' && result.data.code === 'SERIALIZATION',
      ).toBeTruthy();
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

    it('should be able to catch serialization fail', async () => {
      const databaselistAllTodos = jest
        .spyOn(databaseDatasource, 'listAllTodos')
        .mockImplementationOnce(async () => null);

      const { result } = await todoRepository.listAll();

      expect(databaselistAllTodos).toHaveBeenCalledTimes(1);
      expect(
        result.type === 'FAILURE' && result.data.code === 'SERIALIZATION',
      ).toBeTruthy();
    });
  });

  describe('update', () => {
    it('should be able to update a todo', async () => {
      const cacheClear = jest.spyOn(cacheDatasource, 'clear');

      const dateNow = Date.now();
      const date = new Date(dateNow);

      const createdAt = new Date(2024, 0, 1);

      await databaseDatasource.createTodo({
        id: 'id-123',
        title: 'old',
        describe: 'old',
        status: 'PENDING',
        createdAt,
        updatedAt: new Date(),
      });

      jest.spyOn(Date, 'now').mockImplementation(() => dateNow);

      const { result } = await todoRepository.update({
        id: 'id-123',
        title: 'Task I',
        describe: 'do something',
        status: 'DONE',
      });

      expect(cacheClear).toHaveBeenCalledTimes(1);

      expect(result.type === 'SUCCESS').toBeTruthy();

      if (result.type === 'SUCCESS') {
        expect(result.payload).toMatchObject({
          id: `id-123`,
          title: 'Task I',
          describe: 'do something',
          status: 'DONE',
          createdAt,
          updatedAt: date,
        });
      }
    });

    it('should be able to return not found if not found', async () => {
      const cacheClear = jest.spyOn(cacheDatasource, 'clear');

      const { result } = await todoRepository.update({
        id: 'non-existing-id',
        title: 'Task I',
        describe: 'do something',
        status: 'DONE',
      });

      expect(cacheClear).toHaveBeenCalledTimes(0);

      expect(
        result.type === 'FAILURE' && result.data.code === 'NOT_FOUND',
      ).toBeTruthy();
    });
  });

  describe('delete', () => {
    it('should be able to delete a todo', async () => {
      await databaseDatasource.createTodo({
        id: 'id-123',
        title: 'Task I',
        describe: 'do something',
        status: 'PENDING',
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      const cacheClear = jest.spyOn(cacheDatasource, 'clear');

      const { result } = await todoRepository.delete('id-123');

      expect(result.type === 'SUCCESS').toBeTruthy();
      expect(cacheClear).toHaveBeenCalledTimes(1);

      expect((await databaseDatasource.listAllTodos())?.length).toBe(0);
    });

    it('should not be able to delete a unexisting todo', async () => {
      const { result } = await todoRepository.delete('unexisting');

      expect(
        result.type === 'FAILURE' && result.data.code === 'NOT_FOUND',
      ).toBeTruthy();
    });
  });

  describe('queryAnyField', () => {
    it('should be able to query any field', async () => {
      await databaseDatasource.createTodo({
        id: 'id-123',
        title: 'Task I',
        describe: 'do something',
        status: 'DONE',
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      await databaseDatasource.createTodo({
        id: 'id-456',
        title: 'Task II',
        describe: 'do sómething',
        status: 'PENDING',
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      await databaseDatasource.createTodo({
        id: 'id-789',
        title: 'Some Other Tãsk',
        describe: 'do something',
        status: 'DONE',
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      await databaseDatasource.createTodo({
        id: 'id-753',
        title: 'Sême Other',
        describe: 'dó something',
        status: 'PENDING',
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      const { result } = await todoRepository.queryAnyField('task');
      expect(result.type === 'SUCCESS').toBeTruthy();
      if (result.type === 'SUCCESS') {
        expect(result.payload.length).toBe(3);
      }

      const { result: result2 } = await todoRepository.queryAnyField('pendi');
      expect(result2.type === 'SUCCESS').toBeTruthy();
      if (result2.type === 'SUCCESS') {
        expect(result2.payload.length).toBe(2);
      }

      const { result: result3 } = await todoRepository.queryAnyField(
        'something',
      );
      expect(result3.type === 'SUCCESS').toBeTruthy();
      if (result3.type === 'SUCCESS') {
        expect(result3.payload.length).toBe(4);
      }
    });

    it('should be able to query cached', async () => {
      const queryMock = jest.spyOn(databaseDatasource, 'queryAnyTodoField');

      await databaseDatasource.createTodo({
        id: 'id-123',
        title: 'Task I',
        describe: 'do something',
        status: 'PENDING',
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      await databaseDatasource.createTodo({
        id: 'id-456',
        title: 'Task II',
        describe: 'do sómething',
        status: 'PENDING',
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      const { result } = await todoRepository.queryAnyField('task');

      expect(queryMock).toHaveBeenCalledTimes(1);

      expect(result.type === 'SUCCESS').toBeTruthy();
      if (result.type === 'SUCCESS') {
        expect(result.payload.length).toBe(2);
      }

      //

      expect(queryMock).toHaveBeenCalledTimes(1);

      const { result: result2 } = await todoRepository.queryAnyField('task');
      expect(result2.type === 'SUCCESS').toBeTruthy();
      if (result2.type === 'SUCCESS') {
        expect(result2.payload.length).toBe(2);
      }
    });

    it('should not be able to delete a unexisting todo', async () => {
      jest
        .spyOn(databaseDatasource, 'queryAnyTodoField')
        .mockImplementationOnce(async () => null);

      const { result } = await todoRepository.queryAnyField('task');

      expect(
        result.type === 'FAILURE' && result.data.code === 'SERIALIZATION',
      ).toBeTruthy();
    });
  });
});
