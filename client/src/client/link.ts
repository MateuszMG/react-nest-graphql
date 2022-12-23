import { createClient } from 'graphql-ws';
import { createHttpLink, from, split } from '@apollo/client';
import { getFromTheLS } from '../helpers/localStorage';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { setContext } from '@apollo/client/link/context';
import { getMainDefinition } from '@apollo/client/utilities';

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

const wsLink = new GraphQLWsLink(
  createClient({
    url: 'ws://localhost:4000/graphql',
  }),
);

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  httpLink,
);

export const link = from([authLink, splitLink]);
