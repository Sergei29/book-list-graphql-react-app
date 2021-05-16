import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    "@keyframes shake": {
      "0%": {
        transform: "translate(1px, 1px) rotate(0deg)",
      },
      "10%": {
        transform: "translate(-1px, -2px) rotate(-1deg)",
      },
      "20%": {
        transform: "translate(-3px, 0px) rotate(1deg)",
      },
      "30%": {
        transform: "translate(3px, 2px) rotate(0deg)",
      },
      "40%": {
        transform: "translate(1px, -1px) rotate(1deg)",
      },
      "50%": {
        transform: "translate(-1px, 2px) rotate(-1deg)",
      },
      "60%": {
        transform: " translate(-3px, 1px) rotate(0deg)",
      },
      "70%": {
        transform: "translate(3px, 1px) rotate(-1deg)",
      },
      "80%": {
        transform: "translate(-1px, -1px) rotate(1deg)",
      },
      "90%": {
        transform: "translate(1px, 2px) rotate(0deg)",
      },
      "100%": {
        transform: "translate(1px, -2px) rotate(-1deg)",
      },
    },
    bookList: {
      position: "relative",
      zIndex: 2,
    },
    bookList__item: {
      display: "inline-block",
      margin: theme.spacing(1.5),
      padding: theme.spacing(1.25),
      borderRadius: 4,
      border: `1px solid ${theme.palette.secondary.main}`,
      boxShadow: `1px 2px 3px rgba(0, 0, 0, 0.3)`,
      cursor: "pointer",
      color: theme.palette.secondary.main,
      fontWeight: 500,
      transition: `all 200ms ${theme.transitions.easing.easeInOut}`,
      "&:hover": {
        color: theme.palette.text.secondary,
        backgroundColor: theme.palette.secondary.main,
        transform: `scale(1.1)`,
      },
      "&:focus": {
        color: theme.palette.primary.main,
        animation: `$shake 0.5s`,
      },
      "&:active": {
        color: theme.palette.primary.main,
        animation: `$shake 0.5s`,
      },
    },
  })
);
