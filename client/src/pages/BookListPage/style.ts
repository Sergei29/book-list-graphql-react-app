import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    bookListPage: {
      [theme.breakpoints.up("md")]: {
        width: "60%",
      },
      padding: 0,
      boxSizing: "border-box",
      height: "100%",
    },
    bookListPage__heading: {
      position: "relative",
      zIndex: 2,
      color: theme.palette.primary.main,
      textAlign: "center",
    },
  })
);
