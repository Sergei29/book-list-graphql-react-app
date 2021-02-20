import React, { useState, useEffect } from "react";
import {
  useGetAuthorsQuery,
  useGetBooksQuery,
  GetBooksDocument,
  useAddBookMutation,
} from "../../../generated/graphql";
import { validateForm } from "../helpers/validateForm";
import { ValidationType } from "../../../types/types";

type StateType = {
  name: string;
  genre: string;
  authorId: string;
};
const INITIAL_BOOK: Readonly<StateType> = {
  name: "",
  genre: "",
  authorId: "",
};

export const useForm = () => {
  const [objBook, setObjBook] = useState<StateType>(INITIAL_BOOK);
  const [objFormValidaton, setObjFormValidaton] = useState<ValidationType>({
    bIsValid: false,
    nstrErrorMessage: null,
  });

  const objAuthorsQueryResponse = useGetAuthorsQuery();
  const { data: objQueryData } = useGetBooksQuery();
  const [addBookMutation, objAddBookMutationResponse] = useAddBookMutation({
    refetchQueries: [{ query: GetBooksDocument }],
  });

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
    addBookMutation({ variables: objBook });

    // clear form
    clearForm();
  };

  /**
   * @description running validation when form data updated
   * @returns {undefined} sets validation state
   */
  useEffect(() => {
    const arrBooks = (!!objQueryData && objQueryData.books) || [];
    setObjFormValidaton(validateForm(objBook, arrBooks));
  }, [objBook]);

  return {
    objFormValidaton,
    objAddBookMutationResponse,
    objAuthorsQueryResponse,
    objBook,
    handleSubmit,
    handleChange,
  };
};
