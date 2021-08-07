import { gql } from "@apollo/client";

export const ADD_BOOK = gql`
  mutation AddBook($name: String!, $genre: String!, $authorId: ID!) {
    addBook(name: $name, genre: $genre, authorId: $authorId) {
      name
      id
    }
  }
`;

export const REMOVE_BOOK = gql`
  mutation RemoveBookById($id: ID!) {
    removeBook(id: $id) {
      id
      name
    }
  }
`;

export const REMOVE_AUTHOR = gql`
  mutation RemoveAuthorById($id: ID!) {
    removeAuthor(id: $id) {
      name
      id
    }
  }
`;

export const SIGN_UP = gql`
  mutation SignUp($email: String!, $password: String!) {
    signUp(credentials: { email: $email, password: $password }) {
      user {
        id
        email
        role
      }
    }
  }
`;

export const SIGN_IN = gql`
  mutation SignIn($email: String!, $password: String!) {
    signIn(credentials: { email: $email, password: $password }) {
      user {
        id
        email
        role
      }
    }
  }
`;

export const REMOVE_USER = gql`
  mutation RemoveUser($id: ID!) {
    removeUser(id: $id) {
      user {
        id
        email
        role
      }
    }
  }
`;
