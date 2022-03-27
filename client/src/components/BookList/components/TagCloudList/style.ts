import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    bookList__cloudItem: {
      zIndex: 2,
      cursor: "pointer",
      color: theme.palette.primary.main,
      transition: `all 200ms ${theme.transitions.easing.easeInOut}`,
      "&:hover": {
        textDecoration: "underline",
      },
    },
  })
);
