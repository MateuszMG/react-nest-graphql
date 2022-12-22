import { Resolvers } from '@apollo/client';
import { Book } from '../generated/types';

export const resolvers: Resolvers = {
  Query: {
    getBooks(books: Book[]) {
      return books;
    },
  },
  Mutation: {
    changeTitle: (_root, variables, { cache }, info) => {
      cache.modify({
        id: cache.identify({
          __typename: 'Book',
          id: variables.id,
        }),

        fields: {
          title: () => 'title -- ' + Date.now(),
        },
      });

      return null;
    },
  },
};
