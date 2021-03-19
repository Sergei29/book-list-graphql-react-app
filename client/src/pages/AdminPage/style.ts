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

    author__icon: {
      margin: theme.spacing(2),
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
  })
);
