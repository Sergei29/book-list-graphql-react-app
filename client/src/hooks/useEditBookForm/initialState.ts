import { ValidationType, NewBookFormStateType, BookType } from "../../types";
import { objInitialValidation } from "../../constants";

export type FormValidationStateType = Readonly<
  Record<
    "name" | "genre" | "authorId" | "description" | "strBase64ImageFile",
    ValidationType
  >
>;

export const INITIAL_BOOK_BLANK_STATE: Readonly<NewBookFormStateType> = {
  name: "",
  genre: "",
  authorId: "",
  addedBy: "unknown",
  description: "",
  strBase64ImageFile: null,
};

export const INITIAL_BOOK_VALIDATION: FormValidationStateType = {
  name: objInitialValidation,
  genre: objInitialValidation,
  authorId: objInitialValidation,
  description: objInitialValidation,
  strBase64ImageFile: objInitialValidation,
};

/**
 * @description generates new book initial form state
 * @param {Object} objBlankState blank form state
 * @param {String} strUserEmail current user email
 * @param {Object | null } nObjBook current book to edit
 * @returns {Object} initial form state
 */
export const getNewBookInitialState = (
  objBlankState: Readonly<NewBookFormStateType>,
  strUserEmail: string,
  nObjBook: BookType | null
): Readonly<NewBookFormStateType> => {
  if (!nObjBook) {
    return { ...objBlankState, addedBy: strUserEmail };
  }

  return {
    name: nObjBook.name!,
    genre: nObjBook.genre!,
    authorId: nObjBook.author?.id!,
    addedBy: strUserEmail,
    description: nObjBook.description || "",
    strBase64ImageFile: null,
  };
};
