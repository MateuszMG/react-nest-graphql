import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: ['http://localhost:4000/graphql', './src/graphql/typeDefs.ts'],
  documents: 'src/graphql/**/*.{gql,ts,tsx}',
  generates: {
    'src/generated/types.ts': {
      plugins: [
        'typescript',
        'typescript-operations',
        'typescript-react-apollo',
        'typescript-apollo-client-helpers',
      ],
    },
  },
};
export default config;

// import { CodegenConfig } from '@graphql-codegen/cli';

// const config: CodegenConfig = {
//   overwrite: true,
//   schema: ['http://localhost:4000/graphql', './src/graphql/typeDefs.ts'],
//   documents: 'src/graphql/**/*.{gql,ts,tsx}',
//   generates: {
//     'src/gql/': {
//       preset: 'near-operation-file',
//       plugins: [
//         // 'typescript',
//         // 'typescript-operations',
//         // 'typescript-react-apollo',
//         // 'typescript-common',
//         // 'typescript-client',
//         // 'typed-document-node',
//       ],
//     },
//   },
//   config: {
//     avoidOptionals: true,
//   },
// };
// export default config;

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

// import type { CodegenConfig } from '@graphql-codegen/cli';

// const config: CodegenConfig = {
//   schema: ['http://localhost:4000/graphql', './src/graphql/typeDefs.ts'],
//   documents: 'src/graphql/**/*.{gql,ts,tsx}',
//   generates: {
//     'src/types.ts': { plugins: ['typescript'] },
//     'src/': {
//       preset: 'near-operation-file',
//       presetConfig: {
//         extension: '.generated.tsx',
//         baseTypesPath: 'types.ts',
//       },
//       plugins: ['typescript-operations', 'typescript-react-apollo'],
//     },
//   },
// };
// export default config;

// import { CodegenConfig } from '@graphql-codegen/cli'

// const config: CodegenConfig = {
//   schema: ['http://my-remote-schema/graphql', 'my-client-schema.graphql']
// }
// export default config

// overwrite: true
// schema: 'http://localhost:4000/graphql'
// documents: 'src/graphql/**/*.{gql,ts,tsx}'
// generates:
//   src/generated/graphql.tsx:
//     plugins:
//   - 'typescript'
//   - 'typescript-operations'
//   - 'typescript-react-apollo'
