import { InMemoryCache } from '@apollo/client';

export const cache = new InMemoryCache({
  typePolicies: {
    // Mutation:{
    //   fields:{
    //     addProduct:{
    //       merge()
    //     }
    //   }
    // },

    // Query: {
    //   fields: {
    //     getProducts: {
    //     merge(existing = [], incoming: any[]) {
    //       console.log('merge', existing);
    //       console.log('incoming', incoming);
    //       return [...existing, ...incoming];
    //     },
    //   },
    // read(existing: any[], { args, readField }: any) {
    //   console.log('existing', existing);
    //   console.log('args', args);
    // },
    //     },
    //   },
    // },
    Product: {
      fields: {
        fromBackend(_, { readField }) {
          return true;
        },
      },
    },
  },
});

// fields: {

//   tasks: {

// merge(existing = [], incoming: any[]) {

//   return [...existing, ...incoming];

// },

//   },

// },
