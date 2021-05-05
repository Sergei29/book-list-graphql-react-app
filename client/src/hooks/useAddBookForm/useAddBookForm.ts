import React, { useState, useEffect } from "react";
import { useQuery, useMutation } from "@apollo/client";
import {
  GET_BOOKS,
  GET_BOOK_DETAILS,
  GET_AUTHORS,
} from "../../graphql/queries";
import { ADD_BOOK } from "../../graphql/mutations";
import { validateForm } from "../helpers/validateForm";
import {
  ValidationType,
  AddBookFormStateType,
  InputChangeEvent,
} from "../../types/types";

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
const useAddBookForm = (nstrSelectedBookId: null | string) => {
  const [objBook, setObjBook] = useState<AddBookFormStateType>(INITIAL_BOOK);
  const [objFormValidaton, setObjFormValidaton] = useState<ValidationType>({
    bIsValid: false,
    nstrErrorMessage: null,
  });

  const objAuthorsQueryResponse = useQuery(GET_AUTHORS);
  const objBookQueryResponse = useQuery(GET_BOOKS);

  /**
   * @description add book mutation, updates cache when created, and refetches a query for book details if any book is currently selected
   */
  const [funcAddBookMutation, objAddBookMutationResponse] = useMutation(
    ADD_BOOK
  );

  /**
   * @description callback on input change
   * @param {Object} objEvent input change event
   * @returns {undefined} sets state
   */
  const handleChange = (objEvent: InputChangeEvent) => {
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
    funcAddBookMutation({
      variables: objBook,
      update: (cache, { data: { addBook } }) => {
        const { books } = cache.readQuery({ query: GET_BOOKS }) || {};
        const { book: objBookDetails } =
          cache.readQuery({
            query: GET_BOOK_DETAILS,
            variables: { id: nstrSelectedBookId },
          }) || {};

        let arrNewAuthorBooks = [...objBookDetails.author.books];
        if (objBookDetails.author.id === objBook.authorId) {
          arrNewAuthorBooks = [...objBookDetails.author.books, addBook];
        }

        cache.writeQuery({
          query: GET_BOOKS,
          data: {
            books: [...books, addBook],
          },
        });

        cache.writeQuery({
          query: GET_BOOK_DETAILS,
          data: {
            book: {
              ...objBookDetails,
              author: {
                ...objBookDetails.author,
                books: arrNewAuthorBooks,
              },
            },
          },
        });
      },
    });

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
    objAuthorsQueryResponse,
    objAddBookMutationResponse,
    objBook,
    handleSubmit,
    handleChange,
  };
};

export default useAddBookForm;
