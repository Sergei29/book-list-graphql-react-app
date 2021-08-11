import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    page__text: {
      position: "relative",
      zIndex: 2,
      color: theme.palette.primary.main,
      marginTop: theme.spacing(3),
    },
  })
);
