import { makeVar } from '@apollo/client';
import { Product, Todo } from '../generated/types';
import { UserFromJWT } from '../helpers/accessToken';

export const userVar = makeVar<UserFromJWT | null>(null);

export const editedTodoVar = makeVar<Todo | null>(null);

export const editedProductVar = makeVar<Product | null>(null);
