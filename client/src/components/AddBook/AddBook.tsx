import React, { useState, Fragment } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Typography,
} from "@material-ui/core";
import AddButton from "../AddButton";
import AddBookForm from "./components/AddBookForm";
// styles:
import { useStyles } from "./style";

type Props = {
  nStrSelectedBookId: null | string;
};

/**
 * @description add new book form
 * @param {String | null} nStrSelectedBookId selected book ID
 * @returns {JSX} component markup
 */
const AddBook: React.FC<Props> = ({ nStrSelectedBookId }) => {
  const classes = useStyles();
  const [bDisplayModal, setBDisplayModal] = useState<boolean>(false);

  /**
   * @description open modal
   * @returns {undefined}
   */
  const handleModalOpen = () => setBDisplayModal(true);

  /**
   * @description close modal
   * @returns {undefined}
   */
  const handleModalClose = () => setBDisplayModal(false);

  return (
    <Fragment>
      <AddButton handleClick={handleModalOpen} title="Add New Book" />
      <Dialog open={bDisplayModal} onClose={handleModalClose}>
        <DialogTitle className={classes.addBookModal__title}>
          <Typography>Add new book</Typography>
        </DialogTitle>
        <DialogContent className={classes.addBookModal__content}>
          <AddBookForm
            nStrSelectedBookId={nStrSelectedBookId}
            onSumbit={handleModalClose}
          />
        </DialogContent>
      </Dialog>
    </Fragment>
  );
};

export default AddBook;
