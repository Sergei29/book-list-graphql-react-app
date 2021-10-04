import React, { useState, useEffect, useContext } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { GET_BOOKS } from "../../graphql/queries";
import { EDIT_BOOK } from "../../graphql/mutations";
import { validateEditBookForm } from "../helpers/validateForm";
import { objAuthContext } from "../../containers/AuthProvider";
import { NewBookFormStateType, BookType } from "../../types/types";
import {
  getNewBookInitialState,
  INITIAL_BOOK_BLANK_STATE,
  INITIAL_BOOK_VALIDATION,
  FormValidationStateType,
} from "./initialState";

/**
 * @description custom hook for edit book form
 * @param {Object | null} nObjBook currently selected book details
 * @param {Function | undefined} onSubmit callback on submit success, optional
 * @returns {Object} form status and handler functions
 */
const useEditBookForm = (nObjBook: BookType | null, onSubmit?: () => void) => {
  const { objAuthInfo } = useContext(objAuthContext);
  const [objNewBook, setObjNewBook] = useState<NewBookFormStateType>({
    ...getNewBookInitialState(
      INITIAL_BOOK_BLANK_STATE,
      objAuthInfo.nObjUserData?.email || "unknown",
      null
    ),
  });
  const [objFormValidation, setObjFormValidation] =
    useState<FormValidationStateType>(INITIAL_BOOK_VALIDATION);
  const [bFormValid, setBFormValid] = useState<boolean>(false);
  const [uObjImageFile, setUObjImageFile] =
    useState<InstanceType<typeof File>>();
  const objBookQueryResponse = useQuery<{ books: BookType[] }>(GET_BOOKS);
  const [funcEditBookMutation, objEditBookMutationResponse] = useMutation(
    EDIT_BOOK,
    {
      errorPolicy: "all",
      onCompleted: () => {
        onSubmit && onSubmit();
      },
    }
  );

  /**
   * @description callback on input change
   * @param {String} strFieldName input field name
   * @param {String | Object} mixedValue input field value
   * @returns {undefined} sets state
   */
  const handleChange = (
    strFieldName: string,
    mixedValue: string | Record<string, any>
  ) => {
    setObjNewBook((objPrevBook) => ({
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
      setObjNewBook((objPrevBook) => ({
        ...objPrevBook,
        [strFieldName]: null,
      }));
      return;
    }
    const objReader = new FileReader();

    objReader.onloadend = () => {
      setUObjImageFile(objImageFile);
      setObjNewBook((objPrevBook) => ({
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
    const objFieldValidation = validateEditBookForm(
      strFieldName,
      strFieldValue,
      nObjBook?.id!,
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
    setObjNewBook(
      getNewBookInitialState(
        INITIAL_BOOK_BLANK_STATE,
        objAuthInfo.nObjUserData?.email || "unknown",
        nObjBook
      )
    );
    setObjFormValidation({ ...INITIAL_BOOK_VALIDATION });
  };

  /**
   * @description callback on form submit
   * @param {Object} objEvent form event
   * @returns {undefined} sends query, sets state
   */
  const handleSubmit = (objEvent: React.FormEvent) => {
    objEvent.preventDefault();
    if (!bFormValid) return;

    // if ok, submit:
    funcEditBookMutation({
      variables: { ...objNewBook, id: nObjBook?.id },
    });
  };

  /**
   * @description effect to update form data with existing book details to edit
   * @returns {undefined}
   */
  useEffect(() => {
    if (!nObjBook) return;
    setObjNewBook(
      getNewBookInitialState(
        INITIAL_BOOK_BLANK_STATE,
        objAuthInfo.nObjUserData?.email || "unknown",
        nObjBook
      )
    );
  }, [nObjBook]);

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
    
    const {strBase64ImageFile, description, ...objMandatoryFields } = objNewBook;
    const bFormCompleted = Object.values(objMandatoryFields).reduce((bCompleted, strCurrentValue) => bCompleted && strCurrentValue.length > 0, true);

    setBFormValid(bFormIsValid && bFormCompleted);
  }, [objFormValidation, objNewBook]);

  return {
    bFormValid,
    handleBlur,
    handleChange,
    handleChangeImage,
    handleSubmit,
    uObjImageFile,
    objEditBookMutationResponse,
    objNewBook,
    objFormValidation,
  };
};

export default useEditBookForm;
