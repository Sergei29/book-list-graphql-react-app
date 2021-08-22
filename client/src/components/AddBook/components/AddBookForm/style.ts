import { CSSProperties } from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme: Theme) => {
  const objBackgroundCss: CSSProperties = {
    backgroundColor: theme.palette.info.main,
    color: theme.palette.secondary.dark,
    outline: "none",
  };
  const objInputCss: CSSProperties = {
    paddingRight: theme.spacing(0.5),
    boxSizing: "border-box",
    borderRadius: 4,
    backgroundColor: theme.palette.info.main,
    border: `1px solid ${theme.palette.secondary.dark}`,
    color: theme.palette.secondary.dark,
  };

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
    addBookForm__errorMessage: {
      color: theme.palette.secondary.dark,
    },
  });
});
