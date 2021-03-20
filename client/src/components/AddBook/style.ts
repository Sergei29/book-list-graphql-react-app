import { CSSProperties } from "react";
import {
  makeStyles,
  createStyles,
  Theme,
  darken,
} from "@material-ui/core/styles";

export const useStyles = makeStyles((theme: Theme) => {
  const objBackgroundCss: CSSProperties = {
    backgroundColor: `${theme.palette.info.main} !important`,
    border: `1px solid ${theme.palette.secondary.dark}`,
    color: theme.palette.secondary.dark,
    outline: "none",
  };
  const objInputCss: CSSProperties = {
    margin: theme.spacing(0.5),
    padding: theme.spacing(0.75),
    boxSizing: "border-box",
    borderRadius: 4,
    backgroundColor: theme.palette.info.main,
    border: `1px solid ${theme.palette.secondary.dark}`,
    color: theme.palette.secondary.dark,
  };

  return createStyles({
    addBookForm: {
      backgroundColor: "rgba(0, 0, 0, 0.7)",
      padding: theme.spacing(2.5),
      position: "fixed",
      left: 0,
      bottom: 0,
      width: 400,
      zIndex: 2,
    },
    addBookForm__closeButton: {
      position: "absolute",
      top: -6,
      right: -12,
      cursor: "pointer",
      color: theme.palette.secondary.dark,
      "&:hover": {
        color: darken(theme.palette.secondary.dark, 1.1),
      },
    },
    addBookForm__formControl: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gridGap: 10,
    },
    addBookForm__formControl__label: {
      textAlign: "right",
      padding: theme.spacing(0.75),
      color: theme.palette.info.main,
    },
    addBookForm__formControl__inputText: {
      ...objInputCss,
      "&:active": {
        ...objBackgroundCss,
      },
      "&:focus": {
        ...objBackgroundCss,
      },
      "&::selection": {
        ...objBackgroundCss,
      },
      "&:-webkit-autofill": {
        ...objBackgroundCss,
      },
    },
    addBookForm__formControl__inputSelect: {
      ...objInputCss,
      "&:active": {
        outline: "none",
      },
      "&:focus": {
        outline: "none",
      },
      "&::selection": {
        outline: "none",
      },
    },
    addBookForm__submitButton: {
      color: theme.palette.secondary.dark,
      fontSize: "1em",
      background: theme.palette.info.main,
      border: `1px solid ${theme.palette.secondary.dark}`,
      padding: `${theme.spacing(1)}px ${theme.spacing(2)}px`,
      borderRadius: 4,
      position: "absolute",
      bottom: 25,
      left: 10,
      display: "flex",
      alignItems: "center",
      cursor: "pointer",
      transition: `all 200ms ${theme.transitions.easing.easeInOut}`,
      "&:disabled": {
        cursor: "not-allowed",
        opacity: 0.9,
      },
      "&:focus": {
        color: theme.palette.primary.main,
        transform: "scale(1.01)",
      },
      "&:active": {
        color: theme.palette.primary.main,
        transform: "scale(1.01)",
      },
    },
    addBookForm__errorMessage: {
      color: theme.palette.secondary.dark,
    },
  });
});
