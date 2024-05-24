import { useTaskManager } from '../../managers/TodoManager';

export function useTodoList() {
  const todos = useTaskManager(st => st.todos);

  return {
    todos: {
      get: todos,
    },
  };
}
