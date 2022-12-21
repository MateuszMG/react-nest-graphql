import { Title } from './Todo.styled';
import { TodoForm } from './TodoForm/TodoForm';
import { TodoList } from './TodoList/TodoList';

export const Todo = () => {
  return (
    <div>
      <Title> Todo in cache </Title>
      <TodoForm />
      <TodoList />
    </div>
  );
};
