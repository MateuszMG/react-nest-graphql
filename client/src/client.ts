import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';
import { getMainDefinition } from '@apollo/client/utilities';
import { getFromTheLS } from './helpers/localStorage';
import {
  ApolloClient,
  ApolloLink,
  createHttpLink,
  from,
  HttpLink,
  InMemoryCache,
  split,
} from '@apollo/client';

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

export const client = new ApolloClient({
  link: from([authLink, httpLink]),
  //authLink.concat(httpLink),  //from([httpLink, authLink, errorLink]),
  // link: authLink.concat(httpLink),

  cache: new InMemoryCache(),
});

// const timeStartLink = new ApolloLink((operation, forward) => {
//   operation.setContext({ start: new Date() });
//   return forward(operation);
// });

// const directionalLink = createHttpLink({
//   uri: 'http://localhost:4000/graphql',
//   credentials: 'include',
// });

// const errorLink = onError(({ graphQLErrors, networkError }) => {
//   if (graphQLErrors)
//     graphQLErrors.forEach(({ message }) =>
//       console.log(`[GraphQL error]: Message: ${message}`),
//     );

//   if (networkError) console.log(`[Network error]: ${networkError}`);
// });

// const httpLink = new HttpLink({
//   uri: 'http://localhost:4000/graphql',
// });

// const splitLink = split(({ query }) => {
//   const definition = getMainDefinition(query);
//   return (
//     definition.kind === 'OperationDefinition' &&
//     definition.operation === 'subscription'
//   );
// }, httpLink);

// export const client = new ApolloClient({
//   link: from([authLink, errorLink, httpLink]),
//   cache: new InMemoryCache(),
// });
