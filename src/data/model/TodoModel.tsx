import {z} from 'zod';

export const TodoModel = z.object({
  id: z.string(),

  title: z.string(),

  status: z.enum(['PENDING', 'DONE']),

  describe: z.string(),

  createdAt: z.date(),

  updatedAt: z.date(),
});
export type TodoModel = z.infer<typeof TodoModel>;
