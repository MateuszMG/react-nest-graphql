import { Button } from '../../../components/Global/Button/Button';
import { cache } from '../../../client/cache';
import { CheckboxInput } from '../../../components/Global/inputs/CheckboxInput/CheckboxInput';
import { editedTodoVar } from '../../../client/reactiveVariables';
import { Title } from '../Todo.styled';
import { TODOS, Todo } from '../TodoForm/TodoForm';
import { useQuery, useReactiveVar } from '@apollo/client';
import {
  ButtonsWrapper,
  Container,
  Description,
  Section,
  TextWrapper,
} from './TodoList.styled';

export const TodoList = () => {
  const { data } = useQuery(TODOS, {
    fetchPolicy: 'cache-only',
  });
  const todos = (data?.todos || []) as Todo[];
  console.log('todos', todos.length && todos[0].done);

  const useEditedTodo = useReactiveVar(editedTodoVar);

  return (
    <Container>
      {todos.map((item) => (
        <Section key={item.id}>
          <TextWrapper>
            <Title>{item.title}</Title>
            <Description>{item.description}</Description>
          </TextWrapper>
          <ButtonsWrapper>
            <CheckboxInput
              defaultChecked={item.done}
              label={'Done'}
              onChange={() => {
                cache.modify({
                  id: cache.identify({ ...item }),
                  fields: {
                    done(bool) {
                      return !bool;
                    },
                  },
                });
              }}
            />
            <Button onClick={() => editedTodoVar(item)}>Edit</Button>
            <Button
              onClick={() => {
                cache.evict({
                  id: cache.identify({ ...item }),
                  // broadcast: false,
                });
                cache.gc();
              }}
            >
              Delete
            </Button>
          </ButtonsWrapper>
        </Section>
      ))}
    </Container>
  );
};
