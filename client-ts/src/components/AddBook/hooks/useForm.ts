import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import {
  getAuthorsQuery,
  addBookMutation,
  getBooksQuery,
} from "../../../queries/queries";
import { validateForm } from "../helpers/validateForm";
import { ValidationType } from "../../../types/types";

const INITIAL_BOOK = {
  name: "",
  genre: "",
  authorId: "",
};

export const useForm = () => {
  const [objBook, setObjBook] = useState<Record<string, any>>(INITIAL_BOOK);
  const [objFormValidaton, setObjFormValidaton] = useState<ValidationType>({
    bIsValid: false,
    nstrErrorMessage: null,
  });

  const objAuthorsQueryResponse = useQuery(getAuthorsQuery);
  const { loading, data, error } = useQuery(getBooksQuery);

  /**
   * @description callback on input change
   * @param {Object} objEvent input change event
   * @returns {undefined} sets state
   */
  const handleChange = (
    objEvent: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = objEvent.target;
    setObjBook((objPrevBook) => ({
      ...objPrevBook,
      [name]: value,
    }));
  };

  /**
   * @description clear form
   * @returns {undefined} sets state
   */
  const clearForm = () => {
    setObjBook(INITIAL_BOOK);
    setObjFormValidaton({ bIsValid: false, nstrErrorMessage: null });
  };

  /**
   * @description callback on form submit
   * @param {Object} objEvent form event
   * @returns {undefined} sends query, sets state
   */
  const handleSubmit = (objEvent: React.FormEvent) => {
    objEvent.preventDefault();
    if (!objFormValidaton.bIsValid) return;

    // if ok, submit:
    alert("Submit form.");

    // clear form
    clearForm();
  };

  useEffect(() => {
    const arrBooks = (!!data && data.books) || [];
    setObjFormValidaton(validateForm(objBook, arrBooks));
  }, [objBook]);

  return {
    objFormValidaton,
    objAuthorsQueryResponse,
    objBook,
    handleSubmit,
    handleChange,
  };
};
