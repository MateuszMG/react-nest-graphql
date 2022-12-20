import { setContext } from '@apollo/client/link/context';
// import { onError } from '@apollo/client/link/error';
import { getMainDefinition } from '@apollo/client/utilities';
import { getFromTheLS } from './helpers/localStorage';
// import { onError } from 'apollo-link-error';
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

// const errorLink = onError((error) => {
//   const {
//     graphQLErrors = [],
//     networkError = {},
//     operation = {},
//     forward,
//   } = error || {};
//   // const { getContext } = operation || {};
//   // const { scope, headers = {} } = getContext() || {};
//   const { message: networkErrorMessage = '' } = networkError || {};
//   const { message: graphQLErrorsMessage = '' } = graphQLErrors || [];
//   const graphQLFailed = (message) =>
//     typeof message === 'string' && message.startsWith('Problem with graphql');
//   const networkFailed = (message) =>
//     typeof message === 'string' &&
//     message.startsWith('NetworkError when attempting to fetch resource');

//   if (graphQLFailed(graphQLErrorsMessage)) return forward(operation);
//   if (networkFailed(networkErrorMessage)) return forward(operation);
// });

// const errorLink = onError(
//   ({ graphQLErrors, networkError, operation, forward }) => {
//     console.info('Error Link has caught an error.');
//     if (graphQLErrors) {
//       console.error('graphQLErrors:', graphQLErrors);
//       // Retry... not the issue here, everything happens in networkError.
//     }
//     if (networkError) {
//       const err = networkError as any;
//       const code = err && err.extensions && err.extensions.code;
//       if (code === 'start-failed') {
//         console.error('Network: websocket start failed:', err.message);
//         return reauthenticateResetWsAndRetry(operation, forward);
//       } // else
//       console.error('[Network error]:', networkError);
//     }
//   },
// );

const httpLink = createHttpLink({
  uri: 'http://localhost:4000/graphql',
  credentials: 'same-origin',
});

export const client = new ApolloClient({
  link: from([authLink, httpLink]),
  //authLink.concat(httpLink),  //from([httpLink, authLink, errorLink]),
  // link: authLink.concat(httpLink),

  cache: new InMemoryCache({
    typePolicies: {
      User: {
        fields: {
          username: (_, { readField }) => readField('username'),
          email: (_, { readField }) => readField('email'),
        },
      },
    },
  }),
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
