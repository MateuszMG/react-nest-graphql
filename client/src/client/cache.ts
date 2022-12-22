import { InMemoryCache } from '@apollo/client';

export const cache = new InMemoryCache({
  typePolicies: {
    Product: {
      fields: {
        fromBackend(_, { readField }) {
          return true;
        },
      },
    },
  },
});
