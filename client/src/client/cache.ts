import { InMemoryCache } from '@apollo/client';
import { StrictTypedTypePolicies } from '../generated/types';

const typePolicies: StrictTypedTypePolicies = {
  Product: {
    fields: {
      fromBackend(_, { readField }) {
        return true;
      },
    },
  },
};

export const cache = new InMemoryCache({
  typePolicies,
});
