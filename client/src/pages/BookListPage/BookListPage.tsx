import React from "react";
import { Typography, useMediaQuery, useTheme } from "@material-ui/core";
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
  const theme = useTheme();
  const bIsMediumScreen = useMediaQuery(theme.breakpoints.up("md"));
  const { nstrSelectedBookId, handleBookSelect } = useBookListPage();

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
      {bIsMediumScreen && <BookDetails nstrBookId={nstrSelectedBookId} />}
      <Background />
    </div>
  );
};

export default BookListPage;
