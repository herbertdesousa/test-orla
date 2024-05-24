import { useEffect, useState } from 'react';

import { Todo } from '../../../domain/entities/Todo';
import { Usecases } from '../../../domain/usecases/Usecase';

export function useTodoList() {
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    (async () => {
      const { result } = await Usecases.todo.list.execute();

      if (result.type === 'FAILURE') {
        console.log('falha ao buscar');
        return;
      }

      setTodos(result.payload);
    })();
  }, []);

  return {
    todos: {
      get: todos,
    },
  };
}
