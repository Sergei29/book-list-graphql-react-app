import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    bookDetailsContainer: {
      position: "fixed",
      top: 0,
      right: 0,
      width: "40%",
      height: "100%",
      background: theme.palette.secondary.main,
      padding: theme.spacing(3.75),
      overflow: "auto",
      boxShadow: "-2px -3px 5px rgba(0, 0, 0, 0.3)",
      boxSizing: "border-box",
      color: theme.palette.common.white,
      zIndex: 2,
    },
  })
);
