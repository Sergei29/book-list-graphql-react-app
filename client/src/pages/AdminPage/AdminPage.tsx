import React from "react";
import { TrashAlt } from "@styled-icons/fa-regular";
import { MaybeArrBooks } from "../../types/types";
import useAdminPage from "./hooks/useAdminPage";
// styles:
import {
  AdminContainer,
  Author,
  AuthorBooks,
  AuthorsContainer,
} from "./AdminPage.styled";

/**
 * @description functional component
 * @returns {JSX} admin page markup
 */
const AdminPage: React.FC = () => {
  const { arrAuthors, handleDeleteAuthor, handleDeleteBook } = useAdminPage();

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
      <AuthorsContainer>
        {arrAuthors?.map((objAuthor) => {
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
      </AuthorsContainer>
    </AdminContainer>
  );
};

export default AdminPage;
