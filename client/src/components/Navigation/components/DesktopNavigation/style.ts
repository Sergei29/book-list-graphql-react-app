import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    navigation: {
      position: "relative",
      zIndex: 2,
    },
    navigation__list: {
      display: "flex",
      alignItems: "center",
      margin: 0,
      padding: 0,
      listStyleType: "none",
    },
    navigation__list__item: {
      display: "inline-block",
      margin: `0 ${theme.spacing(0.75)}px`,
    },
    navigation__list__item_last: {
      marginLeft: "auto",
      [theme.breakpoints.up("md")]: {
        marginRight: "40%",
      },
    },
    navLink: {
      color: theme.palette.primary.main,
      textDecoration: "none",
      "&.active": {
        textDecoration: "underline",
      },
    },
  })
);
