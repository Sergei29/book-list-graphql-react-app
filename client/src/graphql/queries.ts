import { gql } from "@apollo/client";

export const GET_BOOKS = gql`
  query Books {
    books {
      name
      id
      author {
        id
      }
    }
  }
`;

export const GET_AUTHORS = gql`
  query Authors {
    authors {
      name
      id
    }
  }
`;

export const GET_ADMIN_AUTHORS = gql`
  query AdminAuthors {
    authors {
      name
      id
      books {
        name
        id
      }
    }
  }
`;

export const GET_BOOK_DETAILS = gql`
  query BookById($id: ID!) {
    book(id: $id) {
      id
      name
      genre
      author {
        id
        name
        age
        books {
          name
          id
        }
      }
    }
  }
`;

export const GET_CURRENT_USER = gql`
  query GetCurrentUser {
    me {
      id
      username
    }
  }
`;

export const GET_FAVORITES = gql`
  query GetFavorites {
    arrFavoriteBookIds @client
  }
`;

export const GET_CURRENT_THEME = gql`
  query GetCurrentTheme {
    strCurrentTheme @client
  }
`;
