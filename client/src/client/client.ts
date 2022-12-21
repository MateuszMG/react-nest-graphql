import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';
import { getMainDefinition } from '@apollo/client/utilities';
import { getFromTheLS } from '../helpers/localStorage';
import {
  ApolloClient,
  ApolloLink,
  createHttpLink,
  from,
  gql,
  HttpLink,
  InMemoryCache,
  split,
} from '@apollo/client';
import { typeDefs } from '../graphql/typeDefs';
import { cache } from './cache';
import { handleAccessToken } from '../helpers/accessToken';
import { Product } from '../generated/types';

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

const errorLink = onError(
  ({ graphQLErrors, networkError, operation, forward }) => {
    if (graphQLErrors) {
      for (let err of graphQLErrors) {
        switch (err.extensions.code) {
          case 'UNAUTHENTICATED':
            const oldHeaders = operation.getContext().headers;
            operation.setContext({
              headers: {
                ...oldHeaders,
                ...authorization(),
              },
            });
            return forward(operation);
        }
      }
    }

    if (networkError) {
      console.log(`[Network error]: ${networkError}`);
    }
  },
);

const httpLink = createHttpLink({
  uri: 'http://localhost:4000/graphql',
  credentials: 'same-origin',
});

export const SET_NEW_PRODUCT = gql`
  mutation SetNewProduct($product: Product) {
    setNewProduct(product: $product) @client
  }
`;

export const client = new ApolloClient({
  link: from([authLink, errorLink, httpLink]),
  cache,

  // resolvers: {
  //   Mutation: {
  //     setNewProduct: (_root, variables: Product, { cache }) => {
  //       console.log('setNewProduct');
  //       console.log('variables', variables);
  //       console.log('_root', _root);

  //       cache.modify({
  //         id: cache.identify({
  //           __typename: 'Product',
  //           id: variables.id,
  //         }),
  //         fields: {
  //           ...variables,
  //         },
  //       });

  //       console.log(
  //         'aff',
  //         cache.identify({
  //           __typename: 'Product',
  //           id: variables.id,
  //         }),
  //       );

  //       // cache.modify({
  //       //   id: cache.identify({
  //       //     __typename: 'DecodedUser',
  //       //     id,
  //       //   }),
  //       //   fields: {
  //       //     id, //: (value: string) => value,
  //       //     username, //: (value: string) => value,
  //       //     email, //: (value: string) => value,
  //       //     roles, //: (value: string[]) => value,
  //       //     logged: false,
  //       //   },
  //       // });
  //       return;
  //     },
  //   },
  // },

  name: 'react-nest',
  typeDefs,
});

// resolvers: {
//   Mutation: {
//     setUserAfterLogin: (
//       _root,
//       variables: { accessToken: string },
//       { cache },
//     ) => {
//       const user = handleAccessToken(variables.accessToken);

//       if (!user) return;
//       const { id, username, email, roles } = user;

//       cache.modify({
//         id: cache.identify({
//           __typename: 'DecodedUser',
//           id,
//         }),
//         fields: {
//           id, //: (value: string) => value,
//           username, //: (value: string) => value,
//           email, //: (value: string) => value,
//           roles, //: (value: string[]) => value,
//           logged: false,
//         },
//       });
//       loggedVar(true);
//       return null;
//     },
//   },
// },
