import { useCallback } from "react";
import {
  useGetAdminAuthorsQuery,
  GetAdminAuthorsDocument,
  GetBooksDocument,
  useRemoveAuthorMutation,
  useRemoveBookMutation,
} from "../../../generated/graphql";

/**
 * @description custom hook for admin page logic
 * @returns {Object} admin page data and handler functions
 */
const useAdminPage = () => {
  const { data: maybeAuthorsData } = useGetAdminAuthorsQuery();

  const [
    funcRemoveAuthorMutation,
    objRemoveAuthorResponse,
  ] = useRemoveAuthorMutation({
    refetchQueries: [{ query: GetAdminAuthorsDocument }],
  });

  const [funcRemoveBook, objRemoveBookResponse] = useRemoveBookMutation({
    refetchQueries: [{ query: GetAdminAuthorsDocument }],
    update: (cache, objRemoveBookResponse) => {
      const objRemovedBook = objRemoveBookResponse.data?.removeBook;
      const objBooksCache = cache.readQuery({ query: GetBooksDocument });
      if (!objBooksCache) return;

      const { books } = objBooksCache as Record<"books", any>;
      cache.writeQuery({
        query: GetBooksDocument,
        data: {
          books: books.filter(
            (objBook: Record<string, any>) => objBook.id !== objRemovedBook?.id
          ),
        },
      });
    },
  });

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
      funcRemoveAuthorMutation({ variables: { id: strAuthorId } });
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
      funcRemoveBook({ variables: { id: strBookId } });
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
