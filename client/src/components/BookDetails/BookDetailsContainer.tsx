import React from "react";
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

  return bIsMediumScreen ? (
    <div className={classes.bookDetailsContainer}>
      {nstrBookId ? (
        <BookDetails strBookId={nstrBookId} />
      ) : (
        <Typography>No book selected.</Typography>
      )}
    </div>
  ) : (
    <Dialog open={!!nstrBookId} onClose={handleBookDeselect} fullWidth>
      <DialogContent className={classes.bookDetailsContainer}>
        <BookDetails strBookId={nstrBookId!} />
      </DialogContent>
    </Dialog>
  );
};

export default BookDetailsContainer;
