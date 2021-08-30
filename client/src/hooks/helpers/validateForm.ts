import {
  NewBookFormStateType,
  BookType,
  ValidationType,
} from "../../types/types";
import { FormValidationStateType } from "../useAddBookForm/useAddBookForm";

export const validateBookName = (
  strBookName: string,
  arrBooks?: (BookType | null)[]
): ValidationType => {
  if (strBookName.length === 0) {
    return { bIsValid: false, strErrorMessage: "Required field" };
  }

  const objValidation = { bIsValid: true, strErrorMessage: "" };

  if (arrBooks) {
    const bNameUnique = !arrBooks.some(
      (objBook) => objBook!.name === strBookName
    );
    objValidation.bIsValid = bNameUnique;
    objValidation.strErrorMessage = bNameUnique
      ? ""
      : "Book name already exists.";
  }

  return objValidation;
};

export const validateBookGenre = (strGenre: string) => {
  const bGenreValid = strGenre.length > 0;
  return {
    bIsValid: bGenreValid,
    strErrorMessage: bGenreValid ? "" : "Required field",
  };
};

export const validateBookDescription = (strDescription: string) => {
  const bDescriptionValid = strDescription.length <= 300;
  return {
    bIsValid: bDescriptionValid,
    strErrorMessage: bDescriptionValid ? "" : "Maximum 300 characters allowed",
  };
};

export const validateBookAuthor = (strAuthor: string) => {
  const bAuthorValid = strAuthor.length > 0;
  return {
    bIsValid: bAuthorValid,
    strErrorMessage: bAuthorValid ? "" : "Required field",
  };
};

/**
 * @description validates form field
 * @param {String} strFieldName field name
 * @param {String} strFieldValue field value
 * @param {Array} arrBooks existing books list
 * @returns {Object} field validation result
 */
export const validateForm = (
  strFieldName: string,
  strFieldValue: string,
  arrBooks?: (BookType | null)[]
): Partial<FormValidationStateType> => {
  switch (strFieldName) {
    case "name":
      return { name: validateBookName(strFieldValue, arrBooks) };
    case "genre":
      return { genre: validateBookGenre(strFieldValue) };
    case "authorId":
      return { authorId: validateBookAuthor(strFieldValue) };
    case "description":
      return { description: validateBookDescription(strFieldValue) };
    default:
      return {};
  }
};
