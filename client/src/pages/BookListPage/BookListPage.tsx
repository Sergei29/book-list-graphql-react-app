import React from "react";
import { Typography } from "@material-ui/core";
import useBookListPage from "../../hooks/useBookListPage/useBookListPage";
//components:
import BookList from "../../components/BookList";
import BookDetails from "../../components/BookDetails";
import AddBook from "../../components/AddBook";
import Background from "../../components/Background";
//styles:
import { useStyles } from "./style";

/**
 * @description books list page
 * @returns {JSX} component markup
 */
const BookListPage: React.FC = () => {
  const classes = useStyles();
  const { nstrSelectedBookId, handleBookSelect, handleBookDeselect } =
    useBookListPage();

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
      <AddBook nstrSelectedBookId={nstrSelectedBookId} />
      <BookDetails
        nstrBookId={nstrSelectedBookId}
        handleBookDeselect={handleBookDeselect}
      />
      <Background />
    </div>
  );
};

export default BookListPage;
