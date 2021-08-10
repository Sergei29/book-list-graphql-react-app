import { gql } from "@apollo/client";

export const ADD_BOOK = gql`
  mutation AddBook(
    $name: String!
    $genre: String!
    $authorId: ID!
    $addedBy: String
  ) {
    addBook(
      name: $name
      genre: $genre
      authorId: $authorId
      addedBy: $addedBy
    ) {
      id
      name
      author {
        id
      }
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
        active
      }
    }
  }
`;

export const SIGN_UP_CONFIRM = gql`
  mutation SignUpConfirm($id: ID!) {
    signUpConfirm(id: $id) {
      user {
        id
        email
        role
        active
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
        active
      }
    }
  }
`;

export const SIGN_OUT = gql`
  mutation SignOut {
    signOut {
      user {
        id
        email
        role
        active
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
        active
      }
    }
  }
`;

export const USER_INFO = gql`
  mutation UserInfo {
    userInfo {
      user {
        id
        email
        role
        active
      }
    }
  }
`;
