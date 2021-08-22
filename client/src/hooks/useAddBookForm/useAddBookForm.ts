import React, { useState, useEffect, useContext } from "react";
import { useQuery, useMutation } from "@apollo/client";
import {
  GET_BOOKS,
  GET_BOOK_DETAILS,
  GET_AUTHORS,
} from "../../graphql/queries";
import { ADD_BOOK } from "../../graphql/mutations";
import { validateForm } from "../helpers/validateForm";
import { objAuthContext } from "../../containers/AuthProvider";
import {
  ValidationType,
  AddBookFormStateType,
  AuthorType,
  BookType,
} from "../../types/types";
import { objInitialValidation } from "../../constants";

export type FormValidationStateType = Readonly<
  Record<"name" | "genre" | "authorId", ValidationType>
>;

const INITIAL_BOOK: Readonly<AddBookFormStateType> = {
  name: "",
  genre: "",
  authorId: "",
  addedBy: "unknown",
};

const INITIAL_BOOK_VALIDATION: FormValidationStateType = {
  name: objInitialValidation,
  genre: objInitialValidation,
  authorId: objInitialValidation,
};

/**
 * @description custom hook for add book form
 * @param {null|String} nstrSelectedBookId currently selected book id , if any
 * @returns {Object} form status and handler functions
 */
const useAddBookForm = (nstrSelectedBookId: null | string) => {
  const { objAuthInfo } = useContext(objAuthContext);
  const [objBook, setObjBook] = useState<AddBookFormStateType>({
    ...INITIAL_BOOK,
    addedBy: objAuthInfo.nObjUserData?.email || "unknown",
  });
  const [objFormValidation, setObjFormValidation] =
    useState<FormValidationStateType>(INITIAL_BOOK_VALIDATION);
  const [bFormValid, setBFormValid] = useState<boolean>(false);

  const objAuthorsQueryResponse =
    useQuery<{ authors: AuthorType[] }>(GET_AUTHORS);
  const objBookQueryResponse = useQuery<{ books: BookType[] }>(GET_BOOKS);

  /**
   * @description add book mutation, updates cache when created, and refetches a query for book details if any book is currently selected
   */
  const [funcAddBookMutation, objAddBookMutationResponse] =
    useMutation(ADD_BOOK);

  /**
   * @description callback on input change
   * @param {String} strFieldName input field name
   * @param {String|Object} mixedValue input field value
   * @returns {undefined} sets state
   */
  const handleChange = (
    strFieldName: string,
    mixedValue: string | Record<string, any>
  ) => {
    setObjBook((objPrevBook) => ({
      ...objPrevBook,
      [strFieldName]: mixedValue,
    }));
  };

  /**
   * @description callback on input blur run field validation
   * @param {String} strFieldName field name
   * @param {String} strFieldValue field value
   * @returns {any}
   */
  const handleBlur = (strFieldName: string, strFieldValue: string) => {
    const objFieldValidation = validateForm(
      strFieldName,
      strFieldValue,
      objBookQueryResponse.data?.books
    );
    setObjFormValidation((objPrevState) => ({
      ...objPrevState,
      ...objFieldValidation,
    }));
  };

  /**
   * @description clear form
   * @returns {undefined} sets state
   */
  const clearForm = () => {
    setObjBook({ ...INITIAL_BOOK });
    setObjFormValidation({ ...INITIAL_BOOK_VALIDATION });
  };

  /**
   * @description callback on form submit
   * @param {Object} objEvent form event
   * @returns {undefined} sends query, sets state
   */
  const handleSubmit = (objEvent: React.FormEvent) => {
    objEvent.preventDefault();
    const bFormValid = Object.values(objFormValidation).reduce(
      (bIsValid, objCurrentValidation) =>
        bIsValid && objCurrentValidation.bIsValid,
      true
    );
    if (!bFormValid) return;

    // if ok, submit:
    funcAddBookMutation({
      variables: objBook,
      update: (cache, { data: { addBook } }) => {
        const { books = [] } =
          cache.readQuery<{ books: BookType[] }>({ query: GET_BOOKS }) || {};

        const { book: objSelectedBook } =
          cache.readQuery<{ book: BookType }>({
            query: GET_BOOK_DETAILS,
            variables: { id: nstrSelectedBookId },
          }) || {};

        if (
          !!objSelectedBook &&
          objSelectedBook.author!.id === objBook.authorId
        ) {
          const arrNewAuthorBooks = [
            ...objSelectedBook.author!.books!,
            addBook,
          ];
          cache.writeQuery({
            query: GET_BOOK_DETAILS,
            data: {
              book: {
                ...objSelectedBook,
                author: {
                  ...objSelectedBook.author,
                  books: arrNewAuthorBooks,
                },
              },
            },
          });
          //TODO: find a way to read all GET_BOOK_DETAILS cached queries, and if authorId is matching - update booklist
        }

        cache.writeQuery({
          query: GET_BOOKS,
          data: {
            books: [...books, addBook],
          },
        });
      },
    });

    // clear form
    clearForm();
  };

  useEffect(() => {
    const bFormIsValid = Object.values(objFormValidation).reduce(
      (bIsValid, objCurrentValidation) =>
        bIsValid && objCurrentValidation.bIsValid,
      true
    );

    setBFormValid(bFormIsValid);
  }, [objFormValidation]);

  return {
    bFormValid,
    handleBlur,
    handleChange,
    handleSubmit,
    objAddBookMutationResponse,
    objAuthorsQueryResponse,
    objBook,
    objFormValidation,
  };
};

export default useAddBookForm;
