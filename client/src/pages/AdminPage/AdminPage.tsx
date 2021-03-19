import React from "react";
import { TrashAlt } from "@styled-icons/fa-regular";
import { MaybeArrBooks } from "../../types/types";
import useAdminPage from "./hooks/useAdminPage";
// styles:
import { useStyles } from "./style";

/**
 * @description functional component
 * @returns {JSX} admin page markup
 */
const AdminPage: React.FC = () => {
  const classes = useStyles();
  const { arrAuthors, handleDeleteAuthor, handleDeleteBook } = useAdminPage();

  /**
   * @description render author's book list
   * @param {Array} arrBooks books list
   * @returns {JSX} markup
   */
  const renderBooks = (arrBooks: MaybeArrBooks) => {
    if (!arrBooks || arrBooks.length === 0) {
      return <li className={classes.authorBookList__item}>no books</li>;
    }

    return arrBooks.map((objBook) => (
      <li key={objBook?.id} className={classes.authorBookList__item}>
        {objBook?.name}
        <TrashAlt
          onClick={handleDeleteBook(objBook?.id!, objBook?.name!)}
          size="14"
          title={`delete book: ${objBook?.name}`}
          className={classes.authorBookList__item__icon}
        />
      </li>
    ));
  };

  return (
    <div className={classes.adminContainer}>
      <h2>Admin page</h2>
      <div className={classes.authorsContainer}>
        {arrAuthors?.map((objAuthor) => {
          if (!objAuthor) return <p>No author</p>;

          return (
            <div key={objAuthor.id}>
              <div className={classes.author}>
                <h4>{objAuthor.name}</h4>
                <TrashAlt
                  onClick={handleDeleteAuthor(objAuthor.id, objAuthor.name!)}
                  size="16"
                  title={`delete author: ${objAuthor.name}`}
                  className={classes.author__icon}
                />
              </div>
              <div>
                <ul>{renderBooks(objAuthor.books)}</ul>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AdminPage;
