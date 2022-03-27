import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    addButton: {
      color: theme.components?.bookButton?.color,
      fontSize: "2em",
      background: theme.palette.secondary.main,
      border: 0,
      padding: theme.spacing(2),
      width: 50,
      height: 49,
      borderRadius: "50%",
      position: "fixed",
      zIndex: 2,
      bottom: 30,
      left: 60,
      display: "flex",
      alignItems: "center",
      cursor: "pointer",
      transition: "all 200ms ease-in-out",
      "&:disabled": {
        cursor: "not-allowed",
        opacity: 0.9,
      },
      "&:hover": {
        background: theme.palette.secondary.dark,
      },
      "&:active": {
        outline: "none",
        transform: "scale(1.01)",
      },
      "&:focus": {
        outline: "none",
        transform: "scale(1.01)",
      },
    },
  })
);
