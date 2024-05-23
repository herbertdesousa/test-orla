import {z} from 'zod';

export const CreateTodo = z.object({
  title: z.string(),

  describe: z.string(),
});
export type CreateTodo = z.infer<typeof CreateTodo>;
