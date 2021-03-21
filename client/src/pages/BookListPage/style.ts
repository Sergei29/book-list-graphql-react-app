import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    bookListPage: {
      padding: 0,
      boxSizing: "border-box",
      width: "60%",
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
