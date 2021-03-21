import React, { useState, useEffect } from "react";
import {
  useGetAuthorsQuery,
  useGetBooksQuery,
  GetBooksDocument,
  GetBookDetailsDocument,
  useAddBookMutation,
} from "../../../generated/graphql";
import { validateForm } from "../helpers/validateForm";
import { ValidationType, AddBookFormStateType } from "../../../types/types";

const INITIAL_BOOK: Readonly<AddBookFormStateType> = {
  name: "",
  genre: "",
  authorId: "",
};

/**
 * @description custom hook for add book form
 * @param {null|String} nstrSelectedBookId currently selected book id , if any
 * @returns {Object} form status and handler functions
 */
export const useForm = (nstrSelectedBookId: null | string) => {
  const [objBook, setObjBook] = useState<AddBookFormStateType>(INITIAL_BOOK);
  const [objFormValidaton, setObjFormValidaton] = useState<ValidationType>({
    bIsValid: false,
    nstrErrorMessage: null,
  });

  const objAuthorsQueryResponse = useGetAuthorsQuery();
  const objBookQueryResponse = useGetBooksQuery();

  /**
   * @description add book mutation, updates cache when created, and refetches a query for book details if any book is currently selected
   */
  const [funcAddBookMutation, objAddBookMutationResponse] = useAddBookMutation({
    update: (cache, objAddBookMutationResponse) => {
      const objNewBook = objAddBookMutationResponse.data?.addBook;
      const { books }: any = cache.readQuery({ query: GetBooksDocument });

      cache.writeQuery({
        query: GetBooksDocument,
        data: { books: [...books, objNewBook] },
      });
    },
    refetchQueries: nstrSelectedBookId
      ? [
          {
            query: GetBookDetailsDocument,
            variables: { id: nstrSelectedBookId },
          },
        ]
      : [],
  });

  /**
   * @description callback on input change
   * @param {Object} objEvent input change event
   * @returns {undefined} sets state
   */
  const handleChange = (
    objEvent: React.ChangeEvent<
      | HTMLInputElement
      | HTMLTextAreaElement
      | HTMLSelectElement
      | Record<string, any>
    >
  ) => {
    const { name, value } = objEvent.target;
    setObjBook((objPrevBook) => ({
      ...objPrevBook,
      [name!]: value,
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
    funcAddBookMutation({ variables: objBook });

    // clear form
    clearForm();
  };

  /**
   * @description running validation when form data updated
   * @returns {undefined} sets validation state
   */
  useEffect(() => {
    const { data } = objBookQueryResponse;
    const arrBooks = (!!data && data.books) || [];
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
