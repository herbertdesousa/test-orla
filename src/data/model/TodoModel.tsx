import { z } from 'zod';

export const TodoModel = z.object({
  id: z.string(),

  title: z.string(),

  status: z.enum(['PENDING', 'DONE']),

  describe: z.string(),

  createdAt: z.coerce.date(),

  updatedAt: z.coerce.date(),
});
export type TodoModel = z.infer<typeof TodoModel>;

export const CreateTodoModel = z.object({
  title: z.string(),

  describe: z.string(),

  status: z.enum(['PENDING', 'DONE']),
});
export type CreateTodoModel = z.infer<typeof CreateTodoModel>;

export const UpdateTodoModel = z.object({
  id: z.string(),

  title: z.string().optional(),

  describe: z.string().optional(),

  status: z.enum(['PENDING', 'DONE']).optional(),

  createdAt: z.date().optional(),

  updatedAt: z.date().optional(),
});
export type UpdateTodoModel = z.infer<typeof UpdateTodoModel>;
