import { AuthorType } from "../../types";

/**
 * @description util function, updates authors list by removing book from selected author book list
 * @param {Array} arrAuthors existing authors list
 * @param {String} strAuthorId current author ID
 * @param {String} strRemovedBookId deleted book ID
 * @returns {Array} updated authors list
 */
const updateAuthorsBooks = (
  arrAuthors: AuthorType[],
  strAuthorId: string,
  strRemovedBookId: string
) => {
  const objCurrentAuthor = arrAuthors.find(
    (objAuthor) => objAuthor.id === strAuthorId
  );
  const objCurrentAuthorUpdated = {
    ...objCurrentAuthor,
    books: objCurrentAuthor!.books!.filter(
      (objBook) => objBook.id !== strRemovedBookId
    ),
  };

  return arrAuthors.map((objAuthor) =>
    objAuthor.id === strAuthorId ? objCurrentAuthorUpdated : objAuthor
  );
};

export default updateAuthorsBooks;
