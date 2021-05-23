import { useState, useCallback } from "react";

type HookReturnType = {
  nstrSelectedBookId: null | string;
  handleBookSelect: (strBookId: string) => () => void;
  handleBookDeselect: () => void;
};

/**
 * @description custom hook to manage booklist page
 * @returns {Object} current selected book, select/add book handlers
 */
const useBookListPage = (): HookReturnType => {
  const [nstrSelectedBookId, setNStrSelectedBookId] =
    useState<null | string>(null);

  /**
   * @description callback on book click
   * @param {String} strBookId book id
   * @returns {undefined} sets local state
   */
  const handleBookSelect = useCallback(
    (strBookId: string) => () => setNStrSelectedBookId(strBookId),
    []
  );

  /**
   * @description callback to deselect a book to none selected
   * @returns {undefined} sets local state
   */
  const handleBookDeselect = useCallback(() => setNStrSelectedBookId(null), []);

  return {
    nstrSelectedBookId,
    handleBookSelect,
    handleBookDeselect,
  };
};

export default useBookListPage;
