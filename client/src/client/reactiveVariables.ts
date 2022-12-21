import { makeVar } from '@apollo/client';
import { Todo } from '../pages/Todo/TodoForm/TodoForm';
import { UserFromJWT } from '../helpers/accessToken';

export const userVar = makeVar<UserFromJWT | null>(null);

export const editedTodoVar = makeVar<Todo | null>(null);
