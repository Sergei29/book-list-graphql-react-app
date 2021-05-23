import React, { useState, useCallback } from "react";

const useModal = () => {
  const [bOpenModal, setbOpenModal] = useState<boolean>(false);
  /**
   * @description operate modal to open
   * @returns {undefined} sets state
   */
  const funcModalOpen = useCallback(() => setbOpenModal(true), []);

  /**
   * @description operate modal to close
   * @returns {undefined} sets state
   */
  const funcModalClose = useCallback(() => setbOpenModal(false), []);

  return { bOpenModal, funcModalOpen, funcModalClose };
};

export default useModal;
