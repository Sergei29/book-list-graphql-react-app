import React, { Fragment } from "react";
import { Typography, DialogContent, DialogTitle } from "@material-ui/core";
import useBookDetails from "../../hooks/useBookDetails/useBookDetails";
import EditBookForm from "./components/EditBookForm";
import { useStyles } from "./style";

type Props = {
  strSelectedBookId: string;
};

/**
 * @description edit selected book
 * @param {String} strSelectedBookId current selected book ID
 * @returns {JSX} markup
 */
const EditBook: React.FC<Props> = ({ strSelectedBookId }) => {
  const classes = useStyles();
  const { data, loading, error } = useBookDetails({
    strBookId: strSelectedBookId,
  });

  /**
   * @description render current book editor
   * @returns {JSX} loading | error | edit book form
   */
  const renderBookEditor = () => {
    if (loading) return <Typography>Loading book details...</Typography>;
    if (error) return <Typography>Error: {error.message}</Typography>;
    if (!data?.book) return <Typography>No book details found.</Typography>;
    return <EditBookForm objSelectedBook={data?.book} />;
  };

  return (
    <Fragment>
      <DialogTitle className={classes.editBookModal__title}>
        {!!data?.book && <Typography>{`Edit  ${data?.book.name}`}</Typography>}
      </DialogTitle>
      <DialogContent className={classes.editBookModal__content}>
        {renderBookEditor()}
      </DialogContent>
    </Fragment>
  );
};

export default EditBook;
