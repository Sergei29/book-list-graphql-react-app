import React, { useState, useCallback } from "react";
//components:
import BookList from "../../components/BookList";
import BookDetails from "../../components/BookDetails";
import AddBook from "../../components/AddBook";
import AddButton from "../../components/AddButton";
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
    <BookListPageStyled>
      <Heading>My Reading List</Heading>
      <BookList onBookSelect={onBookSelect} />
      <BookDetails nstrBookId={nstrSelectedBookId} />
      {bDisplayForm ? (
        <AddBook funcHideForm={handleDismissForm} />
      ) : (
        <AddButton handleClick={handleShowForm} title="Add New Book" />
      )}
    </BookListPageStyled>
  );
};

export default BookListPage;
