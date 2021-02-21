import { useState, useCallback, useEffect } from "react";
import {
  useGetAdminAuthorsQuery,
  GetAdminAuthorsDocument,
  useRemoveAuthorMutation,
  useRemoveBookMutation,
} from "../../../generated/graphql";

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
  });

  const arrAuthors = maybeAuthorsData ? maybeAuthorsData.authors : [];

  /**
   * @description callback on click delete author
   * @param {String} strAuthorId author ID
   * @param {String} strAuthorName author name
   * @returns {Function} function that makes api call
   */
  const handleDeleteAuthor = (
    strAuthorId: string,
    strAuthorName: string
  ) => () => {
    const bConfirmDelete = window.confirm(
      `Are you sure to delete author: ${strAuthorName} ?`
    );
    if (!bConfirmDelete) return;
    funcRemoveAuthorMutation({ variables: { id: strAuthorId } });
  };

  /**
   * @description callback on click delete book
   * @param {String} strBookId book ID
   * @param {String} strBookName book name
   * @returns {Function} function that makes api call
   */
  const handleDeleteBook = (strBookId: string, strBookName: string) => () => {
    const bConfirmDelete = window.confirm(
      `Are you sure to delete book: "${strBookName}" ?`
    );
    if (!bConfirmDelete) return;
    funcRemoveBook({ variables: { id: strBookId } });
  };

  return {
    arrAuthors,
    handleDeleteAuthor,
    handleDeleteBook,
  };
};

export default useAdminPage;
