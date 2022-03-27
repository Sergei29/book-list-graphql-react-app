import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";
// styles:
import { useStyles } from "./style";

type Props = {
  strLoadingMessage?: string;
};
const Loader: React.FC<Props> = ({ strLoadingMessage }) => {
  const classes = useStyles();

  return (
    <div className={classes.loader}>
      <CircularProgress color="secondary" />
      {!!strLoadingMessage && <Typography>{strLoadingMessage}</Typography>}
    </div>
  );
};

export default Loader;
