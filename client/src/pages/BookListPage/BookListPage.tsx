import React, { useState, useCallback } from "react";
import { Typography } from "@material-ui/core";
//components:
import BookList from "../../components/BookList";
import BookDetails from "../../components/BookDetails";
import AddBook from "../../components/AddBook";
import AddButton from "../../components/AddButton";
import Background from "../../components/Background";
//styles:
import { useStyles } from "./style";

/**
 * @description books list page
 * @returns {JSX} component markup
 */
const BookListPage: React.FC = () => {
  const classes = useStyles();
  const [nstrSelectedBookId, setNStrSelectedBookId] = useState<null | string>(
    null
  );
  const [bDisplayForm, setBdisplayForm] = useState(false);

  /**
   * @description callback on book click
   * @param {String} strBookId book id
   * @returns {undefined} sets local state
   */
  const onBookSelect = useCallback(
    (strBookId: string) => () => setNStrSelectedBookId(strBookId),
    []
  );

  /**
   * @description callback on button click to display form
   * @returns {undefined} sets local state
   */
  const handleShowForm = useCallback(() => setBdisplayForm(true), []);

  /**
   * @description callback to dismiss form
   * @returns {undefined} sets local state
   */
  const handleDismissForm = useCallback(() => setBdisplayForm(false), []);

  return (
    <div className={classes.bookListPage}>
      <Typography className={classes.bookListPage__heading}>
        My Reading List
      </Typography>
      <BookList onBookSelect={onBookSelect} />
      <BookDetails nstrBookId={nstrSelectedBookId} />
      {bDisplayForm ? (
        <AddBook
          funcHideForm={handleDismissForm}
          nstrSelectedBookId={nstrSelectedBookId}
        />
      ) : (
        <AddButton
          handleClick={handleShowForm}
          title="Add New Book"
          className={classes.bookListPage__addButton}
        />
      )}

      <Background />
    </div>
  );
};

export default BookListPage;
