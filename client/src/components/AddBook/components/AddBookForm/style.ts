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
      backgroundColor: "rgba(0, 0, 0, 0.7)",
      padding: theme.spacing(2.5),
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
      marginTop: theme.spacing(2),
    },
    formLabelFocused: {
      "&.Mui-focused": {
        color: theme.palette.info.main,
      },
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
    },
    addBookForm__formControl__inputSelect: {
      ...objInputCss,
      marginTop: theme.spacing(2),
      "& > div": {
        color: theme.palette.secondary.dark,
      },
      "&:hover": {
        outline: "none",
      },
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
      textTransform: "capitalize",
      fontSize: "1em",
      background: theme.palette.info.main,
      border: `1px solid ${theme.palette.secondary.dark}`,
      padding: `${theme.spacing(1)}px ${theme.spacing(2)}px`,
      borderRadius: 4,
      position: "absolute",
      bottom: 19,
      left: 10,
      display: "flex",
      alignItems: "center",
      cursor: "pointer",
      transition: `all 200ms ${theme.transitions.easing.easeInOut}`,
      "&:disabled": {
        pointerEvents: "auto",
        cursor: "not-allowed",
        color: theme.palette.secondary.light,
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
