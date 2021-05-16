import React from "react";
import { Typography, Grid } from "@material-ui/core";
import useBookListPage from "../../hooks/useBookListPage/useBookListPage";
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
  const {
    bDisplayForm,
    nstrSelectedBookId,
    handleBookSelect,
    handleDismissForm,
    handleShowForm,
  } = useBookListPage();

  return (
    <div className={classes.bookListPage}>
      <Typography
        className={classes.bookListPage__heading}
        variant="h4"
        component="h1"
      >
        My Reading List
      </Typography>
      <BookList onBookSelect={handleBookSelect} />
      <BookDetails nstrBookId={nstrSelectedBookId} />
      {true === bDisplayForm ? (
        <AddBook
          funcHideForm={handleDismissForm}
          nstrSelectedBookId={nstrSelectedBookId}
        />
      ) : (
        <AddButton handleClick={handleShowForm} title="Add New Book" />
      )}

      <Background />
    </div>
  );
};

export default BookListPage;
