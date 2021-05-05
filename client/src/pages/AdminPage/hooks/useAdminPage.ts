import { useCallback } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { GET_ADMIN_AUTHORS, GET_BOOKS } from "../../../graphql/queries";
import { REMOVE_AUTHOR, REMOVE_BOOK } from "../../../graphql/mutations";

/**
 * @description custom hook for admin page logic
 * @returns {Object} admin page data and handler functions
 */
const useAdminPage = () => {
  const { data: maybeAuthorsData } = useQuery(GET_ADMIN_AUTHORS);

  const [funcRemoveAuthorMutation, objRemoveAuthorResponse] = useMutation(
    REMOVE_AUTHOR
  );

  const [funcRemoveBook, objRemoveBookResponse] = useMutation(REMOVE_BOOK);

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
        refetchQueries: [{ query: GET_ADMIN_AUTHORS }],
      });
    },
    []
  );

  /**
   * @description callback on click delete book
   * @param {String} strBookId book ID
   * @param {String} strBookName book name
   * @returns {Function} function that makes api call
   */
  const handleDeleteBook = useCallback(
    (strBookId: string, strBookName: string) => () => {
      const bConfirmDelete = window.confirm(
        `Are you sure to delete book: "${strBookName}" ?`
      );
      if (!bConfirmDelete) return;
      funcRemoveBook({
        variables: { id: strBookId },
        refetchQueries: [{ query: GET_ADMIN_AUTHORS }, { query: GET_BOOKS }],
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
