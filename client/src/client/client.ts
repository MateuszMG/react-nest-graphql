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

// export const USER_DATA = gql`
//   query UserData {
//     id
//     username
//     email
//     roles
//     exp
//     iat
//     accessToken
//   }
// `;

// cache.writeQuery({
//   query: USER_DATA,
//   data: handleAccessToken(getFromTheLS('accessToken')),
// });

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

// const  logout = logoutLink({
//   onLogout: () => {
//       if (!logoutProcessingVar()) {
//           AuthService.logout({ logoutWithRedirectLink: true });
//       }
//   },
// })

export const SET_NEW_PRODUCT = gql`
  mutation SetNewProduct($product: Product) {
    setNewProduct(product: $product) @client
  }
`;

export const client = new ApolloClient({
  link: from([authLink, errorLink, httpLink]),
  //authLink.concat(httpLink),  //from([httpLink, authLink, errorLink]),
  // link: authLink.concat(httpLink),

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
