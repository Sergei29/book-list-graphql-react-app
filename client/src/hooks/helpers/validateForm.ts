import {
  AddBookFormStateType,
  BookType,
  ValidationType,
} from "../../types/types";

/**
 * @description validate form data helper function
 * @param {Object} objBook form data
 * @param {Array} arrBooks existing books list
 * @returns {Object} info on validation and error message if any
 */
export const validateForm = (
  objBook: AddBookFormStateType | null,
  arrBooks?: (BookType | null)[]
): ValidationType => {
  const { name, genre, authorId } = objBook!;

  let bHasName = false,
    bHasGenre = false,
    bHasAuthorId = false,
    nstrErrorMessage = null;

  if (name.length > 0) {
    let bNameUnique = true;
    if (arrBooks) {
      bNameUnique = !arrBooks.some((objBook) => objBook!.name === name);
      nstrErrorMessage = bNameUnique ? null : "Book name already exists.";
    }
    bHasName = true && bNameUnique;
  }
  if (genre.length > 0) bHasGenre = true;
  if (authorId.length > 0) bHasAuthorId = true;

  return {
    bIsValid: bHasName && bHasGenre && bHasAuthorId,
    nstrErrorMessage,
  };
};
