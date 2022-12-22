import { gql } from '@apollo/client';
import { cache } from './cache';

// Initializing the cache  https://www.apollographql.com/docs/react/local-state/local-resolvers

export const writeInitialData = () => {
  cache.writeQuery({
    query: gql`
      query GetBooks {
        getBooks {
          id
          title
          author
        }
      }
    `,

    data: {
      getBooks: [
        {
          __typename: 'Book',
          id: '123234',
          title: 'The Awakening',
          author: 'Kate',
        },
        {
          __typename: 'Book',
          id: '123567',
          title: 'City of Glass',
          author: 'Paul',
        },
      ],
    },
  });
};
