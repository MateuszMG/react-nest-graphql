import { ApolloClient } from '@apollo/client';
import { cache } from './cache';
import { link } from './link';
import { resolvers } from './resolvers';
import { typeDefs } from '../graphql/typeDefs';
import { writeInitialData } from './writeInitialData';

export const client = new ApolloClient({
  link,
  cache,
  resolvers,
  name: 'react-nest',
  typeDefs,
});

writeInitialData();
