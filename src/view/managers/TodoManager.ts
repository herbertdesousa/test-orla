import { create } from 'zustand';
import { Todo } from '../../domain/entities/Todo';
import { Usecases } from '../../domain/usecases/Usecase';

type Actions = {
  fetch(): Promise<void>;
  setTodos(todos: Todo[]): void;
  setSearch: (search: string) => void;
};

type State = {
  todos: Todo[];
  search: string;
};

export const useTaskManager = create<Actions & State>((set, state) => {
  const fetch = async () => {
    console.log(`busca (${state().search})`);
    const { result } = await Usecases.todo.list.execute({
      query: state().search,
    });

    if (result.type === 'FAILURE') {
      console.log('falha ao buscar');
      return;
    }

    set({ todos: result.payload });
  };

  return {
    todos: [],
    search: '',
    setSearch: search => {
      if (search.length === 0) {
        fetch();
      }

      set({ search });
    },
    setTodos: todos => set({ todos }),
    fetch,
  };
});
