import React, { useState, Fragment } from "react";
import {
  Typography,
  useMediaQuery,
  useTheme,
  Dialog,
  DialogContent,
} from "@material-ui/core";
// components:
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
        open={bShowEditModal}
        onClose={() => setBShowEditModal(false)}
        fullWidth
      >
        <DialogContent className={classes.bookDetailsContainer}>
          edit book form
        </DialogContent>
      </Dialog>
    </Fragment>
  );
};

export default BookDetailsContainer;
