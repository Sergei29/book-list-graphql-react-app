import { gql } from "apollo-server";

/**
 * @description a GraphQL schema
 */
export const typeDefs = gql`
  enum Role {
    ADMIN
    USER
  }

  type Query {
    book(id: ID!): Book
    author(id: ID!): Author
    books: [Book]
    authors: [Author]
    me: User
    userById(id: ID!): User
    users: [User]
  }

  type Book {
    id: ID!
    name: String
    genre: String
    author: Author
    addedBy: String # user's email
  }

  type Author {
    id: ID!
    name: String
    age: Int
    books: [Book]
  }

  type User {
    id: ID!
    email: String!
    role: Role
  }

  input Credentials {
    email: String!
    password: String!
  }

  type AuthPayload {
    user: User
  }

  type Mutation {
    addAuthor(name: String!, age: Int!): Author!
    editAuthor(id: ID!, name: String!, age: Int!): Author!
    addBook(
      name: String!
      genre: String!
      authorId: ID!
      addedBy: String
    ): Book!
    editBook(
      id: ID!
      name: String!
      genre: String!
      authorId: ID!
      addedBy: String
    ): Book!
    removeAuthor(id: ID!): Author!
    removeBook(id: ID!): Book!
    signUp(credentials: Credentials!): AuthPayload
    signIn(credentials: Credentials!): AuthPayload
    userInfo: AuthPayload
    signOut: AuthPayload
    removeUser(id: ID!): AuthPayload
  }
`;
