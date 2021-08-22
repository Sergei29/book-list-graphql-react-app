import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme: Theme) => {
  return createStyles({
    addBookForm: {
      padding: theme.spacing(2.5),
      display: "flex",
      flexDirection: "column",
      rowGap: `${theme.spacing(2)}px`,
      minWidth: 320,
      [theme.breakpoints.down("xs")]: {
        minWidth: 200,
        padding: 0,
      },
    },
    addBookForm__inputFields: {
      display: "flex",
      columnGap: `${theme.spacing(2)}px`,
      [theme.breakpoints.down("xs")]: {
        flexDirection: "column",
      },
      "& > div": {
        display: "flex",
        flexDirection: "column",
        rowGap: `${theme.spacing(2)}px`,
        maxWidth: 240,
      },
    },
    addBookForm__buttons: {},
    addBookForm__errorMessage: {
      color: theme.palette.secondary.dark,
    },
  });
});
