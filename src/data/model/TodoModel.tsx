import { z } from 'zod';

export const TodoModel = z.object({
  id: z.string(),

  title: z.string(),

  status: z.enum(['PENDING', 'DONE']),

  describe: z.string(),

  createdAt: z.date(),

  updatedAt: z.date(),
});
export type TodoModel = z.infer<typeof TodoModel>;

export const CreateTodoModel = z.object({
  title: z.string(),

  describe: z.string(),

  status: z.enum(['PENDING', 'DONE']),
});
export type CreateTodoModel = z.infer<typeof CreateTodoModel>;
