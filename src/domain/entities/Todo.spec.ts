import { Todo } from './Todo';

describe('Todo Entity', () => {
  it('should be able to parse from model', () => {
    const date = new Date();

    expect(
      Todo.fromModel({
        id: 'id-123',
        title: 'Task I',
        describe: 'do something',
        status: 'PENDING',
        createdAt: date,
        updatedAt: date,
      }),
    ).toMatchObject({
      id: 'id-123',
      title: 'Task I',
      describe: 'do something',
      isDone: false,
      createdAt: date,
      updatedAt: date,
    });

    expect(
      Todo.fromModel({
        id: 'id-753',
        title: 'Task II',
        describe: 'do something 2',
        status: 'DONE',
        createdAt: date,
        updatedAt: date,
      }),
    ).toMatchObject({
      id: 'id-753',
      title: 'Task II',
      describe: 'do something 2',
      isDone: true,
      createdAt: date,
      updatedAt: date,
    });
  });
});
