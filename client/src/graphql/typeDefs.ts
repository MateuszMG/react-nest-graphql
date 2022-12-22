import { gql } from '@apollo/client';

export const typeDefs = gql`
  type DecodedUser {
    logged: Boolean!
  }

  extend type Product {
    fromBackend: Boolean!
  }

  enum LocalTypenames {
    Todos
    Todo
  }

  fragment TodoFragment on Todo {
    id
    title
    description
    done
  }

  type Todo {
    id: String!
    title: String!
    description: String!
    done: Boolean!
  }

  type Todos {
    todos: [Todo!]!
  }

  type Query {
    getTodos: [Todo!]!
  }

  query GetTodos {
    getTodos {
      ...TodoFragment
    }
  }

  # local-resolvers from doc :: https://www.apollographql.com/docs/react/local-state/local-resolvers

  fragment BookFragment on Book {
    id
    title
    author
  }

  type Book {
    id: String!
    title: String!
    author: String!
  }

  type Query {
    getBooks: [Book!]!
  }

  query GetBooks {
    getBooks @client {
      ...BookFragment
    }
  }

  type Mutation {
    changeTitle(id: String!): [Book!]!
  }

  mutation ChangeTitle($id: String!) {
    changeTitle(id: $id) @client {
      ...BookFragment
    }
  }
  # type Mutation {
  #   addBook(id: String!): [Book!]!
  # }

  # mutation AddBook($id: String!) {
  #   addBook(id: $id) @client {
  #     ...BookFragment
  #   }
  # }
`;
