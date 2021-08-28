import {
  makeStyles,
  createStyles,
  Theme,
  lighten,
} from "@material-ui/core/styles";

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    bookDetailsContainer: {
      "& > div": {
        display: "flex",
        flexDirection: "column",
        height: "100%",
      },
      [theme.breakpoints.up("md")]: {
        position: "fixed",
        top: 0,
        right: 0,
        width: "40%",
        height: "100%",
      },
      background: theme.components?.bookDetails?.background,
      padding: theme.spacing(3.75),
      overflow: "auto",
      boxShadow: "-2px -3px 5px rgba(0, 0, 0, 0.3)",
      boxSizing: "border-box",
      color: theme.components?.bookDetails?.color,
      zIndex: 2,
    },
    bookDetails__addedBy: {
      fontSize: 12,
      marginTop: "auto",
      textAlign: "end",
      color: "rgba(0, 0, 0, 0.54)",
    },
  })
);
