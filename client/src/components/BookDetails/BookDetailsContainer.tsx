import React from "react";
import { Typography } from "@material-ui/core";
// components:
import BookDetails from "./BookDetails";
// styles:
import { useStyles } from "./style";

type Props = {
  nstrBookId: null | string;
};

/**
 * @description container for selected book display
 * @param {null| String} {nstrBookId selected book ID}
 * @returns {JSX} markup conditional render
 */
const BookDetailsContainer: React.FC<Props> = ({ nstrBookId }) => {
  const classes = useStyles();
  return (
    <div className={classes.bookDetailsContainer}>
      {nstrBookId ? (
        <BookDetails strBookId={nstrBookId} />
      ) : (
        <Typography>No book selected.</Typography>
      )}
    </div>
  );
};

export default BookDetailsContainer;
