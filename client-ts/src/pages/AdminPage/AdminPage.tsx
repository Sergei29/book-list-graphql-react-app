import React from "react";
import { TrashAlt } from "@styled-icons/fa-regular";
import {
  useGetAdminAuthorsQuery,
  GetAdminAuthorsDocument,
  useRemoveAuthorMutation,
  useRemoveBookMutation,
} from "../../generated/graphql";
import { MaybeArrBooks } from "../../types/types";
// styles:
import { AdminContainer, Author, AuthorBooks } from "./AdminPage.styled";

const AdminPage: React.FC = () => {
  const getAdminAuthorsResponse = useGetAdminAuthorsQuery();
  const [
    funcRemoveAuthorMutation,
    objRemoveAuthorResponse,
  ] = useRemoveAuthorMutation({
    refetchQueries: [{ query: GetAdminAuthorsDocument }],
  });
  const [funcRemoveBook, objRemoveBookResponse] = useRemoveBookMutation();

  /**
   * @description callback on click delete author
   * @param {String} strAuthorId author ID
   * @param {String} strAuthorName author name
   * @returns {Function} function that makes api call
   */
  const handleDeleteAuthor = (
    strAuthorId: string,
    strAuthorName: string
  ) => () => {
    const bConfirmDelete = window.confirm(
      `Are you sure to delete author: ${strAuthorName} ?`
    );
    if (!bConfirmDelete) return;
    funcRemoveAuthorMutation({ variables: { id: strAuthorId } });
  };

  /**
   * @description callback on click delete book
   * @param {String} strBookId book ID
   * @param {String} strBookName book name
   * @returns {Function} function that makes api call
   */
  const handleDeleteBook = (strBookId: string, strBookName: string) => () => {
    const bConfirmDelete = window.confirm(
      `Are you sure to delete book: "${strBookName}" ?`
    );
    if (!bConfirmDelete) return;
    funcRemoveBook({ variables: { id: strBookId } });
  };

  /**
   * @description render author's book list
   * @param {Array} arrBooks books list
   * @returns {JSX} markup
   */
  const renderBooks = (arrBooks: MaybeArrBooks) => {
    if (!arrBooks || arrBooks.length === 0) {
      return <li>no books</li>;
    }

    return arrBooks.map((objBook) => (
      <li key={objBook?.id}>
        {objBook?.name}
        <TrashAlt
          onClick={handleDeleteBook(objBook?.id!, objBook?.name!)}
          size="14"
          title={`delete book: ${objBook?.name}`}
        />
      </li>
    ));
  };

  return (
    <AdminContainer>
      <h2>Admin page</h2>
      <div>
        {getAdminAuthorsResponse.data?.authors?.map((objAuthor) => {
          if (!objAuthor) return <p>No author</p>;

          return (
            <div key={objAuthor.id}>
              <Author>
                <h4>{objAuthor.name}</h4>
                <TrashAlt
                  onClick={handleDeleteAuthor(objAuthor.id, objAuthor.name!)}
                  size="16"
                  title={`delete author: ${objAuthor.name}`}
                />
              </Author>
              <AuthorBooks>
                <ul>{renderBooks(objAuthor.books)}</ul>
              </AuthorBooks>
            </div>
          );
        })}
      </div>
    </AdminContainer>
  );
};

export default AdminPage;
