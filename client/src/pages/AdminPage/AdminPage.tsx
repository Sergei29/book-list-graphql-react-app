import React from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";

import { MaybeArrBooks } from "../../types/types";
import useAdminPage from "../../hooks/useAdminPage/useAdminPage";
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
   * @param {Array} strAuthorId author id
   * @returns {JSX} markup
   */
  const renderBooks = (arrBooks: MaybeArrBooks, strAuthorId: string) => {
    if (!arrBooks || arrBooks.length === 0) {
      return <li className={classes.authorBookList__item}>no books</li>;
    }

    return arrBooks.map((objBook) => (
      <li key={objBook?.id} className={classes.authorBookList__item}>
        {objBook?.name}
        <IconButton
          onClick={handleDeleteBook(objBook?.id!, objBook?.name!, strAuthorId)}
          title={`delete book: ${objBook?.name}`}
          className={classes.authorBookList__item__icon}
        >
          <DeleteIcon fontSize="small" />
        </IconButton>
      </li>
    ));
  };

  return (
    <div className={classes.adminContainer}>
      <h2>Admin page</h2>
      <div className={classes.authorsContainer}>
        {arrAuthors?.map((objAuthor: Record<string, any>) => {
          if (!objAuthor) return <p>No author</p>;

          return (
            <div key={objAuthor.id}>
              <div className={classes.author}>
                <h4>{objAuthor.name}</h4>
                <IconButton
                  onClick={handleDeleteAuthor(objAuthor.id, objAuthor.name!)}
                  title={`delete author: ${objAuthor.name}`}
                  className={classes.author__deleteButton}
                >
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </div>
              <div>
                <ul>{renderBooks(objAuthor.books, objAuthor.id)}</ul>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AdminPage;
