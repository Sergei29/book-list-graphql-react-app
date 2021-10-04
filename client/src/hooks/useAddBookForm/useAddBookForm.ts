import React, { useState, useEffect, useContext } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { GET_BOOKS, GET_BOOK_DETAILS } from "../../graphql/queries";
import { ADD_BOOK } from "../../graphql/mutations";
import { validateAddBookForm } from "../helpers/validateForm";
import { objAuthContext } from "../../containers/AuthProvider";
import {
  ValidationType,
  NewBookFormStateType,
  BookType,
} from "../../types/types";
import { objInitialValidation } from "../../constants";

export type FormValidationStateType = Readonly<
  Record<
    "name" | "genre" | "authorId" | "description" | "strBase64ImageFile",
    ValidationType
  >
>;

const INITIAL_BOOK: Readonly<NewBookFormStateType> = {
  name: "",
  genre: "",
  authorId: "",
  addedBy: "unknown",
  description: "",
  strBase64ImageFile: null,
};

const INITIAL_BOOK_VALIDATION: FormValidationStateType = {
  name: objInitialValidation,
  genre: objInitialValidation,
  authorId: objInitialValidation,
  description: objInitialValidation,
  strBase64ImageFile: objInitialValidation,
};

/**
 * @description custom hook for add book form
 * @param {null|String} nStrSelectedBookId currently selected book id , if any
 * @param {Function | undefined} onSubmit callback on submit success, optional
 * @returns {Object} form status and handler functions
 */
const useAddBookForm = (
  nStrSelectedBookId: null | string,
  onSubmit?: () => void
) => {
  const { objAuthInfo } = useContext(objAuthContext);
  const [objBook, setObjBook] = useState<NewBookFormStateType>({
    ...INITIAL_BOOK,
    addedBy: objAuthInfo.nObjUserData?.email || "unknown",
  });
  const [objFormValidation, setObjFormValidation] =
    useState<FormValidationStateType>(INITIAL_BOOK_VALIDATION);
  const [bFormValid, setBFormValid] = useState<boolean>(false);
  const [uObjImageFile, setUObjImageFile] =
    useState<InstanceType<typeof File>>();

  const objBookQueryResponse = useQuery<{ books: BookType[] }>(GET_BOOKS);

  /**
   * @description add book mutation, updates cache when created, and refetches a query for book details if any book is currently selected
   */
  const [funcAddBookMutation, objAddBookMutationResponse] = useMutation(
    ADD_BOOK,
    {
      onCompleted: () => {
        onSubmit && onSubmit();
        setObjBook({ ...INITIAL_BOOK });
        setObjFormValidation({ ...INITIAL_BOOK_VALIDATION });
      },
    }
  );

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
   * @description callback on image input change
   * @param {String} strFieldName input field name
   * @param {Object} objImageFile mage File object
   * @returns {undefined} sets state
   */
  const handleChangeImage = (
    strFieldName: string,
    objImageFile?: InstanceType<typeof File>
  ) => {
    if (!objImageFile) {
      setUObjImageFile(undefined);
      setObjBook((objPrevBook) => ({
        ...objPrevBook,
        [strFieldName]: null,
      }));
      return;
    }
    const objReader = new FileReader();

    objReader.onloadend = () => {
      setUObjImageFile(objImageFile);
      setObjBook((objPrevBook) => ({
        ...objPrevBook,
        [strFieldName]: objReader.result as string,
      }));
    };
    objReader.readAsDataURL(objImageFile);
  };

  /**
   * @description callback on input blur run field validation
   * @param {String} strFieldName field name
   * @param {String} strFieldValue field value
   * @returns {any}
   */
  const handleBlur = (strFieldName: string, strFieldValue: string) => {
    const objFieldValidation = validateAddBookForm(
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
  const handleClearForm = () => {
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
            variables: { id: nStrSelectedBookId },
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
  };

  /**
   * @description effect to run overall form validation
   * @returns {undefined}
   */
  useEffect(() => {
    const bFormIsValid = Object.values(objFormValidation).reduce(
      (bIsValid, objCurrentValidation) =>
        bIsValid && objCurrentValidation.bIsValid,
      true
    );
    const {strBase64ImageFile, description, ...objMandatoryFields } = objBook;
    const bFormCompleted = Object.values(objMandatoryFields).reduce((bCompleted, strCurrentValue) => bCompleted && strCurrentValue.length > 0, true);

    setBFormValid(bFormIsValid && bFormCompleted);
  }, [objFormValidation, objBook]);

  return {
    bFormValid,
    handleBlur,
    handleChange,
    handleChangeImage,
    handleSubmit,
    uObjImageFile,
    objAddBookMutationResponse,
    objBook,
    objFormValidation,
  };
};

export default useAddBookForm;
