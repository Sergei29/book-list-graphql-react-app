import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme: Theme) => {
  return createStyles({
    bookForm: {
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
    bookForm__fileInput: {
      display: "flex",
      padding: `${theme.spacing(2)}px ${theme.spacing(6)}px`,
    },
    bookForm__inputFields: {
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
    bookForm__inputTextarea__adornment: {
      alignSelf: "flex-start",
      marginTop: theme.spacing(1),
    },
    bookForm__buttons: {},
    bookForm__errorMessage: {
      color: theme.palette.secondary.dark,
    },
    bookForm__loader: {
      color: theme.palette.info.main,
    },
  });
});
