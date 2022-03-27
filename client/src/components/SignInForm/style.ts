import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    authHeading: {
      marginBottom: theme.spacing(2),
      color: theme.palette.info.main,
    },
    authHelperText: {
      color: theme.palette.info.main,
      fontSize: ".75rem",
      marginBottom: theme.spacing(1),
    },
    authHelperText__button: {
      color: "inherit",
      fontSize: "inherit",
      paddingBottom: 0,
      paddingTop: 0,
      marginBottom: 0,
    },
    authForm: {
      display: "flex",
      flexDirection: "column",
      rowGap: theme.spacing(2),
    },
    authForm__buttons: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      columnGap: theme.spacing(1),
      "& > button": {
        textTransform: "capitalize",
        color: theme.palette.info.main,
      },
    },
    authForm__buttons__submit: {},
    authForm__buttons__reset: {},
    authForm__error: {
      color: theme.palette.error.main,
    },
  })
);
