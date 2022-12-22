import { createHttpLink, from } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { getFromTheLS } from '../helpers/localStorage';

const authorization = () => {
  const accessToken = getFromTheLS('accessToken');
  return { authorization: accessToken ? `Bearer ${accessToken}` : '' };
};

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      ...authorization(),
    },
  };
});

const httpLink = createHttpLink({
  uri: 'http://localhost:4000/graphql',
  credentials: 'same-origin',
});

export const link = from([authLink, httpLink]);
