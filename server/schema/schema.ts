import { gql } from "apollo-server";

export const typeDefs = gql`
  type Query {
    book(id: ID!): Book
    author(id: ID!): Author
    books: [Book]
    authors: [Author]
    me: User
    user(id: ID!): User
    users: [User]
  }

  type Book {
    id: ID!
    name: String
    genre: String
    author: Author
  }

  type Author {
    id: ID!
    name: String
    age: Int
    books: [Book]
  }

  type User {
    id: ID!
    username: String!
    password: String!
    token: String
  }

  type Mutation {
    addAuthor(name: String!, age: Int!): Author!
    editAuthor(id: ID!, name: String!, age: Int!): Author!
    addBook(name: String!, genre: String!, authorId: ID!): Book!
    editBook(id: ID!, name: String!, genre: String!, authorId: ID!): Book!
    removeAuthor(id: ID!): Author!
    removeBook(id: ID!): Book!
    register(username: String!, password: String!): User!
    login(username: String!, password: String!): User!
    removeUser(username: String!): User
    editUser(id: ID!, username: String!, password: String!): User
  }
`;
