import { z } from 'zod';
import { TodoModel } from '../../data/model/TodoModel';

export const CreateTodo = z.object({
  title: z.string(),

  describe: z.string(),
});
export type CreateTodo = z.infer<typeof CreateTodo>;

export class Todo {
  id!: string;

  title!: string;

  isDone!: boolean;

  describe!: string;

  createdAt!: Date;

  updatedAt!: Date;

  private constructor() {}

  static fromModel(model: TodoModel): Todo {
    const entity = new Todo();
    entity.id = model.id;
    entity.title = model.title;
    entity.isDone = model.status === 'DONE';
    entity.describe = model.describe;
    entity.createdAt = model.createdAt;
    entity.updatedAt = model.updatedAt;
    return entity;
  }
}
