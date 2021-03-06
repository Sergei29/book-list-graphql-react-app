import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    adminContainer: {
      color: theme.palette.primary.main,
    },
    authorsContainer: {
      width: "50%",
      margin: "0 auto",
    },

    author: {
      display: "flex",
    },

    author__name: {
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(2),
    },

    author__deleteButton: {
      margin: theme.spacing(2),
      padding: 0,
      "&:hover": {
        color: theme.palette.secondary.main,
      },
      "&:focus": {
        color: theme.palette.secondary.main,
      },
    },

    authorBookList__item: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: theme.spacing(0.5),
      padding: `${theme.spacing(0.5)}px ${theme.spacing(0.75)}px`,
      borderRadius: 4,
      "&:hover": {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.common.white,
      },
    },
    authorBookList__item__icon: {
      margin: `0 ${theme.spacing(2)}px`,
      "&:hover": {
        color: theme.palette.secondary.main,
      },
      "&:focus": {
        color: theme.palette.secondary.main,
      },
    },
    pageBackground: {
      position: "fixed",
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      background: "rgba(0,0,0,0.2)",
    },
  })
);
