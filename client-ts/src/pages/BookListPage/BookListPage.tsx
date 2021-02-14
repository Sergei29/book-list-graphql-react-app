import React, { useState, useCallback } from "react";
//components:
import BookList from "../../components/BookList";
import BookDetails from "../../components/BookDetails";
import AddBook from "../../components/AddBook";
//styles:
import { BookListPageStyled, Heading } from "./BookListPage.styled";

/**
 * @description boos list page
 * @returns {JSX} component markup
 */
const BookListPage: React.FC = () => {
  const [nstrSelectedBookId, setNStrSelectedBookId] = useState<null | string>(
    null
  );

  /**
   * @description callback on book click
   * @param {String} strBookId book id
   * @returns {undefined} sets local state
   */
  const onBookSelect = useCallback(
    (strBookId: string) => () => setNStrSelectedBookId(strBookId),
    []
  );

  return (
    <BookListPageStyled>
      <Heading>My Reading List</Heading>
      <BookList onBookSelect={onBookSelect} />
      <BookDetails nstrBookId={nstrSelectedBookId} />
      <AddBook />
    </BookListPageStyled>
  );
};

export default BookListPage;
