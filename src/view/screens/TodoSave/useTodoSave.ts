import { useEffect, useState } from 'react';
import { Usecases } from '../../../domain/usecases/Usecase';
import { useTaskManager } from '../../managers/TodoManager';

type Props = { goBack(): void };

export function useTodoSave({ goBack }: Props) {
  const manager = useTaskManager(st => ({ setTodos: st.setTodos }));

  const [titleField, setTitleField] = useState('');
  const [describeField, setDescribeField] = useState('');

  const [isSubmitEnabled, setIsSubmitEnabled] = useState(false);

  useEffect(() => {
    (async () => {
      const { result } = await Usecases.todo.validate.execute({
        title: titleField,
        describe: describeField,
      });

      setIsSubmitEnabled(result.type === 'SUCCESS');
    })();
  }, [titleField, describeField]);

  async function handleSubmit() {
    if (!isSubmitEnabled) {
      return;
    }

    const { result } = await Usecases.todo.create.execute({
      title: titleField,
      describe: describeField,
    });

    if (result.type === 'FAILURE') {
      console.log('falha ao criar');
      return;
    }

    manager.setTodos(result.payload);

    goBack();
  }

  return {
    fields: {
      title: {
        set: setTitleField,
      },
      describe: {
        set: setDescribeField,
      },
    },
    submit: {
      isEnabled: isSubmitEnabled,
      dispatch: handleSubmit,
    },
  };
}
