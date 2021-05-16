import { useState, useCallback } from "react";

type HookReturnType = {
  bDisplayForm: boolean;
  handleShowForm: () => void;
  handleDismissForm: () => void;
};

/**
 * @description custom hook to manage addBook page
 * @returns {Object} current open form status, open/close handlers
 */
const useAddBook = (): HookReturnType => {
  const [bDisplayForm, setBdisplayForm] = useState(false);

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

  return { bDisplayForm, handleShowForm, handleDismissForm };
};

export default useAddBook;
