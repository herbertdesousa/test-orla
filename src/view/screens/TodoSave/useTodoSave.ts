import { useEffect, useMemo, useState } from 'react';
import { Usecases } from '../../../domain/usecases/Usecase';
import { useTaskManager } from '../../managers/TodoManager';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RouteStack } from '../Router';

type Props = NativeStackScreenProps<RouteStack, 'Save'>;

type Mode =
  | { type: 'CREATE' }
  | { type: 'UPDATE'; payload: NonNullable<Props['route']['params']> };

export function useTodoSave({ route: { params }, navigation }: Props) {
  const manager = useTaskManager(st => ({ setTodos: st.setTodos }));

  const mode: Mode =
    params === undefined
      ? { type: 'CREATE' }
      : { type: 'UPDATE', payload: params };

  const [titleField, setTitleField] = useState(() => {
    if (mode.type === 'CREATE') {
      return '';
    }

    return mode.payload.title || '';
  });
  const [describeField, setDescribeField] = useState(() => {
    if (mode.type === 'CREATE') {
      return '';
    }

    return mode.payload.describe || '';
  });
  const [isDoneField, setIsDoneField] = useState(() => {
    if (mode.type === 'CREATE') {
      return false;
    }

    return mode.payload.isDone || false;
  });

  const [isSubmitEnabled, setIsSubmitEnabled] = useState(false);

  useEffect(() => {
    (async () => {
      if (mode.type === 'CREATE') {
        const { result } = await Usecases.todo.validateCreate.execute({
          title: titleField,
          describe: describeField,
        });

        setIsSubmitEnabled(result.type === 'SUCCESS');
      } else {
        const { result } = await Usecases.todo.validateUpdate.execute({
          id: mode.payload.id,
          title: titleField,
          describe: describeField,
          isDone: isDoneField,
        });

        setIsSubmitEnabled(result.type === 'SUCCESS');
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [titleField, describeField]);

  async function handleSubmit() {
    if (!isSubmitEnabled) {
      return;
    }

    if (mode.type === 'CREATE') {
      const { result } = await Usecases.todo.create.execute({
        title: titleField,
        describe: describeField,
      });

      if (result.type === 'FAILURE') {
        console.log('falha ao criar');
        return;
      }

      manager.setTodos(result.payload);

      navigation.goBack();
    } else {
      const { result } = await Usecases.todo.update.execute({
        id: mode.payload.id,
        title: titleField,
        describe: describeField,
        isDone: isDoneField,
      });

      if (result.type === 'FAILURE') {
        console.log('falha ao editar');
        return;
      }

      manager.setTodos(result.payload);

      navigation.goBack();
    }
  }

  async function handleDelete() {
    if (mode.type === 'UPDATE') {
      const { result } = await Usecases.todo.delete.execute({
        id: mode.payload.id,
      });

      if (result.type === 'FAILURE') {
        console.log('falha ao deletar');
        return;
      }

      manager.setTodos(result.payload);

      navigation.goBack();
    }
  }

  const title = useMemo(() => {
    const prefix = mode.type === 'CREATE' ? 'New' : 'Update';

    return `${prefix} To do`;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const submiLabel = useMemo(() => {
    return mode.type === 'CREATE' ? 'Create' : 'Update';
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleToggleIsDone() {
    setIsDoneField(st => !st);
  }

  function handleExit() {
    navigation.goBack();
  }

  return {
    exit: handleExit,
    title,
    fields: {
      title: {
        set: setTitleField,
        state: titleField,
      },
      describe: {
        set: setDescribeField,
        state: describeField,
      },
      done: {
        isShowing: mode.type === 'UPDATE',
        toggle: handleToggleIsDone,
        state: isDoneField,
      },
    },
    submit: {
      isEnabled: isSubmitEnabled,
      dispatch: handleSubmit,
      label: submiLabel,
    },
    deleteBtn: {
      isShowing: mode.type === 'UPDATE',
      dispatch: handleDelete,
    },
  };
}
