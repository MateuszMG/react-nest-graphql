import { Button } from '../../../components/Global/Button/Button';
import { CheckboxInput } from '../../../components/Global/inputs/CheckboxInput/CheckboxInput';
import { editedTodoVar } from '../../../client/reactiveVariables';
import { Title } from '../Todo.styled';
import { useTodoList } from './useTodoList';
import {
  ButtonsWrapper,
  Container,
  Description,
  Section,
  TextWrapper,
} from './TodoList.styled';

export const TodoList = () => {
  const { handleChange, handleDelete, handleEdit, todos } = useTodoList();

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
              onChange={() => handleChange(item)}
            />
            <Button onClick={() => handleEdit(item)}>Edit</Button>
            <Button onClick={() => handleDelete(item)}>Delete</Button>
          </ButtonsWrapper>
        </Section>
      ))}
    </Container>
  );
};
