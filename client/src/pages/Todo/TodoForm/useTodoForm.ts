import { editedTodoVar } from '../../../client/reactiveVariables';
import { useReactiveVar } from '@apollo/client';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {
  GetTodosDocument,
  LocalTypenames,
  useGetTodosQuery,
} from '../../../generated/types';
import { todoFormHelpers } from './todoFormHelpers';

export const useTodoForm = () => {
  const { data, client } = useGetTodosQuery({
    fetchPolicy: 'cache-only',
  });
  const todos = data?.getTodos || [];
  const cache = client.cache;

  const editedTodo = useReactiveVar(editedTodoVar);

  const { createDefaultValues } = todoFormHelpers();

  const {
    formState: { errors, isValid, isDirty },
    handleSubmit,
    register,
    reset,
  } = useForm<TodoSchema>({
    mode: 'onChange',
    resolver: yupResolver(todoValidation),
    defaultValues: createDefaultValues(),
  });

  const onSubmit = handleSubmit((data) => {
    if (editedTodo) {
      cache.modify({
        id: cache.identify({ ...editedTodo }),
        fields: {
          title() {
            return data.title;
          },
          description() {
            return data.description;
          },
          done() {
            return data.done;
          },
        },
      });
      editedTodoVar(null);
    } else {
      cache.writeQuery({
        query: GetTodosDocument,
        data: {
          getTodos: [
            ...todos,
            {
              id: Math.random() + '',
              __typename: LocalTypenames.Todo,
              ...data,
            },
          ],
        },
      });
    }

    reset(createDefaultValues());
  });

  useEffect(() => {
    if (!editedTodo) return;
    const { __typename, ...todo } = editedTodo;
    reset(todo);
  }, [editedTodo]);

  return {
    errors,
    isDirty,
    isValid,
    onSubmit,
    register,
    reset,
  };
};

const todoValidation = yup.object({
  title: yup.string().required(),
  description: yup.string().required(),
  done: yup.boolean().required(),
});

type TodoSchema = yup.InferType<typeof todoValidation>;
