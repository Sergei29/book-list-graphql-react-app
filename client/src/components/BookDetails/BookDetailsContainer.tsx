import React from "react";
// components:
import BookDetails from "./BookDetails";
// styles:
import { BookDetailsContainerStyled } from "./BookDetails.styled";

type Props = {
  nstrBookId: null | string;
};

/**
 * @description container for selected book display
 * @param {null| String} {nstrBookId selected book ID}
 * @returns {JSX} markup conditional render
 */
const BookDetailsContainer: React.FC<Props> = ({ nstrBookId }) => {
  return (
    <BookDetailsContainerStyled>
      {nstrBookId ? (
        <BookDetails strBookId={nstrBookId} />
      ) : (
        <p>No book selected.</p>
      )}
    </BookDetailsContainerStyled>
  );
};

export default BookDetailsContainer;
