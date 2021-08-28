import React, { useState, Fragment } from "react";
import {
  Typography,
  useMediaQuery,
  useTheme,
  Dialog,
  DialogContent,
  DialogTitle,
} from "@material-ui/core";
// components:
import EditBook from "../EditBook";
import BookDetails from "./BookDetails";
// styles:
import { useStyles } from "./style";

type Props = {
  nstrBookId: null | string;
  handleBookDeselect: () => void;
};

/**
 * @description container for selected book display
 * @param {null| String} {nstrBookId selected book ID}
 * @returns {JSX} markup conditional render
 */
const BookDetailsContainer: React.FC<Props> = ({
  nstrBookId,
  handleBookDeselect,
}) => {
  const classes = useStyles();
  const theme = useTheme();
  const bIsMediumScreen = useMediaQuery(theme.breakpoints.up("md"));
  const [bShowEditModal, setBShowEditModal] = useState<boolean>(false);

  const handleCloseEditModal = () => setBShowEditModal(false);

  const renderBookDetails = () =>
    bIsMediumScreen ? (
      <div className={classes.bookDetailsContainer}>
        {nstrBookId ? (
          <BookDetails
            strBookId={nstrBookId}
            setBShowEditModal={setBShowEditModal}
          />
        ) : (
          <Typography>No book selected.</Typography>
        )}
      </div>
    ) : (
      <Dialog
        open={!!nstrBookId && !bShowEditModal}
        onClose={handleBookDeselect}
        fullWidth
      >
        <DialogContent className={classes.bookDetailsContainer}>
          {nstrBookId && (
            <BookDetails
              strBookId={nstrBookId}
              setBShowEditModal={setBShowEditModal}
            />
          )}
        </DialogContent>
      </Dialog>
    );

  return (
    <Fragment>
      {renderBookDetails()}
      <Dialog
        open={bShowEditModal && !!nstrBookId}
        onClose={handleCloseEditModal}
        fullWidth
      >
        <EditBook
          strSelectedBookId={nstrBookId!}
          onSumbit={handleCloseEditModal}
        />
      </Dialog>
    </Fragment>
  );
};

export default BookDetailsContainer;
