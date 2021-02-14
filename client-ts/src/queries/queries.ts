import { gql } from "@apollo/client";

const getBooksQuery = gql`
  query getBooks {
    books {
      name
      id
    }
  }
`;

const getAuthorsQuery = gql`
  query getAuthors {
    authors {
      name
      id
    }
  }
`;

const getAdminAuthorsQuery = gql`
  query getAdminAuthors {
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

const getBookDetailsQuery = gql`
  query getBookById($id: ID!) {
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

const addBookMutation = gql`
  mutation addNewBook($name: String!, $genre: String!, $authorId: ID!) {
    addBook(name: $name, genre: $genre, authorId: $authorId) {
      name
      id
    }
  }
`;

const removeBookMutation = gql`
  mutation removeBookById($id: ID!) {
    removeBook(id: $id) {
      id
      name
    }
  }
`;

const removeAuthorMutation = gql`
  mutation removeAuthorById($id: ID!) {
    removeAuthor(id: $id) {
      name
      id
    }
  }
`;

export {
  getBooksQuery,
  getAuthorsQuery,
  getBookDetailsQuery,
  addBookMutation,
  removeBookMutation,
  removeAuthorMutation,
  getAdminAuthorsQuery,
};
