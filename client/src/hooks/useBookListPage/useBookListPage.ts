import { useState, useCallback } from "react";

type HookReturnType = {
  nstrSelectedBookId: null | string;
  bDisplayForm: boolean;
  handleBookSelect: (strBookId: string) => () => void;
  handleShowForm: () => void;
  handleDismissForm: () => void;
};

/**
 * @description custom hook to manage booklist page
 * @returns {Object} current selected book, select/add book handlers
 */
const useBookListPage = (): HookReturnType => {
  const [nstrSelectedBookId, setNStrSelectedBookId] =
    useState<null | string>(null);
  const [bDisplayForm, setBdisplayForm] = useState(false);

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
   * @description callback on button click to display form
   * @returns {undefined} sets local state
   */
  const handleShowForm = useCallback(() => setBdisplayForm(true), []);

  /**
   * @description callback to dismiss form
   * @returns {undefined} sets local state
   */
  const handleDismissForm = useCallback(() => setBdisplayForm(false), []);
  return {
    bDisplayForm,
    nstrSelectedBookId,
    handleDismissForm,
    handleShowForm,
    handleBookSelect,
  };
};

export default useBookListPage;
