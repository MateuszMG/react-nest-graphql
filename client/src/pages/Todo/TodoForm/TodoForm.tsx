import { Button } from '../../../components/Global/Button/Button';
import { cache } from '../../../client/cache';
import { CheckboxInput } from '../../../components/Global/inputs/CheckboxInput/CheckboxInput';
import { editedTodoVar } from '../../../client/reactiveVariables';
import { Form } from '../../../components/Global/Form/Form';
import { FormWrapper } from './TodoForm.styled';
import { gql, useReactiveVar } from '@apollo/client';
import { TextInput } from '../../../components/Global/inputs/TextInput/TextInput';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

export interface Todo {
  __typename: string;
  id: string;
  title: string;
  description: string;
  done: boolean;
}

export const TODOS = gql`
  query Todos {
    todos {
      __typename
      id
      title
      description
      done
    }
  }
`;

const createDefaultValues = () => ({
  title: 'title' + Math.random().toString().slice(-4),
  description: 'description' + Math.random().toString().slice(-4),
  done: true,
});

export const TodoForm = () => {
  const state: any = cache.readQuery({ query: TODOS });
  const todos = (state?.todos || []) as Todo[];

  const editedTodo = useReactiveVar(editedTodoVar);

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
        query: TODOS,
        data: {
          todos: [
            ...todos,
            { id: Math.random() + '', __typename: 'TODO1', ...data },
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

  return (
    <FormWrapper>
      <Form onReset={() => reset()} onSubmit={onSubmit}>
        <TextInput
          {...register('title')}
          error={errors?.title?.message}
          label={'Title'}
        />
        <TextInput
          {...register('description')}
          error={errors?.description?.message}
          label={'Description'}
        />
        <CheckboxInput
          {...register('done')}
          error={errors?.done?.message}
          label={'Done'}
        />
        <Form.ButtonsWrapper>
          <Button type={'reset'}>Reset</Button>
          <Button disabled={!isValid && !isDirty} type={'submit'}>
            Add todo
          </Button>
        </Form.ButtonsWrapper>
      </Form>
    </FormWrapper>
  );
};

const todoValidation = yup.object({
  title: yup.string(),
  description: yup.string(),
  done: yup.boolean(),
});

type TodoSchema = yup.InferType<typeof todoValidation>;
