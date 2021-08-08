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
    authForm__input: {
      ...objInputCss,
      "& > div > fieldset": {
        border: "none",
        "&:hover": {
          outline: "none",
        },
      },
      "&:hover": {
        ...objBackgroundCss,
      },
      "&:active": {
        ...objBackgroundCss,
      },
      "&:focus": {
        ...objBackgroundCss,
      },
      "&::selection": {
        ...objBackgroundCss,
      },
    },
  });
});
