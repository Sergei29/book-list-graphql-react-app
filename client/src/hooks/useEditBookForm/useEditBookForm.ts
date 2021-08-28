import React, { useState, useEffect, useContext } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { GET_BOOKS, GET_BOOK_DETAILS } from "../../graphql/queries";
import { ADD_BOOK } from "../../graphql/mutations";
import { validateForm } from "../helpers/validateForm";
import { objAuthContext } from "../../containers/AuthProvider";
import {
  ValidationType,
  NewBookFormStateType,
  BookType,
} from "../../types/types";
import { objInitialValidation } from "../../constants";

export type FormValidationStateType = Readonly<
  Record<"name" | "genre" | "authorId" | "strBase64ImageFile", ValidationType>
>;

const INITIAL_BOOK: Readonly<NewBookFormStateType> = {
  name: "",
  genre: "",
  authorId: "",
  addedBy: "unknown",
  strBase64ImageFile: null,
};

const INITIAL_BOOK_VALIDATION: FormValidationStateType = {
  name: objInitialValidation,
  genre: objInitialValidation,
  authorId: objInitialValidation,
  strBase64ImageFile: objInitialValidation,
};

/**
 * @description custom hook for edit book form
 * @param {String} strSelectedBookId currently selected book ID to edit
 * @param {Function | undefined} onSubmit callback on submit success, optional
 * @returns {Object} form status and handler functions
 */
const useEditBookForm = () => {
  const { objAuthInfo } = useContext(objAuthContext);
  const [objNewBook, setObjNewBook] = useState<NewBookFormStateType>({
    ...INITIAL_BOOK,
  });
  const [objFormValidation, setObjFormValidation] =
    useState<FormValidationStateType>(INITIAL_BOOK_VALIDATION);
  const [bFormValid, setBFormValid] = useState<boolean>(false);
  const [uObjImageFile, setUObjImageFile] =
    useState<InstanceType<typeof File>>();

  return {};
};

export default useEditBookForm;
