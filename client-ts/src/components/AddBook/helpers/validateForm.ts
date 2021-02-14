import { BookType, ValidationType } from "../../../types/types";

export const validateForm = (
  objBook: BookType,
  arrBooks?: BookType[]
): ValidationType => {
  const { name, genre, authorId } = objBook;
  let bHasName = false,
    bHasGenre = false,
    bHasAuthorId = false,
    nstrErrorMessage = null;

  if (name.length > 0) {
    let bNameUnique = true;
    if (arrBooks) {
      bNameUnique = !arrBooks.some((objBook) => objBook.name === name);
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
