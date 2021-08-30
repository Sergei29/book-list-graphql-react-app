import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    bookDetails: {
      display: "flex",
      gap: `${theme.spacing(2)}px`,
      minHeight: 170,
    },
    bookDetails__image: {
      width: "40%",
    },
    bookDetails__description: {},
  })
);
