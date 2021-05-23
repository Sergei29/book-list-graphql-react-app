import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    listItemRoot: {
      [theme.breakpoints.down("sm")]: {
        color: "inherit",
      },
    },
    mobileNavigation: {
      position: "relative",
      display: "flex",
      justifyContent: "flex-end",
      zIndex: 2,
    },
    mobileNavigation__button: {
      "& svg": {
        fontSize: "1.9rem",
      },
      color: theme.palette.secondary.main,
    },
    mobileNavigation__drawer: {
      background: theme.components?.mobileNavigation?.background,
      color: theme.components?.mobileNavigation?.color,
    },
    mobileNavigation__navLink: {
      color: "inherit",
      textDecoration: "none",
      display: "flex",
      alignItems: "center",
      padding: `${theme.spacing(1)}px ${theme.spacing(2)}px`,
      width: "100%",
      "&.active": {
        backgroundColor: theme.components?.bookDetails?.background,
        color: theme.components?.bookDetails?.color,
      },
    },
    mobileNavigation__navLink__icon: {
      color: "inherit",
    },
  })
);
