import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
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
    mobileNavigation__navLink: {
      color: theme.palette.primary.main,
      textDecoration: "none",
      display: "block",
      padding: `${theme.spacing(1)}px ${theme.spacing(2)}px`,
      width: "100%",
      "&.active": {
        backgroundColor: theme.palette.primary.light,
        color: theme.palette.common.white,
      },
    },
  })
);
