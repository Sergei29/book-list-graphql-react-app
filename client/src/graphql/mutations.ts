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
  mutation Register($username: String!, $password: String!) {
    register(username: $username, password: $password) {
      id
      username
      password
      token
    }
  }
`;

export const SIGN_IN = gql`
  mutation Login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      id
      username
      token
    }
  }
`;

export const REMOVE_USER = gql`
  mutation removeUser($username: String!) {
    removeUser(username: $username) {
      username
      id
    }
  }
`;

export const EDIT_USER = gql`
  mutation editUser($id: ID!, $username: String!, $password: String!) {
    editUser(id: $id, username: $username, password: $password) {
      id
      username
      password
      token
    }
  }
`;
