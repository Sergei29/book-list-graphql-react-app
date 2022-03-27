import { CSSProperties } from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme: Theme) => {
  const objBackgroundCss: CSSProperties = {
    backgroundColor: theme.palette.info.main,
    color: theme.palette.secondary.dark,
    outline: "none",
  };

  return createStyles({
    inputText: {
      boxSizing: "border-box",
      borderRadius: 4,
      backgroundColor: theme.palette.info.main,
      border: `1px solid ${theme.palette.secondary.dark}`,
      color: theme.palette.secondary.dark,
      textTransform: "capitalize",
      "& > label": { color: theme.palette.secondary.dark },
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
    errorMessage: {
      color: theme.palette.error.main,
      paddingLeft: theme.spacing(2),
    },
  });
});
