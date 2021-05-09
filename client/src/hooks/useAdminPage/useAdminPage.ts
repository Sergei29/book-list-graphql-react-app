import { useCallback } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { GET_ADMIN_AUTHORS, GET_BOOKS } from "../../graphql/queries";
import { REMOVE_AUTHOR, REMOVE_BOOK } from "../../graphql/mutations";
import updateAuthorBooks from "../helpers/updateAuthorBooks";

/**
 * @description custom hook for admin page logic
 * @returns {Object} admin page data and handler functions
 */
const useAdminPage = () => {
  const { data: maybeAuthorsData } = useQuery(GET_ADMIN_AUTHORS);

  const [funcRemoveAuthorMutation] = useMutation(REMOVE_AUTHOR);

  const [funcRemoveBook] = useMutation(REMOVE_BOOK);

  const arrAuthors = maybeAuthorsData ? maybeAuthorsData.authors : [];

  /**
   * @description callback on click delete author
   * @param {String} strAuthorId author ID
   * @param {String} strAuthorName author name
   * @returns {Function} function that makes api call
   */
  const handleDeleteAuthor = useCallback(
    (strAuthorId: string, strAuthorName: string) => () => {
      const bConfirmDelete = window.confirm(
        `Are you sure to delete author: ${strAuthorName} ?`
      );
      if (!bConfirmDelete) return;
      funcRemoveAuthorMutation({
        variables: { id: strAuthorId },
        update: (cache, { data: { removeAuthor } }) => {
          const { authors } =
            cache.readQuery({ query: GET_ADMIN_AUTHORS }) || {};
          const { books } = cache.readQuery({ query: GET_BOOKS }) || {};

          cache.writeQuery({
            query: GET_ADMIN_AUTHORS,
            data: {
              authors: authors.filter(
                (objAuthor: Record<string, any>) =>
                  objAuthor.id !== removeAuthor.id
              ),
            },
          });
          cache.writeQuery({
            query: GET_BOOKS,
            data: {
              books: books.filter(
                (objBook: Record<string, any>) =>
                  objBook.author.id !== removeAuthor.id
              ),
            },
          });
        },
      });
    },
    []
  );

  /**
   * @description callback on click delete book from author's book list
   * @param {String} strBookId book ID
   * @param {String} strBookName book name
   * @param {String} strAuthorId author ID
   * @returns {Function} function that makes api call
   */
  const handleDeleteBook = useCallback(
    (strBookId: string, strBookName: string, strAuthorId: string) => () => {
      const bConfirmDelete = window.confirm(
        `Are you sure to delete book: "${strBookName}" ?`
      );
      if (!bConfirmDelete) return;
      funcRemoveBook({
        variables: { id: strBookId },
        // refetchQueries: [{ query: GET_ADMIN_AUTHORS }, { query: GET_BOOKS }],
        update: (cache, { data: { removeBook } }) => {
          const { books: arrAllBooks } =
            cache.readQuery({ query: GET_BOOKS }) || {};

          const { authors } =
            cache.readQuery({ query: GET_ADMIN_AUTHORS }) || {};

          const arrAuthorsUpdated = updateAuthorBooks(
            authors,
            strAuthorId,
            removeBook.id
          );

          cache.writeQuery({
            query: GET_ADMIN_AUTHORS,
            data: {
              authors: arrAuthorsUpdated,
            },
          });

          if (arrAllBooks) {
            const arrUpdatedBooks = arrAllBooks.filter(
              (objBook: Record<string, any>) => objBook.id !== removeBook.id
            );
            cache.writeQuery({
              query: GET_BOOKS,
              data: {
                books: arrUpdatedBooks,
              },
            });
          }
        },
      });
    },
    []
  );

  return {
    arrAuthors,
    handleDeleteAuthor,
    handleDeleteBook,
  };
};

export default useAdminPage;
