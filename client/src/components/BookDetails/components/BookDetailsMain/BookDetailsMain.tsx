import React from "react";
import Classnames from "classnames";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import { STR_DEFAULT_BOOK_IMG_URL } from "../../../../constants";
// styles:
import { useStyles } from "./style";

type Props = {
  strImageUrl?: string;
  strDescription?: string;
  strCustomClass?: string;
};

const BookDetailsMain: React.FC<Props> = ({
  strImageUrl = STR_DEFAULT_BOOK_IMG_URL,
  strDescription,
  strCustomClass = "",
}) => {
  const classes = useStyles();
  return (
    <div className={Classnames(classes.bookDetails, strCustomClass)}>
      <div className={classes.bookDetails__image}>
        <CardMedia component="img" src={strImageUrl} />
      </div>
      <div className={classes.bookDetails__description}>
        {strDescription && (
          <Typography>book synopsis: {strDescription}</Typography>
        )}
      </div>
    </div>
  );
};

export default BookDetailsMain;
