import { create } from 'zustand';
import { Todo } from '../../domain/entities/Todo';
import { Usecases } from '../../domain/usecases/Usecase';

type Actions = {
  fetch(): Promise<void>;
  setTodos(todos: Todo[]): void;
};

type State = {
  todos: Todo[];
};

export const useTaskManager = create<Actions & State>(set => {
  return {
    todos: [],
    setTodos: todos => set({ todos }),
    fetch: async () => {
      const { result } = await Usecases.todo.list.execute();

      if (result.type === 'FAILURE') {
        console.log('falha ao buscar');
        return;
      }

      set({ todos: result.payload });
    },
  };
});
