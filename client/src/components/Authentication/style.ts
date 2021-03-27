import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    authLink: {},
    authHeading: {
      marginBottom: theme.spacing(2),
      color: theme.palette.info.main,
    },
    authHelperText: {
      color: theme.palette.info.main,
      fontSize: ".75rem",
      marginBottom: theme.spacing(1),
    },
    authButton: {
      color: theme.palette.secondary.main,
    },
  })
);
